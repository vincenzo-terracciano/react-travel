import { useEffect } from "react";

export default function Assistance() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <main className="support-page py-5 bg-light">
                <div className="container">
                    <h1 className="text-center mb-4">Centro Assistenza</h1>
                    <p className="text-center mb-5 text-muted">
                        Benvenuto nel Centro Assistenza di VoyaGo. Qui troverai le risposte alle domande più comuni e le risorse per pianificare i tuoi viaggi senza stress.
                    </p>

                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-body text-center">
                                    <i className="bi bi-question-circle fs-2 text-primary mb-3"></i>
                                    <h5 className="card-title">FAQ</h5>
                                    <p className="card-text">Consulta le domande frequenti per trovare subito una risposta.</p>
                                    <a href="/faq" className="btn btn-outline-primary">Vai alle FAQ</a>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-body text-center">
                                    <i className="bi bi-headset fs-2 text-primary mb-3"></i>
                                    <h5 className="card-title">Assistenza Clienti</h5>
                                    <p className="card-text">Hai bisogno di aiuto immediato? Contatta il nostro team.</p>
                                    <a href="/customer-care" className="btn btn-outline-primary">Contattaci</a>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-body text-center">
                                    <i className="bi bi-info-circle fs-2 text-primary mb-3"></i>
                                    <h5 className="card-title">Guide Utili</h5>
                                    <p className="card-text">Leggi le nostre guide per scoprire come sfruttare al meglio VoyaGo.</p>
                                    <a href="#" className="btn btn-outline-primary">Scopri di più</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}