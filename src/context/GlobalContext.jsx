import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

function GlobalProvider({ children }) {

    const baseURL = 'http://localhost:8000/api';

    const [travel, setTravel] = useState([]);

    useEffect(() => {
        axios.get(`${baseURL}/travels`)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err);

            })
    }, [])

    return (
        <>
            <GlobalContext.Provider value={{ travel, setTravel }}>
                {children}
            </GlobalContext.Provider>
        </>
    )
}

export function useGlobalContext() {
    return useContext(GlobalContext);
}

export default GlobalProvider