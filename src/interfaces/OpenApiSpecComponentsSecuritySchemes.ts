import { OpenApiSpecComponentsSecuritySchemesApiKey } from "./OpenApiSpecComponentsSecuritySchemesApiKey.ts";

/**
 * Represents a set of security schemes that will be referenced
 * by the operations.
 *
 * Cookie is not supported since this should not be handled
 * manually by developers and tools are hampered in their ability
 * to set cookies manually because of the security restrictions
 * placed upon browsers.
 */
export interface OpenApiSpecComponentsSecuritySchemes {
  /**
   * If populated, the presence of this key indicates the service
   * uses an API key in the header for security.
   */
  apiKeyAuth?: OpenApiSpecComponentsSecuritySchemesApiKey;

  /**
   * If populated, the presence of this key indicates the service
   * uses a token in a cookie for security.
   */
  cookieAuth?: OpenApiSpecComponentsSecuritySchemesApiKey;
}
