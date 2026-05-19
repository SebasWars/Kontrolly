import { SalesRegister, Stocks } from "../MockData_Back.js";

export class InvoicesModel {
  static async getInvoices() {
    const findWarehouse = (saleWarehouse) => {
      return Stocks.find((warehouse) => warehouse.id === saleWarehouse);
    };

    const invoices = SalesRegister.map((invoice) => {
      const warehouse = findWarehouse(invoice.warehouse);
      if (!warehouse) return null;
      let totalAmount = 0;

      const itemsDetails = invoice.itemsSold.map((soldItem) => {
        const realItem = warehouse.items.find(
          (item) => item.id === soldItem.id,
        );
        if (!realItem) return;

        let subtotal = realItem.sales_price * soldItem.quantity;
        totalAmount += subtotal;
      });

      return {
        id: invoice.id,
        warehouse: warehouse.warehouse,
        date: invoice.createdAt,
        state: invoice.state,
        total: totalAmount
      };
    });
    return invoices;
  }
}
