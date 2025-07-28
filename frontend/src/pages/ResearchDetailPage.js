import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { researchInterests } from "../data/constants";
import ScrollToTop from "../components/ScrollToTop";
import {researchDetails} from "../data/research_details"; // Import research details

const ResearchDetailPage = () => {
  const { slug } = useParams();
  const [research, setResearch] = useState(null);
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top
  }, []);
  
  useEffect(() => {
    // Find the research item that matches the slug
    const researchItem = researchInterests.find(
      item => item.detailLink === `/research/${slug}`
    );
    
    // Get the detailed content
    const detailContent = researchDetails[slug];
    
    if (researchItem && detailContent) {
      setResearch(researchItem);
      setDetail(detailContent);
    }
    
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!research || !detail) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Research Not Found</h1>
        <p className="text-gray-600 mb-6">The research topic you're looking for doesn't exist or has been moved.</p>
        <Link to="/research" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Back to Research
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div 
        className="h-[400px] bg-cover bg-center relative flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("${detail.heroImage}")`,
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            {detail.title}
          </h1>
          <div className="flex items-center justify-center space-x-3">
            <span className="bg-blue-500 text-white text-sm px-4 py-1 rounded-full">
              {research.category}
            </span>
            <span className="bg-green-500 text-white text-sm px-4 py-1 rounded-full">
              {research.projectCount} Projects
            </span>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/research" className="hover:text-blue-600">Research</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{detail.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {detail.overview}
          </p>

          {/* Key Areas */}
          {detail.keyAreas && 
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Research Areas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {detail.keyAreas.map((area, index) => (
                <div key={index} className="flex items-center bg-blue-50 p-4 rounded-lg">
                  <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                    {index + 1}
                  </div>
                  <span className="text-blue-800 font-medium">{area}</span>
                </div>
              ))}
            </div>
          </>
          }
        </div>

        {/* Current Projects */}
        {detail.currentProjects && detail.currentProjects.length > 0 && <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Current Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {detail.currentProjects.map((project, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            ))}
          </div>
        </div>}        

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg overflow-hidden p-8 text-white">
          <h2 className="text-3xl font-bold mb-6">Interested in Collaboration?</h2>
          <p className="text-lg mb-8 opacity-90">
            We're always looking for talented individuals and organizations to collaborate with on cutting-edge research in {detail.title}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/contact" className="px-6 py-3 bg-white text-blue-800 rounded-lg font-medium hover:bg-gray-100 transition-colors text-center">
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Back to Research */}
      <div className="container mx-auto px-4 py-8 flex justify-center">
        <Link 
          to="/research" 
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2" 
            viewBox="0 0 20 20" 
            fill="currentColor"
            style={{ transform: 'rotate(180deg)' }}
          >
            <path 
              fillRule="evenodd" 
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
          Back to All Research
        </Link>
      </div>

      <ScrollToTop />
    </div>
  );
};


export default ResearchDetailPage;