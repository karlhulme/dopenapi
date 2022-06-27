import { OpenApiSpecPathOperationSchema } from "./OpenApiSpecPathOperationSchema.ts";

/**
 * Represents the MIME type of a content node.
 */
export interface OpenApiSpecPathContentMime {
  /**
   * The schema of the content node.
   */
  schema: OpenApiSpecPathOperationSchema;
}
