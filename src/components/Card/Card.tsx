import styles from "./Card.module.css"

interface CardProps {
  branchName: string;
  companyName: string;
  openingHours: string;
  image: string | null;
}

export const Card = ({ branchName, companyName, openingHours, image }: CardProps) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardTitle}>{branchName}</div>
            <p className={styles.cardDescription}>{companyName}</p>
            <span className={styles.cardTime}>{openingHours}</span>
            {image && <img className={styles.cardImg} src={image} alt={branchName} />}

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
    );
};
