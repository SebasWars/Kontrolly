import { createBrowserRouter } from "react-router-dom";
import Stock from "./Pages/Stock";
import Sells from "./Pages/Sells";
import Invoices from "./Pages/Invoices";
import { Layout } from "./Layout";
import Principal from "./Pages/Principal";
import CreateNewItem from "./Pages/CreateNewItem";

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
        children: [
          {
            index: true,
            element: <Stock />,
          },
          {
            path: ":id/items",
            element: <CreateNewItem/>
          }
        ],
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
