import { useEffect, useState } from "react";

import { ProductosService } from "../../services/dtos/ProductosService";
import { IProductos } from "../../types/dtos/productos/IProductos";
import { TableGeneric } from "../ui/TableGeneric/TableGeneric";
import { useAppDispatch } from "../../hooks/redux";
import { setDataTable } from "../../redux/slices/TablaReducer";
import Swal from "sweetalert2";

import { Button, CircularProgress } from "@mui/material";
import { ModalProducto } from "../ui/modals/ModalProductos/ModalProductos";


 

// Definición de la URL base de la API desde el archivo .env 
const API_URL = import.meta.env.VITE_API_URL;

export const ScreenSucursal = () => {
  // Estado para controlar la carga de datos
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const productosService = new ProductosService(API_URL + "/productos");

  //hook personalizado (redux)
  const dispatch = useAppDispatch();

  // Columnas de la tabla de productos
  const ColumnsTablePersona = [
    {
      label: "id",
      key: "id",
      render: (producto: IProductos) => (producto?.id ? producto.id : 0),
    },
    { label: "Nombre", key: "denominacion" },
    { label: "Precio", key: "precioVenta" },
    { label: "Descripción", key: "descripcion" },
    { label: "Acciones", key: "acciones" },
  ];

  // Función para manejar el borrado de un producto
  const handleDelete = async (id: number) => {
    // Mostrar confirmación antes de eliminar
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
        // Eliminar el producto si se confirma
        productosService.delete(id).then(() => {
          getProductos();
        });
      }
    });
  };
  // Función para obtener los productos
  const getProductos = async () => {
    await productosService.getAll().then((productosData) => {
      dispatch(setDataTable(productosData));
      setLoading(false);
    });
  };

  // Efecto para cargar los datos al inicio
  useEffect(() => {
    setLoading(true);
    getProductos();
  }, []);

  return (
    <>
      <div>
        <div
          style={{
            padding: ".4rem",
            display: "flex",
            justifyContent: "flex-end",
            width: "90%",
          }}
        >
          {/* Botón para abrir el modal de agregar producto */}
          <Button
            onClick={() => {
              setOpenModal(true);
            }}
            variant="contained"
          >
            Agregar
          </Button>
        </div>
        {/* Mostrar indicador de carga mientras se cargan los datos */}
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              gap: "2vh",
              height: "100%",
            }}
          >
            <CircularProgress color="secondary" />
            <h2>Cargando...</h2>
          </div>
        ) : (
          // Mostrar la tabla de productos una vez que los datos se han cargado
          <TableGeneric<IProductos>
            handleDelete={handleDelete}
            columns={ColumnsTablePersona}
            setOpenModal={setOpenModal}
          />
        )}
      </div>

      {/* Modal para agregar o editar un producto */}
      <ModalProducto
        getPersonas={getProductos}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};
