import { Globe, type LucideIcon } from 'lucide-react';
import { SocialLink } from '@/types/portfolio';

interface ContactSectionProps {
  email: string;
  socialLinks: SocialLink[];
  heading: string;
}

/**
 * PLATFORM_ICONS maps known social platform names to their Lucide icons.
 * Note: lucide-react v1.31.0 does not include brand icons (GitHub, LinkedIn, Twitter).
 * Globe is used as the universal fallback per the design spec.
 */
const PLATFORM_ICONS: Record<string, LucideIcon> = {
  GitHub: Globe,
  LinkedIn: Globe,
  Twitter: Globe,
};

export default function ContactSection({ email, socialLinks, heading }: ContactSectionProps) {
  return (
    <div className="py-16">
      <h2 className="font-sans text-3xl font-bold mb-8">{heading}</h2>
      <div className="space-y-4">
        <a
          href={`mailto:${email}`}
          className="hover:text-red-500 transition-colors"
        >
          {email}
        </a>
        {socialLinks.length > 0 && (
          <div className="flex gap-6 mt-4">
            {socialLinks.map((link) => {
              const Icon = PLATFORM_ICONS[link.platform] ?? Globe;
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-red-500 transition-colors"
                >
                  <Icon size={20} />
                  <span>{link.platform}</span>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
