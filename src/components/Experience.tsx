'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, MapPin, Building, TrendingUp } from 'lucide-react'

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const experiences = [
    {
      title: 'Senior Software Engineer',
      company: 'Dianapps Technologies',
      location: 'Gurgaon',
      period: 'May 2022 – Present',
      achievements: [
        'Developed REST and GraphQL APIs in Node.js/NestJS with PostgreSQL (40% faster)',
        'Mentored engineers and led Agile ceremonies to improve delivery',
        'Worked cross-functionally with QA and Product teams'
      ],
      technologies: ['Node.js', 'NestJS', 'PostgreSQL', 'GraphQL', 'REST APIs']
    },
    {
      title: 'Associate Software Engineer',
      company: 'Xorlabs LLC',
      location: 'Greater Noida',
      period: 'Feb 2019 – Apr 2022',
      achievements: [
        'Built and maintained REST APIs with Node.js and MongoDB',
        'Automated CI/CD pipelines, reducing deployment issues by 50%',
        'Coordinated with stakeholders to align technical scope'
      ],
      technologies: ['Node.js', 'MongoDB', 'Express.js', 'CI/CD', 'REST APIs']
    }
  ]

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
            Work <span className="text-gradient-primary">Experience</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            My professional journey building scalable backend systems
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 to-cyan-500 hidden md:block" />

          {/* Experience cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-6 w-4 h-4 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full border-4 border-gray-900" />

                {/* Content card */}
                <div className={`glass rounded-2xl p-8 hover-lift w-full ${index % 2 === 0 ? 'md:ml-20' : 'md:mr-20'}`}>
                  
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                      <div className="flex items-center gap-2 text-cyan-400 mb-2">
                        <Building size={18} />
                        <span className="font-semibold">{exp.company}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <TrendingUp size={20} className="text-green-400" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-3">
                      {exp.achievements.map((achievement, achIndex) => (
                        <motion.li
                          key={achIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.6, delay: 0.5 + index * 0.2 + achIndex * 0.1 }}
                          className="flex items-start gap-3 text-gray-300"
                        >
                          <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                          <span>{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={inView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ duration: 0.5, delay: 0.8 + index * 0.2 + techIndex * 0.05 }}
                          className="px-3 py-1 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 border border-indigo-500/30 rounded-full text-sm text-cyan-300"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Education</h3>
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto hover-lift">
            <div className="text-center">
              <h4 className="text-xl font-bold text-white mb-2">B.Tech in Computer Science</h4>
              <p className="text-cyan-400 font-semibold mb-2">GL Bajaj Group of Institutions</p>
              <p className="text-gray-400">2015 – 2019</p>
            </div>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16"
        >
          <h3 className="text-3xl font-bold text-white mb-8 text-center">Certifications</h3>
          <div className="glass rounded-2xl p-8 max-w-2xl mx-auto hover-lift">
            <div className="text-center">
              <h4 className="text-xl font-bold text-white mb-2">Microservices with Node.js and React</h4>
              <p className="text-cyan-400 font-semibold">Udemy</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience 