import { TypescriptTreeInterface } from "../../deps.ts";
import {
  OpenApiSpecPath,
  OpenApiSpecPathOperation,
} from "../interfaces/index.ts";
import { capitalizeFirstLetter } from "../utils/index.ts";
import { convertPathSchemaToTypeName } from "./convertPathSchemaToTypeName.ts";

export function convertPathOperationInputsToInterface(
  path: OpenApiSpecPath,
  op: OpenApiSpecPathOperation,
): TypescriptTreeInterface {
  const propsParamName = `${capitalizeFirstLetter(op.operationId)}Props`;

  const iface: TypescriptTreeInterface = {
    name: propsParamName,
    exported: true,
    deprecated: op.deprecated,
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
        typeName: convertPathSchemaToTypeName(pathParam.schema),
        comment: pathParam.description,
        deprecated: pathParam.deprecated,
        optional: false,
      });
    }
  }

  for (const param of op.parameters) {
    if (param.in === "header" || param.in === "query") {
      iface.members.push({
        name: param.name,
        typeName: convertPathSchemaToTypeName(param.schema),
        comment: param.description,
        deprecated: param.deprecated,
        optional: !param.required,
      });
    }
  }

  if (op.requestBody) {
    iface.members.push({
      name: "body",
      typeName: convertPathSchemaToTypeName(
        op.requestBody.content["application/json"].schema,
      ),
      comment: "The body of the request.",
    });
  }

  return iface;
}
