import React, { useEffect } from 'react';
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import ScrollToTop from '../components/ScrollToTop';
import banner_contact from './../assets/banner-contact.avif';

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top
    }, []);
    return (
        <div className="relative w-full">
            {/* Banner Section */}
            <div
                className="w-full h-[400px] bg-cover bg-center relative z-10"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.5)), url("${banner_contact}")`,
                }}
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide">
                        Contact Us
                    </h1>
                </div>
            </div>

            {/* Contact Info Section */}
            <section className="w-full max-w-5xl mx-auto bg-white p-6 sm:p-8 md:p-10 lg:p-16 -mt-32 md:-mt-40 z-20 relative text-center">
                <div className="grid md:grid-cols-2 gap-8 items-stretch">
                    {/* Left Column */}
                    <div className="space-y-6 flex flex-col">
                        {/* Our Location */}
                        <div className="bg-blue-50 p-6 rounded-lg h-full">
                            <div className="flex items-center mb-4">
                                <MapPin className="w-8 h-8 text-blue-700 mr-4" />
                                <h3 className="text-2xl font-bold text-gray-800">
                                    Our Location
                                </h3>
                            </div>
                            <p className="text-left text-gray-600 leading-relaxed">
                                <span className="font-semibold text-blue-700">
                                    Department of Information Technology
                                </span>
                                <br />
                                National Institute of Technology, Srinagar
                                <br />
                                Jammu and Kashmir - 190006
                            </p>
                        </div>

                        {/* Operating Hours */}
                        <div className="bg-green-50 p-6 rounded-lg h-full">
                            <div className="flex items-center mb-4">
                                <Clock className="w-8 h-8 text-green-700 mr-4" />
                                <h3 className="text-2xl font-bold text-gray-800">
                                    Operating Hours
                                </h3>
                            </div>
                            <p className="text-left text-gray-600 font-medium">
                                Monday to Friday
                                <br />
                                9:00 AM to 5:00 PM
                            </p>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6 flex flex-col">
                        {/* Email Box */}
                        <div className="bg-indigo-50 p-6 rounded-lg h-full">
                            <div className="flex items-center mb-4">
                                <Mail className="w-8 h-8 text-indigo-700 mr-4" />
                                <h3 className="text-2xl font-bold text-gray-800">
                                    Email Address
                                </h3>
                            </div>
                            <div className="text-left">
                                <a
                                    href="mailto:janibbashir@nitsri.ac.in"
                                    className="text-gray-600 hover:text-indigo-700 transition-colors"
                                >
                                    janibbashir@nitsri.ac.in
                                </a>
                            </div>
                        </div>

                        {/* Phone Box */}
                        <div className="bg-purple-50 p-6 rounded-lg h-full">
                            <div className="flex items-center mb-4">
                                <Phone className="w-8 h-8 text-purple-700 mr-4" />
                                <h3 className="text-2xl font-bold text-gray-800">
                                    Contact Number
                                </h3>
                            </div>
                            <div className="text-left">
                                <a
                                    href="tel:+918825099229"
                                    className="text-gray-600 hover:text-purple-700 transition-colors"
                                >
                                    +91 8825099229
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Google Map Section */}
            <section className="max-w-6xl mx-auto px-4 md:px-8 mt-10 mb-16">
                <div className="rounded-xl overflow-hidden shadow-md">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3302.802261253869!2d74.83847162571965!3d34.12581167312931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e185b1b1083cd7%3A0x6584839148207532!2sI.T%20Department!5e0!3m2!1sen!2sin!4v1744388480468!5m2!1sen!2sin"
                        className="w-full h-[400px] border-0"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </section>
            <ScrollToTop />
        </div>
    );
};

export default Contact;
