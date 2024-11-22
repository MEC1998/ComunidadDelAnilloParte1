import { useEffect, useState, useCallback } from "react";

import { IProductos } from "../../types/dtos/productos/IProductos";
import { TableGeneric } from "../ui/TableGeneric/TableGeneric";
import { useAppDispatch } from "../../hooks/redux";
import { setDataTable } from "../../redux/slices/TablaReducer";
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";
import { ModalProducto } from "../ui/modals/ModalProductos/ModalProductos";
import styles from './ScreenProductos.module.css';
interface ScreenProductosProps {
  idempresa?: string;
  idsucursal?: string;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
}

// Definición de la URL base de la API desde el archivo .env 

export const ScreenProductos: React.FC<ScreenProductosProps> = ({ 
  idempresa, 
  idsucursal, 
  openModal, 
  setOpenModal 
}) => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [productosData, setProductosData] = useState<IProductos[]>([]);


  // Función para obtener los productos de la sucursal seleccionada
  const getProductos = useCallback(async () => {
    setLoading(true);
    try {
      if (!idsucursal) {
        console.error("ID de sucursal no válido:", idsucursal);
        return; // Salir si el ID no es válido
      }
      const response = await fetch(`http://190.221.207.224:8090/articulos/porSucursal/${idsucursal}`);
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      const data = await response.json();
      setProductosData(data);
      dispatch(setDataTable(data));
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, idsucursal]);

  // Efecto para cargar los datos al inicio y cuando cambien los parámetros de la URL
  useEffect(() => {
    getProductos();
  }, [getProductos, idsucursal, idempresa]); // Agrega idempresa e idsucursal como dependencias

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
    Swal.fire({
      title: "¿Estas seguro?",
      text: `¿Seguro que quieres eliminar?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`http://190.221.207.224:8090/articulos/${id}`, {
            method: 'DELETE'
          });
          
          if (!response.ok) {
            throw new Error('Error al eliminar el producto');
          }
          
          await getProductos();
          Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.', 'success');
        } catch (error) {
          console.error('Error:', error);
          Swal.fire('Error', 'No se pudo eliminar el producto', 'error');
        }
      }
    });
  };

  return (
    <>
      <div>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "100%", gap: "2vh", height: "100%" }}>
            <CircularProgress color="secondary" />
            <h2>Cargando...</h2>
          </div>
        ) : (
          <div>
          <h3 className={styles.title}>Productos</h3>
          <TableGeneric<IProductos>
            data={productosData}
            handleDelete={handleDelete}
            columns={ColumnsTablePersona}
            setOpenModal={setOpenModal}
            />
            </div>
        )}
      </div>

      <ModalProducto
        getProductos={getProductos}
        openModal={openModal}
        setOpenModal={setOpenModal}
        idsucursal={idsucursal || ''}
      />
    </>
  );
};
