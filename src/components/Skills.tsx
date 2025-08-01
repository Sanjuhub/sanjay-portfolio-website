'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [activeCategory, setActiveCategory] = useState('languages')

  const skillCategories = {
    languages: {
      title: 'Languages',
      skills: [
        { name: 'JavaScript (ES6+)', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Python', level: 75 },
        { name: 'SQL', level: 90 }
      ]
    },
    frameworks: {
      title: 'Frameworks',
      skills: [
        { name: 'Node.js', level: 95 },
        { name: 'NestJS', level: 90 },
        { name: 'Express.js', level: 85 },
        { name: 'React.js', level: 80 }
      ]
    },
    databases: {
      title: 'Databases',
      skills: [
        { name: 'PostgreSQL', level: 90 },
        { name: 'MongoDB', level: 85 },
        { name: 'Redis', level: 80 },
        { name: 'MySQL', level: 75 }
      ]
    },
    devops: {
      title: 'DevOps & Cloud',
      skills: [
        { name: 'AWS (EC2, Lambda, S3, RDS)', level: 85 },
        { name: 'Docker', level: 80 },
        { name: 'GitHub Actions', level: 85 },
        { name: 'CI/CD', level: 80 }
      ]
    }
  }

  const categories = Object.keys(skillCategories)

  return (
    <section ref={ref} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Technical <span className="text-gradient-primary">Skills</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Technologies and tools I use to build robust, scalable applications
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg'
                  : 'glass text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              {skillCategories[category as keyof typeof skillCategories].title}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {skillCategories[activeCategory as keyof typeof skillCategories].skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass rounded-xl p-6 hover-lift"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                <span className="text-cyan-400 font-bold">{skill.level}%</span>
              </div>
              
              <div className="skill-bar h-3 mb-2">
                <motion.div
                  className="skill-progress h-full"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                />
              </div>
              
              <div className="flex justify-between text-sm text-gray-400">
                <span>Beginner</span>
                <span>Expert</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Other Proficiencies</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'RESTful APIs', 'GraphQL', 'Microservices', 'System Design',
              'Performance Optimization', 'Code Review', 'Agile/Scrum',
              'Team Leadership', 'CI/CD', 'Testing (Jest, Supertest)',
              'API Documentation', 'Database Optimization'
            ].map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1 + index * 0.05 }}
                className="px-4 py-2 glass rounded-full text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-300"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills 