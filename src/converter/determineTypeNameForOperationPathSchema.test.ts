import { assertEquals, assertThrows } from "../../deps.ts";
import { determineTypeNameForOperationPathSchema } from "./determineTypeNameForOperationPathSchema.ts";

Deno.test("Determine a path schema type to be a reference.", () => {
  const typeName = determineTypeNameForOperationPathSchema({
    $ref: "#/components/schemas/SomeType",
  });

  assertEquals(typeName, "SomeType");
});

Deno.test("Determine a path schema type to be an array of reference.", () => {
  const typeName = determineTypeNameForOperationPathSchema({
    type: "array",
    items: {
      $ref: "#/components/schemas/SomeType",
    },
  });

  assertEquals(typeName, "SomeType[]");
});

Deno.test("Determine a path schema type to be a JSON type.", () => {
  const typeName = determineTypeNameForOperationPathSchema({
    type: "number",
  });

  assertEquals(typeName, "number");
});

Deno.test("Determine a path schema type to be an array of reference.", () => {
  const typeName = determineTypeNameForOperationPathSchema({
    type: "array",
    items: {
      type: "string",
    },
  });

  assertEquals(typeName, "string[]");
});

Deno.test("Fail to find a path schema type if it's not valid.", () => {
  assertThrows(() =>
    determineTypeNameForOperationPathSchema({
      type: "array",
    })
  );
});
