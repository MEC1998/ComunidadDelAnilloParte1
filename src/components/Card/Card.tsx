import styles from "./Card.module.css"

export const Card = () => {
    return (
        <div className={styles.card}>
            <div className={styles.cardTitle}>Titulo</div>
            <p className={styles.cardDescription}>Descripcion</p>
            <span className={styles.cardTime}>20:30hs - 01:00hs</span>
            <img className={styles.cardImg} src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/cd/d3/e5/comfortable-seating.jpg?w=1200&h=-1&s=1" alt="" />

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
