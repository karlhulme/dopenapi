import { TypescriptTreeFunction } from "../../deps.ts";
import {
  OpenApiSpecComponents,
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
 * @param method The HTTP verb method.
 * @param op The OpenAPI operation.
 * @param components The OpenAPI components.
 */
export function buildPathOperationFunction(
  pathUrl: string,
  method: string,
  op: OpenApiSpecPathOperation,
  components: OpenApiSpecComponents,
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

  func.lines += buildPathOperationFunctionUrlLines(pathUrl, op);
  func.lines += buildPathOperationFunctionRequestLines(method, op) + "\n";
  func.lines += buildPathOperationFunctionValidationLines(op) + "\n";
  func.lines += buildPathOperationFunctionResponseLines(op, components) + "\n";

  return func;
}
