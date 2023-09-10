import { callToAPIExample } from "../utils/callToAPIExample.js";

export const perform = async (data, token, traceparent) => {
  // -----------------------------------------------------------------------------------------

  // TODO: ADD YOUR CODE HERE !
  // Remove this example call and add your code instead

  // This is an example of changing the request
  // You can change any request value you want

  const changedData = { ...data };

  if (!!changedData.body?.request?.body?._name?.firstName) {
    changedData.body.request.body._name.firstName =
      changedData.body?.request?.body?._name?.firstName + " LAMBDA MODIFIED";
  }

  // This is an example of calling a BioT API (using the token from the service users token)
  // In this case we are making a get patients request to organization API

  const callExampleResponse = await callToAPIExample(token, traceparent);

  // In this example you perform your logic with the response Here

  console.info("In Pre got callExampleResponse ", callExampleResponse);

  // -----------------------------------------------------------------------------------------

  return changedData.body;
};
