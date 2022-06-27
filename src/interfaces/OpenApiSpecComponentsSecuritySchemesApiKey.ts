/**
 * Represents an API key used for security.
 */
export interface OpenApiSpecComponentsSecuritySchemesApiKey {
  /**
   * A constant value for this type of security scheme.
   */
  type: "apiKey";

  /**
   * The placement of the security key, only header is supported.
   */
  in: "header";

  /**
   * The name of the header used for the API key.
   */
  name: string;
}
