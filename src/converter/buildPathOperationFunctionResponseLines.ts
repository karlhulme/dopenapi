import {
  OpenApiSpecComponents,
  OpenApiSpecPathOperation,
} from "../interfaces/index.ts";
import { capitalizeFirstLetter } from "../utils/index.ts";
import { getOperationSuccessResponse } from "./getOperationSuccessResponse.ts";
import { determineTypeNameForOperationPathSchema } from "./determineTypeNameForOperationPathSchema.ts";
import { buildPathOperationFunctionResponseHeaderParser } from "./buildPathOperationFunctionResponseHeaderParser.ts";
import { responseHeadersToIgnore } from "./headersToIgnore.ts";

/**
 * Returns a set of Typescript code for building and
 * returning the response from a service call.
 * @param op An operation.
 * @param components The OpenAPI components.
 */
export function buildPathOperationFunctionResponseLines(
  op: OpenApiSpecPathOperation,
  components: OpenApiSpecComponents,
) {
  let block = "";

  const response = getOperationSuccessResponse(op);

  if (typeof response.content?.["application/json"].schema !== "undefined") {
    const resultType = determineTypeNameForOperationPathSchema(
      response.content["application/json"].schema,
    );
    block += `const resultBody = await response.json() as ${resultType};\n`;
  }

  const returnType = capitalizeFirstLetter(op.operationId);

  block += `const result: Partial<${returnType}Result> = {\n`;

  block += `status: response.status,\n`;

  if (typeof response.content?.["application/json"].schema !== "undefined") {
    block += `body: resultBody,\n`;
  }

  block += "};\n";

  if (response.headers) {
    for (const headerName in response.headers) {
      if (!responseHeadersToIgnore.includes(headerName)) {
        const header = response.headers[headerName];
        block += buildPathOperationFunctionResponseHeaderParser(
          headerName,
          header,
          components,
        ) + "\n";
      }
    }
  }

  block += `return result as ${returnType}Result;\n`;

  return block;
}
