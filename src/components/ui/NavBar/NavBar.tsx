import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchEmpresaById } from "../../../redux/slices/selectedCompanySlice";
import styles from './NavBar.module.css';
import BranchModal from "../../BranchModal/BranchModal";
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal";
import { SucursalService } from "../../../services/dtos/SucursalService";
import { useQueryClient } from "@tanstack/react-query";

// Componente NavBar
export const NavBar = () => {
  const dispatch = useAppDispatch();
  const selectedCompany = useAppSelector((state) => state.selectedCompany.company);
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();
  const sucursalService = new SucursalService();

  // Simulación de obtener el ID de la empresa (puede venir de props, contexto, etc.)
  const empresaId = 1;

  // Obtener los datos de la empresa al montar el componente
  React.useEffect(() => {
    dispatch(fetchEmpresaById(empresaId));
  }, [dispatch, empresaId]);

  const handleAddBranch = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalConfirm = async (data: Partial<ISucursal>) => {
    if (selectedCompany) {
      try {
        const sucursalData: Partial<ISucursal> = {
          ...data,
          empresa: {
            id: selectedCompany.id,
            nombre: selectedCompany.nombre,
            razonSocial: selectedCompany.razonSocial,
            cuit: selectedCompany.cuit,
            logo: selectedCompany.logo,
            sucursales: selectedCompany.sucursales,
            pais: selectedCompany.pais
          },
          eliminado: false
        };

        console.log('Datos a enviar:', sucursalData);
        const response = await sucursalService.createSucursal(sucursalData);
        console.log('Respuesta:', response);
        
        queryClient.invalidateQueries({ queryKey: ['sucursales', selectedCompany.id] });
        setShowModal(false);
      } catch (error) {
        console.error('Error al crear la sucursal:', error);
      }
    }
  };

  return (
    <>
      <div className={styles.contentTitleButtonBranches}>
        <h2 className={styles.titleContainer}>
          {selectedCompany ? `Sucursales de ${selectedCompany.nombre}` : "Seleccione una empresa"}
        </h2>
        <button 
          className={styles.addButtonBranch} 
          onClick={handleAddBranch}
          disabled={!selectedCompany}
        >
          Agregar Sucursal
        </button>
      </div>

      {showModal && (
        <BranchModal
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
        />
      )}
    </>
  );
};