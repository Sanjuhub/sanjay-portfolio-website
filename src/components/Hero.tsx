'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Github, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

const titles = [
  'Backend Developer',
  'Node.js Expert',
  'System Architect',
  'API Developer',
  'Frontend Developer'
]

const Hero = () => {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const type = () => {
      const current = titles[currentIndex]
      
      if (isDeleting) {
        setCurrentText(current.substring(0, currentText.length - 1))
      } else {
        setCurrentText(current.substring(0, currentText.length + 1))
      }

      if (!isDeleting && currentText === current) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false)
        setCurrentIndex((prev) => (prev + 1) % titles.length)
      }
    }

    const timer = setTimeout(type, isDeleting ? 50 : 100)
    return () => clearTimeout(timer)
  }, [currentText, isDeleting, currentIndex, titles])

  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToProjects = () => {
    const element = document.querySelector('#projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-cyan-400 font-semibold"
              >
                Hello, I&apos;m
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl lg:text-7xl font-bold text-white"
              >
                Sanjay Kumar
              </motion.h1>
              
              <div className="text-2xl lg:text-4xl font-semibold text-gray-300 h-16 flex items-center">
                <span className="text-gradient-primary">{currentText}</span>
                <span className="animate-pulse-slow text-cyan-400">|</span>
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-gray-400 leading-relaxed max-w-2xl"
            >
              Senior Backend Engineer with 6+ years of experience building scalable systems 
              with Node.js, NestJS, PostgreSQL, and AWS. Passionate about creating efficient 
              APIs and mentoring development teams.
            </motion.p>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-6 text-gray-400"
            >
              <div className="flex items-center gap-2">
                <Mail size={20} className="text-cyan-400" />
                <span>sanjay14321@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={20} className="text-cyan-400" />
                <span>+91 70179 57803</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-cyan-400" />
                <span>India</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={scrollToContact}
                className="btn-primary"
              >
                Get In Touch
              </button>
              
              <button
                onClick={scrollToProjects}
                className="px-8 py-3 border-2 border-indigo-500 text-indigo-400 rounded-full font-semibold hover:bg-indigo-500 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25"
              >
                View My Work
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex gap-6"
            >
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://github.com/findmesektor"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
              >
                <Github size={24} className="text-gray-300" />
              </motion.a>
              
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://www.linkedin.com/in/findmesektor/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
              >
                <Linkedin size={24} className="text-gray-300" />
              </motion.a>
              
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="mailto:sanjay14321@gmail.com"
                className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
              >
                <Mail size={24} className="text-gray-300" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right side - Profile image/visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Animated background elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full animate-pulse-slow opacity-20 scale-110"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse-slow opacity-20 scale-125 animation-delay-1000"></div>
              
              {/* Profile placeholder - you can replace with actual image */}
              <div className="relative w-80 h-80 bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 rounded-full flex items-center justify-center animate-float">
                <div className="w-72 h-72 bg-gray-900 rounded-full flex items-center justify-center text-6xl font-bold text-gradient-primary">
                  SK
                </div>
              </div>
              
              {/* Floating tech icons */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold"
              >
                Node
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold"
              >
                SQL
              </motion.div>
              
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                className="absolute top-1/2 -left-8 w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold"
              >
                AWS
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero 