import { clientsList } from "../MockData_Back.js";

export class clientsModel {
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
    const { companyName, name, emailAddress, phoneNumber, address } = body;

    const newClient = {
      id: crypto.randomUUID(),
      companyName,
      name,
      emailAddress,
      phoneNumber,
      address,
    };

    clients.push(newClient);

    return newClient
  }
}
