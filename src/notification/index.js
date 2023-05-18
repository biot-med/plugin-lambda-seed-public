import { login } from "../utils/index.js";
import { authenticate } from "./authenticate.js";
import { extractDataFromEvent } from "./extractDataFromEvent.js";
import { createErrorResponse } from "./createErrorResponse.js";
import { perform } from "./perform.js";

const notificationFunctions = {
  authenticate: authenticate,
  login: login,
  createErrorResponse: createErrorResponse,
  extractDataFromEvent: extractDataFromEvent,
  perform: perform,
};

export default notificationFunctions;

export {
  authenticate,
  login,
  extractDataFromEvent,
  createErrorResponse,
  perform,
};
