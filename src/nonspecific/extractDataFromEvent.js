import { NO_EVENT_ERROR, NO_DATA_ERROR } from "../constants.js";

export const extractDataFromEvent = (event) => {
  if (!event) throw new Error(NO_EVENT_ERROR);

  const parsedEvent = JSON.parse(event.body);

  if (!parsedEvent) throw new Error(NO_DATA_ERROR);

  return {
    data: parsedEvent.data || null,
  };
};
