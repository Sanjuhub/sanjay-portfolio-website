'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Users, Trophy, Zap } from 'lucide-react'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const stats = [
    { icon: Code, label: 'Years Experience', value: '6+' },
    { icon: Trophy, label: 'Projects Completed', value: '50+' },
    { icon: Users, label: 'Teams Led', value: '5+' },
    { icon: Zap, label: 'APIs Built', value: '100+' }
  ]

  return (
    <section ref={ref} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            About <span className="text-gradient-primary">Me</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Passionate about building scalable backend systems and leading development teams
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              I&apos;m a Senior Backend Engineer with over 6 years of experience in building 
              robust, scalable systems. My expertise lies in Node.js, NestJS, and PostgreSQL, 
              with a strong focus on creating efficient APIs and optimizing system performance.
            </p>
            
            <p className="text-lg text-gray-300 leading-relaxed">
              Throughout my career, I&apos;ve worked on diverse projects from AI-powered job platforms 
              to e-commerce solutions, always emphasizing clean code, scalability, and team collaboration. 
              I believe in continuous learning and sharing knowledge with fellow developers.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              When I&apos;m not coding, I enjoy exploring new technologies, contributing to open-source 
              projects, and mentoring junior developers. I&apos;m always excited about taking on new 
              challenges and building solutions that make a real impact.
            </p>

            <div className="pt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
                onClick={() => {
                  const element = document.querySelector('#contact')
                  if (element) element.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Let&apos;s Work Together
              </motion.button>
            </div>
          </motion.div>

          {/* Right side - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="glass rounded-2xl p-6 text-center hover-lift"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-full mb-4">
                  <stat.icon size={24} className="text-white" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About 