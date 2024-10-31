
import { SelectedCompanyProvider } from "../../../context/SelectedCompanyContext";
import { Sidebar } from "../../../SideBar/Sidebar";
import { Branches } from "../../Branches/BranchesContent";
import styles from "./DashBoard.module.css";

export const DashBoard = () => {
  return (
//SelectedCompanyProvider envuelve la pagina para darle contexto y poder pasar informacion de una a otra parte
    <SelectedCompanyProvider> 
      <div className={styles.dashboardContainer}>
        <Sidebar />
        <Branches />
      </div>
    </SelectedCompanyProvider>
  );
};
