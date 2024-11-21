import { useState } from "react";
import { ScreenAlergenos } from "../ScreenAlergenos/ScreenAlergenos";
import { NavBar } from "../ui/NavBar/NavBar";
import { AdminSidebar } from "../ui/SideBar/AdminSidebar";
import styles from './DashboardAlergenos.module.css';

export const DashboardAlergenos = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <NavBar onAddClick={() => setOpenModal(true)} />
      </div>
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <AdminSidebar />
        </div>
        <div className={styles.main}>
          <ScreenAlergenos 
            openModal={openModal}
            setOpenModal={setOpenModal}
          />
        </div>
      </div>
    </div>
  );
}; 