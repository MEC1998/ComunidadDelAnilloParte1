import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchEmpresaById } from "../../../redux/slices/selectedCompanySlice";
import styles from './NavBar.module.css';

// Componente NavBar
export const NavBar = () => {
  const dispatch = useAppDispatch();
  const selectedCompany = useAppSelector((state) => state.selectedCompany.company);

  // Simulación de obtener el ID de la empresa (puede venir de props, contexto, etc.)
  const empresaId = 1;

  // Obtener los datos de la empresa al montar el componente
  React.useEffect(() => {
    dispatch(fetchEmpresaById(empresaId));
  }, [dispatch, empresaId]);

  const handleAddBranch = () => {
    console.log("Agregar sucursal");
  };

  return (
    <div className={styles.contentTitleButtonBranches}>
      <h2 className={styles.titleContainer}>
        {selectedCompany ? `Sucursales de ${selectedCompany.nombre}` : "Seleccione una empresa"}
      </h2>
      <button className={styles.addButtonBranch} onClick={handleAddBranch}>
        Agregar Sucursal
      </button>
    </div>
  );
};