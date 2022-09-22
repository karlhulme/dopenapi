import { TypescriptTreeEnumConstArray } from "../../deps.ts";
import { OpenApiSpecComponentsSchema } from "../interfaces/index.ts";

/**
 * Returns an enum const array.
 * @param schemaName The name of a schema item.
 * @param schema A JSON schema for an enumeration.
 */
export function convertComponentStringSchemaToEnumConstArray(
  schemaName: string,
  schema: OpenApiSpecComponentsSchema,
): TypescriptTreeEnumConstArray {
  if (!Array.isArray(schema.enum)) {
    throw new Error(`Cannot read enum const array.\n${JSON.stringify(schema)}`);
  }

  const enumConstArray: TypescriptTreeEnumConstArray = {
    name: schemaName,
    exported: true,
    values: schema.enum,
  };

  if (schema.description) {
    enumConstArray.comment = schema.description;
  }

  return enumConstArray;
}
