import { useState, useEffect } from "react";
import styles from "./Sidebar.module.css";
import { useSelectedCompany } from "../context/SelectedCompanyContext";
import { IEmpresa } from "../types/dtos/empresa/IEmpresa";
import { ModalCompanyForm } from "../components/ModalCompanyForm/ModalCompanyForm";

export const Sidebar = () => {

  // ESTADOS DE COMPONENTES
  const [companies, setCompanies] = useState<IEmpresa[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState<IEmpresa | null>(null);

  //tomamos el nombre de la empresa
  const { setSelectedCompany } = useSelectedCompany();

  //FUNCIONES
  const fetchCompanies = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/empresas`);
      if (!response.ok) {
        throw new Error('Error al obtener las empresas');
      }
      const data: IEmpresa[] = await response.json();
      setCompanies(data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleAddCompany = async (company: IEmpresa) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/empresas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(company),
      });

      if (!response.ok) {
        throw new Error('Error al agregar la empresa');
      }

      const newCompany = await response.json();
      const updatedCompanies = [...companies, newCompany];
      setCompanies(updatedCompanies);
      setShowForm(false);
      console.log('Companies updated:', updatedCompanies);
    } catch (error) {
      console.error('Error adding company:', error);
    }
  };

  const handleEditCompany = (company: IEmpresa) => {
    setEditingCompany(company);
    setShowForm(true);
  };

  const handleUpdateCompany = (updatedCompany: IEmpresa) => {
    const updatedCompanies = companies.map(company => 
      company.nombre === editingCompany?.nombre ? updatedCompany : company
    );
    setCompanies(updatedCompanies);
    setShowForm(false);
    setEditingCompany(null);
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
