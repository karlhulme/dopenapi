import { OpenApiSpecComponentsSchemaProperty } from "../interfaces/index.ts";

export function determineTypeNameForComponentSchemaProperty(
  property: OpenApiSpecComponentsSchemaProperty,
) {
  if (property.$ref) {
    const lastDivider = property.$ref.lastIndexOf("/");
    return property.$ref.substring(lastDivider + 1);
  } else {
    throw new Error(
      `Cannot determine type of property specification.\n${
        JSON.stringify(property)
      }`,
    );
  }
}
