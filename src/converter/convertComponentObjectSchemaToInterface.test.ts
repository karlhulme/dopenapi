import { assertEquals } from "../../deps.ts";
import { convertComponentObjectSchemaToInterface } from "./convertComponentObjectSchemaToInterface.ts";

Deno.test("Create an interface from a component object schema.", () => {
  const iface = convertComponentObjectSchemaToInterface("test", {
    type: "object",
    description: "The description.",
    properties: {
      param1: {
        type: "string",
        description: "param1 description",
        nullable: true,
      },
      param2: {
        type: "array",
        items: {
          $ref: "#/components/schemas/SomeType",
        },
        deprecated: true,
      },
    },
    required: ["param1"],
  });

  assertEquals(iface, {
    name: "test",
    comment: "The description.",
    deprecated: false,
    exported: true,
    members: [{
      comment: "param1 description",
      deprecated: false,
      name: "param1",
      nullable: true,
      optional: false,
      typeName: "string",
    }, {
      deprecated: true,
      name: "param2",
      nullable: false,
      optional: true,
      typeName: "SomeType[]",
    }],
  });
});
