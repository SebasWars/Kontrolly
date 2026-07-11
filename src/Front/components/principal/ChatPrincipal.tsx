import { BarChart } from "@mui/x-charts/BarChart";
import type {
  SalesRegisterMonth,
  SalesRegisterYear,
  Type,
} from "../../Types/FinancesResumeTypes";

const chartSetting = {
  yAxis: [
    {
      width: 50,
      max: 5000,
    },
  ],
  series: [{ dataKey: "total", valueFormatter, color: "#242645" }],
  margin: { left: 10 },
};

interface PropsType {
  salesRegister: SalesRegisterYear[] | SalesRegisterMonth[];
  salesFilterType: Type;
  salesFilterHandler: (value: Type) => void;
}

export default function TickPlacementBars({
  salesRegister,
  salesFilterType,
  salesFilterHandler,
}: PropsType) {
  return (
    <div className="chart_container">
      <div className="chart_header">
        <h3>Resumen de ventas</h3>

        <div className="button_group">
          <button onClick={() => salesFilterHandler("month")} className={`year ${salesFilterType === 'month' ? 'active' : ''}`}>
            Año
          </button>
          <button onClick={() => salesFilterHandler("day")}  className={`month ${salesFilterType === 'day' ? 'active' : ''}`}>
            Mes
          </button>
        </div>
      </div>

      <BarChart
        className="chart"
        dataset={salesRegister}
        xAxis={[{ dataKey: salesFilterType, position: "bottom" }]}
        {...chartSetting}
      />
    </div>
  );
}

export function valueFormatter(value: number | null) {
  return `€${value}`;
}
