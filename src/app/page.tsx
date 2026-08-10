import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Architecture from '@/components/Architecture'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { BackgroundElementsLoader } from '@/components/BackgroundElementsLoader'

export default function Home() {
  return (
    <>
      {/* Breadcrumb and WebSite structured data for the homepage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
              { '@type': 'ListItem', position: 2, name: 'About', item: '/#about' },
              { '@type': 'ListItem', position: 3, name: 'Skills', item: '/#skills' },
              { '@type': 'ListItem', position: 4, name: 'Projects', item: '/#projects' },
              { '@type': 'ListItem', position: 5, name: 'Contact', item: '/#contact' }
            ]
          })
        }}
      />
    <main id="main-content" className="relative min-h-screen overflow-x-hidden">
      <BackgroundElementsLoader />
      <Navigation />
      
      <div className="relative z-10">
        <section id="home">
          <Hero />
        </section>
        
        <section id="about">
          <About />
        </section>
        
        <section id="skills">
          <Skills />
        </section>
        
        <section id="architecture">
          <Architecture />
        </section>
        
        <section id="experience">
          <Experience />
        </section>
        
        <section id="projects">
          <Projects />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
      </div>
      
      <Footer />
    </main>
    </>
  )
}
