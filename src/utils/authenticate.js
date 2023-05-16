import axios from "axios";
import JWT from "jsonwebtoken";
import {
  BIOT_PUBLIC_KEY,
  JWT_ERROR,
  BIOT_JWT_PERMISSION,
  BIOT_BASE_URL,
  BIOT_SERVICE_USER_ID,
  BIOT_SERVICE_USER_SECRET_KEY,
  TRACEPARENT_KEY,
} from "../constants.js";

export const authenticate = async (token) => {
  try {
    // This validates the token sent by the notification service
    const jwtData = await JWT.verify(token, BIOT_PUBLIC_KEY, {
      algorithms: ["RS512"],
    });
    
    // This checks the token's permissions

    if (Array.isArray(BIOT_JWT_PERMISSION) && BIOT_JWT_PERMISSION.length) {
      
      // If the token does not have one of the permissions listed in BIOT_JWT_PERMISSION then throw an error
      // BIOT_JWT_PERMISSION is an array of strings set in the lambdas environment variables (see src\constants.js)
      let permissionsExist = false;
      jwtData.scopes?.forEach(permission => { 
        if (BIOT_JWT_PERMISSION.includes(permission)) {
          permissionsExist = true;
        }
      });
        
      if (!permissionsExist) {
        throw new Error(
          `JWT does not have the required permissions. Missing: ${BIOT_JWT_PERMISSION}`
        );
      }
    }
  } catch (error) {
    throw new Error(JWT_ERROR, { cause: error });
  }
};

export const login = async (traceparent) => {
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
        [TRACEPARENT_KEY]: traceparent,
      },
    }
  );

  return response.data.accessToken;
};
