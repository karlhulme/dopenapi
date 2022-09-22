/**
 * Represents the type of item of a schema object array property.
 * You must specify either $ref or type.
 */
export interface OpenApiSpecComponentsSchemaItems {
  /**
   * A reference to a schema elsewhere in the components schema section.
   */
  $ref?: string;
}
