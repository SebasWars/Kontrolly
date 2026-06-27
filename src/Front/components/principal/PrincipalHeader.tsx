import type { Finances } from "../../Types/FinancesResumeTypes";
import { HeaderBox } from "./HeaderBox";

interface PropType {
  finances: Finances[];
}

export function PrincipalHeader({ finances }: PropType) {
  return (
    <div className="principal_header_contaier">
      {finances.map((data, index) => {
        const {title, type, value} = data
        return <HeaderBox key={index} title={title} value={value} type={type} />;
      })}
    </div>
  );
}
