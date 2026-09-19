import React from 'react';

interface BackgroundArtProps {
  sceneId: string;
  className?: string;
}

export const FallbackBackground: React.FC<BackgroundArtProps> = ({ sceneId, className = '' }) => {
  if (sceneId === 'bg_bedroom') {
    return (
      <svg
        className={`w-full h-full object-cover select-none ${className}`}
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bgBedWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0b1210" />
            <stop offset="50%" stopColor="#121b17" />
            <stop offset="100%" stopColor="#09100d" />
          </linearGradient>
          <linearGradient id="phoneGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#101915" />
            <stop offset="100%" stopColor="#050807" />
          </linearGradient>
        </defs>

        {/* Back Wall */}
        <rect width="1920" height="780" fill="url(#bgBedWall)" />

        {/* Taped Window on Left */}
        <g id="window-cluster" transform="translate(180, 120)">
          {/* Window Frame */}
          <rect width="420" height="520" fill="#040605" stroke="#1c2c26" strokeWidth="12" />
          <line x1="210" y1="0" x2="210" y2="520" stroke="#1c2c26" strokeWidth="8" />
          <line x1="0" y1="260" x2="420" y2="260" stroke="#1c2c26" strokeWidth="8" />
          {/* Newspaper strips taped on glass */}
          <rect x="25" y="30" width="160" height="210" fill="#2d3731" transform="rotate(-3 105 135)" />
          <rect x="200" y="45" width="190" height="230" fill="#28322c" transform="rotate(4 295 160)" />
          <rect x="40" y="270" width="170" height="220" fill="#26312b" transform="rotate(2 125 380)" />
          <rect x="190" y="260" width="200" height="230" fill="#2e3832" transform="rotate(-5 290 375)" />
          {/* Tape crosses */}
          <line x1="10" y1="15" x2="390" y2="490" stroke="#5c6e64" strokeWidth="10" strokeOpacity="0.6" strokeDasharray="16 10" />
          <line x1="390" y1="30" x2="20" y2="480" stroke="#5c6e64" strokeWidth="10" strokeOpacity="0.6" strokeDasharray="16 10" />
          <text x="210" y="555" fill="#3a4b43" fontSize="16" fontFamily="sans-serif" textAnchor="middle">
            [WINDOW TAPED WITH NEWSPAPER]
          </text>
        </g>

        {/* Closed bedroom door on Right */}
        <g id="door-cluster" transform="translate(1500, 140)">
          <rect width="320" height="660" fill="#0c1411" stroke="#25352e" strokeWidth="10" />
          <rect x="30" y="40" width="260" height="260" fill="#131e1a" stroke="#25352e" strokeWidth="4" />
          <rect x="30" y="340" width="260" height="280" fill="#131e1a" stroke="#25352e" strokeWidth="4" />
          {/* Door handle */}
          <circle cx="50" cy="350" r="14" fill="#60766c" />
          <rect x="50" y="344" width="45" height="12" rx="4" fill="#60766c" />
          <text x="160" y="690" fill="#3a4b43" fontSize="16" fontFamily="sans-serif" textAnchor="middle">
            [LOCKED BEDROOM DOOR]
          </text>
        </g>

        {/* Floor */}
        <polygon points="0,780 1920,780 1920,1080 0,1080" fill="url(#floorGrad)" />
        <line x1="0" y1="780" x2="1920" y2="780" stroke="#1f2d27" strokeWidth="4" />

        {/* Bed in Center/Bottom-Left */}
        <g id="bed-cluster" transform="translate(420, 620)">
          {/* Headboard */}
          <rect x="0" y="0" width="30" height="260" fill="#1a2520" />
          {/* Mattress & Blanket */}
          <rect x="30" y="40" width="700" height="190" rx="8" fill="#18231e" stroke="#2b3b33" strokeWidth="4" />
          {/* Rumpled Sheet */}
          <path d="M 120,40 Q 300,80 500,50 Q 650,70 730,40 L 730,220 L 120,220 Z" fill="#141c18" />
          {/* Pillow */}
          <rect x="50" y="60" width="160" height="100" rx="16" fill="#223029" />

          {/* Lit Smartphone on bed emitting eerie blue light */}
          <circle cx="340" cy="110" r="140" fill="url(#phoneGlow)" />
          <rect x="310" y="85" width="60" height="110" rx="8" fill="#0f1715" stroke="#38bdf8" strokeWidth="3" />
          <rect x="316" y="93" width="48" height="94" rx="4" fill="#082f49" />
          {/* Missed notifications bar */}
          <line x1="324" y1="120" x2="356" y2="120" stroke="#38bdf8" strokeWidth="3" />
          <line x1="324" y1="132" x2="350" y2="132" stroke="#f87171" strokeWidth="3" />
          <circle cx="340" cy="155" r="5" fill="#38bdf8" />
        </g>

        {/* Untouched food trays hint outside door perspective or near bedside */}
        <g id="food-trays-hint" transform="translate(1380, 800)">
          <ellipse cx="60" cy="30" rx="55" ry="18" fill="#1a2420" stroke="#33463e" strokeWidth="3" />
          <ellipse cx="60" cy="27" rx="45" ry="13" fill="#111915" />
          <ellipse cx="60" cy="65" rx="55" ry="18" fill="#1a2420" stroke="#33463e" strokeWidth="3" />
          <ellipse cx="60" cy="62" rx="45" ry="13" fill="#111915" />
        </g>

        {/* Ambient room clock 4:12 AM */}
        <g transform="translate(940, 140)">
          <rect x="-70" y="-25" width="140" height="50" rx="6" fill="#060a08" stroke="#16221c" strokeWidth="3" />
          <text x="0" y="9" fill="#22c55e" fontSize="28" fontFamily="'JetBrains Mono', monospace" fontWeight="bold" textAnchor="middle" opacity="0.8">
            04:12
          </text>
        </g>
      </svg>
    );
  }

  // Living room fallback
  if (sceneId === 'bg_living') {
    return (
      <svg className={`w-full h-full object-cover select-none ${className}`} viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
        <rect width="1920" height="750" fill="#0d1411" />
        <polygon points="0,750 1920,750 1920,1080 0,1080" fill="#080d0b" />
        <line x1="0" y1="750" x2="1920" y2="750" stroke="#1a2620" strokeWidth="4" />
        {/* Sofa */}
        <rect x="300" y="600" width="600" height="180" rx="16" fill="#16201b" stroke="#25352d" strokeWidth="6" />
        {/* Table */}
        <ellipse cx="1300" cy="740" rx="240" ry="80" fill="#19241f" stroke="#2b3b33" strokeWidth="5" />
        {/* Glass of water */}
        <rect x="1285" y="680" width="30" height="45" rx="4" fill="#38bdf8" fillOpacity="0.4" stroke="#7dd3fc" strokeWidth="2" />
      </svg>
    );
  }

  // Hallway with mirror fallback
  return (
    <svg className={`w-full h-full object-cover select-none ${className}`} viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
      <rect width="1920" height="760" fill="#0a100e" />
      <polygon points="0,760 1920,760 1920,1080 0,1080" fill="#060908" />
      {/* Wall Mirror */}
      <rect x="760" y="160" width="400" height="620" rx="10" fill="#141f1b" stroke="#33463e" strokeWidth="12" />
      <rect x="785" y="185" width="350" height="570" rx="6" fill="#1d2c26" stroke="#4d665a" strokeWidth="4" />
      <text x="960" y="480" fill="#6d8a7c" fontSize="22" fontFamily="sans-serif" textAnchor="middle">
        [WALL MIRROR]
      </text>
    </svg>
  );
};

interface CharacterArtProps {
  id: string;
  variant: 'monster' | 'human';
  className?: string;
}

export const FallbackCharacter: React.FC<CharacterArtProps> = ({ id, variant, className = '' }) => {
  const isMonster = variant === 'monster';

  if (id === 'ravi') {
    return (
      <svg className={`h-full w-auto max-w-full select-none ${className}`} viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="monsterSkinRavi" cx="50%" cy="35%" r="50%">
            <stop offset="0%" stopColor={isMonster ? "#223b32" : "#9a7b68"} />
            <stop offset="70%" stopColor={isMonster ? "#101e19" : "#6e5241"} />
            <stop offset="100%" stopColor={isMonster ? "#070e0b" : "#4a3528"} />
          </radialGradient>
        </defs>

        {/* Torso */}
        <path
          d={isMonster
            ? "M 180,480 Q 80,600 120,900 L 480,900 Q 520,600 420,480 Z"
            : "M 180,460 Q 120,580 150,900 L 450,900 Q 480,580 420,460 Z"}
          fill={isMonster ? "#0e1814" : "#24323a"}
          stroke={isMonster ? "#1a2e26" : "#3b4f5a"}
          strokeWidth="6"
        />

        {/* Head */}
        <ellipse cx="300" cy="360" rx={isMonster ? "110" : "90"} ry={isMonster ? "130" : "110"} fill="url(#monsterSkinRavi)" />

        {/* Identifying Item: RED CAP (Mandatory clue on both monster & human) */}
        <g id="red-cap" transform="translate(300, 260)">
          {/* Cap Dome */}
          <path d="M -90,40 C -90,-30 90,-30 90,40 Z" fill="#b91c1c" stroke="#ef4444" strokeWidth="4" />
          {/* Cap Visor */}
          <ellipse cx="40" cy="40" rx="90" ry="24" fill="#991b1b" stroke="#dc2626" strokeWidth="3" />
        </g>

        {/* Monster vs Human features */}
        {isMonster ? (
          <g>
            {/* Sunken / distorted monster eyes */}
            <ellipse cx="250" cy="360" rx="20" ry="12" fill="#040706" stroke="#4ade80" strokeWidth="2" />
            <ellipse cx="350" cy="360" rx="20" ry="12" fill="#040706" stroke="#4ade80" strokeWidth="2" />
            <circle cx="250" cy="360" r="4" fill="#86efac" />
            <circle cx="350" cy="360" r="4" fill="#86efac" />
            {/* Distorted mouth */}
            <path d="M 260,430 Q 300,410 340,430" stroke="#162921" strokeWidth="8" strokeLinecap="round" fill="none" />
          </g>
        ) : (
          <g>
            {/* Worried human friend eyes */}
            <circle cx="265" cy="360" r="10" fill="#18181b" />
            <circle cx="335" cy="360" r="10" fill="#18181b" />
            {/* Eyebrows knit in deep concern */}
            <line x1="245" y1="335" x2="285" y2="345" stroke="#27272a" strokeWidth="4" strokeLinecap="round" />
            <line x1="355" y1="335" x2="315" y2="345" stroke="#27272a" strokeWidth="4" strokeLinecap="round" />
            <path d="M 280,420 Q 300,410 320,420" stroke="#3f3f46" strokeWidth="4" fill="none" strokeLinecap="round" />
          </g>
        )}

        {/* Outstretched Hand Holding Glass of Water (Mandatory for Ravi) */}
        <g id="water-glass" transform="translate(380, 560)">
          {/* Arm extending */}
          <path d="M 20,40 Q 80,70 120,40" stroke={isMonster ? "#101e19" : "#80614f"} strokeWidth="48" strokeLinecap="round" fill="none" />
          {/* Glass */}
          <path d="M 90,0 L 150,0 L 140,80 L 100,80 Z" fill="#38bdf8" fillOpacity="0.45" stroke="#e0f2fe" strokeWidth="5" />
          <path d="M 94,25 L 146,25 L 138,75 L 102,75 Z" fill="#0284c7" fillOpacity="0.6" />
          {/* Hand fingers clasping */}
          <ellipse cx="95" cy="40" rx="14" ry="10" fill={isMonster ? "#162921" : "#80614f"} />
          <ellipse cx="145" cy="40" rx="14" ry="10" fill={isMonster ? "#162921" : "#80614f"} />
        </g>
      </svg>
    );
  }

  if (id === 'mum') {
    return (
      <svg className={`h-full w-auto max-w-full select-none ${className}`} viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="300" cy="340" rx="85" ry="105" fill={isMonster ? "#152620" : "#826555"} />
        <path d="M 200,440 Q 130,560 160,900 L 440,900 Q 470,560 400,440 Z" fill={isMonster ? "#0c1512" : "#3d3040"} stroke={isMonster ? "#1b2d26" : "#5a4560"} strokeWidth="6" />
        {/* Identifying item: Jade Bracelet on wrist */}
        <g transform="translate(180, 680)">
          <path d="M -30,-40 Q 20,20 40,80" stroke={isMonster ? "#152620" : "#826555"} strokeWidth="40" strokeLinecap="round" fill="none" />
          {/* Glowing Green Jade Bracelet */}
          <ellipse cx="15" cy="35" rx="30" ry="18" fill="none" stroke="#10b981" strokeWidth="12" />
          <ellipse cx="15" cy="35" rx="30" ry="18" fill="none" stroke="#6ee7b7" strokeWidth="4" />
        </g>
      </svg>
    );
  }

  // Aisyah: Yellow Cardigan
  return (
    <svg className={`h-full w-auto max-w-full select-none ${className}`} viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="300" cy="340" rx="85" ry="105" fill={isMonster ? "#152620" : "#826555"} />
      <path d="M 200,440 Q 130,560 160,900 L 440,900 Q 470,560 400,440 Z" fill={isMonster ? "#0c1512" : "#334155"} stroke="#1b2d26" strokeWidth="6" />
      {/* Identifying Item: Yellow Cardigan */}
      <path d="M 180,440 L 260,900 L 340,900 L 420,440 Q 300,500 180,440 Z" fill="#ca8a04" stroke="#eab308" strokeWidth="6" opacity={isMonster ? 0.75 : 0.95} />
    </svg>
  );
};
