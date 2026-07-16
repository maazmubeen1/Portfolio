import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personalInfo, skills, education, experience } from '../data/portfolioData'
import { Timeline } from './Timeline'
import { SkillBar } from './SkillBar'

export const AboutSection = () => {
  const [activeTab, setActiveTab] = useState(0)
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
      { threshold: 0.2 }
    )
    if (ref.current) {
      observer.observe(ref.current)
    }
    return () => observer.disconnect()
  }, [])

  const tabs = [
    { label: 'Who I Am', id: 'about' },
    { label: 'Experience', id: 'experience' },
    { label: 'Skills', id: 'skills' },
  ]

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {})

  const renderContent = () => {
    switch (activeTab) {
      case 0: // Who I Am
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* About Content */}
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-display font-700 mb-2 text-gray-100">
                {personalInfo.name}
              </h3>
              <p className="text-secondary text-lg font-medium mb-4">{personalInfo.tagline}</p>
              
              <p className="text-gray-400 leading-relaxed mb-6">{personalInfo.bio}</p>

              {/* Quick Facts Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs text-primary font-mono mb-1">LOCATION</p>
                  <p className="text-gray-300">{personalInfo.location}</p>
                </div>
                <div>
                  <p className="text-xs text-primary font-mono mb-1">EMAIL</p>
                  <p className="text-gray-300 break-all">{personalInfo.email}</p>
                </div>
                <div>
                  <p className="text-xs text-primary font-mono mb-1">AVAILABILITY</p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <p className="text-gray-300">Open to work</p>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )

      case 1: // Experience
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-8">
              <h3 className="text-lg font-display font-700 text-gray-300 mb-6">Work Experience</h3>
              <Timeline items={experience} />
            </div>
            <div>
              <h3 className="text-lg font-display font-700 text-gray-300 mb-6">Education</h3>
              <Timeline items={education} />
            </div>
          </motion.div>
        )

      case 2: // Skills
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="space-y-12"
          >
            {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
              <div key={category}>
                <h3 className="text-lg font-display font-700 text-primary mb-4">{category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {categorySkills.map((skill) => (
                    <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <section
      id="about"
      className="relative min-h-screen w-full py-24 px-4 md:px-8 z-10 bg-dark/40 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto w-full" ref={ref}>
        {/* Section Title */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-800 mb-4 text-gray-100">
            About Me
          </h2>
          <motion.div
            className="w-16 h-1 bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={inView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          className="flex gap-2 md:gap-4 mb-12 border-b border-primary/20 pb-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 font-medium text-sm md:text-base transition-colors relative ${
                activeTab === index ? 'text-primary' : 'text-gray-400 hover:text-gray-300'
              }`}
              data-cursor="hover"
            >
              {tab.label}
              {activeTab === index && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  layoutId="activeTab"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <div key={activeTab}>
            {renderContent()}
          </div>
        </AnimatePresence>
      </div>
    </section>
  )
}

