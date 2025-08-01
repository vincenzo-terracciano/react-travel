import { useGlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import { useState } from "react";

// Importo i componenti di React Leaflet per creare la mappa con marker
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// Importa icone e stili necessari per la mappa
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Importo le immagini marker
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Creo un'icona personalizzata per i marker Leaflet
const customMarkerIcon = new L.Icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

export default function Places() {

    const { selectedTravel } = useGlobalContext();
    const [selectedImage, setSelectedImage] = useState(null);

    // recupero i luoghi associta al viaggio
    const places = selectedTravel?.places || [];

    // Se non ci sono luoghi, mostro il messaggio
    if (!places.length) {
        return (
            <div className="container py-5">
                <h4>Nessun luogo disponibile per questo viaggio.</h4>
                <Link to=".." className="custom-btn mt-3"><i className="fas fa-arrow-left me-1"></i> Torna indietro</Link>
            </div>
        );
    }

    // Se disponibile mostro la latitudine o la longitudine del primo luogo, altrimenti mostro le coordinate di Napoli di default
    const mapCenter = [
        parseFloat(places[0]?.latitude) || 40.827831,
        parseFloat(places[0]?.longitude) || 14.192911,
    ];

    return (
        <>
            <div className="container py-5">
                <h2 className="mb-4 fw-bold">Luoghi da visitare</h2>

                <div className="row g-4">
                    {/* Card dei luoghi */}
                    {places.map(place => (
                        <div className="col-md-6 col-lg-4" key={place.id}>
                            <div className="card place-card h-100 shadow-sm rounded d-flex flex-column">
                                {place.image && (
                                    /* Immagine cliccabile che apre una modale */
                                    <img src={`http://localhost:8000/storage/${place.image}`}
                                        alt={place.name}
                                        className="place-img card-img-top"
                                        onClick={() => setSelectedImage(`http://localhost:8000/storage/${place.image}`)} />
                                )}
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{place.name}</h5>
                                    <p className="category-badge activity-type mb-3 align-self-start">
                                        {place.type}
                                    </p>
                                    <p className="card-text flex-grow-1">{place.description}</p>

                                    {/* Se sono presenti, mostro il link della coordinate su Google Maps */}
                                    {place.latitude && place.longitude && (
                                        <a
                                            href={`https://www.google.com/maps?q=${place.latitude},${place.longitude}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-outline-primary mt-2 align-self-start">
                                            <i className="fas fa-map-marker-alt me-1"></i> Apri in Google Maps
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mappa dei luoghi */}
                <h3 className="mt-5 mb-3">Mappa dei luoghi</h3>
                <MapContainer
                    /* Mostro una mappa centrata sul primo luogo con zoom */
                    center={mapCenter}
                    zoom={10}
                    scrollWheelZoom={false}
                    style={{ height: "400px", width: "100%" }}>

                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' />

                    {/* Per ogni luogo con coordinate valide mostro un marker */}
                    {places.map((place) =>
                        place.latitude && place.longitude ? (
                            <Marker
                                key={place.id}
                                position={[parseFloat(place.latitude), parseFloat(place.longitude)]}
                                icon={customMarkerIcon}>

                                {/* Il marker contiene la foto, il nome, il tipo e il link Google Maps del luogo */}
                                <Popup>
                                    <div style={{ textAlign: "center" }}>
                                        {place.image && (
                                            <img
                                                src={`http://localhost:8000/storage/${place.image}`}
                                                alt={place.name}
                                                style={{ width: "100%", height: "auto", borderRadius: "0.5rem", marginBottom: "0.5rem" }}
                                            />
                                        )}
                                        <strong>{place.name}</strong>
                                        <br />
                                        <small className="text-muted">{place.type}</small>
                                        <br />
                                        <a
                                            href={`https://www.google.com/maps?q=${place.latitude},${place.longitude}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-sm btn-outline-primary mt-2">
                                            Apri in Google Maps
                                        </a>
                                    </div>
                                </Popup>
                            </Marker>
                        ) : null
                    )}
                </MapContainer>

                {/* Modale foto */}
                <div
                    className={`modal fade ${selectedImage ? "show d-block" : ""}`}
                    tabIndex="-1"
                    onClick={() => setSelectedImage(null)}>

                    {/* Se clicco sulla foto, la mostro in una modale full-screen */}
                    <div
                        className="modal-dialog modal-dialog-centered modal-lg"
                        onClick={(e) => e.stopPropagation()}>

                        {/* Se clicco sul pulsante X o fuori dalla foto la modale si chiude */}
                        <div className="modal-content">
                            <div className="modal-header border-0">
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setSelectedImage(null)}
                                ></button>
                            </div>
                            <div className="modal-body text-center">
                                {selectedImage && (
                                    <img
                                        src={selectedImage}
                                        alt="Place"
                                        className="img-fluid rounded"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}