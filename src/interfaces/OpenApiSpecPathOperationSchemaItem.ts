/**
 * Represents the type of item of a schema array.
 * You must specify either $ref or type.
 */
export interface OpenApiSpecPathOperationSchemaItem {
  /**
   * A reference to a type in the component schemas.
   */
  $ref?: string;

  /**
   * The type of the array element.
   */
  type?: "string" | "number" | "boolean";
}
