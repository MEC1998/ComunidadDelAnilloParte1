
export const Card = () => {
    return (
        <div className="card">
            <div className="cardTitle">Titulo</div>
            <p className="cardDescription">Descripcion</p>
            <span className="cardTime">20:30hs - 01:00hs</span>
            <img className="cardImg" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/cd/d3/e5/comfortable-seating.jpg?w=1200&h=-1&s=1" alt="" />

            <div className="cardButtons">
                <button className="cardButton">
                    <span className="material-symbols-outlined">apartment</span>
                </button>
                <button className="cardButton">
                    <span className="material-symbols-outlined">edit</span> {/* Cambia "edit" por el icono que necesites */}
                </button>
                <button className="cardButton">
                    <span className="material-symbols-outlined">visibility</span>
                </button>
            </div>
        </div>
    );
};
