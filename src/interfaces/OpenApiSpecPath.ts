import { OpenApiSpecPathOperationParameter } from "./OpenApiSpecPathOperationParameter.ts";
import { OpenApiSpecPathOperation } from "./OpenApiSpecPathOperation.ts";

export interface OpenApiSpecPath {
  summary?: string;
  description?: string;
  parameters: OpenApiSpecPathOperationParameter[];
  delete?: OpenApiSpecPathOperation;
  get?: OpenApiSpecPathOperation;
  patch?: OpenApiSpecPathOperation;
  post?: OpenApiSpecPathOperation;
  put?: OpenApiSpecPathOperation;
}
