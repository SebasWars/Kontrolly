import { useNavigate } from "react-router-dom";
import { createNewItem } from "../services/httpConection";
import type { NewItem } from "../Types/StockTypes";
import { validateNewItem } from "../Utils/validation";

export function useItemsActions() {
  const navigate = useNavigate();

  const createItem = async (id: string, data: NewItem) => {
    const errors = validateNewItem(data);
    if (Object.keys(errors).length > 0) {
      //TODO AÑADIR FEEDBACK PARA EL USUARIO FRONT
      return;
    }

    await createNewItem(id, data);
    navigate("/inventario");
  };

  const discardItem = () => {
    navigate("/inventario");
  };

  return { createItem, discardItem };
}
