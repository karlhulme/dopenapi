import { assertEquals } from "../../deps.ts";
import { buildComment } from "./buildComment.ts";

Deno.test("Build a comment with title and description.", () => {
  assertEquals(
    buildComment(
      "Title",
      "Description",
    ),
    "Description (Title)",
  );
});

Deno.test("Build a comment with just a title.", () => {
  assertEquals(
    buildComment(
      "Title",
    ),
    "Title",
  );
});

Deno.test("Build a comment with just a description.", () => {
  assertEquals(
    buildComment(
      undefined,
      "Description",
    ),
    "Description",
  );
});

Deno.test("Build a comment without description or title.", () => {
  assertEquals(
    buildComment(),
    undefined,
  );
});
