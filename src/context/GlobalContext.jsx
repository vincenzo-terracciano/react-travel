import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export default function GlobalProvider({ children }) {

    const baseURL = 'http://localhost:8000/api';

    const [travels, setTravels] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const fetchTravels = (page = 1) => {
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
    };

    useEffect(() => {
        fetchTravels();
    }, [])

    return (
        <>
            <GlobalContext.Provider value={{
                travels,
                setTravels,
                fetchTravels,
                currentPage,
                setCurrentPage,
                lastPage
            }}>
                {children}
            </GlobalContext.Provider>
        </>
    )
}

export function useGlobalContext() {
    return useContext(GlobalContext);
}