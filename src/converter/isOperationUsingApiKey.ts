import { OpenApiSpecPathOperation } from "../interfaces/index.ts";

/**
 * Returns true if the operation is using an API key.
 * @param op An operation.
 */
export function isOperationUsingApiKey(op: OpenApiSpecPathOperation) {
  for (const security of op.security) {
    if (security["apiKeyAuth"]) {
      return true;
    }
  }

  return false;
}
