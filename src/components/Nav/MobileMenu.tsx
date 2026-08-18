'use client';

interface MobileMenuProps {
  sections: Array<{ id: string; label: string }>;
  activeId: string | null;
  onClose: () => void;
  onNavClick: (id: string) => void;
}

export default function MobileMenu({
  sections,
  activeId,
  onClose,
  onNavClick,
}: MobileMenuProps) {
  const handleLinkClick = (id: string) => {
    onClose();
    onNavClick(id);
  };

  return (
    <div className="fixed inset-0 bg-black z-40 flex flex-col pt-16">
      <nav className="flex flex-col items-center justify-center flex-1 gap-8">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick(section.id);
            }}
            className={
              activeId === section.id
                ? 'font-mono text-2xl uppercase text-red-500 border-b border-red-500 transition-colors py-2'
                : 'font-mono text-2xl uppercase text-white hover:text-red-500 transition-colors py-2'
            }
          >
            {section.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
