import axios from "axios";
import { API_CALL_ERROR, BIOT_BASE_URL, TRACEPARENT_KEY } from "../constants.js";

/** This is a call to a BioT API, it can be any call provided the lambda service user has permission */

export const callToAPIExample = async (newToken, traceparent) => {
  const BioTApiCallUrl = `${BIOT_BASE_URL}/organization/v1/users/patients`;

  try {
    // This get request asks for patients from organization API
    const response = await axios({
      method: "get",
      url: BioTApiCallUrl,
      params: { searchRequest: {} },
      headers: { authorization: `Bearer ${newToken}`, [TRACEPARENT_KEY]: traceparent },
    });

    const { data: patients } = response?.data || {};

    return patients;
  } catch (error) {
    throw new Error(API_CALL_ERROR, { cause: error });
  }
};
