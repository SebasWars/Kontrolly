import { createBrowserRouter } from "react-router-dom";
import Stock from "./Pages/Stock";
import Sells from "./Pages/Sells";
import Invoices from "./Pages/Invoices";
import { Layout } from "./Layout";
import Principal from "./Pages/Principal";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Principal />,
      },
      {
        path: "inventario",
        element: <Stock />,
      },
      {
        path: "ventas",
        element: <Sells />,
      },
      {
        path: "facturas",
        element: <Invoices />,
      },
      {
        path: "*",
        element: <h1>404 - Página no encontrada</h1>,
      },
    ],
  },
]);
