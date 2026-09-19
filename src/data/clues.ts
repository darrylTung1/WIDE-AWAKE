export interface ClueItem {
  id: string;
  name: string;
  category: 'physical' | 'testimony' | 'mirror' | 'event';
  shortDesc: string;
  fullEvidence: string;
  sceneOrigin: string;
  iconName?: string;
  badgeText?: string;
}

export interface Hotspot {
  id: string;
  name: string;
  clueId: string;
  // Coordinates in percentage (0 - 100) of the stage
  x: number; // left %
  y: number; // top %
  width: number; // width %
  height: number; // height %
  examineLines: { speaker: string; text: string }[];
  hint: string;
  glowColor?: string;
}

// Complete Master Clue Catalog across Acts
export const CLUES_DATABASE: Record<string, ClueItem> = {
  // Act 1: Bedroom Search Clues
  c_phone: {
    id: 'c_phone',
    name: 'Unlocked Phone (34 unread messages)',
    category: 'physical',
    shortDesc: 'Messages from boss & mum asking where you are',
    fullEvidence: 'Group chats, direct messages from Mum and boss since Monday: "Jun where are you? Are you sick? Please reply." Time is 4:12 AM.',
    sceneOrigin: 'Act 1: Bedroom Nightstand',
    badgeText: 'PHYSICAL',
  },
  c_paranoia: {
    id: 'c_paranoia',
    name: 'Locked Door / Nailed Windows',
    category: 'physical',
    shortDesc: 'Deadbolts locked, tape along the window frames',
    fullEvidence: 'The room was fortified from the inside. Tape covers the vents and door crack. The lock was turned by my own hand.',
    sceneOrigin: 'Act 1: Bedroom Doorway',
    badgeText: 'PHYSICAL',
  },
  c_supplies: {
    id: 'c_supplies',
    name: 'Scattered Empty Bottles & Straws',
    category: 'physical',
    shortDesc: 'Foil packets, empty plastic bottles, chemical odor',
    fullEvidence: 'Crushed plastic bottles, discarded foil, cut straws, and a lingering bitter chemical smell. None of this belongs to a burglar.',
    sceneOrigin: 'Act 1: Bedroom Floor',
    badgeText: 'PHYSICAL',
  },

  // Act 2: Testimonies & Action
  t_mum: {
    id: 't_mum',
    name: "Mum's Testimony (Jade Bracelet)",
    category: 'testimony',
    shortDesc: '"You locked your door since Monday. Your heart was pounding."',
    fullEvidence: '"Jun... you locked your door since Monday. Your heart... I could hear it pounding through the door..."',
    sceneOrigin: 'Act 2: Living Room',
    badgeText: 'TESTIMONY',
  },
  t_ravi: {
    id: 't_ravi',
    name: "Ravi's Testimony (Red Cap)",
    category: 'testimony',
    shortDesc: '"You called me at 3 AM saying people were outside."',
    fullEvidence: '"You called me at 3 AM. Said there were people outside your window. Jun... there is no one outside."',
    sceneOrigin: 'Act 2: Living Room',
    badgeText: 'TESTIMONY',
  },
  t_aisyah: {
    id: 't_aisyah',
    name: "Aisyah's Testimony (Yellow Cardigan)",
    category: 'testimony',
    shortDesc: '"You haven\'t eaten since Tuesday. You looked like you were burning."',
    fullEvidence: '"You haven\'t eaten since Tuesday. Your skin was burning up. We brought food. You wouldn\'t unlock."',
    sceneOrigin: 'Act 2: Living Room',
    badgeText: 'TESTIMONY',
  },
  c_shove: {
    id: 'c_shove',
    name: 'Aggression Event (Shoved Ravi)',
    category: 'event',
    shortDesc: 'Violent reaction when a glass of water was offered',
    fullEvidence: 'When the entity in the red cap reached forward with water, I shoved it violently. It fell clutching its wrist.',
    sceneOrigin: 'Act 2: Living Room',
    badgeText: 'EVENT',
  },

  // Act 3: Mirror Hotspots
  m_eyes: {
    id: 'm_eyes',
    name: 'Dilated Pupils & Sunken Sockets',
    category: 'mirror',
    shortDesc: 'Black saucer pupils, dark hollows under the eyes',
    fullEvidence: 'The pupils are dilated so wide the irises are barely visible. Deep, bruised rings encircle the sockets. No sleep for days.',
    sceneOrigin: 'Act 3: Hallway Mirror',
    badgeText: 'MIRROR',
  },
  m_jaw: {
    id: 'm_jaw',
    name: 'Clenched Jaw & Cracked Lips',
    category: 'mirror',
    shortDesc: 'Severe bruxism, dry chapped lips, clenched teeth',
    fullEvidence: 'The jaw muscles are locked in a rigid spasm. Teeth are grinding audibly. Severely dehydrated with dry white residue at the mouth.',
    sceneOrigin: 'Act 3: Hallway Mirror',
    badgeText: 'MIRROR',
  },
  m_hands: {
    id: 'm_hands',
    name: 'Trembling Fingers & Rapid Pulse',
    category: 'mirror',
    shortDesc: 'Fine resting tremor, sweat-soaked palms, racing pulse',
    fullEvidence: 'Uncontrollable tremors in both hands. Fingernails dug raw into the palms. The jugular vein pulses at an alarming rhythm.',
    sceneOrigin: 'Act 3: Hallway Mirror',
    badgeText: 'MIRROR',
  },
};

// Act 1 Hotspots (Bedroom)
export const ACT1_HOTSPOTS: Hotspot[] = [
  {
    id: 'hs_phone',
    name: 'Glowing Phone on Nightstand',
    clueId: 'c_phone',
    x: 18,
    y: 54,
    width: 14,
    height: 18,
    hint: 'A smartphone screen pulses silently in the dark beside the mattress.',
    examineLines: [
      { speaker: '(N)', text: 'The screen is lit. 34 unread messages.' },
      { speaker: '(N)', text: 'Mum: "Jun where are you? Answer me please."' },
      { speaker: '(N)', text: 'My team lead: "Third day missing. We called your emergency contact."' },
      { speaker: '(N)', text: 'Clue added: Unlocked Phone with urgent messages from my family and workplace.' },
    ],
  },
  {
    id: 'hs_door',
    name: 'Fortified Doorway & Deadbolt',
    clueId: 'c_paranoia',
    x: 74,
    y: 28,
    width: 16,
    height: 48,
    hint: 'The bedroom door has heavy duct tape covering every seam and the lock.',
    examineLines: [
      { speaker: '(N)', text: 'The deadbolt is thrown shut. Tape lines the entire perimeter of the door frame.' },
      { speaker: '(N)', text: 'I taped it shut myself. Because I thought someone was trying to pump gas through the vents.' },
      { speaker: '(N)', text: 'Clue added: Fortified Door. Sealed from the inside.' },
    ],
  },
  {
    id: 'hs_supplies',
    name: 'Cluttered Floor & Paraphernalia',
    clueId: 'c_supplies',
    x: 42,
    y: 68,
    width: 22,
    height: 18,
    hint: 'Piles of crushed bottles, cut plastic straws, and burnt foil.',
    examineLines: [
      { speaker: '(N)', text: 'Crushed plastic bottles. Cut straws. Scorched tin foil.' },
      { speaker: '(N)', text: 'A heavy, bitter chemical odor clings to the carpet.' },
      { speaker: '(N)', text: 'Clue added: Ingestion Paraphernalia. This is not the scene of a home invasion.' },
    ],
  },
];

// Act 3 Hotspots (The Mirror)
export const ACT3_HOTSPOTS: Hotspot[] = [
  {
    id: 'hs_eyes',
    name: 'Look closely at the eyes',
    clueId: 'm_eyes',
    x: 43,
    y: 20,
    width: 14,
    height: 14,
    hint: 'Look into the reflection’s eyes.',
    examineLines: [
      { speaker: '(N)', text: 'The pupils fill almost the entire eye. Pure black disks.' },
      { speaker: '(N)', text: 'Dark hollow circles beneath them. The eyes of someone who hasn’t rested in 90 hours.' },
      { speaker: '(N)', text: 'Clue added: Dilated Pupils & Extreme Sleep Deprivation.' },
    ],
  },
  {
    id: 'hs_jaw',
    name: 'Inspect the jaw & mouth',
    clueId: 'm_jaw',
    x: 44,
    y: 35,
    width: 12,
    height: 14,
    hint: 'Examine the lower half of the face in the reflection.',
    examineLines: [
      { speaker: '(N)', text: 'The jaw muscles are locked tight, clenching until the molars ache.' },
      { speaker: '(N)', text: 'Lips are dry and cracked with white dehydration crust at the corners.' },
      { speaker: '(N)', text: 'Clue added: Severe Bruxism & Extreme Dehydration.' },
    ],
  },
  {
    id: 'hs_hands',
    name: 'Inspect the hands & chest',
    clueId: 'm_hands',
    x: 36,
    y: 52,
    width: 28,
    height: 22,
    hint: 'Look at the hands clutching the hallway vanity.',
    examineLines: [
      { speaker: '(N)', text: 'The fingers are trembling uncontrollably against the edge of the mirror frame.' },
      { speaker: '(N)', text: 'The pulse in the neck is hammer-striking at over 150 beats per minute.' },
      { speaker: '(N)', text: 'Clue added: Autonomic Tremors & Tachycardia.' },
    ],
  },
];
