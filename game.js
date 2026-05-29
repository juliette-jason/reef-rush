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
const ADVENTURE_LEVEL_COUNT = 15;

const TREASURE_CINEMATIC_ANTICIPATE_MS = 800;
const TREASURE_CINEMATIC_FLY_MS = 2400;
const TREASURE_CINEMATIC_OPEN_MS = 1600;
const TREASURE_CINEMATIC_HOLD_MS = 1400;

/** Candy Crush–style zigzag positions on the treasure chart (% of map board). */
const ADVENTURE_MAP_NODE_LAYOUT = [
  { x: 50, y: 94 },
  { x: 26, y: 88 },
  { x: 74, y: 82 },
  { x: 28, y: 76 },
  { x: 72, y: 70 },
  { x: 30, y: 64 },
  { x: 70, y: 58 },
  { x: 32, y: 52 },
  { x: 68, y: 46 },
  { x: 34, y: 40 },
  { x: 66, y: 34 },
  { x: 36, y: 28 },
  { x: 64, y: 22 },
  { x: 40, y: 16 },
  { x: 50, y: 9 },
];

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
  "Phantom Keys",
  "Stormbreak Isle",
  "Treasurehorn Peak",
  "Leviathan Deep",
  "Captain's Landing",
  "Treasure Cove",
];

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
    levels.push({
      level: i + 1,
      id: `adv_${i + 1}`,
      name: ADVENTURE_MAP_PLACES[i] || `Voyage ${i + 1}`,
      subtitle: reef.name,
      mapPlace: ADVENTURE_MAP_PLACES[i] || `Isle ${i + 1}`,
      reefId: reef.id,
      passScore: 3000 + Math.round((i * (7000 - 3000)) / (ADVENTURE_LEVEL_COUNT - 1)),
      roundMs: Math.max(46_000, reef.roundMs - tier * 3500 - i * 600),
      spawnMin: Math.max(160, reef.spawnMin - i * 18),
      spawnMax: Math.max(380, reef.spawnMax - i * 45),
      maxFish: Math.min(22, reef.maxFish + Math.floor(i / 2)),
      fishSpeed: reef.fishSpeed * (1 + i * 0.035),
      rareRollMult: Math.max(0.55, reef.rareRollMult * (0.98 - i * 0.012)),
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

function isAdventureLevelPlayable(levelNum) {
  if (!isAdventureUnlocked()) return false;
  const highest = gameMeta.adventureHighestLevel || 0;
  return levelNum <= highest + 1;
}

function getAdventureLevel(index) {
  return ADVENTURE_LEVELS[Math.max(0, Math.min(ADVENTURE_LEVEL_COUNT - 1, index))];
}

function getReef() {
  const base = REEFS.find((r) => r.id === selectedReefId) || REEFS[0];
  if (!adventureSession) return base;
  const lvl = getAdventureLevel(adventureSession.levelIndex);
  const reefBase = REEFS.find((r) => r.id === lvl.reefId) || base;
  return {
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
}

const LEADERBOARD_KEY = "reefRushLeaderboard_v2";
const LEADERBOARD_MAX = 10;
const SUPABASE_REST_URL = "https://htnpfzjhicyzkqfgyhuu.supabase.co/rest/v1";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_SARvsULPYyIUImdhXMjQUQ_T6RtwvZM";
const LEADERBOARD_TABLE_URL = `${SUPABASE_REST_URL}/leaderboard`;
let leaderboardRows = [];
let leaderboardLoading = false;
let leaderboardLoadId = 0;

function normalizeLeaderboardRows(rows) {
  if (!Array.isArray(rows)) return [];
  return rows
    .map((e) => ({
      initials: String(e.initials || "").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 3),
      score: Math.max(0, Math.floor(Number(e.score) || 0)),
      reefId: e.reefId || e.reef_id || "",
      at: e.at || e.created_at || "",
    }))
    .filter((e) => e.initials && e.score > 0)
    .sort((a, b) => b.score - a.score)
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
    const url = `${LEADERBOARD_TABLE_URL}?select=initials,score,reef_id,created_at&order=score.desc,created_at.asc&limit=${LEADERBOARD_MAX}`;
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
  const rows = [...loadLeaderboard(), entry];
  rows.sort((a, b) => b.score - a.score);
  leaderboardRows = normalizeLeaderboardRows(rows);
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
  return typeof navigator !== "undefined" && (navigator.userAgent || "").includes("CrOS");
}

/** Chrome OS devices often struggle with full-res canvas + heavy gradients. */
const PERF_CHROMEBOOK = isChromebook();

function perfN(n) {
  return PERF_CHROMEBOOK ? Math.max(1, Math.round(n * 0.45)) : n;
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
  buildAdventureLevelUI();
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
  if (adventureUnlockHint) adventureUnlockHint.hidden = !onHome;
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
  if (adventureUnlockHint) {
    adventureUnlockHint.textContent = celebrating
      ? "★ Adventure Mode unlocked — tap the glowing button! ★"
      : unlocked
        ? "Treasure map unlocked — 15 voyages await!"
        : `Treasure chests: ${total} / ${TREASURE_CHESTS_TO_UNLOCK_ADVENTURE}`;
  }
  refreshTreasureChestDisplay();
  syncAdventureLaunchVisibility();
}

function adventureMapCoords(index) {
  const layout = ADVENTURE_MAP_NODE_LAYOUT[index] || { x: 50, y: 50 };
  return { x: (layout.x / 100) * 400, y: (layout.y / 100) * 1200 };
}

function buildAdventureTrailPath() {
  const pts = ADVENTURE_MAP_NODE_LAYOUT.slice(0, ADVENTURE_LEVEL_COUNT).map((_, i) => adventureMapCoords(i));
  if (!pts.length) return "";
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    d += ` L ${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)}`;
  }
  return d;
}

function scrollAdventureMapToProgress() {
  if (!adventureMapScroll || !adventureLevelList) return;
  const clearedNodes = adventureLevelList.querySelectorAll(".adventure-map-node--cleared");
  const target =
    adventureLevelList.querySelector(".adventure-map-node--current") ||
    (clearedNodes.length ? clearedNodes[clearedNodes.length - 1] : null) ||
    adventureLevelList.querySelector(".adventure-map-node");
  if (!target) return;
  window.requestAnimationFrame(() => {
    target.scrollIntoView({ block: "center", behavior: "smooth" });
  });
}

function buildAdventureLevelUI() {
  if (!adventureLevelList) return;
  adventureLevelList.innerHTML = "";
  const highest = gameMeta.adventureHighestLevel || 0;
  const nextPlayable = Math.min(ADVENTURE_LEVEL_COUNT, highest + 1);

  if (adventureMapTrail) {
    adventureMapTrail.setAttribute("d", buildAdventureTrailPath());
  }

  for (let i = 0; i < ADVENTURE_LEVELS.length; i++) {
    const lvl = ADVENTURE_LEVELS[i];
    const layout = ADVENTURE_MAP_NODE_LAYOUT[i] || { x: 50, y: 50 };
    const playable = isAdventureLevelPlayable(lvl.level);
    const cleared = lvl.level <= highest;
    const isCurrent = playable && !cleared && lvl.level === nextPlayable;
    const isFinale = i === ADVENTURE_LEVEL_COUNT - 1;
    const b = document.createElement("button");
    b.type = "button";
    b.className = "adventure-map-node";
    if (cleared) b.classList.add("adventure-map-node--cleared");
    if (!playable) b.classList.add("adventure-map-node--locked");
    if (isCurrent) b.classList.add("adventure-map-node--current");
    if (isFinale) b.classList.add("adventure-map-node--finale");
    b.disabled = !playable;
    b.style.left = `${layout.x}%`;
    b.style.top = `${layout.y}%`;
    b.title = `${lvl.name} — ${lvl.subtitle} · pass ${lvl.passScore}`;
    b.innerHTML = `
      <span class="adventure-map-node__pin" aria-hidden="true">
        <span class="adventure-map-node__num">${lvl.level}</span>
        ${isFinale ? '<span class="adventure-map-node__x" aria-hidden="true"></span>' : ""}
        ${isCurrent ? '<span class="adventure-map-node__boat" aria-hidden="true"></span>' : ""}
        ${cleared ? '<span class="adventure-map-node__star" aria-hidden="true"></span>' : ""}
        ${!playable ? '<span class="adventure-map-node__lock" aria-hidden="true"></span>' : ""}
      </span>
      <span class="adventure-map-node__label">${lvl.name}</span>
      <span class="adventure-map-node__meta">${lvl.passScore} pts</span>
    `;
    if (playable) {
      b.addEventListener("click", () => startAdventureLevel(i));
    }
    adventureLevelList.appendChild(b);
  }
  if (adventureMapBanner) {
    adventureMapBanner.hidden = !isAdventureUnlocked();
  }
}

function openAdventureHub() {
  if (!isAdventureUnlocked()) {
    showToast(adventureUnlockBlockedMessage(), 2800);
    return;
  }
  hideAllPanels();
  buildAdventureLevelUI();
  if (panelAdventure) panelAdventure.hidden = false;
  syncAdventureLaunchVisibility();
  scrollAdventureMapToProgress();
  if (musicEnabled) startAdventureMusic();
}

function startAdventureLevel(levelIndex) {
  const lvl = getAdventureLevel(levelIndex);
  if (!isAdventureLevelPlayable(lvl.level)) return;
  pendingAdventureLevelIndex = levelIndex;
  adventureSession = { levelIndex };
  selectedReefId = lvl.reefId;
  hideAllPanels();
  if (adventureGoalLine) {
    adventureGoalLine.hidden = false;
    adventureGoalLine.textContent = `Goal: ${lvl.passScore} pts`;
  }
  startRound();
}

function endAdventureRound() {
  const lvl = getAdventureLevel(adventureSession.levelIndex);
  const passed = score >= lvl.passScore;
  if (passed) {
    gameMeta.adventureHighestLevel = Math.max(gameMeta.adventureHighestLevel || 0, lvl.level);
    saveMeta();
  }
  const earned = coinsAwardedForScore(score);
  if (earned > 0) {
    gameMeta.coins += earned;
    saveMeta();
    refreshCoinDisplays();
  }
  roundBait = { catchRadiusMult: 1, rareAssistAdd: 0, lightRadiusMult: 1 };
  adventureSession = null;
  if (adventureGoalLine) adventureGoalLine.hidden = true;
  hideAllPanels();
  if (passed) {
    if (adventureWinLevel) adventureWinLevel.textContent = `Level ${lvl.level} cleared!`;
    if (adventureWinScore) adventureWinScore.textContent = `You scored ${score} (needed ${lvl.passScore}).`;
    const hasNext = lvl.level < ADVENTURE_LEVEL_COUNT;
    if (btnAdventureNext) {
      btnAdventureNext.hidden = !hasNext;
      btnAdventureNext.textContent = hasNext ? `Start level ${lvl.level + 1}` : "Back to map";
    }
    if (panelAdventureWin) panelAdventureWin.hidden = false;
  } else {
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
  showToast("Treasure map unlocked! Adventure Mode is ready.", 3200);
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
  nextSpawnIn = reef.spawnMin + Math.random() * Math.max(120, reef.spawnMax - reef.spawnMin) * 0.45;
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
  const sand = ctx.createLinearGradient(0, sandTop, 0, h);
  sand.addColorStop(0, "rgba(236, 205, 150, 0)");
  sand.addColorStop(0.28, "rgba(226, 190, 132, 0.18)");
  sand.addColorStop(0.72, "rgba(210, 169, 104, 0.36)");
  sand.addColorStop(1, "rgba(174, 128, 70, 0.5)");
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

  ctx.fillStyle = "rgba(255, 238, 190, 0.18)";
  for (let i = 0; i < perfN(38); i++) {
    const x = ((i * 73) % 1000) / 1000 * w;
    const y = sandTop + dpr * 20 + (((i * 41) % 100) / 100) * dpr * 58;
    ctx.beginPath();
    ctx.ellipse(x, y, dpr * (0.7 + (i % 3) * 0.35), dpr * 0.55, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  if (rid === "australia") drawGreatBarrierReefBed();
  if (rid === "caribbean") drawMesoamericanReefBed();
  if (rid === "mediterranean") drawWesternMediterraneanRocks();
  if (rid === "japan_kuroshio") drawKuroshioRocks();
  drawReefStructure(rid, v.corals);
}

function drawCachedBackground() {
  if (!PERF_CHROMEBOOK) {
    drawBackground();
    return;
  }
  const key = `${w}|${h}|${getReef().id}`;
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

  ctx.save();
  ctx.translate(f.x, f.y);
  ctx.rotate(Math.sin(f.phase) * 0.08);
  ctx.scale(facing, 1);

  drawFishMorph(spec.morph || "silverside", L, body, shade, accent, spec.id);

  ctx.restore();
  f.phase += 0.06;
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
    ctx.fillText("Fifteen voyages await on the chart", w * 0.5, h * 0.13 + titleSize * 1.15 + subSize * 1.6);
    ctx.restore();
  }

  ctx.save();
  ctx.translate(c.x, c.y);
  ctx.scale(c.scale * c.facing, c.scale);
  drawTreasureChestInCrabSpace(c.sc, c.lidOpen);
  ctx.restore();
}

function drawJackpotCrab() {
  if (!jackpotCrab?.active || treasureChestCinematic || w <= 0) return;
  const x = jackpotCrab.active.x;
  const y = jackpotCrab.active.y;
  const facing = jackpotCrab.active.vx >= 0 ? 1 : -1;
  const leg = jackpotCrab.active.legT;
  const sc = dpr * 1.05;

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(facing, 1);

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
      const t = Math.min(1, hook.castTimer / CAST_DOWN_MS);
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
      const t = Math.min(1, hook.castTimer / CAST_UP_MS);
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

function gameLoop(now) {
  gameLoopTick++;
  const dt = Math.min(PERF_CHROMEBOOK ? 50 : 40, now - (gameLoop.prev || now));
  gameLoop.prev = now;

  if (toastTimer > 0) {
    toastTimer -= dt;
    if (toastTimer <= 0) toastEl.hidden = true;
  }

  updateCelebration(dt);

  ctx.clearRect(0, 0, w, h);
  drawCachedBackground();
  if (!PERF_CHROMEBOOK || gameLoopTick % 2 === 0) drawBubbles(treasureMapRevealPaused ? 0 : dt);
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
        const maxFish = PERF_CHROMEBOOK ? Math.max(6, Math.floor(reef.maxFish * 0.7)) : reef.maxFish;
        if (spawnAcc >= nextSpawnIn && countUncaughtFish() < maxFish) {
          spawnFish();
          spawnAcc = 0;
          nextSpawnIn = reef.spawnMin + Math.random() * Math.max(80, reef.spawnMax - reef.spawnMin);
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
  const board = loadLeaderboard();
  if (!qualifiesForLeaderboard(lastRoundScore, board)) return;
  const raw = (initialsInput?.value || "").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 3);
  const ini = raw.length >= 1 ? raw : "AAA";
  if (btnSaveScore) btnSaveScore.disabled = true;
  const savedGlobally = await addLeaderboardEntry(ini, lastRoundScore, lastRoundReefId);
  if (btnSaveScore) btnSaveScore.disabled = false;
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

btnAdventureMode?.addEventListener("click", () => {
  if (!isAdventureUnlocked()) {
    updateAdventureLaunchUI();
    showToast(adventureUnlockBlockedMessage(), 2800);
    return;
  }
  clearAdventureHomeCelebration();
  openAdventureHub();
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
refreshLeaderboardViews();
updateAdventureLaunchUI();
buildAdventureLevelUI();
updateMusicButton();
resize();
initBubbles();
showIntroIfNeeded();
window.requestAnimationFrame(() => startAdventureHomeUnlockAnimation());
requestAnimationFrame(gameLoop);
