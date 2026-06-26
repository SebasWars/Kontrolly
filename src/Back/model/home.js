import { SalesRegister, Stocks } from "../MockData_Back.js";

export class homeModel {
  static getFinances() {
    const salesRegister = SalesRegister;
    const totalSales = salesRegister.reduce(
      (acc, sale) => (sale.state === "sold" ? acc + sale.total : acc),
      0,
    );

    const totalInvestment = salesRegister.reduce((acc, sale) => {
      if (sale.state !== "sold") return acc;
      const salesInvesment = sale.itemsList.reduce((acc, item) => {
        return acc + item.purchase_price * item.quantity;
      }, 0);
      return acc + salesInvesment;
    }, 0);

    const totalProfit = totalSales - totalInvestment;

    const finances = [
      {
        title: "Total Ventas",
        type: "sales",
        value: totalSales,
      },
      {
        title: "Numerdo de Ordenes",
        type: "orders",
        value: salesRegister.length,
      },
      {
        title: "Ganancias Totales",
        type: "income",
        value: totalProfit,
      },
      {
        title: "Inversion Total",
        type: "invesment",
        value: totalInvestment,
      },
    ];

    return finances;
  }

  static getLasSales() {
    const lastSales = SalesRegister.filter((sale) => sale.state === "sold")
      .slice(0, 10)
      .map((S) => {
        return {
          warehouse: S.warehouseName,
          date: S.createdAt,
          total: S.total,
        };
      });
    return lastSales;
  }

  static getSalesByRequest(type) {
    switch (type) {
      case "month":
        return this.getSalesByYear(SalesRegister);
      case "day":
        return this.getSalesByMonth(SalesRegister);
      default:
        throw new Error("Invalid Type");
    }
  }

  static getSalesByYear(sales) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const months = monthNames.map((month) => ({
      month,
      total: 0,
    }));

    sales.forEach((sale) => {
      const date = new Date(sale.createdAt);
      const monthIndex = date.getMonth();

      if (sale.state === "sold") {
        months[monthIndex].total += sale.total;
      }
    });

    return months;
  }

  static getSalesByMonth(sales) {
    const date = new Date();

    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const daysInMonth = new Date(year, month, 0).getDate();

    const days = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      total: 0,
    }));

    sales.forEach((sale) => {
      if (sale.state === "sold") {
        const date = new Date(sale.createdAt);

        if (date.getFullYear() === year && date.getMonth() + 1 === month) {
          const day = date.getDate();
          days[day - 1].total += sale.total;
        }
      }
    });

    return days;
  }
}
