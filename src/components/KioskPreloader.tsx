import React, { useState, useEffect } from 'react';
import { ShieldCheck, Loader2 } from 'lucide-react';

const PRELOAD_ASSETS = [
  '/bg_bedroom.webp',
  '/bg_living.webp',
  '/bg_hallway.webp',
  '/mum_monster.webp',
  '/mum_human.webp',
  '/ravi_monster.webp',
  '/ravi_human.webp',
  '/aisyah_monster.webp',
  '/aisyah_human.webp',
  '/jun_mirror.webp',
  '/food_trays.webp',
  '/jun_silhouette.webp',
];

interface KioskPreloaderProps {
  onComplete: () => void;
}

export const KioskPreloader: React.FC<KioskPreloaderProps> = ({ onComplete }) => {
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    let count = 0;
    const total = PRELOAD_ASSETS.length;

    // Preload image assets safely without crashing if files aren't in filesystem
    PRELOAD_ASSETS.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        count++;
        setLoadedCount(count);
        if (count >= total) {
          setTimeout(onComplete, 400);
        }
      };
      img.onerror = () => {
        // Still count errors so loading screen proceeds seamlessly
        count++;
        setLoadedCount(count);
        if (count >= total) {
          setTimeout(onComplete, 400);
        }
      };
      img.src = src;
    });

    // Fallback timer: max 1.5s then proceed automatically
    const fallback = setTimeout(onComplete, 1500);
    return () => clearTimeout(fallback);
  }, [onComplete]);

  const percentage = Math.round((loadedCount / PRELOAD_ASSETS.length) * 100);

  return (
    <div
      id="kiosk-preloader"
      className="absolute inset-0 z-50 bg-[#050b08] flex flex-col items-center justify-center p-6 select-none"
    >
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-500/60 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
          <ShieldCheck className="w-9 h-9 text-emerald-400" />
        </div>

        <div className="space-y-1 font-mono">
          <h1 className="text-xl font-bold tracking-widest text-white uppercase">
            PARANOIA // INITIATIVE
          </h1>
          <p className="text-xs text-emerald-400/80">
            OFFLINE KIOSK SYSTEM READY // PRELOADING ASSETS
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full h-2.5 bg-[#0e1c14] rounded-full overflow-hidden border border-[#1b3628] p-0.5">
            <div
              className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-200"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <Loader2 className="w-3 h-3 animate-spin text-emerald-400" />
              <span>Verifying local media buffer...</span>
            </span>
            <span className="text-emerald-400 font-bold">{percentage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
