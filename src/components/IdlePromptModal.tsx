import React, { useEffect, useState } from 'react';
import { AlertTriangle, Play, RotateCcw } from 'lucide-react';

interface IdlePromptModalProps {
  onContinue: () => void;
  onReset: () => void;
  countdownSeconds?: number;
}

export const IdlePromptModal: React.FC<IdlePromptModalProps> = ({
  onContinue,
  onReset,
  countdownSeconds = 15,
}) => {
  const [remaining, setRemaining] = useState(countdownSeconds);

  useEffect(() => {
    if (remaining <= 0) {
      onReset();
      return;
    }

    const timer = setInterval(() => {
      setRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [remaining, onReset]);

  return (
    <div
      id="idle-prompt-overlay"
      className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6 select-none animate-fadeIn"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        id="idle-prompt-card"
        className="w-full max-w-md bg-[#0a1410] border-2 border-amber-500/60 rounded-2xl p-6 md:p-8 text-center shadow-[0_0_50px_rgba(245,158,11,0.25)] space-y-6"
      >
        <div className="mx-auto w-16 h-16 rounded-full bg-amber-950/80 border border-amber-500/70 flex items-center justify-center text-amber-400 animate-pulse">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Are you still playing?
          </h3>
          <p className="text-sm md:text-base text-slate-300">
            No activity detected for 60 seconds. The game will automatically return to the title screen in:
          </p>
          <div className="text-3xl font-mono font-bold text-amber-400 py-1">
            {remaining}s
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <button
            id="idle-continue-btn"
            onClick={onContinue}
            className="w-full min-h-[60px] py-3.5 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-600 active:scale-[0.98] border border-emerald-400 text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>I'm still here (Continue)</span>
          </button>

          <button
            id="idle-reset-btn"
            onClick={onReset}
            className="w-full min-h-[48px] py-2.5 px-4 rounded-xl bg-[#14221b] hover:bg-[#1b3026] active:scale-[0.98] border border-[#274635] text-slate-300 hover:text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
