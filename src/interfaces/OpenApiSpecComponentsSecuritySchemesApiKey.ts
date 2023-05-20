/**
 * Represents an API key used for security.
 */
export interface OpenApiSpecComponentsSecuritySchemesApiKey {
  /**
   * A constant value for this type of security scheme.
   */
  type: "apiKey";

  /**
   * The placement of the security key, either header or cookie is supported.
   */
  in: "header" | "cookie";

  /**
   * The name of the header or cookie used to store the API key.
   */
  name: string;
}
