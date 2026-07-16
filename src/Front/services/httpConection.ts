import type { CreateStockType, NewItem } from "../Types/StockTypes";
import { getHeaders, handleResponse } from "./api";

const apiUrl = import.meta.env.VITE_API_URL;

export async function getWarehouses() {
  const response = await fetch(`${apiUrl}/inventario`, {
    headers: getHeaders(),
  });
  return handleResponse(response);
}

export async function getWarehousebyID(id: string | null) {
  const response = await fetch(`${apiUrl}/inventario/${id}`, {
    headers: getHeaders(),
  });
  return handleResponse(response);
}

export async function createNewWarehouse(newWarehouse: CreateStockType) {
  const response = await fetch(`${apiUrl}/inventario`, {
    method: "POST",
    headers: {
      ...getHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newWarehouse),
  });
  return handleResponse(response);
}

export async function updateWarehouse(id: string, warehouseName: string) {
  const response = await fetch(`${apiUrl}/inventario/${id}`, {
    method: "PATCH",
    headers: {
      ...getHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ warehouseName }),
  });
  return handleResponse(response);
}

export async function removeWarehouse(id: string) {
  const response = await fetch(`${apiUrl}/inventario/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  return handleResponse(response);
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

  const response = await fetch(`${apiUrl}/inventario/${id}/items`, {
    method: "POST",
    headers: getHeaders(),
    body: data,
  });

  return handleResponse(response);
}

export async function updateItem(
  warehouseId: string,
  itemID: string,
  formData: NewItem,
) {
  const data = new FormData();

  data.append("name", formData.name);
  data.append("description", formData.description);
  data.append("quantity", formData.quantity);
  data.append("purchase_price", formData.purchase_price);
  data.append("sales_price", formData.sales_price);

  if (formData.image) {
    data.append("file", formData.image);
  }

  const response = await fetch(
    `${apiUrl}/inventario/${warehouseId}/items/${itemID}`,
    {
      method: "PATCH",
      headers: getHeaders(),
      body: data,
    },
  );

  return handleResponse(response);
}

export async function removeItem(warehouseId: string, itemID: string) {
  const response = await fetch(
    `${apiUrl}/inventario/${warehouseId}/items/${itemID}`,
    {
      method: "DELETE",
      headers: getHeaders(),
    },
  );

  return handleResponse(response);
}
