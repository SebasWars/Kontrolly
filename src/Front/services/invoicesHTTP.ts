const apiUrl = import.meta.env.VITE_API_URL;

export async function getInvoices() {
  const response = await fetch(`${apiUrl}/facturas/`);
  if (!response.ok) {
    throw new Error("No invoices found");
  }
  const data = await response.json();
  return data;
}

export async function getInvoicesByType(type: 'all' |'sold' | 'price'){
    const response = await fetch(`${apiUrl}/facturas/type/${type}`);
  if (!response.ok) {
    throw new Error("No invoices found");
  }
  const data = await response.json();
  return data;
}

export async function getInvoiesValues() {
  const response = await fetch(`${apiUrl}/facturas/values`);
  if(!response.ok){
    throw new Error('No invoices values found');
  }
  const data = await response.json();
  console.log(data)
  return data;
}