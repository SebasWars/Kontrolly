import { db } from "../App.js";
import { randomUUID } from "node:crypto";

export class clientsModel {
  static async getClientsResume(userID) {
    const clients = await db.execute({
      sql: "SELECT id, company_name FROM Clients WHERE user_id = ?",
      args: [userID],
    });
    const clientsFormated = clients.rows.map((client) => {
      return {
        id: client.id,
        companyName: client.company_name,
      };
    });
    return clientsFormated;
  }

  static async getClients(userID) {
    const clients = await db.execute({
      sql: "SELECT * FROM Clients WHERE user_id = ?",
      args: [userID],
    });
    const clientsFormated = clients.rows.map((client) => {
      return {
        id: client.id,
        companyName: client.company_name,
        name: client.name,
        emailAddress: client.email_address,
        phoneNumber: client.phone_number,
        address: client.address,
        notes: client.notes,
      };
    });
    return clientsFormated;
  }

  static async getClientsByQuery(query, userID) {
    const normalize = (text) => (text ?? "").trim().toLowerCase();
    const queryNormalized = normalize(query);

    const clientsFiltered = await db.execute({
      sql: "SELECT * FROM Clients WHERE LOWER(company_name) LIKE ? AND user_id = ?",
      args: [`%${queryNormalized}%`, userID],
    });

    const clientsFormated = clientsFiltered.rows.map((client) => {
      return {
        id: client.id,
        companyName: client.company_name,
        name: client.name,
        emailAddress: client.email_address,
        phoneNumber: client.phone_number,
        address: client.address,
        notes: client.notes,
      };
    });

    return clientsFormated;
  }

  static async getClientByID(id, userID) {
    const client = await db.execute({
      sql: "SELECT * FROM Clients WHERE id = ? AND user_id = ?",
      args: [id, userID],
    });

    if (client.rows.length === 0) {
      throw new Error("Client not found");
    }

    const clientsFormated = {
      id: client.rows[0].id,
      companyName: client.rows[0].company_name,
      name: client.rows[0].name,
      emailAddress: client.rows[0].email_address,
      phoneNumber: client.rows[0].phone_number,
      address: client.rows[0].address,
      notes: client.rows[0].notes,
    };

    return clientsFormated;
  }

  static async createClient(body, userID) {
    const { companyName, name, emailAddress, phoneNumber, address, notes } =
      body;
    const id = randomUUID();

    await db.execute({
      sql: "INSERT INTO Clients (id, name, company_name, email_address, address, phone_number, notes, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      args: [id, name, companyName, emailAddress, address, phoneNumber, notes, userID],
    });

    return { id, name, companyName, emailAddress, address, phoneNumber, notes };
  }

  static async updateClient(id, body, userID) {
    const { companyName, name, emailAddress, phoneNumber, address, notes } =
      body;
    const client = await db.execute({
      sql: "UPDATE Clients Set name = ?, company_name = ? , email_address = ?, address = ?, phone_number = ?, notes = ? WHERE id = ? AND user_id = ?",
      args: [name, companyName, emailAddress, address, phoneNumber, notes, id, userID],
    });

    return client.rowsAffected > 0;
  }

  static async delteClient(id, userID) {
    const client = await db.execute({
      sql: "DELETE FROM Clients WHERE id = ? AND user_id = ?",
      args: [id, userID],
    });

    return client.rowsAffected > 0;
  }
}
