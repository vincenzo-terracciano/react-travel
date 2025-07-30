import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const GlobalContext = createContext();

export default function GlobalProvider({ children }) {

    const baseURL = 'http://localhost:8000/api';

    // gestione degli stati
    const [travels, setTravels] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [selectedTravel, setSelectedTravel] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [sortOrder, setSortOrder] = useState("desc");
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [wishlist, setWishlist] = useState(() => {
        return JSON.parse(localStorage.getItem("wishlist")) || [];
    });

    // funzione per caricare tutti i viaggi chiamando l'API Laravel
    function fetchTravels() {

        // se i viaggi sono già stati caricati esco dalla funzione (per evitare chiamate ripetute)
        if (travels.length > 0) return;

        setLoading(true);
        const allTravels = [];

        // funzione per gestire la paginazione
        function getPage(page = 1) {
            axios.get(`${baseURL}/travels?page=${page}`)
                .then(res => {
                    const data = res.data.data;

                    // aggiungo i viaggi della pagina corrente
                    allTravels.push(...data.data);

                    // se non è ancora arrivato all'ultima pagina va avanti
                    if (page < data.last_page) {
                        getPage(page + 1);
                    } else {
                        setTravels(allTravels);
                        setCurrentPage(1);
                        setLastPage(data.last_page);
                        setLoading(false);
                    }
                })
                .catch(err => {
                    console.error("Errore nel recupero dei viaggi", err);
                    setLoading(false);
                });
        }
        getPage();
    }

    // funzione per caricare i dettagli di un singolo viaggio
    function fetchTravelById(id) {
        setLoading(true);

        // chiamata all'endpoint travels/id
        axios.get(`${baseURL}/travels/${id}`)
            .then(res => {
                setSelectedTravel(res.data.data);
            })
            .catch(err => {
                console.error("Errore nel recupero del viaggio", err);
            })
            // indipendentemente dall'esito lo spinner non viene più visualizzato
            .finally(() => {
                setLoading(false);
            })
    }

    // funzione per calcolare la durata del viaggio
    function getTravelDuration(start, end) {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diff = (endDate - startDate) / (1000 * 60 * 60 * 24);
        return diff + 1
    }

    // funzione per gestire la paginazione
    function handlePageChange(page) {

        // controllo che la pagina richiesta sia valida, compresa tra 1 e l'ultima pagina disponibile
        if (page >= 1 && page <= lastPage) {

            // aggiorno lo stato con il numero di pagina selezionato
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // funzione per filtrare i viaggi per categoria
    function handleCategoryFilter(categoryName) {
        setSelectedCategory(categoryName);
        window.scrollTo({ top: 120, behavior: 'smooth' });
    };

    // funzione per aggiungere o rimuovere un viaggio dalla wishlist
    function toggleWishlist(id) {
        let updatedWishlist;

        // controllo se il viaggio è già nella wishlist
        if (wishlist.includes(id)) {

            // rimuovo il viaggio
            updatedWishlist = wishlist.filter(item => item !== id);
        } else {

            // aggiungo il viaggio
            updatedWishlist = [...wishlist, id];
        }
        // aggiorno l'interfaccia per cambiare l'icona del cuore
        setWishlist(updatedWishlist);

        // salvo la wishlist nel localStorage
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    }

    return (
        <>
            {/* Esporto tutti gli stati e le funzioni ai componenti figli */}
            <GlobalContext.Provider value={{
                travels,
                setTravels,
                fetchTravels,
                currentPage,
                setCurrentPage,
                lastPage,
                selectedTravel,
                setSelectedTravel,
                fetchTravelById,
                getTravelDuration,
                loading,
                setLoading,
                selectedCategory,
                setSelectedCategory,
                handlePageChange,
                handleCategoryFilter,
                sortOrder,
                setSortOrder,
                wishlist,
                setWishlist,
                toggleWishlist,
                selectedCountry,
                setSelectedCountry,
                searchQuery,
                setSearchQuery,
            }}>
                {children}
            </GlobalContext.Provider>
        </>
    )
}

// custom hook per utilizzare il contesto in qualunnque componente
export function useGlobalContext() {
    return useContext(GlobalContext);
}