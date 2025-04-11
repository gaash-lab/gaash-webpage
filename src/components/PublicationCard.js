import React from "react";
import { Github, Newspaper } from 'lucide-react';


const PublicationCard = ({ publication }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-500">
            <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900 hover:text-blue-800 transition-colors">
                    {publication.title}
                </h3>
                <div className="text-gray-600 text-sm">
                    <p className="font-medium">{publication.authors}</p>
                    <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between mt-6 space-y-2 md:space-y-0">
                        <span className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold w-fit">
                            {publication.conference}
                        </span>
                        <div className="flex space-x-4">
                            {publication?.paperLink && (
                                <a
                                    href={publication.paperLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center group"
                                >
                                    <Newspaper className="h-5 w-5 mr-1 group-hover:text-blue-800 transition-colors" />
                                    <span>Paper</span>
                                </a>
                            )}
                            {publication?.codeLink && (
                                <a
                                    href={publication.codeLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center group"
                                >
                                    <Github className="h-5 w-5 mr-1 group-hover:text-blue-800 transition-colors" />
                                    <span>Code</span>
                                </a>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PublicationCard;