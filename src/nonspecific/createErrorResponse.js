import {
  JWT_ERROR,
  NO_EVENT_ERROR,
  NO_DATA_ERROR,
  TRACEPARENT_KEY,
} from "../constants.js";

import { parseTraceparentString, isAxiosError, extractAxiosErrorInfo } from "../utils/index.js";

const errors = {
  [JWT_ERROR]: (error, traceparent, traceId) => ({
    statusCode: 400,
    headers: {
      [TRACEPARENT_KEY]: traceparent,
    },
    body: JSON.stringify({
      code: JWT_ERROR,
      message: `JWT error occurred${
        error.cause?.message
          ? `: "${JSON.stringify(error.cause?.message)}"`
          : "."
      }`,
      traceId: traceId,
      details: {},
    }),
  }),
  [NO_EVENT_ERROR]: (error, traceparent, traceId) => ({
    statusCode: 400,
    headers: {
      [TRACEPARENT_KEY]: traceparent,
    },
    body: JSON.stringify({
      code: NO_EVENT_ERROR,
      message: "no event sent",
      traceId: traceId,
    }),
  }),
  [NO_DATA_ERROR]: (error, traceparent, traceId) => ({
    statusCode: 400,
    headers: {
      [TRACEPARENT_KEY]: traceparent,
    },
    body: JSON.stringify({
      code: NO_DATA_ERROR,
      message: "no data sent in event",
      traceId: traceId,
    }),
  }),
  internalServerError: (error, traceparent, traceId) => ({
    statusCode: 500,
    headers: {
      [TRACEPARENT_KEY]: traceparent,
    },
    body: JSON.stringify({
      code: "INTERNAL_SERVER_ERROR",
      message: "internal server error",
      traceId: traceId,
    }),
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
      headers: {
        [TRACEPARENT_KEY]: traceparent,
      },
      body: JSON.stringify({
        ...axiosErrorInfo.responseData,
        traceId: traceId,
      }),
    };
  }

  // Handle known error types
  if (error && errors[error?.message]) {
    return errors[error.message](error, traceparent, traceId);
  }

  // Default to internal server error
  return errors.internalServerError(error, traceparent, traceId);
};
