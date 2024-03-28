import { App as AppWrapper, ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import { InitialAppSetting } from "./appsetting";
import AuthProvider from "./hooks/auth";
import { Router } from "./routes";

function App() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const cookieString = document.cookie;

    // 拆分成一个包含每个 Cookie 的数组
    const cookiesArray = cookieString.split(";");

    // 初始化目标 Cookie 值
    let targetCookieValue = null;

    // 遍历数组
    for (const cookie of cookiesArray) {
      // 去除空格
      const trimmedCookie = cookie.trim();

      // 如果该 Cookie 以 'param1=' 开头
      if (trimmedCookie.startsWith("param1=")) {
        // 截取 'param1=' 后面的字符串
        targetCookieValue = trimmedCookie.substring("param1=".length);
        break; // 找到目标 Cookie，退出循环
      }
    }
    console.log(targetCookieValue, cookieString);

    if (!targetCookieValue) return;
    targetCookieValue && localStorage.setItem("tokenKey", targetCookieValue);
  }, [localStorage.getItem((window as any).appSettings?.tokenKey)]);

  useEffect(() => {
    InitialAppSetting().then(() => setIsLoaded(true));
  }, []);

  return isLoaded ? (
    <ConfigProvider
      theme={{ token: { colorPrimary: "#2853E3", colorText: "#323444" } }}
    >
      <BrowserRouter>
        <AppWrapper>
          <AuthProvider>
            <Router />
          </AuthProvider>
        </AppWrapper>
      </BrowserRouter>
    </ConfigProvider>
  ) : (
    <></>
  );
}

export default App;
