import { ScreenCategorias } from "../ScreenCategorias/ScreenCategorias";
import { NavBar } from "../ui/NavBar/NavBar";
import { AdminSidebar } from "../ui/SideBar/AdminSidebar";
import styles from './DashboardCategorias.module.css';
import { useParams } from "react-router-dom";
import { useState } from "react";

export const DashboardCategorias = () => {
    const { idempresa, idsucursal } = useParams();
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
                    <ScreenCategorias 
                        _idempresa={idempresa} 
                        idsucursal={idsucursal}
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                    />
                </div>
            </div>
        </div>
    );
}; 