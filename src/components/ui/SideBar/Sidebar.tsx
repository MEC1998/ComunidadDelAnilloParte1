import { useState, useEffect } from "react";
import { useAppDispatch } from '../../../hooks/hooks';
import styles from "./Sidebar.module.css";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { ICreateEmpresaDto } from "../../../types/dtos/empresa/ICreateEmpresaDto";
import { ModalCompanyForm } from "../modals/ModalCompanyForm/ModalCompanyForm";
import { fetchEmpresaById } from "../../../redux/slices/selectedCompanySlice";
import { EmpresaService } from "../../../services/dtos/EmpresaService";

const empresaService = new EmpresaService();

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const [companies, setCompanies] = useState<IEmpresa[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState<ICreateEmpresaDto | null>(null);

  const fetchCompanies = async () => {
    try {
      const data = await empresaService.getAllEmpresas();
      setCompanies(data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleAddCompany = async (company: ICreateEmpresaDto) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/empresas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(company),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al agregar la empresa: ${errorText}`);
      }

      const newCompany = await response.json();
      setCompanies((prevCompanies) => [...prevCompanies, newCompany]);
      setShowForm(false);
    } catch (error) {
      console.error('Error adding company:', error);
    }
  };

  const handleEditCompany = (company: IEmpresa) => {
    setEditingCompany(company);
    setShowForm(true);
  };

  const handleSelectCompany = (id: number) => {
    dispatch(fetchEmpresaById(id));
  };

  return (
    <div className={`${styles.sidebar} ${className}`}>
      <h2 className={styles.title2}>Empresas</h2>
      <button className={styles.addButton} onClick={() => setShowForm(true)}>Agregar Empresa</button>
      {showForm && (
        <ModalCompanyForm
          onAddCompany={handleAddCompany}
          onClose={() => {
            setShowForm(false);
            setEditingCompany(null);
          }}
          editingCompany={editingCompany}
        />
      )}

      <ul className={styles.sidebarItems}>
        {companies.map((company) => (
          <li
            key={company.id}
            className={styles.sidebarItem}
            onClick={() => handleSelectCompany(company.id)}
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
