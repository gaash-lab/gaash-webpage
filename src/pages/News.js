import React, { useState } from "react";
import { ChevronRight, CalendarDays } from "lucide-react";
import banner_news from './../assets/banner-news.avif';
import { newsData } from "../data/constants";


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