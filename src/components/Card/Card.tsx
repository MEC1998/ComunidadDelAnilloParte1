import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/redux";
import { setSelectedBranch } from "../../redux/slices/selectedBranchSlice";
import styles from "./Card.module.css"
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";

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

    const handleApartmentClick = () => {
        dispatch(setSelectedBranch(branchData));
        navigate("/productos");
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
                <button className={styles.cardButton}>
                    <span className="material-symbols-outlined">visibility</span>
                </button>
            </div>
        </div>
    );
};
