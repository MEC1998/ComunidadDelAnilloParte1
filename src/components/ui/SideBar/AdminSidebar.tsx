import styles from "./AdminSidebar.module.css";

interface AdminSidebarProps {
  className?: string;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ className }) => {
  return (
    <div className={`${styles.sidebar} ${className}`}>
      <h2 className={styles.title}>Administración</h2>
      <div className={styles.buttonsContainer}>
        <button className={styles.button}>Categorías</button>
        <button className={styles.button}>Productos</button>
        <button className={styles.button}>Alérgenos</button>
      </div>
    </div>
  );
}; 