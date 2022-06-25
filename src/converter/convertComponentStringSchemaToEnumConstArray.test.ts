import { assertEquals, assertThrows } from "../../deps.ts";
import { convertComponentStringSchemaToEnumConstArray } from "./convertComponentStringSchemaToEnumConstArray.ts";

Deno.test("Create an enum const array from a component string schema.", () => {
  const enumConstArray = convertComponentStringSchemaToEnumConstArray("test", {
    type: "string",
    enum: ["foo", "bar"],
    description: "The description.",
    title: "The title.",
  });

  assertEquals(enumConstArray, {
    comment: "The description. (The title.)",
    exported: true,
    name: "test",
    values: [
      "foo",
      "bar",
    ],
  });
});

Deno.test("Fail to create an enum const array if the component string schema is invalid.", () => {
  assertThrows(() =>
    convertComponentStringSchemaToEnumConstArray("test", {
      type: "string",
      description: "The description.",
      title: "The title.",
    })
  );
});
