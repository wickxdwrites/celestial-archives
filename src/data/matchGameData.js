// ===== MATCH GAME — LEVEL CONFIGURATION =====
// Massage & therapy themed emoji pairs
// Grid grows and rules change across levels

// Card symbol pools — massage & therapy themed
const SYMBOL_POOL = [
  '💆', '🧴', '🕯️', '🌿', '💎', '🧘', '🌸', '♨️',
  '🫧', '🪷', '🍃', '🧖', '💐', '☮️', '🌙', '🔔',
  '🪻', '🫐', '🧂', '🌊', '🪬', '🎋', '🧿', '💜',
  '🌺', '🍵', '🪴', '🎐', '🦋', '☁️', '🫶', '✨',
];

// Level definitions
// pairs = number of pairs to match
// cols = grid columns
// timeLimit = seconds (0 = no limit)
// flipBackDelay = ms before unmatched cards flip back
// rule = optional special rule text
export const LEVELS = [
  // Level 1: 2x2 (2 pairs) — tutorial
  { level: 1, pairs: 2, cols: 2, timeLimit: 0, flipBackDelay: 1000, rule: null },
  // Level 2: 2x3 (3 pairs)
  { level: 2, pairs: 3, cols: 3, timeLimit: 0, flipBackDelay: 1000, rule: null },
  // Level 3: 2x4 (4 pairs)
  { level: 3, pairs: 4, cols: 4, timeLimit: 0, flipBackDelay: 900, rule: null },
  // Level 4: 3x4 (6 pairs)
  { level: 4, pairs: 6, cols: 4, timeLimit: 60, flipBackDelay: 900, rule: 'Time limit: 60s' },
  // Level 5: 4x4 (8 pairs)
  { level: 5, pairs: 8, cols: 4, timeLimit: 50, flipBackDelay: 800, rule: 'Time limit: 50s' },
  // Level 6: 4x4 (8 pairs) — faster flip back
  { level: 6, pairs: 8, cols: 4, timeLimit: 45, flipBackDelay: 600, rule: 'Cards flip faster!' },
  // Level 7: 4x5 (10 pairs)
  { level: 7, pairs: 10, cols: 5, timeLimit: 55, flipBackDelay: 600, rule: 'Bigger grid!' },
  // Level 8: 4x6 (12 pairs)
  { level: 8, pairs: 12, cols: 6, timeLimit: 60, flipBackDelay: 500, rule: 'Even bigger!' },
  // Level 9: 5x6 (15 pairs) — tight timer
  { level: 9, pairs: 15, cols: 6, timeLimit: 65, flipBackDelay: 500, rule: 'Stay focused...' },
  // Level 10: 6x6 (18 pairs) — final
  { level: 10, pairs: 18, cols: 6, timeLimit: 70, flipBackDelay: 400, rule: 'The final test!' },
  // Secret Level 11: 6x6 (18 pairs) — ultra fast flip, short timer
  { level: 11, pairs: 18, cols: 6, timeLimit: 50, flipBackDelay: 250, rule: '✨ Secret Level — Blink and you miss it!', secret: true },
];

// Generate shuffled card deck for a level
export function generateDeck(levelIndex) {
  const config = LEVELS[levelIndex];
  if (!config) return [];

  // Pick symbols for this level
  const symbols = SYMBOL_POOL.slice(0, config.pairs);

  // Create pairs
  const cards = [];
  symbols.forEach((sym, i) => {
    cards.push({ id: i * 2, symbol: sym, pairId: i });
    cards.push({ id: i * 2 + 1, symbol: sym, pairId: i });
  });

  // Fisher-Yates shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
}

// Placeholder images per level (user will replace later)
// Each level reveals a different photo
export const LEVEL_IMAGES = [
  { level: 1, src: null, alt: 'Level 1 reward', placeholder: 'linear-gradient(135deg, #e8d5f5 0%, #f5e6d8 50%, #d5e8f0 100%)' },
  { level: 2, src: null, alt: 'Level 2 reward', placeholder: 'linear-gradient(135deg, #f0d5e8 0%, #d5f0e8 50%, #e8f0d5 100%)' },
  { level: 3, src: null, alt: 'Level 3 reward', placeholder: 'linear-gradient(135deg, #d5e0f5 0%, #f5d5e0 50%, #e0f5d5 100%)' },
  { level: 4, src: null, alt: 'Level 4 reward', placeholder: 'linear-gradient(135deg, #f5e0d5 0%, #d5f5e0 50%, #e0d5f5 100%)' },
  { level: 5, src: null, alt: 'Level 5 reward', placeholder: 'linear-gradient(135deg, #e0f5f0 0%, #f5e0f0 50%, #f0f5e0 100%)' },
  { level: 6, src: null, alt: 'Level 6 reward', placeholder: 'linear-gradient(135deg, #f0e0f5 0%, #e0f0f5 50%, #f5f0e0 100%)' },
  { level: 7, src: null, alt: 'Level 7 reward', placeholder: 'linear-gradient(135deg, #d8e8f5 0%, #f5d8e8 50%, #e8f5d8 100%)' },
  { level: 8, src: null, alt: 'Level 8 reward', placeholder: 'linear-gradient(135deg, #f5e8d8 0%, #d8f5e8 50%, #e8d8f5 100%)' },
  { level: 9, src: null, alt: 'Level 9 reward', placeholder: 'linear-gradient(135deg, #e8f5e0 0%, #e0e8f5 50%, #f5e0e8 100%)' },
  { level: 10, src: null, alt: 'Level 10 reward', placeholder: 'linear-gradient(135deg, #f0d8f5 0%, #f5f0d8 50%, #d8f5f0 100%)' },
  { level: 11, src: null, alt: 'Secret reward', placeholder: 'linear-gradient(135deg, #ffd700 0%, #ff69b4 50%, #7b68ee 100%)' },
];
