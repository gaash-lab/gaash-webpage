import React, { useEffect, useState } from 'react';
import banner_about from './../assets/banner-about.avif';
import ScrollToTop from '../components/ScrollToTop';
import { Icon } from '@iconify/react';
import gmailIcon from '@iconify-icons/logos/google-gmail';
import githubIcon from '@iconify-icons/logos/github-icon';
import linkedinIcon from '@iconify-icons/logos/linkedin-icon';
import noimage from '../assets/sonia.jpg';
import axios from '../api/axios';

const WebTeamMemberCard = ({ 
    name = 'Team Member', 
    role = 'Role', 
    image, 
    email, 
    linkedin, 
    github, 
    projects = [], 
    member_since = 'N/A', 
    isActive = true,
    website 
}) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

    // Process projects to ensure it's always an array
    const projectList = Array.isArray(projects) ? projects : [projects].filter(Boolean);

    // Function to determine the best object-position based on image dimensions
    const getObjectPosition = () => {
        if (!imageLoaded || imageError) return 'center center';
        
        const aspectRatio = imageDimensions.width / imageDimensions.height;
        const containerAspectRatio = 1; // Square-ish container (w-full h-64)
        
        if (aspectRatio > containerAspectRatio) {
            // Wide image - center horizontally, focus on upper portion for faces
            return 'center 30%';
        } else {
            // Tall image - center vertically, slightly favor upper portion
            return 'center 25%';
        }
    };

    const handleImageLoad = (e) => {
        const img = e.target;
        setImageDimensions({
            width: img.naturalWidth,
            height: img.naturalHeight
        });
        setImageLoaded(true);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden w-full max-w-sm transform hover:-translate-y-1 group mx-4 my-6 flex flex-col h-full">
            <div className="relative h-80 w-full overflow-hidden flex items-center justify-center bg-gray-100">
                {!imageLoaded && !imageError && (
                    <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                        <span className="text-gray-500">Loading image...</span>
                    </div>
                )}
                <img
                    src={image || noimage}
                    alt={name}
                    className={`w-full h-full object-cover transition-all duration-500 ${
                        (!imageLoaded || imageError) ? 'hidden' : ''
                    }`}
                    style={{ 
                        objectPosition: getObjectPosition(),
                    }}
                    onLoad={handleImageLoad}
                    onError={() => {
                        setImageError(true);
                        setImageLoaded(true);
                    }}
                />
                {imageError && (
                    <img
                        src={noimage}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                
                {/* Social links */}
                <div className="absolute bottom-4 right-4 flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {email && (
                        <a 
                            href={`mailto:${email}`} 
                            className="bg-white p-2 rounded-full shadow-md hover:bg-red-50 hover:text-red-500 transition-colors"
                            aria-label={`Email ${name}`}
                        >
                            <Icon icon={gmailIcon} width="20" />
                        </a>
                    )}
                    {linkedin && (
                        <a 
                            href={linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="bg-white p-2 rounded-full shadow-md hover:bg-blue-50 hover:text-blue-700 transition-colors"
                            aria-label={`${name}'s LinkedIn profile`}
                        >
                            <Icon icon={linkedinIcon} width="20" />
                        </a>
                    )}
                    {github && (
                        <a 
                            href={github} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 hover:text-gray-800 transition-colors"
                            aria-label={`${name}'s GitHub profile`}
                        >
                            <Icon icon={githubIcon} width="20" />
                        </a>
                    )}
                    {website && (
                        <a 
                            href={website} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="bg-white p-2 rounded-full shadow-md hover:bg-purple-50 hover:text-purple-700 transition-colors"
                            aria-label={`${name}'s Website`}
                        >
                            <Icon icon="mdi:web" width="20" />
                        </a>
                    )}
                </div>
            </div>
            
            {/* Content */}
            <div className="p-6 flex-1 flex flex-col">
                <div className="mb-3">
                    <h3 className="text-2xl font-bold text-gray-800">{name}</h3>
                    <p className="text-blue-600 font-medium">{role}</p>
                </div>

                <div className="mt-3 mb-4 flex-1">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Key Contributions
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {projectList.length > 0 ? (
                            projectList.map((project, index) => (
                                <span 
                                    key={index} 
                                    className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full border border-blue-100 hover:bg-blue-100 transition-colors"
                                >
                                    {project}
                                </span>
                            ))
                        ) : (
                            <span className="text-gray-500 text-sm">No projects listed</span>
                        )}
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs text-gray-500">Member since {member_since}</span>
                    <div className="flex space-x-1">
                        <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-400' : 'bg-gray-400'}`}></span>
                        <span className="text-xs text-gray-500">{isActive ? 'Active' : 'Inactive'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const WebTeam = () => {
    const [teamMembers, setTeamMembers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                const response = await axios.get('/web-team');
                
                if (response.status === 200) {
                    setTeamMembers(response.data);
                }
            } catch (err) {
                console.error("Error fetching team members:", err);
                setError('Failed to load team data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchTeamMembers();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <h1 className="text-2xl font-bold text-gray-700">Loading Team Data...</h1>
                    <p className="text-gray-500">Please wait while we fetch the team information.</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center p-6 bg-red-50 rounded-lg max-w-md">
                    <Icon icon="ion:warning" className="text-red-500 text-5xl mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-700 mb-2">Error Loading Data</h1>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!teamMembers || teamMembers.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <Icon icon="ion:people-outline" className="text-gray-400 text-5xl mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-700">No Team Members Found</h1>
                    <p className="text-gray-500">There are currently no team members to display.</p>
                </div>
            </div>
        );
    }

    // Filter members by team
    const teamLead = teamMembers.filter(member => member.team === 'lead');
    const frontendTeam = teamMembers.filter(member => member.team === 'frontend');
    const backendTeam = teamMembers.filter(member => member.team === 'backend');

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Banner */}
            <div
                className="h-[300px] bg-cover bg-center relative flex items-center justify-center"
                style={{ 
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url("${banner_about}")`,
                    backgroundAttachment: 'fixed'
                }}
            >
                <div className="text-center px-4">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in-down">Web Development Team</h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                        Meet our talented team of professionals
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                {/* Team Lead Section */}
                {teamLead.length > 0 && (
                    <section className="mb-20">
                        <div className="text-center mb-12">
                            <span className="text-blue-600 font-semibold">Our Experts</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">Team Leads</h2>
                            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
                        </div>
                        <div className="flex flex-wrap justify-center">
                            {teamLead.map((member) => (
                                <WebTeamMemberCard key={member.id} {...member} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Frontend Team Section */}
                {frontendTeam.length > 0 && (
                    <section className="mb-20">
                        <div className="text-center mb-12">
                            <span className="text-blue-600 font-semibold">Creative Minds</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">Frontend Team</h2>
                            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
                        </div>
                        <div className="flex flex-wrap justify-center">
                            {frontendTeam.map((member) => (
                                <WebTeamMemberCard key={member.id} {...member} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Backend Team Section */}
                {backendTeam.length > 0 && (
                    <section className="mb-12">
                        <div className="text-center mb-12">
                            <span className="text-blue-600 font-semibold">Technical Wizards</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2 mb-4">Backend Team</h2>
                            <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
                        </div>
                        <div className="flex flex-wrap justify-center">
                            {backendTeam.map((member) => (
                                <WebTeamMemberCard key={member.id} {...member} />
                            ))}
                        </div>
                    </section>
                )}
            </div>

            <ScrollToTop />
        </div>
    );
};

export default WebTeam;