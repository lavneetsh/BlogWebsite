import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div >
      <img src="/blog-image.jpg" className = "rounded-xl" alt="Logo" width={width} />
    </div>
  )
}

export default Logo