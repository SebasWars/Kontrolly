import type { LastOrders } from "../../Types/FinancesResumeTypes";

interface PropType {
  lastOrdes: LastOrders[];
}

export function LastSales({ lastOrdes }: PropType) {
  const shortDate = (str: string) => {
    return str.slice(0,10)
  }
  return (
    <div className="last_sales_container">
      {lastOrdes.map((order, index) => {
        const {total,date, warehouse} = order;
        return (
          <div key={index} className="sale_container_box">
            <h2>{warehouse}</h2>
            <div className="sale_details">
              <p>{shortDate(date)}</p>
              <p>€{total}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
