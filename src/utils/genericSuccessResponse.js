export const genericSuccessResponse = (traceId) => ({
  statusCode: 200,
  headers: {
    [TRACE_ID_KEY]: traceId,
  },
});
