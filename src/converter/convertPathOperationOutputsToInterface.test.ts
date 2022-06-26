import { assertEquals } from "../../deps.ts";
import { OpenApiSpecPathOperation } from "../interfaces/index.ts";
import { convertPathOperationOutputsToInterface } from "./convertPathOperationOutputsToInterface.ts";

function createTestOp(): OpenApiSpecPathOperation {
  return {
    operationId: "test",
    parameters: [],
    responses: {},
    security: [],
    tags: [],
    summary: "A summary.",
    deprecated: false,
  };
}

Deno.test("Create an output interface for an operation with no response body.", () => {
  const iface = convertPathOperationOutputsToInterface({
    parameters: [],
  }, {
    ...createTestOp(),
    responses: {
      "2XX": {
        description: "Success.",
      },
    },
  });

  assertEquals(iface, {
    exported: true,
    comment: "A summary.",
    deprecated: false,
    members: [{
      comment: "The HTTP status code returned.",
      name: "status",
      typeName: "number",
    }],
    name: "TestResult",
  });
});

Deno.test("Create an output interface for an operation with a response body.", () => {
  const iface = convertPathOperationOutputsToInterface({
    parameters: [],
  }, {
    ...createTestOp(),
    responses: {
      "2XX": {
        description: "Success.",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/SomeType",
            },
          },
        },
      },
    },
  });

  assertEquals(iface, {
    exported: true,
    comment: "A summary.",
    deprecated: false,
    members: [{
      comment: "The HTTP status code returned.",
      name: "status",
      typeName: "number",
    }, {
      comment: "The body of the response.",
      name: "body",
      typeName: "SomeType",
    }],
    name: "TestResult",
  });
});

Deno.test("Create an output interface for an operation with response headers.", () => {
  const iface = convertPathOperationOutputsToInterface({
    parameters: [],
  }, {
    ...createTestOp(),
    responses: {
      "2XX": {
        description: "Success.",
        headers: {
          "x-test-header": {
            description: "A test header.",
            schema: {
              type: "string",
            },
            required: true,
            deprecated: true,
          },
        },
      },
    },
  });

  assertEquals(iface, {
    exported: true,
    comment: "A summary.",
    deprecated: false,
    members: [{
      comment: "The HTTP status code returned.",
      name: "status",
      typeName: "number",
    }, {
      comment: "A test header.",
      name: "x-test-header",
      typeName: "string",
      optional: false,
      deprecated: true,
    }],
    name: "TestResult",
  });
});
