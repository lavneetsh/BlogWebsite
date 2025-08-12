import React, { useId } from 'react';

function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && (
                <label 
                    htmlFor={id} 
                    className='block text-sm font-medium text-slate-700 mb-1.5'
                >
                    {label}
                </label>
            )}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`
                    // Base and focus styles matching the Input component
                    block w-full px-3 py-2 bg-white text-slate-900 
                    border border-slate-300 rounded-md text-sm shadow-sm 
                    focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500
                    transition-colors duration-200
                    
                    // Custom select arrow
                    appearance-none
                    bg-no-repeat
                    bg-right
                    pr-8 // Add padding to prevent text from overlapping the arrow
                    bg-[url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="%2364748b" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m6 8 4 4 4-4"/></svg>')]
                    
                    ${className}
                `}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default React.forwardRef(Select);