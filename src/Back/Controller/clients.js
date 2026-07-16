import { clientsModel } from "../model/client.js";

export class clientsController {
  static async getClientsResume(req, res) {
    try {
      const userID = req.user.id;
      const clientsResume = await clientsModel.getClientsResume(userID);
      return res.status(200).json(clientsResume);
    } catch (error) {
      return res.status(404).json({
        message: "It was not possible to get clients resume information",
      });
    }
  }

  static async getClients(req, res) {
    try {
      const userID = req.user.id;
      const allClients = await clientsModel.getClients(userID);
      return res.status(200).json(allClients);
    } catch (error) {
      return res
        .status(404)
        .json({ message: "It was not possible to get clients information." });
    }
  }

  static async getClientsByQuery(req, res) {
    try {
      const { query } = req.params;
      const userID = req.user.id;
      const clientsFiltered = await clientsModel.getClientsByQuery(query, userID);
      return res.status(200).json(clientsFiltered);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "It was not possoble to apply filter by query" });
    }
  }

  static async getClientByID(req, res) {
    try {
      const { id } = req.params;
      const userID = req.user.id;
      const client = await clientsModel.getClientByID(id, userID);
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
      const userID = req.user.id;
      const createNewClient = await clientsModel.createClient(body, userID);
      return res.status(201).json(createNewClient);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Something went wrong createing a client." });
    }
  }

  static async updateClient(req, res) {
    try {
      const { id } = req.params;
      const body = req.body;
      const userID = req.user.id;
      const updatedClient = await clientsModel.updateClient(id, body, userID);
      return res.status(200).json(updatedClient);
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Client was not able to be updated" });
    }
  }

  static async delteClient(req, res) {
    try {
      const { id } = req.params;
      const userID = req.user.id;
      const removeClient = await clientsModel.delteClient(id, userID);
      return res
        .status(202)
        .json({ message: "Client was removed succesfully!" });
    } catch (error) {
      return res
        .status(404)
        .json({ message: "It was not possisble to remove client" });
    }
  }
}
