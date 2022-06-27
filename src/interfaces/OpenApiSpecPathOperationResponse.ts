import { OpenApiSpecPathContent } from "./OpenApiSpecPathContent.ts";
import { OpenApiSpecPathOperationResponseHeader } from "./OpenApiSpecPathOperationResponseHeader.ts";

/**
 * Represents a possible response to the operation.
 */
export interface OpenApiSpecPathOperationResponse {
  /**
   * The description of the response.
   */
  description: string;

  /**
   * The content of the response.
   */
  content?: OpenApiSpecPathContent;

  /**
   * The headers that will be supplied with this response.
   */
  headers?: Record<string, OpenApiSpecPathOperationResponseHeader>;
}
