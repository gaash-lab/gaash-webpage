import React from 'react';
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import banner_contact from './../assets/banner-contact.avif';

const Contact = () => {
    return (
        <div className="relative w-full">
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

            {/* Contact Information  */}
            <section className="w-full max-w-4xl mx-auto bg-white p-6 sm:p-8 md:p-10 lg:p-16 -mt-32 md:-mt-40 z-20 relative text-center">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="bg-blue-50 p-6 rounded-lg">
                            <div className="flex items-center mb-4">
                                <MapPin className="w-8 h-8 text-blue-700 mr-4" />
                                <h3 className="text-2xl font-bold text-gray-800">
                                    Our Location
                                </h3>
                            </div>
                            <p className="text-gray-600 leading-relaxed text-left">
                                <span className="font-semibold text-blue-700">Computer Vision Lab at MBZUAI</span>
                                <br />
                                Masdar City, Building 1B, 2nd Floor
                                <br />
                                Abu Dhabi, UAE
                            </p>
                        </div>

                        <div className="bg-green-50 p-6 rounded-lg">
                            <div className="flex items-center mb-4">
                                <Clock className="w-8 h-8 text-green-700 mr-4" />
                                <h3 className="text-2xl font-bold text-gray-800">
                                    Operating Hours
                                </h3>
                            </div>
                            <p className="text-gray-600 font-medium text-left">
                                Monday to Friday
                                <br />
                                9:00 AM to 5:00 PM
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-indigo-50 p-6 rounded-lg">
                            <div className="flex items-center mb-4">
                                <Mail className="w-8 h-8 text-indigo-700 mr-4" />
                                <h3 className="text-2xl font-bold text-gray-800">
                                    Email Address
                                </h3>
                            </div>
                            <div className="flex items-center text-left">
                                <a 
                                    href="mailto:example@domain.com" 
                                    className="text-gray-600 hover:text-indigo-700 transition-colors"
                                >
                                    example@domain.com
                                </a>
                            </div>
                        </div>

                        <div className="bg-purple-50 p-6 rounded-lg">
                            <div className="flex items-center mb-4">
                                <Phone className="w-8 h-8 text-purple-700 mr-4" />
                                <h3 className="text-2xl font-bold text-gray-800">
                                    Contact Number
                                </h3>
                            </div>
                            <div className="flex items-center text-left">
                                <a 
                                    href="tel:+XXXXXXXXXX" 
                                    className="text-gray-600 hover:text-purple-700 transition-colors"
                                >
                                    +XXX XXX XXX XXXX
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;