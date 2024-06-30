export const requestTypes = Object.freeze({
  NOTIFICATION: "NOTIFICATION",
  INTERCEPTOR_PRE: "INTERCEPTOR_PRE",
  INTERCEPTOR_POST: "INTERCEPTOR_POST",
  INTERCEPTOR_POST_ENTITY: "INTERCEPTOR_POST_ENTITY",
  NONSPECIFIC: "NONSPECIFIC",
});

export const checkRequestType = (event) => {
  let hooktypeKey;
  // This creates a case-insensitive search for the hooktype by first searching the key in the headers
  if (event.headers) {
    hooktypeKey = Object.keys(event?.headers)?.find(
      (key) => key.toLowerCase() === "hooktype"
    );
  } else {
    hooktypeKey = null;
  }

  if (hooktypeKey && requestTypes[event.headers?.[hooktypeKey]]) {
    return requestTypes[event.headers?.[hooktypeKey]];
  } else {
    console.warn("No hooktype provided");
    return requestTypes.NONSPECIFIC;
  }
};
