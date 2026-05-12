import type { SaleItems } from "../../Types/SalesTypes";

interface Props {
  itemsSales: SaleItems[] | null;
  addToCart: (id: string) => void
}
export function SalesItemsGrid({ itemsSales, addToCart}: Props) {
  return (
    <div className="sales_items_grid">
      <div className="cards_container">
        {itemsSales?.map((item, index) => {
          const { id, name, image_url, sales_price } = item;
          return (
            <div onClick={() => addToCart(id)} key={index} className="item_grid_container">
              <img src={image_url || ""} alt={`${name}_image`} />
              <p>{name}</p>
              <p>€ {sales_price}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
