import React, { useState, useEffect } from 'react';
import { CLUES_DATABASE } from '../data/clues';
import { CheckCircle2, AlertCircle, HelpCircle, ShieldCheck, ArrowRight } from 'lucide-react';

export interface DeductionStep {
  id: number;
  question: string;
  subPrompt: string;
  requiredClueCount: number;
  validClueIds: string[];
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    requiredClues: string[];
  }[];
  hint: string;
}

export const DEDUCTION_QUESTIONS: DeductionStep[] = [
  {
    id: 1,
    question: 'QUESTION 1: WHAT IS THE THREAT IN THE APARTMENT?',
    subPrompt: 'Select 2 pieces of physical or testimony evidence to support your deduction.',
    requiredClueCount: 2,
    validClueIds: ['c_paranoia', 'c_supplies', 'c_phone', 't_mum', 't_ravi'],
    options: [
      {
        id: 'opt_intruder',
        text: 'A coordinated home invasion by unknown syndicate intruders.',
        isCorrect: false,
        requiredClues: ['c_paranoia'],
      },
      {
        id: 'opt_toxic',
        text: 'No external intruder exists. The barricades were built from the inside during acute substance-induced paranoia.',
        isCorrect: true,
        requiredClues: ['c_paranoia', 'c_supplies'],
      },
      {
        id: 'opt_robbery',
        text: 'An opportunistic burglary targeting valuable family heirlooms.',
        isCorrect: false,
        requiredClues: ['c_phone'],
      },
    ],
    hint: 'Hint: Look at the fortified bedroom door. Who turned the deadbolt from inside? What did the crushed bottles and burnt foil on the carpet smell like?',
  },
  {
    id: 2,
    question: 'QUESTION 2: WHAT IS HAPPENING TO JUN’S BODY AND MIND?',
    subPrompt: 'Select 3 pieces of mirror and event evidence that prove Jun’s physiological condition.',
    requiredClueCount: 3,
    validClueIds: ['m_eyes', 'm_jaw', 'm_hands', 'c_shove'],
    options: [
      {
        id: 'opt_flu',
        text: 'A severe seasonal influenza infection causing fever and confusion.',
        isCorrect: false,
        requiredClues: ['m_hands'],
      },
      {
        id: 'opt_curse',
        text: 'A supernatural hallucination caused by sleep paralysis.',
        isCorrect: false,
        requiredClues: ['m_eyes'],
      },
      {
        id: 'opt_meth_psychosis',
        text: 'Severe Methamphetamine-induced psychosis: profound bruxism, dilated pupils, 90+ hours without sleep, autonomic tremors, and violent paranoia.',
        isCorrect: true,
        requiredClues: ['m_eyes', 'm_jaw', 'm_hands'],
      },
    ],
    hint: 'Hint: Remember the hallway mirror reflection: black saucer pupils, teeth clenching until molars ache, and trembling hands holding the counter.',
  },
];

interface DeductionBoardProps {
  collectedClueIds: string[];
  onCompleteDeduction: () => void;
}

export const DeductionBoard: React.FC<DeductionBoardProps> = ({
  collectedClueIds,
  onCompleteDeduction,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [selectedClueIds, setSelectedClueIds] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [idleTimer, setIdleTimer] = useState(0);

  const step = DEDUCTION_QUESTIONS[currentStepIndex];

  // 30s auto-highlight hint timer
  useEffect(() => {
    const timer = setInterval(() => {
      setIdleTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [currentStepIndex]);

  const toggleSelectClue = (clueId: string) => {
    setErrorMessage(null);
    setIdleTimer(0);
    setSelectedClueIds((prev) => {
      if (prev.includes(clueId)) {
        return prev.filter((id) => id !== clueId);
      }
      if (prev.length >= step.requiredClueCount) {
        return [...prev.slice(1), clueId];
      }
      return [...prev, clueId];
    });
  };

  const handleSelectOption = (optId: string) => {
    setSelectedOptionId(optId);
    setErrorMessage(null);
    setIdleTimer(0);
  };

  const handleVerifyAnswer = () => {
    if (!selectedOptionId) {
      setErrorMessage('Please select a hypothesis to verify.');
      return;
    }

    if (selectedClueIds.length < step.requiredClueCount) {
      setErrorMessage(
        `Select exactly ${step.requiredClueCount} supporting pieces of evidence before submitting.`
      );
      return;
    }

    const option = step.options.find((o) => o.id === selectedOptionId);
    if (!option) return;

    if (!option.isCorrect) {
      setErrorMessage('Hypothesis rejected: The physical evidence contradicts this conclusion.');
      return;
    }

    // Verify selected clues match the core evidence
    const hasValidClues = option.requiredClues.every((c) => selectedClueIds.includes(c));
    if (!hasValidClues) {
      setErrorMessage('The hypothesis is right, but your supporting evidence does not sufficiently prove it.');
      return;
    }

    // Correct!
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setSelectedOptionId(null);
      setSelectedClueIds([]);
      setErrorMessage(null);
      setIdleTimer(0);

      if (currentStepIndex < DEDUCTION_QUESTIONS.length - 1) {
        setCurrentStepIndex((prev) => prev + 1);
      } else {
        onCompleteDeduction();
      }
    }, 1200);
  };

  return (
    <div
      id="deduction-board"
      className="absolute inset-0 z-40 bg-[#060c09]/95 backdrop-blur-md flex flex-col p-4 md:p-8 select-none animate-fadeIn overflow-y-auto"
    >
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#1b3628] pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/60 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-white tracking-wide font-mono">
              ACT 4: FORENSIC DEDUCTION ENGINE
            </h2>
            <p className="text-xs text-emerald-400/80 font-mono">
              Step {currentStepIndex + 1} of {DEDUCTION_QUESTIONS.length} // Correlating Crime Scene Findings
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {DEDUCTION_QUESTIONS.map((q, idx) => (
            <div
              key={q.id}
              className={`w-3 h-3 rounded-full ${
                idx < currentStepIndex
                  ? 'bg-emerald-500'
                  : idx === currentStepIndex
                  ? 'bg-amber-400 animate-pulse'
                  : 'bg-[#1b3628]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Deduction Stage */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Question & Hypotheses (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-4 rounded-xl bg-[#09140f] border border-[#1e3d2c]">
            <h3 className="text-base md:text-lg font-bold text-white mb-1 font-mono">
              {step.question}
            </h3>
            <p className="text-xs md:text-sm text-slate-300">
              {step.subPrompt}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase text-slate-400 font-semibold tracking-wider">
              Select Hypothesis:
            </span>
            {step.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              const isHighlighted = idleTimer >= 30 && opt.isCorrect;

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-950/90 border-emerald-400 text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-[1.01]'
                      : isHighlighted
                      ? 'bg-amber-950/50 border-amber-400 text-amber-200 animate-pulse'
                      : 'bg-[#091510] hover:bg-[#0f2119] border-[#1c3929] text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected
                          ? 'border-emerald-400 bg-emerald-500 text-black'
                          : 'border-slate-500'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span className="text-sm font-medium leading-relaxed">
                      {opt.text}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Error / Success Feedback */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-950/70 border border-red-700/80 text-red-200 text-xs flex items-center gap-2 font-mono animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {isSuccess && (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-xs flex items-center gap-2 font-mono animate-bounce">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Deduction verified! Evidence matches forensic reality.</span>
            </div>
          )}

          {/* 30s Idle Hint Banner */}
          {idleTimer >= 30 && (
            <div className="p-3 rounded-xl bg-amber-950/70 border border-amber-500/80 text-amber-200 text-xs flex items-center gap-2 font-mono">
              <HelpCircle className="w-4 h-4 shrink-0 text-amber-400" />
              <span>{step.hint}</span>
            </div>
          )}
        </div>

        {/* Right Column: Evidence Selector (5 cols) */}
        <div className="lg:col-span-5 bg-[#08120d] border border-[#1b3628] rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-slate-300 font-bold tracking-wider">
              Attach Supporting Evidence:
            </span>
            <span className="text-xs font-mono text-emerald-400">
              {selectedClueIds.length} / {step.requiredClueCount} Attached
            </span>
          </div>

          <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
            {collectedClueIds.length === 0 ? (
              <div className="text-xs text-slate-500 font-mono p-4 text-center">
                No clues collected in casefile yet.
              </div>
            ) : (
              collectedClueIds.map((cId) => {
                const clue = CLUES_DATABASE[cId];
                if (!clue) return null;
                const isSelected = selectedClueIds.includes(cId);

                return (
                  <button
                    key={cId}
                    onClick={() => toggleSelectClue(cId)}
                    className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-start justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-950/90 border-emerald-400 text-white shadow-md'
                        : 'bg-[#0e1c15] hover:bg-[#14281e] border-[#1d3728] text-slate-300'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="text-[9px] font-mono text-emerald-400 uppercase tracking-wider font-bold">
                        {clue.badgeText || clue.category}
                      </div>
                      <div className="text-xs font-semibold truncate text-slate-100">
                        {clue.name}
                      </div>
                    </div>
                    <div
                      className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-1 ${
                        isSelected
                          ? 'border-emerald-400 bg-emerald-500 text-black'
                          : 'border-slate-500'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          <button
            onClick={handleVerifyAnswer}
            className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-600 active:scale-98 text-white font-bold text-sm tracking-wider shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all border border-emerald-400"
          >
            <span>SUBMIT DEDUCTION</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
