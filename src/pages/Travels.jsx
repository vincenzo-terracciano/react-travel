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

    // Hook di React Router per accedere ai dati di navigazione
    const location = useLocation();
    const travelsPerPage = 6;

    /* Filtro per categoria */
    const filteredTravels = selectedCategory
        // se seleziono una categoria, mostro solo i viaggi di quella categoria.
        ? travels.filter(travel => travel.category?.name === selectedCategory)
        : travels;

    // Ordinamento data di creazione del viaggio
    const sortedTravels = [...filteredTravels].sort((a, b) => {
        return sortOrder === "desc"
            // ordino dal più recente al più vecchio
            ? new Date(b.created_at) - new Date(a.created_at)
            // ordino dal più vecchio al più recente
            : new Date(a.created_at) - new Date(b.created_at);
    })

    // Ricerca viaggio
    const searchedTravels = sortedTravels.filter(travel =>
        // filtro sul titolo, città o nazione, confrontandoli con la searchQuery
        travel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        travel.destination_city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        travel.destination_country.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Suddivido i viaggi filtrati e ordinati in pagine da 6 in base alla pagina corrente
    const paginatedTravels = searchedTravels.slice(
        (currentPage - 1) * travelsPerPage,
        currentPage * travelsPerPage
    );

    // Estrae tutte le categorie presenti nei viaggi rimuovendo i duplicati con Set e i valori null/undefined con Boolean
    const categories = [...new Set(travels.map(travel => travel.category?.name).filter(Boolean))];


    // Quando la pagina viene caricata per la prima volta, chiama l’API per caricare tutti i viaggi
    useEffect(() => {
        fetchTravels();
    }, []);

    // imposto automaticamente un filtro categoria se arrivo da un’altra pagina che mi ha passato una categoria
    useEffect(() => {
        if (location.state?.selectedCategory) {
            setSelectedCategory(location.state.selectedCategory);
        }
    }, [location.state])

    /* Loader */
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