import { convertSpecToClientCode } from './convertSpecToClientCode.ts'
import { exampleOpenApi } from './exampleOpenApi.test.ts'

Deno.test("Generate client code for an openapi service definition.", () => {
  const clientCode = convertSpecToClientCode(exampleOpenApi);

  console.log(clientCode);
});
