/**
 * Represents the type of item of a schema object array property.
 * You must specify either $ref or type.
 */
export interface OpenApiSpecComponentSchemaPropertyItem {
  /**
   * A reference to a schema elsewhere in the components schema section.
   */
  $ref?: string;

  /**
   * The type of the property.
   */
  type?: "string" | "number" | "boolean" | "object";
}
