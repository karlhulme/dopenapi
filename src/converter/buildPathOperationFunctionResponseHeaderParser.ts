import {
  OpenApiSpecComponents,
  OpenApiSpecPathOperationResponseHeader,
  OpenApiSpecPathOperationSchema,
} from "../interfaces/index.ts";
import { determineTypeNameForComponentSchemaProperty } from "./determineTypeNameForComponentSchemaProperty.ts";

/**
 * Returns a Typescript statement for parsing out the value
 * of a response header from a fetch response.
 * @param headerName The name of a header.
 * @param header The operation response header definition.
 * @param components The OpenAPI components.
 */
export function buildPathOperationFunctionResponseHeaderParser(
  headerName: string,
  header: OpenApiSpecPathOperationResponseHeader,
  components: OpenApiSpecComponents,
) {
  const extracter = buildResponseHeaderExtracter(
    headerName,
    header.schema,
    components,
  );

  if (header.required) {
    return `result["${headerName}"] = ${extracter};`;
  } else {
    let block = `if (response.headers.has("${headerName}")) {\n`;
    block += `result["${headerName}"] = ${extracter};\n`;
    block += "}";
    return block;
  }
}

/**
 * Returns a Typescript statement for reading a response
 * header value according to the given type.
 * @param headerName The name of a header.
 * @param schema The schema of a response header.
 * @param components The OpenAPI components.
 */
function buildResponseHeaderExtracter(
  headerName: string,
  schema: OpenApiSpecPathOperationSchema,
  components: OpenApiSpecComponents,
) {
  const typeName = determineTypeNameForComponentSchemaProperty(schema);

  const comp = components.schemas[typeName];

  if (!comp) {
    throw new Error(
      `Unsupported header ${headerName}.\nUnknown component ${comp}.`,
    );
  }

  if (comp.type === "boolean") {
    return `["true", "TRUE", "1"].includes(response.headers.get("${headerName}"))`;
  } else if (comp.type === "number") {
    return `parseFloat(response.headers.get("${headerName}"))`;
  } else if (comp.type === "string") {
    return `response.headers.get("${headerName}") as string`;
  } else {
    throw new Error(
      `Unsupported header ${headerName}.\nUnsupported component ${
        JSON.stringify(comp)
      }`,
    );
  }
}
