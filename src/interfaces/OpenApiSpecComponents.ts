import { OpenApiSpecComponentSchema } from "./OpenApiSpecComponentSchema.ts";
import { OpenApiSpecComponentsSecuritySchemes } from "./OpenApiSpecComponentsSecuritySchemes.ts";

export interface OpenApiSpecComponents {
  schemas: Record<string, OpenApiSpecComponentSchema>;
  securitySchemes: OpenApiSpecComponentsSecuritySchemes;
}
