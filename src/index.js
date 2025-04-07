import React from "react";
//import ReactDOM from "react-dom";
import ReactDOM from "react-dom/client"; //React18以降の記法。ReactDOM.createRoot()関数使用可能
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import { store } from "./store"

const root = ReactDOM.createRoot(document.getElementById("root"));

//ReactDOM.render(
root.render(
  <Provider store={store}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
