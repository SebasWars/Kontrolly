import { clientsList } from "../MockData_Back.js";

export class clientsModel {
  static getClientsResume() {
    const clients = clientsList.map((client) => {
      return {
        id: client.id,
        companyName: client.companyName,
      };
    });

    return clients;
  }

  static getClients() {
    const clients = clientsList;
    return clients;
  }

  static getClientByID(id) {
    const client = clientsList.find((client) => client.id === id);
    if (!client) return false;
    return client;
  }

  static createClient(body) {
    const clients = clientsList;
    const { companyName, name, emailAddress, phoneNumber, address, notes } = body;

    const newClient = {
      id: crypto.randomUUID(),
      companyName,
      name,
      emailAddress,
      phoneNumber,
      address,
      notes,
    };

    clients.push(newClient);

    return newClient;
  }

  static updateClient(id, body) {
    const clietnID = clientsList.findIndex((client) => client.id === id);
    if (clientsList.length === -1) return false;
    clientsList[clietnID] = body;
    return true;
  }

  static delteClient(id) {
    const clientIndex = clientsList.findIndex((client) => client.id === id);
    if (clientIndex === -1) return false;

    clientsList.splice(clientIndex, 1);
    return true;
  }
}
