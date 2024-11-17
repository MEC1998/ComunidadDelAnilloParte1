import styles from './DashboardHome.module.css';
import { Sidebar } from "../ui/SideBar/Sidebar";
import { BranchesContent } from "../BranchesContent/BranchesContent";
import { Header } from '../ui/Header/Header';

export const DashboardHome = () => {
  return (
    <div className={styles.container}>
      <Sidebar className={styles.sidebar} />
      <div className={styles.content}>
        <Header />
        <BranchesContent />
      </div>
    </div>
  );
};