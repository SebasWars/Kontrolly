import { SalesRegister, Stocks } from "../MockData_Back.js";

export class InvoicesModel {
  static async getInvoices() {
    const getWarehouse = (id) => {
      const warehouse = Stocks.find((W) => W.id === id);
      return warehouse?.warehouse;
    };

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
}
