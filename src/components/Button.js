import React from "react";

const Button = ({ 
    children, 
    onClick, 
    type = "button", 
    variant = "primary", 
    className = "" 
}) => {
    const baseStyles = "px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 ease-in-out shadow-md focus:outline-none focus:ring-4";

    const variants = {
        primary: "bg-blue-800 text-white hover:bg-blue-700 hover:shadow-lg focus:ring-blue-300",
        secondary: "bg-gray-600 text-white hover:bg-gray-700 hover:shadow-lg focus:ring-gray-400",
        outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-lg focus:ring-blue-300",
        danger: "bg-red-600 text-white hover:bg-red-700 hover:shadow-lg focus:ring-red-400",
    };

    return (
        <button
            type={type}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
