import { genericSuccessResponse } from "../utils/index.js";
import { callToAPIExample } from "../utils/callToAPIExample.js";

export const perform = async (data, token, traceparent) => {
  // -----------------------------------------------------------------------------------------

  // TODO: ADD YOUR CODE HERE !

  // This is an example of calling a BioT API (using the token from the service users token)
  // In this case we are making a get patients request to organization API
  // Remove this example call and add your code instead

  const callExampleResponse = await callToAPIExample(token, traceparent);

  // In this example you perform your logic with the response Here

  console.info("got callExampleResponse ", callExampleResponse);

  // -----------------------------------------------------------------------------------------
  return genericSuccessResponse(traceparent);
};
