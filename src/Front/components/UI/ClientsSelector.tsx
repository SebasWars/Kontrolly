import useWarehouse from "../../Hooks/UseWarehouse";

type PropsTypes = {
  client: string;
  handleSelector: (value: string) => void;
};

function ClientsSelector({ client, handleSelector }: PropsTypes) {
    /* MODIFY FOR CLIENTS LIST */
  const { warehouses } = useWarehouse();
  return (
    <>
      <select
        value={client}
        onChange={(e) => handleSelector(e.target.value)}
      >
        <option value="">-- Selecciona un alamcen --</option>
        {warehouses.map((stock) => {
          const { warehouse: warehouseName, id } = stock;
          return (
            <option key={id} value={id}>
              {warehouseName}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default ClientsSelector;
