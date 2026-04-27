import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useStockActions } from "../../Hooks/useStockActions";

export default function DropDown() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { deleteWarehouse } = useStockActions();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    deleteWarehouse();
  };

  return (
    <div className="drop_down_menu">
      <button className="drop_down_button" onClick={handleClick}>More</button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Eliminar</MenuItem>
        <MenuItem onClick={handleClose}>Editar</MenuItem>
      </Menu>
    </div>
  );
}
