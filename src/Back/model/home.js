import { db } from "../App.js";

export class homeModel {
  static async getFinances(userID) {
    const salesResults = await db.execute({
      sql: "SELECT SUM(s.total) AS totalSales, COUNT(*) AS totalOrders FROM Sales s JOIN Warehouse w ON w.id = s.warehouse_id WHERE s.state = ? AND w.user_id = ?",
      args: ["sold", userID],
    });

    const invesmentResult = await db.execute({
      sql: "SELECT SUM(si.purchase_price * si.quantity) AS totalInvesment FROM Sales s JOIN Warehouse w ON w.id = s.warehouse_id JOIN Sales_items si ON si.sale_id = s.id WHERE s.state = ? AND w.user_id = ?",
      args: ["sold", userID],
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

  static async getLasSales(userID) {
    const lastSales = await db.execute({
      sql: "SELECT w.warehouse AS warehouse, s.created_at AS date, s.total AS total FROM Sales s JOIN Warehouse w ON w.id = s.warehouse_id WHERE s.state = ? AND w.user_id = ? ORDER BY s.created_at DESC LIMIT 10",
      args: ["sold", userID],
    });

    return lastSales.rows;
  }

  static async getSalesByRequest(type, userID) {
    switch (type) {
      case "month":
        return this.getSalesByYear(userID);
      case "day":
        return this.getSalesByMonth(userID);
      default:
        throw new Error("Invalid Type");
    }
  }

  static async getSalesByYear(userID) {
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
      sql: `SELECT CAST(strftime('%m', s.created_at) AS INTEGER) AS monthNumber,
           SUM(s.total) AS total
           FROM Sales s
           JOIN Warehouse w
           ON w.id = s.warehouse_id
           WHERE s.state = ?
           AND w.user_id = ?
           GROUP BY monthNumber
      `,
      args: ["sold", userID],
    });

    for (const row of result.rows) {
      const monthIndex = row.monthNumber - 1;
      months[monthIndex].total = row.total;
    }

    return months;
  }

  static async getSalesByMonth(userID) {
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
      sql:`SELECT CAST(strftime('%d', s.created_at) AS INTEGER) AS dayNumber,
           SUM(s.total) AS total
           FROM Sales s
           JOIN Warehouse w ON w.id = s.warehouse_id
           WHERE s.state = ?
           AND w.user_id = ?
           AND strftime('%Y', s.created_at) = ?
           AND strftime('%m', s.created_at) = ?
           GROUP BY dayNumber
      `,
      args:['sold', userID, String(year), monthStr]
    })

    for(const row of result.rows){
      days[row.dayNumber - 1].total = row.total
    }

    return days;
  }
}
