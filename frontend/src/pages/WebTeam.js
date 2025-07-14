import React, { useEffect } from 'react';
import banner_about from './../assets/banner-about.avif';
import ScrollToTop from '../components/ScrollToTop';
import { Icon } from '@iconify/react';
import gmailIcon from '@iconify-icons/logos/google-gmail';
import githubIcon from '@iconify-icons/logos/github-icon';
import linkedinIcon from '@iconify-icons/logos/linkedin-icon';
import noimage from '../assets/sonia.jpg';

const WebTeamMemberCard = ({ name, role, image, email, linkedin, github, projects, member_since, isActive }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden max-w-sm transform hover:-translate-y-1 group">
            <div className="relative h-64 w-full">
                <img
                    src={image || noimage}
                    alt={name}
                    className="w-full h-full object-cover object-top brightness-90 group-hover:brightness-100 transition-all duration-500"
                    onError={(e) => {
                        e.target.src = noimage;
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                
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
                </div>
            </div>
            
            <div className="p-6">
                <div className="mb-1">
                    <h3 className="text-2xl font-bold text-gray-800">{name}</h3>
                    <p className="text-blue-600 font-medium">{role}</p>
                </div>

                <div className="mt-4">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Key Contributions
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {projects.map((project, index) => (
                            <span 
                                key={index} 
                                className="bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full border border-blue-100 hover:bg-blue-100 transition-colors"
                            >
                                {project}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center">
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
    const teamMembers = [
        {
            id: 1,
            name: "Sonia Sharma",
            role: "Tech Lead",
            image: noimage,
            email: "sonia@example.com",
            linkedin: "https://linkedin.com/in/sonia",
            github: "https://github.com/sonia",
            projects: ["System Architecture", "Code Reviews", "Technical Strategy"],
            member_since: "2020",
            isActive: true,
            team: "lead"
        },
        {
            id: 2,
            name: "Alex Chen",
            role: "Senior Frontend Developer",
            image: null,
            email: "alex@example.com",
            linkedin: "https://linkedin.com/in/alex",
            github: "https://github.com/alex",
            projects: ["React Architecture", "Performance Optimization", "Mentoring"],
            member_since: "2021",
            isActive: true,
            team: "frontend"
        },
        {
            id: 3,
            name: "Priya Patel",
            role: "UI/UX Designer",
            image: null,
            email: "priya@example.com",
            linkedin: "https://linkedin.com/in/priya",
            github: "https://github.com/priya",
            projects: ["Design System", "User Research", "Prototyping"],
            member_since: "2022",
            isActive: true,
            team: "frontend"
        },
        {
            id: 4,
            name: "Jamal Williams",
            role: "Frontend Developer",
            image: null,
            email: "jamal@example.com",
            linkedin: "https://linkedin.com/in/jamal",
            github: "https://github.com/jamal",
            projects: ["Component Library", "Accessibility", "Testing"],
            member_since: "2023",
            isActive: true,
            team: "frontend"
        },
        {
            id: 5,
            name: "Maria Garcia",
            role: "Backend Engineer",
            image: null,
            email: "maria@example.com",
            linkedin: "https://linkedin.com/in/maria",
            github: "https://github.com/maria",
            projects: ["API Development", "Database Optimization", "Security"],
            member_since: "2020",
            isActive: true,
            team: "backend"
        },
        {
            id: 6,
            name: "David Kim",
            role: "DevOps Engineer",
            image: null,
            email: "david@example.com",
            linkedin: "https://linkedin.com/in/david",
            github: "https://github.com/david",
            projects: ["CI/CD Pipeline", "Cloud Infrastructure", "Monitoring"],
            member_since: "2021",
            isActive: false,
            team: "backend"
        },
        {
            id: 7,
            name: "Emma Wilson",
            role: "Full Stack Developer",
            image: null,
            email: "emma@example.com",
            linkedin: "https://linkedin.com/in/emma",
            github: "https://github.com/emma",
            projects: ["Feature Development", "Bug Fixes", "Documentation"],
            member_since: "2022",
            isActive: true,
            team: "backend"
        }
    ];

    // Filter members by team
    const teamLead = teamMembers.filter(member => member.team === 'lead');
    const frontendTeam = teamMembers.filter(member => member.team === 'frontend');
    const backendTeam = teamMembers.filter(member => member.team === 'backend');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen">
            <div
                className="h-[300px] bg-cover bg-center relative flex items-center justify-center"
                style={{ 
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url("${banner_about}")`,
                    backgroundAttachment: 'fixed'
                }}
            >
                <div className="text-center px-4">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-fade-in-down">Web Development Team</h1>
                    <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                        Meet our talented team of {teamMembers.length} professionals
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <section className="mb-24">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-semibold">Our Experts</span>
                        <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-4">Team Lead</h2>
                        <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
                    </div>
                    <div className="flex justify-center">
                        {teamLead.map((member) => (
                            <WebTeamMemberCard key={member.id} {...member} />
                        ))}
                    </div>
                </section>

                <section className="mb-24">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-semibold">Creative Minds</span>
                        <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-4">Frontend Team</h2>
                        <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
                        {frontendTeam.map((member) => (
                            <WebTeamMemberCard key={member.id} {...member} />
                        ))}
                    </div>
                </section>

                <section className="mb-12">
                    <div className="text-center mb-16">
                        <span className="text-blue-600 font-semibold">Technical Wizards</span>
                        <h2 className="text-4xl font-bold text-gray-800 mt-2 mb-4">Backend Team</h2>
                        <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
                        {backendTeam.map((member) => (
                            <WebTeamMemberCard key={member.id} {...member} />
                        ))}
                    </div>
                </section>

            </div>

            <ScrollToTop />
        </div>
    );
};

export default WebTeam;