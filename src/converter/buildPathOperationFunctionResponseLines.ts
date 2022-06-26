import { OpenApiSpecPathOperation } from "../interfaces/index.ts";
import { capitalizeFirstLetter } from "../utils/index.ts";
import { getOperationSuccessResponse } from "./getOperationSuccessResponse.ts";
import { determineTypeNameForOperationPathSchema } from "./determineTypeNameForOperationPathSchema.ts";
import { buildPathOperationFunctionResponseHeaderParser } from "./buildPathOperationFunctionResponseHeaderParser.ts";

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

  block += `const result: Partial<${
    capitalizeFirstLetter(op.operationId)
  }Result> {\n`;

  block += `status: response.status,\n`;

  if (typeof response.content?.["application/json"].schema !== "undefined") {
    block += `body: resultBody,\n`;
  }

  block += "}\n";

  if (response.headers) {
    for (const headerName in response.headers) {
      const header = response.headers[headerName];
      block += buildPathOperationFunctionResponseHeaderParser(
        headerName,
        header,
      ) + "\n";
    }
  }

  block += "return result;\n";

  return block;
}
