import { Outlet } from "react-router-dom";
import SideBar from "./components/sidebar/SideBar";

export function Layout() {
  return (
    <>
      <SideBar />
      <div className="main_container">
        <Outlet />
      </div>
    </>
  );
}
