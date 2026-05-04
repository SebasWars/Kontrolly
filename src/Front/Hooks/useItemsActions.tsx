import { useNavigate } from "react-router-dom";
import { createNewItem } from "../services/httpConection";
import type { NewItem } from "../Types/StockTypes";

export function useItemsActions() {
  const navigate = useNavigate();

  const createItem = async (id: string, data: NewItem) => {
    await createNewItem(id, data);
    navigate("/inventario");
  };

  const discardItem = () => {
    navigate("/inventario");
  };

  return { createItem, discardItem };
}
