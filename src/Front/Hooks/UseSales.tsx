import { useContext } from "react";
import { SalesContext } from "../context/Providers/SalesContext";

function useSales() {
  const context = useContext(SalesContext);
  if (!context) {
    throw new Error('Context could not be found');
  }
  return context;
}

export default useSales;
