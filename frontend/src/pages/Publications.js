import React, { useEffect, useState } from 'react';
import banner_publications from './../assets/banner-publications.avif'
import ScrollToTop from '../components/ScrollToTop';
import PublicationCard from "../components/PublicationCard";
import axios from '../api/axios';


const Publications = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [publications, setPublications] = useState(null);
    const [sortedYears, setSortedYears] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0); 
    }, []);

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const response = await axios.get('/publications');
                const publicationsByYear = response.data.reduce((acc, pub) => {
                    if (!acc[pub.year]) {
                        acc[pub.year] = [];
                    }
                    acc[pub.year].push(pub);
                    return acc;
                }, {});
                const sortedYears = Object.keys(publicationsByYear).sort((a, b) => b.localeCompare(a));
                setSortedYears(sortedYears);
                setPublications(publicationsByYear);
            } catch (error) {
                console.error("Error fetching publications:", error);
            }
        };

        fetchPublications();
    }, [])

    return (
        <div className="bg-gray-50 min-h-screen">
            <div
                className="h-[300px] bg-cover bg-center relative flex items-center justify-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("${banner_publications}")`,
                    backgroundAttachment: 'fixed'
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

            <div className="container mx-auto px-4 md:px-12 lg:px-56 py-12">
                {sortedYears && sortedYears.map((year) => (
                    <div key={year} className="mb-12">
                        <h2 className="text-4xl text-center font-bold text-gray-800 mb-8 border-b-4 border-blue-500 pb-2">
                            {year}
                        </h2>
                        <div className="space-y-8">
                            {publications && publications[year]
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

export default Publications;