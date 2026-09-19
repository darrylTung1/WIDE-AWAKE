import React, { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  mode: 'hallucination' | 'clean';
  className?: string;
}

const GLITCH_CHARS = ['#', '%', '&', '§', '▓', '▒', '░', '?', '!', '0', '1', 'ø', '¥', 'Δ', '§', 'Ø'];

export const GlitchText: React.FC<GlitchTextProps> = ({ text, mode, className = '' }) => {
  const [glitchSeed, setGlitchSeed] = useState(0);

  useEffect(() => {
    if (mode !== 'hallucination') return;

    // Cycle glitch characters periodically
    const interval = setInterval(() => {
      setGlitchSeed((prev) => (prev + 1) % 100);
    }, 180);

    return () => clearInterval(interval);
  }, [mode]);

  // If clean mode, render bracketed words normally without brackets
  if (mode === 'clean') {
    const cleanText = text.replace(/\[(.*?)\]/g, '$1');
    return <span className={className}>{cleanText}</span>;
  }

  // If hallucination mode, replace [words] with cycling glitch characters
  const parts: React.ReactNode[] = [];
  const regex = /\[(.*?)\]/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const word = match[1];
    // Generate randomized glitch string matching approximate word length
    const glitchedWord = Array.from(word)
      .map((_, i) => GLITCH_CHARS[(glitchSeed + i * 3) % GLITCH_CHARS.length])
      .join('');

    parts.push(
      <span
        key={`glitch-${match.index}`}
        className="font-mono text-red-400 font-bold bg-red-950/40 px-1 rounded border border-red-800/40 tracking-widest inline-block animate-pulse"
      >
        {glitchedWord}
      </span>
    );

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return <span className={className}>{parts}</span>;
};
