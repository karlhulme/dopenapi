import { TypescriptTreeInterface } from "../../deps.ts";
import { OpenApiSpecSchema } from "../interfaces/index.ts";
import { buildComment } from "./buildComment.ts";
import { determineTypeNameForComponentSchemaProperty } from "./determineTypeNameForComponentSchemaProperty.ts";

export function convertComponentObjectSchemaToInterface(
  schemaName: string,
  schema: OpenApiSpecSchema,
): TypescriptTreeInterface {
  const iface: TypescriptTreeInterface = {
    name: schemaName,
    exported: true,
    deprecated: schema.deprecated,
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
        deprecated: property.deprecated,
        optional: !isRequired,
        nullable: property.nullable,
      });
    }
  }

  return iface;
}
