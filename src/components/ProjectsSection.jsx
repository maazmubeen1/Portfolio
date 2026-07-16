import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { projects } from '../data/portfolioData'
import { ProjectCard } from './ProjectCard'
import { ProjectModal } from './ProjectModal'

gsap.registerPlugin(ScrollTrigger)

export const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef(null)
  const pinWrapperRef = useRef(null)
  const trackRef = useRef(null)
  const headerRef = useRef(null)
  const [inView, setInView] = useState(false)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Header in-view observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 }
    )
    if (headerRef.current) observer.observe(headerRef.current)
    return () => observer.disconnect()
  }, [])

  // GSAP horizontal scroll (desktop only)
  useEffect(() => {
    if (isMobile) return

    const section = sectionRef.current
    const pinWrapper = pinWrapperRef.current
    const track = trackRef.current
    if (!section || !pinWrapper || !track) return

    // Wait for DOM to render
    const timer = setTimeout(() => {
      const cardWidth = 380
      const gap = 32
      const totalCards = projects.length
      const trackWidth = totalCards * (cardWidth + gap) - gap + 200 // extra padding
      const scrollDistance = trackWidth - window.innerWidth + 400

      // Set the section height to allow enough scroll
      section.style.height = `${window.innerHeight + scrollDistance}px`

      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${scrollDistance}`,
        pin: pinWrapper,
        scrub: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress * 100)
        },
        animation: gsap.to(track, {
          x: -scrollDistance + 200,
          ease: 'none',
        }),
      })

      return () => {
        st.kill()
      }
    }, 300)

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill()
      })
    }
  }, [isMobile])

  return (
    <>
      <section
        id="projects"
        ref={sectionRef}
        className="relative z-10"
        style={{
          minHeight: '100vh',
        }}
      >
        {/* Pin Wrapper */}
        <div
          ref={pinWrapperRef}
          className="relative w-full"
          style={{
            minHeight: isMobile ? 'auto' : '100vh',
          }}
        >
          {/* Progress Bar (top of section) */}
          {!isMobile && (
            <div className="fixed top-0 left-0 w-full h-1 z-50" style={{ opacity: scrollProgress > 0 && scrollProgress < 100 ? 1 : 0, transition: 'opacity 0.3s' }}>
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary"
                style={{
                  width: `${scrollProgress}%`,
                  transition: 'width 0.1s linear',
                }}
              />
            </div>
          )}

          {/* Section Header */}
          <div
            ref={headerRef}
            className="px-4 md:px-8 pt-24 pb-12 max-w-7xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-primary font-mono text-sm">03.</span>
                <h2 className="text-4xl md:text-5xl font-display font-800 text-gray-100">
                  Projects
                </h2>
              </div>
              <motion.div
                className="w-16 h-1 bg-primary rounded-full ml-10"
                initial={{ width: 0 }}
                animate={inView ? { width: 64 } : { width: 0 }}
                transition={{ duration: 0.8 }}
              />
              <p className="text-gray-400 mt-4 text-lg max-w-2xl ml-10">
                A showcase of high-performance automation systems, 
                conversion-focused funnels, and advanced workflow architectures.
              </p>
            </motion.div>
          </div>

          {/* Cards Area */}
          {isMobile ? (
            /* MOBILE: Vertical stack */
            <div className="px-4 pb-16 space-y-6">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={setSelectedProject}
                />
              ))}
            </div>
          ) : (
            /* DESKTOP: Horizontal scroll track */
            <div className="pl-8 flex items-center" style={{ minHeight: 'calc(100vh - 250px)' }}>
              <div
                ref={trackRef}
                className="flex gap-8 items-stretch"
                style={{ paddingRight: '200px' }}
              >
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    onClick={setSelectedProject}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Stats Row */}
          <div className="px-4 md:px-8 py-16 max-w-7xl mx-auto">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {[
                { label: 'Workflows Shipped', value: '400+' },
                { label: 'Revision Reduction', value: '35%' },
                { label: 'Response Time Improvement', value: '70%' },
                { label: 'Show-up Rate Lift', value: '18–25%' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-6 rounded-2xl bg-card/50 border border-white/5"
                  whileHover={{ borderColor: 'rgba(124, 58, 237, 0.3)' }}
                >
                  <motion.p
                    className="text-3xl md:text-4xl font-display font-800 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-gray-500 text-sm font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
