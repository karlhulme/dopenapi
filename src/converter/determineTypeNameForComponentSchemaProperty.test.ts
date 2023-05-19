import { assertEquals, assertThrows } from "../../deps.ts";
import { determineTypeNameForComponentSchemaProperty } from "./determineTypeNameForComponentSchemaProperty.ts";

Deno.test("Determine a component schema type to be a scalar type.", () => {
  assertEquals(
    determineTypeNameForComponentSchemaProperty({
      type: "boolean",
    }),
    "boolean",
  );

  assertEquals(
    determineTypeNameForComponentSchemaProperty({
      type: "number",
    }),
    "number",
  );

  assertEquals(
    determineTypeNameForComponentSchemaProperty({
      type: "string",
    }),
    "string",
  );
});

Deno.test("Determine a component schema type to be a reference.", () => {
  const typeName = determineTypeNameForComponentSchemaProperty({
    $ref: "#/components/schemas/SomeType",
  });

  assertEquals(typeName, "SomeType");
});

Deno.test("Determine a component schema type to be a reference wrapped in an allOf array.", () => {
  const typeName = determineTypeNameForComponentSchemaProperty({
    allOf: [{ $ref: "#/components/schemas/SomeType" }],
  });

  assertEquals(typeName, "SomeType");
});

Deno.test("Fail to find a component schema type if it's not valid.", () => {
  assertThrows(() => determineTypeNameForComponentSchemaProperty({}));
});

Deno.test("Fail to find a component schema type if it's just a plain array.", () => {
  assertThrows(() =>
    determineTypeNameForComponentSchemaProperty({ type: "array" })
  );
});
