import { assertEquals, assertThrows } from "../../deps.ts";
import { determineTypeNameForComponentSchemaProperty } from "./determineTypeNameForComponentSchemaProperty.ts";

Deno.test("Determine a component schema type to be a reference.", () => {
  const typeName = determineTypeNameForComponentSchemaProperty({
    $ref: "#/components/schemas/SomeType",
  });

  assertEquals(typeName, "SomeType");
});

Deno.test("Fail to find a component schema type if it's not valid.", () => {
  assertThrows(() => determineTypeNameForComponentSchemaProperty({}));
});
