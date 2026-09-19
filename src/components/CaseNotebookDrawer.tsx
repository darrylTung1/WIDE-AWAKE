import React, { useState } from 'react';
import { CLUES_DATABASE, ClueItem } from '../data/clues';
import { Briefcase, X, FileText, CheckCircle2, ChevronRight } from 'lucide-react';

interface CaseNotebookDrawerProps {
  collectedClueIds: string[];
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const CaseNotebookDrawer: React.FC<CaseNotebookDrawerProps> = ({
  collectedClueIds,
  isOpen,
  onClose,
  onOpen,
}) => {
  const [selectedClueId, setSelectedClueId] = useState<string | null>(
    collectedClueIds[0] || null
  );

  const collectedClues: ClueItem[] = collectedClueIds
    .map((id) => CLUES_DATABASE[id])
    .filter(Boolean);

  const selectedClue =
    selectedClueId && CLUES_DATABASE[selectedClueId]
      ? CLUES_DATABASE[selectedClueId]
      : collectedClues[0] || null;

  return (
    <>
      {/* Persistent Floating Drawer Trigger Button (Top-Right under Mode Pill) */}
      <button
        id="case-notebook-trigger"
        onClick={onOpen}
        title="Open Case File / Evidence Log"
        className="absolute top-12 right-4 z-40 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a1410]/90 hover:bg-[#11241a] border border-[#203a2c] hover:border-emerald-500 text-xs font-semibold text-emerald-300 backdrop-blur-md shadow-lg transition-all cursor-pointer"
      >
        <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
        <span>Case Evidence</span>
        <span className="px-1.5 py-0.2 rounded-full bg-emerald-950 border border-emerald-600 text-[10px] font-mono text-emerald-300 font-bold">
          {collectedClueIds.length}
        </span>
      </button>

      {/* Modal / Slide-over Case Notebook */}
      {isOpen && (
        <div
          id="case-notebook-modal"
          className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none animate-fadeIn"
          onClick={onClose}
        >
          <div
            className="w-full max-w-3xl max-h-[85%] bg-[#0a1410] border border-[#203a2c] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1b3326] bg-[#070e0b]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-500/60 flex items-center justify-center text-emerald-400">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-wide">
                    CASE DOSSIER // RECOVERED EVIDENCE
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Verified Clues: {collectedClues.length} / {Object.keys(CLUES_DATABASE).length} Items
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#122219] hover:bg-[#1c3829] flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content: 2-column dossier */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Column 1: Evidence List */}
              <div className="w-full md:w-5/12 border-b md:border-b-0 md:border-r border-[#1b3326] overflow-y-auto p-3 space-y-2 bg-[#08110c]">
                {collectedClues.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-500 font-mono">
                    No evidence cataloged yet. Tap glowing search reticles or question suspects to collect clues.
                  </div>
                ) : (
                  collectedClues.map((clue) => {
                    const isSelected = selectedClue?.id === clue.id;
                    return (
                      <button
                        key={clue.id}
                        onClick={() => setSelectedClueId(clue.id)}
                        className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-950/80 border-emerald-500/80 text-white shadow-md'
                            : 'bg-[#0f1d15]/60 hover:bg-[#14281e] border-[#1f3729] text-slate-300'
                        }`}
                      >
                        <div className="pr-2 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#16271e] text-emerald-400 border border-[#234230]">
                              {clue.badgeText || clue.category}
                            </span>
                          </div>
                          <div className="text-xs font-semibold truncate text-slate-200">
                            {clue.name}
                          </div>
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 shrink-0 transition-transform ${
                            isSelected ? 'text-emerald-400 translate-x-0.5' : 'text-slate-500'
                          }`}
                        />
                      </button>
                    );
                  })
                )}
              </div>

              {/* Column 2: Selected Evidence Inspection Pane */}
              <div className="w-full md:w-7/12 p-6 overflow-y-auto bg-[#0a1410] flex flex-col justify-between">
                {selectedClue ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase bg-emerald-950/90 border border-emerald-700/60 px-2 py-0.5 rounded">
                        ORIGIN: {selectedClue.sceneOrigin}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>VERIFIED</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-white tracking-tight">
                        {selectedClue.name}
                      </h4>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        {selectedClue.shortDesc}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#0e1a14] border border-[#1b3626] text-sm text-slate-200 leading-relaxed font-sans">
                      {selectedClue.fullEvidence}
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-xs text-slate-500 font-mono">
                    Select an evidence item on the left to inspect detailed dossier records.
                  </div>
                )}

                <div className="pt-4 border-t border-[#1b3326] flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>NARCOTICS CASE LOG // REF: JUN</span>
                  <button
                    onClick={onClose}
                    className="px-3 py-1.5 rounded-lg bg-[#15251c] hover:bg-[#1e3828] text-slate-300 font-sans text-xs cursor-pointer"
                  >
                    Resume Investigation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
