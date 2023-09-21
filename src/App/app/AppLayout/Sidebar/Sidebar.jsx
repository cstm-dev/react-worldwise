import styles from "./Sidebar.module.css";
import { Logo } from "utilities/_components.jsx";
import { AppNav, Footer } from "app/_components.jsx";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />

      <Footer />
    </div>
  );
}

export default Sidebar;
