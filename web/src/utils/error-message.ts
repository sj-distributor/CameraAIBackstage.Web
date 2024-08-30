import KEYS from "@/i18n/language/keys/error-message-keys";
import i18n from "i18next";

const ERROR_KEYWORDS = {
  DUPLICATE_CAMERA: "Reduplicative camera",
  DATABASE_ERROR: "gateway database error",
  ERROR_CAMERA: "camera not found or not online",
  INSUFFICIENT_RESOURCES: "No node free",
};

export const getErrorMessage = (error: string) => {
  const { t } = i18n;

  const ERROR_MESSAGES = {
    DUPLICATE_CAMERA: t(KEYS.DUPLICATE_CAMERA, { ns: "errorMessage" }),
    DATABASE_ERROR: t(KEYS.DATABASE_ERROR, { ns: "errorMessage" }),
    ERROR_CAMERA: t(KEYS.ERROR_CAMERA, { ns: "errorMessage" }),
    INSUFFICIENT_RESOURCES: t(KEYS.INSUFFICIENT_RESOURCES, {
      ns: "errorMessage",
    }),
  };

  for (const [key, keyword] of Object.entries(ERROR_KEYWORDS)) {
    if (error.includes(keyword)) {
      return ERROR_MESSAGES[key as keyof typeof ERROR_MESSAGES];
    }
  }
  return error;
};
