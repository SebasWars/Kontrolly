import { clientsModel } from "../model/client.js";

export class clientsController {
  static async getClients(req, res) {
    try {
      const allClients = await clientsModel.getClients();
      return res.status(200).json(allClients);
    } catch (error) {
      return res
        .status(404)
        .json({ message: "It was not possible to get clients information." });
    }
  }
  static async getClientByID(req, res) {
    try {
      const { id } = req.params;
      const client = await clientsModel.getClientByID(id);
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
      return res.status(200).json(client);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving client" });
    }
  }
  static async createClient(req, res) {
    try {
      const body = req.body;
      const createNewClient = await clientsModel.createClient(body);
      return res.status(201).json(createNewClient);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Something went wrong createing a client." });
    }
  }
  /* static async delteClient(req, res) {} */
}
