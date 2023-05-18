import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/theme/theme.scss";
import App from "./App";
// import { TransactionProvider } from "./context/context";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <TransactionProvider> */}
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
    {/* </TransactionProvider> */}
  </React.StrictMode>
);
