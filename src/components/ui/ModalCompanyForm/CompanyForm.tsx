import React, { useState } from "react";
import styles from "./CompanyForm.module.css";

interface CompanyFormProps {
  onAddCompany: (company: { name: string; reason: string; cuit: string; image: File | null }) => void;
  onClose: () => void;
}

export const CompanyForm: React.FC<CompanyFormProps> = ({ onAddCompany, onClose }) => {
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [cuit, setCuit] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && reason.trim() && cuit.trim()) {
      onAddCompany({ name, reason, cuit, image });
      setName("");
      setReason("");
      setCuit("");
      setImage(null);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>CREAR UNA EMPRESA</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre de la empresa"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Razón Social"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <input
            type="text"
            placeholder="CUIT"
            value={cuit}
            onChange={(e) => setCuit(e.target.value)}
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
          />
          <div className={styles.buttons}>
            <button type="submit">Confirmar</button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
