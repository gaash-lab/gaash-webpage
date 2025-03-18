import React, { useState } from "react";
import "../styles/Page.css";
import "../styles/Research.css";

const Research = () => {
    const researchData = [
        {
            title: "Multi-modal Learning",
            description:
                "Deep learning with multiple modalities of data including images, videos, text and audio. Our team at IVAL explores how multi-modal understanding can be used for improving generalization in vision applications such as open-vocabulary object detection, and visual question-answering.",
        },
        {
            title: "Remote Sensing and Earth Vision",
            description:
                "Remote sensing data provide an unbiased, uninterrupted and borderless view of human activities and natural processes. Powered by data collected from diverse satellite systems, deep-learning models can be used to gain insight to guide targeted actions in remote locations.",
        },
        {
            title: "Person Centric Vision",
            description:
                "Under the theme of human-centric visual analysis using deep learning, our team at IVAL explores problems including face detection, facial landmark localization, pedestrian detection and abnormal activity detection.",
        },
        {
            title: "Synthesis and Generation",
            description:
                "Our team at IVAL researches new methods for generating high-resolution, realistic images and videos, and generation of synthetic data. Our team also works on fundamental concepts in generative models.",
        },
        {
            title: "Visual Recognition with Limited Supervision",
            description:
                "The theme explores various generic vision applications using deep learning with limited supervision including semi-supervised, weakly-supervised, few-shot, zero-shot, and self-supervised learning.",
        },
        {
            title: "Medical Image Analysis",
            description:
                "Our team at IVAL investigates real-world healthcare problems using medical imaging with deep learning and computer vision. We are also interested in investigating fundamental concepts in medical imaging such as multi-organ segmentation, medical image generation and deep-learning architectures for medical imaging.",
        },
    ];
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
                    Members of IVAL at MBZUAI conduct research primarily in Multi-modal learning, Remote sensing and earth vision, Person centric vision, Synthesis and Generation, Visual Recognition with Limited Supervision and Medical Image Analysis
                </p>
            </div>
            <div className="research-container">
                <div className="research-grid">
                    {researchData.map((item, index) => (
                        <div key={index} className="research-card">
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
                <button className="research-button">See Publications</button>
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

export default Research;
