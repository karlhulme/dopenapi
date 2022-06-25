import { OpenApiSpecSchemaProperty } from "../interfaces/index.ts";

export function determineTypeNameForComponentSchemaProperty(
  property: OpenApiSpecSchemaProperty,
) {
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
  } else if (property.type && property.type !== "array") {
    return property.type;
  } else {
    throw new Error(
      `Cannot determine type of property specification.\n${
        JSON.stringify(property)
      }`,
    );
  }
}
