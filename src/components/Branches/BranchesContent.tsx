// src/components/Branches/BranchesContent.tsx

import { ListBranches } from "../ui/ListBranches/ListBranches";
import styles from "./BranchesContent.module.css";
import { useSelectedCompany } from "../../context/SelectedCompanyContext";
import BranchModal from "../ui/BranchModal/BranchModal";
import { useState } from "react";
import { Branch } from "../../types/Branch";


export const Branches = () => {
  //estado para saber el nombre de la compania
  const { selectedCompany } = useSelectedCompany();

  //MODAL
  const [isModalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };
const handleConfirm = (data: Branch) => {
  console.log("Sucursal agregada:", data);
  setBranches((prevBranches) => [...prevBranches, data]); // Agrega la nueva sucursal
  handleCloseModal();
};

// Estado para las sucursales
  const [branches, setBranches] = useState<Branch[]>([]); 


  return (
    <div className={styles.maincontentContainer}>
      <div className={styles.contentTitleButtonBranches}>

        <div className={styles.titleContainer}>
          <h2 className={styles.title}>
            {selectedCompany ? `Sucursales de ${selectedCompany}` : "Seleccione una empresa"}
          </h2>
        </div>

        <div className={styles.contentButtonBranch}>
          <button className={styles.addButtonBranch}   onClick={handleOpenModal}>Agregar Sucursal</button>
        </div>
      </div>

      <ListBranches branches={branches} /> {/* Pasa las sucursales al componente ListBranches */}

      {/* Modal para agregar sucursal */}
      {isModalOpen && (
        <BranchModal onClose={handleCloseModal} onConfirm={handleConfirm} />
      )}
    </div>
  );
};
// con esta linea que se ubica dentro del h2 tittle 2 se verifica y se termina de actualiza el titulo dependiendo si seleccionamos una u otra empresa