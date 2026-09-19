import React from 'react';
import { Hotspot, CLUES_DATABASE } from '../data/clues';
import { CheckCircle2, ChevronRight } from 'lucide-react';

interface InspectionModalProps {
  hotspot: Hotspot;
  currentLineIndex: number;
  onAdvance: () => void;
  onClose: () => void;
}

export const InspectionModal: React.FC<InspectionModalProps> = ({
  hotspot,
  currentLineIndex,
  onAdvance,
  onClose,
}) => {
  const line = hotspot.examineLines[currentLineIndex] || hotspot.examineLines[0];
  const isLastLine = currentLineIndex >= hotspot.examineLines.length - 1;
  const clue = CLUES_DATABASE[hotspot.clueId];

  return (
    <div
      id="inspection-modal-overlay"
      className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex flex-col justify-end p-4 md:p-6 select-none animate-fadeIn cursor-pointer"
      onClick={isLastLine ? onClose : onAdvance}
    >
      <div
        id="inspection-dialogue-panel"
        className="w-full max-h-[45%] rounded-2xl bg-[#09120e]/95 border-2 border-emerald-500/70 shadow-[0_0_40px_rgba(16,185,129,0.2)] p-6 flex flex-col justify-between"
        onClick={(e) => {
          e.stopPropagation();
          if (isLastLine) {
            onClose();
          } else {
            onAdvance();
          }
        }}
      >
        {/* Header with Clue Badge */}
        <div className="flex items-center justify-between border-b border-[#182d22] pb-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-amber-950/80 border border-amber-500/80 text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider">
              INSPECTING OBJECT
            </span>
            <span className="text-sm font-bold text-white tracking-wide">
              {hotspot.name}
            </span>
          </div>

          {clue && (
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-800/80 px-2 py-0.5 rounded">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>RECORDED IN CASEFILE</span>
            </div>
          )}
        </div>

        {/* Dialogue Text */}
        <div className="py-3 flex-1 flex items-center">
          <p className="text-lg md:text-xl text-emerald-100 font-medium leading-relaxed">
            {line.text}
          </p>
        </div>

        {/* Footer info & touch target */}
        <div className="flex items-center justify-between pt-2 border-t border-[#182d22] text-xs font-mono text-slate-400">
          <span>{hotspot.hint}</span>
          <div className="flex items-center gap-1 text-emerald-400 font-bold text-sm animate-pulse">
            <span>{isLastLine ? 'CLOSE EVIDENCE' : 'NEXT'}</span>
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </div>
        </div>
      </div>
    </div>
  );
};
