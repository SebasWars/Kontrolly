import { useSalesActions } from "../../Hooks/SellsHooks/useSalesActions";
import useSales from "../../Hooks/UseSales";
import { shortName } from "../../Utils/SalesUtils";

export function SaleItemGrid() {
  const { itemsSales } = useSales();
  const { addToCart } = useSalesActions();

  return (
    <>
      {itemsSales?.map((item, index) => {
        const { id, name, image_url, sales_price, quantity } = item;
        return (
          <div key={index} className="item_grid_container">
            <img src={image_url || ""} alt={`${name}_image`} />
            <p className="quantity_info">{`U.${quantity}`}</p>
            <div className="product_name_price">
              <p className="item_name_cart">{shortName(name)}</p>
              <section>
                <p className="item_price_cart">€{sales_price}</p>
                <button onClick={() => addToCart(id)}>Añadir</button>
              </section>
            </div>
          </div>
        );
      })}
    </>
  );
}
