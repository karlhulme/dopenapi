import { OpenApiSpecPathContent } from "./OpenApiSpecPathContent.ts";
import { OpenApiSpecPathOperationResponseHeader } from "./OpenApiSpecPathOperationResponseHeader.ts";

export interface OpenApiSpecPathOperationResponse {
  description: string;
  content?: OpenApiSpecPathContent;
  headers?: Record<string, OpenApiSpecPathOperationResponseHeader>;
}
