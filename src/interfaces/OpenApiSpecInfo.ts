/**
 * Provides information about a specification.
 */
export interface OpenApiSpecInfo {
  /**
   * The title of the service.
   */
  title: string;

  /**
   * A description of the service.
   */
  description?: string;

  /**
   * The terms of service for the service.
   */
  termsOfService?: string;

  /**
   * The version of the service.
   */
  version: string;
}
