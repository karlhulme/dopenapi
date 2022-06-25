import { 
  OpenApiSpecPathOperation,
  OpenApiSpecPathResponse,
} from '../interfaces/index.ts';

/**
 * The array of REST success codes that the
 * library recognises.
 */
export const successCodes = ["2XX", "200", "201", "202", "203", "204"]

/**
 * Returns the success response for the given operation.
 * @param op An OpenAPI operation.
 */
export function getOperationSuccessResponse (op: OpenApiSpecPathOperation) {
  let response: OpenApiSpecPathResponse|null = null;

  for (const possSuccessCode of successCodes) {
    if (op.responses[possSuccessCode]) {
      response = op.responses[possSuccessCode];
    }
  }

  if (!response) {
    throw new Error(`Unable to find success response for ${op.operationId}.`)
  }

  return response;
}
