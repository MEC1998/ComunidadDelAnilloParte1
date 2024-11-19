import { ScreenCategorias } from "../ScreenCategorias/ScreenCategorias";
import { NavBar } from "../ui/NavBar/NavBar";
import { AdminSidebar } from "../ui/SideBar/AdminSidebar";
import styles from './DashboardCategorias.module.css';
import { useParams } from "react-router-dom";

export const DashboardCategorias = () => {
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
                    <ScreenCategorias _idempresa={idempresa} idsucursal={idsucursal} />
                </div>
            </div>
        </div>
    );
}; 