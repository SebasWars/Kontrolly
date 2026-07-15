import { db } from "../App.js";

export class homeModel {
  static async getFinances() {
    const salesResults = await db.execute({
      sql: "SELECT SUM(total) AS totalSales, COUNT(*) AS totalOrders FROM Sales WHERE state = ?",
      args: ["sold"],
    });

    const invesmentResult = await db.execute({
      sql: "SELECT SUM(si.purchase_price * si.quantity) AS totalInvesment FROM Sales s JOIN Sales_items si ON si.sale_id = s.id WHERE s.state = ?",
      args: ["sold"],
    });

    const totalSales = salesResults.rows[0].totalSales ?? 0;
    const totalOrders = salesResults.rows[0].totalOrders ?? 0;
    const totalInvestment = invesmentResult.rows[0].totalInvesment ?? 0;
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
        value: totalOrders,
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

  static async getLasSales() {
    const lastSales = await db.execute({
      sql: "SELECT w.warehouse AS warehouse, s.created_at AS date, s.total AS total FROM Sales s JOIN Warehouse w ON w.id = s.warehouse_id WHERE state = ? ORDER BY s.created_at DESC LIMIT 10",
      args: ["sold"],
    });

    return lastSales.rows;
  }

  static async getSalesByRequest(type) {
    switch (type) {
      case "month":
        return this.getSalesByYear();
      case "day":
        return this.getSalesByMonth();
      default:
        throw new Error("Invalid Type");
    }
  }

  static async getSalesByYear() {
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

    const result = await db.execute({
      sql: `SELECT CAST(strftime('%m', created_at) AS INTEGER) AS monthNumber,
           SUM(total) AS total
           FROM Sales
           WHERE state = ?
           GROUP BY monthNumber
      `,
      args: ["sold"],
    });

    for (const row of result.rows) {
      const monthIndex = row.monthNumber - 1;
      months[monthIndex].total = row.total;
    }

    return months;
  }

  static async getSalesByMonth() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const daysInMonth = new Date(year, month, 0).getDate();

    const days = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      total: 0,
    }));

    const monthStr = String(month).padStart(2, '0')

    const result = await db.execute({
      sql:`SELECT CAST(strftime('%d', created_at) AS INTEGER) AS dayNumber,
           SUM(total) AS total
           FROM Sales
           WHERE state = ?
           AND strftime('%Y', created_at) = ?
           AND strftime('%m', created_at) = ?
           GROUP BY dayNumber
      `,
      args:['sold', String(year), monthStr]
    })

    for(const row of result.rows){
      days[row.dayNumber - 1].total = row.total
    }

    return days;
  }
}
