// src/Sidebar/Sidebar.tsx

import { useState } from "react";
import styles from "./Sidebar.module.css";
import { CompanyForm } from "../components/ui/ModalCompanyForm/CompanyForm";
import { useSelectedCompany } from "../context/SelectedCompanyContext";

interface Company {
  name: string;
  reason: string;
  cuit: string;
  image: File | null;
}

export const Sidebar = () => {

  // ESTADOS DE COMPONENTES
  const [companies, setCompanies] = useState<Company[]>([]);
  const [showForm, setShowForm] = useState(false);

  //tomamos el nombre de la empresa
  const { setSelectedCompany } = useSelectedCompany();

  //FUNCIONES
  const handleAddCompany = (company: Company) => {
    setCompanies([...companies, company]);
    setShowForm(false);
  };

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title2}>Empresas</h2>
      <button className={styles.addButton} onClick={() => setShowForm(true)}>Agregar Empresa</button>
      {showForm && <CompanyForm onAddCompany={handleAddCompany} onClose={() => setShowForm(false)} />}
      <ul className={styles.sidebarItems}>
        {companies.map((company, index) => (
          <li
            key={index}
            className={styles.sidebarItem}
            onClick={() => setSelectedCompany(company.name)} // Actualiza el título en branches 
          >
            <div className={styles.sidebarItemText}>
              {company.name}
              <span className={styles.sidebarItemTextDesc}>{company.reason}</span>
            </div>
            <div>
              <span className="material-symbols-outlined sidebarButton">info</span>
              <span className="material-symbols-outlined sidebarButton">edit</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
