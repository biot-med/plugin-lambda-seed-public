import {
  JWT_ERROR,
  NO_EVENT_ERROR,
  NO_DATA_ERROR,
  BIOT_SERVICE_ENVIRONMENT,
  BIOT_APP_NAME,
} from "../constants.js";

import { parseTraceparentString, isAxiosError, extractAxiosErrorInfo } from "../utils/index.js";

const envFallback = "Not specified";

const errors = {
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
      code: "INTERNAL_SERVER_ERROR",
      message: "internal server error",
      serviceName: BIOT_APP_NAME || envFallback,
      traceId: traceId,
      environment: BIOT_SERVICE_ENVIRONMENT || envFallback,
      details: {},
    },
  }),
};

export const createErrorResponse = (error, traceparent) => {
  console.error("Got error: ", error);

  const traceId = parseTraceparentString(traceparent);

  // Handle axios errors (server errors) - these should be thrown and then formatted here
  if (isAxiosError(error)) {
    const axiosErrorInfo = extractAxiosErrorInfo(error);
    return {
      statusCode: axiosErrorInfo.statusCode,
      body: {
        ...axiosErrorInfo.responseData,
        serviceName: BIOT_APP_NAME || envFallback,
        traceId: traceId,
        environment: BIOT_SERVICE_ENVIRONMENT || envFallback,
      },
    };
  }

  // Handle known error types
  if (error && errors[error?.message]) {
    return errors[error.message](error, traceId);
  }

  // Default to internal server error
  return errors.internalServerError(error, traceId);
};
