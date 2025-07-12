import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <header>
            <div className="container d-flex justify-content-between align-items-center py-3">
                {/* Logo */}
                <Link to="/" className="logo">VoyaGo</Link>

                {/* Hamburger */}
                <button
                    className="hamburger d-md-none"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Menu"
                >
                    <i className="bi bi-list"></i>
                </button>

                {/* Nav Desktop */}
                <nav className="navbar-nav d-none d-md-flex gap-4">
                    <ul>
                        <li>
                            <Link className="nav-item" to="/">Home</Link>
                        </li>
                        <li>
                            <Link className="nav-item" to="/viaggi">Viaggi</Link>
                        </li>
                        <li>
                            <Link className="nav-item" to="/itinerari">Itinerari</Link>
                        </li>
                        <li>
                            <Link className="nav-item" to="/packing-list">Packing List</Link>
                        </li>
                        <li>
                            <Link className="nav-item" to="/destinazioni">Destinazioni</Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Nav Mobile */}
            {isOpen && (
                <div className="mobile-nav d-md-none text-center">
                    <Link className="mobile-link" to="/" onClick={() => setIsOpen(false)}>Home</Link>
                    <Link className="mobile-link" to="/viaggi" onClick={() => setIsOpen(false)}>Viaggi</Link>
                    <Link className="mobile-link" to="/itinerari" onClick={() => setIsOpen(false)}>Itinerari</Link>
                    <Link className="mobile-link" to="/packing-list" onClick={() => setIsOpen(false)}>Packing List</Link>
                    <Link className="mobile-link" to="/destinazioni" onClick={() => setIsOpen(false)}>Destinazioni</Link>
                </div>
            )}
        </header>
    )
}