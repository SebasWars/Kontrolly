import { HeaderBox } from "./HeaderBox";

const headerData = [
  {
    title: "Total Ventas",
    value: "€1234",
  },
  {
    title: "Total Ordenes",
    value: "124",
  },
  {
    title: "Total Ingresos",
    value: "€1234",
  },
  {
    title: "Total Inversion",
    value: "€1234",
  },
];

export function PrincipalHeader() {
  return (
    <div className="principal_header_contaier">
      {headerData.map((data) => {
        const { title, value} = data;
        return <HeaderBox  title={title} value={value}/>;
      })}
    </div>
  );
}
