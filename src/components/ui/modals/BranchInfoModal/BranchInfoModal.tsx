import React from "react";
import { Button } from "react-bootstrap";
import { ISucursal } from "../../../../types/dtos/sucursal/ISucursal";
import styles from "./BranchInfoModal.module.css";

interface BranchInfoModalProps {
  show: boolean;
  onClose: () => void;
  branch: ISucursal | null;
}

export const BranchInfoModal: React.FC<BranchInfoModalProps> = ({
  show,
  onClose,
  branch,
}) => {
  if (!show || !branch) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Información de la Sucursal</h2>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.infoContainer}>
            <div className={styles.infoBlock}>
              <h5>Información General:</h5>
              <p>
                <strong>Nombre:</strong> {branch.nombre} <br />
                <strong>Empresa:</strong> {branch.empresa.nombre} <br />
                <strong>Horario:</strong> {branch.horarioApertura} a {branch.horarioCierre}
              </p>
              <h5>Ubicación:</h5>
              <p>
                <strong>País:</strong> {branch.domicilio.localidad.provincia.pais.nombre}, 
                <strong> Provincia:</strong> {branch.domicilio.localidad.provincia.nombre}, 
                <strong> Localidad:</strong> {branch.domicilio.localidad.nombre}
              </p>
              <p>
                <strong>Calle:</strong> {branch.domicilio.calle}, 
                <strong> Número:</strong> {branch.domicilio.numero}, 
                <strong> Piso:</strong> {branch.domicilio.piso}, 
                <strong> Nro Dpto:</strong> {branch.domicilio.nroDpto}
              </p>
              <p>
                <strong>Sucursal Principal:</strong> {branch.esCasaMatriz ? "Sí" : "No"}, 
                <strong> Código Postal:</strong> {branch.domicilio.cp}, 
                <strong> Latitud, Longitud:</strong> {branch.latitud}, {branch.longitud}
              </p>
            </div>
            {branch.logo && (
              <div className={styles.logoBlock}>
                <img src={branch.logo} alt="Logo de la sucursal" className={styles.branchLogo} />
              </div>
            )}
          </div>
        </div>
        <div className={styles.modalFooter}>
          <Button variant="secondary" onClick={onClose}>Cerrar</Button>
        </div>
      </div>
    </div>
  );
}; 