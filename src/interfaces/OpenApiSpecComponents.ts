import { OpenApiSpecComponentSchema } from "./OpenApiSpecComponentSchema.ts";
import { OpenApiSpecComponentsSecuritySchemes } from "./OpenApiSpecComponentsSecuritySchemes.ts";

/**
 * Represents the components of a specification.
 */
export interface OpenApiSpecComponents {
  /**
   * The schemas referenced by the operation requests and responses.
   */
  schemas: Record<string, OpenApiSpecComponentSchema>;

  /**
   * The security schemas referenced by the operations.
   */
  securitySchemes: OpenApiSpecComponentsSecuritySchemes;
}
