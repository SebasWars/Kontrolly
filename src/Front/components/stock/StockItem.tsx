import { useNavigate } from "react-router-dom";
import type { Items } from "../../Types/StockTypes";
import useWarehouse from "../../Hooks/UseWarehouse";

type PropType = {
  item: Items;
};

function StockItem({ item }: PropType) {
  const navigate = useNavigate();
  const { selectedWarehouseId } = useWarehouse();
  const {
    id,
    name,
    image_url,
    description,
    quantity,
    purchase_price,
    sales_price,
  } = item;

  return (
    <tr
      onClick={() => navigate(`${selectedWarehouseId}/items/${item.id}`)}
    >
      <td>
        <img src={image_url ?? ""} alt={name} />
      </td>
      <td>{name}</td>
      <td>{id}</td>
      <td>{description}</td>
      <td>€{sales_price}</td>
      <td>€{purchase_price}</td>
      <td>{quantity}</td>
    </tr>
  );
}
export default StockItem;
