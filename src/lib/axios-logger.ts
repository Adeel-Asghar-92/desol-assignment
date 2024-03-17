import {
  errorLogger,
  requestLogger,
  responseLogger,
  setGlobalConfig,
} from "axios-logger";

setGlobalConfig({
  prefixText: false,
  dateFormat: "mm:ss",
  data: false,
});

export { errorLogger, requestLogger, responseLogger };
