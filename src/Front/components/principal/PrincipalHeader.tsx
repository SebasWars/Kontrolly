import { HeaderBox } from "./HeaderBox";
const headerData = [
  {
    title: "Total Ventas",
    type: "sales",
    value: "€ 1234",
  },
  {
    title: "Total Ordenes",
    type: "orders",
    value: "124",
  },
  {
    title: "Total Ingresos",
    type: "income",
    value: "€ 1234",
  },
  {
    title: "Total Inversion",
    type: "invesment",
    value: "€ 1234",
  },
];

export function PrincipalHeader() {
  return (
    <div className="principal_header_contaier">
      {headerData.map((data) => {
        const { title, value, type } = data;
        return <HeaderBox title={title} value={value} type={type}/>;
      })}
    </div>
  );
}
