import { login } from "../utils/index.js";
import { authenticate } from "./authenticate";
import { extractDataFromEvent } from "./extractDataFromEvent.js";
import { createErrorResponse } from "./createErrorResponse.js";
import { perform } from "./perform.js";

const interceptorPostEntityFunctions = {
  authenticate: authenticate,
  login: login,
  createErrorResponse: createErrorResponse,
  extractDataFromEvent: extractDataFromEvent,
  perform: perform,
};

export default interceptorPostEntityFunctions;

export {
  authenticate,
  login,
  extractDataFromEvent,
  createErrorResponse,
  perform,
};
