import { OpenApiSpecPathOperationSchema } from "./OpenApiSpecPathOperationSchema.ts";

export interface OpenApiSpecPathOperationResponseHeader {
  description: string;
  deprecated?: boolean;
  schema: OpenApiSpecPathOperationSchema;
  required?: boolean;
}
