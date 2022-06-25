import { TypescriptTreeInterface } from "../../deps.ts";
import {
  OpenApiSpecPath,
  OpenApiSpecPathOperation,
} from "../interfaces/index.ts";
import { capitalizeFirstLetter } from "../utils/index.ts";
import { convertPathSchemaToTypeName } from "./convertPathSchemaToTypeName.ts";
import { getOperationSuccessResponse } from "./getOperationSuccessResponse.ts";

export function convertPathOperationOutputsToInterface(
  _path: OpenApiSpecPath,
  op: OpenApiSpecPathOperation,
): TypescriptTreeInterface {
  const propsParamName = `${capitalizeFirstLetter(op.operationId)}Props`;

  const iface: TypescriptTreeInterface = {
    name: propsParamName,
    exported: true,
    deprecated: op.deprecated,
    comment: op.summary,
    members: [{
      name: "status",
      typeName: "number",
      comment: "The HTTP status code returned.",
    }],
  };

  const response = getOperationSuccessResponse(op);

  if (response.content?.["application/json"].schema) {
    const responseSchema = response.content?.["application/json"].schema;

    iface.members.push({
      name: "body",
      typeName: convertPathSchemaToTypeName(responseSchema),
      comment: "The body of the response.",
    });
  }

  if (response.headers) {
    for (const headerName in response.headers) {
      const header = response.headers[headerName];

      iface.members.push({
        name: headerName,
        typeName: convertPathSchemaToTypeName(header.schema),
        comment: header.description,
        deprecated: header.deprecated,
        optional: !header.required,
      });
    }
  }

  return iface;
}
