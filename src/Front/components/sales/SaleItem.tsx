import useSales from "../../Hooks/UseSales";
import { shortName } from "../../Utils/SalesUtils";

export function SaleItem() {
  const { currentSale, addOne,removeOne} = useSales();

  return (
    <>
      {currentSale.map((item) => {
        const { id, name, image_url, quantity, sales_price } = item;
        return (
          <div key={id} className="curren_sale_items">
            <section className="image">
              <img src={image_url ?? ""} alt={name} />
            </section>
            <section className="item_details">
              <strong>{shortName(name)}</strong>
              <p className="price">€{sales_price}</p>
              <div className="quantity_opt">
                <button
                  onClick={() => removeOne(id)}
                >
                  -
                </button>
                <p>{quantity}</p>
                <button
                  onClick={() => addOne(id)}
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
