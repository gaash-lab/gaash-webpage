import React, { useState } from "react";
import banner_research from './../assets/banner-research.avif'
import ScrollToTop from "../components/ScrollToTop";
import {researchInterests} from "../data/constants"

const Research = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Get unique categories
    const categories = [
        'All', 
        ...new Set(researchInterests.map(interest => interest.category))
    ];

    const filteredResearch = researchInterests.filter(interest => 
        (selectedCategory === 'All' || interest.category === selectedCategory)
    );

    return (
        <div className="bg-gray-50 min-h-screen">
            <div 
                className="h-[300px] bg-cover bg-center relative flex items-center justify-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("${banner_research}")`,
                }}
            >
                <div className="text-center px-4">
                    <h1 className="text-5xl font-bold text-white mb-6">
                        Research Interests
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6 flex flex-wrap justify-center gap-2">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`
                            px-4 py-2 rounded-full text-sm font-medium transition-colors
                            ${selectedCategory === category 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-200 text-gray-700 hover:bg-blue-100'}
                        `}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredResearch.map((interest) => (
                        <ResearchCard 
                            key={interest.id} 
                            research={interest} 
                        />
                    ))}
                </div>
            </div>

            <ScrollToTop />
        </div>
    );
};

const ResearchCard = ({ research }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            {/* Image */}
            <div className="h-48 overflow-hidden">
                <img 
                    src={research.img} 
                    alt={research.title} 
                    loading="lazy"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {research.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">
                    {research.description}
                </p>

                {/* Project Count and Category */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-2">
                        <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                            {research.category}
                        </span>
                        <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                            {research.projectCount} Projects
                        </span>
                    </div>
                </div>

                {/* Explore More Button */}
                <a 
                    href={research.detailLink}
                    className="w-full text-center py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                    Explore More
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-5 w-5 ml-2" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                    >
                        <path 
                            fillRule="evenodd" 
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                            clipRule="evenodd" 
                        />
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default Research;