import React, { useState } from 'react';
import banner_publications from './../assets/banner-publications.avif'
import ScrollToTop from '../components/ScrollToTop';

const dummyPublications = [
    {
        id: 1,
        title: "Advanced Multi-Modal Learning Techniques in Computer Vision",
        authors: "John Doe, Jane Smith, Alex Johnson",
        conference: "CVPR 2024",
        link: "#",
        image: "/api/placeholder/800/600",
        year: "2024"
    },
    {
        id: 2,
        title: "Semantic Understanding in Limited Supervision Scenarios",
        authors: "Emily Wong, Michael Lee, Sarah Kim",
        conference: "NeurIPS 2024",
        link: "#",
        image: "/api/placeholder/800/600",
        year: "2024"
    },
    {
        id: 3,
        title: "Person-Centric Vision: A Comprehensive Approach",
        authors: "David Brown, Lisa Chen, Robert Garcia",
        conference: "ICCV 2023",
        link: "#",
        image: "/api/placeholder/800/600",
        year: "2023"
    },
    {
        id: 4,
        title: "Generative Models in Visual Synthesis",
        authors: "Maria Rodriguez, Tom Wilson, Anna Patel",
        conference: "ECCV 2023",
        link: "#",
        image: "/api/placeholder/800/600",
        year: "2023"
    },
    {
        id: 5,
        title: "Remote Sensing and Earth Observation Techniques",
        authors: "Carlos Mendez, Emma Thompson, Raj Patel",
        conference: "WACV 2022",
        link: "#",
        image: "/api/placeholder/800/600",
        year: "2022"
    },
    {
        id: 6,
        title: "Medical Image Analysis using Deep Learning",
        authors: "Sophie Martin, Kevin Zhang, Olivia Nguyen",
        conference: "MICCAI 2022",
        link: "#",
        image: "/api/placeholder/800/600",
        year: "2022"
    }
];

const Publications = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Group publications by year and sort years in descending order
    const publicationsByYear = dummyPublications.reduce((acc, pub) => {
        if (!acc[pub.year]) {
            acc[pub.year] = [];
        }
        acc[pub.year].push(pub);
        return acc;
    }, {});

    const sortedYears = Object.keys(publicationsByYear).sort((a, b) => b.localeCompare(a));

    return (
        <div className="bg-gray-50 min-h-screen">
            <div 
                className="h-[300px] bg-cover bg-center relative flex items-center justify-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("${banner_publications}")`,
                }}
            >
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-white mb-6">
                        Research Publications
                    </h1>
                    <input 
                        type="text"
                        placeholder="Search publications..."
                        className="w-full max-w-xl px-4 py-3 rounded-full text-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {sortedYears.map((year) => (
                    <div key={year} className="mb-12">
                        <h2 className="text-4xl font-bold text-gray-800 mb-8 border-b-4 border-blue-500 pb-2">
                            {year}
                        </h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {publicationsByYear[year]
                                .filter(pub => 
                                    pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    pub.conference.toLowerCase().includes(searchTerm.toLowerCase())
                                )
                                .map((publication) => (
                                    <PublicationCard 
                                        key={publication.id} 
                                        publication={publication} 
                                    />
                                ))
                            }
                        </div>
                    </div>
                ))}
            </div>

            <ScrollToTop />
        </div>
    );
};

const PublicationCard = ({ publication }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-500">
            <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900 hover:text-blue-800 transition-colors">
                    {publication.title}
                </h3>
                <div className="text-gray-600 text-sm">
                    <p className="font-medium">{publication.authors}</p>
                    <div className="flex items-center justify-between mt-2">
                        <span className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                            {publication.conference}
                        </span>
                        <a 
                            href={publication.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm flex items-center group"
                        >
                            View Paper
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M14 5l7 7m0 0l-7 7m7-7H3" 
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Publications;