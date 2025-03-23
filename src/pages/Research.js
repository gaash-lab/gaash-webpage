import React from "react";
import banner_research from './../assets/banner-research.avif'
import Button from "../components/Button";

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
        <div className="w-full">
            <section className="w-full flex flex-col items-center text-center">
                <div
                    className="w-full h-[400px] bg-cover bg-center mt-4 z-30 relative"
                    style={{
                        backgroundImage: `url("${banner_research}")`,
                    }}
                />
            </section>

            <section className="w-full max-w-4xl mx-auto bg-white p-6 sm:p-8 md:p-10 lg:p-16 -mt-32 md:-mt-40 z-40 relative text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8 font-oswald tracking-wider">
                    Research
                </h2>
                <p className="leading-7 sm:leading-8 md:leading-9 text-justify px-4 sm:px-6 md:px-8 text-base sm:text-normal md:text-lg">
                    Members of IVAL at MBZUAI conduct research primarily in Multi-modal learning, Remote sensing and earth vision, Person centric vision, Synthesis and Generation, Visual Recognition with Limited Supervision and Medical Image Analysis

                </p>
            </section>

            <section className="w-full max-w-4xl mx-auto mt-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {researchData.map((item, index) => (
                        <div key={index} className="p-6 bg-indigo-100 space-y-4 text-center group">
                            <h3 className="font-bold text-blue-800 text-2xl text-center font-oswald">{item.title}</h3>
                            <p className="text-justify text-sm">{item.description}</p>
                            <button className="py-2 px-6 text-xs border border-gray-500 rounded-full group-hover:bg-blue-800 group-hover:text-white transition-colors duration-300 group-hover:border-transparent">Read More</button>
                        </div>
                    ))}

                </div>
                <div className="text-center my-10">
                    <Button onClick={() => window.location.href = '/publications'}>See Publications</Button>
                </div>
            </section>
        </div>
    );
};

export default Research;
