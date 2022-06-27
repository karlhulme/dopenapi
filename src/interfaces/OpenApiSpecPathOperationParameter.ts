import { OpenApiSpecPathOperationSchema } from "./OpenApiSpecPathOperationSchema.ts";

/**
 * Represents an operation parameter.
 * Specify path parameters at the path level, and
 * query and header parameters at the operation level.
 */
export interface OpenApiSpecPathOperationParameter {
  /**
   * The name of the parameter.
   */
  name: string;

  /**
   * The type of parameter.
   */
  in: "path" | "query" | "header" | "cookie";

  /**
   * The description of the parameter.
   */
  description?: string;

  /**
   * True if the parameter must be supplied.
   */
  required: boolean;

  /**
   * True if the parameter should no longer be used.
   */
  deprecated?: boolean;

  /**
   * The schema of the parameter.
   */
  schema: OpenApiSpecPathOperationSchema;
}
