import { OpenApiSpecPathOperation } from "../interfaces/index.ts";

/**
 * Returns a block of code for checking the response to a fetch call
 * and raising either a regular Error or a ServiceCallTransitoryError.
 * @param op An operation.
 */
export function buildPathOperationFunctionValidationLines(
  op: OpenApiSpecPathOperation,
) {
  let block = "if (!response.ok) {\n";

  block += "if ([429, 503, 504].includes(response.status)) {\n";
  block +=
    "throw new ServiceCallTransitoryError(response.status, await response.text())\n";

  block += "} else if (isIETF7087Problem(response)) {\n";
  block += "const problemError = await parseIETF7087Problem(response);\n";
  block += "throw problemError;";
  block += "} else {\n";

  block += "const errorTextLine = await response.text();\n";
  block += "const urlLine = `Url: ${url}`\n";

  if (typeof op.requestBody === "undefined") {
    block += 'const bodyLine = "";\n';
  } else {
    block +=
      "const bodyLine = `Body: ${JSON.stringify(props.body, null, 2)}`\n";
  }

  block +=
    "throw new ServiceCallRejectedError(response.status, `${errorTextLine}\n${urlLine}\n${bodyLine}`)\n";

  block += "}\n"; // End of else recognised status block.

  block += "}\n"; // End of if response.ok block.

  return block;
}
