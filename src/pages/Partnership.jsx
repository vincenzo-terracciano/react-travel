import { useEffect } from "react";

export default function Partnership() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="partnership-page bg-light py-5">
            <div className="container">
                <h1 className="text-center mb-4 fw-bold text-primary">Partnership</h1>
                <p className="text-center mb-5 text-muted">
                    Insieme possiamo ispirare milioni di viaggiatori.
                </p>

                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow border-0 p-4">
                            <h5 className="fw-bold mb-3">Perché collaborare con VoyaGo?</h5>
                            <p>
                                Siamo il punto di riferimento per chi cerca viaggi autentici e organizzati.
                                Unisciti a noi per creare esperienze straordinarie.
                            </p>

                            <h5 className="fw-bold mt-4 mb-3">Cosa offriamo</h5>
                            <ul>
                                <li>Visibilità sul nostro network di viaggiatori.</li>
                                <li>Contenuti sponsorizzati e collaborazioni social.</li>
                                <li>Progetti personalizzati per brand di settore.</li>
                            </ul>

                            <a href="#" className="btn btn-primary mt-3">Proponi una Partnership</a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
