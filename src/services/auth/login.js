import axios from "axios";

import {
  BIOT_BASE_URL,
  BIOT_SERVICE_USER_ID,
  BIOT_SERVICE_USER_SECRET_KEY,
  TRACEPARENT_KEY,
} from "../../constants.js";

// Cache for access token to avoid logging in on every invocation
// These module-level variables persist across invocations within the same Lambda container
let _accessTokenCache = null;
let _accessTokenExpiration = null;
// Refresh token 1 minute before expiration to avoid edge cases
const _TOKEN_REFRESH_BUFFER_SECONDS = 60;

/**
 * Checks if the cached access token is still valid (not expired and not about to expire).
 * 
 * @returns {boolean} True if the cached token is valid, False otherwise.
 */
const _isCachedTokenValid = () => {
  if (_accessTokenCache === null || _accessTokenExpiration === null) {
    return false;
  }

  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  // Check if token is still valid (with buffer to refresh before expiration)
  return currentTime < (_accessTokenExpiration - _TOKEN_REFRESH_BUFFER_SECONDS);
};

/**
 * Caches the access token and its expiration time.
 * 
 * @param {string} accessToken - The access token to cache.
 * @param {string} expirationStr - The expiration time in ISO 8601 format (e.g., "2025-11-24T09:23:14.945Z").
 */
const _cacheToken = (accessToken, expirationStr) => {
  // Parse ISO 8601 datetime string (format: "2025-11-24T09:23:14.945Z")
  // Date.parse() handles ISO 8601 format including the 'Z' UTC indicator
  const expirationTimestampMs = Date.parse(expirationStr);
  if (isNaN(expirationTimestampMs)) {
    throw new Error(`Invalid expiration date format: ${expirationStr}`);
  }
  // Convert to seconds timestamp
  const expirationTimestamp = Math.floor(expirationTimestampMs / 1000);
  
  // Update cache
  _accessTokenCache = accessToken;
  _accessTokenExpiration = expirationTimestamp;
};

export const login = async (traceparent) => {
  // Check if we have a cached token that's still valid
  if (_isCachedTokenValid()) {
    return _accessTokenCache;
  }

  // Cache miss, expired, or about to expire - fetch new token
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
  
  const accessToken = response.data.accessToken;
  const expirationStr = response.data.accessTokenExpiration;
  
  // Cache the token and its expiration time
  _cacheToken(accessToken, expirationStr);

  return accessToken;
};