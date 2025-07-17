import { Link, useLocation } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext"
import { useEffect } from "react";
import Loader from "../components/Loader";
import TravelFilters from "../components/TravelFilters";
import CategoryFilterDisplay from "../components/CategoryFilterDisplay";
import TravelCard from "../components/TravelCard";
import TravelPagination from "../components/TravelPagination";

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

                {/* Filtri, ordinamenti e ricerca */}
                <TravelFilters categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder} />

                {/* Visualizzazione viaggi filtrati per categoria */}
                {selectedCategory && (
                    <CategoryFilterDisplay selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory} />
                )}

                {/* Card */}
                <TravelCard paginatedTravels={paginatedTravels} wishlist={wishlist} toggleWishlist={toggleWishlist}
                    handleCategoryFilter={handleCategoryFilter} />

                {/* Paginazione */}
                {!selectedCategory && (
                    <TravelPagination currentPage={currentPage} lastPage={lastPage} handlePageChange={handlePageChange} />
                )}
            </div>
        </>
    )
}