export const genericSuccessResponse = (traceId) => ({
  statusCode: 200,
  headers: {
    "trace-id": traceId,
  },
});
