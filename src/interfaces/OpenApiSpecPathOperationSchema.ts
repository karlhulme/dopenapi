import { OpenApiSpecPathOperationSchemaItem } from "./OpenApiSpecPathOperationSchemaItem.ts";

/**
 * Represents schemas defined as part of a path operation.
 * They must be simple types, references to schemas defined
 * in the schemas section, or array versions of the same.
 */
export interface OpenApiSpecPathOperationSchema {
  $ref?: string;
  type?: "boolean" | "string" | "number" | "boolean" | "array";
  title?: string;
  description?: string;
  items?: OpenApiSpecPathOperationSchemaItem;
}
