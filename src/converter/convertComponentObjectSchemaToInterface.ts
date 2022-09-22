import { TypescriptTreeInterface } from "../../deps.ts";
import { OpenApiSpecComponentsSchema } from "../interfaces/index.ts";
import { determineTypeNameForComponentSchemaProperty } from "./determineTypeNameForComponentSchemaProperty.ts";

/**
 * Returns an interface.
 * @param schemaName The name of a schema element.
 * @param schema A schema node.
 */
export function convertComponentObjectSchemaToInterface(
  schemaName: string,
  schema: OpenApiSpecComponentsSchema,
): TypescriptTreeInterface {
  const iface: TypescriptTreeInterface = {
    name: schemaName,
    exported: true,
    deprecated: Boolean(schema.deprecated),
    members: [],
  };

  if (schema.description) {
    iface.comment = schema.description;
  }

  if (schema.properties) {
    for (const propertyName in schema.properties) {
      const property = schema.properties[propertyName];

      const isRequired = Array.isArray(schema.required) &&
        schema.required.includes(propertyName);

      iface.members.push({
        name: propertyName,
        typeName: determineTypeNameForComponentSchemaProperty(property),
        deprecated: Boolean(property.deprecated),
        optional: !isRequired,
        nullable: Boolean(property.nullable),
      });

      if (property.description) {
        iface.members[iface.members.length - 1].comment = property.description;
      }
    }
  }

  return iface;
}
