import { message } from "antd";
import axios from "axios";

export const api = axios.create({ baseURL: "" });

api.interceptors.request.use(
  (config) => {
    const appSettings = (window as any).appSettings;

    config.baseURL = appSettings.serverUrl;

    const authorizeToken = localStorage.getItem(appSettings.tokenKey);

    authorizeToken &&
      (config.headers.Authorization = `Bearer ${authorizeToken}`);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    if (response.data.code === 200) {
      return response.data;
    }

    return Promise.reject(response.data);
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem((window as any).appSettings?.tokenKey);
      message.error(
        error.response.data.msg ?? "登录已过期，请重新登录",
        1,
        () => {
          // window.location.href =
          //   (window as any).appSettings.frontDeskDomain ?? "";
        }
      );
    } else {
      return Promise.reject(error.response.data.msg ?? "Unknown error");
    }
  }
);
