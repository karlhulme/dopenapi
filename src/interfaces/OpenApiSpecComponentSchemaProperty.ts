import { OpenApiSpecComponentSchemaPropertyItem } from "./OpenApiSpecComponentSchemaPropertyItem.ts";

/**
 * Represents a property of a schema object.
 * You must specify either $ref or type.  If you specify type=array
 * then you must specify the items property.
 */
export interface OpenApiSpecComponentSchemaProperty {
  $ref?: string;
  type?: "string" | "number" | "boolean" | "object" | "array";
  title?: string;
  description?: string;
  deprecated?: boolean;
  nullable?: boolean;
  items?: OpenApiSpecComponentSchemaPropertyItem;
}
