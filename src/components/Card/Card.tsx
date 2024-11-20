import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { setSelectedBranch } from "../../redux/slices/selectedBranchSlice";
import styles from "./Card.module.css"
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import { useState } from "react";
import { BranchInfoModal } from "../ui/modals/BranchInfoModal/BranchInfoModal";
import BranchModal from "../ui/modals/BranchModal/BranchModal";
import { SucursalService } from "../../services/dtos/SucursalService";

interface CardProps {
    branchName: string;
    companyName: string;
    openingHours: string;
    image: string | null;
    branchData: ISucursal;
}

const sucursalService = new SucursalService();

export const Card = ({ branchName, companyName, openingHours, image, branchData }: CardProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [showBranchInfo, setShowBranchInfo] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleApartmentClick = () => {
        dispatch(setSelectedBranch(branchData));
        navigate(`/dashboard/${branchData.empresa.id}/${branchData.id}/productos`); // Cambia esto según la estructura de tu objeto
    };

    const handleVisibilityClick = () => {
        setShowBranchInfo(true);
    };

    const handleEditClick = () => {
        setShowEditModal(true);
    };

    const handleConfirmEdit = async (updatedBranch: Partial<ISucursal>) => {
        try {
            await sucursalService.updateSucursal(branchData.id, {
                nombre: updatedBranch.nombre || branchData.nombre,
                id: branchData.id,
                idEmpresa: branchData.empresa.id,
                eliminado: branchData.eliminado,
                domicilio: {
                    ...updatedBranch.domicilio,
                    id: branchData.domicilio.id,
                    calle: updatedBranch.domicilio?.calle || branchData.domicilio.calle,
                    numero: updatedBranch.domicilio?.numero || branchData.domicilio.numero,
                    cp: updatedBranch.domicilio?.cp || branchData.domicilio.cp,
                    piso: updatedBranch.domicilio?.piso || branchData.domicilio.piso,
                    nroDpto: updatedBranch.domicilio?.nroDpto || branchData.domicilio.nroDpto,
                    idLocalidad: branchData.domicilio.localidad.id,
                },
                categorias: branchData.categorias,
                latitud: updatedBranch.latitud || branchData.latitud,
                longitud: updatedBranch.longitud || branchData.longitud,
                logo: updatedBranch.logo !== undefined ? updatedBranch.logo : branchData.logo ?? null,
                esCasaMatriz: updatedBranch.esCasaMatriz || branchData.esCasaMatriz,
                horarioApertura: updatedBranch.horarioApertura || branchData.horarioApertura,
                horarioCierre: updatedBranch.horarioCierre || branchData.horarioCierre,
            });
            console.log("Sucursal actualizada:", updatedBranch);
        } catch (error) {
            console.error("Error al actualizar la sucursal:", error);
        } finally {
            setShowEditModal(false);
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardTitle}>{branchName}</div>
            <p className={styles.cardDescription}>{companyName}</p>
            <span className={styles.cardTime}>{openingHours}</span>
            <div className={styles.cardImgContainer}>
                {image && <img className={styles.cardImg} src={image} alt={branchName} />}

            </div>

            <div className={styles.cardButtons}>
                <button className={styles.cardButton} onClick={handleApartmentClick}>
                    <span className="material-symbols-outlined">apartment</span>
                </button>
                <button className={styles.cardButton} onClick={handleEditClick}>
                    <span className="material-symbols-outlined">edit</span>
                </button>
                <button className={styles.cardButton} onClick={handleVisibilityClick}>
                    <span className="material-symbols-outlined">visibility</span>
                </button>
            </div>
            <BranchInfoModal
                show={showBranchInfo}
                onClose={() => setShowBranchInfo(false)}
                branch={branchData}
            />
            {showEditModal && (
                <BranchModal
                    onClose={() => setShowEditModal(false)}
                    onConfirm={handleConfirmEdit}
                    initialData={branchData}
                />
            )}
        </div>
    );
};
