import React, { useState, useEffect } from 'react';
import { FallbackBackground } from './FallbackArt';
import { resolveBackgroundAsset } from '../data/assets';

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
  const defaultAsset = resolveBackgroundAsset(sceneId);
  const imageToUse = customImageSrc || defaultAsset.path;

  // Requirement 3: Reset image failure state whenever src changes
  useEffect(() => {
    setImageFailed(false);
  }, [imageToUse]);

  // Requirement 6: Keep expensive distortion filters scoped strictly to art layers
  const hallucinationStyle: React.CSSProperties =
    mode === 'hallucination'
      ? {
          filter: 'saturate(0.7) hue-rotate(-15deg) contrast(1.15)',
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
          alt={defaultAsset.label}
          onError={() => setImageFailed(true)}
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
      ) : (
        <FallbackBackground sceneId={sceneId} />
      )}
    </div>
  );
};
