import * as React from "react";
import { DropDownSelector } from "../UI/DropDownComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useFetchClients } from "../../Hooks/ClientsHooks/useFetchClients";
import type { Client } from "../../context/RecuderTypes/ClientsReduce";

type PropTypes = {
  client: Client;
  handleEditClient: (client: Client | null) => void;
  toggleForm: (val: boolean) => void;
};

export default function DropDown({ client, handleEditClient, toggleForm}: PropTypes) {
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
    deleteClient(client.id);
    setAnchorEl(null);
  };

  const updateWarehouse = () => {
    handleEditClient(client)
    toggleForm(true)
    setAnchorEl(null);
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
