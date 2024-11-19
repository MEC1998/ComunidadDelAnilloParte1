import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { CategoriasService } from "../../../../services/dtos/CategoriasService";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { removeElementActive } from "../../../../redux/slices/TablaReducer";
import TextFieldValue from "../../TextFildValue/TextFildValue";
import { ICreateCategoria } from "../../../../types/dtos/categorias/ICreateCategoria";
import { IUpdateCategoria } from "../../../../types/dtos/categorias/IUpdateCategoria";
import { useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

interface IModalCategoria {
    getCategorias: () => void;
    openModal: boolean;
    setOpenModal: (state: boolean) => void;
}

interface IElementActive {
    id: number;
    denominacion: string;
    categoriaPadre?: {
        id: number;
    };
}

export const ModalCategoria = ({
    getCategorias,
    openModal,
    setOpenModal,
}: IModalCategoria) => {
    const { idempresa } = useParams();
    const elementActive = useAppSelector(
        (state) => state.tablaReducer.elementActive
    ) as IElementActive | null;

    const initialValues: ICreateCategoria = {
        denominacion: elementActive?.denominacion || "",
        idEmpresa: Number(idempresa) || 0,
        idCategoriaPadre: elementActive?.categoriaPadre?.id || null,
    };

    const apiCategoria = new CategoriasService(API_URL + "/categorias");
    const dispatch = useAppDispatch();

    const handleClose = () => {
        setOpenModal(false);
        dispatch(removeElementActive());
    };

    return (
        <div>
            <Modal
                id={"modal"}
                show={openModal}
                onHide={handleClose}
                size={"lg"}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    {elementActive ? (
                        <Modal.Title>Editar categoría:</Modal.Title>
                    ) : (
                        <Modal.Title>Añadir categoría:</Modal.Title>
                    )}
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        validationSchema={Yup.object({
                            denominacion: Yup.string().required("Campo requerido"),
                            idEmpresa: Yup.number().required("Campo requerido"),
                            idCategoriaPadre: Yup.number().nullable(),
                        })}
                        initialValues={{
                            ...initialValues,
                            ...elementActive,
                        }}
                        enableReinitialize={true}
                        onSubmit={async (values: ICreateCategoria) => {
                            const categoria: IUpdateCategoria = {
                                id: elementActive ? elementActive.id : 0,
                                denominacion: values.denominacion,
                                eliminado: false,
                                idSucursales: [],
                                idCategoriaPadre: values.idCategoriaPadre,
                                idEmpresa: Number(idempresa),
                            };

                            try {
                                if (elementActive) {
                                    await apiCategoria.updateCategoria(elementActive.id, categoria);
                                    console.log("Categoría actualizada con éxito");
                                } else {
                                    await apiCategoria.createCategoria(values);
                                    console.log("Categoría creada con éxito");
                                }

                                getCategorias();
                                handleClose();
                            } catch (error) {
                                console.error("Error al procesar la solicitud:", error);
                            }
                        }}
                    >
                        {() => (
                            <Form autoComplete="off" className="form-obraAlta">
                                <div className="container_Form_Categorias">
                                    <TextFieldValue
                                        label="Denominación:"
                                        name="denominacion"
                                        type="text"
                                        placeholder="Denominación"
                                    />
                                    <TextFieldValue
                                        label="Categoría Padre (opcional):"
                                        name="idCategoriaPadre"
                                        type="number"
                                        placeholder="ID Categoría Padre"
                                    />
                                </div>
                                <div className="d-flex justify-content-end">
                                    <Button variant="success" type="submit">
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