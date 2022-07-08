import { OpenApiSpecPathOperation } from "../interfaces/index.ts";

/**
 * Returns a set of Typescript code for building a url
 * based on the operation inputs.
 * @param pathUrl The operation path url.
 * @param path The operation path.
 * @param op The OpenAPI operation.
 */
export function buildPathOperationFunctionUrlLines(
  pathUrl: string,
  op: OpenApiSpecPathOperation,
) {
  let block = `let url = props.baseUrl;\n`;

  const pathUrlSegments = pathUrl.split("/").filter((s) => s);

  for (const pathUrlSegment of pathUrlSegments) {
    if (pathUrlSegment.startsWith("{")) {
      const colonIndex = pathUrlSegment.lastIndexOf(":");

      if (colonIndex === -1) {
        // Path is regular /{id}
        const paramName = pathUrlSegment.slice(1, pathUrlSegment.length - 1);
        block += `url += "/" + props.${paramName};\n`;
      } else {
        // Path contains custom verb /{id}:action
        const paramName = pathUrlSegment.slice(1, colonIndex - 1);
        const verbName = pathUrlSegment.slice(
          colonIndex + 1,
          pathUrlSegment.length,
        );
        block += `url += "/" + props.${paramName} + ":${verbName}";\n`;
      }
    } else {
      block += `url += "/${pathUrlSegment}";\n`;
    }
  }

  block += "const queryParams: string[] = [];\n";

  for (const queryParam of op.parameters) {
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
