import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ReactSwiper = ({ newsItems, CardTemplate,
    breakpoints = {
        640: { slidesPerView: 1 },
        768: { slidesPerView: 1 },
        1024: { slidesPerView: 1 },
    } }) => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 md:px-10 lg:px-16 text-center">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                loop
                breakpoints={breakpoints}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                navigation
                className="w-full"
            >
                {newsItems.map((item, index) => (
                    <SwiperSlide key={index}>
                        <CardTemplate item={item}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ReactSwiper;
