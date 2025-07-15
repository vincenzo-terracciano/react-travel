import { Link, useParams } from "react-router-dom"
import { useGlobalContext } from "../context/GlobalContext";
import { useEffect } from "react";
import Loader from "../components/Loader";

export default function TravelDetails() {

    const { id } = useParams();
    const { selectedTravel, setSelectedTravel, fetchTravelById, getTravelDuration, loading } = useGlobalContext();

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
        duration_days,
        cover_image,
        tags,
        itinerary_steps,
        packing_items,
        places,
        photos
    } = selectedTravel;

    return (
        <>
            <div className="container py-5">
                <Link to="/travels" className="custom-btn mb-4">
                    <i class="fas fa-arrow-left me-1"></i> Torna ai viaggi
                </Link>

                <div className="card border-0 shadow travel-card mt-4">
                    <img src={cover_image} alt={title} className="card-img-top detail-img" />

                    <div className="card-body">
                        <h2 className="fw-bold">{title}</h2>
                        <p className="text-muted mb-3">{destination_city}, {destination_country}</p>

                        <span className="category-badge mb-3 d-inline-block">
                            <i className={`${category.icon} me-2`}></i>{category?.name}
                        </span>

                        <p className="text-muted mb-3">
                            <strong>Durata:</strong> {getTravelDuration(selectedTravel.departure_date, selectedTravel.return_date)} giorni<br />
                            <strong>Dal:</strong> {departure_date} <strong>al:</strong> {return_date}
                        </p>

                        {tags?.length > 0 && (
                            <div className="mb-3">
                                {tags.map(tag => (
                                    <span key={tag.id} className="category-badge me-2" style={{ backgroundColor: tag.color, color: "#fff" }}>{tag.name}</span>
                                ))}
                            </div>
                        )}

                        <p className="lead">{description}</p>

                        <div className="mt-4 mb-4 d-flex gap-3 flex-wrap">
                            <Link to="itinerary" className="btn btn-outline-primary">🗺️ Itinerario</Link>
                            <Link to="places" className="btn btn-outline-success">📍 Luoghi</Link>
                            <Link to="packing" className="btn btn-outline-warning">🎒 Valigia</Link>
                            <Link to="gallery" className="btn btn-outline-info">📸 Galleria</Link>
                        </div>


                    </div>
                </div>
            </div>
            );
        </>
    )
}