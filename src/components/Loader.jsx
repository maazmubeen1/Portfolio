import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const Loader = ({ onComplete }) => {
  const name = "Reckson"
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 2500)
    
    return () => clearTimeout(timer)
  }, [onComplete])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
    exit: {
      y: "-100%",
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const progressVariants = {
    hidden: { width: "0%" },
    visible: {
      width: "100%",
      transition: { duration: 2, ease: "easeInOut" },
    },
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-9999 bg-dark flex flex-col items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className="text-4xl md:text-5xl font-display font-800 text-center"
          style={{
            background: "linear-gradient(135deg, #f1f0ff, #3C4245)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          <motion.div
            className="flex justify-center gap-1 flex-wrap"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {name.split("").map((letter, i) => (
              <motion.span key={i} variants={letterVariants}>
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-8 w-48 h-1 bg-surface rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary"
            variants={progressVariants}
            initial="hidden"
            animate="visible"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

