import { useEffect } from "react";

export default function AboutUs() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <main className="about-page container py-5">
                <div className="text-center mb-5">
                    <h1>Chi Siamo</h1>
                    <p className="lead text-muted">
                        La passione per i viaggi che diventa esperienza condivisa.
                    </p>
                </div>

                <section className="row align-items-center mb-5">
                    <div className="col-md-6">
                        <img
                            src="public/img/louis-magnotti-YvCg5X3pWzc-unsplash.jpg"
                            alt="Team che viaggia"
                            className="img-fluid rounded shadow"
                        />
                    </div>
                    <div className="col-md-6">
                        <h2 className="mb-3">La nostra missione</h2>
                        <p>
                            VoyaGo nasce dall’idea che il viaggio sia molto più di una semplice destinazione:
                            è un’opportunità di crescita personale, scoperta culturale e connessione con il mondo.
                            VoyaGo ti accompagna in questo percorso con itinerari dettagliati, packing list intuitive e fotografie autentiche, tutto pensato per rendere la tua esperienza di viaggio fluida e indimenticabile.
                            La tua guida digitale per trasformare ogni viaggio in un’esperienza unica.
                        </p>
                        <p>
                            Crediamo che viaggiare sia un diritto di tutti e che con la giusta guida ogni destinazione possa aprire nuovi orizzonti.
                        </p>
                    </div>
                </section>

                <section className="mb-5">
                    <h2 className="text-center mb-4">Perché sceglierci</h2>
                    <div className="row text-center">
                        <div className="col-md-4">
                            <i className="bi bi-people-fill fs-1 text-primary mb-3"></i>
                            <h5>Esperienza Utente</h5>
                            <p>Interfaccia intuitiva, facile da navigare e ottimizzata per ogni dispositivo.</p>
                        </div>
                        <div className="col-md-4">
                            <i className="bi bi-star-fill fs-1 text-warning mb-3"></i>
                            <h5>Contenuti Autentici</h5>
                            <p>Itinerari e foto direttamente da viaggiatori reali, niente contenuti generici.</p>
                        </div>
                        <div className="col-md-4">
                            <i className="bi bi-geo-alt-fill fs-1 text-danger mb-3"></i>
                            <h5>Varietà di Destinazioni</h5>
                            <p>Dalle mete più famose a quelle meno conosciute, scopri un mondo di avventure.</p>
                        </div>
                    </div>
                </section>

                <section className="text-center">
                    <h2>Unisciti alla nostra community</h2>
                    <p>
                        Scopri un modo nuovo di vivere il viaggio. <br />
                        Seguici sui social e resta aggiornato su tutte le novità.
                    </p>
                    <div className="d-flex justify-content-center gap-3 fs-2">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-primary"><i className="bi bi-facebook"></i></a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-danger"><i className="bi bi-instagram"></i></a>
                        <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="text-dark"><i className="bi bi-tiktok"></i></a>
                        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="text-danger"><i className="bi bi-youtube"></i></a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-dark"><i class="bi bi-twitter-x"></i></a>
                    </div>
                </section>
            </main>
        </>
    )
}