import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TickPlacementBars from "../components/principal/ChatPrincipal";
import { LastSales } from "../components/principal/LastSales";
import { PrincipalHeader } from "../components/principal/PrincipalHeader";

import "../styles/principal.css";
import { faArrowDownShortWide } from "@fortawesome/free-solid-svg-icons";
import { UseFinances } from "../Hooks/PrincipalHooks/useFinances";
import { UseSalesRegister } from "../Hooks/PrincipalHooks/UseSalesRegister";

function Principal() {
  const { finances } = UseFinances();
  const { salesRegister, salesFilterHandler, salesFilterType } =
    UseSalesRegister();

  return (
    <div className="principal_main_container">
      <main>
        <div className="principal_rigth_side">
          <PrincipalHeader finances={finances.finances} />
          <TickPlacementBars
            salesRegister={salesRegister}
            salesFilterType={salesFilterType}
            salesFilterHandler={salesFilterHandler}
          />
        </div>
        <div className="principal_left_side">
          <div className="last_sales_header">
            <h4>Ultimas Ventas</h4>
            <button>
              <FontAwesomeIcon icon={faArrowDownShortWide} />
            </button>
          </div>
          <LastSales lastOrdes={finances.lastOrdes} />
        </div>
      </main>
    </div>
  );
}

export default Principal;
