import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faChartLine,
  faEuroSign,
  faMoneyBillTrendUp,
} from "@fortawesome/free-solid-svg-icons";
import type { TypeAllow } from "../../Types/FinancesResumeTypes";

interface PropTypes {
  title: string;
  value: number;
  type: TypeAllow;
}

export function HeaderBox({ title, value, type }: PropTypes) {
  const icons = {
    sales: faEuroSign,
    orders: faBagShopping,
    income: faMoneyBillTrendUp,
    invesment: faChartLine,
  };
  const Icon = icons[type];
  return (
    <div className="header_box">
      <section>
        <p>{title}</p>
        <h3>{value}</h3>
      </section>
      <FontAwesomeIcon className="icon" icon={Icon} />
    </div>
  );
}
