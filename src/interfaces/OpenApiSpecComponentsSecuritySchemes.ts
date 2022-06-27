import { OpenApiSpecComponentsSecuritySchemesApiKey } from "./OpenApiSpecComponentsSecuritySchemesApiKey.ts";

/**
 * Represents a set of security schemes that will be referenced
 * by the operations.
 */
export interface OpenApiSpecComponentsSecuritySchemes {
  /**
   * If populated, the presence of this key indicates the service
   * uses an API key for security.
   */
  apiKeyAuth?: OpenApiSpecComponentsSecuritySchemesApiKey;
}
