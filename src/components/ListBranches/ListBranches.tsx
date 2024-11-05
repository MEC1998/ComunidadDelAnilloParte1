import styles from "./ListBranches.module.css";
import BranchModal from "../BranchModal/BranchModal";
import { useState } from "react";
import { Branch } from "../../types/Branch";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";

interface ListBranchesProps {
  branches: Branch[];
  onUpdateBranch: (branchId: string, data: Partial<ISucursal>) => void;
}

export const ListBranches = ({ branches, onUpdateBranch }: ListBranchesProps) => {
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);

  const handleEdit = (branch: Branch) => {
    setEditingBranch(branch);
  };

  const handleEditClose = () => {
    setEditingBranch(null);
  };

  const handleEditConfirm = (data: Partial<ISucursal>) => {
    if (editingBranch?.id) {
      const updatedData: Partial<ISucursal> = {
        ...data,
        logo: data.logo || editingBranch.image as string
      };
      
      onUpdateBranch(editingBranch.id, updatedData);
    }
    setEditingBranch(null);
  };

  return (
    <div className={styles.branchesContainer}>
      {branches.map((branch, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.cardTitle} title={branch.name}>{branch.name}</div>
          <p className={styles.cardDescription}>Nombre de la empresa: {branch.companyName}</p>
          <span className={styles.cardTime}>{branch.openingTime} - {branch.closingTime}</span>
          {branch.image && (
            <img
              className={styles.cardImg}
              src={typeof branch.image === 'string' ? branch.image : URL.createObjectURL(branch.image)}
              alt={branch.name} 
            />
          )}
          <div className={styles.cardButtons}>
            <button className={styles.cardButton}>
              <span className="material-symbols-outlined">apartment</span>
            </button>
            <button 
              className={styles.cardButton}
              onClick={() => handleEdit(branch)}
            >
              <span className="material-symbols-outlined">edit</span>
            </button>
            <button className={styles.cardButton}>
              <span className="material-symbols-outlined">visibility</span>
            </button>
          </div>
        </div>
      ))}

      {editingBranch && (
        <BranchModal
          onClose={handleEditClose}
          onConfirm={handleEditConfirm}
          initialData={{
            nombre: editingBranch.name,
            horarioApertura: editingBranch.openingTime,
            horarioCierre: editingBranch.closingTime,
            paisId: "ARG",
            provincia: "",
            localidad: "",
            calle: editingBranch.street || "",
            numero: "",
            cp: "",
            piso: "",
            nroDpto: "",
            latitud: 0,
            longitud: 0,
            esCasaMatriz: false,
            eliminado: false,
            id: parseInt(editingBranch.id),
            empresa: {
              id: 0,
              nombre: "",
              razonSocial: "",
              cuit: 0,
              logo: null,
              sucursales: [],
              pais: {
                id: 0,
                nombre: ""
              }
            },
            domicilio: {
              id: 0,
              calle: "",
              numero: 0,
              cp: 0,
              piso: 0,
              nroDpto: 0,
              eliminado: false,
              localidad: {
                id: 0,
                nombre: "",
                provincia: {
                  id: 0,
                  nombre: "",
                  pais: {
                    id: 0,
                    nombre: ""
                  }
                }
              }
            },
            categorias: []
          }}
        />
      )}
    </div>
  );
};
