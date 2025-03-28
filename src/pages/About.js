import React from 'react';
import banner_about from './../assets/banner-about.avif';
import ScrollToTop from '../components/ScrollToTop';
import { Mail, Globe, BookOpen } from "lucide-react";
import { facultyMembers } from '../data/constants';

const ProfileCard = ({ name, designation, email, website, scholar, image }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-500">
            <img src={image} alt={name} className="w-40 h-40 object-cover rounded-full mx-auto mb-4 border-4 border-blue-500" />
            <h3 className="text-xl font-bold text-gray-900 text-center">{name}</h3>
            <p className="text-gray-600 text-center mb-4">{designation}</p>
            <div className="flex justify-center space-x-4 text-blue-600">
                {email && <a href={`mailto:${email}`} className="hover:text-blue-800"><Mail /></a>}
                {website && <a href={website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-800"><Globe /></a>}
                {scholar && <a href={scholar} target="_blank" rel="noopener noreferrer" className="hover:text-blue-800"><BookOpen /></a>}
            </div>
        </div>
    );
};

const About = () => {
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

            <div className="container mx-auto px-4 py-12">
                <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Meet The Team</h2>
                
                <section className="mb-12">
                    <h3 className="text-3xl font-bold text-gray-700 border-b-4 border-blue-500 pb-2 mb-6">Faculty Members</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {facultyMembers.map((member, index) => (
                            <ProfileCard key={index} {...member} />
                        ))}
                    </div>
                </section>

                <section className="mb-12">
                    <h3 className="text-3xl font-bold text-gray-700 border-b-4 border-blue-500 pb-2 mb-6">PHD Scholars</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {facultyMembers.map((member, index) => (
                            <ProfileCard key={index} {...member} />
                        ))}
                    </div>
                </section>

                <section className="mb-12">
                    <h3 className="text-3xl font-bold text-gray-700 border-b-4 border-blue-500 pb-2 mb-6">Students</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {facultyMembers.map((member, index) => (
                            <ProfileCard key={index} {...member} />
                        ))}
                    </div>
                </section>
            </div>

            <ScrollToTop />
        </div>
    );
};

export default About;
