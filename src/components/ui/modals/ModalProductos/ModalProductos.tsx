// Importación de las dependencias necesarias
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";

import { ICreateProducto } from "../../../../types/dtos/productos/ICreateProducto";
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
    denominacion: elementActive?.denominacion?.toString() || "",
    precioVenta: elementActive?.precioVenta ? Number(elementActive.precioVenta) : 0,
    descripcion: elementActive?.descripcion?.toString() || "",
    habilitado: elementActive?.habilitado === false ? false : true,
    codigo: elementActive?.codigo?.toString() || "",
    idCategoria: elementActive?.categoria && typeof elementActive.categoria === 'object' && elementActive.categoria !== null && 'id' in elementActive.categoria
      ? Number(elementActive.categoria.id) 
      : 0,
    idAlergenos: elementActive?.alergenos && Array.isArray(elementActive.alergenos) 
      ? elementActive.alergenos.map(a => Number(a.id)) 
      : [],
    imagenes: elementActive?.imagenes && Array.isArray(elementActive.imagenes) 
      ? elementActive.imagenes 
      : [],
  };

  const apiProducto = new ProductosService(API_URL + "/productos");
  const dispatch = useAppDispatch();

  // Función para cerrar el modal
  const handleClose = () => {
    setOpenModal(false);
    dispatch(removeElementActive());
  };

  return (
    <Modal
      show={openModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title className={styles.modalTitle}>
          {elementActive ? "Editar producto" : "Añadir producto"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
          initialValues={initialValues}
          enableReinitialize={true}
          onSubmit={async (values: ICreateProducto) => {
            try {
              if (elementActive) {
                const updateData = {
                  id: elementActive.id,
                  eliminado: elementActive.eliminado,
                  ...values,
                };
                await apiProducto.updateProducto(elementActive.id, updateData);
              } else {
                await apiProducto.createProducto(values);
              }
              await getProductos();
              handleClose();
            } catch (error) {
              console.error("Error al procesar la solicitud:", error);
            }
          }}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form autoComplete="off" className={styles.modalForm}>
              <div className="d-flex flex-column gap-2">
                <div className={styles.formGroup}>
                  <label htmlFor="denominacion">Denominación:</label>
                  <input
                    name="denominacion"
                    type="text"
                    value={values.denominacion}
                    onChange={(e) => setFieldValue("denominacion", e.target.value)}
                    className={styles.formInput}
                    placeholder="Denominación"
                  />
                  {errors.denominacion && touched.denominacion && (
                    <div className={styles.errorMessage}>{errors.denominacion}</div>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="precioVenta">Precio de Venta:</label>
                  <input
                    name="precioVenta"
                    type="number"
                    value={values.precioVenta}
                    onChange={(e) => setFieldValue("precioVenta", Number(e.target.value))}
                    className={styles.formInput}
                    placeholder="Precio de Venta"
                  />
                  {errors.precioVenta && touched.precioVenta && (
                    <div className={styles.errorMessage}>{errors.precioVenta}</div>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="descripcion">Descripción:</label>
                  <input
                    name="descripcion"
                    type="text"
                    value={values.descripcion}
                    onChange={(e) => setFieldValue("descripcion", e.target.value)}
                    className={styles.formInput}
                    placeholder="Descripción"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="codigo">Código:</label>
                  <input
                    name="codigo"
                    type="text"
                    value={values.codigo}
                    onChange={(e) => setFieldValue("codigo", e.target.value)}
                    className={styles.formInput}
                    placeholder="Código"
                  />
                  {errors.codigo && touched.codigo && (
                    <div className={styles.errorMessage}>{errors.codigo}</div>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="idCategoria">Categoría:</label>
                  <select
                    name="idCategoria"
                    value={values.idCategoria}
                    onChange={(e) => setFieldValue("idCategoria", Number(e.target.value))}
                    className={styles.formSelect}
                  >
                    <option value="">Seleccione una categoría</option>
                    {categorias.map((categoria) => (
                      <option key={categoria.id} value={categoria.id}>
                        {categoria.denominacion}
                      </option>
                    ))}
                  </select>
                  {errors.idCategoria && touched.idCategoria && (
                    <div className={styles.errorMessage}>{errors.idCategoria}</div>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label>
                    <input
                      type="checkbox"
                      checked={values.habilitado}
                      onChange={(e) => setFieldValue("habilitado", e.target.checked)}
                    />
                    {" "}Habilitado
                  </label>
                </div>
              </div>

              <div className="d-flex justify-content-end">
                <Button variant="success" type="submit" className={styles.submitButton}>
                  {elementActive ? "Guardar cambios" : "Crear producto"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};
