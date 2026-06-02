import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TickPlacementBars from "../components/principal/ChatPrincipal";
import { LastSales } from "../components/principal/LastSales";
import { PrincipalHeader } from "../components/principal/PrincipalHeader";

import "../styles/principal.css";
import { faArrowDownShortWide } from "@fortawesome/free-solid-svg-icons";

function Principal() {
  return (
    <div className="principal_main_container">
      <main>
        <div className="principal_rigth_side">
          <PrincipalHeader />
          <TickPlacementBars />
        </div>
        <div className="principal_left_side">
          <div className="last_sales_header">
            <h4>Ultimas Ventas</h4>
            <button>
              <FontAwesomeIcon icon={faArrowDownShortWide} />
            </button>
          </div>
          <LastSales />
        </div>
      </main>
    </div>
  );
}

export default Principal;
