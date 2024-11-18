import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";

import { ProductosService } from "../../services/dtos/ProductosService";
import { IProductos } from "../../types/dtos/productos/IProductos";
import { TableGeneric } from "../ui/TableGeneric/TableGeneric";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setDataTable } from "../../redux/slices/TablaReducer";
import Swal from "sweetalert2";

import { Button, CircularProgress } from "@mui/material";
import { ModalProducto } from "../ui/modals/ModalProductos/ModalProductos";


 

// Definición de la URL base de la API desde el archivo .env 
const API_URL = import.meta.env.VITE_API_URL;

export const ScreenProductos = () => {
  const { idempresa, idsucursal } = useParams(); // Obtén los parámetros de la URL
  const selectedBranch = useAppSelector((state) => state.selectedBranch.branch);
  const selectedCompany = useAppSelector((state) => state.selectedCompany.company);

  useEffect(() => {
    if (selectedCompany && selectedBranch) {
      // Aquí puedes cargar los datos de la empresa y la sucursal seleccionadas
    }
  }, [selectedCompany, selectedBranch]);

  // Estado para controlar la carga de datos
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // Inicializar productosService sin usar API_URL como dependencia
  const productosService = useMemo(() => new ProductosService(`${API_URL}/productos`), []);

  // Obtener el ID de la sucursal seleccionada desde el estado de Redux
  const idSucursalSeleccionada = useAppSelector((state) => {
    const selectedBranch = state.selectedBranch.branch;
    console.log("Sucursal seleccionada desde Redux:", selectedBranch);
    return selectedBranch ? selectedBranch.id : null;
  });

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
  // Función para obtener los productos de la sucursal seleccionada
  const getProductos = useCallback(async () => {
    setLoading(true);
    try {
      if (!idSucursalSeleccionada) {
        console.error("ID de sucursal no válido:", idSucursalSeleccionada);
        return; // Salir si el ID no es válido
      }
      const response = await fetch(`http://190.221.207.224:8090/articulos/porSucursal/${idSucursalSeleccionada}`);
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      const productosData = await response.json();
      dispatch(setDataTable(productosData));
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, idSucursalSeleccionada]);

  // Efecto para cargar los datos al inicio y cuando cambien los parámetros de la URL
  useEffect(() => {
    console.log("Efecto de carga de productos, ID de sucursal:", idSucursalSeleccionada);
    if (idSucursalSeleccionada) {
      getProductos();
    }
  }, [getProductos, idSucursalSeleccionada, idempresa, idsucursal]); // Agrega idempresa y idsucursal como dependencias

  // Nueva función para obtener la sucursal por empresa
  const getSucursalPorEmpresa = useCallback(async () => {
    if (idSucursalSeleccionada) {
      try {
        const response = await fetch(`/sucursales/porEmpresa/${idSucursalSeleccionada}`);
        const data = await response.json();
        // Aquí puedes manejar la data recibida, por ejemplo, guardarla en el estado
        console.log(data); // {{ edit_1 }}
      } catch (error) {
        console.error("Error al obtener la sucursal:", error); // {{ edit_2 }}
      }
    }
  }, [idSucursalSeleccionada]);

  // Efecto para cargar la sucursal al seleccionar una
  useEffect(() => {
    getSucursalPorEmpresa(); // Llama a la función para obtener la sucursal
  }, [idSucursalSeleccionada, getSucursalPorEmpresa]); // Agregar getSucursalPorEmpresa como dependencia

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
        getProductos={getProductos}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};
