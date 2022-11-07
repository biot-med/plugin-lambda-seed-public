import axios from "axios";
import JWT from "jsonwebtoken";
import {
  BIOT_PUBLIC_KEY,
  JWT_ERROR,
  JWT_PERMISSION,
  BASE_URL,
  SERVICE_USER_ID,
  SERVICE_USER_SECRET_KEY,
} from "../constants.js";

export const authenticate = async (token, traceId) => {
  try {
    // This validates the token sent by the notification service
    const jwtData = await JWT.verify(token, BIOT_PUBLIC_KEY, {
      algorithms: ["RS512"],
    });
    // This checks the token's permission

    if (JWT_PERMISSION) {
      if (!jwtData.scopes?.includes(JWT_PERMISSION)) {
        throw new Error(
          `JWT does not have the required permissions. Missing: ${JWT_PERMISSION}`
        );
      }
    }
  } catch (error) {
    throw new Error(JWT_ERROR, { cause: error });
  }
};

export const login = async (traceId) => {
  if (!BASE_URL) throw new Error("No BASE_URL");
  if (!SERVICE_USER_ID) throw new Error("No SERVICE_USER_ID");
  if (!SERVICE_USER_SECRET_KEY) throw new Error("No SERVICE_USER_SECRET_KEY");

  const url = `${BASE_URL}/ums/v2/services/accessToken`;
  const response = await axios.post(
    url,
    {
      id: SERVICE_USER_ID,
      secretKey: SERVICE_USER_SECRET_KEY,
    },
    {
      headers: {
        "x-b3-traceid": traceId,
      },
    }
  );

  return response.data.accessToken;
};
