// src/ui/ListBranches/ListBranches.tsx
import { Branch } from "../../../types/Branch";
import styles from "./ListBranches.module.css";

interface ListBranchesProps {
  branches: Branch[];
}

export const ListBranches = ({ branches }: ListBranchesProps) => {
  return (
    <div className={styles.branchesContainer}>
      {branches.map((branch, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.cardTitle}>{branch.name}</div>
          <p className={styles.cardDescription}>Nombre de la empresa: {branch.companyName}</p>
          <span className={styles.cardTime}>{branch.openingTime} - {branch.closingTime}</span>
          {branch.image && branch.image instanceof File && (
            <img
              className={styles.cardImg}
              src={URL.createObjectURL(branch.image)} 
              alt={branch.name} 
            />
          )}
          <div className={styles.cardButtons}>
            <button className={styles.cardButton}>
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
      ))}
    </div>
  );
};
