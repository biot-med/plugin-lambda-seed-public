import {
  API_CALL_ERROR,
  JWT_ERROR,
  NO_EVENT_ERROR,
  NO_DATA_ERROR,
  BIOT_SERVICE_ENVIRONMENT,
  BIOT_APP_NAME,
} from "../constants.js";

const envFallback = "Not specified";

const errors = {
  [API_CALL_ERROR]: (error, traceId) => ({
    statusCode: 500,
    body: {
      code: API_CALL_ERROR,
      message: `Call to api failed${
        error?.cause?.message
          ? `: "${JSON.stringify(error.cause?.message)}"`
          : "."
      }`,
      serviceName: BIOT_APP_NAME || envFallback,
      traceId: traceId,
      environment: BIOT_SERVICE_ENVIRONMENT || envFallback,
      details: {},
    },
  }),
  [JWT_ERROR]: (error, traceId) => ({
    statusCode: 400,
    body: {
      code: JWT_ERROR,
      message: `JWT error occurred${
        error.cause?.message
          ? `: "${JSON.stringify(error.cause?.message)}"`
          : "."
      }`,
      serviceName: BIOT_APP_NAME || envFallback,
      traceId: traceId,
      environment: BIOT_SERVICE_ENVIRONMENT || envFallback,
      details: {},
    },
  }),
  [NO_EVENT_ERROR]: (error, traceId) => ({
    statusCode: 400,
    body: {
      code: NO_EVENT_ERROR,
      message: "No event sent",
      serviceName: BIOT_APP_NAME || envFallback,
      traceId: traceId,
      environment: BIOT_SERVICE_ENVIRONMENT || envFallback,
      details: {},
    },
  }),
  [NO_DATA_ERROR]: (error, traceId) => ({
    statusCode: 400,
    body: {
      code: NO_DATA_ERROR,
      message: "no data sent in event",
      serviceName: BIOT_APP_NAME || envFallback,
      traceId: traceId,
      environment: BIOT_SERVICE_ENVIRONMENT || envFallback,
      details: {},
    },
  }),
  internalServerError: (error, traceId) => ({
    statusCode: 500,
    body: {
      code: InternalServerError,
      message: "internal server error",
      serviceName: BIOT_APP_NAME || envFallback,
      traceId: traceId,
      environment: BIOT_SERVICE_ENVIRONMENT || envFallback,
      details: {},
    },
  }),
};

export const createErrorResponse = (error, traceparent, traceId) => {
  console.error("Got error: ", error);
  return (
    (error && errors[error?.message]?.(error, traceId)) ||
    errors.internalServerError(error, traceId)
  );
};
