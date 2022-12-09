import { assertEquals, assertThrows } from "../../deps.ts";
import { buildPathOperationFunctionResponseHeaderParser } from "./buildPathOperationFunctionResponseHeaderParser.ts";

Deno.test("Build a response header parser for a required string.", () => {
  const block = buildPathOperationFunctionResponseHeaderParser(
    "test-header",
    {
      schema: {
        $ref: "testString",
      },
      description: "The header.",
      required: true,
    },
    {
      schemas: {
        testString: {
          type: "string",
        },
      },
      securitySchemes: {},
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
        $ref: "testNumber",
      },
      description: "The header.",
    },
    {
      schemas: {
        testNumber: {
          type: "number",
        },
      },
      securitySchemes: {},
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
        $ref: "testBoolean",
      },
      description: "The header.",
      required: true,
    },
    {
      schemas: {
        testBoolean: {
          type: "boolean",
        },
      },
      securitySchemes: {},
    },
  );

  assertEquals(
    block,
    `result["test-header"] = ["true", "TRUE", "1"].includes(response.headers.get("test-header"));`,
  );
});

Deno.test("Fail to build a response header parser for an unknown type.", () => {
  assertThrows(() =>
    buildPathOperationFunctionResponseHeaderParser(
      "test-header",
      {
        schema: {
          $ref: "testUnknown",
        },
        description: "The header.",
        required: true,
      },
      {
        schemas: {},
        securitySchemes: {},
      },
    )
  );
});

Deno.test("Fail to build a response header parser for a non-JSON type.", () => {
  assertThrows(() =>
    buildPathOperationFunctionResponseHeaderParser(
      "test-header",
      {
        schema: {
          $ref: "testObj",
        },
        description: "The header.",
        required: true,
      },
      {
        schemas: {
          testObj: {
            type: "object",
          },
        },
        securitySchemes: {},
      },
    )
  );
});
