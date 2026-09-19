import { Scene } from '../types';

export const SCENES: Record<string, Scene> = {
  title: {
    id: 'title',
    type: 'title',
    bg: 'bg_bedroom',
    mode: 'hallucination',
    characters: [],
    lines: [],
    nextSceneId: 'act1_room',
    titleData: {
      title: 'WIDE AWAKE',
      subtitle: 'Something is wrong with this house.',
      buttonText: 'Tap to wake up',
    },
  },

  act1_room: {
    id: 'act1_room',
    type: 'search',
    bg: 'bg_bedroom',
    mode: 'hallucination',
    characters: [],
    lines: [
      {
        speaker: '(N)',
        text: "4:12 AM. Something's wrong with this house.",
      },
      {
        speaker: '(N)',
        text: 'I need to investigate the room before I unlock that door. Tap the glowing investigation points.',
      },
    ],
    nextSceneId: 'act2_suspects',
  },

  act2_suspects: {
    id: 'act2_suspects',
    type: 'question_menu',
    bg: 'bg_living',
    mode: 'hallucination',
    characters: [
      { id: 'mum', position: 'left', variant: 'monster' },
      { id: 'ravi', position: 'center', variant: 'monster' },
      { id: 'aisyah', position: 'right', variant: 'monster' },
    ],
    lines: [
      {
        speaker: '(N)',
        text: 'Three things are waiting in the living room.',
      },
      {
        speaker: '(N)',
        text: "One wears Mum's jade bracelet. One wears Ravi's red cap. One wears Aisyah's yellow cardigan.",
      },
      {
        speaker: '(N)',
        text: 'Whatever they are, they know something. Question them.',
      },
    ],
    choices: [
      {
        id: 'q_mum',
        text: 'Question the one with the bracelet (Mum)',
        nextSceneId: 'act2_mum_testimony',
        addClue: 't_mum',
      },
      {
        id: 'q_ravi',
        text: 'Question the one with the cap (Ravi)',
        nextSceneId: 'act2_ravi_testimony',
        addClue: 't_ravi',
      },
      {
        id: 'q_aisyah',
        text: 'Question the one with the cardigan (Aisyah)',
        nextSceneId: 'act2_aisyah_testimony',
        addClue: 't_aisyah',
      },
    ],
  },

  act2_mum_testimony: {
    id: 'act2_mum_testimony',
    type: 'dialogue',
    bg: 'bg_living',
    mode: 'hallucination',
    characters: [{ id: 'mum', position: 'center', variant: 'monster' }],
    lines: [
      {
        speaker: '??? (jade bracelet)',
        text: 'Jun... you locked your door [since Monday]. [Your heart]... I could hear it [pounding through the door]...',
        characterId: 'mum',
      },
      {
        speaker: '(N)',
        text: "Clue recorded: Mum's testimony. It's been listening to me through the door.",
      },
    ],
    nextSceneId: 'act2_suspects',
  },

  act2_ravi_testimony: {
    id: 'act2_ravi_testimony',
    type: 'dialogue',
    bg: 'bg_living',
    mode: 'hallucination',
    characters: [{ id: 'ravi', position: 'center', variant: 'monster' }],
    lines: [
      {
        speaker: '??? (red cap)',
        text: "Look like WHAT? [Jun, it's us.] [Your pupils are huge], bro... [you're drenched in sweat].",
        characterId: 'ravi',
      },
      {
        speaker: '(N)',
        text: "Clue recorded: Ravi's testimony. It's studying my body. Why?",
      },
    ],
    nextSceneId: 'act2_suspects',
  },

  act2_aisyah_testimony: {
    id: 'act2_aisyah_testimony',
    type: 'dialogue',
    bg: 'bg_living',
    mode: 'hallucination',
    characters: [{ id: 'aisyah', position: 'center', variant: 'monster' }],
    lines: [
      {
        speaker: '??? (yellow cardigan)',
        text: '[Ever since that party]... [did someone give you something?] [Did you take something?]',
        characterId: 'aisyah',
      },
      {
        speaker: '(N)',
        text: 'Clue recorded: Aisyah\'s testimony. "Take something." It\'s accusing me.',
      },
    ],
    nextSceneId: 'act2_suspects',
  },

  act2_reach: {
    id: 'act2_reach',
    type: 'choice',
    bg: 'bg_living',
    mode: 'hallucination',
    characters: [{ id: 'ravi', position: 'center', variant: 'monster' }],
    lines: [
      {
        speaker: '(N)',
        text: 'The cap one is coming closer. It is holding something out to me.',
      },
      {
        speaker: '??? (red cap)',
        text: '[Here. Just drink some water.]',
        characterId: 'ravi',
      },
    ],
    choicePrompt: 'How do you react to the cap creature reaching out?',
    choices: [
      {
        id: 'shove',
        text: 'Option A: Shove it away',
        nextSceneId: 'act2_shove_outcome',
        setFlags: { shoved: true },
        addClue: 'c_shove',
      },
      {
        id: 'freeze',
        text: 'Option B: Freeze',
        nextSceneId: 'act2_freeze_outcome',
      },
    ],
  },

  act2_shove_outcome: {
    id: 'act2_shove_outcome',
    type: 'dialogue',
    bg: 'bg_living',
    mode: 'hallucination',
    characters: [{ id: 'aisyah', position: 'right', variant: 'monster' }],
    lines: [
      {
        speaker: '(N)',
        text: 'I lashed out. Ravi crashed back against the furniture and slides out of frame.',
      },
      {
        speaker: '??? (yellow cardigan)',
        text: '[RAVI!]',
        characterId: 'aisyah',
      },
      {
        speaker: '(N)',
        text: 'I run for the hallway.',
      },
    ],
    nextSceneId: 'act3_mirror',
  },

  act2_freeze_outcome: {
    id: 'act2_freeze_outcome',
    type: 'dialogue',
    bg: 'bg_living',
    mode: 'hallucination',
    characters: [{ id: 'ravi', position: 'center', variant: 'monster' }],
    lines: [
      {
        speaker: '(N)',
        text: 'It puts the glass down on the table and steps back.',
      },
      {
        speaker: '??? (red cap)',
        text: "[Okay. It's here when you want it.]",
        characterId: 'ravi',
      },
      {
        speaker: '(N)',
        text: 'I run for the hallway.',
      },
    ],
    nextSceneId: 'act3_mirror',
  },

  act3_mirror: {
    id: 'act3_mirror',
    type: 'search',
    bg: 'bg_hallway',
    mode: 'hallucination',
    characters: [{ id: 'jun', position: 'center', variant: 'human' }],
    lines: [
      {
        speaker: '(N)',
        text: 'The mirror. The thing in it is the only one that looks human.',
      },
      {
        speaker: '(N)',
        text: "Examine the reflection. Something is terribly wrong.",
      },
    ],
    nextSceneId: 'act4_deduction',
  },

  act4_deduction: {
    id: 'act4_deduction',
    type: 'deduction',
    bg: 'bg_hallway',
    mode: 'hallucination',
    characters: [],
    lines: [
      {
        speaker: '(N)',
        text: 'Two questions before everything falls apart.',
      },
      {
        speaker: '(N)',
        text: 'Are the monsters real? What is making me see them this way?',
      },
    ],
    nextSceneId: 'reveal',
    placeholderInfo: 'Act 4: Deduction puzzle engine (Will be built with interactive questions and clue validation in Stage 5).',
  },

  reveal: {
    id: 'reveal',
    type: 'cutscene',
    bg: 'bg_living',
    mode: 'clean',
    characters: [],
    lines: [
      {
        speaker: '(N)',
        text: 'The monster was never in the living room.',
      },
      {
        speaker: '(N)',
        text: 'Jun had been using ice for three days without sleep.',
      },
      {
        speaker: '(N)',
        text: 'The drug turned his home into a trap, and his family into monsters.',
      },
    ],
    nextSceneId: 'casefile',
  },

  casefile: {
    id: 'casefile',
    type: 'casefile',
    bg: 'bg_bedroom',
    mode: 'clean',
    characters: [],
    lines: [
      {
        speaker: '(N)',
        text: 'CASE FILE: What was really happening.',
      },
      {
        speaker: '(N)',
        text: 'Every clue flips to reveal the truth behind the hallucination.',
      },
    ],
    nextSceneId: 'flashback',
    placeholderInfo: 'Case File 3D card flips (Will be built with interactive rotateY flips in Stage 7).',
  },

  flashback: {
    id: 'flashback',
    type: 'cutscene',
    bg: 'bg_living',
    mode: 'clean',
    characters: [
      { id: 'mum', position: 'left', variant: 'human' },
      { id: 'ravi', position: 'center', variant: 'human' },
      { id: 'aisyah', position: 'right', variant: 'human' },
    ],
    lines: [
      {
        speaker: 'AISYAH',
        text: "We called for help. We're staying right here.",
        characterId: 'aisyah',
      },
      {
        speaker: 'MUM',
        text: "You're not alone, Jun.",
        characterId: 'mum',
      },
    ],
    nextSceneId: 'end',
  },

  end: {
    id: 'end',
    type: 'end',
    bg: 'bg_bedroom',
    mode: 'clean',
    characters: [],
    lines: [],
  },
};

export const INITIAL_GAME_STATE = {
  currentSceneId: 'title',
  currentLineIndex: 0,
  mode: 'hallucination' as const,
  clues: [] as string[],
  questioned: [] as ('mum' | 'ravi' | 'aisyah')[],
  flags: {
    shoved: false,
  },
};
