import axios from "axios";
import { jwtVerify, importSPKI } from "jose";
import {
  JWT_ERROR,
  BIOT_BASE_URL,
  GET_PUBLIC_KEY_API_URL,
  JWT_PERMISSION,
} from "../../constants.js";

let publicKey = null;

// Wraps the raw key material returned by BIOT into PEM format for importSPKI()
const constructPemPublicKey = (publicKey) => {
  return [
    "-----BEGIN PUBLIC KEY-----",
    publicKey,
    "-----END PUBLIC KEY-----",
  ].join("\n");
}

const getPublicKey = async () => {
  
  const response = await axios.get(
    `${BIOT_BASE_URL}${GET_PUBLIC_KEY_API_URL}`
  );
  
  const { publicKey } = response?.data;

  return publicKey;
}

const checkJWT = async (token, requiredPermission) => {

  if (!publicKey) {
    const responsePublicKey = await getPublicKey();
    const publicKeyPem = constructPemPublicKey(responsePublicKey);
    publicKey = await importSPKI(publicKeyPem, "RS512");
  }

  // This validates the token sent by the notification service
  const { payload } = await jwtVerify(token, publicKey, {
    algorithms: ["RS512"],
  });
  
  if (!requiredPermission) return;

  // TODO: If you need to, update this function to add other permissions to be checked in the JWT
      
  // Checks the required permission in the token
  if (!payload.scopes?.includes(requiredPermission)) {
    throw new Error(
      `JWT does not have the required permissions. Missing: ${requiredPermission}`
    );
  }
  return;
}

export const authenticate = async (token) => {
  try {
    /** 
     * This validates the token sent by the notification service and checks the required permission
     * 
     * This implementation checks JWT_PERMISSION from constants.js.
     * You can define it in your plugin's environment variables, see constants.js
     * */
    
    await checkJWT(token, JWT_PERMISSION);
    return;
  } catch (error) {
    throw new Error(JWT_ERROR, { cause: error });
  }
};


