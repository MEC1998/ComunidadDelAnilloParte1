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
    if (selectedCompany && data.calle && data.numero && data.cp && data.localidad && data.provincia) {
      try {
        const sucursalData = {
          nombre: `Sucursal ${data.calle} ${data.numero}`,
          horarioApertura: "09:00",
          horarioCierre: "18:00",
          esCasaMatriz: false,
          latitud: 0,
          longitud: 0,
          domicilio: {
            id: 0,
            calle: data.calle,
            numero: Number(data.numero),
            cp: Number(data.cp),
            piso: data.piso ? Number(data.piso) : 0,
            nroDpto: data.nroDpto ? Number(data.nroDpto) : 0,
            idLocalidad: Number(data.localidad),
            localidad: {
              id: Number(data.localidad),
              nombre: data.provincia,
              idProvincia: Number(data.provincia),
              provincia: {
                id: Number(data.provincia),
                nombre: data.provincia,
                pais: {
                  id: 1,
                  nombre: "Argentina"
                }
              }
            }
          },
          idEmpresa: selectedCompany.id,
          logo: undefined
        };

        await sucursalService.createSucursal(sucursalData);
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