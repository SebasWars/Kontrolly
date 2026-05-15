import { useContext } from "react";
import { WarehouseContext } from "../Provider";

function useWarehouse() {
  const context = useContext(WarehouseContext);
  if (!context) {
    throw new Error('Context could not be found');
  }
  return context;
}

export default useWarehouse;
