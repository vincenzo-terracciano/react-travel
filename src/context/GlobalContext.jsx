import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export default function GlobalProvider({ children }) {

    const baseURL = 'http://localhost:8000/api';

    const [travels, setTravels] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [selectedTravel, setSelectedTravel] = useState(null);
    const [loading, setLoading] = useState(false);

    function fetchTravels(page = 1) {
        setLoading(true);

        axios.get(`${baseURL}/travels?page=${page}`)
            .then(res => {
                console.log(res);
                setTravels(res.data.data.data);
                setCurrentPage(res.data.data.current_page);
                setLastPage(res.data.data.last_page);
            })
            .catch(err => {
                console.error("Errore nel recupero dei viaggi", err);
            })
            .finally(() => {
                setLoading(false);
            })
    };

    useEffect(() => {
        fetchTravels();
    }, [])

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
            }}>
                {children}
            </GlobalContext.Provider>
        </>
    )
}

export function useGlobalContext() {
    return useContext(GlobalContext);
}