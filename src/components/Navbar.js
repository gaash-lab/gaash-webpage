import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-white sticky w-full top-0 z-50 shadow-sm">
            <nav className="container mx-auto flex items-center justify-between px-6 lg:px-0  py-4 max-w-7xl">

                <div className="flex items-center">
                    <img src={Logo} alt="GAASH Logo" className="h-16" />
                </div>

                <ul className="hidden md:flex space-x-6 text-black">
                    <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
                    <li><Link to="/news" className="hover:text-blue-600">News</Link></li>
                    <li><Link to="/about" className="hover:text-blue-600">About</Link></li>
                    <li><Link to="/research" className="hover:text-blue-600">Research</Link></li>
                    <li><Link to="/publications" className="hover:text-blue-600">Publications</Link></li>
                    <li><Link to="/contact" className="hover:text-blue-600">Contact</Link></li>
                </ul>

                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? (
                        <span className="text-2xl">&times;</span> // Close Icon
                    ) : (
                        <span className="text-2xl">&#9776;</span> // Hamburger Icon
                    )}
                </button>
            </nav>

            <div
                className={`md:hidden fixed top-0 right-0 h-full w-64 bg-blue-100 shadow-xl transform ${isOpen ? "-translate-x-0" : "translate-x-full"
                    } transition-transform duration-300`}
            >

                <button
                    className="absolute top-6 right-6 text-gray-700 text-3xl"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close menu"
                >
                    &times;
                </button>

                <ul className="mt-10 space-y-6 px-8 text-gray-700">
                    <li><Link to="/" className="block hover:text-blue-600" onClick={() => setIsOpen(false)}>Home</Link></li>
                    <li><Link to="/news" className="block hover:text-blue-600" onClick={() => setIsOpen(false)}>News</Link></li>
                    <li><Link to="/about" className="block hover:text-blue-600" onClick={() => setIsOpen(false)}>About</Link></li>
                    <li><Link to="/research" className="block hover:text-blue-600" onClick={() => setIsOpen(false)}>Research</Link></li>
                    <li><Link to="/publications" className="block hover:text-blue-600" onClick={() => setIsOpen(false)}>Publications</Link></li>
                    <li><Link to="/contact" className="block hover:text-blue-600" onClick={() => setIsOpen(false)}>Contact</Link></li>
                </ul>
            </div>
        </header>
    );
};

export default Navbar;
