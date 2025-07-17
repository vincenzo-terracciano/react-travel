import { useEffect } from "react";

export default function Careers() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="careers-page py-5">
            <div className="container">
                <h1 className="text-center mb-4">Lavora con Noi</h1>
                <p className="text-center mb-5 text-muted">
                    Unisciti al team VoyaGo e contribuisci a ispirare i viaggiatori di tutto il mondo.
                </p>

                <div className="row g-4">
                    <div className="col-md-4">
                        <div className="card shadow border-0 h-100">
                            <div className="card-body text-center">
                                <i className="bi bi-laptop fs-1 text-primary mb-3"></i>
                                <h5 className="fw-bold">Sviluppatori Web</h5>
                                <p>
                                    Costruisci le funzionalità che renderanno il viaggio digitale un'esperienza unica.
                                </p>
                                <a href="#" className="btn btn-outline-primary mt-2">Candidati</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow border-0 h-100">
                            <div className="card-body text-center">
                                <i className="bi bi-pen fs-1 text-success mb-3"></i>
                                <h5 className="fw-bold">Content Creator</h5>
                                <p>
                                    Racconta storie, crea guide e ispira con contenuti che fanno sognare.
                                </p>
                                <a href="#" className="btn btn-outline-primary mt-2">Candidati</a>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card shadow border-0 h-100">
                            <div className="card-body text-center">
                                <i className="bi bi-people fs-1 text-danger mb-3"></i>
                                <h5 className="fw-bold">Partnership Manager</h5>
                                <p>
                                    Collabora con brand e aziende per creare esperienze di viaggio esclusive.
                                </p>
                                <a href="#" className="btn btn-outline-primary mt-2">Candidati</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
