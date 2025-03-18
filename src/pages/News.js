import React, { useState } from "react";
import "../styles/Page.css";
import "../styles/News.css";

const News = () => {
    const [newsItems] = useState([
        {
            title: "Ten papers accepted in ICCV 2023.",
            description: "Ten (10) papers accepted from the IVAL group in the competitive IEEE/CVF...",
            image: "https://via.placeholder.com/150", // Replace with actual image URL
        },
        {
            title: "Introducing Oryx: An MBZUAI library for Large Vision-...",
            description: "Today, we are publicly releasing a set of projects and demos for a breed of large...",
            image: "https://via.placeholder.com/150",
        },
        {
            title: "Six papers accepted in ECCV 2022.",
            description: "Six (6) papers accepted from the group in the competitive European Conference of...",
            image: "https://via.placeholder.com/150",
        },
        {
            title: "Eleven papers accepted in CVPR 2023.",
            description: "Eleven (11) papers accepted from the IVAL group in the competitive IEEE/CVF...",
            image: "https://via.placeholder.com/150",
        },
        {
            title: "Three papers accepted in NeurIPS 2022.",
            description: "Three (3) papers accepted from the group in the competitive 36th Conference on Neural...",
            image: "https://via.placeholder.com/150",
        },
        {
            title: "Four (4) papers accepted in NeurIPS 2021 and ICLR 2021.",
            description: "Three (3) papers accepted from the group in the Neural Information Processing...",
            image: "https://via.placeholder.com/150",
        },
        {
            title: "Ten papers accepted in CVPR 2022.",
            description: "Ten (10) papers accepted from the group in the competitive IEEE/CVF Conference of...",
            image: "https://via.placeholder.com/150",
        },
        {
            title: "Five papers accepted in ICCV 2021.",
            description: "Five (5) papers accepted from the group in the competitive IEEE/CVF International...",
            image: "https://via.placeholder.com/150",
        },
    ]);
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
                <h2 className="floating-box-title">News and Updates</h2>
                <div className="news-grid">
                    {newsItems.map((news, index) => (
                        <div key={index} className="news-card">
                            <img src={news.image} alt="News" className="news-image" />
                            <h3 className="news-title">{news.title}</h3>
                            <p className="news-description">{news.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default News; 