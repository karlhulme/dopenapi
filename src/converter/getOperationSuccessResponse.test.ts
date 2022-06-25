import { assertEquals, assertThrows } from "../../deps.ts";
import { OpenApiSpecPathOperation } from "../interfaces/index.ts";
import { getOperationSuccessResponse } from "./getOperationSuccessResponse.ts";

Deno.test("Retrieve the successful response from an operation.", () => {
  const successResponse = getOperationSuccessResponse({
    operationId: "test",
    parameters: [],
    responses: {
      "2XX": {
        description: "Success.",
      },
      "400": {
        description: "Failure.",
      },
    },
    security: [],
    tags: [],
  });

  assertEquals(successResponse, {
    description: "Success.",
  });
});

Deno.test("Fail to find successful response from an operation where one is not defined.", () => {
  const testOp: OpenApiSpecPathOperation = {
    operationId: "test",
    parameters: [],
    responses: {
      "400": {
        description: "Failure.",
      },
    },
    security: [],
    tags: [],
  };

  assertThrows(() => getOperationSuccessResponse(testOp));
});
