import { message } from "antd";
import axios from "axios";

export const api = axios.create({ baseURL: "" });

api.interceptors.request.use(
  (config) => {
    const appSettings = (window as any).appSettings;

    config.baseURL = appSettings.serverUrl;

    const authorizeToken =
      "NrDTmgFeifK9aGFFxSjizJ05H0qCo7YauP6mqjcOmGNh_PVtPi3IoILVxrN0YkqUZepAa-Yu6vLojKBukvv1PyFTWmBiU_TtfqfdRKKEdQKSGI6Q1ZoydG4jsxxNd9rR-cYEqrPh3zCoLavodvAL9pi7e0btGicUfjk880DrcUtJD5XZkMeKEJnyr1FSaNk3w3wdG-otVv_EXDCvT16mYxqKEB6v4ltAf2kagE2if9Kwo6RvzhEB1b8nYLqkbT_KCb4UnIcgYf9KIRkdEo6dPiwjEJbBg4FkbNItBfXcFjSMSq6_xk8pWLZaYF5j-5AfOVSR7pUlxl18TpRs4dWq-L4bJnM";

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
          window.location.href = "";
        }
      );
    } else {
      return Promise.reject(error.response.data.msg ?? "Unknown error");
    }
  }
);
