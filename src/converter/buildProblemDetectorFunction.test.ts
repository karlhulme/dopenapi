import { assertEquals } from "https://deno.land/std@0.156.0/testing/asserts.ts";
import { buildProblemDetectorFunction } from "./buildProblemDetectorFunction.ts";

Deno.test("The problem detector function can detect problem content.", () => {
  const funcDef = buildProblemDetectorFunction();

  const detectorFunction = new Function("response", funcDef.lines);

  assertEquals(
    detectorFunction(
      new Response(null, {
        headers: {
          "content-type": "application/problem+json;charset=utf-8",
        },
      }),
    ),
    true,
  );

  assertEquals(detectorFunction(new Response("Non-problem content")), false);
});
