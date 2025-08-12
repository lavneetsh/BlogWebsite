import React from 'react';
import { Link } from 'react-router-dom';

function PostCard({ id, title, featuredImage }) {
    
  return (
    <Link to={`/post/${id}`} className="group">
        {/* 1. Turn the entire card into a vertical flex container.
               Add a fixed height for consistency. */}
        <div className='w-full bg-white rounded-xl overflow-hidden shadow-lg border border-slate-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col h-full'>
            
            {/* Image Container */}
            <div className='w-full aspect-w-16 aspect-h-9 bg-slate-100 overflow-hidden'>
                <img 
                    src={featuredImage.url}
                    alt={title}
                    className='w-full h-full object-cover transition-transform duration-300 group-hover:scale-105' 
                />
            </div>
            
            {/* 2. Make the content area a flex container that grows to fill remaining space. */}
            <div className="p-4 flex flex-col flex-grow">
                {/* 3. This is the magic: Tell the title to grow and take up all available space,
                       which pushes the author section to the bottom. */}
                <h2 className='text-lg font-bold text-slate-800 line-clamp-2 flex-grow'>
                    {title}
                </h2>
                
                
            </div>
        </div>
    </Link>
  )
}

export default PostCard;