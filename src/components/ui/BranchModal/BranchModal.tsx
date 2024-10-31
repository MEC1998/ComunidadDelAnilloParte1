// src/components/ui/BranchModal/BranchModal.tsx

import React, { useState } from "react";
import styles from "./BranchModal.module.css";

interface BranchModalProps {
    onClose: () => void;
    onConfirm: (data: any) => void; // Puedes definir una interfaz más específica para 'data'
}

const BranchModal: React.FC<BranchModalProps> = ({ onClose, onConfirm }) => {
    const [formData, setFormData] = useState({
        name: "",
        openingHour: "",
        closingHour: "",
        country: "",
        province: "",
        locality: "",
        longitude: "",
        streetName: "",
        streetNumber: "",
        postalCode: "",
        apartmentNumber: "",
        isEnabled: false,
        image: null as File | null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked; // Asegúrate de que sea un HTMLInputElement
            setFormData((prev) => ({
                ...prev,
                [name]: checked, // Solo asigna checked si es un checkbox
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value, // Para otros tipos, asigna el valor
            }));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Usa la cadena opcional para acceder a la posición 0
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
        }
    };

    const handleSubmit = () => {
        onConfirm(formData);
        onClose();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>Agregar Sucursal</h2>
                <form className={styles.form}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Ingrese un nombre"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="openingHour"
                        placeholder="Ingrese horario de apertura"
                        value={formData.openingHour}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="closingHour"
                        placeholder="Ingrese horario de cierre"
                        value={formData.closingHour}
                        onChange={handleChange}
                    />
                    <select name="country" value={formData.country} onChange={handleChange}>
                        <option value="">Seleccione un país</option>
                        {/* Agrega las opciones de países aquí */}
                    </select>
                    <select name="province" value={formData.province} onChange={handleChange}>
                        <option value="">Seleccione una provincia</option>
                        {/* Agrega las opciones de provincias aquí */}
                    </select>
                    <select name="locality" value={formData.locality} onChange={handleChange}>
                        <option value="">Seleccione una localidad</option>
                        {/* Agrega las opciones de localidades aquí */}
                    </select>
                    <input
                        type="text"
                        name="longitude"
                        placeholder="Longitud"
                        value={formData.longitude}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="streetName"
                        placeholder="Nombre de la calle"
                        value={formData.streetName}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="streetNumber"
                        placeholder="Número de la calle"
                        value={formData.streetNumber}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="postalCode"
                        placeholder="Código postal"
                        value={formData.postalCode}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="apartmentNumber"
                        placeholder="Número de departamento"
                        value={formData.apartmentNumber}
                        onChange={handleChange}
                    />
                    <label>
                        <input
                            type="checkbox"
                            name="isEnabled"
                            checked={formData.isEnabled}
                            onChange={handleChange}
                        />
                        Habilitar localidad
                    </label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </form>
                <div className={styles.buttonContainer}>
                    <button className={styles.cancelButton} onClick={onClose}>Cancelar</button>
                    <button className={styles.confirmButton} onClick={handleSubmit}>Confirmar</button>
                </div>
            </div>
        </div>
    );
};

export default BranchModal;
