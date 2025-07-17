import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

export default function Wishlist() {

    const { travels, fetchTravels, loading, wishlist, toggleWishlist } = useGlobalContext();

    // Filtra i viaggi presenti nella wishlist
    const wishlistTravels = travels.filter(travel => wishlist.includes(travel.id));

    useEffect(() => {
        fetchTravels();
    }, []);

    if (loading || !travels) {
        return <Loader />;
    }

    return (
        <>
            <div className="container py-5">
                <h1 className="mb-5 text-center fw-bold">Wishlist</h1>

                {wishlistTravels.length === 0 ? (
                    <p className="text-center fs-4">Nessun viaggio nella tua wishlist.</p>
                ) : (
                    <div className="row g-4">
                        {wishlistTravels.map((travel) => (
                            <div key={travel.id} className="col-12 col-md-6 col-lg-4">
                                <div className="card shadow-sm border-0 h-100 travel-card">
                                    {/* Icona Wishlist */}
                                    <div className="wishlist-icon" onClick={() => toggleWishlist(travel.id)}>
                                        <i className={wishlist.includes(travel.id) ? "fas fa-heart text-danger" : "far fa-heart"}></i>
                                    </div>

                                    <div className="card-img-container">
                                        <img
                                            src={travel.cover_image}
                                            className="card-img-top"
                                            alt={travel.title}
                                        />
                                    </div>
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title fw-semibold">{travel.title}</h5>
                                        <p className="card-text mb-2">
                                            {travel.destination_city}, {travel.destination_country}
                                        </p>
                                        <span className="category-badge align-self-start mb-3">
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
                )}
            </div>
        </>
    )
}