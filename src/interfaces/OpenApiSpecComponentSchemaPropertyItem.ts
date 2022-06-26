/**
 * Represents the type of item of a schema object array property.
 * You must specify either $ref or type.
 */
export interface OpenApiSpecComponentSchemaPropertyItem {
  $ref?: string;
  type?: "string" | "number" | "boolean" | "object";
}
