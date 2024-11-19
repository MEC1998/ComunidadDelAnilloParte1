// Importación de las dependencias necesarias
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";

import { ICreateProducto } from "../../../../types/dtos/productos/ICreateProducto";
import TextFieldValue from "../../TextFildValue/TextFildValue";
import { Form, Formik } from "formik";
import { ProductosService } from "../../../../services/dtos/ProductosService";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { removeElementActive } from "../../../../redux/slices/TablaReducer";

import { IUpdateProducto } from "../../../../types/dtos/productos/IUpdateProducto";
const API_URL = import.meta.env.VITE_API_URL;

// Interfaz para los props del componente ModalProducto
interface IModalProducto {
  getProductos: () => void; // Función para obtener los productos
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
}

// Definición del componente ModalProducto
export const ModalProducto = ({
  getProductos,
  openModal,
  setOpenModal,
}: IModalProducto) => {
  const elementActive = useAppSelector(
    (state) => state.tablaReducer.elementActive
  );
  
  // Valores iniciales para el formulario
  const initialValues: ICreateProducto = {
    denominacion: elementActive?.denominacion || "",
    precioVenta: elementActive?.precioVenta || 0,
    descripcion: elementActive?.descripcion || "",
    habilitado: elementActive?.habilitado || true,
    codigo: elementActive?.codigo || "",
    idCategoria: elementActive?.categoria?.id || 0,
    idAlergenos: elementActive?.alergenos?.map(a => a.id) || [],
    imagenes: elementActive?.imagenes || [],
  };

  const apiProducto = new ProductosService(API_URL + "/productos");
  const dispatch = useAppDispatch();

  // Función para cerrar el modal
  const handleClose = () => {
    setOpenModal(false);
    dispatch(removeElementActive());
  };

  return (
    <div>
      {/* Componente Modal de React Bootstrap */}
      <Modal
        id={"modal"}
        show={openModal}
        onHide={handleClose}
        size={"lg"}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          {/* Título del modal dependiendo de si se está editando o añadiendo un producto */}
          {elementActive ? (
            <Modal.Title>Editar un producto:</Modal.Title>
          ) : (
            <Modal.Title>Añadir un producto:</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          {/* Componente Formik para el formulario */}
          <Formik
            validationSchema={Yup.object({
              denominacion: Yup.string().required("Campo requerido"),
              precioVenta: Yup.number().required("Campo requerido"),
              descripcion: Yup.string().nullable(),
              habilitado: Yup.boolean().required("Campo requerido"),
              codigo: Yup.string().required("Campo requerido"),
              idCategoria: Yup.number().required("Campo requerido"),
              idAlergenos: Yup.array().of(Yup.number()).required("Campo requerido"),
              imagenes: Yup.array().of(Yup.object()).required("Campo requerido"),
            })}
            initialValues={{
              ...initialValues,
              ...elementActive,
            }}
            enableReinitialize={true}
            onSubmit={async (values: ICreateProducto) => {
              const producto: IUpdateProducto = {
                id: elementActive ? elementActive.id : 0,
                ...values,
              };

              try {
                if (elementActive) {
                  await apiProducto.updateProducto(elementActive.id, producto);
                  console.log("Producto actualizado con éxito");
                } else {
                  await apiProducto.createProducto(producto);
                  console.log("Producto creado con éxito");
                }

                getProductos();
                handleClose();
              } catch (error) {
                console.error("Error al procesar la solicitud:", error);
              }
            }}
          >
            {() => (
              <>
                {/* Formulario */}
                <Form autoComplete="off" className="form-obraAlta">
                  <div className="container_Form_Ingredientes">
                    {/* Campos del formulario */}
                    <TextFieldValue
                      name="denominacion"
                      type="text"
                      placeholder="Denominación"
                    />
                    <TextFieldValue
                      name="precioVenta"
                      type="number"
                      placeholder="Precio de Venta"
                    />
                    <TextFieldValue
                      name="descripcion"
                      type="text"
                      placeholder="Descripción"
                    />
                    <TextFieldValue
                      name="codigo"
                      type="text"
                      placeholder="Código"
                    />
                    <TextFieldValue
                      name="idCategoria"
                      type="number"
                      placeholder="ID Categoría"
                    />
                    {/* Otros campos según sea necesario */}
                  </div>
                  {/* Botón para enviar el formulario */}
                  <div className="d-flex justify-content-end">
                    <Button variant="success" type="submit">
                      Enviar
                    </Button>
                  </div>
                </Form>
              </>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};
