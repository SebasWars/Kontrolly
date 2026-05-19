const apiUrl = import.meta.env.VITE_API_URL;

export async function getInvoices() {
  const response = await fetch(`${apiUrl}/facturas/`);
  if (!response.ok) {
    throw new Error("No invoices found");
  }
  const data = await response.json();
  return data;
}