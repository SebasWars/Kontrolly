import { useEffect } from "react";
import useWarehouse from "../../Hooks/UseWarehouse";
import '../../styles/UIComponents.css'

export function PopUp() {
  const { popupState, dispatch } = useWarehouse();

  useEffect(() => {
    if (!popupState.open) return;

    const timer = setTimeout(() => {
      dispatch({ type: "HIDE_POPUP" });
    }, 1500);

    return () => clearTimeout(timer);
  }, [popupState.open]);

  return (
    <div className={`popUp_container ${popupState.open? 'active' : ''}`}>
      <h4>{popupState.title}</h4>
      <p>{popupState.message}</p>
    </div>
  );
}
