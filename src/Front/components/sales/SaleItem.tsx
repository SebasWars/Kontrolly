import useWarehouse from "../../Hooks/StockHooks/UseWarehouse";
import type { SaleItems } from "../../Types/SalesTypes";

interface Props {
  saleItems: SaleItems[];
}

export function SaleItem({ saleItems }: Props) {
  const { dispatch } = useWarehouse();
  return (
    <>
      {saleItems.map((item) => {
        const { id, name, image_url, quantity, sales_price } = item;
        return (
          <div key={id} className="curren_sale_items">
            <section className="image">
              <img src={image_url ?? ""} alt={name} />
            </section>
            <section className="item_details">
              <strong>{name}</strong>
              <p className="price">€{sales_price}</p>
              <div className="quantity_opt">
                <button
                  onClick={() => dispatch({ type: "REMOVE_ONE", payload: id })}
                >
                  -
                </button>
                <p>{quantity}</p>
                <button
                  onClick={() => dispatch({ type: "ADD_ONE", payload: id })}
                >
                  +
                </button>
              </div>
            </section>
          </div>
        );
      })}
    </>
  );
}
