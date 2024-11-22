import * as Yup from "yup";
import { Form, Formik } from "formik";
import { CategoriasService } from "../../../../services/dtos/CategoriasService";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { removeElementActive } from "../../../../redux/slices/TablaReducer";
import TextFieldValue from "../../TextFildValue/TextFildValue";
import { ICreateCategoria } from "../../../../types/dtos/categorias/ICreateCategoria";
import { useParams } from "react-router-dom";
import { ICategorias } from "../../../../types/dtos/categorias/ICategorias";
import { useEffect, useCallback, useState, useMemo } from "react";
import Swal from "sweetalert2";
import { SucursalService } from "../../../../services/dtos/SucursalService";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";
import styles from "./ModalCategorias.module.css";
const API_URL = import.meta.env.VITE_API_URL;

interface IModalCategoria {
    getCategorias: () => void;
    openModal: boolean;
    setOpenModal: (state: boolean) => void;
}



export const ModalCategoria = ({
    getCategorias,
    openModal,
    setOpenModal,
}: IModalCategoria) => {
    const { idempresa, idsucursal } = useParams();
    const elementActive = useAppSelector(
        (state) => state.tablaReducer.elementActive
    ) as ICategorias | null;

    const [categoriasPadre, setCategoriasPadre] = useState<ICategorias[]>([]);
    const [sucursales, setSucursales] = useState<ISucursal[]>([]);

    const apiCategoria = useMemo(() => new CategoriasService(API_URL + "/categorias"), []);
    const sucursalService = useMemo(() => new SucursalService(), []);
    const dispatch = useAppDispatch();

    const loadCategoriasPadre = useCallback(async () => {
        try {
            const categorias = await apiCategoria.getAllCategoriasPorEmpresa(Number(idempresa));
            console.log('Todas las categorías:', categorias);
            console.log('Elemento activo:', elementActive);
            console.log('Categoría padre del elemento activo:', elementActive?.categoriaPadre);

            let categoriasFiltradas = categorias.filter(cat => !cat.categoriaPadre);
            console.log('Categorías filtradas:', categoriasFiltradas);

            if (elementActive?.categoriaPadre) {
                const categoriaPadreActual = categorias.find(cat => cat.id === elementActive.categoriaPadre?.id);
                console.log('Categoría padre encontrada:', categoriaPadreActual);
                if (categoriaPadreActual && !categoriasFiltradas.some(cat => cat.id === categoriaPadreActual.id)) {
                    categoriasFiltradas = [...categoriasFiltradas, categoriaPadreActual];
                }
            }

            setCategoriasPadre(categoriasFiltradas);
        } catch (error) {
            console.error("Error al cargar categorías padre:", error);
        }
    }, [apiCategoria, idempresa, elementActive]);

    const loadSucursales = useCallback(async () => {
        try {
            const sucursalesData = await sucursalService.getSucursalesByEmpresaId(Number(idempresa));
            setSucursales(sucursalesData);
        } catch (error) {
            console.error("Error al cargar sucursales:", error);
        }
    }, [idempresa, sucursalService]);

    useEffect(() => {
        if (openModal) {
            loadCategoriasPadre();
            loadSucursales();
        }
    }, [openModal, loadCategoriasPadre, loadSucursales]);

    const handleClose = () => {
        setOpenModal(false);
        dispatch(removeElementActive());
    };

    return (
        <>
            {openModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>
                                {elementActive ? "Editar categoría" : "Añadir categoría"}
                            </h2>
                        </div>
                        <Formik
                            validationSchema={Yup.object({
                                denominacion: Yup.string().required("Campo requerido"),
                                idEmpresa: Yup.number().required("Campo requerido"),
                                categoriaPadre: Yup.mixed().nullable(),
                                idSucursales: Yup.array().of(Yup.number()).required("Campo requerido")
                            })}
                            initialValues={{
                                denominacion: elementActive?.denominacion || "",
                                idEmpresa: Number(idempresa) || 0,
                                categoriaPadre: elementActive?.categoriaPadre ? {
                                    id: elementActive.categoriaPadre.id,
                                    eliminado: false
                                } : null,
                                idSucursales: elementActive?.sucursales?.map(s => s.id) || [Number(idsucursal)]
                            }}
                            enableReinitialize={true}
                            onSubmit={async (values: ICreateCategoria) => {
                                try {
                                    if (elementActive) {
                                        const dataToUpdate = {
                                            id: elementActive.id,
                                            eliminado: false,
                                            denominacion: values.denominacion,
                                            idSucursales: values.idSucursales,
                                            idCategoriaPadre: values.categoriaPadre ? values.categoriaPadre.id : null,
                                            idEmpresa: Number(idempresa)
                                        };
                                        
                                        console.log('Datos que se enviarán al backend:', dataToUpdate);
                                        await apiCategoria.updateCategoria(elementActive.id, dataToUpdate);
                                    } else {
                                        await apiCategoria.createCategoria(values);
                                    }
                                    
                                    getCategorias();
                                    handleClose();
                                } catch (error) {
                                    console.error("Error detallado:", error);
                                    Swal.fire('Error', 'Hubo un error al procesar la operación', 'error');
                                }
                            }}
                        >
                            {({ setFieldValue, values }) => (
                                <Form autoComplete="off" className={styles.formContent}>
                                    <div className={styles.formGroup}>
                                        <TextFieldValue
                                            name="denominacion"
                                            type="text"
                                            placeholder="Denominación"
                                        />
                                    </div>
                                    
                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel}>
                                            {elementActive?.categoriaPadre ? 
                                                `Categoría Padre: ${elementActive.categoriaPadre.denominacion}` : 
                                                'Categoría Padre'}
                                        </label>
                                        <select
                                            className={styles.select}
                                            value={values.categoriaPadre?.id || ''}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value) {
                                                    const newCategoriaPadre = {
                                                        id: Number(value),
                                                        eliminado: false
                                                    };
                                                    setFieldValue('categoriaPadre', newCategoriaPadre);
                                                } else {
                                                    setFieldValue('categoriaPadre', null);
                                                }
                                            }}
                                        >
                                            <option value="">Seleccione una categoría padre</option>
                                            {categoriasPadre.map((categoria: ICategorias) => (
                                                <option 
                                                    key={categoria.id} 
                                                    value={categoria.id}
                                                >
                                                    {categoria.denominacion}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel}>Sucursales</label>
                                        <select 
                                            multiple
                                            className={`${styles.select} ${styles.multipleSelect}`}
                                            value={values.idSucursales.map(String)}
                                            onChange={(e) => {
                                                const selectedOptions = Array.from(e.target.selectedOptions)
                                                    .map(option => Number(option.value));
                                                setFieldValue('idSucursales', selectedOptions);
                                            }}
                                        >
                                            {sucursales.map((sucursal) => (
                                                <option 
                                                    key={sucursal.id} 
                                                    value={sucursal.id}
                                                >
                                                    {sucursal.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className={styles.buttons}>
                                        <button 
                                            type="button" 
                                            className={styles.cancelButton}
                                            onClick={handleClose}
                                        >
                                            Cancelar
                                        </button>
                                        <button 
                                            type="submit" 
                                            className={styles.submitButton}
                                        >
                                            {elementActive ? "Guardar cambios" : "Crear categoría"}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            )}
        </>
    );
};