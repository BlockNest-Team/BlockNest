import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/theme/theme.scss";
import App from "./App";
// import { TransactionProvider } from "./context/context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <TransactionProvider> */}
    <App />
    {/* </TransactionProvider> */}
  </React.StrictMode>
);
