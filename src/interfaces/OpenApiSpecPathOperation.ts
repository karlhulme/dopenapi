import { OpenApiSpecPathOperationParameter } from "./OpenApiSpecPathOperationParameter.ts";
import { OpenApiSpecPathOperationRequestBody } from "./OpenApiSpecPathOperationRequestBody.ts";
import { OpenApiSpecPathOperationResponse } from "./OpenApiSpecPathOperationResponse.ts";

/**
 * Represents an operation defined at a service path.
 */
export interface OpenApiSpecPathOperation {
  /**
   * A summary of the operation.
   */
  summary?: string;

  /**
   * A description of the operation.
   */
  description?: string;

  /**
   * True if this operation should no longer be used.
   */
  deprecated?: boolean;

  /**
   * An array of tags that group the operations.
   * Typically populate with one value only.
   */
  tags: string[];

  /**
   * The id (or name) of the operation.  This is used
   * by client code generators.
   */
  operationId: string;

  /**
   * An array of the header and query parameters of the operation.
   */
  parameters: OpenApiSpecPathOperationParameter[];

  /**
   * The optional type of the request body.
   */
  requestBody?: OpenApiSpecPathOperationRequestBody;

  /**
   * The set of responses that the operation may return.
   * This must include at least one success response.
   */
  responses: Record<string, OpenApiSpecPathOperationResponse>;

  /**
   * An array of the security schemes used by the operation.
   */
  security: Record<string, unknown[]>[];
}
