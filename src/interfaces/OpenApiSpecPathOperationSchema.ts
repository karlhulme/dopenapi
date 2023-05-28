import { OpenApiSpecPathOperationSchemaItem } from "./OpenApiSpecPathOperationSchemaItem.ts";

/**
 * Represents schemas defined as part of a path operation.
 * They must be simple types, references to schemas defined
 * in the schemas section, or array versions of the same.
 */
export interface OpenApiSpecPathOperationSchema {
  /**
   * A reference to a type in the component schemas.
   */
  $ref?: string;

  /**
   * The type of the schema.
   */
  type?: "boolean" | "string" | "number" | "array";

  /**
   * An example value.
   */
  example?: boolean | string | number | unknown;

  /**
   * A description of the schema.
   */
  description?: string;

  /**
   * An object that describes the type of elements in an array.
   * This is used if type=array.
   */
  items?: OpenApiSpecPathOperationSchemaItem;
}
