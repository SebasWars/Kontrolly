import type { Client } from "../../context/RecuderTypes/ClientsReduce";
import DropDown from "./DropDonwClientOpt";

interface PropTypes {
  client: Client;
  handleEditClient: (clietn: Client | null) => void;
  toggleForm: (val: boolean) => void;
}

export function ClienRowList({
  client,
  handleEditClient,
  toggleForm,
}: PropTypes) {
  return (
    <tr>
      <td>{client.companyName}</td>
      <td>{client.name}</td>
      <td>{client.emailAddress}</td>
      <td>{client.phoneNumber}</td>
      <td>{client.address}</td>
      <td>
        <DropDown
          client={client}
          handleEditClient={handleEditClient}
          toggleForm={toggleForm}
        />
      </td>
    </tr>
  );
}
