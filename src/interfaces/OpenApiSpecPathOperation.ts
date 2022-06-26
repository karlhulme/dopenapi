import { OpenApiSpecPathOperationParameter } from "./OpenApiSpecPathOperationParameter.ts";
import { OpenApiSpecPathOperationRequestBody } from "./OpenApiSpecPathOperationRequestBody.ts";
import { OpenApiSpecPathOperationResponse } from "./OpenApiSpecPathOperationResponse.ts";

export interface OpenApiSpecPathOperation {
  summary?: string;
  description?: string;
  deprecated?: boolean;
  tags: string[];
  operationId: string;
  parameters: OpenApiSpecPathOperationParameter[];
  requestBody?: OpenApiSpecPathOperationRequestBody;
  responses: Record<string, OpenApiSpecPathOperationResponse>;
  security: Record<string, unknown[]>[];
}
