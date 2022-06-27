import { TypescriptTreeFunction } from "../../deps.ts";
import {
  OpenApiSpecPath,
  OpenApiSpecPathOperation,
} from "../interfaces/index.ts";
import { capitalizeFirstLetter } from "../utils/index.ts";
import { buildPathOperationFunctionRequestLines } from "./buildPathOperationFunctionRequestLines.ts";
import { buildPathOperationFunctionResponseLines } from "./buildPathOperationFunctionResponseLines.ts";
import { buildPathOperationFunctionUrlLines } from "./buildPathOperationFunctionUrlLines.ts";
import { buildPathOperationFunctionValidationLines } from "./buildPathOperationFunctionValidationLines.ts";

/**
 * Builds a typescript path operation function.
 * @param pathUrl A url.
 * @param path An OpenAPI spec path.
 * @param method The HTTP verb method.
 * @param op The OpenAPI operation.
 */
export function buildPathOperationFunction(
  pathUrl: string,
  path: OpenApiSpecPath,
  method: string,
  op: OpenApiSpecPathOperation,
): TypescriptTreeFunction {
  const propsParamName = `${capitalizeFirstLetter(op.operationId)}Props`;
  const resultTypeName = `Promise<${
    capitalizeFirstLetter(op.operationId)
  }Result>`;

  const func: TypescriptTreeFunction = {
    name: op.operationId,
    async: true,
    comment: op.summary,
    exported: true,
    params: [{
      name: "props",
      typeName: propsParamName,
      comment: "A property bag of inputs for the service call.",
      optional: false,
    }, {
      name: "options",
      typeName: "RequestInit",
      comment: "The properties to be passed to the underlying fetch function.",
      optional: true,
    }],
    lines: "",
    returnType: resultTypeName,
  };

  func.lines += buildPathOperationFunctionUrlLines(pathUrl, path);

  func.lines += "try {\n";
  func.lines += buildPathOperationFunctionRequestLines(method, op) + "\n";
  func.lines += buildPathOperationFunctionValidationLines(op) + "\n";
  func.lines += buildPathOperationFunctionResponseLines(op) + "\n";
  func.lines += "} catch (err) {\n";
  func.lines += "const e = err as Error;\n";
  func.lines +=
    "throw new Error(`Service call failed to ${url}\n${e.name}: ${e.message}.`)\n";
  func.lines += "}\n";

  return func;
}
