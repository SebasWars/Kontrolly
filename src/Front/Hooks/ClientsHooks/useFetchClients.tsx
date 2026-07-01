import type { Client } from "../../context/RecuderTypes/ClientsReduce";
import {
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

  return { clientsList, clientsResumes, clientById };
}
