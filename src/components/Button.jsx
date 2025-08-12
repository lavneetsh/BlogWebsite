import React from "react";

export default function Button({
    children,
    type = "button",
    className = "", // Overrides will be applied here
    ...props
}) {
    return (
        <button
            className={`
                w-full inline-flex items-center justify-center px-4 py-2.5 
                font-semibold text-white bg-teal-600 rounded-lg 
                border border-transparent 
                transition-all duration-200 ease-in-out
                hover:bg-teal-700 hover:scale-[1.02]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500
                active:scale-95
                ${className} 
            `}
            type={type}
            {...props}
        >
            {children}
        </button>
    );
}