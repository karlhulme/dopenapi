import { TypescriptTreeInterface } from "../../deps.ts";
import {
  OpenApiSpecSchema,
  OpenApiSpecSchemaProperty,
} from "../interfaces/index.ts";
import { buildComment } from "./buildComment.ts";

export function convertSchemaToInterface(
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

  if (Array.isArray(schema.properties)) {
    for (const propertyName in schema.properties) {
      const property = schema.properties[propertyName];

      iface.members.push({
        name: propertyName,
        typeName: buildInterfacePropertyType(property),
        comment: buildComment(property.title, property.description),
        deprecated: property.deprecated,
        optional: property.nullable,
      });
    }
  }

  return iface;
}

function buildInterfacePropertyType(property: OpenApiSpecSchemaProperty) {
  if (
    property.type === "array" && property.items &&
    (property.items.$ref || property.items.type)
  ) {
    if (property.items.$ref) {
      const lastDivider = property.items.$ref.lastIndexOf("/");
      return property.items.$ref.substring(lastDivider + 1) + "[]";
    } else {
      return property.items.type + "[]";
    }
  } else if (property.$ref) {
    const lastDivider = property.$ref.lastIndexOf("/");
    return property.$ref.substring(lastDivider + 1);
  } else if (property.type) {
    return property.type;
  } else {
    throw new Error(
      `Cannot determine type of property specification.\n${
        JSON.stringify(property)
      }`,
    );
  }
}
