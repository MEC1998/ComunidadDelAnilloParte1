import React from "react";
import { Button, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { ICreateEmpresaDto } from "../../../../types/dtos/empresa/ICreateEmpresaDto";
import TextFieldValue from "../../TextFildValue/TextFildValue";
import styles from "./ModalCompanyForm.module.css";

interface CompanyFormProps {
  onAddCompany: (company: ICreateEmpresaDto) => void;
  onClose: () => void;
  editingCompany?: ICreateEmpresaDto | null;
}

export const ModalCompanyForm: React.FC<CompanyFormProps> = ({
  onAddCompany,
  onClose,
  editingCompany,
}) => {
  // Valores iniciales para el formulario
  const initialValues: ICreateEmpresaDto = {
    nombre: editingCompany?.nombre || "",
    razonSocial: editingCompany?.razonSocial || "",
    cuit: editingCompany?.cuit || 0,
    logo: editingCompany?.logo || "",
  };

  return (
    <Modal show={true} onHide={onClose} size={"lg"} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{editingCompany ? `Editar ${editingCompany.nombre}` : "Crear empresa"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            nombre: Yup.string().required("Campo requerido"),
            razonSocial: Yup.string().required("Campo requerido"),
            cuit: Yup.number().required("Campo requerido"),
            logo: Yup.string().url("Debe ser una URL válida").required("Campo requerido"),
          })}
          onSubmit={(values) => {
            onAddCompany(values);
            onClose();
          }}
        >
          {() => (
            <Form className={styles.formContent}>
              <TextFieldValue label="Nombre:" name="nombre" type="text" placeholder="Nombre de la empresa" />
              <TextFieldValue label="Razón Social:" name="razonSocial" type="text" placeholder="Razón Social" />
              <TextFieldValue label="CUIT:" name="cuit" type="number" placeholder="CUIT" />
              <TextFieldValue label="Logo URL:" name="logo" type="text" placeholder="URL del logo" />
              <div className={styles.buttons}>
                <Button variant="success" type="submit">
                  {editingCompany ? "Guardar cambios" : "Confirmar"}
                </Button>
                <Button variant="secondary" type="button" onClick={onClose}>
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
