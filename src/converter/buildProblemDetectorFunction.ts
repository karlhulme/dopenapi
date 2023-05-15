import { TypescriptTreeFunction } from "../../deps.ts";

/**
 * Builds a typescript function to determine if a response
 * contains an IETF 7087 problem.
 */
export function buildProblemDetectorFunction(): TypescriptTreeFunction {
  const func: TypescriptTreeFunction = {
    name: "isIETF7087Problem",
    comment:
      "Returns true if the given response contains an IETF 7087 problem.",
    exported: true,
    params: [{
      name: "response",
      typeName: "Reponse",
      comment: "A response from a service call.",
    }],
    lines: `
      const contentTypeHeader = response.headers.get('content-type') || '';
      return contentTypeHeader.includes('application/problem+json');
    `,
  };

  return func;
}
