import { assertEquals } from "../../deps.ts";
import { buildPathOperationFunction } from "./buildPathOperationFunction.ts";

Deno.test("Generate typescript operation tree for fetch function.", () => {
  const op = buildPathOperationFunction(
    "http://localhost:1234",
    "post",
    {
      operationId: "testOp",
      parameters: [],
      responses: {
        "2XX": {
          description: "Success.",
        },
      },
      security: [],
      tags: [],
    },
    {
      schemas: {},
      securitySchemes: {},
    },
  );

  op.lines = "";
  assertEquals(
    op,
    {
      async: true,
      comment: undefined,
      exported: true,
      lines: "",
      name: "testOp",
      params: [
        {
          comment: "A property bag of inputs for the service call.",
          name: "props",
          optional: false,
          typeName: "TestOpProps",
        },
        {
          comment:
            "The properties to be passed to the underlying fetch function.",
          name: "options",
          optional: true,
          typeName: "RequestInit",
        },
      ],
      returnType: "Promise<TestOpResult>",
    },
  );
});
