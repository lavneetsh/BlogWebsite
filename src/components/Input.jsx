import React, { useId } from 'react'; // This line is now corrected

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && (
                <label 
                    className='block text-sm font-medium text-slate-700 mb-1.5' 
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`
                    block w-full px-3 py-2 bg-white text-slate-900 
                    border border-slate-300 rounded-md text-sm shadow-sm 
                    placeholder-slate-400
                    focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500
                    disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                    invalid:border-pink-500 invalid:text-pink-600
                    focus:invalid:border-pink-500 focus:invalid:ring-pink-500
                    transition-colors duration-200
                    /* Specific styling for file inputs */
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-teal-50 file:text-teal-700
                    hover:file:bg-teal-100
                    ${className}
                `}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    );
});

export default Input;