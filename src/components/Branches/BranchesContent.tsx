import styles from "./BranchesContent.module.css";
import { useSelectedCompany } from "../../context/SelectedCompanyContext";
import { useState } from "react";
import { Branch } from "../../types/Branch";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import { ListBranches } from "../ListBranches/ListBranches";
import BranchModal from "../BranchModal/BranchModal";


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
const handleConfirm = (data: Partial<ISucursal>) => {
  const newBranch: Branch = {
    id: data.id?.toString() || Date.now().toString(),
    name: data.nombre || '',
    openingTime: data.horarioApertura || '',
    closingTime: data.horarioCierre || '',
    companyName: selectedCompany || '',
    image: data.logo || null,
    street: data.domicilio?.calle
  };
  
  setBranches((prevBranches) => [...prevBranches, newBranch]);
  handleCloseModal();
};

// Estado para las sucursales
  const [branches, setBranches] = useState<Branch[]>([]); 

  const handleUpdateBranch = (branchId: string, data: Partial<ISucursal>) => {
    setBranches(prevBranches => 
      prevBranches.map(branch => 
        branch.id === branchId 
          ? {
              ...branch,
              name: data.nombre || branch.name,
              openingTime: data.horarioApertura || branch.openingTime,
              closingTime: data.horarioCierre || branch.closingTime,
              image: data.logo || branch.image,
              street: data.domicilio?.calle || branch.street
            }
          : branch
      )
    );
  };

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

      <ListBranches 
        branches={branches} 
        onUpdateBranch={handleUpdateBranch}
      /> {/* Pasa las sucursales al componente ListBranches */}

      {/* Modal para agregar sucursal */}
      {isModalOpen && (
        <BranchModal onClose={handleCloseModal} onConfirm={handleConfirm} />
      )}
    </div>
  );
};
// con esta linea que se ubica dentro del h2 tittle 2 se verifica y se termina de actualiza el titulo dependiendo si seleccionamos una u otra empresa