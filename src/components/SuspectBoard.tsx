import React, { useState, useEffect } from 'react';
import { User, HelpCircle, ShieldAlert, Sparkles } from 'lucide-react';

interface SuspectCard {
  id: 'mum' | 'ravi' | 'aisyah' | 'mystery';
  alias: string;
  trueIdentity: string;
  item: string;
  behaviorHallucination: string;
  behaviorTruth: string;
  imageMonster: string;
  imageHuman: string;
}

const SUSPECTS: SuspectCard[] = [
  {
    id: 'mum',
    alias: 'The Jade One',
    trueIdentity: 'Mum (Mrs. Tan)',
    item: 'Jade Bracelet on wrist',
    behaviorHallucination: 'Weeping specter lurking in doorway with green claw.',
    behaviorTruth: 'Holding a bowl of porridge, exhausted and crying for her son.',
    imageMonster: '/assets/characters/mum_monster.webp',
    imageHuman: '/assets/characters/mum_human.webp',
  },
  {
    id: 'ravi',
    alias: 'The Cap Entity',
    trueIdentity: 'Ravi (Best Friend)',
    item: 'Red Baseball Cap',
    behaviorHallucination: 'Tall silhouette advancing with a hostile glass weapon.',
    behaviorTruth: 'Offering a glass of tap water, terrified of Jun’s aggression.',
    imageMonster: '/assets/characters/ravi_monster.webp',
    imageHuman: '/assets/characters/ravi_human.webp',
  },
  {
    id: 'aisyah',
    alias: 'The Yellow Phantom',
    trueIdentity: 'Aisyah (Colleague)',
    item: 'Yellow Cardigan',
    behaviorHallucination: 'Prowling around the room holding strange surveillance notes.',
    behaviorTruth: 'Holding work contact sheets and emergency numbers, pleading for Jun to get medical help.',
    imageMonster: '/assets/characters/aisyah_monster.webp',
    imageHuman: '/assets/characters/aisyah_human.webp',
  },
  {
    id: 'mystery',
    alias: 'The Fourth Suspect ???',
    trueIdentity: 'Jun (The Intoxicated Mind)',
    item: 'Silver Mirror in Hallway',
    behaviorHallucination: 'The intruder who poisoned the food and barricaded the vents.',
    behaviorTruth: 'Jun himelf in severe methamphetamine-induced psychosis. There is no external intruder.',
    imageMonster: '/assets/characters/jun_monster.webp',
    imageHuman: '/assets/characters/jun_human.webp',
  },
];

interface SuspectBoardProps {
  questioned: ('mum' | 'ravi' | 'aisyah')[];
  shoved: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export const SuspectBoard: React.FC<SuspectBoardProps> = ({
  questioned,
  shoved,
  isOpen,
  onClose,
}) => {
  // Mystery card flickers every 2.5 seconds to show Jun's silhouette
  const [flickerMystery, setFlickerMystery] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setFlickerMystery(true);
      setTimeout(() => setFlickerMystery(false), 700);
    }, 2800);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      id="suspect-board-modal"
      className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none animate-fadeIn"
      onClick={onClose}
    >
      <div
        id="suspect-board-content"
        className="w-full max-w-4xl max-h-[90%] bg-[#08110c] border-2 border-[#1e3b2b] rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Board Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#182f22] bg-[#050c08]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-950/80 border border-amber-500/50 flex items-center justify-center text-amber-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-wider font-mono">
                CRIME SCENE // SUSPECT BOARD
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Cross-referencing entities present in the apartment
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#12241a] hover:bg-[#1b3829] text-xs font-mono text-emerald-300 border border-[#213f2d] transition-colors cursor-pointer"
          >
            Close Board [ESC]
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="flex-1 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-y-auto bg-[#070e0a]">
          {SUSPECTS.map((s) => {
            const isMystery = s.id === 'mystery';
            const isQuestioned =
              s.id === 'mum' || s.id === 'ravi' || s.id === 'aisyah'
                ? questioned.includes(s.id)
                : false;

            return (
              <div
                key={s.id}
                id={`suspect-card-${s.id}`}
                className={`flex flex-col justify-between rounded-xl border p-4 transition-all duration-300 ${
                  isMystery
                    ? flickerMystery
                      ? 'bg-red-950/40 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                      : 'bg-[#0e1a14] border-[#203c2c] hover:border-amber-500/60'
                    : isQuestioned
                    ? 'bg-[#0f2117] border-emerald-500/80 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                    : 'bg-[#0b1610] border-[#182c20]'
                }`}
              >
                <div>
                  {/* Photo area */}
                  <div className="w-full h-36 rounded-lg bg-black/60 border border-[#1b3425] overflow-hidden relative mb-3 flex items-center justify-center">
                    <img
                      src={isMystery ? (flickerMystery ? s.imageHuman : s.imageMonster) : s.imageMonster}
                      alt={s.alias}
                      className={`w-full h-full object-cover object-top transition-opacity duration-300 ${
                        isMystery && flickerMystery ? 'opacity-80 scale-105' : 'opacity-90'
                      }`}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />

                    {/* Badge */}
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 border border-white/20 text-[9px] font-mono text-white">
                      {isMystery ? (flickerMystery ? 'JUN TAN' : 'UNKNOWN ???') : s.alias}
                    </div>

                    {/* Clue status badge */}
                    {isQuestioned && (
                      <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-emerald-950/90 border border-emerald-500 text-[9px] font-mono text-emerald-300 font-bold">
                        TESTIMONY LOGGED
                      </div>
                    )}

                    {isMystery && (
                      <div
                        className={`absolute inset-0 flex items-center justify-center font-mono font-bold text-lg tracking-widest transition-opacity ${
                          flickerMystery ? 'text-red-400 opacity-100' : 'text-slate-500 opacity-40'
                        }`}
                      >
                        {flickerMystery ? 'JUN TAN' : '???'}
                      </div>
                    )}
                  </div>

                  {/* Suspect details */}
                  <div className="space-y-1.5">
                    <div className="text-sm font-bold text-white flex items-center justify-between">
                      <span>{s.alias}</span>
                      {isQuestioned && <span className="text-emerald-400 text-xs">✓</span>}
                    </div>
                    <div className="text-[11px] font-mono text-emerald-400/90">
                      Key Item: {s.item}
                    </div>
                    <div className="text-xs text-slate-300 italic pt-1 leading-relaxed">
                      "{isMystery ? (flickerMystery ? s.behaviorTruth : s.behaviorHallucination) : s.behaviorHallucination}"
                    </div>

                    {s.id === 'ravi' && shoved && (
                      <div className="text-[10px] font-mono text-red-400 bg-red-950/60 p-1.5 rounded border border-red-900/60 mt-1">
                        * Event: Subject struck or shoved during reach.
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#162a1e] mt-3">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                    {isMystery ? 'The Unresolved Intruder' : isQuestioned ? 'Status: Questioned' : 'Status: Unquestioned'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
