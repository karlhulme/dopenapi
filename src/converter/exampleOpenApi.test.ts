export const exampleOpenApi = `openapi: 3.0.3
info:
  title: Records Service API
  description: 'A service for storing, updating and retrieving records.'
  version: 1.0.0
servers:
  - url: /
    description: This service.
paths:
  /records/authDevices:
    summary: A collection of Auth Device resources.
    parameters: []
    get:
      operationId: selectAllAuthDevices
      summary: Retrieve all Auth Device records.
      tags:
        - Auth Devices
      parameters:
        - in: query
          name: fieldNames
          required: false
          deprecated: false
          description: |-
            A comma-separated list of field names to be included on each record
                  in the response. If this field is omitted then just the id property of each record will be returned.
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of field names to be included on each
              record
                    in the response. If this field is omitted then just the id property of each record will be returned.
        - in: header
          name: x-user-id
          schema:
            type: string
            title: A string with up to 50 unicode characters.
            description: |-
              An id of the user making the request.
                    If this header is omitted then the anonymous user will be assumed.
          required: false
          description: |-
            An id of the user making the request.
                  If this header is omitted then the anonymous user will be assumed.
        - in: header
          name: x-user-claims
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of the claims held by the user making the
              request.
                    If this header is omitted then the user will be assumed to have no claims.
          required: false
          description: >-
            A comma-separated list of the claims held by the user making the
            request.
                  If this header is omitted then the user will be assumed to have no claims.
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/SvcAuthDeviceRecord'
      security:
        - apiKeyAuth: []
    post:
      operationId: newAuthDevice
      summary: Create new Auth Device record.
      tags:
        - Auth Devices
      requestBody:
        $ref: '#/components/requestBodies/NewAuthDeviceRequestBody'
      parameters:
        - in: query
          name: fieldNames
          required: false
          deprecated: false
          description: >-
            A comma-separated list of field names to be included on the returned
            record.
                  If this field is omitted then just the id property will be returned.
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of field names to be included on the
              returned record.
                    If this field is omitted then just the id property will be returned.
        - in: header
          name: x-user-id
          schema:
            type: string
            title: A string with up to 50 unicode characters.
            description: |-
              An id of the user making the request.
                    If this header is omitted then the anonymous user will be assumed.
          required: false
          description: |-
            An id of the user making the request.
                  If this header is omitted then the anonymous user will be assumed.
        - in: header
          name: x-user-claims
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of the claims held by the user making the
              request.
                    If this header is omitted then the user will be assumed to have no claims.
          required: false
          description: >-
            A comma-separated list of the claims held by the user making the
            request.
                  If this header is omitted then the user will be assumed to have no claims.
      responses:
        '201':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SvcAuthDeviceRecord'
          headers:
            is-new:
              description: >-
                A value that indicates if the resource was created as a
                consequence of this request.
              schema:
                type: boolean
                title: A value of either true or false.
                description: >-
                  A value that indicates if the resource was created as a
                  consequence of this request.
              required: true
      security:
        - apiKeyAuth: []
  '/records/authDevices/{id}':
    summary: A single Auth Device resource.
    parameters:
      - in: path
        schema:
          type: string
        name: id
        required: true
    delete:
      operationId: deleteAuthDevice
      summary: Delete Auth Device record.
      tags:
        - Auth Devices
      parameters:
        - in: header
          name: x-user-id
          schema:
            type: string
            title: A string with up to 50 unicode characters.
            description: |-
              An id of the user making the request.
                    If this header is omitted then the anonymous user will be assumed.
          required: false
          description: |-
            An id of the user making the request.
                  If this header is omitted then the anonymous user will be assumed.
        - in: header
          name: x-user-claims
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of the claims held by the user making the
              request.
                    If this header is omitted then the user will be assumed to have no claims.
          required: false
          description: >-
            A comma-separated list of the claims held by the user making the
            request.
                  If this header is omitted then the user will be assumed to have no claims.
      responses:
        '204':
          description: Success
          headers:
            is-deleted:
              description: >-
                A value that indicates if the resource was deleted as a
                consequence of this request.
              schema:
                type: boolean
                title: A value of either true or false.
                description: >-
                  A value that indicates if the resource was deleted as a
                  consequence of this request.
              required: true
      security:
        - apiKeyAuth: []
    get:
      operationId: selectAuthDevice
      summary: Retrieve Auth Device record.
      tags:
        - Auth Devices
      parameters:
        - in: query
          name: fieldNames
          required: false
          deprecated: false
          description: >-
            A comma-separated list of field names to be included on the returned
            record.
                  If this field is omitted then just the id property will be returned.
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of field names to be included on the
              returned record.
                    If this field is omitted then just the id property will be returned.
        - in: header
          name: x-user-id
          schema:
            type: string
            title: A string with up to 50 unicode characters.
            description: |-
              An id of the user making the request.
                    If this header is omitted then the anonymous user will be assumed.
          required: false
          description: |-
            An id of the user making the request.
                  If this header is omitted then the anonymous user will be assumed.
        - in: header
          name: x-user-claims
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of the claims held by the user making the
              request.
                    If this header is omitted then the user will be assumed to have no claims.
          required: false
          description: >-
            A comma-separated list of the claims held by the user making the
            request.
                  If this header is omitted then the user will be assumed to have no claims.
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SvcAuthDeviceRecord'
      security:
        - apiKeyAuth: []
    patch:
      operationId: patchAuthDevice
      summary: Patch Auth Device record.
      tags:
        - Auth Devices
      requestBody:
        $ref: '#/components/requestBodies/PatchAuthDeviceRequestBody'
      parameters:
        - in: query
          name: fieldNames
          required: false
          deprecated: false
          description: >-
            A comma-separated list of field names to be included on the returned
            record.
                  If this field is omitted then just the id property will be returned.
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of field names to be included on the
              returned record.
                    If this field is omitted then just the id property will be returned.
        - in: header
          name: x-user-id
          schema:
            type: string
            title: A string with up to 50 unicode characters.
            description: |-
              An id of the user making the request.
                    If this header is omitted then the anonymous user will be assumed.
          required: false
          description: |-
            An id of the user making the request.
                  If this header is omitted then the anonymous user will be assumed.
        - in: header
          name: x-user-claims
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of the claims held by the user making the
              request.
                    If this header is omitted then the user will be assumed to have no claims.
          required: false
          description: >-
            A comma-separated list of the claims held by the user making the
            request.
                  If this header is omitted then the user will be assumed to have no claims.
        - in: header
          name: if-match
          schema:
            type: string
            title: A string with up to 50 unicode characters.
            description: >-
              A document will only be updated if it's docVersion property
              matches the given value.
          required: false
          description: >-
            A document will only be updated if it's docVersion property matches
            the given value.
        - in: header
          name: idempotency-key
          schema:
            type: string
            title: >-
              A universally unique 128 bit number formatted as 32 alphanumeric
              characters
                  and defined by RFC 4122.
            description: >-
              A UUID for this operation which ensures repeat invocation will not
              change the underlying resource.
          required: false
          description: >-
            A UUID for this operation which ensures repeat invocation will not
            change the underlying resource.
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SvcAuthDeviceRecord'
          headers:
            is-updated:
              description: >-
                A value that indicates if the resource was updated as a
                consequence of this request.
              schema:
                type: boolean
                title: A value of either true or false.
                description: >-
                  A value that indicates if the resource was updated as a
                  consequence of this request.
              required: true
      security:
        - apiKeyAuth: []
    put:
      operationId: replaceAuthDevice
      summary: Replace existing Auth Device record.
      tags:
        - Auth Devices
      requestBody:
        $ref: '#/components/requestBodies/ReplaceAuthDeviceRequestBody'
      parameters:
        - in: query
          name: fieldNames
          required: false
          deprecated: false
          description: >-
            A comma-separated list of field names to be included on the returned
            record.
                  If this field is omitted then just the id property will be returned.
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of field names to be included on the
              returned record.
                    If this field is omitted then just the id property will be returned.
        - in: header
          name: x-user-id
          schema:
            type: string
            title: A string with up to 50 unicode characters.
            description: |-
              An id of the user making the request.
                    If this header is omitted then the anonymous user will be assumed.
          required: false
          description: |-
            An id of the user making the request.
                  If this header is omitted then the anonymous user will be assumed.
        - in: header
          name: x-user-claims
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of the claims held by the user making the
              request.
                    If this header is omitted then the user will be assumed to have no claims.
          required: false
          description: >-
            A comma-separated list of the claims held by the user making the
            request.
                  If this header is omitted then the user will be assumed to have no claims.
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SvcAuthDeviceRecord'
      security:
        - apiKeyAuth: []
  '/records/authDevices\:byIds':
    summary: The byIds verb on a collection of authDevice resources.
    parameters: []
    get:
      operationId: selectAuthDevicesByIds
      summary: Retrieve Auth Device records using ids.
      tags:
        - Auth Devices
      parameters:
        - in: query
          name: fieldNames
          required: false
          deprecated: false
          description: |-
            A comma-separated list of field names to be included on each record
                  in the response. If this field is omitted then just the id property of each record will be returned.
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of field names to be included on each
              record
                    in the response. If this field is omitted then just the id property of each record will be returned.
        - in: query
          name: ids
          required: true
          deprecated: false
          description: >-
            A comma-separated list of ids that determine which records are
            included in the response.
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of ids that determine which records are
              included in the response.
        - in: header
          name: x-user-id
          schema:
            type: string
            title: A string with up to 50 unicode characters.
            description: |-
              An id of the user making the request.
                    If this header is omitted then the anonymous user will be assumed.
          required: false
          description: |-
            An id of the user making the request.
                  If this header is omitted then the anonymous user will be assumed.
        - in: header
          name: x-user-claims
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of the claims held by the user making the
              request.
                    If this header is omitted then the user will be assumed to have no claims.
          required: false
          description: >-
            A comma-separated list of the claims held by the user making the
            request.
                  If this header is omitted then the user will be assumed to have no claims.
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/SvcAuthDeviceRecord'
      security:
        - apiKeyAuth: []
  /records/authSessions:
    summary: A collection of Auth Session resources.
    parameters: []
    get:
      operationId: selectAllAuthSessions
      summary: Retrieve all Auth Session records.
      tags:
        - Auth Sessions
      parameters:
        - in: query
          name: fieldNames
          required: false
          deprecated: false
          description: |-
            A comma-separated list of field names to be included on each record
                  in the response. If this field is omitted then just the id property of each record will be returned.
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of field names to be included on each
              record
                    in the response. If this field is omitted then just the id property of each record will be returned.
        - in: header
          name: x-user-id
          schema:
            type: string
            title: A string with up to 50 unicode characters.
            description: |-
              An id of the user making the request.
                    If this header is omitted then the anonymous user will be assumed.
          required: false
          description: |-
            An id of the user making the request.
                  If this header is omitted then the anonymous user will be assumed.
        - in: header
          name: x-user-claims
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of the claims held by the user making the
              request.
                    If this header is omitted then the user will be assumed to have no claims.
          required: false
          description: >-
            A comma-separated list of the claims held by the user making the
            request.
                  If this header is omitted then the user will be assumed to have no claims.
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/SvcAuthSessionRecord'
      security:
        - apiKeyAuth: []
    post:
      operationId: newAuthSession
      summary: Create new Auth Session record.
      tags:
        - Auth Sessions
      requestBody:
        $ref: '#/components/requestBodies/NewAuthSessionRequestBody'
      parameters:
        - in: query
          name: fieldNames
          required: false
          deprecated: false
          description: >-
            A comma-separated list of field names to be included on the returned
            record.
                  If this field is omitted then just the id property will be returned.
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of field names to be included on the
              returned record.
                    If this field is omitted then just the id property will be returned.
        - in: header
          name: x-user-id
          schema:
            type: string
            title: A string with up to 50 unicode characters.
            description: |-
              An id of the user making the request.
                    If this header is omitted then the anonymous user will be assumed.
          required: false
          description: |-
            An id of the user making the request.
                  If this header is omitted then the anonymous user will be assumed.
        - in: header
          name: x-user-claims
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of the claims held by the user making the
              request.
                    If this header is omitted then the user will be assumed to have no claims.
          required: false
          description: >-
            A comma-separated list of the claims held by the user making the
            request.
                  If this header is omitted then the user will be assumed to have no claims.
      responses:
        '201':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SvcAuthSessionRecord'
          headers:
            is-new:
              description: >-
                A value that indicates if the resource was created as a
                consequence of this request.
              schema:
                type: boolean
                title: A value of either true or false.
                description: >-
                  A value that indicates if the resource was created as a
                  consequence of this request.
              required: true
      security:
        - apiKeyAuth: []
  '/records/authSessions/{id}':
    summary: A single Auth Session resource.
    parameters:
      - in: path
        schema:
          type: string
        name: id
        required: true
    delete:
      operationId: deleteAuthSession
      summary: Delete Auth Session record.
      tags:
        - Auth Sessions
      parameters:
        - in: header
          name: x-user-id
          schema:
            type: string
            title: A string with up to 50 unicode characters.
            description: |-
              An id of the user making the request.
                    If this header is omitted then the anonymous user will be assumed.
          required: false
          description: |-
            An id of the user making the request.
                  If this header is omitted then the anonymous user will be assumed.
        - in: header
          name: x-user-claims
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of the claims held by the user making the
              request.
                    If this header is omitted then the user will be assumed to have no claims.
          required: false
          description: >-
            A comma-separated list of the claims held by the user making the
            request.
                  If this header is omitted then the user will be assumed to have no claims.
      responses:
        '204':
          description: Success
          headers:
            is-deleted:
              description: >-
                A value that indicates if the resource was deleted as a
                consequence of this request.
              schema:
                type: boolean
                title: A value of either true or false.
                description: >-
                  A value that indicates if the resource was deleted as a
                  consequence of this request.
              required: true
      security:
        - apiKeyAuth: []
    get:
      operationId: selectAuthSession
      summary: Retrieve Auth Session record.
      tags:
        - Auth Sessions
      parameters:
        - in: query
          name: fieldNames
          required: false
          deprecated: false
          description: >-
            A comma-separated list of field names to be included on the returned
            record.
                  If this field is omitted then just the id property will be returned.
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of field names to be included on the
              returned record.
                    If this field is omitted then just the id property will be returned.
        - in: header
          name: x-user-id
          schema:
            type: string
            title: A string with up to 50 unicode characters.
            description: |-
              An id of the user making the request.
                    If this header is omitted then the anonymous user will be assumed.
          required: false
          description: |-
            An id of the user making the request.
                  If this header is omitted then the anonymous user will be assumed.
        - in: header
          name: x-user-claims
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of the claims held by the user making the
              request.
                    If this header is omitted then the user will be assumed to have no claims.
          required: false
          description: >-
            A comma-separated list of the claims held by the user making the
            request.
                  If this header is omitted then the user will be assumed to have no claims.
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SvcAuthSessionRecord'
      security:
        - apiKeyAuth: []
    patch:
      operationId: patchAuthSession
      summary: Patch Auth Session record.
      tags:
        - Auth Sessions
      requestBody:
        $ref: '#/components/requestBodies/PatchAuthSessionRequestBody'
      parameters:
        - in: query
          name: fieldNames
          required: false
          deprecated: false
          description: >-
            A comma-separated list of field names to be included on the returned
            record.
                  If this field is omitted then just the id property will be returned.
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of field names to be included on the
              returned record.
                    If this field is omitted then just the id property will be returned.
        - in: header
          name: x-user-id
          schema:
            type: string
            title: A string with up to 50 unicode characters.
            description: |-
              An id of the user making the request.
                    If this header is omitted then the anonymous user will be assumed.
          required: false
          description: |-
            An id of the user making the request.
                  If this header is omitted then the anonymous user will be assumed.
        - in: header
          name: x-user-claims
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of the claims held by the user making the
              request.
                    If this header is omitted then the user will be assumed to have no claims.
          required: false
          description: >-
            A comma-separated list of the claims held by the user making the
            request.
                  If this header is omitted then the user will be assumed to have no claims.
        - in: header
          name: if-match
          schema:
            type: string
            title: A string with up to 50 unicode characters.
            description: >-
              A document will only be updated if it's docVersion property
              matches the given value.
          required: false
          description: >-
            A document will only be updated if it's docVersion property matches
            the given value.
        - in: header
          name: idempotency-key
          schema:
            type: string
            title: >-
              A universally unique 128 bit number formatted as 32 alphanumeric
              characters
                  and defined by RFC 4122.
            description: >-
              A UUID for this operation which ensures repeat invocation will not
              change the underlying resource.
          required: false
          description: >-
            A UUID for this operation which ensures repeat invocation will not
            change the underlying resource.
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SvcAuthSessionRecord'
          headers:
            is-updated:
              description: >-
                A value that indicates if the resource was updated as a
                consequence of this request.
              schema:
                type: boolean
                title: A value of either true or false.
                description: >-
                  A value that indicates if the resource was updated as a
                  consequence of this request.
              required: true
      security:
        - apiKeyAuth: []
    put:
      operationId: replaceAuthSession
      summary: Replace existing Auth Session record.
      tags:
        - Auth Sessions
      requestBody:
        $ref: '#/components/requestBodies/ReplaceAuthSessionRequestBody'
      parameters:
        - in: query
          name: fieldNames
          required: false
          deprecated: false
          description: >-
            A comma-separated list of field names to be included on the returned
            record.
                  If this field is omitted then just the id property will be returned.
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of field names to be included on the
              returned record.
                    If this field is omitted then just the id property will be returned.
        - in: header
          name: x-user-id
          schema:
            type: string
            title: A string with up to 50 unicode characters.
            description: |-
              An id of the user making the request.
                    If this header is omitted then the anonymous user will be assumed.
          required: false
          description: |-
            An id of the user making the request.
                  If this header is omitted then the anonymous user will be assumed.
        - in: header
          name: x-user-claims
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of the claims held by the user making the
              request.
                    If this header is omitted then the user will be assumed to have no claims.
          required: false
          description: >-
            A comma-separated list of the claims held by the user making the
            request.
                  If this header is omitted then the user will be assumed to have no claims.
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SvcAuthSessionRecord'
      security:
        - apiKeyAuth: []
  '/records/authSessions\:byIds':
    summary: The byIds verb on a collection of authSession resources.
    parameters: []
    get:
      operationId: selectAuthSessionsByIds
      summary: Retrieve Auth Session records using ids.
      tags:
        - Auth Sessions
      parameters:
        - in: query
          name: fieldNames
          required: false
          deprecated: false
          description: |-
            A comma-separated list of field names to be included on each record
                  in the response. If this field is omitted then just the id property of each record will be returned.
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of field names to be included on each
              record
                    in the response. If this field is omitted then just the id property of each record will be returned.
        - in: query
          name: ids
          required: true
          deprecated: false
          description: >-
            A comma-separated list of ids that determine which records are
            included in the response.
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of ids that determine which records are
              included in the response.
        - in: header
          name: x-user-id
          schema:
            type: string
            title: A string with up to 50 unicode characters.
            description: |-
              An id of the user making the request.
                    If this header is omitted then the anonymous user will be assumed.
          required: false
          description: |-
            An id of the user making the request.
                  If this header is omitted then the anonymous user will be assumed.
        - in: header
          name: x-user-claims
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of the claims held by the user making the
              request.
                    If this header is omitted then the user will be assumed to have no claims.
          required: false
          description: >-
            A comma-separated list of the claims held by the user making the
            request.
                  If this header is omitted then the user will be assumed to have no claims.
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/SvcAuthSessionRecord'
      security:
        - apiKeyAuth: []
  '/records/authSessions\:byAuthUserId':
    summary: The byAuthUserId verb on a collection of Auth Session resources.
    parameters: []
    get:
      operationId: selectAuthSessionsByAuthUserId
      summary: Retrieve sessions by auth user id.
      tags:
        - Auth Sessions
      parameters:
        - in: query
          name: fieldNames
          required: false
          deprecated: false
          description: |-
            A comma-separated list of field names to be included on each record
                  in the response. If this field is omitted then just the id property of each record will be returned.
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of field names to be included on each
              record
                    in the response. If this field is omitted then just the id property of each record will be returned.
        - in: query
          name: authUserId
          required: true
          deprecated: false
          description: The id of an auth user.
          schema:
            type: string
            title: >-
              A universally unique 128 bit number formatted as 32 alphanumeric
              characters
                  and defined by RFC 4122.
            description: The id of an auth user.
        - in: query
          name: from
          required: false
          deprecated: false
          description: The last successfully retrieved session id.
          schema:
            type: string
            title: >-
              A universally unique 128 bit number formatted as 32 alphanumeric
              characters
                  and defined by RFC 4122.
            description: The last successfully retrieved session id.
        - in: query
          name: limit
          required: false
          deprecated: false
          description: The number of records to return.
          schema:
            type: number
            title: A positive integer represented as a 32-bit signed integer.
            description: The number of records to return.
        - in: header
          name: x-user-id
          schema:
            type: string
            title: A string with up to 50 unicode characters.
            description: |-
              An id of the user making the request.
                    If this header is omitted then the anonymous user will be assumed.
          required: false
          description: |-
            An id of the user making the request.
                  If this header is omitted then the anonymous user will be assumed.
        - in: header
          name: x-user-claims
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of the claims held by the user making the
              request.
                    If this header is omitted then the user will be assumed to have no claims.
          required: false
          description: >-
            A comma-separated list of the claims held by the user making the
            request.
                  If this header is omitted then the user will be assumed to have no claims.
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/SvcAuthSessionRecord'
      security:
        - apiKeyAuth: []
  '/records/authSessions/{id}\:extend':
    summary: The extend verb on a collection of authSession resources.
    parameters:
      - in: path
        schema:
          type: string
        name: id
        required: true
    post:
      operationId: operateOnAuthSessionExtend
      summary: Extend Auth Session
      tags:
        - Auth Sessions
      requestBody:
        $ref: '#/components/requestBodies/OperateOnAuthSessionExtendRequestBody'
      parameters:
        - in: query
          name: fieldNames
          required: false
          deprecated: false
          description: >-
            A comma-separated list of field names to be included on the returned
            record.
                  If this field is omitted then just the id property will be returned.
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of field names to be included on the
              returned record.
                    If this field is omitted then just the id property will be returned.
        - in: header
          name: x-user-id
          schema:
            type: string
            title: A string with up to 50 unicode characters.
            description: |-
              An id of the user making the request.
                    If this header is omitted then the anonymous user will be assumed.
          required: false
          description: |-
            An id of the user making the request.
                  If this header is omitted then the anonymous user will be assumed.
        - in: header
          name: x-user-claims
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of the claims held by the user making the
              request.
                    If this header is omitted then the user will be assumed to have no claims.
          required: false
          description: >-
            A comma-separated list of the claims held by the user making the
            request.
                  If this header is omitted then the user will be assumed to have no claims.
        - in: header
          name: if-match
          schema:
            type: string
            title: A string with up to 50 unicode characters.
            description: >-
              A document will only be updated if it's docVersion property
              matches the given value.
          required: false
          description: >-
            A document will only be updated if it's docVersion property matches
            the given value.
        - in: header
          name: idempotency-key
          schema:
            type: string
            title: >-
              A universally unique 128 bit number formatted as 32 alphanumeric
              characters
                  and defined by RFC 4122.
            description: >-
              A UUID for this operation which ensures repeat invocation will not
              change the underlying resource.
          required: false
          description: >-
            A UUID for this operation which ensures repeat invocation will not
            change the underlying resource.
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SvcAuthSessionRecord'
          headers:
            is-updated:
              description: >-
                A value that indicates if the resource was updated as a
                consequence of this request.
              schema:
                type: boolean
                title: A value of either true or false.
                description: >-
                  A value that indicates if the resource was updated as a
                  consequence of this request.
              required: true
      security:
        - apiKeyAuth: []
  /records/authUsers:
    summary: A collection of Auth User resources.
    parameters: []
    get:
      operationId: selectAllAuthUsers
      summary: Retrieve all Auth User records.
      tags:
        - Auth Users
      parameters:
        - in: query
          name: fieldNames
          required: false
          deprecated: false
          description: |-
            A comma-separated list of field names to be included on each record
                  in the response. If this field is omitted then just the id property of each record will be returned.
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of field names to be included on each
              record
                    in the response. If this field is omitted then just the id property of each record will be returned.
        - in: header
          name: x-user-id
          schema:
            type: string
            title: A string with up to 50 unicode characters.
            description: |-
              An id of the user making the request.
                    If this header is omitted then the anonymous user will be assumed.
          required: false
          description: |-
            An id of the user making the request.
                  If this header is omitted then the anonymous user will be assumed.
        - in: header
          name: x-user-claims
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of the claims held by the user making the
              request.
                    If this header is omitted then the user will be assumed to have no claims.
          required: false
          description: >-
            A comma-separated list of the claims held by the user making the
            request.
                  If this header is omitted then the user will be assumed to have no claims.
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/SvcAuthUserRecord'
      security:
        - apiKeyAuth: []
    post:
      operationId: newAuthUser
      summary: Create new Auth User record.
      tags:
        - Auth Users
      requestBody:
        $ref: '#/components/requestBodies/NewAuthUserRequestBody'
      parameters:
        - in: query
          name: fieldNames
          required: false
          deprecated: false
          description: >-
            A comma-separated list of field names to be included on the returned
            record.
                  If this field is omitted then just the id property will be returned.
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of field names to be included on the
              returned record.
                    If this field is omitted then just the id property will be returned.
        - in: header
          name: x-user-id
          schema:
            type: string
            title: A string with up to 50 unicode characters.
            description: |-
              An id of the user making the request.
                    If this header is omitted then the anonymous user will be assumed.
          required: false
          description: |-
            An id of the user making the request.
                  If this header is omitted then the anonymous user will be assumed.
        - in: header
          name: x-user-claims
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of the claims held by the user making the
              request.
                    If this header is omitted then the user will be assumed to have no claims.
          required: false
          description: >-
            A comma-separated list of the claims held by the user making the
            request.
                  If this header is omitted then the user will be assumed to have no claims.
      responses:
        '201':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SvcAuthUserRecord'
          headers:
            is-new:
              description: >-
                A value that indicates if the resource was created as a
                consequence of this request.
              schema:
                type: boolean
                title: A value of either true or false.
                description: >-
                  A value that indicates if the resource was created as a
                  consequence of this request.
              required: true
      security:
        - apiKeyAuth: []
  '/records/authUsers/{id}':
    summary: A single Auth User resource.
    parameters:
      - in: path
        schema:
          type: string
        name: id
        required: true
    delete:
      operationId: deleteAuthUser
      summary: Delete Auth User record.
      tags:
        - Auth Users
      parameters:
        - in: header
          name: x-user-id
          schema:
            type: string
            title: A string with up to 50 unicode characters.
            description: |-
              An id of the user making the request.
                    If this header is omitted then the anonymous user will be assumed.
          required: false
          description: |-
            An id of the user making the request.
                  If this header is omitted then the anonymous user will be assumed.
        - in: header
          name: x-user-claims
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of the claims held by the user making the
              request.
                    If this header is omitted then the user will be assumed to have no claims.
          required: false
          description: >-
            A comma-separated list of the claims held by the user making the
            request.
                  If this header is omitted then the user will be assumed to have no claims.
      responses:
        '204':
          description: Success
          headers:
            is-deleted:
              description: >-
                A value that indicates if the resource was deleted as a
                consequence of this request.
              schema:
                type: boolean
                title: A value of either true or false.
                description: >-
                  A value that indicates if the resource was deleted as a
                  consequence of this request.
              required: true
      security:
        - apiKeyAuth: []
    get:
      operationId: selectAuthUser
      summary: Retrieve Auth User record.
      tags:
        - Auth Users
      parameters:
        - in: query
          name: fieldNames
          required: false
          deprecated: false
          description: >-
            A comma-separated list of field names to be included on the returned
            record.
                  If this field is omitted then just the id property will be returned.
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of field names to be included on the
              returned record.
                    If this field is omitted then just the id property will be returned.
        - in: header
          name: x-user-id
          schema:
            type: string
            title: A string with up to 50 unicode characters.
            description: |-
              An id of the user making the request.
                    If this header is omitted then the anonymous user will be assumed.
          required: false
          description: |-
            An id of the user making the request.
                  If this header is omitted then the anonymous user will be assumed.
        - in: header
          name: x-user-claims
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of the claims held by the user making the
              request.
                    If this header is omitted then the user will be assumed to have no claims.
          required: false
          description: >-
            A comma-separated list of the claims held by the user making the
            request.
                  If this header is omitted then the user will be assumed to have no claims.
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SvcAuthUserRecord'
      security:
        - apiKeyAuth: []
    patch:
      operationId: patchAuthUser
      summary: Patch Auth User record.
      tags:
        - Auth Users
      requestBody:
        $ref: '#/components/requestBodies/PatchAuthUserRequestBody'
      parameters:
        - in: query
          name: fieldNames
          required: false
          deprecated: false
          description: >-
            A comma-separated list of field names to be included on the returned
            record.
                  If this field is omitted then just the id property will be returned.
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of field names to be included on the
              returned record.
                    If this field is omitted then just the id property will be returned.
        - in: header
          name: x-user-id
          schema:
            type: string
            title: A string with up to 50 unicode characters.
            description: |-
              An id of the user making the request.
                    If this header is omitted then the anonymous user will be assumed.
          required: false
          description: |-
            An id of the user making the request.
                  If this header is omitted then the anonymous user will be assumed.
        - in: header
          name: x-user-claims
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of the claims held by the user making the
              request.
                    If this header is omitted then the user will be assumed to have no claims.
          required: false
          description: >-
            A comma-separated list of the claims held by the user making the
            request.
                  If this header is omitted then the user will be assumed to have no claims.
        - in: header
          name: if-match
          schema:
            type: string
            title: A string with up to 50 unicode characters.
            description: >-
              A document will only be updated if it's docVersion property
              matches the given value.
          required: false
          description: >-
            A document will only be updated if it's docVersion property matches
            the given value.
        - in: header
          name: idempotency-key
          schema:
            type: string
            title: >-
              A universally unique 128 bit number formatted as 32 alphanumeric
              characters
                  and defined by RFC 4122.
            description: >-
              A UUID for this operation which ensures repeat invocation will not
              change the underlying resource.
          required: false
          description: >-
            A UUID for this operation which ensures repeat invocation will not
            change the underlying resource.
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SvcAuthUserRecord'
          headers:
            is-updated:
              description: >-
                A value that indicates if the resource was updated as a
                consequence of this request.
              schema:
                type: boolean
                title: A value of either true or false.
                description: >-
                  A value that indicates if the resource was updated as a
                  consequence of this request.
              required: true
      security:
        - apiKeyAuth: []
    put:
      operationId: replaceAuthUser
      summary: Replace existing Auth User record.
      tags:
        - Auth Users
      requestBody:
        $ref: '#/components/requestBodies/ReplaceAuthUserRequestBody'
      parameters:
        - in: query
          name: fieldNames
          required: false
          deprecated: false
          description: >-
            A comma-separated list of field names to be included on the returned
            record.
                  If this field is omitted then just the id property will be returned.
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of field names to be included on the
              returned record.
                    If this field is omitted then just the id property will be returned.
        - in: header
          name: x-user-id
          schema:
            type: string
            title: A string with up to 50 unicode characters.
            description: |-
              An id of the user making the request.
                    If this header is omitted then the anonymous user will be assumed.
          required: false
          description: |-
            An id of the user making the request.
                  If this header is omitted then the anonymous user will be assumed.
        - in: header
          name: x-user-claims
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of the claims held by the user making the
              request.
                    If this header is omitted then the user will be assumed to have no claims.
          required: false
          description: >-
            A comma-separated list of the claims held by the user making the
            request.
                  If this header is omitted then the user will be assumed to have no claims.
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SvcAuthUserRecord'
      security:
        - apiKeyAuth: []
  '/records/authUsers\:byIds':
    summary: The byIds verb on a collection of authUser resources.
    parameters: []
    get:
      operationId: selectAuthUsersByIds
      summary: Retrieve Auth User records using ids.
      tags:
        - Auth Users
      parameters:
        - in: query
          name: fieldNames
          required: false
          deprecated: false
          description: |-
            A comma-separated list of field names to be included on each record
                  in the response. If this field is omitted then just the id property of each record will be returned.
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of field names to be included on each
              record
                    in the response. If this field is omitted then just the id property of each record will be returned.
        - in: query
          name: ids
          required: true
          deprecated: false
          description: >-
            A comma-separated list of ids that determine which records are
            included in the response.
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of ids that determine which records are
              included in the response.
        - in: header
          name: x-user-id
          schema:
            type: string
            title: A string with up to 50 unicode characters.
            description: |-
              An id of the user making the request.
                    If this header is omitted then the anonymous user will be assumed.
          required: false
          description: |-
            An id of the user making the request.
                  If this header is omitted then the anonymous user will be assumed.
        - in: header
          name: x-user-claims
          schema:
            type: string
            title: A string with up to 4000 unicode characters.
            description: >-
              A comma-separated list of the claims held by the user making the
              request.
                    If this header is omitted then the user will be assumed to have no claims.
          required: false
          description: >-
            A comma-separated list of the claims held by the user making the
            request.
                  If this header is omitted then the user will be assumed to have no claims.
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/SvcAuthUserRecord'
      security:
        - apiKeyAuth: []
components:
  requestBodies:
    NewAuthDeviceRequestBody:
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/SvcAuthDeviceTemplate'
    PatchAuthDeviceRequestBody:
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/SvcAuthDevicePatch'
    ReplaceAuthDeviceRequestBody:
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/SvcAuthDeviceReplacement'
    NewAuthSessionRequestBody:
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/SvcAuthSessionTemplate'
    PatchAuthSessionRequestBody:
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/SvcAuthSessionPatch'
    ReplaceAuthSessionRequestBody:
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/SvcAuthSessionReplacement'
    OperateOnAuthSessionExtendRequestBody:
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/SvcAuthSessionExtendParams'
    NewAuthUserRequestBody:
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/SvcAuthUserTemplate'
    PatchAuthUserRequestBody:
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/SvcAuthUserPatch'
    ReplaceAuthUserRequestBody:
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/SvcAuthUserReplacement'
  schemas:
    SvcAuthDeviceRecord:
      type: object
      properties:
        id:
          type: string
          title: >-
            A universally unique 128 bit number formatted as 32 alphanumeric
            characters
                and defined by RFC 4122.
          description: The globally unique id for the document.
        docType:
          type: string
          title: A string with up to 50 unicode characters.
          description: The name of the document type.
        docOpIds:
          type: array
          title: An array of StdUuid values.
          description: The ids of the recently completed operations.
          items:
            type: string
        docVersion:
          type: string
          title: A string with up to 50 unicode characters.
          description: The unique version assigned to a document.
        docCreatedByUserId:
          type: string
          title: A string with up to 50 unicode characters.
          description: The id of the user that created the document.
        docCreatedMillisecondsSinceEpoch:
          type: number
          title: >-
            The number of milliseconds that have elapsed since 00:00:00
            Thursday, 1 January 1970,
                represented as a 64-bit integer.
          description: >-
            The number of milliseconds since the epoch when the document was
            created.
        docLastUpdatedByUserId:
          type: string
          title: A string with up to 50 unicode characters.
          description: The id of the user that last updated the document.
        docLastUpdatedMillisecondsSinceEpoch:
          type: number
          title: >-
            The number of milliseconds that have elapsed since 00:00:00
            Thursday, 1 January 1970,
                represented as a 64-bit integer.
          description: >-
            The number of milliseconds since the epoch when the document was
            last updated.
        authUserId:
          type: string
          title: >-
            A universally unique 128 bit number formatted as 32 alphanumeric
            characters
                and defined by RFC 4122.
          description: The id of the user that the device was used by.
    SvcAuthDeviceTemplate:
      type: object
      properties:
        id:
          type: string
          title: >-
            A universally unique 128 bit number formatted as 32 alphanumeric
            characters
                and defined by RFC 4122.
          description: The globally unique id for the document.
        authUserId:
          type: string
          title: >-
            A universally unique 128 bit number formatted as 32 alphanumeric
            characters
                and defined by RFC 4122.
          description: The id of the user that the device was used by.
      required:
        - id
        - authUserId
    SvcAuthDevicePatch:
      type: object
      properties:
        authUserId:
          type: string
          nullable: true
          title: >-
            A universally unique 128 bit number formatted as 32 alphanumeric
            characters
                and defined by RFC 4122.
          description: The id of the user that the device was used by.
    SvcAuthDeviceReplacement:
      type: object
      properties:
        id:
          type: string
          title: >-
            A universally unique 128 bit number formatted as 32 alphanumeric
            characters
                and defined by RFC 4122.
          description: The globally unique id for the document.
        docType:
          type: string
          title: A string with up to 50 unicode characters.
          description: The name of the document type.
        docOpIds:
          type: array
          title: An array of StdUuid values.
          description: The ids of the recently completed operations.
          items:
            type: string
        docCreatedByUserId:
          type: string
          title: A string with up to 50 unicode characters.
          description: The id of the user that created the document.
        docCreatedMillisecondsSinceEpoch:
          type: number
          title: >-
            The number of milliseconds that have elapsed since 00:00:00
            Thursday, 1 January 1970,
                represented as a 64-bit integer.
          description: >-
            The number of milliseconds since the epoch when the document was
            created.
        docLastUpdatedByUserId:
          type: string
          title: A string with up to 50 unicode characters.
          description: The id of the user that last updated the document.
        docLastUpdatedMillisecondsSinceEpoch:
          type: number
          title: >-
            The number of milliseconds that have elapsed since 00:00:00
            Thursday, 1 January 1970,
                represented as a 64-bit integer.
          description: >-
            The number of milliseconds since the epoch when the document was
            last updated.
        authUserId:
          type: string
          title: >-
            A universally unique 128 bit number formatted as 32 alphanumeric
            characters
                and defined by RFC 4122.
          description: The id of the user that the device was used by.
      required:
        - id
        - docType
        - authUserId
    SvcAuthSessionRecord:
      type: object
      properties:
        id:
          type: string
          title: >-
            A universally unique 128 bit number formatted as 32 alphanumeric
            characters
                and defined by RFC 4122.
          description: The globally unique id for the document.
        docType:
          type: string
          title: A string with up to 50 unicode characters.
          description: The name of the document type.
        docOpIds:
          type: array
          title: An array of StdUuid values.
          description: The ids of the recently completed operations.
          items:
            type: string
        docVersion:
          type: string
          title: A string with up to 50 unicode characters.
          description: The unique version assigned to a document.
        docCreatedByUserId:
          type: string
          title: A string with up to 50 unicode characters.
          description: The id of the user that created the document.
        docCreatedMillisecondsSinceEpoch:
          type: number
          title: >-
            The number of milliseconds that have elapsed since 00:00:00
            Thursday, 1 January 1970,
                represented as a 64-bit integer.
          description: >-
            The number of milliseconds since the epoch when the document was
            created.
        docLastUpdatedByUserId:
          type: string
          title: A string with up to 50 unicode characters.
          description: The id of the user that last updated the document.
        docLastUpdatedMillisecondsSinceEpoch:
          type: number
          title: >-
            The number of milliseconds that have elapsed since 00:00:00
            Thursday, 1 January 1970,
                represented as a 64-bit integer.
          description: >-
            The number of milliseconds since the epoch when the document was
            last updated.
        authUserId:
          type: string
          title: >-
            A universally unique 128 bit number formatted as 32 alphanumeric
            characters
                and defined by RFC 4122.
          description: The id of the user that the session belongs too.
        startDateTime:
          type: string
          title: >-
            A string with the date and time components arranged using the
            YYYY-MM-DDTHH:mm:ss.zzzZ
                pattern. Leading zeroes must be used to ensure that all values are the same length.
                The string must always end with a Z to indicate that value is based on UTC and not
                an alternative time zone.
                The regex checks that numbers appear in the correct location but will not pickup invalid
                date/times like 2020-02-31T12:00:00.000Z.
          description: The date and time that the session started.
        lastUsedDateTime:
          type: string
          title: >-
            A string with the date and time components arranged using the
            YYYY-MM-DDTHH:mm:ss.zzzZ
                pattern. Leading zeroes must be used to ensure that all values are the same length.
                The string must always end with a Z to indicate that value is based on UTC and not
                an alternative time zone.
                The regex checks that numbers appear in the correct location but will not pickup invalid
                date/times like 2020-02-31T12:00:00.000Z.
          description: The date and time that the session was last used.
        expiryDateTime:
          type: string
          title: >-
            A string with the date and time components arranged using the
            YYYY-MM-DDTHH:mm:ss.zzzZ
                pattern. Leading zeroes must be used to ensure that all values are the same length.
                The string must always end with a Z to indicate that value is based on UTC and not
                an alternative time zone.
                The regex checks that numbers appear in the correct location but will not pickup invalid
                date/times like 2020-02-31T12:00:00.000Z.
          description: The date and time that the session will expire.
        deviceId:
          type: string
          title: >-
            A universally unique 128 bit number formatted as 32 alphanumeric
            characters
                and defined by RFC 4122.
          description: The id of the device that the session was started on.
        remoteIp:
          type: string
          title: A string with up to 20 unicode characters.
          description: The IP address of the user when the session started.
        client:
          type: string
          title: A string with up to 20 unicode characters.
          description: >-
            The descriptor of the client application, e.g. WebApp 1.0 or iOS App
            1.0.
        browser:
          type: string
          title: A string with up to 20 unicode characters.
          description: >-
            The descriptor of the browser, e.g. Chrome 102.  This may be omitted
            if the client is not a web application.
        os:
          type: string
          title: A string with up to 20 unicode characters.
          description: The descriptor of the operating system.
    SvcAuthSessionTemplate:
      type: object
      properties:
        id:
          type: string
          title: >-
            A universally unique 128 bit number formatted as 32 alphanumeric
            characters
                and defined by RFC 4122.
          description: The globally unique id for the document.
        authUserId:
          type: string
          title: >-
            A universally unique 128 bit number formatted as 32 alphanumeric
            characters
                and defined by RFC 4122.
          description: The id of the user that the session belongs too.
        startDateTime:
          type: string
          title: >-
            A string with the date and time components arranged using the
            YYYY-MM-DDTHH:mm:ss.zzzZ
                pattern. Leading zeroes must be used to ensure that all values are the same length.
                The string must always end with a Z to indicate that value is based on UTC and not
                an alternative time zone.
                The regex checks that numbers appear in the correct location but will not pickup invalid
                date/times like 2020-02-31T12:00:00.000Z.
          description: The date and time that the session started.
        lastUsedDateTime:
          type: string
          title: >-
            A string with the date and time components arranged using the
            YYYY-MM-DDTHH:mm:ss.zzzZ
                pattern. Leading zeroes must be used to ensure that all values are the same length.
                The string must always end with a Z to indicate that value is based on UTC and not
                an alternative time zone.
                The regex checks that numbers appear in the correct location but will not pickup invalid
                date/times like 2020-02-31T12:00:00.000Z.
          description: The date and time that the session was last used.
        expiryDateTime:
          type: string
          title: >-
            A string with the date and time components arranged using the
            YYYY-MM-DDTHH:mm:ss.zzzZ
                pattern. Leading zeroes must be used to ensure that all values are the same length.
                The string must always end with a Z to indicate that value is based on UTC and not
                an alternative time zone.
                The regex checks that numbers appear in the correct location but will not pickup invalid
                date/times like 2020-02-31T12:00:00.000Z.
          description: The date and time that the session will expire.
        deviceId:
          type: string
          title: >-
            A universally unique 128 bit number formatted as 32 alphanumeric
            characters
                and defined by RFC 4122.
          description: The id of the device that the session was started on.
        remoteIp:
          type: string
          title: A string with up to 20 unicode characters.
          description: The IP address of the user when the session started.
        client:
          type: string
          title: A string with up to 20 unicode characters.
          description: >-
            The descriptor of the client application, e.g. WebApp 1.0 or iOS App
            1.0.
        browser:
          type: string
          title: A string with up to 20 unicode characters.
          description: >-
            The descriptor of the browser, e.g. Chrome 102.  This may be omitted
            if the client is not a web application.
        os:
          type: string
          title: A string with up to 20 unicode characters.
          description: The descriptor of the operating system.
      required:
        - id
        - authUserId
        - startDateTime
        - lastUsedDateTime
        - expiryDateTime
        - deviceId
        - remoteIp
        - client
        - os
    SvcAuthSessionPatch:
      type: object
      properties:
        authUserId:
          type: string
          nullable: true
          title: >-
            A universally unique 128 bit number formatted as 32 alphanumeric
            characters
                and defined by RFC 4122.
          description: The id of the user that the session belongs too.
        startDateTime:
          type: string
          nullable: true
          title: >-
            A string with the date and time components arranged using the
            YYYY-MM-DDTHH:mm:ss.zzzZ
                pattern. Leading zeroes must be used to ensure that all values are the same length.
                The string must always end with a Z to indicate that value is based on UTC and not
                an alternative time zone.
                The regex checks that numbers appear in the correct location but will not pickup invalid
                date/times like 2020-02-31T12:00:00.000Z.
          description: The date and time that the session started.
        lastUsedDateTime:
          type: string
          nullable: true
          title: >-
            A string with the date and time components arranged using the
            YYYY-MM-DDTHH:mm:ss.zzzZ
                pattern. Leading zeroes must be used to ensure that all values are the same length.
                The string must always end with a Z to indicate that value is based on UTC and not
                an alternative time zone.
                The regex checks that numbers appear in the correct location but will not pickup invalid
                date/times like 2020-02-31T12:00:00.000Z.
          description: The date and time that the session was last used.
        expiryDateTime:
          type: string
          nullable: true
          title: >-
            A string with the date and time components arranged using the
            YYYY-MM-DDTHH:mm:ss.zzzZ
                pattern. Leading zeroes must be used to ensure that all values are the same length.
                The string must always end with a Z to indicate that value is based on UTC and not
                an alternative time zone.
                The regex checks that numbers appear in the correct location but will not pickup invalid
                date/times like 2020-02-31T12:00:00.000Z.
          description: The date and time that the session will expire.
        deviceId:
          type: string
          nullable: true
          title: >-
            A universally unique 128 bit number formatted as 32 alphanumeric
            characters
                and defined by RFC 4122.
          description: The id of the device that the session was started on.
        remoteIp:
          type: string
          nullable: true
          title: A string with up to 20 unicode characters.
          description: The IP address of the user when the session started.
        client:
          type: string
          nullable: true
          title: A string with up to 20 unicode characters.
          description: >-
            The descriptor of the client application, e.g. WebApp 1.0 or iOS App
            1.0.
        browser:
          type: string
          nullable: true
          title: A string with up to 20 unicode characters.
          description: >-
            The descriptor of the browser, e.g. Chrome 102.  This may be omitted
            if the client is not a web application.
        os:
          type: string
          nullable: true
          title: A string with up to 20 unicode characters.
          description: The descriptor of the operating system.
    SvcAuthSessionReplacement:
      type: object
      properties:
        id:
          type: string
          title: >-
            A universally unique 128 bit number formatted as 32 alphanumeric
            characters
                and defined by RFC 4122.
          description: The globally unique id for the document.
        docType:
          type: string
          title: A string with up to 50 unicode characters.
          description: The name of the document type.
        docOpIds:
          type: array
          title: An array of StdUuid values.
          description: The ids of the recently completed operations.
          items:
            type: string
        docCreatedByUserId:
          type: string
          title: A string with up to 50 unicode characters.
          description: The id of the user that created the document.
        docCreatedMillisecondsSinceEpoch:
          type: number
          title: >-
            The number of milliseconds that have elapsed since 00:00:00
            Thursday, 1 January 1970,
                represented as a 64-bit integer.
          description: >-
            The number of milliseconds since the epoch when the document was
            created.
        docLastUpdatedByUserId:
          type: string
          title: A string with up to 50 unicode characters.
          description: The id of the user that last updated the document.
        docLastUpdatedMillisecondsSinceEpoch:
          type: number
          title: >-
            The number of milliseconds that have elapsed since 00:00:00
            Thursday, 1 January 1970,
                represented as a 64-bit integer.
          description: >-
            The number of milliseconds since the epoch when the document was
            last updated.
        authUserId:
          type: string
          title: >-
            A universally unique 128 bit number formatted as 32 alphanumeric
            characters
                and defined by RFC 4122.
          description: The id of the user that the session belongs too.
        startDateTime:
          type: string
          title: >-
            A string with the date and time components arranged using the
            YYYY-MM-DDTHH:mm:ss.zzzZ
                pattern. Leading zeroes must be used to ensure that all values are the same length.
                The string must always end with a Z to indicate that value is based on UTC and not
                an alternative time zone.
                The regex checks that numbers appear in the correct location but will not pickup invalid
                date/times like 2020-02-31T12:00:00.000Z.
          description: The date and time that the session started.
        lastUsedDateTime:
          type: string
          title: >-
            A string with the date and time components arranged using the
            YYYY-MM-DDTHH:mm:ss.zzzZ
                pattern. Leading zeroes must be used to ensure that all values are the same length.
                The string must always end with a Z to indicate that value is based on UTC and not
                an alternative time zone.
                The regex checks that numbers appear in the correct location but will not pickup invalid
                date/times like 2020-02-31T12:00:00.000Z.
          description: The date and time that the session was last used.
        expiryDateTime:
          type: string
          title: >-
            A string with the date and time components arranged using the
            YYYY-MM-DDTHH:mm:ss.zzzZ
                pattern. Leading zeroes must be used to ensure that all values are the same length.
                The string must always end with a Z to indicate that value is based on UTC and not
                an alternative time zone.
                The regex checks that numbers appear in the correct location but will not pickup invalid
                date/times like 2020-02-31T12:00:00.000Z.
          description: The date and time that the session will expire.
        deviceId:
          type: string
          title: >-
            A universally unique 128 bit number formatted as 32 alphanumeric
            characters
                and defined by RFC 4122.
          description: The id of the device that the session was started on.
        remoteIp:
          type: string
          title: A string with up to 20 unicode characters.
          description: The IP address of the user when the session started.
        client:
          type: string
          title: A string with up to 20 unicode characters.
          description: >-
            The descriptor of the client application, e.g. WebApp 1.0 or iOS App
            1.0.
        browser:
          type: string
          title: A string with up to 20 unicode characters.
          description: >-
            The descriptor of the browser, e.g. Chrome 102.  This may be omitted
            if the client is not a web application.
        os:
          type: string
          title: A string with up to 20 unicode characters.
          description: The descriptor of the operating system.
      required:
        - id
        - docType
        - authUserId
        - startDateTime
        - lastUsedDateTime
        - expiryDateTime
        - deviceId
        - remoteIp
        - client
        - os
    SvcAuthSessionExtendParams:
      type: object
      properties:
        browser:
          type: string
          title: A string with up to 20 unicode characters.
          description: The browser that was used to extend the session.
      required:
        - browser
    SvcAuthUserRecord:
      type: object
      properties:
        id:
          type: string
          title: >-
            A universally unique 128 bit number formatted as 32 alphanumeric
            characters
                and defined by RFC 4122.
          description: The globally unique id for the document.
        docType:
          type: string
          title: A string with up to 50 unicode characters.
          description: The name of the document type.
        docOpIds:
          type: array
          title: An array of StdUuid values.
          description: The ids of the recently completed operations.
          items:
            type: string
        docVersion:
          type: string
          title: A string with up to 50 unicode characters.
          description: The unique version assigned to a document.
        docCreatedByUserId:
          type: string
          title: A string with up to 50 unicode characters.
          description: The id of the user that created the document.
        docCreatedMillisecondsSinceEpoch:
          type: number
          title: >-
            The number of milliseconds that have elapsed since 00:00:00
            Thursday, 1 January 1970,
                represented as a 64-bit integer.
          description: >-
            The number of milliseconds since the epoch when the document was
            created.
        docLastUpdatedByUserId:
          type: string
          title: A string with up to 50 unicode characters.
          description: The id of the user that last updated the document.
        docLastUpdatedMillisecondsSinceEpoch:
          type: number
          title: >-
            The number of milliseconds that have elapsed since 00:00:00
            Thursday, 1 January 1970,
                represented as a 64-bit integer.
          description: >-
            The number of milliseconds since the epoch when the document was
            last updated.
        email:
          type: string
          title: >-
            The regex will check that an email address is in the common
            person@domain.tld format.
          description: The user's email address.
        displayName:
          type: string
          title: A string with up to 20 unicode characters.
          description: A short display name for the account.
        fullName:
          type: string
          title: A string with up to 50 unicode characters.
          description: The full name for the account.
        emailVerifiedDateTime:
          type: string
          title: >-
            A string with the date and time components arranged using the
            YYYY-MM-DDTHH:mm:ss.zzzZ
                pattern. Leading zeroes must be used to ensure that all values are the same length.
                The string must always end with a Z to indicate that value is based on UTC and not
                an alternative time zone.
                The regex checks that numbers appear in the correct location but will not pickup invalid
                date/times like 2020-02-31T12:00:00.000Z.
          description: The date and time that the email address was verified.
        emailVerificationCode:
          type: string
          title: >-
            A universally unique 128 bit number formatted as 32 alphanumeric
            characters
                and defined by RFC 4122.
          description: The current verification code.
        emailVerificationExpiryDateTime:
          type: string
          title: >-
            A string with the date and time components arranged using the
            YYYY-MM-DDTHH:mm:ss.zzzZ
                pattern. Leading zeroes must be used to ensure that all values are the same length.
                The string must always end with a Z to indicate that value is based on UTC and not
                an alternative time zone.
                The regex checks that numbers appear in the correct location but will not pickup invalid
                date/times like 2020-02-31T12:00:00.000Z.
          description: The date and time that the email verification code will expire.
        saltedHashedPassword:
          type: string
          title: A string with up to 250 unicode characters.
          description: The user's salted and hashed password.
    SvcAuthUserTemplate:
      type: object
      properties:
        id:
          type: string
          title: >-
            A universally unique 128 bit number formatted as 32 alphanumeric
            characters
                and defined by RFC 4122.
          description: The globally unique id for the document.
        email:
          type: string
          title: >-
            The regex will check that an email address is in the common
            person@domain.tld format.
          description: The user's email address.
        displayName:
          type: string
          title: A string with up to 20 unicode characters.
          description: A short display name for the account.
        fullName:
          type: string
          title: A string with up to 50 unicode characters.
          description: The full name for the account.
        emailVerifiedDateTime:
          type: string
          title: >-
            A string with the date and time components arranged using the
            YYYY-MM-DDTHH:mm:ss.zzzZ
                pattern. Leading zeroes must be used to ensure that all values are the same length.
                The string must always end with a Z to indicate that value is based on UTC and not
                an alternative time zone.
                The regex checks that numbers appear in the correct location but will not pickup invalid
                date/times like 2020-02-31T12:00:00.000Z.
          description: The date and time that the email address was verified.
        emailVerificationCode:
          type: string
          title: >-
            A universally unique 128 bit number formatted as 32 alphanumeric
            characters
                and defined by RFC 4122.
          description: The current verification code.
        emailVerificationExpiryDateTime:
          type: string
          title: >-
            A string with the date and time components arranged using the
            YYYY-MM-DDTHH:mm:ss.zzzZ
                pattern. Leading zeroes must be used to ensure that all values are the same length.
                The string must always end with a Z to indicate that value is based on UTC and not
                an alternative time zone.
                The regex checks that numbers appear in the correct location but will not pickup invalid
                date/times like 2020-02-31T12:00:00.000Z.
          description: The date and time that the email verification code will expire.
        saltedHashedPassword:
          type: string
          title: A string with up to 250 unicode characters.
          description: The user's salted and hashed password.
      required:
        - id
        - email
    SvcAuthUserPatch:
      type: object
      properties:
        email:
          type: string
          nullable: true
          title: >-
            The regex will check that an email address is in the common
            person@domain.tld format.
          description: The user's email address.
        displayName:
          type: string
          nullable: true
          title: A string with up to 20 unicode characters.
          description: A short display name for the account.
        fullName:
          type: string
          nullable: true
          title: A string with up to 50 unicode characters.
          description: The full name for the account.
        emailVerifiedDateTime:
          type: string
          nullable: true
          title: >-
            A string with the date and time components arranged using the
            YYYY-MM-DDTHH:mm:ss.zzzZ
                pattern. Leading zeroes must be used to ensure that all values are the same length.
                The string must always end with a Z to indicate that value is based on UTC and not
                an alternative time zone.
                The regex checks that numbers appear in the correct location but will not pickup invalid
                date/times like 2020-02-31T12:00:00.000Z.
          description: The date and time that the email address was verified.
        emailVerificationCode:
          type: string
          nullable: true
          title: >-
            A universally unique 128 bit number formatted as 32 alphanumeric
            characters
                and defined by RFC 4122.
          description: The current verification code.
        emailVerificationExpiryDateTime:
          type: string
          nullable: true
          title: >-
            A string with the date and time components arranged using the
            YYYY-MM-DDTHH:mm:ss.zzzZ
                pattern. Leading zeroes must be used to ensure that all values are the same length.
                The string must always end with a Z to indicate that value is based on UTC and not
                an alternative time zone.
                The regex checks that numbers appear in the correct location but will not pickup invalid
                date/times like 2020-02-31T12:00:00.000Z.
          description: The date and time that the email verification code will expire.
        saltedHashedPassword:
          type: string
          nullable: true
          title: A string with up to 250 unicode characters.
          description: The user's salted and hashed password.
    SvcAuthUserReplacement:
      type: object
      properties:
        id:
          type: string
          title: >-
            A universally unique 128 bit number formatted as 32 alphanumeric
            characters
                and defined by RFC 4122.
          description: The globally unique id for the document.
        docType:
          type: string
          title: A string with up to 50 unicode characters.
          description: The name of the document type.
        docOpIds:
          type: array
          title: An array of StdUuid values.
          description: The ids of the recently completed operations.
          items:
            type: string
        docCreatedByUserId:
          type: string
          title: A string with up to 50 unicode characters.
          description: The id of the user that created the document.
        docCreatedMillisecondsSinceEpoch:
          type: number
          title: >-
            The number of milliseconds that have elapsed since 00:00:00
            Thursday, 1 January 1970,
                represented as a 64-bit integer.
          description: >-
            The number of milliseconds since the epoch when the document was
            created.
        docLastUpdatedByUserId:
          type: string
          title: A string with up to 50 unicode characters.
          description: The id of the user that last updated the document.
        docLastUpdatedMillisecondsSinceEpoch:
          type: number
          title: >-
            The number of milliseconds that have elapsed since 00:00:00
            Thursday, 1 January 1970,
                represented as a 64-bit integer.
          description: >-
            The number of milliseconds since the epoch when the document was
            last updated.
        email:
          type: string
          title: >-
            The regex will check that an email address is in the common
            person@domain.tld format.
          description: The user's email address.
        displayName:
          type: string
          title: A string with up to 20 unicode characters.
          description: A short display name for the account.
        fullName:
          type: string
          title: A string with up to 50 unicode characters.
          description: The full name for the account.
        emailVerifiedDateTime:
          type: string
          title: >-
            A string with the date and time components arranged using the
            YYYY-MM-DDTHH:mm:ss.zzzZ
                pattern. Leading zeroes must be used to ensure that all values are the same length.
                The string must always end with a Z to indicate that value is based on UTC and not
                an alternative time zone.
                The regex checks that numbers appear in the correct location but will not pickup invalid
                date/times like 2020-02-31T12:00:00.000Z.
          description: The date and time that the email address was verified.
        emailVerificationCode:
          type: string
          title: >-
            A universally unique 128 bit number formatted as 32 alphanumeric
            characters
                and defined by RFC 4122.
          description: The current verification code.
        emailVerificationExpiryDateTime:
          type: string
          title: >-
            A string with the date and time components arranged using the
            YYYY-MM-DDTHH:mm:ss.zzzZ
                pattern. Leading zeroes must be used to ensure that all values are the same length.
                The string must always end with a Z to indicate that value is based on UTC and not
                an alternative time zone.
                The regex checks that numbers appear in the correct location but will not pickup invalid
                date/times like 2020-02-31T12:00:00.000Z.
          description: The date and time that the email verification code will expire.
        saltedHashedPassword:
          type: string
          title: A string with up to 250 unicode characters.
          description: The user's salted and hashed password.
      required:
        - id
        - docType
        - email
  securitySchemes:
    apiKeyAuth:
      type: apiKey
      in: header
      name: x-api-key`;
