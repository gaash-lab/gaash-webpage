import React, { useState } from 'react';
import banner_publications from './../assets/banner-publications.avif'
import ScrollToTop from '../components/ScrollToTop';
import { ExternalLink, Code } from 'lucide-react';
import { AllPublications } from '../data/publications';


const Publications = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Group publications by year and sort years in descending order
    const publicationsByYear = AllPublications.reduce((acc, pub) => {
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

            <div className="container mx-auto px-4 md:px-12 lg:px-28 py-12">
                {sortedYears.map((year) => (
                    <div key={year} className="mb-12">
                        <h2 className="text-4xl font-bold text-gray-800 mb-8 border-b-4 border-blue-500 pb-2">
                            {year}
                        </h2>
                        <div className="space-y-8">
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
                    <div className="flex items-center justify-between mt-6">
                        <span className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                            {publication.conference}
                        </span>
                        <div className="flex space-x-4">
                            <a 
                                href={publication.paperLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 text-sm flex items-center group"
                            >
                                <ExternalLink className="h-5 w-5 mr-1 group-hover:text-blue-800 transition-colors" />
                                <span className="hidden group-hover:inline">View Paper</span>
                            </a>
                            <a 
                                href={publication.codeLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 text-sm flex items-center group"
                            >
                                <Code className="h-5 w-5 mr-1 group-hover:text-blue-800 transition-colors" />
                                <span className="hidden group-hover:inline">View Code</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Publications;