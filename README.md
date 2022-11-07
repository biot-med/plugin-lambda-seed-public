# README

# BioT's general lambda seed.

_This is a basic template for lambda to be used as a starting point for AWS lambdas extending BioT's services._

This seed works with different triggers (hooks), each hook has it's own functions to be used according to the data received from the hook and, accordingly, the data structure that needs to be returned from the lambda. The lambda first determines what hook is used and retrieves the relevant functions (using a mapper).

For the lambda to work as is, the hooktype property must be specified in the header sent in the event (except for non-specific lambdas, which the lambda defaults to if the hooktype is not specified).

**The supported hooks are:**

- Notifications - notification services
  - hooktype name: `NOTIFICATION`
- Interceptors for pre-requests
  - hooktype name: `INTERCEPTOR_PRE`
- Interceptors for post-requests
  - hooktype name: `INTERCEPTOR_POST`
- Interceptors for Adapt entity (which are also post-requests)
  - hooktype name: `INTERCEPTOR_POST_ENTITY`
- Other general lambdas not mentioned above
  - ( hooktype not required but in the code accessed using `NONSPECIFIC` )

## Basic code flow

**This is the lambdas basic flow (see the lambdas root index.js file):**

1. These basic functions run at the beginning of the lambda (you can change them as required):

- `checkRequestType(event)` - this function checks the hook type from the event. If the lambda has only one usage this can be removed (along with the following functionsMapper.

- `const { ... } = functionsMapper[requestType]` - This extracts the functions from the relevant hook type folder. If you use the lambda for just one of the hooks you can import the functions directly from the folder and delete this line.

- `extractDataFromEvent` - extract the data, metadata, traceId and token from the lambda's event (this is diffract for each hook type).

- `traceId = eventTraceId || (await getTraceId())` - get a traceId from the event (or fallback to a traceId from a BioT service)

- `configureLogger` - creating new logs format that follows the structure required for dataDog logs (including a traceId). Environment variable BIOT_SHOULD_VALIDATE_JWT should be false if the lambda does not receive a token, otherwise authentication will fail the lambda

- `authenticate` - authenticate the token sent by the notification service.

- `login` - login the lambda (service user) and get a token

- `perform` - This is where you write your code. The `perform` functions typically call `datacallToAPIExample` to show an example of calling a BioT service. The interceptors also show an example of changing the data sent in the request/response.
  Note: Not all the argument set to the perform function are relevant for every hook type, so fallbacks are supplied to prevent code errors.
  _Make sure to remove the examples in the lambda and substitute your own._

- `createErrorResponse` - This is a mapper for errors to be returned from the lambda.
  - In case of interceptors, the data structure is important (follow the data structure supplied for the interceptors in their `createErrorResponse` function.
  - If you add a new error code, add the error's code name to the constants, add the error response in `createErrorResponse`, and use `throw new error(ERROR_CODE_NAME)` where the error occur in your code.

## Environment variables

**Make sure to define these env variables in your lambda**:

- `BIOT_APP_NAME` - name of this lambda - this is for logging purposes

- `BIOT_BASE_URL` - for example https://api.int.biot-med.com

- `BIOT_JWT_PERMISSION_INTERCEPTION` or `BIOT_JWT_PERMISSION_NOTIFICATION` - permissions sent in the token.
  The default for this is a single string - `ACTION_NOTIFICATION` for notifications or `PLUGIN_INTERCEPTOR` for interceptors.

- `BIOT_SERVICE_ENVIRONMENT` - for instance "gen2int"

- `BIOT_PUBLIC_KEY` - the public key to verify the token sent by the notification service

- `BIOT_SERVICE_USER_ID` - the lambdas service users id

- `BIOT_SERVICE_USER_SECRET_KEY` - the lambdas service users secret key

- `BIOT_SHOULD_VALIDATE_JWT` - This should be false if the service does not

## Setups

_Read the comments and todos specified in the code to further understand the functions and flow._

### Pack

Use the pack in scripts folder to zip all required files to upload to the lambda
Run: `npm run zip`

### Cleaning up unwanted code

If you are using the lambda seed for just one type of hook, you can remove all folders not relevant for the usage and delete the `checkRequestType` and the `functionsMapper` lines, then import the functions normally (with import) directly from the remaining folder. For instance, for interceptorPre, use:

`import { authenticate, login, extractDataFromEvent, perform, createErrorResponse } from "./src/interceptorPre/index.js"`

Unused steps and functions can be removed too.

### Constants

For running locally you can use the dev constants (in constants file), Just make sure the functions using those variables are changed accordingly.

### Interceptors - Note

You can read about the interceptors' api calls here:
https://softimize.atlassian.net/wiki/spaces/WIKI/pages/3013247000/Interceptor+Plugin
