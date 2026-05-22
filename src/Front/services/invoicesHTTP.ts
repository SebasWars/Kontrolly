const apiUrl = import.meta.env.VITE_API_URL;

export async function getInvoicesByType(type: "all" | "sold" | "price") {
  const response = await fetch(`${apiUrl}/facturas/type/${type}`);
  if (!response.ok) {
    throw new Error("No invoices found");
  }
  const data = await response.json();
  return data;
}

export async function getInvoiesValues() {
  const response = await fetch(`${apiUrl}/facturas/values`);
  if (!response.ok) {
    throw new Error("No invoices values found");
  }
  const data = await response.json();
  return data;
}

export async function removeInvoice(id:string){
  const response = await fetch(`${apiUrl}/facturas/${id}`,{
    method: 'DELETE'
  });
  if(!response.ok){
    throw new Error('No invoice found available to delete');
  }
  return await response.json()
}
