import { assertEquals } from "../../deps.ts";
import { convertSpecToTree } from "./convertSpecToTree.ts";

Deno.test("Convert an openapi specification object to a typescript tree.", () => {
  const tree = convertSpecToTree({
    openapi: "3.0.3",
    info: {
      title: "Test service",
      version: "1.0.0",
    },
    paths: {
      "/resource": {
        parameters: [],
        delete: {
          operationId: "doDelete",
          summary: "Performs an action.",
          tags: ["Test"],
          parameters: [],
          responses: {
            "204": {
              description: "Success.",
            },
          },
          security: [],
        },
        get: {
          operationId: "doGet",
          summary: "Performs an action.",
          tags: ["Test"],
          parameters: [],
          responses: {
            "200": {
              description: "Success.",
            },
          },
          security: [],
        },
        patch: {
          operationId: "doPatch",
          summary: "Performs an action.",
          tags: ["Test"],
          parameters: [],
          responses: {
            "200": {
              description: "Success.",
            },
          },
          security: [],
        },
        post: {
          operationId: "doPost",
          summary: "Performs an action.",
          tags: ["Test"],
          parameters: [],
          responses: {
            "201": {
              description: "Success.",
            },
          },
          security: [],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/SomeType",
                },
              },
            },
          },
        },
        put: {
          operationId: "doPut",
          summary: "Performs an action.",
          tags: ["Test"],
          parameters: [],
          responses: {
            "200": {
              description: "Success.",
            },
          },
          security: [],
        },
      },
    },
    components: {
      schemas: {
        SomeNumber: {
          type: "number",
          description: "A number.",
        },
        SomeBoolean: {
          type: "boolean",
          description: "A boolean.",
        },
        SomeString: {
          type: "string",
          description: "A string.",
        },
        SomeObject: {
          type: "object",
          description: "The request body for the operation.",
          properties: {
            param1: {
              type: "string",
            },
            param2: {
              type: "number",
            },
          },
        },
        SomeGenericObject: {
          type: "object",
          description: "A generic object.",
        },
        SomeArray: {
          type: "array",
          description: "An array.",
          items: {
            $ref: "string",
          },
        },
        SomeGenericArray: {
          type: "array",
          description: "A generic array.",
        },
        SomeEnum: {
          type: "string",
          enum: ["foo", "bar"],
        },
      },
      securitySchemes: {},
    },
  });

  assertEquals(
    Boolean(tree.types.find((t) => t.name === "SomeNumber")),
    true,
  );

  assertEquals(
    Boolean(tree.types.find((t) => t.name === "SomeBoolean")),
    true,
  );

  assertEquals(
    Boolean(tree.types.find((t) => t.name === "SomeString")),
    true,
  );

  assertEquals(
    Boolean(tree.interfaces.find((iface) => iface.name === "SomeObject")),
    true,
  );

  assertEquals(
    Boolean(tree.types.find((t) => t.name === "SomeGenericObject")),
    true,
  );

  assertEquals(
    Boolean(tree.types.find((t) => t.name === "SomeArray")),
    true,
  );

  assertEquals(
    Boolean(tree.types.find((t) => t.name === "SomeGenericArray")),
    true,
  );

  assertEquals(
    Boolean(tree.enumConstArrays.find((e) => e.name === "SomeEnum")),
    true,
  );
});
