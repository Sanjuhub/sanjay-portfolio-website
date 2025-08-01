'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Database, Cloud, Cpu } from 'lucide-react'

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const projects = [
    {
      title: 'Hirenetix',
      description: 'Built a multi-tenant backend architecture for AI-powered job posting, candidate screening and scoring platform.',
      achievements: [
        'Reduced API latency by 40% through query optimization and caching',
        'Built job scoring algorithms using DeepSeek API, enhancing job-candidate match quality by 30%',
        'Implemented multi-tenant architecture for scalable SaaS solution'
      ],
      technologies: ['NestJS', 'PostgreSQL', 'DeepSeek API', 'AWS Textract', 'Redis', 'Multi-tenant'],
      icon: <Cpu className="w-6 h-6" />,
      link: 'https://hirenetix.com',
      github: null, // Private project
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Thousand Greens',
      description: 'Migrated platform to GraphQL backend and created comprehensive notification system.',
      achievements: [
        'Migrated to GraphQL backend, cutting API calls by 60%',
        'Created a notification system, increasing user engagement by 25%',
        'Improved overall platform performance, resulting in 25% boost in daily active usage'
      ],
      technologies: ['Next.js', 'GraphQL', 'PostgreSQL', 'Node.js', 'WebSockets', 'React'],
      icon: <Database className="w-6 h-6" />,
      link: 'https://thousandgreens.com',
      github: null, // Private project
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Scalable API Framework',
      description: 'Designed and implemented a reusable API framework with built-in authentication, rate limiting, and monitoring.',
      achievements: [
        'Created modular architecture reducing development time by 50%',
        'Implemented comprehensive logging and monitoring system',
        'Built automated testing suite with 95% code coverage'
      ],
      technologies: ['Node.js', 'Express.js', 'JWT', 'Redis', 'Docker', 'Jest', 'Prometheus'],
      icon: <Cloud className="w-6 h-6" />,
      link: null,
      github: 'https://github.com/findmesektor',
      color: 'from-blue-500 to-cyan-500'
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
            Featured <span className="text-gradient-primary">Projects</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Showcase of my recent work building scalable backend systems and APIs
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="glass rounded-2xl overflow-hidden hover-lift group"
            >
              
              {/* Project Header */}
              <div className={`p-6 bg-gradient-to-r ${project.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                      {project.icon}
                    </div>
                    <div className="flex gap-3">
                      {project.github && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                        >
                          <Github size={20} />
                        </motion.a>
                      )}
                      {project.link && (
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                        >
                          <ExternalLink size={20} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-white/90">{project.description}</p>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                
                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Key Achievements</h4>
                  <ul className="space-y-3">
                    {project.achievements.map((achievement, achIndex) => (
                      <motion.li
                        key={achIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.5 + index * 0.2 + achIndex * 0.1 }}
                        className="flex items-start gap-3 text-gray-300 text-sm"
                      >
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.8 + index * 0.2 + techIndex * 0.05 }}
                        className="px-3 py-1 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 border border-indigo-500/30 rounded-full text-xs text-cyan-300"
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

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-xl text-gray-400 mb-8">
            Want to see more of my work or discuss a project?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="https://github.com/findmesektor"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Github size={20} />
              View GitHub
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                const element = document.querySelector('#contact')
                if (element) element.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-8 py-3 border-2 border-indigo-500 text-indigo-400 rounded-full font-semibold hover:bg-indigo-500 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25"
            >
              Get In Touch
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects 