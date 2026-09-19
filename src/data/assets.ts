/**
 * WIDE AWAKE - Typed Asset Manifest
 * Single source of truth for all project assets, paths, fallbacks, and metadata.
 */

export interface ProjectAsset {
  key: string;
  filename: string;
  label: string;
  type: 'background' | 'character' | 'prop' | 'ui';
  path: string;
  requiredFor: string;
}

// Base URL helper to support standard web hosting and subpath deployments
const baseEnv =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.BASE_URL) || '/';
const BASE = baseEnv.endsWith('/') ? baseEnv : `${baseEnv}/`;

export const getAssetUrl = (filename: string): string => {
  return `${BASE}assets/${filename}`;
};

export const ROOT_ASSET_URL = (filename: string): string => {
  return `${BASE}${filename}`;
};

export const PROJECT_ASSETS: ProjectAsset[] = [
  // Backgrounds
  {
    key: 'bg_bedroom',
    filename: 'bg_bedroom.webp',
    label: 'HDB Bedroom (Taped Windows & Fortified Door)',
    type: 'background',
    path: ROOT_ASSET_URL('bg_bedroom.webp'),
    requiredFor: 'Act 1: Investigation & Bedroom Search',
  },
  {
    key: 'bg_living',
    filename: 'bg_living.webp',
    label: 'HDB Living Room (Sofa & Table)',
    type: 'background',
    path: ROOT_ASSET_URL('bg_living.webp'),
    requiredFor: 'Act 2: Witness Confrontation & Flashback',
  },
  {
    key: 'bg_hallway',
    filename: 'bg_hallway.webp',
    label: 'HDB Hallway (Vanity Wall Mirror)',
    type: 'background',
    path: ROOT_ASSET_URL('bg_hallway.webp'),
    requiredFor: 'Act 3: Mirror Self-Observation',
  },

  // Characters - Mum
  {
    key: 'mum_monster',
    filename: 'mum_monster.webp',
    label: 'Mum (Weeping Specter / Jade Bracelet)',
    type: 'character',
    path: ROOT_ASSET_URL('mum_monster.webp'),
    requiredFor: 'Act 2: Suspects Confrontation',
  },
  {
    key: 'mum_human',
    filename: 'mum_human.webp',
    label: 'Mum (Mrs. Tan / Human Mother with Food)',
    type: 'character',
    path: ROOT_ASSET_URL('mum_human.webp'),
    requiredFor: 'Flashback & Casefile Truth',
  },

  // Characters - Ravi
  {
    key: 'ravi_monster',
    filename: 'ravi_monster.webp',
    label: 'Ravi (Approaching Threat / Red Cap)',
    type: 'character',
    path: ROOT_ASSET_URL('ravi_monster.webp'),
    requiredFor: 'Act 2: Living Room Reach',
  },
  {
    key: 'ravi_human',
    filename: 'ravi_human.webp',
    label: 'Ravi (Close Friend / Red Cap Offering Water)',
    type: 'character',
    path: ROOT_ASSET_URL('ravi_human.webp'),
    requiredFor: 'Flashback & Casefile Truth',
  },

  // Characters - Aisyah
  {
    key: 'aisyah_monster',
    filename: 'aisyah_monster.webp',
    label: 'Aisyah (Surveillance Figure / Yellow Cardigan)',
    type: 'character',
    path: ROOT_ASSET_URL('aisyah_monster.webp'),
    requiredFor: 'Act 2: Suspects Confrontation',
  },
  {
    key: 'aisyah_human',
    filename: 'aisyah_human.webp',
    label: 'Aisyah (Colleague / Yellow Cardigan with Support Contacts)',
    type: 'character',
    path: ROOT_ASSET_URL('aisyah_human.webp'),
    requiredFor: 'Flashback & Casefile Truth',
  },

  // Characters - Jun
  {
    key: 'jun_mirror',
    filename: 'jun_mirror.webp',
    label: "Jun in Hallway Mirror (Physiological Symptoms)",
    type: 'character',
    path: ROOT_ASSET_URL('jun_mirror.webp'),
    requiredFor: 'Act 3: Mirror Self-Observation',
  },
  {
    key: 'jun_silhouette',
    filename: 'jun_silhouette.webp',
    label: 'Jun (Pacing Silhouette)',
    type: 'character',
    path: ROOT_ASSET_URL('jun_silhouette.webp'),
    requiredFor: 'Casefile & Witness Timelines',
  },
];

// List of all paths for preloader
export const PRELOAD_IMAGE_PATHS: string[] = PROJECT_ASSETS.map((a) => a.path);

/**
 * Resolves character image path accurately.
 * Explicitly resolves Jun's mirror portrait rather than generating an invalid 'jun_monster.webp'.
 */
export function resolveCharacterAsset(
  id: 'mum' | 'ravi' | 'aisyah' | 'jun',
  variant: 'monster' | 'human',
  isMirrorScene: boolean = false
): { key: string; path: string; label: string } {
  if (id === 'jun') {
    if (isMirrorScene) {
      return {
        key: 'jun_mirror',
        path: ROOT_ASSET_URL('jun_mirror.webp'),
        label: "Jun's Reflection in Mirror",
      };
    }
    return {
      key: 'jun_silhouette',
      path: ROOT_ASSET_URL('jun_silhouette.webp'),
      label: 'Jun Silhouette',
    };
  }

  const key = `${id}_${variant}`;
  const asset = PROJECT_ASSETS.find((a) => a.key === key);
  return {
    key,
    path: asset ? asset.path : ROOT_ASSET_URL(`${key}.webp`),
    label: asset ? asset.label : `${id} (${variant})`,
  };
}

/**
 * Resolves background image path.
 */
export function resolveBackgroundAsset(
  sceneBg: 'bg_bedroom' | 'bg_living' | 'bg_hallway'
): { key: string; path: string; label: string } {
  const asset = PROJECT_ASSETS.find((a) => a.key === sceneBg);
  return {
    key: sceneBg,
    path: asset ? asset.path : ROOT_ASSET_URL(`${sceneBg}.webp`),
    label: asset ? asset.label : sceneBg,
  };
}
