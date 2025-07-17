import { useEffect } from "react";

export default function CustomerCare() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <main className="contact-support py-5 bg-light">
                <div className="container">
                    <h1 className="text-center mb-4">Assistenza Clienti</h1>
                    <p className="text-center mb-5 text-muted">
                        Il nostro team è qui per aiutarti. Compila il form e ti ricontatteremo al più presto.
                    </p>

                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="card shadow-sm">
                                <div className="card-body p-4">
                                    <form>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Nome</label>
                                            <input type="text" id="name" className="form-control" placeholder="Il tuo nome" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input type="email" id="email" className="form-control" placeholder="nome@email.com" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="message" className="form-label">Messaggio</label>
                                            <textarea id="message" rows="5" className="form-control" placeholder="Scrivi qui il tuo messaggio..."></textarea>
                                        </div>
                                        <div className="text-center">
                                            <button type="submit" className="btn btn-primary">Invia Richiesta</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}