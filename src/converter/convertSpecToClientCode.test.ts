import { convertSpecToClientCode } from "./convertSpecToClientCode.ts";

const simpleService = `openapi: 3.0.3
info:
  title: Test Service API
  description: A service for testing.
  version: 1.0.0
servers:
  - url: 'http://localhost:1234'
    description: The test server.
paths:
  /resource:
    summary: A resource.
    parameters: []
    post:
      operationId: doAction
      summary: Performs an action.
      tags:
        - Test
      parameters: []
      responses:
        '201':
          description: Success.
      security: []
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/SomeType'
components:
  schemas:
    SomeType:
      type: object
      description: The request body for the operation.
      properties:
        param1:
          type: string
        param2:
          type: number`;

Deno.test("Convert a specification to client code.", () => {
  convertSpecToClientCode(simpleService);
});
