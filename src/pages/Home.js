import React, { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import lab1 from "../assets/lab-pics/lab1.jpg";
import Logo from "../assets/Logo.png";
import NIT from "../assets/NIT.png";
import { highlights, recentNews } from "../data/constants";

const labImages = [
    lab1
];

const HomePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top
    }, []);
    return (
        <div className="w-full min-h-screen bg-gray-50">

            {/* Changed from h-screen to min-h-screen to prevent overflow issues */}
            <section className="relative min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 overflow-hidden py-16 lg:py-20">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
                    <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-blue-300 opacity-20 blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    {/* Changed to flex-col on mobile and grid on md screens */}
                    <div className="flex flex-col md:grid md:grid-cols-2 gap-12 items-center">
                        {/* Lab Description with logos */}
                        <div className="space-y-6">
                            <div className="inline-block bg-blue-100 px-4 py-1 rounded-full">
                                <span className="text-blue-800 font-medium">Welcome to</span>
                            </div>

                            {/* Logos and Lab title section - improved responsive design */}
                            <div className="flex flex-col items-center mb-6 space-y-4 sm:space-y-6 lg:space-y-0 lg:flex-row lg:justify-between">
                                {/* Logo 1 - visible on all screen sizes */}
                                <img
                                    src={Logo}
                                    alt="GAASH Logo"
                                    className="h-16 w-auto object-contain sm:h-18 lg:h-20"
                                />

                                {/* Title - centered on mobile/tablet, between logos on desktop */}
                                <div className="text-center">
                                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-900">
                                        GAASH Lab
                                    </h1>
                                    <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-blue-700 mt-1">
                                        AI Research Laboratory
                                    </p>
                                </div>

                                {/* Logo 2 - visible on all screen sizes */}
                                <img
                                    src={NIT}
                                    alt="NIT Logo"
                                    className="h-16 w-auto object-contain sm:h-18 lg:h-20"
                                />
                            </div>

                            <p className="text-gray-700 leading-relaxed text-base sm:text-lg text-justify">
                                The <span className="text-blue-700 font-semibold">GAASH Lab</span> at the National Institute of Technology Srinagar is committed to advancing foundational and applied research in AI-Driven Computer Architectures, Computer Vision, Data Science, and Algorithmic Design. The lab focuses on developing efficient and interpretable visual architectures, constructing robust and diverse datasets, and designing scalable algorithms.
                            </p>

                            <p className="text-gray-700 leading-relaxed text-base sm:text-lg text-justify">
                                Our research spans object detection, scene understanding, domain adaptation, and human-centric perception, with applications across natural scenes, satellite imagery, medical scans, and surveillance systems.
                            </p>

                            <div className="flex pt-6">
                                <Link
                                    className="bg-blue-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg 
                      hover:bg-blue-700 transition flex items-center group font-medium text-base sm:text-lg shadow-md hover:shadow-lg"
                                    to={"/research"}
                                >
                                    Explore Our Research
                                    <ArrowRight
                                        className="ml-2 group-hover:translate-x-1 transition"
                                    />
                                </Link>
                            </div>
                        </div>

                        {/* Lab Image Slideshow - Adjusted height for mobile */}
                        <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-blue-100 transform hover:scale-[1.02] transition duration-300 w-full mb-6">
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
                                className="h-[300px] sm:h-[400px] md:h-[500px] w-full" // Responsive height
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
                </div>
            </section>

            {/* Research Focus*/}
            <section className="bg-gradient-to-r from-blue-900 to-blue-700 py-16 text-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                        Our Research Focus
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm hover:bg-opacity-20 transition transform hover:-translate-y-1 hover:shadow-xl">
                            <h3 className="text-xl font-semibold mb-4">AI-Driven Computer Architectures</h3>
                            <p className="text-gray-100">
                                Pioneering high-performance, adaptive intelligence systems tailored for next-generation computing needs.
                            </p>
                        </div>
                        <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm hover:bg-opacity-20 transition transform hover:-translate-y-1 hover:shadow-xl">
                            <h3 className="text-xl font-semibold mb-4">Computer Vision & Deep Learning</h3>
                            <p className="text-gray-100">
                                Exploring the synergy between CNNs and transformers to push the boundaries of visual recognition and classification.
                            </p>
                        </div>
                        <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm hover:bg-opacity-20 transition transform hover:-translate-y-1 hover:shadow-xl">
                            <h3 className="text-xl font-semibold mb-4">Federated Learning & LLMs</h3>
                            <p className="text-gray-100">
                                Developing privacy-preserving AI systems with transformer models emphasizing zero-shot and in-context learning capabilities.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recent News Section */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-12">
                        Recent News
                    </h2>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {recentNews.map((news, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500 hover:bg-blue-50 transition-colors group shadow-sm"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {highlights.map((highlight, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-gray-100 hover:border-blue-200"
                            >
                                <div className="inline-block bg-blue-50 px-3 py-1 rounded-full mb-3">
                                    <span className="text-blue-700 font-medium">{highlight.title}</span>
                                </div>
                                <h4 className="text-2xl font-bold text-gray-800 mb-4">
                                    {highlight.subtitle}
                                </h4>
                                <p className="text-gray-600 mb-6">
                                    {highlight.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer/CTA Section */}
            <section className="bg-gradient-to-br from-blue-100 to-blue-50 py-12">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-2xl font-bold text-blue-900 mb-6">
                        Interested in joining our lab?
                    </h3>
                    <p className="text-gray-700 max-w-2xl mx-auto mb-8">
                        We welcome talented students and researchers passionate about advancing the field of AI.
                    </p>
                    <Link
                        className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg 
                        hover:bg-blue-700 transition font-medium text-lg shadow-md hover:shadow-lg"
                        to="/opportunities"
                    >
                        Join Us
                        <ArrowRight className="ml-2" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;