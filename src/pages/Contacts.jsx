import { useEffect } from "react";

export default function Contacts() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <main className="contact-page bg-light py-5">
                <div className="container">
                    <h1 className="text-center mb-4">Contattaci</h1>
                    <p className="text-center mb-5 text-muted">
                        Hai domande, suggerimenti o vuoi collaborare con noi? Siamo felici di ascoltarti.
                    </p>

                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card shadow border-0">
                                <div className="card-body p-4">
                                    <h5 className="fw-bold mb-3">I nostri contatti</h5>
                                    <p><i className="bi bi-envelope me-2 text-primary"></i> info@voyago.com</p>
                                    <p><i className="bi bi-telephone me-2 text-success"></i> +39 123 456 7890</p>
                                    <p><i className="bi bi-geo-alt me-2 text-danger"></i> Via dei Viaggiatori 10, Napoli</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}