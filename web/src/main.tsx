import "./index.css";
import "./i18n/ i18n";
import "./fonts/iconfont/iconfont.css";

import ReactDOM from "react-dom/client";

import App from "./app";

const container = document.getElementById("root");

if (container) {
  const root = ReactDOM.createRoot(container);

  root.render(<App />);
}
