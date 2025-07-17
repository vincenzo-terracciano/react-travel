import { useEffect } from "react";

export default function Terms() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <main className="terms-page bg-light py-5">
            <div className="container">
                <h1 className="text-center mb-4">Termini e Condizioni</h1>
                <p className="text-center text-muted mb-5">
                    Ultimo aggiornamento: Luglio 2025
                </p>

                <div className="card shadow border-0 p-4">
                    <h5 className="fw-bold mb-3">1. Introduzione</h5>
                    <p>
                        Benvenuto su VoyaGo! Utilizzando il nostro sito, accetti i presenti Termini e Condizioni.
                    </p>

                    <h5 className="fw-bold mt-4 mb-3">2. Utilizzo del Servizio</h5>
                    <p>
                        VoyaGo è una piattaforma che fornisce itinerari, packing list e ispirazione di viaggio.
                        L'uso è consentito esclusivamente per scopi personali e non commerciali.
                    </p>

                    <h5 className="fw-bold mt-4 mb-3">3. Responsabilità</h5>
                    <p>
                        Pur impegnandoci per fornire contenuti accurati, VoyaGo non è responsabile per eventuali
                        inesattezze, variazioni o danni derivanti dall'uso delle informazioni presenti sul sito.
                    </p>

                    <h5 className="fw-bold mt-4 mb-3">4. Privacy e Dati</h5>
                    <p>
                        Il trattamento dei dati avviene nel rispetto delle normative vigenti. Per dettagli, consulta la nostra
                        <a href="#" className="text-primary"> Informativa Privacy</a>.
                    </p>

                    <h5 className="fw-bold mt-4 mb-3">5. Modifiche</h5>
                    <p>
                        Ci riserviamo il diritto di modificare i Termini in qualsiasi momento. Le modifiche saranno comunicate agli utenti.
                    </p>
                </div>
            </div>
        </main>
    );
}
