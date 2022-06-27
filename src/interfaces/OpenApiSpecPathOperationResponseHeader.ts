import { OpenApiSpecPathOperationSchema } from "./OpenApiSpecPathOperationSchema.ts";

/**
 * Represents a header included with a response.
 */
export interface OpenApiSpecPathOperationResponseHeader {
  /**
   * The description of the header.
   */
  description: string;

  /**
   * True if the header should not be used.
   */
  deprecated?: boolean;

  /**
   * Describes the content type of the header.
   */
  schema: OpenApiSpecPathOperationSchema;

  /**
   * True if the header will always be supplied.
   */
  required?: boolean;
}
