import express from "express";
import cors from "cors";

import { warehousesRoute } from "./routes/stock.js";
import { salesRoute } from "./routes/sales.js";
import { invoicesRoute } from "./routes/invoices.js";
import { homeRoute } from "./routes/home.js";
import { clientsRoute } from "./routes/clients.js";

export const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use("/uploads", express.static("uploads"));

app.use('/', homeRoute)
app.use('/inventario', warehousesRoute)
app.use('/tienda', salesRoute)
app.use('/facturas', invoicesRoute)
app.use('/clientes',clientsRoute)


app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto http://localhost:${PORT}`);
});
