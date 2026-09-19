import React, { useState } from 'react';
import { RotateCw, CheckCircle2, ArrowRight } from 'lucide-react';

interface FlipCardItem {
  id: string;
  title: string;
  frontHallucination: {
    title: string;
    image: string;
    description: string;
    tag: string;
  };
  backTruth: {
    title: string;
    image: string;
    description: string;
    tag: string;
  };
}

const CASE_FLIP_CARDS: FlipCardItem[] = [
  {
    id: 'mum',
    title: 'The Jade Bracelet',
    frontHallucination: {
      title: 'The Weeping Specter',
      image: '/assets/characters/mum_monster.webp',
      description: 'A shadowy predator pacing outside the bedroom with a glowing green wrist claw.',
      tag: 'HALLUCINATION',
    },
    backTruth: {
      title: 'Mum (Mrs. Tan)',
      image: '/assets/characters/mum_human.webp',
      description: 'Standing with a warm bowl of porridge, weeping after hearing her son scream inside.',
      tag: 'FORENSIC REALITY',
    },
  },
  {
    id: 'ravi',
    title: 'The Red Cap',
    frontHallucination: {
      title: 'The Approaching Stalker',
      image: '/assets/characters/ravi_monster.webp',
      description: 'Looming tall with a raised weapon, advancing aggressively into Jun’s personal space.',
      tag: 'HALLUCINATION',
    },
    backTruth: {
      title: 'Ravi (Best Friend)',
      image: '/assets/characters/ravi_human.webp',
      description: 'Holding a glass of cool water, reaching out to steady Jun as he staggered with hyperthermia.',
      tag: 'FORENSIC REALITY',
    },
  },
  {
    id: 'aisyah',
    title: 'The Yellow Cardigan',
    frontHallucination: {
      title: 'The Surveillance Agent',
      image: '/assets/characters/aisyah_monster.webp',
      description: 'Circling the furniture, whispering coded accusations and taking forensic notes.',
      tag: 'HALLUCINATION',
    },
    backTruth: {
      title: 'Aisyah (Colleague)',
      image: '/assets/characters/aisyah_human.webp',
      description: 'Holding an emergency contact booklet, desperately pleading for Jun to seek medical attention.',
      tag: 'FORENSIC REALITY',
    },
  },
  {
    id: 'door',
    title: 'The Barricaded Door',
    frontHallucination: {
      title: 'The Sealed Vault',
      image: '/assets/backgrounds/bg_bedroom.webp',
      description: 'Reinforced deadbolts keeping out syndicate assassins waiting outside.',
      tag: 'HALLUCINATION',
    },
    backTruth: {
      title: 'Self-Imposed Isolation',
      image: '/assets/backgrounds/bg_bedroom.webp',
      description: 'Sealed with heavy duct tape from inside by Jun during a 90-hour meth psychosis episode.',
      tag: 'FORENSIC REALITY',
    },
  },
];

interface CaseFileScreenProps {
  onContinue: () => void;
}

export const CaseFileScreen: React.FC<CaseFileScreenProps> = ({ onContinue }) => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const flippedCount = Object.values(flippedCards).filter(Boolean).length;
  const allFlipped = flippedCount >= CASE_FLIP_CARDS.length;

  return (
    <div
      id="case-file-screen"
      className="absolute inset-0 z-40 bg-[#060e0a]/95 backdrop-blur-md flex flex-col p-4 md:p-8 select-none animate-fadeIn overflow-y-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#1b3628] pb-4 mb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-wider font-mono">
            CASE DOSSIER: TRUTH REVEAL
          </h2>
          <p className="text-xs md:text-sm text-slate-300 font-mono">
            Tap cards to flip from methamphetamine hallucination to forensic reality ({flippedCount}/{CASE_FLIP_CARDS.length} revealed)
          </p>
        </div>

        {allFlipped && (
          <button
            onClick={onContinue}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(16,185,129,0.5)] border border-emerald-400 cursor-pointer animate-bounce transition-all"
          >
            <span>Proceed to Flashback</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 4 Flip Cards Grid */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        {CASE_FLIP_CARDS.map((card) => {
          const isFlipped = !!flippedCards[card.id];

          return (
            <div
              key={card.id}
              onClick={() => toggleFlip(card.id)}
              className="h-96 perspective-1000 cursor-pointer group"
            >
              <div
                className={`w-full h-full relative transform-style-3d transition-transform duration-700 ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* FRONT: Hallucination */}
                <div className="absolute inset-0 backface-hidden rounded-2xl bg-[#091510] border-2 border-red-900/60 p-4 flex flex-col justify-between shadow-xl group-hover:border-red-500/80 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800 font-bold">
                        {card.frontHallucination.tag}
                      </span>
                      <RotateCw className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform duration-500" />
                    </div>

                    <div className="w-full h-40 rounded-lg bg-black/60 border border-red-950 overflow-hidden mb-3">
                      <img
                        src={card.frontHallucination.image}
                        alt={card.frontHallucination.title}
                        className="w-full h-full object-cover object-top filter saturate-50"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>

                    <h4 className="text-sm font-bold text-red-200 font-mono mb-1">
                      {card.frontHallucination.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {card.frontHallucination.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-red-950 text-center">
                    <span className="text-[10px] font-mono text-red-400 font-semibold tracking-wider animate-pulse">
                      [TAP TO REVEAL TRUTH]
                    </span>
                  </div>
                </div>

                {/* BACK: Forensic Reality */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl bg-[#091c13] border-2 border-emerald-500 p-4 flex flex-col justify-between shadow-[0_0_25px_rgba(16,185,129,0.25)]">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-600 font-bold">
                        {card.backTruth.tag}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>

                    <div className="w-full h-40 rounded-lg bg-black/60 border border-emerald-900 overflow-hidden mb-3">
                      <img
                        src={card.backTruth.image}
                        alt={card.backTruth.title}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>

                    <h4 className="text-sm font-bold text-emerald-200 font-mono mb-1">
                      {card.backTruth.title}
                    </h4>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {card.backTruth.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-emerald-900 text-center">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-wider">
                      ✓ REALITY VERIFIED
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Helper */}
      {!allFlipped && (
        <div className="mt-4 text-center text-xs font-mono text-slate-400">
          Flip all 4 case files to uncover what truly happened that night.
        </div>
      )}
    </div>
  );
};
