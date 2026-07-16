import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import emailjs from '@emailjs/browser'

const SERVICE_ID = 'YOUR_EMAILJS_SERVICE_ID'   // Replace with your EmailJS service ID
const TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID' // Replace with your EmailJS template ID
const PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY'    // Replace with your EmailJS public key

export const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null
  const formRef = useRef(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async () => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      setSubmitStatus('success')
      reset()
    } catch (error) {
      console.error('Email failed:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setSubmitStatus(null)
    reset()
  }

  const inputBase =
    'w-full px-4 py-3 rounded-lg bg-white/5 border text-gray-200 placeholder-gray-500 font-body text-sm focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(124,58,237,0.2)] transition-all duration-300'

  const labelClass = 'block text-sm font-medium text-gray-400 mb-2'

  // Success State
  if (submitStatus === 'success') {
    return (
      <motion.div
        className="flex flex-col items-center justify-center py-12 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Animated Checkmark */}
        <motion.div
          className="w-20 h-20 rounded-full border-4 border-green-400 flex items-center justify-center mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
        >
          <motion.svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4ade80"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <polyline points="20 6 9 17 4 12" />
          </motion.svg>
        </motion.div>

        <h3 className="text-2xl font-display font-700 text-gray-100 mb-2">
          Message sent!
        </h3>
        <p className="text-gray-400 text-sm mb-6">
          I'll get back to you within 24 hours.
        </p>
        <motion.button
          onClick={resetForm}
          className="text-primary text-sm font-medium hover:underline cursor-none"
          whileHover={{ scale: 1.05 }}
          data-cursor="hover"
        >
          Send another message
        </motion.button>
      </motion.div>
    )
  }

  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      noValidate
    >
      {/* Error Banner */}
      <AnimatePresence>
        {submitStatus === 'error' && (
          <motion.div
            className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            Something went wrong. Please try again or email me directly.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Name */}
      <div>
        <label htmlFor="user_name" className={labelClass}>Name</label>
        <input
          id="user_name"
          type="text"
          placeholder="Your name"
          className={`${inputBase} ${errors.name ? 'border-red-500' : 'border-white/10'}`}
          {...register('user_name', {
            required: 'Name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' },
          })}
        />
        {errors.user_name && (
          <p className="text-red-400 text-xs mt-1 font-mono">{errors.user_name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="user_email" className={labelClass}>Email</label>
        <input
          id="user_email"
          type="email"
          placeholder="your@email.com"
          className={`${inputBase} ${errors.user_email ? 'border-red-500' : 'border-white/10'}`}
          {...register('user_email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
        />
        {errors.user_email && (
          <p className="text-red-400 text-xs mt-1 font-mono">{errors.user_email.message}</p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className={labelClass}>Subject</label>
        <input
          id="subject"
          type="text"
          placeholder="Project inquiry / Freelance work / etc."
          className={`${inputBase} ${errors.subject ? 'border-red-500' : 'border-white/10'}`}
          {...register('subject', {
            required: 'Subject is required',
            minLength: { value: 5, message: 'Subject must be at least 5 characters' },
          })}
        />
        {errors.subject && (
          <p className="text-red-400 text-xs mt-1 font-mono">{errors.subject.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClass}>Message</label>
        <textarea
          id="message"
          rows={6}
          placeholder="Tell me about your project..."
          className={`${inputBase} resize-none ${errors.message ? 'border-red-500' : 'border-white/10'}`}
          {...register('message', {
            required: 'Message is required',
            minLength: { value: 20, message: 'Message must be at least 20 characters' },
          })}
        />
        {errors.message && (
          <p className="text-red-400 text-xs mt-1 font-mono">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-4 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-3 ${
          isSubmitting
            ? 'bg-primary/30 text-primary/50 cursor-not-allowed'
            : 'text-white hover:opacity-90'
        }`}
        style={{
          background: isSubmitting
            ? 'linear-gradient(135deg, #3C4245, #5F6769)'
            : 'linear-gradient(135deg, #3C4245, #5F6769)',
          height: '52px',
        }}
        whileHover={!isSubmitting ? { scale: 1.02 } : {}}
        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
        data-cursor="hover"
      >
        {isSubmitting ? (
          <>
            <motion.div
              className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            />
            Sending...
          </>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            Send Message
          </>
        )}
      </motion.button>
    </motion.form>
  )
}
