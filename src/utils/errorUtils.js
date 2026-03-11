/**
 * Checks if an error is an axios error (server error)
 * Axios errors have a `response` property when they come from server responses
 * @param {Error} error - The error to check
 * @returns {boolean} - True if the error is an axios error with a response
 */
export const isAxiosError = (error) => {
  return error && error.isAxiosError === true && error.response !== undefined;
};

/**
 * Extracts error information from an axios error
 * @param {Error} error - The axios error
 * @returns {Object} - Object with statusCode and response data
 */
export const extractAxiosErrorInfo = (error) => {
  if (!isAxiosError(error)) {
    return null;
  }

  const { response } = error;
  const statusCode = response?.status || 500;
  const responseData = response?.data || {};

  return {
    statusCode,
    responseData,
  };
};

