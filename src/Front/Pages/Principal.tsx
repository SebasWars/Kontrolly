import TickPlacementBars from "../components/principal/ChatPrincipal";
import { PrincipalHeader } from "../components/principal/PrincipalHeader";
import { TopItems } from "../components/principal/TopItems";

import '../styles/principal.css'

function Principal() {
  return (
    <div className="principal_main_container">
      <PrincipalHeader />
      <main>
        <div className="principal_rigth_side">
            <TickPlacementBars/>
            <TopItems/>
        </div>
        <div className="principal_left_side"></div>
      </main>
    </div>
  );
}

export default Principal;
