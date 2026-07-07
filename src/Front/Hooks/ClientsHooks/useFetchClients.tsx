import type {
  Client,
  NewClient,
} from "../../context/RecuderTypes/ClientsReduce";
import {
  createClient,
  getClientByID,
  getClients,
  getClientsResume,
  removeClient,
  updateClient,
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
      await clientsList();
      await clientsResumes();
    } catch (error) {
      throw new Error("It was not possible create a new client");
    }
  }

  async function modifyClient(client: NewClient, clientID: string) {
    try {
      await updateClient(client, clientID);
      await clientsList();
    } catch (error) {
      throw new Error("It was not possible to update the client");
    }
  }

  async function deleteClient(id: string) {
    try {
      await removeClient(id);
      await clientsList();
      await clientsResumes();
    } catch (error) {
      throw new Error("It was not possible remove client");
    }
  }

  return {
    clientsList,
    clientsResumes,
    clientById,
    createNewClient,
    modifyClient,
    deleteClient,
  };
}
