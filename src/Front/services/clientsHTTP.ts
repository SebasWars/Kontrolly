import type { Client } from "../Pages/Clients";

const apiUrl = import.meta.env.VITE_API_URL;

export const getClientsResume = async () => {
  const response = await fetch(`${apiUrl}/clientes/resumen`);
  const data = await response.json();
  return data;
};

export const getClients = async () => {
  const response = await fetch(`${apiUrl}/clientes`);
  const data = await response.json();
  console.log(data);
  return data;
};

export const getClientByID = async (cliendId: string) => {
  const response = await fetch(`${apiUrl}/clientes/cliente/${cliendId}`);
  const data = await response.json();
  return data;
};

export const createClient = async (clientForm: Client) => {
  const response = await fetch(`${apiUrl}/clientes/cliente`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(clientForm),
  });
  const data = await response.json();
  return data
};
