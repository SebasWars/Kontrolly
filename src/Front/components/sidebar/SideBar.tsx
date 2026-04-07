import SideBarButton from "./SideBarButton";
import {
  faStore,
  faCartShopping,
  faBoxesStacked,
  faBuildingColumns,
  faFileInvoice,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/sidebar.css";


function SideBar() {
  return (
    <div className="side_bar">
      <header>
        <h2>Titulo</h2>
      </header>
      <section className="menu_options">
        <SideBarButton to='/' icon={faStore} value="Principal" />
        <SideBarButton to='ventas' icon={faCartShopping} value="Pedidos" />
        <SideBarButton to='inventario' icon={faBoxesStacked} value="Inventario" />
        <SideBarButton to='finanzas' icon={faBuildingColumns} value="Finanzas" />
        <SideBarButton to='facturas' icon={faFileInvoice} value="Facturas" />
        <SideBarButton to='analiticas' icon={faChartLine} value="Analiticas" />
      </section>
    </div>
  );
}

export default SideBar;
