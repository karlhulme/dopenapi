import { OpenApiSpecPathOperation } from "../interfaces/index.ts";
import { isOperationUsingApiKey } from "./isOperationUsingApiKey.ts";

/**
 * Returns a set of Typescript code for building
 * the fetch request.
 * @param method The HTTP verb.
 * @param op An operation.
 */
export function buildPathOperationFunctionRequestLines(
  method: string,
  op: OpenApiSpecPathOperation,
) {
  let block = ``;

  block += "let response: Response;\n";
  block += "try {\n";
  block += `const headers: Record<string, string> = {};\n`;

  for (const param of op.parameters) {
    if (param.in === "header") {
      block += `if (typeof props["${param.name}"] !== "undefined") {\n`;
      block +=
        `headers["${param.name}"] = props["${param.name}"].toString();\n`;
      block += "}\n";
    }
  }

  if (isOperationUsingApiKey(op)) {
    block += `headers["x-api-key"] = props["x-api-key"];\n`;
  }

  block += `const response = await fetch(url, {\n`;
  block += "...options,\n";
  block += `method: "${method}",\n`;
  block += "headers,\n";
  if (typeof op.requestBody !== "undefined") {
    block += "body: JSON.stringify(props.body),\n";
  }
  block += "});\n";

  block += "} catch (err) {\n";
  block += "const e = err as Error;\n";
  block +=
    "throw new ServiceCallTransitoryError(-1, `${e.name} ${e.message}`)\n";
  block += "}\n";

  return block;
}
