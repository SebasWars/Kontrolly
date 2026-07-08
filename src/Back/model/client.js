import { clientsList } from "../MockData_Back.js";

export class clientsModel {
  static async getClientsResume() {
    const clients = await clientsList.map((client) => {
      return {
        id: client.id,
        companyName: client.companyName,
      };
    });

    return clients;
  }

  static async getClients() {
    const clients = await clientsList;
    return clients;
  }

  static async getClientsByQuery(query) {
    const normalize = (text) => (text ?? "").trim().toLowerCase();
    const queryNormalized = normalize(query);

    const clientsFiltered = clientsList.filter((client) =>
      normalize(client.companyName).includes(queryNormalized),
    );

    return clientsFiltered;
  }

  static async getClientByID(id) {
    const client = await clientsList.find((client) => client.id === id);
    if (!client) return false;
    return client;
  }

  static async createClient(body) {
    const clients = await clientsList;
    const { companyName, name, emailAddress, phoneNumber, address, notes } =
      body;

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

  static async updateClient(id, body) {
    const clietnID = await clientsList.findIndex((client) => client.id === id);
    if (clientsList.length === -1) return false;
    clientsList[clietnID] = body;
    return true;
  }

  static async delteClient(id) {
    const clientIndex = await clientsList.findIndex(
      (client) => client.id === id,
    );
    if (clientIndex === -1) return false;

    clientsList.splice(clientIndex, 1);
    return true;
  }
}
