import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export const ProjectCard = ({ project, onClick, index }) => {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [sheenPos, setSheenPos] = useState({ x: 50, y: 50 })
  const [isHovering, setIsHovering] = useState(false)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const handleMouseMove = (e) => {
    if (isMobile || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const cardCenterX = rect.left + rect.width / 2
    const cardCenterY = rect.top + rect.height / 2
    const rotateY = ((e.clientX - cardCenterX) / rect.width) * -15
    const rotateX = ((e.clientY - cardCenterY) / rect.height) * 15
    const sheenX = ((e.clientX - rect.left) / rect.width) * 100
    const sheenY = ((e.clientY - rect.top) / rect.height) * 100
    setTilt({ x: rotateX, y: rotateY })
    setSheenPos({ x: sheenX, y: sheenY })
  }

  const handleMouseEnter = () => setIsHovering(true)
  const handleMouseLeave = () => {
    setIsHovering(false)
    setTilt({ x: 0, y: 0 })
    setSheenPos({ x: 50, y: 50 })
  }

  const cardStyle = isMobile
    ? {}
    : {
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovering ? 1.02 : 1})`,
        transition: isHovering ? 'transform 0.1s ease' : 'transform 0.5s ease',
      }

  return (
    <motion.div
      ref={cardRef}
      data-project-card
      className="project-card group relative rounded-2xl overflow-hidden cursor-none flex-shrink-0"
      style={{
        width: isMobile ? '100%' : '380px',
        height: isMobile ? 'auto' : '480px',
        ...cardStyle,
      }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(project)}
      data-cursor="hover"
    >
      {/* Card Background */}
      <div
        className="relative h-full flex flex-col"
        style={{
          background: '#1a1a2e',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',
          overflow: 'hidden',
          boxShadow: isHovering ? `0 20px 60px ${project.color}30` : 'none',
          transition: 'box-shadow 0.5s ease',
        }}
      >
        {/* Sheen overlay (desktop only) */}
        {!isMobile && isHovering && (
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `radial-gradient(circle at ${sheenPos.x}% ${sheenPos.y}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
            }}
          />
        )}

        {/* Top Image Area with Scrolling Effect */}
        <div
          className="relative overflow-hidden flex-shrink-0"
          style={{
            height: isMobile ? '180px' : '220px',
            background: `linear-gradient(135deg, ${project.color}30, ${project.color}10, transparent)`,
          }}
        >
          {project.image && (
            <motion.div
              className="absolute inset-0 w-full h-full"
              animate={isHovering ? { y: '-60%' } : { y: '0%' }}
              transition={{ 
                duration: 4, 
                ease: "linear",
                repeat: isHovering ? Infinity : 0,
                repeatType: "mirror"
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full object-cover"
                style={{ minHeight: '100%' }}
              />
            </motion.div>
          )}

          {/* Big faded project number (only if no image or as overlay) */}
          {!project.image && (
            <span
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-800 select-none pointer-events-none"
              style={{
                fontSize: '8rem',
                color: `${project.color}12`,
                lineHeight: 1,
              }}
            >
              {String(project.id).padStart(2, '0')}
            </span>
          )}

          {/* Gradient overlay for tech pills readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />

          {/* Tech stack pills */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 z-20">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className="text-[10px] px-2 py-0.5 rounded-full font-mono backdrop-blur-md"
                style={{
                  backgroundColor: `${project.color}40`,
                  color: '#fff',
                  border: `1px solid ${project.color}60`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Content */}
        <div className="flex flex-col flex-grow p-6">
          {/* Title */}
          <h3 className="text-xl font-display font-700 text-gray-100 mb-2 group-hover:text-white transition-colors">
            {project.title}
          </h3>

          {/* Short Description */}
          <p
            className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {project.shortDesc}
          </p>

          {/* Footer Row */}
          <div className="flex items-center justify-end pt-4 border-t border-white/5">

            <span
              className="text-sm font-medium flex items-center gap-2 transition-colors"
              style={{ color: project.color }}
              data-cursor="hover"
            >
              View Details
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:translate-x-1 transition-transform duration-300"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
