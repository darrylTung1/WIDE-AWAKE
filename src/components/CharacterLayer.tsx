import React, { useState } from 'react';
import { Position } from '../types';
import { FallbackCharacter } from './FallbackArt';

export interface CharacterLayerProps {
  id: 'mum' | 'ravi' | 'aisyah' | 'jun';
  variant: 'monster' | 'human';
  position: Position;
  customImageSrc?: string;
  name?: string;
  identifyingItem?: string;
}

export const CharacterLayer: React.FC<CharacterLayerProps> = ({
  id,
  variant,
  position,
  customImageSrc,
}) => {
  const [imageFailed, setImageFailed] = useState<boolean>(false);

  // Expected filename from the spec Section 5
  const defaultSrc = `/${id}_${variant}.webp`;
  const imageToUse = customImageSrc || defaultSrc;

  // Position mappings across 16:9 stage
  const positionClasses = {
    left: 'left-[10%] -translate-x-1/2',
    center: 'left-1/2 -translate-x-1/2',
    right: 'left-[90%] -translate-x-1/2',
  }[position];

  return (
    <div
      id={`character-layer-${id}`}
      className={`absolute bottom-0 h-[70%] z-10 flex items-end justify-center pointer-events-none transition-all duration-300 ${positionClasses}`}
      style={{
        width: '38%',
        maxHeight: '70%',
      }}
    >
      {!imageFailed ? (
        <img
          src={imageToUse}
          alt={`${id} (${variant})`}
          onError={() => setImageFailed(true)}
          className="h-full w-auto object-contain object-bottom drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] filter transition-transform duration-300"
        />
      ) : (
        <div className="h-full w-full flex items-end justify-center">
          <FallbackCharacter id={id} variant={variant} className="drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]" />
        </div>
      )}
    </div>
  );
};
