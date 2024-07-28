import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./store/auth";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <React.StrictMode>
      <App />
      <ToastContainer
        position="top-center"
        theme="dark"
      />
    </React.StrictMode>
  </AuthProvider>
);
