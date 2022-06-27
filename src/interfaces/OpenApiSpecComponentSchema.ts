import { OpenApiSpecComponentSchemaProperty } from "./OpenApiSpecComponentSchemaProperty.ts";

/**
 * Represents a schema that can be converted to either
 * an interface or an enum declaration.  This schema must
 * be either a record (object with 1 level of fields) or
 * an enum const array (string with enum values).
 */
export interface OpenApiSpecComponentSchema {
  /**
   * The type of schema.
   */
  type: "object" | "string";

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
  properties?: Record<string, OpenApiSpecComponentSchemaProperty>;

  /**
   * A list of the required fields.
   */
  required?: string[];
}
