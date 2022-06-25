import { assertEquals } from "../../deps.ts";
import { capitalizeFirstLetter } from "./capitalizeFirstLetter.ts";

Deno.test("Capitalise first letter of a string.", () => {
  assertEquals(capitalizeFirstLetter("test"), "Test");
});

Deno.test("Accept empty string.", () => {
  assertEquals(capitalizeFirstLetter(""), "");
});
