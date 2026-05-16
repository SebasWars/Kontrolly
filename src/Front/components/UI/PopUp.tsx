import { useEffect } from "react";
import '../../styles/UIComponents.css'
import usePopUp from "../../Hooks/UsePopup";

export function PopUp() {
  const { hidePopup, popup } = usePopUp();

  useEffect(() => {
    if (!popup.open) return;

    const timer = setTimeout(() => {
      hidePopup()
    }, 1500);

    return () => clearTimeout(timer);
  }, [popup.open]);

  return (
    <div className={`popUp_container ${popup.open? 'active' : ''}`}>
      <h4>{popup.title}</h4>
      <p>{popup.message}</p>
    </div>
  );
}
