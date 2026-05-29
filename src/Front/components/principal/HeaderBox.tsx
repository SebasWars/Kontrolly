interface PropTypes {
  title: string;
  value: string;
}

export function HeaderBox({ title, value }: PropTypes) {
  return (
    <div className="header_box">
      <p>{title}</p>
      <h3>{value}</h3>
    </div>
  );
}
