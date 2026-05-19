import * as React from "react";
import { DropDownSelector } from "../UI/DropDownComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

export default function DropDown() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeWarehouse = () => {
    console.log("eliminar");
  };

  const updateWarehouse = () => {
    console.log("actualizar");
  };


  return (
    <DropDownSelector
      content={<FontAwesomeIcon icon={faEllipsisVertical} />}
      anchorE={anchorEl}
      open={open}
      handleClick={handleClick}
      handleClose={handleClose}
      update={updateWarehouse}
      remove={removeWarehouse}
    />
  );
}
