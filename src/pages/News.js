import React from 'react'
import banner_news from './../assets/banner-news.avif'
import { cards } from '../data/constants'


const News = () => {
    return (
        <div className="w-full font-oswald">
            <div
                className="w-full h-[400px] bg-cover bg-center z-30 relative"
                style={{
                    backgroundImage: `url("${banner_news}")`,
                }}
            />
            <div className='container bg-white mx-auto max-w-4xl p-6 -mt-28 relative z-40'>
                <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-16">News & Updates</h2>
                <div className="columns-1 sm:colums-2 md:columns-2 lg:columns-3 gap-4 space-y-4">
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
        </div>

    )
}

export default News