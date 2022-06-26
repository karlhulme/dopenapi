import {
  OpenApiSpecPathOperation,
  OpenApiSpecPathOperationResponseHeader,
} from "../interfaces/index.ts";
import { getOperationSuccessResponse } from "./getOperationSuccessResponse.ts";
import { determineTypeNameForOperationPathSchema } from "./determineTypeNameForOperationPathSchema.ts";

export function buildPathOperationFunctionResponseLines(
  op: OpenApiSpecPathOperation,
) {
  let block = "";

  const response = getOperationSuccessResponse(op);

  if (typeof response.content?.["application/json"].schema !== "undefined") {
    const resultType = determineTypeNameForOperationPathSchema(
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
      const header = response.headers[headerName];
      block += `"${headerName}": ${extractHeaderValue(headerName, header)},\n`;
    }
  }

  block += "}\n";

  return block;
}

function extractHeaderValue(
  headerName: string,
  header: OpenApiSpecPathOperationResponseHeader,
) {
  if (header.schema.type === "boolean") {
    if (header.required) {
      return `response.headers.get("${headerName}") === "true"`;
    } else {
      return `response.headers.has("${headerName}") ? response.headers.get("${headerName}") === "true" : undefined`;
    }
  } else if (header.schema.type === "number") {
    if (header.required) {
      return `parseFloat(response.headers.get("${headerName}"))`;
    } else {
      return `response.headers.has("${headerName}") ? parseFloat(response.headers.get("${headerName}")) : undefined`;
    }
  } else if (header.schema.type === "string") {
    if (header.required) {
      return `response.headers.get("${headerName}") as string`;
    } else {
      return `response.headers.has("${headerName}") ? response.headers.get("${headerName}") as string : undefined`;
    }
  } else {
    throw new Error(
      `Unsupported header ${headerName}.\n${JSON.stringify(header)}`,
    );
  }
}
