import { TypescriptTreeEnumConstArray } from "../../deps.ts";
import { OpenApiSpecSchema } from "../interfaces/index.ts";
import { buildComment } from "./buildComment.ts";

export function convertSchemaToEnumConstArray(
  schemaName: string,
  schema: OpenApiSpecSchema,
): TypescriptTreeEnumConstArray {
  if (!Array.isArray(schema.enum)) {
    throw new Error(`Cannot read enum const array.\n${JSON.stringify(schema)}`)
  }

  return {
    name: schemaName,
    exported: true,
    values: schema.enum,
    comment: buildComment(schema.title, schema.description),
  };
}
