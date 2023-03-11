import { OpenApiSpecPathOperation } from "../interfaces/index.ts";
import { requestHeadersToIgnore } from "./headersToIgnore.ts";
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
  block += "const start = performance.now();";
  block += "try {\n";
  block += `const headers: Record<string, string> = {};\n`;

  block += `headers["content-type"] = "application/json";\n`;

  for (const param of op.parameters) {
    if (param.in === "header" && !requestHeadersToIgnore.includes(param.name)) {
      block += `if (typeof props["${param.name}"] !== "undefined") {\n`;
      block +=
        `headers["${param.name}"] = props["${param.name}"].toString();\n`;
      block += "}\n";
    }
  }
  ``;

  if (isOperationUsingApiKey(op)) {
    block += `headers["x-api-key"] = props["x-api-key"];\n`;
  }

  block += `response = await fetch(url, {\n`;
  block += "...options,\n";
  block += `method: "${method.toUpperCase()}",\n`;
  block += "headers,\n";
  if (typeof op.requestBody !== "undefined") {
    block += "body: JSON.stringify(props.body),\n";
  }
  block += "});\n";

  block += "} catch (err) {\n";
  block += "const e = err as Error;\n";
  block +=
    "throw new ServiceCallTransitoryError(-1, `-1 CONNECTION_FAILED ${e.name} ${e.message}`)\n";
  block += "} finally {\n";
  block += "const duration = performance.now() - start;\n";
  block += "if (props.logPerformance) {\n;";
  block += "console.log(`  " + method.toUpperCase() +
    " ${url} (${duration.toFixed(0)}ms)`)\n;";
  block += "}\n";
  block += "}\n";

  return block;
}
