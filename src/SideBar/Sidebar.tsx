// src/Sidebar/Sidebar.tsx

import { useState } from "react";
import styles from "./Sidebar.module.css";
import { useSelectedCompany } from "../context/SelectedCompanyContext";
import { IEmpresa } from "../types/dtos/empresa/IEmpresa";
import { ModalCompanyForm } from "../components/ModalCompanyForm/ModalCompanyForm";


export const Sidebar = () => {

  // ESTADOS DE COMPONENTES
  const [companies, setCompanies] = useState<IEmpresa[]>(() => {
    //para ver si ya tiene datos en el local stotage
    try {
      const savedCompanies = localStorage.getItem('companies');
      return savedCompanies ? JSON.parse(savedCompanies) : [];
    } catch (error) {
      console.error('Error loading companies from localStorage:', error);
      return [];
    }
  });

  const [showForm, setShowForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState<IEmpresa | null>(null);

  //tomamos el nombre de la empresa
  const { setSelectedCompany } = useSelectedCompany();

  //FUNCIONES
  const handleAddCompany = (company: IEmpresa) => {
    try {
      const updatedCompanies = [...companies, company];
      setCompanies(updatedCompanies);
      localStorage.setItem('companies', JSON.stringify(updatedCompanies));
      setShowForm(false);
      console.log('Companies saved:', updatedCompanies);
    } catch (error) {
      console.error('Error saving companies to localStorage:', error);
    }
  };

  const handleEditCompany = (company: IEmpresa) => {
    setEditingCompany(company);
    setShowForm(true);
  };

  const handleUpdateCompany = (updatedCompany: IEmpresa) => {
    try {
      const updatedCompanies = companies.map(company => 
        company.nombre === editingCompany?.nombre ? updatedCompany : company
      );
      setCompanies(updatedCompanies);
      localStorage.setItem('companies', JSON.stringify(updatedCompanies));
      setShowForm(false);
      setEditingCompany(null);
    } catch (error) {
      console.error('Error updating company:', error);
    }
  };

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.title2}>Empresas</h2>
      <button className={styles.addButton} onClick={() => setShowForm(true)}>Agregar Empresa</button>
      {showForm && (
        <ModalCompanyForm
          onAddCompany={editingCompany ? handleUpdateCompany : handleAddCompany}
          onClose={() => {
            setShowForm(false);
            setEditingCompany(null);
          }}
          editingCompany={editingCompany}
        />
      )}

      <ul className={styles.sidebarItems}>
        {companies.map((company, index) => (
          <li
            key={index}
            className={styles.sidebarItem}
            onClick={() => setSelectedCompany(company.nombre)}
          >
            <div className={styles.sidebarItemText}>
              {company.nombre}
              <span className={styles.sidebarItemTextDesc}>{company.razonSocial}</span>
            </div>
            <div className={styles.sidebarButtons}>
              <button className={styles.sidebarItemButton}>
                <span className="material-symbols-outlined sidebarButton">info</span>
              </button>
              <button 
                className={styles.sidebarItemButton}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditCompany(company);
                }}
              >
                <span className="material-symbols-outlined sidebarButton">edit</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
      
    </div>
  );
};
