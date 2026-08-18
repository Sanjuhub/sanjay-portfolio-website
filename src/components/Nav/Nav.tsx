'use client';

import { useState } from 'react';
import { Terminal, Menu, X } from 'lucide-react';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import MobileMenu from './MobileMenu';

interface NavProps {
  ownerName: string;
  cvUrl: string;
  sections: Array<{ id: string; label: string }>;
}

export default function Nav({ ownerName, cvUrl, sections }: NavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeId = useScrollSpy(sections.map((s) => s.id), 64);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 64;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-black border-b border-white/10">
        <div className="max-w-content mx-auto px-6 h-16 flex items-center justify-between">
          {/* Owner name */}
          <span className="font-mono text-red-500">{ownerName}</span>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(section.id);
                }}
                className={
                  activeId === section.id
                    ? 'font-mono text-xs uppercase text-red-500 border-b border-red-500 transition-colors'
                    : 'font-mono text-xs uppercase text-white hover:text-red-500 transition-colors'
                }
              >
                {section.label}
              </a>
            ))}

            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center font-mono text-xs uppercase text-white hover:text-red-500 transition-colors border border-white/40 hover:border-red-500 px-3 py-1"
            >
              <Terminal className="w-4 h-4 mr-2" />
              Resume
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white hover:text-red-500 transition-colors"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <MobileMenu
          sections={sections}
          activeId={activeId}
          onClose={() => setIsMenuOpen(false)}
          onNavClick={handleNavClick}
        />
      )}
    </>
  );
}
