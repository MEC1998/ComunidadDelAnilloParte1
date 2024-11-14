import styles from './AppRouter.module.css';
import { NavBar } from "../components/ui/NavBar/NavBar"; 
import { Sidebar } from "../components/ui/SideBar/Sidebar";
import { BranchesContent } from "../components/BranchesContent/BranchesContent";

export const AppRouter = () => {
  return (
    <div className={styles.container}>
      <Sidebar className={styles.sidebar} />
      <div className={styles.content}>
        <NavBar />
        <BranchesContent />
      </div>
    </div>
  );
};