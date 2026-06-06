/**
 * Reef Rush — responsive canvas fishing game
 */

// --- Real fish species: rarity, size tier, palette (cartoon + Vegas accents) ---
const RARITY = {
  common: { id: "common", label: "Common", weight: 52, mult: 1 },
  uncommon: { id: "uncommon", label: "Uncommon", weight: 28, mult: 1.45 },
  rare: { id: "rare", label: "Rare", weight: 12, mult: 2.1 },
  epic: { id: "epic", label: "Epic", weight: 6, mult: 3.3 },
  legendary: { id: "legendary", label: "Legendary", weight: 2, mult: 5.5 },
};

const SIZE = {
  small: { pts: 12, length: 38 },
  medium: { pts: 32, length: 52 },
  large: { pts: 68, length: 72 },
};

const FISH_SPECIES = [
  { id: "northern_anchovy", name: "Northern Anchovy", rarity: "common", size: "small", morph: "silverside", speed: 1.35, hue: 200, colors: ["#4ecdc4", "#0d6b6b", "#b8fff8"] },
  { id: "pacific_sardine", name: "Pacific Sardine", rarity: "common", size: "small", morph: "silverside", speed: 1.28, hue: 218, colors: ["#7eb6ff", "#2a4a9e", "#dce9ff"] },
  { id: "atlantic_herring", name: "Atlantic Herring", rarity: "common", size: "small", morph: "silverside", speed: 1.22, hue: 248, colors: ["#a78bfa", "#4c1d95", "#ede9fe"] },
  { id: "chub_mackerel", name: "Chub Mackerel", rarity: "common", size: "medium", morph: "mackerel", speed: 1.45, hue: 168, colors: ["#34d399", "#065f46", "#d1fae5"] },
  { id: "european_sprat", name: "European Sprat", rarity: "common", size: "small", morph: "silverside", speed: 1.18, hue: 38, colors: ["#fb923c", "#9a3412", "#ffedd5"] },
  { id: "barramundi", name: "Barramundi", rarity: "common", size: "medium", morph: "barramundi", speed: 1.05, hue: 95, colors: ["#a3e635", "#3f6212", "#ecfccb"] },
  { id: "yellowfin_tuna", name: "Yellowfin Tuna", rarity: "uncommon", size: "large", morph: "tuna", speed: 1.85, hue: 210, colors: ["#38bdf8", "#0c4a6e", "#e0f2fe"] },
  { id: "albacore_tuna", name: "Albacore Tuna", rarity: "uncommon", size: "large", morph: "tuna", speed: 1.72, hue: 195, colors: ["#94a3b8", "#334155", "#f1f5f9"] },
  { id: "striped_bass", name: "Striped Bass", rarity: "uncommon", size: "medium", morph: "bass", speed: 1.12, hue: 142, colors: ["#4ade80", "#14532d", "#bbf7d0"] },
  { id: "atlantic_cod", name: "Atlantic Cod", rarity: "uncommon", size: "medium", morph: "cod", speed: 0.78, hue: 205, colors: ["#cbd5e1", "#475569", "#f8fafc"] },
  { id: "red_snapper", name: "Red Snapper", rarity: "uncommon", size: "medium", morph: "snapper", speed: 0.95, hue: 350, colors: ["#f87171", "#7f1d1d", "#fecaca"] },
  { id: "coral_trout_gbr", name: "Coral Trout", rarity: "uncommon", size: "medium", morph: "snapper", speed: 0.88, hue: 12, colors: ["#fb7185", "#881337", "#ffe4e6"] },
  { id: "european_seabass", name: "European Seabass", rarity: "uncommon", size: "medium", morph: "bass", speed: 1.08, hue: 160, colors: ["#5eead4", "#134e4a", "#ccfbf1"] },
  { id: "dolphinfish_mahi", name: "Dolphinfish (Mahi-Mahi)", rarity: "rare", size: "large", morph: "mahi", speed: 1.55, hue: 185, colors: ["#22d3ee", "#15803d", "#fef08a"] },
  { id: "yellowtail_amberjack", name: "Yellowtail Amberjack", rarity: "rare", size: "large", morph: "amberjack", speed: 1.62, hue: 48, colors: ["#facc15", "#854d0e", "#fef9c3"] },
  { id: "atlantic_halibut", name: "Atlantic Halibut", rarity: "rare", size: "large", morph: "halibut", speed: 0.62, hue: 215, colors: ["#9ca3af", "#374151", "#f3f4f6"] },
  { id: "australian_blacktip", name: "Australian Blacktip Shark", rarity: "rare", size: "large", morph: "reefshark", speed: 1.52, hue: 210, colors: ["#64748b", "#0f172a", "#cbd5e1"] },
  { id: "blue_marlin", name: "Blue Marlin", rarity: "epic", size: "large", morph: "marlin", speed: 2.05, hue: 258, colors: ["#6366f1", "#1e1b4b", "#c7d2fe"] },
  { id: "swordfish", name: "Swordfish", rarity: "epic", size: "large", morph: "swordfish", speed: 1.95, hue: 230, colors: ["#818cf8", "#312e81", "#e0e7ff"] },
  { id: "giant_trevally", name: "Giant Trevally", rarity: "epic", size: "large", morph: "trevally", speed: 1.78, hue: 32, colors: ["#d97706", "#422006", "#fde68a"] },
  { id: "atlantic_bluefin", name: "Atlantic Bluefin Tuna", rarity: "legendary", size: "large", morph: "bluefin", speed: 1.68, hue: 222, colors: ["#1d4ed8", "#0f172a", "#93c5fd"] },
  { id: "great_barracuda", name: "Great Barracuda", rarity: "legendary", size: "large", morph: "barracuda", speed: 2.2, hue: 280, colors: ["#c084fc", "#3b0764", "#f3e8ff"] },
  { id: "great_hammerhead", name: "Great Hammerhead Shark", rarity: "legendary", size: "large", morph: "hammerhead", speed: 1.42, hue: 265, colors: ["#94a3b8", "#1e293b", "#e2e8f0"] },
  { id: "black_seadevil", name: "Black Seadevil", rarity: "common", size: "small", morph: "deepsea", speed: 0.95, hue: 188, colors: ["#172033", "#05070d", "#86efff"] },
  { id: "viperfish", name: "Pacific Viperfish", rarity: "common", size: "medium", morph: "deepsea", speed: 1.2, hue: 205, colors: ["#243047", "#070b14", "#bdefff"] },
  { id: "hatchetfish", name: "Hatchetfish", rarity: "uncommon", size: "small", morph: "deepsea", speed: 1.38, hue: 220, colors: ["#2c3b55", "#08111f", "#d9f7ff"] },
  { id: "gulper_eel", name: "Gulper Eel", rarity: "rare", size: "large", morph: "deepsea", speed: 0.82, hue: 258, colors: ["#211632", "#05030a", "#c084fc"] },
  { id: "fangtooth", name: "Fangtooth", rarity: "epic", size: "medium", morph: "deepsea", speed: 1.08, hue: 24, colors: ["#2a201b", "#080503", "#fed7aa"] },
  { id: "giant_isopod", name: "Giant Isopod", rarity: "legendary", size: "large", morph: "deepsea", speed: 0.58, hue: 190, colors: ["#475569", "#111827", "#cffafe"] },
  { id: "bonefish", name: "Bonefish", rarity: "common", size: "medium", morph: "skullfish", speed: 1.02, hue: 280, colors: ["#1c1618", "#0a0608", "#ff4040"] },
  { id: "grave_eel", name: "Grave Eel", rarity: "common", size: "large", morph: "skullfish", speed: 0.86, hue: 265, colors: ["#141018", "#050308", "#f87171"] },
  { id: "specter_ray", name: "Specter Ray", rarity: "uncommon", size: "large", morph: "skullfish", speed: 0.7, hue: 255, colors: ["#121018", "#040208", "#ef4444"] },
  { id: "dread_fangtooth", name: "Dread Fangtooth", rarity: "uncommon", size: "medium", morph: "skullfish", speed: 1.12, hue: 8, colors: ["#1a100e", "#060302", "#ff6b6b"] },
  { id: "skeletal_marlin", name: "Skeletal Marlin", rarity: "rare", size: "large", morph: "skullfish", speed: 1.32, hue: 295, colors: ["#16121a", "#050308", "#e879f9"] },
  { id: "ghost_shark", name: "Ghost Shark", rarity: "rare", size: "large", morph: "skullfish", speed: 1.2, hue: 248, colors: ["#0e1216", "#020306", "#fca5a5"] },
  { id: "abyss_lantern", name: "Abyss Lantern", rarity: "epic", size: "medium", morph: "skullfish", speed: 0.92, hue: 12, colors: ["#180c0c", "#040202", "#ff3333"] },
  { id: "leviathan_skull", name: "Leviathan Skull", rarity: "legendary", size: "large", morph: "skullfish", speed: 0.62, hue: 200, colors: ["#0c1418", "#020406", "#67e8f9"] },
];

const SKULL_SHOALS_FISH_IDS = [
  "bonefish",
  "grave_eel",
  "specter_ray",
  "dread_fangtooth",
  "skeletal_marlin",
  "ghost_shark",
  "abyss_lantern",
  "leviathan_skull",
];

const RODS = [
  {
    id: "bamboo",
    name: "Bamboo Reef Rod",
    desc: "Tight sweet spot — skill pays off.",
    catchRadius: 30,
    rareAssist: 0,
    visual: {
      lineMain: "rgba(72, 52, 32, 0.9)",
      lineSheen: "rgba(220, 190, 140, 0.28)",
      lineW: 1.45,
      sheenW: 0.62,
      reelBody: "#5c4033",
      reelBand: "#8b6914",
      ringIdle: "rgba(94, 234, 212, 0.22)",
      ringSnag: "rgba(255, 213, 74, 0.52)",
      hookMetal: "#9ca3af",
      hookBarb: "#b91c1c",
      hookScale: 1,
      tipGlow: "rgba(255, 200, 120, 0.15)",
    },
  },
  {
    id: "chrome",
    name: "Chrome Spinner Rod",
    desc: "Wider hook window; slight edge on rare fish.",
    catchRadius: 38,
    rareAssist: 0.12,
    visual: {
      lineMain: "rgba(148, 163, 184, 0.95)",
      lineSheen: "rgba(255, 255, 255, 0.42)",
      lineW: 1.65,
      sheenW: 0.75,
      reelBody: "#475569",
      reelBand: "#cbd5e1",
      ringIdle: "rgba(147, 197, 253, 0.32)",
      ringSnag: "rgba(255, 255, 255, 0.55)",
      hookMetal: "#e2e8f0",
      hookBarb: "#1e293b",
      hookScale: 1.05,
      tipGlow: "rgba(186, 230, 253, 0.2)",
    },
  },
  {
    id: "golden",
    name: "Golden Luxor Rod",
    desc: "Vegas-wide radius; best odds when legends swim by.",
    catchRadius: 46,
    rareAssist: 0.22,
    visual: {
      lineMain: "rgba(202, 138, 4, 0.92)",
      lineSheen: "rgba(255, 248, 200, 0.55)",
      lineW: 2,
      sheenW: 0.85,
      reelBody: "#a16207",
      reelBand: "#fde047",
      ringIdle: "rgba(253, 224, 71, 0.35)",
      ringSnag: "rgba(255, 213, 74, 0.62)",
      hookMetal: "#fcd34d",
      hookBarb: "#7f1d1d",
      hookScale: 1.18,
      tipGlow: "rgba(255, 213, 74, 0.28)",
    },
  },
  {
    id: "light",
    name: "Light Rod",
    desc: "Built-in deep-sea lamp — best choice for the Mariana Trench.",
    catchRadius: 36,
    rareAssist: 0.08,
    lightRadiusMult: 1.55,
    visual: {
      lineMain: "rgba(103, 232, 249, 0.95)",
      lineSheen: "rgba(236, 254, 255, 0.62)",
      lineW: 1.75,
      sheenW: 0.8,
      reelBody: "#155e75",
      reelBand: "#67e8f9",
      ringIdle: "rgba(103, 232, 249, 0.38)",
      ringSnag: "rgba(190, 255, 255, 0.72)",
      hookMetal: "#cffafe",
      hookBarb: "#0891b2",
      hookScale: 1.08,
      tipGlow: "rgba(103, 232, 249, 0.36)",
    },
  },
  {
    id: "wide_net",
    name: "Wide Net Rod",
    desc: "Huge hook window — great for catching more fish fast.",
    catchRadius: 54,
    rareAssist: 0.05,
    visual: {
      lineMain: "rgba(45, 212, 191, 0.95)",
      lineSheen: "rgba(204, 251, 241, 0.5)",
      lineW: 1.9,
      sheenW: 0.82,
      reelBody: "#0f766e",
      reelBand: "#5eead4",
      ringIdle: "rgba(45, 212, 191, 0.36)",
      ringSnag: "rgba(153, 246, 228, 0.7)",
      hookMetal: "#99f6e4",
      hookBarb: "#115e59",
      hookScale: 1.14,
      tipGlow: "rgba(45, 212, 191, 0.25)",
    },
  },
  {
    id: "legend",
    name: "Legend Seeker Rod",
    desc: "Smaller target, but the strongest rare-fish odds.",
    catchRadius: 34,
    rareAssist: 0.34,
    visual: {
      lineMain: "rgba(192, 132, 252, 0.95)",
      lineSheen: "rgba(243, 232, 255, 0.52)",
      lineW: 1.7,
      sheenW: 0.76,
      reelBody: "#6b21a8",
      reelBand: "#c084fc",
      ringIdle: "rgba(192, 132, 252, 0.35)",
      ringSnag: "rgba(233, 213, 255, 0.72)",
      hookMetal: "#e9d5ff",
      hookBarb: "#581c87",
      hookScale: 1.04,
      tipGlow: "rgba(192, 132, 252, 0.28)",
    },
  },
  {
    id: "titan",
    name: "Titan Trawler Rod",
    desc: "Heavy-duty all-rounder — wide reach and solid rare odds.",
    catchRadius: 44,
    rareAssist: 0.18,
    visual: {
      lineMain: "rgba(248, 113, 113, 0.92)",
      lineSheen: "rgba(254, 202, 202, 0.45)",
      lineW: 2.1,
      sheenW: 0.88,
      reelBody: "#7f1d1d",
      reelBand: "#f87171",
      ringIdle: "rgba(248, 113, 113, 0.32)",
      ringSnag: "rgba(254, 202, 202, 0.68)",
      hookMetal: "#fecaca",
      hookBarb: "#450a0a",
      hookScale: 1.2,
      tipGlow: "rgba(248, 113, 113, 0.23)",
    },
  },
];

const ROD_PRICE = 1000;
const FREE_ROD_ID = "bamboo";

/** Bait: standard is unlimited; premium types are sold in packs and use one piece each round you start with them equipped. */
const BAITS = [
  {
    id: "standard",
    name: "Standard lure",
    desc: "Ship stock — no bonus, unlimited uses.",
    price: 0,
    packSize: 0,
    consumesOnRound: false,
    catchRadiusMult: 1,
    rareAssistAdd: 0,
    lightRadiusMult: 1,
  },
  {
    id: "nightcrawler",
    name: "Nightcrawler tub",
    desc: "Chunky bait — wider hook reach.",
    price: 26,
    packSize: 1,
    consumesOnRound: true,
    catchRadiusMult: 1.25,
    rareAssistAdd: 0.05,
    lightRadiusMult: 1,
  },
  {
    id: "shrimp",
    name: "Brined shrimp",
    desc: "Flashy scent — strong odds on rare fish.",
    price: 44,
    packSize: 1,
    consumesOnRound: true,
    catchRadiusMult: 1.16,
    rareAssistAdd: 0.2,
    lightRadiusMult: 1,
  },
  {
    id: "glow_jelly",
    name: "Glow jelly jar",
    desc: "Bioluminescent bait — lights up a much wider area.",
    price: 64,
    packSize: 1,
    consumesOnRound: true,
    catchRadiusMult: 1.12,
    rareAssistAdd: 0.11,
    lightRadiusMult: 2.6,
  },
  {
    id: "squid_ink",
    name: "Squid ink cloud",
    desc: "Premium cloud — big window and rare-fish boost.",
    price: 88,
    packSize: 1,
    consumesOnRound: true,
    catchRadiusMult: 1.34,
    rareAssistAdd: 0.26,
    lightRadiusMult: 1,
  },
  {
    id: "golden_chum",
    name: "Golden chum bucket",
    desc: "High-roller mix — huge reach, best rare odds.",
    price: 145,
    packSize: 1,
    consumesOnRound: true,
    catchRadiusMult: 1.46,
    rareAssistAdd: 0.34,
    lightRadiusMult: 1,
  },
];

const META_KEY = "reefRushMeta_v1";
const INTRO_SEEN_KEY = "reefRushIntroSeen_v1";
const SHOP_GUIDE_SEEN_KEY = "reefRushShopGuideSeen_v1";

const TREASURE_CHESTS_TO_UNLOCK_ADVENTURE = 20;
const SECRET_TREASURE_CHEST_GRANT = 19;
const ADVENTURE_MAIN_LEVEL_COUNT = 15;
const ADVENTURE_BONUS_LEVEL_COUNT = 5;
const ADVENTURE_ICE_LEVEL_COUNT = 5;
const ADVENTURE_LEVEL_COUNT =
  ADVENTURE_MAIN_LEVEL_COUNT + ADVENTURE_BONUS_LEVEL_COUNT + ADVENTURE_ICE_LEVEL_COUNT;
/** Index of Treasure Cove (level 15) — clearing it unlocks bonus voyages. */
const TREASURE_COVE_INDEX = ADVENTURE_MAIN_LEVEL_COUNT - 1;
/** Index of Legend's Gate (level 20) — clearing it unlocks ice voyages. */
const LEGENDS_GATE_INDEX = ADVENTURE_MAIN_LEVEL_COUNT + ADVENTURE_BONUS_LEVEL_COUNT - 1;
const ADVENTURE_ICE_START_INDEX = ADVENTURE_MAIN_LEVEL_COUNT + ADVENTURE_BONUS_LEVEL_COUNT;

const ADVENTURE_SECTION_PIRATES_PATH = "Pirates Path";
const ADVENTURE_SECTION_GOLD_QUEST = "Gold Quest";
const ADVENTURE_SECTION_FROZEN_SEA = "Frozen Sea";
/** Extra round time for Frozen Sea voyages (easier cold levels). */
const ADVENTURE_ICE_ROUND_BONUS_MS = 7_000;

const TREASURE_CINEMATIC_ANTICIPATE_MS = 800;
const TREASURE_CINEMATIC_FLY_MS = 2400;
const TREASURE_CINEMATIC_OPEN_MS = 1600;
const TREASURE_CINEMATIC_HOLD_MS = 1400;

/** Logical map height for trail SVG coords (matches stretched parchment art). */
const ADVENTURE_MAP_HEIGHT = 2200;

/** Section bands on the chart — top/height are % of the map board. */
const ADVENTURE_MAP_SECTIONS = {
  pirates: {
    id: "pirates",
    label: ADVENTURE_SECTION_PIRATES_PATH,
    startIndex: 0,
    endIndex: ADVENTURE_MAIN_LEVEL_COUNT - 1,
    topPct: 50,
    heightPct: 48,
  },
  gold: {
    id: "gold",
    label: ADVENTURE_SECTION_GOLD_QUEST,
    startIndex: ADVENTURE_MAIN_LEVEL_COUNT,
    endIndex: ADVENTURE_ICE_START_INDEX - 1,
    topPct: 34,
    heightPct: 24,
  },
  ice: {
    id: "ice",
    label: ADVENTURE_SECTION_FROZEN_SEA,
    startIndex: ADVENTURE_ICE_START_INDEX,
    endIndex: ADVENTURE_LEVEL_COUNT - 1,
    topPct: 6,
    heightPct: 32,
  },
};

function buildAdventureMapNodeLayout() {
  const layout = [];
  const piratesX = [50, 26, 74, 28, 72, 30, 70, 32, 68, 34, 66, 36, 64, 38, 50];
  for (let i = 0; i < ADVENTURE_MAIN_LEVEL_COUNT; i++) {
    layout.push({
      x: piratesX[i],
      y: 93.5 - (i / Math.max(1, ADVENTURE_MAIN_LEVEL_COUNT - 1)) * 35,
      section: "pirates",
    });
  }
  const goldX = [62, 38, 66, 34, 50];
  for (let i = 0; i < ADVENTURE_BONUS_LEVEL_COUNT; i++) {
    layout.push({
      x: goldX[i],
      y: 55 - i * 3,
      section: "gold",
    });
  }
  const iceX = [36, 64, 38, 62, 50];
  for (let i = 0; i < ADVENTURE_ICE_LEVEL_COUNT; i++) {
    layout.push({
      x: iceX[i],
      y: 40 - i * 6,
      section: "ice",
    });
  }
  return layout;
}

/** Candy Crush–style zigzag positions on the treasure chart (% of map board). */
const ADVENTURE_MAP_NODE_LAYOUT = buildAdventureMapNodeLayout();

const ADVENTURE_MAP_PLACES = [
  "Skull Shoals",
  "Mariner's Rest",
  "Golden Atoll",
  "Serpent Strait",
  "Doubloon Bay",
  "Compass Cay",
  "Kraken's Teeth",
  "Palmwood Harbor",
  "Emerald Lagoon",
  "Lava Falls",
  "Stormbreak Isle",
  "Treasurehorn Peak",
  "Leviathan Deep",
  "Captain's Landing",
  "Treasure Cove",
  "Bounty Trench",
  "Molten Maelstrom",
  "Pearl Abyss",
  "Crown Reef",
  "Legend's Gate",
  "Frostbite Fjord",
  "Iceberg Drift",
  "Glacier Maw",
  "Polar Narrows",
  "Aurora Reach",
];

/** Visual theme slug per voyage — matches ADVENTURE_MAP_PLACES order. */
const ADVENTURE_LEVEL_THEMES = [
  "skull-shoals",
  "mariners-rest",
  "golden-atoll",
  "serpent-strait",
  "doubloon-bay",
  "compass-cay",
  "krakens-teeth",
  "palmwood-harbor",
  "emerald-lagoon",
  "lava-falls",
  "stormbreak-isle",
  "treasurehorn-peak",
  "leviathan-deep",
  "captains-landing",
  "treasure-cove",
  "bounty-trench",
  "molten-maelstrom",
  "pearl-abyss",
  "crown-reef",
  "legends-gate",
  "frost-fjord",
  "iceberg-drift",
  "glacier-maw",
  "polar-narrows",
  "aurora-reach",
];

function adventureMapSceneSvg(themeId, idSuffix = "") {
  const sid = String(idSuffix).replace(/[^a-z0-9-]/gi, "") || "map";
  const scenes = {
    "skull-shoals": `<svg class="adventure-map-node__scene" viewBox="0 0 72 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="72" height="52" fill="#0a1018"/>
      <rect y="0" width="72" height="20" fill="#121018" opacity="0.9"/>
      <path d="M36 6 Q54 6 60 16 Q64 24 60 32 Q56 38 52 42 Q48 46 36 48 Q24 46 20 42 Q16 38 12 32 Q8 24 12 16 Q18 6 36 6 Z" fill="#2a2018" stroke="#3d3028" stroke-width="0.8"/>
      <ellipse cx="26" cy="22" rx="7" ry="8" fill="#0a0e14"/>
      <ellipse cx="46" cy="22" rx="7" ry="8" fill="#0a0e14"/>
      <circle cx="26" cy="22" r="2.2" fill="#22c55e" opacity="0.55"/>
      <circle cx="46" cy="22" r="2.2" fill="#22c55e" opacity="0.55"/>
      <path d="M36 26 L32 34 L40 34 Z" fill="#0a0e14"/>
      <path d="M22 40 L24 44 L26 40 L28 44 L30 40 L32 44 L34 40 L36 44 L38 40 L40 44 L42 40 L44 44 L46 40 L48 44 L50 40" fill="none" stroke="#d4c8bc" stroke-width="1.1" stroke-linecap="round"/>
      <path d="M34 8 L36 2 L38 8" fill="none" stroke="#1a1210" stroke-width="0.9"/>
      <rect x="4" y="38" width="7" height="12" rx="2" fill="#3a3838" stroke="#2a2828" stroke-width="0.6"/>
      <path d="M7.5 38 L7.5 32 M4.5 35 L10.5 35" stroke="#4a4848" stroke-width="1" stroke-linecap="round"/>
      <rect x="61" y="36" width="7" height="14" rx="2" fill="#3a3838" stroke="#2a2828" stroke-width="0.6"/>
      <path d="M64.5 36 L64.5 30 M61.5 33 L67.5 33" stroke="#4a4848" stroke-width="1" stroke-linecap="round"/>
      <ellipse cx="18" cy="46" rx="5" ry="2" fill="#1a1410"/>
      <circle cx="17" cy="44.5" r="2.8" fill="#e0d4c8" stroke="#5a4840" stroke-width="0.5"/>
      <circle cx="16.2" cy="44" r="0.7" fill="#0a0808"/>
      <circle cx="17.8" cy="44" r="0.7" fill="#0a0808"/>
      <path d="M54 46 Q56 42 58 46" fill="none" stroke="#a89888" stroke-width="0.7"/>
      <path d="M60 46 Q62 42 64 46" fill="none" stroke="#a89888" stroke-width="0.7"/>
    </svg>`,
    "mariners-rest": `<svg class="adventure-map-node__scene" viewBox="0 0 72 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="72" height="52" fill="#4a6a8a"/>
      <path d="M0 36 Q18 32 36 36 T72 36 L72 52 L0 52 Z" fill="#3a5870"/>
      <path d="M0 40 Q20 37 36 40 T72 40" fill="none" stroke="#6a90b0" stroke-width="1" opacity="0.6"/>
      <path d="M12 8 Q36 2 60 8 Q54 14 36 12 Q18 14 12 8" fill="#d4c8a8" opacity="0.85"/>
      <circle cx="56" cy="10" r="5" fill="#f0e8c8" stroke="#c4b888" stroke-width="0.8"/>
      <path d="M36 18 L36 38 M28 38 L44 38 M32 38 L36 28 L40 38" fill="none" stroke="#c8b880" stroke-width="2" stroke-linecap="round"/>
      <circle cx="36" cy="18" r="2" fill="#c8b880"/>
    </svg>`,
    "golden-atoll": `<svg class="adventure-map-node__scene" viewBox="0 0 72 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="72" height="52" fill="#5a9ec0"/>
      <ellipse cx="36" cy="30" rx="28" ry="14" fill="#e8c860" stroke="#c8a030" stroke-width="1.2"/>
      <ellipse cx="36" cy="28" rx="18" ry="8" fill="#f0d878"/>
      <path d="M32 22 L34 14 L36 22 L38 14 L40 22" fill="#2e6a40" stroke="#1e5028" stroke-width="0.6"/>
      <path d="M28 26 L30 18 L32 26" fill="#3a8050" stroke="#1e5028" stroke-width="0.5"/>
      <circle cx="48" cy="32" r="2" fill="#f8e890" opacity="0.8"/>
      <circle cx="24" cy="34" r="1.5" fill="#f8e890" opacity="0.7"/>
    </svg>`,
    "serpent-strait": `<svg class="adventure-map-node__scene" viewBox="0 0 72 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="72" height="52" fill="#3a6878"/>
      <path d="M0 30 Q18 22 36 30 T72 30 L72 52 L0 52 Z" fill="#2a5060"/>
      <path d="M-2 30 Q14 24 26 28 Q38 32 50 26 Q62 20 74 24" fill="none" stroke="#1a4038" stroke-width="4" stroke-linecap="round" opacity="0.32"/>
      <path d="M-2 28 Q14 22 26 26 Q38 30 50 24 Q62 18 74 22" fill="none" stroke="#2a6058" stroke-width="1.2" opacity="0.45"/>
      <ellipse cx="70" cy="23" rx="5" ry="3" fill="#1a3834" opacity="0.45"/>
      <circle cx="71" cy="22.5" r="0.9" fill="#d8cc50" opacity="0.6"/>
      <path d="M4 32 Q22 20 40 30 Q54 38 66 30" fill="none" stroke="#4a8898" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M4 30 Q22 18 40 28 Q54 36 66 28" fill="none" stroke="#3a7068" stroke-width="0.9" opacity="0.55"/>
      <ellipse cx="66" cy="29" rx="4" ry="2.2" fill="#2a5850" opacity="0.5"/>
      <circle cx="67" cy="28.5" r="1" fill="#e8dc50"/>
    </svg>`,
    "doubloon-bay": `<svg class="adventure-map-node__scene" viewBox="0 0 72 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="72" height="52" fill="#68a8c8"/>
      <path d="M0 38 L72 38 L72 52 L0 52 Z" fill="#e8c878"/>
      <ellipse cx="22" cy="32" rx="10" ry="4" fill="#e8c840" stroke="#a88020" stroke-width="1"/>
      <ellipse cx="36" cy="28" rx="11" ry="4.5" fill="#f0d850" stroke="#a88020" stroke-width="1"/>
      <ellipse cx="50" cy="32" rx="10" ry="4" fill="#e8c840" stroke="#a88020" stroke-width="1"/>
      <text x="22" y="33" text-anchor="middle" font-size="6" fill="#8a6010" font-weight="bold">$</text>
      <text x="36" y="29" text-anchor="middle" font-size="6" fill="#8a6010" font-weight="bold">$</text>
      <text x="50" y="33" text-anchor="middle" font-size="6" fill="#8a6010" font-weight="bold">$</text>
      <path d="M0 38 Q36 34 72 38" fill="none" stroke="#6a98b8" stroke-width="1"/>
    </svg>`,
    "compass-cay": `<svg class="adventure-map-node__scene" viewBox="0 0 72 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="72" height="52" fill="#6a9888"/>
      <ellipse cx="36" cy="38" rx="24" ry="8" fill="#d8c898"/>
      <circle cx="36" cy="24" r="16" fill="#f4ecd8" stroke="#3d3020" stroke-width="1.2"/>
      <path d="M36 10 L38 24 L36 38 L34 24 Z" fill="#b91c1c"/>
      <path d="M22 24 L36 22 L50 24 L36 26 Z" fill="#2e2418"/>
      <circle cx="36" cy="24" r="3" fill="#e8dcc8" stroke="#3d3020" stroke-width="0.8"/>
      <polygon points="36,12 38,22 36,20 34,22" fill="#3d3020"/>
    </svg>`,
    "krakens-teeth": `<svg class="adventure-map-node__scene" viewBox="0 0 72 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="72" height="52" fill="#2a4860"/>
      <path d="M0 40 L72 40 L72 52 L0 52 Z" fill="#1a3048"/>
      <path d="M10 40 L16 18 L22 40 Z" fill="#5a6878" stroke="#2e2418" stroke-width="0.8"/>
      <path d="M28 40 L34 14 L40 40 Z" fill="#6a7888" stroke="#2e2418" stroke-width="0.8"/>
      <path d="M46 40 L52 20 L58 40 Z" fill="#5a6878" stroke="#2e2418" stroke-width="0.8"/>
      <path d="M4 44 Q20 36 36 44 Q52 52 68 44" fill="none" stroke="#7a2848" stroke-width="2.5" opacity="0.85"/>
      <circle cx="8" cy="42" r="2" fill="#9a3858"/>
      <circle cx="14" cy="40" r="1.5" fill="#9a3858"/>
    </svg>`,
    "palmwood-harbor": `<svg class="adventure-map-node__scene" viewBox="0 0 72 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="72" height="52" fill="#5a98c0"/>
      <path d="M0 36 L72 36 L72 52 L0 52 Z" fill="#c8a878"/>
      <rect x="8" y="28" width="24" height="3" fill="#6a5030"/>
      <line x1="8" y1="31" x2="32" y2="31" stroke="#4a3820" stroke-width="2"/>
      <path d="M14 28 L14 12 Q16 6 18 12 L18 28" fill="none" stroke="#5a4028" stroke-width="1.5"/>
      <path d="M14 14 Q8 10 6 16 Q10 18 14 14" fill="#2e8040" stroke="#1e5028" stroke-width="0.6"/>
      <path d="M14 14 Q20 10 22 16 Q18 18 14 14" fill="#3a9050" stroke="#1e5028" stroke-width="0.6"/>
      <path d="M48 28 L48 10 Q50 4 52 10 L52 28" fill="none" stroke="#5a4028" stroke-width="1.5"/>
      <path d="M48 12 Q42 8 40 14 Q44 16 48 12" fill="#2e8040" stroke="#1e5028" stroke-width="0.6"/>
      <path d="M48 12 Q54 8 56 14 Q52 16 48 12" fill="#3a9050" stroke="#1e5028" stroke-width="0.6"/>
      <path d="M52 36 L68 32 L68 36 Z" fill="#8a6840" stroke="#4a3820" stroke-width="0.6"/>
    </svg>`,
    "emerald-lagoon": `<svg class="adventure-map-node__scene" viewBox="0 0 72 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="72" height="52" fill="#68a898"/>
      <ellipse cx="36" cy="30" rx="26" ry="16" fill="#38a878" stroke="#208858" stroke-width="1.2"/>
      <ellipse cx="36" cy="28" rx="16" ry="10" fill="#50c890" opacity="0.7"/>
      <path d="M36 18 L40 26 L48 26 L42 32 L44 40 L36 35 L28 40 L30 32 L24 26 L32 26 Z" fill="#90f0b0" stroke="#208858" stroke-width="0.8"/>
      <circle cx="36" cy="28" r="4" fill="#c8ffe0" opacity="0.6"/>
    </svg>`,
    "lava-falls": `<svg class="adventure-map-node__scene" viewBox="0 0 72 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="72" height="52" fill="#4a2820"/>
      <path d="M0 38 Q36 34 72 38 L72 52 L0 52 Z" fill="#3a2018"/>
      <path d="M8 38 L18 14 L28 38 Z" fill="#5a4038" stroke="#2e1810" stroke-width="0.8"/>
      <path d="M8 14 L18 6 L28 14 Z" fill="#8a3020" stroke="#5a1808" stroke-width="0.6"/>
      <path d="M44 38 L54 10 L64 38 Z" fill="#5a4038" stroke="#2e1810" stroke-width="0.8"/>
      <path d="M44 10 L54 2 L64 10 Z" fill="#c84818" stroke="#8a2808" stroke-width="0.6"/>
      <path d="M16 20 Q20 28 24 36" fill="none" stroke="#f07030" stroke-width="2" stroke-linecap="round" opacity="0.85"/>
      <path d="M50 16 Q54 26 58 34" fill="none" stroke="#ff9040" stroke-width="2.2" stroke-linecap="round" opacity="0.9"/>
      <ellipse cx="36" cy="40" rx="14" ry="4" fill="#6a5048" opacity="0.7"/>
      <circle cx="54" cy="8" r="2" fill="#ffcc60" opacity="0.8"/>
      <circle cx="58" cy="12" r="1.2" fill="#ffaa40" opacity="0.7"/>
    </svg>`,
    "stormbreak-isle": `<svg class="adventure-map-node__scene" viewBox="0 0 72 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="72" height="52" fill="#3a4868"/>
      <path d="M4 14 Q20 6 36 12 Q52 4 68 14 Q64 22 48 18 Q36 24 24 18 Q8 22 4 14" fill="#586888" opacity="0.9"/>
      <path d="M8 20 Q24 14 40 20 Q56 14 64 20" fill="#687898" opacity="0.7"/>
      <path d="M36 22 L32 34 L38 28 L34 40 L44 30 L40 38 L48 26 Z" fill="#f0e040" stroke="#c8a020" stroke-width="0.8"/>
      <path d="M20 38 L48 38 L52 48 L16 48 Z" fill="#5a6878" stroke="#2e2418" stroke-width="0.8"/>
      <path d="M0 42 Q36 38 72 42 L72 52 L0 52 Z" fill="#2a3858"/>
    </svg>`,
    "treasurehorn-peak": `<svg class="adventure-map-node__scene" viewBox="0 0 72 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="72" height="52" fill="#88b0c8"/>
      <path d="M0 44 L20 44 L36 8 L52 44 L72 44 L72 52 L0 52 Z" fill="#8a7860" stroke="#3d3020" stroke-width="1"/>
      <path d="M28 44 L36 14 L44 44 Z" fill="#e8e0d0" stroke="#3d3020" stroke-width="0.8"/>
      <path d="M34 14 L36 4 L38 14" fill="#f0d860" stroke="#a88020" stroke-width="0.8"/>
      <path d="M32 8 Q36 2 40 8" fill="none" stroke="#f0e880" stroke-width="1"/>
      <path d="M0 44 Q36 40 72 44" fill="none" stroke="#6a8898" stroke-width="1"/>
    </svg>`,
    "leviathan-deep": `<svg class="adventure-map-node__scene" viewBox="0 0 72 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="72" height="52" fill="#0a1830"/>
      <rect y="20" width="72" height="32" fill="#0c2040"/>
      <ellipse cx="36" cy="38" rx="30" ry="8" fill="#102848" opacity="0.8"/>
      <ellipse cx="36" cy="32" rx="22" ry="10" fill="#1a3860" opacity="0.6"/>
      <circle cx="28" cy="30" r="4" fill="#f0f8ff" opacity="0.9"/>
      <circle cx="29" cy="29" r="1.5" fill="#0a1830"/>
      <path d="M8 36 Q20 28 36 34 Q52 40 64 32" fill="none" stroke="#284868" stroke-width="3" opacity="0.7"/>
      <path d="M60 34 L68 32 L64 38 Z" fill="#284868" opacity="0.6"/>
    </svg>`,
    "captains-landing": `<svg class="adventure-map-node__scene" viewBox="0 0 72 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="72" height="52" fill="#6898b8"/>
      <path d="M0 38 L72 38 L72 52 L0 52 Z" fill="#c8a870"/>
      <circle cx="36" cy="24" r="14" fill="none" stroke="#6a5030" stroke-width="2.5"/>
      <circle cx="36" cy="24" r="4" fill="#6a5030"/>
      <line x1="36" y1="10" x2="36" y2="38" stroke="#6a5030" stroke-width="1.5"/>
      <line x1="22" y1="24" x2="50" y2="24" stroke="#6a5030" stroke-width="1.5"/>
      <line x1="26" y1="14" x2="46" y2="34" stroke="#6a5030" stroke-width="1"/>
      <line x1="46" y1="14" x2="26" y2="34" stroke="#6a5030" stroke-width="1"/>
      <path d="M58 12 L58 22 L62 22 L62 12 Z" fill="#b91c1c"/>
      <path d="M58 12 L60 8 L62 12" fill="#b91c1c"/>
    </svg>`,
    "treasure-cove": `<svg class="adventure-map-node__scene" viewBox="0 0 72 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="tcWater-${sid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#1a4858"/>
          <stop offset="100%" stop-color="#0a1828"/>
        </linearGradient>
        <linearGradient id="tcCave-${sid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#2a2820"/>
          <stop offset="100%" stop-color="#12100c"/>
        </linearGradient>
        <linearGradient id="tcRay-${sid}" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stop-color="#ffe8a0" stop-opacity="0.45"/>
          <stop offset="100%" stop-color="#ffc850" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="72" height="52" fill="url(#tcWater-${sid})"/>
      <path d="M0 28 Q36 16 72 28 L72 52 L0 52 Z" fill="#143038" opacity="0.9"/>
      <path d="M4 52 L4 20 Q36 2 68 20 L68 52 Z" fill="url(#tcCave-${sid})"/>
      <path d="M28 2 L32 18 L36 2" fill="#3a3228"/>
      <path d="M40 4 L44 16 L48 3" fill="#3a3228"/>
      <rect x="30" y="0" width="12" height="14" fill="url(#tcRay-${sid})" opacity="0.55"/>
      <path d="M32 0 L36 14 L40 0 Z" fill="url(#tcRay-${sid})" opacity="0.35"/>
      <path d="M46 34 L58 18 L66 36 L58 40 Z" fill="#142028" stroke="#0a1018" stroke-width="0.6"/>
      <path d="M52 18 L54 6 L56 18" stroke="#0a1018" stroke-width="1.2" fill="none"/>
      <path d="M48 12 L58 10" stroke="#0a1018" stroke-width="0.8"/>
      <rect x="10" y="30" width="5" height="14" fill="#384858" opacity="0.7"/>
      <rect x="58" y="28" width="5" height="16" fill="#384858" opacity="0.65"/>
      <ellipse cx="34" cy="42" rx="22" ry="6" fill="#ffc840" opacity="0.25"/>
      <circle cx="22" cy="41" r="2.2" fill="#f0c830" stroke="#a88010" stroke-width="0.5"/>
      <circle cx="30" cy="43" r="2.5" fill="#e8b820" stroke="#a88010" stroke-width="0.5"/>
      <circle cx="38" cy="42" r="2.8" fill="#f0d040" stroke="#a88010" stroke-width="0.5"/>
      <circle cx="46" cy="44" r="2" fill="#e8b820" stroke="#a88010" stroke-width="0.5"/>
      <circle cx="52" cy="41" r="2.3" fill="#f8e050" stroke="#a88010" stroke-width="0.5"/>
      <rect x="28" y="34" width="14" height="9" rx="1" fill="#8a5020" stroke="#5a3010" stroke-width="0.7"/>
      <path d="M28 34 Q35 28 42 34" fill="#a86828" stroke="#5a3010" stroke-width="0.7"/>
      <rect x="30" y="36" width="10" height="1.5" fill="#f0d060"/>
      <rect x="18" y="38" width="9" height="6" rx="1" fill="#7a4818" stroke="#5a3010" stroke-width="0.5"/>
      <circle cx="12" cy="26" r="0.8" fill="#a8d8e8" opacity="0.5"/>
      <circle cx="20" cy="22" r="0.7" fill="#a8d8e8" opacity="0.45"/>
      <circle cx="54" cy="24" r="0.8" fill="#a8d8e8" opacity="0.4"/>
    </svg>`,
    "bounty-trench": `<svg class="adventure-map-node__scene" viewBox="0 0 72 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="72" height="52" fill="#061018"/>
      <ellipse cx="36" cy="30" rx="30" ry="12" fill="#0c1828"/>
      <path d="M12 38 Q36 22 60 38" fill="none" stroke="#3a88c8" stroke-width="2" opacity="0.5"/>
      <circle cx="36" cy="18" r="6" fill="#f0d050" opacity="0.85"/>
      <text x="36" y="20" text-anchor="middle" font-size="7" fill="#5a4010" font-weight="bold">★</text>
    </svg>`,
    "molten-maelstrom": `<svg class="adventure-map-node__scene" viewBox="0 0 72 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="72" height="52" fill="#4a2818"/>
      <path d="M20 42 L28 12 L36 42 Z" fill="#2a1810" stroke="#1a1008" stroke-width="0.8"/>
      <path d="M36 42 L44 10 L52 42 Z" fill="#2a1810"/>
      <ellipse cx="36" cy="14" rx="8" ry="4" fill="#ff9030" opacity="0.9"/>
      <circle cx="30" cy="40" r="2" fill="#ffb040"/>
      <circle cx="42" cy="38" r="1.5" fill="#ffb040"/>
    </svg>`,
    "pearl-abyss": `<svg class="adventure-map-node__scene" viewBox="0 0 72 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="72" height="52" fill="#3898a8"/>
      <ellipse cx="36" cy="34" rx="26" ry="10" fill="#48a8b8"/>
      <circle cx="28" cy="22" r="5" fill="#f8f4f0" stroke="#d8d0c8" stroke-width="0.8"/>
      <circle cx="44" cy="26" r="4" fill="#fffef8" stroke="#d8d0c8" stroke-width="0.7"/>
      <circle cx="36" cy="30" r="3.5" fill="#fff8f0" opacity="0.9"/>
    </svg>`,
    "crown-reef": `<svg class="adventure-map-node__scene" viewBox="0 0 72 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="72" height="52" fill="#58a8c8"/>
      <ellipse cx="36" cy="36" rx="28" ry="10" fill="#e8c860"/>
      <path d="M24 28 L28 18 L32 24 L36 14 L40 24 L44 18 L48 28 Z" fill="#f0d050" stroke="#a88020" stroke-width="0.8"/>
      <circle cx="22" cy="38" r="2" fill="#f8e890"/>
      <circle cx="50" cy="36" r="2" fill="#f8e890"/>
    </svg>`,
    "legends-gate": `<svg class="adventure-map-node__scene" viewBox="0 0 72 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="72" height="52" fill="#1a2838"/>
      <path d="M14 52 L14 24 Q36 8 58 24 L58 52 Z" fill="#2a3848" stroke="#c8a030" stroke-width="1.2"/>
      <path d="M28 52 L28 30 L36 22 L44 30 L44 52 Z" fill="#0a1018" opacity="0.6"/>
      <circle cx="36" cy="20" r="5" fill="#ffd700"/>
      <path d="M32 20 L36 14 L40 20 L38 18 L36 20 L34 18 Z" fill="#8a6010"/>
    </svg>`,
    "frost-fjord": `<svg class="adventure-map-node__scene" viewBox="0 0 72 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="72" height="52" fill="#88c8e8"/>
      <path d="M0 30 Q36 22 72 30 L72 52 L0 52 Z" fill="#5898b8"/>
      <path d="M8 38 L14 28 L20 36 L18 42 Z" fill="#e8f8ff" stroke="#a8d8f0" stroke-width="0.6"/>
      <path d="M52 34 L60 22 L66 38 L58 42 Z" fill="#f0faff" stroke="#b8e8ff" stroke-width="0.6"/>
      <path d="M28 40 L34 30 L40 38 L36 44 Z" fill="#dceef8" stroke="#98c8e0" stroke-width="0.5"/>
      <rect x="10" y="44" width="52" height="4" fill="#486878" opacity="0.6"/>
    </svg>`,
    "iceberg-drift": `<svg class="adventure-map-node__scene" viewBox="0 0 72 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="72" height="52" fill="#78b8d8"/>
      <path d="M12 36 L22 14 L32 36 Z" fill="#eefaff" stroke="#a8d8f0" stroke-width="0.7"/>
      <path d="M40 38 L50 18 L62 40 Z" fill="#f8fdff" stroke="#b0e0f8" stroke-width="0.7"/>
      <path d="M24 42 L30 32 L36 42 Z" fill="#dceef8" stroke="#90c0d8" stroke-width="0.5"/>
      <ellipse cx="36" cy="46" rx="28" ry="4" fill="#487888" opacity="0.5"/>
    </svg>`,
    "glacier-maw": `<svg class="adventure-map-node__scene" viewBox="0 0 72 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="72" height="52" fill="#68a8c8"/>
      <path d="M0 52 L0 18 Q18 8 36 14 Q54 8 72 18 L72 52 Z" fill="#d8f0ff" stroke="#98c8e0" stroke-width="0.8"/>
      <path d="M0 52 L0 28 Q36 20 72 28 L72 52 Z" fill="#5898b8" opacity="0.55"/>
      <path d="M30 24 L36 10 L42 24 Z" fill="#f0faff" opacity="0.85"/>
    </svg>`,
    "polar-narrows": `<svg class="adventure-map-node__scene" viewBox="0 0 72 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="72" height="52" fill="#5898b8"/>
      <path d="M0 52 L8 20 Q14 14 18 52 Z" fill="#284858"/>
      <path d="M72 52 L64 18 Q58 12 54 52 Z" fill="#284858"/>
      <path d="M22 38 L28 26 L34 38 Z" fill="#eef8ff" stroke="#a0d0e8" stroke-width="0.6"/>
      <path d="M46 36 L52 24 L58 38 Z" fill="#f4fbff" stroke="#a8d8f0" stroke-width="0.6"/>
      <ellipse cx="36" cy="46" rx="14" ry="3" fill="#386878" opacity="0.5"/>
    </svg>`,
    "aurora-reach": `<svg class="adventure-map-node__scene" viewBox="0 0 72 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="aur-${sid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#88e8c8" stop-opacity="0.5"/>
          <stop offset="50%" stop-color="#88a8f0" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="#4898b8" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="72" height="52" fill="#487898"/>
      <rect width="72" height="28" fill="url(#aur-${sid})"/>
      <path d="M14 40 L22 22 L30 40 Z" fill="#f0faff" stroke="#c0e8ff" stroke-width="0.7"/>
      <path d="M48 38 L56 20 L64 40 Z" fill="#eef8ff" stroke="#b0e0f8" stroke-width="0.7"/>
      <path d="M30 42 L36 32 L42 42 Z" fill="#dceef8" stroke="#98c8e0" stroke-width="0.5"/>
      <circle cx="20" cy="12" r="1.2" fill="#a8f0d0" opacity="0.8"/>
      <circle cx="36" cy="8" r="1" fill="#b8c8ff" opacity="0.75"/>
      <circle cx="52" cy="14" r="1.1" fill="#98e8c8" opacity="0.7"/>
    </svg>`,
  };
  return scenes[themeId] || scenes["skull-shoals"];
}

const adventureSceneSvgCache = new Map();

function cachedAdventureMapSceneSvg(themeId, idSuffix = "") {
  const key = `${themeId}|${idSuffix}`;
  let svg = adventureSceneSvgCache.get(key);
  if (!svg) {
    svg = adventureMapSceneSvg(themeId, idSuffix);
    adventureSceneSvgCache.set(key, svg);
  }
  return svg;
}

/** 0 = none, 1 = partial (near progress), 2 = all map node SVGs. */
let adventureSceneCacheWarmLevel = 0;

const ADVENTURE_MAP_SCENE_LITE =
  '<span class="adventure-map-node__scene adventure-map-node__scene--lite" aria-hidden="true"></span>';

function warmupAdventureSceneCache(forceFull = false) {
  const wantFull = forceFull || !PERF_CHROMEBOOK;
  if (!wantFull && adventureSceneCacheWarmLevel >= 1) return;
  if (wantFull && adventureSceneCacheWarmLevel >= 2) return;

  if (wantFull) {
    for (let i = 0; i < ADVENTURE_LEVEL_COUNT; i++) {
      cachedAdventureMapSceneSvg(getAdventureLevelTheme(i), `n${i}`);
    }
    adventureSceneCacheWarmLevel = 2;
  } else {
    const highest = gameMeta.adventureHighestLevel || 0;
    const end = Math.min(ADVENTURE_LEVEL_COUNT, highest + 4);
    for (let i = 0; i < end; i++) {
      cachedAdventureMapSceneSvg(getAdventureLevelTheme(i), `n${i}`);
    }
    adventureSceneCacheWarmLevel = 1;
  }
  cachedAdventureMapSceneSvg("skull-shoals", "play");
  cachedAdventureMapSceneSvg("treasure-cove", "res");
}

function getAdventureLevelTheme(levelIndex) {
  return ADVENTURE_LEVEL_THEMES[levelIndex] || ADVENTURE_LEVEL_THEMES[0];
}

function getActiveAdventureTheme() {
  return adventureSession ? getAdventureLevelTheme(adventureSession.levelIndex) : null;
}

/** Base reef gameplay (fish pool, spawns) — overrides index rotation when a voyage must not play like Mariana Trench. */
const ADVENTURE_THEME_REEF_ID = {
  "lava-falls": "caribbean",
  "treasure-cove": "caribbean",
  "frost-fjord": "mediterranean",
  "iceberg-drift": "mediterranean",
  "glacier-maw": "mediterranean",
  "polar-narrows": "mediterranean",
  "aurora-reach": "mediterranean",
};

function isSkullShoalsPlay() {
  return Boolean(playing && adventureSession && getAdventureLevelTheme(adventureSession.levelIndex) === "skull-shoals");
}

function pickSkullShoalsSpecies() {
  const scary = FISH_SPECIES.filter((f) => SKULL_SHOALS_FISH_IDS.includes(f.id));
  const weights = { common: 42, uncommon: 30, rare: 16, epic: 8, legendary: 4 };
  const order = ["common", "uncommon", "rare", "epic", "legendary"];
  const rw = order.reduce((a, k) => a + weights[k], 0);
  let roll = Math.random() * rw;
  let chosenRarity = "common";
  for (const id of order) {
    roll -= weights[id];
    if (roll <= 0) {
      chosenRarity = id;
      break;
    }
  }
  const pool = scary.filter((f) => f.rarity === chosenRarity);
  return pool[Math.floor(Math.random() * pool.length)] || scary[0];
}

/** Underwater tint + ambient effect while fishing an adventure voyage. */
const ADVENTURE_PLAY_ATMOSPHERE = {
  "skull-shoals": {
    stops: [
      [0, "rgba(12, 6, 18, 0.5)"],
      [0.45, "rgba(22, 10, 16, 0.38)"],
      [1, "rgba(4, 2, 6, 0.62)"],
    ],
    effect: "skull",
  },
  "mariners-rest": { stops: [[0, "rgba(200, 210, 230, 0.14)"], [1, "rgba(40, 60, 90, 0.18)"]], effect: "moon" },
  "golden-atoll": { stops: [[0, "rgba(255, 220, 120, 0.16)"], [1, "rgba(180, 140, 60, 0.12)"]], effect: "golden-atoll" },
  "serpent-strait": { stops: [[0, "rgba(45, 85, 75, 0.1)"], [0.55, "rgba(30, 60, 55, 0.14)"], [1, "rgba(18, 40, 38, 0.22)"]], effect: "serpent-strait" },
  "doubloon-bay": { stops: [[0, "rgba(140, 190, 220, 0.05)"], [0.5, "rgba(100, 150, 180, 0.06)"], [1, "rgba(255, 220, 130, 0.09)"]], effect: "doubloon-bay" },
  "compass-cay": { stops: [[0, "rgba(120, 150, 130, 0.1)"], [1, "rgba(50, 70, 60, 0.15)"]], effect: "compass-cay" },
  "krakens-teeth": { stops: [[0, "rgba(40, 30, 50, 0.2)"], [1, "rgba(80, 25, 45, 0.28)"]], effect: "krakens-teeth" },
  "palmwood-harbor": { stops: [[0, "rgba(180, 200, 160, 0.1)"], [1, "rgba(210, 180, 100, 0.18)"]], effect: "palmwood-harbor" },
  "emerald-lagoon": { stops: [[0, "rgba(80, 200, 140, 0.14)"], [1, "rgba(30, 120, 80, 0.22)"]], effect: "emerald-lagoon" },
  "lava-falls": {
    stops: [
      [0, "rgba(18, 42, 52, 0.14)"],
      [0.5, "rgba(22, 48, 58, 0.2)"],
      [1, "rgba(14, 32, 40, 0.26)"],
    ],
    effect: "lava-falls",
  },
  "stormbreak-isle": { stops: [[0, "rgba(25, 35, 55, 0.35)"], [1, "rgba(40, 50, 70, 0.2)"]], effect: "stormbreak-isle" },
  "treasurehorn-peak": { stops: [[0, "rgba(160, 170, 185, 0.12)"], [1, "rgba(90, 80, 70, 0.22)"]], effect: "treasurehorn-peak" },
  "leviathan-deep": { stops: [[0, "rgba(5, 15, 35, 0.35)"], [1, "rgba(10, 25, 50, 0.45)"]], effect: "leviathan-deep" },
  "captains-landing": { stops: [[0, "rgba(140, 120, 90, 0.12)"], [1, "rgba(60, 50, 40, 0.18)"]], effect: "captains-landing" },
  "treasure-cove": {
    stops: [
      [0, "rgba(10, 32, 42, 0.22)"],
      [0.45, "rgba(18, 48, 58, 0.18)"],
      [0.72, "rgba(255, 170, 60, 0.06)"],
      [1, "rgba(28, 38, 32, 0.32)"],
    ],
    effect: "treasure-cove",
  },
  "frost-fjord": {
    stops: [
      [0, "rgba(200, 230, 255, 0.12)"],
      [0.5, "rgba(140, 190, 230, 0.14)"],
      [1, "rgba(50, 80, 110, 0.22)"],
    ],
    effect: "frost-fjord",
  },
  "iceberg-drift": {
    stops: [
      [0, "rgba(210, 240, 255, 0.1)"],
      [0.45, "rgba(160, 210, 240, 0.12)"],
      [1, "rgba(45, 75, 105, 0.24)"],
    ],
    effect: "iceberg-drift",
  },
  "glacier-maw": {
    stops: [
      [0, "rgba(220, 245, 255, 0.14)"],
      [0.4, "rgba(170, 215, 245, 0.1)"],
      [1, "rgba(35, 65, 95, 0.26)"],
    ],
    effect: "glacier-maw",
  },
  "polar-narrows": {
    stops: [
      [0, "rgba(190, 225, 250, 0.11)"],
      [0.55, "rgba(130, 175, 215, 0.13)"],
      [1, "rgba(30, 55, 85, 0.28)"],
    ],
    effect: "polar-narrows",
  },
  "aurora-reach": {
    stops: [
      [0, "rgba(160, 240, 210, 0.1)"],
      [0.35, "rgba(140, 180, 240, 0.12)"],
      [0.7, "rgba(100, 160, 220, 0.1)"],
      [1, "rgba(25, 50, 80, 0.26)"],
    ],
    effect: "aurora-reach",
  },
};

/** Sand gradient + speckle tint per voyage seabed. */
const ADVENTURE_THEME_SAND = {
  "skull-shoals": {
    stops: [
      [0, "rgba(30, 22, 28, 0)"],
      [0.28, "rgba(42, 32, 38, 0.28)"],
      [0.72, "rgba(52, 38, 44, 0.48)"],
      [1, "rgba(28, 18, 22, 0.72)"],
    ],
    speck: "rgba(60, 48, 52, 0.22)",
  },
  "mariners-rest": {
    stops: [
      [0, "rgba(180, 190, 210, 0)"],
      [0.35, "rgba(120, 130, 150, 0.2)"],
      [1, "rgba(70, 80, 100, 0.45)"],
    ],
    speck: "rgba(140, 150, 170, 0.18)",
  },
  "golden-atoll": {
    stops: [
      [0, "rgba(255, 230, 160, 0)"],
      [0.35, "rgba(240, 210, 120, 0.28)"],
      [1, "rgba(220, 180, 80, 0.55)"],
    ],
    speck: "rgba(255, 220, 120, 0.28)",
  },
  "serpent-strait": {
    stops: [
      [0, "rgba(40, 80, 70, 0)"],
      [0.4, "rgba(35, 65, 58, 0.25)"],
      [1, "rgba(25, 45, 42, 0.5)"],
    ],
    speck: "rgba(50, 90, 80, 0.2)",
  },
  "doubloon-bay": {
    stops: [
      [0, "rgba(255, 235, 180, 0)"],
      [0.35, "rgba(240, 210, 130, 0.22)"],
      [1, "rgba(215, 175, 85, 0.42)"],
    ],
    speck: "rgba(255, 225, 120, 0.28)",
  },
  "compass-cay": {
    stops: [
      [0, "rgba(220, 200, 160, 0)"],
      [0.4, "rgba(200, 180, 140, 0.22)"],
      [1, "rgba(170, 150, 110, 0.48)"],
    ],
    speck: "rgba(210, 190, 150, 0.2)",
  },
  "krakens-teeth": {
    stops: [
      [0, "rgba(30, 25, 35, 0)"],
      [0.4, "rgba(35, 30, 42, 0.28)"],
      [1, "rgba(22, 18, 28, 0.55)"],
    ],
    speck: "rgba(50, 40, 55, 0.22)",
  },
  "palmwood-harbor": {
    stops: [
      [0, "rgba(210, 180, 130, 0)"],
      [0.35, "rgba(190, 160, 110, 0.24)"],
      [1, "rgba(160, 130, 85, 0.5)"],
    ],
    speck: "rgba(200, 170, 120, 0.22)",
  },
  "emerald-lagoon": {
    stops: [
      [0, "rgba(80, 200, 140, 0)"],
      [0.35, "rgba(60, 170, 120, 0.22)"],
      [1, "rgba(40, 130, 90, 0.48)"],
    ],
    speck: "rgba(70, 180, 130, 0.22)",
  },
  "lava-falls": {
    stops: [
      [0, "rgba(12, 10, 9, 0)"],
      [0.35, "rgba(8, 7, 6, 0.22)"],
      [1, "rgba(4, 3, 3, 0.55)"],
    ],
    speck: "rgba(32, 28, 24, 0.38)",
  },
  "stormbreak-isle": {
    stops: [
      [0, "rgba(60, 70, 90, 0)"],
      [0.4, "rgba(45, 52, 68, 0.28)"],
      [1, "rgba(30, 35, 48, 0.55)"],
    ],
    speck: "rgba(70, 78, 95, 0.2)",
  },
  "treasurehorn-peak": {
    stops: [
      [0, "rgba(140, 130, 120, 0)"],
      [0.4, "rgba(110, 100, 90, 0.24)"],
      [1, "rgba(80, 72, 62, 0.5)"],
    ],
    speck: "rgba(130, 120, 110, 0.2)",
  },
  "leviathan-deep": {
    stops: [
      [0, "rgba(8, 18, 35, 0)"],
      [0.4, "rgba(6, 14, 28, 0.35)"],
      [1, "rgba(4, 8, 18, 0.65)"],
    ],
    speck: "rgba(20, 40, 70, 0.18)",
  },
  "captains-landing": {
    stops: [
      [0, "rgba(200, 175, 130, 0)"],
      [0.35, "rgba(180, 155, 110, 0.24)"],
      [1, "rgba(150, 125, 85, 0.52)"],
    ],
    speck: "rgba(190, 165, 120, 0.22)",
  },
  "treasure-cove": {
    stops: [
      [0, "rgba(255, 230, 160, 0)"],
      [0.32, "rgba(240, 210, 120, 0.24)"],
      [0.68, "rgba(220, 180, 80, 0.42)"],
      [1, "rgba(180, 140, 55, 0.58)"],
    ],
    speck: "rgba(255, 220, 100, 0.32)",
  },
  "frost-fjord": {
    stops: [
      [0, "rgba(200, 230, 245, 0)"],
      [0.35, "rgba(170, 200, 220, 0.24)"],
      [1, "rgba(120, 150, 175, 0.52)"],
    ],
    speck: "rgba(240, 250, 255, 0.32)",
  },
  "iceberg-drift": {
    stops: [
      [0, "rgba(190, 225, 240, 0)"],
      [0.4, "rgba(160, 195, 215, 0.22)"],
      [1, "rgba(110, 140, 165, 0.5)"],
    ],
    speck: "rgba(235, 248, 255, 0.28)",
  },
  "glacier-maw": {
    stops: [
      [0, "rgba(210, 235, 248, 0)"],
      [0.38, "rgba(180, 210, 228, 0.26)"],
      [1, "rgba(130, 160, 185, 0.55)"],
    ],
    speck: "rgba(245, 252, 255, 0.35)",
  },
  "polar-narrows": {
    stops: [
      [0, "rgba(185, 215, 235, 0)"],
      [0.42, "rgba(150, 185, 210, 0.24)"],
      [1, "rgba(95, 125, 155, 0.52)"],
    ],
    speck: "rgba(230, 245, 255, 0.3)",
  },
  "aurora-reach": {
    stops: [
      [0, "rgba(195, 230, 245, 0)"],
      [0.36, "rgba(165, 200, 225, 0.22)"],
      [1, "rgba(105, 135, 165, 0.54)"],
    ],
    speck: "rgba(220, 255, 250, 0.32)",
  },
};

/** Water column palette overrides while on a voyage. */
const ADVENTURE_THEME_REEF_OVERRIDES = {
  "skull-shoals": {
    gradient: ["#0c1018", "#0e1420", "#121820", "#060408"],
    shaft: ["rgba(90, 40, 60, 0.1)", "rgba(90, 40, 60, 0)"],
    silhouette: "rgba(8, 4, 12, 0.78)",
    bubble: "rgba(140, 90, 120, 0.18)",
  },
  "mariners-rest": {
    gradient: ["#1a2838", "#243448", "#2a4058", "#182028"],
    shaft: ["rgba(210, 220, 240, 0.14)", "rgba(210, 220, 240, 0)"],
    silhouette: "rgba(18, 28, 45, 0.72)",
    bubble: "rgba(180, 200, 230, 0.16)",
  },
  "golden-atoll": {
    gradient: ["#3a7898", "#4890b0", "#58a8c0", "#c8a040"],
    shaft: ["rgba(255, 230, 140, 0.18)", "rgba(255, 230, 140, 0)"],
    silhouette: "rgba(40, 80, 60, 0.55)",
    bubble: "rgba(255, 240, 180, 0.2)",
  },
  "serpent-strait": {
    gradient: ["#1e4248", "#265058", "#2e6068", "#1a3838"],
    shaft: ["rgba(70, 140, 115, 0.14)", "rgba(70, 140, 115, 0)"],
    silhouette: "rgba(18, 42, 48, 0.68)",
    bubble: "rgba(90, 180, 150, 0.16)",
  },
  "doubloon-bay": {
    gradient: ["#48a0c0", "#58b8d0", "#68c8d8", "#c8a050"],
    shaft: ["rgba(255, 235, 160, 0.2)", "rgba(255, 235, 160, 0)"],
    silhouette: "rgba(50, 85, 100, 0.42)",
    bubble: "rgba(255, 240, 160, 0.24)",
  },
  "compass-cay": {
    gradient: ["#488878", "#589888", "#68a898", "#405848"],
    shaft: ["rgba(200, 220, 200, 0.12)", "rgba(200, 220, 200, 0)"],
    silhouette: "rgba(30, 50, 45, 0.68)",
    bubble: "rgba(160, 200, 180, 0.15)",
  },
  "krakens-teeth": {
    gradient: ["#141828", "#1a2038", "#222848", "#100818"],
    shaft: ["rgba(120, 40, 60, 0.14)", "rgba(120, 40, 60, 0)"],
    silhouette: "rgba(12, 8, 18, 0.82)",
    bubble: "rgba(160, 80, 100, 0.14)",
  },
  "palmwood-harbor": {
    gradient: ["#4898c0", "#58a8d0", "#68b8d8", "#a88850"],
    shaft: ["rgba(255, 240, 200, 0.14)", "rgba(255, 240, 200, 0)"],
    silhouette: "rgba(40, 70, 50, 0.6)",
    bubble: "rgba(200, 230, 255, 0.18)",
  },
  "emerald-lagoon": {
    gradient: ["#288868", "#38a878", "#48c088", "#186848"],
    shaft: ["rgba(120, 255, 180, 0.16)", "rgba(120, 255, 180, 0)"],
    silhouette: "rgba(15, 60, 45, 0.65)",
    bubble: "rgba(100, 255, 180, 0.2)",
  },
  "lava-falls": {
    gradient: ["#2a6878", "#224858", "#1a3848", "#3a2818"],
    shaft: ["rgba(255, 230, 180, 0.34)", "rgba(255, 230, 180, 0)"],
    silhouette: "rgba(18, 32, 40, 0.32)",
    bubble: "rgba(255, 200, 120, 0.38)",
  },
  "stormbreak-isle": {
    gradient: ["#182030", "#202838", "#283040", "#141820"],
    shaft: ["rgba(120, 130, 160, 0.1)", "rgba(120, 130, 160, 0)"],
    silhouette: "rgba(15, 18, 28, 0.8)",
    bubble: "rgba(140, 150, 180, 0.12)",
  },
  "treasurehorn-peak": {
    gradient: ["#586878", "#687888", "#788898", "#484038"],
    shaft: ["rgba(200, 190, 170, 0.12)", "rgba(200, 190, 170, 0)"],
    silhouette: "rgba(35, 40, 50, 0.75)",
    bubble: "rgba(180, 170, 150, 0.14)",
  },
  "leviathan-deep": {
    gradient: ["#020818", "#040c20", "#061028", "#010408"],
    shaft: ["rgba(40, 80, 160, 0.08)", "rgba(40, 80, 160, 0)"],
    silhouette: "rgba(2, 6, 14, 0.88)",
    bubble: "rgba(60, 100, 180, 0.1)",
  },
  "captains-landing": {
    gradient: ["#4888a8", "#5898b8", "#68a8c8", "#806840"],
    shaft: ["rgba(255, 220, 160, 0.14)", "rgba(255, 220, 160, 0)"],
    silhouette: "rgba(35, 55, 45, 0.65)",
    bubble: "rgba(220, 200, 160, 0.16)",
  },
  "treasure-cove": {
    gradient: ["#1a4858", "#143848", "#102838", "#2a2018"],
    shaft: ["rgba(255, 210, 120, 0.14)", "rgba(255, 210, 120, 0)"],
    silhouette: "rgba(12, 22, 32, 0.55)",
    bubble: "rgba(180, 220, 230, 0.18)",
  },
  "frost-fjord": {
    gradient: ["#98cce8", "#78b4d8", "#5898c0", "#386880"],
    shaft: ["rgba(220, 240, 255, 0.18)", "rgba(220, 240, 255, 0)"],
    silhouette: "rgba(35, 60, 85, 0.42)",
    bubble: "rgba(210, 240, 255, 0.32)",
  },
  "iceberg-drift": {
    gradient: ["#8cc4e4", "#6cacd0", "#5090b8", "#307098"],
    shaft: ["rgba(230, 245, 255, 0.16)", "rgba(230, 245, 255, 0)"],
    silhouette: "rgba(30, 55, 80, 0.44)",
    bubble: "rgba(200, 235, 255, 0.3)",
  },
  "glacier-maw": {
    gradient: ["#a0d4f0", "#80bcd8", "#60a4c8", "#4088a8"],
    shaft: ["rgba(240, 250, 255, 0.2)", "rgba(240, 250, 255, 0)"],
    silhouette: "rgba(40, 65, 90, 0.4)",
    bubble: "rgba(215, 242, 255, 0.34)",
  },
  "polar-narrows": {
    gradient: ["#88c0dc", "#68a8c8", "#4890b0", "#287898"],
    shaft: ["rgba(210, 235, 255, 0.15)", "rgba(210, 235, 255, 0)"],
    silhouette: "rgba(28, 50, 72, 0.48)",
    bubble: "rgba(195, 230, 255, 0.28)",
  },
  "aurora-reach": {
    gradient: ["#90c8e8", "#70b0d8", "#5098c8", "#3080a8"],
    shaft: ["rgba(180, 240, 220, 0.14)", "rgba(180, 220, 255, 0)"],
    silhouette: "rgba(32, 58, 82, 0.42)",
    bubble: "rgba(190, 255, 240, 0.3)",
  },
};

function drawAdventureGoldGlints(now) {
  const t = now * 0.001;
  for (let i = 0; i < 14; i++) {
    const px = ((i * 97 + Math.floor(t * 40 + i * 17)) % 1000) / 1000;
    const py = 0.55 + ((i * 53 + Math.floor(t * 25)) % 400) / 1000;
    const x = px * w;
    const y = waterTop + py * (h - waterTop);
    const r = dpr * (1.2 + (i % 3) * 0.6);
    ctx.fillStyle = `rgba(255, 220, 80, ${0.15 + (i % 4) * 0.06})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawAdventureStormFlash(now) {
  if (Math.sin(now * 0.004) > 0.92) {
    ctx.fillStyle = "rgba(255, 255, 240, 0.12)";
    ctx.fillRect(0, waterTop, w, h - waterTop);
  }
}

function drawBoneJoint(x, y, r, bone, outline) {
  ctx.fillStyle = outline;
  ctx.beginPath();
  ctx.arc(x, y, r * 1.22, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = bone;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

function drawLongBone(x1, y1, x2, y2, lw, bone, shade) {
  ctx.lineCap = "round";
  ctx.strokeStyle = shade;
  ctx.lineWidth = lw * 1.38;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.strokeStyle = bone;
  ctx.lineWidth = lw;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

/** Flat cartoon skull — face-up, lying on the seabed (clipart style). */
function drawCartoonSkullSupine(s, hx, hy, bone, shade, boneDark) {
  const faceY = hy - s * 4;
  ctx.fillStyle = bone;
  ctx.strokeStyle = shade;
  ctx.lineWidth = s * 0.4;
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.ellipse(hx + s * 0.5, faceY, s * 10.5, s * 9.8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(hx - s * 6.5, hy + s * 1.5);
  ctx.quadraticCurveTo(hx - s * 2, hy + s * 5.5, hx + s * 7.5, hy + s * 1.5);
  ctx.quadraticCurveTo(hx + s * 4, hy + s * 6.5, hx - s * 6, hy + s * 5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = boneDark;
  ctx.beginPath();
  ctx.ellipse(hx - s * 3.8, faceY - s * 2.2, s * 4.2, s * 4.8, -0.12, 0, Math.PI * 2);
  ctx.ellipse(hx + s * 4.8, faceY - s * 2.2, s * 4.2, s * 4.8, 0.12, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(hx + s * 0.3, faceY + s * 1.2);
  ctx.lineTo(hx - s * 1.1, faceY + s * 3.8);
  ctx.lineTo(hx + s * 1.7, faceY + s * 3.8);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = bone;
  ctx.strokeStyle = shade;
  ctx.lineWidth = s * 0.22;
  const teeth = 7;
  for (let i = 0; i < teeth; i++) {
    const tx = hx - s * 5.2 + i * s * 1.55;
    ctx.fillRect(tx, hy + s * 2.8, s * 1.15, s * 2.4);
    ctx.strokeRect(tx, hy + s * 2.8, s * 1.15, s * 2.4);
  }

  ctx.strokeStyle = bone;
  ctx.lineWidth = s * 0.34;
  ctx.beginPath();
  ctx.moveTo(hx - s * 6, faceY + s * 0.5);
  ctx.quadraticCurveTo(hx - s * 9.5, faceY - s * 2, hx - s * 8.5, faceY - s * 6);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(hx + s * 7, faceY + s * 0.5);
  ctx.quadraticCurveTo(hx + s * 10.5, faceY - s * 2, hx + s * 9.5, faceY - s * 6);
  ctx.stroke();
}

function drawCartoonRibCageHorizontal(s, x0, x1, spineY, bone, shade) {
  const ribs = 7;
  ctx.lineCap = "round";
  for (let i = 0; i < ribs; i++) {
    const t = i / (ribs - 1);
    const rx = x0 + (x1 - x0) * t;
    const spread = s * (10 - i * 0.45);
    ctx.strokeStyle = shade;
    ctx.lineWidth = s * (1.18 - i * 0.04);
    ctx.beginPath();
    ctx.moveTo(rx, spineY);
    ctx.quadraticCurveTo(rx - s * 2.2, spineY - spread * 0.82, rx - spread, spineY - s * 1.2);
    ctx.stroke();
    ctx.strokeStyle = bone;
    ctx.lineWidth = s * (0.98 - i * 0.035);
    ctx.beginPath();
    ctx.moveTo(rx, spineY);
    ctx.quadraticCurveTo(rx - s * 2.2, spineY - spread * 0.82, rx - spread, spineY - s * 1.2);
    ctx.stroke();
    ctx.strokeStyle = shade;
    ctx.lineWidth = s * (1.12 - i * 0.04);
    ctx.beginPath();
    ctx.moveTo(rx, spineY);
    ctx.quadraticCurveTo(rx + s * 1.6, spineY + spread * 0.5, rx + spread * 0.78, spineY + s * 2.6);
    ctx.stroke();
    ctx.strokeStyle = bone;
    ctx.lineWidth = s * (0.92 - i * 0.035);
    ctx.beginPath();
    ctx.moveTo(rx, spineY);
    ctx.quadraticCurveTo(rx + s * 1.6, spineY + spread * 0.5, rx + spread * 0.78, spineY + s * 2.6);
    ctx.stroke();
  }
  ctx.fillStyle = bone;
  ctx.strokeStyle = shade;
  ctx.lineWidth = s * 0.34;
  ctx.beginPath();
  ctx.roundRect(x0 + s * 3, spineY - s * 4.5, s * 3.2, s * 9.5, s * 1.2);
  ctx.fill();
  ctx.stroke();
}

function drawCartoonPelvisHorizontal(s, px, py, bone, shade) {
  ctx.fillStyle = bone;
  ctx.strokeStyle = shade;
  ctx.lineWidth = s * 0.38;
  ctx.beginPath();
  ctx.moveTo(px - s * 10, py + s * 0.5);
  ctx.quadraticCurveTo(px - s * 5, py + s * 7, px, py + s * 5);
  ctx.quadraticCurveTo(px + s * 5, py + s * 7, px + s * 10, py + s * 0.5);
  ctx.lineTo(px + s * 8, py - s * 3);
  ctx.lineTo(px - s * 8, py - s * 3);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.lineWidth = s * 0.55;
  ctx.beginPath();
  ctx.moveTo(px - s * 4, py - s * 1);
  ctx.lineTo(px + s * 4, py - s * 1);
  ctx.stroke();
}

function drawCartoonHand(x, y, angle, s, bone, shade) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  drawBoneJoint(0, 0, s * 0.62, bone, shade);
  for (let f = 0; f < 5; f++) {
    const fa = -0.42 + f * 0.21;
    drawLongBone(0, 0, Math.cos(fa) * s * 6, Math.sin(fa) * s * 6, s * 0.4, bone, shade);
  }
  ctx.restore();
}

function drawCartoonFoot(x, y, angle, s, bone, shade) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  drawBoneJoint(0, 0, s * 0.55, bone, shade);
  ctx.fillStyle = bone;
  ctx.strokeStyle = shade;
  ctx.lineWidth = s * 0.34;
  ctx.beginPath();
  ctx.roundRect(s * 0.4, -s * 1.4, s * 5, s * 2.6, s * 0.9);
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function drawSandBurialPatch(s, cx, cy, wide) {
  ctx.fillStyle = "rgba(32, 26, 30, 0.58)";
  ctx.beginPath();
  ctx.ellipse(cx, cy + s * 6, s * wide, s * 11, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(44, 34, 38, 0.48)";
  ctx.beginPath();
  ctx.ellipse(cx, cy + s * 9, s * (wide * 0.82), s * 8, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawLooseBone(bx, by, rot, kind, s, bone, shade) {
  ctx.save();
  ctx.translate(bx, by);
  ctx.rotate(rot);
  if (kind === "femur") drawLongBone(0, 0, s * 22, s * 1.5, s * 1.15, bone, shade);
  else if (kind === "humerus") drawLongBone(0, 0, s * 16, -s * 2, s * 1, bone, shade);
  else if (kind === "tibia") drawLongBone(0, 0, s * 18, s * 0.5, s * 0.88, bone, shade);
  else if (kind === "rib") {
    drawLongBone(0, 0, s * 9, -s * 2, s * 0.95, bone, shade);
  } else if (kind === "vertebra") {
    drawBoneJoint(0, 0, s * 1.15, bone, shade);
    drawLongBone(-s * 0.8, 0, s * 0.8, 0, s * 0.72, bone, shade);
  } else if (kind === "hand") {
    drawCartoonHand(0, 0, 0.2, s, bone, shade);
  }
  ctx.restore();
}

/** Full skeleton lying flat — clipart pose; local +X toward feet, head at negative X. */
function drawSupineSkeletonBody(s, bone, shade, boneDark, opts) {
  const headX = -s * 44;
  const spineY = s * 2;
  const spineStart = -s * 24;
  const spineEnd = s * 26;
  const pelvisX = s * 28;
  const lw = s * 1.28;
  const shoulderX = -s * 16;

  if (opts.head !== false) drawCartoonSkullSupine(s, headX, spineY, bone, shade, boneDark);

  if (opts.neck !== false) {
    drawLongBone(headX + s * 14, spineY, shoulderX + s * 4, spineY, lw * 0.88, bone, shade);
    drawBoneJoint(shoulderX + s * 2, spineY, s * 1.1, bone, shade);
  }

  if (opts.spine !== false) {
    const verts = 9;
    for (let i = 0; i < verts; i++) {
      const vx = spineStart + (i * (spineEnd - spineStart)) / (verts - 1);
      drawBoneJoint(vx, spineY, s * 1.12, bone, shade);
      if (i < verts - 1) {
        const nx = spineStart + ((i + 1) * (spineEnd - spineStart)) / (verts - 1);
        drawLongBone(vx + s * 0.55, spineY, nx - s * 0.55, spineY, lw * 0.78, bone, shade);
      }
    }
  }

  if (opts.ribs !== false) drawCartoonRibCageHorizontal(s, spineStart + s * 1, spineEnd - s * 2, spineY, bone, shade);

  if (opts.pelvis !== false) drawCartoonPelvisHorizontal(s, pelvisX, spineY + s * 1.5, bone, shade);

  if (opts.leftArm !== false) {
    const ex = shoulderX - s * 12;
    const ey = spineY - s * 15;
    drawLongBone(shoulderX, spineY - s * 2, ex, ey, lw, bone, shade);
    drawBoneJoint(ex, ey, s * 1.05, bone, shade);
    const hx = ex - s * 8;
    const hy = ey - s * 10;
    drawLongBone(ex, ey, hx, hy, lw * 0.9, bone, shade);
    drawCartoonHand(hx, hy, -0.95, s, bone, shade);
  }

  if (opts.rightArm !== false) {
    const ex = shoulderX - s * 6;
    const ey = spineY + s * 17;
    drawLongBone(shoulderX, spineY + s * 1, ex, ey, lw, bone, shade);
    drawBoneJoint(ex, ey, s * 1.05, bone, shade);
    const hx = ex - s * 10;
    const hy = ey + s * 8;
    drawLongBone(ex, ey, hx, hy, lw * 0.88, bone, shade);
    drawCartoonHand(hx, hy, 0.55, s, bone, shade);
  }

  if (opts.leftLeg !== false) {
    const kx = pelvisX + s * 16;
    const ky = spineY + s * 3;
    drawLongBone(pelvisX - s * 2, spineY + s * 3, kx, ky, lw, bone, shade);
    drawBoneJoint(kx, ky, s * 1.1, bone, shade);
    const ax = pelvisX + s * 38;
    const ay = spineY + s * 2;
    drawLongBone(kx, ky, ax, ay, lw * 0.95, bone, shade);
    drawCartoonFoot(ax, ay, 0.12, s, bone, shade);
  }

  if (opts.rightLeg !== false) {
    const kx = pelvisX + s * 12;
    const ky = spineY + s * 13;
    drawLongBone(pelvisX + s * 2, spineY + s * 4, kx, ky, lw, bone, shade);
    drawBoneJoint(kx, ky, s * 1.1, bone, shade);
    const ax = pelvisX + s * 34;
    const ay = spineY + s * 19;
    drawLongBone(kx, ky, ax, ay, lw * 0.92, bone, shade);
    drawCartoonFoot(ax, ay, 0.5, s, bone, shade);
  }
}

function drawScatteredBones(s, seed, bone, shade, boneDark) {
  const parts = [
    { k: "femur", x: s * 38, y: s * 16, r: 0.55 },
    { k: "humerus", x: -s * 22, y: s * 22, r: -0.35 },
    { k: "tibia", x: s * 52, y: -s * 8, r: 1.1 },
    { k: "rib", x: s * 8, y: s * 20, r: 0.8 },
    { k: "rib", x: -s * 5, y: s * 18, r: 2.2 },
    { k: "vertebra", x: s * 28, y: s * 12, r: 0 },
    { k: "hand", x: -s * 30, y: s * 8, r: -0.6 },
  ];
  for (let i = 0; i < parts.length; i++) {
    const p = parts[(i + seed) % parts.length];
    drawLooseBone(p.x + (seed % 3) * s * 2, p.y + (i % 2) * s * 3, p.r, p.k, s, bone, shade);
  }
  if (seed % 2 === 0) {
    ctx.save();
    ctx.translate(s * 55, -s * 6);
    ctx.rotate(0.25);
    drawCartoonSkullSupine(s, 0, 0, bone, shade, boneDark);
    ctx.restore();
  }
}

/** Laying-down skeleton remains — full, partial, or scattered on the seabed. */
function drawUnderwaterSkeletonRemain(cx, cy, sc, variant) {
  const bone = "#f5f0e6";
  const shade = "#4e453c";
  const boneDark = "#2a2520";
  const s = dpr * sc;
  const v = variant % 6;

  ctx.save();
  ctx.translate(cx, cy);
  const facing = v === 1 || v === 4 ? -1 : 1;
  ctx.scale(facing, 1);
  const tilt = v === 2 ? 0.06 : v === 5 ? -0.05 : v === 3 ? 0.1 : 0.02;
  ctx.rotate(tilt);

  if (v === 0 || v === 1) {
    drawSupineSkeletonBody(s, bone, shade, boneDark, {});
    drawSandBurialPatch(s, s * 2, s * 10, 52);
  } else if (v === 2) {
    drawSupineSkeletonBody(s, bone, shade, boneDark, { head: false });
    ctx.save();
    ctx.translate(s * 62, -s * 14);
    ctx.rotate(-0.35);
    drawCartoonSkullSupine(s, 0, 0, bone, shade, boneDark);
    ctx.restore();
    drawSandBurialPatch(s, s * 4, s * 11, 48);
  } else if (v === 3) {
    drawSupineSkeletonBody(s, bone, shade, boneDark, {
      head: false,
      leftArm: false,
      rightLeg: false,
      leftLeg: false,
    });
    drawLooseBone(s * 44, s * 18, 0.7, "femur", s, bone, shade);
    drawLooseBone(-s * 28, s * 20, -0.4, "humerus", s, bone, shade);
    drawLooseBone(s * 12, -s * 12, 1.2, "tibia", s, bone, shade);
    ctx.save();
    ctx.translate(-s * 52, -s * 8);
    ctx.rotate(0.5);
    drawCartoonSkullSupine(s, 0, 0, bone, shade, boneDark);
    ctx.restore();
    drawSandBurialPatch(s, 0, s * 12, 42);
  } else if (v === 4) {
    drawScatteredBones(s, 2, bone, shade, boneDark);
    drawSupineSkeletonBody(s, bone, shade, boneDark, {
      head: false,
      ribs: false,
      leftArm: false,
      rightArm: false,
      leftLeg: false,
    });
    drawSandBurialPatch(s, s * 8, s * 14, 38);
  } else {
    drawSupineSkeletonBody(s, bone, shade, boneDark, { leftArm: false, rightArm: false });
    drawLooseBone(-s * 36, -s * 10, -0.25, "humerus", s, bone, shade);
    drawLooseBone(-s * 42, s * 4, 0.15, "hand", s, bone, shade);
    drawLooseBone(s * 20, s * 22, 0.55, "femur", s, bone, shade);
    drawSandBurialPatch(s, s * 2, s * 10, 50);
  }

  ctx.globalAlpha = 0.26;
  ctx.strokeStyle = "rgba(45, 110, 75, 0.65)";
  ctx.lineWidth = s * 0.42;
  for (let k = 0; k < 3; k++) {
    ctx.beginPath();
    ctx.moveTo(-s * 42 + k * s * 18, s * 14);
    ctx.quadraticCurveTo(-s * 48 + k * s * 16, s * 24, -s * 38 + k * s * 20, s * 34);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  ctx.strokeStyle = "rgba(90, 80, 70, 0.32)";
  ctx.lineWidth = s * 0.14;
  ctx.beginPath();
  ctx.moveTo(-s * 20, -s * 12);
  ctx.lineTo(-s * 8, -s * 4);
  ctx.moveTo(s * 24, -s * 10);
  ctx.lineTo(s * 14, -s * 3);
  ctx.stroke();

  ctx.restore();
}

function drawGravestone(cx, baseY, gw, gh, tilt, cracked) {
  ctx.save();
  ctx.translate(cx, baseY);
  ctx.rotate(tilt);
  const w = dpr * gw;
  const ht = dpr * gh;

  ctx.fillStyle = "rgba(42, 40, 44, 0.88)";
  ctx.strokeStyle = "rgba(28, 26, 30, 0.9)";
  ctx.lineWidth = dpr * 1.2;
  ctx.beginPath();
  ctx.moveTo(-w * 0.5, 0);
  ctx.lineTo(-w * 0.5, -ht * 0.72);
  ctx.quadraticCurveTo(-w * 0.5, -ht, 0, -ht);
  ctx.quadraticCurveTo(w * 0.5, -ht, w * 0.5, -ht * 0.72);
  ctx.lineTo(w * 0.5, 0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.strokeStyle = "rgba(60, 58, 62, 0.7)";
  ctx.lineWidth = dpr * 0.8;
  ctx.beginPath();
  ctx.moveTo(0, -ht * 0.82);
  ctx.lineTo(0, -ht * 0.35);
  ctx.moveTo(-w * 0.18, -ht * 0.58);
  ctx.lineTo(w * 0.18, -ht * 0.58);
  ctx.stroke();

  if (cracked) {
    ctx.strokeStyle = "rgba(20, 18, 22, 0.65)";
    ctx.lineWidth = dpr * 0.6;
    ctx.beginPath();
    ctx.moveTo(w * 0.1, -ht * 0.9);
    ctx.lineTo(-w * 0.05, -ht * 0.5);
    ctx.lineTo(w * 0.15, -ht * 0.2);
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(30, 50, 38, 0.35)";
  ctx.beginPath();
  ctx.ellipse(w * 0.35, -ht * 0.25, dpr * 4, dpr * 8, 0.4, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawCrossMarker(cx, baseY, ch) {
  ctx.save();
  ctx.translate(cx, baseY);
  const h = dpr * ch;
  ctx.strokeStyle = "rgba(72, 68, 74, 0.9)";
  ctx.lineWidth = dpr * 2.2;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -h);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(-h * 0.28, -h * 0.62);
  ctx.lineTo(h * 0.28, -h * 0.62);
  ctx.stroke();
  ctx.restore();
}

function drawSkullShoalsGraveyardBed() {
  const sandTop = h - dpr * 92;
  const base = sandTop + dpr * 14;

  const mounds = [
    { x: 0.12, w: 0.09, h: 8 },
    { x: 0.35, w: 0.11, h: 10 },
    { x: 0.58, w: 0.1, h: 9 },
    { x: 0.78, w: 0.08, h: 7 },
  ];
  ctx.fillStyle = "rgba(38, 30, 34, 0.55)";
  for (const m of mounds) {
    ctx.beginPath();
    ctx.ellipse(m.x * w, base - dpr * m.h, w * m.w, dpr * (m.h + 6), 0, 0, Math.PI * 2);
    ctx.fill();
  }

  drawGravestone(w * 0.07, base, 16, 52, -0.06, false);
  drawGravestone(w * 0.2, base, 20, 64, 0.04, true);
  drawCrossMarker(w * 0.34, base, 58);
  drawGravestone(w * 0.48, base, 22, 70, -0.03, true);
  drawCrossMarker(w * 0.62, base, 48);
  drawGravestone(w * 0.76, base, 18, 56, 0.07, false);
  drawGravestone(w * 0.9, base, 15, 44, -0.1, true);

  ctx.strokeStyle = "rgba(90, 82, 78, 0.55)";
  ctx.lineWidth = dpr * 1.4;
  ctx.beginPath();
  ctx.arc(w * 0.5, base + dpr * 6, dpr * 14, Math.PI, 0);
  ctx.stroke();
  ctx.lineWidth = dpr * 1;
  ctx.beginPath();
  ctx.moveTo(w * 0.5 - dpr * 14, base + dpr * 6);
  ctx.lineTo(w * 0.5 - dpr * 18, base + dpr * 22);
  ctx.moveTo(w * 0.5 + dpr * 14, base + dpr * 6);
  ctx.lineTo(w * 0.5 + dpr * 20, base + dpr * 18);
  ctx.stroke();

  ctx.fillStyle = "rgba(55, 48, 52, 0.7)";
  ctx.fillRect(w * 0.42, base - dpr * 8, dpr * 16, dpr * 10);

  ctx.strokeStyle = "rgba(70, 62, 58, 0.45)";
  ctx.lineWidth = dpr * 1.2;
  for (let i = 0; i < 5; i++) {
    const cx = w * (0.15 + i * 0.17);
    ctx.beginPath();
    ctx.moveTo(cx, sandTop + dpr * 28);
    ctx.quadraticCurveTo(cx + dpr * 8, sandTop + dpr * 8, cx + dpr * 4, sandTop);
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(168, 152, 136, 0.35)";
  for (let i = 0; i < perfN(12); i++) {
    const bx = ((i * 97) % 1000) / 1000 * w;
    const by = base + dpr * (4 + (i % 5) * 3);
    ctx.beginPath();
    ctx.ellipse(bx, by, dpr * (2 + (i % 3)), dpr * 1.2, i * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  drawSkullShoalsGraveyardMidwater();
  drawSkullShoalsSandSkeletons();
}

function drawSkullShoalsGraveyardMidwater() {
  const sandTop = h - dpr * 92;
  ctx.strokeStyle = "rgba(80, 75, 82, 0.35)";
  ctx.lineWidth = dpr * 1.1;
  for (let i = 0; i < 4; i++) {
    const cx = w * (0.12 + i * 0.24);
    ctx.beginPath();
    ctx.moveTo(cx, waterTop + dpr * 8);
    for (let s = 0; s <= 6; s++) {
      const t = s / 6;
      const y = waterTop + dpr * 8 + t * (sandTop - waterTop - dpr * 40);
      ctx.lineTo(cx + Math.sin(t * 8 + i) * dpr * 6, y);
    }
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(42, 40, 44, 0.55)";
  ctx.fillRect(w * 0.28, sandTop - dpr * 95, dpr * 14, dpr * 80);
  ctx.beginPath();
  ctx.moveTo(w * 0.28 - dpr * 2, sandTop - dpr * 95);
  ctx.quadraticCurveTo(w * 0.28 + dpr * 7, sandTop - dpr * 108, w * 0.28 + dpr * 14, sandTop - dpr * 95);
  ctx.fill();
}

function drawSkullShoalsSandSkeletons() {
  if (w <= 0) return;
  const sandTop = h - dpr * 92;
  const placements = [
    { x: 0.12, y: 20, s: 1.35, v: 0 },
    { x: 0.36, y: 16, s: 1.48, v: 1 },
    { x: 0.58, y: 22, s: 1.3, v: 2 },
    { x: 0.8, y: 18, s: 1.38, v: 3 },
    { x: 0.28, y: 30, s: 1.12, v: 4 },
    { x: 0.68, y: 28, s: 1.05, v: 5 },
  ];
  const count = PERF_CHROMEBOOK ? 4 : placements.length;
  for (let i = 0; i < count; i++) {
    const p = placements[i];
    drawUnderwaterSkeletonRemain(p.x * w, sandTop + dpr * p.y, p.s, p.v);
  }
}

function drawAdventureSkullShoalsEffect(now) {
  const t = now * 0.001;
  ctx.fillStyle = "rgba(40, 10, 20, 0.08)";
  for (let i = 0; i < 6; i++) {
    const x = ((i * 137 + Math.floor(t * 12)) % 1000) / 1000 * w;
    const y = waterTop + ((i * 89) % 1000) / 1000 * (h - waterTop) * 0.7;
    const r = dpr * (30 + i * 12);
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, "rgba(80, 20, 30, 0.12)");
    g.addColorStop(1, "rgba(80, 20, 30, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  if (Math.sin(now * 0.0025) > 0.88) {
    ctx.fillStyle = "rgba(120, 20, 30, 0.06)";
    ctx.fillRect(0, waterTop, w, h - waterTop);
  }
}

function drawAdventureMoonBeam() {
  const beam = ctx.createLinearGradient(w * 0.55, waterTop, w * 0.75, h);
  beam.addColorStop(0, "rgba(255, 255, 230, 0.18)");
  beam.addColorStop(1, "rgba(255, 255, 230, 0)");
  ctx.fillStyle = beam;
  ctx.beginPath();
  ctx.moveTo(w * 0.5, waterTop);
  ctx.lineTo(w * 0.68, waterTop);
  ctx.lineTo(w * 0.82, h);
  ctx.lineTo(w * 0.58, h);
  ctx.closePath();
  ctx.fill();
}

function drawGoldCoin(cx, cy, r, tilt) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(tilt);
  ctx.fillStyle = "#f0c830";
  ctx.strokeStyle = "#a88010";
  ctx.lineWidth = Math.max(dpr * 0.6, r * 0.18);
  ctx.beginPath();
  ctx.ellipse(0, 0, r, r * 0.36, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#8a6010";
  ctx.font = `bold ${Math.max(8, r * 0.95)}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("$", 0, 0);
  ctx.restore();
}

function scatterGoldCoins(sandTop, count, seed, ySpread) {
  for (let i = 0; i < perfN(count); i++) {
    const px = ((i * 137 + seed * 41) % 1000) / 1000;
    const py = sandTop + dpr * (8 + ((i * 29 + seed) % ySpread));
    drawGoldCoin(px * w, py, dpr * (2 + (i % 5) * 0.45), (i * 0.65 + seed) * 0.4);
  }
}

function drawTreasureChest(cx, cy, sc) {
  const s = dpr * sc;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.fillStyle = "#8a5020";
  ctx.strokeStyle = "#5a3010";
  ctx.lineWidth = s * 0.14;
  ctx.fillRect(-s * 8, -s * 4, s * 16, s * 9);
  ctx.strokeRect(-s * 8, -s * 4, s * 16, s * 9);
  ctx.fillStyle = "#a86828";
  ctx.beginPath();
  ctx.moveTo(-s * 8, -s * 4);
  ctx.quadraticCurveTo(0, -s * 9, s * 8, -s * 4);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#f0d060";
  ctx.fillRect(-s * 6, -s * 0.5, s * 12, s * 1.8);
  ctx.strokeRect(-s * 6, -s * 0.5, s * 12, s * 1.8);
  ctx.restore();
}

const CAVE_JEWEL_PALETTE = [
  { fill: "#c62828", hi: "#ff6659", stroke: "#8e0000" },
  { fill: "#2e7d32", hi: "#66bb6a", stroke: "#1b5e20" },
  { fill: "#1565c0", hi: "#42a5f5", stroke: "#0d47a1" },
  { fill: "#6a1b9a", hi: "#ab47bc", stroke: "#4a148c" },
  { fill: "#eceff1", hi: "#ffffff", stroke: "#90a4ae" },
  { fill: "#f9a825", hi: "#ffd54f", stroke: "#f57f17" },
];

function drawJewelGem(cx, cy, r, variant = 0) {
  const c = CAVE_JEWEL_PALETTE[variant % CAVE_JEWEL_PALETTE.length];
  ctx.save();
  ctx.translate(cx, cy);
  ctx.fillStyle = c.fill;
  ctx.strokeStyle = c.stroke;
  ctx.lineWidth = Math.max(dpr * 0.5, r * 0.15);
  ctx.beginPath();
  ctx.moveTo(0, -r);
  ctx.lineTo(r * 0.65, -r * 0.2);
  ctx.lineTo(r * 0.55, r * 0.75);
  ctx.lineTo(0, r);
  ctx.lineTo(-r * 0.55, r * 0.75);
  ctx.lineTo(-r * 0.65, -r * 0.2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = c.hi;
  ctx.globalAlpha = 0.55;
  ctx.beginPath();
  ctx.moveTo(0, -r * 0.85);
  ctx.lineTo(r * 0.35, -r * 0.15);
  ctx.lineTo(0, r * 0.3);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawGoldIngot(cx, cy, sc, tilt) {
  const s = dpr * sc;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(tilt);
  ctx.fillStyle = "#f5d040";
  ctx.strokeStyle = "#b8940a";
  ctx.lineWidth = s * 0.12;
  ctx.beginPath();
  ctx.moveTo(-s * 5, -s * 1.8);
  ctx.lineTo(s * 5, -s * 1.8);
  ctx.lineTo(s * 4.2, s * 1.8);
  ctx.lineTo(-s * 4.2, s * 1.8);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#ffe080";
  ctx.fillRect(-s * 3.5, -s * 0.8, s * 7, s * 0.5);
  ctx.restore();
}

function drawPearl(cx, cy, r) {
  const g = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, 0, cx, cy, r);
  g.addColorStop(0, "rgba(255, 255, 255, 0.95)");
  g.addColorStop(0.5, "rgba(240, 235, 220, 0.9)");
  g.addColorStop(1, "rgba(200, 195, 185, 0.85)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
}

function drawMiniCrown(cx, cy, sc) {
  const s = dpr * sc;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.fillStyle = "#f0c830";
  ctx.strokeStyle = "#a88010";
  ctx.lineWidth = s * 0.15;
  ctx.beginPath();
  ctx.moveTo(-s * 5, s);
  ctx.lineTo(-s * 4, -s * 2);
  ctx.lineTo(-s * 2, s * 0.5);
  ctx.lineTo(0, -s * 4);
  ctx.lineTo(s * 2, s * 0.5);
  ctx.lineTo(s * 4, -s * 2);
  ctx.lineTo(s * 5, s);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  drawJewelGem(0, -s * 1.5, s * 1.2, 0);
  drawJewelGem(-s * 3, 0, s * 0.8, 4);
  drawJewelGem(s * 3, 0, s * 0.8, 1);
  ctx.restore();
}

function drawGoldenChalice(cx, cy, sc) {
  const s = dpr * sc;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.fillStyle = "#e8b820";
  ctx.strokeStyle = "#9a7010";
  ctx.lineWidth = s * 0.12;
  ctx.beginPath();
  ctx.moveTo(-s * 3, -s * 2);
  ctx.quadraticCurveTo(-s * 4, s * 2, -s * 2, s * 5);
  ctx.lineTo(s * 2, s * 5);
  ctx.quadraticCurveTo(s * 4, s * 2, s * 3, -s * 2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillRect(-s * 0.8, s * 5, s * 1.6, s * 4);
  ctx.fillRect(-s * 2.5, s * 9, s * 5, s * 1.2);
  drawJewelGem(0, -s * 0.5, s * 1, 4);
  ctx.restore();
}

function drawOpenTreasureChest(cx, cy, sc) {
  const s = dpr * sc;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.fillStyle = "#8a5020";
  ctx.strokeStyle = "#5a3010";
  ctx.lineWidth = s * 0.14;
  ctx.fillRect(-s * 8, -s * 2, s * 16, s * 9);
  ctx.strokeRect(-s * 8, -s * 2, s * 16, s * 9);
  ctx.fillStyle = "#a86828";
  ctx.beginPath();
  ctx.moveTo(-s * 8, -s * 2);
  ctx.quadraticCurveTo(-s * 9, -s * 12, -s * 4, -s * 14);
  ctx.lineTo(s * 4, -s * 14);
  ctx.quadraticCurveTo(s * 9, -s * 12, s * 8, -s * 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "#f0d060";
  ctx.fillRect(-s * 6, s * 1.2, s * 12, s * 1.8);
  ctx.strokeRect(-s * 6, s * 1.2, s * 12, s * 1.8);
  for (let i = 0; i < 5; i++) {
    drawGoldCoin((i - 2) * s * 2.2, -s * 5 - (i % 2) * s * 1.5, s * 1.4, i * 0.35);
  }
  drawJewelGem(-s * 4, -s * 3, s * 1.3, 0);
  drawJewelGem(s * 3.5, -s * 4, s * 1.1, 2);
  ctx.restore();
}

function drawCaveTreasurePile(cx, baseY, pileIdx) {
  const layers = 4 + (pileIdx % 4);
  for (let j = 0; j < layers; j++) {
    const coinsInLayer = 3 + (j % 3);
    for (let k = 0; k < coinsInLayer; k++) {
      drawGoldCoin(
        cx + (k - coinsInLayer / 2) * dpr * 4.5,
        baseY - j * dpr * 2.8,
        dpr * (2 + j * 0.2),
        (pileIdx + j + k) * 0.3,
      );
    }
  }
  if (pileIdx % 3 === 0) {
    drawJewelGem(cx, baseY - layers * dpr * 2.8 - dpr * 3, dpr * (2.2 + (pileIdx % 2)), pileIdx);
  }
  if (pileIdx % 4 === 1) {
    drawGoldIngot(cx + dpr * 7, baseY - dpr * 4, 0.85, 0.15 + pileIdx * 0.08);
  }
  if (pileIdx % 5 === 2) {
    drawPearl(cx - dpr * 5, baseY - dpr * 2, dpr * (1.6 + (pileIdx % 2) * 0.4));
  }
}

/** Aladdin-style cave floor — gold piles, jewels, ingots, pearls, crowns, and chests. */
function drawCaveOfWondersFloorTreasure(sandTop, seed, density = 1) {
  const base = sandTop + dpr * 14;
  const d = Math.max(0.4, Math.min(1, density));

  ctx.fillStyle = "rgba(255, 190, 70, 0.2)";
  ctx.beginPath();
  ctx.ellipse(w * 0.5, base - dpr * 4, w * 0.46, dpr * 28, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255, 210, 90, 0.14)";
  ctx.beginPath();
  ctx.ellipse(w * 0.32, base, w * 0.3, dpr * 20, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(w * 0.7, base + dpr * 2, w * 0.26, dpr * 18, 0, 0, Math.PI * 2);
  ctx.fill();

  const pileSlots = [0.08, 0.2, 0.32, 0.44, 0.56, 0.68, 0.8, 0.92];
  const pileCount = Math.max(4, Math.round(perfN(pileSlots.length) * d));
  for (let pile = 0; pile < pileCount; pile++) {
    const px = w * pileSlots[pile];
    drawCaveTreasurePile(px, base + dpr * (pile % 3), pile + seed);
  }

  scatterGoldCoins(sandTop, Math.round(78 * d), seed, 36);

  const jewelCount = Math.round(perfN(32) * d);
  for (let i = 0; i < jewelCount; i++) {
    const px = ((i * 173 + seed * 61) % 1000) / 1000;
    const py = sandTop + dpr * (5 + ((i * 47 + seed) % 34));
    drawJewelGem(px * w, py, dpr * (1.6 + (i % 5) * 0.5), i + seed);
  }

  const ingotCount = Math.round(perfN(16) * d);
  for (let i = 0; i < ingotCount; i++) {
    const px = ((i * 211 + seed * 37) % 1000) / 1000;
    const py = sandTop + dpr * (10 + ((i * 31 + seed) % 24));
    drawGoldIngot(px * w, py, 0.7 + (i % 3) * 0.15, (i * 0.55 + seed) * 0.35);
  }

  const pearlCount = Math.round(perfN(18) * d);
  for (let i = 0; i < pearlCount; i++) {
    const px = ((i * 149 + seed * 53) % 1000) / 1000;
    const py = sandTop + dpr * (8 + ((i * 23 + seed) % 28));
    drawPearl(px * w, py, dpr * (1.4 + (i % 4) * 0.35));
  }

  if (d >= 0.7) {
    drawMiniCrown(w * 0.16, base - dpr * 10, 0.88);
    drawMiniCrown(w * 0.84, base - dpr * 7, 0.75);
    drawGoldenChalice(w * 0.64, base - dpr * 12, 0.68);
    drawGoldenChalice(w * 0.36, base - dpr * 6, 0.58);
    drawOpenTreasureChest(w * 0.5, base - dpr * 16, 1.05);
    drawTreasureChest(w * 0.24, base - dpr * 5, 0.78);
    drawTreasureChest(w * 0.76, base - dpr * 8, 0.72);
    drawOpenTreasureChest(w * 0.12, base - dpr * 3, 0.62);
  } else {
    drawTreasureChest(w * 0.5, base - dpr * 10, 0.85);
    drawOpenTreasureChest(w * 0.72, base - dpr * 4, 0.65);
  }

  ctx.fillStyle = "rgba(255, 210, 90, 0.22)";
  ctx.beginPath();
  ctx.ellipse(w * 0.5, base - dpr * 8, w * 0.3, dpr * 16, 0, 0, Math.PI * 2);
  ctx.fill();
}

function drawTreasureCoveCaveWalls() {
  const sandTop = h - dpr * 92;
  const wy = waterTop;

  ctx.fillStyle = "rgba(6, 14, 20, 0.72)";
  ctx.beginPath();
  ctx.moveTo(w * 0.28, wy);
  ctx.quadraticCurveTo(w * 0.5, wy + dpr * 28, w * 0.72, wy);
  ctx.lineTo(w * 0.72, wy + dpr * 14);
  ctx.quadraticCurveTo(w * 0.5, wy + dpr * 42, w * 0.28, wy + dpr * 14);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "rgba(42, 34, 28, 0.82)";
  ctx.beginPath();
  ctx.moveTo(0, wy);
  ctx.lineTo(w * 0.22, wy);
  ctx.quadraticCurveTo(w * 0.14, sandTop - dpr * 28, w * 0.08, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(w, wy);
  ctx.lineTo(w * 0.78, wy);
  ctx.quadraticCurveTo(w * 0.86, sandTop - dpr * 32, w * 0.92, h);
  ctx.lineTo(w, h);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "rgba(28, 22, 18, 0.68)";
  for (const sx of [0.1, 0.88]) {
    for (let i = 0; i < perfN(6); i++) {
      const x = w * (sx + (i % 2 ? 0.02 : -0.01));
      const len = dpr * (18 + (i % 4) * 10);
      ctx.beginPath();
      ctx.moveTo(x, wy + dpr * (8 + i * 7));
      ctx.quadraticCurveTo(x + dpr * (i % 2 ? 8 : -8), wy + dpr * (14 + i * 9) + len * 0.4, x, wy + dpr * (8 + i * 7) + len);
      ctx.quadraticCurveTo(x - dpr * 6, wy + dpr * (12 + i * 8) + len * 0.55, x, wy + dpr * (8 + i * 7));
      ctx.fill();
    }
  }

  ctx.fillStyle = "rgba(52, 42, 34, 0.55)";
  ctx.beginPath();
  ctx.moveTo(w * 0.22, wy);
  ctx.quadraticCurveTo(w * 0.5, wy + dpr * 48, w * 0.78, wy);
  ctx.lineTo(w * 0.76, wy + dpr * 12);
  ctx.quadraticCurveTo(w * 0.5, wy + dpr * 56, w * 0.24, wy + dpr * 12);
  ctx.closePath();
  ctx.fill();
}

function drawTreasureCoveShipwreck() {
  const sandTop = h - dpr * 92;
  const cx = w * 0.58;
  const cy = sandTop - dpr * 52;
  ctx.save();
  ctx.globalAlpha = 0.88;

  ctx.fillStyle = "rgba(14, 24, 34, 0.92)";
  ctx.strokeStyle = "rgba(8, 14, 22, 0.95)";
  ctx.lineWidth = dpr * 1.2;
  ctx.beginPath();
  ctx.moveTo(cx - w * 0.24, cy + dpr * 38);
  ctx.quadraticCurveTo(cx - w * 0.2, cy + dpr * 8, cx - w * 0.14, cy - dpr * 6);
  ctx.lineTo(cx + w * 0.1, cy - dpr * 22);
  ctx.quadraticCurveTo(cx + w * 0.18, cy - dpr * 4, cx + w * 0.22, cy + dpr * 32);
  ctx.lineTo(cx + w * 0.08, cy + dpr * 42);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "rgba(10, 18, 28, 0.85)";
  for (let i = 0; i < 5; i++) {
    const rx = cx - w * 0.16 + i * w * 0.07;
    ctx.fillRect(rx, cy + dpr * 6, dpr * 3, dpr * 28);
  }

  ctx.strokeStyle = "rgba(12, 20, 30, 0.95)";
  ctx.lineWidth = dpr * 4.5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(cx - w * 0.04, cy - dpr * 10);
  ctx.lineTo(cx - w * 0.1, cy - dpr * 88);
  ctx.stroke();
  ctx.lineWidth = dpr * 2.8;
  ctx.beginPath();
  ctx.moveTo(cx - w * 0.18, cy - dpr * 68);
  ctx.lineTo(cx + w * 0.02, cy - dpr * 58);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - w * 0.06, cy - dpr * 78);
  ctx.lineTo(cx - w * 0.14, cy - dpr * 82);
  ctx.stroke();

  ctx.fillStyle = "rgba(255, 190, 70, 0.18)";
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.arc(cx - w * 0.1 + i * w * 0.07, cy + dpr * 14, dpr * 3.2, 0, Math.PI * 2);
    ctx.fill();
  }
  const wreckBase = cy + dpr * 38;
  for (let i = 0; i < perfN(6); i++) {
    drawGoldCoin(cx - w * 0.14 + i * w * 0.05, wreckBase - (i % 3) * dpr * 2.5, dpr * 1.8, i * 0.4);
  }
  drawJewelGem(cx - w * 0.06, wreckBase - dpr * 5, dpr * 2, 1);
  drawGoldIngot(cx + w * 0.04, wreckBase - dpr * 2, 0.55, 0.3);
  ctx.restore();
}

function drawTreasureCoveRuins() {
  const sandTop = h - dpr * 92;
  const base = sandTop + dpr * 8;
  ctx.save();
  ctx.globalAlpha = 0.62;
  ctx.fillStyle = "rgba(38, 48, 58, 0.75)";
  ctx.strokeStyle = "rgba(22, 32, 42, 0.8)";
  ctx.lineWidth = dpr * 1;
  for (const px of [0.14, 0.32, 0.78]) {
    const x = w * px;
    const colH = dpr * (48 + (px * 100) % 30);
    ctx.fillRect(x - dpr * 5, base - colH, dpr * 10, colH);
    ctx.strokeRect(x - dpr * 5, base - colH, dpr * 10, colH);
    ctx.fillRect(x - dpr * 7, base - colH - dpr * 4, dpr * 14, dpr * 5);
  }
  ctx.restore();
}

function drawTreasureCoveBed() {
  drawTreasureCoveCaveWalls();
  drawTreasureCoveRuins();
  drawTreasureCoveShipwreck();
  const sandTop = h - dpr * 92;
  drawCaveOfWondersFloorTreasure(sandTop, 7, 1);
}

function drawDoubloonBayBed() {
  const sandTop = h - dpr * 92;
  const base = sandTop + dpr * 12;
  ctx.fillStyle = "rgba(70, 55, 35, 0.55)";
  ctx.beginPath();
  ctx.moveTo(w * 0.08, base + dpr * 6);
  ctx.lineTo(w * 0.14, base - dpr * 22);
  ctx.lineTo(w * 0.2, base + dpr * 4);
  ctx.closePath();
  ctx.fill();
  drawTreasureChest(w * 0.72, base - dpr * 6, 0.75);
  for (let i = 0; i < 5; i++) {
    const cx = w * (0.12 + i * 0.19);
    for (let j = 0; j < 4 + (i % 3); j++) {
      drawGoldCoin(cx + (j - 1.5) * dpr * 5, base - j * dpr * 3.5, dpr * 2.4, j * 0.2);
    }
  }
  scatterGoldCoins(sandTop, 24, 3, 30);
  ctx.strokeStyle = "rgba(90, 70, 45, 0.5)";
  ctx.lineWidth = dpr * 1.8;
  ctx.beginPath();
  ctx.arc(w * 0.32, base - dpr * 4, dpr * 10, Math.PI, 0);
  ctx.stroke();
}

function drawMarinersRestBed() {
  const sandTop = h - dpr * 92;
  const base = sandTop + dpr * 14;
  ctx.fillStyle = "rgba(55, 60, 75, 0.5)";
  ctx.beginPath();
  ctx.moveTo(w * 0.12, base + dpr * 4);
  ctx.lineTo(w * 0.18, base - dpr * 18);
  ctx.lineTo(w * 0.28, base + dpr * 2);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(100, 110, 130, 0.7)";
  ctx.lineWidth = dpr * 2.5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(w * 0.35, base);
  ctx.lineTo(w * 0.35, base - dpr * 70);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(w * 0.35, base - dpr * 68);
  ctx.lineTo(w * 0.52, base - dpr * 52);
  ctx.stroke();
  drawCrossMarker(w * 0.68, base, 44);
  ctx.strokeStyle = "rgba(90, 95, 110, 0.55)";
  ctx.lineWidth = dpr * 1.4;
  ctx.beginPath();
  ctx.arc(w * 0.22, base + dpr * 4, dpr * 12, Math.PI, 0);
  ctx.stroke();
  ctx.strokeStyle = "rgba(80, 85, 100, 0.45)";
  ctx.lineWidth = dpr * 1.2;
  ctx.beginPath();
  ctx.moveTo(w * 0.55, base);
  ctx.quadraticCurveTo(w * 0.58, base - dpr * 28, w * 0.62, base - dpr * 8);
  ctx.stroke();
}

function drawGoldenAtollBed() {
  const sandTop = h - dpr * 92;
  const base = sandTop + dpr * 10;
  ctx.fillStyle = "rgba(240, 210, 100, 0.35)";
  ctx.beginPath();
  ctx.ellipse(w * 0.5, base, w * 0.38, dpr * 22, 0, 0, Math.PI * 2);
  ctx.fill();
  scatterGoldCoins(sandTop, 16, 5, 26);
  for (const px of [0.22, 0.42, 0.62, 0.78]) {
    ctx.strokeStyle = "rgba(50, 90, 55, 0.55)";
    ctx.lineWidth = dpr * 2;
    ctx.beginPath();
    ctx.moveTo(w * px, base);
    ctx.lineTo(w * px, base - dpr * 55);
    ctx.stroke();
  }
}

function drawSerpentStraitBed() {
  const sandTop = h - dpr * 92;
  const base = sandTop + dpr * 10;
  ctx.fillStyle = "rgba(30, 55, 52, 0.55)";
  for (const px of [0.08, 0.92]) {
    ctx.beginPath();
    ctx.moveTo(w * px, sandTop);
    ctx.lineTo(w * (px + (px < 0.5 ? 0.04 : -0.04)), base - dpr * 55);
    ctx.lineTo(w * (px + (px < 0.5 ? 0.07 : -0.07)), base);
    ctx.closePath();
    ctx.fill();
  }
  ctx.strokeStyle = "rgba(45, 100, 88, 0.45)";
  ctx.lineWidth = dpr * 2.2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(w * 0.04, sandTop + dpr * 14);
  ctx.quadraticCurveTo(w * 0.28, sandTop + dpr * 22, w * 0.48, sandTop + dpr * 8);
  ctx.quadraticCurveTo(w * 0.68, sandTop - dpr * 4, w * 0.94, sandTop + dpr * 16);
  ctx.stroke();
  ctx.strokeStyle = "rgba(55, 115, 98, 0.3)";
  ctx.lineWidth = dpr * 1;
  ctx.beginPath();
  ctx.moveTo(w * 0.06, sandTop + dpr * 10);
  ctx.quadraticCurveTo(w * 0.3, sandTop + dpr * 16, w * 0.5, sandTop + dpr * 4);
  ctx.quadraticCurveTo(w * 0.7, sandTop - dpr * 8, w * 0.92, sandTop + dpr * 12);
  ctx.stroke();
  ctx.fillStyle = "rgba(38, 82, 72, 0.38)";
  ctx.beginPath();
  ctx.moveTo(w * 0.9, sandTop + dpr * 14);
  ctx.lineTo(w * 0.96, sandTop + dpr * 11);
  ctx.lineTo(w * 0.93, sandTop + dpr * 17);
  ctx.closePath();
  ctx.fill();
}

function drawCompassCayBed() {
  const sandTop = h - dpr * 92;
  const cx = w * 0.5;
  const cy = sandTop + dpr * 38;
  const r = dpr * 28;
  ctx.fillStyle = "rgba(210, 190, 150, 0.22)";
  ctx.beginPath();
  ctx.ellipse(cx, sandTop + dpr * 14, w * 0.28, dpr * 12, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(180, 160, 120, 0.55)";
  ctx.lineWidth = dpr * 1.2;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "#b91c1c";
  ctx.beginPath();
  ctx.moveTo(cx, cy - r * 0.7);
  ctx.lineTo(cx + r * 0.12, cy);
  ctx.lineTo(cx, cy + r * 0.7);
  ctx.lineTo(cx - r * 0.12, cy);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#2e2418";
  ctx.fillRect(cx - r * 0.55, cy - r * 0.08, r * 1.1, r * 0.16);
  drawCrossMarker(w * 0.18, sandTop + dpr * 14, 36);
  drawCrossMarker(w * 0.82, sandTop + dpr * 14, 36);
  ctx.strokeStyle = "rgba(160, 140, 100, 0.4)";
  ctx.lineWidth = dpr * 0.9;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx, cy - r * 1.35);
  ctx.stroke();
}

function drawKrakensTeethBed() {
  const sandTop = h - dpr * 92;
  const base = sandTop + dpr * 8;
  for (const tx of [0.14, 0.32, 0.5, 0.68, 0.86]) {
    ctx.fillStyle = "rgba(90, 95, 110, 0.75)";
    ctx.beginPath();
    ctx.moveTo(w * tx - dpr * 10, base);
    ctx.lineTo(w * tx, base - dpr * (48 + (tx * 100) % 30));
    ctx.lineTo(w * tx + dpr * 10, base);
    ctx.closePath();
    ctx.fill();
  }
  ctx.fillStyle = "rgba(50, 35, 45, 0.45)";
  ctx.fillRect(w * 0.38, base - dpr * 3, w * 0.24, dpr * 4);
  ctx.strokeStyle = "rgba(100, 30, 50, 0.35)";
  ctx.lineWidth = dpr * 2.2;
  ctx.lineCap = "round";
  for (let i = 0; i < 3; i++) {
    const ox = w * (0.2 + i * 0.28);
    ctx.beginPath();
    ctx.moveTo(ox, h - dpr * 70);
    ctx.quadraticCurveTo(ox + dpr * 22, waterTop + (h - waterTop) * 0.55, ox - dpr * 14, waterTop + dpr * 30);
    ctx.stroke();
  }
}

function drawPalmwoodHarborBed() {
  const sandTop = h - dpr * 92;
  const base = sandTop + dpr * 10;
  for (const px of [0.16, 0.38, 0.62, 0.84]) {
    ctx.fillStyle = "rgba(90, 65, 40, 0.85)";
    ctx.fillRect(w * px - dpr * 3, base - dpr * 62, dpr * 6, dpr * 62);
    ctx.strokeStyle = "rgba(50, 120, 60, 0.5)";
    ctx.lineWidth = dpr * 1.5;
    ctx.beginPath();
    ctx.moveTo(w * px, base - dpr * 58);
    ctx.quadraticCurveTo(w * px - dpr * 18, base - dpr * 72, w * px - dpr * 24, base - dpr * 64);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(w * px, base - dpr * 58);
    ctx.quadraticCurveTo(w * px + dpr * 18, base - dpr * 72, w * px + dpr * 24, base - dpr * 64);
    ctx.stroke();
  }
  ctx.fillStyle = "rgba(120, 85, 50, 0.7)";
  ctx.fillRect(w * 0.08, base - dpr * 4, w * 0.84, dpr * 5);
  ctx.fillStyle = "rgba(70, 50, 32, 0.65)";
  ctx.beginPath();
  ctx.moveTo(w * 0.55, base - dpr * 2);
  ctx.lineTo(w * 0.68, base - dpr * 14);
  ctx.lineTo(w * 0.78, base - dpr * 2);
  ctx.lineTo(w * 0.72, base);
  ctx.lineTo(w * 0.52, base);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(60, 45, 30, 0.5)";
  ctx.lineWidth = dpr * 1;
  ctx.beginPath();
  ctx.moveTo(w * 0.62, base - dpr * 14);
  ctx.lineTo(w * 0.62, base - dpr * 28);
  ctx.stroke();
}

function drawEmeraldLagoonBed() {
  const sandTop = h - dpr * 92;
  ctx.fillStyle = "rgba(40, 140, 90, 0.25)";
  ctx.beginPath();
  ctx.ellipse(w * 0.5, sandTop + dpr * 28, w * 0.36, dpr * 18, 0, 0, Math.PI * 2);
  ctx.fill();
  for (let i = 0; i < perfN(10); i++) {
    const px = w * (0.1 + ((i * 89) % 800) / 1000);
    const py = sandTop + dpr * (12 + (i % 4) * 8);
    ctx.fillStyle = `rgba(50, ${160 + (i % 3) * 20}, 100, 0.45)`;
    ctx.beginPath();
    ctx.ellipse(px, py, dpr * (10 + (i % 3) * 4), dpr * 5, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.strokeStyle = "rgba(80, 220, 140, 0.35)";
  ctx.lineWidth = dpr * 1.2;
  for (const lx of [0.3, 0.5, 0.7]) {
    ctx.beginPath();
    ctx.moveTo(w * lx, sandTop + dpr * 8);
    ctx.quadraticCurveTo(w * (lx + 0.02), sandTop - dpr * 20, w * (lx - 0.01), sandTop - dpr * 4);
    ctx.stroke();
  }
}

const LAVA_FALLS_VOLCANOES = [
  { cx: 0.2, peakH: 102, baseW: 40, phase: 0 },
  { cx: 0.5, peakH: 124, baseW: 48, phase: 1.4 },
  { cx: 0.8, peakH: 96, baseW: 36, phase: 2.8 },
];

function drawLavaFallsRockySand(sandTop, base) {
  ctx.fillStyle = "rgba(6, 5, 4, 0.82)";
  ctx.beginPath();
  ctx.ellipse(w * 0.5, base + dpr * 4, w * 0.44, dpr * 16, 0, 0, Math.PI * 2);
  ctx.fill();

  for (let i = 0; i < perfN(22); i++) {
    const rx = w * ((i * 53) % 1000) / 1000;
    const ry = sandTop + dpr * (6 + (i % 7) * 9);
    const rw = dpr * (6 + (i % 4) * 4);
    const rh = dpr * (3 + (i % 3) * 2);
    ctx.fillStyle = i % 2 === 0 ? "rgba(18, 15, 13, 0.9)" : "rgba(10, 8, 7, 0.85)";
    ctx.beginPath();
    ctx.moveTo(rx - rw, ry);
    ctx.lineTo(rx - rw * 0.4, ry - rh);
    ctx.lineTo(rx + rw * 0.5, ry - rh * 0.85);
    ctx.lineTo(rx + rw, ry + rh * 0.3);
    ctx.lineTo(rx + rw * 0.2, ry + rh);
    ctx.lineTo(rx - rw * 0.6, ry + rh * 0.5);
    ctx.closePath();
    ctx.fill();
  }

  for (let i = 0; i < perfN(36); i++) {
    const bx = w * ((i * 67) % 1000) / 1000;
    const by = sandTop + dpr * (8 + (i % 6) * 10);
    ctx.fillStyle = i % 3 === 0 ? "rgba(24, 20, 18, 0.75)" : "rgba(12, 10, 9, 0.65)";
    ctx.beginPath();
    ctx.ellipse(bx, by, dpr * (1.2 + (i % 3) * 0.5), dpr * 0.8, i * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.strokeStyle = "rgba(4, 3, 3, 0.5)";
  ctx.lineWidth = dpr * 0.8;
  for (let i = 0; i < 8; i++) {
    const cx = w * (0.08 + i * 0.11);
    ctx.beginPath();
    ctx.moveTo(cx, base + dpr * 2);
    ctx.lineTo(cx + dpr * (4 + (i % 3) * 2), base - dpr * (3 + (i % 4)));
    ctx.stroke();
  }
}

function drawLavaFallsBed() {
  const sandTop = h - dpr * 92;
  const base = sandTop + dpr * 12;
  drawLavaFallsRockySand(sandTop, base);

  function drawVolcanoBase(cx, peakH, baseW) {
    const bx = w * cx;
    const by = base;
    const bw = dpr * baseW;
    ctx.fillStyle = "rgba(22, 18, 16, 0.94)";
    ctx.beginPath();
    ctx.moveTo(bx - bw, by);
    ctx.lineTo(bx - bw * 0.15, by - dpr * peakH * 0.35);
    ctx.lineTo(bx, by - dpr * peakH);
    ctx.lineTo(bx + bw * 0.15, by - dpr * peakH * 0.35);
    ctx.lineTo(bx + bw, by);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "rgba(14, 11, 10, 0.9)";
    ctx.beginPath();
    ctx.moveTo(bx - bw * 0.65, by);
    ctx.lineTo(bx - bw * 0.12, by - dpr * peakH * 0.58);
    ctx.lineTo(bx + bw * 0.08, by - dpr * peakH * 0.52);
    ctx.lineTo(bx + bw * 0.45, by);
    ctx.closePath();
    ctx.fill();
    const rimY = by - dpr * (peakH * 0.72);
    ctx.fillStyle = "rgba(8, 6, 5, 0.88)";
    ctx.beginPath();
    ctx.ellipse(bx, rimY, dpr * 9, dpr * 5.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(35, 28, 24, 0.55)";
    ctx.beginPath();
    ctx.ellipse(bx, rimY + dpr * 2, dpr * 11, dpr * 4, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  for (const v of LAVA_FALLS_VOLCANOES) {
    drawVolcanoBase(v.cx, v.peakH, v.baseW);
  }
}

function drawLavaOozeRibbon(bx, calderaY, by, dir, t, pulse, phase) {
  const segs = PERF_CHROMEBOOK ? 7 : 12;
  const flow = (t * 0.45 + phase) % 1;
  const outer = [];
  const inner = [];
  for (let i = 0; i <= segs; i++) {
    const u = i / segs;
    const creep = Math.max(0, u - flow * 0.35);
    const y = calderaY + (by - calderaY + dpr * 10) * creep + Math.sin(u * 5 + t * 1.8 + phase) * dpr * (1.5 + u * 3);
    const spread = dir * dpr * (8 + u * 38 + pulse * 6);
    const wav = Math.sin(u * 9 + t * 2.5 + phase) * dpr * (2 + u * 5);
    outer.push({ x: bx + spread + wav, y });
    inner.push({ x: bx + spread * 0.45 + wav * 0.4, y: y + dpr * (2 + u * 2) });
  }
  ctx.beginPath();
  ctx.moveTo(outer[0].x, outer[0].y);
  for (let i = 1; i < outer.length; i++) ctx.lineTo(outer[i].x, outer[i].y);
  for (let i = inner.length - 1; i >= 0; i--) ctx.lineTo(inner[i].x, inner[i].y);
  ctx.closePath();
  const g = ctx.createLinearGradient(bx, calderaY, bx + dir * dpr * 50, by);
  g.addColorStop(0, `rgba(255, 255, 180, ${0.95 + pulse * 0.05})`);
  g.addColorStop(0.35, `rgba(255, 150, 35, ${0.92 + pulse * 0.06})`);
  g.addColorStop(0.75, `rgba(220, 55, 8, ${0.88 + pulse * 0.08})`);
  g.addColorStop(1, `rgba(160, 30, 5, ${0.75 + pulse * 0.1})`);
  ctx.fillStyle = g;
  ctx.fill();

  ctx.strokeStyle = `rgba(255, 240, 140, ${0.5 + pulse * 0.25})`;
  ctx.lineWidth = dpr * (1.2 + pulse * 0.8);
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(outer[0].x, outer[0].y);
  for (let i = 1; i < outer.length; i++) ctx.lineTo(outer[i].x, outer[i].y);
  ctx.stroke();
}

function drawLavaOozeDrips(bx, by, t, pulse, phase) {
  for (let d = 0; d < 4; d++) {
    const off = ((t * 0.6 + phase + d * 0.22) % 1);
    const dx = bx + (d - 1.5) * dpr * 14;
    const tipY = by + dpr * (4 + off * 10);
    const dropH = dpr * (5 + (d % 2) * 3) * (0.6 + pulse * 0.4);
    const dropGrad = ctx.createLinearGradient(dx, tipY - dropH, dx, tipY + dpr * 2);
    dropGrad.addColorStop(0, "rgba(255, 220, 90, 0.9)");
    dropGrad.addColorStop(1, "rgba(255, 90, 15, 0.85)");
    ctx.fillStyle = dropGrad;
    ctx.beginPath();
    ctx.moveTo(dx - dpr * 2.2, tipY);
    ctx.quadraticCurveTo(dx, tipY - dropH, dx + dpr * 2.2, tipY);
    ctx.quadraticCurveTo(dx, tipY + dpr * 3, dx - dpr * 2.2, tipY);
    ctx.fill();
  }
}

function drawLavaFallsFloatingAsh(now) {
  const t = now * 0.001;
  const wh = h - waterTop;
  for (let i = 0; i < perfN(44); i++) {
    const seed = i * 131;
    const phase = (t * (0.035 + (i % 9) * 0.007) + i * 0.06) % 1;
    const px = w * (((seed + 41) % 1000) / 1000) + Math.sin(t * 0.55 + i * 1.3) * dpr * 8;
    const py = waterTop + wh * phase;
    const rot = (seed % 628) / 100 + Math.sin(t + i) * 0.5;
    const flakeW = dpr * (0.9 + (i % 5) * 0.45);
    const flakeH = dpr * (0.4 + (i % 4) * 0.28);
    const ashA = 0.2 + (i % 6) * 0.06;
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(rot);
    ctx.fillStyle = i % 4 === 0 ? `rgba(75, 70, 65, ${ashA})` : `rgba(32, 30, 28, ${ashA + 0.1})`;
    ctx.beginPath();
    ctx.ellipse(0, 0, flakeW, flakeH, 0, 0, Math.PI * 2);
    ctx.fill();
    if (i % 3 === 0) {
      ctx.fillStyle = `rgba(48, 44, 40, ${ashA * 0.55})`;
      ctx.fillRect(-flakeW * 0.35, -flakeH * 0.15, flakeW * 0.7, flakeH * 0.3);
    }
    ctx.restore();
  }
  ctx.fillStyle = "rgba(25, 22, 20, 0.35)";
  for (let i = 0; i < perfN(20); i++) {
    const px = w * (((i * 89 + Math.floor(t * 14)) % 1000) / 1000);
    const py = waterTop + ((i * 61 + t * 30) % 1) * wh;
    ctx.beginPath();
    ctx.arc(px + Math.sin(t * 0.9 + i) * dpr * 3, py, dpr * (0.5 + (i % 3) * 0.25), 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawLavaFallsVolcanoBloom(bx, by, peakH, pulse) {
  const calderaY = by - dpr * (peakH * 0.72);
  const bloomR = dpr * (PERF_CHROMEBOOK ? 72 + pulse * 38 : 95 + pulse * 55);
  const bloom = ctx.createRadialGradient(bx, calderaY + dpr * 8, 0, bx, calderaY, bloomR);
  bloom.addColorStop(0, `rgba(255, 240, 120, ${0.5 + pulse * 0.28})`);
  bloom.addColorStop(0.35, `rgba(255, 140, 40, ${0.32 + pulse * 0.2})`);
  bloom.addColorStop(0.7, `rgba(255, 80, 20, ${0.14 + pulse * 0.1})`);
  bloom.addColorStop(1, "rgba(255, 60, 10, 0)");
  ctx.fillStyle = bloom;
  ctx.beginPath();
  ctx.arc(bx, calderaY, bloomR, 0, Math.PI * 2);
  ctx.fill();
}

function drawLavaFallsVolcanoEruption(now, cx, peakH, phase) {
  const sandTop = h - dpr * 92;
  const base = sandTop + dpr * 12;
  const bx = w * cx;
  const by = base;
  const t = now * 0.001;
  const pulse = 0.5 + 0.5 * Math.sin(t * 2.4 + phase);
  const erupt = 0.35 + 0.65 * Math.sin(t * 1.6 + phase * 0.7);

  drawLavaFallsVolcanoBloom(bx, by, peakH, pulse);

  const calderaY = by - dpr * (peakH * 0.72);
  const glowR = dpr * (40 + pulse * 30);
  const glow = ctx.createRadialGradient(bx, calderaY, 0, bx, calderaY, glowR);
  glow.addColorStop(0, `rgba(255, 255, 180, ${0.85 + pulse * 0.12})`);
  glow.addColorStop(0.4, `rgba(255, 170, 50, ${0.65 + pulse * 0.2})`);
  glow.addColorStop(1, "rgba(255, 80, 10, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(bx, calderaY, glowR, 0, Math.PI * 2);
  ctx.fill();

  const poolGrad = ctx.createRadialGradient(bx, by, 0, bx, by, dpr * (32 + pulse * 14));
  poolGrad.addColorStop(0, `rgba(255, 230, 100, ${0.9 + pulse * 0.08})`);
  poolGrad.addColorStop(0.5, `rgba(255, 110, 25, ${0.75 + pulse * 0.15})`);
  poolGrad.addColorStop(1, "rgba(180, 40, 5, 0)");
  ctx.fillStyle = poolGrad;
  ctx.beginPath();
  ctx.ellipse(bx, by + dpr * 2, dpr * (28 + pulse * 12), dpr * (9 + pulse * 4), 0, 0, Math.PI * 2);
  ctx.fill();

  const lavaGrad = ctx.createLinearGradient(bx, calderaY - dpr * 16, bx, by + dpr * 8);
  lavaGrad.addColorStop(0, "rgba(255, 255, 160, 1)");
  lavaGrad.addColorStop(0.4, "rgba(255, 150, 35, 0.98)");
  lavaGrad.addColorStop(1, "rgba(255, 80, 12, 0.92)");
  ctx.fillStyle = lavaGrad;
  ctx.beginPath();
  ctx.moveTo(bx - dpr * (8 + pulse * 5), calderaY);
  ctx.lineTo(bx, calderaY - dpr * (18 + erupt * 20));
  ctx.lineTo(bx + dpr * (9 + pulse * 6), calderaY);
  ctx.closePath();
  ctx.fill();

  if (!PERF_CHROMEBOOK) {
    ctx.shadowColor = "rgba(255, 140, 40, 0.95)";
    ctx.shadowBlur = dpr * 16;
  }
  drawLavaOozeRibbon(bx, calderaY, by, 1, t, pulse, phase);
  drawLavaOozeRibbon(bx, calderaY, by, -1, t, pulse, phase + 0.65);
  if (!PERF_CHROMEBOOK) {
    drawLavaOozeRibbon(bx, calderaY, by, 1, t, pulse * 0.85, phase + 1.35);
  }
  const frontOoze = ctx.createLinearGradient(bx, calderaY, bx, by);
  frontOoze.addColorStop(0, "rgba(255, 255, 150, 0.95)");
  frontOoze.addColorStop(1, "rgba(255, 90, 15, 0.88)");
  ctx.fillStyle = frontOoze;
  ctx.beginPath();
  ctx.moveTo(bx - dpr * 7, calderaY);
  ctx.quadraticCurveTo(bx - dpr * 3, calderaY + (by - calderaY) * 0.45, bx - dpr * 5, by + dpr * 2);
  ctx.lineTo(bx + dpr * 5, by + dpr * 2);
  ctx.quadraticCurveTo(bx + dpr * 3, calderaY + (by - calderaY) * 0.45, bx + dpr * 7, calderaY);
  ctx.closePath();
  ctx.fill();
  if (!PERF_CHROMEBOOK) drawLavaOozeDrips(bx, by, t, pulse, phase);
  ctx.shadowBlur = 0;

  ctx.fillStyle = `rgba(255, 200, 60, ${0.65 + pulse * 0.3})`;
  for (let i = 0; i < 8; i++) {
    const bubbleT = (t * 1.8 + i * 0.35 + phase) % 1;
    const px = bx + Math.sin(i * 1.7 + phase) * dpr * 14;
    const py = calderaY - bubbleT * dpr * (60 + peakH * 0.45);
    const br = dpr * (1.4 + (i % 3) * 0.7) * (1 - bubbleT * 0.35);
    ctx.beginPath();
    ctx.arc(px, py, br, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawStormbreakIsleBed() {
  const sandTop = h - dpr * 92;
  const base = sandTop + dpr * 12;
  ctx.fillStyle = "rgba(60, 50, 45, 0.65)";
  ctx.beginPath();
  ctx.moveTo(w * 0.55, base);
  ctx.lineTo(w * 0.72, base - dpr * 28);
  ctx.lineTo(w * 0.88, base);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgba(50, 48, 55, 0.55)";
  ctx.beginPath();
  ctx.moveTo(w * 0.18, base);
  ctx.lineTo(w * 0.24, base - dpr * 20);
  ctx.lineTo(w * 0.3, base);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(80, 70, 60, 0.5)";
  ctx.lineWidth = dpr * 1.2;
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    ctx.moveTo(w * (0.58 + i * 0.04), base - dpr * 4);
    ctx.lineTo(w * (0.62 + i * 0.05), base - dpr * 18);
    ctx.stroke();
  }
  ctx.strokeStyle = "rgba(70, 75, 90, 0.4)";
  ctx.lineWidth = dpr * 2;
  ctx.beginPath();
  ctx.moveTo(w * 0.65, base - dpr * 26);
  ctx.lineTo(w * 0.65, base - dpr * 48);
  ctx.stroke();
}

function drawTreasurehornPeakBed() {
  const sandTop = h - dpr * 92;
  const base = sandTop + dpr * 8;
  ctx.fillStyle = "rgba(70, 65, 60, 0.75)";
  ctx.beginPath();
  ctx.moveTo(w * 0.38, base);
  ctx.lineTo(w * 0.5, base - dpr * 85);
  ctx.lineTo(w * 0.62, base);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgba(50, 48, 45, 0.6)";
  ctx.beginPath();
  ctx.moveTo(w * 0.12, base);
  ctx.lineTo(w * 0.2, base - dpr * 45);
  ctx.lineTo(w * 0.28, base);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgba(240, 210, 80, 0.45)";
  ctx.beginPath();
  ctx.moveTo(w * 0.48, base - dpr * 82);
  ctx.lineTo(w * 0.5, base - dpr * 90);
  ctx.lineTo(w * 0.52, base - dpr * 82);
  ctx.closePath();
  ctx.fill();
  scatterGoldCoins(sandTop + dpr * 4, 8, 7, 18);
}

function drawLeviathanDeepBed() {
  const sandTop = h - dpr * 92;
  for (const vx of [0.25, 0.55, 0.78]) {
    ctx.fillStyle = "rgba(20, 40, 70, 0.55)";
    ctx.beginPath();
    ctx.ellipse(w * vx, sandTop + dpr * 8, dpr * 8, dpr * 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(80, 180, 255, 0.25)";
    ctx.beginPath();
    ctx.ellipse(w * vx, sandTop + dpr * 2, dpr * 3, dpr * 8, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "rgba(8, 18, 35, 0.5)";
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.ellipse(w * (0.1 + i * 0.2), sandTop + dpr * 22, dpr * 6, dpr * 3, i * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawCaptainsLandingBed() {
  const sandTop = h - dpr * 92;
  const base = sandTop + dpr * 14;
  ctx.strokeStyle = "rgba(100, 75, 45, 0.75)";
  ctx.lineWidth = dpr * 2.2;
  ctx.beginPath();
  ctx.arc(w * 0.5, base - dpr * 8, dpr * 22, 0, Math.PI * 2);
  ctx.stroke();
  ctx.lineWidth = dpr * 1.4;
  ctx.beginPath();
  ctx.moveTo(w * 0.5, base - dpr * 30);
  ctx.lineTo(w * 0.5, base);
  ctx.moveTo(w * 0.5 - dpr * 22, base - dpr * 8);
  ctx.lineTo(w * 0.5 + dpr * 22, base - dpr * 8);
  ctx.stroke();
  ctx.fillStyle = "#b91c1c";
  ctx.fillRect(w * 0.72, base - dpr * 48, dpr * 5, dpr * 14);
  for (const px of [0.14, 0.28, 0.72, 0.86]) {
    ctx.fillStyle = "rgba(90, 65, 40, 0.8)";
    ctx.fillRect(w * px - dpr * 2.5, base - dpr * 38, dpr * 5, dpr * 38);
  }
}

function drawIceChunkShape(cx, cy, sc, rot, alpha = 0.92) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rot);
  ctx.globalAlpha = alpha;
  const s = dpr * sc;
  ctx.fillStyle = "rgba(225, 242, 255, 0.94)";
  ctx.strokeStyle = "rgba(150, 210, 240, 0.88)";
  ctx.lineWidth = Math.max(dpr * 0.7, s * 0.12);
  ctx.beginPath();
  ctx.moveTo(-s * 8, s * 2);
  ctx.lineTo(-s * 3, -s * 7);
  ctx.lineTo(s * 5, -s * 5);
  ctx.lineTo(s * 9, s * 3);
  ctx.lineTo(s * 2, s * 7);
  ctx.lineTo(-s * 6, s * 5);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "rgba(255, 255, 255, 0.58)";
  ctx.beginPath();
  ctx.moveTo(-s * 2, -s * 2);
  ctx.lineTo(s * 3, -s * 5);
  ctx.lineTo(s * 5, s * 1);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawIceWaterBed(themeId) {
  const sandTop = h - dpr * 92;
  const base = sandTop + dpr * 10;
  ctx.fillStyle = "rgba(140, 170, 195, 0.35)";
  ctx.beginPath();
  ctx.ellipse(w * 0.5, base + dpr * 4, w * 0.42, dpr * 16, 0, 0, Math.PI * 2);
  ctx.fill();
  for (const px of [0.12, 0.32, 0.58, 0.82]) {
    ctx.fillStyle = "rgba(100, 130, 160, 0.55)";
    ctx.beginPath();
    ctx.moveTo(w * px - dpr * 8, base + dpr * 6);
    ctx.lineTo(w * px, base - dpr * (14 + (px * 100) % 18));
    ctx.lineTo(w * px + dpr * 10, base + dpr * 4);
    ctx.closePath();
    ctx.fill();
  }
  if (themeId === "glacier-maw") {
    ctx.fillStyle = "rgba(210, 235, 250, 0.72)";
    ctx.strokeStyle = "rgba(160, 210, 240, 0.65)";
    ctx.lineWidth = dpr * 1.2;
    ctx.beginPath();
    ctx.moveTo(0, sandTop - dpr * 20);
    ctx.lineTo(0, sandTop - dpr * 95);
    ctx.quadraticCurveTo(w * 0.22, sandTop - dpr * 110, w * 0.38, sandTop - dpr * 75);
    ctx.lineTo(w * 0.38, sandTop - dpr * 15);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(w, sandTop - dpr * 18);
    ctx.lineTo(w, sandTop - dpr * 100);
    ctx.quadraticCurveTo(w * 0.78, sandTop - dpr * 115, w * 0.62, sandTop - dpr * 78);
    ctx.lineTo(w * 0.62, sandTop - dpr * 12);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  if (themeId === "polar-narrows") {
    ctx.fillStyle = "rgba(45, 70, 95, 0.65)";
    ctx.beginPath();
    ctx.moveTo(0, sandTop);
    ctx.lineTo(w * 0.18, sandTop - dpr * 80);
    ctx.lineTo(w * 0.22, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(w, sandTop);
    ctx.lineTo(w * 0.82, sandTop - dpr * 85);
    ctx.lineTo(w * 0.78, h);
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();
  }
  drawIceChunkShape(w * 0.2, base - dpr * 8, 1.1, 0.15, 0.85);
  drawIceChunkShape(w * 0.72, base - dpr * 6, 0.95, -0.2, 0.82);
  drawIceChunkShape(w * 0.48, base - dpr * 12, 1.25, 0.05, 0.88);
}

function drawFrostFjordBed() {
  drawIceWaterBed("frost-fjord");
}
function drawIcebergDriftBed() {
  drawIceWaterBed("iceberg-drift");
}
function drawGlacierMawBed() {
  drawIceWaterBed("glacier-maw");
}
function drawPolarNarrowsBed() {
  drawIceWaterBed("polar-narrows");
}
function drawAuroraReachBed() {
  drawIceWaterBed("aurora-reach");
}

const ADVENTURE_ICE_THEME_VARIANT = {
  "frost-fjord": { chunks: 9, aurora: false, frost: 12 },
  "iceberg-drift": { chunks: 17, aurora: false, frost: 8 },
  "glacier-maw": { chunks: 7, aurora: false, frost: 18 },
  "polar-narrows": { chunks: 11, aurora: false, frost: 14 },
  "aurora-reach": { chunks: 13, aurora: true, frost: 10 },
};

function drawFloatingIceChunks(now, themeId) {
  const t = now * 0.001;
  const v = ADVENTURE_ICE_THEME_VARIANT[themeId] || ADVENTURE_ICE_THEME_VARIANT["frost-fjord"];
  const wh = h - waterTop;
  const n = PERF_CHROMEBOOK ? Math.max(5, Math.floor(v.chunks * 0.55)) : v.chunks;
  for (let i = 0; i < n; i++) {
    const drift = Math.sin(t * 0.22 + i * 1.7) * w * 0.018;
    const px = w * (((i * 137 + 41) % 920) / 1000) + drift;
    const py = waterTop + wh * (0.08 + ((i * 53 + Math.floor(t * 12 + i * 9)) % 720) / 1000);
    const sc = 0.65 + (i % 5) * 0.22;
    const rot = (i * 0.55 + t * 0.08) % (Math.PI * 2);
    const alpha = 0.55 + (i % 4) * 0.1;
    drawIceChunkShape(px, py, sc, rot, alpha);
  }
}

function drawIceFrostParticles(now, count) {
  const t = now * 0.001;
  for (let i = 0; i < perfN(count); i++) {
    const px = w * (((i * 89 + Math.floor(t * 22)) % 1000) / 1000);
    const py = waterTop + ((i * 67 + Math.floor(t * 18 + i * 11)) % 1000) / 1000 * (h - waterTop);
    ctx.fillStyle = `rgba(240, 250, 255, ${0.2 + (i % 3) * 0.08})`;
    ctx.beginPath();
    ctx.arc(px, py, dpr * (0.6 + (i % 2) * 0.35), 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawAuroraShimmer(now) {
  const t = now * 0.001;
  const bands = PERF_CHROMEBOOK ? 3 : 4;
  for (let i = 0; i < bands; i++) {
    const y0 = waterTop + dpr * (8 + i * 22);
    const grad = ctx.createLinearGradient(0, y0, w, y0 + dpr * 40);
    const phase = t * 0.5 + i * 1.2;
    grad.addColorStop(0, `rgba(120, 240, 190, ${0.06 + Math.sin(phase) * 0.03})`);
    grad.addColorStop(0.5, `rgba(140, 180, 255, ${0.08 + Math.sin(phase + 1) * 0.04})`);
    grad.addColorStop(1, `rgba(100, 220, 200, ${0.05 + Math.sin(phase + 2) * 0.03})`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, y0, w, dpr * 45);
  }
}

function drawAdventureIceThemeEffect(now, themeId) {
  const t = now * 0.001;
  const v = ADVENTURE_ICE_THEME_VARIANT[themeId] || ADVENTURE_ICE_THEME_VARIANT["frost-fjord"];
  const wh = h - waterTop;

  if (v.aurora) drawAuroraShimmer(now);

  const coldHaze = ctx.createLinearGradient(0, waterTop, 0, h);
  coldHaze.addColorStop(0, "rgba(210, 240, 255, 0.1)");
  coldHaze.addColorStop(0.45, "rgba(160, 200, 230, 0.06)");
  coldHaze.addColorStop(1, "rgba(40, 70, 100, 0.14)");
  ctx.fillStyle = coldHaze;
  ctx.fillRect(0, waterTop, w, wh);

  drawFloatingIceChunks(now, themeId);
  drawIceFrostParticles(now, v.frost);

  const surfaceSheen = ctx.createLinearGradient(0, waterTop, 0, waterTop + dpr * 80);
  surfaceSheen.addColorStop(0, "rgba(240, 250, 255, 0.22)");
  surfaceSheen.addColorStop(1, "rgba(200, 230, 250, 0)");
  ctx.fillStyle = surfaceSheen;
  ctx.fillRect(0, waterTop, w, dpr * 80);

  ctx.strokeStyle = "rgba(200, 230, 255, 0.12)";
  ctx.lineWidth = dpr * 0.8;
  for (let i = 0; i < perfN(6); i++) {
    const y = waterTop + dpr * (20 + i * 28 + Math.sin(t + i) * 4);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.quadraticCurveTo(w * 0.5, y + dpr * 3, w, y);
    ctx.stroke();
  }
}

const ADVENTURE_THEME_BED_DRAW = {
  "skull-shoals": drawSkullShoalsGraveyardBed,
  "mariners-rest": drawMarinersRestBed,
  "golden-atoll": drawGoldenAtollBed,
  "serpent-strait": drawSerpentStraitBed,
  "doubloon-bay": drawDoubloonBayBed,
  "compass-cay": drawCompassCayBed,
  "krakens-teeth": drawKrakensTeethBed,
  "palmwood-harbor": drawPalmwoodHarborBed,
  "emerald-lagoon": drawEmeraldLagoonBed,
  "lava-falls": drawLavaFallsBed,
  "stormbreak-isle": drawStormbreakIsleBed,
  "treasurehorn-peak": drawTreasurehornPeakBed,
  "leviathan-deep": drawLeviathanDeepBed,
  "captains-landing": drawCaptainsLandingBed,
  "treasure-cove": drawTreasureCoveBed,
  "frost-fjord": drawFrostFjordBed,
  "iceberg-drift": drawIcebergDriftBed,
  "glacier-maw": drawGlacierMawBed,
  "polar-narrows": drawPolarNarrowsBed,
  "aurora-reach": drawAuroraReachBed,
};

function drawAdventureThemeBed(themeId) {
  const draw = ADVENTURE_THEME_BED_DRAW[themeId];
  if (draw) draw();
}

function drawAdventureGoldGlintsHeavy(now, count) {
  const t = now * 0.001;
  const n = PERF_CHROMEBOOK ? Math.min(count, Math.max(8, Math.floor(count * 0.45))) : count;
  for (let i = 0; i < perfN(n); i++) {
    const px = ((i * 97 + Math.floor(t * 40 + i * 17)) % 1000) / 1000;
    const py = 0.35 + ((i * 53 + Math.floor(t * 25)) % 550) / 1000;
    const x = px * w;
    const y = waterTop + py * (h - waterTop);
    const r = dpr * (1.4 + (i % 4) * 0.7);
    ctx.fillStyle = `rgba(255, 220, 80, ${0.18 + (i % 5) * 0.07})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawTreasureCoveGodRays(now) {
  const t = now * 0.001;
  const wy = waterTop;
  const rayCount = PERF_CHROMEBOOK ? 4 : 6;
  for (let i = 0; i < rayCount; i++) {
    const cx = w * (0.34 + i * 0.06);
    const sway = Math.sin(t * 0.45 + i * 1.1) * w * 0.012;
    const grad = ctx.createLinearGradient(cx + sway, wy, cx + sway * 2, h);
    grad.addColorStop(0, "rgba(255, 235, 180, 0.16)");
    grad.addColorStop(0.35, "rgba(255, 205, 110, 0.09)");
    grad.addColorStop(0.72, "rgba(255, 180, 80, 0.04)");
    grad.addColorStop(1, "rgba(255, 160, 60, 0)");
    ctx.fillStyle = grad;
    ctx.globalAlpha = 0.65 + Math.sin(t * 0.7 + i) * 0.1;
    ctx.beginPath();
    ctx.moveTo(cx - w * 0.035 + sway, wy);
    ctx.lineTo(cx + w * 0.045 + sway, wy);
    ctx.lineTo(cx + w * 0.12 + i * 0.012, h);
    ctx.lineTo(cx - w * 0.07, h);
    ctx.closePath();
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawAdventureTreasureCoveEffect(now) {
  const t = now * 0.001;
  const sandTop = h - dpr * 92;
  const wh = h - waterTop;

  drawTreasureCoveGodRays(now);

  const caveMouth = ctx.createRadialGradient(w * 0.5, waterTop, 0, w * 0.5, waterTop + wh * 0.35, w * 0.55);
  caveMouth.addColorStop(0, "rgba(255, 240, 190, 0.12)");
  caveMouth.addColorStop(0.45, "rgba(120, 180, 200, 0.06)");
  caveMouth.addColorStop(1, "rgba(8, 28, 38, 0)");
  ctx.fillStyle = caveMouth;
  ctx.fillRect(0, waterTop, w, wh);

  const treasureGlow = ctx.createRadialGradient(w * 0.42, sandTop - dpr * 8, 0, w * 0.42, sandTop, w * 0.38);
  treasureGlow.addColorStop(0, "rgba(255, 210, 90, 0.24)");
  treasureGlow.addColorStop(0.55, "rgba(255, 180, 60, 0.1)");
  treasureGlow.addColorStop(1, "rgba(255, 160, 40, 0)");
  ctx.fillStyle = treasureGlow;
  ctx.fillRect(0, sandTop - dpr * 40, w, h - sandTop + dpr * 40);

  drawAdventureGoldGlintsHeavy(now, PERF_CHROMEBOOK ? 16 : 22);

  const vig = ctx.createRadialGradient(w * 0.5, h * 0.52, w * 0.08, w * 0.5, h * 0.52, w * 0.92);
  vig.addColorStop(0, "rgba(0, 0, 0, 0)");
  vig.addColorStop(0.75, "rgba(0, 18, 28, 0.18)");
  vig.addColorStop(1, "rgba(0, 12, 22, 0.42)");
  ctx.fillStyle = vig;
  ctx.fillRect(0, waterTop, w, wh);

  ctx.fillStyle = "rgba(160, 210, 225, 0.22)";
  for (let i = 0; i < perfN(10); i++) {
    const bx = w * (0.2 + ((i * 73 + Math.floor(t * 14)) % 620) / 1000);
    const by = waterTop + dpr * (12 + (i * 37) % Math.floor(wh * 0.55));
    ctx.beginPath();
    ctx.arc(bx, by, dpr * (0.8 + (i % 2) * 0.35), 0, Math.PI * 2);
    ctx.fill();
  }
}

/** Vague giant eel lurking in the deep background at Serpent Strait. */
function drawVagueSerpentSilhouette(now) {
  const t = now * 0.00035;
  const wy = waterTop;
  const wh = h - waterTop;
  const sway = Math.sin(t * 0.65) * w * 0.022;
  const n = 30;
  const pts = [];

  for (let i = 0; i <= n; i++) {
    const u = i / n;
    const x =
      w * (-0.08 + u * 1.18) +
      sway * Math.sin(u * Math.PI * 2.1 + t * 1.1) +
      Math.sin(u * 5.5 + t * 1.4) * w * 0.01;
    const y =
      wy +
      wh * (0.4 + 0.13 * Math.sin(u * Math.PI * 1.5 + t * 0.75) + 0.035 * Math.sin(u * 9 + t * 2));
    pts.push({ x, y, u });
  }

  function halfWidth(u) {
    if (u < 0.1) return dpr * (2 + u * 110);
    if (u > 0.88) return dpr * Math.max(3, 11 - (u - 0.88) * 70);
    return dpr * 13;
  }

  function normalAt(i) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[Math.min(n, i + 1)];
    const dx = p1.x - p0.x;
    const dy = p1.y - p0.y;
    const len = Math.hypot(dx, dy) || 1;
    return { nx: -dy / len, ny: dx / len };
  }

  ctx.save();
  ctx.lineJoin = "round";

  ctx.globalAlpha = 0.085;
  ctx.fillStyle = "rgba(12, 42, 38, 0.92)";
  ctx.beginPath();
  for (let i = 0; i <= n; i++) {
    const { nx, ny } = normalAt(i);
    const hw = halfWidth(pts[i].u);
    const px = pts[i].x + nx * hw;
    const py = pts[i].y + ny * hw;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  for (let i = n; i >= 0; i--) {
    const { nx, ny } = normalAt(i);
    const hw = halfWidth(pts[i].u);
    ctx.lineTo(pts[i].x - nx * hw, pts[i].y - ny * hw);
  }
  ctx.closePath();
  ctx.fill();

  ctx.globalAlpha = 0.055;
  ctx.fillStyle = "rgba(22, 58, 50, 0.5)";
  for (let i = 2; i < n - 2; i += 2) {
    const { nx, ny } = normalAt(i);
    const hw = halfWidth(pts[i].u) * 0.55;
    ctx.beginPath();
    ctx.ellipse(pts[i].x - nx * hw * 0.3, pts[i].y - ny * hw * 0.3, hw * 0.9, hw * 0.45, Math.atan2(ny, nx), 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 0.07;
  ctx.strokeStyle = "rgba(28, 72, 62, 0.65)";
  ctx.lineWidth = dpr * 2.2;
  ctx.lineCap = "round";
  ctx.beginPath();
  for (let i = 0; i <= n; i++) {
    const { nx, ny } = normalAt(i);
    const fin = Math.sin(pts[i].u * 24 + t * 3.2) * dpr * 4;
    const px = pts[i].x + nx * (halfWidth(pts[i].u) + dpr * 3 + fin);
    const py = pts[i].y + ny * (halfWidth(pts[i].u) + dpr * 3 + fin);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();

  ctx.globalAlpha = 0.045;
  ctx.strokeStyle = "rgba(35, 85, 72, 0.45)";
  ctx.lineWidth = dpr * 1.4;
  ctx.beginPath();
  for (let i = 0; i <= n; i++) {
    const { nx, ny } = normalAt(i);
    const fin = Math.sin(pts[i].u * 20 + t * 2.8 + 1) * dpr * 2.5;
    const px = pts[i].x - nx * (halfWidth(pts[i].u) * 0.65 + fin);
    const py = pts[i].y - ny * (halfWidth(pts[i].u) * 0.65 + fin);
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();

  const head = pts[n];
  const hn = normalAt(n);
  const ang = Math.atan2(hn.ny, hn.nx);
  const hx = head.x + hn.nx * dpr * 8;
  const hy = head.y + hn.ny * dpr * 8;
  ctx.globalAlpha = 0.1;
  ctx.fillStyle = "rgba(14, 40, 36, 0.9)";
  ctx.beginPath();
  ctx.ellipse(hx, hy, dpr * 20, dpr * 9, ang, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 0.16;
  ctx.fillStyle = "rgba(210, 195, 75, 0.55)";
  const eyeOff = dpr * 7;
  ctx.beginPath();
  ctx.arc(hx + Math.cos(ang) * eyeOff - Math.sin(ang) * dpr * 3, hy + Math.sin(ang) * eyeOff + Math.cos(ang) * dpr * 3, dpr * 2.2, 0, Math.PI * 2);
  ctx.arc(hx + Math.cos(ang) * eyeOff + Math.sin(ang) * dpr * 3, hy + Math.sin(ang) * eyeOff - Math.cos(ang) * dpr * 3, dpr * 2.2, 0, Math.PI * 2);
  ctx.fill();

  const tail = pts[0];
  const tn = normalAt(0);
  ctx.globalAlpha = 0.08;
  ctx.fillStyle = "rgba(10, 36, 32, 0.85)";
  ctx.beginPath();
  ctx.moveTo(tail.x, tail.y);
  ctx.lineTo(tail.x - tn.nx * dpr * 22 - tn.ny * dpr * 4, tail.y - tn.ny * dpr * 22 + tn.nx * dpr * 4);
  ctx.lineTo(tail.x - tn.nx * dpr * 22 + tn.ny * dpr * 4, tail.y - tn.ny * dpr * 22 - tn.nx * dpr * 4);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawVagueLeviathanSilhouette(now) {
  const t = now * 0.00025;
  const wy = waterTop;
  const wh = h - waterTop;
  const cy = wy + wh * 0.48 + Math.sin(t) * dpr * 6;

  ctx.save();
  ctx.globalAlpha = 0.06;
  ctx.fillStyle = "rgba(4, 12, 28, 0.9)";
  ctx.beginPath();
  ctx.ellipse(w * 0.5, cy, w * 0.55, wh * 0.22, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 0.12;
  ctx.fillStyle = "rgba(50, 160, 255, 0.7)";
  ctx.beginPath();
  ctx.ellipse(w * 0.38 + Math.sin(t) * w * 0.02, cy - wh * 0.04, dpr * 8, dpr * 5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(w * 0.62 - Math.sin(t * 0.8) * w * 0.02, cy - wh * 0.03, dpr * 7, dpr * 4.5, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawAdventureDoubloonBayEffect(now) {
  const clear = ctx.createLinearGradient(0, waterTop, 0, h);
  clear.addColorStop(0, "rgba(170, 220, 245, 0.14)");
  clear.addColorStop(0.45, "rgba(120, 175, 205, 0.08)");
  clear.addColorStop(1, "rgba(255, 235, 170, 0.1)");
  ctx.fillStyle = clear;
  ctx.fillRect(0, waterTop, w, h - waterTop);

  ctx.save();
  ctx.globalAlpha = 0.09;
  for (let i = 0; i < 5; i++) {
    const sx = w * (0.15 + i * 0.14);
    const g = ctx.createLinearGradient(sx, waterTop, sx + w * 0.1, h);
    g.addColorStop(0, "rgba(255, 250, 220, 0.55)");
    g.addColorStop(1, "rgba(255, 250, 220, 0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(sx, waterTop);
    ctx.lineTo(sx + w * 0.14, h);
    ctx.lineTo(sx + w * 0.04, h);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();

  drawAdventureGoldGlintsHeavy(now, 12);
  const sandTop = h - dpr * 92;
  scatterGoldCoins(sandTop, 6, 11, 14);
}

function drawAdventureGoldenAtollEffect(now) {
  drawAdventureGoldGlintsHeavy(now, 14);
  const warm = ctx.createLinearGradient(w * 0.3, waterTop, w * 0.7, h);
  warm.addColorStop(0, "rgba(255, 230, 140, 0.14)");
  warm.addColorStop(1, "rgba(255, 200, 80, 0)");
  ctx.fillStyle = warm;
  ctx.fillRect(0, waterTop, w, h - waterTop);
}

function drawAdventureSerpentStraitEffect(now) {
  const t = now * 0.001;
  const wh = h - waterTop;
  const mist = ctx.createLinearGradient(0, waterTop + wh * 0.3, 0, h);
  mist.addColorStop(0, "rgba(35, 75, 65, 0.06)");
  mist.addColorStop(1, "rgba(20, 45, 42, 0.14)");
  ctx.fillStyle = mist;
  ctx.fillRect(0, waterTop + wh * 0.3, w, wh * 0.7);
  if (Math.sin(t * 0.8) > 0.55) {
    ctx.strokeStyle = "rgba(45, 110, 92, 0.1)";
    ctx.lineWidth = dpr * 2.5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-w * 0.1, waterTop + wh * 0.55);
    ctx.quadraticCurveTo(w * 0.4, waterTop + wh * 0.38, w * 0.72, waterTop + wh * 0.48);
    ctx.quadraticCurveTo(w * 0.95, waterTop + wh * 0.42, w * 1.08, waterTop + wh * 0.52);
    ctx.stroke();
  }
}

function drawAdventureKrakensTeethEffect(now) {
  const t = now * 0.001;
  ctx.fillStyle = "rgba(60, 15, 35, 0.12)";
  ctx.fillRect(0, waterTop, w, h - waterTop);
  if (Math.sin(t * 0.6) > 0.5) {
    ctx.strokeStyle = "rgba(90, 30, 50, 0.2)";
    ctx.lineWidth = dpr * 6;
    ctx.lineCap = "round";
    for (let i = 0; i < 4; i++) {
      const ox = w * (0.15 + i * 0.22);
      ctx.beginPath();
      ctx.moveTo(ox, h - dpr * 80);
      ctx.quadraticCurveTo(ox + dpr * 30, waterTop + (h - waterTop) * 0.5, ox - dpr * 20, waterTop + dpr * 20);
      ctx.stroke();
    }
  }
}

function drawAdventureLavaFallsEffect(now) {
  const t = now * 0.001;
  const pulse = 0.5 + 0.5 * Math.sin(t * 1.2);

  const murkyWater = ctx.createLinearGradient(0, waterTop, 0, h);
  murkyWater.addColorStop(0, "rgba(12, 38, 48, 0.32)");
  murkyWater.addColorStop(0.45, "rgba(18, 42, 52, 0.38)");
  murkyWater.addColorStop(1, "rgba(10, 28, 36, 0.42)");
  ctx.fillStyle = murkyWater;
  ctx.fillRect(0, waterTop, w, h - waterTop);

  const sunWash = ctx.createRadialGradient(w * 0.5, waterTop, 0, w * 0.5, waterTop + (h - waterTop) * 0.65, w * 0.78);
  sunWash.addColorStop(0, "rgba(255, 245, 210, 0.22)");
  sunWash.addColorStop(0.45, "rgba(255, 200, 120, 0.14)");
  sunWash.addColorStop(1, "rgba(255, 140, 60, 0)");
  ctx.fillStyle = sunWash;
  ctx.fillRect(0, waterTop, w, h - waterTop);

  const sandTop = h - dpr * 92;
  const base = sandTop + dpr * 12;
  if (!PERF_CHROMEBOOK) {
    for (const v of LAVA_FALLS_VOLCANOES) {
      const bx = w * v.cx;
      const floorGlow = ctx.createRadialGradient(bx, base, 0, bx, base - dpr * 40, dpr * (90 + pulse * 30));
      floorGlow.addColorStop(0, `rgba(255, 180, 50, ${0.35 + pulse * 0.15})`);
      floorGlow.addColorStop(0.6, `rgba(255, 100, 20, ${0.12 + pulse * 0.08})`);
      floorGlow.addColorStop(1, "rgba(255, 80, 10, 0)");
      ctx.fillStyle = floorGlow;
      ctx.fillRect(0, waterTop, w, h - waterTop);
    }
  } else {
    const floorGlow = ctx.createRadialGradient(w * 0.5, base, 0, w * 0.5, base - dpr * 50, w * 0.55);
    floorGlow.addColorStop(0, `rgba(255, 170, 45, ${0.28 + pulse * 0.12})`);
    floorGlow.addColorStop(1, "rgba(255, 80, 10, 0)");
    ctx.fillStyle = floorGlow;
    ctx.fillRect(0, waterTop, w, h - waterTop);
  }

  for (const v of LAVA_FALLS_VOLCANOES) {
    drawLavaFallsVolcanoEruption(now, v.cx, v.peakH, v.phase);
  }

  drawLavaFallsFloatingAsh(now);

  ctx.fillStyle = "rgba(255, 220, 100, 0.45)";
  for (let i = 0; i < perfN(16); i++) {
    const bx = ((i * 113 + Math.floor(t * 22 + i * 7)) % 1000) / 1000 * w;
    const by = waterTop + ((i * 79 + Math.floor(t * 18)) % 1000) / 1000 * (h - waterTop);
    const r = dpr * (1 + (i % 3) * 0.55);
    ctx.beginPath();
    ctx.arc(bx, by, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawAdventureCompassCayEffect(now) {
  if (Math.sin(now * 0.002) > 0.7) {
    ctx.strokeStyle = "rgba(255, 220, 160, 0.15)";
    ctx.lineWidth = dpr * 1.5;
    const cx = w * 0.5;
    const cy = h - dpr * 54;
    ctx.beginPath();
    ctx.moveTo(cx, cy - dpr * 20);
    ctx.lineTo(cx, cy + dpr * 20);
    ctx.moveTo(cx - dpr * 20, cy);
    ctx.lineTo(cx + dpr * 20, cy);
    ctx.stroke();
  }
}

function drawAdventurePalmwoodHarborEffect(now) {
  const haze = ctx.createLinearGradient(0, waterTop, 0, h);
  haze.addColorStop(0, "rgba(180, 230, 255, 0.12)");
  haze.addColorStop(0.55, "rgba(120, 200, 220, 0.08)");
  haze.addColorStop(1, "rgba(210, 175, 95, 0.1)");
  ctx.fillStyle = haze;
  ctx.fillRect(0, waterTop, w, h - waterTop);
  drawAdventureGoldGlints(now);
}

function drawAdventureEmeraldLagoonEffect(now) {
  const glow = ctx.createRadialGradient(w * 0.5, waterTop + (h - waterTop) * 0.45, 0, w * 0.5, waterTop + (h - waterTop) * 0.45, w * 0.45);
  glow.addColorStop(0, "rgba(80, 255, 160, 0.14)");
  glow.addColorStop(1, "rgba(80, 255, 160, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, waterTop, w, h - waterTop);
  const t = now * 0.001;
  ctx.fillStyle = "rgba(100, 255, 180, 0.35)";
  for (let i = 0; i < perfN(12); i++) {
    const bx = ((i * 113 + Math.floor(t * 20)) % 1000) / 1000 * w;
    const by = waterTop + ((i * 79) % 1000) / 1000 * (h - waterTop);
    ctx.beginPath();
    ctx.arc(bx, by, dpr * (1.2 + (i % 3) * 0.4), 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawAdventureTreasurehornPeakEffect(now) {
  const fog = ctx.createLinearGradient(0, waterTop, 0, h);
  fog.addColorStop(0, "rgba(180, 170, 160, 0.08)");
  fog.addColorStop(0.6, "rgba(120, 110, 100, 0.12)");
  fog.addColorStop(1, "rgba(80, 70, 60, 0.06)");
  ctx.fillStyle = fog;
  ctx.fillRect(0, waterTop, w, h - waterTop);
}

function drawAdventureLeviathanDeepEffect(now) {
  ctx.fillStyle = "rgba(0, 8, 20, 0.18)";
  ctx.fillRect(0, waterTop + (h - waterTop) * 0.35, w, (h - waterTop) * 0.65);
  const t = now * 0.001;
  ctx.fillStyle = "rgba(60, 140, 255, 0.4)";
  for (let i = 0; i < perfN(10); i++) {
    const bx = ((i * 127 + Math.floor(t * 8)) % 1000) / 1000 * w;
    const by = waterTop + (h - waterTop) * (0.5 + ((i * 61) % 450) / 1000);
    ctx.beginPath();
    ctx.arc(bx, by, dpr * (0.8 + (i % 3) * 0.5), 0, Math.PI * 2);
    ctx.fill();
  }
}

let stormThunderLastAt = 0;

function drawStormbreakLightningBolt(sx, sy, ex, ey, width) {
  ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.shadowColor = "rgba(200, 220, 255, 0.9)";
  ctx.shadowBlur = dpr * 8;
  ctx.beginPath();
  ctx.moveTo(sx, sy);
  let x = sx;
  let y = sy;
  const steps = 6;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    x = sx + (ex - sx) * t + (Math.sin(i * 2.7) * w * 0.018);
    y = sy + (ey - sy) * t;
    ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.strokeStyle = "rgba(180, 210, 255, 0.55)";
  ctx.lineWidth = width * 2.2;
  ctx.shadowBlur = dpr * 14;
  ctx.stroke();
  ctx.shadowBlur = 0;
}

function playStormThunderSound() {
  if (!musicEnabled) return;
  const ac = ensureMusicContext();
  if (!ac || !musicMaster) return;
  if (ac.state === "suspended") ac.resume();
  const now = ac.currentTime + 0.02;
  const dur = 2.4;
  const buffer = musicCtx.createBuffer(1, Math.floor(musicCtx.sampleRate * dur), musicCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    const decay = 1 - i / data.length;
    data[i] = (Math.random() * 2 - 1) * decay * decay;
  }
  const src = musicCtx.createBufferSource();
  const lp = musicCtx.createBiquadFilter();
  const g = musicCtx.createGain();
  src.buffer = buffer;
  lp.type = "lowpass";
  lp.frequency.value = 180;
  g.gain.setValueAtTime(0.14, now);
  g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
  src.connect(lp);
  lp.connect(g);
  g.connect(musicMaster);
  src.start(now);
  playMusicNote(55, now + 0.05, 1.1, 0.05, "sine");
  playMusicNote(41.2, now + 0.12, 0.85, 0.042, "sine");
  playNoiseHit(now + 0.06, 0.35, 0.055);
}

function drawAdventureStormbreakIsleEffect(now) {
  const t = now * 0.001;
  const flashA = Math.sin(now * 0.0055) > 0.86;
  const flashB = Math.sin(now * 0.0038 + 2.1) > 0.9;
  const flash = flashA || flashB;

  ctx.strokeStyle = "rgba(160, 180, 220, 0.35)";
  ctx.lineWidth = dpr * 1.1;
  for (let i = 0; i < perfN(22); i++) {
    const rx = ((i * 97 + Math.floor(t * 55)) % 1000) / 1000 * w;
    const ry = waterTop + ((i * 43) % 1000) / 1000 * (h - waterTop) * 0.85;
    ctx.beginPath();
    ctx.moveTo(rx, ry);
    ctx.lineTo(rx + dpr * (2 + (i % 3)), ry + dpr * (12 + (i % 5) * 4));
    ctx.stroke();
  }

  if (flash) {
    const boltX = w * (0.28 + (Math.sin(now * 0.0013) * 0.5 + 0.5) * 0.44);
    drawStormbreakLightningBolt(boltX, waterTop + dpr * 8, boltX + dpr * 28, h - dpr * 120, dpr * 2.4);
    if (Math.random() > 0.45) {
      drawStormbreakLightningBolt(w * 0.72, waterTop + dpr * 12, w * 0.68, h - dpr * 90, dpr * 1.8);
    }
    ctx.fillStyle = flashB ? "rgba(255, 255, 255, 0.42)" : "rgba(240, 245, 255, 0.28)";
    ctx.fillRect(0, waterTop, w, h - waterTop);
    if (musicEnabled && now - stormThunderLastAt > 1400) {
      stormThunderLastAt = now;
      playStormThunderSound();
    }
  } else if (Math.sin(t * 1.4) > 0.88) {
    ctx.fillStyle = "rgba(200, 210, 240, 0.1)";
    ctx.fillRect(0, waterTop, w, (h - waterTop) * 0.4);
  }
}

function drawAdventureCaptainsLandingEffect(now) {
  const lantern = ctx.createRadialGradient(w * 0.72, waterTop + dpr * 40, 0, w * 0.72, waterTop + dpr * 40, dpr * 80);
  lantern.addColorStop(0, "rgba(255, 200, 100, 0.16)");
  lantern.addColorStop(1, "rgba(255, 200, 100, 0)");
  ctx.fillStyle = lantern;
  ctx.fillRect(0, waterTop, w, h - waterTop);
}

function drawAdventureMarinersRestEffect(now) {
  drawAdventureMoonBeam();
}

const ADVENTURE_THEME_EFFECT_DRAW = {
  skull: drawAdventureSkullShoalsEffect,
  moon: drawAdventureMarinersRestEffect,
  storm: drawAdventureStormFlash,
  "stormbreak-isle": drawAdventureStormbreakIsleEffect,
  "golden-atoll": drawAdventureGoldenAtollEffect,
  "serpent-strait": drawAdventureSerpentStraitEffect,
  "doubloon-bay": drawAdventureDoubloonBayEffect,
  "compass-cay": drawAdventureCompassCayEffect,
  "krakens-teeth": drawAdventureKrakensTeethEffect,
  "palmwood-harbor": drawAdventurePalmwoodHarborEffect,
  "emerald-lagoon": drawAdventureEmeraldLagoonEffect,
  "lava-falls": drawAdventureLavaFallsEffect,
  "treasurehorn-peak": drawAdventureTreasurehornPeakEffect,
  "leviathan-deep": drawAdventureLeviathanDeepEffect,
  "captains-landing": drawAdventureCaptainsLandingEffect,
  "treasure-cove": drawAdventureTreasureCoveEffect,
  "frost-fjord": (now) => drawAdventureIceThemeEffect(now, "frost-fjord"),
  "iceberg-drift": (now) => drawAdventureIceThemeEffect(now, "iceberg-drift"),
  "glacier-maw": (now) => drawAdventureIceThemeEffect(now, "glacier-maw"),
  "polar-narrows": (now) => drawAdventureIceThemeEffect(now, "polar-narrows"),
  "aurora-reach": (now) => drawAdventureIceThemeEffect(now, "aurora-reach"),
};

const ADVENTURE_BONUS_THEME_BASE = {
  "bounty-trench": "leviathan-deep",
  "molten-maelstrom": "lava-falls",
  "pearl-abyss": "emerald-lagoon",
  "crown-reef": "golden-atoll",
  "legends-gate": "treasure-cove",
};

const ADVENTURE_GOLD_QUEST_THEMES = [
  "bounty-trench",
  "molten-maelstrom",
  "pearl-abyss",
  "crown-reef",
  "legends-gate",
];

const ADVENTURE_GOLD_QUEST_SAND = {
  stops: [
    [0, "rgba(255, 230, 160, 0)"],
    [0.35, "rgba(245, 215, 125, 0.26)"],
    [0.72, "rgba(225, 185, 85, 0.44)"],
    [1, "rgba(190, 150, 60, 0.56)"],
  ],
  speck: "rgba(255, 225, 120, 0.3)",
};

function drawAdventureGoldQuestFloorGlow(now) {
  const sandTop = h - dpr * 92;
  const treasureGlow = ctx.createRadialGradient(w * 0.5, sandTop - dpr * 6, 0, w * 0.5, sandTop, w * 0.44);
  treasureGlow.addColorStop(0, "rgba(255, 210, 90, 0.2)");
  treasureGlow.addColorStop(0.55, "rgba(255, 180, 60, 0.09)");
  treasureGlow.addColorStop(1, "rgba(255, 160, 40, 0)");
  ctx.fillStyle = treasureGlow;
  ctx.fillRect(0, sandTop - dpr * 40, w, h - sandTop + dpr * 40);
  drawAdventureGoldGlintsHeavy(now, PERF_CHROMEBOOK ? 14 : 20);
}

function registerAdventureBonusThemes() {
  for (const [slug, base] of Object.entries(ADVENTURE_BONUS_THEME_BASE)) {
    if (ADVENTURE_THEME_SAND[base]) ADVENTURE_THEME_SAND[slug] = { ...ADVENTURE_THEME_SAND[base] };
    if (ADVENTURE_THEME_REEF_OVERRIDES[base]) {
      ADVENTURE_THEME_REEF_OVERRIDES[slug] = { ...ADVENTURE_THEME_REEF_OVERRIDES[base] };
    }
    if (ADVENTURE_PLAY_ATMOSPHERE[base]) {
      ADVENTURE_PLAY_ATMOSPHERE[slug] = {
        stops: ADVENTURE_PLAY_ATMOSPHERE[base].stops.map(([s, c]) => [s, c]),
        effect: slug,
      };
    }
    if (ADVENTURE_THEME_BED_DRAW[base]) ADVENTURE_THEME_BED_DRAW[slug] = ADVENTURE_THEME_BED_DRAW[base];
    if (ADVENTURE_THEME_EFFECT_DRAW[base]) ADVENTURE_THEME_EFFECT_DRAW[slug] = ADVENTURE_THEME_EFFECT_DRAW[base];
    if (ADVENTURE_THEME_REEF_ID[base]) ADVENTURE_THEME_REEF_ID[slug] = ADVENTURE_THEME_REEF_ID[base];
  }
  registerGoldQuestTreasureBeds();
}

function registerGoldQuestTreasureBeds() {
  const treasureSeeds = {
    "bounty-trench": 21,
    "molten-maelstrom": 22,
    "pearl-abyss": 23,
    "crown-reef": 24,
  };
  for (const slug of ADVENTURE_GOLD_QUEST_THEMES) {
    ADVENTURE_THEME_SAND[slug] = { ...ADVENTURE_GOLD_QUEST_SAND };
    if (slug === "legends-gate") continue;
    const baseDraw = ADVENTURE_THEME_BED_DRAW[slug];
    if (!baseDraw) continue;
    const seed = treasureSeeds[slug] || 20;
    ADVENTURE_THEME_BED_DRAW[slug] = () => {
      baseDraw();
      drawCaveOfWondersFloorTreasure(h - dpr * 92, seed, 0.88);
    };
    const baseEffect = ADVENTURE_THEME_EFFECT_DRAW[slug];
    if (baseEffect) {
      ADVENTURE_THEME_EFFECT_DRAW[slug] = (now) => {
        baseEffect(now);
        drawAdventureGoldQuestFloorGlow(now);
      };
    }
  }
}
registerAdventureBonusThemes();

function adventurePassScoreForIndex(i) {
  if (i < ADVENTURE_MAIN_LEVEL_COUNT) {
    return 3000 + Math.round((i * (7000 - 3000)) / Math.max(1, ADVENTURE_MAIN_LEVEL_COUNT - 1));
  }
  if (i < ADVENTURE_ICE_START_INDEX) {
    const bonusI = i - ADVENTURE_MAIN_LEVEL_COUNT;
    return 7500 + Math.round((bonusI * (9000 - 7500)) / Math.max(1, ADVENTURE_BONUS_LEVEL_COUNT - 1));
  }
  const iceI = i - ADVENTURE_ICE_START_INDEX;
  return 9250 + Math.round((iceI * (11000 - 9250)) / Math.max(1, ADVENTURE_ICE_LEVEL_COUNT - 1));
}

function drawAdventureThemeOverlayInner(now) {
  const themeId = getAdventureLevelTheme(adventureSession.levelIndex);
  const atm = ADVENTURE_PLAY_ATMOSPHERE[themeId];
  if (!atm) return;

  if (themeId === "serpent-strait") drawVagueSerpentSilhouette(now);
  if (themeId === "leviathan-deep" || themeId === "bounty-trench") drawVagueLeviathanSilhouette(now);

  const g = ctx.createLinearGradient(0, waterTop, 0, h);
  for (const [stop, color] of atm.stops) g.addColorStop(stop, color);
  ctx.fillStyle = g;
  ctx.fillRect(0, waterTop, w, h - waterTop);

  const drawEffect = ADVENTURE_THEME_EFFECT_DRAW[atm.effect];
  if (drawEffect) drawEffect(now);
}

function drawAdventureThemeOverlay(now) {
  if (!adventureSession || w <= 0) return;
  drawAdventureThemeOverlayInner(now);
}

function applyAdventurePlayThemeClasses(themeId) {
  if (!appRoot) return;
  appRoot.classList.add("app--adventure-play");
  for (const tid of ADVENTURE_LEVEL_THEMES) {
    appRoot.classList.toggle(`app--adventure-theme-${tid}`, tid === themeId);
  }
}

function clearAdventurePlayThemeClasses() {
  if (!appRoot) return;
  appRoot.classList.remove("app--adventure-play");
  for (const tid of ADVENTURE_LEVEL_THEMES) {
    appRoot.classList.remove(`app--adventure-theme-${tid}`);
  }
}

function updateAdventurePlayTheme(levelIndex) {
  const lvl = getAdventureLevel(levelIndex);
  const themeId = getAdventureLevelTheme(levelIndex);
  if (adventurePlayTheme) {
    adventurePlayTheme.hidden = false;
    adventurePlayTheme.className = `adventure-play-theme adventure-play-theme--${themeId}`;
  }
  if (adventurePlayScene) adventurePlayScene.innerHTML = cachedAdventureMapSceneSvg(themeId, "play");
  if (adventurePlayName) adventurePlayName.textContent = lvl.name;
  if (adventureGoalLine) {
    adventureGoalLine.hidden = false;
    adventureGoalLine.textContent = `Goal: ${lvl.passScore} pts`;
  }
  applyAdventurePlayThemeClasses(themeId);
  invalidateBackgroundCache();
}

function clearAdventurePlayTheme() {
  if (adventurePlayTheme) adventurePlayTheme.hidden = true;
  if (adventurePlayScene) adventurePlayScene.innerHTML = "";
  if (adventurePlayName) adventurePlayName.textContent = "";
  if (adventureGoalLine) adventureGoalLine.hidden = true;
  clearAdventurePlayThemeClasses();
  invalidateBackgroundCache();
}

function fillAdventureResultTheme(container, levelIndex) {
  if (!container) return;
  const lvl = getAdventureLevel(levelIndex);
  const themeId = getAdventureLevelTheme(levelIndex);
  container.hidden = false;
  container.setAttribute("aria-hidden", "false");
  container.className = `adventure-result-theme adventure-result-theme--${themeId}`;
  container.innerHTML = `${cachedAdventureMapSceneSvg(themeId, "res")}<span class="adventure-result-theme__name">${lvl.name}</span>`;
}

function defaultMeta() {
  return {
    coins: 0,
    baitCounts: {},
    selectedBaitId: "standard",
    ownedRodIds: [FREE_ROD_ID],
    selectedRodId: FREE_ROD_ID,
    totalTreasureChests: 0,
    adventureHighestLevel: 0,
    pendingAdventureHomeCelebration: false,
    pendingBonusVoyagesCelebration: false,
    pendingIceVoyagesCelebration: false,
  };
}

let gameMeta = defaultMeta();

/** Per-round modifiers stacked on the rod (neutral when not in a round). */
let roundBait = { catchRadiusMult: 1, rareAssistAdd: 0, lightRadiusMult: 1 };

function loadMeta() {
  try {
    const raw = localStorage.getItem(META_KEY);
    if (!raw) return defaultMeta();
    const o = JSON.parse(raw);
    const counts = o.baitCounts && typeof o.baitCounts === "object" && !Array.isArray(o.baitCounts) ? { ...o.baitCounts } : {};
    for (const k of Object.keys(counts)) {
      counts[k] = Math.max(0, Math.floor(Number(counts[k]) || 0));
    }
    let selectedBaitId = typeof o.selectedBaitId === "string" ? o.selectedBaitId : "standard";
    if (!BAITS.some((b) => b.id === selectedBaitId)) selectedBaitId = "standard";
    const owned = Array.isArray(o.ownedRodIds) ? o.ownedRodIds.filter((id) => RODS.some((r) => r.id === id)) : [];
    const ownedRodIds = Array.from(new Set([FREE_ROD_ID, ...owned]));
    let selectedRodId = typeof o.selectedRodId === "string" ? o.selectedRodId : FREE_ROD_ID;
    if (!ownedRodIds.includes(selectedRodId)) selectedRodId = FREE_ROD_ID;
    return {
      coins: Math.max(0, Math.floor(Number(o.coins) || 0)),
      baitCounts: counts,
      selectedBaitId,
      ownedRodIds,
      selectedRodId,
      totalTreasureChests: Math.max(0, Math.floor(Number(o.totalTreasureChests) || 0)),
      adventureHighestLevel: Math.max(0, Math.min(ADVENTURE_LEVEL_COUNT, Math.floor(Number(o.adventureHighestLevel) || 0))),
      pendingAdventureHomeCelebration: Boolean(o.pendingAdventureHomeCelebration),
      pendingBonusVoyagesCelebration: Boolean(o.pendingBonusVoyagesCelebration),
      pendingIceVoyagesCelebration: Boolean(o.pendingIceVoyagesCelebration),
    };
  } catch {
    return defaultMeta();
  }
}

function saveMeta() {
  try {
    localStorage.setItem(META_KEY, JSON.stringify(gameMeta));
  } catch {
    /* ignore quota */
  }
}

function getBaitCount(baitId) {
  const n = gameMeta.baitCounts[baitId];
  return Math.max(0, Math.floor(Number(n) || 0));
}

function rodSpecById(id) {
  return RODS.find((r) => r.id === id) || RODS[0];
}

function isRodOwned(rodId) {
  return rodId === FREE_ROD_ID || (Array.isArray(gameMeta.ownedRodIds) && gameMeta.ownedRodIds.includes(rodId));
}

function normalizeSelectedRod() {
  if (!Array.isArray(gameMeta.ownedRodIds)) gameMeta.ownedRodIds = [FREE_ROD_ID];
  if (!gameMeta.ownedRodIds.includes(FREE_ROD_ID)) gameMeta.ownedRodIds.unshift(FREE_ROD_ID);
  if (!isRodOwned(gameMeta.selectedRodId)) gameMeta.selectedRodId = FREE_ROD_ID;
  selectedRod = rodSpecById(gameMeta.selectedRodId);
}

function normalizeSelectedBaitId() {
  const spec = BAITS.find((b) => b.id === gameMeta.selectedBaitId) || BAITS[0];
  if (!spec.consumesOnRound) return;
  if (getBaitCount(spec.id) <= 0) {
    gameMeta.selectedBaitId = "standard";
    saveMeta();
  }
}

function coinsAwardedForScore(scorePts) {
  if (scorePts < 80) return 0;
  let c = Math.floor(scorePts / 28);
  if (scorePts >= 420) c += 4;
  if (scorePts >= 760) c += 7;
  if (scorePts >= 1200) c += 12;
  if (scorePts >= 1900) c += 20;
  return c;
}

function baitSpecById(id) {
  return BAITS.find((b) => b.id === id) || BAITS[0];
}

function effectiveCatchRadiusBasePx() {
  return selectedRod.catchRadius * dpr * roundBait.catchRadiusMult;
}

function effectiveRareAssist() {
  return Math.min(0.42, selectedRod.rareAssist + roundBait.rareAssistAdd);
}

function effectiveTrenchLightMult() {
  return (selectedRod.lightRadiusMult || 1) * (roundBait.lightRadiusMult || 1);
}

/** Destination reefs: real regions, regional fish pools, world-chart pin, difficulty knobs. */
const REEFS = [
  {
    id: "australia",
    name: "Great Barrier Reef",
    mapPlace: "Queensland coast, Australia",
    desc: "Coral Sea shallows · barramundi schools, reef sharks, and hammerhead shadows.",
    difficulty: "Easy",
    roundMs: 68_000,
    spawnMin: 520,
    spawnMax: 2100,
    maxFish: 10,
    fishSpeed: 0.76,
    rareRollMult: 1.12,
    weights: { common: 54, uncommon: 28, rare: 10, epic: 5, legendary: 3 },
    mapPin: { x: 172, y: 68 },
    fishPool: [
      "barramundi",
      "pacific_sardine",
      "chub_mackerel",
      "coral_trout_gbr",
      "yellowfin_tuna",
      "yellowtail_amberjack",
      "dolphinfish_mahi",
      "australian_blacktip",
      "giant_trevally",
      "great_hammerhead",
      "great_barracuda",
    ],
    visuals: {
      gradient: ["#6ee7b7", "#0f766e", "#134e4a", "#022c26"],
      shaft: ["rgba(255, 253, 240, 0.2)", "rgba(255, 253, 240, 0)"],
      silhouette: "rgba(6, 78, 72, 0.48)",
      corals: [
        { x: 0.04, c: "#ccfbf1", h: 0.4 },
        { x: 0.1, c: "#5eead4", h: 0.34 },
        { x: 0.16, c: "#f9a8d4", h: 0.38 },
        { x: 0.24, c: "#2dd4bf", h: 0.31 },
        { x: 0.32, c: "#fde68a", h: 0.36 },
        { x: 0.4, c: "#99f6e4", h: 0.29 },
        { x: 0.49, c: "#fb7185", h: 0.42 },
        { x: 0.58, c: "#67e8f9", h: 0.33 },
        { x: 0.66, c: "#f0abfc", h: 0.39 },
        { x: 0.74, c: "#34d399", h: 0.3 },
        { x: 0.82, c: "#2dd4bf", h: 0.41 },
        { x: 0.9, c: "#99f6e4", h: 0.35 },
        { x: 0.96, c: "#fdba74", h: 0.28 },
      ],
      bubble: "rgba(210, 255, 250, 0.38)",
    },
  },
  {
    id: "caribbean",
    name: "Mesoamerican Reef",
    mapPlace: "Belize & Yucatán, Caribbean",
    desc: "Classic Caribbean blues · balanced spawns and warm-water favorites.",
    difficulty: "Medium",
    roundMs: 60_000,
    spawnMin: 380,
    spawnMax: 1400,
    maxFish: 14,
    fishSpeed: 1,
    rareRollMult: 1,
    weights: { common: 52, uncommon: 28, rare: 12, epic: 6, legendary: 2 },
    mapPin: { x: 43, y: 46 },
    fishPool: [
      "northern_anchovy",
      "pacific_sardine",
      "chub_mackerel",
      "red_snapper",
      "striped_bass",
      "albacore_tuna",
      "dolphinfish_mahi",
      "yellowtail_amberjack",
      "yellowfin_tuna",
      "blue_marlin",
      "swordfish",
      "great_barracuda",
      "atlantic_bluefin",
    ],
    visuals: {
      gradient: ["#06b6d4", "#0e7490", "#155e75", "#0a1628"],
      shaft: ["rgba(255, 250, 220, 0.12)", "rgba(255, 250, 220, 0)"],
      silhouette: "rgba(5, 30, 45, 0.55)",
      corals: [
        { x: 0.06, c: "#c44a7a", h: 0.34 },
        { x: 0.14, c: "#ff8fb3", h: 0.28 },
        { x: 0.24, c: "#fb7185", h: 0.32 },
        { x: 0.34, c: "#f97316", h: 0.25 },
        { x: 0.46, c: "#f9a8d4", h: 0.3 },
        { x: 0.58, c: "#7a3d9c", h: 0.27 },
        { x: 0.7, c: "#e879f9", h: 0.33 },
        { x: 0.82, c: "#ff6b9d", h: 0.29 },
        { x: 0.92, c: "#c084fc", h: 0.24 },
      ],
      bubble: "rgba(200, 240, 255, 0.35)",
    },
  },
  {
    id: "mediterranean",
    name: "Western Mediterranean",
    mapPlace: "Ligurian & Tyrrhenian Sea",
    desc: "Twilight blue shelf · sprat clouds, bass, and bluefin patrols.",
    difficulty: "Hard",
    roundMs: 58_000,
    spawnMin: 260,
    spawnMax: 950,
    maxFish: 17,
    fishSpeed: 1.18,
    rareRollMult: 0.88,
    weights: { common: 60, uncommon: 24, rare: 10, epic: 4, legendary: 2 },
    mapPin: { x: 104, y: 39 },
    fishPool: [
      "european_sprat",
      "atlantic_herring",
      "chub_mackerel",
      "european_seabass",
      "atlantic_cod",
      "yellowfin_tuna",
      "atlantic_halibut",
      "swordfish",
      "blue_marlin",
      "atlantic_bluefin",
    ],
    visuals: {
      gradient: ["#4c1d95", "#3730a3", "#1e1b4b", "#020617"],
      shaft: ["rgba(196, 181, 253, 0.14)", "rgba(196, 181, 253, 0)"],
      silhouette: "rgba(15, 23, 42, 0.58)",
      corals: [
        { x: 0.09, c: "#818cf8", h: 0.2 },
        { x: 0.2, c: "#a78bfa", h: 0.16 },
        { x: 0.86, c: "#6366f1", h: 0.21 },
        { x: 0.93, c: "#c4b5fd", h: 0.13 },
      ],
      bubble: "rgba(180, 198, 252, 0.28)",
    },
  },
  {
    id: "japan_kuroshio",
    name: "Kuroshio Current",
    mapPlace: "Pacific coast, Japan",
    desc: "Open-ocean blue · short round, packed pelagic chaos off the trench.",
    difficulty: "Very Hard",
    roundMs: 52_000,
    spawnMin: 220,
    spawnMax: 720,
    maxFish: 19,
    fishSpeed: 1.32,
    rareRollMult: 0.78,
    weights: { common: 64, uncommon: 22, rare: 8, epic: 4, legendary: 2 },
    mapPin: { x: 174, y: 39 },
    fishPool: [
      "pacific_sardine",
      "chub_mackerel",
      "northern_anchovy",
      "albacore_tuna",
      "yellowfin_tuna",
      "yellowtail_amberjack",
      "atlantic_halibut",
      "giant_trevally",
      "swordfish",
      "blue_marlin",
      "atlantic_bluefin",
      "great_barracuda",
    ],
    visuals: {
      gradient: ["#38bdf8", "#0369a1", "#0c4a6e", "#000814"],
      shaft: ["rgba(125, 211, 252, 0.1)", "rgba(125, 211, 252, 0)"],
      silhouette: "rgba(3, 20, 40, 0.62)",
      corals: [
        { x: 0.1, c: "#0284c7", h: 0.18 },
        { x: 0.22, c: "#0ea5e9", h: 0.14 },
        { x: 0.8, c: "#0369a1", h: 0.2 },
        { x: 0.91, c: "#38bdf8", h: 0.12 },
      ],
      bubble: "rgba(125, 211, 252, 0.22)",
    },
  },
  {
    id: "mariana_trench",
    name: "Mariana Trench",
    mapPlace: "Western Pacific, near the Mariana Islands",
    desc: "Pitch-black deep sea · only your rod light reveals the strange fish below.",
    difficulty: "Expert",
    roundMs: 50_000,
    spawnMin: 260,
    spawnMax: 820,
    maxFish: 16,
    fishSpeed: 1.24,
    rareRollMult: 0.72,
    weights: { common: 54, uncommon: 23, rare: 12, epic: 7, legendary: 4 },
    mapPin: { x: 176, y: 47 },
    fishPool: ["black_seadevil", "viperfish", "hatchetfish", "gulper_eel", "fangtooth", "giant_isopod"],
    visuals: {
      gradient: ["#02030a", "#010209", "#000107", "#000000"],
      shaft: ["rgba(40, 120, 180, 0.04)", "rgba(0, 0, 0, 0)"],
      silhouette: "rgba(0, 0, 0, 0.82)",
      corals: [
        { x: 0.14, c: "#0f172a", h: 0.2 },
        { x: 0.48, c: "#111827", h: 0.16 },
        { x: 0.82, c: "#020617", h: 0.22 },
      ],
      bubble: "rgba(140, 220, 255, 0.1)",
    },
  },
];

function buildAdventureLevels() {
  const levels = [];
  for (let i = 0; i < ADVENTURE_LEVEL_COUNT; i++) {
    const reef = REEFS[i % REEFS.length];
    const tier = Math.floor(i / REEFS.length);
    const isBonus = i >= ADVENTURE_MAIN_LEVEL_COUNT && i < ADVENTURE_ICE_START_INDEX;
    const isIce = i >= ADVENTURE_ICE_START_INDEX;
    levels.push({
      level: i + 1,
      id: `adv_${i + 1}`,
      name: ADVENTURE_MAP_PLACES[i] || `Voyage ${i + 1}`,
      subtitle: isIce
        ? `${ADVENTURE_SECTION_FROZEN_SEA} · ${reef.name}`
        : isBonus
          ? `${ADVENTURE_SECTION_GOLD_QUEST} · ${reef.name}`
          : `${ADVENTURE_SECTION_PIRATES_PATH} · ${reef.name}`,
      mapPlace: ADVENTURE_MAP_PLACES[i] || `Isle ${i + 1}`,
      reefId: reef.id,
      isBonus,
      isIce,
      passScore: adventurePassScoreForIndex(i),
      roundMs:
        Math.max(isIce ? 38_000 : isBonus ? 40_000 : 46_000, reef.roundMs - tier * 3500 - i * 600) +
        (isIce ? ADVENTURE_ICE_ROUND_BONUS_MS : 0),
      spawnMin: Math.max(isIce ? 130 : isBonus ? 140 : 160, reef.spawnMin - i * 18),
      spawnMax: Math.max(isIce ? 320 : isBonus ? 340 : 380, reef.spawnMax - i * 45),
      maxFish: Math.min(22, reef.maxFish + Math.floor(i / 2)),
      fishSpeed: reef.fishSpeed * (1 + i * 0.035),
      rareRollMult: Math.max(0.5, reef.rareRollMult * (0.98 - i * 0.012)),
    });
  }
  return levels;
}

const ADVENTURE_LEVELS = buildAdventureLevels();

/** null when playing classic reef rush; set during an adventure level round. */
let adventureSession = null;
/** Last adventure level index chosen (for retry). */
let pendingAdventureLevelIndex = 0;

function isAdventureUnlocked() {
  return (gameMeta.totalTreasureChests || 0) >= TREASURE_CHESTS_TO_UNLOCK_ADVENTURE;
}

function secretSimulateAdventureUnlock() {
  gameMeta.totalTreasureChests = SECRET_TREASURE_CHEST_GRANT;
  saveMeta();
  refreshCoinDisplays();
  updateAdventureLaunchUI();
}

/** Secret: Ctrl+Shift+3 — unlock the next adventure voyage (one level at a time). */
function secretSkipAdventureLevel() {
  if (!isAdventureUnlocked()) {
    gameMeta.totalTreasureChests = Math.max(
      gameMeta.totalTreasureChests || 0,
      TREASURE_CHESTS_TO_UNLOCK_ADVENTURE
    );
  }
  const prev = gameMeta.adventureHighestLevel || 0;
  if (prev >= ADVENTURE_LEVEL_COUNT) {
    showToast("All adventure voyages already unlocked", 2000);
    return;
  }
  gameMeta.adventureHighestLevel = prev + 1;
  adventureMapUiProgress = -1;
  saveMeta();
  refreshCoinDisplays();
  updateAdventureLaunchUI();
  if (panelAdventure && !panelAdventure.hidden) {
    buildAdventureLevelUI(true);
    scrollAdventureMapToProgress(true);
  }
  const place = ADVENTURE_MAP_PLACES[gameMeta.adventureHighestLevel - 1] || `Voyage ${gameMeta.adventureHighestLevel}`;
  showToast(`Secret skip: ${place} unlocked (${gameMeta.adventureHighestLevel}/${ADVENTURE_LEVEL_COUNT})`, 2400);
}

function isAdventureLevelPlayable(levelNum) {
  if (!isAdventureUnlocked()) return false;
  const highest = gameMeta.adventureHighestLevel || 0;
  if (levelNum > ADVENTURE_MAIN_LEVEL_COUNT && highest < ADVENTURE_MAIN_LEVEL_COUNT) return false;
  if (levelNum > ADVENTURE_ICE_START_INDEX && highest < ADVENTURE_ICE_START_INDEX) return false;
  return levelNum <= highest + 1;
}

function isAdventureBonusUnlocked() {
  return (gameMeta.adventureHighestLevel || 0) >= ADVENTURE_MAIN_LEVEL_COUNT;
}

function isAdventureIceUnlocked() {
  return (gameMeta.adventureHighestLevel || 0) >= ADVENTURE_ICE_START_INDEX;
}

function getAdventureLevel(index) {
  return ADVENTURE_LEVELS[Math.max(0, Math.min(ADVENTURE_LEVEL_COUNT - 1, index))];
}

function getReef() {
  const base = REEFS.find((r) => r.id === selectedReefId) || REEFS[0];
  if (!adventureSession) return base;
  const lvl = getAdventureLevel(adventureSession.levelIndex);
  const themeId = getAdventureLevelTheme(adventureSession.levelIndex);
  const playReefId = ADVENTURE_THEME_REEF_ID[themeId] || lvl.reefId;
  const reefBase = REEFS.find((r) => r.id === playReefId) || base;
  const themeVis = ADVENTURE_THEME_REEF_OVERRIDES[themeId];
  const merged = {
    ...reefBase,
    name: lvl.name,
    desc: `${lvl.subtitle} · score ${lvl.passScore}+ to continue`,
    roundMs: lvl.roundMs,
    spawnMin: lvl.spawnMin,
    spawnMax: lvl.spawnMax,
    maxFish: lvl.maxFish,
    fishSpeed: lvl.fishSpeed,
    rareRollMult: lvl.rareRollMult,
    adventurePassScore: lvl.passScore,
    adventureLevel: lvl.level,
  };
  if (themeVis) {
    merged.visuals = { ...reefBase.visuals, ...themeVis, corals: [] };
  }
  if (themeId === "skull-shoals") {
    merged.weights = { common: 48, uncommon: 28, rare: 14, epic: 7, legendary: 3 };
  }
  if (themeId === "lava-falls") {
    merged.subtitle = "Volcanic shallows";
    merged.desc = `Bright lava-lit waters · score ${lvl.passScore}+ to continue`;
  }
  if (themeId === "treasure-cove" || themeId === "legends-gate") {
    merged.desc = `Dim shipwreck cave · golden treasure glow · score ${lvl.passScore}+ to continue`;
  }
  if (
    themeId === "frost-fjord" ||
    themeId === "iceberg-drift" ||
    themeId === "glacier-maw" ||
    themeId === "polar-narrows" ||
    themeId === "aurora-reach"
  ) {
    merged.desc = `Icy waters · floating ice chunks · score ${lvl.passScore}+ to continue`;
  }
  return merged;
}

const LEADERBOARD_KEY = "reefRushLeaderboard_v2";
const LEADERBOARD_MAX = 10;
/** Pull extra rows so exact duplicates can be collapsed and we still fill the top 10. */
const LEADERBOARD_FETCH_LIMIT = 80;
const SUPABASE_REST_URL = "https://htnpfzjhicyzkqfgyhuu.supabase.co/rest/v1";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_SARvsULPYyIUImdhXMjQUQ_T6RtwvZM";
const LEADERBOARD_TABLE_URL = `${SUPABASE_REST_URL}/leaderboard`;
let leaderboardRows = [];
let leaderboardLoading = false;
let leaderboardLoadId = 0;
let leaderboardSaveInFlight = false;

function leaderboardEntryKey(e) {
  return `${e.initials}|${e.score}|${e.reefId || ""}`;
}

/** Collapse identical runs (same initials, score, reef) — keeps the first seen. */
function dedupeExactLeaderboardRows(rows) {
  const seen = new Set();
  const out = [];
  for (const e of rows) {
    const key = leaderboardEntryKey(e);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(e);
  }
  return out;
}

function normalizeLeaderboardRows(rows) {
  if (!Array.isArray(rows)) return [];
  const parsed = rows
    .map((e) => ({
      initials: String(e.initials || "").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 3),
      score: Math.max(0, Math.floor(Number(e.score) || 0)),
      reefId: e.reefId || e.reef_id || "",
      at: e.at || e.created_at || "",
    }))
    .filter((e) => e.initials && e.score > 0);
  return dedupeExactLeaderboardRows(parsed)
    .sort((a, b) => b.score - a.score || String(a.at).localeCompare(String(b.at)))
    .slice(0, LEADERBOARD_MAX);
}

function leaderboardHeaders(extra = {}) {
  return {
    apikey: SUPABASE_PUBLISHABLE_KEY,
    Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
    ...extra,
  };
}

function loadLocalLeaderboard() {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return normalizeLeaderboardRows(arr);
  } catch {
    return [];
  }
}

function saveLocalLeaderboard(rows) {
  try {
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(normalizeLeaderboardRows(rows)));
  } catch {
    /* ignore quota */
  }
}

function loadLeaderboard() {
  return leaderboardRows.length ? leaderboardRows : loadLocalLeaderboard();
}

async function fetchSharedLeaderboard() {
  const loadId = ++leaderboardLoadId;
  leaderboardLoading = true;
  renderLeaderboardOl(leaderboardStart);
  renderLeaderboardOl(leaderboardOver);
  try {
    const url = `${LEADERBOARD_TABLE_URL}?select=initials,score,reef_id,created_at&order=score.desc,created_at.asc&limit=${LEADERBOARD_FETCH_LIMIT}`;
    const res = await fetch(url, { headers: leaderboardHeaders() });
    if (!res.ok) throw new Error(`Leaderboard fetch failed: ${res.status}`);
    const rows = normalizeLeaderboardRows(await res.json());
    if (loadId !== leaderboardLoadId) return;
    leaderboardRows = rows;
    saveLocalLeaderboard(rows);
  } catch (err) {
    console.warn(err);
    if (loadId === leaderboardLoadId) leaderboardRows = loadLocalLeaderboard();
  } finally {
    if (loadId === leaderboardLoadId) {
      leaderboardLoading = false;
      refreshLeaderboardViews(false);
    }
  }
}

function qualifiesForLeaderboard(score, rows) {
  if (score <= 0) return false;
  if (rows.length < LEADERBOARD_MAX) return true;
  return score >= rows[rows.length - 1].score;
}

async function addLeaderboardEntry(initials, score, reefId) {
  const entry = {
    initials: initials.slice(0, 3).toUpperCase(),
    score,
    reefId: reefId || "",
    at: Date.now(),
  };
  const rows = loadLeaderboard();
  if (rows.some((r) => leaderboardEntryKey(r) === leaderboardEntryKey(entry))) {
    return true;
  }
  const merged = [...rows, entry];
  leaderboardRows = normalizeLeaderboardRows(merged);
  saveLocalLeaderboard(leaderboardRows);
  try {
    const res = await fetch(LEADERBOARD_TABLE_URL, {
      method: "POST",
      headers: leaderboardHeaders({
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      }),
      body: JSON.stringify({
        initials: entry.initials,
        score: entry.score,
        reef_id: entry.reefId,
      }),
    });
    if (!res.ok) throw new Error(`Leaderboard save failed: ${res.status}`);
    await fetchSharedLeaderboard();
    return true;
  } catch (err) {
    console.warn(err);
    refreshLeaderboardViews(false);
    return false;
  }
}

function renderLeaderboardOl(el, rows = loadLeaderboard()) {
  if (!el) return;
  el.innerHTML = "";
  if (rows.length === 0) {
    const li = document.createElement("li");
    li.className = "leaderboard__empty";
    li.textContent = leaderboardLoading ? "Loading global scores..." : "No global scores yet — be the first.";
    el.appendChild(li);
    return;
  }
  rows.forEach((r, i) => {
    const li = document.createElement("li");
    li.className = "leaderboard__row";
    const rank = document.createElement("span");
    rank.className = "leaderboard__rank";
    rank.textContent = String(i + 1);
    const ini = document.createElement("span");
    ini.className = "leaderboard__ini";
    ini.textContent = r.initials;
    const pts = document.createElement("span");
    pts.className = "leaderboard__pts";
    pts.textContent = String(r.score);
    const reef = document.createElement("span");
    reef.className = "leaderboard__reef";
    const reefMeta = REEFS.find((x) => x.id === r.reefId);
    reef.textContent = reefMeta ? reefMeta.name : "";
    li.append(rank, ini, pts, reef);
    el.appendChild(li);
  });
}

function refreshLeaderboardViews(syncShared = true) {
  const rows = loadLeaderboard();
  renderLeaderboardOl(leaderboardStart, rows);
  renderLeaderboardOl(leaderboardOver, rows);
  if (syncShared) fetchSharedLeaderboard();
}

const PEARL_POINTS = 420;
const PEARL_CATCH_LABEL = "Giant Pearl (clam)";
/** Rarer than the pearl: scuttles the seabed with a chest (vector look inspired by crab-character stock art). */
const JACKPOT_CRAB_POINTS = 820;
const JACKPOT_CRAB_LABEL = "Treasure crab";
const JACKPOT_CRAB_COIN_BONUS = 45;
const JACKPOT_CRAB_CATCH_COOLDOWN_MS = 3200;
const CLAM_OPEN_MS = 2400;
const CLAM_CLOSED_MS = 5600;
const PEARL_CATCH_COOLDOWN_MS = 2800;
const KRAKEN_BITE_SNAP_MS = 520;
const KRAKEN_BITE_HOLD_MS = 2800;
const CAST_DOWN_MS = 780;
const CAST_UP_MS = 520;
const TOUCH_TAP_CAST_MAX_MOVE_PX = 18;

function lineAnchorY() {
  return dpr * 6;
}

function surfaceTipY() {
  return waterTop + dpr * 22 + Math.sin(performance.now() / 1100) * dpr * 3;
}

function deepestTipY() {
  return Math.min(h - dpr * 22, waterTop + waterH * 0.985);
}

function pointsFor(species) {
  const r = RARITY[species.rarity];
  const s = SIZE[species.size];
  return Math.round(s.pts * r.mult);
}

function pickSpecies() {
  if (isSkullShoalsPlay()) return pickSkullShoalsSpecies();
  const reef = getReef();
  const w = reef.weights;
  const order = ["common", "uncommon", "rare", "epic", "legendary"];
  const rw = order.reduce((a, k) => a + w[k], 0);
  let roll = Math.random() * rw;
  let chosenRarity = "common";
  for (const id of order) {
    roll -= w[id];
    if (roll <= 0) {
      chosenRarity = id;
      break;
    }
  }
  const pool = reef.fishPool;
  const regional = FISH_SPECIES.filter((f) => pool.includes(f.id) && f.rarity === chosenRarity);
  if (regional.length) return regional[Math.floor(Math.random() * regional.length)];
  const fallback = FISH_SPECIES.filter((f) => f.rarity === chosenRarity);
  return fallback[Math.floor(Math.random() * fallback.length)];
}

// --- DOM ---
function isChromebook() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  if (ua.includes("CrOS") || /Chromebook/i.test(ua)) return true;
  const plat = navigator.platform || "";
  return plat.includes("CrOS");
}

/** Chrome OS and similar low-memory school devices: cap canvas work and defer heavy init. */
function isLowPowerDevice() {
  if (isChromebook()) return true;
  const mem = navigator.deviceMemory;
  const cores = navigator.hardwareConcurrency || 8;
  return Boolean(mem && mem <= 4 && cores <= 4);
}

const PERF_CHROMEBOOK = isLowPowerDevice();

function perfN(n) {
  return PERF_CHROMEBOOK ? Math.max(1, Math.round(n * 0.32)) : n;
}

const canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d", {
  alpha: true,
  desynchronized: PERF_CHROMEBOOK,
});
let bgCacheCanvas = null;
let bgCacheKey = "";
const scoreDisplay = document.getElementById("scoreDisplay");
const timeDisplay = document.getElementById("timeDisplay");
const panelStart = document.getElementById("panelStart");
const panelOver = document.getElementById("panelGameOver");
const appRoot = document.getElementById("app");
const rodChoices = document.getElementById("rodChoices");
const reefChoices = document.getElementById("reefChoices");
const reefMapBoat = document.getElementById("reefMapBoat");
const reefMapCaption = document.getElementById("reefMapCaption");
const btnStartSub = document.getElementById("btnStartSub");
const btnStart = document.getElementById("btnStart");
const btnAgain = document.getElementById("btnAgain");
const finalScore = document.getElementById("finalScore");
const catchSummary = document.getElementById("catchSummary");
const leaderboardStart = document.getElementById("leaderboardStart");
const leaderboardOver = document.getElementById("leaderboardOver");
const initialsPanel = document.getElementById("initialsPanel");
const initialsInput = document.getElementById("initialsInput");
const btnSaveScore = document.getElementById("btnSaveScore");
const toastEl = document.getElementById("toast");
const treasureMapReveal = document.getElementById("treasureMapReveal");
const btnTreasureMapRevealDone = document.getElementById("btnTreasureMapRevealDone");
const adventureUnlockBanner = document.getElementById("adventureUnlockBanner");
const controlHint = document.getElementById("controlHint");
const baitChoices = document.getElementById("baitChoices");
const coinDisplay = document.getElementById("coinDisplay");
const coinDisplayStart = document.getElementById("coinDisplayStart");
const treasureChestDisplayStart = document.getElementById("treasureChestDisplayStart");
const coinDisplayShop = document.getElementById("coinDisplayShop");
const coinsEarnedLine = document.getElementById("coinsEarnedLine");
const panelShop = document.getElementById("panelShop");
const shopList = document.getElementById("shopList");
const shopGuide = document.getElementById("shopGuide");
const btnOpenShopGuide = document.getElementById("btnOpenShopGuide");
const btnOpenShop = document.getElementById("btnOpenShop");
const btnCloseShop = document.getElementById("btnCloseShop");
const btnShopGuideDone = document.getElementById("btnShopGuideDone");
const btnToggleMusic = document.getElementById("btnToggleMusic");
const panelIntro = document.getElementById("panelIntro");
const btnIntroDone = document.getElementById("btnIntroDone");
const btnOpenIntro = document.getElementById("btnOpenIntro");
const btnResetProgress = document.getElementById("btnResetProgress");
const btnAdventureMode = document.getElementById("btnAdventureMode");
const adventureLock = document.getElementById("adventureLock");
const adventureUnlockHint = document.getElementById("adventureUnlockHint");
const panelAdventure = document.getElementById("panelAdventure");
const adventureLevelList = document.getElementById("adventureLevelList");
const adventureMapScroll = document.getElementById("adventureMapScroll");
const adventureMapSections = document.getElementById("adventureMapSections");
const adventureMapTrail = document.getElementById("adventureMapTrail");
const adventureMapBanner = document.getElementById("adventureMapBanner");
const btnAdventureBack = document.getElementById("btnAdventureBack");
const panelAdventureFail = document.getElementById("panelAdventureFail");
const adventureFailScore = document.getElementById("adventureFailScore");
const adventureFailGoal = document.getElementById("adventureFailGoal");
const btnAdventureRetry = document.getElementById("btnAdventureRetry");
const btnAdventureFailBack = document.getElementById("btnAdventureFailBack");
const panelAdventureWin = document.getElementById("panelAdventureWin");
const adventureWinLevel = document.getElementById("adventureWinLevel");
const adventureWinScore = document.getElementById("adventureWinScore");
const btnAdventureNext = document.getElementById("btnAdventureNext");
const btnAdventureWinBack = document.getElementById("btnAdventureWinBack");
const adventureGoalLine = document.getElementById("adventureGoalLine");
const adventurePlayTheme = document.getElementById("adventurePlayTheme");
const adventurePlayScene = document.getElementById("adventurePlayScene");
const adventurePlayName = document.getElementById("adventurePlayName");
const adventureWinTheme = document.getElementById("adventureWinTheme");
const adventureWinTreasureCelebrate = document.getElementById("adventureWinTreasureCelebrate");
const adventureMapBonusBanner = document.getElementById("adventureMapBonusBanner");
const adventureMapIceBanner = document.getElementById("adventureMapIceBanner");
const adventureFailTheme = document.getElementById("adventureFailTheme");

let selectedRod = RODS[0];
let selectedReefId = "australia";
let dpr = 1;
let w = 0;
let h = 0;
let waterTop = 0;
let waterH = 0;

let playing = false;
/** Pauses round timer and input while the treasure-map unlock cinematic plays. */
let treasureMapRevealPaused = false;
/** Canvas chest flies from the caught jackpot crab, then opens before the HTML map. */
let treasureChestCinematic = null;
let roundEndAt = 0;
let score = 0;
let fishList = [];
let bubbles = [];
let spawnAcc = 0;
let nextSpawnIn = 800;
let hook = {
  x: 0,
  y: 0,
  targetX: 0,
  tipY: 0,
  castState: "idle",
  castTimer: 0,
  castFromY: 0,
  castToY: 0,
  castRiseTargetY: 0,
  snagPulse: 0,
  krakenBiteTipY: 0,
  krakenBiteLocked: false,
};
let celebration = { particles: [], rings: [] };
/** Released catch: fish arc from above and splash into the water. */
let releasedFishFx = [];
let catchFlash = 0;
let touchAim = null;
let clam = {
  phase: "closed",
  timer: 0,
  cx: 0,
  cy: 0,
  baseCx: 0,
  driftPhase: 0,
  edgeWander: 0,
  flowAccum: 0,
  currentTilt: 0,
  spinAngle: 0,
  pearlR: 14,
  pearlWorldY: 0,
};
/** One kraken per round: rises from below; hooking it costs half your logged fish catches. */
let kraken = null;
let catchLog = [];
let toastTimer = 0;
let lastPearlAt = -999999;
let lastJackpotCrabCatchAt = -999999;
/** null | { spawnTimes: number[], active: null | { x, y, vx, legT } } — three treasure crabs per round. */
let jackpotCrab = null;
let lastRoundScore = 0;
let lastRoundReefId = "";
let lastRoundCoinsEarned = 0;
let coinAwardAnimId = 0;
let musicEnabled = false;
let musicCtx = null;
let musicMaster = null;
let musicTimer = null;
let musicStep = 0;
let gameMusicTimer = null;
let gameMusicStep = 0;
let adventureMusicTimer = null;
let adventureMusicStep = 0;
let homeAudioUnlocked = false;

function formatTime(ms) {
  const s = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

function showToast(text, ms = 1400) {
  toastEl.textContent = text;
  toastEl.hidden = false;
  toastTimer = ms;
}

function hasSeenIntro() {
  try {
    return localStorage.getItem(INTRO_SEEN_KEY) === "yes";
  } catch {
    return true;
  }
}

function markIntroSeen() {
  try {
    localStorage.setItem(INTRO_SEEN_KEY, "yes");
  } catch {
    /* ignore quota */
  }
}

function hasSeenShopGuide() {
  try {
    return localStorage.getItem(SHOP_GUIDE_SEEN_KEY) === "yes";
  } catch {
    return true;
  }
}

function markShopGuideSeen() {
  try {
    localStorage.setItem(SHOP_GUIDE_SEEN_KEY, "yes");
  } catch {
    /* ignore quota */
  }
}

function showShopGuideIfNeeded() {
  if (!shopGuide) return;
  shopGuide.hidden = hasSeenShopGuide();
}

function openShopGuide() {
  if (shopGuide) shopGuide.hidden = false;
}

function closeShopGuide() {
  if (shopGuide) shopGuide.hidden = true;
  markShopGuideSeen();
}

function showIntroIfNeeded() {
  if (!panelIntro || hasSeenIntro()) return;
  panelIntro.hidden = false;
  syncAdventureLaunchVisibility();
}

function openIntro() {
  if (panelIntro) panelIntro.hidden = false;
  syncAdventureLaunchVisibility();
}

function closeIntro() {
  if (panelIntro) panelIntro.hidden = true;
  markIntroSeen();
  syncAdventureLaunchVisibility();
  window.requestAnimationFrame(() => startAdventureHomeUnlockAnimation());
}

function resetProgress() {
  const ok = window.confirm("Reset your coins, bait, unlocked rods, and adventure progress?");
  if (!ok) return;
  gameMeta = defaultMeta();
  selectedRod = rodSpecById(FREE_ROD_ID);
  roundBait = { catchRadiusMult: 1, rareAssistAdd: 0, lightRadiusMult: 1 };
  adventureSession = null;
  saveMeta();
  normalizeSelectedBaitId();
  normalizeSelectedRod();
  refreshCoinDisplays();
  buildBaitUI();
  buildRodUI();
  buildShopUI();
  updateAdventureLaunchUI();
  adventureMapUiProgress = -1;
  buildAdventureLevelUI(true);
  showToast("Progress reset", 1500);
}

function hideAllPanels() {
  if (panelStart) panelStart.hidden = true;
  if (panelOver) panelOver.hidden = true;
  if (panelShop) panelShop.hidden = true;
  if (panelIntro) panelIntro.hidden = true;
  if (panelAdventure) panelAdventure.hidden = true;
  if (panelAdventureFail) panelAdventureFail.hidden = true;
  if (panelAdventureWin) panelAdventureWin.hidden = true;
}

function isAdventureHomeCelebrationActive() {
  return Boolean(gameMeta.pendingAdventureHomeCelebration && isAdventureUnlocked() && isHomeScreenActive());
}

let adventureLockUnlockListener = null;

function clearAdventureHomeCelebration() {
  if (!gameMeta.pendingAdventureHomeCelebration) return;
  gameMeta.pendingAdventureHomeCelebration = false;
  saveMeta();
  if (adventureLockUnlockListener && adventureLock) {
    adventureLock.removeEventListener("animationend", adventureLockUnlockListener);
    adventureLockUnlockListener = null;
  }
  if (adventureLock) {
    adventureLock.classList.remove("adventure-launch__lock--unlocking", "adventure-launch__lock--unlocked");
    adventureLock.hidden = true;
  }
  appRoot?.classList.remove("app--adventure-unlock-celebrate");
  btnAdventureMode?.classList.remove(
    "adventure-launch--flash",
    "adventure-launch--celebrate",
    "adventure-launch--unlock-ready",
    "adventure-launch--rise",
    "adventure-launch--centered",
  );
  if (adventureUnlockBanner) {
    adventureUnlockBanner.hidden = true;
    adventureUnlockBanner.setAttribute("aria-hidden", "true");
    adventureUnlockBanner.classList.remove("adventure-unlock-banner--active");
  }
  if (adventureUnlockHint) {
    adventureUnlockHint.classList.remove("adventure-launch__hint--celebrate", "adventure-launch__hint--centered");
  }
  updateAdventureLaunchUI();
}

function playAdventureHomeUnlockSound() {
  const ac = ensureMusicContext();
  if (!ac || !musicMaster) return;
  if (ac.state === "suspended") ac.resume();
  const now = ac.currentTime + 0.02;
  const fanfare = [392.0, 493.88, 587.33, 659.25, 783.99, 987.77, 1174.66];
  for (let i = 0; i < fanfare.length; i++) {
    playMusicNote(fanfare[i], now + i * 0.14, 0.38, 0.046, i % 2 === 0 ? "triangle" : "sine");
  }
  playMusicNote(196.0, now, 1.4, 0.042, "sine");
  playMusicNote(261.63, now + 0.55, 1.1, 0.038, "sine");
  playNoiseHit(now + 0.06, 0.16, 0.035);
  playNoiseHit(now + 0.42, 0.2, 0.032);
  playNoiseHit(now + 0.88, 0.24, 0.028);
}

function showAdventureHomeUnlockBanner() {
  if (!adventureUnlockBanner) return;
  adventureUnlockBanner.hidden = false;
  adventureUnlockBanner.setAttribute("aria-hidden", "false");
  adventureUnlockBanner.classList.remove("adventure-unlock-banner--active");
  void adventureUnlockBanner.offsetWidth;
  adventureUnlockBanner.classList.add("adventure-unlock-banner--active");
}

function beginAdventureLockUnlockSequence() {
  if (!isAdventureHomeCelebrationActive() || !adventureLock) return;
  adventureLock.hidden = false;
  adventureLock.classList.remove("adventure-launch__lock--unlocking", "adventure-launch__lock--unlocked");
  void adventureLock.offsetWidth;
  adventureLock.classList.add("adventure-launch__lock--unlocking");
  playAdventureHomeUnlockSound();

  if (adventureLockUnlockListener) {
    adventureLock.removeEventListener("animationend", adventureLockUnlockListener);
  }
  adventureLockUnlockListener = (e) => {
    if (e.target !== adventureLock || e.animationName !== "adventureLockFadeOut") return;
    adventureLock.classList.remove("adventure-launch__lock--unlocking", "adventure-launch__lock--unlocked");
    adventureLock.hidden = true;
    adventureLock.removeEventListener("animationend", adventureLockUnlockListener);
    adventureLockUnlockListener = null;
    updateAdventureLaunchUI();
  };
  adventureLock.addEventListener("animationend", adventureLockUnlockListener);
  updateAdventureLaunchUI();
}

function startAdventureHomeUnlockAnimation() {
  if (!isAdventureHomeCelebrationActive() || !adventureLock || !btnAdventureMode) return;
  if (btnAdventureMode.classList.contains("adventure-launch--celebrate")) return;

  showAdventureHomeUnlockBanner();
  appRoot?.classList.add("app--adventure-unlock-celebrate");
  btnAdventureMode.classList.add("adventure-launch--celebrate");
  adventureUnlockHint?.classList.add("adventure-launch__hint--celebrate");
  adventureLock.hidden = false;
  adventureLock.classList.remove("adventure-launch__lock--unlocking", "adventure-launch__lock--unlocked");
  playAdventureHomeUnlockSound();
  updateAdventureLaunchUI();

  const finishRise = () => {
    if (!isAdventureHomeCelebrationActive()) return;
    btnAdventureMode.classList.remove("adventure-launch--rise");
    btnAdventureMode.classList.add("adventure-launch--centered", "adventure-launch--flash", "adventure-launch--unlock-ready");
    adventureUnlockHint?.classList.add("adventure-launch__hint--centered");
    window.setTimeout(beginAdventureLockUnlockSequence, 500);
    updateAdventureLaunchUI();
  };

  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    btnAdventureMode.classList.add("adventure-launch--centered", "adventure-launch--flash", "adventure-launch--unlock-ready");
    adventureUnlockHint?.classList.add("adventure-launch__hint--centered");
    window.setTimeout(beginAdventureLockUnlockSequence, 300);
    return;
  }

  btnAdventureMode.classList.add("adventure-launch--rise");
  const onRiseDone = (e) => {
    if (e.target !== btnAdventureMode || e.animationName !== "adventureLaunchRiseToCenter") return;
    btnAdventureMode.removeEventListener("animationend", onRiseDone);
    finishRise();
  };
  btnAdventureMode.addEventListener("animationend", onRiseDone);
}

function showHomePanel() {
  hideAllPanels();
  if (panelStart) panelStart.hidden = false;
  adventureSession = null;
  updateAdventureLaunchUI();
  syncAdventureLaunchVisibility();
  window.requestAnimationFrame(() => startAdventureHomeUnlockAnimation());
}

function isHomeScreenActive() {
  if (playing) return false;
  if (!panelStart || panelStart.hidden) return false;
  const blocking = [panelOver, panelShop, panelIntro, panelAdventure, panelAdventureFail, panelAdventureWin];
  for (const panel of blocking) {
    if (panel && !panel.hidden) return false;
  }
  return true;
}

function syncAdventureLaunchVisibility() {
  const onHome = isHomeScreenActive();
  appRoot.classList.toggle("app--home-screen", onHome);
  if (btnAdventureMode) btnAdventureMode.hidden = !onHome;
  if (adventureUnlockHint) {
    const showChestHint =
      onHome && (!isAdventureUnlocked() || isAdventureHomeCelebrationActive());
    adventureUnlockHint.hidden = !showChestHint;
  }
}

function updateAdventureLaunchUI() {
  const unlocked = isAdventureUnlocked();
  const celebrating = isAdventureHomeCelebrationActive();
  const total = gameMeta.totalTreasureChests || 0;
  const lockUnlocking = adventureLock?.classList.contains("adventure-launch__lock--unlocking");
  const rising = btnAdventureMode?.classList.contains("adventure-launch--rise");
  if (adventureLock) {
    if (!unlocked) adventureLock.hidden = false;
    else if (celebrating && (rising || lockUnlocking)) adventureLock.hidden = false;
    else if (!celebrating) adventureLock.hidden = true;
  }
  if (btnAdventureMode) {
    btnAdventureMode.classList.toggle("adventure-launch--locked", !unlocked);
    btnAdventureMode.setAttribute("aria-disabled", unlocked ? "false" : "true");
  }
  if (adventureUnlockHint && (!unlocked || celebrating)) {
    adventureUnlockHint.textContent = celebrating
      ? "★ Adventure Mode unlocked — tap the glowing button! ★"
      : `Treasure chests: ${total} / ${TREASURE_CHESTS_TO_UNLOCK_ADVENTURE}`;
  }
  refreshTreasureChestDisplay();
  syncAdventureLaunchVisibility();
}

function adventureMapCoords(index) {
  const layout = ADVENTURE_MAP_NODE_LAYOUT[index] || { x: 50, y: 50 };
  return { x: (layout.x / 100) * 400, y: (layout.y / 100) * ADVENTURE_MAP_HEIGHT };
}

function adventureMapExtentVh() {
  if (isAdventureIceUnlocked()) return 560;
  if (isAdventureBonusUnlocked()) return 420;
  return 300;
}

function applyAdventureMapExtent(animate = false) {
  const board = adventureMapScroll?.querySelector(".adventure-map-board");
  if (!board) return;
  const vh = adventureMapExtentVh();
  board.style.setProperty("--adv-map-height-vh", String(vh));
  board.classList.toggle("adventure-map-board--extent-animate", animate);
  board.classList.toggle("adventure-map-board--bonus-revealed", isAdventureBonusUnlocked());
  board.classList.toggle("adventure-map-board--ice-revealed", isAdventureIceUnlocked());
}

function syncAdventureMapSections() {
  if (!adventureMapSections) return;
  const bonusRevealed = isAdventureBonusUnlocked();
  const iceRevealed = isAdventureIceUnlocked();
  for (const section of adventureMapSections.querySelectorAll(".adventure-map-section")) {
    const id = section.dataset.section;
    const meta = ADVENTURE_MAP_SECTIONS[id];
    if (!meta) continue;
    section.style.top = `${meta.topPct}%`;
    section.style.height = `${meta.heightPct}%`;
    section.querySelector(".adventure-map-section__label").textContent = meta.label;
    const visible =
      id === "pirates" ||
      (id === "gold" && bonusRevealed) ||
      (id === "ice" && iceRevealed);
    section.hidden = !visible;
    section.classList.toggle("adventure-map-section--visible", visible);
    section.classList.toggle("adventure-map-section--locked", !visible);
  }
}

function scrollAdventureMapToSection(sectionId, instant = true) {
  if (!adventureMapScroll) return;
  const target =
    adventureMapSections?.querySelector(`.adventure-map-section[data-section="${sectionId}"]`) ||
    adventureLevelList?.querySelector(
      `.adventure-map-node[data-section="${sectionId}"]`,
    );
  if (!target) return;
  const run = () => {
    target.scrollIntoView({ block: "center", behavior: instant ? "instant" : "smooth" });
  };
  if (instant) run();
  else window.requestAnimationFrame(run);
}

function runAdventureMapSectionReveal(kind) {
  const board = adventureMapScroll?.querySelector(".adventure-map-board");
  if (!board || !adventureLevelList) return;
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    applyAdventureMapExtent(false);
    syncAdventureMapSections();
    scrollAdventureMapToSection(kind, true);
    if (kind === "gold") clearBonusVoyagesMapCelebration();
    else clearIceVoyagesMapCelebration();
    return;
  }
  const startIdx = kind === "gold" ? ADVENTURE_MAIN_LEVEL_COUNT : ADVENTURE_ICE_START_INDEX;
  const endIdx = kind === "gold" ? ADVENTURE_ICE_START_INDEX : ADVENTURE_LEVEL_COUNT;
  applyAdventureMapExtent(true);
  syncAdventureMapSections();
  board.classList.add(`adventure-map-board--revealing-${kind}`);
  adventureMapSections
    ?.querySelector(`.adventure-map-section[data-section="${kind}"]`)
    ?.classList.add("adventure-map-section--revealing");
  const nodes = adventureLevelList.querySelectorAll(".adventure-map-node");
  nodes.forEach((node, i) => {
    if (i < startIdx || i >= endIdx) return;
    node.classList.add("adventure-map-node--section-reveal");
    node.style.animationDelay = `${(i - startIdx) * 130}ms`;
  });
  window.setTimeout(() => scrollAdventureMapToSection(kind, false), 500);
  window.setTimeout(() => {
    board.classList.remove(`adventure-map-board--revealing-${kind}`);
    adventureMapSections
      ?.querySelector(`.adventure-map-section[data-section="${kind}"]`)
      ?.classList.remove("adventure-map-section--revealing");
    nodes.forEach((node) => {
      node.classList.remove("adventure-map-node--section-reveal");
      node.style.animationDelay = "";
    });
    board.classList.remove("adventure-map-board--extent-animate");
    if (kind === "gold") clearBonusVoyagesMapCelebration();
    else clearIceVoyagesMapCelebration();
  }, 3600);
}

function adventureMapVisibleLevelCount() {
  if (!isAdventureBonusUnlocked()) return ADVENTURE_MAIN_LEVEL_COUNT;
  if (!isAdventureIceUnlocked()) return ADVENTURE_ICE_START_INDEX;
  return ADVENTURE_LEVEL_COUNT;
}

function buildAdventureTrailPath() {
  const pts = ADVENTURE_MAP_NODE_LAYOUT.slice(0, adventureMapVisibleLevelCount()).map((_, i) =>
    adventureMapCoords(i)
  );
  if (!pts.length) return "";
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    d += ` L ${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)}`;
  }
  return d;
}

function scrollAdventureMapToProgress(instant = true) {
  if (!adventureMapScroll || !adventureLevelList) return;
  const clearedNodes = adventureLevelList.querySelectorAll(".adventure-map-node--cleared");
  const target =
    adventureLevelList.querySelector(".adventure-map-node--current") ||
    (clearedNodes.length ? clearedNodes[clearedNodes.length - 1] : null) ||
    adventureLevelList.querySelector(".adventure-map-node");
  if (!target) return;
  const run = () => {
    target.scrollIntoView({ block: "center", behavior: instant ? "instant" : "smooth" });
  };
  if (instant) run();
  else window.requestAnimationFrame(run);
}

let adventureMapUiProgress = -1;
let adventureMapUiBonusRevealed = null;
let adventureMapUiIceRevealed = null;

function syncAdventureMapNodeStates() {
  if (!adventureLevelList) return;
  const highest = gameMeta.adventureHighestLevel || 0;
  const nextPlayable = Math.min(ADVENTURE_LEVEL_COUNT, highest + 1);
  const nodes = adventureLevelList.querySelectorAll(".adventure-map-node");
  nodes.forEach((b, i) => {
    const lvl = ADVENTURE_LEVELS[i];
    if (!lvl) return;
    const playable = isAdventureLevelPlayable(lvl.level);
    const cleared = lvl.level <= highest;
    const isCurrent = playable && !cleared && lvl.level === nextPlayable;
    b.classList.toggle("adventure-map-node--cleared", cleared);
    b.classList.toggle("adventure-map-node--locked", !playable);
    b.classList.toggle("adventure-map-node--current", isCurrent);
    b.disabled = !playable;
  });
}

function buildAdventureLevelUI(force = false) {
  if (!adventureLevelList) return;
  const highest = gameMeta.adventureHighestLevel || 0;
  const bonusRevealed = isAdventureBonusUnlocked();
  const iceRevealed = isAdventureIceUnlocked();
  const visibleCount = adventureMapVisibleLevelCount();
  if (
    !force &&
    adventureMapUiProgress === highest &&
    adventureMapUiBonusRevealed === bonusRevealed &&
    adventureMapUiIceRevealed === iceRevealed &&
    adventureLevelList.children.length === visibleCount
  ) {
    syncAdventureMapNodeStates();
    return;
  }
  adventureMapUiProgress = highest;
  adventureMapUiBonusRevealed = bonusRevealed;
  adventureMapUiIceRevealed = iceRevealed;
  adventureLevelList.innerHTML = "";
  const nextPlayable = Math.min(ADVENTURE_LEVEL_COUNT, highest + 1);

  if (adventureMapTrail) {
    adventureMapTrail.setAttribute("d", buildAdventureTrailPath());
  }

  const frag = document.createDocumentFragment();
  for (let i = 0; i < ADVENTURE_LEVELS.length; i++) {
    if (i >= ADVENTURE_ICE_START_INDEX && !iceRevealed) continue;
    if (i >= ADVENTURE_MAIN_LEVEL_COUNT && i < ADVENTURE_ICE_START_INDEX && !bonusRevealed) continue;
    const lvl = ADVENTURE_LEVELS[i];
    const layout = ADVENTURE_MAP_NODE_LAYOUT[i] || { x: 50, y: 50 };
    const playable = isAdventureLevelPlayable(lvl.level);
    const cleared = lvl.level <= highest;
    const isCurrent = playable && !cleared && lvl.level === nextPlayable;
    const isTreasureCoveFinale = i === TREASURE_COVE_INDEX;
    const isBonus = i >= ADVENTURE_MAIN_LEVEL_COUNT && i < ADVENTURE_ICE_START_INDEX;
    const isIce = i >= ADVENTURE_ICE_START_INDEX;
    const isUltimateFinale = i === ADVENTURE_LEVEL_COUNT - 1;
    const themeId = getAdventureLevelTheme(i);
    const b = document.createElement("button");
    b.type = "button";
    b.className = "adventure-map-node";
    b.classList.add(`adventure-map-node--theme-${themeId}`);
    if (cleared) b.classList.add("adventure-map-node--cleared");
    if (!playable) b.classList.add("adventure-map-node--locked");
    if (isCurrent) b.classList.add("adventure-map-node--current");
    if (isTreasureCoveFinale) b.classList.add("adventure-map-node--finale");
    if (isBonus) b.classList.add("adventure-map-node--bonus");
    if (isIce) b.classList.add("adventure-map-node--ice");
    if (isUltimateFinale) b.classList.add("adventure-map-node--bonus-finale");
    if (isIce && isUltimateFinale) b.classList.add("adventure-map-node--ice-finale");
    b.disabled = !playable;
    b.style.left = `${layout.x}%`;
    b.style.top = `${layout.y}%`;
    const sectionName = isIce
      ? ADVENTURE_SECTION_FROZEN_SEA
      : isBonus
        ? ADVENTURE_SECTION_GOLD_QUEST
        : ADVENTURE_SECTION_PIRATES_PATH;
    b.title = `${lvl.name} — ${sectionName} · pass ${lvl.passScore}`;
    b.dataset.levelIndex = String(i);
    b.dataset.section = isIce ? "ice" : isBonus ? "gold" : "pirates";
    const sceneMarkup =
      PERF_CHROMEBOOK && !playable
        ? ADVENTURE_MAP_SCENE_LITE
        : cachedAdventureMapSceneSvg(themeId, `n${i}`);
    b.innerHTML = `
      <span class="adventure-map-node__scene-wrap" aria-hidden="true">
        ${sceneMarkup}
        <span class="adventure-map-node__num">${lvl.level}</span>
        ${isTreasureCoveFinale ? '<span class="adventure-map-node__x" aria-hidden="true"></span>' : ""}
        ${isCurrent ? '<span class="adventure-map-node__boat" aria-hidden="true"></span>' : ""}
        ${cleared ? '<span class="adventure-map-node__star" aria-hidden="true"></span>' : ""}
        ${!playable ? '<span class="adventure-map-node__lock" aria-hidden="true"></span>' : ""}
      </span>
      <span class="adventure-map-node__label">${lvl.name}</span>
      <span class="adventure-map-node__meta">${sectionName} · ${lvl.passScore} pts</span>
    `;
    frag.appendChild(b);
  }
  adventureLevelList.appendChild(frag);
  applyAdventureMapExtent(false);
  syncAdventureMapSections();
  if (adventureMapBanner) {
    adventureMapBanner.hidden = !isAdventureUnlocked();
    if (iceRevealed) {
      adventureMapBanner.textContent = `Chart the course — ${ADVENTURE_SECTION_FROZEN_SEA} unlocked!`;
    } else if (bonusRevealed) {
      adventureMapBanner.textContent = `Chart the course — ${ADVENTURE_SECTION_GOLD_QUEST} unlocked beyond Pirates Path!`;
    } else {
      adventureMapBanner.textContent = `Chart the course — ${ADVENTURE_SECTION_PIRATES_PATH}, then ${ADVENTURE_SECTION_GOLD_QUEST} and ${ADVENTURE_SECTION_FROZEN_SEA}!`;
    }
  }
  if (adventureMapBonusBanner) {
    const showBonusBanner =
      (isAdventureBonusUnlocked() || gameMeta.pendingBonusVoyagesCelebration) && isAdventureUnlocked();
    adventureMapBonusBanner.hidden = !showBonusBanner;
    adventureMapBonusBanner.textContent = bonusRevealed
      ? `${ADVENTURE_SECTION_GOLD_QUEST} — riches beyond Treasure Cove`
      : `${ADVENTURE_SECTION_GOLD_QUEST} — conquer Treasure Cove to unlock`;
    adventureMapBonusBanner.classList.toggle(
      "adventure-map-bonus-banner--reveal",
      Boolean(gameMeta.pendingBonusVoyagesCelebration)
    );
  }
  if (adventureMapIceBanner) {
    const showIceBanner =
      (isAdventureIceUnlocked() || gameMeta.pendingIceVoyagesCelebration) && isAdventureUnlocked();
    adventureMapIceBanner.hidden = !showIceBanner;
    adventureMapIceBanner.textContent = iceRevealed
      ? `${ADVENTURE_SECTION_FROZEN_SEA} — icy voyages at the top of the chart`
      : `${ADVENTURE_SECTION_FROZEN_SEA} — clear Legend's Gate to unlock`;
    adventureMapIceBanner.classList.toggle(
      "adventure-map-ice-banner--reveal",
      Boolean(gameMeta.pendingIceVoyagesCelebration)
    );
  }
}

function clearBonusVoyagesMapCelebration() {
  if (!gameMeta.pendingBonusVoyagesCelebration) return;
  gameMeta.pendingBonusVoyagesCelebration = false;
  saveMeta();
  if (adventureMapBonusBanner) {
    adventureMapBonusBanner.classList.remove("adventure-map-bonus-banner--reveal");
  }
}

function clearIceVoyagesMapCelebration() {
  if (!gameMeta.pendingIceVoyagesCelebration) return;
  gameMeta.pendingIceVoyagesCelebration = false;
  saveMeta();
  if (adventureMapIceBanner) {
    adventureMapIceBanner.classList.remove("adventure-map-ice-banner--reveal");
  }
}

function prepareAdventureHub() {
  warmupAdventureSceneCache(true);
  buildAdventureLevelUI();
}

function openAdventureHub() {
  if (!isAdventureUnlocked()) {
    showToast(adventureUnlockBlockedMessage(), 2800);
    return;
  }
  prepareAdventureHub();
  hideAllPanels();
  if (panelAdventure) panelAdventure.hidden = false;
  syncAdventureLaunchVisibility();
  scrollAdventureMapToProgress(true);
  if (gameMeta.pendingBonusVoyagesCelebration) {
    showToast(`${ADVENTURE_SECTION_GOLD_QUEST} unlocked! New lands appear on the chart.`, 4200);
    window.requestAnimationFrame(() => runAdventureMapSectionReveal("gold"));
  } else if (gameMeta.pendingIceVoyagesCelebration) {
    showToast(`${ADVENTURE_SECTION_FROZEN_SEA} unlocked! The frozen north extends the chart.`, 4200);
    window.requestAnimationFrame(() => runAdventureMapSectionReveal("ice"));
  }
  if (musicEnabled) {
    window.requestAnimationFrame(() => startAdventureMusic());
  }
}

function startAdventureLevel(levelIndex) {
  const lvl = getAdventureLevel(levelIndex);
  if (!isAdventureLevelPlayable(lvl.level)) return;
  pendingAdventureLevelIndex = levelIndex;
  adventureSession = { levelIndex };
  selectedReefId = lvl.reefId;
  hideAllPanels();
  updateAdventurePlayTheme(levelIndex);
  startRound();
}

function playTreasureCoveVictorySound() {
  playTreasureMapUnlockSound();
  const ac = ensureMusicContext();
  if (!ac || !musicMaster) return;
  if (ac.state === "suspended") ac.resume();
  const now = ac.currentTime + 0.05;
  playMusicNote(523.25, now, 0.55, 0.05, "triangle");
  playMusicNote(659.25, now + 0.18, 0.5, 0.048, "sine");
  playMusicNote(783.99, now + 0.36, 0.65, 0.052, "triangle");
  playNoiseHit(now + 0.1, 0.28, 0.05);
}

function endAdventureRound() {
  const levelIndex = adventureSession.levelIndex;
  const lvl = getAdventureLevel(levelIndex);
  const passed = score >= lvl.passScore;
  const clearedTreasureCove = passed && levelIndex === TREASURE_COVE_INDEX;
  const clearedLegendsGate = passed && levelIndex === LEGENDS_GATE_INDEX;
  if (passed) {
    gameMeta.adventureHighestLevel = Math.max(gameMeta.adventureHighestLevel || 0, lvl.level);
    if (clearedTreasureCove) gameMeta.pendingBonusVoyagesCelebration = true;
    if (clearedLegendsGate) gameMeta.pendingIceVoyagesCelebration = true;
    saveMeta();
    adventureMapUiProgress = -1;
  }
  const earned = coinsAwardedForScore(score);
  if (earned > 0) {
    gameMeta.coins += earned;
    saveMeta();
    refreshCoinDisplays();
  }
  roundBait = { catchRadiusMult: 1, rareAssistAdd: 0, lightRadiusMult: 1 };
  adventureSession = null;
  clearAdventurePlayTheme();
  hideAllPanels();
  if (passed) {
    if (clearedTreasureCove) playTreasureCoveVictorySound();
    fillAdventureResultTheme(adventureWinTheme, levelIndex);
    if (adventureFailTheme) adventureFailTheme.hidden = true;
    if (adventureWinLevel) {
      adventureWinLevel.textContent = clearedTreasureCove
        ? "Treasure Cove conquered!"
        : clearedLegendsGate
          ? "Legend's Gate cleared!"
          : `Level ${lvl.level} cleared!`;
    }
    if (adventureWinScore) {
      adventureWinScore.textContent = clearedTreasureCove
        ? `You scored ${score} (needed ${lvl.passScore}). ${ADVENTURE_SECTION_GOLD_QUEST} voyages await beyond the cove!`
        : clearedLegendsGate
          ? `You scored ${score} (needed ${lvl.passScore}). ${ADVENTURE_SECTION_FROZEN_SEA} voyages now appear on the map!`
          : `You scored ${score} (needed ${lvl.passScore}).`;
    }
    if (adventureWinTreasureCelebrate) {
      adventureWinTreasureCelebrate.hidden = !clearedTreasureCove;
      if (clearedTreasureCove) {
        adventureWinTreasureCelebrate.setAttribute("aria-hidden", "false");
        panelAdventureWin?.classList.add("panel--treasure-cove-celebrate");
      } else {
        adventureWinTreasureCelebrate.setAttribute("aria-hidden", "true");
        panelAdventureWin?.classList.remove("panel--treasure-cove-celebrate");
      }
    }
    const hasNext = lvl.level < ADVENTURE_LEVEL_COUNT;
    if (btnAdventureNext) {
      btnAdventureNext.hidden = !hasNext;
      btnAdventureNext.textContent = clearedTreasureCove
        ? `Start ${ADVENTURE_SECTION_GOLD_QUEST} voyage 1`
        : clearedLegendsGate
          ? `Start ${ADVENTURE_SECTION_FROZEN_SEA} voyage 1`
          : hasNext
            ? `Start level ${lvl.level + 1}`
            : "Back to map";
    }
    if (panelAdventureWin) panelAdventureWin.hidden = false;
  } else {
    fillAdventureResultTheme(adventureFailTheme, levelIndex);
    if (adventureWinTheme) adventureWinTheme.hidden = true;
    if (adventureFailScore) adventureFailScore.textContent = `Your score: ${score}`;
    if (adventureFailGoal) adventureFailGoal.textContent = `Needed: ${lvl.passScore}`;
    if (panelAdventureFail) panelAdventureFail.hidden = false;
  }
  syncAdventureLaunchVisibility();
  if (musicEnabled) startAdventureMusic();
}

function isAdventureMusicActive() {
  if (playing && adventureSession) return true;
  if (panelAdventure && !panelAdventure.hidden) return true;
  if (panelAdventureWin && !panelAdventureWin.hidden) return true;
  if (panelAdventureFail && !panelAdventureFail.hidden) return true;
  return false;
}

function updateMusicButton() {
  if (!btnToggleMusic) return;
  btnToggleMusic.setAttribute("aria-pressed", musicEnabled ? "true" : "false");
  btnToggleMusic.textContent = musicEnabled ? "Music on" : "Music";
}

function ensureMusicContext() {
  if (musicCtx) return musicCtx;
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) return null;
  musicCtx = new AudioCtor();
  musicMaster = musicCtx.createGain();
  musicMaster.gain.value = 0.2;
  musicMaster.connect(musicCtx.destination);
  return musicCtx;
}

function playMusicNote(freq, startAt, dur, gain = 0.045, type = "triangle") {
  if (!musicCtx || !musicMaster) return;
  const osc = musicCtx.createOscillator();
  const g = musicCtx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, startAt);
  g.gain.setValueAtTime(0.0001, startAt);
  g.gain.exponentialRampToValueAtTime(gain, startAt + 0.08);
  g.gain.exponentialRampToValueAtTime(0.0001, startAt + dur);
  osc.connect(g);
  g.connect(musicMaster);
  osc.start(startAt);
  osc.stop(startAt + dur + 0.03);
}

function playNoiseHit(startAt, dur, gain = 0.02) {
  if (!musicCtx || !musicMaster) return;
  const buffer = musicCtx.createBuffer(1, Math.max(1, Math.floor(musicCtx.sampleRate * dur)), musicCtx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  const src = musicCtx.createBufferSource();
  const filter = musicCtx.createBiquadFilter();
  const g = musicCtx.createGain();
  src.buffer = buffer;
  filter.type = "bandpass";
  filter.frequency.value = 1700;
  filter.Q.value = 0.65;
  g.gain.setValueAtTime(gain, startAt);
  g.gain.exponentialRampToValueAtTime(0.0001, startAt + dur);
  src.connect(filter);
  filter.connect(g);
  g.connect(musicMaster);
  src.start(startAt);
}

function playCatchCelebrationSound(count = 1) {
  const ac = ensureMusicContext();
  if (!ac || !musicMaster) return;
  if (ac.state === "suspended") ac.resume();
  const now = ac.currentTime + 0.015;
  const notes = count > 1 ? [523.25, 659.25, 783.99, 1046.5] : [587.33, 739.99, 987.77];
  for (let i = 0; i < notes.length; i++) {
    playMusicNote(notes[i], now + i * 0.07, 0.22, count > 1 ? 0.036 : 0.03, i % 2 === 0 ? "triangle" : "sine");
  }
  playNoiseHit(now + 0.04, 0.12, count > 1 ? 0.032 : 0.024);
  playNoiseHit(now + 0.22, 0.14, count > 1 ? 0.026 : 0.018);
}

function playCrabJackpotSound() {
  const ac = ensureMusicContext();
  if (!ac || !musicMaster) return;
  if (ac.state === "suspended") ac.resume();
  const now = ac.currentTime + 0.02;
  const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51];
  for (let i = 0; i < notes.length; i++) {
    playMusicNote(notes[i], now + i * 0.075, 0.34, 0.05, i % 2 === 0 ? "triangle" : "sine");
  }
  playMusicNote(261.63, now, 0.7, 0.04, "sine");
  playMusicNote(392.0, now + 0.2, 0.58, 0.035, "sine");
  playNoiseHit(now + 0.08, 0.18, 0.045);
  playNoiseHit(now + 0.36, 0.2, 0.038);
}

function playTreasureMapUnlockSound() {
  const ac = ensureMusicContext();
  if (!ac || !musicMaster) return;
  if (ac.state === "suspended") ac.resume();
  const now = ac.currentTime + 0.02;
  const notes = [329.63, 392.0, 493.88, 587.33, 659.25, 783.99, 987.77, 1174.66];
  for (let i = 0; i < notes.length; i++) {
    playMusicNote(notes[i], now + i * 0.13, 0.48, 0.052, i % 2 === 0 ? "triangle" : "sine");
  }
  playMusicNote(164.81, now, 1.6, 0.044, "sine");
  playMusicNote(220.0, now + 0.35, 1.3, 0.04, "sine");
  playMusicNote(261.63, now + 0.75, 1.1, 0.038, "sine");
  playNoiseHit(now + 0.08, 0.2, 0.042);
  playNoiseHit(now + 0.55, 0.24, 0.036);
  playNoiseHit(now + 1.05, 0.3, 0.032);
}

function spawnTreasureCinematicBurst(x, y, count, hue) {
  const n = Math.min(64, count);
  for (let i = 0; i < n; i++) {
    const ang = (Math.PI * 2 * i) / n + (Math.random() - 0.5) * 0.6;
    const sp = (2.5 + Math.random() * 6) * dpr;
    celebration.particles.push({
      x,
      y,
      vx: Math.cos(ang) * sp,
      vy: Math.sin(ang) * sp - 2.4 * dpr,
      life: 1.1 + Math.random() * 0.7,
      size: (3 + Math.random() * 6) * dpr,
      spin: (Math.random() - 0.5) * 0.25,
      color: `hsla(${hue + (Math.random() - 0.5) * 35}, 95%, 62%, 1)`,
    });
  }
  celebration.rings.push({ x, y, t: 0, life: 1.35 });
  catchFlash = Math.min(0.72, catchFlash + 0.45);
}

function isGameplayFrozen() {
  return treasureMapRevealPaused;
}

function jackpotCrabChestScale() {
  return dpr * 1.05;
}

function showTreasureMapOverlay() {
  if (!treasureMapReveal) return;
  treasureChestCinematic = null;
  treasureMapReveal.hidden = false;
  treasureMapReveal.setAttribute("aria-hidden", "false");
  treasureMapReveal.classList.remove("treasure-map-reveal--active", "treasure-map-reveal--map-only");
  void treasureMapReveal.offsetWidth;
  treasureMapReveal.classList.add("treasure-map-reveal--active", "treasure-map-reveal--map-only");
  window.setTimeout(() => btnTreasureMapRevealDone?.focus(), 4200);
}

function startTreasureMapReveal(crabX, crabY, facing) {
  if (treasureMapRevealPaused) return;
  treasureMapRevealPaused = true;
  const sc = jackpotCrabChestScale();
  const now = performance.now();
  treasureChestCinematic = {
    phase: "anticipate",
    startX: crabX,
    startY: crabY,
    x: crabX,
    y: crabY,
    targetX: w * 0.5,
    targetY: h * 0.5,
    sc,
    scale: 1,
    facing: facing >= 0 ? 1 : -1,
    lidOpen: 0,
    startedAt: now,
    anticipateStartedAt: now,
    flyStartedAt: 0,
    openStartedAt: 0,
    holdStartedAt: 0,
    lastSparkleAt: 0,
    glowPulse: 0,
  };
  if (treasureMapReveal) {
    treasureMapReveal.hidden = true;
    treasureMapReveal.setAttribute("aria-hidden", "true");
    treasureMapReveal.classList.remove("treasure-map-reveal--active", "treasure-map-reveal--map-only");
  }
  spawnTreasureCinematicBurst(crabX, crabY, 28, 42);
  playTreasureMapUnlockSound();
}

function updateTreasureChestCinematic(now) {
  const c = treasureChestCinematic;
  if (!c || c.phase === "map") return;

  if (c.phase === "anticipate") {
    const t = Math.min(1, (now - c.anticipateStartedAt) / TREASURE_CINEMATIC_ANTICIPATE_MS);
    c.scale = 1 + Math.sin(t * Math.PI * 4) * 0.18;
    c.glowPulse = t;
    if (now - c.lastSparkleAt > 180) {
      spawnTreasureCinematicBurst(c.x, c.y - 12 * dpr, 6, 48);
      c.lastSparkleAt = now;
    }
    if (t >= 1) {
      c.phase = "fly";
      c.flyStartedAt = now;
      spawnTreasureCinematicBurst(c.x, c.y, 36, 38);
    }
  } else if (c.phase === "fly") {
    const elapsed = now - c.flyStartedAt;
    const t = Math.min(1, elapsed / TREASURE_CINEMATIC_FLY_MS);
    const ease = 1 - (1 - t) ** 4;
    const arc = Math.sin(t * Math.PI) * -h * 0.14;
    c.x = c.startX + (c.targetX - c.startX) * ease;
    c.y = c.startY + (c.targetY - c.startY) * ease + arc;
    c.scale = 1 + ease * 1.05;
    c.glowPulse = ease;
    if (now - c.lastSparkleAt > 220) {
      spawnTreasureCinematicBurst(c.x, c.y, 4, 44);
      c.lastSparkleAt = now;
    }
    if (t >= 1) {
      c.phase = "open";
      c.openStartedAt = now;
      c.x = c.targetX;
      c.y = c.targetY;
      spawnTreasureCinematicBurst(c.targetX, c.targetY, 52, 50);
      playTreasureMapUnlockSound();
    }
  } else if (c.phase === "open") {
    const openT = Math.min(1, (now - c.openStartedAt) / TREASURE_CINEMATIC_OPEN_MS);
    c.lidOpen = openT ** 0.85;
    c.glowPulse = 0.65 + Math.sin(openT * Math.PI * 3) * 0.35;
    if (openT > 0.35 && now - c.lastSparkleAt > 160) {
      spawnTreasureCinematicBurst(c.x, c.y - 20 * dpr * c.scale, 8, 52);
      c.lastSparkleAt = now;
    }
    if (openT >= 1) {
      c.phase = "hold";
      c.holdStartedAt = now;
      c.lidOpen = 1;
      spawnTreasureCinematicBurst(c.x, c.y, 64, 46);
    }
  } else if (c.phase === "hold") {
    const holdT = Math.min(1, (now - c.holdStartedAt) / TREASURE_CINEMATIC_HOLD_MS);
    c.lidOpen = 1;
    c.glowPulse = 0.55 + Math.sin(holdT * Math.PI * 5) * 0.45;
    c.scale = 2.05 + Math.sin(holdT * Math.PI * 3) * 0.08;
    if (now - c.lastSparkleAt > 280) {
      spawnTreasureCinematicBurst(c.x, c.y - 28 * dpr, 10, 42);
      c.lastSparkleAt = now;
    }
    if (holdT >= 1) {
      c.phase = "map";
      showTreasureMapOverlay();
    }
  }
}

function endTreasureMapReveal() {
  if (!treasureMapRevealPaused) return;
  treasureMapRevealPaused = false;
  treasureChestCinematic = null;
  treasureMapReveal?.classList.remove("treasure-map-reveal--active", "treasure-map-reveal--map-only");
  if (treasureMapReveal) {
    treasureMapReveal.hidden = true;
    treasureMapReveal.setAttribute("aria-hidden", "true");
  }
  showToast(`Treasure map unlocked! ${ADVENTURE_SECTION_PIRATES_PATH} awaits.`, 3200);
  updateAdventureLaunchUI();
}

function playKrakenBadSound() {
  const ac = ensureMusicContext();
  if (!ac || !musicMaster) return;
  if (ac.state === "suspended") ac.resume();
  const now = ac.currentTime + 0.02;
  const notes = [246.94, 207.65, 174.61, 138.59];
  for (let i = 0; i < notes.length; i++) {
    playMusicNote(notes[i], now + i * 0.11, 0.32, 0.046, i % 2 === 0 ? "sawtooth" : "triangle");
  }
  playNoiseHit(now + 0.04, 0.28, 0.032);
}

function isChromebookOrIPad() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  if (isChromebook()) return true;
  if (/iPad/.test(ua)) return true;
  // Modern iPads report as "Macintosh" but expose touch points.
  if (navigator.platform === "MacIntel" && (navigator.maxTouchPoints || 0) > 1) return true;
  return false;
}

const HOME_MUSIC_VOLUME_BOOST = isChromebookOrIPad() ? 5.5 : 1;
const DEFAULT_MUSIC_MASTER_GAIN = 0.2;
const HOME_MUSIC_MASTER_GAIN = isChromebookOrIPad() ? 0.5 : DEFAULT_MUSIC_MASTER_GAIN;

function syncMusicMasterGain() {
  if (!musicMaster) return;
  musicMaster.gain.value = musicEnabled && !playing && isChromebookOrIPad() ? HOME_MUSIC_MASTER_GAIN : DEFAULT_MUSIC_MASTER_GAIN;
}

function scheduleSailingMusicBar() {
  if (!musicCtx || !musicEnabled || playing) return;
  const now = musicCtx.currentTime + 0.04;
  const v = HOME_MUSIC_VOLUME_BOOST;
  // Original soft yacht-rock radio bed: smooth major-7/add-9 colors, not a cover melody.
  const chords = [
    [220.0, 277.18, 329.63, 415.3, 493.88],
    [185.0, 220.0, 277.18, 329.63, 440.0],
    [146.83, 185.0, 220.0, 277.18, 329.63],
    [164.81, 207.65, 246.94, 329.63, 369.99],
  ];
  const chord = chords[musicStep % chords.length];
  const bass = chord[0] / 2;
  playMusicNote(bass, now, 0.62, 0.044 * v, "sine");
  playMusicNote(bass * 2, now + 0.84, 0.44, 0.026 * v, "sine");
  for (let i = 0; i < chord.length; i++) {
    playMusicNote(chord[i], now + i * 0.035, 1.72, 0.014 * v, "triangle");
    playMusicNote(chord[i] * 1.003, now + i * 0.035, 1.72, 0.006 * v, "sine");
  }
  playMusicNote(chord[2] * 2, now + 0.52, 0.24, 0.012 * v, "sine");
  playMusicNote(chord[4] * 1.5, now + 0.98, 0.32, 0.011 * v, "sine");
  playMusicNote(chord[3] * 2, now + 1.28, 0.26, 0.009 * v, "triangle");
  playNoiseHit(now + 0.58, 0.09, 0.006 * v);
  playNoiseHit(now + 1.36, 0.12, 0.008 * v);
  musicStep++;
}

function reefMusicSpec(reefId) {
  const specs = {
    australia: {
      tempoMs: 1320,
      type: "triangle",
      bassType: "sine",
      gain: 0.0035,
      bassGain: 0.007,
      chords: [
        [261.63, 329.63, 392.0, 523.25],
        [293.66, 369.99, 440.0, 587.33],
        [349.23, 440.0, 523.25, 659.25],
        [392.0, 493.88, 587.33, 783.99],
      ],
      sparkle: [659.25, 783.99, 1046.5],
      noise: 0.0008,
    },
    caribbean: {
      tempoMs: 1460,
      type: "sine",
      bassType: "triangle",
      gain: 0.006,
      bassGain: 0.012,
      chords: [
        [220.0, 277.18, 329.63, 440.0],
        [246.94, 311.13, 369.99, 493.88],
        [196.0, 246.94, 293.66, 392.0],
        [261.63, 329.63, 392.0, 523.25],
      ],
      sparkle: [554.37, 659.25, 739.99],
      noise: 0.0015,
    },
    mediterranean: {
      tempoMs: 1180,
      type: "triangle",
      bassType: "sine",
      gain: 0.0055,
      bassGain: 0.015,
      chords: [
        [174.61, 220.0, 261.63, 329.63],
        [196.0, 246.94, 293.66, 369.99],
        [164.81, 207.65, 246.94, 329.63],
        [146.83, 185.0, 220.0, 293.66],
      ],
      sparkle: [392.0, 440.0, 493.88],
      noise: 0.002,
    },
    japan_kuroshio: {
      tempoMs: 920,
      type: "sawtooth",
      bassType: "triangle",
      gain: 0.0045,
      bassGain: 0.014,
      chords: [
        [146.83, 196.0, 233.08, 293.66],
        [164.81, 207.65, 246.94, 329.63],
        [138.59, 185.0, 220.0, 277.18],
        [155.56, 196.0, 246.94, 311.13],
      ],
      sparkle: [369.99, 415.3, 493.88],
      noise: 0.0025,
    },
    mariana_trench: {
      tempoMs: 1760,
      type: "sine",
      bassType: "sawtooth",
      gain: 0.004,
      bassGain: 0.012,
      chords: [
        [82.41, 123.47, 164.81, 196.0],
        [73.42, 110.0, 146.83, 185.0],
        [92.5, 138.59, 174.61, 207.65],
        [69.3, 103.83, 138.59, 164.81],
      ],
      sparkle: [246.94, 277.18, 329.63],
      noise: 0.003,
    },
  };
  return specs[reefId] || specs.caribbean;
}

const ADVENTURE_PIRATE_TEMPO_MS = 700;

function scheduleAdventurePirateMusicBar() {
  if (!musicCtx || !musicEnabled || !isAdventureMusicActive()) return;
  const now = musicCtx.currentTime + 0.04;
  const v = 1.25;
  const bars = [
    { bass: 73.42, melody: [146.83, 174.61, 220.0, 261.63, 293.66] },
    { bass: 65.41, melody: [130.81, 155.56, 196.0, 233.08, 261.63] },
    { bass: 58.27, melody: [116.54, 138.59, 174.61, 207.65, 233.08] },
    { bass: 55.0, melody: [110.0, 130.81, 164.81, 196.0, 220.0] },
  ];
  const bar = bars[adventureMusicStep % bars.length];
  const pulse = adventureMusicStep % 8;

  playMusicNote(bar.bass, now, 0.42, 0.068 * v, "sawtooth");
  playMusicNote(bar.bass * 0.5, now, 0.5, 0.038 * v, "sine");

  if (pulse % 4 === 0) {
    playMusicNote(bar.melody[0], now + 0.02, 0.35, 0.028 * v, "square");
    playMusicNote(bar.melody[0] * 1.005, now + 0.02, 0.35, 0.018 * v, "sawtooth");
    playMusicNote(bar.melody[2], now + 0.02, 0.32, 0.022 * v, "triangle");
  }

  const melIdx = pulse % bar.melody.length;
  playMusicNote(bar.melody[melIdx], now + 0.12 + (pulse % 4) * 0.08, 0.22, 0.024 * v, pulse % 2 ? "triangle" : "square");

  if (adventureMusicStep % 2 === 1) {
    playMusicNote(bar.melody[3], now + 0.44, 0.14, 0.02 * v, "sawtooth");
    playMusicNote(bar.melody[4] || bar.melody[3] * 1.12, now + 0.54, 0.12, 0.017 * v, "triangle");
  }

  playNoiseHit(now + 0.18, 0.05, 0.014 * v);
  if (pulse % 2 === 1) playNoiseHit(now + 0.52, 0.07, 0.018 * v);

  if (adventureMusicStep % 8 === 4) {
    playMusicNote(98.0, now + 0.28, 0.3, 0.03 * v, "triangle");
    playMusicNote(123.47, now + 0.38, 0.25, 0.026 * v, "sine");
  }

  adventureMusicStep++;
}

function startAdventureMusic() {
  if (!musicEnabled || !isAdventureMusicActive()) return;
  startHomeWaves();
  if (!musicCtx) return;
  const ac = ensureMusicContext();
  if (!ac) return;
  if (ac.state === "suspended") ac.resume();
  stopHomeMusic();
  stopReefMusic();
  syncMusicMasterGain();
  if (!adventureMusicTimer) {
    adventureMusicStep = 0;
    scheduleAdventurePirateMusicBar();
    adventureMusicTimer = setInterval(scheduleAdventurePirateMusicBar, ADVENTURE_PIRATE_TEMPO_MS);
  }
}

function stopAdventureMusic() {
  if (adventureMusicTimer) {
    clearInterval(adventureMusicTimer);
    adventureMusicTimer = null;
  }
}

function scheduleReefMusicBar() {
  if (!musicCtx || !musicEnabled || !playing || adventureSession) return;
  const reef = getReef();
  const spec = reefMusicSpec(reef.id);
  const now = musicCtx.currentTime + 0.035;
  const chord = spec.chords[gameMusicStep % spec.chords.length];
  const bass = chord[0] / (reef.id === "mariana_trench" ? 2 : 1.5);
  playMusicNote(bass, now, spec.tempoMs / 1000 + 0.2, spec.bassGain, spec.bassType);
  for (let i = 0; i < chord.length; i++) {
    playMusicNote(chord[i], now + i * 0.04, spec.tempoMs / 1000 * 0.85, spec.gain, spec.type);
  }
  for (let i = 0; i < spec.sparkle.length; i++) {
    const beat = now + 0.22 + i * (spec.tempoMs / 1000 / 4);
    playMusicNote(spec.sparkle[(gameMusicStep + i) % spec.sparkle.length], beat, 0.16, spec.gain * 0.72, reef.id === "japan_kuroshio" ? "triangle" : "sine");
  }
  if (spec.noise > 0) {
    playNoiseHit(now + spec.tempoMs / 1000 * 0.45, reef.id === "mariana_trench" ? 0.22 : 0.08, spec.noise);
  }
  gameMusicStep++;
}

function startReefMusic() {
  if (!musicEnabled || !playing) return;
  if (adventureSession) {
    startAdventureMusic();
    return;
  }
  stopAdventureMusic();
  const ac = ensureMusicContext();
  if (!ac) return;
  if (ac.state === "suspended") ac.resume();
  if (!gameMusicTimer) {
    gameMusicStep = 0;
    scheduleReefMusicBar();
    gameMusicTimer = setInterval(scheduleReefMusicBar, reefMusicSpec(getReef().id).tempoMs);
  }
}

function stopReefMusic() {
  if (gameMusicTimer) {
    clearInterval(gameMusicTimer);
    gameMusicTimer = null;
  }
}

function startHomeWaves() {
  const ac = ensureMusicContext();
  if (!ac) return;
  if (ac.state === "suspended") ac.resume();
  homeAudioUnlocked = true;
}

function startHomeMusic() {
  if (!musicEnabled || playing || isAdventureMusicActive()) return;
  startHomeWaves();
  if (!musicCtx) return;
  syncMusicMasterGain();
  if (!musicTimer) {
    scheduleSailingMusicBar();
    musicTimer = setInterval(scheduleSailingMusicBar, 1600);
  }
}

function stopHomeMusic() {
  if (musicTimer) {
    clearInterval(musicTimer);
    musicTimer = null;
  }
  syncMusicMasterGain();
}

function stopHomeAudio() {
  stopHomeMusic();
  stopReefMusic();
  stopAdventureMusic();
}

function toggleHomeMusic() {
  musicEnabled = !musicEnabled;
  updateMusicButton();
  syncMusicMasterGain();
  if (playing) {
    if (musicEnabled) startReefMusic();
    else {
      stopReefMusic();
      stopAdventureMusic();
    }
  } else if (musicEnabled) {
    if (isAdventureMusicActive()) startAdventureMusic();
    else startHomeMusic();
  } else {
    stopHomeMusic();
    stopAdventureMusic();
    if (homeAudioUnlocked) startHomeWaves();
  }
}

function unlockHomeAudio() {
  if (!playing) {
    startHomeWaves();
    if (musicEnabled) startHomeMusic();
  }
}

function refreshCoinDisplays() {
  const t = String(gameMeta.coins);
  if (coinDisplay) coinDisplay.textContent = t;
  if (coinDisplayStart) coinDisplayStart.textContent = t;
  if (coinDisplayShop) coinDisplayShop.textContent = t;
  refreshTreasureChestDisplay();
}

function refreshTreasureChestDisplay() {
  const unlocked = isAdventureUnlocked();
  const chestRow = treasureChestDisplayStart?.closest(".start-toolbar__chests");
  if (chestRow) chestRow.hidden = unlocked;
  if (unlocked) return;
  const total = gameMeta.totalTreasureChests || 0;
  const label = `${total} / ${TREASURE_CHESTS_TO_UNLOCK_ADVENTURE}`;
  if (treasureChestDisplayStart) treasureChestDisplayStart.textContent = label;
}

function adventureUnlockBlockedMessage() {
  return `You need ${TREASURE_CHESTS_TO_UNLOCK_ADVENTURE} treasure chests to unlock Adventure Mode.`;
}

function setCoinDisplaysAmount(amount) {
  const t = String(Math.max(0, Math.floor(amount)));
  if (coinDisplay) coinDisplay.textContent = t;
  if (coinDisplayStart) coinDisplayStart.textContent = t;
  if (coinDisplayShop) coinDisplayShop.textContent = t;
}

function animateCoinAward(fromCoins, toCoins, earnedCoins) {
  if (coinAwardAnimId) cancelAnimationFrame(coinAwardAnimId);
  const startedAt = performance.now();
  const duration = Math.min(1900, 900 + earnedCoins * 18);
  setCoinDisplaysAmount(fromCoins);
  if (coinsEarnedLine) {
    coinsEarnedLine.hidden = false;
    coinsEarnedLine.innerHTML = `Coins earned: <strong>+0</strong> · Bank: <strong>${fromCoins}</strong>`;
  }

  const tick = (now) => {
    const u = Math.min(1, (now - startedAt) / duration);
    const ease = 1 - Math.pow(1 - u, 3);
    const shownBank = Math.round(fromCoins + (toCoins - fromCoins) * ease);
    const shownEarned = Math.round(earnedCoins * ease);
    setCoinDisplaysAmount(shownBank);
    if (coinsEarnedLine) {
      coinsEarnedLine.innerHTML = `Coins earned: <strong>+${shownEarned}</strong> · Bank: <strong>${shownBank}</strong>`;
    }
    if (u < 1) {
      coinAwardAnimId = requestAnimationFrame(tick);
    } else {
      coinAwardAnimId = 0;
      refreshCoinDisplays();
      if (coinsEarnedLine) {
        coinsEarnedLine.innerHTML = `Coins earned: <strong>+${earnedCoins}</strong> · Bank: <strong>${toCoins}</strong>`;
      }
    }
  };
  coinAwardAnimId = requestAnimationFrame(tick);
}

function buildBaitUI() {
  if (!baitChoices) return;
  normalizeSelectedBaitId();
  baitChoices.innerHTML = "";
  for (const b of BAITS) {
    const stock = b.consumesOnRound ? getBaitCount(b.id) : null;
    const dis = Boolean(b.consumesOnRound && stock <= 0);
    const btn = document.createElement("button");
    btn.type = "button";
    const slug = b.id.replace(/_/g, "-");
    btn.className =
      `rod-option rod-option--bait-${slug}` +
      (gameMeta.selectedBaitId === b.id ? " rod-option--selected" : "") +
      (dis ? " rod-option--disabled" : "");
    const stockLine = b.consumesOnRound
      ? `<span class="rod-option__stock">${stock} in tackle box</span>`
      : `<span class="rod-option__stock">Unlimited</span>`;
    btn.innerHTML = `<span class="rod-option__name">${b.name}</span><span class="rod-option__desc">${b.desc}</span>${stockLine}`;
    if (!dis) {
      btn.addEventListener("click", () => {
        gameMeta.selectedBaitId = b.id;
        saveMeta();
        baitChoices.querySelectorAll(".rod-option").forEach((el) => el.classList.remove("rod-option--selected"));
        btn.classList.add("rod-option--selected");
      });
    }
    baitChoices.appendChild(btn);
  }
}

function buildShopUI() {
  if (!shopList) return;
  shopList.innerHTML = "";
  for (const b of BAITS) {
    if (!b.consumesOnRound) continue;
    const li = document.createElement("li");
    li.className = "shop-item";
    const body = document.createElement("div");
    body.className = "shop-item__body";
    const title = document.createElement("h3");
    title.className = "shop-item__title";
    title.textContent = b.name;
    const desc = document.createElement("p");
    desc.className = "shop-item__desc";
    desc.textContent = b.desc;
    const meta = document.createElement("div");
    meta.className = "shop-item__meta";
    meta.textContent = `+${b.packSize} uses · ${b.price} coins`;
    body.append(title, desc, meta);
    const buy = document.createElement("button");
    buy.type = "button";
    buy.className = "btn btn--secondary";
    buy.textContent = "Buy";
    buy.disabled = gameMeta.coins < b.price;
    buy.addEventListener("click", () => {
      if (gameMeta.coins < b.price) return;
      gameMeta.coins -= b.price;
      gameMeta.baitCounts[b.id] = getBaitCount(b.id) + b.packSize;
      saveMeta();
      refreshCoinDisplays();
      buildShopUI();
      buildBaitUI();
      buildRodUI();
      showToast(`${b.name} +${b.packSize}`, 1600);
    });
    li.append(body, buy);
    shopList.appendChild(li);
  }
  for (const rod of RODS) {
    if (rod.id === FREE_ROD_ID) continue;
    const owned = isRodOwned(rod.id);
    const li = document.createElement("li");
    li.className = "shop-item shop-item--rod";
    const body = document.createElement("div");
    body.className = "shop-item__body";
    const title = document.createElement("h3");
    title.className = "shop-item__title";
    title.textContent = rod.name;
    const desc = document.createElement("p");
    desc.className = "shop-item__desc";
    desc.textContent = rod.desc;
    const meta = document.createElement("div");
    meta.className = "shop-item__meta";
    meta.textContent = owned ? "Rod · owned" : `Rod · ${ROD_PRICE} coins`;
    body.append(title, desc, meta);
    const buy = document.createElement("button");
    buy.type = "button";
    buy.className = "btn btn--secondary";
    buy.textContent = owned ? "Owned" : "Buy";
    buy.disabled = owned || gameMeta.coins < ROD_PRICE;
    buy.addEventListener("click", () => {
      if (owned || gameMeta.coins < ROD_PRICE) return;
      gameMeta.coins -= ROD_PRICE;
      gameMeta.ownedRodIds = Array.from(new Set([...(gameMeta.ownedRodIds || [FREE_ROD_ID]), rod.id]));
      gameMeta.selectedRodId = rod.id;
      selectedRod = rod;
      saveMeta();
      refreshCoinDisplays();
      buildShopUI();
      buildRodUI();
      showToast(`${rod.name} unlocked!`, 1700);
    });
    li.append(body, buy);
    shopList.appendChild(li);
  }
}

function openShop() {
  if (!panelShop || !panelStart) return;
  normalizeSelectedBaitId();
  refreshCoinDisplays();
  buildShopUI();
  showShopGuideIfNeeded();
  panelStart.hidden = true;
  panelShop.hidden = false;
  syncAdventureLaunchVisibility();
}

function closeShop() {
  if (!panelShop || !panelStart) return;
  panelShop.hidden = true;
  panelStart.hidden = false;
  refreshLeaderboardViews();
  buildBaitUI();
  buildRodUI();
  refreshCoinDisplays();
  syncAdventureLaunchVisibility();
}

function updateStartButtonSubtext() {
  if (!btnStartSub) return;
  const r = getReef();
  const sec = Math.ceil(r.roundMs / 1000);
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  const timeStr = `${m}:${s.toString().padStart(2, "0")}`;
  btnStartSub.textContent = `${timeStr} on ${r.name} (${r.difficulty}) · tap to play`;
}

const MAP_CHART_W = 200;
const MAP_CHART_H = 100;

function showReefOnMap(reef) {
  if (!reefMapBoat || !reefMapCaption || !reef) return;
  const p = reef.mapPin || { x: MAP_CHART_W / 2, y: MAP_CHART_H / 2 };
  reefMapBoat.style.left = `${(p.x / MAP_CHART_W) * 100}%`;
  reefMapBoat.style.top = `${(p.y / MAP_CHART_H) * 100}%`;
  reefMapCaption.textContent = `${reef.name} — ${reef.mapPlace}`;
}

function showSelectedReefOnMap() {
  showReefOnMap(getReef());
}

function buildReefUI() {
  if (!reefChoices) return;
  reefChoices.innerHTML = "";
  for (const reef of REEFS) {
    const b = document.createElement("button");
    b.type = "button";
    const badgeSlug = reef.difficulty.toLowerCase().replace(/\s+/g, "-");
    const badgeClass = `rod-option__badge--${badgeSlug}`;
    b.className = "rod-option" + (reef.id === selectedReefId ? " rod-option--selected" : "");
    b.innerHTML = `<span class="rod-option__name">${reef.name} <span class="rod-option__badge ${badgeClass}">${reef.difficulty}</span></span><span class="rod-option__desc">${reef.desc}</span>`;
    b.addEventListener("click", () => {
      selectedReefId = reef.id;
      invalidateBackgroundCache();
      reefChoices.querySelectorAll(".rod-option").forEach((el) => el.classList.remove("rod-option--selected"));
      b.classList.add("rod-option--selected");
      updateStartButtonSubtext();
      showSelectedReefOnMap();
    });
    b.addEventListener("pointerenter", () => showReefOnMap(reef));
    b.addEventListener("pointerleave", () => showSelectedReefOnMap());
    b.addEventListener("focus", () => showReefOnMap(reef));
    b.addEventListener("blur", () => showSelectedReefOnMap());
    reefChoices.appendChild(b);
  }
  updateStartButtonSubtext();
  showSelectedReefOnMap();
}

function buildRodUI() {
  if (!rodChoices) return;
  normalizeSelectedRod();
  rodChoices.innerHTML = "";
  for (const rod of RODS) {
    if (!isRodOwned(rod.id)) continue;
    const b = document.createElement("button");
    b.type = "button";
    b.className =
      `rod-option rod-option--rod-${rod.id}` +
      (rod.id === selectedRod.id ? " rod-option--selected" : "");
    const stockLine = `<span class="rod-option__stock">Owned</span>`;
    b.innerHTML = `<span class="rod-option__name">${rod.name}</span><span class="rod-option__desc">${rod.desc}</span>${stockLine}`;
    b.addEventListener("click", () => {
      selectedRod = rod;
      gameMeta.selectedRodId = rod.id;
      saveMeta();
      rodChoices.querySelectorAll(".rod-option").forEach((el) => el.classList.remove("rod-option--selected"));
      b.classList.add("rod-option--selected");
    });
    rodChoices.appendChild(b);
  }
  updateStartButtonSubtext();
}

function invalidateBackgroundCache() {
  bgCacheKey = "";
}

/** Spawn delay (ms) — faster on Chromebook so adventure rounds feel responsive. */
function rollNextSpawnDelay(reef, quickStart = false) {
  let wait = reef.spawnMin + Math.random() * Math.max(80, reef.spawnMax - reef.spawnMin);
  if (quickStart) wait *= 0.45;
  if (PERF_CHROMEBOOK) {
    wait *= adventureSession ? 0.58 : 0.82;
    if (adventureSession) wait = Math.max(90, wait);
  }
  return wait;
}

function effectiveCastDownMs() {
  if (PERF_CHROMEBOOK && adventureSession) return CAST_DOWN_MS * 0.9;
  return CAST_DOWN_MS;
}

function effectiveCastUpMs() {
  if (PERF_CHROMEBOOK && adventureSession) return CAST_UP_MS * 0.9;
  return CAST_UP_MS;
}

function seedStarterFish(reef) {
  if (!PERF_CHROMEBOOK || !adventureSession) return;
  const n = Math.min(3, Math.max(2, Math.floor(reef.maxFish * 0.3)));
  for (let i = 0; i < n; i++) spawnFish();
}

function resize() {
  const rect = canvas.getBoundingClientRect();
  dpr = Math.min(window.devicePixelRatio || 1, PERF_CHROMEBOOK ? 1 : 2);
  w = Math.floor(rect.width * dpr);
  h = Math.floor(rect.height * dpr);
  canvas.width = w;
  canvas.height = h;
  invalidateBackgroundCache();
  waterTop = h * 0.08;
  waterH = h - waterTop;
  hook.x = w * 0.5;
  hook.targetX = hook.x;
  hook.tipY = waterTop + dpr * 24;
  clam.baseCx = w * 0.5;
  clam.cx = clam.baseCx;
  clam.cy = h - dpr * 36;
}

function spawnFish() {
  const spec = pickSpecies();
  const shark = spec.morph === "hammerhead" || spec.morph === "reefshark";
  const len = SIZE[spec.size].length * dpr * (shark ? 1.4 : 1);
  const fromLeft = Math.random() < 0.5;
  const reef = getReef();
  const trench = reef.id === "mariana_trench";
  const minY = trench ? waterTop + waterH * 0.32 : waterTop + len;
  const maxY = trench ? h - dpr * 95 : waterTop + waterH - len - dpr * 80;
  const y = minY + Math.random() * Math.max(len, maxY - minY);
  const base = (0.56 + Math.random() * 0.48) * dpr;
  const jitter = 0.85 + Math.random() * 0.34;
  const speed =
    base * spec.speed * jitter * (spec.size === "small" ? 1.12 : spec.size === "medium" ? 1.06 : 1) * reef.fishSpeed;
  fishList.push({
    spec,
    x: fromLeft ? -len : w + len,
    y,
    vx: fromLeft ? speed : -speed,
    len,
    phase: Math.random() * Math.PI * 2,
    caught: false,
  });
}

function initBubbles() {
  bubbles = [];
  const reef = getReef();
  const density = reef.id === "mariana_trench" ? 0.38 : reef.id === "japan_kuroshio" ? 1.28 : reef.id === "mediterranean" ? 0.72 : reef.id === "australia" ? 1.08 : 1;
  const perfDensity = PERF_CHROMEBOOK ? density * 0.35 : density;
  const n = Math.floor((28 + Math.floor(w / 40)) * perfDensity);
  const vyMul = reef.id === "mariana_trench" ? 0.55 : reef.id === "australia" ? 1.12 : reef.id === "mediterranean" ? 0.82 : reef.id === "caribbean" ? 1.05 : 1.18;
  for (let i = 0; i < n; i++) {
    bubbles.push({
      x: Math.random() * w,
      y: waterTop + Math.random() * waterH,
      r: (1 + Math.random() * 2.5) * dpr * (reef.id === "mediterranean" ? 0.85 : 1),
      vy: (0.15 + Math.random() * 0.35) * dpr * vyMul,
      w: Math.random() * Math.PI * 2,
    });
  }
}

function startRound() {
  playing = true;
  stopHomeMusic();
  syncMusicMasterGain();
  startHomeWaves();
  normalizeSelectedBaitId();
  const chosen = baitSpecById(gameMeta.selectedBaitId);
  if (chosen.consumesOnRound) {
    const left = getBaitCount(chosen.id);
    if (left > 0) {
      gameMeta.baitCounts[chosen.id] = left - 1;
      saveMeta();
      roundBait = {
        catchRadiusMult: chosen.catchRadiusMult,
        rareAssistAdd: chosen.rareAssistAdd,
        lightRadiusMult: chosen.lightRadiusMult || 1,
      };
    } else {
      roundBait = { catchRadiusMult: 1, rareAssistAdd: 0, lightRadiusMult: 1 };
      gameMeta.selectedBaitId = "standard";
      saveMeta();
      showToast("Out of that bait — using standard lure", 2200);
    }
  } else {
    roundBait = {
      catchRadiusMult: chosen.catchRadiusMult,
      rareAssistAdd: chosen.rareAssistAdd,
      lightRadiusMult: chosen.lightRadiusMult || 1,
    };
  }
  score = 0;
  fishList = [];
  catchLog = [];
  spawnAcc = 0;
  const reef = getReef();
  nextSpawnIn = rollNextSpawnDelay(reef, true);
  seedStarterFish(reef);
  const roundStart = performance.now();
  roundEndAt = roundStart + reef.roundMs;
  const spawnFrac = 0.18 + Math.random() * 0.52;
  kraken = { state: "scheduled", spawnAt: roundStart + reef.roundMs * spawnFrac };
  const dur = reef.roundMs;
  const u0 = roundStart + dur * (0.06 + Math.random() * 0.14);
  const u1 = roundStart + dur * (0.32 + Math.random() * 0.16);
  const u2 = roundStart + dur * (0.58 + Math.random() * 0.14);
  const spawnTimes = [u0, u1, u2].sort((a, b) => a - b);
  jackpotCrab = { spawnTimes, active: null };
  lastJackpotCrabCatchAt = -999999;
  panelStart.hidden = true;
  panelOver.hidden = true;
  if (panelAdventure) panelAdventure.hidden = true;
  if (panelAdventureFail) panelAdventureFail.hidden = true;
  if (panelAdventureWin) panelAdventureWin.hidden = true;
  syncAdventureLaunchVisibility();
  appRoot.classList.add("app--playing");
  lastPearlAt = -999999;
  clam.phase = "closed";
  clam.timer = CLAM_CLOSED_MS * 0.35;
  clam.flowAccum = Math.random() * Math.PI * 3;
  clam.currentTilt = 0;
  clam.spinAngle = Math.random() * Math.PI * 2;
  scoreDisplay.textContent = "0";
  timeDisplay.textContent = formatTime(reef.roundMs);
  initBubbles();
  resize();
  clam.driftPhase = Math.random() * Math.PI * 2;
  clam.edgeWander = Math.random() * Math.PI * 2;
  hook.targetX = w * 0.5;
  hook.x = hook.targetX;
  hook.tipY = surfaceTipY();
  hook.castState = "idle";
  hook.castTimer = 0;
  hook.snagPulse = 0;
  touchAim = null;
  celebration.particles.length = 0;
  celebration.rings.length = 0;
  releasedFishFx.length = 0;
  catchFlash = 0;
  hook.krakenBiteLocked = false;
  const passHint = reef.adventurePassScore ? ` · reach ${reef.adventurePassScore} pts` : "";
  controlHint.textContent = isTouchControlsPreferred()
    ? `Drag left/right to aim · tap to cast the line${passHint}`
    : `Move left/right to aim · Enter casts the line · Space or lift = snag${passHint}`;
  startReefMusic();
}

function endRound() {
  if (treasureMapRevealPaused) {
    treasureMapRevealPaused = false;
    treasureChestCinematic = null;
    treasureMapReveal?.classList.remove("treasure-map-reveal--active", "treasure-map-reveal--map-only");
    if (treasureMapReveal) {
      treasureMapReveal.hidden = true;
      treasureMapReveal.setAttribute("aria-hidden", "true");
    }
  }
  playing = false;
  stopReefMusic();
  kraken = null;
  jackpotCrab = null;
  appRoot.classList.remove("app--playing");
  hook.castState = "idle";
  hook.castTimer = 0;
  hook.snagPulse = 0;
  touchAim = null;
  celebration.particles.length = 0;
  celebration.rings.length = 0;
  releasedFishFx.length = 0;
  catchFlash = 0;
  hook.krakenBiteLocked = false;
  if (adventureSession) {
    endAdventureRound();
    return;
  }
  panelOver.hidden = false;
  syncAdventureLaunchVisibility();
  finalScore.textContent = String(score);
  lastRoundScore = score;
  lastRoundReefId = selectedReefId;
  lastRoundCoinsEarned = coinsAwardedForScore(score);
  const coinsBeforeRoundAward = gameMeta.coins;
  if (lastRoundCoinsEarned > 0) {
    gameMeta.coins += lastRoundCoinsEarned;
    saveMeta();
  }
  roundBait = { catchRadiusMult: 1, rareAssistAdd: 0, lightRadiusMult: 1 };
  if (coinsEarnedLine) {
    if (lastRoundCoinsEarned > 0) {
      animateCoinAward(coinsBeforeRoundAward, gameMeta.coins, lastRoundCoinsEarned);
    } else {
      if (coinAwardAnimId) cancelAnimationFrame(coinAwardAnimId);
      coinAwardAnimId = 0;
      refreshCoinDisplays();
      coinsEarnedLine.hidden = true;
      coinsEarnedLine.textContent = "";
    }
  } else {
    refreshCoinDisplays();
  }
  const board = loadLeaderboard();
  const canSave = qualifiesForLeaderboard(score, board);
  if (initialsPanel) initialsPanel.hidden = !canSave;
  if (initialsInput) initialsInput.value = "";
  if (canSave && initialsInput) {
    requestAnimationFrame(() => {
      initialsInput.focus();
    });
  }
  catchSummary.innerHTML = "";
  const counts = new Map();
  for (const entry of catchLog) {
    const k = entry.label;
    counts.set(k, (counts.get(k) || 0) + entry.pts);
  }
  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  for (const [label, pts] of sorted) {
    const li = document.createElement("li");
    li.innerHTML = `<span>${label}</span><span>+${pts}</span>`;
    catchSummary.appendChild(li);
  }
  refreshLeaderboardViews();
}

function hookTipY() {
  return hook.tipY;
}

function spawnCatchFX(worldX, worldY, hue) {
  const n = perfN(38);
  for (let i = 0; i < n; i++) {
    const ang = (Math.PI * 2 * i) / n + (Math.random() - 0.5) * 0.5;
    const sp = (1.8 + Math.random() * 4.5) * dpr;
    celebration.particles.push({
      x: worldX,
      y: worldY,
      vx: Math.cos(ang) * sp,
      vy: Math.sin(ang) * sp - 1.2 * dpr,
      life: 1,
      size: (2 + Math.random() * 4) * dpr,
      spin: (Math.random() - 0.5) * 0.2,
      color: `hsla(${hue + (Math.random() - 0.5) * 40}, 90%, 62%, 1)`,
    });
  }
  celebration.rings.push({ x: worldX, y: worldY, t: 0, life: 1 });
  catchFlash = Math.min(0.55, catchFlash + 0.38);
}

function updateCelebration(dt) {
  const k = dt / 16;
  for (const p of celebration.particles) {
    p.x += p.vx * k;
    p.y += p.vy * k;
    p.vy += 0.11 * dpr * k;
    p.life -= dt * 0.002;
    p.size += p.spin * k;
  }
  celebration.particles = celebration.particles.filter((p) => p.life > 0);
  for (const r of celebration.rings) {
    r.t += dt * 1.35;
    r.life -= dt * 0.0016;
  }
  celebration.rings = celebration.rings.filter((r) => r.life > 0);
  if (catchFlash > 0) catchFlash = Math.max(0, catchFlash - dt * 0.0035);

  const fk = dt / 16;
  for (const p of releasedFishFx) {
    if (p.kind === "netSchool") {
      p.vx += Math.sin(performance.now() * 0.004 + p.tail) * dpr * 0.018 * fk;
      p.vy = Math.min(p.vy + dpr * 0.026 * fk, dpr * 7.2);
      p.x += p.vx * fk;
      p.y += p.vy * fk;
      p.tail += 0.34 * fk;
      p.life -= dt * 0.00034;
      continue;
    }
    p.vy += p.grav * fk;
    p.x += p.vx * fk;
    p.y += p.vy * fk;
    p.vx *= 1 - 0.001 * dt;
    p.tail += 0.22 * fk;
    if (!p.splashed && p.y > waterTop + dpr * 2 && p.vy > 0.25 * dpr) {
      p.splashed = true;
      p.inWater = true;
      celebration.rings.push({ x: p.x, y: waterTop + dpr * 6, t: 0, life: 0.75 });
    }
    p.life -= dt * 0.00062;
  }
  for (let i = releasedFishFx.length - 1; i >= 0; i--) {
    if (releasedFishFx[i].life <= 0 || releasedFishFx[i].y > h + dpr * 90) releasedFishFx.splice(i, 1);
  }
}

function drawReleasedFishJumpFx() {
  const surf = waterTop + dpr * 2;
  if (releasedFishFx.some((p) => p.kind !== "netSchool")) {
    ctx.save();
    ctx.strokeStyle = "rgba(180, 220, 255, 0.28)";
    ctx.lineWidth = 1.25 * dpr;
    ctx.setLineDash([dpr * 4, dpr * 5]);
    ctx.beginPath();
    ctx.moveTo(0, surf);
    ctx.lineTo(w, surf);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }
  for (const p of releasedFishFx) {
    const a = Math.max(0, p.life);
    if (a <= 0) continue;
    const ang = Math.atan2(p.vy + 0.15 * dpr, p.vx);
    const L = p.size;
    const inW = p.inWater;
    const schooling = p.kind === "netSchool";
    const sat = schooling ? 78 : inW ? 42 : 72;
    const light = schooling ? 60 : inW ? 48 : 58;
    const alphaBody = (schooling ? 0.95 : inW ? 0.55 : 0.92) * a;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(ang);
    ctx.globalAlpha = Math.min(1, alphaBody * 1.1);
    ctx.fillStyle = `hsla(${p.hue}, ${sat}%, ${light}%, ${alphaBody})`;
    ctx.beginPath();
    ctx.ellipse(0, 0, L * 0.55, L * 0.26, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = `hsla(${p.hue}, ${sat + 8}%, ${light - 18}%, ${alphaBody * 0.95})`;
    ctx.beginPath();
    ctx.moveTo(-L * 0.5, 0);
    ctx.lineTo(-L * 1.02, -L * 0.2 + Math.sin(p.tail) * L * 0.07);
    ctx.lineTo(-L * 0.86, 0);
    ctx.lineTo(-L * 1.02, L * 0.2 + Math.sin(p.tail + 1.1) * L * 0.07);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  ctx.globalAlpha = 1;
}

function drawCatchFlash() {
  if (catchFlash <= 0) return;
  ctx.fillStyle = `rgba(255, 252, 235, ${catchFlash * 0.35})`;
  ctx.fillRect(0, 0, w, h);
}

function drawCelebration() {
  for (const p of celebration.particles) {
    const a = Math.max(0, p.life);
    ctx.globalAlpha = a;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, Math.max(0.5, p.size), 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  for (const r of celebration.rings) {
    ctx.strokeStyle = `rgba(255, 230, 140, ${0.5 * r.life})`;
    ctx.lineWidth = 2.5 * dpr;
    ctx.beginPath();
    ctx.arc(r.x, r.y, r.t * 0.55 * dpr, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = `rgba(77, 255, 243, ${0.35 * r.life})`;
    ctx.lineWidth = 1.5 * dpr;
    ctx.beginPath();
    ctx.arc(r.x, r.y, r.t * 0.38 * dpr, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function fishHitRadius(f, hookR) {
  const long =
    f.spec.morph === "barracuda" ||
    f.spec.morph === "marlin" ||
    f.spec.morph === "swordfish" ||
    f.spec.morph === "hammerhead" ||
    f.spec.morph === "reefshark";
  const bodyR = f.len * 0.52 * (long ? 1.22 : 1);
  return hookR + bodyR;
}

function performSnag() {
  if (!playing || isGameplayFrozen() || hook.castState !== "idle") return;
  if (isKrakenBiting()) return;
  hook.snagPulse = 260;
  const megHit = tryCatchKraken({ surfaceSnag: true });
  if (!megHit) tryCatchFish({ surfaceSnag: true });
  if (!megHit) tryCatchJackpotCrab(performance.now());
}

function startCast() {
  if (!playing || isGameplayFrozen() || hook.castState !== "idle") return;
  if (isKrakenBiting()) return;
  hook.castState = "down";
  hook.castTimer = 0;
  hook.castFromY = hook.tipY;
  hook.castToY = deepestTipY();
}

function tryCatchFish(opts) {
  if (isKrakenBiting()) return;
  const hy = hookTipY();
  const hx = hook.x;
  const casting = opts?.casting === true;
  const surfaceSnag = opts?.surfaceSnag === true;

  let hookR = effectiveCatchRadiusBasePx();
  if (hook.snagPulse > 0) hookR *= 1.42;
  if (casting) hookR *= 1.38;
  if (surfaceSnag) hookR *= 1.22;

  const candidates = [];
  for (const f of fishList) {
    if (f.caught) continue;
    const dx = f.x - hx;
    const dy = f.y - hy;
    const reach = fishHitRadius(f, hookR);
    if (dx * dx + dy * dy > reach * reach) continue;

    const rar = RARITY[f.spec.rarity];
    if (rar.mult >= 2.1) {
      const rr = getReef().rareRollMult;
      const ra = effectiveRareAssist();
      const p = Math.min(
        0.98,
        (0.68 + ra * 1.25 + (casting ? 0.24 : 0) + (surfaceSnag ? 0.1 : 0)) * rr,
      );
      let ok = Math.random() < p;
      if (!ok) {
        const retry = Math.min(0.92, (ra * 0.95 + (casting ? 0.22 : 0)) * rr);
        ok = Math.random() < retry;
      }
      if (!ok) continue;
    }

    candidates.push(f);
  }

  if (candidates.length === 0) return;

  playCatchCelebrationSound(candidates.length);

  let batchPts = 0;
  for (const f of candidates) {
    spawnCatchFX(f.x, f.y, f.spec.hue);
    f.caught = true;
    f.removeAt = performance.now() + 320;
    const pts = pointsFor(f.spec);
    batchPts += pts;
    score += pts;
    const label = f.spec.name;
    catchLog.push({ label, pts });
  }

  scoreDisplay.textContent = String(score);

  if (candidates.length === 1) {
    const f = candidates[0];
    showToast(`+${pointsFor(f.spec)} — ${f.spec.name}`, 1600);
  } else {
    showToast(`${candidates.length} fish hooked! +${batchPts} pts`, 2200);
  }
}

function tryCatchPearl(now) {
  if (isKrakenBiting()) return;
  if (clam.phase !== "open") return;
  const pr = clam.pearlR;
  if (!pr || pr <= 0) return;
  if (now - lastPearlAt < PEARL_CATCH_COOLDOWN_MS) return;
  const px = clam.cx;
  const py = clam.pearlWorldY;
  const hy = hookTipY();
  const dx = px - hook.x;
  const dy = py - hy;
  const casting = hook.castState === "down";
  let hookR = effectiveCatchRadiusBasePx() * (casting ? 0.76 : 0.56);
  if (hook.snagPulse > 0) hookR *= 1.08;
  const reach = hookR + pr * 0.42;
  if (dx * dx + dy * dy > reach * reach) return;

  lastPearlAt = now;
  spawnCatchFX(px, py, 48);
  score += PEARL_POINTS;
  scoreDisplay.textContent = String(score);
  catchLog.push({ label: PEARL_CATCH_LABEL, pts: PEARL_POINTS });
  showToast(`JACKPOT! +${PEARL_POINTS} Pearl`, 2000);
}

function jackpotCrabBaseY() {
  return h - dpr * 54;
}

function updateJackpotCrab(now, dt) {
  if (!playing || !jackpotCrab) return;

  if (jackpotCrab.active) {
    jackpotCrab.active.y = jackpotCrabBaseY();
    jackpotCrab.active.x += jackpotCrab.active.vx * (dt / 16) * 1.34;
    jackpotCrab.active.legT += dt * 0.016;
    const margin = dpr * 100;
    if (jackpotCrab.active.x < -margin || jackpotCrab.active.x > w + margin) {
      jackpotCrab.active = null;
    }
  }

  while (!jackpotCrab.active && jackpotCrab.spawnTimes.length > 0 && now >= jackpotCrab.spawnTimes[0]) {
    jackpotCrab.spawnTimes.shift();
    const fromLeft = Math.random() < 0.5;
    const speed = dpr * (3.15 + Math.random() * 1.25);
    jackpotCrab.active = {
      x: fromLeft ? -dpr * 78 : w + dpr * 78,
      vx: fromLeft ? speed : -speed,
      y: jackpotCrabBaseY(),
      legT: Math.random() * Math.PI * 2,
    };
    break;
  }

  if (!jackpotCrab.spawnTimes.length && !jackpotCrab.active) {
    jackpotCrab = null;
  }
}

function tryCatchJackpotCrab(now) {
  if (isKrakenBiting()) return;
  if (!jackpotCrab?.active) return;
  if (now - lastJackpotCrabCatchAt < JACKPOT_CRAB_CATCH_COOLDOWN_MS) return;
  const px = jackpotCrab.active.x;
  const py = jackpotCrab.active.y;
  const hy = hookTipY();
  const hx = hook.x;
  const casting = hook.castState === "down";
  let hookR = effectiveCatchRadiusBasePx() * (casting ? 0.54 : 0.38);
  if (hook.snagPulse > 0) hookR *= 0.95;
  const bodyR = 31 * dpr;
  const dx = px - hx;
  const dy = py - hy;
  if (dx * dx + dy * dy > (hookR + bodyR) * (hookR + bodyR)) return;

  lastJackpotCrabCatchAt = now;
  playCrabJackpotSound();
  const crabFacing = jackpotCrab.active.vx >= 0 ? 1 : -1;
  const crabX = px;
  const crabY = py;
  jackpotCrab.active = null;
  spawnCatchFX(px, py, 38);
  score += JACKPOT_CRAB_POINTS;
  scoreDisplay.textContent = String(score);
  catchLog.push({ label: JACKPOT_CRAB_LABEL, pts: JACKPOT_CRAB_POINTS });
  gameMeta.coins += JACKPOT_CRAB_COIN_BONUS;
  const wasAdventureLocked = !isAdventureUnlocked();
  gameMeta.totalTreasureChests = (gameMeta.totalTreasureChests || 0) + 1;
  saveMeta();
  refreshCoinDisplays();
  updateAdventureLaunchUI();
  if (wasAdventureLocked && isAdventureUnlocked()) {
    gameMeta.pendingAdventureHomeCelebration = true;
    saveMeta();
    startTreasureMapReveal(crabX, crabY, crabFacing);
    showToast(`MEGA JACKPOT! +${JACKPOT_CRAB_POINTS} & +${JACKPOT_CRAB_COIN_BONUS} coins`, 2600);
    return;
  }
  showToast(`MEGA JACKPOT! +${JACKPOT_CRAB_POINTS} & +${JACKPOT_CRAB_COIN_BONUS} coins`, 2600);
}

function isKrakenBiting() {
  return playing && kraken && kraken.state === "biting";
}

function spawnReleasedFishJumpingIntoWater(count) {
  if (count <= 0) return;
  const n = Math.min(30, 6 + count * 5);
  for (let i = 0; i < n; i++) {
    const slot = (i + 0.5) / n;
    const x0 = w * (0.1 + slot * 0.8) + (Math.random() - 0.5) * dpr * 30;
    const deckY = waterTop - dpr * (8 + Math.random() * 28);
    releasedFishFx.push({
      kind: "jump",
      x: x0,
      y: deckY,
      vx: (Math.random() - 0.5) * dpr * 3.8,
      vy: -dpr * (3.2 + Math.random() * 2.6),
      grav: 0.2 * dpr,
      life: 1,
      size: (9 + Math.random() * 10) * dpr,
      tail: Math.random() * Math.PI * 2,
      hue: 88 + Math.random() * 125,
      splashed: false,
      inWater: false,
    });
  }
}

function isFishCatchLogEntry(entry) {
  return entry && entry.label !== PEARL_CATCH_LABEL && entry.label !== JACKPOT_CRAB_LABEL;
}

function hashHueFromLabel(label) {
  const s = String(label || "");
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return 72 + (h % 210);
}

function getFishOnlyCatchEntries() {
  return catchLog.filter(isFishCatchLogEntry);
}

function catchNetLayout() {
  const boatCx = w * 0.5;
  const rimRx = 58 * dpr;
  const rimRy = 16 * dpr;
  const sackHx = 54 * dpr;
  const sackVy = 74 * dpr;
  const rimCx = w - 58 * dpr;
  const rimCy = waterTop + 10 * dpr;
  const sackCx = rimCx;
  const sackCy = rimCy + rimRy + sackVy * 0.52;
  return { boatCx, rimCx, rimCy, rimRx, rimRy, sackCx, sackCy, sackHx, sackVy };
}

function spawnFishEscapingFromNet(freedEntries, sackCx, sackCy) {
  const school = [];
  for (const ent of freedEntries) {
    const copies = 5 + Math.floor(Math.random() * 4);
    for (let i = 0; i < copies; i++) school.push(ent);
  }
  const count = Math.min(90, school.length);
  for (let i = 0; i < count; i++) {
    const ent = school[i];
    const slot = (i / Math.max(1, count - 1)) - 0.5;
    const streamW = dpr * (20 + Math.min(80, count * 1.8));
    const laneX = slot * streamW + (Math.random() - 0.5) * dpr * 18;
    const wave = Math.sin(i * 0.9) * dpr * 9;
    releasedFishFx.push({
      kind: "netSchool",
      x: sackCx + laneX * 0.28 + (Math.random() - 0.5) * dpr * 18,
      y: sackCy - dpr * 26 + (Math.random() - 0.5) * dpr * 18,
      vx: laneX * 0.018 + (Math.random() - 0.5) * dpr * 0.8,
      vy: dpr * (3.6 + Math.random() * 2.4 + Math.abs(slot) * 0.5),
      grav: 0,
      life: 1.45,
      size: (9.5 + Math.random() * 8.5) * dpr,
      tail: Math.random() * Math.PI * 2 + wave,
      hue: hashHueFromLabel(ent.label),
      splashed: true,
      inWater: false,
    });
  }
  celebration.rings.push({ x: sackCx, y: sackCy, t: 0, life: 0.95 });
}

function getCharterBoatGeo() {
  const cx = w * 0.5;
  const wt = waterTop;
  const L = Math.min(w * 0.32, 260 * dpr);
  const bowX = cx - L;
  const sternX = cx + L;
  const bowDeck = 68 * dpr;
  const sternDeck = 36 * dpr;
  const midDeck = 48 * dpr;
  const deckY = (x) => {
    const t = (x - bowX) / (sternX - bowX);
    const u = Math.max(0, Math.min(1, t));
    const sheer = bowDeck * (1 - u) * (1 - u) + midDeck * 2 * u * (1 - u) + sternDeck * u * u;
    return wt - sheer;
  };
  return { cx, wt, L, bowX, sternX, deckY };
}

function drawBoatHullInWater() {
  const { cx, wt, L, bowX, sternX, deckY } = getCharterBoatGeo();
  const belowD = 54 * dpr;

  ctx.save();

  ctx.fillStyle = "rgba(42, 48, 56, 0.62)";
  ctx.beginPath();
  ctx.moveTo(bowX, wt);
  ctx.lineTo(bowX - dpr * 3, wt + belowD * 0.22);
  ctx.quadraticCurveTo(bowX + L * 0.12, wt + belowD * 0.92, cx, wt + belowD * 1.02);
  ctx.quadraticCurveTo(sternX - L * 0.1, wt + belowD * 0.85, sternX + dpr * 2, wt + belowD * 0.18);
  ctx.lineTo(sternX, wt);
  ctx.closePath();
  ctx.fill();

  const hullGrad = ctx.createLinearGradient(bowX, wt - 70 * dpr, sternX, wt + dpr * 4);
  hullGrad.addColorStop(0, "#aeb6bf");
  hullGrad.addColorStop(0.25, "#949da8");
  hullGrad.addColorStop(0.55, "#7a8490");
  hullGrad.addColorStop(0.82, "#5c6570");
  hullGrad.addColorStop(1, "#4a525c");
  ctx.fillStyle = hullGrad;
  ctx.beginPath();
  ctx.moveTo(bowX, wt);
  ctx.lineTo(bowX, deckY(bowX));
  for (let i = 1; i <= 16; i++) {
    const x = bowX + ((sternX - bowX) * i) / 16;
    ctx.lineTo(x, deckY(x));
  }
  ctx.lineTo(sternX, wt);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 255, 255, 0.42)";
  ctx.lineWidth = 1.5 * dpr;
  ctx.beginPath();
  ctx.moveTo(bowX, wt);
  ctx.quadraticCurveTo(cx, wt - dpr * 1.5, sternX, wt);
  ctx.stroke();

  const cabL = cx - L * 0.26;
  const cabR = cx + L * 0.24;
  const cabB = deckY(cx + L * 0.06) + dpr * 5;
  const cabH = 30 * dpr;
  const cabT = cabB - cabH;
  ctx.fillStyle = "#8f98a3";
  ctx.strokeStyle = "rgba(35, 40, 48, 0.55)";
  ctx.lineWidth = 1.2 * dpr;
  ctx.beginPath();
  const crr = 4 * dpr;
  ctx.moveTo(cabL + crr, cabT);
  ctx.lineTo(cabR - crr, cabT);
  ctx.quadraticCurveTo(cabR, cabT, cabR, cabT + crr);
  ctx.lineTo(cabR, cabB - crr);
  ctx.quadraticCurveTo(cabR, cabB, cabR - crr, cabB);
  ctx.lineTo(cabL + crr, cabB);
  ctx.quadraticCurveTo(cabL, cabB, cabL, cabB - crr);
  ctx.lineTo(cabL, cabT + crr);
  ctx.quadraticCurveTo(cabL, cabT, cabL + crr, cabT);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "rgba(18, 24, 32, 0.82)";
  ctx.fillRect(cabL + dpr * 5, cabT + dpr * 8, cabR - cabL - dpr * 10, dpr * 9);
  ctx.fillStyle = "rgba(200, 210, 220, 0.35)";
  ctx.fillRect(cabL + dpr * 7, cabT + dpr * 10, (cabR - cabL) * 0.22, dpr * 5);
  ctx.fillRect(cabL + dpr * 7 + (cabR - cabL) * 0.32, cabT + dpr * 10, (cabR - cabL) * 0.22, dpr * 5);

  ctx.fillStyle = "#b4bcc6";
  ctx.fillRect(cabL + dpr * 3, cabT - dpr * 3, cabR - cabL - dpr * 6, dpr * 4);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
  ctx.lineWidth = 1.2 * dpr;
  ctx.beginPath();
  ctx.moveTo(cx + L * 0.08, cabT - dpr * 2);
  ctx.lineTo(cx + L * 0.08, cabT - dpr * 22);
  ctx.stroke();

  ctx.strokeStyle = "rgba(25, 30, 38, 0.45)";
  ctx.lineWidth = 1.8 * dpr;
  ctx.beginPath();
  ctx.moveTo(bowX - dpr * 1, wt - dpr * 2);
  ctx.lineTo(bowX - dpr * 1, deckY(bowX) + dpr * 2);
  ctx.stroke();

  ctx.strokeStyle = "rgba(30, 35, 42, 0.4)";
  ctx.lineWidth = 2 * dpr;
  ctx.beginPath();
  ctx.moveTo(cx - L * 0.12, wt + dpr * 11);
  ctx.lineTo(cx + L * 0.22, wt + dpr * 13);
  ctx.stroke();

  ctx.restore();
}

function drawCatchNetWithFish() {
  const lay = catchNetLayout();
  const { rimCx, rimCy, rimRx, rimRy, sackCx, sackCy, sackHx, sackVy } = lay;
  const g = getCharterBoatGeo();
  const ropeAx = g.cx + g.L * 0.34;
  const ropeAy = g.deckY(ropeAx) - dpr * 6;
  ctx.save();
  ctx.strokeStyle = "rgba(55, 58, 62, 0.92)";
  ctx.lineWidth = 2.4 * dpr;
  ctx.beginPath();
  ctx.moveTo(ropeAx, ropeAy);
  ctx.quadraticCurveTo((ropeAx + rimCx) * 0.5 + 22 * dpr, (ropeAy + rimCy) * 0.5 + 14 * dpr, rimCx, rimCy - rimRy * 0.55);
  ctx.stroke();
  ctx.strokeStyle = "rgba(88, 92, 98, 0.96)";
  ctx.lineWidth = 2.9 * dpr;
  ctx.beginPath();
  ctx.ellipse(rimCx, rimCy, rimRx, rimRy, 0.06, 0, Math.PI * 2);
  ctx.stroke();
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(sackCx, sackCy, sackHx, sackVy, 0.05, 0, Math.PI * 2);
  ctx.clip();
  ctx.strokeStyle = "rgba(210, 220, 232, 0.42)";
  ctx.lineWidth = 1.1 * dpr;
  for (let yy = sackCy - sackVy; yy < sackCy + sackVy; yy += dpr * 9) {
    const wv = Math.sin(yy * 0.035 + performance.now() * 0.001) * dpr * 3.5;
    ctx.beginPath();
    ctx.moveTo(sackCx - sackHx, yy + wv);
    ctx.lineTo(sackCx + sackHx, yy - wv);
    ctx.stroke();
  }
  for (let xx = sackCx - sackHx; xx < sackCx + sackHx; xx += dpr * 10) {
    ctx.beginPath();
    ctx.moveTo(xx, sackCy - sackVy);
    ctx.quadraticCurveTo(xx + dpr * 5, sackCy, xx, sackCy + sackVy);
    ctx.stroke();
  }
  ctx.restore();
  ctx.fillStyle = "rgba(8, 20, 36, 0.28)";
  ctx.beginPath();
  ctx.ellipse(sackCx, sackCy + dpr * 7, sackHx * 0.92, sackVy * 0.9, 0.05, 0, Math.PI * 2);
  ctx.fill();

  if (kraken?.state === "biting" && kraken.netGrab) {
    const tearX = kraken.netGrab.x;
    const tearY = kraken.netGrab.y;
    ctx.save();
    ctx.strokeStyle = "rgba(255, 235, 210, 0.85)";
    ctx.lineWidth = 2.4 * dpr;
    ctx.lineCap = "round";
    for (let i = 0; i < 7; i++) {
      const a = -Math.PI * 0.85 + i * 0.28 + Math.sin(performance.now() * 0.012 + i) * 0.08;
      const r0 = dpr * (7 + (i % 2) * 3);
      const r1 = dpr * (30 + (i % 3) * 7);
      ctx.beginPath();
      ctx.moveTo(tearX + Math.cos(a) * r0, tearY + Math.sin(a) * r0);
      ctx.lineTo(tearX + Math.cos(a) * r1, tearY + Math.sin(a) * r1);
      ctx.stroke();
    }
    ctx.fillStyle = "rgba(3, 12, 22, 0.62)";
    ctx.beginPath();
    ctx.ellipse(tearX, tearY, 22 * dpr, 14 * dpr, 0.35, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255, 80, 70, 0.55)";
    ctx.lineWidth = 1.4 * dpr;
    ctx.beginPath();
    ctx.ellipse(tearX, tearY, 26 * dpr, 17 * dpr, 0.35, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  const fishEntries = getFishOnlyCatchEntries();
  const maxShow = 32;
  const list = fishEntries.slice(-maxShow);
  for (let i = 0; i < list.length; i++) {
    const row = Math.floor(i / 7);
    const col = i % 7;
    const fx = sackCx + (col - 3) * dpr * 12.5 + (row % 2) * dpr * 5.5;
    const fy = sackCy - dpr * 10 + row * dpr * 11;
    const hue = hashHueFromLabel(list[i].label);
    const fsz = dpr * (5.2 + (i % 4) * 0.45);
    ctx.save();
    ctx.translate(fx, fy);
    ctx.rotate((row * 0.08 + col * 0.04) * (col % 2 === 0 ? 1 : -1));
    ctx.globalAlpha = 0.88;
    ctx.fillStyle = `hsla(${hue}, 62%, 48%, 0.92)`;
    ctx.beginPath();
    ctx.ellipse(0, 0, fsz * 0.55, fsz * 0.28, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = `hsla(${hue}, 48%, 28%, 0.95)`;
    ctx.beginPath();
    ctx.moveTo(-fsz * 0.48, 0);
    ctx.lineTo(-fsz * 0.95, -fsz * 0.18);
    ctx.lineTo(-fsz * 0.78, 0);
    ctx.lineTo(-fsz * 0.95, fsz * 0.18);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  if (fishEntries.length > maxShow) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
    ctx.font = `${10 * dpr}px system-ui, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText(`+${fishEntries.length - maxShow}`, sackCx, sackCy + sackVy - dpr * 6);
    ctx.textAlign = "left";
  }
  ctx.restore();
}

function drawBoatHullAndCatchNet() {
  if (w <= 0 || h <= 0) return;
  drawBoatHullInWater();
  drawCatchNetWithFish();
}

function releaseHalfCatchToKraken() {
  const removable = [];
  for (let i = 0; i < catchLog.length; i++) {
    if (isFishCatchLogEntry(catchLog[i])) removable.push(i);
  }
  if (removable.length === 0) return { count: 0, pts: 0, freed: [] };
  for (let i = removable.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const t = removable[i];
    removable[i] = removable[j];
    removable[j] = t;
  }
  const take = Math.ceil(removable.length / 2);
  const removeSet = new Set(removable.slice(0, take));
  let lostPts = 0;
  const freed = [];
  catchLog = catchLog.filter((e, i) => {
    if (removeSet.has(i)) {
      lostPts += e.pts;
      freed.push({ label: e.label, pts: e.pts });
      return false;
    }
    return true;
  });
  score = Math.max(0, score - lostPts);
  scoreDisplay.textContent = String(score);
  return { count: take, pts: lostPts, freed };
}

function tryCatchKraken(opts) {
  if (!kraken || kraken.state !== "active") return false;
  const hy = hookTipY();
  const hx = hook.x;
  const casting = opts?.casting === true;
  const surfaceSnag = opts?.surfaceSnag === true;
  let hookR = effectiveCatchRadiusBasePx();
  if (hook.snagPulse > 0) hookR *= 1.32;
  if (casting) hookR *= 1.22;
  if (surfaceSnag) hookR *= 1.12;
  const L = kraken.len;
  const bodyCx = kraken.x;
  const bodyCy = kraken.y - L * 0.42;
  const bodyR = L * 0.44;
  const dx = bodyCx - hx;
  const dy = bodyCy - hy;
  if (dx * dx + dy * dy > (hookR + bodyR) * (hookR + bodyR)) return false;

  const biteFace = hook.x >= kraken.x ? 1 : -1;
  const mouthX = kraken.x + biteFace * L * 0.12;
  const mouthY = kraken.y - L * 0.88;

  playKrakenBadSound();

  hook.castState = "idle";
  hook.castTimer = 0;
  hook.krakenBiteTipY = hy;
  hook.krakenBiteLocked = true;
  hook.tipY = hy;

  kraken.state = "biting";
  kraken.biteT = 0;
  kraken.biteFacing = biteFace;
  kraken.biteFromX = kraken.x;
  kraken.biteFromY = kraken.y;
  kraken.biteSnapMs = KRAKEN_BITE_SNAP_MS;
  kraken.biteHoldMs = KRAKEN_BITE_HOLD_MS;
  kraken.netGrab = null;

  spawnCatchFX(mouthX, mouthY, 280);
  const lost = releaseHalfCatchToKraken();
  spawnReleasedFishJumpingIntoWater(lost.count);
  if (lost.freed.length) {
    const lay = catchNetLayout();
    kraken.netGrab = { x: lay.sackCx, y: lay.sackCy + lay.sackVy * 0.12, rimX: lay.rimCx, rimY: lay.rimCy };
    spawnFishEscapingFromNet(lost.freed, kraken.netGrab.x, kraken.netGrab.y);
  }
  catchFlash = Math.min(0.62, catchFlash + 0.22);

  if (lost.count === 0) {
    showToast("The kraken seized the line!", 2200);
  } else {
    showToast(`The kraken has the line — ${lost.count} fish lost (−${lost.pts} pts)`, 3600);
  }
  return true;
}

function tickKraken(now, dt) {
  if (!playing || !kraken) return;
  if (kraken.state === "scheduled" && now >= kraken.spawnAt) {
    const len = dpr * 218;
    kraken.state = "active";
    kraken.len = len;
    kraken.pathStage = "rise";
    kraken.riseCenterX = w * (0.18 + Math.random() * 0.64);
    kraken.riseVy = dpr * (0.32 + Math.random() * 0.11);
    kraken.sweepY = Math.min(h - dpr * 92, waterTop + waterH * 0.78);
    kraken.exitDir = Math.random() < 0.5 ? -1 : 1;
    kraken.exitVx = dpr * (1.75 + Math.random() * 0.55) * kraken.exitDir;
    kraken.x = kraken.riseCenterX;
    kraken.y = h + len * 0.58;
    kraken.phase = Math.random() * Math.PI * 2;
    kraken.face = kraken.exitDir;
    showToast("Kraken rising from the depths!", 1700);
    return;
  }
  if (kraken.state === "biting") {
    kraken.biteT += dt;
    const hx = hook.x;
    const hy = hook.krakenBiteLocked ? hook.krakenBiteTipY : hookTipY();
    const L = kraken.len;
    const f = kraken.biteFacing;
    const targX = hx - f * L * 0.12;
    const targY = hy + L * 0.88;
    const snap = kraken.biteSnapMs;
    const u = Math.min(1, kraken.biteT / snap);
    const ease = u * u * (3 - 2 * u);
    kraken.x = kraken.biteFromX + (targX - kraken.biteFromX) * ease;
    kraken.y = kraken.biteFromY + (targY - kraken.biteFromY) * ease;
    if (u >= 1) {
      const t = performance.now() * 0.0011;
      kraken.x = targX + Math.sin(t * 19) * dpr * 3.2;
      kraken.y = targY + Math.sin(t * 23 + 1.1) * dpr * 2.6;
    }
    kraken.phase += dt * 0.0045;
    if (kraken.biteT >= snap + kraken.biteHoldMs) {
      kraken.state = "done";
      kraken.netGrab = null;
      hook.krakenBiteLocked = false;
    }
    return;
  }
  if (kraken.state === "active") {
    const step = dt / 16;
    kraken.phase += dt * 0.002;
    const L = kraken.len;

    if (kraken.pathStage === "rise") {
      kraken.y -= kraken.riseVy * step * 1.18;
      kraken.x =
        kraken.riseCenterX +
        Math.sin(kraken.phase * 0.62) * dpr * 44 +
        Math.sin(kraken.phase * 0.29 + 1.1) * dpr * 14;
      if (kraken.y <= kraken.sweepY) {
        kraken.pathStage = "side";
        kraken.y = kraken.sweepY;
        kraken.face = kraken.exitDir;
      }
      return;
    }

    kraken.x += kraken.exitVx * step;
    kraken.y = kraken.sweepY + Math.sin(kraken.phase * 1.35) * dpr * 12;
    kraken.face = kraken.exitDir;
    if ((kraken.exitDir < 0 && kraken.x < -L * 0.9) || (kraken.exitDir > 0 && kraken.x > w + L * 0.9)) {
      kraken.state = "done";
    }
  }
}

function drawKraken() {
  if (!kraken || (kraken.state !== "active" && kraken.state !== "biting")) return;
  const L = kraken.len;
  const facing = kraken.state === "biting" ? kraken.biteFacing : kraken.face;
  const ink = "#2d1b4e";
  const mantle = "#4c3570";
  const sucker = "#6b4d8f";
  const glow = "#22d3ee";

  ctx.save();
  ctx.translate(kraken.x, kraken.y);
  ctx.rotate(Math.sin(kraken.phase) * 0.035);
  ctx.scale(facing, 1);
  ctx.globalAlpha = 0.97;

  const tentacleCount = 7;
  for (let i = 0; i < tentacleCount; i++) {
    const u = i / (tentacleCount - 1 || 1);
    const baseX = (u - 0.5) * L * 0.62;
    const wob = Math.sin(kraken.phase * 1.2 + i * 0.9) * L * 0.04;
    const tipX = baseX * 1.35 + wob + Math.sin(kraken.phase * 0.8 + i) * L * 0.08;
    const tipY = L * 0.22 + Math.abs(baseX) * 0.14;
    ctx.strokeStyle = i % 2 === 0 ? ink : mantle;
    ctx.lineWidth = (0.09 - u * 0.025) * L;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(baseX * 0.35, -L * 0.22);
    ctx.bezierCurveTo(
      baseX * 0.5 + wob * 0.5,
      -L * 0.05,
      tipX * 0.72,
      L * 0.02,
      tipX,
      tipY,
    );
    ctx.stroke();
    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = Math.max(1, 0.02 * L);
    ctx.beginPath();
    ctx.moveTo(baseX * 0.35, -L * 0.22);
    ctx.bezierCurveTo(baseX * 0.5 + wob * 0.5, -L * 0.05, tipX * 0.72, L * 0.02, tipX, tipY);
    ctx.stroke();
  }

  ctx.fillStyle = mantle;
  ctx.beginPath();
  ctx.ellipse(0, -L * 0.38, L * 0.34, L * 0.22, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = ink;
  ctx.beginPath();
  ctx.ellipse(0, -L * 0.52, L * 0.28, L * 0.2, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = sucker;
  ctx.beginPath();
  ctx.moveTo(L * 0.08, -L * 0.62);
  ctx.quadraticCurveTo(L * 0.22, -L * 0.78, L * 0.06, -L * 0.88);
  ctx.quadraticCurveTo(0, -L * 0.82, -L * 0.06, -L * 0.88);
  ctx.quadraticCurveTo(-L * 0.22, -L * 0.78, -L * 0.08, -L * 0.62);
  ctx.quadraticCurveTo(0, -L * 0.58, L * 0.08, -L * 0.62);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "rgba(0, 0, 0, 0.35)";
  ctx.beginPath();
  ctx.ellipse(L * 0.06, -L * 0.66, L * 0.05, L * 0.035, 0.2, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(-L * 0.06, -L * 0.66, L * 0.05, L * 0.035, -0.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = glow;
  ctx.globalAlpha = 0.55 + 0.25 * Math.sin(kraken.phase * 2.1);
  ctx.beginPath();
  ctx.arc(-L * 0.1, -L * 0.6, L * 0.05, 0, Math.PI * 2);
  ctx.arc(L * 0.1, -L * 0.6, L * 0.05, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 0.97;

  ctx.fillStyle = "#0f172a";
  ctx.beginPath();
  ctx.arc(-L * 0.1, -L * 0.6, L * 0.022, 0, Math.PI * 2);
  ctx.arc(L * 0.1, -L * 0.6, L * 0.022, 0, Math.PI * 2);
  ctx.fill();

  if (kraken.state === "biting") {
    const pulse = 0.3 + 0.7 * Math.abs(Math.sin(performance.now() * 0.028));
    ctx.globalAlpha = 0.2 * pulse;
    ctx.fillStyle = "#ff1a0a";
    ctx.beginPath();
    ctx.ellipse(0, -L * 0.48, L * 0.55, L * 0.36, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.28 * pulse;
    ctx.fillStyle = "#ff6b4d";
    ctx.beginPath();
    ctx.ellipse(0, -L * 0.55, L * 0.32, L * 0.22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.97;
  }

  ctx.restore();

  if (kraken.state === "biting" && kraken.netGrab) {
    const f = kraken.biteFacing || facing || 1;
    const pulse = 0.55 + 0.45 * Math.abs(Math.sin(performance.now() * 0.016));
    const startX = kraken.x + f * L * 0.1;
    const startY = kraken.y - L * 0.28;
    const endX = kraken.netGrab.x;
    const endY = kraken.netGrab.y;
    const midX = (startX + endX) * 0.5 + f * dpr * 30;
    const midY = Math.min(startY, endY) - dpr * (34 + 12 * pulse);
    ctx.save();
    ctx.lineCap = "round";
    ctx.strokeStyle = "rgba(45, 27, 78, 0.9)";
    ctx.lineWidth = L * 0.075;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.bezierCurveTo(midX, midY, endX - f * dpr * 18, endY - dpr * 10, endX, endY);
    ctx.stroke();
    ctx.strokeStyle = "rgba(140, 105, 180, 0.42)";
    ctx.lineWidth = L * 0.025;
    ctx.beginPath();
    ctx.moveTo(startX + f * dpr * 5, startY - dpr * 2);
    ctx.bezierCurveTo(midX + f * dpr * 6, midY + dpr * 4, endX - f * dpr * 10, endY - dpr * 7, endX, endY);
    ctx.stroke();
    ctx.fillStyle = `rgba(107, 77, 143, ${0.45 + 0.25 * pulse})`;
    ctx.beginPath();
    ctx.ellipse(endX, endY, dpr * 12, dpr * 7, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = `rgba(255, 255, 255, ${0.18 + 0.14 * pulse})`;
    ctx.lineWidth = 1.5 * dpr;
    ctx.beginPath();
    ctx.ellipse(endX, endY, dpr * 17, dpr * 11, 0.2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
}

function drawReefAmbience(reefId, waterTopY) {
  const t = performance.now() * 0.0008;
  ctx.save();
  if (reefId === "australia") {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.07)";
    ctx.lineWidth = 1.2 * dpr;
    for (let i = 0; i < perfN(9); i++) {
      const x0 = (i / perfN(9)) * w + Math.sin(t + i) * dpr * 12;
      ctx.beginPath();
      ctx.moveTo(x0, waterTopY + dpr * 30);
      ctx.bezierCurveTo(x0 + dpr * 40, waterTopY + waterH * 0.35, x0 - dpr * 30, waterTopY + waterH * 0.55, x0 + dpr * 20, h - dpr * 80);
      ctx.stroke();
    }
    const g = ctx.createRadialGradient(w * 0.75, waterTopY + dpr * 40, 2, w * 0.55, waterTopY + waterH * 0.25, w * 0.5);
    g.addColorStop(0, "rgba(180, 255, 230, 0.12)");
    g.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, waterTopY, w, waterH);
  } else if (reefId === "caribbean") {
    const g = ctx.createRadialGradient(w * 0.2, h - dpr * 120, 10, w * 0.2, h, w * 0.55);
    g.addColorStop(0, "rgba(255, 140, 180, 0.14)");
    g.addColorStop(0.5, "rgba(255, 200, 120, 0.06)");
    g.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, waterTopY, w, waterH);
    const g2 = ctx.createRadialGradient(w * 0.88, h - dpr * 90, 8, w * 0.88, h, w * 0.45);
    g2.addColorStop(0, "rgba(200, 120, 255, 0.1)");
    g2.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = g2;
    ctx.fillRect(0, waterTopY, w, waterH);
  } else if (reefId === "mediterranean") {
    ctx.fillStyle = "rgba(15, 10, 40, 0.18)";
    ctx.fillRect(0, waterTopY + waterH * 0.15, w, waterH * 0.35);
    ctx.fillStyle = "rgba(5, 8, 30, 0.22)";
    ctx.fillRect(0, waterTopY + waterH * 0.45, w, waterH * 0.4);
    for (let i = 0; i < perfN(5); i++) {
      const y = waterTopY + waterH * (0.2 + i * 0.14) + Math.sin(t + i) * dpr * 6;
      ctx.strokeStyle = `rgba(160, 170, 220, ${0.04 + i * 0.015})`;
      ctx.lineWidth = (3 + i) * dpr;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y + dpr * 8);
      ctx.stroke();
    }
  } else if (reefId === "japan_kuroshio") {
    ctx.fillStyle = "rgba(0, 8, 24, 0.35)";
    ctx.fillRect(0, waterTopY, w * 0.08, waterH);
    ctx.fillRect(w * 0.92, waterTopY, w * 0.08, waterH);
    ctx.strokeStyle = "rgba(120, 210, 255, 0.06)";
    ctx.lineWidth = dpr;
    for (let i = 0; i < perfN(16); i++) {
      const x = (i / perfN(16)) * w + (i % 2) * dpr * 20;
      ctx.beginPath();
      ctx.moveTo(x, waterTopY);
      ctx.lineTo(x + dpr * 6, h - dpr * 40);
      ctx.stroke();
    }
    const sh = ctx.createLinearGradient(0, waterTopY, 0, waterTopY + waterH * 0.45);
    sh.addColorStop(0, "rgba(0, 40, 80, 0.15)");
    sh.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = sh;
    ctx.fillRect(0, waterTopY, w, waterH * 0.45);
  } else if (reefId === "mariana_trench") {
    ctx.fillStyle = "rgba(0, 0, 0, 0.72)";
    ctx.fillRect(0, waterTopY, w, waterH);
    ctx.strokeStyle = "rgba(60, 85, 120, 0.12)";
    ctx.lineWidth = dpr * 2;
    for (let i = 0; i < perfN(8); i++) {
      const x = (i / Math.max(1, perfN(7))) * w + Math.sin(t + i) * dpr * 12;
      ctx.beginPath();
      ctx.moveTo(x, waterTopY + waterH * 0.35);
      ctx.lineTo(x - dpr * (30 + i * 7), h);
      ctx.stroke();
    }
  }
  ctx.restore();
}

function drawGreatBarrierReefBed() {
  const reefTop = h - dpr * 150;
  const reefBase = h - dpr * 12;
  const reefGrad = ctx.createLinearGradient(0, reefTop, 0, reefBase);
  reefGrad.addColorStop(0, "rgba(24, 140, 118, 0.12)");
  reefGrad.addColorStop(0.38, "rgba(24, 104, 94, 0.48)");
  reefGrad.addColorStop(1, "rgba(6, 78, 72, 0.86)");
  ctx.fillStyle = reefGrad;
  ctx.beginPath();
  ctx.moveTo(0, reefBase);
  ctx.lineTo(0, reefTop + dpr * 34);
  for (let i = 0; i <= 18; i++) {
    const x = (i / 18) * w;
    const y = reefTop + dpr * (28 + Math.sin(i * 1.2) * 18 + Math.cos(i * 0.55) * 14);
    ctx.lineTo(x, y);
  }
  ctx.lineTo(w, reefBase);
  ctx.closePath();
  ctx.fill();

  const colors = ["#fb7185", "#f9a8d4", "#fdba74", "#fde68a", "#5eead4", "#67e8f9", "#c4b5fd"];
  for (let i = 0; i < perfN(30); i++) {
    const x = ((i * 83) % 1000) / 1000 * w;
    const y = h - dpr * (24 + ((i * 37) % 96));
    const sx = dpr * (18 + (i % 5) * 7);
    const sy = dpr * (9 + (i % 4) * 5);
    ctx.globalAlpha = 0.58;
    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath();
    ctx.ellipse(x, y, sx, sy, (i % 6) * 0.25, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = 0.34;
    ctx.strokeStyle = "rgba(255, 255, 240, 0.7)";
    ctx.lineWidth = Math.max(1, dpr * 0.7);
    ctx.beginPath();
    ctx.ellipse(x, y, sx * 0.62, sy * 0.56, (i % 6) * 0.25, 0, Math.PI * 2);
    ctx.stroke();
  }

  for (let i = 0; i < perfN(12); i++) {
    const x = ((i * 157) % 1000) / 1000 * w;
    const y = h - dpr * (42 + (i % 4) * 24);
    const r = dpr * (18 + (i % 3) * 9);
    ctx.globalAlpha = 0.5;
    ctx.strokeStyle = colors[(i + 3) % colors.length];
    ctx.lineWidth = dpr * 2.2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (let a = -3; a <= 3; a++) {
      const ang = -Math.PI * 0.5 + a * 0.28;
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x + Math.cos(ang) * r * 0.6, y + Math.sin(ang) * r * 0.55, x + Math.cos(ang) * r, y + Math.sin(ang) * r);
    }
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function drawMesoamericanReefBed() {
  const reefTop = h - dpr * 122;
  const reefBase = h - dpr * 10;
  const reefGrad = ctx.createLinearGradient(0, reefTop, 0, reefBase);
  reefGrad.addColorStop(0, "rgba(255, 125, 170, 0.08)");
  reefGrad.addColorStop(0.4, "rgba(126, 55, 140, 0.34)");
  reefGrad.addColorStop(1, "rgba(44, 18, 78, 0.72)");
  ctx.fillStyle = reefGrad;
  ctx.beginPath();
  ctx.moveTo(0, reefBase);
  ctx.lineTo(0, reefTop + dpr * 28);
  for (let i = 0; i <= 16; i++) {
    const x = (i / 16) * w;
    const y = reefTop + dpr * (22 + Math.sin(i * 1.45) * 15 + Math.cos(i * 0.7) * 10);
    ctx.lineTo(x, y);
  }
  ctx.lineTo(w, reefBase);
  ctx.closePath();
  ctx.fill();

  const colors = ["#ff8fb3", "#fb7185", "#f97316", "#facc15", "#c084fc", "#e879f9", "#38bdf8"];
  for (let i = 0; i < perfN(26); i++) {
    const x = ((i * 97) % 1000) / 1000 * w;
    const y = h - dpr * (22 + ((i * 43) % 82));
    const rx = dpr * (14 + (i % 5) * 6);
    const ry = dpr * (8 + (i % 4) * 4);
    ctx.globalAlpha = 0.52;
    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, (i % 7) * 0.3, 0, Math.PI * 2);
    ctx.fill();

    if (!PERF_CHROMEBOOK) {
      ctx.globalAlpha = 0.28;
      ctx.fillStyle = "#fff7ed";
      ctx.beginPath();
      ctx.ellipse(x - rx * 0.2, y - ry * 0.22, rx * 0.35, ry * 0.28, -0.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < perfN(11); i++) {
    const x = ((i * 131) % 1000) / 1000 * w;
    const y = h - dpr * (34 + (i % 4) * 18);
    const r = dpr * (16 + (i % 4) * 5);
    ctx.globalAlpha = 0.48;
    ctx.strokeStyle = colors[(i + 2) % colors.length];
    ctx.lineWidth = dpr * 2;
    ctx.beginPath();
    for (let a = -4; a <= 4; a++) {
      const ang = -Math.PI * 0.5 + a * 0.2;
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x + Math.cos(ang) * r * 0.65, y + Math.sin(ang) * r * 0.55, x + Math.cos(ang) * r, y + Math.sin(ang) * r);
    }
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function drawWesternMediterraneanRocks() {
  const shelfTop = h - dpr * 118;
  const shelfBase = h - dpr * 10;
  const shelfGrad = ctx.createLinearGradient(0, shelfTop, 0, shelfBase);
  shelfGrad.addColorStop(0, "rgba(72, 64, 110, 0.08)");
  shelfGrad.addColorStop(0.45, "rgba(55, 48, 92, 0.38)");
  shelfGrad.addColorStop(1, "rgba(21, 18, 46, 0.82)");
  ctx.fillStyle = shelfGrad;
  ctx.beginPath();
  ctx.moveTo(0, shelfBase);
  ctx.lineTo(0, shelfTop + dpr * 34);
  for (let i = 0; i <= 14; i++) {
    const x = (i / 14) * w;
    const y = shelfTop + dpr * (26 + Math.sin(i * 1.35) * 13 + Math.cos(i * 0.7) * 10);
    ctx.lineTo(x, y);
  }
  ctx.lineTo(w, shelfBase);
  ctx.closePath();
  ctx.fill();

  for (let i = 0; i < perfN(24); i++) {
    const x = ((i * 109) % 1000) / 1000 * w;
    const y = h - dpr * (18 + ((i * 47) % 78));
    const rx = dpr * (18 + (i % 5) * 9);
    const ry = dpr * (10 + (i % 4) * 6);
    ctx.globalAlpha = 0.78;
    if (PERF_CHROMEBOOK) {
      ctx.fillStyle = i % 2 ? "#5b5577" : "#373052";
    } else {
      const rock = ctx.createLinearGradient(x - rx, y - ry, x + rx, y + ry);
      rock.addColorStop(0, i % 2 ? "#6d5f8f" : "#5b5577");
      rock.addColorStop(0.55, "#373052");
      rock.addColorStop(1, "#171323");
      ctx.fillStyle = rock;
    }
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, (i % 6) * 0.22, 0, Math.PI * 2);
    ctx.fill();
    if (!PERF_CHROMEBOOK) {
      ctx.globalAlpha = 0.24;
      ctx.fillStyle = "#ddd6fe";
      ctx.beginPath();
      ctx.ellipse(x - rx * 0.24, y - ry * 0.28, rx * 0.34, ry * 0.22, -0.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
}

function drawKuroshioRocks() {
  const trenchTop = h - dpr * 132;
  const trenchBase = h - dpr * 8;
  const rockGrad = ctx.createLinearGradient(0, trenchTop, 0, trenchBase);
  rockGrad.addColorStop(0, "rgba(14, 116, 144, 0.08)");
  rockGrad.addColorStop(0.42, "rgba(12, 74, 110, 0.38)");
  rockGrad.addColorStop(1, "rgba(3, 7, 18, 0.88)");
  ctx.fillStyle = rockGrad;
  ctx.beginPath();
  ctx.moveTo(0, trenchBase);
  ctx.lineTo(0, trenchTop + dpr * 42);
  for (let i = 0; i <= 15; i++) {
    const x = (i / 15) * w;
    const y = trenchTop + dpr * (30 + Math.sin(i * 1.8) * 22 + Math.cos(i * 0.55) * 12);
    ctx.lineTo(x, y);
  }
  ctx.lineTo(w, trenchBase);
  ctx.closePath();
  ctx.fill();

  for (let i = 0; i < perfN(22); i++) {
    const x = ((i * 137) % 1000) / 1000 * w;
    const baseY = h - dpr * (10 + ((i * 29) % 82));
    const rw = dpr * (18 + (i % 4) * 8);
    const rh = dpr * (20 + (i % 5) * 10);
    ctx.globalAlpha = 0.82;
    if (PERF_CHROMEBOOK) {
      ctx.fillStyle = "#0f172a";
    } else {
      const g = ctx.createLinearGradient(x - rw, baseY - rh, x + rw, baseY + rh);
      g.addColorStop(0, "#164e63");
      g.addColorStop(0.46, "#0f172a");
      g.addColorStop(1, "#020617");
      ctx.fillStyle = g;
    }
    ctx.beginPath();
    ctx.moveTo(x - rw, baseY + rh * 0.45);
    ctx.lineTo(x - rw * 0.38, baseY - rh * 0.75);
    ctx.lineTo(x + rw * 0.1, baseY - rh);
    ctx.lineTo(x + rw * 0.64, baseY - rh * 0.28);
    ctx.lineTo(x + rw, baseY + rh * 0.45);
    ctx.closePath();
    ctx.fill();

    ctx.globalAlpha = 0.26;
    ctx.strokeStyle = "rgba(125, 211, 252, 0.72)";
    ctx.lineWidth = Math.max(1, dpr * 0.8);
    ctx.beginPath();
    ctx.moveTo(x - rw * 0.28, baseY - rh * 0.5);
    ctx.lineTo(x + rw * 0.16, baseY - rh * 0.84);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
}

function drawReefStructure(reefId, corals) {
  for (const c of corals) {
    const cx = w * c.x;
    const base = h - dpr * 20;
    const ch = c.h;
    ctx.globalAlpha = 0.88;
    if (reefId === "caribbean") {
      ctx.strokeStyle = c.c;
      ctx.lineWidth = 2.2 * dpr;
      ctx.beginPath();
      ctx.moveTo(cx, base);
      ctx.bezierCurveTo(cx - dpr * 28 * ch, base - dpr * 50 * ch, cx + dpr * 32 * ch, base - dpr * 90 * ch, cx + dpr * 6 * ch, base - dpr * 120 * ch);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, base);
      ctx.bezierCurveTo(cx + dpr * 24 * ch, base - dpr * 45 * ch, cx - dpr * 26 * ch, base - dpr * 85 * ch, cx - dpr * 8 * ch, base - dpr * 115 * ch);
      ctx.stroke();
      ctx.fillStyle = c.c;
      ctx.globalAlpha = 0.35;
      ctx.beginPath();
      ctx.ellipse(cx, base - dpr * 8, dpr * 28 * ch, dpr * 10, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (reefId === "australia") {
      ctx.fillStyle = c.c;
      for (let s = 0; s < 6; s++) {
        const py = base - s * dpr * 15 * ch;
        const pw = dpr * (68 - s * 6) * ch;
        ctx.beginPath();
        ctx.moveTo(cx - pw * 0.5, py);
        ctx.lineTo(cx + pw * 0.5, py);
        ctx.lineTo(cx + pw * 0.34, py - dpr * 24 * ch);
        ctx.lineTo(cx - pw * 0.34, py - dpr * 24 * ch);
        ctx.closePath();
        ctx.fill();
      }
      ctx.strokeStyle = c.c;
      ctx.lineWidth = 3.4 * dpr;
      ctx.lineCap = "round";
      ctx.globalAlpha = 0.82;
      for (let b = -3; b <= 3; b++) {
        const bx = cx + b * dpr * 18 * ch;
        const by = base - dpr * (10 + Math.abs(b) * 5) * ch;
        const tipX = bx + b * dpr * 16 * ch;
        const tipY = by - dpr * (74 + Math.abs(b) * 7) * ch;
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.quadraticCurveTo(bx + b * dpr * 10 * ch, by - dpr * 42 * ch, tipX, tipY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(bx, by - dpr * 36 * ch);
        ctx.lineTo(bx + dpr * (b < 0 ? -22 : 22) * ch, by - dpr * 54 * ch);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(tipX, tipY + dpr * 18 * ch);
        ctx.lineTo(tipX + dpr * (b <= 0 ? 18 : -18) * ch, tipY + dpr * 4 * ch);
        ctx.stroke();
      }
      ctx.globalAlpha = 0.58;
      ctx.fillStyle = c.c;
      for (let p = 0; p < 9; p++) {
        const px = cx + (p - 4) * dpr * 13 * ch;
        const py = base - dpr * (10 + (p % 3) * 11) * ch;
        ctx.beginPath();
        ctx.ellipse(px, py, dpr * 15 * ch, dpr * 9 * ch, p * 0.34, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 0.32;
      ctx.fillStyle = "#fffef0";
      ctx.beginPath();
      ctx.ellipse(cx + dpr * 12 * ch, base - dpr * 94 * ch, dpr * 24 * ch, dpr * 12 * ch, 0.3, 0, Math.PI * 2);
      ctx.fill();
    } else if (reefId === "mediterranean") {
      for (let g = 0; g < 7; g++) {
        const gx = cx + (g - 3) * dpr * 7 * ch;
        ctx.strokeStyle = c.c;
        ctx.lineWidth = dpr * 1.8;
        ctx.globalAlpha = 0.32 + g * 0.04;
        ctx.beginPath();
        ctx.moveTo(gx, base);
        ctx.quadraticCurveTo(gx + dpr * 2, base - dpr * (35 + g * 5) * ch, gx, base - dpr * (55 + g * 8) * ch);
        ctx.stroke();
      }
      ctx.globalAlpha = 0.45;
      ctx.fillStyle = c.c;
      ctx.beginPath();
      ctx.ellipse(cx, base, dpr * 40 * ch, dpr * 12 * ch, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (reefId === "japan_kuroshio") {
      ctx.fillStyle = c.c;
      ctx.globalAlpha = 0.55;
      ctx.beginPath();
      ctx.moveTo(cx, base);
      ctx.lineTo(cx + dpr * 8 * ch, base - dpr * 70 * ch);
      ctx.lineTo(cx - dpr * 6 * ch, base - dpr * 55 * ch);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(cx + dpr * 12 * ch, base - dpr * 5);
      ctx.lineTo(cx + dpr * 18 * ch, base - dpr * 95 * ch);
      ctx.lineTo(cx + dpr * 4 * ch, base - dpr * 70 * ch);
      ctx.closePath();
      ctx.fill();
  } else if (reefId === "mariana_trench") {
    ctx.fillStyle = c.c;
    ctx.globalAlpha = 0.65;
    ctx.beginPath();
    ctx.moveTo(cx - dpr * 45 * ch, base + dpr * 8);
    ctx.lineTo(cx - dpr * 8 * ch, base - dpr * 90 * ch);
    ctx.lineTo(cx + dpr * 24 * ch, base + dpr * 4);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#020617";
    ctx.beginPath();
    ctx.moveTo(cx + dpr * 10 * ch, base);
    ctx.lineTo(cx + dpr * 46 * ch, base - dpr * 120 * ch);
    ctx.lineTo(cx + dpr * 68 * ch, base);
    ctx.closePath();
    ctx.fill();
    } else {
      ctx.fillStyle = c.c;
      ctx.beginPath();
      ctx.ellipse(cx, base, dpr * 35 * ch * 4, dpr * 40 * ch, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
}

function drawBackground() {
  const reef = getReef();
  const v = reef.visuals;
  const rid = reef.id;
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, v.gradient[0]);
  g.addColorStop(0.35, v.gradient[1]);
  g.addColorStop(0.7, v.gradient[2]);
  g.addColorStop(1, v.gradient[3]);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  drawReefAmbience(rid, waterTop);

  const shaft = ctx.createLinearGradient(w * 0.35, waterTop, w * 0.55, h);
  shaft.addColorStop(0, v.shaft[0]);
  shaft.addColorStop(1, v.shaft[1]);
  ctx.fillStyle = shaft;
  ctx.beginPath();
  ctx.moveTo(w * 0.38, waterTop);
  ctx.lineTo(w * 0.62, waterTop);
  ctx.lineTo(w * 0.72, h);
  ctx.lineTo(w * 0.28, h);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = v.silhouette;
  ctx.beginPath();
  ctx.moveTo(0, h - dpr * 50);
  const bumpScale = rid === "mediterranean" ? 1.35 : rid === "japan_kuroshio" ? 0.72 : rid === "australia" ? 0.92 : 1;
  for (let i = 0; i <= 12; i++) {
    const x = (i / 12) * w;
    const bump = (Math.sin(i * 1.7 + (rid === "caribbean" ? 0.4 : 0)) * dpr * 18 + Math.cos(i * 0.9) * dpr * 10) * bumpScale;
    ctx.lineTo(x, h - dpr * 45 - bump);
  }
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fill();

  const sandTop = h - dpr * 92;
  const advTheme = getActiveAdventureTheme();
  const themeSand = advTheme && ADVENTURE_THEME_SAND[advTheme];
  const sand = ctx.createLinearGradient(0, sandTop, 0, h);
  if (themeSand) {
    for (const [stop, color] of themeSand.stops) sand.addColorStop(stop, color);
  } else {
    sand.addColorStop(0, "rgba(236, 205, 150, 0)");
    sand.addColorStop(0.28, "rgba(226, 190, 132, 0.18)");
    sand.addColorStop(0.72, "rgba(210, 169, 104, 0.36)");
    sand.addColorStop(1, "rgba(174, 128, 70, 0.5)");
  }
  ctx.fillStyle = sand;
  ctx.beginPath();
  ctx.moveTo(0, sandTop + dpr * 12);
  for (let i = 0; i <= 14; i++) {
    const x = (i / 14) * w;
    const y = sandTop + dpr * (10 + Math.sin(i * 1.45) * 7 + Math.cos(i * 0.8) * 4);
    ctx.lineTo(x, y);
  }
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = themeSand ? themeSand.speck : "rgba(255, 238, 190, 0.18)";
  for (let i = 0; i < perfN(38); i++) {
    const x = ((i * 73) % 1000) / 1000 * w;
    const y = sandTop + dpr * 20 + (((i * 41) % 100) / 100) * dpr * 58;
    ctx.beginPath();
    ctx.ellipse(x, y, dpr * (0.7 + (i % 3) * 0.35), dpr * 0.55, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  if (!advTheme && rid === "australia") drawGreatBarrierReefBed();
  if (!advTheme && rid === "caribbean") drawMesoamericanReefBed();
  if (!advTheme && rid === "mediterranean") drawWesternMediterraneanRocks();
  if (!advTheme && rid === "japan_kuroshio") drawKuroshioRocks();
  if (advTheme) drawAdventureThemeBed(advTheme);
  else drawReefStructure(rid, v.corals);
}

function drawCachedBackground() {
  const themeKey = adventureSession ? getAdventureLevelTheme(adventureSession.levelIndex) : "";
  const key = `${w}|${h}|${getReef().id}|${themeKey}`;
  if (!bgCacheCanvas || bgCacheKey !== key) {
    if (!bgCacheCanvas) bgCacheCanvas = document.createElement("canvas");
    bgCacheCanvas.width = w;
    bgCacheCanvas.height = h;
    const saved = ctx;
    ctx = bgCacheCanvas.getContext("2d");
    drawBackground();
    ctx = saved;
    bgCacheKey = key;
  }
  ctx.drawImage(bgCacheCanvas, 0, 0);
}

function countUncaughtFish() {
  let n = 0;
  for (const f of fishList) {
    if (!f.caught) n++;
  }
  return n;
}

function drawBubbles(dt) {
  ctx.fillStyle = getReef().visuals.bubble;
  for (const b of bubbles) {
    b.y -= b.vy * (dt / 16);
    b.w += 0.02;
    b.x += Math.sin(b.w) * 0.3 * dpr;
    if (b.y < waterTop - 10) {
      b.y = h - Math.random() * dpr * 40;
      b.x = Math.random() * w;
    }
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();
  }
}

/** Species-shaped silhouettes; speciesId refines recognizable traits per fish. */
function drawFishMorph(morph, L, body, shade, accent, speciesId) {
  const sid = speciesId || "";
  function eye() {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(L * 0.34, -L * 0.03, L * 0.072, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0a1a22";
    ctx.beginPath();
    ctx.arc(L * 0.36, -L * 0.03, L * 0.03, 0, Math.PI * 2);
    ctx.fill();
  }

  function forkTail(depth = 0.28) {
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.moveTo(-L * 0.4, 0);
    ctx.lineTo(-L * 0.92, -L * depth);
    ctx.lineTo(-L * 0.76, 0);
    ctx.lineTo(-L * 0.92, L * depth);
    ctx.closePath();
    ctx.fill();
  }

  function dorsalSail(h = 0.42, w = 0.22) {
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.moveTo(L * 0.02, -L * 0.12);
    ctx.lineTo(L * 0.08, -L * h);
    ctx.lineTo(L * 0.22, -L * w);
    ctx.closePath();
    ctx.fill();
  }

  function lateralStripe(n, y0, spread) {
    ctx.strokeStyle = accent;
    ctx.lineWidth = L * 0.045;
    ctx.lineCap = "round";
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1 || 1);
      ctx.globalAlpha = 0.55 + t * 0.25;
      ctx.beginPath();
      ctx.moveTo(L * (0.28 - t * 0.5), y0 + (t - 0.5) * spread);
      ctx.quadraticCurveTo(L * (-0.05 - t * 0.1), y0 + L * 0.02, -L * (0.35 + t * 0.15), y0 * 0.3);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  if (morph === "silverside") {
    const slim = sid === "european_sprat" ? 0.9 : sid === "northern_anchovy" ? 0.95 : 1;
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.ellipse(0, 0, L * 0.48 * slim, L * (sid === "european_sprat" ? 0.17 : 0.2), 0, 0, Math.PI * 2);
    ctx.fill();
    if (sid === "northern_anchovy") {
      ctx.fillStyle = body;
      ctx.beginPath();
      ctx.moveTo(L * 0.48, 0);
      ctx.lineTo(L * 0.62, -L * 0.06);
      ctx.lineTo(L * 0.58, L * 0.05);
      ctx.closePath();
      ctx.fill();
    }
    ctx.fillStyle = "rgba(255,255,255,0.22)";
    ctx.beginPath();
    ctx.ellipse(L * 0.1, -L * 0.04, L * 0.28, L * 0.08, -0.12, 0, Math.PI * 2);
    ctx.fill();
    if (sid === "atlantic_herring") {
      ctx.strokeStyle = shade;
      ctx.lineWidth = L * 0.026;
      ctx.lineCap = "round";
      for (let i = 0; i < 5; i++) {
        const px = L * (0.22 - i * 0.1);
        ctx.beginPath();
        ctx.moveTo(px, -L * 0.04);
        ctx.lineTo(px - L * 0.05, L * 0.05);
        ctx.lineTo(px + L * 0.05, L * 0.05);
        ctx.stroke();
      }
    }
    if (sid === "pacific_sardine") {
      ctx.fillStyle = shade;
      ctx.beginPath();
      ctx.arc(L * 0.24, -L * 0.04, L * 0.055, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = accent;
      ctx.lineWidth = L * 0.02;
      ctx.beginPath();
      ctx.moveTo(L * 0.12, 0);
      ctx.lineTo(-L * 0.22, L * 0.02);
      ctx.stroke();
    }
    forkTail(sid === "european_sprat" ? 0.38 : 0.34);
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(L * 0.34, -L * 0.03, L * (sid === "northern_anchovy" ? 0.055 : 0.072), 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0a1a22";
    ctx.beginPath();
    ctx.arc(L * (sid === "northern_anchovy" ? 0.36 : 0.36), -L * 0.03, L * (sid === "northern_anchovy" ? 0.022 : 0.03), 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  if (morph === "mackerel") {
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.ellipse(0, 0, L * 0.46, L * 0.26, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = shade;
    ctx.lineWidth = L * 0.04;
    for (let i = 0; i < 5; i++) {
      const yy = -L * 0.18 + i * L * 0.08;
      ctx.beginPath();
      ctx.arc(0, yy, L * 0.42, 2.1, 0.95 * Math.PI);
      ctx.stroke();
    }
    forkTail(0.26);
    eye();
    return;
  }

  if (morph === "tuna" || morph === "bluefin") {
    const chunky = morph === "bluefin" ? 1.08 : 1;
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.moveTo(L * 0.52, 0);
    ctx.quadraticCurveTo(L * 0.15, -L * 0.32 * chunky, -L * 0.35, -L * 0.08);
    ctx.quadraticCurveTo(-L * 0.42, 0, -L * 0.35, L * 0.08);
    ctx.quadraticCurveTo(L * 0.15, L * 0.28 * chunky, L * 0.52, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.moveTo(-L * 0.38, 0);
    ctx.lineTo(-L * 0.88, -L * 0.12);
    ctx.lineTo(-L * 0.88, L * 0.12);
    ctx.closePath();
    ctx.fill();
    dorsalSail(0.28, 0.18);
    if (sid === "yellowfin_tuna") {
      ctx.fillStyle = "#facc15";
      ctx.globalAlpha = 0.88;
      ctx.beginPath();
      ctx.ellipse(L * -0.05, -L * 0.2, L * 0.11, L * 0.055, 0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ca8a04";
      ctx.beginPath();
      ctx.moveTo(L * 0.28, -L * 0.06);
      ctx.lineTo(L * 0.48, -L * 0.18);
      ctx.lineTo(L * 0.4, -L * 0.1);
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    if (sid === "albacore_tuna") {
      ctx.fillStyle = "rgba(248, 250, 252, 0.55)";
      ctx.beginPath();
      ctx.ellipse(L * 0.04, L * 0.13, L * 0.3, L * 0.048, -0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(L * 0.02, L * 0.21, L * 0.26, L * 0.04, -0.12, 0, Math.PI * 2);
      ctx.fill();
    }
    if (morph === "bluefin") {
      ctx.fillStyle = accent;
      for (let i = 0; i < 6; i++) {
        const fx = L * (0.35 - i * 0.08);
        ctx.fillRect(fx, -L * 0.06, L * 0.04, L * 0.04);
      }
    }
    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.ellipse(L * 0.05, L * 0.1, L * 0.12, L * 0.05, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    eye();
    return;
  }

  if (morph === "bass") {
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.ellipse(0, L * 0.02, L * 0.44, L * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.moveTo(L * 0.08, -L * 0.28);
    ctx.quadraticCurveTo(L * -0.1, -L * 0.52, -L * 0.2, -L * 0.22);
    ctx.lineTo(-L * 0.05, -L * 0.12);
    ctx.closePath();
    ctx.fill();
    if (sid === "striped_bass") {
      ctx.fillStyle = "rgba(12, 42, 22, 0.82)";
      for (let i = 0; i < 7; i++) {
        const yy = -L * 0.22 + i * L * 0.065;
        ctx.fillRect(-L * 0.32, yy, L * 0.62, L * 0.038);
      }
    } else if (sid === "european_seabass") {
      ctx.strokeStyle = "rgba(8, 50, 45, 0.55)";
      ctx.lineWidth = L * 0.022;
      ctx.beginPath();
      ctx.moveTo(L * 0.34, -L * 0.02);
      ctx.quadraticCurveTo(0, L * 0.1, -L * 0.34, L * 0.04);
      ctx.stroke();
    } else {
      lateralStripe(7, 0, L * 0.14);
    }
    forkTail(0.24);
    eye();
    return;
  }

  if (morph === "barramundi") {
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.moveTo(L * 0.48, L * 0.02);
    ctx.quadraticCurveTo(L * 0.2, -L * 0.36, -L * 0.1, -L * 0.28);
    ctx.quadraticCurveTo(-L * 0.42, 0, -L * 0.1, L * 0.32);
    ctx.quadraticCurveTo(L * 0.2, L * 0.4, L * 0.48, L * 0.02);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.moveTo(L * 0.22, -L * 0.28);
    ctx.lineTo(L * 0.4, -L * 0.18);
    ctx.lineTo(L * 0.28, -L * 0.1);
    ctx.closePath();
    ctx.fill();
    lateralStripe(5, 0, L * 0.12);
    forkTail(0.22);
    eye();
    return;
  }

  if (morph === "cod") {
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.ellipse(L * 0.04, 0, L * 0.42, L * 0.32, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = shade;
    ctx.lineWidth = L * 0.04;
    ctx.beginPath();
    ctx.moveTo(L * 0.22, L * 0.12);
    ctx.quadraticCurveTo(L * 0.32, L * 0.38, L * 0.28, L * 0.42);
    ctx.stroke();
    forkTail(0.22);
    eye();
    ctx.strokeStyle = "rgba(55,48,40,0.85)";
    ctx.lineWidth = L * 0.035;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(L * 0.22, L * 0.1);
    ctx.quadraticCurveTo(L * 0.26, L * 0.22, L * 0.24, L * 0.32);
    ctx.stroke();
    return;
  }

  if (morph === "snapper") {
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.moveTo(L * 0.48, -L * 0.02);
    ctx.quadraticCurveTo(L * 0.2, -L * 0.38, -L * 0.2, -L * 0.22);
    ctx.quadraticCurveTo(-L * 0.42, 0, -L * 0.2, L * 0.26);
    ctx.quadraticCurveTo(L * 0.2, L * 0.34, L * 0.48, L * 0.02);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.arc(-L * 0.12, L * 0.02, L * 0.07, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    if (sid === "coral_trout_gbr") {
      ctx.fillStyle = "#38bdf8";
      for (let i = 0; i < 9; i++) {
        const a = (i / 9) * Math.PI * 1.6 - 0.4;
        ctx.beginPath();
        ctx.arc(Math.cos(a) * L * 0.18, Math.sin(a) * L * 0.12, L * 0.028, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    forkTail(0.2);
    eye();
    return;
  }

  if (morph === "mahi") {
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.moveTo(L * 0.5, 0);
    ctx.quadraticCurveTo(L * 0.1, -L * 0.22, -L * 0.35, -L * 0.05);
    ctx.quadraticCurveTo(-L * 0.4, L * 0.12, L * 0.1, L * 0.26);
    ctx.quadraticCurveTo(L * 0.45, L * 0.12, L * 0.5, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.moveTo(L * 0.42, -L * 0.18);
    ctx.lineTo(L * 0.52, -L * 0.42);
    ctx.lineTo(L * 0.48, -L * 0.12);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.moveTo(L * 0.12, -L * 0.08);
    ctx.lineTo(L * 0.02, -L * 0.62);
    ctx.lineTo(L * 0.28, -L * 0.2);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.moveTo(-L * 0.35, 0);
    ctx.lineTo(-L * 0.88, -L * 0.18);
    ctx.lineTo(-L * 0.75, L * 0.02);
    ctx.lineTo(-L * 0.88, L * 0.2);
    ctx.closePath();
    ctx.fill();
    eye();
    return;
  }

  if (morph === "amberjack") {
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.ellipse(0, 0, L * 0.46, L * 0.28, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = accent;
    ctx.fillRect(-L * 0.35, -L * 0.04, L * 0.7, L * 0.07);
    if (sid === "yellowtail_amberjack") {
      ctx.strokeStyle = "rgba(120, 55, 10, 0.55)";
      ctx.lineWidth = L * 0.024;
      ctx.beginPath();
      ctx.moveTo(L * 0.32, L * 0.02);
      ctx.quadraticCurveTo(0, L * 0.08, -L * 0.36, L * 0.04);
      ctx.stroke();
    }
    forkTail(0.26);
    dorsalSail(0.26, 0.16);
    eye();
    return;
  }

  if (morph === "halibut") {
    ctx.save();
    ctx.rotate(-0.12);
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.ellipse(0, 0, L * 0.52, L * 0.36, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.ellipse(L * 0.12, -L * 0.08, L * 0.14, L * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0a1a22";
    ctx.beginPath();
    ctx.arc(L * 0.16, -L * 0.05, L * 0.028, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0a1a22";
    ctx.beginPath();
    ctx.arc(L * 0.22, -L * 0.02, L * 0.022, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(248, 250, 252, 0.55)";
    ctx.beginPath();
    ctx.ellipse(-L * 0.06, L * 0.12, L * 0.36, L * 0.1, 0.08, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return;
  }

  if (morph === "marlin") {
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.moveTo(L * 0.55, 0);
    ctx.quadraticCurveTo(L * 0.05, -L * 0.2, -L * 0.25, -L * 0.06);
    ctx.quadraticCurveTo(-L * 0.35, 0, -L * 0.25, L * 0.08);
    ctx.quadraticCurveTo(L * 0.05, L * 0.18, L * 0.55, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.moveTo(L * 0.55, 0);
    ctx.lineTo(L * 1.15, -L * 0.02);
    ctx.lineTo(L * 0.55, L * 0.06);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.moveTo(L * 0.02, -L * 0.06);
    ctx.lineTo(-L * 0.08, -L * 0.72);
    ctx.lineTo(L * 0.18, -L * 0.14);
    ctx.closePath();
    ctx.fill();
    if (sid === "blue_marlin") {
      ctx.fillStyle = shade;
      ctx.beginPath();
      ctx.moveTo(L * 0.06, -L * 0.06);
      ctx.lineTo(L * -0.04, -L * 0.68);
      ctx.lineTo(L * 0.2, -L * 0.14);
      ctx.closePath();
      ctx.fill();
    }
    forkTail(0.14);
    eye();
    return;
  }

  if (morph === "swordfish") {
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.ellipse(L * 0.05, 0, L * 0.38, L * 0.18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = shade;
    ctx.fillRect(L * 0.38, -L * 0.04, L * 0.85, L * 0.08);
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.moveTo(-L * 0.35, 0);
    ctx.lineTo(-L * 0.92, -L * 0.28);
    ctx.lineTo(-L * 0.78, 0);
    ctx.lineTo(-L * 0.92, L * 0.28);
    ctx.closePath();
    ctx.fill();
    eye();
    return;
  }

  if (morph === "trevally") {
    const steep = sid === "giant_trevally" ? 1.12 : 1;
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.moveTo(L * 0.48, -L * 0.02);
    ctx.lineTo(L * 0.12, -L * 0.32 * steep);
    ctx.lineTo(-L * 0.38, -L * 0.12);
    ctx.lineTo(-L * 0.42, L * 0.08);
    ctx.lineTo(L * 0.12, L * 0.28 * steep);
    ctx.lineTo(L * 0.48, L * 0.04);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.moveTo(L * 0.02, L * 0.06);
    ctx.quadraticCurveTo(-L * 0.15, L * 0.22, -L * 0.35, L * 0.18);
    ctx.lineTo(-L * 0.28, L * 0.1);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
    forkTail(0.2);
    eye();
    return;
  }

  if (morph === "hammerhead") {
    const wide = sid === "great_hammerhead" ? 1.22 : 1;
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.ellipse(L * 0.38, 0, L * 0.14 * wide, L * 0.36, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.moveTo(L * 0.28, -L * 0.12);
    ctx.quadraticCurveTo(-L * 0.18, -L * 0.26, -L * 0.46, -L * 0.06);
    ctx.lineTo(-L * 0.52, L * 0.02);
    ctx.quadraticCurveTo(-L * 0.18, L * 0.28, L * 0.28, L * 0.12);
    ctx.quadraticCurveTo(L * 0.34, L * 0.06, L * 0.32, -L * 0.08);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = shade;
    ctx.globalAlpha = 0.55;
    ctx.strokeStyle = shade;
    ctx.lineWidth = Math.max(1, L * 0.02);
    ctx.beginPath();
    ctx.moveTo(L * 0.02, -L * 0.08);
    ctx.lineTo(L * 0.02, L * 0.12);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#0a1020";
    ctx.beginPath();
    ctx.arc(L * 0.44, -L * 0.1, L * 0.038, 0, Math.PI * 2);
    ctx.fill();
    forkTail(0.14);
    return;
  }

  if (morph === "reefshark") {
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.moveTo(L * 0.46, 0);
    ctx.quadraticCurveTo(L * 0.05, -L * 0.3, -L * 0.4, -L * 0.08);
    ctx.lineTo(-L * 0.52, L * 0.02);
    ctx.lineTo(-L * 0.4, L * 0.08);
    ctx.quadraticCurveTo(L * 0.05, L * 0.3, L * 0.46, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.moveTo(L * -0.04, -L * 0.24);
    ctx.lineTo(L * 0.06, -L * 0.44);
    ctx.lineTo(L * 0.1, -L * 0.2);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#0a1020";
    ctx.beginPath();
    ctx.arc(L * 0.28, -L * 0.06, L * 0.032, 0, Math.PI * 2);
    ctx.fill();
    if (sid === "australian_blacktip") {
      ctx.fillStyle = "#f8fafc";
      ctx.beginPath();
      ctx.moveTo(L * 0.02, -L * 0.38);
      ctx.lineTo(L * 0.08, -L * 0.44);
      ctx.lineTo(L * 0.12, -L * 0.2);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.arc(-L * 0.38, -L * 0.02, L * 0.04, 0, Math.PI * 2);
      ctx.fill();
    }
    forkTail(0.12);
    return;
  }

  if (morph === "barracuda") {
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.moveTo(L * 0.55, 0);
    ctx.quadraticCurveTo(L * 0.1, -L * 0.12, -L * 0.45, -L * 0.04);
    ctx.lineTo(-L * 0.52, 0);
    ctx.lineTo(-L * 0.45, L * 0.04);
    ctx.quadraticCurveTo(L * 0.1, L * 0.12, L * 0.55, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.35;
    for (let i = 0; i < 4; i++) {
      ctx.fillRect(L * (0.15 - i * 0.12), -L * 0.03, L * 0.02, L * 0.06);
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.moveTo(L * 0.55, -L * 0.04);
    ctx.lineTo(L * 0.95, -L * 0.12);
    ctx.lineTo(L * 0.58, L * 0.04);
    ctx.closePath();
    ctx.fill();
    forkTail(0.1);
    ctx.strokeStyle = "rgba(250,250,250,0.75)";
    ctx.lineWidth = L * 0.018;
    ctx.beginPath();
    ctx.moveTo(L * 0.42, -L * 0.02);
    for (let i = 0; i < 12; i++) {
      ctx.lineTo(L * (0.38 - i * 0.04), (i % 2 === 0 ? -1 : 1) * L * 0.025);
    }
    ctx.stroke();
    eye();
    return;
  }

  if (morph === "skullfish") {
    const isLantern = sid === "abyss_lantern" || sid === "leviathan_skull";
    const isEel = sid === "grave_eel";
    const isRay = sid === "specter_ray";
    const isMarlin = sid === "skeletal_marlin";
    ctx.fillStyle = body;
    if (isEel) {
      ctx.beginPath();
      ctx.moveTo(L * 0.52, -L * 0.06);
      ctx.quadraticCurveTo(L * 0.1, -L * 0.38, -L * 0.78, -L * 0.02);
      ctx.quadraticCurveTo(-L * 0.05, L * 0.22, L * 0.5, L * 0.1);
      ctx.closePath();
      ctx.fill();
    } else if (isRay) {
      ctx.beginPath();
      ctx.ellipse(0, L * 0.04, L * 0.52, L * 0.14, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = shade;
      ctx.lineWidth = L * 0.025;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-L * 0.55, L * 0.35);
      ctx.stroke();
      forkTail(0.22);
    } else {
      ctx.beginPath();
      ctx.moveTo(L * 0.52, 0);
      ctx.quadraticCurveTo(L * 0.15, -L * (isLantern ? 0.38 : 0.26), -L * 0.4, -L * 0.12);
      ctx.quadraticCurveTo(-L * 0.62, 0, -L * 0.38, L * 0.12);
      ctx.quadraticCurveTo(L * 0.12, L * (isLantern ? 0.32 : 0.22), L * 0.52, 0);
      ctx.closePath();
      ctx.fill();
      forkTail(isMarlin ? 0.2 : 0.26);
    }
    ctx.strokeStyle = shade;
    ctx.lineWidth = L * 0.022;
    ctx.globalAlpha = 0.55;
    for (let i = 0; i < 5; i++) {
      const rx = L * (0.2 - i * 0.11);
      ctx.beginPath();
      ctx.moveTo(rx, -L * 0.02);
      ctx.lineTo(rx - L * 0.04, L * 0.14);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    if (isLantern) {
      ctx.strokeStyle = accent;
      ctx.lineWidth = L * 0.02;
      ctx.beginPath();
      ctx.moveTo(L * 0.12, -L * 0.2);
      ctx.quadraticCurveTo(L * 0.3, -L * 0.55, L * 0.5, -L * 0.38);
      ctx.stroke();
      ctx.fillStyle = accent;
      ctx.shadowColor = accent;
      ctx.shadowBlur = L * 0.22;
      ctx.beginPath();
      ctx.arc(L * 0.52, -L * 0.36, L * 0.06, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.fillStyle = accent;
    for (let i = 0; i < 7; i++) {
      const tx = L * (0.38 - i * 0.09);
      const ty = L * (0.06 + (i % 2) * 0.04);
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(tx - L * 0.02, ty + L * 0.08);
      ctx.lineTo(tx + L * 0.02, ty + L * 0.08);
      ctx.closePath();
      ctx.fill();
    }
    ctx.fillStyle = "rgba(255, 60, 60, 0.9)";
    ctx.shadowColor = "rgba(255, 40, 40, 0.8)";
    ctx.shadowBlur = L * 0.12;
    ctx.beginPath();
    ctx.arc(L * 0.34, -L * 0.05, L * 0.075, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0a0202";
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(L * 0.36, -L * 0.05, L * 0.028, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  if (morph === "deepsea") {
    const isAngler = sid === "black_seadevil";
    const isEel = sid === "gulper_eel";
    const isIsopod = sid === "giant_isopod";
    ctx.fillStyle = body;
    if (isEel) {
      ctx.beginPath();
      ctx.moveTo(L * 0.5, -L * 0.08);
      ctx.quadraticCurveTo(L * 0.12, -L * 0.34, -L * 0.75, -L * 0.04);
      ctx.quadraticCurveTo(L * 0.04, L * 0.18, L * 0.5, L * 0.08);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = shade;
      ctx.beginPath();
      ctx.ellipse(L * 0.28, L * 0.02, L * 0.22, L * 0.18, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (isIsopod) {
      ctx.beginPath();
      ctx.ellipse(0, 0, L * 0.5, L * 0.28, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = shade;
      ctx.lineWidth = L * 0.03;
      for (let i = 0; i < 7; i++) {
        const x = L * (0.28 - i * 0.1);
        ctx.beginPath();
        ctx.moveTo(x, -L * 0.24);
        ctx.lineTo(x - L * 0.04, L * 0.24);
        ctx.stroke();
      }
      for (let s = -1; s <= 1; s += 2) {
        for (let i = 0; i < 5; i++) {
          const x = L * (0.26 - i * 0.12);
          ctx.beginPath();
          ctx.moveTo(x, s * L * 0.18);
          ctx.lineTo(x - L * 0.08, s * L * 0.35);
          ctx.stroke();
        }
      }
    } else {
      ctx.beginPath();
      ctx.moveTo(L * 0.5, 0);
      ctx.quadraticCurveTo(L * 0.18, -L * (isAngler ? 0.34 : 0.22), -L * 0.38, -L * 0.1);
      ctx.quadraticCurveTo(-L * 0.58, 0, -L * 0.36, L * 0.1);
      ctx.quadraticCurveTo(L * 0.12, L * (isAngler ? 0.3 : 0.2), L * 0.5, 0);
      ctx.closePath();
      ctx.fill();
      forkTail(isAngler ? 0.18 : 0.28);
    }
    ctx.strokeStyle = "rgba(210, 245, 255, 0.65)";
    ctx.lineWidth = Math.max(1, L * 0.018);
    if (isAngler) {
      ctx.beginPath();
      ctx.moveTo(L * 0.1, -L * 0.23);
      ctx.quadraticCurveTo(L * 0.26, -L * 0.58, L * 0.46, -L * 0.36);
      ctx.stroke();
      ctx.fillStyle = accent;
      ctx.shadowColor = accent;
      ctx.shadowBlur = L * 0.18;
      ctx.beginPath();
      ctx.arc(L * 0.48, -L * 0.35, L * 0.055, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.72;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.arc(L * (0.22 - i * 0.13), L * 0.1, L * 0.018, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#e0faff";
    ctx.beginPath();
    ctx.arc(L * 0.32, -L * 0.04, L * 0.06, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#020617";
    ctx.beginPath();
    ctx.arc(L * 0.34, -L * 0.04, L * 0.025, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  ctx.fillStyle = body;
  ctx.beginPath();
  ctx.ellipse(0, 0, L * 0.45, L * 0.26, 0, 0, Math.PI * 2);
  ctx.fill();
  forkTail(0.24);
  eye();
}

function drawFish(f) {
  if (f.caught) return;
  const spec = f.spec;
  const L = f.len;
  const facing = f.vx >= 0 ? 1 : -1;
  const body = spec.colors[0];
  const shade = spec.colors[1];
  const accent = spec.colors[2] || "#ffffff";
  const scary = isSkullShoalsPlay() && spec.morph === "skullfish";

  ctx.save();
  ctx.translate(f.x, f.y);
  ctx.rotate(Math.sin(f.phase) * (scary ? 0.12 : 0.08));
  ctx.scale(facing, 1);

  if (scary) {
    ctx.shadowColor = "rgba(255, 35, 35, 0.45)";
    ctx.shadowBlur = L * 0.2;
    ctx.filter = "brightness(0.78) contrast(1.2) saturate(0.85)";
  }

  drawFishMorph(spec.morph || "silverside", L, body, shade, accent, spec.id);

  if (scary) {
    ctx.filter = "none";
    ctx.shadowBlur = 0;
  }

  ctx.restore();
  f.phase += scary ? 0.09 : 0.06;
}

function drawClam() {
  const cx = clam.cx;
  const cy = clam.cy;
  const s = dpr * 1.06;
  const open = clam.phase === "open";
  const tilt = clam.currentTilt || 0;
  const globeTurn = Math.cos(clam.spinAngle || 0);
  const globeScaleX = Math.max(0.18, Math.abs(globeTurn));
  /* Hard-shell clam proportions: wide ventral margin, cool gray exterior (ref. open clam stock photography). */
  const hingeY = -32 * s;
  const ventral = 48 * s;
  const leftRot = open ? -0.44 : -0.012;
  const rightRot = open ? 0.44 : 0.012;

  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(tilt);
  ctx.scale(globeTurn < 0 ? -globeScaleX : globeScaleX, 1);

  ctx.fillStyle = "rgba(12, 22, 32, 0.26)";
  ctx.beginPath();
  ctx.ellipse(dpr * 4 * Math.sin((clam.spinAngle || 0) * 1.5), 10 * s, 68 * s, 13 * s, tilt * 0.18, 0, Math.PI * 2);
  ctx.fill();

  if (open) {
    const ix = -1 * s;
    const iy = hingeY + 28 * s;
    const mantle = ctx.createRadialGradient(ix - 8 * s, iy - 12 * s, 1.5 * s, ix + 2 * s, iy + 4 * s, 44 * s);
    mantle.addColorStop(0, "rgba(252, 251, 247, 0.98)");
    mantle.addColorStop(0.22, "rgba(236, 234, 228, 0.92)");
    mantle.addColorStop(0.48, "rgba(214, 210, 202, 0.72)");
    mantle.addColorStop(0.72, "rgba(185, 182, 174, 0.38)");
    mantle.addColorStop(0.88, "rgba(155, 148, 142, 0.18)");
    mantle.addColorStop(1, "rgba(110, 105, 98, 0)");
    ctx.fillStyle = mantle;
    ctx.beginPath();
    ctx.ellipse(ix, iy, 30 * s, 24 * s, 0.04, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(120, 116, 110, 0.42)";
    ctx.lineWidth = 0.85 * dpr;
    ctx.beginPath();
    ctx.ellipse(ix, iy, 24 * s, 18.5 * s, 0.04, 0, Math.PI * 2);
    ctx.stroke();
    ctx.strokeStyle = "rgba(200, 188, 178, 0.55)";
    ctx.lineWidth = 0.55 * dpr;
    ctx.beginPath();
    ctx.ellipse(ix - 1 * s, iy - 2 * s, 14 * s, 11 * s, 0.05, 0, Math.PI * 2);
    ctx.stroke();
  }

  function valvePath() {
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-6 * s, 3.5 * s, -34 * s, 13 * s, -43 * s, 26 * s);
    ctx.bezierCurveTo(-41 * s, 41 * s, -26 * s, ventral, 0, ventral);
    ctx.closePath();
  }

  function drawHalfValve(side) {
    const left = side === "left";
    const rot = left ? leftRot : rightRot;

    ctx.save();
    ctx.translate(0, hingeY);
    ctx.rotate(rot);
    if (!left) {
      ctx.scale(-1, 1);
    }

    ctx.beginPath();
    valvePath();

    const umboX = -11 * s;
    const umboY = 6 * s;
    const shellGrad = ctx.createRadialGradient(umboX - 5 * s, umboY - 3 * s, 2.5 * s, umboX, umboY + 20 * s, 56 * s);
    shellGrad.addColorStop(0, "#f2f1ed");
    shellGrad.addColorStop(0.12, "#e0ded8");
    shellGrad.addColorStop(0.28, "#c9c6bf");
    shellGrad.addColorStop(0.48, "#a8a49c");
    shellGrad.addColorStop(0.68, "#8a8680");
    shellGrad.addColorStop(0.85, "#6e6a65");
    shellGrad.addColorStop(1, "#4f4c48");
    ctx.fillStyle = shellGrad;
    ctx.fill();

    ctx.strokeStyle = "rgba(45, 44, 42, 0.32)";
    ctx.lineWidth = 1.2 * dpr;
    ctx.stroke();

    ctx.save();
    ctx.beginPath();
    valvePath();
    ctx.clip();
    const ridgeCx = -10 * s;
    const ridgeCy = 5 * s;
    for (let k = 1; k <= 12; k++) {
      const rr = k * 3.85 * s;
      const a0 = 0.52 * Math.PI;
      const a1 = 1.04 * Math.PI;
      ctx.beginPath();
      ctx.arc(ridgeCx, ridgeCy, rr, a0, a1);
      ctx.strokeStyle = `rgba(48, 46, 44, ${0.05 + k * 0.022})`;
      ctx.lineWidth = (0.4 + k * 0.05) * dpr;
      ctx.stroke();
    }
    ctx.restore();

    ctx.strokeStyle = "rgba(255, 255, 255, 0.28)";
    ctx.lineWidth = 0.75 * dpr;
    ctx.beginPath();
    ctx.moveTo(-2 * s, 2.5 * s);
    ctx.bezierCurveTo(-22 * s, 15 * s, -34 * s, 30 * s, -16 * s, ventral - 3 * s);
    ctx.stroke();

    ctx.strokeStyle = "rgba(165, 158, 150, 0.5)";
    ctx.lineWidth = 0.5 * dpr;
    ctx.beginPath();
    ctx.moveTo(-0.5 * s, 0.5 * s);
    ctx.bezierCurveTo(-19 * s, 13 * s, -30 * s, 28 * s, -8 * s, ventral - 1 * s);
    ctx.stroke();

    ctx.restore();
  }

  drawHalfValve("left");
  drawHalfValve("right");

  ctx.fillStyle = "#4a4540";
  ctx.beginPath();
  const hbw = 7 * s;
  const hbh = 5 * s;
  const hbx = -hbw;
  const hby = hingeY - 3 * s;
  const hbr = 2 * s;
  ctx.moveTo(hbx + hbr, hby);
  ctx.lineTo(hbx + hbw * 2 - hbr, hby);
  ctx.quadraticCurveTo(hbx + hbw * 2, hby, hbx + hbw * 2, hby + hbr);
  ctx.lineTo(hbx + hbw * 2, hby + hbh - hbr);
  ctx.quadraticCurveTo(hbx + hbw * 2, hby + hbh, hbx + hbw * 2 - hbr, hby + hbh);
  ctx.lineTo(hbx + hbr, hby + hbh);
  ctx.quadraticCurveTo(hbx, hby + hbh, hbx, hby + hbh - hbr);
  ctx.lineTo(hbx, hby + hbr);
  ctx.quadraticCurveTo(hbx, hby, hbx + hbr, hby);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgba(92, 88, 84, 0.95)";
  ctx.beginPath();
  ctx.ellipse(-3 * s, hingeY - 1 * s, 3 * s, 2 * s, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(3 * s, hingeY - 1 * s, 3 * s, 2 * s, 0, 0, Math.PI * 2);
  ctx.fill();

  if (!open) {
    ctx.strokeStyle = "rgba(52, 50, 48, 0.42)";
    ctx.lineWidth = 0.9 * dpr;
    ctx.beginPath();
    ctx.moveTo(0, hingeY + 2 * s);
    ctx.lineTo(0, ventral - 2 * s);
    ctx.stroke();
  }

  if (open) {
    const pr = clam.pearlR > 0 ? clam.pearlR : 10 * s;
    const pY = hingeY + 36 * s;

    const pg = ctx.createRadialGradient(-3 * s, pY - 4 * s, 0.8 * s, 0, pY, 22 * s);
    pg.addColorStop(0, "#fdfcfa");
    pg.addColorStop(0.22, "#f4f0e8");
    pg.addColorStop(0.48, "#e0d8cc");
    pg.addColorStop(0.72, "#c4b8a8");
    pg.addColorStop(0.9, "#9e8f7c");
    pg.addColorStop(1, "#6f6254");
    ctx.fillStyle = pg;
    ctx.shadowColor = "rgba(240, 236, 228, 0.55)";
    ctx.shadowBlur = 16 * dpr;
    ctx.beginPath();
    ctx.arc(0, pY, pr, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
    ctx.beginPath();
    ctx.arc(-3.2 * s, pY - 3.5 * s, 2.6 * s, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255, 255, 255, 0.32)";
    ctx.beginPath();
    ctx.arc(2 * s, pY + 2 * s, 1.3 * s, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

/** Treasure chest on the jackpot crab (local space: origin = crab center). */
function drawTreasureChestInCrabSpace(sc, lidOpen = 0) {
  const chestCx = 0;
  const chestTop = -56 * sc;
  const cw = 40 * sc;
  const ch = 26 * sc;
  const x0 = chestCx - cw * 0.5;
  const y0 = chestTop;
  const rr = Math.min(3 * sc, cw * 0.18, ch * 0.22);
  const goldTop = ctx.createLinearGradient(x0, y0, x0 + cw, y0 + ch);
  goldTop.addColorStop(0, "#fde68a");
  goldTop.addColorStop(0.25, "#fbbf24");
  goldTop.addColorStop(0.5, "#f59e0b");
  goldTop.addColorStop(0.78, "#d97706");
  goldTop.addColorStop(1, "#b45309");
  ctx.fillStyle = goldTop;
  ctx.strokeStyle = "#78350f";
  ctx.lineWidth = 1.5 * sc;
  ctx.beginPath();
  ctx.moveTo(x0 + rr, y0);
  ctx.lineTo(x0 + cw - rr, y0);
  ctx.quadraticCurveTo(x0 + cw, y0, x0 + cw, y0 + rr);
  ctx.lineTo(x0 + cw, y0 + ch - rr);
  ctx.quadraticCurveTo(x0 + cw, y0 + ch, x0 + cw - rr, y0 + ch);
  ctx.lineTo(x0 + rr, y0 + ch);
  ctx.quadraticCurveTo(x0, y0 + ch, x0, y0 + ch - rr);
  ctx.lineTo(x0, y0 + rr);
  ctx.quadraticCurveTo(x0, y0, x0 + rr, y0);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  const lidH = 9 * sc;
  const hingeY = y0 + lidH;

  if (lidOpen < 1) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, 1 - lidOpen * 1.35);
    ctx.fillStyle = "#451a03";
    ctx.beginPath();
    ctx.arc(chestCx, y0 + ch * 0.42, 3.2 * sc, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255, 250, 220, 0.9)";
    ctx.beginPath();
    ctx.arc(chestCx - 0.9 * sc, y0 + ch * 0.4, 1 * sc, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  ctx.save();
  ctx.translate(chestCx, hingeY);
  ctx.rotate(-lidOpen * 2.05);
  ctx.translate(-chestCx, -hingeY);
  ctx.fillStyle = "#fcd34d";
  ctx.beginPath();
  ctx.moveTo(x0 - 1.5 * sc, y0 + lidH);
  ctx.lineTo(chestCx - cw * 0.42, y0 - 2 * sc);
  ctx.quadraticCurveTo(chestCx, y0 - 5 * sc, chestCx + cw * 0.42, y0 - 2 * sc);
  ctx.lineTo(x0 + cw + 1.5 * sc, y0 + lidH);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#92400e";
  ctx.lineWidth = 1.2 * sc;
  ctx.stroke();
  ctx.restore();

  if (lidOpen < 0.92) {
    ctx.strokeStyle = "rgba(120, 53, 15, 0.55)";
    ctx.lineWidth = 1.1 * sc;
    ctx.beginPath();
    ctx.moveTo(x0 + 4 * sc, y0 + lidH + 2 * sc);
    ctx.lineTo(x0 + cw - 4 * sc, y0 + lidH + 2 * sc);
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
  ctx.beginPath();
  ctx.ellipse(chestCx - 8 * sc, y0 + ch * 0.35, 8 * sc, 4 * sc, -0.25, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(185, 120, 20, 0.65)";
  ctx.lineWidth = 1 * sc;
  ctx.beginPath();
  ctx.moveTo(x0 + 3 * sc, y0 + ch * 0.55);
  ctx.lineTo(x0 + cw - 3 * sc, y0 + ch * 0.55);
  ctx.stroke();

  if (lidOpen > 0.35) {
    const glow = (lidOpen - 0.35) / 0.65;
    ctx.save();
    ctx.globalAlpha = glow * 0.55;
    ctx.fillStyle = "rgba(255, 230, 140, 0.85)";
    ctx.beginPath();
    ctx.ellipse(chestCx, y0 + ch * 0.2, cw * 0.38, ch * 0.45, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawJackpotCrabChestArms(sc) {
  const chestTop = -56 * sc;
  const cw = 40 * sc;
  const ch = 26 * sc;
  const gripY = chestTop + ch * 0.72;
  const gripLX = -cw * 0.5;
  const gripRX = cw * 0.5;

  function drawRaisedArm(side) {
    const sx = side;
    const shx = sx * 18 * sc;
    const shy = -6 * sc;
    const midX = sx * 36 * sc;
    const midY = -40 * sc;
    const gx = sx > 0 ? gripRX : gripLX;
    const gy = gripY;
    ctx.strokeStyle = "#b91c1c";
    ctx.lineWidth = 5.2 * sc;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(shx, shy);
    ctx.quadraticCurveTo(midX, midY, gx, gy);
    ctx.stroke();
    ctx.strokeStyle = "#7f1d1d";
    ctx.lineWidth = 2.8 * sc;
    ctx.beginPath();
    ctx.moveTo(shx, shy);
    ctx.quadraticCurveTo(midX, midY, gx, gy);
    ctx.stroke();

    const ang = Math.atan2(gy - midY, gx - midX);
    const cx = gx + Math.cos(ang + sx * 0.5) * 5 * sc;
    const cy = gy + Math.sin(ang + sx * 0.5) * 5 * sc;
    ctx.fillStyle = "#dc2626";
    ctx.beginPath();
    ctx.ellipse(cx, cy, 9 * sc, 6.5 * sc, ang, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.ellipse(cx + Math.cos(ang + sx * 0.9) * 4 * sc, cy + Math.sin(ang + sx * 0.9) * 4 * sc, 5 * sc, 3.8 * sc, ang + sx * 0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#7f1d1d";
    ctx.lineWidth = 0.95 * sc;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 9 * sc, 6.5 * sc, ang, 0, Math.PI * 2);
    ctx.stroke();
  }

  drawRaisedArm(-1);
  drawRaisedArm(1);
}

function drawTreasureChestCinematic() {
  const c = treasureChestCinematic;
  if (!c || c.phase === "map" || w <= 0) return;
  const now = performance.now();
  const elapsed = now - c.startedAt;
  const dim = Math.min(0.88, (elapsed / 520) * 0.88);
  ctx.fillStyle = `rgba(2, 8, 18, ${dim})`;
  ctx.fillRect(0, 0, w, h);

  const glow = c.glowPulse || 0;
  const spotR = Math.max(w, h) * (0.28 + glow * 0.12);
  const spot = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, spotR);
  spot.addColorStop(0, `rgba(255, 213, 74, ${0.22 + glow * 0.28})`);
  spot.addColorStop(0.45, `rgba(255, 180, 50, ${0.08 + glow * 0.12})`);
  spot.addColorStop(1, "rgba(2, 8, 18, 0)");
  ctx.fillStyle = spot;
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < 3; i++) {
    const ringT = ((elapsed / 900) + i * 0.33) % 1;
    const ringR = (40 + ringT * 120) * dpr * c.scale;
    ctx.strokeStyle = `rgba(255, 213, 74, ${(1 - ringT) * 0.55 * glow})`;
    ctx.lineWidth = (3 - ringT * 1.5) * dpr;
    ctx.beginPath();
    ctx.arc(c.x, c.y, ringR, 0, Math.PI * 2);
    ctx.stroke();
  }

  const showBanner = c.phase !== "anticipate" || elapsed > TREASURE_CINEMATIC_ANTICIPATE_MS * 0.45;
  if (showBanner) {
    let bannerAlpha = 0;
    if (c.phase === "anticipate") {
      bannerAlpha = Math.min(1, (elapsed - TREASURE_CINEMATIC_ANTICIPATE_MS * 0.45) / 400);
    } else if (c.phase === "fly") {
      bannerAlpha = Math.min(1, (now - c.flyStartedAt) / 600);
    } else {
      bannerAlpha = 0.92 + Math.sin(now * 0.006) * 0.08;
    }
    const titleSize = Math.round((26 + glow * 8) * dpr);
    const subSize = Math.round(13 * dpr);
    ctx.save();
    ctx.textAlign = "center";
    ctx.shadowColor = "rgba(255, 213, 74, 0.85)";
    ctx.shadowBlur = 22 * dpr;
    ctx.font = `400 ${Math.round(11 * dpr)}px "Bebas Neue", sans-serif`;
    ctx.fillStyle = `rgba(255, 248, 200, ${bannerAlpha * 0.9})`;
    ctx.fillText("★  TREASURE MAP FOUND  ★", w * 0.5, h * 0.13);
    ctx.font = `400 ${titleSize}px "Bebas Neue", sans-serif`;
    ctx.fillStyle = `rgba(255, 213, 74, ${bannerAlpha})`;
    ctx.fillText("ADVENTURE MODE UNLOCKED!", w * 0.5, h * 0.13 + titleSize * 1.15);
    ctx.shadowBlur = 10 * dpr;
    ctx.font = `400 ${subSize}px system-ui, sans-serif`;
    ctx.fillStyle = `rgba(200, 230, 255, ${bannerAlpha * 0.85})`;
    ctx.fillText("Pirates Path · Gold Quest · Frozen Sea", w * 0.5, h * 0.13 + titleSize * 1.15 + subSize * 1.6);
    ctx.restore();
  }

  ctx.save();
  ctx.translate(c.x, c.y);
  ctx.scale(c.scale * c.facing, c.scale);
  drawTreasureChestInCrabSpace(c.sc, c.lidOpen);
  ctx.restore();
}

function drawJackpotSkeletonCrabChestArms(sc) {
  const chestTop = -56 * sc;
  const cw = 40 * sc;
  const ch = 26 * sc;
  const gripY = chestTop + ch * 0.72;
  const gripLX = -cw * 0.5;
  const gripRX = cw * 0.5;
  const bone = "#ddd5c8";
  const shade = "#9a9088";

  function drawBoneArm(side) {
    const sx = side;
    const shx = sx * 18 * sc;
    const shy = -6 * sc;
    const midX = sx * 36 * sc;
    const midY = -40 * sc;
    const gx = sx > 0 ? gripRX : gripLX;
    const gy = gripY;
    drawLongBone(shx, shy, midX, midY, 4.2 * sc, bone, shade);
    drawLongBone(midX, midY, gx, gy, 3.4 * sc, bone, shade);
    drawBoneJoint(midX, midY, 2.8 * sc, bone, shade);

    const ang = Math.atan2(gy - midY, gx - midX);
    const cx = gx + Math.cos(ang + sx * 0.5) * 5 * sc;
    const cy = gy + Math.sin(ang + sx * 0.5) * 5 * sc;
    ctx.fillStyle = bone;
    ctx.strokeStyle = shade;
    ctx.lineWidth = 0.95 * sc;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 8 * sc, 5.5 * sc, ang, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    const px = cx + Math.cos(ang + sx * 0.85) * 7 * sc;
    const py = cy + Math.sin(ang + sx * 0.85) * 7 * sc;
    drawLongBone(cx, cy, px, py, 2.2 * sc, bone, shade);
    drawLongBone(cx, cy, cx + Math.cos(ang - sx * 0.55) * 8 * sc, cy + Math.sin(ang - sx * 0.55) * 8 * sc, 2 * sc, bone, shade);
  }

  drawBoneArm(-1);
  drawBoneArm(1);
}

function drawJackpotSkeletonCrab(sc, leg) {
  const bone = "#e0d8cc";
  const shade = "#a89888";
  const boneDark = "#6a6058";
  const swing = (i, m) => Math.sin(leg * m + i * 1.1) * 0.2;

  ctx.fillStyle = "rgba(20, 12, 16, 0.28)";
  ctx.beginPath();
  ctx.ellipse(0, 7 * sc, 42 * sc, 10 * sc, 0.03, 0, Math.PI * 2);
  ctx.fill();

  function drawBoneLeg(side, idx) {
    const sx = side;
    const bx = sx * (15 + idx * 5.5) * sc;
    const by = (0 + idx * 2.6) * sc;
    const s1 = swing(idx + side * 2, 1.12);
    const s2 = swing(idx + side * 2 + 0.5, 0.92);
    const a1 = (side > 0 ? 0.38 : Math.PI - 0.38) + s1;
    const a2 = a1 + (side > 0 ? 0.52 : -0.52) + s2;
    const l1 = 13 * sc;
    const l2 = 15 * sc;
    const j1x = bx + Math.cos(a1) * l1;
    const j1y = by + Math.sin(a1) * l1;
    const j2x = j1x + Math.cos(a2) * l2;
    const j2y = j1y + Math.sin(a2) * l2;
    drawLongBone(bx, by, j1x, j1y, (2.1 - idx * 0.12) * sc, bone, shade);
    drawLongBone(j1x, j1y, j2x, j2y, (1.7 - idx * 0.1) * sc, bone, shade);
    drawBoneJoint(j1x, j1y, 1.4 * sc, bone, shade);
  }
  for (const side of [-1, 1]) {
    for (let i = 0; i < 4; i++) drawBoneLeg(side, i);
  }

  const shellGrad = ctx.createRadialGradient(-6 * sc, -12 * sc, 2 * sc, 8 * sc, 4 * sc, 36 * sc);
  shellGrad.addColorStop(0, "#ece4d8");
  shellGrad.addColorStop(0.4, bone);
  shellGrad.addColorStop(0.75, shade);
  shellGrad.addColorStop(1, boneDark);
  ctx.fillStyle = shellGrad;
  ctx.beginPath();
  ctx.moveTo(0, -20 * sc);
  ctx.quadraticCurveTo(14 * sc, -22 * sc, 24 * sc, -14 * sc);
  ctx.quadraticCurveTo(30 * sc, 0, 26 * sc, 9 * sc);
  ctx.quadraticCurveTo(14 * sc, 11 * sc, 0, 10 * sc);
  ctx.quadraticCurveTo(-14 * sc, 11 * sc, -26 * sc, 9 * sc);
  ctx.quadraticCurveTo(-30 * sc, 0, -24 * sc, -14 * sc);
  ctx.quadraticCurveTo(-14 * sc, -22 * sc, 0, -20 * sc);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = boneDark;
  ctx.lineWidth = 1.2 * sc;
  ctx.stroke();

  ctx.strokeStyle = "rgba(80, 70, 62, 0.45)";
  ctx.lineWidth = 0.9 * sc;
  for (let r = -2; r <= 2; r++) {
    ctx.beginPath();
    ctx.moveTo(r * 5 * sc, -16 * sc);
    ctx.quadraticCurveTo(r * 7 * sc, -4 * sc, r * 4 * sc, 8 * sc);
    ctx.stroke();
  }

  function boneEyeStalk(ex) {
    drawLongBone(ex * 0.45, -14 * sc, ex, -22 * sc, 2 * sc, bone, shade);
    ctx.fillStyle = boneDark;
    ctx.beginPath();
    ctx.arc(ex, -23 * sc, 2.8 * sc, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255, 50, 50, 0.85)";
    ctx.shadowColor = "rgba(255, 40, 40, 0.6)";
    ctx.shadowBlur = 4 * sc;
    ctx.beginPath();
    ctx.arc(ex, -23 * sc, 1.4 * sc, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
  boneEyeStalk(-7 * sc);
  boneEyeStalk(7 * sc);

  ctx.fillStyle = boneDark;
  ctx.beginPath();
  ctx.moveTo(-4 * sc, -6 * sc);
  ctx.lineTo(0, -2 * sc);
  ctx.lineTo(4 * sc, -6 * sc);
  ctx.lineTo(0, -4 * sc);
  ctx.closePath();
  ctx.fill();
}

function drawJackpotCrab() {
  if (!jackpotCrab?.active || treasureChestCinematic || w <= 0) return;
  const x = jackpotCrab.active.x;
  const y = jackpotCrab.active.y;
  const facing = jackpotCrab.active.vx >= 0 ? 1 : -1;
  const leg = jackpotCrab.active.legT;
  const sc = dpr * 1.05;
  const skeletonCrab = getActiveAdventureTheme() === "skull-shoals";

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(facing, 1);

  if (skeletonCrab) {
    drawJackpotSkeletonCrab(sc, leg);
    drawTreasureChestInCrabSpace(sc, 0);
    drawJackpotSkeletonCrabChestArms(sc);
    ctx.restore();
    return;
  }

  const swing = (i, m) => Math.sin(leg * m + i * 1.1) * 0.2;

  ctx.fillStyle = "rgba(8, 12, 18, 0.2)";
  ctx.beginPath();
  ctx.ellipse(0, 7 * sc, 42 * sc, 10 * sc, 0.03, 0, Math.PI * 2);
  ctx.fill();

  function drawWalkingLeg(side, idx) {
    const sx = side;
    const bx = sx * (15 + idx * 5.5) * sc;
    const by = (0 + idx * 2.6) * sc;
    const s1 = swing(idx + side * 2, 1.12);
    const s2 = swing(idx + side * 2 + 0.5, 0.92);
    const a1 = (side > 0 ? 0.38 : Math.PI - 0.38) + s1;
    const a2 = a1 + (side > 0 ? 0.52 : -0.52) + s2;
    const l1 = 13 * sc;
    const l2 = 15 * sc;
    const j1x = bx + Math.cos(a1) * l1;
    const j1y = by + Math.sin(a1) * l1;
    ctx.strokeStyle = idx < 2 ? "#7f1d1d" : "#991b1b";
    ctx.lineWidth = (2.05 - idx * 0.12) * sc;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(bx, by);
    ctx.lineTo(j1x, j1y);
    ctx.lineTo(j1x + Math.cos(a2) * l2, j1y + Math.sin(a2) * l2);
    ctx.stroke();
  }
  for (const side of [-1, 1]) {
    for (let i = 0; i < 4; i++) drawWalkingLeg(side, i);
  }

  const capGrad = ctx.createRadialGradient(-6 * sc, -12 * sc, 2 * sc, 8 * sc, 4 * sc, 36 * sc);
  capGrad.addColorStop(0, "#f87171");
  capGrad.addColorStop(0.35, "#ef4444");
  capGrad.addColorStop(0.65, "#dc2626");
  capGrad.addColorStop(1, "#991b1b");
  ctx.fillStyle = capGrad;
  ctx.beginPath();
  ctx.moveTo(0, -20 * sc);
  ctx.quadraticCurveTo(14 * sc, -22 * sc, 24 * sc, -14 * sc);
  ctx.quadraticCurveTo(30 * sc, 0, 26 * sc, 9 * sc);
  ctx.quadraticCurveTo(14 * sc, 11 * sc, 0, 10 * sc);
  ctx.quadraticCurveTo(-14 * sc, 11 * sc, -26 * sc, 9 * sc);
  ctx.quadraticCurveTo(-30 * sc, 0, -24 * sc, -14 * sc);
  ctx.quadraticCurveTo(-14 * sc, -22 * sc, 0, -20 * sc);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#7f1d1d";
  ctx.lineWidth = 1.35 * sc;
  ctx.stroke();

  function eyeStalk(ex) {
    ctx.strokeStyle = "#7f1d1d";
    ctx.lineWidth = 2 * sc;
    ctx.beginPath();
    ctx.moveTo(ex * 0.45, -14 * sc);
    ctx.lineTo(ex, -22 * sc);
    ctx.stroke();
    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.arc(ex, -23 * sc, 2.5 * sc, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.beginPath();
    ctx.arc(ex - 0.7 * sc, -23.4 * sc, 0.85 * sc, 0, Math.PI * 2);
    ctx.fill();
  }
  eyeStalk(-7 * sc);
  eyeStalk(7 * sc);

  drawTreasureChestInCrabSpace(sc, 0);
  drawJackpotCrabChestArms(sc);

  ctx.restore();
}

function drawHookLine() {
  const hx = hook.x;
  const hy = hook.tipY;
  const topY = lineAnchorY();
  const v = selectedRod.visual;

  const reelW = 14 * dpr;
  const reelH = 7 * dpr;
  const rg = ctx.createLinearGradient(hx - reelW, topY - reelH, hx + reelW, topY + reelH * 0.5);
  rg.addColorStop(0, v.reelBody);
  rg.addColorStop(0.5, v.reelBand);
  rg.addColorStop(1, v.reelBody);
  ctx.fillStyle = rg;
  ctx.beginPath();
  ctx.ellipse(hx, topY - dpr * 3.2, reelW * 0.48, reelH * 1.15, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.28)";
  ctx.lineWidth = 1 * dpr;
  ctx.stroke();

  ctx.strokeStyle = v.lineMain;
  ctx.lineWidth = v.lineW * dpr;
  ctx.beginPath();
  ctx.moveTo(hx, topY);
  ctx.lineTo(hx, hy);
  ctx.stroke();

  if (isKrakenBiting() && kraken) {
    const L = kraken.len;
    const f = kraken.biteFacing;
    const mx = kraken.x + f * L * 0.12;
    const my = kraken.y - L * 0.88;
    const t = performance.now() * 0.0038;
    const w = Math.sin(t * 9) * dpr * 6;
    ctx.strokeStyle = "rgba(120, 22, 18, 0.92)";
    ctx.lineWidth = (v.lineW + 0.65) * dpr;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(hx, hy);
    const midx = (hx + mx) * 0.5 + w;
    const midy = (hy + my) * 0.5 - Math.cos(t * 7.5) * dpr * 5;
    ctx.quadraticCurveTo(midx, midy, mx, my);
    ctx.stroke();
    ctx.strokeStyle = "rgba(255, 210, 200, 0.4)";
    ctx.lineWidth = v.sheenW * dpr;
    ctx.beginPath();
    ctx.moveTo(hx - dpr * 0.85, hy);
    ctx.quadraticCurveTo(midx - dpr * 1.2, midy, mx - f * dpr * 5, my - dpr * 2);
    ctx.stroke();
  }

  ctx.strokeStyle = v.lineSheen;
  ctx.lineWidth = v.sheenW * dpr;
  ctx.beginPath();
  ctx.moveTo(hx - dpr * 0.85, topY);
  ctx.lineTo(hx - dpr * 0.85, hy);
  ctx.stroke();

  const pulse = hook.snagPulse > 0 ? 1.28 : 1;
  const R = effectiveCatchRadiusBasePx() * pulse;
  ctx.strokeStyle = hook.snagPulse > 0 ? v.ringSnag : v.ringIdle;
  ctx.lineWidth = 2 * dpr;
  ctx.beginPath();
  ctx.arc(hx, hy, R, 0, Math.PI * 2);
  ctx.stroke();

  const hs = v.hookScale;
  const tipGlow = ctx.createRadialGradient(hx, hy + dpr * 12, 0, hx, hy + dpr * 12, dpr * 22 * hs);
  tipGlow.addColorStop(0, v.tipGlow);
  tipGlow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = tipGlow;
  ctx.beginPath();
  ctx.arc(hx, hy + dpr * 12, dpr * 18 * hs, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = v.hookBarb;
  ctx.beginPath();
  ctx.moveTo(hx, hy);
  ctx.lineTo(hx - dpr * 6 * hs, hy + dpr * 14 * hs);
  ctx.lineTo(hx + dpr * 6 * hs, hy + dpr * 14 * hs);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = v.hookMetal;
  ctx.beginPath();
  ctx.arc(hx, hy + dpr * 15 * hs, dpr * 3.2 * hs, 0, Math.PI * 2);
  ctx.fill();

  if (getReef().id === "mariana_trench") {
    const lightMult = effectiveTrenchLightMult();
    ctx.fillStyle = "#bff7ff";
    ctx.shadowColor = "#67e8f9";
    ctx.shadowBlur = 22 * dpr * Math.min(2.2, lightMult);
    ctx.beginPath();
    ctx.arc(hx, hy + dpr * 8 * hs, dpr * 5.8 * hs * Math.min(1.55, lightMult), 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(190, 255, 255, 0.62)";
    ctx.lineWidth = 1.5 * dpr;
    ctx.beginPath();
    ctx.arc(hx, hy + dpr * 8 * hs, dpr * 12 * hs * Math.min(1.9, lightMult), 0, Math.PI * 2);
    ctx.stroke();
  }
}

function drawTrenchRodLight() {
  if (getReef().id !== "mariana_trench") return;
  const hx = hook.x;
  const hy = hookTipY();
  const lampY = hy + dpr * 8;
  const lightMult = effectiveTrenchLightMult();
  const radius = Math.max(92 * dpr, Math.min(w, h) * 0.18) * lightMult;
  const glowBoost = Math.min(1, Math.max(0, (lightMult - 1) / 2.2));
  if (PERF_CHROMEBOOK) {
    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.82)";
    ctx.fillRect(0, 0, w, h);
    const glow = ctx.createRadialGradient(hx, lampY, 0, hx, lampY, radius * 0.5);
    glow.addColorStop(0, `rgba(190, 255, 255, ${0.38 + glowBoost * 0.2})`);
    glow.addColorStop(1, "rgba(45, 212, 191, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(hx, lampY, radius * 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    return;
  }
  const darkness = ctx.createRadialGradient(hx, lampY, radius * 0.12, hx, lampY, radius);
  darkness.addColorStop(0, "rgba(0, 0, 0, 0)");
  darkness.addColorStop(0.34, `rgba(0, 0, 0, ${0.22 - glowBoost * 0.08})`);
  darkness.addColorStop(0.62, `rgba(0, 0, 0, ${0.74 - glowBoost * 0.18})`);
  darkness.addColorStop(1, `rgba(0, 0, 0, ${0.98 - glowBoost * 0.12})`);
  ctx.save();
  ctx.fillStyle = darkness;
  ctx.fillRect(0, 0, w, h);

  const glow = ctx.createRadialGradient(hx, lampY, 0, hx, lampY, radius * 0.45);
  glow.addColorStop(0, `rgba(190, 255, 255, ${0.34 + glowBoost * 0.22})`);
  glow.addColorStop(0.55, `rgba(45, 212, 191, ${0.1 + glowBoost * 0.12})`);
  glow.addColorStop(1, "rgba(45, 212, 191, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(hx, lampY, radius * 0.45, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(190, 255, 255, 0.72)";
  ctx.lineWidth = 2 * dpr;
  ctx.beginPath();
  ctx.arc(hx, lampY, dpr * 8, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function updateFish(dt) {
  const t = performance.now();
  for (const f of fishList) {
    if (f.caught) continue;
    f.x += f.vx * (dt / 16) * 1.2;
  }
  fishList = fishList.filter((f) => {
    if (f.caught && f.removeAt && t >= f.removeAt) return false;
    if (f.caught) return true;
    if (f.x < -f.len * 2 || f.x > w + f.len * 2) return false;
    return true;
  });
}

function updateHook(dt) {
  const biting = isKrakenBiting();
  if (!biting) {
    if (hook.castState === "down") {
      hook.castTimer += dt;
      const t = Math.min(1, hook.castTimer / effectiveCastDownMs());
      const smooth = t * t * (3 - 2 * t);
      hook.tipY = hook.castFromY + (hook.castToY - hook.castFromY) * smooth;
      const megHit = tryCatchKraken({ casting: true });
      if (!megHit) tryCatchFish({ casting: true });
      if (!megHit) tryCatchJackpotCrab(performance.now());
      if (t >= 1) {
        hook.snagPulse = 300;
        const megHit2 = tryCatchKraken({ casting: true });
        if (!megHit2) tryCatchFish({ casting: true });
        if (!megHit2) tryCatchJackpotCrab(performance.now());
        hook.castState = "up";
        hook.castTimer = 0;
        hook.castFromY = hook.tipY;
        hook.castRiseTargetY = surfaceTipY();
      }
    } else if (hook.castState === "up") {
      hook.castTimer += dt;
      const t = Math.min(1, hook.castTimer / effectiveCastUpMs());
      const ease = 1 - (1 - t) * (1 - t);
      hook.tipY = hook.castFromY + (hook.castRiseTargetY - hook.castFromY) * ease;
      if (t >= 1) {
        hook.castState = "idle";
        hook.castTimer = 0;
      }
    } else {
      hook.tipY = surfaceTipY();
    }
  } else {
    hook.tipY = hook.krakenBiteTipY;
  }

  const k = dt / 16;
  const follow = 1 - Math.pow(0.5, k);
  hook.x += (hook.targetX - hook.x) * Math.min(1, follow * 2.35);
  if (Math.abs(hook.targetX - hook.x) < dpr * 16) {
    hook.x = hook.targetX;
  }
  const margin = dpr * 16;
  hook.x = Math.max(margin, Math.min(w - margin, hook.x));

  hook.y = hook.tipY;
  if (hook.snagPulse > 0) hook.snagPulse -= dt;
}

function updateClam(dt) {
  const reef = getReef();
  const flow = 0.000036 + reef.fishSpeed * 0.000012;
  clam.flowAccum += dt * flow;
  clam.driftPhase += dt * 0.000075;
  clam.edgeWander += dt * 0.000014;
  clam.spinAngle = (clam.spinAngle + dt * 0.00016) % (Math.PI * 2);
  const s = dpr * 1.06;
  const halfShell = 74 * s;
  const margin = 56 * dpr;
  const amp = Math.max(dpr * 62, w * 0.52 - margin);
  const longCurrent = Math.sin(clam.flowAccum * 0.62) * amp * 0.32 + Math.sin(clam.flowAccum * 0.09) * amp * 0.2;
  const eddy = Math.sin(clam.driftPhase) * amp * 0.38 + Math.sin(clam.driftPhase * 0.31 + 1.2) * amp * 0.16 + Math.sin(clam.driftPhase * 1.85 + 0.4) * amp * 0.08;
  const sweep = Math.sin(clam.edgeWander) * (w * 0.34 + halfShell * 1.1);
  clam.cx = w * 0.5 + sweep + longCurrent * 0.48 + eddy * 0.56;
  clam.cx = Math.max(-halfShell * 0.85, Math.min(w + halfShell * 0.85, clam.cx));
  const surgeY = Math.sin(clam.driftPhase * 0.38 + 0.5) * dpr * 8 + Math.sin(clam.flowAccum * 1.15) * dpr * 4;
  clam.cy = h - dpr * 36 + surgeY;
  clam.currentTilt = Math.max(
    -0.12,
    Math.min(0.12, Math.sin(clam.driftPhase * 0.51) * 0.08 + Math.sin(clam.flowAccum * 0.73) * 0.055 + Math.sin(clam.driftPhase * 1.9) * 0.025),
  );

  clam.timer -= dt;
  if (clam.timer <= 0) {
    if (clam.phase === "open") {
      clam.phase = "closed";
      clam.timer = CLAM_CLOSED_MS;
    } else {
      clam.phase = "open";
      clam.timer = CLAM_OPEN_MS;
    }
  }
  const clamS = dpr * 1.06;
  const hingeTop = -32 * clamS;
  if (clam.phase === "open") {
    clam.pearlR = 6.5 * clamS;
    clam.pearlWorldY = clam.cy + hingeTop + 36 * clamS;
  } else {
    clam.pearlR = 0;
    clam.pearlWorldY = 0;
  }
}

let gameLoopTick = 0;

function gameLoopFrameDt(now) {
  const raw = Math.max(0, now - (gameLoop.prev || now));
  gameLoop.prev = now;
  if (!PERF_CHROMEBOOK) return Math.min(40, raw);
  return Math.min(playing ? 150 : 50, raw);
}

function gameLoop(now) {
  gameLoopTick++;
  const dt = gameLoopFrameDt(now);

  if (toastTimer > 0) {
    toastTimer -= dt;
    if (toastTimer <= 0) toastEl.hidden = true;
  }

  updateCelebration(dt);

  ctx.clearRect(0, 0, w, h);
  drawCachedBackground();
  if (adventureSession) drawAdventureThemeOverlay(now);
  const bubbleFrame = PERF_CHROMEBOOK ? 2 : 2;
  if (!PERF_CHROMEBOOK || gameLoopTick % bubbleFrame === 0) drawBubbles(treasureMapRevealPaused ? 0 : dt);
  if (!treasureMapRevealPaused) updateJackpotCrab(now, dt);

  if (playing && treasureMapRevealPaused) {
    roundEndAt += dt;
    updateTreasureChestCinematic(now);
  }

  if (playing) {
    tickKraken(now, treasureMapRevealPaused ? 0 : dt);
    const left = roundEndAt - now;
    timeDisplay.textContent = formatTime(left);
    if (left <= 0) {
      endRound();
    } else {
      if (!treasureMapRevealPaused) {
        spawnAcc += dt;
        const reef = getReef();
        const maxFish = PERF_CHROMEBOOK
          ? Math.max(6, Math.floor(reef.maxFish * (adventureSession ? 0.78 : 0.65)))
          : reef.maxFish;
        if (spawnAcc >= nextSpawnIn && countUncaughtFish() < maxFish) {
          spawnFish();
          spawnAcc = 0;
          nextSpawnIn = rollNextSpawnDelay(reef);
        }
        updateFish(dt);
        updateHook(dt);
      }
      drawKraken();
      drawJackpotCrab();
      for (const f of fishList) drawFish(f);
      drawBoatHullAndCatchNet();
      drawHookLine();
      drawReleasedFishJumpFx();
      drawTrenchRodLight();
      drawCatchFlash();
      drawTreasureChestCinematic();
      drawCelebration();
    }
  } else {
    if (w > 0) {
      hook.tipY = surfaceTipY();
    }
    drawJackpotCrab();
    drawBoatHullAndCatchNet();
    drawHookLine();
    drawTrenchRodLight();
    drawCatchFlash();
    drawCelebration();
  }

  requestAnimationFrame(gameLoop);
}

// --- Pointer ---
function clientToCanvas(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const x = ((clientX - rect.left) / rect.width) * w;
  return x;
}

function setHookTargetX(clientX) {
  const margin = dpr * 16;
  const x = clientToCanvas(clientX, 0);
  hook.targetX = Math.max(margin, Math.min(w - margin, x));
}

function isTouchControlsPreferred() {
  return typeof window.matchMedia === "function" && window.matchMedia("(pointer: coarse)").matches;
}

function isTouchAimEvent(e) {
  return e.pointerType === "touch";
}

function beginTouchAim(pointerId, clientX, clientY) {
  touchAim = {
    pointerId,
    startX: clientX,
    startY: clientY,
    lastX: clientX,
    lastY: clientY,
    moved: false,
  };
}

function updateTouchAim(pointerId, clientX, clientY) {
  if (!touchAim || touchAim.pointerId !== pointerId) return false;
  touchAim.lastX = clientX;
  touchAim.lastY = clientY;
  const dx = clientX - touchAim.startX;
  const dy = clientY - touchAim.startY;
  const movedDistance = Math.hypot(dx, dy);
  if (movedDistance > TOUCH_TAP_CAST_MAX_MOVE_PX) touchAim.moved = true;
  return touchAim.moved;
}

function finishTouchAim(pointerId, clientX, clientY) {
  if (!touchAim || touchAim.pointerId !== pointerId) return false;
  updateTouchAim(pointerId, clientX, clientY);
  const shouldCast = !touchAim.moved;
  touchAim = null;
  if (shouldCast) startCast();
  return shouldCast;
}

canvas.addEventListener("pointerdown", (e) => {
  if (!playing || isGameplayFrozen()) return;
  try {
    canvas.setPointerCapture(e.pointerId);
  } catch (_) {
    /* ignore if capture not supported */
  }
  setHookTargetX(e.clientX);
  hook.x = hook.targetX;
  if (isTouchAimEvent(e)) {
    e.preventDefault();
    beginTouchAim(e.pointerId, e.clientX, e.clientY);
  }
});

canvas.addEventListener("pointermove", (e) => {
  if (!playing || isGameplayFrozen()) return;
  if (e.pointerType === "mouse" && e.buttons !== 1) return;
  if (isTouchAimEvent(e)) e.preventDefault();
  setHookTargetX(e.clientX);
  if (isTouchAimEvent(e)) updateTouchAim(e.pointerId, e.clientX, e.clientY);
});

function releaseCanvasPointer(e) {
  try {
    if (typeof canvas.hasPointerCapture === "function" && canvas.hasPointerCapture(e.pointerId)) {
      canvas.releasePointerCapture(e.pointerId);
    }
  } catch (_) {
    /* ignore */
  }
}

canvas.addEventListener("pointerup", (e) => {
  releaseCanvasPointer(e);
  if (!playing || isGameplayFrozen()) return;
  setHookTargetX(e.clientX);
  if (isTouchAimEvent(e)) {
    e.preventDefault();
    finishTouchAim(e.pointerId, e.clientX, e.clientY);
    return;
  }
  performSnag();
});

canvas.addEventListener("pointercancel", (e) => {
  releaseCanvasPointer(e);
  if (touchAim?.pointerId === e.pointerId) touchAim = null;
});

canvas.addEventListener(
  "touchstart",
  (e) => {
    if (!playing || isGameplayFrozen() || e.changedTouches.length < 1) return;
    const touch = e.changedTouches[0];
    e.preventDefault();
    setHookTargetX(touch.clientX);
    hook.x = hook.targetX;
    beginTouchAim("touch", touch.clientX, touch.clientY);
  },
  { passive: false },
);

canvas.addEventListener(
  "touchmove",
  (e) => {
    if (!playing || isGameplayFrozen() || e.changedTouches.length < 1) return;
    const touch = e.changedTouches[0];
    e.preventDefault();
    setHookTargetX(touch.clientX);
    updateTouchAim("touch", touch.clientX, touch.clientY);
  },
  { passive: false },
);

canvas.addEventListener(
  "touchend",
  (e) => {
    if (!playing || isGameplayFrozen() || e.changedTouches.length < 1) return;
    const touch = e.changedTouches[0];
    e.preventDefault();
    setHookTargetX(touch.clientX);
    finishTouchAim("touch", touch.clientX, touch.clientY);
  },
  { passive: false },
);

canvas.addEventListener("touchcancel", () => {
  if (touchAim?.pointerId === "touch") touchAim = null;
});

window.addEventListener("keydown", (e) => {
  if (treasureMapRevealPaused && (e.key === "Enter" || e.key === " " || e.key === "Escape")) {
    const tag = e.target?.tagName;
    if (tag !== "INPUT" && tag !== "TEXTAREA") {
      e.preventDefault();
      endTreasureMapReveal();
      return;
    }
  }
  if (e.shiftKey && e.code === "Digit8") {
    const tag = e.target?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || e.target?.isContentEditable) return;
    e.preventDefault();
    secretSimulateAdventureUnlock();
    return;
  }
  if (e.ctrlKey && e.shiftKey && e.code === "Digit3") {
    const tag = e.target?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || e.target?.isContentEditable) return;
    e.preventDefault();
    secretSkipAdventureLevel();
  }
});

// keyboard: aim with arrows, Enter = cast down + hook, Space = quick snag
window.addEventListener("keydown", (e) => {
  if (!playing || isGameplayFrozen()) return;
  const margin = dpr * 16;
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    hook.targetX -= w * 0.11;
    hook.targetX = Math.max(margin, hook.targetX);
    return;
  }
  if (e.key === "ArrowRight") {
    e.preventDefault();
    hook.targetX += w * 0.11;
    hook.targetX = Math.min(w - margin, hook.targetX);
    return;
  }
  if (e.key === "Enter") {
    e.preventDefault();
    if (e.repeat) return;
    startCast();
    return;
  }
  if (e.key === " ") {
    e.preventDefault();
    performSnag();
  }
});

btnStart.addEventListener("click", startRound);

btnOpenShop?.addEventListener("click", openShop);
btnCloseShop?.addEventListener("click", closeShop);
btnOpenShopGuide?.addEventListener("click", openShopGuide);
btnShopGuideDone?.addEventListener("click", closeShopGuide);
btnToggleMusic?.addEventListener("click", toggleHomeMusic);
btnIntroDone?.addEventListener("click", closeIntro);
btnOpenIntro?.addEventListener("click", openIntro);
btnResetProgress?.addEventListener("click", resetProgress);
panelStart?.addEventListener("pointerdown", unlockHomeAudio, { once: true });

async function saveCurrentScoreToBoard() {
  if (leaderboardSaveInFlight) return;
  const board = loadLeaderboard();
  if (!qualifiesForLeaderboard(lastRoundScore, board)) return;
  const raw = (initialsInput?.value || "").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 3);
  const ini = raw.length >= 1 ? raw : "AAA";
  const pending = {
    initials: ini,
    score: lastRoundScore,
    reefId: lastRoundReefId || "",
  };
  if (board.some((r) => leaderboardEntryKey(r) === leaderboardEntryKey(pending))) {
    if (initialsPanel) initialsPanel.hidden = true;
    showToast("This score is already on the leaderboard", 1700);
    return;
  }
  leaderboardSaveInFlight = true;
  if (btnSaveScore) btnSaveScore.disabled = true;
  let savedGlobally = false;
  try {
    savedGlobally = await addLeaderboardEntry(ini, lastRoundScore, lastRoundReefId);
  } finally {
    leaderboardSaveInFlight = false;
    if (btnSaveScore) btnSaveScore.disabled = false;
  }
  if (initialsPanel) initialsPanel.hidden = true;
  refreshLeaderboardViews(false);
  showToast(savedGlobally ? "Score saved to global leaderboard" : "Score saved on this device", 1700);
}

btnSaveScore?.addEventListener("click", saveCurrentScoreToBoard);
initialsInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    saveCurrentScoreToBoard();
  }
});

btnAgain.addEventListener("click", () => {
  if (initialsPanel) initialsPanel.hidden = true;
  refreshLeaderboardViews();
  normalizeSelectedBaitId();
  buildBaitUI();
  buildRodUI();
  refreshCoinDisplays();
  showHomePanel();
  if (homeAudioUnlocked) startHomeWaves();
  startHomeMusic();
});

btnTreasureMapRevealDone?.addEventListener("click", endTreasureMapReveal);

function prefetchAdventureHub() {
  if (!isAdventureUnlocked()) return;
  prepareAdventureHub();
}

btnAdventureMode?.addEventListener("pointerenter", prefetchAdventureHub, { passive: true });
btnAdventureMode?.addEventListener("focus", prefetchAdventureHub);
btnAdventureMode?.addEventListener("touchstart", prefetchAdventureHub, { passive: true });

btnAdventureMode?.addEventListener("click", () => {
  if (!isAdventureUnlocked()) {
    updateAdventureLaunchUI();
    showToast(adventureUnlockBlockedMessage(), 2800);
    return;
  }
  clearAdventureHomeCelebration();
  openAdventureHub();
});

adventureLevelList?.addEventListener("click", (e) => {
  const btn = e.target.closest(".adventure-map-node");
  if (!btn || btn.disabled) return;
  const idx = parseInt(btn.dataset.levelIndex, 10);
  if (!Number.isNaN(idx)) startAdventureLevel(idx);
});

btnAdventureBack?.addEventListener("click", () => {
  stopAdventureMusic();
  showHomePanel();
  if (homeAudioUnlocked) startHomeWaves();
  startHomeMusic();
});

btnAdventureRetry?.addEventListener("click", () => {
  startAdventureLevel(pendingAdventureLevelIndex);
});

btnAdventureFailBack?.addEventListener("click", () => {
  openAdventureHub();
});

btnAdventureNext?.addEventListener("click", () => {
  const highest = gameMeta.adventureHighestLevel || 0;
  if (highest < ADVENTURE_LEVEL_COUNT) {
    startAdventureLevel(highest);
  } else {
    openAdventureHub();
  }
});

btnAdventureWinBack?.addEventListener("click", () => {
  openAdventureHub();
});

window.addEventListener("resize", () => {
  resize();
  initBubbles();
});

gameMeta = loadMeta();
normalizeSelectedRod();
buildReefUI();
buildRodUI();
normalizeSelectedBaitId();
refreshCoinDisplays();
buildBaitUI();
updateAdventureLaunchUI();

function deferStartupWork() {
  if (PERF_CHROMEBOOK) {
    setTimeout(() => warmupAdventureSceneCache(false), 2200);
    setTimeout(() => refreshLeaderboardViews(), 1600);
    setTimeout(() => window.requestAnimationFrame(() => startAdventureHomeUnlockAnimation()), 900);
  } else {
    if (typeof requestIdleCallback === "function") {
      requestIdleCallback(() => warmupAdventureSceneCache(false), { timeout: 800 });
    } else {
      setTimeout(() => warmupAdventureSceneCache(false), 0);
    }
    refreshLeaderboardViews();
    window.requestAnimationFrame(() => startAdventureHomeUnlockAnimation());
  }
}

updateMusicButton();
resize();
initBubbles();
showIntroIfNeeded();
deferStartupWork();
requestAnimationFrame(gameLoop);
