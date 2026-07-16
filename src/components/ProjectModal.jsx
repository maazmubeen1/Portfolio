import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const ProjectModal = ({ project, onClose }) => {
  const modalRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768)
  }, [])

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'auto'
    }
  }, [onClose])

  // Focus trap
  useEffect(() => {
    if (modalRef.current) {
      const focusable = modalRef.current.querySelectorAll(
        'button, a, input, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length > 0) focusable[0].focus()
    }
  }, [])

  if (!project) return null

  const desktopVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.25 } },
  }

  const mobileVariants = {
    hidden: { y: '100%' },
    visible: { y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
    exit: { y: '100%', transition: { duration: 0.3 } },
  }

  return (
    <motion.div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(8px)',
        }}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal Box */}
      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`relative z-10 ${
          isMobile
            ? 'w-screen h-screen rounded-none'
            : 'w-[min(800px,90vw)] max-h-[90vh] rounded-2xl'
        } overflow-y-auto`}
        style={{
          background: '#1a1a2e',
          border: isMobile ? 'none' : '1px solid rgba(124,58,237,0.3)',
          scrollbarWidth: 'thin',
          scrollbarColor: `${project.color} transparent`,
        }}
        variants={isMobile ? mobileVariants : desktopVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        data-lenis-prevent="true"
      >
        {/* Color Header Band */}
        <div
          className="relative overflow-hidden"
          style={{
            height: isMobile ? '150px' : '200px',
            background: `linear-gradient(135deg, ${project.color}, ${project.color}80, ${project.color}40)`,
          }}
        >
          {/* Project title over the header */}
          <div className="absolute inset-0 flex items-center justify-center px-8">
            <h2
              id="modal-title"
              className="text-3xl md:text-4xl font-display font-800 text-white text-center drop-shadow-lg"
            >
              {project.title}
            </h2>
          </div>

          {/* Close Button */}
          <motion.button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-primary transition-all"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            data-cursor="hover"
            aria-label="Close modal"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10">
          {/* Tech Stack Pills */}
          <motion.div
            className="flex flex-wrap gap-3 mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            {project.tech.map((tech, i) => (
              <motion.span
                key={tech}
                className="px-4 py-2 rounded-xl text-sm font-medium"
                style={{
                  backgroundColor: `${project.color}15`,
                  color: project.color,
                  border: `1px solid ${project.color}25`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: `${project.color}25`,
                }}
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>

          {/* Full Description */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <h3 className="text-sm font-mono font-medium text-primary mb-3 uppercase tracking-wider">
              About This Project
            </h3>
            <p className="text-gray-300 leading-relaxed text-base">
              {project.fullDesc}
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm border-2 hover:bg-primary hover:border-primary hover:text-white transition-all"
                style={{
                  borderColor: project.color,
                  color: project.color,
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                data-cursor="hover"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                View on GitHub
              </motion.a>
            )}
            {project.live && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-medium text-sm transition-all hover:opacity-90"
                style={{
                  background: `linear-gradient(135deg, ${project.color}, ${project.color}cc)`,
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                data-cursor="hover"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Live Demo
              </motion.a>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
