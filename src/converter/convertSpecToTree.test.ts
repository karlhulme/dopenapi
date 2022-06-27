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
        SomeType: {
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
        SomeEnum: {
          type: "string",
          enum: ["foo", "bar"],
        },
      },
      securitySchemes: {},
    },
  });

  assertEquals(
    Boolean(tree.interfaces.find((iface) => iface.name === "SomeType")),
    true,
  );

  assertEquals(
    Boolean(tree.enumConstArrays.find((e) => e.name === "SomeEnum")),
    true,
  );
});
