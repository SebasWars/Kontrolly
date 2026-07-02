import type {
  Client,
  NewClient,
} from "../../context/RecuderTypes/ClientsReduce";
import {
  createClient,
  getClientByID,
  getClients,
  getClientsResume,
} from "../../services/clientsHTTP";
import { useClients } from "../UseClients";

export function useFetchClients() {
  const { setClientList, setClientsResume, setClient } = useClients();

  async function clientsResumes() {
    try {
      const clientsR = await getClientsResume();
      setClientsResume(clientsR);
    } catch (error) {
      throw new Error("Clienst resume were not able.");
    }
  }

  async function clientsList() {
    try {
      const clientList: Client[] = await getClients();
      setClientList(clientList);
    } catch (error) {
      throw new Error("Error getting clients information");
    }
  }

  async function clientById(cliendId: string) {
    try {
      const client = await getClientByID(cliendId);
      setClient(client);
    } catch (error) {
      throw new Error("It was not possible to get client information");
    }
  }

  async function createNewClient(newClient: NewClient) {
    try {
      await createClient(newClient);
      clientsList()
    } catch (error) {
      throw new Error("It was not possible create a new client");
    }
  }

  return { clientsList, clientsResumes, clientById, createNewClient };
}
