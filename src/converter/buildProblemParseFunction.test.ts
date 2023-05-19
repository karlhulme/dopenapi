import { assertEquals } from "https://deno.land/std@0.156.0/testing/asserts.ts";
import { buildProblemParserFunction } from "./buildProblemParserFunction.ts";

class TempError extends Error {
  constructor(
    readonly code: number,
    readonly type: string,
    readonly title: string,
    readonly detail: string,
    readonly properties: Record<string, unknown>,
    readonly headers: Record<string, string | unknown>,
  ) {
    super(`TempError`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
  }
}

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

Deno.test("The problem parser function can parse problem content.", async () => {
  const funcDef = buildProblemParserFunction();

  const parserFunction = new AsyncFunction(
    "response",
    "ServiceCallProblemError",
    funcDef.lines,
  );

  const problemError = await parserFunction(
    new Response(
      JSON.stringify({
        status: 400,
        type: "/common/errors/requestParameterDidNotValidate",
        title: "Url param failed validation.",
        detail: "Url param 'memberId' failed validation.",
        validationResult: [
          {
            "valuePath": "",
            "value": "nonsense",
            "msg":
              "Value must match regex pattern ^[a-z]{2,6}_[a-z0-9]{4,44}$.",
            "type": "std/idWithPrefix",
          },
        ],
      }),
      {
        headers: {
          "content-type": "application/problem+json;charset=utf-8",
        },
      },
    ),
    TempError,
  );

  assertEquals(problemError.code, 400);
  assertEquals(
    problemError.type,
    "/common/errors/requestParameterDidNotValidate",
  );
  assertEquals(problemError.title, "Url param failed validation.");
  assertEquals(problemError.detail, "Url param 'memberId' failed validation.");
  assertEquals(problemError.properties.validationResult[0].value, "nonsense");
  assertEquals(
    problemError.headers["content-type"],
    "application/problem+json;charset=utf-8",
  );
});
