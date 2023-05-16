import JWT from "jsonwebtoken";
import {
  BIOT_PUBLIC_KEY,
  JWT_ERROR,
  HOOKTYPE_PERMISSIONS,
} from "../constants.js";

export const authenticate = async (token) => {
  try {
    // This validates the token sent by the notification service
    const jwtData = await JWT.verify(token, BIOT_PUBLIC_KEY, {
      algorithms: ["RS512"],
    });
    
    const requiredPermission = HOOKTYPE_PERMISSIONS.interceptorPost;

    if (!jwtData.scopes?.includes(requiredPermission)) {
      throw new Error(
        `JWT does not have the required permissions. Missing: ${requiredPermission}`
      );
    }

  } catch (error) {
    throw new Error(JWT_ERROR, { cause: error });
  }
};
