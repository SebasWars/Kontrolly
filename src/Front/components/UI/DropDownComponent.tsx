import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface PropsType {
  content: React.ReactNode,
  anchorE: null | HTMLElement;
  open: boolean;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleClose: () => void;
  update: () => void;
  remove: () => void;
}

export function DropDownSelector({
  content,
  anchorE,
  open,
  handleClick,
  handleClose,
  update,
  remove,
}: PropsType) {
  return (
    <div className="drop_down_menu">
      <button className="drop_down_button" onClick={handleClick}>
        {content}
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorE}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={update}>Editar</MenuItem>
        <MenuItem onClick={remove}>Eliminar</MenuItem>
      </Menu>
    </div>
  );
}
