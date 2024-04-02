import { App as AppWrapper, ConfigProvider } from "antd";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

import { InitialAppSetting } from "./appsetting";
import AuthProvider from "./hooks/auth";
import { Router } from "./routes";

function App() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

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
    <div>Test No Loading</div>
  );
}

export default App;
