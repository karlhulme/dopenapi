import { newTypescriptTree, TypescriptTree } from "../../deps.ts";
import { OpenApiSpec, OpenApiSpecPathOperation } from "../interfaces/index.ts";
import { convertSchemaToInterface } from "./convertSchemaToInterface.ts";
import { convertSchemaToEnumConstArray } from './convertSchemaToEnumConstArray.ts';
import { convertPathOperationInputsToInterface } from './convertPathOperationInputsToInterface.ts'
import { convertPathOperationOutputsToInterface } from './convertPathOperationOutputsToInterface.ts'
import { convertPathOperationCallToFunction } from './convertPathOperationCallToFunction.ts'

/**
 * Returns a string that contains Typescript declarations
 * that can be written to a typescript (.ts) file.
 * @param spec An OpenAPI spec.
 */
export function convertSpecToTree(spec: OpenApiSpec): TypescriptTree {
  const tree = newTypescriptTree();

  // Prevent lint errors for auto-generated file.
  tree.lintDirectives.banUnusedIgnore = true;
  tree.lintDirectives.noEmptyInterface = true;
  tree.lintDirectives.noExplicitAny = true;
  tree.lintDirectives.noUnusedVars = true;

  // Add error for transitory failures.
  tree.errors.push({
    name: "ServiceCallTransitoryError",
    comment: "Raised when a service call fails but may succeed if tried again.",
    exported: true,
    superMessage: "`Service call failed for transitory reason: ${status}.`",
    parameters: [{
      name: "status",
      typeName: "number"
    }]
  })

  // Generate interfaces for schemas.
  for (const schemaName in spec.components.schemas) {
    const schema = spec.components.schemas[schemaName];

    if (schema.type === "object") {
      tree.interfaces.push(convertSchemaToInterface(schemaName, schema));
    } else if (schema.type === "string") {
      tree.enumConstArrays.push(convertSchemaToEnumConstArray(schemaName, schema))
    }
  }

  // Now work through all the paths and their associated operations.
  for (const pathUrl in spec.paths) {
    const path = spec.paths[pathUrl];

    const methodOps: { method: string, op: OpenApiSpecPathOperation }[] = [];

    if (path.delete) methodOps.push({ method: 'delete', op: path.delete });
    if (path.get) methodOps.push({ method: 'get', op: path.get });
    if (path.patch) methodOps.push({ method: 'patch', op: path.patch });
    if (path.post) methodOps.push({ method: 'post', op: path.post });
    if (path.put) methodOps.push({ method: 'put', op: path.put });

    for (const methodOp of methodOps) {
      // Create an interface to represent the inputs (headers, query, path and body).
      tree.interfaces.push(
        convertPathOperationInputsToInterface(
          path,
          methodOp.op
        )
      )

      // Create an interface to represent the outputs (headers and body).
      tree.interfaces.push(
        convertPathOperationOutputsToInterface(
          path,
          methodOp.op
        )
      )

      // Create functions for calling the operations that accept
      // typed inputs and return typed outpus.
      tree.functions.push(
        convertPathOperationCallToFunction(
          pathUrl,
          path,
          methodOp.method,
          methodOp.op
        )
      )
    }
  }

  return tree;
}
