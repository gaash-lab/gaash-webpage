import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // Optional: Add styling
import Logo from '../assets/Logo.png';
const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="logo">
                    <img src={Logo} alt="GAASH Logo" />
                </div>
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/news">News</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/research">Research</Link></li>
                    <li><Link to="/publications">Publications</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;