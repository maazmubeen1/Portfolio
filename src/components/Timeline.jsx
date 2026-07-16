import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export const Timeline = ({ items }) => {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) {
      observer.observe(ref.current)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="relative">
      {/* Timeline Line */}
      <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary" />

      {/* Timeline Items */}
      <div className="space-y-8 md:space-y-12">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="pl-20 md:pl-24"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            {/* Timeline Dot */}
            <div className="absolute left-2 top-2 w-8 h-8 bg-dark rounded-full border-2 border-primary flex items-center justify-center">
              <div className="w-2 h-2 bg-primary rounded-full" />
            </div>

            {/* Year Badge */}
            <div className="inline-block px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-mono font-medium mb-2">
              {item.year}
            </div>

            {/* Title */}
            <h3 className="text-lg md:text-xl font-display font-700 text-gray-100 mb-1">
              {item.role || item.degree}
            </h3>

            {/* Subtitle */}
            <p className="text-secondary text-sm md:text-base font-medium mb-2">
              {item.company || item.institution}
            </p>

            {/* Description */}
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

