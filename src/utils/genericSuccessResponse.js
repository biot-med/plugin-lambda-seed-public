export const genericSuccessResponse = (traceId) => ({
  statusCode: 200,
  headers: {
    "traceid": traceId,
  },
});
