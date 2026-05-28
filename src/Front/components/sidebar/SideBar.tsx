import SideBarButton from "./SideBarButton";
import {
  faStore,
  faCartShopping,
  faBoxesStacked,
  faFileInvoice,
  faUsersLine,
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
        <SideBarButton to='tienda' icon={faCartShopping} value="Tienda" />
        <SideBarButton to='inventario' icon={faBoxesStacked} value="Inventario" />
        <SideBarButton to='facturas' icon={faFileInvoice} value="Facturas" />
        <SideBarButton to='analiticas' icon={faUsersLine} value="Clientes" />
      </section>
    </div>
  );
}

export default SideBar;
