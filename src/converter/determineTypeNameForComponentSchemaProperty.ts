import { OpenApiSpecComponentsSchemaProperty } from "../interfaces/index.ts";

export function determineTypeNameForComponentSchemaProperty(
  property: OpenApiSpecComponentsSchemaProperty,
) {
  if (property.type && property.type !== "array") {
    // JSON scalar type (but non-array)
    return property.type;
  } else if (property.$ref) {
    // $ref reference
    const lastDivider = property.$ref.lastIndexOf("/");
    return property.$ref.substring(lastDivider + 1);
  } else if (
    // $ref reference wrapped in an allOf
    Array.isArray(property.allOf) && property.allOf.length === 1 &&
    property.allOf[0].$ref
  ) {
    const lastDivider = property.allOf[0].$ref.lastIndexOf("/");
    return property.allOf[0].$ref.substring(lastDivider + 1);
  } else {
    // failure
    throw new Error(
      `Cannot determine type of property specification.\n${
        JSON.stringify(property)
      }`,
    );
  }
}
