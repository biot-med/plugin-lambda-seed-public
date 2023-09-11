import axios from "axios";
import JWT from "jsonwebtoken";
import {
  JWT_ERROR,
  BIOT_JWT_PERMISSION,
  BIOT_BASE_URL,
  BIOT_SERVICE_USER_ID,
  BIOT_SERVICE_USER_SECRET_KEY,
  GET_PUBLIC_KEY_API_URL,
} from "../constants.js";

let publicKey = null;

// This prepares the publicKey to be used with jsonwebtoken's parse (in checkJWT function)
const constructPublicKey = (publicKey) => {
  return [
    "-----BEGIN PUBLIC KEY-----",
    publicKey,
    "-----END PUBLIC KEY-----",
  ].join("\n");
}
export const getPublicKey = async () => {
  
  const response = await axios.get(
    `${BIOT_BASE_URL}${GET_PUBLIC_KEY_API_URL}`
  );
  
  const { publicKey } = response?.data;
  return publicKey;
}

export const checkJWT = async (token, requiredPermission) => {
  
  if(!publicKey) {
    const responsePublicKey = await getPublicKey();
    publicKey = constructPublicKey(responsePublicKey);
  }
  // This validates the token sent by the notification service
  const jwtData = await JWT.verify(token, publicKey, {
    algorithms: ["RS512"],
  });
  
  if (!requiredPermission) return;
  // TODO: If you need to, update this function to add other permissions to be checked in the JWT
      
  // Checks the required permission in the token
  if (!jwtData.scopes?.includes(requiredPermission)) {
    throw new Error(
      `JWT does not have the required permissions. Missing: ${requiredPermission}`
    );
  }
  return;
}

export const authenticate = async (token, traceId) => {
  try {
    await checkJWT(token, BIOT_JWT_PERMISSION);
    return;
  } catch (error) {
    throw new Error(JWT_ERROR, { cause: error });
  }
};

export const login = async (traceId) => {
  if (!BIOT_BASE_URL) throw new Error("No BIOT_BASE_URL");
  if (!BIOT_SERVICE_USER_ID) throw new Error("No BIOT_SERVICE_USER_ID");
  if (!BIOT_SERVICE_USER_SECRET_KEY) throw new Error("No BIOT_SERVICE_USER_SECRET_KEY");

  const url = `${BIOT_BASE_URL}/ums/v2/services/accessToken`;
  const response = await axios.post(
    url,
    {
      id: BIOT_SERVICE_USER_ID,
      secretKey: BIOT_SERVICE_USER_SECRET_KEY,
    },
    {
      headers: {
        "x-b3-traceid": traceId,
      },
    }
  );

  return response.data.accessToken;
};
