export const genericSuccessResponse = (traceId) => ({
  statusCode: 200,
  headers: {
    "x-b3-traceid": traceId,
  },
});
