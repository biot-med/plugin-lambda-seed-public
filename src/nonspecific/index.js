import { authenticate, login } from "../utils/index.js";
import { extractDataFromEvent } from "./extractDataFromEvent.js";
import { createErrorResponse } from "./createErrorResponse.js";
import { perform } from "./perform.js";

const nonspecificFunctions = {
  //If you use this hook and get a token from BioT BE you can use the normal auth function here (from util folder)
  authenticate: () => null,
  login: login,
  callToAPIExample: () => null,
  createErrorResponse: createErrorResponse,
  extractDataFromEvent: extractDataFromEvent,
  perform: perform,
};

export default nonspecificFunctions;

export {
  authenticate,
  login,
  extractDataFromEvent,
  createErrorResponse,
  perform,
};
