import { useQuery } from "@tanstack/react-query";
import styles from "./BranchesContent.module.css";
import { useAppSelector } from "../../hooks/redux";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import { SucursalService } from "../../services/dtos/SucursalService";
import { Card } from "../Card/Card";

const sucursalService = new SucursalService();

export const BranchesContent = () => {
  const selectedCompany = useAppSelector((state) => state.selectedCompany.company);

  const { data: branches = [] } = useQuery({
    queryKey: ['sucursales', selectedCompany?.id],
    queryFn: () => selectedCompany ? sucursalService.getSucursalesByEmpresaId(selectedCompany.id) : [],
    enabled: !!selectedCompany
  });

  return (
    <div className={styles.branchesContainer}>
      {branches.map((branch: ISucursal) => (
        <Card
          key={branch.id}
          branchName={branch.nombre}
          companyName={branch.empresa.nombre}
          openingHours={`${branch.horarioApertura} - ${branch.horarioCierre}`}
          image={branch.logo ?? null}
          branchData={branch}
        />
      ))}
    </div>
  );
};