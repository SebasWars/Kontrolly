import type { NewClient } from "../context/RecuderTypes/ClientsReduce";
import { getHeaders, handleResponse } from "./api";

const apiUrl = import.meta.env.VITE_API_URL;

export const getClientsResume = async () => {
  const response = await fetch(`${apiUrl}/clientes/resumen`, {
    headers: getHeaders(),
  });
  return handleResponse(response);
};

export const getClients = async () => {
  const response = await fetch(`${apiUrl}/clientes`, {
    headers: getHeaders(),
  });
  return handleResponse(response);
};

export const getClientsByQuery = async (query: string) => {
  const response = await fetch(`${apiUrl}/clientes/${query}`, {
    headers: getHeaders(),
  });
  return handleResponse(response);
};

export const getClientByID = async (cliendId: string) => {
  const response = await fetch(`${apiUrl}/clientes/cliente/${cliendId}`, {
    headers: getHeaders(),
  });
  return handleResponse(response);
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
  return handleResponse(response);
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
  return handleResponse(response);
};

export const removeClient = async (id: string) => {
  const response = await fetch(`${apiUrl}/clientes/cliente/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  return handleResponse(response);
};
