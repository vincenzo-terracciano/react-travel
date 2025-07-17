import { useState, useEffect } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

export default function Destinations() {
    const { travels, fetchTravels, wishlist, toggleWishlist, handleCategoryFilter, selectedCountry, setSelectedCountry } = useGlobalContext();

    useEffect(() => {
        fetchTravels();
        window.scrollTo(0, 0);
    }, []);

    // Trova tutti i paesi unici
    const countries = [...new Set(travels.map(travel => travel.destination_country))];

    // Filtra viaggi per paese selezionato
    const filteredTravels = selectedCountry
        ? travels.filter(travel => travel.destination_country === selectedCountry)
        : [];

    if (!travels || travels.length === 0) return <Loader />;

    return (
        <div className="container py-5">
            <h1 className="text-center fw-bold mb-5">Destinazioni</h1>

            {/* Lista paesi */}
            <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
                {countries.map((country, i) => (
                    <span
                        key={i}
                        className={`country-badge ${selectedCountry === country ? "active" : ""}`}
                        onClick={() => setSelectedCountry(country)}
                    >
                        {country}
                    </span>
                ))}
            </div>

            {/* Viaggi per il paese scelto */}
            {selectedCountry && (
                <>
                    <h2 className="mb-4 text-center">Viaggi in {selectedCountry}</h2>
                    <div className="row g-4">
                        {filteredTravels.map((travel) => (
                            <div key={travel.id} className="col-12 col-md-6 col-lg-4">
                                <div className="card shadow-sm border-0 h-100 travel-card position-relative">
                                    <div className="wishlist-icon" onClick={() => toggleWishlist(travel.id)}>
                                        <i className={wishlist.includes(travel.id) ? "fas fa-heart text-danger" : "far fa-heart"}></i>
                                    </div>

                                    <div className="card-img-container">
                                        <img src={travel.cover_image} className="card-img-top" alt={travel.title} />
                                    </div>
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title fw-semibold">{travel.title}</h5>
                                        <p className="card-text mb-2">{travel.destination_city}, {travel.destination_country}</p>
                                        <span
                                            className="category-badge category-badge-clickable align-self-start mb-3"
                                            onClick={() => handleCategoryFilter(travel.category?.name)}
                                        >
                                            {travel.category?.icon && <i className={`${travel.category.icon} me-2`}></i>}
                                            <span>{travel.category?.name}</span>
                                        </span>
                                        <Link to={`/travels/${travel.id}`} className="custom-btn mt-auto">
                                            Scopri di più
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
