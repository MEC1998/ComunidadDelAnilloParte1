import { useQuery } from "@tanstack/react-query";
import { Button, Modal } from "react-bootstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styles from "./BranchModal.module.css";
import { IPais } from "../../../../types/IPais";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";
import TextFieldValue from "../../TextFildValue/TextFildValue";


interface BranchModalProps {
    onClose: () => void;
    onConfirm: (data: Partial<ISucursal>) => Promise<void>;
}

interface RestCountriesResponse {
    cca3: string;
    translations: {
        spa: {
            common: string;
        };
    };
    name: {
        common: string;
    };
}

const fetchPaises = async (): Promise<IPais[]> => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    if (!response.ok) throw new Error('Error al cargar países');
    const data = await response.json();
    
    return data
        .map((pais: RestCountriesResponse) => ({
            id: pais.cca3,
            nombre: pais.translations.spa.common || pais.name.common,
        }))
        .sort((a: IPais, b: IPais) => a.nombre.localeCompare(b.nombre));
};

const BranchModal: React.FC<BranchModalProps> = ({ onClose, onConfirm }) => {
    const initialValues = {
        nombre: "",
        horarioApertura: "",
        horarioCierre: "",
        paisId: "ARG",
        provincia: "",
        localidad: "",
        latitud: "",
        longitud: "",
        calle: "",
        numero: "",
        cp: "",
        piso: "",
        nroDpto: "",
        esCasaMatriz: false,
        eliminado: false,
        logo: null as File | null,
    };

    const { data: paises = [], isLoading: paisesLoading, error: paisesError } = useQuery<IPais[]>({
        queryKey: ['paises'],
        queryFn: fetchPaises,
    });

    return (
        <Modal show={true} onHide={onClose} size="lg" backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar sucursal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={initialValues}
                    validationSchema={Yup.object().shape({
                        nombre: Yup.string().required("Campo requerido"),
                        horarioApertura: Yup.string().required("Campo requerido"),
                        horarioCierre: Yup.string().required("Campo requerido"),
                        paisId: Yup.string().required("Campo requerido"),
                        provincia: Yup.string().required("Campo requerido"),
                        localidad: Yup.string().required("Campo requerido"),
                        calle: Yup.string().required("Campo requerido"),
                        numero: Yup.string().required("Campo requerido"),
                        cp: Yup.string().required("Campo requerido"),
                    })}
                    onSubmit={(values) => {
                        const submissionData: Partial<ISucursal> = {
                            nombre: values.nombre,
                            horarioApertura: values.horarioApertura,
                            horarioCierre: values.horarioCierre,
                            esCasaMatriz: values.esCasaMatriz,
                            latitud: values.latitud ? parseFloat(values.latitud) : 0,
                            longitud: values.longitud ? parseFloat(values.longitud) : 0,
                            domicilio: {
                                id: 0,
                                calle: values.calle,
                                numero: parseInt(values.numero),
                                cp: parseInt(values.cp),
                                piso: parseInt(values.piso),
                                nroDpto: parseInt(values.nroDpto),
                                localidad: {
                                    id: 0,
                                    nombre: values.localidad,
                                    provincia: {
                                        id: 0,
                                        nombre: values.provincia,
                                        pais: {
                                            id: parseInt(values.paisId),
                                            nombre: paises.find(p => p.id === parseInt(values.paisId))?.nombre || 'Argentina'
                                        }
                                    }
                                },
                            },
                            empresa: {
                                id: 0
                            } as IEmpresa,
                            logo: values.logo ? URL.createObjectURL(values.logo) || undefined : undefined
                        };
                        onConfirm(submissionData);
                        onClose();
                    }}
                >
                    {({ handleChange, handleBlur, values, touched, errors }) => (
                        <Form className={styles.formContent}>
                            {/* Sección Información General */}
                            <div className={styles.section}>
                                <h5>Información General</h5>
                                <div className={styles.row}>
                                    <div className={styles.col}>
                                        <TextFieldValue 
                                            label="Nombre:" 
                                            name="nombre" 
                                            type="text" 
                                            placeholder="Nombre de la sucursal" 
                                        />
                                    </div>
                                </div>

                                <div className={styles.row}>
                                    <div className={styles.col}>
                                        <TextFieldValue 
                                            label="Horario Apertura:" 
                                            name="horarioApertura" 
                                            type="time" 
                                            placeholder="Horario de apertura" 
                                        />
                                    </div>
                                    <div className={styles.col}>
                                        <TextFieldValue 
                                            label="Horario Cierre:" 
                                            name="horarioCierre" 
                                            type="time" 
                                            placeholder="Horario de cierre" 
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Sección Ubicación */}
                            <div className={styles.section}>
                                <h5>Ubicación</h5>
                                <div className={styles.row}>
                                    <div className={styles.col}>
                                        <div className={styles.formGroup}>
                                            <label>País:</label>
                                            <select 
                                                className="form-control"
                                                name="paisId" 
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.paisId}
                                                disabled={paisesLoading}
                                            >
                                                <option value="">Seleccione un país</option>
                                                {!paisesError && paises.map(pais => (
                                                    <option key={pais.id} value={pais.id}>{pais.nombre}</option>
                                                ))}
                                            </select>
                                            {touched.paisId && errors.paisId && (
                                                <div className="error-message">{errors.paisId}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.row}>
                                    <div className={styles.col}>
                                        <TextFieldValue label="Provincia:" name="provincia" type="text" placeholder="Provincia" />
                                    </div>
                                    <div className={styles.col}>
                                        <TextFieldValue label="Localidad:" name="localidad" type="text" placeholder="Localidad" />
                                    </div>
                                </div>

                                <div className={styles.row}>
                                    <div className={styles.col}>
                                        <TextFieldValue label="Calle:" name="calle" type="text" placeholder="Nombre de la calle" />
                                    </div>
                                    <div className={styles.col}>
                                        <TextFieldValue label="Número:" name="numero" type="text" placeholder="Número" />
                                    </div>
                                </div>

                                <div className={styles.row}>
                                    <div className={styles.col}>
                                        <TextFieldValue label="Código Postal:" name="cp" type="text" placeholder="Código postal" />
                                    </div>
                                    <div className={styles.col}>
                                        <TextFieldValue label="Piso:" name="piso" type="text" placeholder="Piso" />
                                    </div>
                                    <div className={styles.col}>
                                        <TextFieldValue label="Departamento:" name="nroDpto" type="text" placeholder="Número de departamento" />
                                    </div>
                                </div>

                                <div className={styles.row}>
                                    <div className={styles.col}>
                                        <TextFieldValue label="Latitud:" name="latitud" type="text" placeholder="Latitud" />
                                    </div>
                                    <div className={styles.col}>
                                        <TextFieldValue label="Longitud:" name="longitud" type="text" placeholder="Longitud" />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.buttons}>
                                <Button variant="success" type="submit">
                                    Confirmar
                                </Button>
                                <Button variant="secondary" onClick={onClose}>
                                    Cancelar
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default BranchModal;