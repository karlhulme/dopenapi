# dopenapi

A utility for reading an OpenAPI specification and generating a deno client.

This library also contains a type heirarchy for a portion of the OpenAPI spec
which can be used to generate valid OpenAPI specifications.

## Limitations

This library supports a subset of OpenAPI. For example, it assumes all payloads
will be JSON and not XML. Whereas the OpenAPI specification provides a lot of
flexibility around how and where schemas are specified, this library assumes a
singular location. It also works on a restricted set of JSON schema (as set out
by the Jsonotron library). The details are explained in this section.

The `/components/requestBodies` will not be read. Place all schemas in the
`/components/schemas` node instead.

Parameter schemas, request bodies and response bodies must refer to a JSON
schema using a $ref parameter. Do not define the type inline.

The schemas (in the components section) must be define a simple type (number,
string, object) or an enum or an array that references another type. Anything
else will be treated as a generic object or generic array.

```json
{
  "simple": {
    "type": "number"
  },
  "enum": {
    "type": "string",
    "enum": ["a", "b", "c"]
  },
  "simpleArray": {
    "type": "array",
    "items": {
      "$ref": "#/components/schemas/simple"
    }
  },
  "simpleObject": {
    "type": "object",
    "properties": {
      "someProp": {
        "$ref": "#/components/schemas/simple"
      }
    }
  }
}
```

The `/component/schemas` node can only contain record definitions or
string-based enumerations. Record definitions may only define properties to a
single level, however a property can reference any other schema type.

Path parameters can only be placed in the parameters property of the path node,
they cannot be placed in the operations such as get or post. Conversely, header
parameters, query parameters and cookie parameters can only be placed in the
operations.

## Commands

Run `deno task test` to test, format and output coverage report.
