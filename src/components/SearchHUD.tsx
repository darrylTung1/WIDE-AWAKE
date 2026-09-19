import React from 'react';
import { CLUES_DATABASE } from '../data/clues';
import { Sparkles, ArrowRight } from 'lucide-react';

interface SearchHUDProps {
  sceneTitle: string;
  foundClues: string[];
  totalClues: number;
  onProceed?: () => void;
  canProceed: boolean;
  proceedLabel?: string;
}

export const SearchHUD: React.FC<SearchHUDProps> = ({
  sceneTitle,
  foundClues,
  totalClues,
  onProceed,
  canProceed,
  proceedLabel = 'Proceed to next scene',
}) => {
  return (
    <div
      id="search-hud"
      className="absolute top-3 left-4 right-4 z-40 pointer-events-none flex items-center justify-between"
    >
      {/* Left: Clues Discovered Counter & Category tags */}
      <div className="pointer-events-auto flex items-center gap-3 bg-[#0a1410]/90 border border-[#203a2c] rounded-xl px-4 py-2 backdrop-blur-md shadow-xl">
        <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            {sceneTitle}
          </div>
          <div className="text-xs font-bold text-white flex items-center gap-2">
            <span>Evidence Discovered:</span>
            <span className="font-mono text-emerald-400 text-sm">
              {foundClues.length} / {totalClues}
            </span>
          </div>
        </div>

        {/* Small icons/indicators for each discovered item */}
        <div className="hidden sm:flex items-center gap-1.5 pl-2 border-l border-[#192b21]">
          {foundClues.map((cId) => {
            const clue = CLUES_DATABASE[cId];
            return (
              <span
                key={cId}
                title={clue?.name || cId}
                className="px-2 py-0.5 rounded bg-emerald-900/60 border border-emerald-600/70 text-[10px] font-mono text-emerald-300 font-semibold"
              >
                {clue?.badgeText || 'CLUE'}
              </span>
            );
          })}
        </div>
      </div>

      {/* Right: Proceed Button when all clues in this scene are discovered */}
      {canProceed && onProceed && (
        <div className="pointer-events-auto animate-bounce">
          <button
            onClick={onProceed}
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 active:scale-95 text-white font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.5)] border border-emerald-400 cursor-pointer transition-all"
          >
            <span>{proceedLabel}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
