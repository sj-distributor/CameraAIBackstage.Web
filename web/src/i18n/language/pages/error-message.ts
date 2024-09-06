import KEYS from "../keys/error-message-keys";

export default {
  en: {
    [KEYS.DUPLICATE_CAMERA]: "Reduplicative camera,please check and resubmit",
    [KEYS.DATABASE_ERROR]: "gateway database error,please try again later",
    [KEYS.ERROR_CAMERA]:
      "camera not found or not online,please try again later",
    [KEYS.INSUFFICIENT_RESOURCES]: "No node free,please try again later",
  },
  ch: {
    [KEYS.DUPLICATE_CAMERA]: "存在重复camera，請檢查後重新提交",
    [KEYS.DATABASE_ERROR]: "當前数据库异常，請稍候重試",
    [KEYS.ERROR_CAMERA]: "當前摄像头信息错误或离线，請稍候重試",
    [KEYS.INSUFFICIENT_RESOURCES]: "當前资源不够，請稍候重試",
  },
};
