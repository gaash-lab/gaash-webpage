import React from 'react';
import banner_about from './../assets/banner-about.avif';
import ScrollToTop from '../components/ScrollToTop';
import { Mail, Globe, BookOpen } from "lucide-react";
import { facultyMembers, PhdScholars, Students, ExternalCollaborators } from '../data/constants';

const ProfileCard = ({ name, designation, email, website, scholar, image, type }) => {
    const cardStyles = {
        faculty: "p-8 border-l-8",
        collaborator: "p-8 border-l-8",
        scholar: "p-6 border-l-4",
        student: "p-4 border-l-2",
    };

    const imageStyles = {
        faculty: "w-48 h-48",
        collaborator: "w-48 h-48",
        scholar: "w-32 h-32",
        student: "hidden",
    };

    return (
        <div
            className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${cardStyles[type]} border-blue-500`}
            style={{ width: '400px' }} // Fixed width for cards
        >
            <img
                src={image}
                alt={name}
                className={`object-cover rounded-full mx-auto mb-4 border-4 border-blue-500 ${imageStyles[type]}`}
            />
            <h3 className="text-xl font-bold text-gray-900 text-center">{name}</h3>
            {type !== "student" && (
                <p className="text-gray-600 text-center mb-4">{designation}</p>
            )}
            <div className="flex justify-center space-x-4 text-blue-600">
                {email && (
                    <a
                        href={`mailto:${email}`}
                        className="hover:text-blue-800"
                    >
                        <Mail />
                    </a>
                )}
                {website && (
                    <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-800"
                    >
                        <Globe />
                    </a>
                )}
                {scholar && (
                    <a
                        href={scholar}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-800"
                    >
                        <BookOpen />
                    </a>
                )}
            </div>
        </div>
    );
};

const Team = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div 
                className="h-[300px] bg-cover bg-center relative flex items-center justify-center"
                style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("${banner_about}")` }}
            >
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-white mb-4">Our Team and Collaborators</h1>
                    <p className="text-lg text-gray-200">Get to know more about our team and collaborators.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">                
                <section className="mb-12 lg:mb-28">
                    <h3 className="text-3xl font-bold text-center text-gray-700 border-b-4 border-blue-500 pb-2 mb-6">Faculty Members</h3>
                    <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 lg:gap-y-16 lg:gap-x-60">
                        {facultyMembers.map((member, index) => (
                            <ProfileCard key={index} {...member} />
                        ))}
                    </div>
                </section>

                <section className="mb-12 lg:mb-28">
                    <h3 className="text-3xl font-bold text-center text-gray-700 border-b-4 border-blue-500 pb-2 mb-6">External Collaborators</h3>
                    <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 lg:gap-y-16 lg:gap-x-60">
                        {ExternalCollaborators.map((member, index) => (
                            <ProfileCard key={index} {...member} />
                        ))}
                    </div>
                </section>

                <section className="mb-12 lg:mb-28">
                    <h3 className="text-3xl font-bold text-center text-gray-700 border-b-4 border-blue-500 pb-2 mb-6">PHD Scholars</h3>
                    <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 lg:gap-y-16 lg:gap-x-20">
                        {PhdScholars.map((member, index) => (
                            <ProfileCard key={index} {...member} />
                        ))}
                    </div>
                </section>

                <section className="mb-12 lg:mb-28">
                    <h3 className="text-3xl font-bold text-center text-gray-700 border-b-4 border-blue-500 pb-2 mb-6">Students</h3>
                    <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 lg:gap-y-16 lg:gap-x-20">
                        {Students.map((member, index) => (
                            <ProfileCard key={index} {...member} />
                        ))}
                    </div>
                </section>
            </div>

            <ScrollToTop />
        </div>
    );
};

export default Team;