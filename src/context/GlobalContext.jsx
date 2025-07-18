import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const GlobalContext = createContext();

export default function GlobalProvider({ children }) {

    const baseURL = 'http://localhost:8000/api';

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

    function fetchTravels() {
        if (travels.length > 0) return; // evita doppie fetch

        setLoading(true);
        const allTravels = [];

        function getPage(page = 1) {
            axios.get(`${baseURL}/travels?page=${page}`)
                .then(res => {
                    const data = res.data.data;
                    allTravels.push(...data.data);

                    if (page < data.last_page) {
                        getPage(page + 1); // fetch pagina successiva
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

    function fetchTravelById(id) {
        setLoading(true);

        axios.get(`${baseURL}/travels/${id}`)
            .then(res => {
                setSelectedTravel(res.data.data);
            })
            .catch(err => {
                console.error("Errore nel recupero del viaggio", err);
            })
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

    function handlePageChange(page) {
        if (page >= 1 && page <= lastPage) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    function handleCategoryFilter(categoryName) {
        setSelectedCategory(categoryName);
        window.scrollTo({ top: 120, behavior: 'smooth' });
    };

    function toggleWishlist(id) {
        let updatedWishlist;
        if (wishlist.includes(id)) {
            updatedWishlist = wishlist.filter(item => item !== id);
        } else {
            updatedWishlist = [...wishlist, id];
        }
        setWishlist(updatedWishlist);
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    }

    return (
        <>
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

export function useGlobalContext() {
    return useContext(GlobalContext);
}