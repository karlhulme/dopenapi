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
        post: {
          operationId: "doAction",
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
