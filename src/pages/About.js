import React from 'react';
import banner_about from './../assets/banner-about.avif';
import Heading from '../components/Heading';
import { Mail, Globe, BookOpen } from "lucide-react";
import ScrollToTop from '../components/ScrollToTop';

const facultyMembers = [
    {
        name: "Dr. Alice Johnson",
        designation: "Professor, Computer Science",
        email: "alice.johnson@example.com",
        website: "https://alicejohnson.com",
        scholar: "https://scholar.google.com/citations?user=alice",
        image: "https://placehold.co/200x300"
    },
    {
        name: "Dr. Robert Smith",
        designation: "Associate Professor, AI Research",
        email: "robert.smith@example.com",
        website: "https://robertsmith.ai",
        scholar: "https://scholar.google.com/citations?user=robert",
        image: "https://placehold.co/200x300"
    },
    {
        name: "Dr. Emily Carter",
        designation: "Assistant Professor, Data Science",
        email: "emily.carter@example.com",
        website: "https://emilycarterds.com",
        scholar: "https://scholar.google.com/citations?user=emily",
        image: "https://placehold.co/200x300"
    },
    {
        name: "Dr. Emily Carter",
        designation: "Assistant Professor, Data Science",
        email: "emily.carter@example.com",
        website: "https://emilycarterds.com",
        scholar: "https://scholar.google.com/citations?user=emily",
        image: "https://placehold.co/200x300"
    },
    {
        name: "Dr. Emily Carter",
        designation: "Assistant Professor, Data Science",
        email: "emily.carter@example.com",
        website: "https://emilycarterds.com",
        scholar: "https://scholar.google.com/citations?user=emily",
        image: "https://placehold.co/200x300"
    },
];

const ProfileCard = ({ name, designation, email, website, scholar, image }) => {
    return (
        <div className="w-full max-w-xs rounded-xl border border-gray-500 bg-white overflow-hidden font-oswald tracking-wide">
            <div className="w-full h-[300px]">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4 text-center">
                <h2 className="text-xl font-semibold text-blue-800">{name}</h2>
                <p className="text-gray-500">{designation}</p>
                <div className="flex justify-center space-x-4 mt-3">
                    <a href={`mailto:${email}`} className="text-gray-600 hover:text-blue-500">
                        <Mail size={20} />
                    </a>
                    <a href={website} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500">
                        <Globe size={20} />
                    </a>
                    <a href={scholar} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500">
                        <BookOpen size={20} />
                    </a>
                </div>
            </div>
        </div>
    );
};



const About = () => {
    return (
        <div className='space-y-10'>
            <section className="w-full flex flex-col items-center text-center">
                <div
                    className="w-full h-[300px] md:h-[400px] bg-cover bg-center mt-4 relative"
                    style={{ backgroundImage: `url("${banner_about}")` }}
                >
                    <div className="absolute bottom-0 w-full flex justify-center">
                        <div className="bg-white/60 p-4 md:p-6 lg:p-8 mx-4 md:mx-auto w-full max-w-3xl md:px-12 lg:px-16 space-y-4 md:space-y-6">
                            <h1 className="font-oswald text-3xl md:text-4xl lg:text-5xl font-bold">
                                Our Team and Collaborators
                            </h1>
                            <p className="text-sm md:text-base lg:text-lg">
                                Get to know more about our team and collaborators.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <h1 className="font-oswald text-3xl md:text-4xl lg:text-5xl font-bold text-center my-10">
                Meet The Team
            </h1>

            <section>
                <Heading className="text-blue-800">Faculty Members</Heading>
                <div className="flex flex-wrap justify-evenly gap-6 mt-6">
                    {facultyMembers.map((member, index) => (
                        <ProfileCard key={index} {...member} />
                    ))}
                </div>
            </section>

            <section>
                <Heading className="text-blue-800">Postdocs / Research Scientists</Heading>
            </section>
            <section>
                <Heading className="text-blue-800">PhD Candidates</Heading>
            </section>
            <section>
                <Heading className="text-blue-800">Graduate Students</Heading>
            </section>
            <section>
                <Heading className="text-blue-800">Research Assistants</Heading>
            </section>
            <ScrollToTop />
        </div>
    );
};

export default About;
