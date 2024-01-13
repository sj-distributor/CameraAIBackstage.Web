import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";

import { Router } from "./routes";

function App() {
  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: "#2853E3", colorText: "#323444" } }}
    >
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
