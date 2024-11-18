// Importación de las dependencias necesarias
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";

import { ICreateProducto } from "../../../../types/dtos/productos/ICreateProducto";
import TextFieldValue from "../../TextFildValue/TextFildValue";
import { Form, Formik } from "formik";
import { ProductosService } from "../../../../services/dtos/ProductosService";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { removeElementActive } from "../../../../redux/slices/TablaReducer";
import { IProductos } from "../../../../types/dtos/productos/IProductos";
import { ICategorias } from "../../../../types/dtos/categorias/ICategorias";
const API_URL = import.meta.env.VITE_API_URL;

// Interfaz para los props del componente ModalProducto
interface IModalProducto {
  getProductos: Function; // Función para obtener los productos
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
}

// Definición del componente ModalProducto
export const ModalProducto = ({
  getProductos,
  openModal,
  setOpenModal,
}: IModalProducto) => {
  // Valores iniciales para el formulario
  const initialValues: ICreateProducto = {
    denominacion: "",
    precioVenta: 0,
    descripcion: "",
    habilitado: true,
    codigo: "",
    idCategoria: 0,
    idAlergenos: [],
    imagenes: [],
  };

  const apiProducto = new ProductosService(API_URL + "/productos");

  const elementActive = useAppSelector(
    (state) => state.tablaReducer.elementActive
  );
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
              descripcion: Yup.string().required("Campo requerido"),
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
              // Enviar los datos al servidor al enviar el formulario
              if (elementActive) {
                const producto: IProductos = {
                  ...values,
                  id: elementActive.id,
                  categoria: elementActive.categoria, // Asegúrate de que estas propiedades existan
                  eliminado: elementActive.eliminado,
                  alergenos: elementActive.alergenos,
                };
                await apiProducto.put(elementActive.id, producto);
              } else {
                const defaultCategoria: ICategorias = {
                  id: 0, // Asigna un ID por defecto
                  denominacion: "Categoría por defecto", // Asigna una denominación por defecto
                  eliminado: false, // Asigna un valor por defecto para eliminado
                  sucursales: [], // Asigna un array vacío o el valor por defecto necesario
                  subCategorias: [], // Añade un array vacío o el valor por defecto necesario
                  articulos: [], // Añade un array vacío o el valor por defecto necesario
                  // Añade otras propiedades necesarias con valores por defecto
                };
                const producto: IProductos = {
                  ...values,
                  id: 0, // O el valor que corresponda para un nuevo producto
                  categoria: defaultCategoria, // Asigna un valor por defecto válido
                  eliminado: false, // O el valor por defecto
                  alergenos: [],
                };
                await apiProducto.post(producto);
              }
              // Obtener los productos actualizados y cerrar el modal
              getProductos();
              handleClose();
            }}
          >
            {() => (
              <>
                {/* Formulario */}
                <Form autoComplete="off" className="form-obraAlta">
                  <div className="container_Form_Ingredientes">
                    {/* Campos del formulario */}
                    <TextFieldValue
                      label="Denominación:"
                      name="denominacion"
                      type="text"
                      placeholder="Denominación"
                    />
                    <TextFieldValue
                      label="Precio de Venta:"
                      name="precioVenta"
                      type="number"
                      placeholder="Precio de Venta"
                    />
                    <TextFieldValue
                      label="Descripción:"
                      name="descripcion"
                      type="text"
                      placeholder="Descripción"
                    />
                    <TextFieldValue
                      label="Código:"
                      name="codigo"
                      type="text"
                      placeholder="Código"
                    />
                    <TextFieldValue
                      label="ID Categoría:"
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
