import { ScreenProductos } from "../ScreenProductos/ScreenProductos";
import { NavBar } from "../ui/NavBar/NavBar";
import { AdminSidebar } from "../ui/SideBar/AdminSidebar";
import styles from './DashboardProductos.module.css';

export const DashboardProductos = () => {
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <NavBar />
      </div>
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <AdminSidebar />
        </div>
        <div className={styles.main}>
          <ScreenProductos />
        </div>
      </div>
    </div>
  );
}; 