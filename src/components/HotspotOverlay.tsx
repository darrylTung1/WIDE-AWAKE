import React, { useEffect, useState } from 'react';
import { Hotspot } from '../data/clues';
import { Search, CheckCircle2, HelpCircle } from 'lucide-react';

interface HotspotOverlayProps {
  hotspots: Hotspot[];
  foundClueIds: string[];
  onSelectHotspot: (hotspot: Hotspot) => void;
  disabled?: boolean;
  lastActivityTime?: number;
}

export const HotspotOverlay: React.FC<HotspotOverlayProps> = ({
  hotspots,
  foundClueIds,
  onSelectHotspot,
  disabled = false,
  lastActivityTime = Date.now(),
}) => {
  const [isIdleHintActive, setIsIdleHintActive] = useState(false);

  // 10-second idle hint: glow intensely if user hasn't clicked or interacted in 10s
  useEffect(() => {
    const checkHint = setInterval(() => {
      if (Date.now() - lastActivityTime > 10000) {
        setIsIdleHintActive(true);
      } else {
        setIsIdleHintActive(false);
      }
    }, 1000);

    return () => clearInterval(checkHint);
  }, [lastActivityTime]);

  return (
    <div
      id="hotspot-layer"
      className="absolute inset-0 z-30 pointer-events-none"
    >
      {/* 10s Idle helper banner if any undiscovered clues remain */}
      {isIdleHintActive && hotspots.some((h) => !foundClueIds.includes(h.clueId)) && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-40 bg-[#08120c]/90 border border-amber-500/80 px-4 py-1.5 rounded-full text-xs font-mono text-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.35)] flex items-center gap-2 animate-bounce pointer-events-auto">
          <HelpCircle className="w-4 h-4 text-amber-400" />
          <span>Need a clue? Look for the glowing pulse reticles!</span>
        </div>
      )}

      {hotspots.map((hs) => {
        const isDiscovered = foundClueIds.includes(hs.clueId);

        return (
          <div
            key={hs.id}
            id={`hotspot-${hs.id}`}
            style={{
              left: `${hs.x}%`,
              top: `${hs.y}%`,
              width: `${hs.width}%`,
              height: `${hs.height}%`,
            }}
            className="absolute pointer-events-auto flex items-center justify-center group"
          >
            {/* Interactive Target Reticle */}
            <button
              disabled={disabled}
              onClick={(e) => {
                e.stopPropagation();
                if (!disabled) onSelectHotspot(hs);
              }}
              title={hs.name}
              className={`relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full transition-all duration-300 transform active:scale-95 cursor-pointer ${
                isDiscovered
                  ? 'bg-emerald-950/80 border-2 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                  : isIdleHintActive
                  ? 'bg-amber-500 border-2 border-amber-200 text-black scale-125 shadow-[0_0_35px_rgba(245,158,11,0.9)] animate-pulse'
                  : 'bg-amber-950/90 border-2 border-amber-400 text-amber-300 hover:scale-110 shadow-[0_0_20px_rgba(245,158,11,0.5)] animate-pulse'
              }`}
            >
              {/* Outer pulsing ring for uninspected items */}
              {!isDiscovered && (
                <span
                  className={`absolute -inset-2 rounded-full border pointer-events-none animate-ping ${
                    isIdleHintActive ? 'border-amber-300 border-2' : 'border-amber-400/50'
                  }`}
                />
              )}

              {isDiscovered ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              ) : (
                <Search
                  className={`w-6 h-6 ${
                    isIdleHintActive ? 'text-black stroke-[2.5]' : 'text-amber-300'
                  }`}
                />
              )}
            </button>

            {/* Hover Tooltip / Hint */}
            <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded bg-[#0a1410]/95 border border-[#203a2c] text-[11px] font-mono text-emerald-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg z-40">
              {isDiscovered ? `✓ ${hs.name}` : `[INVESTIGATE] ${hs.name}`}
            </div>
          </div>
        );
      })}
    </div>
  );
};
