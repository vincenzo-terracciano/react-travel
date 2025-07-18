import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

const images = [
    'louis-magnotti-YvCg5X3pWzc-unsplash.jpg',
    'patrick-fore-74TufExdP3Y-unsplash.jpg',
    'khamkeo-AMQEB4-uG9k-unsplash.jpg'
];

export default function Hero() {

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000)

        return () => clearInterval(interval);
    }, []);

    return (
        <>
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