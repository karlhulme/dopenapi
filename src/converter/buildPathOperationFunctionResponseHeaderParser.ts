import {
  OpenApiSpecPathOperationResponseHeader,
  OpenApiSpecPathOperationSchema,
} from "../interfaces/index.ts";

/**
 * Returns a Typescript statement for parsing out the value
 * of a response header from a fetch response.
 * @param headerName The name of a header.
 * @param header The operation response header definition.
 */
export function buildPathOperationFunctionResponseHeaderParser(
  headerName: string,
  header: OpenApiSpecPathOperationResponseHeader,
) {
  const extracter = buildResponseHeaderExtracter(
    headerName,
    header.schema,
  );

  if (header.required) {
    return `result["${headerName}"] = ${extracter};`;
  } else {
    let block = `if (response.headers.has("${headerName}")) {\n`;
    block += `result["${headerName}"] = ${extracter};\n`;
    block += "};";
    return block;
  }
}

/**
 * Returns a Typescript statement for reading a response
 * header value according to the given type.
 * @param headerName The name of a header.
 * @param schema The schema of a response header.
 */
function buildResponseHeaderExtracter(
  headerName: string,
  schema: OpenApiSpecPathOperationSchema,
) {
  if (schema.type === "boolean") {
    return `response.headers.get("${headerName}") === "true"`;
  } else if (schema.type === "number") {
    return `parseFloat(response.headers.get("${headerName}"))`;
  } else if (schema.type === "string") {
    return `response.headers.get("${headerName}") as string`;
  } else {
    throw new Error(
      `Unsupported header ${headerName}.\n${JSON.stringify(schema)}`,
    );
  }
}
