import React, { useState } from 'react';
import { Smartphone, X, PhoneMissed, MessageSquare, ArrowLeft, Clock } from 'lucide-react';

interface PhoneInspectModalProps {
  onClose: () => void;
}

export const PhoneInspectModal: React.FC<PhoneInspectModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'chats' | 'calls' | 'dealer'>('chats');

  return (
    <div
      id="phone-inspect-modal"
      className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none animate-fadeIn"
      onClick={onClose}
    >
      {/* Smartphone Frame */}
      <div
        className="w-full max-w-sm h-[600px] max-h-[92%] bg-[#080d0a] border-4 border-[#254233] rounded-[36px] shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Notch / Speaker */}
        <div className="w-full bg-black py-2.5 flex justify-center items-center relative z-20">
          <div className="w-24 h-4 bg-[#141e17] rounded-full flex items-center justify-end px-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500/40" />
          </div>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-2 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status Bar */}
        <div className="px-5 py-1 flex items-center justify-between text-[11px] font-mono text-emerald-400/90 border-b border-[#14231b] bg-[#0c1611]">
          <span>04:12 AM</span>
          <span className="text-[10px] text-red-400 font-bold tracking-wider">3% BATTERY</span>
        </div>

        {/* Phone Tabs */}
        <div className="flex border-b border-[#1b3126] bg-[#0e1a14] text-xs font-mono">
          <button
            onClick={() => setActiveTab('chats')}
            className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'chats'
                ? 'text-emerald-300 font-bold border-b-2 border-emerald-400 bg-[#14261d]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Messages (34)</span>
          </button>
          <button
            onClick={() => setActiveTab('calls')}
            className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'calls'
                ? 'text-emerald-300 font-bold border-b-2 border-emerald-400 bg-[#14261d]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <PhoneMissed className="w-3.5 h-3.5 text-red-400" />
            <span>Missed (19)</span>
          </button>
          <button
            onClick={() => setActiveTab('dealer')}
            className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 transition-colors ${
              activeTab === 'dealer'
                ? 'text-emerald-300 font-bold border-b-2 border-emerald-400 bg-[#14261d]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>"Ghost"</span>
          </button>
        </div>

        {/* Phone Content Screen */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#080e0a]">
          {activeTab === 'chats' && (
            <div className="space-y-3">
              {/* Mum Chat preview */}
              <div className="p-3 rounded-2xl bg-[#0f1d16] border border-[#1b3627] space-y-1">
                <div className="flex justify-between items-center text-[11px] text-emerald-400 font-mono">
                  <span className="font-bold">MUM</span>
                  <span>Yesterday, 11:42 PM</span>
                </div>
                <p className="text-xs text-slate-200">
                  "Jun, open the bedroom door please. You haven't touched your dinner since Tuesday. Ravi is here with me."
                </p>
              </div>

              {/* Work Chat */}
              <div className="p-3 rounded-2xl bg-[#0f1d16] border border-[#1b3627] space-y-1">
                <div className="flex justify-between items-center text-[11px] text-emerald-400 font-mono">
                  <span className="font-bold">WORK // MARCUS</span>
                  <span>Yesterday, 3:15 PM</span>
                </div>
                <p className="text-xs text-slate-200">
                  "Third day you haven't shown up or replied. HR is escalating this. Are you okay?"
                </p>
              </div>

              {/* Aisyah Chat */}
              <div className="p-3 rounded-2xl bg-[#0f1d16] border border-[#1b3627] space-y-1">
                <div className="flex justify-between items-center text-[11px] text-emerald-400 font-mono">
                  <span className="font-bold">AISYAH</span>
                  <span>Wednesday, 2:04 AM</span>
                </div>
                <p className="text-xs text-slate-200">
                  "Jun, what happened at that party? You were acting paranoid. Stop ignoring our calls."
                </p>
              </div>
            </div>
          )}

          {activeTab === 'calls' && (
            <div className="space-y-2">
              {[
                { name: 'Mum', time: 'Today, 3:55 AM', count: 8 },
                { name: 'Ravi', time: 'Today, 2:40 AM', count: 5 },
                { name: 'Aisyah', time: 'Yesterday, 11:20 PM', count: 4 },
                { name: 'Work (Marcus)', time: 'Yesterday, 5:30 PM', count: 2 },
              ].map((c, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#0e1812] border border-[#172b20]"
                >
                  <div className="flex items-center gap-2.5">
                    <PhoneMissed className="w-4 h-4 text-red-400" />
                    <div>
                      <div className="text-xs font-bold text-white">
                        {c.name} ({c.count})
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">{c.time}</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-red-400 font-mono font-semibold">MISSED</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'dealer' && (
            <div className="space-y-2">
              <div className="text-[11px] font-mono text-amber-400/90 text-center py-1">
                ENCRYPTED CHAT // "GHOST"
              </div>
              <div className="space-y-2 text-xs">
                <div className="bg-[#14231a] p-2.5 rounded-xl rounded-tl-none max-w-[85%] border border-[#213b2c] text-slate-200">
                  "Got pure crystal glass. 1g packet ready at Clarke Quay. Don't sleep for 3 days guaranteed."
                </div>
                <div className="bg-emerald-950 p-2.5 rounded-xl rounded-tr-none ml-auto max-w-[85%] border border-emerald-700/60 text-emerald-100">
                  "Coming down now."
                </div>
                <div className="bg-[#14231a] p-2.5 rounded-xl rounded-tl-none max-w-[85%] border border-[#213b2c] text-slate-200">
                  "Remember: hydrate or you will bug out."
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Phone Bottom Home Bar */}
        <div className="p-3 bg-[#0a120d] border-t border-[#14231b] flex items-center justify-between">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-[#14261c] hover:bg-[#1a3325] text-emerald-300 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Put Phone Down</span>
          </button>
        </div>
      </div>
    </div>
  );
};
