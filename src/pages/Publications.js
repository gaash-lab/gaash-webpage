import React from 'react';
import banner_publications from './../assets/banner-publications.avif'
import { limitedsupervisionvision, medicalimageanalysis, multimodallearning, personcentricvision, remotesensingandearthvision, synthesisandgeneration } from '../data/publications';
import ScrollToTop from '../components/ScrollToTop';
const Publications = () => {


    return (
        <div className='w-full bg-white'>
            <section className="w-full flex flex-col items-center text-center">
                <div
                    className="w-full h-[400px] bg-cover bg-center mt-4 z-30 relative"
                    style={{
                        backgroundImage: `url("${banner_publications}")`,
                    }}
                />
            </section>
            <section className="w-full max-w-4xl mx-auto bg-white p-6 sm:p-8 md:p-10 lg:p-16 -mt-32 md:-mt-40 z-40 relative text-center">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8 font-oswald tracking-wider">
                    Publications
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                    <a
                        className='inline-block px-6 py-2 font-semibold bg-blue-800 hover:bg-blue-700 cursor-pointer text-white'
                        href='#multimodallearning'
                    >
                        Multi-modal Learning
                    </a>
                    <a
                        className='inline-block px-6 py-2 font-semibold bg-blue-800 hover:bg-blue-700 cursor-pointer text-white'
                        href='#limitedsupervisionvision'
                    >
                        Limited Supervision Vision
                    </a>
                    <a
                        className='inline-block px-6 py-2 font-semibold bg-blue-800 hover:bg-blue-700 cursor-pointer text-white'
                        href='#personcentricvision'
                    >
                        Person Centric Vision
                    </a>
                    <a
                        className='inline-block px-6 py-2 font-semibold bg-blue-800 hover:bg-blue-700 cursor-pointer text-white'
                        href='#synthesisandgeneration'
                    >
                        Synthesis and Generation
                    </a>
                    <a
                        className='inline-block px-6 py-2 font-semibold bg-blue-800 hover:bg-blue-700 cursor-pointer text-white'
                        href='#remotesensingandearthvision'
                    >
                        Remote Sensing and Earth Vision
                    </a>
                    <a
                        className='inline-block px-6 py-2 font-semibold bg-blue-800 hover:bg-blue-700 cursor-pointer text-white'
                        href='#medicalimageanalysis'
                    >
                        Medical Image Analysis
                    </a>
                </div>
            </section>

            <section className='p-6 mt-[150px] max-w-7xl conatiner mx-auto'>
                <div id='multimodallearning' className='h-24'></div>
                <h2 className='my-4 font-oswald tracking-wide font-bold text-3xl underline text-blue-800'>{multimodallearning.title}</h2>
                <div className='w-full space-y-4 bg-white'>
                    {
                        multimodallearning?.papers.map((item, index) => (
                            <PaperCard key={index} title={item.title}
                                authors={item.authors}
                                conference={item.conference}
                                link={item.link}
                                imageUrl={item.image}
                            />
                        ))
                    }
                </div>
            </section>
            <section className='p-6 mt-[150px] max-w-7xl conatiner mx-auto'>
                <div id='limitedsupervisionvision' className='h-24'></div>
                <h2 className='my-4 font-oswald tracking-wide font-bold text-3xl underline text-blue-800'>{limitedsupervisionvision.title}</h2>
                <div className='w-full space-y-4 bg-white'>
                    {
                        limitedsupervisionvision?.papers.map((item, index) => (
                            <PaperCard key={index} title={item.title}
                                authors={item.authors}
                                conference={item.conference}
                                link={item.link}
                                imageUrl={item.image}
                            />
                        ))
                    }
                </div>
            </section>
            <section className='p-6 mt-[150px] max-w-7xl conatiner mx-auto'>
                <div id='personcentricvision' className='h-24'></div>
                <h2 className='my-4 font-oswald tracking-wide font-bold text-3xl underline text-blue-800'>{personcentricvision.title}</h2>
                <div className='w-full space-y-4 bg-white'>
                    {
                        personcentricvision?.papers.map((item, index) => (
                            <PaperCard key={index} title={item.title}
                                authors={item.authors}
                                conference={item.conference}
                                link={item.link}
                                imageUrl={item.image}
                            />
                        ))
                    }
                </div>
            </section>
            <section className='p-6 mt-[150px] max-w-7xl conatiner mx-auto'>
                <div id='synthesisandgeneration' className='h-24'></div>
                <h2 className='my-4 font-oswald tracking-wide font-bold text-3xl underline text-blue-800'>{synthesisandgeneration.title}</h2>
                <div className='w-full space-y-4 bg-white'>
                    {
                        synthesisandgeneration?.papers.map((item, index) => (
                            <PaperCard key={index} title={item.title}
                                authors={item.authors}
                                conference={item.conference}
                                link={item.link}
                                imageUrl={item.image}
                            />
                        ))
                    }
                </div>
            </section>
            <section className='p-6 mt-[150px] max-w-7xl conatiner mx-auto'>
                <div id='remotesensingandearthvision' className='h-24'></div>
                <h2 className='my-4 font-oswald tracking-wide font-bold text-3xl underline text-blue-800'>{remotesensingandearthvision.title}</h2>
                <div className='w-full space-y-4 bg-white'>
                    {
                        remotesensingandearthvision?.papers.map((item, index) => (
                            <PaperCard key={index} title={item.title}
                                authors={item.authors}
                                conference={item.conference}
                                link={item.link}
                                imageUrl={item.image}
                            />
                        ))
                    }
                </div>
            </section>
            <section className='p-6 mt-[150px] max-w-7xl conatiner mx-auto'>
                <div id='medicalimageanalysis' className='h-24'></div>
                <h2 className='my-4 font-oswald tracking-wide font-bold text-3xl underline text-blue-800'>{medicalimageanalysis.title}</h2>
                <div className='w-full space-y-4 bg-white'>
                    {
                        medicalimageanalysis?.papers.map((item, index) => (
                            <PaperCard key={index} title={item.title}
                                authors={item.authors}
                                conference={item.conference}
                                link={item.link}
                                imageUrl={item.image}
                            />
                        ))
                    }
                </div>
            </section>
            <ScrollToTop />

        </div>
    );
};

export default Publications;


const PaperCard = ({ title, authors, conference, link, imageUrl }) => {
    return (
        <div className="rounded overflow-hidden bg-white flex flex-col lg:flex-row gap-4">
            <img className="object-cover aspect-video" src={imageUrl} alt={title} />

            <div className="px-6 py-4 flex-1">
                <div className="font-bold text-xl mb-2 text-blue-800">{title}</div>
                <p className="text-gray-700 text-base mb-4">{authors}</p>
                <p className="text-gray-600 text-sm mb-4">{conference}</p>
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block hover:bg-blue-800 transition-colors duration-300 text-xs border border-gray-500 text-black py-2 px-4 hover:text-white hover:border-transparent"
                >
                    Read the Paper
                </a>
            </div>
        </div>
    );
};

