import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { AlergenosService } from "../../../../services/dtos/AlergenosService";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { removeElementActive } from "../../../../redux/slices/TablaReducer";
import { ICreateAlergeno } from "../../../../types/dtos/alergenos/ICreateAlergeno";

const API_URL = import.meta.env.VITE_API_URL;

interface IModalAlergeno {
    getAlergenos: () => void;
    openModal: boolean;
    setOpenModal: (state: boolean) => void;
}

export const ModalAlergeno = ({
    getAlergenos,
    openModal,
    setOpenModal,
}: IModalAlergeno) => {
    const elementActive = useAppSelector(
        (state) => state.tablaReducer.elementActive
    );

    const initialValues: ICreateAlergeno = {
        denominacion: elementActive?.denominacion || "",
        imagen: elementActive?.imagen || null
    };

    const apiAlergeno = new AlergenosService(API_URL + "/alergenos");
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
                        <Modal.Title>Editar alérgeno:</Modal.Title>
                    ) : (
                        <Modal.Title>Añadir alérgeno:</Modal.Title>
                    )}
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={Yup.object({
                            denominacion: Yup.string().required("Campo requerido"),
                        })}
                        onSubmit={async (values) => {
                            try {
                                if (elementActive) {
                                    await apiAlergeno.updateAlergeno(elementActive.id, {
                                        ...values,
                                        id: elementActive.id,
                                        eliminado: false,
                                        imagen:null
                                    });
                                } else {
                                    await apiAlergeno.createAlergeno(values);
                                }
                                getAlergenos();
                                handleClose();
                            } catch (error) {
                                console.error("Error al procesar la solicitud:", error);
                            }
                        }}
                    >
                        {() => (
                            <Form autoComplete="off">
                                <div className="container_Form">
                                    <input
                                        name="denominacion"
                                        type="text"
                                        placeholder="Denominación"
                                    />
                                    {/* Aquí iría el componente para manejar la imagen */}
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