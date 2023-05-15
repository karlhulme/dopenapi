import { assertRejects } from "../../deps.ts";
import { buildPathOperationFunctionValidationLines } from "./buildPathOperationFunctionValidationLines.ts";

class TempError extends Error {
  constructor(readonly status: number, message: string) {
    super(`TempError ${status} ${message}`);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
  }
}

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

Deno.test("Generate a validation snippet that accepts a successful response.", async () => {
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

Deno.test("Generate a validation snippet that raises a ServiceCallProblemError if the response contains an IETF 7087 problem.", async () => {
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
    "ServiceCallProblemError",
    "ServiceCallRejectedError",
    "isIETF7087Problem",
    "parseIETF7087Problem",
    block,
  );

  await assertRejects(
    () =>
      validateFunction(
        "http://localhost",
        {},
        {
          ok: false,
          status: 400,
        },
        Error,
        TempError,
        Error,
        () => true,
        () => new TempError(123, "deduce-the-error-from-json"),
      ),
    TempError,
    "deduce-the-error-from-json",
  );
});

Deno.test("Generate a validation snippet that raises a ServiceCallRejectedError with no request body.", async () => {
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
    "ServiceCallProblemError",
    "ServiceCallRejectedError",
    "isIETF7087Problem",
    "parseIETF7087Problem",
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
        Error,
        Error,
        TempError,
        () => false,
        () => {},
      ),
    TempError,
    "TempError 500 Error Message.\nUrl: http://localhost\n",
  );
});

Deno.test("Generate a validation snippet that raises a ServiceCallRejectedError with a request body.", async () => {
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
    "ServiceCallProblemError",
    "ServiceCallRejectedError",
    "isIETF7087Problem",
    "parseIETF7087Problem",
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
        Error,
        Error,
        TempError,
        () => false,
        () => ({}),
      ),
    TempError,
    'TempError 500 Error Message.\nUrl: http://localhost\nBody: {\n  "foo": "body-content"\n}',
  );
});

Deno.test("Generate a validation snippet that throws a ServiceCallTransitoryError if the status code suggests this is a transitory error.", async () => {
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
    "ServiceCallProblemError",
    "ServiceCallRejectedError",
    "isIETF7087Problem",
    "parseIETF7087Problem",
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
          // deno-lint-ignore require-await
          text: async () => {
            return "Rate limit.";
          },
        },
        TempError,
        Error,
        Error,
        () => false,
        () => ({}),
      ),
    TempError,
    "TempError 429 Rate limit.",
  );
});
