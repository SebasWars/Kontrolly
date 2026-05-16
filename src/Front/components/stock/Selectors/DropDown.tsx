import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useStockActions } from "../../../Hooks/StockHooks/useStockActions";
import usePopUp from "../../../Hooks/UsePopup";

interface PropsTypes {
  openEdit: (state: "edit") => void;
}

export default function DropDown({ openEdit }: PropsTypes) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { deleteWarehouse } = useStockActions();
  const { showPopup} = usePopUp()
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
      type: 'update',
      title: 'Almacen eliminado',
      message: 'Almacen eliminado exitosamente'
    })
  };

  const updateWarehouse = () => {
    openEdit("edit");
    handleClose();
  };

  return (
    <div className="drop_down_menu">
      <button className="drop_down_button" onClick={handleClick}>
        More
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={updateWarehouse}>Editar</MenuItem>
        <MenuItem onClick={removeWarehouse}>Eliminar</MenuItem>
      </Menu>
    </div>
  );
}
