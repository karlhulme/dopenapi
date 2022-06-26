import { OpenApiSpecInfo } from "./OpenApiSpecInfo.ts";
import { OpenApiSpecServer } from "./OpenApiSpecServer.ts";
import { OpenApiSpecPath } from "./OpenApiSpecPath.ts";
import { OpenApiSpecComponents } from "./OpenApiSpecComponents.ts";

export interface OpenApiSpec {
  openapi: "3.0.3";
  info: OpenApiSpecInfo;
  servers?: OpenApiSpecServer[];
  paths: Record<string, OpenApiSpecPath>;
  components: OpenApiSpecComponents;
}
