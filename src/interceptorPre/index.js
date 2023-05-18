import { login } from "../utils/index.js";
import { authenticate } from "./authenticate.js";
import { extractDataFromEvent } from "./extractDataFromEvent.js";
import { createErrorResponse } from "./createErrorResponse.js";
import { perform } from "./perform.js";

const interceptorPreFunctions = {
  authenticate: authenticate,
  login: login,
  createErrorResponse: createErrorResponse,
  extractDataFromEvent: extractDataFromEvent,
  createErrorResponse: createErrorResponse,
  perform: perform,
};

export default interceptorPreFunctions;

export {
  authenticate,
  login,
  extractDataFromEvent,
  createErrorResponse,
  perform,
};
