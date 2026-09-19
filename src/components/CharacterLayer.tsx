import React, { useState, useEffect } from 'react';
import { Position } from '../types';
import { FallbackCharacter } from './FallbackArt';
import { resolveCharacterAsset } from '../data/assets';

export interface CharacterLayerProps {
  id: 'mum' | 'ravi' | 'aisyah' | 'jun';
  variant: 'monster' | 'human';
  position: Position;
  customImageSrc?: string;
  name?: string;
  identifyingItem?: string;
  isMirrorScene?: boolean;
}

export const CharacterLayer: React.FC<CharacterLayerProps> = ({
  id,
  variant,
  position,
  customImageSrc,
  isMirrorScene = false,
}) => {
  const [imageFailed, setImageFailed] = useState<boolean>(false);

  // Requirement 1: Resolve character asset from typed manifest (resolves jun_mirror explicitly)
  const asset = resolveCharacterAsset(id, variant, isMirrorScene);
  const imageToUse = customImageSrc || asset.path;

  // Requirement 3: Reset image failure state whenever src changes
  useEffect(() => {
    setImageFailed(false);
  }, [imageToUse]);

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
          alt={asset.label}
          onError={() => setImageFailed(true)}
          className="h-full w-auto object-contain object-bottom drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] filter transition-transform duration-300"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="h-full w-full flex items-end justify-center">
          <FallbackCharacter
            id={id}
            variant={variant}
            isMirrorScene={isMirrorScene}
            className="drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
          />
        </div>
      )}
    </div>
  );
};
