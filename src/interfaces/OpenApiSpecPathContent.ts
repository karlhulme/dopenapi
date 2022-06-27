import { OpenApiSpecPathContentMime } from "./OpenApiSpecPathContentMime.ts";

/**
 * Represents a content node anywhere under a path definition
 * for the service.
 */
export interface OpenApiSpecPathContent {
  /**
   * The JSON definition of the content.
   */
  "application/json": OpenApiSpecPathContentMime;
}
