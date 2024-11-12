import { BranchesContent } from "../../components/BranchesContent/BranchesContent";
import { SelectedCompanyProvider } from "../../context/SelectedCompanyContext";
import { Sidebar } from "../../SideBar/Sidebar";
import styles from "./DashBoard.module.css";

export const DashBoard = () => {
  return (
    <SelectedCompanyProvider>
      <div className={styles.dashboardContainer}>
        <Sidebar />
        <BranchesContent />
        {/* Aquí puedes agregar otros componentes o contenido */}
      </div>
    </SelectedCompanyProvider>
  );
};
