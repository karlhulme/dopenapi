/**
 * Represents a property of a schema object.
 * You must specify either $ref or type.
 */
export interface OpenApiSpecComponentsSchemaProperty {
  /**
   * A reference to a schema elsewhere in the components schema section.
   */
  $ref?: string;

  /**
   * A JSON scalar type.
   */
  type?: "number" | "string" | "boolean" | "array";

  /**
   * An array of references, whereby only one element should be supplied.
   * This exists to workaround the limitation that descriptions placed
   * alongside $ref's are ignored.
   */
  allOf?: { $ref: string }[];

  /**
   * A description of the property.
   */
  description?: string;

  /**
   * True if the property should no longer be used.
   */
  deprecated?: boolean;

  /**
   * True if the property can be set to null.
   */
  nullable?: boolean;
}
