import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App";
import { AuthProvider } from "./Contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Toaster />
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
