import { OpenApiSpecPathOperationParameter } from "./OpenApiSpecPathOperationParameter.ts";
import { OpenApiSpecPathOperation } from "./OpenApiSpecPathOperation.ts";

/**
 * Represents a url that the service is responding to.
 */
export interface OpenApiSpecPath {
  /**
   * The summary of the resource at this path.
   */
  summary?: string;

  /**
   * A description of the resource at this path.
   */
  description?: string;

  /**
   * An array of path parameters for this resource.
   */
  parameters: OpenApiSpecPathOperationParameter[];

  /**
   * A delete operation.
   */
  delete?: OpenApiSpecPathOperation;

  /**
   * A get operation.
   */
  get?: OpenApiSpecPathOperation;

  /**
   * A patch operation.
   */
  patch?: OpenApiSpecPathOperation;

  /**
   * A post operation.
   */
  post?: OpenApiSpecPathOperation;

  /**
   * A put operation.
   */
  put?: OpenApiSpecPathOperation;
}
