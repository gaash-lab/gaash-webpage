import React from "react";
import { ExternalLink, Code } from 'lucide-react';

const PublicationCard = ({ publication }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-500">
            <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900 hover:text-blue-800 transition-colors">
                    {publication.title}
                </h3>
                <div className="text-gray-600 text-sm">
                    <p className="font-medium">{publication.authors}</p>
                    <div className="flex items-center justify-between mt-6">
                        <span className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
                            {publication.conference}
                        </span>
                        <div className="flex space-x-4">
                            <a 
                                href={publication.paperLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 text-sm flex items-center group"
                            >
                                <ExternalLink className="h-5 w-5 mr-1 group-hover:text-blue-800 transition-colors" />
                                <span className="hidden group-hover:inline">View Paper</span>
                            </a>
                            <a 
                                href={publication.codeLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 text-sm flex items-center group"
                            >
                                <Code className="h-5 w-5 mr-1 group-hover:text-blue-800 transition-colors" />
                                <span className="hidden group-hover:inline">View Code</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  };
  
export default PublicationCard;