import { getTraceId, configureLogger, checkRequestType } from "./src/index.js";

import { BIOT_SHOULD_VALIDATE_JWT } from "./src/index.js";

import functionsMapper from "./src/index.js";

// The same lambda instance might run multiple times on different re-invocations.
// So this prevent certain actions on subsequent runs (like log overrides).
let isFirstRun = true;

// This is just an example!
// The structure of the event can be anything

export const handler = async (event) => {
  // The following two logs are just for debugging. You should remove them as soon as you can, the token should not be printed to logs.
  console.info("At Lambda start, got event: ", event);
  console.info("At Lambda start, got body: ", JSON.parse(event.body));

  let traceId = "traceId-not-set";

  // This mapper makes it possible to use all types of the lambdas hooks (notification, interceptors or any other non-specific hooks)
  // This requestType can be replaced with spreading the specific functionsMapper for your type of hook, or a direct import of the types functions
  // Then you can remove checkRequestType and the mapper
  // Example: For interceptorPre, you can remove this and at the top of this file add:
  //          import { authenticate, login, extractDataFromEvent, perform, createErrorResponse } from "./src/interceptorPre/index.js"
  let requestType = checkRequestType(event);
  const {
    authenticate,
    login,
    extractDataFromEvent,
    perform,
    createErrorResponse,
  } = functionsMapper[requestType];

  try {
    // This extracts the data, metadata, token and traceId from the event
    // Note: Some of these properties might not be relevant for certain cases, you can remove them if they are not relevant
    //       For example, metadata does not exist in interceptors' events.
    const { data, eventToken, eventTraceId, metadata } =
      extractDataFromEvent(event);

    // We extract the traceId from the event
    // As a fallback, if the traceId is not included, we get a new traceId from a open BioT AIP service
    traceId = eventTraceId ?? (await getTraceId());

    // The lambda might be reinvoked several times for several consecutive requests
    // This makes sure these commands are only run in the first invocation
    if (isFirstRun) {
      // Here we are creating new logs format that follows the structure required for dataDog logs (including a traceId)
      await configureLogger(traceId);
      isFirstRun = false;
    }

    // This is the authentication process for the lambda itself
    // Note: environment variable BIOT_SHOULD_VALIDATE_JWT should be false if the lambda does not receive a token, otherwise authentication will fail the lambda
    if (BIOT_SHOULD_VALIDATE_JWT === true) await authenticate(eventToken, traceId);

    // Here we are requesting a token for the lambda
    // It is done using a service users BIOT_SERVICE_USER_ID and BIOT_SERVICE_USER_SECRET_KEY that should be set to an environment variable
    const token = await login(traceId);

    // Some of the properties sent to perform might not be relevant, depending on the type of lambda or lambda hook used to invoke it
    const response = await perform(
      data,
      token || null,
      traceId,
      metadata || null
    );

    return response;
  } catch (error) {
    // This should return the proper error responses by the type of error that occurred
    // See the createErrorResponse function for your specific lambda usage
    return createErrorResponse(error, traceId);
  }
};
