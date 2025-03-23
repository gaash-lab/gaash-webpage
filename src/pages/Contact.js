import React from 'react';
import { Mail, Phone } from "lucide-react";
import banner_contact from './../assets/banner-contact.avif';

const Contact = () => {
    return (
        <div className="w-full">
            <section className="w-full flex flex-col items-center text-center">
                <div
                    className="w-full h-[400px] bg-cover bg-center mt-4 z-30 relative"
                    style={{
                        backgroundImage: `url("${banner_contact}")`,
                    }}
                />
            </section>

            <section className="w-full max-w-4xl mx-auto bg-white p-6 sm:p-8 md:p-10 lg:p-16 -mt-32 md:-mt-40 z-40 relative text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 font-oswald tracking-wider">
                    Contacts
                </h2>

                <p className="leading-7 sm:leading-8 md:leading-9 text-justify px-4 sm:px-6 md:px-8 text-base sm:text-lg mt-6">
                    <span className="font-semibold text-blue-700">Computer Vision Lab at MBZUAI</span> <br />
                    Masdar City, Building 1B, 2nd Floor, Abu Dhabi, UAE.
                </p>
                <p className="leading-7 sm:leading-8 md:leading-9 text-justify px-4 sm:px-6 md:px-8 text-base sm:text-lg mt-4">
                    Enter Building 1B close to Multipurpose Hall and take the stairs/elevator to Floor 2.
                </p>
                <p className="font-semibold mt-6 text-lg sm:text-xl">9:00 to 17:00 Monday to Friday</p>

                <div className="space-y-4 sm:space-y-6 md:space-y-8 px-4 sm:px-6 md:px-8 mt-10">
                    <div className="flex items-center justify-left space-x-4">
                        <Mail className="text-blue-700 w-6 h-6 sm:w-7 sm:h-7" />
                        <p className="text-base sm:text-lg">example@domain.com</p>
                    </div>
                    <div className="flex items-center justify-left space-x-4">
                        <Phone className="text-blue-700 w-6 h-6 sm:w-7 sm:h-7" />
                        <p className="text-base sm:text-lg">+XXX XXX XXX XXXX</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
