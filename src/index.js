import notification from "./notification/index.js";
import interceptorPost from "./interceptorPost/index.js";
import interceptorPre from "./interceptorPre/index.js";
import interceptorPostEntity from "./interceptorPostEntity/index.js";
import nonspecific from "./nonspecific/index.js";

export * from "./utils/index.js";
export * from "./constants.js";

const functionsMapper = Object.freeze({
  NOTIFICATION: notification,
  INTERCEPTOR_POST: interceptorPost,
  INTERCEPTOR_PRE: interceptorPre,
  INTERCEPTOR_POST_ENTITY: interceptorPostEntity,
  NONSPECIFIC: nonspecific,
});

export default functionsMapper;
