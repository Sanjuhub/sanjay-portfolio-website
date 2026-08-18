'use client';

import { useRef, useEffect } from 'react';
import { useTypingAnimation } from '@/hooks/useTypingAnimation';

interface TerminalWidgetProps {
  code: string;
}

export default function TerminalWidget({ code }: TerminalWidgetProps) {
  const { displayText, pause, resume } = useTypingAnimation(code, { pauseMs: 1000 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          resume();
        } else {
          pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [pause, resume]);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-none border border-white/20 overflow-hidden font-mono"
    >
      {/* Terminal header bar */}
      <div className="bg-gray-900 px-4 py-2 flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
        <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
        <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
      </div>

      {/* Terminal body */}
      <div className="bg-black/90 p-4 min-h-[200px] overflow-auto">
        <pre className="font-mono text-sm text-green-400 whitespace-pre-wrap break-words">
          {displayText}
          <span className="animate-blink text-red-500 motion-reduce:animate-none">█</span>
        </pre>
      </div>
    </div>
  );
}
