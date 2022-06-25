import { OpenApiSpecPathOperation } from "../interfaces/index.ts";

export function isOperationUsingApiKey(op: OpenApiSpecPathOperation) {
  for (const security of op.security) {
    if (security["apiKeyAuth"]) {
      return true;
    }
  }

  return false;
}
