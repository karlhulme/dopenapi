import { OpenApiSpecPathOperationSchema } from "./OpenApiSpecPathOperationSchema.ts";

export interface OpenApiSpecPathOperationParameter {
  name: string;
  in: "path" | "query" | "header" | "cookie";
  description?: string;
  required: boolean;
  deprecated?: boolean;
  schema: OpenApiSpecPathOperationSchema;
}
