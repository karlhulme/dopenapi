import { OpenApiSpec } from "../interfaces/index.ts";
import { generateTypescript, parseYaml } from "../../deps.ts";
import { convertSpecToTree } from "./convertSpecToTree.ts";

export function convertSpecToClientCode(openApi: string): string {
  const openApiSpec = parseYaml(openApi) as OpenApiSpec;

  const tree = convertSpecToTree(openApiSpec);

  return generateTypescript(tree);
}
