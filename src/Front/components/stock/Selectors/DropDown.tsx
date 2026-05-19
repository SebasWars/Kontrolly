import * as React from "react";
import { useStockActions } from "../../../Hooks/StockHooks/useStockActions";
import usePopUp from "../../../Hooks/UsePopup";
import { DropDownSelector } from "../../UI/DropDownComponent";

interface PropsTypes {
  openEdit: (state: "edit") => void;
}

export default function DropDown({ openEdit }: PropsTypes) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { deleteWarehouse } = useStockActions();
  const { showPopup } = usePopUp();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeWarehouse = () => {
    deleteWarehouse();
    handleClose();
    showPopup({
      open: true,
      type: "update",
      title: "Almacen eliminado",
      message: "Almacen eliminado exitosamente",
    });
  };

  const updateWarehouse = () => {
    openEdit("edit");
    handleClose();
  };

  return (
    <DropDownSelector
      content="more"
      anchorE={anchorEl}
      open={open}
      handleClick={handleClick}
      handleClose={handleClose}
      update={updateWarehouse}
      remove={removeWarehouse}
    />
  );
}
