import { TypescriptTreeFunction } from "../../deps.ts";

/**
 * Builds a typescript IETF 7087 problem function.
 */
export function buildProblemParserFunction(): TypescriptTreeFunction {
  const func: TypescriptTreeFunction = {
    name: "parseIETF7087Problem",
    comment: "Parses an IETF 7087 problem.",
    async: true,
    exported: true,
    params: [{
      name: "response",
      typeName: "Response",
      comment: "A response from a service call.",
    }],
    lines: `
      try {
        const {
          status: problemCode,
          type: problemType,
          detail: problemDetail,
          ...problemProperties } = await response.json();
        
        return new ServiceCallProblemError(
          problemCode,
          problemType,
          problemDetail,
          problemProperties
        )
      } catch {
        return new ServiceCallProblemError(
          -1,
          "internal/unparseable-problem",
          "Unable to parse the problem structure.",
          {}
        )
      }
    `,
    returnType: "Promise<ServiceCallProblemError>",
  };

  return func;
}
