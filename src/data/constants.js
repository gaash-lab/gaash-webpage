import MultiModal from "../assets/research/multi_modal.jpg";
import LLM from "../assets/research/llm.jpg";
import CA from "../assets/research/ca.jpeg";
import Data from "../assets/research/data.jpg";
import Med from "../assets/research/med.jpeg";
export const researchInterests = [
    {
        id: 1,
        title: "Multi-Modal Learning",
        description: "Exploring advanced techniques for integrating and learning across multiple modalities, including vision, text, and audio data to improve AI system understanding and performance.",
        category: "Artificial Intelligence",
        projectCount: 4,
        img: MultiModal,
        detailLink: "/research/multi-modal-learning"
    },
    {
        id: 2,
        title: "Large Language Modelling",
        description: "Developing and optimizing large-scale neural networks for natural language understanding, generation, and knowledge representation across diverse applications.",
        category: "Natural Language Processing",
        projectCount: 1,
        img: LLM,
        detailLink: "/research/large-langueage-modelling"
    },
    {
        id: 3,
        title: "AI Driven Computer Architectures",
        description: "Designing next-generation hardware architectures optimized for AI workloads, including specialized processors and memory systems for efficient deep learning.",
        category: "Computer Architecture",
        projectCount: 3,
        img: CA,
        detailLink: "/research/computer-architecture"
    },
    {
        id: 4,
        title: "Data Algorithmics and Distributed Computation",
        description: "Developing scalable algorithms and distributed computing frameworks for processing massive datasets efficiently across clusters and cloud environments.",
        category: "Distributed Systems",
        projectCount: 7,
        img: Data,
        detailLink: "/research/distributed-computation"
    },
    {
        id: 5,
        title: "Medical Image Analysis",
        description: "Developing computer vision and deep learning techniques for medical imaging applications including disease detection, segmentation, and diagnostic support systems.",
        category: "Medical AI",
        projectCount: 3,
        img: Med,
        detailLink: "/research/medical-image-analysis"
    }
];

export const newsData = {
    2025: [
        { 
            date: "Apr", 
            text: "4 H100 GPU Cluster deployed to boost compute",
        }
    ],
    2024: [
        { 
            date: "Nov", 
            text: "One paper accepted in WACV 2024.",
            link: "https://www.tajamulashraf.com/assets/Documents/wacv/transfed.pdf"
        },
        { 
            date: "Nov", 
            text: "One paper accepted in MoSICom 2024.",
            link: "https://ieeexplore.ieee.org/abstract/document/10880901"
        }
    ],
    2023: [
        { 
            date: "July", 
            text: "One paper accepted in CVIP 2023.",
            link: "https://www.tajamulashraf.com/assets/Documents/cvip/022.pdf"
        },
        { 
            date: "March", 
            text: "One paper accepted in ICDSA 2023.",
            link: "https://www.tajamulashraf.com/assets/Documents/icdsa/paper.pdf"
        }
    ]
};

export const highlights = [
    {
        title: "Cutting-Edge Research",
        subtitle: "Advanced Visual Analytics",
        description: "Our lab is at the forefront of computer vision research, developing innovative solutions for complex visual understanding challenges.",
        link: "#"
    },
    {
        title: "Interdisciplinary Approach",
        subtitle: "Bridging Technology and Insight",
        description: "We combine machine learning, computer vision, and domain expertise to solve real-world problems across various industries.",
        link: "#"
    }
];

export const recentNews = [
    { date: "Apr 03, 2025", text: "4 H100 GPU Cluster deployed to boost compute" }
];

