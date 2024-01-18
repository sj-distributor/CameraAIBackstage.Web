// import "./i18n/i18n";

import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";

import AuthProvider from "./hooks/auth";
import { Router } from "./routes";

function App() {
  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: "#2853E3", colorText: "#323444" } }}
    >
      <BrowserRouter>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
