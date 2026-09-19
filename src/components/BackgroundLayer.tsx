import React, { useState } from 'react';
import { FallbackBackground } from './FallbackArt';

export interface BackgroundLayerProps {
  sceneId: 'bg_bedroom' | 'bg_living' | 'bg_hallway';
  customImageSrc?: string;
  mode?: 'hallucination' | 'clean';
}

export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({
  sceneId,
  customImageSrc,
  mode = 'hallucination',
}) => {
  const [imageFailed, setImageFailed] = useState(false);
  const defaultSrc = `/${sceneId}.webp`;
  const imageToUse = customImageSrc || defaultSrc;

  const hallucinationStyle: React.CSSProperties =
    mode === 'hallucination'
      ? {
          filter: 'saturate(0.5) hue-rotate(-20deg) contrast(1.2)',
        }
      : {};

  return (
    <div
      id={`background-layer-${sceneId}`}
      className="absolute inset-0 w-full h-full z-0 overflow-hidden"
      style={hallucinationStyle}
    >
      {!imageFailed ? (
        <img
          src={imageToUse}
          alt={sceneId}
          onError={() => setImageFailed(true)}
          className="w-full h-full object-cover object-center"
        />
      ) : (
        <FallbackBackground sceneId={sceneId} />
      )}
    </div>
  );
};
