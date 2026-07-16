import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { personalInfo } from '../data/portfolioData'

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Basic active link detection based on scroll position
      const sections = ['home', 'about', 'projects', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveLink(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' },
  ]

  const handleLinkClick = (e, id) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setActiveLink(id)
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 px-4 md:px-8 py-4 transition-all duration-300 ${
          isScrolled
            ? 'backdrop-blur-2xl bg-dark/80 border-b border-primary/20'
            : 'bg-transparent'
        }`}
        style={{ zIndex: 100 }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="cursor-pointer"
            onClick={(e) => handleLinkClick(e, 'home')}
          >
            <motion.div
              className="text-xl md:text-2xl font-display font-800 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              {personalInfo.name.split(' ')[0]}
            </motion.div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.id} className="relative">
                <a
                  href={`#${link.id}`}
                  className={`cursor-pointer transition-colors font-medium text-sm ${
                    activeLink === link.id ? 'text-primary' : 'text-gray-300 hover:text-primary'
                  }`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  data-cursor="hover"
                >
                  {link.label}
                </a>
                {activeLink === link.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    layoutId="activeLink"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <motion.button
            className="md:hidden flex flex-col gap-1.5 cursor-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-cursor="hover"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            style={{ zIndex: 50 }}
          >
            <motion.div
              className="w-6 h-0.5 bg-primary"
              animate={isMobileMenuOpen ? { rotate: 45, y: 12 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="w-6 h-0.5 bg-primary"
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="w-6 h-0.5 bg-primary"
              animate={isMobileMenuOpen ? { rotate: -45, y: -12 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        className="fixed inset-0 bg-surface/95 backdrop-blur-md md:hidden flex items-center justify-center pt-20"
        style={{ zIndex: 40 }}
        initial={{ x: '100%' }}
        animate={isMobileMenuOpen ? { x: 0 } : { x: '100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex flex-col gap-8 text-center">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1 }}
            >
              <a
                href={`#${link.id}`}
                className="text-2xl font-display font-700 text-primary hover:text-secondary transition-colors cursor-pointer"
                onClick={(e) => handleLinkClick(e, link.id)}
              >
                {link.label}
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  )
}

