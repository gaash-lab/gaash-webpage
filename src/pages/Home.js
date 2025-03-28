import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const labImages = [
    "lab-pics/lab1.jpg",
    "lab-pics/lab2.jpg",
    "lab-pics/lab3.jpg",
    "lab-pics/lab4.jpg"
];

const recentNews = [
    { date: "Mar 15, 2024", text: "Breakthrough in Computer Vision Algorithm" },
    { date: "Feb 22, 2024", text: "Research Paper Accepted at Top-Tier Conference" },
    { date: "Jan 10, 2024", text: "New Grant Awarded for AI Research" },
    { date: "Dec 05, 2023", text: "Lab Hosts International Workshop on Visual Analytics" }
];

const highlights = [
    {
        title: "Cutting-Edge Research",
        subtitle: "Advanced Visual Analytics",
        description: "Our lab is at the forefront of computer vision research, developing innovative solutions for complex visual understanding challenges.",
        link: "/research"
    },
    {
        title: "Interdisciplinary Approach",
        subtitle: "Bridging Technology and Insight",
        description: "We combine machine learning, computer vision, and domain expertise to solve real-world problems across various industries.",
        link: "/about"
    }
];

const HomePage = () => {
    return (
        <div className="w-full min-h-screen bg-gray-50">
            <section className="container mx-auto px-4 py-16 lg:py-24">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Lab Description */}
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
                            Intelligent Visual Analytics Lab
                        </h1>
                        <h2 className="text-2xl md:text-3xl font-semibold text-blue-700">
                            Computer Vision Lab @GAASH
                        </h2>
                        <p className="text-gray-700 leading-relaxed text-lg">
                            Welcome to the <span className="text-blue-700">Intelligent Visual Analytics Lab (IVAL)</span> , part of the Department of Computer Vision at MBZUAI.
                            IVAL conducts fundamental research in the field of computer vision and machine learning for semantic understanding 
                            of visual data. Our research covers a wide range of topics: computational imaging, visual recognition, detection, 
                            segmentation and tracking, adversarial robustness, generative models, detailed video understanding, action recognition, 
                            and abnormal event detection. The research work is carried out with a variety of visual data sources, including consumer camera 
                            images, video data, satellite and drone imagery, live webcam streams, and medical imagery. Research at IVAL strives to design and 
                            build accurate and efficient algorithms for automatically extracting semantic information from visual data.
                        </p>
                        <div className="flex space-x-4">
                            <Link 
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg 
                                hover:bg-blue-700 transition flex items-center group"
                                to={"/about"}
                            >
                                Learn More 
                                <ArrowRight 
                                    className="ml-2 group-hover:translate-x-1 transition" 
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Lab Image Slideshow */}
                    <div className="rounded-xl overflow-hidden shadow-xl">
                        <Swiper
                            modules={[Autoplay, Pagination, Navigation]}
                            spaceBetween={50}
                            slidesPerView={1}
                            navigation
                            pagination={{ clickable: true }}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            className="h-[500px] w-full"
                        >
                            {labImages.map((image, index) => (
                                <SwiperSlide key={index}>
                                    <img 
                                        src={image} 
                                        alt={`Lab Image ${index + 1}`} 
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section>

            {/* Recent News Section */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
                        Recent News
                    </h2>
                    <div className="max-w-2xl mx-auto space-y-6">
                        {recentNews.map((news, index) => (
                            <div 
                                key={index} 
                                className="bg-gray-100 p-6 rounded-lg hover:bg-blue-50 transition-colors group"
                            >
                                <div className="flex items-center space-x-4">
                                    <span className="text-blue-600 font-semibold min-w-[120px]">
                                        {news.date}
                                    </span>
                                    <p className="text-gray-800 group-hover:text-blue-800 transition">
                                        {news.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Highlights Section */}
            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
                        Lab Highlights
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {highlights.map((highlight, index) => (
                            <div 
                                key={index} 
                                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
                            >
                                <h3 className="text-xl font-semibold text-blue-600 mb-3">
                                    {highlight.title}
                                </h3>
                                <h4 className="text-2xl font-bold text-gray-800 mb-4">
                                    {highlight.subtitle}
                                </h4>
                                <p className="text-gray-600 mb-6">
                                    {highlight.description}
                                </p>
                                <Link to={highlight.link}>
                                    <button 
                                        className="bg-blue-500 text-white px-5 py-2 rounded-lg 
                                        hover:bg-blue-600 transition flex items-center group"
                                    >
                                        Explore 
                                        <ArrowRight 
                                            className="ml-2 w-4 h-4 group-hover:translate-x-1 transition" 
                                        />
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;