import React from "react";
import { Button } from "react-bootstrap";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextFieldValue from "../../TextFildValue/TextFildValue";
import styles from "./ModalCompanyForm.module.css";
import { ICreateEmpresaDto } from "../../../../types/dtos/empresa/ICreateEmpresaDto";
import { IUpdateEmpresaDto } from "../../../../types/dtos/empresa/IUpdateEmpresaDto";

interface CompanyFormProps {
  onAddCompany: (company: ICreateEmpresaDto) => Promise<void>;
  onEditCompany?: (company: IUpdateEmpresaDto) => Promise<void>;
  onClose: () => void;
  editingCompany: IUpdateEmpresaDto | null;
}

export const ModalCompanyForm: React.FC<CompanyFormProps> = ({
  onAddCompany,
  onEditCompany,
  onClose,
  editingCompany,
}) => {
  const initialValues: ICreateEmpresaDto = {
    nombre: editingCompany?.nombre || "",
    razonSocial: editingCompany?.razonSocial || "",
    cuit: editingCompany?.cuit || 0,
    logo: editingCompany?.logo || "",
  };

  const handleSubmit = async (values: ICreateEmpresaDto) => {
    if (editingCompany && onEditCompany) {
      await onEditCompany({ ...editingCompany, ...values });
    } else if (onAddCompany) {
      await onAddCompany(values);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.ModalHeader}>
          <h2 className={styles.modalTitle}>
            {editingCompany ? `Editar ${editingCompany.nombre}` : "CREAR UNA EMPRESA"}
          </h2>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            nombre: Yup.string().required("Campo requerido"),
            razonSocial: Yup.string().required("Campo requerido"),
            cuit: Yup.number().required("Campo requerido"),
            logo: Yup.string().url("Debe ser una URL válida").required("Campo requerido"),
          })}
          onSubmit={handleSubmit}
        >
          <Form className={styles.formContent}>
            <TextFieldValue name="nombre" type="text" placeholder="Nombre de la empresa" />
            <TextFieldValue name="razonSocial" type="text" placeholder="Razón Social" />
            <TextFieldValue name="cuit" type="number" placeholder="CUIT" />
            <TextFieldValue name="logo" type="text" placeholder="URL del logo" />
            <div className={styles.buttons}>
              <Button variant="success" type="submit">
                {editingCompany ? "Guardar cambios" : "Confirmar"}
              </Button>
              <Button className={styles.cancelButton} type="button" onClick={onClose}>
                Cancelar
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
