import React from "react";
import banner_home from './../assets/banner-home.jpg'
import Button from "../components/Button";
import Heading from "../components/Heading";
import ReactSwiper from "../components/ReactSwiper";
import {highlights, newsItems} from "../data/constants";

const HomePage = () => {
    
    return (
        <div className="w-full">
            <section className="w-full flex flex-col items-center text-center">
                <div className="my-10 font-oswald space-y-8">
                    <h2 className="text-3xl md:text-5xl font-extrabold">Intelligent Visual Analytics Lab</h2>
                    <p className="text-lg md:text-2xl lg:text-3xl mt-2 font-semibold">Computer Vision Lab @ GAASH</p>
                </div>
                <div
                    className="w-full h-[400px] md:h-[500px] bg-cover bg-center mt-4 z-30 relative"
                    style={{
                        backgroundImage: `url("${banner_home}")`,
                    }}
                />
            </section>

            <section className="w-full max-w-4xl mx-auto bg-white p-6 sm:p-8 md:p-10 lg:p-16 -mt-32 md:-mt-40 z-40 relative text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8 font-oswald tracking-wider">
                    Research
                </h2>
                <p className="leading-7 sm:leading-8 md:leading-9 text-justify px-4 sm:px-6 md:px-8 text-base sm:text-normal md:text-lg">
                    Welcome to the <span className="text-blue-700 font-semibold">​Intelligent Visual Analytics Lab (IVAL)</span>,
                    part of the Department of Computer Vision at MBZUAI. IVAL conducts fundamental research in the field of
                    computer vision and machine learning for semantic understanding of visual data.
                    Our research covers a wide range of topics: computational imaging, visual recognition, detection, segmentation
                    and tracking, adversarial robustness, generative models, detailed video understanding, action recognition, and
                    abnormal event detection. The research work is carried out with a variety of visual data sources, including
                    consumer camera images, video data, satellite and drone imagery, live webcam streams, and medical imagery.
                    Research at IVAL strives to design and build accurate and efficient algorithms for automatically extracting
                    semantic information from visual data.
                </p>
                <Button className="my-10">About</Button>
            </section>

            <section className="w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 md:px-10 lg:px-16 text-center">
                <Heading>Latest News</Heading>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-16">
                    {newsItems.map((item) => (
                        <div key={item.id} className="bg-blue-800 hover:bg-blue-900 transition-colors duration-200 text-white flex items-center justify-center p-6 md:p-8 lg:p-10 shadow-lg">
                            <p className="font-extrabold font-oswald tracking-wide text-xl text-center">{item.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 md:px-10 lg:px-16 text-center">
                <Heading>Highlights</Heading>
                <ReactSwiper newsItems={highlights} CardTemplate = {HighlightCard}/>
            </section>

        </div>
    );
};

const HighlightCard = ({item}) => {
    return (
        <div className="p-8 rounded-lg text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-blue-800 font-oswald tracking-wide">{item.title}</h3>
            <h2 className="text-3xl text-black mt-2 font-oswald">
                {item.subtitle}
            </h2>
            <p className="text-gray-700 my-8">
                {item.description}
            </p>
            <Button onClick={()=>window.location.href = item.link}>Read More</Button>
        </div>
    );
};

export default HomePage;
