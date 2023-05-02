import { TRACEPARENT_KEY,NO_EVENT_ERROR, NO_DATA_ERROR, JWT_ERROR } from "../constants.js";

export const extractDataFromEvent = (event) => {
  if (!event) throw new Error(NO_EVENT_ERROR);

  const eventHeaders = event.headers;
  const parsedEventBody = JSON.parse(event.body);

  const eventWithParsedData = { ...event, body: parsedEventBody };

  const data = eventWithParsedData || null;
  const eventToken = eventHeaders.authorization.split(" ")[1] || null;
  const eventTraceparent = eventHeaders[TRACEPARENT_KEY] || null;

  if (!data) throw new Error(NO_DATA_ERROR);
  if (!eventToken) throw new Error(JWT_ERROR);

  return {
    data: data,
    eventToken: eventToken,
    eventTraceparent: eventTraceparent,
  };
};
