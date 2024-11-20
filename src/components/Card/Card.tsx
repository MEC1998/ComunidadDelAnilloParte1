import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { setSelectedBranch } from "../../redux/slices/selectedBranchSlice";
import styles from "./Card.module.css"
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";
import { useState } from "react";
import { BranchInfoModal } from "../ui/modals/BranchInfoModal/BranchInfoModal";

interface CardProps {
  branchName: string;
  companyName: string;
  openingHours: string;
  image: string | null;
  branchData: ISucursal;
}

export const Card = ({ branchName, companyName, openingHours, image, branchData }: CardProps) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [showBranchInfo, setShowBranchInfo] = useState(false);

    const handleApartmentClick = () => {
        dispatch(setSelectedBranch(branchData));
        navigate(`/dashboard/${branchData.empresa.id}/${branchData.id}/productos`); // Cambia esto según la estructura de tu objeto
    };

    const handleVisibilityClick = () => {
        setShowBranchInfo(true);
    };

    return (
        <div className={styles.card}>
            <div className={styles.cardTitle}>{branchName}</div>
            <p className={styles.cardDescription}>{companyName}</p>
            <span className={styles.cardTime}>{openingHours}</span>
            {image && <img className={styles.cardImg} src={image} alt={branchName} />}

            <div className={styles.cardButtons}>
                <button className={styles.cardButton} onClick={handleApartmentClick}>
                    <span className="material-symbols-outlined">apartment</span>
                </button>
                <button className={styles.cardButton}>
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
        </div>
    );
};
