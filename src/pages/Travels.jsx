import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext"
import { useEffect } from "react";
import Loader from "../components/Loader";

export default function Travels() {

    const { travels, fetchTravels, currentPage, lastPage, loading, selectedCategory, setSelectedCategory, handlePageChange, handleCategoryFilter, sortOrder, setSortOrder, wishlist, toggleWishlist, searchQuery, setSearchQuery } = useGlobalContext();
    const location = useLocation();
    const travelsPerPage = 6;

    /* Filtro, ordinamento e ricerca */
    const filteredTravels = selectedCategory
        ? travels.filter(travel => travel.category?.name === selectedCategory)
        : travels;


    const sortedTravels = [...filteredTravels].sort((a, b) => {
        return sortOrder === "desc"
            ? new Date(b.created_at) - new Date(a.created_at)
            : new Date(a.created_at) - new Date(b.created_at);
    })

    const searchedTravels = sortedTravels.filter(travel =>
        travel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        travel.destination_city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        travel.destination_country.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const paginatedTravels = searchedTravels.slice(
        (currentPage - 1) * travelsPerPage,
        currentPage * travelsPerPage
    );

    /* Categorie dinamiche */
    const categories = [...new Set(travels.map(travel => travel.category?.name).filter(Boolean))];

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

                <div className="d-flex justify-content-between mb-4">
                    <select
                        className="form-select w-auto"
                        value={selectedCategory || ""}
                        onChange={(e) => setSelectedCategory(e.target.value || null)}>
                        <option value="">Tutte le categorie</option>
                        {categories.map((cat, index) => (
                            <option key={index} value={cat}>{cat}</option>
                        ))}
                    </select>

                    {/* Search bar */}
                    <div className="search-bar-container">
                        <i className="fas fa-search search-icon"></i>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Cerca viaggio..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>


                    <select
                        className="form-select w-auto"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="desc">Più recenti</option>
                        <option value="asc">Meno recenti</option>
                    </select>
                </div>

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
                    {paginatedTravels.map((travel) => (
                        <div key={travel.id} className="col-12 col-md-6 col-lg-4">
                            <div className="card border-0 h-100 travel-card position-relative">
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