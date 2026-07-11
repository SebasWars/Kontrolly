import SideBarButton from "./SideBarButton";
import {
  faStore,
  faCartShopping,
  faBoxesStacked,
  faFileInvoice,
  faUsersLine,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import "../../styles/sidebar.css";
import { useAuthorization } from "../../Hooks/UseAuthorization";

function SideBar() {
  const { logout } = useAuthorization();
  return (
    <div className="side_bar">
      <header>
        <h2>Kontrolly</h2>
      </header>
      <section className="menu_options">
        <div className="top">
          <SideBarButton to="/" icon={faStore} value="Principal" />
          <SideBarButton to="tienda" icon={faCartShopping} value="Tienda" />
          <SideBarButton
            to="inventario"
            icon={faBoxesStacked}
            value="Inventario"
          />
          <SideBarButton to="facturas" icon={faFileInvoice} value="Facturas" />
          <SideBarButton to="clientes" icon={faUsersLine} value="Clientes" />
        </div>

        <div className="bottom">
          <SideBarButton to="perfil" icon={faUser} value="Usuario" />
          <SideBarButton to="" icon={faRightFromBracket} value="Salir" action={logout} />
        </div>
      </section>
    </div>
  );
}

export default SideBar;
