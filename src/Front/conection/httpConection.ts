import type { CreateStockType, NewItem } from "../Types/StockTypes";

const apiUrl = import.meta.env.VITE_API_URL;

export async function getWarehouses() {
  const response = await fetch(`${apiUrl}/inventario`);
  const data = await response.json();
  return data;
}

export async function getWarehousebyID(id: string | null) {
  const response = await fetch(`${apiUrl}/inventario/${id}`);
  const data = await response.json();
  return data;
}

export async function createNewWarehouse(newWarehouse: CreateStockType) {
  const response = await fetch(`${apiUrl}/inventario`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newWarehouse),
  });
  if (!response.ok) {
    throw new Error("Error creating new warehouse");
  }
  const data = await response.json();
  return data;
}

export async function createNewItem(id: string, formData: NewItem) {
  const data = new FormData();

  data.append("name", formData.name);
  data.append("description", formData.description);
  data.append("quantity", formData.quantity);
  data.append("purchase_price", formData.purchase_price);
  data.append("sales_price", formData.sales_price);

  if (formData.image) {
    data.append("file", formData.image);
  }

  const response = await fetch(`${apiUrl}/inventario/${id}/anadir-nuevo-item`, {
    method: "POST",
    body: data,
  });

  if (!response.ok) {
    throw new Error("Error creating item");
  }

  return await response.json();
}

export async function deleteStock(id: string) {
  const response = await fetch(`${apiUrl}/inventario/${id}`, {
    method: "DELETE",
  });

  if (response.status === 204) {
    return true;
  }

  return await response.json();
}
