import React from "react";
import { Modal, Button } from "react-bootstrap";
import { IEmpresa } from "../../../../types/dtos/empresa/IEmpresa";
import styles from "./CompanyInfoModal.module.css";

interface CompanyInfoModalProps {
  show: boolean;
  onClose: () => void;
  company: IEmpresa | null;
}

export const CompanyInfoModal: React.FC<CompanyInfoModalProps> = ({
  show,
  onClose,
  company,
}) => {
  if (!company) return null;

  return (
    <Modal show={show} onHide={onClose} size="lg" backdrop="static" keyboard={false}>
      <Modal.Header className={styles.modalHeader}>
        <Modal.Title className={styles.modalTitle}>Información de la Empresa</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <p><strong>Nombre:</strong> {company.nombre}</p>
        <p><strong>Razón Social:</strong> {company.razonSocial}</p>
        <p><strong>CUIT:</strong> {company.cuit}</p>
        {company.logo && <img src={company.logo} alt="Logo de la empresa" className={styles.companyLogo} />}
      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        <Button variant="secondary" onClick={onClose}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}; 