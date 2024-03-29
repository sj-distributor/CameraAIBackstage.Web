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
      if (isLoaded) {
        localStorage.setItem((window as any).appSettings?.tokenKey, aPageData);
      }
      localStorage.removeItem("aPageData");
    } else {
      window.addEventListener("message", receiveMessage, false);
    }

    function receiveMessage(event: { origin: string; data: string }) {
      console.log("123123", event);

      if (event.origin !== (window as any).appSettings?.frontDeskDomain) return;
      if (event.data) {
        localStorage.setItem("aPageData", event.data);
      }
    }
  }, [localStorage.getItem("aPageData"), isLoaded]);

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
