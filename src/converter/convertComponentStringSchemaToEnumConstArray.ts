import { TypescriptTreeEnumConstArray } from "../../deps.ts";
import { OpenApiSpecComponentSchema } from "../interfaces/index.ts";
import { buildComment } from "./buildComment.ts";

/**
 * Returns an enum const array.
 * @param schemaName The name of a schema item.
 * @param schema A JSON schema for an enumeration.
 */
export function convertComponentStringSchemaToEnumConstArray(
  schemaName: string,
  schema: OpenApiSpecComponentSchema,
): TypescriptTreeEnumConstArray {
  if (!Array.isArray(schema.enum)) {
    throw new Error(`Cannot read enum const array.\n${JSON.stringify(schema)}`);
  }

  return {
    name: schemaName,
    exported: true,
    values: schema.enum,
    comment: buildComment(schema.title, schema.description),
  };
}
