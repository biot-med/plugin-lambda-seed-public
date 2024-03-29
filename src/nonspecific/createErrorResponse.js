import {
  API_CALL_ERROR,
  JWT_ERROR,
  NO_EVENT_ERROR,
  NO_METADATA_ERROR,
  NO_DATA_ERROR,
  TRACEPARENT_KEY,
} from "../constants.js";

import { parseTraceparentString } from "../utils/index.js";

const errors = {
  [API_CALL_ERROR]: (error, traceparent, traceId) => ({
    statusCode: 500,
    headers: {
      [TRACEPARENT_KEY]: traceparent,
    },
    body: JSON.stringify({
      code: API_CALL_ERROR,
      message: `Call to api failed${
        error.cause?.message
          ? `: "${JSON.stringify(error.cause?.message)}"`
          : "."
      }`,
      traceId: traceId,
      details: {},
    }),
  }),
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
      message: "internal server error",
      traceId: traceId,
    }),
  }),
};

export const createErrorResponse = (error, traceparent) => {
  console.error("Got error: ", error);
  
  const traceId = parseTraceparentString(traceparent);
  return (
    (error && errors[error?.message]?.(error, traceparent, traceId)) ||
    errors.internalServerError(error, traceId)
  );
};
