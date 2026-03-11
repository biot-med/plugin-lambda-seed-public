import { authenticate,login } from "../services/auth/index.js";
import { extractDataFromEvent } from "./extractDataFromEvent.js";
import { createErrorResponse } from "./createErrorResponse.js";
import { perform } from "./perform.js";

const interceptorPostFunctions = {
  authenticate,
  login,
  createErrorResponse: createErrorResponse,
  extractDataFromEvent: extractDataFromEvent,
  perform: perform,
};

export default interceptorPostFunctions;

export {
  authenticate,
  login,
  extractDataFromEvent,
  createErrorResponse,
  perform,
};
