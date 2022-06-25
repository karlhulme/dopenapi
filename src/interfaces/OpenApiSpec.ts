export interface OpenApiSpec {
  openapi: "3.0.3";
  info: OpenApiSpecInfo;
  servers?: OpenApiSpecServer[];
  paths: Record<string, OpenApiSpecPath>;
  components: OpenApiSpecComponents;
}

export interface OpenApiSpecInfo {
  title: string;
  description?: string;
  termsOfService?: string;
  version: string;
}

export interface OpenApiSpecServer {
  url: string;
  description?: string;
}

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

export interface OpenApiSpecPathOperationParameter {
  name: string;
  in: "path" | "query" | "header" | "cookie";
  description?: string;
  required: boolean;
  deprecated?: boolean;
  schema: OpenApiSpecPathOperationSchema;
}

/**
 * Represents schemas defined as part of a path operation.
 * They must be simple types, references to schemas defined
 * in the schemas section, or array versions of the same.
 */
export interface OpenApiSpecPathOperationSchema {
  $ref?: string;
  type?: "string" | "number" | "array";
  title?: string;
  description?: string;
  items?: OpenApiSpecPathOperationSchemaItem;
}

export interface OpenApiSpecPathOperationSchemaItem {
  $ref?: string;
  type?: "string" | "number" | "boolean";
}

export interface OpenApiSpecPathOperation {
  summary?: string;
  description?: string;
  deprecated?: boolean;
  tags: string[];
  operationId: string;
  parameters: OpenApiSpecPathOperationParameter[];
  requestBody?: OpenApiSpecPathOperationRequestBody;
  responses: Record<string, OpenApiSpecPathResponse>;
  security: Record<string, unknown[]>[];
}

export interface OpenApiSpecPathOperationRequestBody {
  content: OpenApiSpecPathContent;
}

export interface OpenApiSpecPathContent {
  "application/json": OpenApiSpecPathContentMime;
}

export interface OpenApiSpecPathContentMime {
  schema: OpenApiSpecPathOperationSchema;
}

export interface OpenApiSpecPathResponse {
  description: string;
  content?: OpenApiSpecPathContent;
  headers?: Record<string, OpenApiSpecPathResponseHeader>;
}

export interface OpenApiSpecPathResponseHeader {
  description: string;
  deprecated?: boolean;
  schema: OpenApiSpecPathOperationSchema;
  required?: boolean;
}

export interface OpenApiSpecComponents {
  schemas: Record<string, OpenApiSpecSchema>;
  securitySchemes: OpenApiSpecComponentsSecuritySchemes;
}

/**
 * Represents a schema that can be converted to either
 * an interface or an enum declaration.
 */
export interface OpenApiSpecSchema {
  type: "object" | "string";
  title?: string;
  enum?: string[];
  description?: string;
  deprecated?: boolean;
  properties?: Record<string, OpenApiSpecSchemaProperty>;
  required?: string[];
}

/**
 * Represents a property of a schema object.
 * You must specify either $ref or type.  If you specify type=array
 * then you must specify the items property.
 */
export interface OpenApiSpecSchemaProperty {
  $ref?: string;
  type?: "string" | "number" | "boolean" | "object" | "array";
  title?: string;
  description?: string;
  deprecated?: boolean;
  nullable?: boolean;
  items?: OpenApiSpecSchemaPropertyItem;
}

/**
 * Represents the type of item of a schema object array property.
 * You must specify either $ref or type.
 */
export interface OpenApiSpecSchemaPropertyItem {
  $ref?: string;
  type?: "string" | "number" | "boolean" | "object";
}

export interface OpenApiSpecComponentsSecuritySchemes {
  apiKeyAuth?: OpenApiSpecComponentsSecuritySchemesApiKey;
}

export interface OpenApiSpecComponentsSecuritySchemesApiKey {
  type: "apiKey";
  in: "query" | "header";
  name: string;
}
