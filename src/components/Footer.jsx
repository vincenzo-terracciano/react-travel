

export default function Footer() {

    const year = new Date().getFullYear();

    return (
        <>
            <footer className="footer mt-auto">
                <div className="container">
                    {/* Logo + Social */}
                    <div className="footer-top d-flex justify-content-between align-items-center flex-wrap">
                        <h5 className="logo">VoyaGo</h5>
                        <div className="social-icons d-flex gap-3">
                            <a href="#"><i className="bi bi-facebook"></i></a>
                            <a href="#"><i className="bi bi-instagram"></i></a>
                            <a href="#"><i className="bi bi-twitter"></i></a>
                            <a href="#"><i className="bi bi-youtube"></i></a>
                        </div>
                    </div>

                    {/* Link Sections */}
                    <div className="footer-links row mt-4 text-center">
                        <div className="col-md-4 footer-section">
                            <h6>Destinazioni</h6>
                            <ul>
                                <li><a href="#">Italia</a></li>
                                <li><a href="#">Portogallo</a></li>
                                <li><a href="#">Grecia</a></li>
                            </ul>
                        </div>
                        <div className="col-md-4 footer-section">
                            <h6>Link Utili</h6>
                            <ul>
                                <li><a href="#">Chi siamo</a></li>
                                <li><a href="#">Contatti</a></li>
                                <li><a href="#">Termini & Condizioni</a></li>
                            </ul>
                        </div>
                        <div className="col-md-4 footer-section">
                            <h6>Altro</h6>
                            <ul>
                                <li><a href="#">Lavora con noi</a></li>
                                <li><a href="#">Partnership</a></li>
                            </ul>
                        </div>
                    </div>

                    <hr />
                    <p className="text-center small">© {year} VoyaGo. Tutti i diritti riservati.</p>
                </div>
            </footer>
        </>
    )
}