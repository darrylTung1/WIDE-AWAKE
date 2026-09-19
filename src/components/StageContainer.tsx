import React, { useEffect, useRef, useState } from 'react';

interface StageContainerProps {
  children: React.ReactNode;
  mode?: 'hallucination' | 'clean';
  shaking?: boolean;
  flashing?: boolean;
}

export const StageContainer: React.FC<StageContainerProps> = ({
  children,
  mode = 'hallucination',
  shaking = false,
  flashing = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 960,
    height: 540,
  });

  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      if (clientWidth === 0 || clientHeight === 0) return;

      const targetRatio = 16 / 9;
      const currentRatio = clientWidth / clientHeight;

      let w = clientWidth;
      let h = clientHeight;

      if (currentRatio > targetRatio) {
        // Window is wider than 16:9 -> pillarboxed (black bars left/right)
        h = clientHeight;
        w = clientHeight * targetRatio;
      } else {
        // Window is taller than 16:9 -> letterboxed (black bars top/bottom)
        w = clientWidth;
        h = clientWidth / targetRatio;
      }

      setDimensions({ width: Math.floor(w), height: Math.floor(h) });
    };

    updateSize();

    const observer = new ResizeObserver(() => {
      updateSize();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    window.addEventListener('resize', updateSize);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="viewport-wrapper"
      className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden select-none"
    >
      {/* 16:9 Letterboxed Stage */}
      <div
        id="stage-16-9"
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
        }}
        className={`relative overflow-hidden bg-[#070b09] shadow-2xl transition-all duration-300 ${
          mode === 'hallucination' ? 'filter-hallucination' : ''
        } ${shaking ? 'animate-shake' : ''}`}
      >
        {children}

        {/* Screen flash on impact / shove */}
        {flashing && (
          <div
            id="screen-flash-overlay"
            className="pointer-events-none absolute inset-0 z-50 bg-white animate-flash"
          />
        )}

        {/* Hallucination mode vignette and grain effect */}
        {mode === 'hallucination' && (
          <div
            id="hallucination-vignette"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 mix-blend-multiply"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(4,18,10,0.5) 75%, rgba(0,0,0,0.95) 100%)',
            }}
          />
        )}
      </div>
    </div>
  );
};
