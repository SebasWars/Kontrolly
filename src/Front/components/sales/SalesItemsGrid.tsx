import type { SaleItems } from "../../Types/SalesTypes";

interface Props {
  itemsSales: SaleItems[] | null;
}
export function SalesItemsGrid({ itemsSales }: Props) {
  return (
    <div className="sales_items_grid">
      <div className="cards_container">
        {itemsSales?.map((item, index) => {
          const { name, image_url, sales_price } = item;
          return (
            <div key={index} className="item_grid_container">
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
