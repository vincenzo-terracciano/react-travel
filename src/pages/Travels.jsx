import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext"
import { useEffect } from "react";

export default function Travels() {

    const { travels, fetchTravels, currentPage, setCurrentPage, lastPage } = useGlobalContext();

    useEffect(() => {
        fetchTravels(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= lastPage) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <>
            <div className="container py-5">
                <h1 className="mb-5 text-center fw-bold">Esplora i Viaggi</h1>
                <div className="row g-4">
                    {travels.map((travel) => (
                        <div key={travel.id} className="col-12 col-md-6 col-lg-4">
                            <div className="card shadow-sm border-0 h-100 travel-card">
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
                                        {travel.category?.name}
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

                {/* Paginazione */}
                <div className="d-flex justify-content-center mt-5">
                    <ul className="pagination-custom">
                        <li onClick={() => handlePageChange(currentPage - 1)} className={currentPage === 1 ? 'disabled' : ''}>
                            &laquo;
                        </li>
                        {Array.from({ length: lastPage }, (_, i) => (
                            <li
                                key={i + 1}
                                onClick={() => handlePageChange(i + 1)}
                                className={currentPage === i + 1 ? 'active' : ''}
                            >
                                {i + 1}
                            </li>
                        ))}
                        <li onClick={() => handlePageChange(currentPage + 1)} className={currentPage === lastPage ? 'disabled' : ''}>
                            &raquo;
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}