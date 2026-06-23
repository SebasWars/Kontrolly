import * as React from "react";
import { DropDownSelector } from "../UI/DropDownComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { removeInvoice } from "../../services/invoicesHTTP";
import { useFetchInvoices } from "../../Hooks/InvoicesHooks/useFetchInvoices";
import { useNavigate } from "react-router-dom";

interface PropsType {
  invoiceId: string;
  state: "sold" | "price";
}

export default function DropDown({ invoiceId, state }: PropsType) {
  const { getInvoicesType, getInvoicesValuesObj } = useFetchInvoices();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeWarehouse = async () => {
    await removeInvoice(invoiceId);
    if (state !== "price" && state !== "sold") {
      getInvoicesType("all");
    }
    getInvoicesType(state);
    getInvoicesValuesObj();
  };

  const updateWarehouse = () => {
    navigate(`${invoiceId}`);
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
