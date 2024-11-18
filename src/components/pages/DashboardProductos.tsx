import { ScreenProductos } from "../ScreenProductos/ScreenProductos";
import { NavBar } from "../ui/NavBar/NavBar";
import { AdminSidebar } from "../ui/SideBar/AdminSidebar";
import styles from './DashboardProductos.module.css';
import { useParams } from "react-router-dom";

export const DashboardProductos = () => {
  const { idempresa, idsucursal } = useParams();

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
          <ScreenProductos idempresa={idempresa} idsucursal={idsucursal} />
        </div>
      </div>
    </div>
  );
}; 