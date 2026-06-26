import { SalesRegister, Stocks } from "../MockData_Back.js";

export class InvoicesModel {
  static async getInvoicesByType(type) {
    const getWarehouse = (id) => {
      const warehouse = Stocks.find((W) => W.id === id);
      return warehouse?.warehouse;
    };

    if (type === "sold" || type === "price") {
      const invoices = SalesRegister.filter(
        (invoice) => invoice.state === type,
      ).map((invoice) => ({
        id: invoice.id,
        warehouseID: getWarehouse(invoice.warehouseID),
        state: invoice.state,
        total: invoice.total,
        date: invoice.createdAt,
      }));
      return invoices;
    }

    const invoices = SalesRegister.map((invoice) => {
      return {
        id: invoice.id,
        warehouseID: getWarehouse(invoice.warehouseID),
        state: invoice.state,
        total: invoice.total,
        date: invoice.createdAt,
      };
    });
    return invoices;
  }

  static async getInvoicesValues() {
    const totalPriceInvoices = SalesRegister.reduce(
      (acc, item) => {
        const currenDate = new Date(item.createdAt);
        acc.totalCombined += item.total;

        if (item.state === "sold") {
          acc.totalSold += item.total;

          if (
            !acc.soldLastUpdate ||
            currenDate > new Date(acc.soldLastUpdate)
          ) {
            acc.soldLastUpdate = item.createdAt;
          }
        }

        if (item.state === "price") {
          acc.totalPrice += item.total;

          if (
            !acc.priceLastUpdate ||
            currenDate > new Date(acc.priceLastUpdate)
          ) {
            acc.priceLastUpdate = item.createdAt;
          }
        }

        if (
          !acc.combinedLastUpdate ||
          currenDate > new Date(acc.combinedLastUpdate)
        ) {
          acc.combinedLastUpdate = item.createdAt;
        }

        return acc;
      },
      {
        totalCombined: 0,
        totalSold: 0,
        totalPrice: 0,
        combinedLastUpdate: null,
        soldLastUpdate: null,
        priceLastUpdate: null,
      },
    );
    return totalPriceInvoices;
  }

  static async getinvoiceByID(id) {
    const invoice = SalesRegister.find((inv) => inv.id === id);
    if (!invoice) return false;

    const warehouse = Stocks.find((stock) => stock.id === invoice.warehouseID);

    const itemsLits = invoice.itemsList.map((item) => {
      const warehouseItem = warehouse.items.find(
        (wItem) => wItem.id === item.id,
      );

      return {
        ...item,
        availableStock: warehouseItem?.quantity ?? 0,
      };
    });

    return { ...invoice, itemsList: itemsLits };
  }

  static async getPDF(id, invoice) {
    await this.updateInvoice(id, invoice);
    const updatedInvoice = SalesRegister.find((inv) => inv.id === id);

    if (!updatedInvoice) {
      throw new Error("Factura no encontrada");
    }

    const iva = updatedInvoice.total * 0.21;
    const totalPlusIVA = updatedInvoice.total + iva;

    return {
      ...updatedInvoice,
      iva,
      totalPlusIVA,
    };
  }

  static async updateInvoice(id, invoice) {
    const invoiceIndex = SalesRegister.findIndex(
      (invoice) => invoice.id === id,
    );

    if (invoiceIndex === -1) throw new Error("Invoice not found");

    const oldInvoice = SalesRegister[invoiceIndex];
    const warehouse = Stocks.find((W) => W.id === oldInvoice.warehouseID);

    if (!warehouse) return false;

    const warehouseStock = warehouse.items;
    let newTotal = 0;

    for (let item of oldInvoice.itemsList) {
      const i = warehouseStock.find((x) => x.id === item.id);
      if (i) {
        i.quantity += item.quantity;
      }
    }

    const newItems = invoice.itemsList.map(({ availableStock, ...item }) => {
      const s = warehouseStock.find((i) => i.id === item.id);

      if (s) {
        s.quantity -= item.quantity;
        newTotal += item.quantity * s.sales_price;
      }
      return item;
    });

    SalesRegister[invoiceIndex] = {
      ...invoice,
      itemsList: newItems,
      total: newTotal,
    };

    return true;
  }

  static async deleteInvoice({ id }) {
    const invoiceIndex = SalesRegister.findIndex((i) => i.id === id);
    if (invoiceIndex === -1) return false;

    const currentInvoice = SalesRegister[invoiceIndex];

    if (currentInvoice.state === "price") {
      const warehouse = Stocks.find((W) => W.id === currentInvoice.warehouseID);
      if (!warehouse) return false;

      for (let invoiceItem of currentInvoice.itemsList) {
        const { id, quantity } = invoiceItem;
        const stockItem = warehouse.items.find((item) => item.id === id);
        if (stockItem) {
          stockItem.quantity += quantity;
        }
      }
    }

    SalesRegister.splice(invoiceIndex, 1);
    return true;
  }
}
