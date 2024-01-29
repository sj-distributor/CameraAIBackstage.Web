import { ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import { InitialAppSetting } from "./appsetting";
import AuthProvider from "./hooks/auth";
import { Router } from "./routes";

function App() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // useEffect(() => {
  //   localStorage.setItem((window as any).appSettings?.tokenKey, "");
  // }, [localStorage.getItem((window as any).appSettings?.tokenKey)]);

  useEffect(() => {
    localStorage.setItem(
      (window as any).appSettings?.tokenKey,
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFkbWluIiwibmFtZWlkIjoiMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2F1dGhlbnRpY2F0aW9uIjoiU2VsZiIsInJvbGUiOiJBZG1pbmlzdHJhdG9yIiwibmJmIjoxNjk2MjExMTQzLCJleHAiOjE2OTYyMTQ3NDMsImlhdCI6MTY5NjIxMTE0M30.W4JNUv_stGwpNfd49oxj4Kgrcs-dzntcviLDkHPsG7I"
    );
  });

  useEffect(() => {
    InitialAppSetting().then(() => setIsLoaded(true));
  }, []);

  return isLoaded ? (
    <ConfigProvider
      theme={{ token: { colorPrimary: "#2853E3", colorText: "#323444" } }}
    >
      <BrowserRouter>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </BrowserRouter>
    </ConfigProvider>
  ) : (
    <></>
  );
}

export default App;
