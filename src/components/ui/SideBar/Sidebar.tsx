import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import styles from "./Sidebar.module.css";
import { IEmpresa } from "../../../types/dtos/empresa/IEmpresa";
import { ICreateEmpresaDto } from "../../../types/dtos/empresa/ICreateEmpresaDto";
import { IUpdateEmpresaDto } from "../../../types/dtos/empresa/IUpdateEmpresaDto";
import { ModalCompanyForm } from "../modals/ModalCompanyForm/ModalCompanyForm";
import { fetchEmpresaById } from "../../../redux/slices/selectedCompanySlice";
import { EmpresaService } from "../../../services/dtos/EmpresaService";
import { CompanyInfoModal } from "../modals/CompanyInfoModal/CompanyInfoModal";

const empresaService = new EmpresaService();

interface SidebarProps {
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const selectedCompanyId = useAppSelector(state => state.selectedCompany.selectedCompanyId);
  const [companies, setCompanies] = useState<IEmpresa[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState<IUpdateEmpresaDto | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<IEmpresa | null>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);

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

  const handleEditCompany = async (company: IUpdateEmpresaDto) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/empresas/${company.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(company),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al editar la empresa: ${errorText}`);
      }

      const updatedCompany = await response.json();
      setCompanies((prevCompanies) =>
        prevCompanies.map((comp) => (comp.id === updatedCompany.id ? updatedCompany : comp))
      );
      setShowForm(false);
    } catch (error) {
      console.error('Error editing company:', error);
    }
  };

  const handleSelectCompany = (id: number) => {
    dispatch(fetchEmpresaById(id));
  };

  const handleEditButtonClick = (company: IEmpresa) => {
    setEditingCompany({
      id: company.id,
      nombre: company.nombre,
      razonSocial: company.razonSocial,
      cuit: company.cuit,
      logo: company.logo,
    });
    setShowForm(true);
  };

  const handleInfoButtonClick = (company: IEmpresa) => {
    setSelectedCompany(company);
    setShowInfoModal(true);
  };

  return (
    <div className={`${styles.sidebar} ${className}`}>
      <h2 className={styles.title2}>Empresas</h2>
      <button className={styles.addButton} onClick={() => setShowForm(true)}>Agregar Empresa</button>
      {showForm && (
        <ModalCompanyForm
          onAddCompany={handleAddCompany}
          onEditCompany={handleEditCompany}
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
            className={`${styles.sidebarItem} ${selectedCompanyId === company.id ? styles.active : ''}`}
            onClick={() => handleSelectCompany(company.id)}
          >
            <div className={styles.sidebarItemText}>
              {company.nombre}
              <span className={styles.sidebarItemTextDesc}>{company.razonSocial}</span>
            </div>
            <div className={styles.sidebarButtons}>
              <button 
                className={styles.sidebarItemButton}
                onClick={(e) => {
                  e.stopPropagation();
                  handleInfoButtonClick(company);
                }}
              >
                <span className="material-symbols-outlined sidebarButton">info</span>
              </button>
              <button 
                className={styles.sidebarItemButton}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditButtonClick(company);
                }}
              >
                <span className="material-symbols-outlined sidebarButton">edit</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <CompanyInfoModal
        show={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        company={selectedCompany}
      />
    </div>
  );
};
