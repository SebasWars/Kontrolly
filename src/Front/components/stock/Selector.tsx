import { Stocks } from "../../../MOCK/StocksMock";

type PropsTypes = {
  warehouse: string;
  handleSelector: (value: string) => void;
};

function Selector({ warehouse, handleSelector }: PropsTypes) {
  return (
    <>
      <select
        value={warehouse}
        onChange={(e) => handleSelector(e.target.value)}
      >
        <option value="">-- Selecciona un alamcen --</option>
        {Stocks.map((stock) => {
          const { warehouse, id } = stock;
          return (
            <option key={id} value={id}>
              {warehouse}
            </option>
          );
        })}
      </select>
    </>
  );
}

export default Selector
