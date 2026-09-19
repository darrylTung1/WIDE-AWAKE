import React, { useEffect, useState } from 'react';
import { RotateCcw, HeartHandshake, PhoneCall } from 'lucide-react';

interface EndScreenProps {
  onPlayAgain: () => void;
}

export const EndScreen: React.FC<EndScreenProps> = ({ onPlayAgain }) => {
  const [secondsRemaining, setSecondsRemaining] = useState(20);

  // Auto-return to title after 20 seconds (Spec 4.7 / Scene 9)
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onPlayAgain();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onPlayAgain]);

  return (
    <div
      id="end-screen"
      className="absolute inset-0 z-40 bg-[#060a08]/95 backdrop-blur-md flex flex-col items-center justify-between p-6 md:p-12 text-slate-100 select-none overflow-y-auto"
    >
      <div className="w-full flex justify-end">
        <div className="text-xs font-mono text-emerald-400/70 bg-[#0e1713] px-3 py-1 rounded-full border border-[#1b2d23]">
          Resetting in {secondsRemaining}s
        </div>
      </div>

      <div className="max-w-2xl w-full mx-auto my-auto space-y-6 text-center">
        {/* Main Message */}
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-emerald-950/70 border border-emerald-800 text-emerald-300 mb-2">
            <HeartHandshake className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
            The people Jun saw as monsters were the ones trying to save him.
          </h2>
        </div>

        {/* Fact Sheet Card (CNB 2025 facts strictly according to Section 9) */}
        <div className="bg-[#0b1310] border border-[#21382b] rounded-xl p-5 text-left space-y-3 shadow-lg">
          <p className="text-sm md:text-base text-slate-200 leading-relaxed">
            In 2025, half of new drug abusers arrested in Singapore were under 30. Most had used ice.
          </p>
          <p className="text-xs font-mono text-emerald-400/80">
            Source: CNB Singapore Drug Situation Report 2025
          </p>
        </div>

        {/* NAMS Helpline */}
        <div className="bg-emerald-950/40 border border-emerald-700/60 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-emerald-200">
              Worried about yourself or someone you know?
            </h4>
            <p className="text-base md:text-lg font-bold text-white flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>NAMS Helpline: 6-RECOVER (6732 6837)</span>
            </p>
          </div>
        </div>
      </div>

      {/* Play Again Button (Min 64px tall for kiosks) */}
      <div className="w-full max-w-md mx-auto pt-4">
        <button
          id="play-again-button"
          onClick={onPlayAgain}
          className="w-full h-16 min-h-[64px] rounded-xl bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-600 hover:to-teal-700 active:scale-[0.98] border border-emerald-400/50 shadow-[0_0_30px_rgba(16,185,129,0.25)] text-white text-xl font-bold tracking-wider uppercase transition-all duration-150 flex items-center justify-center gap-3 cursor-pointer"
        >
          <RotateCcw className="w-6 h-6" />
          <span>Play again</span>
        </button>
      </div>
    </div>
  );
};
