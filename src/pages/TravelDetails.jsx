import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import { useGlobalContext } from "../context/GlobalContext";
import { useEffect } from "react";
import Loader from "../components/Loader";

const baseURL = 'http://localhost:8000/storage/';

export default function TravelDetails() {

    const { id } = useParams();
    const { travels, selectedTravel, fetchTravelById, getTravelDuration, loading, wishlist, setWishlist, toggleWishlist } = useGlobalContext();

    // hook per cambiare pagina
    const navigate = useNavigate();

    // hook per controllare la sezione attuale
    const location = useLocation();

    // funzione per gestire i toggle delle sezioni in basso
    function handleToggleSection(section) {

        // se il percorso attuale della pagina termina con una delle sezioni selezionate
        if (location.pathname.endsWith(`/${section}`)) {

            // torna indietro non visualizzando la sezione (se il toggle è già aperto)
            navigate(`/travels/${id}`);
        } else {

            // altrimenti entra e naviga nella sezione
            navigate(section);

            // Scroll leggermente verso il basso
            setTimeout(() => {
                window.scrollTo({
                    top: window.scrollY + 250,
                    behavior: "smooth"
                });
            }, 200);
        }
    };

    // Quando cambia l’id, recupero i dati del viaggio corrispondente da Laravel
    useEffect(() => {
        fetchTravelById(id);
        window.scrollTo({ top: 0 });
    }, [id])

    /* Loader */
    if (loading || !selectedTravel) {
        return <Loader />;
    }

    const {
        title,
        description,
        destination_city,
        destination_country,
        category,
        departure_date,
        return_date,
        cover_image,
        tags,
    } = selectedTravel;

    return (
        <>
            <div className="container py-5 no-hover">
                <Link to="/travels" className="custom-btn mb-4">
                    <i className="fas fa-arrow-left me-1"></i> Torna ai viaggi
                </Link>

                <div className="card border-0 travel-card mt-4 position-relative">

                    <div className="wishlist-icon" onClick={() => toggleWishlist(selectedTravel.id)}>

                        {/* Mostra il cuore pieno o vuoto in base alla presenza del viaggio nei preferiti */}
                        <i className={wishlist.includes(selectedTravel.id) ? "fas fa-heart text-danger" : "far fa-heart"}></i>
                    </div>

                    <img src={baseURL + cover_image} alt={title} className="card-img-top detail-img" />

                    <div className="card-body">
                        <h2 className="fw-bold">{title}</h2>
                        <p className="text-muted mb-3">{destination_city}, {destination_country}</p>

                        {/* Badge categoria cliccabile */}
                        <Link to="/travels" state={{ selectedCategory: category?.name }} className="category-badge category-badge-clickable mb-3 d-inline-block text-decoration-none">
                            <i className={`${category.icon} me-2`}></i>{category?.name}
                        </Link>

                        <p className="text-muted mb-3">
                            <strong>Durata:</strong> {getTravelDuration(selectedTravel.departure_date, selectedTravel.return_date)} giorni<br />
                            <strong>Dal:</strong> {new Date(departure_date).toLocaleDateString('it-IT')} <strong>al:</strong> {new Date(return_date).toLocaleDateString('it-IT')}
                        </p>

                        {tags?.length > 0 && (
                            <div className="mb-3">
                                {tags.map(tag => (
                                    <span key={tag.id} className="category-badge me-2" style={{ backgroundColor: tag.color, color: "#fff" }}>{tag.name}</span>
                                ))}
                            </div>
                        )}

                        <p className="lead">{description}</p>

                        {/* Toggle */}
                        <div className="row row-cols-2 row-cols-md-4 g-3 mt-4">
                            <div className="col">
                                <div onClick={() => handleToggleSection("itinerary")} className="section-card text-decoration-none">
                                    <div className="card shadow-sm text-center p-3 h-100 hover-zoom">
                                        <i className="fas fa-map-marked-alt fa-2x mb-2 text-primary"></i>
                                        <h6 className="mb-0">Itinerario</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div onClick={() => handleToggleSection("places")} className="section-card text-decoration-none">
                                    <div className="card shadow-sm text-center p-3 h-100 hover-zoom">
                                        <i className="fas fa-map-pin fa-2x mb-2 text-danger"></i>
                                        <h6 className="mb-0">Luoghi</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div onClick={() => handleToggleSection("packing-items")} className="section-card text-decoration-none">
                                    <div className="card shadow-sm text-center p-3 h-100 hover-zoom">
                                        <i className="fas fa-suitcase-rolling fa-2x mb-2 text-warning"></i>
                                        <h6 className="mb-0">Valigia</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div onClick={() => handleToggleSection("photos")} className="section-card text-decoration-none">
                                    <div className="card shadow-sm text-center p-3 h-100 hover-zoom">
                                        <i className="fas fa-camera-retro fa-2x mb-2 text-info"></i>
                                        <h6 className="mb-0">Galleria</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Componente che fa da segnaposto per mostrare il contenuto delle sezioni */}
            <Outlet />
        </>
    )
}