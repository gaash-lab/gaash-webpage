import React, { useState } from "react";
import { ChevronRight, CalendarDays } from "lucide-react";
import banner_news from './../assets/banner-news.avif';

// Structured news data with years
const newsData = {
    2024: [
        { date: "Mar 15", text: "Breakthrough in Computer Vision Algorithm Published in Top-Tier Journal" },
        { date: "Feb 22", text: "Research Paper Accepted at International Conference on AI" },
        { date: "Jan 10", text: "New Research Grant Awarded for Advanced Visual Analytics" }
    ],
    2023: [
        { date: "Dec 05", text: "Lab Hosts International Workshop on Visual Analytics" },
        { date: "Oct 17", text: "PhD Student Wins Best Paper Award at Computer Vision Symposium" },
        { date: "Sep 03", text: "Collaborative Research Project Launched with Tech Industry Leader" },
        { date: "Jun 22", text: "Groundbreaking Research on AI-Powered Image Recognition" }
    ],
    2022: [
        { date: "Nov 30", text: "Significant Advancement in Machine Learning Algorithms" },
        { date: "Aug 15", text: "Lab Receives Major Funding for Cutting-Edge Research" },
        { date: "Apr 02", text: "Publication in Nature Machine Intelligence" }
    ]
};

const NewsPage = () => {
    const [activeYear, setActiveYear] = useState(Object.keys(newsData)[0]);

    return (
        <div className="w-full bg-gray-50 min-h-screen">
            <div 
                className="h-[300px] bg-cover bg-center relative flex items-center justify-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("${banner_news}")`,
                }}
            >
                <div className="text-center px-4">
                    <h1 className="text-5xl font-bold text-white mb-6">
                        News & Updates
                    </h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <div className="flex justify-center space-x-4 mb-12">
                    {Object.keys(newsData).map((year) => (
                        <button
                            key={year}
                            onClick={() => setActiveYear(year)}
                            className={`
                                px-6 py-2 rounded-full transition-all duration-300
                                ${activeYear === year 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-gray-200 text-gray-700 hover:bg-blue-100'}
                            `}
                        >
                            {year}
                        </button>
                    ))}
                </div>

                <div className="space-y-6">
                    {newsData[activeYear].map((newsItem, index) => (
                        <div 
                            key={index} 
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <CalendarDays 
                                        className="w-5 h-5 text-blue-600 group-hover:text-blue-700 transition" 
                                    />
                                    <span className="font-semibold text-blue-600">
                                        {newsItem.date}
                                    </span>
                                </div>
                                <div className="flex-grow">
                                    <p className="text-gray-800 group-hover:text-blue-800 transition">
                                        {newsItem.text}
                                    </p>
                                </div>
                                <ChevronRight 
                                    className="w-5 h-5 text-gray-400 group-hover:translate-x-1 group-hover:text-blue-600 transition" 
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsPage;