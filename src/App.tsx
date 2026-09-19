import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { StageContainer } from './components/StageContainer';
import { BackgroundLayer } from './components/BackgroundLayer';
import { CharacterLayer } from './components/CharacterLayer';
import { DialogueBox } from './components/DialogueBox';
import { AssetConfirmBar } from './components/AssetConfirmBar';
import { TitleScreen } from './components/TitleScreen';
import { ChoiceMenu } from './components/ChoiceMenu';
import { EndScreen } from './components/EndScreen';
import { SceneRibbon } from './components/SceneRibbon';
import { IdlePromptModal } from './components/IdlePromptModal';
import { HotspotOverlay } from './components/HotspotOverlay';
import { SearchHUD } from './components/SearchHUD';
import { InspectionModal } from './components/InspectionModal';
import { CaseNotebookDrawer } from './components/CaseNotebookDrawer';
import { SuspectBoard } from './components/SuspectBoard';
import { PhoneInspectModal } from './components/PhoneInspectModal';
import { DeductionBoard } from './components/DeductionBoard';
import { CaseFileScreen } from './components/CaseFileScreen';
import { KioskPreloader } from './components/KioskPreloader';
import { SCENES, INITIAL_GAME_STATE } from './data/scenes';
import { ACT1_HOTSPOTS, ACT3_HOTSPOTS, Hotspot, CLUES_DATABASE } from './data/clues';
import { GameState, SceneChoice, DialogueLine } from './types';
import { DoorOpen, ArrowRight, ShieldAlert } from 'lucide-react';

export default function App() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const [isShaking, setIsShaking] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [lastActivity, setLastActivity] = useState<number>(Date.now());
  const [showIdlePrompt, setShowIdlePrompt] = useState(false);

  // Stage 3 & 4 State
  const [activeInspection, setActiveInspection] = useState<{
    hotspot: Hotspot;
    lineIndex: number;
  } | null>(null);
  const [isCaseDrawerOpen, setIsCaseDrawerOpen] = useState(false);
  const [isSuspectBoardOpen, setIsSuspectBoardOpen] = useState(false);
  const [isPhoneInspectOpen, setIsPhoneInspectOpen] = useState(false);

  // Stage 8 Kiosk Preload State
  const [isPreloaded, setIsPreloaded] = useState(false);

  // Reset Game State to Initial
  const resetGame = useCallback(() => {
    setShowIdlePrompt(false);
    setGameState(INITIAL_GAME_STATE);
  }, []);

  // Jump to arbitrary scene (for engine testing)
  const jumpToScene = useCallback((sceneId: string) => {
    if (!SCENES[sceneId]) return;
    const targetScene = SCENES[sceneId];
    setGameState((prev) => ({
      ...prev,
      currentSceneId: sceneId,
      currentLineIndex: 0,
      mode: targetScene.mode,
    }));
  }, []);

  // Current Scene definition
  const currentScene = useMemo(() => {
    return SCENES[gameState.currentSceneId] || SCENES.title;
  }, [gameState.currentSceneId]);

  // Compute active dialogue lines (including branch-specific lines for flashback)
  const activeLines = useMemo((): DialogueLine[] => {
    if (gameState.currentSceneId === 'flashback') {
      const raviLine: DialogueLine = gameState.flags.shoved
        ? {
            speaker: 'RAVI',
            text: "(on the floor, holding his wrist) I'm okay. I'm not leaving.",
            characterId: 'ravi',
          }
        : {
            speaker: 'RAVI',
            text: '(holding the glass out) It is here when you want it.',
            characterId: 'ravi',
          };
      return [raviLine, ...currentScene.lines];
    }

    // For act2_suspects, if all 3 questioned, show the reach transition line
    if (gameState.currentSceneId === 'act2_suspects') {
      const allQuestioned =
        gameState.questioned.includes('mum') &&
        gameState.questioned.includes('ravi') &&
        gameState.questioned.includes('aisyah');

      if (allQuestioned) {
        return [
          {
            speaker: '(N)',
            text: 'All three have answered. The cap one is coming closer. It is holding something out to me.',
          },
        ];
      }
    }

    return currentScene.lines;
  }, [currentScene, gameState.currentSceneId, gameState.flags.shoved, gameState.questioned]);

  // Activity tracker for 60s idle prompt (Kiosk requirement)
  const recordActivity = useCallback(() => {
    setLastActivity(Date.now());
  }, []);

  const handleContinuePlaying = useCallback(() => {
    setShowIdlePrompt(false);
    setLastActivity(Date.now());
  }, []);

  useEffect(() => {
    const checkIdle = setInterval(() => {
      // Only show idle prompt if not on title screen, not on end screen, and prompt not already open
      if (
        gameState.currentSceneId !== 'title' &&
        gameState.currentSceneId !== 'end' &&
        !showIdlePrompt &&
        Date.now() - lastActivity > 60000
      ) {
        setShowIdlePrompt(true);
      }
    }, 2000);

    return () => clearInterval(checkIdle);
  }, [gameState.currentSceneId, lastActivity, showIdlePrompt]);

  // Choices to display (if scene has choices and lines finished or question menu)
  const choicesToDisplay = useMemo((): SceneChoice[] | null => {
    if (!currentScene.choices) return null;

    if (currentScene.type === 'question_menu') {
      // Filter out already questioned suspects or show them with a checkmark
      const allQuestioned =
        gameState.questioned.includes('mum') &&
        gameState.questioned.includes('ravi') &&
        gameState.questioned.includes('aisyah');

      if (allQuestioned) {
        return null; // Move to reach scene
      }

      // If finished reading intro lines (or line index is at last line)
      if (gameState.currentLineIndex >= activeLines.length - 1) {
        return currentScene.choices.map((choice) => {
          let charId: 'mum' | 'ravi' | 'aisyah' = 'mum';
          if (choice.id.includes('ravi')) charId = 'ravi';
          if (choice.id.includes('aisyah')) charId = 'aisyah';
          const isDone = gameState.questioned.includes(charId);

          return {
            ...choice,
            text: isDone ? `✓ ${choice.text} (Questioned)` : choice.text,
          };
        });
      }
    }

    if (currentScene.type === 'choice') {
      if (gameState.currentLineIndex >= activeLines.length - 1) {
        return currentScene.choices;
      }
    }

    return null;
  }, [currentScene, gameState.currentLineIndex, activeLines.length, gameState.questioned]);

  // Hotspots for search scenes
  const currentHotspots = useMemo((): Hotspot[] => {
    if (gameState.currentSceneId === 'act1_room') return ACT1_HOTSPOTS;
    if (gameState.currentSceneId === 'act3_mirror') return ACT3_HOTSPOTS;
    return [];
  }, [gameState.currentSceneId]);

  const isSearchScene = currentScene.type === 'search' && currentHotspots.length > 0;

  // Search progression: check how many clues in the current search scene are discovered
  const searchSceneCluesFound = useMemo(() => {
    if (!isSearchScene) return [];
    return currentHotspots
      .map((h) => h.clueId)
      .filter((clueId) => gameState.clues.includes(clueId));
  }, [isSearchScene, currentHotspots, gameState.clues]);

  const canProceedFromSearch =
    isSearchScene && searchSceneCluesFound.length >= currentHotspots.length;

  // Handle hotspot inspection
  const handleSelectHotspot = (hotspot: Hotspot) => {
    recordActivity();
    // Add clue to collected list if not already present
    if (!gameState.clues.includes(hotspot.clueId)) {
      setGameState((prev) => ({
        ...prev,
        clues: [...prev.clues, hotspot.clueId],
      }));
    }

    // If inspecting the phone in bedroom, open interactive phone interface
    if (hotspot.id === 'hs_phone') {
      setIsPhoneInspectOpen(true);
    }

    setActiveInspection({ hotspot, lineIndex: 0 });
  };

  const handleAdvanceInspection = () => {
    recordActivity();
    if (!activeInspection) return;
    if (activeInspection.lineIndex < activeInspection.hotspot.examineLines.length - 1) {
      setActiveInspection((prev) =>
        prev ? { ...prev, lineIndex: prev.lineIndex + 1 } : null
      );
    } else {
      setActiveInspection(null);
    }
  };

  const handleCloseInspection = () => {
    recordActivity();
    setActiveInspection(null);
  };

  // Handle Choice Selection
  const handleSelectChoice = (choice: SceneChoice) => {
    recordActivity();

    // If Shove was chosen in Act 2, execute screen shake + flash!
    if (choice.id === 'shove') {
      setIsShaking(true);
      setIsFlashing(true);
      setTimeout(() => setIsShaking(false), 500);
      setTimeout(() => setIsFlashing(false), 600);
    }

    // Set flags
    const updatedFlags = { ...gameState.flags };
    if (choice.setFlags) {
      if (typeof choice.setFlags.shoved === 'boolean') {
        updatedFlags.shoved = choice.setFlags.shoved;
      }
    }

    // Track clues & questioned
    const updatedClues = [...gameState.clues];
    if (choice.addClue && !updatedClues.includes(choice.addClue)) {
      updatedClues.push(choice.addClue);
    }

    const updatedQuestioned = [...gameState.questioned];
    if (choice.id === 'q_mum' && !updatedQuestioned.includes('mum')) updatedQuestioned.push('mum');
    if (choice.id === 'q_ravi' && !updatedQuestioned.includes('ravi')) updatedQuestioned.push('ravi');
    if (choice.id === 'q_aisyah' && !updatedQuestioned.includes('aisyah')) updatedQuestioned.push('aisyah');

    const nextScene = SCENES[choice.nextSceneId];
    setGameState((prev) => ({
      ...prev,
      flags: updatedFlags,
      clues: updatedClues,
      questioned: updatedQuestioned,
      currentSceneId: choice.nextSceneId,
      currentLineIndex: 0,
      mode: nextScene?.mode || prev.mode,
    }));
  };

  // Handle Dialogue Advance (tap on stage or dialogue box)
  const handleAdvance = () => {
    recordActivity();

    // If on title or end or choices are blocking, do not advance via stage tap
    if (currentScene.type === 'title' || currentScene.type === 'end' || choicesToDisplay !== null) {
      return;
    }

    // In act2_suspects when all questioned, advance directly to act2_reach
    if (gameState.currentSceneId === 'act2_suspects') {
      const allQuestioned =
        gameState.questioned.includes('mum') &&
        gameState.questioned.includes('ravi') &&
        gameState.questioned.includes('aisyah');
      if (allQuestioned) {
        jumpToScene('act2_reach');
        return;
      }
    }

    // Normal line advance
    if (gameState.currentLineIndex < activeLines.length - 1) {
      setGameState((prev) => ({
        ...prev,
        currentLineIndex: prev.currentLineIndex + 1,
      }));
    } else {
      // Reached the end of lines for this scene
      // For search scenes, player must discover all clues or click the proceed button rather than an accidental tap
      if (isSearchScene && !canProceedFromSearch) {
        return;
      }

      if (currentScene.nextSceneId) {
        jumpToScene(currentScene.nextSceneId);
      }
    }
  };

  const currentLine = activeLines[gameState.currentLineIndex] || {
    speaker: '',
    text: '',
  };

  // Toggle shoved flag (for debugger)
  const toggleShovedFlag = () => {
    setGameState((prev) => ({
      ...prev,
      flags: { ...prev.flags, shoved: !prev.flags.shoved },
    }));
  };

  const handleCustomImageLoad = (filename: string, url: string) => {
    setCustomImages((prev) => ({ ...prev, [filename]: url }));
  };

  return (
    <main
      className="w-screen h-screen bg-black overflow-hidden relative flex flex-col items-center justify-center cursor-default select-none"
      onClick={recordActivity}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Stage 8 Kiosk Preloader */}
      {!isPreloaded && (
        <KioskPreloader onComplete={() => setIsPreloaded(true)} />
      )}

      {/* 16:9 Letterboxed Stage */}
      <StageContainer
        mode={gameState.mode}
        shaking={isShaking}
        flashing={isFlashing}
      >
        {/* Layer 1: Background */}
        <BackgroundLayer
          sceneId={currentScene.bg}
          customImageSrc={customImages[`${currentScene.bg}.webp`]}
          mode={gameState.mode}
        />

        {/* Layer 2: Characters */}
        {currentScene.characters.map((char) => (
          <CharacterLayer
            key={`${char.id}-${char.position}`}
            id={char.id}
            variant={char.variant || (gameState.mode === 'hallucination' ? 'monster' : 'human')}
            position={char.position}
            customImageSrc={
              customImages[`${char.id}_${char.variant || (gameState.mode === 'hallucination' ? 'monster' : 'human')}.webp`]
            }
          />
        ))}

        {/* Layer 2.5: Stage 3 Search Hotspots (Active during search scenes) */}
        {isSearchScene && (
          <HotspotOverlay
            hotspots={currentHotspots}
            foundClueIds={gameState.clues}
            onSelectHotspot={handleSelectHotspot}
            disabled={activeInspection !== null}
            lastActivityTime={lastActivity}
          />
        )}

        {/* Stage 3 Search HUD Bar */}
        {isSearchScene && (
          <SearchHUD
            sceneTitle={
              gameState.currentSceneId === 'act1_room'
                ? 'ACT 1: BEDROOM INVESTIGATION'
                : 'ACT 3: HALLWAY MIRROR REFLECTION'
            }
            foundClues={searchSceneCluesFound}
            totalClues={currentHotspots.length}
            canProceed={canProceedFromSearch}
            proceedLabel={
              gameState.currentSceneId === 'act1_room'
                ? 'Door Unlocked (Proceed to Act 2)'
                : 'Deductions Ready (Proceed to Act 4)'
            }
            onProceed={() => {
              if (gameState.currentSceneId === 'act1_room') {
                jumpToScene('act2_suspects');
              } else if (gameState.currentSceneId === 'act3_mirror') {
                jumpToScene('act4_deduction');
              }
            }}
          />
        )}

        {/* Layer 3A: Title Screen Overlay */}
        {currentScene.type === 'title' && (
          <TitleScreen
            onStart={() => jumpToScene('act1_room')}
            title={currentScene.titleData?.title}
            subtitle={currentScene.titleData?.subtitle}
            buttonText={currentScene.titleData?.buttonText}
          />
        )}

        {/* Layer 3B: End Screen Overlay */}
        {currentScene.type === 'end' && <EndScreen onPlayAgain={resetGame} />}

        {/* Layer 3B.5: Stage 5 Deduction Board Engine (Act 4 Deduction) */}
        {gameState.currentSceneId === 'act4_deduction' && (
          <DeductionBoard
            collectedClueIds={gameState.clues}
            onCompleteDeduction={() => {
              recordActivity();
              jumpToScene('reveal');
            }}
          />
        )}

        {/* Layer 3B.6: Stage 7 Case File 3D Card Flips */}
        {gameState.currentSceneId === 'casefile' && (
          <CaseFileScreen
            onContinue={() => {
              recordActivity();
              jumpToScene('flashback');
            }}
          />
        )}

        {/* Layer 3C: Dialogue Box (Active when not Title, End, deduction board, or casefile) */}
        {currentScene.type !== 'title' &&
          currentScene.type !== 'end' &&
          gameState.currentSceneId !== 'act4_deduction' &&
          gameState.currentSceneId !== 'casefile' && (
            <DialogueBox
              speaker={currentLine.speaker}
              text={currentLine.text}
              mode={gameState.mode}
              onAdvance={handleAdvance}
              canAdvance={choicesToDisplay === null}
            />
          )}

        {/* Layer 3D: Choices / Question Menu Overlay */}
        {choicesToDisplay && (
          <ChoiceMenu
            prompt={currentScene.choicePrompt}
            choices={choicesToDisplay}
            onSelectChoice={handleSelectChoice}
          />
        )}

        {/* 60s Idle Prompt Modal */}
        {showIdlePrompt && (
          <IdlePromptModal
            onContinue={handleContinuePlaying}
            onReset={resetGame}
            countdownSeconds={15}
          />
        )}

        {/* Stage 3 Hotspot Inspection Dialogue Modal */}
        {activeInspection && (
          <InspectionModal
            hotspot={activeInspection.hotspot}
            currentLineIndex={activeInspection.lineIndex}
            onAdvance={handleAdvanceInspection}
            onClose={handleCloseInspection}
          />
        )}

        {/* Stage 3 Case Evidence Notebook Drawer */}
        {currentScene.type !== 'title' && currentScene.type !== 'end' && (
          <CaseNotebookDrawer
            collectedClueIds={gameState.clues}
            isOpen={isCaseDrawerOpen}
            onOpen={() => setIsCaseDrawerOpen(true)}
            onClose={() => setIsCaseDrawerOpen(false)}
          />
        )}

        {/* Stage 4 Suspect Board Trigger Button (Top-Right under Case Evidence) */}
        {currentScene.type !== 'title' && currentScene.type !== 'end' && (
          <button
            id="suspect-board-trigger"
            onClick={() => setIsSuspectBoardOpen(true)}
            title="Open Suspect Board"
            className="absolute top-22 right-4 z-40 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a1410]/90 hover:bg-[#11241a] border border-[#203a2c] hover:border-amber-500 text-xs font-semibold text-amber-300 backdrop-blur-md shadow-lg transition-all cursor-pointer"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Suspects (4)</span>
          </button>
        )}

        {/* Stage 4 Suspect Board Modal */}
        <SuspectBoard
          questioned={gameState.questioned}
          shoved={gameState.flags.shoved}
          isOpen={isSuspectBoardOpen}
          onClose={() => setIsSuspectBoardOpen(false)}
        />

        {/* Stage 4 Phone Screen Overlay (When inspecting phone in bedroom) */}
        {isPhoneInspectOpen && (
          <PhoneInspectModal onClose={() => setIsPhoneInspectOpen(false)} />
        )}

        {/* Scene-specific action cues (e.g. Act 1 "Open the door", Act 4 "Deduce", etc.) */}
        {gameState.currentSceneId === 'act1_room' &&
          canProceedFromSearch && (
            <div className="absolute bottom-28 right-6 z-40 animate-bounce">
              <button
                onClick={() => jumpToScene('act2_suspects')}
                className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 active:scale-95 text-white font-bold text-lg shadow-[0_0_20px_rgba(16,185,129,0.4)] border border-emerald-400 cursor-pointer"
              >
                <DoorOpen className="w-6 h-6" />
                <span>Open the door</span>
              </button>
            </div>
          )}

        {gameState.currentSceneId === 'reveal' && gameState.currentLineIndex >= activeLines.length - 1 && (
          <div className="absolute bottom-28 right-6 z-40 animate-bounce">
            <button
              onClick={() => jumpToScene('casefile')}
              className="flex items-center gap-3 px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 active:scale-95 text-white font-bold text-lg shadow-[0_0_20px_rgba(16,185,129,0.4)] border border-emerald-400 cursor-pointer"
            >
              <ArrowRight className="w-6 h-6" />
              <span>Open the case file</span>
            </button>
          </div>
        )}

        {/* Asset Inspector (Retained from Stage 1) */}
        <AssetConfirmBar
          currentBg={currentScene.bg}
          onChangeBg={(bg) => {
            setGameState((prev) => ({ ...prev, currentSceneId: prev.currentSceneId }));
          }}
          currentCharacter="ravi"
          onChangeCharacter={() => {}}
          currentVariant={gameState.mode === 'hallucination' ? 'monster' : 'human'}
          onChangeVariant={() => {}}
          currentPosition="center"
          onChangePosition={() => {}}
          onCustomImageLoad={handleCustomImageLoad}
          customImages={customImages}
        />

        {/* Stage 2 Scene Ribbon Controller & Debugger */}
        <SceneRibbon
          gameState={gameState}
          onJumpToScene={jumpToScene}
          onReset={resetGame}
          onToggleShovedFlag={toggleShovedFlag}
          onTriggerIdlePrompt={() => setShowIdlePrompt(true)}
        />

        {/* Current Mode & Scene Pill (Top-Right) */}
        <div className="absolute top-3 right-4 z-30 pointer-events-none flex items-center gap-2">
          <div className="px-2.5 py-1 rounded-full bg-[#0a1410]/80 border border-[#203a2c] text-[10px] font-mono text-emerald-400 tracking-wider">
            SCENE: {gameState.currentSceneId.toUpperCase()}
          </div>
          <div
            className={`px-2.5 py-1 rounded-full border text-[10px] font-mono tracking-wider ${
              gameState.mode === 'hallucination'
                ? 'bg-amber-950/60 border-amber-800/80 text-amber-300'
                : 'bg-emerald-950/60 border-emerald-800/80 text-emerald-300'
            }`}
          >
            {gameState.mode.toUpperCase()}
          </div>
        </div>
      </StageContainer>
    </main>
  );
}
