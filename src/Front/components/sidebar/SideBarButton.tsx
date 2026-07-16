import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

type PropsType = {
  icon: IconProp;
  value: string;
  to: string;
  action?: () => void;
  preventNavigation?: boolean;
};

function SideBarButton({
  icon,
  value,
  to,
  action,
  preventNavigation,
}: PropsType) {
  const handleClick = (e: React.MouseEvent) => {
    if (preventNavigation) {
      e.preventDefault();
    }
    action?.();
  };

  return (
    <NavLink
      to={to}
      end={to === "/"}
      className={
        preventNavigation
          ? "menu_option"
          : ({ isActive }) => `menu_option ${isActive ? "active" : ""}`
      }
      onClick={handleClick}
    >
      <span>
        <FontAwesomeIcon icon={icon} />
      </span>
      <p>{value}</p>
    </NavLink>
  );
}
export default SideBarButton;
