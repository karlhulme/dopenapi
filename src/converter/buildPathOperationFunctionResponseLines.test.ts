import { assertEquals } from "../../deps.ts";
import { buildPathOperationFunctionResponseLines } from "./buildPathOperationFunctionResponseLines.ts";

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

function fixBlock(block: string) {
  return block
    .replace(": Partial<TestOpResult>", "")
    .replace("as string", "");
}

Deno.test("Generate response handling code.", async () => {
  const block = buildPathOperationFunctionResponseLines({
    operationId: "testOp",
    parameters: [],
    responses: {
      "2XX": {
        description: "Success.",
      },
    },
    security: [],
    tags: [],
  });

  const fn = new AsyncFunction(
    "response",
    fixBlock(block),
  );

  const output = await fn({
    status: 200,
  });

  assertEquals(
    output,
    {
      status: 200,
    },
  );
});

Deno.test("Generate response handling code with a response body.", async () => {
  const block = buildPathOperationFunctionResponseLines({
    operationId: "testOp",
    parameters: [],
    responses: {
      "2XX": {
        description: "Success.",
        content: {
          "application/json": {
            schema: {
              type: "string",
            },
          },
        },
      },
    },
    security: [],
    tags: [],
  });

  const fn = new AsyncFunction(
    "response",
    fixBlock(block),
  );

  const output = await fn({
    status: 200,
    // deno-lint-ignore require-await
    json: async () => "content",
  });

  assertEquals(
    output,
    {
      status: 200,
      body: "content",
    },
  );
});

Deno.test("Generate response handling code with a response headers.", async () => {
  const block = buildPathOperationFunctionResponseLines({
    operationId: "testOp",
    parameters: [],
    responses: {
      "204": {
        description: "Success.",
        headers: {
          "req-header": {
            description: "Required header",
            schema: {
              type: "string",
            },
            required: true,
          },
          "opt-header": {
            description: "Optional header",
            schema: {
              type: "number",
            },
            required: false,
          },
        },
      },
    },
    security: [],
    tags: [],
  });

  const fn = new AsyncFunction(
    "response",
    fixBlock(block),
  );

  const output = await fn({
    status: 204,
    headers: {
      has: () => true,
      get: (headerName: string) =>
        headerName === "req-header" ? "req-header-value" : 123,
    },
  });

  assertEquals(
    output,
    {
      status: 204,
      "req-header": "req-header-value",
      "opt-header": 123,
    },
  );
});
