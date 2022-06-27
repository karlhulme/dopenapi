import { OpenApiSpecInfo } from "./OpenApiSpecInfo.ts";
import { OpenApiSpecServer } from "./OpenApiSpecServer.ts";
import { OpenApiSpecPath } from "./OpenApiSpecPath.ts";
import { OpenApiSpecComponents } from "./OpenApiSpecComponents.ts";

/**
 * Represents an OpenAPI specification.
 */
export interface OpenApiSpec {
  /**
   * The version number of the specification.
   */
  openapi: "3.0.3";

  /**
   * The information about the service.
   */
  info: OpenApiSpecInfo;

  /**
   * An array of servers.
   */
  servers?: OpenApiSpecServer[];

  /**
   * The paths supported by the service.
   */
  paths: Record<string, OpenApiSpecPath>;

  /**
   * The components referenced by the path requests and responses.
   */
  components: OpenApiSpecComponents;
}
