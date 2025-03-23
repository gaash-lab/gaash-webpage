import React from "react";

const Heading = ({ children, className = "" }) => {
    return (
        <div className={`flex items-center w-full my-6 gap-6 lg:gap-10 ${className}`}>
            <div className="flex-1 h-[1px] bg-gray-500"></div>
            <h2 className="mx-4 text-2xl lg:text-3xl font-bold text-black font-oswald tracking-wider">
                {children}
            </h2>
            <div className="flex-1 h-[1px] bg-gray-500"></div>
        </div>
    );
};

export default Heading;
