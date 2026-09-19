import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, AlertCircle, Upload, RefreshCw, X, SlidersHorizontal } from 'lucide-react';
import { PROJECT_ASSETS, ProjectAsset } from '../data/assets';

interface AssetConfirmBarProps {
  currentBg: 'bg_bedroom' | 'bg_living' | 'bg_hallway';
  onChangeBg: (bg: 'bg_bedroom' | 'bg_living' | 'bg_hallway') => void;
  currentCharacter: 'mum' | 'ravi' | 'aisyah' | 'jun';
  onChangeCharacter: (char: 'mum' | 'ravi' | 'aisyah' | 'jun') => void;
  currentVariant: 'monster' | 'human';
  onChangeVariant: (variant: 'monster' | 'human') => void;
  currentPosition: 'left' | 'center' | 'right';
  onChangePosition: (pos: 'left' | 'center' | 'right') => void;
  onCustomImageLoad: (filename: string, url: string) => void;
  customImages: Record<string, string>;
}

export const AssetConfirmBar: React.FC<AssetConfirmBarProps> = ({
  currentBg,
  onChangeBg,
  currentCharacter,
  onChangeCharacter,
  currentVariant,
  onChangeVariant,
  currentPosition,
  onChangePosition,
  onCustomImageLoad,
  customImages,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loadStatus, setLoadStatus] = useState<Record<string, 'found' | 'missing' | 'checking'>>({});
  const createdUrlsRef = useRef<string[]>([]);

  // Requirement 3: Clean up object URLs on unmount to prevent leaks
  useEffect(() => {
    return () => {
      createdUrlsRef.current.forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch {
          // ignore
        }
      });
      createdUrlsRef.current = [];
    };
  }, []);

  const checkAssets = () => {
    const statuses: Record<string, 'found' | 'missing' | 'checking'> = {};
    PROJECT_ASSETS.forEach((asset) => {
      statuses[asset.filename] = 'checking';
    });
    setLoadStatus(statuses);

    PROJECT_ASSETS.forEach((asset) => {
      // Check if custom URL exists first
      if (customImages[asset.filename]) {
        setLoadStatus((prev) => ({ ...prev, [asset.filename]: 'found' }));
        return;
      }

      const img = new Image();
      img.onload = () => {
        setLoadStatus((prev) => ({ ...prev, [asset.filename]: 'found' }));
      };
      img.onerror = () => {
        setLoadStatus((prev) => ({ ...prev, [asset.filename]: 'missing' }));
      };
      img.src = asset.path + `?t=${Date.now()}`;
    });
  };

  useEffect(() => {
    checkAssets();
  }, [customImages]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const matched = PROJECT_ASSETS.find(
        (a) => a.filename.toLowerCase() === file.name.toLowerCase()
      );
      const objectUrl = URL.createObjectURL(file);
      createdUrlsRef.current.push(objectUrl);

      if (matched) {
        onCustomImageLoad(matched.filename, objectUrl);
      } else {
        onCustomImageLoad(file.name, objectUrl);
      }
    });
  };

  const foundCount = Object.values(loadStatus).filter((s) => s === 'found').length;

  return (
    <>
      {/* Discreet Stage 1 Control Pill at Top */}
      <div className="absolute top-3 left-4 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0e1713]/90 border border-[#233a2d] hover:border-[#385f49] text-xs font-semibold tracking-wide text-emerald-300 backdrop-blur-md shadow-lg transition-all cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Stage 1: Asset Inspector</span>
          <span className="px-1.5 py-0.5 rounded-full bg-[#1b2d23] text-[10px] text-emerald-400">
            {foundCount}/{PROJECT_ASSETS.length} Found
          </span>
        </button>
      </div>

      {/* Drawer / Inspector Modal */}
      {isOpen && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0b1410] border border-[#21372a] rounded-2xl max-w-2xl w-full max-h-[85%] flex flex-col shadow-2xl overflow-hidden text-slate-200">
            {/* Modal Header */}
            <div className="p-4 border-b border-[#1b2d22] flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white tracking-wide">
                  Stage 1 — Asset Verification & Preview
                </h3>
                <p className="text-xs text-emerald-400/80">
                  Confirm WebP images and verify portrait layering over backgrounds.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-[#14231b] hover:bg-[#1f372a] text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stage Configuration Selector */}
            <div className="p-4 border-b border-[#1b2d22] bg-[#0e1914] grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Preview Background:</label>
                <div className="flex gap-1.5">
                  {(['bg_bedroom', 'bg_living', 'bg_hallway'] as const).map((bg) => (
                    <button
                      key={bg}
                      onClick={() => onChangeBg(bg)}
                      className={`flex-1 py-1.5 px-2 rounded-lg border text-center font-medium transition-colors cursor-pointer ${
                        currentBg === bg
                          ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                          : 'bg-[#14231b] border-[#22392c] text-slate-300 hover:border-emerald-700'
                      }`}
                    >
                      {bg.replace('bg_', '')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Preview Character:</label>
                <div className="flex gap-1.5">
                  {(['ravi', 'mum', 'aisyah', 'jun'] as const).map((char) => (
                    <button
                      key={char}
                      onClick={() => onChangeCharacter(char)}
                      className={`flex-1 py-1.5 px-2 rounded-lg border text-center font-medium capitalize transition-colors cursor-pointer ${
                        currentCharacter === char
                          ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                          : 'bg-[#14231b] border-[#22392c] text-slate-300 hover:border-emerald-700'
                      }`}
                    >
                      {char}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Variant:</label>
                <div className="flex gap-1.5">
                  {(['monster', 'human'] as const).map((v) => (
                    <button
                      key={v}
                      onClick={() => onChangeVariant(v)}
                      className={`flex-1 py-1.5 px-2 rounded-lg border text-center font-medium capitalize transition-colors cursor-pointer ${
                        currentVariant === v
                          ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                          : 'bg-[#14231b] border-[#22392c] text-slate-300 hover:border-emerald-700'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Stage Position:</label>
                <div className="flex gap-1.5">
                  {(['left', 'center', 'right'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => onChangePosition(p)}
                      className={`flex-1 py-1.5 px-2 rounded-lg border text-center font-medium capitalize transition-colors cursor-pointer ${
                        currentPosition === p
                          ? 'bg-emerald-900/60 border-emerald-500 text-emerald-200'
                          : 'bg-[#14231b] border-[#22392c] text-slate-300 hover:border-emerald-700'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Asset Table */}
            <div className="p-4 flex-1 overflow-y-auto">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-300 tracking-wider uppercase">
                  Design Spec Asset Checklist ({PROJECT_ASSETS.length} files)
                </span>
                <button
                  onClick={checkAssets}
                  className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Re-check Paths</span>
                </button>
              </div>

              <div className="space-y-1.5">
                {PROJECT_ASSETS.map((asset: ProjectAsset) => {
                  const status = loadStatus[asset.filename];
                  const hasCustom = !!customImages[asset.filename];

                  return (
                    <div
                      key={asset.filename}
                      className="flex items-center justify-between p-2 rounded-lg bg-[#111c16] border border-[#1b2d23] text-xs"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {status === 'found' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-amber-400/80 shrink-0" />
                        )}
                        <div className="truncate">
                          <span className="font-mono font-medium text-slate-200">
                            {asset.filename}
                          </span>
                          <span className="text-[11px] text-slate-400 ml-2">
                            ({asset.label})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {status === 'found' ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-[10px] font-semibold">
                            {hasCustom ? 'Loaded (Custom)' : 'Found on Disk'}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-amber-950/50 border border-amber-800/60 text-amber-300 text-[10px]">
                            Fallback Art Active
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Upload Drop Zone */}
              <div className="mt-4 p-3 rounded-xl border border-dashed border-[#2b4837] bg-[#0c1611] text-center">
                <label className="cursor-pointer flex flex-col items-center justify-center gap-1">
                  <Upload className="w-5 h-5 text-emerald-400" />
                  <span className="text-xs font-semibold text-emerald-300">
                    Upload image files to test rendering live
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Accepts .webp, .png, .jpg (Revokes temporary memory safely)
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 border-t border-[#1b2d22] bg-[#0a120e] flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Fallback artwork renders seamlessly whenever WebP art files are pending.
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Close & Return to Stage
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
