import { assertRejects } from "../../deps.ts";
import { buildPathOperationFunctionValidationLines } from "./buildPathOperationFunctionValidationLines.ts";

class TempError extends Error {
  constructor(public readonly status: number) {
    super(`Status was ${status}.`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
  }
}

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

Deno.test("Generate a validation function that accepts a successful response.", async () => {
  const block = buildPathOperationFunctionValidationLines(
    {
      operationId: "testOp",
      responses: {},
      security: [],
      tags: [],
      parameters: [],
    },
  );

  const validateFunction = new AsyncFunction(
    "url",
    "props",
    "response",
    "ServiceCallTransitoryError",
    block,
  );

  await validateFunction(
    "http://localhost",
    {},
    {
      ok: true,
    },
  );
});

Deno.test("Generate a validation function that errors on an unsuccessful response.", async () => {
  const block = buildPathOperationFunctionValidationLines(
    {
      operationId: "testOp",
      responses: {},
      security: [],
      tags: [],
      parameters: [],
    },
  );

  const validateFunction = new AsyncFunction(
    "url",
    "props",
    "response",
    "ServiceCallTransitoryError",
    block,
  );

  await assertRejects(
    () =>
      validateFunction(
        "http://localhost",
        {},
        {
          ok: false,
          status: 500,
          // deno-lint-ignore require-await
          text: async () => {
            return "Error Message.";
          },
        },
      ),
    Error,
    "Service call rejected with status code 500.\nError Message.",
  );
});

Deno.test("Generate a validation function that errors on an unsuccessful response and includes a request body.", async () => {
  const block = buildPathOperationFunctionValidationLines(
    {
      operationId: "testOp",
      responses: {},
      security: [],
      tags: [],
      parameters: [],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/SomeType",
            },
          },
        },
      },
    },
  );

  const validateFunction = new AsyncFunction(
    "url",
    "props",
    "response",
    "ServiceCallTransitoryError",
    block,
  );

  await assertRejects(
    () =>
      validateFunction(
        "http://localhost",
        {
          body: { foo: "body-content" },
        },
        {
          ok: false,
          status: 500,
          // deno-lint-ignore require-await
          text: async () => {
            return "Error Message.";
          },
        },
      ),
    Error,
    "body-content",
  );
});

Deno.test("Generate a validation function that yields a Transitory error on an temporarily unsuccessful response.", async () => {
  const block = buildPathOperationFunctionValidationLines(
    {
      operationId: "testOp",
      responses: {},
      security: [],
      tags: [],
      parameters: [],
    },
  );

  const validateFunction = new AsyncFunction(
    "url",
    "props",
    "response",
    "ServiceCallTransitoryError",
    block,
  );

  await assertRejects(
    () =>
      validateFunction(
        "http://localhost",
        {},
        {
          ok: false,
          status: 429,
        },
        TempError,
      ),
    TempError,
    "Status was 429.",
  );
});
