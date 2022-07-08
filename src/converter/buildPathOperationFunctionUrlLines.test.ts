import { assertEquals } from "../../deps.ts";
import { buildPathOperationFunctionUrlLines } from "./buildPathOperationFunctionUrlLines.ts";

function fixBlock(block: string) {
  // Remove typescript types.
  let result = block.replace(": string[]", "");

  // Add return statement.
  result += "return url;";

  return result;
}

Deno.test("Generate a url function.", () => {
  const block = buildPathOperationFunctionUrlLines(
    "/test/path",
    {
      operationId: "testOp",
      parameters: [],
      responses: {},
      security: [],
      tags: [],
    },
  );

  const fn = new Function("props", fixBlock(block));

  const url = fn({
    baseUrl: "http://localhost:2000",
  });

  assertEquals(url, "http://localhost:2000/test/path");
});

Deno.test("Generate a url function with a path parameter.", () => {
  const block = buildPathOperationFunctionUrlLines(
    "/test/path/{id}",
    {
      operationId: "testOp",
      parameters: [],
      responses: {},
      security: [],
      tags: [],
    },
  );

  const fn = new Function("props", fixBlock(block));

  const url = fn({
    baseUrl: "http://localhost:2000",
    id: "123",
  });

  assertEquals(url, "http://localhost:2000/test/path/123");
});

Deno.test("Generate a url function with a custom verb.", () => {
  const block = buildPathOperationFunctionUrlLines(
    "/test/path/{id}:extend",
    {
      operationId: "testOp",
      parameters: [],
      responses: {},
      security: [],
      tags: [],
    },
  );

  const fn = new Function("props", fixBlock(block));

  const url = fn({
    baseUrl: "http://localhost:2000",
    id: "123",
  });

  assertEquals(url, "http://localhost:2000/test/path/123:extend");
});

Deno.test("Generate a url function with support for query params.", () => {
  const block = buildPathOperationFunctionUrlLines(
    "/test/path/{id}",
    {
      operationId: "testOp",
      parameters: [{
        in: "query",
        name: "limit",
        required: false,
        schema: {
          type: "number",
        },
      }],
      responses: {},
      security: [],
      tags: [],
    },
  );

  const fn = new Function("props", fixBlock(block));

  const urlWithQueryParam = fn({
    baseUrl: "http://localhost:2000",
    id: "123",
    limit: 20,
  });

  assertEquals(
    urlWithQueryParam,
    "http://localhost:2000/test/path/123?limit=20",
  );

  const urlWithoutQueryParam = fn({
    baseUrl: "http://localhost:2000",
    id: "123",
  });

  assertEquals(
    urlWithoutQueryParam,
    "http://localhost:2000/test/path/123",
  );
});
