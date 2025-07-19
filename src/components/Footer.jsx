import { Link } from "react-router-dom";


export default function Footer() {

    const year = new Date().getFullYear();

    return (
        <>
            <footer className="footer mt-auto">
                <div className="container">
                    {/* Logo + Social */}
                    <div className="footer-top d-flex justify-content-between align-items-center flex-wrap">
                        <Link to="/" className="logo">
                            <img src="img/logo-voyago.png" alt="VoyaGo" className="logo-img" />
                        </Link>

                        <div className="social-icons d-flex gap-3">
                            <a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="bi bi-facebook"></i></a>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="bi bi-instagram"></i></a>
                            <a href="https://tiktok.com" target="_blank" rel="noreferrer"><i className="bi bi-tiktok"></i></a>
                            <a href="https://youtube.com" target="_blank" rel="noreferrer"><i className="bi bi-youtube"></i></a>
                            <a href="https://twitter.com" target="_blank" rel="noreferrer"><i className="bi bi-twitter"></i></a>
                        </div>
                    </div>

                    {/* Link Sections */}
                    <div className="footer-links row mt-5 text-center">
                        <div className="col-md-4 footer-section">
                            <h6>Link Utili</h6>
                            <ul>
                                <li>
                                    <Link to="/about-us">Chi siamo</Link>
                                </li>
                                <li>
                                    <Link to="/contacts">Contatti</Link>
                                </li>
                                <li>
                                    <Link to="/terms">Termini & Condizioni</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-4 footer-section">
                            <h6>Supporto</h6>
                            <ul>
                                <li>
                                    <Link to="/faq">F.A.Q.</Link>
                                </li>
                                <li>
                                    <Link to="/assistance">Centro Assistenza</Link>
                                </li>
                                <li>
                                    <Link to="/customer-care">Assistenza Clienti</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-4 footer-section">
                            <h6>Altro</h6>
                            <ul>
                                <li>
                                    <Link to="/careers">Lavora con noi</Link>
                                </li>
                                <li>
                                    <Link to="/partnership">Partnership</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <section className="newsletter py-5 text-center">
                        <div className="container">
                            <h3 className="mb-3 fw-bold">Resta aggiornato sui nuovi viaggi</h3>
                            <p className="mb-4">Iscriviti alla nostra newsletter per non perdere novità e offerte.</p>
                            <form className="d-flex justify-content-center gap-2 flex-wrap">
                                <input type="email" className="form-control w-50 rounded-pill px-3" placeholder="Inserisci la tua email" />
                                <button className="btn btn-primary rounded-pill px-4">Iscriviti</button>
                            </form>
                        </div>
                    </section>

                    <hr />
                    <p className="text-center small">© {year} VoyaGo. Tutti i diritti riservati.</p>
                </div>
            </footer>
        </>
    )
}