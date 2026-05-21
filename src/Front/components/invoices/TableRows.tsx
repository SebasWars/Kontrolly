import type { Invoice } from "../../context/RecuderTypes/InvoiceReduce";
import DropDown from "./DropDownOptions";

interface PropsType {
  invoiceList: Invoice;
}

export function TableRows({ invoiceList }: PropsType) {
  const { id, warehouseID, date, state, total } = invoiceList;
  const sliceDate = date?.slice(0,10)
  return (
    <tr>
      <td>{id}</td>
      <td>{warehouseID}</td>
      <td>{sliceDate}</td>
      <td>{state}</td>
      <td>{`€${total}`}</td>
      <td>
        <DropDown/>
      </td>
    </tr>
  );
}
