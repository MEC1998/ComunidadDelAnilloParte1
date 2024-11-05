import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "./BranchModal.module.css";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import { IPais } from "../../types/IPais";


interface BranchModalProps {
    onClose: () => void;
    onConfirm: (data: Partial<ISucursal>) => void;
    initialData?: ISucursal;
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

const BranchModal: React.FC<BranchModalProps> = ({ onClose, onConfirm, initialData }) => {
    const [formData, setFormData] = useState({
        nombre: initialData?.nombre || "",
        horarioApertura: initialData?.horarioApertura || "",
        horarioCierre: initialData?.horarioCierre || "",
        paisId: initialData?.paisId || "ARG",
        provincia: initialData?.domicilio?.localidad?.provincia?.nombre || "",
        localidad: initialData?.domicilio?.localidad?.nombre || "",
        latitud: initialData?.latitud?.toString() || "",
        longitud: initialData?.longitud?.toString() || "",
        calle: initialData?.domicilio?.calle || "",
        numero: initialData?.domicilio?.numero?.toString() || "",
        cp: initialData?.domicilio?.cp?.toString() || "",
        piso: initialData?.domicilio?.piso?.toString() || "",
        nroDpto: initialData?.domicilio?.nroDpto?.toString() || "",
        esCasaMatriz: initialData?.esCasaMatriz || false,
        eliminado: initialData?.eliminado || false,
        logo: null as File | null,
    });

    const { 
        data: paises = [],
        isLoading: paisesLoading,
        error: paisesError 
    } = useQuery<IPais[]>({
        queryKey: ['paises'],
        queryFn: fetchPaises,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        if (name === "paisId") {
            setFormData(prev => ({
                ...prev,
                paisId: value,
                provincia: "",
                localidad: ""
            }));
        } else if (name === "provincia") {
            setFormData(prev => ({
                ...prev,
                provincia: value,
                localidad: ""
            }));
        } else if (name === "localidad") {
            setFormData(prev => ({
                ...prev,
                localidad: value,
            }));
        } else if (type === "checkbox") {
            setFormData(prev => ({
                ...prev,
                [name]: (e.target as HTMLInputElement).checked
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                logo: file
            }));
        }
    };

    const handleSubmit = () => {
        const submissionData: Partial<ISucursal> = {
            ...formData,
            latitud: formData.latitud ? parseFloat(formData.latitud) : undefined,
            longitud: formData.longitud ? parseFloat(formData.longitud) : undefined,
            logo: formData.logo ? URL.createObjectURL(formData.logo) : initialData?.logo
        };
        onConfirm(submissionData);
        onClose();
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>{initialData ? 'Editar sucursal' : 'Agregar sucursal'}</h2>
                <form className={styles.form}>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre de la sucursal"
                        value={formData.nombre}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="horarioApertura"
                        placeholder="Horario de apertura"
                        value={formData.horarioApertura}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="horarioCierre"
                        placeholder="Horario de cierre"
                        value={formData.horarioCierre}
                        onChange={handleChange}
                    />

                    <select 
                        name="paisId" 
                        value={formData.paisId} 
                        onChange={handleChange}
                        disabled={paisesLoading}
                    >
                        <option value="">Seleccione un país</option>
                        {paisesError ? (
                            <option disabled>Error al cargar países</option>
                        ) : (
                            paises.map(pais => (
                                <option key={pais.id} value={pais.id}>
                                    {pais.nombre}
                                </option>
                            ))
                        )}
                    </select>

                    <input
                        type="text"
                        name="provincia"
                        placeholder="Provincia"
                        value={formData.provincia}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="localidad"
                        placeholder="Localidad"
                        value={formData.localidad}
                        onChange={handleChange}
                    />

                    <input
                        type="text"
                        name="calle"
                        placeholder="Nombre de la calle"
                        value={formData.calle}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="numero"
                        placeholder="Número"
                        value={formData.numero}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="cp"
                        placeholder="Código postal"
                        value={formData.cp}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="piso"
                        placeholder="Piso"
                        value={formData.piso}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="nroDpto"
                        placeholder="Número de departamento"
                        value={formData.nroDpto}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="latitud"
                        placeholder="Latitud"
                        value={formData.latitud}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="longitud"
                        placeholder="Longitud"
                        value={formData.longitud}
                        onChange={handleChange}
                    />

                    <label className={styles.inputContainer}>
                        <input
                            type="checkbox"
                            name="esCasaMatriz"
                            checked={formData.esCasaMatriz}
                            onChange={handleChange}
                        />
                        Casa Matriz
                    </label>

                    <input
                        type="file"
                        name="logo"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </form>
                <div className={styles.buttonContainer}>
                    <button className={styles.cancelButton} onClick={onClose}>
                        Cancelar
                    </button>
                    <button className={styles.confirmButton} onClick={handleSubmit}>
                        Confirmar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BranchModal;