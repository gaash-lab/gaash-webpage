import React from "react";
import { Link } from "react-router-dom";
import { 
    MapPin, 
    Mail, 
    Phone, 
    Twitter, 
    Linkedin, 
    Github, 
    Send 
} from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-blue-900 text-white py-16">
            <div className="container mx-auto px-4 grid md:grid-cols-3 gap-12">
                {/* Contact Information */}
                <div>
                    <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <MapPin className="w-5 h-5 text-blue-300" />
                            <span>MBZUAI, Abu Dhabi, UAE</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-blue-300" />
                            <a 
                                href="mailto:ival@mbzuai.ac.ae" 
                                className="hover:text-blue-200 transition"
                            >
                                email here
                            </a>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Phone className="w-5 h-5 text-blue-300" />
                            <span>phone number here</span>
                        </div>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-2xl font-bold mb-6">Quick Links</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { to: "/", label: "Home" },
                            { to: "/research", label: "Research" },
                            { to: "/publications", label: "Publications" },
                            { to: "/about", label: "About" },
                            { to: "/news", label: "News" },
                            { to: "/contact", label: "Contact" }
                        ].map((link) => (
                            <Link 
                                key={link.to} 
                                to={link.to} 
                                className="hover:text-blue-200 transition"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Newsletter Signup */}
                <div>
                    <h3 className="text-2xl font-bold mb-6">Stay Updated</h3>
                    <div className="flex">
                        <input 
                            type="email" 
                            placeholder="Enter your email" 
                            className="w-full px-4 py-2 text-gray-800 rounded-l-lg focus:outline-none"
                        />
                        <button 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-lg transition flex items-center"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Social Media Links */}
                    <div className="mt-6 flex space-x-4">
                        {[
                            { icon: Twitter, link: "#" },
                            { icon: Linkedin, link: "#" },
                            { icon: Github, link: "#" }
                        ].map((social, index) => (
                            <a 
                                key={index} 
                                href={social.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-white hover:text-blue-200 transition"
                            >
                                <social.icon className="w-6 h-6" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="container mx-auto px-4 mt-12 pt-6 border-t border-blue-700 text-center">
                <p className="text-blue-200">
                    © {currentYear} Intelligent Visual Analytics Lab (IVAL). 
                    All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;