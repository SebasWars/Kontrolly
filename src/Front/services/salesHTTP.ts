import type { SaleItems } from "../Types/SalesTypes";

const apiUrl = import.meta.env.VITE_API_URL;

export async function getItems(id: string) {
  const response = await fetch(`${apiUrl}/ventas/${id}`);
  if (!response.ok) {
    throw new Error("No items found");
  }
  const data = await response.json();
  return data;
}

export async function createSell(cart: SaleItems[], warehouseID: string) {
  const items = cart.map(({ id, quantity }) => ({ id, quantity }));

  const response = await fetch(`${apiUrl}/ventas/${warehouseID}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ items }),
  });

  if (!response.ok) {
    throw new Error("It was not posible to complete the sell.");
  }
  return await response.json()
}
