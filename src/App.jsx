import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import { Loader } from './components/Loader'
import { Cursor } from './components/Cursor'
import { Navbar } from './components/Navbar'
import { HeroSection } from './components/HeroSection'
import { ThreeScene } from './components/ThreeScene'
import { AboutSection } from './components/AboutSection'
import { ProjectsSection } from './components/ProjectsSection'
import { ContactSection } from './components/ContactSection'

function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="relative overflow-x-hidden">
      <Cursor />
      <AnimatePresence>
        {!isLoaded && (
          <Loader onComplete={() => setIsLoaded(true)} />
        )}
      </AnimatePresence>
      
      {isLoaded && (
        <>
          <Navbar />
          <ThreeScene />
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <ContactSection />
        </>
      )}
    </div>
  )
}

export default App
