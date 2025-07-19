import { Link, NavLink, Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import { useGlobalContext } from "../context/GlobalContext";
import { useEffect } from "react";
import Loader from "../components/Loader";

const baseURL = 'http://localhost:8000/storage/';

export default function TravelDetails() {

    const { id } = useParams();
    const { travels, selectedTravel, fetchTravelById, getTravelDuration, loading, wishlist, setWishlist } = useGlobalContext();

    const navigate = useNavigate();
    const location = useLocation();

    const travel = travels.find(travel => travel.id === parseInt(id));

    function toggleWishlist(id) {
        let updatedWishlist;
        if (wishlist.includes(id)) {
            updatedWishlist = wishlist.filter(item => item !== id);
        } else {
            updatedWishlist = [...wishlist, id];
        }
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    }

    // funzione per il toggle
    function handleToggleSection(section) {
        if (location.pathname.endsWith(`/${section}`)) {
            navigate(`/travels/${id}`); // torna indietro se sei già dentro
        } else {
            navigate(section); // altrimenti entra
        }
    };

    useEffect(() => {
        fetchTravelById(id);
        window.scrollTo({ top: 0 });
    }, [id])

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
                        <i className={wishlist.includes(selectedTravel.id) ? "fas fa-heart text-danger" : "far fa-heart"}></i>
                    </div>

                    <img src={baseURL + cover_image} alt={title} className="card-img-top detail-img" />

                    <div className="card-body">
                        <h2 className="fw-bold">{title}</h2>
                        <p className="text-muted mb-3">{destination_city}, {destination_country}</p>

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

            <Outlet />
        </>
    )
}