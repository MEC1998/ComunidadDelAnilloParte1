// // Importación de las dependencias necesarias
// import { Button, Modal } from "react-bootstrap";
// import * as Yup from "yup";

// import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";
// import TextFieldValue from "../../TextFildValue/TextFildValue";
// import { Form, Formik } from "formik";
// import { SucursalService } from "../../../../services/dtos/SucursalService";
// import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
// import { removeElementActive } from "../../../../redux/slices/TablaReducer";
// const API_URL = import.meta.env.VITE_API_URL;

// // Interfaz para los props del componente ModalSucursal
// interface IModalSucursal {
//   getSucursales: Function;
//   openModal: boolean;
//   setOpenModal: (state: boolean) => void;
// }

// // Definición del componente ModalSucursal
// export const ModalSucursal = ({
//   getSucursales,
//   openModal,
//   setOpenModal,
// }: IModalSucursal) => {
//   // Valores iniciales para el formulario
//   const initialValues: ISucursal = {
//     id: 0,
//     nombre: "",
//     empresa: { id: 0, nombre: "", razonSocial: "", cuit: 0, logo: null, sucursales: [], pais: { id: 0, nombre: "" } },
//     domicilio: { id: 0, calle: "", numero: 0, cp: 0, piso: 0, nroDpto: 0, localidad: { id: 0, nombre: "", provincia: { id: 0, nombre: "", pais: { id: 0, nombre: "" } } } },
//     calle: "",
//     latitud: 0,
//     longitud: 0,
//     categorias: [],
//     esCasaMatriz: false,
//     horarioApertura: "",
//     eliminado: false,
//     horarioCierre: "",
//     logo: "",
//     paisId: "",
//     provincia: "",
//     localidad: "",
//     numero: "",
//     cp: "",
//     piso: "",
//     nroDpto: "",
//   };

//   // URL de la API obtenida desde las variables de entorno
//   const apiSucursal = new SucursalService(API_URL + "/sucursales");

//   const elementActive = useAppSelector(
//     (state) => state.tablaReducer.elementActive
//   );
//   const dispatch = useAppDispatch();

//   // Función para cerrar el modal
//   const handleClose = () => {
//     setOpenModal(false);
//     dispatch(removeElementActive());
//   };

//   return (
//     <div>
//       {/* Componente Modal de React Bootstrap */}
//       <Modal
//         id={"modal"}
//         show={openModal}
//         onHide={handleClose}
//         size={"lg"}
//         backdrop="static"
//         keyboard={false}
//       >
//         <Modal.Header closeButton>
//           {/* Título del modal dependiendo de si se está editando o añadiendo una sucursal */}
//           {elementActive ? (
//             <Modal.Title>Editar una sucursal:</Modal.Title>
//           ) : (
//             <Modal.Title>Añadir una sucursal:</Modal.Title>
//           )}
//         </Modal.Header>
//         <Modal.Body>
//           {/* Componente Formik para el formulario */}
//           <Formik
//             validationSchema={Yup.object({
//               nombre: Yup.string().required("Campo requerido"),
//               // Añadir validaciones para otros campos de sucursal según sea necesario
//             })}
//             initialValues={elementActive ? elementActive : initialValues}
//             enableReinitialize={true}
//             onSubmit={async (values: ISucursal) => {
//               // Enviar los datos al servidor al enviar el formulario
//               if (elementActive) {
//                 await apiSucursal.put(elementActive?.id, values);
//               } else {
//                 await apiSucursal.post(values);
//               }
//               // Obtener las sucursales actualizadas y cerrar el modal
//               getSucursales();
//               handleClose();
//             }}
//           >
//             {() => (
//               <>
//                 {/* Formulario */}
//                 <Form autoComplete="off" className="form-obraAlta">
//                   <div className="container_Form_Ingredientes">
//                     {/* Campos del formulario */}
//                     <TextFieldValue
//                       label="Nombre:"
//                       name="nombre"
//                       type="text"
//                       placeholder="Nombre"
//                     />
//                     {/* Añadir más campos según los atributos de ISucursal */}
//                   </div>
//                   {/* Botón para enviar el formulario */}
//                   <div className="d-flex justify-content-end">
//                     <Button variant="success" type="submit">
//                       Enviar
//                     </Button>
//                   </div>
//                 </Form>
//               </>
//             )}
//           </Formik>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };
