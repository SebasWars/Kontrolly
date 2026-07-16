import { getHeaders, handleResponse } from "./api";

const apiUrl = import.meta.env.VITE_API_URL;

type Type = "month" | "day";

export async function getFinanceResume() {
  const response = await fetch(`${apiUrl}/finance`, {
    headers: getHeaders(),
  });
  return handleResponse(response);
}

export async function getLastSales() {
  const response = await fetch(`${apiUrl}/last-sales`, {
    headers: getHeaders(),
  });
  return handleResponse(response);
}

export async function getSalesResume(type: Type) {
  const response = await fetch(`${apiUrl}/sales-resume?type=${type}`, {
    headers: getHeaders(),
  });
  return handleResponse(response);
}
