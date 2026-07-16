import React, { useEffect, useRef } from 'react'

export const ThreeScene = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    // The script is already preloading via index.html for speed.
    // Create the element programmatically to avoid React Web Component hydration issues
    if (containerRef.current && !containerRef.current.querySelector('spline-viewer')) {
      const viewer = document.createElement('spline-viewer')
      viewer.setAttribute('url', 'https://prod.spline.design/YLUO2m8F98Pj2vMp/scene.splinecode')
      viewer.setAttribute('events-target', 'none')
      viewer.setAttribute('loading-anim-type', 'spinner')
      
      viewer.style.width = '100%'
      viewer.style.height = '100%'
      viewer.style.pointerEvents = 'none'
      
      containerRef.current.appendChild(viewer)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
      <div
        ref={containerRef}
        className="w-full h-full"
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          transform: 'translateX(10%)' 
        }}
      />
      {/* Overlay to hide Spline watermark */}
      <div className="absolute bottom-0 right-0 w-32 h-12 bg-black z-10" />
    </div>
  )
}

