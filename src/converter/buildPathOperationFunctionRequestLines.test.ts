import { assertEquals } from "../../deps.ts";
import { buildPathOperationFunctionRequestLines } from "./buildPathOperationFunctionRequestLines.ts";

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

function fixBlock(block: string) {
  return block
    .replace(": Record<string, string>", "")
    .replace(": Response", "")
    .replace(" as Error", "");
}

Deno.test("Generate request lines including headers and API key.", async () => {
  const block = buildPathOperationFunctionRequestLines(
    "post",
    {
      operationId: "testOp",
      parameters: [{
        name: "x-test-header",
        in: "header",
        required: true,
        schema: {
          type: "string",
        },
        description: "My test header.",
      }, {
        name: "x-omitted-optional-header",
        in: "header",
        required: false,
        schema: {
          type: "string",
        },
      }, {
        name: "x-specified-optinal-header",
        in: "header",
        required: false,
        schema: {
          type: "string",
        },
      }],
      responses: {},
      security: [{
        apiKeyAuth: [],
      }],
      tags: [],
    },
  );

  const fn = new AsyncFunction(
    "props",
    "fetch",
    "url",
    "options",
    fixBlock(block) + "return response;\n",
  );

  const output = await fn(
    {
      "x-api-key": "secret",
      "x-test-header": "header1",
      "x-specified-optinal-header": "header2",
    },
    // deno-lint-ignore require-await
    async (url: string, fetchOptions: Record<string, unknown>) => ({
      url,
      fetchOptions,
    }),
    "http://localhost:1234",
    {},
  );

  assertEquals(
    output,
    {
      url: "http://localhost:1234",
      fetchOptions: {
        headers: {
          "x-api-key": "secret",
          "x-test-header": "header1",
          "x-specified-optinal-header": "header2",
        },
        method: "POST",
      },
    },
  );
});

Deno.test("Generate request lines including request body.", async () => {
  const block = buildPathOperationFunctionRequestLines(
    "post",
    {
      operationId: "testOp",
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/SomeType",
            },
          },
        },
      },
      parameters: [],
      responses: {},
      security: [],
      tags: [],
    },
  );

  const fn = new AsyncFunction(
    "props",
    "fetch",
    "url",
    "options",
    fixBlock(block) + "return response;\n",
  );

  const output = await fn(
    {
      "body": {
        foo: "bar",
      },
    },
    // deno-lint-ignore require-await
    async (url: string, fetchOptions: Record<string, unknown>) => ({
      url,
      fetchOptions,
    }),
    "http://localhost:1234",
    {},
  );

  assertEquals(
    output,
    {
      url: "http://localhost:1234",
      fetchOptions: {
        headers: {},
        method: "POST",
        body: `{"foo":"bar"}`,
      },
    },
  );
});
