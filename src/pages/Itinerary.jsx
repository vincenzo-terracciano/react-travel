import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext"

// funzione per formattare l'orario
function formatTime(time) {
    if (!time) return '';

    const [hour, minute] = time.split(":");
    return `${hour}:${minute}`;
}

function sortItinerarySteps(steps) {
    return [...steps].sort((a, b) => {
        // Prima per giorno
        if (a.day_number !== b.day_number) {
            return a.day_number - b.day_number;
        }
        // Poi per orario (se presente)
        if (a.estimated_time && b.estimated_time) {
            return a.estimated_time.localeCompare(b.estimated_time);
        }
        return 0;
    });
}


export default function Itinerary() {

    const { selectedTravel } = useGlobalContext();

    if (!selectedTravel?.itinerary_steps?.length) {
        return (
            <div className="container py-5">
                <h4>Nessuna tappa disponibile per questo itinerario.</h4>
                <Link to=".." className="custom-btn mt-3"><i className="fas fa-arrow-left me-1"></i> Torna indietro</Link>
            </div>
        )
    }

    const sortedSteps = sortItinerarySteps(selectedTravel.itinerary_steps);

    return (
        <>
            <div className="container py-5">
                <h2 className="mb-4 fw-bold">Itinerario</h2>

                <div className="timeline">
                    {sortedSteps.map(step => {
                        const place = selectedTravel.places.find(place => place.id === step.place_id);
                        return (
                            <div className="timeline-item mb-4 p-4 shadow-sm rounded bg-white" key={step.id}>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <span className="badge">Giorno {step.day_number}</span>
                                    {step.estimated_time && (
                                        <small className="text-muted">
                                            {formatTime(step.estimated_time)}
                                        </small>
                                    )}
                                </div>
                                <h5>{step.title}</h5>
                                <span className="activity-type category-badge type mb-2">{step.activity_type}</span>
                                {place && <p className="text-muted mb-1"><i className="fas fa-map-marker-alt me-1 text-danger"></i>{place.name}</p>}
                                <p className="mb-0">{step.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}