import type { SaleItems } from "../../Types/SalesTypes";

interface Props {
  saleItems: SaleItems[];
}

export function SaleItem({ saleItems }: Props) {
  return (
    <>
      {saleItems.map((item) => {
        const { name, image_url, quantity, sales_price } = item;
        return (
          <div className="curren_sale_items">
            <section className="image">
              <img src={image_url ?? ""} alt={name} />
            </section>
            <section className="item_details">
              <strong>{name}</strong>
              <p className="price">€{sales_price}</p>
              <div className="quantity_opt">
                <button>-</button>
                <p>{quantity}</p>
                <button>+</button>
              </div>
            </section>
          </div>
        );
      })}
    </>
  );
}
