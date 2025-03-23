import React from "react";

const Button = ({ children, onClick, type = "button", variant = "primary", className = "" }) => {
    const baseStyles = "px-10 py-3 transition duration-300 mx-auto hover:bg-white border border-transparent hover:border-black hover:text-blue-800";

    const variants = {
        primary: "bg-blue-800 text-white hover:bg-blue-700",
        secondary: "bg-gray-600 text-white hover:bg-gray-700",
        outline: "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
        danger: "bg-red-600 text-white hover:bg-red-700",
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
