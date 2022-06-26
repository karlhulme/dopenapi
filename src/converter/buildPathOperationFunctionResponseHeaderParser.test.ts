import { assertEquals, assertThrows } from "../../deps.ts";
import { buildPathOperationFunctionResponseHeaderParser } from "./buildPathOperationFunctionResponseHeaderParser.ts";

Deno.test("Build a response header parser for a required string.", () => {
  const block = buildPathOperationFunctionResponseHeaderParser(
    "test-header",
    {
      schema: {
        type: "string",
      },
      description: "The header.",
      required: true,
    },
  );

  assertEquals(
    block,
    `result["test-header"] = response.headers.get("test-header") as string;`,
  );
});

Deno.test("Build a response header parser for an optional number.", () => {
  const block = buildPathOperationFunctionResponseHeaderParser(
    "test-header",
    {
      schema: {
        type: "number",
      },
      description: "The header.",
    },
  );

  assertEquals(
    block,
    `if (response.headers.has("test-header")) {\n` +
      `result["test-header"] = parseFloat(response.headers.get("test-header"));\n` +
      "}",
  );
});

Deno.test("Build a response header parser for a required boolean.", () => {
  const block = buildPathOperationFunctionResponseHeaderParser(
    "test-header",
    {
      schema: {
        type: "boolean",
      },
      description: "The header.",
      required: true,
    },
  );

  assertEquals(
    block,
    `result["test-header"] = response.headers.get("test-header") === "true";`,
  );
});

Deno.test("Fail to build a response header parser for a non-JSON type.", () => {
  assertThrows(() =>
    buildPathOperationFunctionResponseHeaderParser(
      "test-header",
      {
        schema: {
          $ref: "#/components/schemas/SomeType",
        },
        description: "The header.",
        required: true,
      },
    )
  );
});
