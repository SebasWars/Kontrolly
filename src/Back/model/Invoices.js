import { randomUUID } from "crypto";
import { db } from "../App.js";

export class InvoicesModel {
  static async getInvoicesByType(type, userID) {
    if (type === "all") {
      const result = await db.execute({
        sql: `
        SELECT
          s.id,
          w.warehouse AS warehouseID,
          s.state,
          s.total,
          s.created_at AS date
        FROM Sales s
        JOIN Warehouse w
        ON w.id = s.warehouse_id
        WHERE w.user_id = ?
      `,
        args: [userID],
      });

      return result.rows;
    }

    const invoices = await db.execute({
      sql: "SELECT s.id, w.warehouse AS warehouseID, s.state, s.total, s.created_at AS date FROM Sales s JOIN Warehouse w ON w.id = s.warehouse_id WHERE s.state = ? AND w.user_id = ?",
      args: [type, userID],
    });

    return invoices.rows;
  }

  static async getInvoicesValues(userID) {
    const totalPrices = await db.execute({
      sql: "SELECT SUM(s.total) as totalCombined, SUM(CASE WHEN s.state = ? THEN s.total ELSE 0 END) AS totalSold, SUM(CASE WHEN s.state = ? THEN s.total ELSE 0 END) AS totalPrice, MAX(s.created_at) AS combinedLastUpdate, MAX(CASE WHEN s.state = ? THEN s.created_at END) AS soldLastUpdate, MAX(CASE WHEN s.state = ? THEN s.created_at END) AS priceLastUpdate FROM Sales s JOIN Warehouse w ON w.id = s.warehouse_id WHERE w.user_id = ?",
      args: ["sold", "price", "sold", "price", userID],
    });

    return totalPrices.rows[0];
  }

  static async getinvoiceByID(id, userID) {
    const invoiceResult = await db.execute({
      sql: `SELECT
            s.id AS saleId, s.state, s.client_id, s.total, s.created_at, s.warehouse_id,
            w.warehouse AS warehouseName,
            si.item_id, si.quantity, si.unit_price, si.purchase_price,
            i.name AS itemName, i.description, i.quantity AS availableStock
          FROM Sales s
          JOIN Warehouse w ON w.id = s.warehouse_id
          JOIN Sales_items si ON si.sale_id = s.id
          JOIN Items i ON i.id = si.item_id
          WHERE s.id = ?
          AND w.user_id = ?
          `,
      args: [id, userID],
    });

    const rows = invoiceResult.rows;
    if (rows.length === 0) return false;

    const invoice = {
      id: rows[0].saleId,
      state: rows[0].state,
      warehouseID: rows[0].warehouse_id,
      warehouseName: rows[0].warehouseName,
      clientID: rows[0].client_id,
      total: rows[0].total,
      createdAt: rows[0].created_at,
      itemsList: rows.map((row) => ({
        id: row.item_id,
        quantity: row.quantity,
        sales_price: row.unit_price,
        purchase_price: row.purchase_price,
        availableStock: row.availableStock,
        name: row.itemName,
        description: row.description,
      })),
    };

    return invoice;
  }

  static async updateInvoice(id, invoice, userID) {
    const tx = await db.transaction("write");
    try {
      const oldInvoice = await tx.execute({
        sql: "SELECT si.item_id, si.quantity FROM Sales_items si JOIN Items i ON i.id = si.item_id JOIN Warehouse w ON w.id = i.warehouse_id WHERE si.sale_id = ? AND w.user_id = ?",
        args: [id, userID],
      });

      if (oldInvoice.rows.length === 0) {
        throw new Error("Invoice not found");
      }

      for (const oldItem of oldInvoice.rows) {
        await tx.execute({
          sql: `
          UPDATE Items
          SET quantity = quantity + ?
          WHERE id = ?
          AND warehouse_id IN (
            SELECT id
            FROM Warehouse
            WHERE user_id = ?)
          `,
          args: [oldItem.quantity, oldItem.item_id, userID],
        });
      }

      await tx.execute({
        sql: "DELETE FROM Sales_items WHERE sale_id = ? AND sale_id IN (SELECT s.id FROM Sales s JOIN Warehouse w ON w.id = s.warehouse_id WHERE user_id = ?)",
        args: [id, userID],
      });

      let newTotal = 0;

      for (const item of invoice.itemsList) {
        const itemsResult = await tx.execute({
          sql: "SELECT i.id, i.quantity, i.sales_price, i.purchase_price FROM Items i JOIN Warehouse w ON w.id = i.warehouse_id WHERE i.id = ? AND w.user_id = ?",
          args: [item.id, userID],
        });

        const stockItems = itemsResult.rows[0];
        if (!stockItems) {
          throw new Error(`Items ${item.id} not found`);
        }

        if (stockItems.quantity < item.quantity) {
          throw new Error(`Not enogh stock for item: ${item.id}`);
        }

        newTotal += item.quantity * stockItems.sales_price;

        await tx.execute({
          sql: "INSERT INTO Sales_items (id, sale_id, item_id, quantity,unit_price, purchase_price) VALUES (?, ?, ?, ?, ?, ? )",
          args: [
            randomUUID(),
            id,
            item.id,
            item.quantity,
            stockItems.sales_price,
            stockItems.purchase_price,
          ],
        });

        await tx.execute({
          sql: "UPDATE Items SET quantity = quantity - ? WHERE id = ? AND warehouse_id IN (SELECT id FROM Warehouse WHERE user_id = ?)",
          args: [item.quantity, item.id, userID],
        });
      }

      await tx.execute({
        sql: "UPDATE Sales SET total = ?, state = ?, client_id = ? WHERE id = ? AND warehouse_id IN (SELECT id FROM Warehouse WHERE user_id = ?)",
        args: [newTotal, invoice.state, invoice.clientID || null, id, userID],
      });

      await tx.commit();
      return true;
    } catch (error) {
      await tx.rollback();
      throw error;
    }
  }

  static async updateInvoiceState(id, newState, userID) {
    const invoiceResult = await db.execute({
      sql: "UPDATE Sales SET state = ? WHERE id = ? AND warehouse_id IN (SELECT id FROM Warehouse WHERE user_id = ?)",
      args: [newState.state, id, userID],
    });

    return invoiceResult.rowsAffected > 0;
  }

  static async deleteInvoice({ id, userID }) {
    const tx = await db.transaction("write");

    try {
      const invoiceResult = await tx.execute({
        sql: "SELECT s.id, s.state FROM Sales s JOIN Warehouse w ON w.id = s.warehouse_id WHERE s.id = ? AND w.user_id = ?",
        args: [id, userID],
      });

      const currentInvoice = invoiceResult.rows[0];
      if (!currentInvoice) {
        throw new Error("Invoice not found");
      }

      if (currentInvoice.state === "price") {
        const itemsResult = await tx.execute({
          sql: "SELECT si.item_id, si.sale_id, si.quantity FROM Sales_items si JOIN Items i ON i.id = si.item_id JOIN Warehouse w ON w.id = i.warehouse_id WHERE si.sale_id = ? AND w.user_id = ?",
          args: [id, userID],
        });

        const itemsList = itemsResult.rows;

        for (const item of itemsList) {
          await tx.execute({
            sql: "UPDATE Items SET quantity = quantity + ? WHERE id = ? AND warehouse_id IN (SELECT id FROM Warehouse WHERE user_id = ?)",
            args: [item.quantity, item.item_id, userID],
          });
        }
      }

      await tx.execute({
        sql: "DELETE FROM Sales_items WHERE sale_id = ? AND sale_id IN (SELECT s.id FROM Sales s JOIN Warehouse w ON w.id = s.warehouse_id WHERE user_id = ?)",
        args: [id, userID],
      });

      await tx.execute({
        sql: "DELETE FROM Sales WHERE id = ? AND warehouse_id IN (SELECT id FROM Warehouse WHERE user_id = ?)",
        args: [id, userID],
      });

      await tx.commit();
      return true;
    } catch (error) {
      await tx.rollback();
      throw error;
    }
  }
}
