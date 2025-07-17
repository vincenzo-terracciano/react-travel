import { useEffect } from "react";

export default function Faq() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="faq-page py-5 bg-light">
            <div className="container">
                <h1 className="text-center mb-4">Domande Frequenti (FAQ)</h1>
                <p className="text-center mb-5 text-muted">
                    Trova le risposte alle domande più comuni su VoyaGo.
                </p>

                <div className="accordion" id="faqAccordion">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                                Cos'è VoyaGo e come funziona?
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                            <div className="accordion-body">
                                VoyaGo è la piattaforma che ti aiuta a pianificare viaggi, con itinerari personalizzati, packing list e ispirazione fotografica.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                                Posso salvare i miei viaggi preferiti?
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                            <div className="accordion-body">
                                Certo! Registrati e potrai aggiungere viaggi ai tuoi preferiti per averli sempre a portata di mano.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                                Come posso contattarvi per assistenza?
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                            <div className="accordion-body">
                                Visita la pagina <a href="/contatti" className="text-primary fw-bold">Contatti</a> per inviarci un messaggio. Il nostro team ti risponderà entro 24 ore.
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-5">
                    <a href="/contatti" className="btn btn-primary">Hai altre domande? Contattaci</a>
                </div>
            </div>
        </main>
    );
}
