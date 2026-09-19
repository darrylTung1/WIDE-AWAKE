import React from 'react';
import { ChevronRight } from 'lucide-react';
import { GlitchText } from './GlitchText';

interface DialogueBoxProps {
  speaker: string;
  text: string;
  mode?: 'hallucination' | 'clean';
  onAdvance?: () => void;
  canAdvance?: boolean;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  speaker,
  text,
  mode = 'hallucination',
  onAdvance,
  canAdvance = true,
}) => {
  const isNarration = speaker === '(N)' || speaker === '' || speaker === 'Narration';

  return (
    <div
      id="dialogue-box-container"
      onClick={onAdvance}
      className="absolute bottom-0 left-0 right-0 h-[25%] z-30 flex flex-col justify-end p-4 md:p-6 cursor-pointer group"
    >
      <div
        id="dialogue-panel"
        className="w-full h-full rounded-xl bg-[#09100d]/90 border border-[#1e3027]/80 backdrop-blur-md px-6 py-4 flex flex-col justify-between shadow-2xl relative transition-colors duration-150 hover:border-[#2f4f3e]"
      >
        {/* Speaker Name Tag */}
        {!isNarration && (
          <div className="flex items-center gap-2">
            <span
              id="speaker-label"
              className="inline-block px-3 py-1 bg-[#14231c] text-[#86efac] border border-[#274636] rounded-md text-sm md:text-base font-semibold tracking-wider uppercase"
            >
              {speaker}
            </span>
          </div>
        )}

        {/* Dialogue Text (Readable from 1.5m away: scaled font) */}
        <div className="flex-1 flex items-center mt-1 pr-12">
          <p
            id="dialogue-text"
            className={`text-slate-100 font-medium leading-relaxed tracking-wide ${
              isNarration
                ? 'italic text-emerald-200/90 text-lg md:text-2xl'
                : 'text-lg md:text-2xl text-slate-100'
            }`}
          >
            <GlitchText text={text} mode={mode} />
          </p>
        </div>

        {/* Tap to advance prompt (min 44-64px touch target) */}
        {canAdvance && (
          <div className="absolute right-4 bottom-4 flex items-center gap-1.5 text-emerald-400/80 text-xs md:text-sm font-semibold tracking-wide animate-pulse">
            <span>TAP TO CONTINUE</span>
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </div>
        )}
      </div>
    </div>
  );
};
