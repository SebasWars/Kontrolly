import useWarehouse from "../../Hooks/UseWarehouse";
import "../../styles/UIComponents.css";

interface Props {
  title: string;
  message: String;
}
export function PopUp({ title, message }: Props) {
  const { dispatch, modalState } = useWarehouse();
  if (modalState) {
    setTimeout(() => {
      dispatch({ type: "TOGGLE_MODAL", payload: false });
    }, 3000);
  }
  return (
    <div className={`popUp_container ${modalState ? "active" : ""}`}>
      <h4>{title}</h4>
      <p>{message}</p>
    </div>
  );
}
