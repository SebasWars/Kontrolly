import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

type PropsType = {
  icon: IconProp;
  value: string;
  to: string;
};

function SideBarButton({ icon, value, to }: PropsType) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) => `menu_option ${isActive ? "active" : ""}`}
    >
      <span>
        <FontAwesomeIcon icon={icon} />
      </span>
      <p>{value}</p>
    </NavLink>
  );
}
export default SideBarButton;
