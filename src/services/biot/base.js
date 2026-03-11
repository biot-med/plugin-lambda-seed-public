/**
 * This is the base backend service for interacting with BioT services.
 * 
 * This service provides the necessary functionality to perform basic operations 
 * such as POST, PATCH, DELETE, and SEARCH with BioT services.
 * 
 * Feel free to extend this service by adding more fundamental functions as needed.
 */

import axios from "axios";
import { URLSearchParams } from "url";

import { BIOT_BASE_URL, TRACEPARENT_KEY } from "../../constants.js";


/**
 * Executes a search query with pagination.
 * 
 * The method accepts a request object that includes filters, sorting criteria, and the page number 
 * (default is 0). Pagination is implemented with a hardcoded limit of 30 items per page.
 * 
 * The function returns an object containing:
 * - `data`: The current page of search results.
 * - `nextCall`: A reference to the next page's call, if more data is available.
 * 
 * @param request The search request object containing filter, sort, and page information.
 * @returns { data, nextCall } The search results and the next page call.
 */
export const search = async (token, traceparent, path, request = {}) => {
  const { filter, sort, page = 0, limit = 30 } = request;
  const url = `${BIOT_BASE_URL}${path}`;

  const searchRequestString = JSON.stringify({
    filter,
    sort,
    page,
    limit,
  });

  const searchParams = new URLSearchParams([
    ["searchRequest", searchRequestString],
  ]);

  // This get request asks for patients from organization API
  const response = await axios({
    method: "get",
    url: url,
    params: searchParams,
    headers: {
      authorization: `Bearer ${token}`,
      [TRACEPARENT_KEY]: traceparent,
    },
  });

  const { data, metadata } = response?.data || {};

  let nextCall;

  if (
    metadata.page.totalResults >
    (metadata.page.page + 1) * metadata.page.limit
  ) {
    nextCall = async () =>
    search(token, traceparent, path, { filter, sort, page: page + 1 });
  }

  return { data, nextCall };
};

export const create = async (token, traceparent, path, request) => {

  const url = `${BIOT_BASE_URL}${path}`;

  // This get request asks for patients from organization API
  const response = await axios({
    method: "post",
    url: url,
    data: request,
    headers: {
      authorization: `Bearer ${token}`,
      [TRACEPARENT_KEY]: traceparent,
    },
  });

  const { data } = response;
  return data;
};

export const update = async (token, traceparent, path, request) => {

  const url = `${BIOT_BASE_URL}${path}`;

  // This get request asks for patients from organization API
  const response = await axios({
    method: "patch",
    url: url,
    data: request,
    headers: {
      authorization: `Bearer ${token}`,
      [TRACEPARENT_KEY]: traceparent,
    },
  });

  const { data } = response;
  return data;
};

export const baseDelete = async (token, traceparent, path) => {

  const url = `${BIOT_BASE_URL}${path}`;

  // This get request asks for patients from organization API
  const response = await axios({
    method: "delete",
    url: url,
    headers: {
      authorization: `Bearer ${token}`,
      [TRACEPARENT_KEY]: traceparent,
    },
  });

  const { data } = response;
  return data;
};

export const get = async (token, traceparent, path) => {

  const url = `${BIOT_BASE_URL}${path}`;

  // This get request asks for patients from organization API
  const response = await axios({
    method: "get",
    url: url,
    headers: {
      authorization: `Bearer ${token}`,
      [TRACEPARENT_KEY]: traceparent,
    },
  });

  const { data } = response;
  return data;
};
