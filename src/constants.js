const constants = {
  API_CALL_ERROR: "CALL_TO_API_FAILED",
  JWT_ERROR: "JWT_ERROR",
  NO_EVENT_ERROR: "NO_EVENT",
  NO_METADATA_ERROR: "NO_METADATA",
  NO_DATA_ERROR: "NO_DATA",
  TRACEPARENT_KEY: "traceparent",
};


const cloudConstants = {
  BIOT_PUBLIC_KEY: process.env.BIOT_PUBLIC_KEY,
  // This is an array of strings set in the lambdas environment variables, the permissions are checked in src\utils\authenticate.js
  BIOT_APP_NAME: process.env.BIOT_APP_NAME,
  BIOT_BASE_URL: process.env.BIOT_BASE_URL,
  BIOT_SERVICE_USER_ID: process.env.BIOT_SERVICE_USER_ID,
  BIOT_SERVICE_USER_SECRET_KEY: process.env.BIOT_SERVICE_USER_SECRET_KEY,
  AWS_EXECUTION_ENV: process.env.AWS_EXECUTION_ENV,
  BIOT_SHOULD_VALIDATE_JWT: !!process.env.BIOT_SHOULD_VALIDATE_JWT
    ? process.env.BIOT_SHOULD_VALIDATE_JWT === "false"
      ? false
      : true
    : true,
  BIOT_SERVICE_ENVIRONMENT: process.env.BIOT_SERVICE_ENVIRONMENT,
  HOOKTYPE_PERMISSIONS: {
    notification: process.env.BIOT_JWT_PERMISSION_NOTIFICATION,
    interceptorPost: process.env.BIOT_JWT_PERMISSION_INTERCEPTION,
    interceptorPre: process.env.BIOT_JWT_PERMISSION_INTERCEPTION,
    interceptorPostEntity: process.env.BIOT_JWT_PERMISSION_INTERCEPTION,
  }
};

const localDevConstants = {
  BIOT_PUBLIC_KEY:
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu8kO8u5hNmkvZnGWaTjWvHGvHDnz+5WkfBImOB3aQCDcGZ/schJNVF0ANRrA8lXwWXOdYC0cVkElVEaAy1wHcqhCKhp6qCTWo19eMIAAnILSwcDWtaLPyDIMDOQJqts24c76ODJV8qJ2zC/zKSrBMt9lSuwP2ms8ZzgQ0UQzpWd950xf5f/pxsRhaxboQtBWhUmzEstHB1bHiaElFgM3ct0shDZ8I9QplxtAQQrzZ8gFaaVZcT0oi1h8BMU9wdPS4+KDisQ4ai2Bka7bxGNuhC9U8/gyidNZbDrO7emlOWKxLB8CCeYRb+bl+x1nm+jfNRzXZdOk/nXyRtAZfCRbGQIDAQAB",
    BIOT_JWT_PERMISSIONS: null,
  BIOT_APP_NAME: "BioT Lambda seed",
  BIOT_BASE_URL: null,
  BIOT_SERVICE_USER_ID: null,
  BIOT_SERVICE_USER_SECRET_KEY: null,
  AWS_EXECUTION_ENV: "DEV",
  BIOT_SHOULD_VALIDATE_JWT: true,
  BIOT_SERVICE_ENVIRONMENT: "gen2int",
  HOOKTYPE_PERMISSIONS: {
    notification: "ACTION_NOTIFICATION",
    interceptorPost: "PLUGIN_INTERCEPTOR",
    interceptorPre: "PLUGIN_INTERCEPTOR",
    interceptorPostEntity: "PLUGIN_INTERCEPTOR",
  }
};

const environmentConstants = process.env.AWS_EXECUTION_ENV
  ? cloudConstants
  : localDevConstants;

const {
  API_CALL_ERROR,
  JWT_ERROR,
  NO_EVENT_ERROR,
  NO_METADATA_ERROR,
  NO_DATA_ERROR,
  TRACEPARENT_KEY,
} = constants;

const {
  BIOT_JWT_PERMISSIONS,
  BIOT_APP_NAME,
  BIOT_BASE_URL,
  BIOT_SERVICE_USER_ID,
  BIOT_SERVICE_USER_SECRET_KEY,
  AWS_EXECUTION_ENV,
  BIOT_SHOULD_VALIDATE_JWT,
  BIOT_SERVICE_ENVIRONMENT,
  HOOKTYPE_PERMISSIONS,
} = environmentConstants;

// This prepares the BIOT_PUBLIC_KEY to be used with jsonwebtoken's parse (in authenticate function)
const BIOT_PUBLIC_KEY = [
  "-----BEGIN PUBLIC KEY-----",
  environmentConstants.BIOT_PUBLIC_KEY,
  "-----END PUBLIC KEY-----",
].join("\n");

export {
  BIOT_PUBLIC_KEY,
  BIOT_JWT_PERMISSIONS,
  BIOT_APP_NAME,
  BIOT_BASE_URL,
  BIOT_SERVICE_USER_ID,
  BIOT_SERVICE_USER_SECRET_KEY,
  API_CALL_ERROR,
  JWT_ERROR,
  NO_EVENT_ERROR,
  NO_METADATA_ERROR,
  NO_DATA_ERROR,
  AWS_EXECUTION_ENV,
  BIOT_SHOULD_VALIDATE_JWT,
  BIOT_SERVICE_ENVIRONMENT,
  TRACEPARENT_KEY,
  HOOKTYPE_PERMISSIONS
};
