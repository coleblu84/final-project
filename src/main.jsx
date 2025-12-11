import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App/App.jsx";
import "./global.css";

const container = document.getElementById("root");

if (!container) throw new Error("Root element not found. Make sure index.html has a div with id 'root'.");

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);
