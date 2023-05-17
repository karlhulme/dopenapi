import { newTypescriptTree, TypescriptTree } from "../../deps.ts";
import { OpenApiSpec, OpenApiSpecPathOperation } from "../interfaces/index.ts";
import { convertComponentObjectSchemaToInterface } from "./convertComponentObjectSchemaToInterface.ts";
import { convertComponentStringSchemaToEnumConstArray } from "./convertComponentStringSchemaToEnumConstArray.ts";
import { convertPathOperationInputsToInterface } from "./convertPathOperationInputsToInterface.ts";
import { convertPathOperationOutputsToInterface } from "./convertPathOperationOutputsToInterface.ts";
import { buildPathOperationFunction } from "./buildPathOperationFunction.ts";
import { buildProblemDetectorFunction } from "./buildProblemDetectorFunction.ts";
import { buildProblemParserFunction } from "./buildProblemParserFunction.ts";

/**
 * Returns a string that contains Typescript declarations
 * that can be written to a typescript (.ts) file.
 * @param spec An OpenAPI spec.
 */
export function convertSpecToTree(spec: OpenApiSpec): TypescriptTree {
  const tree = newTypescriptTree();

  // Prevent lint errors for auto-generated file.
  tree.lintDirectives.ignoreUnusedIgnore = true;
  tree.lintDirectives.ignoreNoEmptyInterface = true;
  tree.lintDirectives.ignoreNoExplicitAny = true;
  tree.lintDirectives.ignoreNoUnusedVars = true;

  // Add error for transitory failures.
  tree.errors.push({
    name: "ServiceCallTransitoryError",
    comment: "Raised when a service call fails but may succeed if tried again.",
    exported: true,
    superMessage:
      "`Service call failed for transitory reason: ${status} ${message}`",
    parameters: [{
      name: "status",
      typeName: "number",
    }, {
      name: "message",
      typeName: "string",
    }],
  });

  // Add error for IETF 7087 problem errors.
  tree.errors.push({
    name: "ServiceCallProblemError",
    comment:
      "Raised when a service call returns a non-success code and IETF 7087 content.",
    exported: true,
    superMessage:
      "`Service call was rejected: ${code} ${type} ${title} ${detail}`",
    parameters: [{
      name: "code",
      typeName: "number",
    }, {
      name: "type",
      typeName: "string",
    }, {
      name: "title",
      typeName: "string",
    }, {
      name: "detail",
      typeName: "string",
    }, {
      name: "properties",
      typeName: "Record<string, unknown>",
    }],
  });

  // Add error for general rejection and network errors.
  tree.errors.push({
    name: "ServiceCallRejectedError",
    comment:
      "Raised when a service call returns a non-success code and an unrecognised content.",
    exported: true,
    superMessage: "`Service call was rejected: ${status} ${message}`",
    parameters: [{
      name: "status",
      typeName: "number",
    }, {
      name: "message",
      typeName: "string",
    }],
  });

  // Add functions used for problem detection and parsing
  tree.functions.push(buildProblemDetectorFunction());
  tree.functions.push(buildProblemParserFunction());

  // Generate interfaces for schemas.
  for (const schemaName in spec.components.schemas) {
    const schema = spec.components.schemas[schemaName];

    if (schema.type === "number") {
      tree.types.push({
        name: schemaName,
        comment: schema.description,
        def: "number",
      });
    } else if (schema.type === "boolean") {
      tree.types.push({
        name: schemaName,
        comment: schema.description,
        def: "boolean",
      });
    } else if (schema.type === "string") {
      if (Array.isArray(schema.enum)) {
        tree.enumConstArrays.push(
          convertComponentStringSchemaToEnumConstArray(schemaName, schema),
        );
      } else {
        tree.types.push({
          name: schemaName,
          comment: schema.description,
          def: "string",
        });
      }
    } else if (schema.type === "array") {
      if (schema.items && schema.items.$ref) {
        tree.types.push({
          name: schemaName,
          comment: schema.description,
          def: schema.items.$ref.substring(
            schema.items.$ref.lastIndexOf("/") + 1,
          ) + "[]",
        });
      } else {
        tree.types.push({
          name: schemaName,
          comment: schema.description,
          def: "Record<string, unknown>[]",
        });
      }
    } else {
      // Handler for objects
      if (schema.properties) {
        tree.interfaces.push(
          convertComponentObjectSchemaToInterface(schemaName, schema),
        );
      } else {
        tree.types.push({
          name: schemaName,
          comment: schema.description,
          def: "Record<string, unknown>",
        });
      }
    }
  }

  // Now work through all the paths and their associated operations.
  for (const pathUrl in spec.paths) {
    const path = spec.paths[pathUrl];

    const methodOps: { method: string; op: OpenApiSpecPathOperation }[] = [];

    if (path.delete) methodOps.push({ method: "delete", op: path.delete });
    if (path.get) methodOps.push({ method: "get", op: path.get });
    if (path.patch) methodOps.push({ method: "patch", op: path.patch });
    if (path.post) methodOps.push({ method: "post", op: path.post });
    if (path.put) methodOps.push({ method: "put", op: path.put });

    for (const methodOp of methodOps) {
      // Create an interface to represent the inputs (headers, query, path and body).
      tree.interfaces.push(
        convertPathOperationInputsToInterface(
          path,
          methodOp.op,
        ),
      );

      // Create an interface to represent the outputs (headers and body).
      tree.interfaces.push(
        convertPathOperationOutputsToInterface(
          path,
          methodOp.op,
        ),
      );

      // Create functions for calling the operations that accept
      // typed inputs and return typed outpus.
      tree.functions.push(
        buildPathOperationFunction(
          pathUrl,
          methodOp.method,
          methodOp.op,
          spec.components,
        ),
      );
    }
  }

  return tree;
}
