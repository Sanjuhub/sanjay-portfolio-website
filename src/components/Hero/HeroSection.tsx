import { HeroData } from '@/types/portfolio';
import TerminalWidget from './TerminalWidget';

interface HeroSectionProps {
  data: HeroData;
  cvUrl: string;
}

export default function HeroSection({ data, cvUrl }: HeroSectionProps) {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-16">
      {/* Left column: text content */}
      <div>
        <p className="font-mono uppercase text-xs text-white/60 mb-4">
          SENIOR SOFTWARE ENGINEER
        </p>

        <h1 className="text-5xl font-bold mb-6 leading-tight">
          {data.headline.map((word, i) => (
            <span key={i}>
              {word === data.accentWord ? (
                <span className="text-red-500">{word}</span>
              ) : (
                <span className="text-white">{word}</span>
              )}
              {i < data.headline.length - 1 ? ' ' : ''}
            </span>
          ))}
        </h1>

        <p className="text-white/80 max-w-xl mb-6">
          {data.bio.slice(0, 300)}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {data.techStack.map((tech) => (
            <span
              key={tech}
              className="border border-white text-white uppercase font-mono text-xs px-3 py-1 rounded-none"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          <a
            href="#projects"
            className="bg-red-500 text-white px-6 py-3 font-mono text-xs uppercase rounded-none clip-chamfer-lg lg:clip-chamfer-lg inline-block"
          >
            VIEW PROJECTS →
          </a>
          <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white bg-transparent text-white px-6 py-3 font-mono text-xs uppercase rounded-none clip-chamfer-lg lg:clip-chamfer-lg inline-block"
          >
            DOWNLOAD CV
          </a>
        </div>

        {/* TerminalWidget below text on small screens */}
        <div className="mt-10 lg:hidden">
          <TerminalWidget code={data.terminalCode} />
        </div>
      </div>

      {/* Right column: TerminalWidget at lg+ only */}
      <div className="hidden lg:block">
        <TerminalWidget code={data.terminalCode} />
      </div>
    </div>
  );
}
