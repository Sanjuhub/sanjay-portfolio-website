'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Github, Linkedin, Mail, Phone, MapPin, Code, Database, Cloud, Zap, Cpu, Globe } from 'lucide-react'

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

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

  const techIcons = [
    { Icon: Code, label: 'Code', color: 'from-green-400 to-green-600', position: 'top-right' },
    { Icon: Database, label: 'DB', color: 'from-blue-400 to-blue-600', position: 'bottom-left' },
    { Icon: Cloud, label: 'AWS', color: 'from-orange-400 to-orange-600', position: 'left' },
    { Icon: Zap, label: 'API', color: 'from-yellow-400 to-yellow-600', position: 'top-left' },
    { Icon: Cpu, label: 'Sys', color: 'from-purple-400 to-purple-600', position: 'bottom-right' },
    { Icon: Globe, label: 'Web', color: 'from-cyan-400 to-cyan-600', position: 'bottom' }
  ]

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

          {/* Right side - Enhanced Interactive Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <div 
              className="relative w-96 h-96 cursor-none"
              onMouseMove={handleMouseMove}
            >
              {/* Animated background rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed border-indigo-300/30 rounded-full scale-110"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed border-cyan-300/30 rounded-full scale-125"
              />
              
              {/* Glowing orbs that follow mouse */}
              <motion.div
                animate={{
                  x: mousePosition.x * 0.1,
                  y: mousePosition.y * 0.1,
                }}
                transition={{ type: "spring", stiffness: 50 }}
                className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-full blur-3xl"
              />
              <motion.div
                animate={{
                  x: mousePosition.x * -0.05,
                  y: mousePosition.y * -0.05,
                }}
                transition={{ type: "spring", stiffness: 30 }}
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl scale-110"
              />

              {/* Main interactive profile circle */}
              <motion.div
                className="relative w-80 h-80 mx-auto my-8 rounded-full overflow-hidden group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  scale: { duration: 0.3 }
                }}
              >
                {/* Profile Image */}
                <img
                  src="/profile.jpg"
                  alt="Sanjay Kumar"
                  className="w-full h-full object-cover rounded-full"
                />
                
                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8"
                >
                  <span className="text-white font-semibold">Click to connect!</span>
                </motion.div>
              </motion.div>
              
              {/* Interactive floating tech icons */}
              {techIcons.map((tech, index) => {
                const positions = {
                  'top-right': { top: '-6px', right: '-6px' },
                  'bottom-left': { bottom: '-6px', left: '-6px' },
                  'left': { top: '50%', left: '-40px', transform: 'translateY(-50%)' },
                  'top-left': { top: '20px', left: '20px' },
                  'bottom-right': { bottom: '20px', right: '20px' },
                  'bottom': { bottom: '-6px', left: '50%', transform: 'translateX(-50%)' }
                }

                return (
                  <motion.div
                    key={tech.label}
                    className={`absolute w-20 h-20 bg-gradient-to-r ${tech.color} rounded-2xl flex flex-col items-center justify-center text-white font-bold shadow-2xl cursor-pointer group`}
                    style={positions[tech.position as keyof typeof positions]}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      y: [0, Math.sin(index * 1.5) * 10, 0],
                      rotate: [0, Math.sin(index * 2) * 5, 0]
                    }}
                    transition={{ 
                      scale: { delay: 1 + index * 0.2, duration: 0.5 },
                      opacity: { delay: 1 + index * 0.2, duration: 0.5 },
                      y: { duration: 3 + index * 0.5, repeat: Infinity, ease: "easeInOut" },
                      rotate: { duration: 4 + index * 0.3, repeat: Infinity, ease: "easeInOut" }
                    }}
                    whileHover={{ 
                      scale: 1.2, 
                      y: -5,
                      boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <tech.Icon size={20} />
                    <span className="text-xs mt-1 opacity-90">{tech.label}</span>
                    
                    {/* Hover tooltip */}
                    <motion.div
                      className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10"
                      initial={{ y: 10 }}
                      whileHover={{ y: 0 }}
                    >
                      {tech.label === 'Code' && 'Frontend & Backend'}
                      {tech.label === 'DB' && 'PostgreSQL & MongoDB'}
                      {tech.label === 'AWS' && 'Cloud Infrastructure'}
                      {tech.label === 'API' && 'RESTful & GraphQL'}
                      {tech.label === 'Sys' && 'System Architecture'}
                      {tech.label === 'Web' && 'Full Stack Development'}
                    </motion.div>
                  </motion.div>
                )
              })}

              {/* Floating particles around the profile */}
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                  style={{
                    left: `${20 + Math.cos(i * 30 * Math.PI / 180) * 160}px`,
                    top: `${180 + Math.sin(i * 30 * Math.PI / 180) * 160}px`,
                  }}
                  animate={{
                    scale: [0.5, 1.2, 0.5],
                    opacity: [0.3, 1, 0.3],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 3 + i * 0.2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}

              {/* Interactive cursor follower */}
              <motion.div
                className="absolute w-4 h-4 bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full pointer-events-none"
                animate={{
                  x: mousePosition.x - 8,
                  y: mousePosition.y - 8,
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero 