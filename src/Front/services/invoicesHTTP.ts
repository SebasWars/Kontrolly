import type { InvoiceDetails } from "../context/RecuderTypes/InvoiceReduce";
import { getHeaders, handleResponse } from "./api";

const apiUrl = import.meta.env.VITE_API_URL;

export async function getInvoicesByType(type: "all" | "sold" | "price") {
  const response = await fetch(`${apiUrl}/facturas/type/${type}`, {
    headers: getHeaders(),
  });
  return handleResponse(response);
}

export async function getInvoiesValues() {
  const response = await fetch(`${apiUrl}/facturas/values`, {
    headers: getHeaders(),
  });
  return handleResponse(response);
}

export async function getInvoice(id: string) {
  const response = await fetch(`${apiUrl}/facturas/${id}`, {
    headers: getHeaders(),
  });
  return handleResponse(response);
}

export async function updateInvoice(id: string, invoice: InvoiceDetails) {
  const response = await fetch(`${apiUrl}/facturas/${id}`, {
    method: "PUT",
    headers: {
      ...getHeaders(),
      "content-type": "application/json",
    },
    body: JSON.stringify(invoice),
  });
  return handleResponse(response);
}

export async function updateInvoiceState(id: string, newState: string) {
  const response = await fetch(`${apiUrl}/facturas/state/${id}`, {
    method: "PUT",
    headers: {
      ...getHeaders(),
      "content-type": "application/json",
    },
    body: JSON.stringify({
      state: newState,
    }),
  });
  return handleResponse(response);
}

export async function removeInvoice(id: string) {
  const response = await fetch(`${apiUrl}/facturas/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return handleResponse(response);
}
