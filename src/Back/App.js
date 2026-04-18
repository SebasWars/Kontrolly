import express from "express";
import multer from "multer";
import cors from "cors";

import { Stocks } from "./MockData_Back.js";
import { randomUUID } from "node:crypto";

const PORT = process.env.PORT ?? 3000;
const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

app.post('/inventario', (req,res) => {
  const {warehouse, items} = req.body

  if(!warehouse ||typeof warehouse !== 'string'){
    return res.status(400).json({message: 'Warehouse is required and must be an string'})
  }

  if(!Array.isArray(items)){
    return res.status(400).json({message: 'Items must be an array'})
  }

  const newWarehouse = {
    id: randomUUID(),
    warehouse,
    items
  }

  Stocks.push(newWarehouse);
  res.status(201).json({messge: 'New warehouse created succesfylly'})
})


/* -------------------------- */

app.get("/", (req, res) => {
  const warehouses = Stocks;
  return res.json({ warehouses });
});

app.get("/:id", (req, res) => {
  const { id } = req.params;
  const warehouse = Stocks.find((W) => W.id === id);
  if (!warehouse) {
    return res.json({ message: "Warehouse non-existent" });
  }
  return res.json({ warehouse: warehouse });
});

app.post("/:id", upload.single("file"), (req, res) => {
  const { id } = req.params;
  const warehouse = Stocks.find((W) => W.id === id);

  if (!warehouse) {
    return res.json({ message: "Warehouse non-existent" });
  }

  const file = req.file;
  const { name, description, quantity, purchase_price, sales_price } = req.body;

  const newItem = {
    id: randomUUID(),
    name,
    description,
    quantity,
    purchase_price,
    sales_price,
    image: file ? file.filename : null,
    image_path: file ? file.path : null,
  };

  warehouse.items.push(newItem);
  return res.status(201).json({ message: "New item created", item: newItem });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto http://localhost:${PORT}`);
});
