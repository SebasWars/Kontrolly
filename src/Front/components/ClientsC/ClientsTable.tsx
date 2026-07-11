import { useEffect } from "react";
import { useClients } from "../../Hooks/UseClients";
import { ClienRowList } from "./ClientRowList";
import { useFetchClients } from "../../Hooks/ClientsHooks/useFetchClients";
import type { Client } from "../../context/RecuderTypes/ClientsReduce";
import { useSort } from "../../Hooks/UseSort";

interface PropTypes {
  handleEditClient: (clietn: Client | null) => void;
  toggleForm: (val: boolean) => void;
}

export function TableClients({ handleEditClient, toggleForm }: PropTypes) {
  const { clientList, setClientList } = useClients();
  const { clientsList } = useFetchClients();
  const { sortedItems, handleSorted } = useSort(clientList);

  useEffect(() => {
    clientsList();
    return () => {
      setClientList([]);
    };
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th onClick={() => handleSorted('companyName')}>Compañia</th>
          <th onClick={() => handleSorted('name')}>Cliente</th>
          <th onClick={() => handleSorted('emailAddress')}>Correo Electronico</th>
          <th onClick={() => handleSorted('phoneNumber')}>Nº Movil</th>
          <th onClick={() => handleSorted('address')}>Dirrección</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {sortedItems?.map((client, index) => (
          <ClienRowList
            key={index}
            client={client}
            handleEditClient={handleEditClient}
            toggleForm={toggleForm}
          />
        ))}
      </tbody>
    </table>
  );
}
