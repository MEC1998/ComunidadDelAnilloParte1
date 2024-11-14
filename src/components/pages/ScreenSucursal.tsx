// import { useEffect, useState } from "react";

// import { SucursalService } from "../../services/dtos/SucursalService";
// import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
// import { TableGeneric } from "../ui/TableGeneric/TableGeneric";
// import { ModalSucursal } from "../ui/modals/ModalSucursal/ModalSucursal";
// import { useAppDispatch } from "../../hooks/redux";
// import { setDataTable } from "../../redux/slices/TablaReducer";
// import Swal from "sweetalert2";

// import { Button, CircularProgress } from "@mui/material";




// // Definición de la URL base de la API desde el archivo .env 
// const API_URL = import.meta.env.VITE_API_URL;

// export const ScreenSucursal = () => {
//   // Estado para controlar la carga de datos
//   const [loading, setLoading] = useState(false);
//   const [openModal, setOpenModal] = useState(false);

//   const sucursalService = new SucursalService(API_URL + "/sucursales");

//   //hook personalizado (redux)
//   const dispatch = useAppDispatch();

//   // Columnas de la tabla de sucursales
//   const ColumnsTableSucursal = [
//     {
//       label: "id",
//       key: "id",
//       render: (sucursal: ISucursal) => (sucursal?.id ? sucursal.id : 0),
//     },
//     { label: "Nombre", key: "nombre" },
//     { label: "Empresa", key: "empresa.nombre" },
//     { label: "Dirección", key: "domicilio.calle" },
//     { label: "Acciones", key: "acciones" },
//   ];

//   // Función para manejar el borrado de una sucursal
//   const handleDelete = async (id: number) => {
//     // Mostrar confirmación antes de eliminar
//     Swal.fire({
//       title: "¿Estas seguro?",
//       text: `¿Seguro que quieres eliminar?`,
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Si, Eliminar!",
//       cancelButtonText: "Cancelar",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // Eliminar la sucursal si se confirma
//         sucursalService.delete(id).then(() => {
//           getSucursales();
//         });
//       }
//     });
//   };
//   // Función para obtener las sucursales
//   const getSucursales = async () => {
//     try {
//       const sucursalData = await sucursalService.getAll();
//       console.log("Datos de sucursales obtenidos:", sucursalData);
//       dispatch(setDataTable(sucursalData));
//     } catch (error) {
//       console.error("Error al obtener sucursales:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Efecto para cargar los datos al inicio
//   useEffect(() => {
//     setLoading(true);
//     getSucursales();
//   }, []);

//   return (
//     <>
//       <div>
//         <div
//           style={{
//             padding: ".4rem",
//             display: "flex",
//             justifyContent: "flex-end",
//             width: "90%",
//           }}
//         >
//           {/* Botón para abrir el modal de agregar sucursal */}
//           <Button
//             onClick={() => {
//               setOpenModal(true);
//             }}
//             variant="contained"
//           >
//             Agregar
//           </Button>
//         </div>
//         {/* Mostrar indicador de carga mientras se cargan los datos */}
//         {loading ? (
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               flexDirection: "column",
//               width: "100%",
//               gap: "2vh",
//               height: "100%",
//             }}
//           >
//             <CircularProgress color="secondary" />
//             <h2>Cargando...</h2>
//           </div>
//         ) : (
//           // Mostrar la tabla de sucursales una vez que los datos se han cargado
//           <TableGeneric<ISucursal>
//             handleDelete={handleDelete}
//             columns={ColumnsTableSucursal}
//             setOpenModal={setOpenModal}
//           />
//         )}
//       </div>

//       {/* Modal para agregar o editar una sucursal */}
//       <ModalSucursal
//         getSucursales={getSucursales}
//         openModal={openModal}
//         setOpenModal={setOpenModal}
//       />
//     </>
//   );
// };
