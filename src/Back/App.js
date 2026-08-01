import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { createClient } from "@libsql/client";
import { warehousesRoute } from "./routes/stock.js";
import { salesRoute } from "./routes/sales.js";
import { invoicesRoute } from "./routes/invoices.js";
import { homeRoute } from "./routes/home.js";
import { clientsRoute } from "./routes/clients.js";
import { authRoute } from "./routes/autho.js";
import { verifyJWT } from "./middleware/verifyJWT.js";
import { userRoute } from "./routes/user.js";

export const PORT = process.env.PORT ?? 3000;
const app = express();
dotenv.config();

export const db = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://kontrolly.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("No permitido por CORS"));
      }
    },
  }),
);

app.use("/uploads", express.static("uploads"));
app.use("/auth", authRoute);

app.use("/", verifyJWT, homeRoute);
app.use("/usuario", verifyJWT, userRoute);
app.use("/inventario", verifyJWT, warehousesRoute);
app.use("/tienda", verifyJWT, salesRoute);
app.use("/facturas", verifyJWT, invoicesRoute);
app.use("/clientes", verifyJWT, clientsRoute);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto http://localhost:${PORT}`);
});
