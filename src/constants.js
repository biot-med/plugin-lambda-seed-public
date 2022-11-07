const constants = {
  API_CALL_ERROR: "CALL_TO_API_FAILED",
  JWT_ERROR: "JWT_ERROR",
  NO_EVENT_ERROR: "NO_EVENT",
  NO_METADATA_ERROR: "NO_METADATA",
  NO_DATA_ERROR: "NO_DATA",
};

const cloudConstants = {
  BIOT_PUBLIC_KEY: process.env.BIOT_PUBLIC_KEY,
  JWT_PERMISSION: process.env.JWT_PERMISSION,
  APP_NAME: process.env.APP_NAME,
  BASE_URL: process.env.BASE_URL,
  SERVICE_USER_ID: process.env.SERVICE_USER_ID,
  SERVICE_USER_SECRET_KEY: process.env.SERVICE_USER_SECRET_KEY,
  EXECUTION_ENV: process.env.AWS_EXECUTION_ENV,
  SHOULD_VALIDATE_JWT: !!process.env.SHOULD_VALIDATE_JWT
    ? process.env.SHOULD_VALIDATE_JWT === "false"
      ? false
      : true
    : true,
  SERVICE_ENVIRONMENT: process.env.SERVICE_ENVIRONMENT,
};

const localDevConstants = {
  BIOT_PUBLIC_KEY:
    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAu8kO8u5hNmkvZnGWaTjWvHGvHDnz+5WkfBImOB3aQCDcGZ/schJNVF0ANRrA8lXwWXOdYC0cVkElVEaAy1wHcqhCKhp6qCTWo19eMIAAnILSwcDWtaLPyDIMDOQJqts24c76ODJV8qJ2zC/zKSrBMt9lSuwP2ms8ZzgQ0UQzpWd950xf5f/pxsRhaxboQtBWhUmzEstHB1bHiaElFgM3ct0shDZ8I9QplxtAQQrzZ8gFaaVZcT0oi1h8BMU9wdPS4+KDisQ4ai2Bka7bxGNuhC9U8/gyidNZbDrO7emlOWKxLB8CCeYRb+bl+x1nm+jfNRzXZdOk/nXyRtAZfCRbGQIDAQAB",
  JWT_PERMISSION: null,
  APP_NAME: "BioT Lambda seed",
  BASE_URL: null,
  SERVICE_USER_ID: null,
  SERVICE_USER_SECRET_KEY: null,
  EXECUTION_ENV: "DEV",
  SHOULD_VALIDATE_JWT: true,
  SERVICE_ENVIRONMENT: "gen2int",
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
} = constants;

const {
  JWT_PERMISSION,
  APP_NAME,
  BASE_URL,
  SERVICE_USER_ID,
  SERVICE_USER_SECRET_KEY,
  EXECUTION_ENV,
  SHOULD_VALIDATE_JWT,
  SERVICE_ENVIRONMENT,
} = environmentConstants;

// This prepares the BIOT_PUBLIC_KEY to be used with jsonwebtoken's parse (in authenticate function)
const BIOT_PUBLIC_KEY = [
  "-----BEGIN PUBLIC KEY-----",
  constants.BIOT_PUBLIC_KEY,
  "-----END PUBLIC KEY-----",
].join("\n");

export {
  BIOT_PUBLIC_KEY,
  JWT_PERMISSION,
  APP_NAME,
  BASE_URL,
  SERVICE_USER_ID,
  SERVICE_USER_SECRET_KEY,
  API_CALL_ERROR,
  JWT_ERROR,
  NO_EVENT_ERROR,
  NO_METADATA_ERROR,
  NO_DATA_ERROR,
  EXECUTION_ENV,
  SHOULD_VALIDATE_JWT,
  SERVICE_ENVIRONMENT,
};
