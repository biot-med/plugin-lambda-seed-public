import { genericSuccessResponse } from "../utils/index.js";

export const perform = async (data, token = null, traceparent, metadata) => {
  // -----------------------------------------------------------------------------------------

  // TODO: ADD YOUR CODE HERE !
  // Remove this example call and add your code instead

  console.info("In Nonspecific lambda, some action was performed!");

  // Return your response here (replace genericSuccessResponse with your response)
  return genericSuccessResponse(traceparent);

  // -----------------------------------------------------------------------------------------
};
