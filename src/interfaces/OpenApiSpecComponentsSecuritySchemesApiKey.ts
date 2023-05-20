/**
 * Represents an API key used for security.
 */
export interface OpenApiSpecComponentsSecuritySchemesApiKey {
  /**
   * A constant value for this type of security scheme.
   */
  type: "apiKey";

  /**
   * The placement of the security key. Only header is supported.
   */
  in: "header";

  /**
   * The name of the header used to store the API key.
   */
  name: string;
}
