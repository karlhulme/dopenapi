import { OpenApiSpecPathContent } from "./OpenApiSpecPathContent.ts";

/**
 * Describes the request body of an operation.
 */
export interface OpenApiSpecPathOperationRequestBody {
  /**
   * The content of the path operation.
   */
  content: OpenApiSpecPathContent;
}
