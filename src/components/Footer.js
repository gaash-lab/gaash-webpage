import React from "react";
import { Link } from "react-router-dom";
import { 
    MapPin, 
    Mail, 
    Phone, 
    Twitter, 
    Linkedin, 
    Github, 
} from "lucide-react";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-blue-900 text-white py-16">
            <div className="container mx-auto px-4 grid md:grid-cols-3 gap-12">
                <div>
                    <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <MapPin className="w-5 h-5 text-blue-300" />
                            <span>Department of Information Technology <br/> National Institute of Technology, Srinagar <br/> Jammu and Kashmir - 190006</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5 text-blue-300" />
                            <a 
                                href="mailto:janibbashir@nitsri.ac.in" 
                                className="hover:text-blue-200 transition"
                            >
                                janibbashir@nitsri.ac.in
                            </a>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Phone className="w-5 h-5 text-blue-300" />
                            <span>+91 8825099229</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-2xl font-bold mb-6">Quick Links</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { to: "/", label: "Home" },
                            { to: "/research", label: "Research" },
                            { to: "/publications", label: "Publications" },
                            { to: "/team", label: "Team" },
                            { to: "/news", label: "News" },
                            {to: "/opportunities", label: "Opportunities" },
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

                <div>
                    <h3 className="text-2xl font-bold mb-6">Stay Updated</h3>


                    <div className="mt-6 flex space-x-4">
                        {[
                            { icon: Twitter, link: "#" },
                            { icon: Linkedin, link: "#" },
                            { icon: Github, link: "https://github.com/gaash-lab" },
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

            <div className="container mx-auto px-4 mt-12 pt-6 border-t border-blue-700 text-center">
                {/* 
                    Being the Developer and Designer of this module.
                    I hereby declare that no one is allowed to delete the line below 
                    or change the code here without my permission --> Tavaheed Tariq: Developer and Designer
                    Contact: tawheedtariq090@gmail.com
                    Website: https://tavaheed.netlify.app/
                */}
                <p className="text-blue-200">
                    © {currentYear} GAASH Lab. 
                    All Rights Reserved, designed by <a href="https://tavaheed.netlify.app/" target="_blank" className="hover:cursor-pointer hover:underline">Tavaheed Tariq</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;