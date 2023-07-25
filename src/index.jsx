import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { store } from "./store"

ReactDOM.render(
  <Provider store={store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>,
  document.getElementById("root")
);
