import { callToAPIExample } from "../utils/callToAPIExample.js";

export const perform = async (data, token, traceId) => {
  // -----------------------------------------------------------------------------------------

  // TODO: ADD YOUR CODE HERE !
  // Remove this example call and add your code instead

  // This is an example of changing the response
  // You can change any response value you want

  const changedData = { ...data };

  if (!!changedData.body?.response?.body?._name?.firstName) {
    changedData.body.response.body._name.firstName =
      changedData.body?.response?.body?._name?.firstName + " LAMBDA MODIFIED";
  }

  // This is an example of calling a BioT API (using the token from the service users token)
  // In this case we are making a get patients request to organization API

  const callExampleResponse = await callToAPIExample(token, traceId);

  // In this example you perform your logic with the response Here

  console.info("In POST got callExampleResponse ", callExampleResponse);

  // ----------------------------------------------------------------------------------

  return changedData.body.response;
};
