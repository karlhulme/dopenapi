import { assertEquals } from "../../deps.ts";
import { OpenApiSpecPathOperation } from "../interfaces/index.ts";
import { convertPathOperationInputsToInterface } from "./convertPathOperationInputsToInterface.ts";

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

Deno.test("Create an interface for an operation with no inputs.", () => {
  const iface = convertPathOperationInputsToInterface({
    parameters: [],
  }, createTestOp());

  assertEquals(iface, {
    exported: true,
    comment: "A summary.",
    deprecated: false,
    members: [{
      comment: "The base url for the service.",
      name: "baseUrl",
      typeName: "string",
    }, {
      comment:
        "If true, the time taken to perform the fetch will be logged to the console.",
      name: "logPerformance",
      optional: true,
      typeName: "boolean",
    }],
    name: "TestProps",
  });
});

Deno.test("Create an interface for an operation with path parameters.", () => {
  const iface = convertPathOperationInputsToInterface({
    parameters: [{
      in: "path",
      name: "id",
      required: true,
      schema: {
        type: "string",
      },
      deprecated: false,
      description: "A description.",
    }],
  }, {
    ...createTestOp(),
  });

  assertEquals(iface, {
    exported: true,
    comment: "A summary.",
    deprecated: false,
    members: [{
      comment: "The base url for the service.",
      name: "baseUrl",
      typeName: "string",
    }, {
      comment:
        "If true, the time taken to perform the fetch will be logged to the console.",
      name: "logPerformance",
      optional: true,
      typeName: "boolean",
    }, {
      comment: "A description.",
      name: "id",
      typeName: "string",
      deprecated: false,
      optional: false,
    }],
    name: "TestProps",
  });
});

Deno.test("Create an interface for an operation with header and query parameters.", () => {
  const iface = convertPathOperationInputsToInterface({
    parameters: [],
  }, {
    ...createTestOp(),
    parameters: [{
      in: "header",
      name: "param-1",
      required: false,
      deprecated: false,
      description: "This is param-1.",
      schema: {
        type: "string",
      },
    }, {
      in: "query",
      name: "param2",
      required: true,
      deprecated: false,
      description: "This is param2.",
      schema: {
        type: "number",
      },
    }],
  });

  assertEquals(iface, {
    exported: true,
    comment: "A summary.",
    deprecated: false,
    members: [{
      comment: "The base url for the service.",
      name: "baseUrl",
      typeName: "string",
    }, {
      comment:
        "If true, the time taken to perform the fetch will be logged to the console.",
      name: "logPerformance",
      optional: true,
      typeName: "boolean",
    }, {
      comment: "This is param-1.",
      name: "param-1",
      typeName: "string",
      deprecated: false,
      optional: true,
    }, {
      comment: "This is param2.",
      name: "param2",
      typeName: "number",
      deprecated: false,
      optional: false,
    }],
    name: "TestProps",
  });
});

Deno.test("Create an interface for an operation that uses an API Key.", () => {
  const iface = convertPathOperationInputsToInterface({
    parameters: [],
  }, {
    ...createTestOp(),
    security: [{
      apiKeyAuth: [],
    }],
  });

  assertEquals(iface, {
    exported: true,
    comment: "A summary.",
    deprecated: false,
    members: [{
      comment: "The base url for the service.",
      name: "baseUrl",
      typeName: "string",
    }, {
      comment:
        "If true, the time taken to perform the fetch will be logged to the console.",
      name: "logPerformance",
      optional: true,
      typeName: "boolean",
    }, {
      comment: "The API key.",
      name: "x-api-key",
      optional: false,
      typeName: "string",
    }],
    name: "TestProps",
  });
});

Deno.test("Create an interface for an operation that uses a request body.", () => {
  const iface = convertPathOperationInputsToInterface({
    parameters: [],
  }, {
    ...createTestOp(),
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/SomeType",
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
      comment: "The base url for the service.",
      name: "baseUrl",
      typeName: "string",
    }, {
      comment:
        "If true, the time taken to perform the fetch will be logged to the console.",
      name: "logPerformance",
      optional: true,
      typeName: "boolean",
    }, {
      comment: "The body of the request.",
      name: "body",
      typeName: "SomeType",
    }],
    name: "TestProps",
  });
});
