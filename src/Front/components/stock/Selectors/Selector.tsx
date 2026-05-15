import useWarehouse from "../../../Hooks/UseWarehouse";

type PropsTypes = {
  warehouse: string;
  handleSelector: (value: string) => void;
};

function Selector({ warehouse, handleSelector }: PropsTypes) {
  const { warehouses } = useWarehouse();
  return (
    <>
      <select
        value={warehouse}
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

export default Selector;
