import { TypescriptTreeFunction } from "../../deps.ts";
import {
  OpenApiSpecPath,
  OpenApiSpecPathOperation,
} from "../interfaces/index.ts";
import { capitalizeFirstLetter } from "../utils/index.ts";
import { getOperationSuccessResponse } from "./getOperationSuccessResponse.ts";
import { convertPathSchemaToTypeName } from "./convertPathSchemaToTypeName.ts";

export function convertPathOperationCallToFunction(
  pathUrl: string,
  path: OpenApiSpecPath,
  method: string,
  op: OpenApiSpecPathOperation,
): TypescriptTreeFunction {
  const propsParamName = `${capitalizeFirstLetter(op.operationId)}Props`;
  const resultTypeName = `Promise<${
    capitalizeFirstLetter(op.operationId)
  }Result>`;

  const func: TypescriptTreeFunction = {
    name: op.operationId,
    async: true,
    comment: op.summary,
    exported: true,
    params: [{
      name: "props",
      typeName: propsParamName,
      comment: "A property bag of inputs for the service call.",
      optional: false,
    }, {
      name: "options",
      typeName: "RequestInit",
      comment: "The properties to be passed to the underlying fetch function.",
      optional: true,
    }],
    lines: "",
    returnType: resultTypeName,
  };

  func.lines += generateUrlClause(pathUrl, path);

  func.lines += "try {\n";
  func.lines += generateRequestClause(method, op) + "\n";
  func.lines += generateValidationClause(op) + "\n";
  func.lines += generateResponseClause(op) + "\n";
  func.lines += "} catch (err) {\n";
  func.lines += "const e = err as Error;\n";
  func.lines +=
    "throw new Error(`Service call failed to ${props.baseUrl}\n${e.name}: ${e.message}.`)\n";
  func.lines += "}\n";

  return func;
}

function generateUrlClause(pathUrl: string, path: OpenApiSpecPath) {
  let block = `let url = props.baseUrl;\n`;

  const pathUrlSegments = pathUrl.split("/");

  for (const pathUrlSegment of pathUrlSegments) {
    if (pathUrlSegment.startsWith("{")) {
      const colonIndex = pathUrlSegment.lastIndexOf(":");
      if (colonIndex === -1) {
        const paramName = pathUrlSegment.slice(1, pathUrlSegment.length - 1);
        block += `url += "/" + props.${paramName};\n`;
      } else {
        const paramName = pathUrlSegment.slice(1, colonIndex);
        block += `url += "/" + props.${paramName};\n`;
      }
    } else {
      block += `url += "/${pathUrlSegment}";\n`;
    }
  }

  block += "const queryParams: string[] = [];\n";

  for (const queryParam of path.parameters) {
    if (queryParam.in === "query") {
      const queryAssignment =
        `"${queryParam.name}=" + props.${queryParam.name}.toString()`;

      block += `if (typeof props.${queryParam.name} !== "undefined") {\n`;
      block += `  queryParams.push(${queryAssignment});\n`;
      block += "}\n";
    }
  }

  block +=
    `url += queryParams.length === 0 ? "" : "?" + queryParams.join("&");\n`;

  return block;
}

function generateRequestClause(method: string, op: OpenApiSpecPathOperation) {
  let block = `const headers: Record<string, string> = {};\n`;

  for (const param of op.parameters) {
    if (param.in === "header") {
      block += `if (typeof props["${param.name}"] !== "undefined") {\n`;
      block +=
        `headers["${param.name}"] = props["${param.name}"].toString();\n`;
      block += "}\n";
    }
  }

  block += `const response = await fetch(url, {\n`;
  block += "...options,\n";
  block += `method: "${method}",\n`;
  block += "headers,\n";
  if (typeof op.requestBody !== "undefined") {
    block += "body: JSON.stringify(props.body),\n";
  }
  block += "});\n";

  return block;
}

function generateValidationClause(op: OpenApiSpecPathOperation) {
  let block = "if (!response.ok) {\n";

  block += "if ([429, 503, 504].includes(response.status)) {\n";
  block += "throw new ServiceCallTransitoryError(response.status)\n";
  block += "} else {\n";
  block +=
    "const statusLine = `Service call rejected with status code ${response.status}.`\n";
  block += "const errorTextLine = await response.text();\n";
  block += "const urlLine = `Url: ${url}`\n";

  if (typeof op.requestBody === "undefined") {
    block += 'const bodyLine = "";\n';
  } else {
    block +=
      "const bodyLine = `Body: ${JSON.stringify(props.body, null, 2)}`\n";
  }

  block +=
    "throw new Error(`${statusLine}\n${errorTextLine}\n${urlLine}\n${bodyLine}`)\n";

  block += "}\n"; // End of else recognised status block.

  block += "}\n"; // End of if response.ok block.

  return block;
}

function generateResponseClause(op: OpenApiSpecPathOperation) {
  let block = "";

  const response = getOperationSuccessResponse(op);

  if (typeof response.content?.["application/json"].schema !== "undefined") {
    const resultType = convertPathSchemaToTypeName(
      response.content["application/json"].schema,
    );
    block += `const resultBody = await response.json() as ${resultType};\n`;
  }

  block += "return {\n";

  block += `status: response.status,\n`;

  if (typeof response.content?.["application/json"].schema !== "undefined") {
    block += `body: resultBody,\n`;
  }

  if (response.headers) {
    for (const headerName in response.headers) {
      block += `"${headerName}": response.headers["${headerName}"],\n`;
    }
  }

  block += "}\n";

  return block;
}
