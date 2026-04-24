import express from "express";
import multer from "multer";
import cors from "cors";

import { warehousesRoute } from "./routes/stock.js";

const PORT = process.env.PORT ?? 3000;
const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use("/uploads", express.static("uploads"));

app.use('/inventario', warehousesRoute)

/* -------------------------- */

app.post(
  "/inventario/:id/anadir-nuevo-item",
  upload.single("file"),
  (req, res) => {
    const { id } = req.params;
    const warehouse = Stocks.find((W) => W.id === id);

    if (!warehouse) {
      return res.json({ message: "Warehouse non-existent" });
    }

    const file = req.file;
    const { name, description, quantity, purchase_price, sales_price } =
      req.body;

      /* TODO: AÑADIR VALIDACIONES ANTES DE CREAR */
    const newItem = {
      id: randomUUID(),
      name,
      description,
      quantity,
      purchase_price,
      sales_price,
      image_url: file
        ? `http://localhost:${PORT}/uploads/${file.filename}`
        : null,
    };

    warehouse.items.push(newItem);
    return res.status(201).json({ message: "New item created", item: newItem });
  },
);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto http://localhost:${PORT}`);
});
