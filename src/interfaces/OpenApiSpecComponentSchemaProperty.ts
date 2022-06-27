import { OpenApiSpecComponentSchemaPropertyItem } from "./OpenApiSpecComponentSchemaPropertyItem.ts";

/**
 * Represents a property of a schema object.
 * You must specify either $ref or type.  If you specify type=array
 * then you must specify the items property.
 */
export interface OpenApiSpecComponentSchemaProperty {
  /**
   * A reference to a schema elsewhere in the components schema section.
   */
  $ref?: string;

  /**
   * The type of property.
   */
  type?: "string" | "number" | "boolean" | "object" | "array";

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

  /**
   * An object that describes the type of elements in an array.
   * This is used if type=array.
   */
  items?: OpenApiSpecComponentSchemaPropertyItem;
}
