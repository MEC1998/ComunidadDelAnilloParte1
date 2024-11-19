import { useNavigate, useParams } from "react-router-dom";
import styles from "./AdminSidebar.module.css";

interface AdminSidebarProps {
  className?: string;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ className }) => {
  const navigate = useNavigate();
  const { idempresa, idsucursal } = useParams();

  const handleNavigation = (route: string) => {
    navigate(`/dashboard/${idempresa}/${idsucursal}/${route}`);
  };

  return (
    <div className={`${styles.sidebar} ${className}`}>
      <h2 className={styles.title}>Administración</h2>
      <div className={styles.buttonsContainer}>
        <button 
          className={styles.button} 
          onClick={() => handleNavigation('categorias')}
        >
          Categorías
        </button>
        <button 
          className={styles.button}
          onClick={() => handleNavigation('productos')}
        >
          Productos
        </button>
        <button 
          className={styles.button}
          onClick={() => handleNavigation('alergenos')}
        >
          Alérgenos
        </button>
      </div>
    </div>
  );
}; 