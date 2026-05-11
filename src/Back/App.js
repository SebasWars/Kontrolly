import express from "express";
import cors from "cors";

import { warehousesRoute } from "./routes/stock.js";
import { salesRoute } from "./routes/sales.js";

export const PORT = process.env.PORT ?? 3000;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.use("/uploads", express.static("uploads"));

app.use('/inventario', warehousesRoute)
app.use('/ventas', salesRoute)


app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto http://localhost:${PORT}`);
});
