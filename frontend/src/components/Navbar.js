import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo from "../assets/Logo.png";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isTeamDropdownOpen, setIsTeamDropdownOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);
    const toggleTeamDropdown = () => setIsTeamDropdownOpen(!isTeamDropdownOpen);

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/news", label: "News" },
        { 
            
            label: "Team", 
            dropdown: [
                { to: "/team/research-team", label: "Research Team" },
                { to: "/team/web-team", label: "Web Team" }
            ]
        },
        { to: "/research", label: "Research" },
        { to: "/publications", label: "Publications" },
        { to: "/opportunities", label: "Opportunities" },
        { to: "/contact", label: "Contact" }
    ];

    return (
        <header className="fixed w-full top-0 z-50 bg-white shadow-md">
            <nav className="container mx-auto flex items-center justify-between px-4 py-4 ">
                {/* Logo */}
                <Link to="/">
                    <div className="flex items-center">
                        <img 
                            src={Logo} 
                            alt="GAASH Logo" 
                            className="h-12 w-auto transition-transform hover:scale-105" 
                        />
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex space-x-6 items-center text-gray-800">
                    {navLinks.map((link) => (
                        <li key={link.to} className="relative">
                            {link.dropdown ? (
                                <div className="relative">
                                    <button
                                        onClick={toggleTeamDropdown}
                                        className="flex items-center font-medium hover:text-blue-600 transition-colors duration-300"
                                    >
                                        {link.label}
                                        <ChevronDown className="w-4 h-4 ml-1" />
                                    </button>
                                    {isTeamDropdownOpen && (
                                        <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md border">
                                            {link.dropdown.map((dropdownItem) => (
                                                <Link
                                                    key={dropdownItem.to}
                                                    to={dropdownItem.to}
                                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 hover:text-blue-600 transition-colors"
                                                    onClick={() => setIsTeamDropdownOpen(false)}
                                                >
                                                    {dropdownItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link 
                                    to={link.to} 
                                    className="font-medium hover:text-blue-600 transition-colors duration-300"
                                >
                                    {link.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden flex items-center space-x-4">
                    <button
                        onClick={toggleMenu}
                        className="text-gray-700 hover:text-blue-600"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <X className="w-7 h-7" />
                        ) : (
                            <Menu className="w-7 h-7" />
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Slide-out */}
            <div
                className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform ${
                    isMenuOpen ? "-translate-x-0" : "translate-x-full"
                } transition-transform duration-300 ease-in-out z-50`}
            >
                <button
                    className="absolute top-6 right-6 text-gray-700"
                    onClick={closeMenu}
                    aria-label="Close menu"
                >
                    <X className="w-7 h-7" />
                </button>

                <ul className="mt-20 space-y-6 px-8 text-gray-800">
                    {navLinks.map((link, index) => (
                        <li 
                            key={link.to} 
                            className={`transform translate-x-full ${
                                isMenuOpen ? "animate-slide-in" : ""
                            }`}
                            style={{ 
                                animationDelay: `${index * 75}ms`,
                                animationFillMode: 'forwards'
                            }}
                        >
                            {link.dropdown ? (
                                <div>
                                    <button
                                        onClick={toggleTeamDropdown}
                                        className="flex items-center py-2 hover:text-blue-600 transition-colors w-full text-left"
                                    >
                                        {link.label}
                                        <ChevronDown className="w-4 h-4 ml-1" />
                                    </button>
                                    {isTeamDropdownOpen && (
                                        <div className="ml-4 mt-2 space-y-2">
                                            {link.dropdown.map((dropdownItem) => (
                                                <Link
                                                    key={dropdownItem.to}
                                                    to={dropdownItem.to}
                                                    className="block py-1 text-gray-600 hover:text-blue-600 transition-colors"
                                                    onClick={closeMenu}
                                                >
                                                    {dropdownItem.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link 
                                    to={link.to} 
                                    className="block py-2 hover:text-blue-600 transition-colors"
                                    onClick={closeMenu}
                                >
                                    {link.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
};

export default Navbar;