'use client'

import { useState, useEffect, useRef, type MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Architecture', href: '#architecture' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' }
]

const shortcutMap: Record<string, string> = {
  '1': '#home',
  '2': '#about',
  '3': '#skills',
  '4': '#architecture',
  '5': '#experience',
  '6': '#projects',
  '7': '#contact'
}

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrollProgress, setScrollProgress] = useState(0)
  const firstMenuItemRef = useRef<HTMLAnchorElement | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(documentHeight > 0 ? (window.scrollY / documentHeight) * 100 : 0)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'))
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0.1 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setIsOpen(false)
      }
    }

    firstMenuItemRef.current?.focus()
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
        const target = shortcutMap[event.key]
        if (!target) return

        const activeElement = document.activeElement
        if (activeElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(activeElement.tagName)) {
          return
        }

        event.preventDefault()
        scrollToSection(target)
      }
    }

    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [])

  const scrollToSection = (href: string, event?: MouseEvent<HTMLAnchorElement>) => {
    event?.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-elevated backdrop-blur-xl border-b border-white/10 shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="relative h-1 bg-white/10 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-cyan-400 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
          aria-hidden="true"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 gap-4">
          <motion.a
            href="#home"
            whileHover={{ scale: 1.03 }}
            className="text-2xl font-bold text-gradient-primary cursor-pointer rounded-md px-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            onClick={(event) => scrollToSection('#home', event)}
            aria-label="Go to home"
          >
            Sanjay Kumar
          </motion.a>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={(event) => scrollToSection(item.href, event)}
                className={`relative text-sm font-medium transition-colors duration-200 px-3 py-2 rounded-full ${
                  activeSection === item.href.slice(1)
                    ? 'bg-white/10 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900`}
                aria-current={activeSection === item.href.slice(1) ? 'page' : undefined}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white transition-colors rounded-md p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass backdrop-blur-lg border-t border-gray-700"
        >
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                ref={index === 0 ? firstMenuItemRef : undefined}
                href={item.href}
                onClick={(event) => scrollToSection(item.href, event)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`block w-full text-left px-4 py-3 rounded-xl transition-colors duration-200 ${
                  activeSection === item.href.slice(1)
                    ? 'bg-cyan-500/10 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900`}
              >
                {item.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navigation
