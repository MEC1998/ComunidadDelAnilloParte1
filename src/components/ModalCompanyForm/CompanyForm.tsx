import React, { useState } from "react";
import styles from "./CompanyForm.module.css";
import { IEmpresa } from "../../types/dtos/empresa/IEmpresa";


interface CompanyFormProps {
  onAddCompany: (company: IEmpresa) => void;
  onClose: () => void;
  editingCompany?: IEmpresa | null;
}

export const CompanyForm: React.FC<CompanyFormProps> = ({ 
  onAddCompany, 
  onClose, 
  editingCompany 
}) => {
  const [nombre, setNombre] = useState(editingCompany?.nombre || "");
  const [razonSocial, setRazonSocial] = useState(editingCompany?.razonSocial || "");
  const [cuit, setCuit] = useState(editingCompany?.cuit?.toString() || "");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    editingCompany?.logo || null
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nombre.trim() && razonSocial.trim() && cuit.trim()) {
      let logoUrl: string | null = previewImage;
      
      if (image) {
        const reader = new FileReader();
        logoUrl = await new Promise<string>((resolve) => {
          reader.onloadend = () => {
            if (typeof reader.result === 'string') {
              resolve(reader.result);
            } else {
              resolve('');
            }
          };
          reader.readAsDataURL(image);
        });
      }

      onAddCompany({
        id: editingCompany?.id || Math.floor(Math.random() * 1000), // Generamos un ID temporal
        nombre,
        razonSocial,
        cuit: parseInt(cuit),
        logo: logoUrl,
        sucursales: editingCompany?.sucursales || [],
        pais: editingCompany?.pais || { id: 1, nombre: 'Argentina' } // Valor por defecto
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>{editingCompany ? `Editar ${editingCompany.nombre}` : 'Crear empresa'}</h2>
        <form onSubmit={handleSubmit} className={styles.formContent}>
          <input
            type="text"
            placeholder="Nombre de la empresa"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="text"
            placeholder="Razón Social"
            value={razonSocial}
            onChange={(e) => setRazonSocial(e.target.value)}
          />
          <input
            type="text"
            placeholder="CUIT"
            value={cuit}
            onChange={(e) => setCuit(e.target.value)}
          />
          <input
            type="file"
            onChange={handleImageChange}
          />
          {previewImage && (
            <div className={styles.imagePreview}>
              <img 
                src={previewImage} 
                alt="Preview" 
                style={{ maxWidth: '200px', marginTop: '10px' }}
              />
            </div>
          )}
          <div className={styles.buttons}>
            <button type="submit">
              {editingCompany ? 'Guardar cambios' : 'Confirmar'}
            </button>
            <button type="button" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};
