import { OpenApiSpecComponentsSchemaProperty } from "./OpenApiSpecComponentsSchemaProperty.ts";
import { OpenApiSpecComponentsSchemaItems } from "./OpenApiSpecComponentsSchemaItems.ts";

/**
 * Represents a schema that can be converted to either
 * an interface or an enum declaration.  This schema must
 * be either a record (object with 1 level of fields) or
 * an enum const array (string with enum values).
 */
export interface OpenApiSpecComponentsSchema {
  /**
   * The type of schema.
   */
  type: "object" | "string" | "number" | "boolean" | "array";

  /**
   * An array of valid enum values.
   */
  enum?: string[];

  /**
   * A description of the schema.
   */
  description?: string;

  /**
   * True if the schema has been deprecated.
   */
  deprecated?: boolean;

  /**
   * A record of properties.
   */
  properties?: Record<string, OpenApiSpecComponentsSchemaProperty>;

  /**
   * A list of the required fields.
   */
  required?: string[];

  /**
   * An object that describes the type of elements in an array.
   * This is used if type=array.
   */
  items?: OpenApiSpecComponentsSchemaItems;
}
