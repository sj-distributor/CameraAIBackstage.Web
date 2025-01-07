import { message } from "antd";
import axios from "axios";

export const api = axios.create({ baseURL: "" });

api.interceptors.request.use(
  (config) => {
    const appSettings = (window as any).appSettings;

    config.baseURL = appSettings.serverUrl;

    const authorizeToken = window.__POWERED_BY_WUJIE__
      ? window.$wujie.props?.token
      : localStorage.getItem(appSettings.tokenKey);

    authorizeToken &&
      (config.headers.Authorization = `Bearer ${authorizeToken}`);

    const localCurrentTeam = JSON.parse(
      localStorage.getItem("currentTeam") ?? "{}"
    );

    config.headers["X-TeamId-Header"] = localCurrentTeam.id;

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

    throw new Error(response.data.msg);
  },
  (error) => {
    if (error.response.status === 401) {
      message.error(
        error.response.data.msg ?? "登录已过期，请重新登录",
        1,
        () => {
          if (window.__POWERED_BY_WUJIE__) {
            window.$wujie.props?.signOut();
          } else {
            localStorage.removeItem((window as any).appSettings?.tokenKey);

            window.location.reload();
          }
        }
      );
    } else {
      throw new Error(error.response.data.msg ?? "Unknown error");
    }
  }
);
