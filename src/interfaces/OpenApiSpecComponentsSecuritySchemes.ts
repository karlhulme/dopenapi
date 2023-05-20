import { OpenApiSpecComponentsSecuritySchemesApiKey } from "./OpenApiSpecComponentsSecuritySchemesApiKey.ts";

/**
 * Represents a set of security schemes that will be referenced
 * by the operations.
 */
export interface OpenApiSpecComponentsSecuritySchemes {
  /**
   * If populated, the presence of this key indicates the service
   * uses an API key in the header for security.
   */
  apiKeyAuth?: OpenApiSpecComponentsSecuritySchemesApiKey;

  /**
   * If populated, the presence of this key indicates the service
   * uses an API key in a cookie for security.
   */
  cookieAuth?: OpenApiSpecComponentsSecuritySchemesApiKey;
}
