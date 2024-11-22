// Importación de las dependencias necesarias
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";

import { ICreateProducto } from "../../../../types/dtos/productos/ICreateProducto";
import TextFieldValue from "../../TextFildValue/TextFildValue";
import { Form, Formik } from "formik";
import { ProductosService } from "../../../../services/dtos/ProductosService";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { removeElementActive } from "../../../../redux/slices/TablaReducer";
import { useEffect, useState, useCallback } from "react";
import { CategoriasService } from "../../../../services/dtos/CategoriasService";
import styles from './ModalProductos.module.css';
import { ICategorias } from "../../../../types/dtos/categorias/ICategorias";
const API_URL = import.meta.env.VITE_API_URL;

// Interfaz para los props del componente ModalProducto
interface IModalProducto {
  getProductos: () => Promise<void>;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  idsucursal: string;
}

// Definición del componente ModalProducto
export const ModalProducto = ({
  getProductos,
  openModal,
  setOpenModal,
  idsucursal
}: IModalProducto) => {
  const [categorias, setCategorias] = useState<ICategorias[]>([]);
  const elementActive = useAppSelector(
    (state) => state.tablaReducer.elementActive
  );
  
  // Función para obtener categorías
  const getCategorias = useCallback(async () => {
    const apiCategorias = new CategoriasService(API_URL + "/categorias");
    try {
      const data = await apiCategorias.getAllCategoriasPorSucursal(Number(idsucursal));
      setCategorias(data);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    }
  }, [idsucursal]);

  useEffect(() => {
    if (openModal) {
      getCategorias();
    }
  }, [openModal, idsucursal, getCategorias]);
  
  // Valores iniciales para el formulario
  const initialValues: ICreateProducto = {
    denominacion: elementActive?.denominacion || "",
    precioVenta: elementActive?.precioVenta || 0,
    descripcion: elementActive?.descripcion || "",
    habilitado: elementActive?.habilitado || true,
    codigo: elementActive?.codigo || "",
    idCategoria: elementActive?.categoria?.id || 0,
    idAlergenos: elementActive?.alergenos?.map((a: { id: number }) => a.id) || [],
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
              const producto = {
                id: elementActive ? elementActive.id : 0,
                eliminado: elementActive?.eliminado || false,
                ...values,
                descripcion: values.descripcion || ""
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
            {({ values, setFieldValue }) => (
              <Form autoComplete="off" className={styles.modalForm}>
                <div className="d-flex flex-column gap-2">
                  <div className={styles.formGroup}>
                    <label htmlFor="denominacion">Denominación:</label>
                    <TextFieldValue
                      name="denominacion"
                      type="text"
                      placeholder="Denominación"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="precioVenta">Precio de Venta:</label>
                    <TextFieldValue
                      name="precioVenta"
                      type="number"
                      placeholder="Precio de Venta"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="descripcion">Descripción:</label>
                    <TextFieldValue
                      name="descripcion"
                      type="text"
                      placeholder="Descripción"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="codigo">Código:</label>
                    <TextFieldValue
                      name="codigo"
                      type="text"
                      placeholder="Código"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="idCategoria">Categoría:</label>
                    <select
                      name="idCategoria"
                      className="form-select"
                      onChange={(e) => {
                        setFieldValue("idCategoria", Number(e.target.value));
                      }}
                      value={values.idCategoria}
                    >
                      <option value="">Seleccione una categoría</option>
                      {categorias.map((categoria) => (
                        <option key={categoria.id} value={categoria.id}>
                          {categoria.denominacion}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <Button variant="success" type="submit" className={styles.submitButton}>
                    Enviar
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};
