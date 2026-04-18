import { useNavigate } from "react-router-dom";
import useWarehouse from "./UseWarehouse";

export function useStockActions() {
  const { selectedWarehouse, dispatch } = useWarehouse();
  const navigate = useNavigate();

  const handleSelector = (value: string) => {
    dispatch({ type: "SELECT_WAREHOUSE", payload: value });
  };

  const goToNewItem = () => {
    if (!selectedWarehouse) return;
    navigate(`${selectedWarehouse?.id}/anadir-nuevo-item`);
  };

  return { handleSelector, goToNewItem };
}
