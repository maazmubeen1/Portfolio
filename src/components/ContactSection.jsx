import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { personalInfo } from '../data/portfolioData'
import { ContactForm } from './ContactForm'

export const ContactSection = () => {
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
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const contactMethods = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: '#3C4245',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      label: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      color: '#22c55e',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      label: 'Location',
      value: personalInfo.location,
      href: null,
      color: '#F0A202',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      label: 'LinkedIn',
      value: 'Connect on LinkedIn',
      href: personalInfo.linkedin,
      color: '#0a66c2',
    },
  ]

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full py-24 px-4 md:px-8 z-10 bg-dark/40 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto w-full" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-primary font-mono text-sm">04.</span>
            <h2 className="text-4xl md:text-5xl font-display font-800 text-gray-100">
              Let's Work Together
            </h2>
          </div>
          <motion.div
            className="w-16 h-1 bg-primary rounded-full ml-10"
            initial={{ width: 0 }}
            animate={inView ? { width: 64 } : { width: 0 }}
            transition={{ duration: 0.8 }}
          />
          <p className="text-gray-400 mt-4 text-lg max-w-2xl ml-10">
            Have a project in mind? Let's talk. I'm always open to new opportunities
            and interesting projects.
          </p>
        </motion.div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* LEFT — Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Contact Methods */}
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                {method.href ? (
                  <a
                    href={method.href}
                    target={method.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-4 rounded-xl bg-surface/50 border border-white/5 hover:border-white/15 transition-all duration-300 cursor-none"
                    data-cursor="hover"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${method.color}15`,
                        color: method.color,
                      }}
                    >
                      {method.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1">
                        {method.label}
                      </p>
                      <p className="text-gray-300 text-sm font-medium group-hover:text-primary group-hover:translate-x-1 transition-all duration-300">
                        {method.value}
                      </p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-surface/50 border border-white/5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: `${method.color}15`,
                        color: method.color,
                      }}
                    >
                      {method.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-mono uppercase tracking-wider mb-1">
                        {method.label}
                      </p>
                      <p className="text-gray-300 text-sm font-medium">{method.value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Social Icons Row */}
            <motion.div
              className="flex gap-4 pt-4"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {[
                { href: personalInfo.linkedin, label: 'LinkedIn', icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                )},
                { href: `mailto:${personalInfo.email}`, label: 'Email', icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                )},
              ].map(({ href, label, icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/50 hover:bg-primary/10 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all duration-300 cursor-none"
                  whileHover={{ scale: 1.15, y: -3 }}
                  data-cursor="hover"
                  aria-label={label}
                  style={{ minWidth: '44px', minHeight: '44px' }}
                >
                  {icon}
                </motion.a>
              ))}
            </motion.div>

            {/* Open to work badge */}
            <motion.div
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 w-fit"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-sm font-medium">
                Open to freelance & full-time roles
              </span>
            </motion.div>
          </motion.div>

          {/* RIGHT — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="p-6 md:p-8 rounded-2xl bg-card/50 border border-white/5">
              <h3 className="text-xl font-display font-700 text-gray-100 mb-6">
                Send me a message
              </h3>
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>

      {/* FOOTER */}
      <motion.footer
        className="max-w-7xl mx-auto w-full mt-24 pt-8 border-t border-white/5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-gray-600 text-xs">
            Built with React, Three.js & Framer Motion
          </p>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-2 px-6 py-2 rounded-full border border-white/10 text-gray-400 text-sm font-medium hover:text-primary hover:border-primary/30 transition-all duration-300 cursor-none"
            whileHover={{ scale: 1.05, y: -2 }}
            data-cursor="hover"
            aria-label="Back to top"
          >
            ↑ Back to top
          </motion.button>
        </div>
      </motion.footer>
    </section>
  )
}
