import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { FeedbackProvider } from "./context/FeedbackContext.jsx";
import { CommunicationProvider } from "./context/CommunicationContext.jsx";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
        <FeedbackProvider>
        <CommunicationProvider>
          <App />
        </CommunicationProvider>
      </FeedbackProvider>
    </AuthProvider>
  </BrowserRouter>
);
