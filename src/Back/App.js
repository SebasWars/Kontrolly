import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { warehousesRoute } from "./routes/stock.js";
import { salesRoute } from "./routes/sales.js";
import { invoicesRoute } from "./routes/invoices.js";
import { homeRoute } from "./routes/home.js";
import { clientsRoute } from "./routes/clients.js";
import { authRoute } from "./routes/autho.js";
import { verifyJWT } from "./middleware/verifyJWT.js";

export const PORT = process.env.PORT ?? 3000;
const app = express();
dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use("/uploads", express.static("uploads"));

app.use("/auth", authRoute);

app.use("/", verifyJWT, homeRoute);
app.use("/inventario", verifyJWT, warehousesRoute);
app.use("/tienda", verifyJWT, salesRoute);
app.use("/facturas", verifyJWT, invoicesRoute);
app.use("/clientes", verifyJWT, clientsRoute);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto http://localhost:${PORT}`);
});
