import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import { useEffect } from "react";

export default function Home() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className="home">

                <Hero />

                <section className="highlights py-5">
                    <div className="container text-center">
                        <h2 className="mb-4">Cosa troverai</h2>
                        <div className="row">
                            <div className="col-md-4">
                                <i className="bi bi-map fs-2 mb-3"></i>
                                <h5>Itinerari</h5>
                                <p>Scopri percorsi dettagliati per ogni destinazione.</p>
                            </div>
                            <div className="col-md-4">
                                <i className="bi bi-backpack fs-2 mb-3"></i>
                                <h5>Packing List</h5>
                                <p>Non dimenticare nulla grazie alle nostre check-list.</p>
                            </div>
                            <div className="col-md-4">
                                <i className="bi bi-image fs-2 mb-3"></i>
                                <h5>Foto & Ispirazione</h5>
                                <p>Lasciati ispirare da esperienze reali e foto autentiche.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="text-center py-5">
                    <div className="container">
                        <h3>Inizia il tuo prossimo viaggio ora</h3>
                        <Link to="/destinations" className="btn btn-outline-primary mt-3">Vai alle destinazioni</Link>
                    </div>
                </section>
            </div>
        </>
    )
}