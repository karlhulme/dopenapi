import { assertEquals } from "../../deps.ts";
import { isOperationUsingApiKey } from "./isOperationUsingApiKey.ts";

Deno.test("Detect when an operation is using an API key.", () => {
  const actual = isOperationUsingApiKey({
    operationId: "test",
    parameters: [],
    responses: {},
    security: [{
      apiKeyAuth: [],
    }],
    tags: [],
  });

  assertEquals(actual, true);
});

Deno.test("Detect when an operation is not using an API key.", () => {
  const actual = isOperationUsingApiKey({
    operationId: "test",
    parameters: [],
    responses: {},
    security: [],
    tags: [],
  });

  assertEquals(actual, false);
});
