import React from "react";
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
        <h2 className={styles.modalTitle}>Información de la Sucursal</h2>
        
        <div className={styles.infoContainer}>
          <div className={styles.infoBlock}>
            <div className={styles.infoGroup}>
              <h3 className={styles.infoLabel}>Información General</h3>
              <div className={styles.infoValue}>
                <p><strong>Nombre:</strong> {branch.nombre}</p>
                <p><strong>Empresa:</strong> {branch.empresa.nombre}</p>
                <p><strong>Horario:</strong> {branch.horarioApertura} a {branch.horarioCierre}</p>
              </div>
            </div>

            <div className={styles.infoGroup}>
              <h3 className={styles.infoLabel}>Ubicación</h3>
              <div className={styles.infoValue}>
                <p><strong>País:</strong> {branch.domicilio.localidad.provincia.pais.nombre}</p>
                <p><strong>Provincia:</strong> {branch.domicilio.localidad.provincia.nombre}</p>
                <p><strong>Localidad:</strong> {branch.domicilio.localidad.nombre}</p>
                <p><strong>Dirección:</strong> {branch.domicilio.calle} {branch.domicilio.numero}, Piso {branch.domicilio.piso}, Dpto {branch.domicilio.nroDpto}</p>
                <p><strong>Código Postal:</strong> {branch.domicilio.cp}</p>
                <p><strong>Coordenadas:</strong> {branch.latitud}, {branch.longitud}</p>
              </div>
            </div>
          </div>

          <div className={styles.logoBlock}>
            <img src={branch.logo} alt="Sucursal" className={styles.branchLogo} />
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={styles.closeButton} onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}; 