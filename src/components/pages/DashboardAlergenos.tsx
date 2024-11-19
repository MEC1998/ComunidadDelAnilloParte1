import { ScreenAlergenos } from "../ScreenAlergenos/ScreenAlergenos";
import { NavBar } from "../ui/NavBar/NavBar";
import { AdminSidebar } from "../ui/SideBar/AdminSidebar";
import styles from './DashboardAlergenos.module.css';

export const DashboardAlergenos = () => {

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
          <ScreenAlergenos />
        </div>
      </div>
    </div>
  );
}; 