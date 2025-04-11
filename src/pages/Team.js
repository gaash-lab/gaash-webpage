import React, { useEffect } from 'react';
import banner_about from './../assets/banner-about.avif';
import ScrollToTop from '../components/ScrollToTop';
// import { Mail, Globe, Linkedin, Github } from "lucide-react";
import { SiGooglescholar } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { FaGlobe } from "react-icons/fa";
import { facultyMembers, PhdScholars, Students, ExternalCollaborators, PostDoc } from '../data/team';
import noimage from '../assets/noimage.png';
const ProfileCard = ({ name, designation, email, website, scholar, image, type, linkedin, github }) => {
    const cardPadding = {
        faculty: "p-8",
        collaborator: "p-8",
        scholar: "p-6",
    };

    const imageStyles = {
        faculty: "w-48 h-48 mt-2",
        collaborator: "w-40 h-40 mt-2",
        scholar: "w-32 h-32 mt-2",
    };

    const boxWidth = {
        faculty: "400px",
        collaborator: "350px",
        scholar: "300px"
    };

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top
    }, []);

    return (
        <div
            className={`bg-white rounded-lg  border-blue-500 border-2 ${cardPadding[type]} transition-shadow duration-300 transform hover:-translate-y-1 hover:shadow-xl`}
            style={{
                width: `${boxWidth[type]}`,
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)'
            }}
        >
            <img
                src={image ? image : noimage}
                alt={name}
                className={`object-cover object-top rounded-full mx-auto mb-4 border-4 border-blue-500 ${imageStyles[type]}`}
            />
            <h3 className="text-xl font-bold text-gray-900 text-center">{name}</h3>
            <p className="text-gray-600 text-center mb-4">{designation}</p>
            <div className="flex justify-center space-x-4 text-blue-600">
                {email && (
                    <a href={`mailto:${email}`} className="hover:text-blue-800">
                        <SiGmail size={20} />
                    </a>
                )}
                {website && (
                    <a href={website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">
                        <FaGlobe size={20} />
                    </a>
                )}
                {scholar && (
                    <a href={scholar} target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">
                        <SiGooglescholar size={20} />
                    </a>
                )}
                {linkedin && (
                    <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">
                        <FaLinkedin size={20} />
                    </a>
                )}
                {github && (
                    <a href={github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">
                        <FaGithub size={20} />
                    </a>
                )}
            </div>
        </div>
    );
};


const StudentCard = ({ name, website, linkedin, github }) => {
    const getLink = () => {
        if (website) return website;
        if (linkedin) return linkedin;
        if (github) return github;
        return null;
    };

    const link = getLink();

    return (
        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 py-3 px-6 border-blue-500 border-2 transform hover:-translate-y-1 w-64 relative"
            style={{ boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)', width: '300px' }}>
            {link ? (
                <a href={link} target="_blank" rel="noopener noreferrer" className="block">
                    <h3 className="text-lg font-medium text-blue-600 hover:text-blue-800 text-center">{name}</h3>
                </a>
            ) : (
                <h3 className="text-lg font-medium text-gray-700 text-center">{name}</h3>
            )}

            {link && (
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                    {website ? <FaGlobe size={20} className="text-blue-500" /> :
                        linkedin ? <FaLinkedin size={20} className="text-blue-500" /> :
                            <FaGithub size={20} className="text-blue-500" />}
                </div>
            )}
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
                    <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 lg:gap-y-16 lg:gap-x-[600px]">
                        {facultyMembers.map((member, index) => (
                            <ProfileCard key={index} {...member} />
                        ))}
                    </div>
                </section>

                <section className="mb-12 lg:mb-28">
                    <h3 className="text-3xl font-bold text-center text-gray-700 border-b-4 border-blue-500 pb-2 mb-6">External Collaborators</h3>
                    <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 lg:gap-y-16 lg:gap-x-[400px]">
                        {ExternalCollaborators.map((member, index) => (
                            <ProfileCard key={index} {...member} />
                        ))}
                    </div>
                </section>

                <section className="mb-12 lg:mb-28">
                    <h3 className="text-3xl font-bold text-center text-gray-700 border-b-4 border-blue-500 pb-2 mb-6">Post Doc</h3>
                    <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 lg:gap-y-16 lg:gap-x-20">
                        {PostDoc.map((member, index) => (
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
                    <h3 className="text-3xl font-bold text-center text-gray-700 border-b-4 border-blue-500 pb-2 mb-6">B.Tech Students</h3>
                    <div className="flex flex-wrap justify-center gap-6">
                        {Students.map((student, index) => (
                            <StudentCard key={index} {...student} />
                        ))}
                    </div>
                </section>
            </div>

            <ScrollToTop />
        </div>
    );
};

export default Team;