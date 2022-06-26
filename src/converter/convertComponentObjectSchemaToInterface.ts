import { TypescriptTreeInterface } from "../../deps.ts";
import { OpenApiSpecSchema } from "../interfaces/index.ts";
import { buildComment } from "./buildComment.ts";
import { determineTypeNameForComponentSchemaProperty } from "./determineTypeNameForComponentSchemaProperty.ts";

/**
 * Returns an interface.
 * @param schemaName The name of a schema element.
 * @param schema A schema node.
 */
export function convertComponentObjectSchemaToInterface(
  schemaName: string,
  schema: OpenApiSpecSchema,
): TypescriptTreeInterface {
  const iface: TypescriptTreeInterface = {
    name: schemaName,
    exported: true,
    deprecated: Boolean(schema.deprecated),
    comment: buildComment(schema.title, schema.description),
    members: [],
  };

  if (schema.properties) {
    for (const propertyName in schema.properties) {
      const property = schema.properties[propertyName];

      const isRequired = Array.isArray(schema.required) &&
        schema.required.includes(propertyName);

      iface.members.push({
        name: propertyName,
        typeName: determineTypeNameForComponentSchemaProperty(property),
        comment: buildComment(property.title, property.description),
        deprecated: Boolean(property.deprecated),
        optional: !isRequired,
        nullable: Boolean(property.nullable),
      });
    }
  }

  return iface;
}
