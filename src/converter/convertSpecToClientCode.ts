import { OpenApiSpec } from "../interfaces/index.ts";
import { generateTypescript, parseYaml } from "../../deps.ts";
import { convertSpecToTree } from "./convertSpecToTree.ts";

/**
 * Returns the Typescript code for accessing the service described
 * by the given openApi specification.
 * @param openApi An OpenAPI spec defined as a YAML string.
 */
export function convertSpecToClientCode(openApi: string): string {
  const openApiSpec = parseYaml(openApi) as OpenApiSpec;

  const tree = convertSpecToTree(openApiSpec);

  return generateTypescript(tree);
}
