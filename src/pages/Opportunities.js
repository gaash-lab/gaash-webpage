import React, { useEffect } from "react";
import { ArrowRight, Users, Laptop, Award, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import banner_join from "../assets/banner_join.jpg"

// Sample opportunities data - you can move this to your constants file
const researchOpportunities = [
    {
        title: "PhD Positions",
        icon: <GraduationCap size={24} />,
        description: "We're seeking motivated PhD candidates interested in AI-Driven Computer Architectures, Computer Vision, and Federated Learning.",
        qualifications: [
            "Master's degree in Computer Science, AI, or related field",
            "Strong programming skills in Python and experience with deep learning frameworks",
            "Publication record in relevant conferences/journals is a plus"
        ],
        skills: [
            "Experience with distributed systems and parallel computing",
            "Knowledge of optimization techniques for AI models"
        ]
    },
    {
        title: "Undergraduate Research Internships",
        icon: <Laptop size={24} />,
        description: "Summer and semester-long research internships for undergraduate students interested in experiencing AI research.",
        qualifications: [
            "Undergraduate studies in Computer Science, Engineering, or Mathematics",
            "Basic knowledge of programming and machine learning concepts",
            "Strong interest in AI research"
        ],
        skills: [
            "Familiarity with data preprocessing techniques"
        ]
    },
    {
        title: "Visiting Researchers",
        icon: <Users size={24} />,
        description: "We welcome visiting researchers from other institutions for collaborative projects and knowledge exchange.",
        qualifications: [
            "Affiliation with academic or research institution",
            "Research background aligned with lab focus areas"
        ],
        skills: [
            "Experience with interdisciplinary research"
        ]
    },
    {
        title: "Research Assistants",
        icon: <Award size={24} />,
        description: "Paid positions for talented students to assist in ongoing research projects and lab operations.",
        qualifications: [
            "Currently enrolled student with background in CS, AI, or related field",
            "Proficiency in programming and data analysis"
        ],
        skills: [
            "Proficiency in version control systems like Git"
        ]
    }
];


const JoinUsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to the top
    }, []);
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div
                className="h-[300px] bg-cover bg-center relative flex items-center justify-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.5)), url("${banner_join}")`,
                }}
            >
                <div className="container mx-auto px-4 py-20 text-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Join Our Research Lab</h1>
                        {/* <p className="text-xl md:text-2xl text-blue-100 mb-8">
                            Be part of groundbreaking research in AI and Computer Vision at GAASH Lab
                        </p> */}
                    </div>
                </div>
            </div>

            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-3">
                        Current Opportunities
                    </h2>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {researchOpportunities.map((opportunity, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-gray-100 hover:border-blue-200"
                            >
                                <div className="flex items-center mb-4">
                                    <div className="bg-blue-100 p-2 rounded-lg mr-4">
                                        {opportunity.icon}
                                    </div>
                                    <h3 className="text-2xl font-bold text-blue-900">{opportunity.title}</h3>
                                </div>

                                <p className="text-gray-700 mb-4">{opportunity.description}</p>

                                <div className="mb-4">
                                    <h4 className="font-semibold text-blue-800 mb-2">Qualifications:</h4>
                                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                                        {opportunity.qualifications.map((req, i) => (
                                            <li key={i}>{req}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="mb-4">
                                    <h4 className="font-semibold text-blue-800 mb-2">Desired Skills:</h4>
                                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                                        {opportunity.skills.map((benefit, i) => (
                                            <li key={i}>{benefit}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-3">
                        How to Apply
                    </h2>
                    <p className="text-gray-700 text-center max-w-2xl mx-auto mb-8">
                        Interested candidates can apply by sending their CVs with relevant details and experience to: 
                        <a className="text-blue-800" href="mailto:janibbashir@nitsri.ac.in"> janibbashir@nitsri.ac.in</a>. 
                        We also strongly encourage candidates to share their GitHub profiles and any relevant projects they completed previously.
                    </p>
                    <div className="text-center">
                        <Link
                            className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg 
                            hover:bg-blue-700 transition font-medium text-lg shadow-md hover:shadow-lg"
                            to="/contact"
                        >
                            Contact Us
                            <ArrowRight className="ml-2" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section
            <section className="bg-gradient-to-br from-blue-100 to-blue-50 py-12">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-2xl font-bold text-blue-900 mb-6">
                        Don't see a position that matches your profile?
                    </h3>
                    <p className="text-gray-700 max-w-2xl mx-auto mb-8">
                        We're always interested in connecting with talented researchers. Feel free to reach out to discuss potential collaboration opportunities.
                    </p>
                    <Link
                        className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg 
            hover:bg-blue-700 transition font-medium text-lg shadow-md hover:shadow-lg"
                        to="/contact"
                    >
                        Contact Us
                        <ArrowRight className="ml-2" />
                    </Link>
                </div>
            </section> */}
        </div>
    );
};

export default JoinUsPage;