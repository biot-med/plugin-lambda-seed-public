import { callToAPIExample } from "../utils/callToAPIExample.js";

export const perform = async (data, token, traceparent) => {
  // -----------------------------------------------------------------------------------------

  // TODO: ADD YOUR CODE HERE !
  // Remove this example call and add your code instead

  // This is an example of changing on of the entities in the response
  // You can change any response value you want

  const changedData = { ...data };

  if (!!changedData.body?.response?.entities[0]?._name.firstName) {
    changedData.body.response.entities[0]._name.firstName =
      changedData.body.response.entities[0]._name.firstName + " LAMBDA";
  }

  // This is an example of calling a BioT API (using the token from the service users token)
  // In this case we are making a get patients request to organization API

  const callExampleResponse = await callToAPIExample(token, traceparent);

  // In this example you perform your logic with the response Here

  console.info("In InterceptorPost got callExampleResponse ", callExampleResponse);

  // -----------------------------------------------------------------------------------------

  return changedData.body;
};
