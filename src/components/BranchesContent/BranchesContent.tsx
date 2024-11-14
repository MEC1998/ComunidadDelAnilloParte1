import styles from "./BranchesContent.module.css";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../hooks/redux";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import { SucursalService } from "../../services/dtos/SucursalService";
import { Card } from "../Card/Card";

const sucursalService = new SucursalService("http://190.221.207.224:8090/sucursales");

export const BranchesContent = () => {
  const [branches, setBranches] = useState<ISucursal[]>([]);
  const selectedCompany = useAppSelector((state) => state.selectedCompany.company);

  useEffect(() => {
    console.log("Empresa seleccionada:", selectedCompany);
    const fetchBranches = async () => {
      if (selectedCompany) {
        try {
          const sucursales = await sucursalService.getSucursalesByEmpresaId(selectedCompany.id);
          setBranches(sucursales);
        } catch (error) {
          console.error("Error al obtener sucursales:", error);
        }
      }
    };

    fetchBranches();
  }, [selectedCompany]);

  return (
    <div className={styles.branchesContainer}>
      {branches.map((branch) => (
        <Card
          key={branch.id}
          branchName={branch.nombre}
          companyName={branch.empresa.nombre}
          openingHours={`${branch.horarioApertura} - ${branch.horarioCierre}`}
          image={branch.logo ?? null}
        />
      ))}
    </div>
  );
};
