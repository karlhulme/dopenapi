import { OpenApiSpecPathOperationSchema } from "../interfaces/index.ts";

/**
 * Determines the type name for the schema defined
 * in the operation path.
 * @param parameterSchema A schema of a parameter.
 */
export function determineTypeNameForOperationPathSchema(
  parameterSchema: OpenApiSpecPathOperationSchema,
) {
  if (
    parameterSchema.type === "array" && parameterSchema.items &&
    (parameterSchema.items.$ref || parameterSchema.items.type)
  ) {
    if (parameterSchema.items.$ref) {
      const lastDivider = parameterSchema.items.$ref.lastIndexOf("/");
      return parameterSchema.items.$ref.substring(lastDivider + 1) + "[]";
    } else {
      return parameterSchema.items.type + "[]";
    }
  } else if (parameterSchema.$ref) {
    const lastDivider = parameterSchema.$ref.lastIndexOf("/");
    return parameterSchema.$ref.substring(lastDivider + 1);
  } else if (parameterSchema.type && parameterSchema.type !== "array") {
    return parameterSchema.type;
  } else {
    throw new Error(
      `Cannot determine type of parameter schema.\n${
        JSON.stringify(parameterSchema)
      }`,
    );
  }
}
