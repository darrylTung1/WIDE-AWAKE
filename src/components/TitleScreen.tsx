import React from 'react';

interface TitleScreenProps {
  onStart: () => void;
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  onStart,
  title = 'WIDE AWAKE',
  subtitle = 'Something is wrong with this house.',
  buttonText = 'Tap to wake up',
}) => {
  return (
    <div
      id="title-screen"
      className="absolute inset-0 z-30 flex flex-col items-center justify-between p-8 md:p-12 text-center select-none"
    >
      {/* Top Header / Timestamp */}
      <div className="pt-6 animate-pulse">
        <span className="font-mono-glitch text-emerald-400/90 text-sm md:text-base tracking-widest uppercase bg-[#08120d]/80 px-4 py-1.5 rounded-full border border-[#1b3427]">
          04:12 AM • HDB FLAT • BEDROOM
        </span>
      </div>

      {/* Main Title Typography */}
      <div className="max-w-2xl mx-auto space-y-4 my-auto">
        <h1
          id="title-heading"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)] uppercase font-mono-glitch"
        >
          {title}
        </h1>
        <p
          id="title-subtitle"
          className="text-lg sm:text-xl md:text-2xl text-emerald-200/90 font-medium tracking-wide italic max-w-xl mx-auto drop-shadow-md"
        >
          {subtitle}
        </p>
      </div>

      {/* Primary Action Button (Target >= 64px tall for kiosks) */}
      <div className="pb-8 w-full max-w-md mx-auto">
        <button
          id="start-button"
          onClick={onStart}
          className="w-full h-16 min-h-[64px] rounded-xl bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-600 hover:to-teal-700 active:scale-[0.98] border border-emerald-400/50 shadow-[0_0_30px_rgba(16,185,129,0.3)] text-white text-xl md:text-2xl font-bold tracking-wider uppercase transition-all duration-200 flex items-center justify-center cursor-pointer"
        >
          {buttonText}
        </button>
        <p className="text-xs text-emerald-300/60 mt-3 font-mono">
          [Tap anywhere on screen to advance dialogue]
        </p>
      </div>
    </div>
  );
};
