import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import operationLog from "./language/pages/operation-log";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      operationLog: {
        ...operationLog.en,
      },
    },
    ch: {
      operationLog: {
        ...operationLog.ch,
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
