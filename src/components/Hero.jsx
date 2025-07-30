import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

// Array con i nomi delle immagini di sfondo che vengono mostrate a rotazione
const images = [
    'louis-magnotti-YvCg5X3pWzc-unsplash.jpg',
    'patrick-fore-74TufExdP3Y-unsplash.jpg',
    'khamkeo-AMQEB4-uG9k-unsplash.jpg'
];

export default function Hero() {

    const [index, setIndex] = useState(0);

    // Al caricamento della pagina, parte un timer che ogni 5 secondi aggiorna index per cambiare lo sfondo
    useEffect(() => {
        const interval = setInterval(() => {

            // Incrementa l'indice e ricomincia da 0 quando si raggiunge l'ultima immagine, creando un loop infinito
            setIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 5000)

        // pulisco l'intervallo se il componente viene smontato
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* Visualizzazione della Hero con lo sfondo che viene impostato dinamicamente in base a images[index] */}
            <section className="hero text-white d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(/img/${images[index]})` }}>
                <div className="container text-center hero-content">
                    <h1 className="hero-title">Esplora il mondo con VoyaGo</h1>
                    <p className="hero-subtitle">Itinerari personalizzati, packing list e destinazioni da sogno</p>
                    <Link to="/travels" className="btn btn-primary">Scopri i viaggi</Link>
                </div>
            </section>
        </>
    )
}