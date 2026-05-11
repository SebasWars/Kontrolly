const apiUrl = import.meta.env.VITE_API_URL;

export async function getItems(id: string) {
  const response = await fetch(`${apiUrl}/ventas/${id}`);
  if (!response.ok) {
    throw new Error("No items found");
  }
  const data = await response.json();
  console.log(data)
  return data
}
