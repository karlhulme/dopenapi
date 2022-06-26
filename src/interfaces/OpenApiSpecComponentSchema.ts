import { OpenApiSpecComponentSchemaProperty } from "./OpenApiSpecComponentSchemaProperty.ts";

/**
 * Represents a schema that can be converted to either
 * an interface or an enum declaration.
 */
export interface OpenApiSpecComponentSchema {
  type: "object" | "string";
  title?: string;
  enum?: string[];
  description?: string;
  deprecated?: boolean;
  properties?: Record<string, OpenApiSpecComponentSchemaProperty>;
  required?: string[];
}
