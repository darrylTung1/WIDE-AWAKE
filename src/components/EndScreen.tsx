import React, { useState } from 'react';
import {
  RotateCcw,
  Heart,
  HelpCircle,
  ExternalLink,
  Phone,
  Shield,
  ChevronDown,
  ChevronUp,
  Info,
  CheckCircle2,
  AlertCircle,
  FileQuestion,
} from 'lucide-react';

interface EndScreenProps {
  steppedBack: boolean;
  onRestart: () => void;
  reduceMotion?: boolean;
}

interface ReflectionOption {
  id: string;
  label: string;
  feedback: string;
  isRecommended: boolean;
}

const REFLECTION_OPTIONS: ReflectionOption[] = [
  {
    id: 'support_professional',
    label: 'Support them to connect with professional help or a trusted adult.',
    feedback:
      'Supporting a friend to connect with qualified professionals or community helplines ensures they receive safe, confidential care without placing either of you in danger.',
    isRecommended: true,
  },
  {
    id: 'handle_alone',
    label: 'Try to diagnose, treat, or manage their condition completely on your own.',
    feedback:
      'It is natural to want to fix things, but managing acute mental health or substance distress requires qualified medical professionals. You do not have to carry the burden alone, and you should never put yourself in danger or promise secrecy at the expense of safety.',
    isRecommended: false,
  },
  {
    id: 'share_gossip',
    label: 'Share their situation with others as gossip or post about it online.',
    feedback:
      'Publicising someone’s private crisis damages trust and can make them retreat further from reaching out for life-saving help. Compassionate privacy and direct connection to resources protect lives.',
    isRecommended: false,
  },
];

export const EndScreen: React.FC<EndScreenProps> = ({
  steppedBack,
  onRestart,
  reduceMotion = false,
}) => {
  // Tracked strictly in current run memory
  const [selectedReflection, setSelectedReflection] = useState<string | null>(null);
  const [isFactFictionOpen, setIsFactFictionOpen] = useState(false);

  const activeOption = REFLECTION_OPTIONS.find((opt) => opt.id === selectedReflection);

  return (
    <div
      id="end-screen-overlay"
      role="region"
      aria-label="Investigation Conclusion and Support Screen"
      className="fixed inset-0 z-50 bg-gradient-to-t from-black via-[#06100a] to-[#040805] flex flex-col p-4 sm:p-6 lg:p-8 select-none overflow-y-auto min-h-[100dvh]"
    >
      <div className="w-full max-w-3xl mx-auto flex flex-col space-y-6 my-auto py-4">
        {/* Top Case Resolution Badge */}
        <div className="w-full flex items-center justify-between border-b border-[#182e21] pb-3">
          <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-wider font-bold">
            <Shield className="w-4 h-4" />
            <span>CASE CONCLUSION</span>
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            {steppedBack ? 'BRANCH: GAVE SPACE' : 'BRANCH: STOOD STEADY'}
          </div>
        </div>

        {/* 1. Core Takeaway & Story Conclusion */}
        <div className="bg-[#0b1611]/95 border-2 border-emerald-500/60 rounded-3xl p-5 sm:p-7 shadow-[0_0_50px_rgba(16,185,129,0.12)] flex flex-col items-center text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950/90 border border-emerald-400/80 flex items-center justify-center text-emerald-300 shadow-md">
            <Heart className="w-6 h-6 text-emerald-400" />
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-mono tracking-tight leading-snug">
              “Drug use can distort what feels real.
              <br />
              Recognise the risk. Reach for help.”
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl text-center">
            When the door opened, there were no monsters or intruders. Jun was suffering from acute
            substance-induced paranoia and severe sleep deprivation. Mum, Ravi, and Dr. Aisyah
            stayed by his side to secure emergency medical care and start his recovery.
          </p>

          {/* Clearly Labelled Fictional-Story Note */}
          <div className="w-full bg-[#07100b] border border-[#1a3324] rounded-2xl p-3.5 text-left flex items-start gap-3">
            <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-[11px] sm:text-xs text-slate-300 leading-relaxed space-y-1">
              <span className="font-bold text-emerald-300 font-mono uppercase tracking-wide">
                Fictional Narrative Note:
              </span>{' '}
              This interactive story portrays the psychological distress that can accompany
              prolonged stimulant use and severe sleep deprivation. Jun is a person worthy of care
              and support, and recovery begins with compassionate medical intervention.
            </div>
          </div>
        </div>

        {/* 2. Interactive Reflection Question */}
        <div className="bg-[#0a1410] border border-[#1e3b2b] rounded-3xl p-5 sm:p-7 shadow-lg space-y-4">
          <div className="flex items-center gap-2.5 text-emerald-400">
            <HelpCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <h3 className="text-base sm:text-lg font-bold text-white font-mono">
              Reflection Question
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-300">
            After this story, what would you do if you were worried about a friend?
          </p>

          {/* Options */}
          <div className="space-y-2.5">
            {REFLECTION_OPTIONS.map((option, index) => {
              const isSelected = selectedReflection === option.id;
              return (
                <button
                  key={option.id}
                  id={`reflection-option-${index + 1}`}
                  type="button"
                  onClick={() => setSelectedReflection(option.id)}
                  aria-pressed={isSelected}
                  className={`w-full min-h-[48px] p-3.5 sm:p-4 rounded-2xl text-left text-xs sm:text-sm font-sans transition-all flex items-center justify-between gap-3 border-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                    isSelected
                      ? option.isRecommended
                        ? 'bg-emerald-950/80 border-emerald-400 text-white shadow-md'
                        : 'bg-amber-950/70 border-amber-500 text-slate-100 shadow-md'
                      : 'bg-[#070e0a] border-[#182e21] text-slate-300 hover:border-[#274d37] hover:text-white'
                  }`}
                >
                  <span className="leading-relaxed">{option.label}</span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected
                        ? option.isRecommended
                          ? 'border-emerald-400 bg-emerald-500 text-black'
                          : 'border-amber-400 bg-amber-500 text-black'
                        : 'border-slate-600 bg-black/40'
                    }`}
                  >
                    {isSelected && <span className="w-2 h-2 rounded-full bg-black" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feedback Section */}
          {activeOption && (
            <div
              className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed animate-fadeIn ${
                activeOption.isRecommended
                  ? 'bg-emerald-950/60 border-emerald-500/70 text-emerald-100'
                  : 'bg-[#141a12] border-amber-500/50 text-slate-200'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {activeOption.isRecommended ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-bold font-mono text-xs uppercase tracking-wide mb-1 text-emerald-300">
                    {activeOption.isRecommended ? 'Constructive Approach' : 'Perspective & Care Note'}
                  </div>
                  <p>{activeOption.feedback}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. Find Support (Always Available & Unlocked) */}
        <div className="bg-[#0c1812] border-2 border-emerald-500/70 rounded-3xl p-5 sm:p-7 shadow-[0_0_30px_rgba(16,185,129,0.1)] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-900/80 border border-emerald-400/80 flex items-center justify-center text-emerald-300">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-mono">
                  Find Support & Resources
                </h3>
                <div className="text-xs text-emerald-400 font-mono">
                  Confidential • Free • Non-Judgmental
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            If you or someone you care about is experiencing distress related to substance use or mental
            health, help is available. You do not have to navigate this alone.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* NAMS Helpline */}
            <div className="bg-[#08120d] border border-[#1b3827] rounded-2xl p-4 flex flex-col justify-between space-y-3">
              <div>
                <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  National Addictions Management Service (NAMS)
                </div>
                <div className="text-sm font-semibold text-white mt-1">
                  All Addictions Helpline (24/7)
                </div>
                <div className="text-lg font-mono font-bold text-emerald-300 mt-0.5">
                  1800-666-8668
                </div>
              </div>
              <a
                href="tel:18006668668"
                aria-label="Call NAMS Helpline at 1800-666-8668"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-mono font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call 1800-666-8668</span>
              </a>
            </div>

            {/* Official Website */}
            <div className="bg-[#08120d] border border-[#1b3827] rounded-2xl p-4 flex flex-col justify-between space-y-3">
              <div>
                <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  NAMS Official Website
                </div>
                <div className="text-sm font-semibold text-white mt-1">
                  Information, Guidance & Care
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Institute of Mental Health (IMH), Singapore
                </div>
              </div>
              <a
                href="https://www.nams.sg"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open NAMS website in a new tab"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl bg-[#14261d] hover:bg-[#1d382b] border border-[#234533] text-emerald-300 hover:text-white text-xs font-mono font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Visit www.nams.sg</span>
              </a>
            </div>
          </div>

          <div className="text-[11px] font-mono text-slate-400 pt-1">
            * In an immediate medical or psychiatric emergency in Singapore, please call 995 (Ambulance) or 999 (Police).
          </div>
        </div>

        {/* 4. “What was fact, what was fiction?” Collapsible Section */}
        <div className="bg-[#08120e] border border-[#1b3326] rounded-3xl overflow-hidden">
          <button
            type="button"
            onClick={() => setIsFactFictionOpen((prev) => !prev)}
            aria-expanded={isFactFictionOpen}
            className="w-full p-4 sm:p-5 flex items-center justify-between text-left text-xs sm:text-sm font-mono font-bold text-slate-200 hover:text-white hover:bg-[#0c1c14] transition-colors cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <div className="flex items-center gap-2">
              <FileQuestion className="w-4 h-4 text-emerald-400" />
              <span>WHAT WAS FACT, WHAT WAS FICTION?</span>
            </div>
            {isFactFictionOpen ? (
              <ChevronUp className="w-4 h-4 text-emerald-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {isFactFictionOpen && (
            <div className="p-5 pt-0 border-t border-[#162a1f] text-xs sm:text-sm text-slate-300 space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                <div className="bg-[#050c08] p-4 rounded-2xl border border-emerald-900/60 space-y-2">
                  <div className="font-mono font-bold text-emerald-400 text-xs uppercase flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Scientific & Medical Facts</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-xs">
                    • Stimulant misuse rapidly depletes neurotransmitters and suppresses the urge to sleep, leading to severe sleep deprivation (80+ hours).
                    <br />
                    • Extended sleeplessness and substance effects induce acute substance-induced psychosis: persecutory delusions, auditory distortions, and visual hallucinations.
                    <br />
                    • People experiencing psychosis often misinterpret safe environments and loved ones as severe threats.
                    <br />
                    • Medical treatment, hydration, and compassionate professional care allow the brain to safely stabilize.
                  </p>
                </div>

                <div className="bg-[#050c08] p-4 rounded-2xl border border-amber-900/60 space-y-2">
                  <div className="font-mono font-bold text-amber-400 text-xs uppercase flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" />
                    <span>Narrative & Game Dramatisation</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-xs">
                    • The shadowy horned creatures and surreal detective notebook were visual metaphors representing Jun’s internal fear and panic.
                    <br />
                    • The physical apartment was never invaded by external enemies; the locks and taped vents were placed by Jun himself in a state of terror.
                    <br />
                    • The figures outside were Mum, Ravi, and Dr. Aisyah bringing water and medical aid.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 5. Play Again / Restart Case */}
        <div className="pt-2 flex flex-col items-center">
          <button
            id="end-restart-btn"
            type="button"
            onClick={onRestart}
            aria-label="Restart entire case from Title"
            className="w-full sm:w-auto min-h-[52px] px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-mono font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(16,185,129,0.35)] border border-emerald-300 cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
          >
            <RotateCcw className="w-5 h-5" />
            <span>PLAY AGAIN / RESTART CASE</span>
          </button>
        </div>

        {/* Subtle Bottom Note */}
        <div className="text-center text-[10px] font-mono text-slate-500 pt-2">
          WIDE AWAKE • A Fictional Interactive Case on Sleep Deprivation, Substance Paranoia, and Reaching for Help
        </div>
      </div>
    </div>
  );
};
