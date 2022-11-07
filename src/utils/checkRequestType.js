export const requestTypes = Object.freeze({
  NOTIFICATION: "NOTIFICATION",
  INTERCEPTOR_PRE: "INTERCEPTOR_PRE",
  INTERCEPTOR_POST: "INTERCEPTOR_POST",
  INTERCEPTOR_POST_ENTITY: "INTERCEPTOR_POST_ENTITY",
  NONSPECIFIC: "NONSPECIFIC",
});

export const checkRequestType = (event) => {
  if (event.headers?.hookType && requestTypes[event.headers?.hookType]) {
    return requestTypes[event.headers?.hookType];
  } else {
    console.warn("No hookType provided");
    return requestTypes.NONSPECIFIC;
  }
};
