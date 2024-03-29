import { App as AppWrapper, ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import { InitialAppSetting } from "./appsetting";
import AuthProvider from "./hooks/auth";
import { Router } from "./routes";

function App() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const aPageData = localStorage.getItem("aPageData");
    if (aPageData) {
      console.log("aPageData", aPageData);

      // doSomething(aPageData); // 当能获取到数据时就说明是从A页面跳转过来的
      localStorage.removeItem("aPageData");
    } else {
      window.addEventListener("message", receiveMessage, false);
    }

    function receiveMessage(event: { origin: string; data: string }) {
      console.log("123123", event);

      if (event.origin !== "http://localhost:3000") return;
      if (event.data) {
        localStorage.setItem("aPageData", event.data);
      }
    }

    // function doSomething(aPageData) {
    //   //处理业务逻辑
    // }
  }, [localStorage.getItem("aPageData")]);

  useEffect(() => {
    InitialAppSetting().then(() => setIsLoaded(true));
  }, [document.cookie]);

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
