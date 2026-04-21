import type { CreateStockType } from "../Types/StockTypes";

const apiUrl = import.meta.env.VITE_API_URL;

export async function getWarehouses() {
  const response = await fetch(`${apiUrl}/inventario`);
  const data = await response.json();
  return data;
}

export async function getWarehousebyID(id:string | null) {
  const response = await fetch(`${apiUrl}/inventario/${id}`);
  const data = await response.json();
  return data;
}

export async function createNewWarehouse(newWarehouse: CreateStockType) {
  const response = await fetch(`${apiUrl}/inventario`, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(newWarehouse),
  });
  if (!response.ok) {
    throw new Error("Error creating new warehouse");
  }
  const data = await response.json();
  return data;
}
