import React, { useEffect } from 'react';
import banner_about from './../assets/banner-about.avif';
import ScrollToTop from '../components/ScrollToTop';
import { Icon } from '@iconify/react';
import gmailIcon from '@iconify-icons/logos/google-gmail';
import githubIcon from '@iconify-icons/logos/github-icon';
import globeIcon from '@iconify-icons/fa-solid/globe';
import { SiGooglescholar } from "react-icons/si";
import noimage from '../assets/noimage.png';
import axios from '../api/axios';


const ProfileCard = ({ name, designation,university, email, website, scholar, image, type, linkedin, github }) => {
    const cardPadding = {
        faculty: "p-8",
        collaborator: "p-8",
        scholar: "p-6",
        project: "p-6",
    };

    const imageStyles = {
        faculty: "w-48 h-48 mt-2",
        collaborator: "w-40 h-40 mt-2",
        scholar: "w-32 h-32 mt-2",
        project: "w-32 h-32 mt-2",
    };

    const boxWidth = {
        faculty: "400px",
        collaborator: "350px",
        scholar: "300px",
        project: "300px",
    };

    const defaultPadding = "p-6";
    const defaultImageStyle = "w-32 h-32 mt-2";
    const defaultBoxWidth = "300px";

    useEffect(() => {
        window.scrollTo(0, 0); 
    }, []);

    return (
        <div
            className={`bg-white rounded-lg  border-blue-500 border-2 ${cardPadding[type] || defaultPadding} transition-shadow duration-300 transform hover:-translate-y-1 hover:shadow-xl`}
            style={{
                width: boxWidth[type] || defaultBoxWidth,
                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)'
            }}
        >
            <img
                src={image ? image : noimage}
                alt={name}
                className={`object-cover object-top rounded-full mx-auto mb-4 border-4 border-blue-500 ${imageStyles[type] || defaultImageStyle}`}
            />
            <h3 className="text-xl font-bold text-gray-900 text-center">{name}</h3>
            <p className="text-gray-600 text-center">{designation}</p>
            <p className="text-gray-600 text-center mb-4">{university}</p>
            <div className="flex justify-center items-center space-x-4 text-blue-600">
                {email && (
                    <a href={`mailto:${email}`} className="hover:text-blue-800">
                        <Icon icon={gmailIcon} width="20" />
                    </a>
                )}
                {website && (
                    <a href={website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">
                        <Icon icon={globeIcon} width="20" />
                    </a>
                )}
                {scholar && (
                    <a href={scholar} target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">
                        {/* <Icon icon={googleScholarIcon} width="20" /> */}
                        <SiGooglescholar size="20" color='#0a66c2' />
                    </a>
                )}
                {linkedin && (
                    <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">
                        <Icon icon="logos:linkedin-icon" width="20" />
                    </a>
                )}
                {github && (
                    <a href={github} target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">
                        <Icon icon={githubIcon} width="20" />
                    </a>
                )}
            </div>
        </div>
    );
};


const StudentCard = ({ name, website, linkedin, github }) => {
    const getLink = () => {
        if (website) return website;
        if (linkedin) return linkedin;
        if (github) return github;
        return null;
    };

    const link = getLink();

    return (
        <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 py-2 px-2 border-blue-500 border-2 transform hover:-translate-y-1 w-64 relative"
            style={{ boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)', width: '200px' }}>
            {link ? (
                <a href={link} target="_blank" rel="noopener noreferrer" className="block">
                    <h3 className="text-md font-medium text-gray-700 hover:text-blue-800 text-center">{name}</h3>
                </a>
            ) : (
                <h3 className="text-md font-medium text-gray-700 text-center">{name}</h3>
            )}
        </div>
    );
};

const Team = () => {
    const [team, setTeam] = React.useState(null);
    useEffect(() => {
        const fetchTeamData = async () => {
            try {
                const response = await axios.get('/team'); 
                console.log('Team data fetched:', response.data);
                if (response.data && Array.isArray(response.data)) {
                    setTeam(response.data);
                } else {
                    console.error('Invalid team data format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching team data:', error);
            }
        }
        fetchTeamData();
    }, [])

    if (!team) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-700">Loading
    Team Data...</h1>
                    <p className="text-gray-500">Please wait while we fetch the team information.</p>
                </div>
            </div>
        );
    }


    const facultyMembers = team.filter(member => member.type === 'faculty');
    const PhdScholars = team.filter(member => member.type === 'scholar');
    const Students = team.filter(member => member.type === 'student');
    const ExternalCollaborators = team.filter(member => member.type === 'collaborator');
    const ProjectStaff = team.filter(member => member.type === 'project');
    return (
        <div className="bg-gray-50 min-h-screen">
            <div
                className="h-[300px] bg-cover bg-center relative flex items-center justify-center"
                style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("${banner_about}")`,
                backgroundAttachment: 'fixed'
             }}
            >
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-white mb-4">Our Team and Collaborators</h1>
                    <p className="text-lg text-gray-200">Get to know more about our team and collaborators.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                {facultyMembers.length > 0 && <section className="mb-12 lg:mb-28">
                    <h3 className="text-3xl font-bold text-center text-gray-700 border-b-4 border-blue-500 pb-2 mb-6">Faculty Members</h3>
                    <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 lg:gap-y-16 lg:gap-x-[400px]">
                        {facultyMembers.map((member, index) => (
                            <ProfileCard key={index} {...member} />
                        ))}
                    </div>
                </section>}

                {ExternalCollaborators.length > 0 && <section className="mb-12 lg:mb-28">
                    <h3 className="text-3xl font-bold text-center text-gray-700 border-b-4 border-blue-500 pb-2 mb-6">External Collaborators</h3>
                    <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 lg:gap-y-16 lg:gap-x-[200px]">
                        {ExternalCollaborators.map((member, index) => (
                            <ProfileCard key={index} {...member} />
                        ))}
                    </div>
                </section>}

               {ProjectStaff.length > 0 && <section className="mb-12 lg:mb-28">
                    <h3 className="text-3xl font-bold text-center text-gray-700 border-b-4 border-blue-500 pb-2 mb-6">Project Staff</h3>
                    <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 lg:gap-y-16 lg:gap-x-20">
                        {ProjectStaff.map((member, index) => (
                            <ProfileCard key={index} {...member} />
                        ))}
                    </div>
                </section>}

                {PhdScholars.length > 0 && <section className="mb-12 lg:mb-28">
                    <h3 className="text-3xl font-bold text-center text-gray-700 border-b-4 border-blue-500 pb-2 mb-6">PhD Scholars</h3>
                    <div className="flex flex-wrap justify-center gap-x-16 gap-y-8 lg:gap-y-16 lg:gap-x-20">
                        {PhdScholars.map((member, index) => (
                            <ProfileCard key={index} {...member} />
                        ))}
                    </div>
                </section>}

                {Students.length > 0 && <section className="mb-12 lg:mb-28">
                    <h3 className="text-3xl font-bold text-center text-gray-700 border-b-4 border-blue-500 pb-2 mb-6">B.Tech Students</h3>
                    <div className="flex flex-wrap justify-center gap-6">
                        {Students.map((student, index) => (
                            <StudentCard key={index} {...student} />
                        ))}
                    </div>
                </section>}
            </div>

            <ScrollToTop />
        </div>
    );
};

export default Team;