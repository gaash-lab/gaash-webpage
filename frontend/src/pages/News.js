import React, { useEffect, useState } from "react";
import { ChevronRight, CalendarDays } from "lucide-react";
import banner_news from './../assets/banner-news.avif';
import ScrollToTop from '../components/ScrollToTop';
import { Link } from "react-router-dom";
import axios from '../api/axios';


const NewsPage = () => {
    const [activeYear, setActiveYear] = useState(null);
    const [news, setNews] = useState(null);
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top
    }, []);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get('news/');
                const groupedNews = response.data.reduce((acc, item) => {
                    const year = item.year;
                    if (!acc[year]) {
                        acc[year] = [];
                    }
                    acc[year].push({
                        date: item.date,
                        text: item.text,
                        link: item.link,
                        recent: item.recent
                    });
                    return acc;
                }, {});
                console.log(groupedNews);
                setNews(groupedNews);
                setActiveYear(Object.keys(groupedNews).sort((a, b) => b - a)[0]);
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="w-full bg-gray-50 min-h-screen">
            <div
                className="h-[300px] bg-cover bg-center relative flex items-center justify-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("${banner_news}")`,
                    backgroundAttachment: 'fixed'
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
                    {news && Object.keys(news).sort((a, b) => b - a).map((year) => (
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
                    {news && news[activeYear].map((newsItem, index) => (
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
                                {newsItem && newsItem.link && <Link
                                    to={newsItem.link}
                                    className="text-blue-600 hover:text-blue-800 transition flex items-center"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <p>Link</p>
                                    <ChevronRight
                                        size={30}
                                        className="w-5 h-5 group-hover:translate-x-1 text-blue-600 transition"
                                    />

                                </Link>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ScrollToTop />
        </div>
    );
};

export default NewsPage;