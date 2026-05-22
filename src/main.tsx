import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./Front/styles/index.css";
import App from "./App.tsx";
import { AppProviders } from "./Front/context/Provider.tsx";


createRoot(document.getElementById("root")!).render(
  <AppProviders>
    <StrictMode>
      <App />
    </StrictMode>
  </AppProviders>,
);
