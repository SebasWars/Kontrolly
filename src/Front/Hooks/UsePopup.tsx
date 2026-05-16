import { useContext } from "react";
import { PopupContext } from "../context/Providers/PopupProvider";

function usePopUp() {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('Context could not be found');
  }
  return context;
}

export default usePopUp;
