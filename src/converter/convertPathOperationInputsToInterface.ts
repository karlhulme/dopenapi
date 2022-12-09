import { TypescriptTreeInterface } from "../../deps.ts";
import {
  OpenApiSpecPath,
  OpenApiSpecPathOperation,
} from "../interfaces/index.ts";
import { capitalizeFirstLetter } from "../utils/index.ts";
import { determineTypeNameForOperationPathSchema } from "./determineTypeNameForOperationPathSchema.ts";
import { requestHeadersToIgnore } from "./headersToIgnore.ts";
import { isOperationUsingApiKey } from "./isOperationUsingApiKey.ts";

/**
 * Converts the given operation details into an interface.
 * @param path An operation path.
 * @param op An operation.
 */
export function convertPathOperationInputsToInterface(
  path: OpenApiSpecPath,
  op: OpenApiSpecPathOperation,
): TypescriptTreeInterface {
  const propsParamName = `${capitalizeFirstLetter(op.operationId)}Props`;

  const iface: TypescriptTreeInterface = {
    name: propsParamName,
    exported: true,
    deprecated: Boolean(op.deprecated),
    comment: op.summary,
    members: [{
      name: "baseUrl",
      typeName: "string",
      comment: "The base url for the service.",
    }],
  };

  for (const pathParam of path.parameters) {
    if (pathParam.in === "path") {
      iface.members.push({
        name: pathParam.name,
        typeName: determineTypeNameForOperationPathSchema(pathParam.schema),
        comment: pathParam.description,
        deprecated: Boolean(pathParam.deprecated),
        optional: false,
      });
    }
  }

  for (const param of op.parameters) {
    if (
      (param.in === "header" && !requestHeadersToIgnore.includes(param.name)) ||
      param.in === "query"
    ) {
      iface.members.push({
        name: param.name,
        typeName: determineTypeNameForOperationPathSchema(param.schema),
        comment: param.description,
        deprecated: Boolean(param.deprecated),
        optional: !param.required,
      });
    }
  }

  if (isOperationUsingApiKey(op)) {
    iface.members.push({
      name: "x-api-key",
      typeName: "string",
      comment: "The API key.",
      optional: false,
    });
  }

  if (op.requestBody) {
    iface.members.push({
      name: "body",
      typeName: determineTypeNameForOperationPathSchema(
        op.requestBody.content["application/json"].schema,
      ),
      comment: "The body of the request.",
    });
  }

  return iface;
}
