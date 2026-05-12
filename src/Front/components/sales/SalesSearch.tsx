import Selector from "../stock/Selectors/Selector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface Props {
  handleChange: (value: string) => void;
  stockForSalesID: string;
}

export function SalesSearch({ handleChange, stockForSalesID }: Props) {
  return (
    <div className="search_sales_title">
      <div className="search_item">
        <input type="text" />
        <button className="search_item_btn">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>

      <Selector
        warehouse={stockForSalesID || ""}
        handleSelector={handleChange}
      />
    </div>
  );
}
