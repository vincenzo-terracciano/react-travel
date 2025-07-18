import { Link } from "react-router-dom";

const baseURL = 'http://localhost:8000/storage/';

export default function TravelCard({ paginatedTravels, wishlist, toggleWishlist, handleCategoryFilter, }) {

    return (
        <>
            <div className="row g-4">
                {paginatedTravels.map((travel) => (
                    <div key={travel.id} className="col-12 col-md-6 col-lg-4">
                        <div className="card border-0 h-100 travel-card position-relative">
                            <div className="wishlist-icon" onClick={() => toggleWishlist(travel.id)}>
                                <i className={wishlist.includes(travel.id) ? "fas fa-heart text-danger" : "far fa-heart"}></i>
                            </div>

                            <div className="card-img-container">
                                <img
                                    src={baseURL + travel.cover_image}
                                    className="card-img-top"
                                    alt={travel.title}
                                />
                            </div>
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title fw-semibold">{travel.title}</h5>
                                <p className="card-text mb-2">
                                    {travel.destination_city}, {travel.destination_country}
                                </p>
                                <span className="category-badge category-badge-clickable align-self-start mb-3"
                                    onClick={() => handleCategoryFilter(travel.category?.name)}>
                                    {travel.category?.icon && (
                                        <i className={`${travel.category.icon} me-2`}></i>
                                    )}
                                    <span>{travel.category?.name}</span>
                                </span>
                                <Link
                                    to={`/travels/${travel.id}`}
                                    className="custom-btn mt-auto">
                                    Scopri di più
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}