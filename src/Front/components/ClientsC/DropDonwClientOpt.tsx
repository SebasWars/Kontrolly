import * as React from "react";
import { DropDownSelector } from "../UI/DropDownComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useFetchClients } from "../../Hooks/ClientsHooks/useFetchClients";

type PropTypes = {
  cliendID: string;
};

export default function DropDown({ cliendID }: PropTypes) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { deleteClient } = useFetchClients();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeWarehouse = () => {
    deleteClient(cliendID);
    setAnchorEl(null);
  };

  const updateWarehouse = () => {
    console.log("update");
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
