import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { calculateIVA } from "../../Utils/SalesUtils";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface PropType {
  name: string;
  id: string;
  quantity: number;
  sales_price: number;
  addOne: (id: string) => void
  removeOne: (id: string) => void
  removeItem: (id: string) => void
}

export function InvoiceTableRows({ name,id, quantity, sales_price, addOne, removeOne, removeItem }: PropType) {
  const calcualteTotal = (price: number, iva: number) => {
    return (price + iva) * quantity;
  };
  
  return (
    <tr>
      <td>{name}</td>
      <td>
        <button onClick={() => removeOne(id)} className="remove_one_invoice">-</button>
        <span>{quantity}</span>
        <button onClick={() => addOne(id)} className="add_one_invoice">+</button>
      </td>
      <td>€{sales_price}</td>
      <td>€{calculateIVA(sales_price)}</td>
      <td>€{calcualteTotal(sales_price, calculateIVA(sales_price))}</td>
      <td>
        <button onClick={() => removeItem(id)}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );
}
