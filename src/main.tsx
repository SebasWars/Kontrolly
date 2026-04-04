import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./Front/styles/index.css";
import App from "./App.tsx";
import { WarehouseProvider } from "./Front/Provider.tsx";


createRoot(document.getElementById("root")!).render(
  <WarehouseProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </WarehouseProvider>,
);
