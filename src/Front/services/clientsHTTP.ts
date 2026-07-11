import type { NewClient } from "../context/RecuderTypes/ClientsReduce";
import { getHeaders } from "./api";

const apiUrl = import.meta.env.VITE_API_URL;

export const getClientsResume = async () => {
  const response = await fetch(`${apiUrl}/clientes/resumen`, {
    headers: getHeaders(),
  });
  const data = await response.json();
  return data;
};

export const getClients = async () => {
  const response = await fetch(`${apiUrl}/clientes`, {
    headers: getHeaders(),
  });
  const data = await response.json();
  return data;
};

export const getClientsByQuery = async (query: string) => {
  const response = await fetch(`${apiUrl}/clientes/${query}`, {
    headers: getHeaders(),
  });
  const data = await response.json();
  return data;
};

export const getClientByID = async (cliendId: string) => {
  const response = await fetch(`${apiUrl}/clientes/cliente/${cliendId}`, {
    headers: getHeaders(),
  });
  const data = await response.json();
  return data;
};

export const createClient = async (clientForm: NewClient) => {
  const response = await fetch(`${apiUrl}/clientes/cliente`, {
    method: "POST",
    headers: {
      ...getHeaders(),
      "content-type": "application/json",
    },
    body: JSON.stringify(clientForm),
  });
  const data = await response.json();
  return data;
};

export const updateClient = async (client: NewClient, clientID: string) => {
  const response = await fetch(`${apiUrl}/clientes/cliente/${clientID}`, {
    method: "PUT",
    headers: {
      ...getHeaders(),
      "content-type": "application/json",
    },
    body: JSON.stringify(client),
  });
  const data = await response.json();
  return data;
};

export const removeClient = async (id: string) => {
  const response = await fetch(`${apiUrl}/clientes/cliente/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("It was not possible to remove client");
  }

  return await response.json();
};
