import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";

import { AlergenosService } from "../../services/dtos/AlergenosService";
import { IAlergenos } from "../../types/dtos/alergenos/IAlergenos";
import { TableGeneric } from "../ui/TableGeneric/TableGeneric";
import { useAppDispatch } from "../../hooks/redux";
import { setDataTable } from "../../redux/slices/TablaReducer";
import Swal from "sweetalert2";

import { Button, CircularProgress } from "@mui/material";
import { ModalAlergeno } from "../ui/modals/ModalAlergenos/ModalAlergenos";

// Definición de la URL base de la API desde el archivo .env 
const API_URL = import.meta.env.VITE_API_URL;

export const ScreenAlergenos = () => {
  const { idempresa, idsucursal } = useParams();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [alergenosData, setAlergenosData] = useState<IAlergenos[]>([]);

  const alergenosService = useMemo(() => new AlergenosService(`${API_URL}/alergenos`), []);

  const getAlergenos = useCallback(async () => {
    setLoading(true);
    try {
      if (!idsucursal) {
        console.error("ID de sucursal no válido:", idsucursal);
        return;
      }
      const response = await fetch(`${API_URL}/alergenos`);
      if (!response.ok) {
        throw new Error('Error al obtener los alérgenos');
      }
      const data = await response.json();
      setAlergenosData(data);
      dispatch(setDataTable(data));
    } catch (error) {
      console.error("Error al obtener alérgenos:", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, idsucursal]);

  useEffect(() => {
    getAlergenos();
  }, [getAlergenos, idsucursal, idempresa]);

  const ColumnsTableAlergenos = [
    { label: "ID", key: "id" },
    { label: "Denominación", key: "denominacion" },
    { label: "Acciones", key: "acciones" },
  ];

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: `¿Seguro que quieres eliminar?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        alergenosService.delete(id).then(() => {
          getAlergenos();
        });
      }
    });
  };

  return (
    <>
      <div>
        <div style={{ padding: ".4rem", display: "flex", justifyContent: "flex-end", width: "90%" }}>
          <Button onClick={() => setOpenModal(true)} variant="contained">
            Agregar
          </Button>
        </div>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "100%", gap: "2vh", height: "100%" }}>
            <CircularProgress color="secondary" />
            <h2>Cargando...</h2>
          </div>
        ) : (
          <TableGeneric<IAlergenos>
            data={alergenosData}
            handleDelete={handleDelete}
            columns={ColumnsTableAlergenos}
            setOpenModal={setOpenModal}
          />
        )}
      </div>

      <ModalAlergeno
        getAlergenos={getAlergenos}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
}; 