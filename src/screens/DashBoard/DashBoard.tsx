
import { BranchesContent } from "../../components/Branches/BranchesContent";
import { SelectedCompanyProvider } from "../../context/SelectedCompanyContext";
import { Sidebar } from "../../SideBar/Sidebar";
import styles from "./DashBoard.module.css";

export const DashBoard = () => {
  return (

    
//SelectedCompanyProvider envuelve la pagina para darle contexto y poder pasar informacion de una a otra parte
    <SelectedCompanyProvider> 
      <div className={styles.dashboardContainer}>
        <Sidebar />
        <BranchesContent />
      </div>
    </SelectedCompanyProvider>
  );
};
