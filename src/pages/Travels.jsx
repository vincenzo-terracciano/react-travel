import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext"
import { useEffect } from "react";
import Loader from "../components/Loader";

export default function Travels() {

    const { travels, fetchTravels, currentPage, lastPage, loading, selectedCategory, setSelectedCategory, handlePageChange, handleCategoryFilter } = useGlobalContext();
    const location = useLocation();

    const travelsPerPage = 6;
    const filteredTravels = selectedCategory
        ? travels.filter(travel => travel.category?.name === selectedCategory)
        : travels.slice((currentPage - 1) * travelsPerPage, currentPage * travelsPerPage);


    useEffect(() => {
        fetchTravels();
    }, []);

    useEffect(() => {
        if (location.state?.selectedCategory) {
            setSelectedCategory(location.state.selectedCategory);
        }
    }, [location.state])


    if (loading || !travels) {
        return <Loader />;
    }

    return (
        <>
            <div className="container py-5">
                <h1 className="mb-5 text-center fw-bold">Esplora i Viaggi</h1>

                {selectedCategory && (
                    <div className="text-center mb-4">
                        <p className="fs-5">
                            Viaggi filtrati per Categoria: <strong>{selectedCategory}</strong>
                        </p>
                        <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => setSelectedCategory(null)}>
                            Rimuovi filtro
                        </button>
                    </div>
                )}

                <div className="row g-4">
                    {filteredTravels.map((travel) => (
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

                {/* Paginazione */}
                {!selectedCategory && (
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
                )}
            </div>
        </>
    )
}