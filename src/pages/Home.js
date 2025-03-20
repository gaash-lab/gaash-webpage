import React, { useState } from "react";
import "../styles/Home.css";
import "../styles/Page.css";

const HomePage = () => {
    const [activeTab, setActiveTab] = useState(0);

    const newsTabs = [
        "Ten papers accepted in ICCV 2023.",
        "Introducing Oryx: An MBZUAI library for Large Vision Models.",
        "Eleven papers accepted in CVPR 2023."
    ];

    const highlights = [
        {
            title: "ACCV 2022 Workshop",
            subtitle: "Vision Transformers: Theory and Applications",
            description:
                "The first one-day conference on vision transformers, on the occasion of ACCV 2022, is an exciting chance to present and discuss vision transformers and their applications in various computer vision sub-fields. The workshop showcases exciting invited talks by Prof. Mubarak Shah, Ming-Hsuan Yang, and Rita Cucchiara.",
            link: "#"
        },
        {
            title: "NeurIPS 2023 Keynote",
            subtitle: "Advancements in AI",
            description:
                "Keynote session on AI advancements at NeurIPS 2023, covering vision models, deep learning, and generative AI applications.",
            link: "#"
        },
        {
            title: "ICLR 2023 Paper",
            subtitle: "Self-Supervised Learning",
            description:
                "Our latest paper on self-supervised learning for vision applications has been accepted at ICLR 2023.",
            link: "#"
        }
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === highlights.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? highlights.length - 1 : prevIndex - 1
        );
    };
    return (
        <div className="page">

            {/* Banner Image */}
            <div
                className="banner"
                style={{
                    backgroundImage: `url("https://www.shutterstock.com/shutterstock/photos/2152122757/display_1500/stock-photo-business-intelligence-businessman-using-laptop-computer-global-network-connection-data-exchange-2152122757.jpg")`,
                }}
            >
                <div className="banner-overlay">
                    <h2 className="banner-title">Intelligent Visual Analytics Lab</h2>
                    <p className="banner-subtitle">Computer Vision Lab @ MBZUAI</p>
                </div>
            </div>

            <div className="floating-box">
                <h2 className="floating-box-title">Research</h2>
                <p>
                    Welcome to the ​Intelligent Visual Analytics Lab (IVAL), part of the Department of Computer Vision at MBZUAI. IVAL conducts fundamental research in the field of computer vision and machine learning for semantic understanding of visual data.
                    Our research covers a wide range of topics: computational imaging, visual recognition, detection, segmentation and tracking, adversarial robustness, generative models, detailed video understanding, action recognition and abnormal event detection. The research work is carried out with a variety of visual data sources, including consumer camera images, video data, satellite and drone imagery, live webcam streams and medical imagery. Research at IVAL strives to design and build accurate and efficient algorithms for automatically extracting semantic information from visual data.</p>
            </div>

            <div>
                {/* Latest News Section */}
                <div className="section">
                    <h2 className="section-title">Latest News</h2>
                    <div className="news-container">
                        {newsTabs.map((tab, index) => (
                            <div
                                key={index}
                                className={`news-tab ${activeTab === index ? "active" : ""}`}
                                onClick={() => setActiveTab(index)}
                            >
                                {tab}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Highlights Section */}
                <div className="section">
                    <h2 className="section-title">Highlights</h2>
                    <div className="slider-container">
                        <button className="arrow left" onClick={handlePrev}>{"<"}</button>
                        <div className="highlight-card">
                            <h3 className="highlight-title">{highlights[currentIndex].title}</h3>
                            <p className="highlight-subtitle">{highlights[currentIndex].subtitle}</p>
                            <p className="highlight-description">{highlights[currentIndex].description}</p>
                            <a href={highlights[currentIndex].link} className="read-more">Read More</a>
                        </div>
                        <button className="arrow right" onClick={handleNext}>{">"}</button>
                    </div>
                </div>
            </div>
            <div
                className="banner"
                style={{
                    backgroundImage: `url("https://www.shutterstock.com/shutterstock/photos/2152122757/display_1500/stock-photo-business-intelligence-businessman-using-laptop-computer-global-network-connection-data-exchange-2152122757.jpg")`,
                    marginBottom: "5rem"
                }}
            >
            </div>

        </div>
    );
};

export default HomePage;
