import type { SaleItems } from "../Types/SalesTypes";
import { getHeaders } from "./api";

const apiUrl = import.meta.env.VITE_API_URL;

export async function getItems(id: string) {
  const response = await fetch(`${apiUrl}/tienda/${id}`,{
    headers: getHeaders()
  });
  if (!response.ok) {
    throw new Error("No items found");
  }
  const data = await response.json();
  return data;
}

export async function getItemsByQuery(warehouseId: string, query: string) {
  const response = await fetch(`${apiUrl}/tienda/${warehouseId}/${query}`,{
    headers: getHeaders()
  })

  if (!response.ok) {
    throw new Error("No items founds");
  }
  const data = await response.json();
  return data;
}

export async function createSell(
  cart: SaleItems[],
  warehouseID: string,
  type: "sold" | "price",
) {
  const items = cart.map(({ id, quantity }) => ({ id, quantity }));

  const response = await fetch(`${apiUrl}/tienda/${warehouseID}`, {
    method: "POST",
    headers: {
      ...getHeaders(),
      "Content-type": "application/json",
    },
    body: JSON.stringify({ items, type: type }),
  });

  if (!response.ok) {
    throw new Error("It was not posible to complete the sell.");
  }
  return await response.json();
}
