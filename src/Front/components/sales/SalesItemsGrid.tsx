import type { SaleItems } from "../../Types/SalesTypes";

interface Props {
  itemsSales: SaleItems[] | null;
  addToCart: (id: string) => void;
}
export function SalesItemsGrid({ itemsSales, addToCart }: Props) {
  const shortName = (name: string) => {
    if (name.length > 17) {
      return `${name.slice(0, 17)}...`;
    }
    return name;
  };

  return (
    <div className="sales_items_grid">
      <div className="cards_container">
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
      </div>
    </div>
  );
}
