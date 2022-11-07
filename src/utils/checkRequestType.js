export const requestTypes = Object.freeze({
  NOTIFICATION: "NOTIFICATION",
  INTERCEPTOR_PRE: "INTERCEPTOR_PRE",
  INTERCEPTOR_POST: "INTERCEPTOR_POST",
  INTERCEPTOR_POST_ENTITY: "INTERCEPTOR_POST_ENTITY",
  NONSPECIFIC: "NONSPECIFIC",
});

export const checkRequestType = (event) => {
  if (event.headers?.hooktype && requestTypes[event.headers?.hooktype]) {
    return requestTypes[event.headers?.hooktype];
  } else {
    console.warn("No hooktype provided");
    return requestTypes.NONSPECIFIC;
  }
};
