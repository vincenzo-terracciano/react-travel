import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import { useState } from "react";
import * as bootstrap from 'bootstrap';

export default function Photos() {

    const { selectedTravel } = useGlobalContext();

    // se esistono, recupero le foto del viaggio selezionato
    const photos = selectedTravel?.photos || [];
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    // funzione per aprire la modale
    function openModal(index) {

        // quando clicco su una foto, salvo l'indice della foto selezionata
        setSelectedPhoto(index);

        // creo una nuova istanza della modale Bootstrap e la mostro
        const modal = new bootstrap.Modal(document.getElementById("photoModal"));
        modal.show();
    }

    // funzione per chiudere la modale
    function closeModal() {
        setSelectedPhoto(null);
    }

    // funzione per mostrare la foto precedente
    function prevPhoto() {
        // mostro la foto precedente e quando arrivo alla prima, torno all'ultima
        setSelectedPhoto(prev => (prev > 0 ? prev - 1 : photos.length - 1));
    }

    // funzione per mostrare la foto successiva
    function nextPhoto() {
        // mostro la foto successiva e quando arrivo all'ultima, torno alla prima
        setSelectedPhoto(prev => (prev < photos.length - 1 ? prev + 1 : 0));
    }

    // Se non ci sono foto mostro un messaggio
    if (!photos.length) {
        return (
            <div className="container py-5">
                <h4>Galleria foto ancora non disponibile per questo viaggio</h4>

                <Link to=".." className="custom-btn mt-3">
                    <i className="fas fa-arrow-left me-1"></i> Torna indietro
                </Link>
            </div>
        )
    }

    return (
        <>
            <div className="container py-5">
                <h2 className="mb-4 fw-bold">Galleria fotografica</h2>

                <div className="row g-3">
                    {photos.map((photo, index) => (
                        <div className="col-6 col-md-4 col-lg-3" key={photo.id}>

                            {/* Quando clicco sulla foto si apre la modale */}
                            <img
                                src={`http://localhost:8000/storage/${photo.image}`}
                                alt={photo.caption}
                                className="img-fluid photo-tile"
                                onClick={() => openModal(index)}
                                role="button"
                            />
                        </div>
                    ))}
                </div>

                {/* Modal Bootstrap */}
                <div
                    className="modal fade"
                    id="photoModal"
                    tabIndex="-1"
                    aria-labelledby="photoModalLabel"
                    aria-hidden="true">

                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-body">

                                {/* Se c'è una foto selezionata allora la mostro all'apertura della modale */}
                                {selectedPhoto !== null && (
                                    <>
                                        {/* Foto */}
                                        <img
                                            src={`http://localhost:8000/storage/${photos[selectedPhoto].image}`}
                                            alt={photos[selectedPhoto].caption}
                                        />

                                        {/* Frecce laterali per navigare tra le foto */}
                                        <button className="modal-nav-btn left" onClick={prevPhoto}>
                                            <i className="fas fa-chevron-left"></i>
                                        </button>
                                        <button className="modal-nav-btn right" onClick={nextPhoto}>
                                            <i className="fas fa-chevron-right"></i>
                                        </button>

                                        {/* Caption */}
                                        <div className="modal-caption">{photos[selectedPhoto].caption}</div>

                                        {/* Pulsante per chiudere la modale */}
                                        <button
                                            type="button"
                                            className="modal-close-btn"
                                            data-bs-dismiss="modal"
                                            onClick={closeModal}
                                            aria-label="Chiudi"
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}