import { OpenApiSpecPathOperation } from "../interfaces/index.ts";

export function buildPathOperationFunctionValidationLines(
  op: OpenApiSpecPathOperation,
) {
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
