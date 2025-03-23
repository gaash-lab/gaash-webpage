import React from 'react'

const cards = [
    {
        title: "Ten papers accepted in ICCV 2023.",
        description: "Ten (10) papers accepted from the IVAL group in the competitive IEEE/CVF...",
        link: "#",
        image: "https://placehold.co/300x200",
    },
    {
        title: "Introducing Oryx: An MBZUAI library for Large Vision-...",
        description: "Today, we are publicly releasing a set of projects and demos for a breed of large...",
        link: "#",
        image: "https://placehold.co/300x300",
    },
    {
        title: "Eleven papers accepted in CVPR 2023.",
        description: "Eleven (11) papers accepted from the IVAL group in the competitive IEEE/CVF...",
        link: "#",
        image: "https://placehold.co/300x150",
    },
    {
        title: "Six papers accepted in ECCV 2022.",
        description: "Six (6) papers accepted from the group in the competitive European Conference of...",
        link: "#",
        image: "https://placehold.co/300x180",
    },
    {
        title: "Three papers accepted in NeurIPS 2022.",
        description: "Three (3) papers accepted from the group in the competitive 36th Conferenc...",
        link: "#",
        image: "https://placehold.co/300x200",
    },
    {
        title: "Four (4) papers accepted in NeurIPS 2021 and ICLR 2021.",
        description: "Three (3) papers accepted from the group in the Neural Information Processing...",
        link: "#",
        image: "https://placehold.co/300x250",
    },
    {
        title: "Ten papers accepted in CVPR 2022.",
        description: "Ten (10) papers accepted from the group in the competitive IEEE/CVF Conference of...",
        link: "#",
        image: "https://placehold.co/300x200",
    },
    {
        title: "Five papers accepted in ICCV 2021.",
        description: "Five (5) papers accepted from the group in the competitive IFFF/CVF International...",
        link: "#",
        image: "https://placehold.co/300x220",
    },
];


const News = () => {
    return (
        <div className="w-full">
            <div className="container bg-white mx-auto max-w-4xl p-6 columns-3 gap-4 space-y-4 font-oswald">
                {cards.map((card, index) => (
                    <div key={index} className="bg-white border border-black overflow-hidden break-inside-avoid">
                        <img src={card.image} alt="Placeholder" className="w-full h-auto" />
                        <a href={card.link} className="p-4 inline-block cursor-pointer transition-colors duration-200 hover:text-blue-800">
                            <h3 className="font-semibold">{card.title}</h3>
                            <p className="text-gray-600 mt-2 text-sm">{card.description}</p>
                        </a>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default News