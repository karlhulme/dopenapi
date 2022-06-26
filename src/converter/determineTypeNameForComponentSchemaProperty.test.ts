import { assertEquals, assertThrows } from "../../deps.ts";
import { determineTypeNameForComponentSchemaProperty } from "./determineTypeNameForComponentSchemaProperty.ts";

Deno.test("Determine a component schema type to be a reference.", () => {
  const typeName = determineTypeNameForComponentSchemaProperty({
    $ref: "#/components/schemas/SomeType",
  });

  assertEquals(typeName, "SomeType");
});

Deno.test("Determine a component schema type to be an array of reference.", () => {
  const typeName = determineTypeNameForComponentSchemaProperty({
    type: "array",
    items: {
      $ref: "#/components/schemas/SomeType",
    },
  });

  assertEquals(typeName, "SomeType[]");
});

Deno.test("Determine a component schema type to be a JSON type.", () => {
  const typeName = determineTypeNameForComponentSchemaProperty({
    type: "number",
  });

  assertEquals(typeName, "number");
});

Deno.test("Determine a component schema type to be an array of reference.", () => {
  const typeName = determineTypeNameForComponentSchemaProperty({
    type: "array",
    items: {
      type: "string",
    },
  });

  assertEquals(typeName, "string[]");
});

Deno.test("Fail to find a component schema type if it's not valid.", () => {
  assertThrows(() =>
    determineTypeNameForComponentSchemaProperty({
      type: "array",
    })
  );
});
