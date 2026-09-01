/**
 * Reef Rush — responsive canvas fishing game
 */

// --- Sea creatures: rarity, size tier, palette (splash-screen realism) ---
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
  { id: "northern_anchovy", name: "Northern Anchovy", rarity: "common", size: "small", morph: "silverside", speed: 1.35, hue: 200, colors: ["#38bdf8", "#0369a1", "#e0f2fe"] },
  { id: "pacific_sardine", name: "Pacific Sardine", rarity: "common", size: "small", morph: "silverside", speed: 1.28, hue: 218, colors: ["#7dd3fc", "#0284c7", "#f0f9ff"] },
  { id: "atlantic_herring", name: "Atlantic Herring", rarity: "common", size: "small", morph: "silverside", speed: 1.22, hue: 210, colors: ["#94a3b8", "#334155", "#f8fafc"] },
  { id: "chub_mackerel", name: "Chub Mackerel", rarity: "common", size: "medium", morph: "mackerel", speed: 1.45, hue: 168, colors: ["#2dd4bf", "#0f766e", "#ccfbf1"] },
  { id: "european_sprat", name: "European Sprat", rarity: "common", size: "small", morph: "silverside", speed: 1.18, hue: 38, colors: ["#fdba74", "#c2410c", "#ffedd5"] },
  { id: "barramundi", name: "Barramundi", rarity: "common", size: "medium", morph: "barramundi", speed: 1.05, hue: 95, colors: ["#86efac", "#166534", "#ecfccb"] },
  { id: "clown_anemonefish", name: "Clown Anemonefish", rarity: "common", size: "small", morph: "clownfish", speed: 0.92, hue: 24, colors: ["#f97316", "#c2410c", "#ffffff"] },
  { id: "moon_jellyfish", name: "Moon Jellyfish", rarity: "common", size: "small", morph: "jellyfish", speed: 0.42, hue: 280, colors: ["#e9d5ff", "#a78bfa", "#f5f3ff"] },
  { id: "yellowfin_tuna", name: "Yellowfin Tuna", rarity: "uncommon", size: "large", morph: "tuna", speed: 1.85, hue: 210, colors: ["#38bdf8", "#0c4a6e", "#e0f2fe"] },
  { id: "albacore_tuna", name: "Albacore Tuna", rarity: "uncommon", size: "large", morph: "tuna", speed: 1.72, hue: 195, colors: ["#94a3b8", "#334155", "#f1f5f9"] },
  { id: "striped_bass", name: "Striped Bass", rarity: "uncommon", size: "medium", morph: "bass", speed: 1.12, hue: 142, colors: ["#4ade80", "#14532d", "#bbf7d0"] },
  { id: "atlantic_cod", name: "Atlantic Cod", rarity: "uncommon", size: "medium", morph: "cod", speed: 0.78, hue: 205, colors: ["#cbd5e1", "#475569", "#f8fafc"] },
  { id: "red_snapper", name: "Red Snapper", rarity: "uncommon", size: "medium", morph: "snapper", speed: 0.95, hue: 350, colors: ["#f87171", "#7f1d1d", "#fecaca"] },
  { id: "coral_trout_gbr", name: "Coral Trout", rarity: "uncommon", size: "medium", morph: "snapper", speed: 0.88, hue: 12, colors: ["#fb7185", "#881337", "#ffe4e6"] },
  { id: "european_seabass", name: "European Seabass", rarity: "uncommon", size: "medium", morph: "bass", speed: 1.08, hue: 160, colors: ["#5eead4", "#134e4a", "#ccfbf1"] },
  { id: "queen_angelfish", name: "Queen Angelfish", rarity: "uncommon", size: "small", morph: "angelfish", speed: 0.98, hue: 200, colors: ["#e0f2fe", "#0284c7", "#f97316"] },
  { id: "lined_seahorse", name: "Lined Seahorse", rarity: "uncommon", size: "small", morph: "seahorse", speed: 0.48, hue: 32, colors: ["#fdba74", "#b45309", "#ffedd5"] },
  { id: "caribbean_lobster", name: "Caribbean Spiny Lobster", rarity: "uncommon", size: "medium", morph: "lobster", speed: 0.55, hue: 350, colors: ["#b91c1c", "#7f1d1d", "#fecaca"] },
  { id: "common_cuttlefish", name: "Common Cuttlefish", rarity: "uncommon", size: "medium", morph: "cuttlefish", speed: 0.72, hue: 265, colors: ["#a78bfa", "#4c1d95", "#ede9fe"] },
  { id: "dolphinfish_mahi", name: "Dolphinfish (Mahi-Mahi)", rarity: "rare", size: "large", morph: "mahi", speed: 1.55, hue: 185, colors: ["#22d3ee", "#15803d", "#fef08a"] },
  { id: "yellowtail_amberjack", name: "Yellowtail Amberjack", rarity: "rare", size: "large", morph: "amberjack", speed: 1.62, hue: 48, colors: ["#facc15", "#854d0e", "#fef9c3"] },
  { id: "atlantic_halibut", name: "Atlantic Halibut", rarity: "rare", size: "large", morph: "halibut", speed: 0.62, hue: 205, colors: ["#7d8b72", "#3a4234", "#f0f2eb"] },
  { id: "australian_blacktip", name: "Australian Blacktip Shark", rarity: "rare", size: "large", morph: "reefshark", speed: 1.52, hue: 210, colors: ["#64748b", "#0f172a", "#cbd5e1"] },
  { id: "green_sea_turtle", name: "Green Sea Turtle", rarity: "rare", size: "large", morph: "seaturtle", speed: 0.68, hue: 145, colors: ["#4ade80", "#166534", "#d9f99d"] },
  { id: "reef_octopus", name: "Reef Octopus", rarity: "rare", size: "medium", morph: "octopus", speed: 0.7, hue: 330, colors: ["#fb7185", "#9f1239", "#ffe4e6"] },
  { id: "harbor_seal", name: "Harbor Seal", rarity: "rare", size: "large", morph: "seal", speed: 1.15, hue: 220, colors: ["#94a3b8", "#334155", "#f1f5f9"] },
  { id: "blue_marlin", name: "Blue Marlin", rarity: "epic", size: "large", morph: "marlin", speed: 2.05, hue: 220, colors: ["#3b82f6", "#1e3a8a", "#bfdbfe"] },
  { id: "swordfish", name: "Swordfish", rarity: "epic", size: "large", morph: "swordfish", speed: 1.95, hue: 230, colors: ["#64748b", "#1e293b", "#e2e8f0"] },
  { id: "giant_trevally", name: "Giant Trevally", rarity: "epic", size: "large", morph: "trevally", speed: 1.78, hue: 32, colors: ["#d97706", "#422006", "#fde68a"] },
  { id: "reef_manta", name: "Reef Manta Ray", rarity: "epic", size: "large", morph: "manta", speed: 0.88, hue: 215, colors: ["#475569", "#0f172a", "#e2e8f0"] },
  { id: "bottlenose_dolphin", name: "Bottlenose Dolphin", rarity: "epic", size: "large", morph: "dolphin", speed: 1.48, hue: 205, colors: ["#94a3b8", "#334155", "#f8fafc"] },
  { id: "atlantic_bluefin", name: "Atlantic Bluefin Tuna", rarity: "legendary", size: "large", morph: "bluefin", speed: 1.68, hue: 222, colors: ["#1d4ed8", "#0f172a", "#93c5fd"] },
  { id: "great_barracuda", name: "Great Barracuda", rarity: "legendary", size: "large", morph: "barracuda", speed: 2.2, hue: 200, colors: ["#cbd5e1", "#334155", "#f8fafc"] },
  { id: "great_hammerhead", name: "Great Hammerhead Shark", rarity: "legendary", size: "large", morph: "hammerhead", speed: 1.42, hue: 210, colors: ["#94a3b8", "#1e293b", "#e2e8f0"] },
  { id: "sea_otter", name: "Sea Otter", rarity: "legendary", size: "medium", morph: "otter", speed: 0.95, hue: 28, colors: ["#a16207", "#451a03", "#fef3c7"] },
  { id: "black_seadevil", name: "Black Seadevil", rarity: "common", size: "small", morph: "deepsea", speed: 0.95, hue: 188, colors: ["#172033", "#05070d", "#86efff"] },
  { id: "viperfish", name: "Pacific Viperfish", rarity: "common", size: "medium", morph: "deepsea", speed: 1.2, hue: 205, colors: ["#243047", "#070b14", "#bdefff"] },
  { id: "hatchetfish", name: "Hatchetfish", rarity: "uncommon", size: "small", morph: "deepsea", speed: 1.38, hue: 220, colors: ["#2c3b55", "#08111f", "#d9f7ff"] },
  { id: "dumbo_octopus", name: "Dumbo Octopus", rarity: "uncommon", size: "medium", morph: "octopus", speed: 0.52, hue: 330, colors: ["#f472b6", "#9d174d", "#fce7f3"] },
  { id: "gulper_eel", name: "Gulper Eel", rarity: "rare", size: "large", morph: "deepsea", speed: 0.82, hue: 258, colors: ["#211632", "#05030a", "#c084fc"] },
  { id: "fangtooth", name: "Fangtooth", rarity: "epic", size: "medium", morph: "deepsea", speed: 1.08, hue: 24, colors: ["#2a201b", "#080503", "#fed7aa"] },
  { id: "giant_isopod", name: "Giant Isopod", rarity: "legendary", size: "large", morph: "deepsea", speed: 0.58, hue: 190, colors: ["#475569", "#111827", "#cffafe"] },
  { id: "bonefish", name: "Bonefish", rarity: "common", size: "medium", morph: "skullfish", speed: 1.38, hue: 280, colors: ["#1c1618", "#0a0608", "#ff4040"] },
  { id: "grave_eel", name: "Grave Eel", rarity: "common", size: "large", morph: "skullfish", speed: 1.18, hue: 265, colors: ["#141018", "#050308", "#f87171"] },
  { id: "specter_ray", name: "Specter Ray", rarity: "uncommon", size: "large", morph: "skullfish", speed: 1.05, hue: 255, colors: ["#121018", "#040208", "#ef4444"] },
  { id: "dread_fangtooth", name: "Dread Fangtooth", rarity: "uncommon", size: "medium", morph: "skullfish", speed: 1.48, hue: 8, colors: ["#1a100e", "#060302", "#ff6b6b"] },
  { id: "skeletal_marlin", name: "Skeletal Marlin", rarity: "rare", size: "large", morph: "skullfish", speed: 1.68, hue: 295, colors: ["#16121a", "#050308", "#e879f9"] },
  { id: "ghost_shark", name: "Ghost Shark", rarity: "rare", size: "large", morph: "skullfish", speed: 1.55, hue: 248, colors: ["#0e1216", "#020306", "#fca5a5"] },
  { id: "abyss_lantern", name: "Abyss Lantern", rarity: "epic", size: "medium", morph: "skullfish", speed: 1.28, hue: 12, colors: ["#180c0c", "#040202", "#ff3333"] },
  { id: "leviathan_skull", name: "Leviathan Skull", rarity: "legendary", size: "large", morph: "skullfish", speed: 1.02, hue: 200, colors: ["#0c1418", "#020406", "#67e8f9"] },
];

const BIG_CRITTER_MORPHS = new Set([
  "hammerhead",
  "reefshark",
  "seaturtle",
  "manta",
  "dolphin",
  "seal",
]);

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
    desc: "Tight sweet spot.",
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
    desc: "Wider catch window.",
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
    desc: "Wide catch · strong rare odds.",
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
    desc: "Built-in deep-sea lamp.",
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
    desc: "Huge catch window.",
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
    desc: "Strongest rare odds.",
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
    desc: "Wide reach · solid rare odds.",
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
  {
    id: "coral_crown",
    name: "Coral Crown Rod",
    desc: "Chest exclusive · lively catch window.",
    chestOnly: true,
    chestTier: "common",
    catchRadius: 40,
    rareAssist: 0.14,
    visual: {
      lineMain: "rgba(244, 114, 182, 0.95)",
      lineSheen: "rgba(252, 231, 243, 0.5)",
      lineW: 1.7,
      sheenW: 0.78,
      reelBody: "#9d174d",
      reelBand: "#f9a8d4",
      ringIdle: "rgba(244, 114, 182, 0.34)",
      ringSnag: "rgba(251, 207, 232, 0.7)",
      hookMetal: "#fbcfe8",
      hookBarb: "#831843",
      hookScale: 1.08,
      tipGlow: "rgba(244, 114, 182, 0.28)",
    },
  },
  {
    id: "stormcaller",
    name: "Stormcaller Rod",
    desc: "Chest exclusive · thunderous rare luck.",
    chestOnly: true,
    chestTier: "rare",
    catchRadius: 42,
    rareAssist: 0.28,
    visual: {
      lineMain: "rgba(125, 211, 252, 0.95)",
      lineSheen: "rgba(224, 242, 254, 0.55)",
      lineW: 1.85,
      sheenW: 0.82,
      reelBody: "#1e3a8a",
      reelBand: "#38bdf8",
      ringIdle: "rgba(56, 189, 248, 0.4)",
      ringSnag: "rgba(186, 230, 253, 0.75)",
      hookMetal: "#e0f2fe",
      hookBarb: "#1d4ed8",
      hookScale: 1.12,
      tipGlow: "rgba(56, 189, 248, 0.35)",
    },
  },
  {
    id: "abyss_prism",
    name: "Abyss Prism Rod",
    desc: "Chest exclusive · deep lamp + rare pull.",
    chestOnly: true,
    chestTier: "rare",
    catchRadius: 38,
    rareAssist: 0.2,
    lightRadiusMult: 2.1,
    visual: {
      lineMain: "rgba(167, 139, 250, 0.95)",
      lineSheen: "rgba(237, 233, 254, 0.55)",
      lineW: 1.8,
      sheenW: 0.8,
      reelBody: "#312e81",
      reelBand: "#a78bfa",
      ringIdle: "rgba(167, 139, 250, 0.4)",
      ringSnag: "rgba(221, 214, 254, 0.75)",
      hookMetal: "#ddd6fe",
      hookBarb: "#4c1d95",
      hookScale: 1.1,
      tipGlow: "rgba(167, 139, 250, 0.4)",
    },
  },
  {
    id: "krakenbane",
    name: "Krakenbane Rod",
    desc: "Chest exclusive · huge reach · elite rares.",
    chestOnly: true,
    chestTier: "legendary",
    catchRadius: 58,
    rareAssist: 0.3,
    visual: {
      lineMain: "rgba(251, 146, 60, 0.95)",
      lineSheen: "rgba(255, 237, 213, 0.55)",
      lineW: 2.15,
      sheenW: 0.9,
      reelBody: "#7c2d12",
      reelBand: "#fb923c",
      ringIdle: "rgba(251, 146, 60, 0.4)",
      ringSnag: "rgba(254, 215, 170, 0.78)",
      hookMetal: "#fed7aa",
      hookBarb: "#9a3412",
      hookScale: 1.22,
      tipGlow: "rgba(251, 146, 60, 0.35)",
    },
  },
  {
    id: "magnet",
    name: "Magnet Rod",
    desc: "Magnetic tip · farther pulls.",
    catchRadius: 66,
    rareAssist: 0.12,
    visual: {
      tipType: "magnet",
      lineMain: "rgba(100, 116, 139, 0.95)",
      lineSheen: "rgba(226, 232, 240, 0.48)",
      lineW: 1.85,
      sheenW: 0.78,
      reelBody: "#334155",
      reelBand: "#94a3b8",
      ringIdle: "rgba(167, 139, 250, 0.38)",
      ringSnag: "rgba(196, 181, 253, 0.72)",
      hookMetal: "#cbd5e1",
      hookBarb: "#64748b",
      hookScale: 1.16,
      tipGlow: "rgba(167, 139, 250, 0.32)",
      magnetNorth: "#ef4444",
      magnetSouth: "#3b82f6",
      magnetBody: "#64748b",
    },
  },
];

const ROD_PRICE = 1000;
const FREE_ROD_ID = "bamboo";
const MAGNET_ROD_ID = "magnet";
const KRAKEN_SPRAY_BAIT_ID = "kraken_spray";
/** Fisher of the Day top 3: legendary / rare / common chests. */
const DAILY_PRIZE_CHEST_TIERS = ["legendary", "rare", "common"];

/** Gems from found chests only (Crab Trap / Daily Catch / Fisher of the Day). */
const CHEST_GEMS_COMMON = 10;
const CHEST_GEMS_RARE = 25;
const CHEST_GEMS_LEGENDARY = 40;

const SHOP_CHEST_DEFS = [
  {
    id: "common",
    name: "Common chest",
    tier: "common",
    gemPrice: 45,
    blurb: "",
  },
  {
    id: "rare",
    name: "Rare chest",
    tier: "rare",
    gemPrice: 110,
    blurb: "",
  },
  {
    id: "legendary",
    name: "Legendary chest",
    tier: "legendary",
    gemPrice: 175,
    blurb: "",
  },
];

/** Map legacy chest tier ids (great/medium/good) to common / rare / legendary. */
function normalizeChestTier(tier) {
  const t = String(tier || "");
  if (t === "legendary" || t === "great") return "legendary";
  if (t === "rare" || t === "medium" || t === "good" || t === "uncommon") return "rare";
  return "common";
}

const SHOP_COIN_BUNDLES = [
  { id: "coins_2k", name: "Coin pouch", gems: 80, coins: 2000, blurb: "" },
  { id: "coins_5k", name: "Coin crate", gems: 160, coins: 5000, blurb: "" },
  { id: "coins_10k", name: "Coin vault", gems: 300, coins: 10000, blurb: "", featured: true },
];

/** Special chest prizes (inventory + catch stamps). */
const CHEST_ITEM_DEFS = {
  adventure_skip_rope: {
    id: "adventure_skip_rope",
    name: "Adventure Skip Rope",
    icon: "🪢",
    blurb: "Clears a failed adventure level.",
  },
  golden_net: {
    id: "golden_net",
    name: "Golden Net",
    icon: "✨",
    blurb: "Saves your catch from the kraken.",
  },
  mystery_reef: {
    id: "mystery_reef",
    name: "Mystery Reef Key",
    icon: "🗝️",
    blurb: "Next round: random reef.",
  },
  lucky_lure: {
    id: "lucky_lure",
    name: "Lucky Lure",
    icon: "🍀",
    blurb: "Next round: better rare luck.",
  },
  double_haul: {
    id: "double_haul",
    name: "Double Haul",
    icon: "💰",
    blurb: "Next round: double coins.",
  },
};

const CHEST_ITEM_IDS = Object.keys(CHEST_ITEM_DEFS);

function emptyChestItems() {
  const o = {};
  for (const id of CHEST_ITEM_IDS) o[id] = 0;
  return o;
}

function normalizeChestItems(raw) {
  const out = emptyChestItems();
  if (!raw || typeof raw !== "object") return out;
  for (const id of CHEST_ITEM_IDS) {
    out[id] = Math.max(0, Math.floor(Number(raw[id]) || 0));
  }
  return out;
}

function normalizeCatchStamps(raw) {
  if (!Array.isArray(raw)) return [];
  const ids = new Set(FISH_SPECIES.map((s) => s.id));
  const out = [];
  const seen = new Set();
  for (const id of raw) {
    if (typeof id !== "string" || !ids.has(id) || seen.has(id)) continue;
    seen.add(id);
    out.push(id);
  }
  return out;
}

function getChestItemCount(id) {
  return Math.max(0, Math.floor(Number(gameMeta.chestItems?.[id]) || 0));
}

function addChestItem(id, qty = 1) {
  if (!CHEST_ITEM_DEFS[id]) return;
  if (!gameMeta.chestItems) gameMeta.chestItems = emptyChestItems();
  gameMeta.chestItems[id] = getChestItemCount(id) + Math.max(0, Math.floor(qty));
}

function spendChestItem(id, qty = 1) {
  const need = Math.max(1, Math.floor(qty));
  if (getChestItemCount(id) < need) return false;
  gameMeta.chestItems[id] = getChestItemCount(id) - need;
  return true;
}

function hasCatchStamp(speciesId) {
  return Array.isArray(gameMeta.catchStamps) && gameMeta.catchStamps.includes(speciesId);
}

function rollCatchStampPrize() {
  const owned = new Set(gameMeta.catchStamps || []);
  const pool = FISH_SPECIES.filter((s) => !owned.has(s.id));
  if (!pool.length) return { kind: "catch_stamp", consolCoins: 180, speciesId: "", speciesName: "" };
  const spec = pool[Math.floor(Math.random() * pool.length)];
  return { kind: "catch_stamp", speciesId: spec.id, speciesName: spec.name, consolCoins: 0 };
}

function rollSpecialChestPrize(tier) {
  const roll = Math.random();
  tier = normalizeChestTier(tier);
  // Catch stamps target ~1 per 15 chests; better tiers still drop more often.
  if (tier === "legendary") {
    if (roll < 0.035) return { kind: "adventure_skip_rope", qty: 1 };
    if (roll < 0.12) return { kind: "golden_net", qty: 1 };
    if (roll < 0.22) return { kind: "mystery_reef", qty: 1 };
    if (roll < 0.36) return rollCatchStampPrize();
    if (roll < 0.5) return { kind: "double_haul", qty: 1 };
    if (roll < 0.66) return { kind: "lucky_lure", qty: 1 };
    return null;
  }
  if (tier === "rare") {
    if (roll < 0.09) return rollCatchStampPrize();
    if (roll < 0.21) return { kind: "lucky_lure", qty: 1 };
    if (roll < 0.31) return { kind: "double_haul", qty: 1 };
    if (roll < 0.37) return { kind: "mystery_reef", qty: 1 };
    if (roll < 0.41) return { kind: "golden_net", qty: 1 };
    return null;
  }
  if (roll < 0.06) return { kind: "lucky_lure", qty: 1 };
  if (roll < 0.11) return rollCatchStampPrize();
  return null;
}



/** Profile sea pals — daily shop mascots (regular animals + costumes). */
const STARTER_COMPANION_ID = "harbor_gull";
const STARTER_COMPANION_IDS = ["harbor_gull"];
/** Sea pal shown for COM rivals/partners on matchup screens. */
const COM_COMPANION_ID = "space_fish";

const COMPANION_DEFS = [
  { id: "harbor_gull", name: "Harbor Gull", kind: "regular", price: 0, starter: true, icon: "🕊️", blurb: "Your starter pal." },
  { id: "clownfish", name: "Clownfish", kind: "regular", price: 180, icon: "🐠", blurb: "Reef regular." },
  { id: "sea_turtle", name: "Sea Turtle", kind: "regular", price: 220, icon: "🐢", blurb: "Slow and steady." },
  { id: "octopus", name: "Octopus", kind: "regular", price: 240, icon: "🐙", blurb: "Eight-armed regular." },
  { id: "dolphin", name: "Dolphin", kind: "regular", price: 260, icon: "🐬", blurb: "Open-water regular." },
  { id: "jellyfish", name: "Jellyfish", kind: "regular", price: 190, icon: "🪼", blurb: "Drift regular." },
  { id: "crab", name: "Crab", kind: "regular", price: 170, icon: "🦀", blurb: "Sidestep regular." },
  { id: "manta", name: "Manta Ray", kind: "regular", price: 280, icon: "🌊", blurb: "Glide regular." },
  { id: "puffer", name: "Pufferfish", kind: "regular", price: 210, icon: "🐡", blurb: "Puff regular." },
  { id: "otter", name: "Sea Otter", kind: "regular", price: 250, icon: "🦦", blurb: "Kelp regular." },
  { id: "starfish", name: "Starfish", kind: "regular", price: 195, icon: "⭐", blurb: "Five-armed tidepool pal." },
  { id: "angelfish", name: "Angelfish", kind: "regular", price: 230, icon: "🐟", blurb: "Reef royalty." },
  { id: "lobster", name: "Lobster", kind: "regular", price: 245, icon: "🦞", blurb: "Clawed cruiser." },
  { id: "blue_tang", name: "Blue Tang", kind: "regular", price: 210, icon: "💙", blurb: "Bright reef dart." },
  { id: "sailfish", name: "Sailfish", kind: "regular", price: 270, icon: "⛵", blurb: "Fast finned flyer." },
  { id: "nautilus", name: "Nautilus", kind: "regular", price: 220, icon: "🐚", blurb: "Spiral shell drifter." },
  { id: "pirate_gull", name: "Pirate Seagull", kind: "costume", price: 360, icon: "🏴‍☠️", blurb: "Ahoy from the yardarm." },
  { id: "cowboy_shark", name: "Cowboy Shark", kind: "costume", price: 380, icon: "🤠", blurb: "Howdy from the deep." },
  { id: "party_fish", name: "Party Hat Fish", kind: "costume", price: 320, icon: "🎉", blurb: "Confetti in the current." },
  { id: "ninja_octopus", name: "Ninja Octopus", kind: "costume", price: 400, icon: "🥷", blurb: "Silent ink." },
  { id: "wizard_turtle", name: "Wizard Turtle", kind: "costume", price: 390, icon: "🧙", blurb: "Shell of holding." },
  { id: "super_dolphin", name: "Super Dolphin", kind: "costume", price: 410, icon: "🦸", blurb: "Faster than a tuna." },
  { id: "chef_crab", name: "Chef Crab", kind: "costume", price: 340, icon: "👨‍🍳", blurb: "Pinch of salt." },
  { id: "disco_jelly", name: "Disco Jelly", kind: "costume", price: 350, icon: "🪩", blurb: "Stayin' afloat." },
  { id: "viking_seal", name: "Viking Seal", kind: "costume", price: 360, icon: "🪓", blurb: "Raid the ice floe." },
  { id: "royal_manta", name: "Royal Manta", kind: "costume", price: 430, icon: "👑", blurb: "Court of the current." },
  { id: "space_fish", name: "Space Fish", kind: "costume", price: 400, icon: "🚀", blurb: "Orbiting the reef." },
  { id: "coral_angel", name: "Coral Angel", kind: "costume", price: 380, icon: "🪸", blurb: "Reef guardian glow." },
];

const COMPANION_BY_ID = Object.fromEntries(COMPANION_DEFS.map((c) => [c.id, c]));
const MANTA_COMPANION_IDS = new Set(["manta", "royal_manta"]);

function companionKindLabel(kind) {
  return kind === "costume" ? "Costume" : "Regular";
}

function normalizeOwnedClothes(raw) {
  const ids = new Set(COMPANION_DEFS.map((c) => c.id));
  const out = [];
  const seen = new Set();
  if (Array.isArray(raw)) {
    for (const id of raw) {
      if (typeof id !== "string" || !ids.has(id) || seen.has(id)) continue;
      seen.add(id);
      out.push(id);
    }
  }
  for (const id of STARTER_COMPANION_IDS) {
    if (!seen.has(id) && ids.has(id)) {
      seen.add(id);
      out.unshift(id);
    }
  }
  return out;
}

function normalizeEquippedClothes(raw, ownedIds) {
  const owned = new Set(ownedIds || []);
  if (typeof raw === "string" && owned.has(raw)) return raw;
  if (raw && typeof raw === "object") {
    const id = raw.companion || raw.id;
    if (typeof id === "string" && owned.has(id)) return id;
  }
  if (owned.has(STARTER_COMPANION_ID)) return STARTER_COMPANION_ID;
  return (ownedIds && ownedIds[0]) || STARTER_COMPANION_ID;
}

function normalizeDailyClothesShop(raw) {
  if (!raw || typeof raw !== "object") return null;
  const dayKey = String(raw.dayKey || "");
  const itemIds = Array.isArray(raw.itemIds)
    ? raw.itemIds
        .filter((id) => typeof id === "string" && COMPANION_BY_ID[id] && !COMPANION_BY_ID[id].starter)
        .filter((id, i, arr) => arr.indexOf(id) === i)
        .slice(0, 5)
    : [];
  if (!dayKey || itemIds.length !== 5) return null;
  return { dayKey, itemIds };
}

function isClothesOwned(id) {
  return Array.isArray(gameMeta.ownedClothes) && gameMeta.ownedClothes.includes(id);
}

function rollDailyClothesForDay(dayKey) {
  const pool = COMPANION_DEFS.filter((c) => !c.starter);
  let seed = hashDailyCatchSeed(`companions:${dayKey}`);
  const arr = pool.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    seed = (Math.imul(seed, 1103515245) + 12345) >>> 0;
    const j = seed % (i + 1);
    const t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
  }
  return { dayKey, itemIds: arr.slice(0, 5).map((c) => c.id) };
}

function ensureDailyClothesShop() {
  const today = getDailyDayKey();
  const cur = normalizeDailyClothesShop(gameMeta.dailyClothesShop);
  if (cur && cur.dayKey === today) {
    gameMeta.dailyClothesShop = cur;
    return cur;
  }
  gameMeta.dailyClothesShop = rollDailyClothesForDay(today);
  saveMeta();
  return gameMeta.dailyClothesShop;
}

function companionEye(x, y, size = 5) {
  return (
    `<ellipse cx="${x}" cy="${y}" rx="${size}" ry="${(size + 0.35).toFixed(2)}" fill="#fff" stroke="#0f172a" stroke-width="0.7"/>` +
    `<circle cx="${x + 0.65}" cy="${y + 0.4}" r="${(size * 0.5).toFixed(2)}" fill="#0f172a"/>` +
    `<circle cx="${x + 1.5}" cy="${y - 1}" r="${(size * 0.18).toFixed(2)}" fill="#fff"/>`
  );
}

function companionEyes(lx, ly, rx, ry, size = 5) {
  return companionEye(lx, ly, size) + companionEye(rx, ry, size);
}

/** Below-view manta — wide diamond wings, white belly, cephalic lobes, eyes, long tail below. */
function companionMantaTailMarkup({ stroke = "#0f172a" } = {}) {
  return `
        <path d="M80 110 C79 124 80 138 80 152" fill="none" stroke="${stroke}" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M80 152 L76 157 M80 152 L84 157" stroke="${stroke}" stroke-width="1" stroke-linecap="round"/>`;
}

function companionMantaMarkup({
  top = "#334155",
  stroke = "#0f172a",
  belly = "#f8fafc",
  bellyMid = "#e2e8f0",
  fin = "#475569",
  withTail = true,
} = {}) {
  const tail = withTail ? companionMantaTailMarkup({ stroke }) : "";
  return `
        ${tail}
        <path d="M80 66 L12 102 C6 106 10 112 20 110 L80 84 Z" fill="${top}" stroke="${stroke}" stroke-width="1.3"/>
        <path d="M80 66 L148 102 C154 106 150 112 140 110 L80 84 Z" fill="${top}" stroke="${stroke}" stroke-width="1.3"/>
        <path d="M80 68 C54 76 28 90 22 102 C34 98 56 90 80 86 C104 90 126 98 138 102 C132 90 106 76 80 68 Z" fill="${bellyMid}" stroke="${stroke}" stroke-width="0.9"/>
        <path d="M80 72 L46 94 L80 110 L114 94 Z" fill="${belly}"/>
        <path d="M66 88 Q80 98 94 88" fill="none" stroke="${stroke}" stroke-width="1.1" opacity="0.35"/>
        <path d="M72 92 Q80 96 88 92" fill="none" stroke="${stroke}" stroke-width="0.85" opacity="0.28"/>
        <path d="M68 74 C62 88 64 98 70 96 C74 88 74 80 68 74Z" fill="${fin}" stroke="${stroke}" stroke-width="1" opacity="0.85"/>
        <path d="M92 74 C98 88 96 98 90 96 C86 88 86 80 92 74Z" fill="${fin}" stroke="${stroke}" stroke-width="1" opacity="0.85"/>
        ${companionEyes(73, 84, 87, 84, 3.4)}
        <path d="M22 106 C34 100 54 92 74 86" fill="none" stroke="${fin}" stroke-width="1" opacity="0.4"/>
        <path d="M138 106 C126 100 106 92 86 86" fill="none" stroke="${fin}" stroke-width="1" opacity="0.4"/>`;
}

/** Sea turtle — matches the home-screen splash turtle art. */
function companionTurtleMarkup({
  flipperRear = "#2a5f4c",
  flipperFront = "#347a5e",
  flipperFrontLight = "#3d8b6e",
  shell = "#2f6b55",
  shellMid = "#3d8b6e",
  shellPlate = "#4aad80",
  shellStroke = "#1f4d3c",
  head = "#3d8b6e",
} = {}) {
  return `
        <path d="M54 88 C40 74 28 78 34 90 C40 96 50 94 54 88 Z" fill="${flipperRear}" stroke="${shellStroke}" stroke-width="0.95"/>
        <path d="M56 98 C44 112 32 108 38 98 C44 94 52 96 56 98 Z" fill="${flipperRear}" stroke="${shellStroke}" stroke-width="0.95"/>
        <path d="M72 100 C84 116 102 112 96 98 C88 94 76 96 72 100 Z" fill="${flipperFront}" stroke="${shellStroke}" stroke-width="0.95"/>
        <path d="M76 101 C86 112 96 108 92 100" fill="none" stroke="${shellStroke}" stroke-width="1.1" opacity="0.45"/>
        <path d="M70 84 C82 68 102 74 96 88 C88 92 74 90 70 84 Z" fill="${flipperFrontLight}" stroke="${shellStroke}" stroke-width="0.95"/>
        <path d="M74 84 C84 74 96 78 92 87" fill="none" stroke="${shellStroke}" stroke-width="1.1" opacity="0.4"/>
        <ellipse cx="62" cy="92" rx="30" ry="17" fill="${shell}" stroke="${shellStroke}" stroke-width="1.2"/>
        <ellipse cx="62" cy="91" rx="22" ry="12" fill="${shellMid}"/>
        <path d="M48 87 L60 81 L74 87 L70 97 L52 97 Z" fill="${shellPlate}" opacity="0.55"/>
        <path d="M54 90 L64 86 L72 90" fill="none" stroke="${shell}" stroke-width="1.35" opacity="0.5"/>
        <ellipse cx="94" cy="91" rx="11" ry="7.5" fill="${head}" stroke="${shellStroke}" stroke-width="1"/>
        ${companionEye(100, 89, 3.2)}
        <path d="M102 93 Q105 95 103 96" fill="none" stroke="${shellStroke}" stroke-width="1" stroke-linecap="round"/>`;
}

function companionInnerMarkup(id, { omitMantaTail = false } = {}) {
  const shadow = `<ellipse cx="80" cy="136" rx="28" ry="5" fill="#020617" opacity="0.28"/>`;
  const mantaOpts = { withTail: !omitMantaTail };
  switch (id) {
    case "harbor_gull":
      return `${shadow}
        <path d="M60 112 C56 122 54 130 52 132 C56 133 62 128 64 116Z" fill="#f97316"/>
        <path d="M100 112 C104 122 106 130 108 132 C104 133 98 128 96 116Z" fill="#f97316"/>
        <path d="M52 130 C50 133 56 134 62 130" fill="#ea580c"/>
        <path d="M108 130 C110 133 104 134 98 130" fill="#ea580c"/>
        <path d="M50 104 C46 86 58 74 80 72 C104 74 116 88 110 106 C106 122 94 130 80 130 C64 130 54 118 50 104Z" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.2"/>
        <path d="M64 108 C68 118 92 118 96 108 C92 120 68 120 64 108Z" fill="#fff"/>
        <path d="M54 96 C34 86 28 68 46 64 C58 78 68 92 74 100" fill="#64748b"/>
        <path d="M106 96 C126 86 132 68 114 64 C102 78 92 92 86 100" fill="#64748b"/>
        <path d="M68 116 C74 126 86 126 92 116 C86 124 74 124 68 116Z" fill="#cbd5e1" stroke="#94a3b8" stroke-width="0.8"/>
        <path d="M60 70 C58 50 70 44 80 44 C92 44 102 52 100 70 C96 82 88 86 80 86 C70 86 62 80 60 70Z" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.1"/>
        ${companionEyes(72, 66, 88, 66, 4.2)}
        <path d="M74 74 C78 84 80 90 80 90 C82 90 86 84 86 74 C82 80 78 80 74 74Z" fill="#f59e0b" stroke="#b45309" stroke-width="0.8"/>
        <ellipse cx="80" cy="82" rx="2.2" ry="1.2" fill="#dc2626"/>`;
    case "clownfish":
      return `${shadow}
        <path d="M36 86 C24 70 18 78 22 88 C18 98 28 102 36 86Z" fill="#ea580c" stroke="#7c2d12" stroke-width="1.1"/>
        <path d="M36 80 Q28 86 36 92 Q30 86 36 80Z" fill="#9a3412"/>
        <path d="M38 86 C42 64 70 52 98 58 C118 62 132 72 138 82 C142 86 140 92 134 94 C122 104 96 112 70 108 C50 104 40 96 38 86Z" fill="#f97316" stroke="#9a3412" stroke-width="1.3"/>
        <path d="M78 60 C86 48 100 50 104 64 C96 60 86 60 78 60Z" fill="#ea580c" stroke="#9a3412" stroke-width="1"/>
        <path d="M88 104 C92 118 78 122 76 108 C80 106 84 104 88 104Z" fill="#ea580c" stroke="#9a3412" stroke-width="0.9"/>
        <path d="M52 68 C48 86 52 104 56 108" fill="none" stroke="#1c1917" stroke-width="8" stroke-linecap="round"/>
        <path d="M52 68 C48 86 52 104 56 108" fill="none" stroke="#fff" stroke-width="5.2" stroke-linecap="round"/>
        <path d="M88 64 C86 86 90 108 92 110" fill="none" stroke="#1c1917" stroke-width="7" stroke-linecap="round"/>
        <path d="M88 64 C86 86 90 108 92 110" fill="none" stroke="#fff" stroke-width="4.4" stroke-linecap="round"/>
        <path d="M118 74 C122 86 120 98 116 100" fill="none" stroke="#1c1917" stroke-width="5.5" stroke-linecap="round"/>
        <path d="M118 74 C122 86 120 98 116 100" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/>
        ${companionEye(124, 80, 4.4)}
        <path d="M132 88 Q136 92 138 88" fill="none" stroke="#7c2d12" stroke-width="1.2" stroke-linecap="round"/>
        <path d="M128 76 Q132 72 136 76" fill="none" stroke="#9a3412" stroke-width="0.9"/>`;
    case "sea_turtle":
      return `${shadow}${companionTurtleMarkup()}`;
    case "octopus":
      return `${shadow}
        <path d="M48 108 Q40 128 52 132 Q56 114 52 106" fill="#fb7185" stroke="#9f1239" stroke-width="1"/>
        <path d="M62 114 Q56 134 70 136 Q72 118 66 112" fill="#f472b6" stroke="#9f1239" stroke-width="1"/>
        <path d="M78 116 Q76 138 90 136 Q90 118 84 114" fill="#fb7185" stroke="#9f1239" stroke-width="1"/>
        <path d="M94 114 Q100 136 112 132 Q106 114 100 110" fill="#f472b6" stroke="#9f1239" stroke-width="1"/>
        <path d="M108 106 Q120 126 126 120 Q116 104 110 102" fill="#fb7185" stroke="#9f1239" stroke-width="1"/>
        <path d="M42 100 Q32 118 44 122 Q48 106 46 98" fill="#f472b6" stroke="#9f1239" stroke-width="1"/>
        <circle cx="50" cy="126" r="2.1" fill="#fecdd3"/><circle cx="64" cy="130" r="2.1" fill="#fecdd3"/>
        <circle cx="82" cy="132" r="2.1" fill="#fecdd3"/><circle cx="104" cy="128" r="2.1" fill="#fecdd3"/>
        <path d="M50 86 C46 62 62 50 80 50 C100 50 116 64 112 88 C110 104 96 112 80 110 C62 112 52 100 50 86Z" fill="#fb7185" stroke="#9f1239" stroke-width="1.3"/>
        <path d="M62 70 C70 60 90 60 98 72 C90 68 70 68 62 70Z" fill="#fda4af" opacity="0.55"/>
        <path d="M108 86 Q118 90 112 96" fill="#f472b6" stroke="#9f1239" stroke-width="0.8"/>
        ${companionEyes(70, 78, 90, 78, 5)}
        <path d="M72 94 C80 98 88 98 88 94 C84 100 76 100 72 94Z" fill="#9f1239" opacity="0.32"/>`;
    case "dolphin":
      return `${shadow}
        <path d="M26 116 C8 104 2 122 22 128 C12 140 28 148 40 132 C44 124 36 118 26 116Z" fill="#5b6d80" stroke="#334155" stroke-width="1.1"/>
        <path d="M38 114 C48 92 66 66 96 54 C118 44 138 48 150 62 C158 72 154 86 138 90 C116 98 88 114 66 124 C50 130 40 126 38 114Z" fill="#8aa0b4" stroke="#475569" stroke-width="1.35"/>
        <path d="M46 108 C58 82 84 56 118 50 C136 46 146 56 150 66 C128 52 92 62 64 90 C52 102 46 108 46 108Z" fill="#4f6274"/>
        <path d="M54 118 C74 126 108 112 136 84 C122 100 90 118 66 122 C58 122 54 118 54 118Z" fill="#eef3f7"/>
        <path d="M108 62 C118 60 132 68 140 78" fill="none" stroke="#dbe4ee" stroke-width="3.2" stroke-linecap="round" opacity="0.4"/>
        <path d="M90 52 C98 22 122 24 118 56 C108 48 96 48 90 52Z" fill="#3d4f61" stroke="#334155" stroke-width="1.15"/>
        <path d="M104 86 C114 108 96 120 88 104 C92 94 100 88 104 86Z" fill="#5a6d80" stroke="#334155" stroke-width="1"/>
        <path d="M138 64 C148 56 162 60 166 72 C160 80 148 82 138 76Z" fill="#8aa0b4" stroke="#475569" stroke-width="0.95"/>
        <ellipse cx="112" cy="54" rx="3.4" ry="1.6" fill="#334155"/>
        ${companionEye(132, 68, 4.1)}
        <path d="M144 76 Q158 86 166 76" fill="none" stroke="#1e293b" stroke-width="1.45" stroke-linecap="round"/>
        <path d="M138 66 Q142 62 146 66" fill="none" stroke="#64748b" stroke-width="0.8"/>`;
    case "jellyfish":
      return `${shadow}
        <path d="M56 100 Q52 122 58 132" fill="none" stroke="#c4b5fd" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M68 104 Q64 128 72 138" fill="none" stroke="#a78bfa" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M80 106 Q82 130 78 140" fill="none" stroke="#ddd6fe" stroke-width="2.8" stroke-linecap="round"/>
        <path d="M92 104 Q96 128 88 138" fill="none" stroke="#a78bfa" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M104 100 Q110 122 102 132" fill="none" stroke="#c4b5fd" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M62 102 Q60 118 66 124" fill="none" stroke="#7c3aed" stroke-width="1.4" opacity="0.45"/>
        <path d="M98 102 Q102 118 96 124" fill="none" stroke="#7c3aed" stroke-width="1.4" opacity="0.45"/>
        <path d="M50 88 Q50 58 80 52 Q110 58 110 88 Q96 102 80 100 Q64 102 50 88Z" fill="#ddd6fe" stroke="#7c3aed" stroke-width="1.25" opacity="0.94"/>
        <path d="M58 72 C62 62 98 62 102 72 C94 68 66 68 58 72Z" fill="#f5f3ff" opacity="0.72"/>
        <path d="M64 90 Q80 98 96 90" fill="#c4b5fd" opacity="0.55"/>
        ${companionEyes(70, 80, 90, 80, 4.2)}`;
    case "crab":
      return `${shadow}
        <path d="M46 86 C36 74 28 68 24 72 C28 64 40 70 44 82" fill="none" stroke="#b91c1c" stroke-width="3.1" stroke-linecap="round"/>
        <path d="M114 86 C124 74 132 68 136 72 C132 64 120 70 116 82" fill="none" stroke="#b91c1c" stroke-width="3.1" stroke-linecap="round"/>
        <path d="M24 70 C14 58 22 48 34 58 C38 64 32 72 24 70Z" fill="#ef4444" stroke="#7f1d1d" stroke-width="1"/>
        <path d="M136 70 C146 58 138 48 126 58 C122 64 128 72 136 70Z" fill="#ef4444" stroke="#7f1d1d" stroke-width="1"/>
        <path d="M58 112 C54 124 50 132 52 132 C56 128 62 116 62 112" fill="none" stroke="#b91c1c" stroke-width="2.3" stroke-linecap="round"/>
        <path d="M70 114 C68 126 66 134 68 134 C72 128 74 116 74 114" fill="none" stroke="#b91c1c" stroke-width="2.3" stroke-linecap="round"/>
        <path d="M90 114 C92 126 94 134 92 134 C88 128 86 116 86 114" fill="none" stroke="#b91c1c" stroke-width="2.3" stroke-linecap="round"/>
        <path d="M102 112 C106 124 110 132 108 132 C104 128 98 116 98 112" fill="none" stroke="#b91c1c" stroke-width="2.3" stroke-linecap="round"/>
        <path d="M48 96 C50 78 64 72 80 72 C98 72 112 80 112 96 C110 112 96 120 80 120 C62 120 46 110 48 96Z" fill="#ef4444" stroke="#7f1d1d" stroke-width="1.3"/>
        <path d="M58 90 Q80 82 102 90" fill="none" stroke="#b91c1c" stroke-width="1.2"/>
        <path d="M68 78 C66 66 64 56 66 50" fill="none" stroke="#7f1d1d" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M92 78 C94 66 96 56 94 50" fill="none" stroke="#7f1d1d" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M66 50 C64 42 70 38 76 42" fill="none" stroke="#7f1d1d" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M94 50 C96 42 90 38 84 42" fill="none" stroke="#7f1d1d" stroke-width="1.8" stroke-linecap="round"/>
        ${companionEyes(70, 44, 90, 44, 4.2)}
        <path d="M72 104 C80 108 88 108 88 104 C84 110 76 110 72 104Z" fill="#7f1d1d" opacity="0.35"/>`;
    case "manta":
      return `${shadow}${companionMantaMarkup(mantaOpts)}`;
    case "puffer":
      return `${shadow}
        <path d="M80 54 C102 56 118 70 118 90 C118 112 102 126 80 124 C58 126 42 110 42 90 C42 68 58 52 80 54Z" fill="#facc15" stroke="#a16207" stroke-width="1.4"/>
        <path d="M80 54 C82 44 78 44 80 54Z" fill="#ca8a04"/>
        <path d="M56 66 C48 56 50 54 58 66Z" fill="#ca8a04"/>
        <path d="M104 66 C112 56 110 54 102 66Z" fill="#ca8a04"/>
        <path d="M44 88 C34 86 34 90 44 90Z" fill="#ca8a04"/>
        <path d="M116 88 C126 86 126 90 116 90Z" fill="#ca8a04"/>
        <path d="M54 112 C44 118 46 122 56 112Z" fill="#ca8a04"/>
        <path d="M106 112 C116 118 114 122 104 112Z" fill="#ca8a04"/>
        <path d="M80 124 C82 134 78 134 80 124Z" fill="#ca8a04"/>
        <circle cx="62" cy="100" r="2.4" fill="#f97316" opacity="0.75"/>
        <circle cx="98" cy="102" r="2.2" fill="#f97316" opacity="0.75"/>
        <circle cx="80" cy="108" r="2" fill="#f97316" opacity="0.6"/>
        <path d="M66 102 C74 112 86 112 94 102 C86 108 74 108 66 102Z" fill="#fef9c3"/>
        ${companionEyes(70, 82, 92, 82, 5.2)}
        <path d="M74 96 Q80 102 86 96" fill="#78350f"/>
        <path d="M76 94 Q80 90 84 94" fill="none" stroke="#78350f" stroke-width="1.1"/>`;
    case "otter":
      return `${shadow}
        <path d="M44 112 C36 104 38 94 50 90 C48 78 54 66 64 58 C72 52 88 52 96 58 C106 66 112 78 110 90 C122 94 124 106 116 116 C106 128 92 132 80 132 C66 132 52 124 44 112Z" fill="#c2854a" stroke="#5c3a1e" stroke-width="1.15"/>
        <path d="M58 112 C66 122 94 122 102 112 C94 126 66 126 58 112Z" fill="#fde8c8"/>
        <ellipse cx="80" cy="108" rx="18" ry="14" fill="#f5d7b0" opacity="0.72"/>
        <path d="M42 104 C38 98 42 92 50 96 C52 102 46 108 42 104Z" fill="#a66f3a" stroke="#5c3a1e" stroke-width="0.9"/>
        <path d="M118 104 C122 98 118 92 110 96 C108 102 114 108 118 104Z" fill="#a66f3a" stroke="#5c3a1e" stroke-width="0.9"/>
        <ellipse cx="80" cy="72" rx="24" ry="22" fill="#d4a574" stroke="#5c3a1e" stroke-width="1.15"/>
        <ellipse cx="64" cy="62" rx="7" ry="6" fill="#c2854a" stroke="#5c3a1e" stroke-width="0.95"/>
        <ellipse cx="96" cy="62" rx="7" ry="6" fill="#c2854a" stroke="#5c3a1e" stroke-width="0.95"/>
        <ellipse cx="64" cy="63" rx="3.2" ry="2.6" fill="#f5d7b0" opacity="0.55"/>
        <ellipse cx="96" cy="63" rx="3.2" ry="2.6" fill="#f5d7b0" opacity="0.55"/>
        <ellipse cx="80" cy="78" rx="12" ry="9" fill="#fde8c8"/>
        <ellipse cx="80" cy="82" rx="7" ry="5" fill="#f5d7b0"/>
        ${companionEyes(70, 68, 90, 68, 4.6)}
        <ellipse cx="80" cy="84" rx="3.2" ry="2.4" fill="#5c3a1e"/>
        <ellipse cx="80" cy="83.2" rx="1.1" ry="0.7" fill="#fde8c8" opacity="0.7"/>
        <path d="M74 86 C78 89 82 89 86 86" fill="none" stroke="#5c3a1e" stroke-width="1.05" stroke-linecap="round"/>
        <circle cx="66" cy="80" r="3.2" fill="#fda4af" opacity="0.42"/>
        <circle cx="94" cy="80" r="3.2" fill="#fda4af" opacity="0.42"/>
        <path d="M58 82 C52 84 48 88 50 88 M102 82 C108 84 112 88 110 88" stroke="#5c3a1e" stroke-width="0.95" stroke-linecap="round" opacity="0.55"/>
        <path d="M108 100 C118 94 128 98 126 108 C118 114 108 110 108 108Z" fill="#a66f3a" stroke="#5c3a1e" stroke-width="0.95"/>
        <ellipse cx="120" cy="104" rx="5" ry="4" fill="#fde8c8" stroke="#5c3a1e" stroke-width="0.8"/>`;
    case "pirate_gull":
      return `${shadow}
        <path d="M60 112 C56 122 54 130 52 132 C56 133 62 128 64 116Z" fill="#f97316"/>
        <path d="M100 112 C104 122 106 130 108 132 C104 133 98 128 96 116Z" fill="#f97316"/>
        <path d="M50 104 C46 86 58 74 80 72 C104 74 116 88 110 106 C106 122 94 130 80 130 C64 130 54 118 50 104Z" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1.2"/>
        <path d="M64 108 C68 118 92 118 96 108 C92 120 68 120 64 108Z" fill="#fff"/>
        <path d="M54 96 C34 86 28 68 46 64 C58 78 68 92 74 100" fill="#64748b"/>
        <path d="M106 96 C126 86 132 68 114 64 C102 78 92 92 86 100" fill="#64748b"/>
        <path d="M60 70 C58 50 70 44 80 44 C92 44 102 52 100 70 C96 82 88 86 80 86 C70 86 62 80 60 70Z" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.1"/>
        ${companionEyes(72, 66, 88, 66, 4.2)}
        <path d="M64 64 C62 58 70 54 80 54 C90 54 98 60 96 66 C90 62 70 62 64 64Z" fill="#111827"/>
        <path d="M74 74 C78 84 80 90 80 90 C82 90 86 84 86 74 C82 80 78 80 74 74Z" fill="#f59e0b" stroke="#b45309" stroke-width="0.8"/>
        <path d="M54 58 C56 38 70 28 80 28 C94 28 106 40 106 58 C96 70 86 74 80 74 C70 74 58 68 54 58Z" fill="#1e2937" stroke="#0f172a" stroke-width="1.2"/>
        <path d="M66 46 H94" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
        <circle cx="80" cy="52" r="3.2" fill="#fbbf24"/>
        <path d="M104 58 C114 64 120 70 116 72 C108 70 104 64 104 58Z" fill="#b91c1c"/>`;
    case "cowboy_shark":
      return `${shadow}
        <path d="M34 90 C22 72 10 78 16 90 C10 102 22 108 34 96 C38 110 64 112 92 110 C124 108 142 94 140 82 C138 64 114 56 84 58 C54 60 36 72 34 90 Z" fill="#5b9bd5" stroke="#1a2b4a" stroke-width="2.2"/>
        <path d="M40 92 C56 104 112 102 132 86 C108 98 58 106 40 96 Z" fill="#f8fafc" stroke="#1a2b4a" stroke-width="1.6"/>
        <path d="M38 94 C62 108 108 104 132 82" fill="none" stroke="#1a2b4a" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M68 58 C74 30 94 26 102 52 C92 56 76 58 68 58 Z" fill="#5b9bd5" stroke="#1a2b4a" stroke-width="2"/>
        <path d="M56 108 C46 122 38 118 48 104 C52 106 54 107 56 108 Z" fill="#5b9bd5" stroke="#1a2b4a" stroke-width="1.9"/>
        <path d="M50 110 C44 118 40 114 46 106 Z" fill="#f8fafc" opacity="0.85"/>
        <path d="M96 78 C92 84 92 92 96 98" fill="none" stroke="#1a2b4a" stroke-width="2" stroke-linecap="round"/>
        <path d="M90 77 C86 83 86 93 90 99" fill="none" stroke="#1a2b4a" stroke-width="2" stroke-linecap="round"/>
        <path d="M84 76 C80 82 80 94 84 100" fill="none" stroke="#1a2b4a" stroke-width="2" stroke-linecap="round"/>
        <path d="M118 78 C138 74 152 80 148 86 L122 84 Z" fill="#5b9bd5" stroke="#1a2b4a" stroke-width="2"/>
        <path d="M122 92 C146 96 152 90 144 100 L120 96 Z" fill="#5b9bd5" stroke="#1a2b4a" stroke-width="2"/>
        <path d="M124 84 C140 82 146 86 144 94 C136 96 128 94 124 88 Z" fill="#8b2942"/>
        <path d="M128 85 L130 89 L126 89 Z" fill="#ffffff"/>
        <path d="M133 85 L135 89 L131 89 Z" fill="#ffffff"/>
        <path d="M138 86 L140 90 L136 90 Z" fill="#ffffff"/>
        <path d="M143 86 L145 90 L141 90 Z" fill="#ffffff"/>
        <path d="M128 93 L130 89 L126 89 Z" fill="#ffffff"/>
        <path d="M133 94 L135 90 L131 90 Z" fill="#ffffff"/>
        <path d="M138 95 L140 91 L136 91 Z" fill="#ffffff"/>
        <path d="M143 96 L145 92 L141 92 Z" fill="#ffffff"/>
        <circle cx="148" cy="82" r="1.3" fill="#1a2b4a"/>
        <circle cx="148" cy="86" r="1.3" fill="#1a2b4a"/>
        ${companionEye(108, 70, 5.4)}
        <g transform="rotate(-12 110 58)">
          <path d="M86 58 C88 52 98 54 110 54 C122 54 132 52 134 58 C132 64 122 62 110 62 C98 62 88 64 86 58Z" fill="#92400e" stroke="#5c3a1e" stroke-width="1.1"/>
          <path d="M96 58 C98 44 102 34 110 34 C118 34 122 44 124 58Z" fill="#b45309" stroke="#78350f" stroke-width="1.2"/>
        </g>
        <path d="M58 96 Q80 110 104 96" fill="none" stroke="#b91c1c" stroke-width="3.8" stroke-linecap="round"/>`;
    case "party_fish":
      return `${shadow}
        <path d="M36 88 C24 72 18 80 22 90 C18 100 28 104 36 88Z" fill="#06b6d4" stroke="#0e7490" stroke-width="1.1"/>
        <path d="M38 88 C44 66 72 54 100 60 C118 64 132 74 138 84 C140 90 134 96 124 102 C100 112 70 110 48 100 C40 96 38 92 38 88Z" fill="#22d3ee" stroke="#0e7490" stroke-width="1.3"/>
        <path d="M80 62 C88 48 104 50 108 64 C98 60 88 60 80 62Z" fill="#f472b6" stroke="#9d174d" stroke-width="1"/>
        <circle cx="70" cy="90" r="5" fill="#fde047"/>
        <circle cx="94" cy="98" r="4" fill="#fb7185"/>
        <circle cx="88" cy="80" r="3.2" fill="#a3e635"/>
        ${companionEye(120, 82, 4.2)}
        <g transform="rotate(16 122 70)">
          <path d="M110 72 C114 52 122 40 122 40 C130 52 134 72 134 72 C128 68 116 68 110 72Z" fill="#ef4444" stroke="#7f1d1d" stroke-width="1.1"/>
          <path d="M122 44 L122 72" stroke="#fff" stroke-width="1.4" opacity="0.7"/>
          <circle cx="122" cy="42" r="4" fill="#fbbf24" stroke="#b45309" stroke-width="0.8"/>
        </g>
        <circle cx="56" cy="70" r="3" fill="#f472b6"/>
        <circle cx="108" cy="68" r="2.6" fill="#22c55e"/>`;
    case "ninja_octopus":
      return `${shadow}
        <path d="M48 108 Q40 128 52 132 Q56 114 52 106" fill="#1f2937" stroke="#0f172a" stroke-width="1"/>
        <path d="M62 114 Q56 134 70 136 Q72 118 66 112" fill="#111827" stroke="#0f172a" stroke-width="1"/>
        <path d="M78 116 Q76 138 90 136 Q90 118 84 114" fill="#1f2937" stroke="#0f172a" stroke-width="1"/>
        <path d="M94 114 Q100 136 112 132 Q106 114 100 110" fill="#111827" stroke="#0f172a" stroke-width="1"/>
        <path d="M108 106 Q120 126 126 120 Q116 104 110 102" fill="#1f2937" stroke="#0f172a" stroke-width="1"/>
        <path d="M50 86 C46 62 62 50 80 50 C100 50 116 64 112 88 C110 104 96 112 80 110 C62 112 52 100 50 86Z" fill="#1f2937" stroke="#0f172a" stroke-width="1.3"/>
        <path d="M50 78 H110" stroke="#b91c1c" stroke-width="10" stroke-linecap="round"/>
        <path d="M110 74 L124 64" stroke="#b91c1c" stroke-width="4" stroke-linecap="round"/>
        ${companionEyes(70, 78, 90, 78, 4.8)}
        <path d="M62 90 H98" stroke="#0f172a" stroke-width="3" opacity="0.45"/>`;
    case "wizard_turtle":
      return `${shadow}${companionTurtleMarkup()}
        <g transform="rotate(-18 130 58)">
          <path d="M114 64 L124 30 Q134 18 146 32 L152 66 Q138 74 128 72 Q116 70 114 64Z" fill="#4c1d95" stroke="#2e1065" stroke-width="1.2"/>
          <path d="M126 58 Q136 48 146 58" fill="none" stroke="#c4b5fd" stroke-width="1.35"/>
          <circle cx="136" cy="38" r="4" fill="#fde047"/>
        </g>
        <path d="M96 108 C110 92 124 80 128 78 C122 96 118 112 112 114 C104 116 98 112 96 108Z" fill="#7c3aed" stroke="#4c1d95" stroke-width="1"/>
        <circle cx="130" cy="76" r="4.4" fill="#fbbf24"/>`;
    case "super_dolphin":
      return `${shadow}
        <path d="M48 78 C72 58 108 54 138 78 C118 92 84 96 58 88 C50 84 48 80 48 78Z" fill="#dc2626" stroke="#7f1d1d" stroke-width="1.1"/>
        <path d="M26 116 C8 104 2 122 22 128 C12 140 28 148 40 132 C44 124 36 118 26 116Z" fill="#1d4ed8" stroke="#1e3a8a" stroke-width="1.1"/>
        <path d="M38 114 C48 92 66 66 96 54 C118 44 138 48 150 62 C158 72 154 86 138 90 C116 98 88 114 66 124 C50 130 40 126 38 114Z" fill="#3b82f6" stroke="#1e3a8a" stroke-width="1.35"/>
        <path d="M54 118 C74 126 108 112 136 84 C122 100 90 118 66 122 C58 122 54 118 54 118Z" fill="#dbeafe"/>
        <path d="M90 52 C98 22 122 24 118 56 C108 48 96 48 90 52Z" fill="#1d4ed8" stroke="#1e3a8a" stroke-width="1.15"/>
        <path d="M104 86 C114 108 96 120 88 104 C92 94 100 88 104 86Z" fill="#2563eb" stroke="#1e3a8a" stroke-width="1"/>
        <path d="M138 64 C148 56 162 60 166 72 C160 80 148 82 138 76Z" fill="#60a5fa" stroke="#1e3a8a" stroke-width="0.95"/>
        ${companionEye(132, 68, 4.1)}
        <path d="M144 76 Q158 86 166 76" fill="none" stroke="#1e3a8a" stroke-width="1.45" stroke-linecap="round"/>`;
    case "chef_crab":
      return `${shadow}
        <path d="M46 90 C36 78 28 72 24 76 C28 68 40 74 44 86" fill="none" stroke="#b91c1c" stroke-width="3.1" stroke-linecap="round"/>
        <path d="M114 90 C124 78 132 72 136 76 C132 68 120 74 116 86" fill="none" stroke="#b91c1c" stroke-width="3.1" stroke-linecap="round"/>
        <path d="M24 74 C14 62 22 52 34 62 C38 68 32 76 24 74Z" fill="#ef4444" stroke="#7f1d1d" stroke-width="1"/>
        <path d="M136 74 C146 62 138 52 126 62 C122 68 128 76 136 74Z" fill="#ef4444" stroke="#7f1d1d" stroke-width="1"/>
        <path d="M58 116 C54 128 50 134 52 134 C56 130 62 120 62 116" fill="none" stroke="#b91c1c" stroke-width="2.3" stroke-linecap="round"/>
        <path d="M70 118 C68 130 66 136 68 136 C72 130 74 120 74 118" fill="none" stroke="#b91c1c" stroke-width="2.3" stroke-linecap="round"/>
        <path d="M90 118 C92 130 94 136 92 136 C88 130 86 120 86 118" fill="none" stroke="#b91c1c" stroke-width="2.3" stroke-linecap="round"/>
        <path d="M102 116 C106 128 110 134 108 134 C104 130 98 120 98 116" fill="none" stroke="#b91c1c" stroke-width="2.3" stroke-linecap="round"/>
        <path d="M48 100 C50 82 64 76 80 76 C98 76 112 84 112 100 C110 116 96 124 80 124 C62 124 46 114 48 100Z" fill="#ef4444" stroke="#7f1d1d" stroke-width="1.3"/>
        <path d="M58 90 Q80 82 102 90" fill="none" stroke="#b91c1c" stroke-width="1.2"/>
        <path d="M64 104 Q80 110 96 104" fill="none" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
        <path d="M60 72 C62 60 72 56 80 56 C90 56 100 62 100 72 C96 80 88 84 80 84 C70 84 62 78 60 72Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.2"/>
        <path d="M58 80 C58 76 62 78 80 78 C98 78 102 76 102 80 C102 88 96 90 80 90 C64 90 58 86 58 80Z" fill="#fff" stroke="#cbd5e1" stroke-width="1"/>
        <path d="M64 72 Q80 64 96 72" fill="none" stroke="#e2e8f0" stroke-width="2"/>
        ${companionEyes(70, 96, 90, 96, 3.8)}`;
    case "disco_jelly":
      return `${shadow}
        <path d="M56 100 Q52 122 58 132" fill="none" stroke="#f0abfc" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M68 104 Q64 128 72 138" fill="none" stroke="#67e8f9" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M80 106 Q82 130 78 140" fill="none" stroke="#fde047" stroke-width="2.8" stroke-linecap="round"/>
        <path d="M92 104 Q96 128 88 138" fill="none" stroke="#fb7185" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M104 100 Q110 122 102 132" fill="none" stroke="#c4b5fd" stroke-width="2.6" stroke-linecap="round"/>
        <path d="M50 88 Q50 58 80 52 Q110 58 110 88 Q96 102 80 100 Q64 102 50 88Z" fill="#c084fc" stroke="#6b21a8" stroke-width="1.25"/>
        <path d="M58 72 C62 62 98 62 102 72 C94 68 66 68 58 72Z" fill="#f5d0fe" opacity="0.65"/>
        <circle cx="64" cy="72" r="3" fill="#fde047"/>
        <circle cx="96" cy="70" r="2.6" fill="#67e8f9"/>
        <circle cx="80" cy="66" r="2.4" fill="#fb7185"/>
        ${companionEyes(70, 82, 90, 82, 4.2)}
        <path d="M62 80 H78 M82 80 H98" stroke="#0f172a" stroke-width="3.2" stroke-linecap="round"/>
        <path d="M64 78 H76 M84 78 H96" stroke="#f8fafc" stroke-width="1.2"/>`;
    case "viking_seal":
      return `${shadow}
        <path d="M44 108 C38 96 48 86 62 84 C66 64 72 54 80 52 C90 54 98 66 100 84 C116 86 124 98 116 110 C106 124 92 128 80 128 C64 128 50 118 44 108Z" fill="#94a3b8" stroke="#334155" stroke-width="1.25"/>
        <path d="M62 110 C70 118 90 118 98 110 C90 120 70 120 62 110Z" fill="#e2e8f0"/>
        <path d="M42 106 C36 100 40 94 50 98 C54 104 46 110 42 106Z" fill="#64748b"/>
        <path d="M118 106 C124 100 120 94 110 98 C106 104 114 110 118 106Z" fill="#64748b"/>
        <path d="M60 76 C58 60 68 54 80 54 C94 54 102 64 100 78 C96 86 88 90 80 90 C70 90 62 84 60 76Z" fill="#cbd5e1" stroke="#475569" stroke-width="1.2"/>
        ${companionEyes(72, 72, 88, 72, 4)}
        <path d="M74 82 C78 86 82 86 86 82 C82 88 78 88 74 82Z" fill="#1e293b"/>
        <path d="M58 70 C52 50 48 40 56 42 C64 56 66 66 66 70Z" fill="#78716c" stroke="#44403c" stroke-width="1.1"/>
        <path d="M102 70 C108 50 112 40 104 42 C96 56 94 66 94 70Z" fill="#78716c" stroke="#44403c" stroke-width="1.1"/>
        <path d="M58 68 C70 54 90 54 102 68 C92 80 84 84 80 84 C74 84 64 78 58 68Z" fill="#a8a29e" stroke="#44403c" stroke-width="1.2"/>
        <path d="M68 64 H92" stroke="#fbbf24" stroke-width="1.6"/>`;
    case "royal_manta":
      return `${shadow}${companionMantaMarkup({ top: "#1e3a8a", stroke: "#0f172a", belly: "#fde68a", bellyMid: "#fbbf24", fin: "#2563eb", ...mantaOpts })}
        <path d="M62 74 C66 58 74 56 80 66 C86 56 94 58 98 74 C90 84 80 86 70 82 C64 80 62 76 62 74Z" fill="#fbbf24" stroke="#b45309" stroke-width="1.2"/>
        <path d="M68 66 H92" stroke="#fde68a" stroke-width="1.3"/>
        <circle cx="80" cy="64" r="3.4" fill="#ef4444"/>
        <path d="M42 100 C36 86 48 86 48 94Z" fill="#7c3aed" opacity="0.8"/>
        <path d="M118 100 C124 86 112 86 112 94Z" fill="#7c3aed" opacity="0.8"/>`;
    case "starfish":
      return `${shadow}
        <path d="M80 44 L92 72 L122 76 L98 96 L104 126 L80 110 L56 126 L62 96 L38 76 L68 72 Z" fill="#fb7185" stroke="#be123c" stroke-width="1.2"/>
        <path d="M80 54 L86 72 L104 74 L90 86 L94 104 L80 94 L66 104 L70 86 L56 74 L74 72 Z" fill="#fda4af"/>
        <circle cx="72" cy="78" r="3.4" fill="#fda4af" opacity="0.55"/>
        <circle cx="88" cy="78" r="3.4" fill="#fda4af" opacity="0.55"/>
        ${companionEyes(72, 74, 88, 74, 3.8)}
        <path d="M74 88 C78 91 82 91 86 88" fill="none" stroke="#be123c" stroke-width="1" stroke-linecap="round" opacity="0.65"/>`;
    case "angelfish":
      return `${shadow}
        <path d="M80 34 C92 28 108 36 112 52 C116 70 108 92 96 108 C88 118 72 118 64 108 C52 92 44 70 48 52 C52 36 68 28 80 34Z" fill="#facc15" stroke="#ca8a04" stroke-width="1.35"/>
        <path d="M80 40 C90 36 102 42 104 54 C108 70 100 90 90 102 C84 110 76 110 70 102 C60 90 52 70 56 54 C58 42 70 36 80 40Z" fill="#fde047"/>
        <path d="M66 28 C72 18 88 18 94 28 C88 24 72 24 66 28Z" fill="#1d4ed8" stroke="#1e3a8a" stroke-width="1"/>
        <path d="M58 118 C66 132 94 132 102 118 C94 126 66 126 58 118Z" fill="#1d4ed8" stroke="#1e3a8a" stroke-width="1"/>
        <path d="M42 78 C28 70 24 78 30 88 C36 96 44 90 42 78Z" fill="#2563eb" stroke="#1e3a8a" stroke-width="1"/>
        <path d="M118 78 C132 70 136 78 130 88 C124 96 116 90 118 78Z" fill="#2563eb" stroke="#1e3a8a" stroke-width="1"/>
        <path d="M64 50 C66 70 66 90 64 104" fill="none" stroke="#1e40af" stroke-width="5.2" stroke-linecap="round" opacity="0.55"/>
        <path d="M80 48 C82 70 82 90 80 106" fill="none" stroke="#1e40af" stroke-width="5.2" stroke-linecap="round" opacity="0.55"/>
        <path d="M96 50 C94 70 94 90 96 104" fill="none" stroke="#1e40af" stroke-width="5.2" stroke-linecap="round" opacity="0.55"/>
        <ellipse cx="92" cy="62" rx="10" ry="7" fill="#fff" opacity="0.22"/>
        ${companionEye(98, 60, 4.4)}
        <path d="M106 68 Q112 72 108 74" fill="none" stroke="#92400e" stroke-width="1.1" stroke-linecap="round"/>`;
    case "lobster":
      return `${shadow}
        <path d="M64 118 C58 128 52 136 44 134 C50 126 58 122 64 118Z" fill="#b91c1c" stroke="#7f1d1d" stroke-width="0.95"/>
        <path d="M72 120 C68 132 64 140 58 138 C62 130 68 124 72 120Z" fill="#dc2626" stroke="#7f1d1d" stroke-width="0.95"/>
        <path d="M80 121 L76 140 L84 140 Z" fill="#ef4444" stroke="#7f1d1d" stroke-width="0.95"/>
        <path d="M88 120 C92 132 96 140 102 138 C98 130 92 124 88 120Z" fill="#dc2626" stroke="#7f1d1d" stroke-width="0.95"/>
        <path d="M96 118 C102 128 108 136 116 134 C110 126 102 122 96 118Z" fill="#b91c1c" stroke="#7f1d1d" stroke-width="0.95"/>
        <path d="M44 88 C34 76 26 70 22 74 C26 66 38 72 42 84" fill="none" stroke="#dc2626" stroke-width="3.2" stroke-linecap="round"/>
        <path d="M116 88 C126 76 134 70 138 74 C134 66 122 72 118 84" fill="none" stroke="#dc2626" stroke-width="3.2" stroke-linecap="round"/>
        <path d="M22 72 C12 60 20 50 32 60 C36 66 30 74 22 72Z" fill="#ef4444" stroke="#7f1d1d" stroke-width="1"/>
        <path d="M138 72 C148 60 140 50 128 60 C124 66 130 74 138 72Z" fill="#ef4444" stroke="#7f1d1d" stroke-width="1"/>
        <path d="M48 98 C50 78 64 72 80 72 C98 72 112 80 112 96 C110 114 96 122 80 122 C62 122 46 112 48 98Z" fill="#dc2626" stroke="#7f1d1d" stroke-width="1.3"/>
        <path d="M58 112 C54 124 50 132 52 132 C56 128 62 116 62 112" fill="none" stroke="#991b1b" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M70 114 C68 126 66 134 68 134 C72 128 74 116 74 114" fill="none" stroke="#991b1b" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M90 114 C92 126 94 134 92 134 C88 128 86 116 86 114" fill="none" stroke="#991b1b" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M102 112 C106 124 110 132 108 132 C104 128 98 116 98 112" fill="none" stroke="#991b1b" stroke-width="2.2" stroke-linecap="round"/>
        ${companionEyes(68, 90, 92, 90, 4)}
        <path d="M70 76 C58 58 50 44 46 34" fill="none" stroke="#dc2626" stroke-width="2.1" stroke-linecap="round"/>
        <path d="M90 76 C102 58 110 44 114 34" fill="none" stroke="#dc2626" stroke-width="2.1" stroke-linecap="round"/>
        <circle cx="46" cy="34" r="2.2" fill="#ef4444" stroke="#7f1d1d" stroke-width="0.7"/>
        <circle cx="114" cy="34" r="2.2" fill="#ef4444" stroke="#7f1d1d" stroke-width="0.7"/>`;
    case "blue_tang":
      return `${shadow}
        <path d="M36 88 C24 72 18 80 22 90 C18 100 28 104 36 88Z" fill="#facc15" stroke="#ca8a04" stroke-width="1"/>
        <path d="M38 88 C44 64 72 54 102 60 C122 64 136 76 138 86 C140 92 134 98 124 104 C100 116 68 112 48 102 C40 98 38 92 38 88Z" fill="#0ea5e9" stroke="#0369a1" stroke-width="1.3"/>
        <path d="M78 60 C88 48 104 50 108 64 C98 60 86 60 78 60Z" fill="#0284c7" stroke="#0c4a6e" stroke-width="1"/>
        <path d="M88 104 C92 118 78 122 76 108 C80 106 84 104 88 104Z" fill="#0369a1" stroke="#0c4a6e" stroke-width="0.9"/>
        <path d="M108 62 C118 58 126 64 124 74 C118 78 110 74 108 68 Z" fill="#0f172a" opacity="0.82"/>
        <path d="M54 118 C74 126 108 112 136 84 C122 100 90 118 66 122 C58 122 54 118 54 118Z" fill="#bae6fd" opacity="0.45"/>
        ${companionEye(122, 80, 4.2)}`;
    case "sailfish":
      return `${shadow}
        <path d="M28 88 C14 82 12 92 28 96 C16 102 22 110 34 102 C36 96 34 90 28 88Z" fill="#64748b" stroke="#1e293b" stroke-width="1"/>
        <path d="M34 90 C40 70 62 56 92 60 C112 64 126 74 132 84 C128 90 118 100 96 106 C70 112 44 104 34 90Z" fill="#38bdf8" stroke="#0369a1" stroke-width="1.3"/>
        <path d="M52 96 C68 110 100 108 120 90 C108 102 80 108 60 102 C54 100 52 98 52 96Z" fill="#e0f2fe"/>
        <path d="M72 58 C76 28 92 18 96 52 C88 44 80 44 72 58Z" fill="#0284c7" stroke="#0c4a6e" stroke-width="1.15"/>
        <path d="M118 86 C132 76 144 78 142 90 C140 100 128 100 118 94Z" fill="#0ea5e9" stroke="#0369a1" stroke-width="1"/>
        ${companionEye(104, 78, 4.2)}
        <path d="M58 94 Q80 106 104 94" fill="none" stroke="#0369a1" stroke-width="3.2" stroke-linecap="round"/>`;
    case "nautilus":
      return `${shadow}
        <path d="M52 88 C48 68 62 54 82 52 C104 50 122 64 124 84 C126 104 110 120 88 122 C66 124 50 108 52 88Z" fill="#fde68a" stroke="#b45309" stroke-width="1.2"/>
        <path d="M58 88 C56 72 68 62 82 62 C98 62 110 72 110 86 C110 100 98 110 82 110 C66 110 54 100 58 88Z" fill="#fef3c7"/>
        <path d="M64 88 C62 76 72 70 82 70 C92 70 102 76 102 86 C102 96 92 102 82 102 C72 102 64 96 64 88Z" fill="#fcd34d"/>
        <path d="M70 88 C68 80 76 76 82 76 C88 76 96 80 96 86 C96 92 88 96 82 96 C76 96 70 92 70 88Z" fill="#fbbf24"/>
        <path d="M76 88 C74 84 80 82 82 82 C84 82 90 84 88 88 C86 92 80 92 76 88Z" fill="#92400e"/>
        <path d="M124 84 C132 78 138 82 136 90 C132 96 124 94 124 84Z" fill="#fde68a" stroke="#b45309" stroke-width="0.9"/>
        ${companionEyes(72, 78, 92, 78, 3.6)}`;
    case "space_fish":
      return `${shadow}
        <path d="M36 88 C24 72 18 80 22 90 C18 100 28 104 36 88Z" fill="#6366f1" stroke="#312e81" stroke-width="1"/>
        <path d="M38 88 C44 64 72 54 100 60 C118 64 132 74 138 84 C140 90 134 96 124 102 C100 112 70 110 48 100 C40 96 38 92 38 88Z" fill="#4338ca" stroke="#312e81" stroke-width="1.3"/>
        <path d="M48 78 C56 66 104 66 112 78 C98 86 62 86 48 78Z" fill="#818cf8" opacity="0.45"/>
        ${companionEye(120, 80, 4.2)}
        <ellipse cx="80" cy="72" rx="22" ry="10" fill="none" stroke="#c4b5fd" stroke-width="1.4" opacity="0.85"/>
        <circle cx="68" cy="68" r="2.2" fill="#fde047"/>
        <circle cx="92" cy="66" r="1.8" fill="#67e8f9"/>
        <circle cx="80" cy="62" r="1.6" fill="#f472b6"/>`;
    case "coral_angel":
      return `${shadow}
        <path d="M36 88 C24 72 18 80 22 90 C18 100 28 104 36 88Z" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
        <path d="M38 88 C42 58 70 48 98 54 C118 58 132 70 136 82 C138 88 128 98 110 104 C88 112 56 108 40 96 C38 92 38 88 38 88Z" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.3"/>
        <path d="M52 78 C58 68 102 68 108 78 C98 86 62 86 52 78Z" fill="#ffffff" opacity="0.72"/>
        ${companionEye(120, 80, 4.2)}
        <ellipse cx="80" cy="50" rx="18" ry="5" fill="none" stroke="#fde047" stroke-width="2.2" opacity="0.95"/>
        <ellipse cx="80" cy="50" rx="18" ry="5" fill="none" stroke="#fff7cc" stroke-width="0.9" opacity="0.65"/>`;
    default:
      return companionInnerMarkup("harbor_gull");
  }
}

/** Center + scale each pal so it fills the circle without clipping. */
const COMPANION_ART_FIT = {
  harbor_gull: { cx: 80, cy: 91.5, scale: 1.28 },
  clownfish: { cx: 82, cy: 85, scale: 1.175 },
  sea_turtle: { cx: 80, cy: 92, scale: 1.16 },
  octopus: { cx: 79, cy: 96, scale: 1.28 },
  dolphin: { cx: 84, cy: 85, scale: 0.784 },
  jellyfish: { cx: 80, cy: 96, scale: 1.28 },
  crab: { cx: 80, cy: 86, scale: 1.0 },
  manta: { cx: 80, cy: 90, scale: 1.0 },
  puffer: { cx: 80, cy: 88, scale: 1.28 },
  otter: { cx: 80, cy: 90, scale: 1.18 },
  pirate_gull: { cx: 80, cy: 79, scale: 1.28 },
  cowboy_shark: { cx: 80, cy: 86, scale: 1.0 },
  party_fish: { cx: 81, cy: 75.1, scale: 1.111 },
  ninja_octopus: { cx: 83, cy: 96, scale: 1.28 },
  wizard_turtle: { cx: 80, cy: 90, scale: 0.98 },
  super_dolphin: { cx: 84, cy: 85, scale: 0.784 },
  chef_crab: { cx: 80, cy: 88, scale: 0.98 },
  disco_jelly: { cx: 80, cy: 96, scale: 1.28 },
  viking_seal: { cx: 80, cy: 83, scale: 1.28 },
  royal_manta: { cx: 80, cy: 90, scale: 1.0 },
  starfish: { cx: 80, cy: 84, scale: 1.18 },
  angelfish: { cx: 80, cy: 78, scale: 1.12 },
  lobster: { cx: 80, cy: 90, scale: 1.0 },
  blue_tang: { cx: 82, cy: 84, scale: 1.1 },
  sailfish: { cx: 78, cy: 82, scale: 0.95 },
  nautilus: { cx: 82, cy: 88, scale: 1.15 },
  space_fish: { cx: 81, cy: 75.1, scale: 1.08 },
  coral_angel: { cx: 82, cy: 88, scale: 1.05 },
};

function companionArtSvg(id, { className = "companion-art", omitMantaTail = false } = {}) {
  const def = COMPANION_BY_ID[id] ? id : STARTER_COMPANION_ID;
  const fit = COMPANION_ART_FIT[def] || { cx: 80, cy: 86, scale: 1.22 };
  return (
    `<svg class="${className}" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" stroke-linejoin="round" stroke-linecap="round">` +
    `<g transform="translate(80 80) scale(${fit.scale}) translate(${-fit.cx} ${-fit.cy})">` +
    companionInnerMarkup(def, { omitMantaTail }) +
    `</g></svg>`
  );
}

function companionMantaTailSvg(id, { className = "companion-avatar__tail" } = {}) {
  const def = COMPANION_BY_ID[id] ? id : STARTER_COMPANION_ID;
  const fit = COMPANION_ART_FIT[def] || { cx: 80, cy: 86, scale: 1.22 };
  return (
    `<svg class="${className}" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" stroke-linejoin="round" stroke-linecap="round">` +
    `<g transform="translate(80 80) scale(${fit.scale}) translate(${-fit.cx} ${-fit.cy})">` +
    companionMantaTailMarkup({ stroke: "#0f172a" }) +
    `</g></svg>`
  );
}

function mountCompanionAvatar(host, companionId, { frameId, artClass = "companion-avatar__art" } = {}) {
  if (!host) return;
  const id = normalizeCompanionId(companionId);
  const isManta = MANTA_COMPANION_IDS.has(id);
  host.innerHTML = companionArtSvg(id, { className: artClass, omitMantaTail: isManta });
  host.classList.toggle("companion-host--manta", isManta);
  if (frameId !== undefined) applyAvatarFrameStyle(host, frameId);
  host.querySelector(".companion-avatar__tail")?.remove();
  if (isManta) {
    host.insertAdjacentHTML("beforeend", companionMantaTailSvg(id));
  }
}

function equippedCompanionId() {
  return normalizeEquippedClothes(gameMeta.equippedClothes, gameMeta.ownedClothes);
}

function normalizeCompanionId(id) {
  if (typeof id === "string" && COMPANION_BY_ID[id]) return id;
  return STARTER_COMPANION_ID;
}

function opponentCompanionFromRow(row, role) {
  if (!row) return COM_COMPANION_ID;
  if (row.isComGuest) return COM_COMPANION_ID;
  const id = role === "host" ? row.guestCompanionId : row.hostCompanionId;
  return normalizeCompanionId(id);
}

function syncSeagullOutfit() {
  if (!gameMeta.ownedClothes) gameMeta.ownedClothes = normalizeOwnedClothes([]);
  if (!gameMeta.ownedAvatarFrames) gameMeta.ownedAvatarFrames = normalizeOwnedAvatarFrames([]);
  gameMeta.equippedClothes = equippedCompanionId();
  gameMeta.equippedAvatarFrame = equippedAvatarFrameId();
  const frameId = gameMeta.equippedAvatarFrame;
  document.querySelectorAll("[data-companion-avatar]").forEach((host) => {
    mountCompanionAvatar(host, gameMeta.equippedClothes, { frameId });
  });
}

function equipClothingItem(id) {
  const def = COMPANION_BY_ID[id];
  if (!def || !isClothesOwned(id)) return false;
  gameMeta.equippedClothes = id;
  saveMeta();
  syncSeagullOutfit();
  refreshCollectablesUI();
  return true;
}

function buyClothingItem(id) {
  const def = COMPANION_BY_ID[id];
  if (!def || def.starter) return;
  if (isClothesOwned(id)) {
    showToast("Already owned", 1400);
    return;
  }
  if (gameMeta.coins < def.price) {
    showToast("Not enough coins", 1600);
    return;
  }
  gameMeta.coins -= def.price;
  if (!Array.isArray(gameMeta.ownedClothes)) gameMeta.ownedClothes = normalizeOwnedClothes([]);
  gameMeta.ownedClothes.push(id);
  gameMeta.equippedClothes = id;
  saveMeta();
  refreshCoinDisplays();
  buildShopUI();
  syncSeagullOutfit();
  refreshCollectablesUI();
  showToast(`${def.name} unlocked!`, 1800);
}

/** Avatar ring frames — colors, gradients, and pattern rings for profile circles. */
const STARTER_AVATAR_FRAME_ID = "reef_blue";

const AVATAR_FRAME_DEFS = [
  {
    id: "reef_blue",
    name: "Reef Blue",
    kind: "gradient",
    price: 0,
    starter: true,
    icon: "🌀",
    blurb: "Classic reef ring.",
    style: {
      background:
        "radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.22), transparent 42%), linear-gradient(160deg, #0e7490, #0c4a6e 55%, #082f49)",
      border: "2px solid rgba(255, 213, 74, 0.7)",
      boxShadow:
        "0 0 0 2px rgba(8, 28, 48, 0.85), 0 6px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.22)",
    },
  },
  {
    id: "hot_coral",
    name: "Hot Coral",
    kind: "solid",
    price: 110,
    icon: "🪸",
    blurb: "Bold reef pink.",
    style: {
      background: "linear-gradient(165deg, #fb7185, #e11d48)",
      border: "2px solid #fecdd3",
      boxShadow: "0 0 0 2px rgba(136, 19, 55, 0.7), 0 6px 16px rgba(225, 29, 72, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.28)",
    },
  },
  {
    id: "kelp_green",
    name: "Kelp Green",
    kind: "solid",
    price: 110,
    icon: "🌿",
    blurb: "Fresh kelp pop.",
    style: {
      background: "linear-gradient(165deg, #4ade80, #15803d)",
      border: "2px solid #bbf7d0",
      boxShadow: "0 0 0 2px rgba(20, 83, 45, 0.72), 0 6px 16px rgba(21, 128, 61, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.24)",
    },
  },
  {
    id: "violet_abyss",
    name: "Violet Abyss",
    kind: "solid",
    price: 120,
    icon: "💜",
    blurb: "Deep purple glow.",
    style: {
      background: "linear-gradient(165deg, #a78bfa, #6d28d9)",
      border: "2px solid #ddd6fe",
      boxShadow: "0 0 0 2px rgba(76, 29, 149, 0.72), 0 6px 16px rgba(109, 40, 217, 0.34), inset 0 1px 0 rgba(255, 255, 255, 0.24)",
    },
  },
  {
    id: "bubblegum",
    name: "Bubblegum",
    kind: "solid",
    price: 115,
    icon: "🍬",
    blurb: "Sweet pink ring.",
    style: {
      background: "linear-gradient(165deg, #f472b6, #db2777)",
      border: "2px solid #fbcfe8",
      boxShadow: "0 0 0 2px rgba(157, 23, 77, 0.68), 0 6px 16px rgba(219, 39, 119, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.26)",
    },
  },
  {
    id: "sunset_coral",
    name: "Sunset Coral",
    kind: "gradient",
    price: 150,
    icon: "🌅",
    blurb: "Golden hour glow.",
    style: {
      background:
        "radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.28), transparent 45%), linear-gradient(145deg, #fb923c, #ea580c 45%, #9a3412)",
      border: "2px solid #fed7aa",
      boxShadow: "0 0 0 2px rgba(69, 26, 3, 0.75), 0 6px 16px rgba(234, 88, 12, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.25)",
    },
  },
  {
    id: "ocean_teal",
    name: "Ocean Teal",
    kind: "gradient",
    price: 145,
    icon: "🌊",
    blurb: "Tropical shallows.",
    style: {
      background:
        "radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 0.24), transparent 44%), linear-gradient(150deg, #2dd4bf, #0891b2 52%, #164e63)",
      border: "2px solid #99f6e4",
      boxShadow: "0 0 0 2px rgba(8, 51, 68, 0.78), 0 6px 16px rgba(8, 145, 178, 0.34), inset 0 1px 0 rgba(255, 255, 255, 0.22)",
    },
  },
  {
    id: "aurora_wave",
    name: "Aurora Wave",
    kind: "gradient",
    price: 165,
    icon: "✨",
    blurb: "Northern lights swirl.",
    style: {
      background:
        "radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.2), transparent 42%), linear-gradient(135deg, #34d399, #22d3ee 38%, #818cf8 72%, #c084fc)",
      border: "2px solid #c7d2fe",
      boxShadow: "0 0 0 2px rgba(49, 46, 129, 0.72), 0 6px 18px rgba(99, 102, 241, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.24)",
    },
  },
  {
    id: "candy_pop",
    name: "Candy Pop",
    kind: "gradient",
    price: 155,
    icon: "🍭",
    blurb: "Rainbow sherbet ring.",
    style: {
      background:
        "radial-gradient(circle at 35% 28%, rgba(255, 255, 255, 0.26), transparent 42%), linear-gradient(140deg, #fde047, #fb7185 42%, #a78bfa 78%, #38bdf8)",
      border: "2px solid #fef08a",
      boxShadow: "0 0 0 2px rgba(113, 63, 18, 0.65), 0 6px 16px rgba(251, 113, 133, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.26)",
    },
  },
  {
    id: "midnight_glow",
    name: "Midnight Glow",
    kind: "gradient",
    price: 170,
    icon: "🌙",
    blurb: "Moonlit deep water.",
    style: {
      background:
        "radial-gradient(circle at 35% 28%, rgba(186, 230, 253, 0.18), transparent 44%), linear-gradient(155deg, #1e3a8a, #312e81 48%, #4c1d95)",
      border: "2px solid #93c5fd",
      boxShadow: "0 0 0 2px rgba(15, 23, 42, 0.85), 0 6px 18px rgba(79, 70, 229, 0.38), inset 0 1px 0 rgba(255, 255, 255, 0.16)",
    },
  },
  {
    id: "lifeguard_buoy",
    name: "Lifeguard Buoy",
    kind: "pattern",
    price: 320,
    icon: "🛟",
    blurb: "On duty at the reef.",
    pattern: "lifeguard_buoy",
    style: {
      background:
        "radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.16), transparent 42%), linear-gradient(160deg, #0284c7, #0369a1 55%, #0c4a6e)",
      border: "none",
      boxShadow: "0 0 0 2px rgba(8, 28, 48, 0.85), 0 6px 16px rgba(2, 132, 199, 0.34)",
    },
  },
  {
    id: "anchor_rope",
    name: "Anchor Rope",
    kind: "pattern",
    price: 280,
    icon: "⚓",
    blurb: "Nautical rope coil.",
    pattern: "anchor_rope",
    style: {
      background:
        "radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.14), transparent 42%), linear-gradient(160deg, #334155, #1e293b 55%, #0f172a)",
      border: "none",
      boxShadow: "0 0 0 2px rgba(15, 23, 42, 0.88), 0 6px 16px rgba(0, 0, 0, 0.42)",
    },
  },
  {
    id: "starfish_wreath",
    name: "Starfish Wreath",
    kind: "pattern",
    price: 260,
    icon: "⭐",
    blurb: "Tidepool stars all around.",
    pattern: "starfish_wreath",
    style: {
      background:
        "radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.18), transparent 42%), linear-gradient(160deg, #f59e0b, #d97706 55%, #92400e)",
      border: "none",
      boxShadow: "0 0 0 2px rgba(69, 26, 3, 0.72), 0 6px 16px rgba(217, 119, 6, 0.32)",
    },
  },
  {
    id: "pearl_shell",
    name: "Pearl Shell",
    kind: "pattern",
    price: 300,
    icon: "🐚",
    blurb: "Iridescent shell edge.",
    pattern: "pearl_shell",
    style: {
      background:
        "radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.28), transparent 42%), linear-gradient(155deg, #fbcfe8, #c4b5fd 45%, #7dd3fc)",
      border: "none",
      boxShadow: "0 0 0 2px rgba(76, 29, 149, 0.55), 0 6px 16px rgba(192, 132, 252, 0.28)",
    },
  },
  {
    id: "bubble_chain",
    name: "Bubble Chain",
    kind: "pattern",
    price: 250,
    icon: "🫧",
    blurb: "Floating bubble beads.",
    pattern: "bubble_chain",
    style: {
      background:
        "radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.2), transparent 42%), linear-gradient(160deg, #06b6d4, #0284c7 55%, #1d4ed8)",
      border: "none",
      boxShadow: "0 0 0 2px rgba(8, 28, 48, 0.82), 0 6px 16px rgba(6, 182, 212, 0.32)",
    },
  },
];

const AVATAR_FRAME_BY_ID = Object.fromEntries(AVATAR_FRAME_DEFS.map((f) => [f.id, f]));

function avatarFrameKindLabel(kind) {
  if (kind === "pattern") return "Pattern";
  if (kind === "solid") return "Solid";
  return "Gradient";
}

function normalizeOwnedAvatarFrames(raw) {
  const ids = new Set(AVATAR_FRAME_DEFS.map((f) => f.id));
  const out = [];
  const seen = new Set();
  if (Array.isArray(raw)) {
    for (const id of raw) {
      if (typeof id !== "string" || !ids.has(id) || seen.has(id)) continue;
      seen.add(id);
      out.push(id);
    }
  }
  if (!seen.has(STARTER_AVATAR_FRAME_ID)) out.unshift(STARTER_AVATAR_FRAME_ID);
  return out;
}

function normalizeEquippedAvatarFrame(raw, ownedIds) {
  const owned = new Set(ownedIds || []);
  if (typeof raw === "string" && owned.has(raw)) return raw;
  if (owned.has(STARTER_AVATAR_FRAME_ID)) return STARTER_AVATAR_FRAME_ID;
  return (ownedIds && ownedIds[0]) || STARTER_AVATAR_FRAME_ID;
}

function normalizeDailyAvatarFrameShop(raw) {
  if (!raw || typeof raw !== "object") return null;
  const dayKey = String(raw.dayKey || "");
  const itemIds = Array.isArray(raw.itemIds)
    ? raw.itemIds
        .filter((id) => typeof id === "string" && AVATAR_FRAME_BY_ID[id] && !AVATAR_FRAME_BY_ID[id].starter)
        .filter((id, i, arr) => arr.indexOf(id) === i)
        .slice(0, 4)
    : [];
  if (!dayKey || itemIds.length !== 4) return null;
  return { dayKey, itemIds };
}

function isAvatarFrameOwned(id) {
  return Array.isArray(gameMeta.ownedAvatarFrames) && gameMeta.ownedAvatarFrames.includes(id);
}

function rollDailyAvatarFramesForDay(dayKey) {
  const pool = AVATAR_FRAME_DEFS.filter((f) => !f.starter);
  let seed = hashDailyCatchSeed(`avatar-frames:${dayKey}`);
  const arr = pool.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    seed = (Math.imul(seed, 1103515245) + 12345) >>> 0;
    const j = seed % (i + 1);
    const t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
  }
  return { dayKey, itemIds: arr.slice(0, 4).map((f) => f.id) };
}

function ensureDailyAvatarFrameShop() {
  const today = getDailyDayKey();
  const cur = normalizeDailyAvatarFrameShop(gameMeta.dailyAvatarFrameShop);
  if (cur && cur.dayKey === today) {
    gameMeta.dailyAvatarFrameShop = cur;
    return cur;
  }
  gameMeta.dailyAvatarFrameShop = rollDailyAvatarFramesForDay(today);
  saveMeta();
  return gameMeta.dailyAvatarFrameShop;
}

function equippedAvatarFrameId() {
  return normalizeEquippedAvatarFrame(gameMeta.equippedAvatarFrame, gameMeta.ownedAvatarFrames);
}

function avatarFrameRingSvg(patternId, uid = patternId) {
  const safe = String(uid).replace(/[^a-z0-9_-]/gi, "");
  switch (patternId) {
    case "lifeguard_buoy":
      return (
        `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">` +
        `<defs>` +
        `<pattern id="lb-${safe}" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">` +
        `<rect width="5" height="10" fill="#ef4444"/>` +
        `<rect x="5" width="5" height="10" fill="#ffffff"/>` +
        `</pattern>` +
        `</defs>` +
        `<circle cx="50" cy="50" r="47" fill="none" stroke="url(#lb-${safe})" stroke-width="9"/>` +
        `<circle cx="50" cy="50" r="47" fill="none" stroke="#991b1b" stroke-width="1.2" opacity="0.55"/>` +
        `<g transform="translate(50 90)">` +
        `<ellipse cx="0" cy="0" rx="11" ry="6.5" fill="#ef4444" stroke="#991b1b" stroke-width="1.4"/>` +
        `<rect x="-11" y="-9" width="22" height="4.5" fill="#fff" stroke="#991b1b" stroke-width="1"/>` +
        `<rect x="-11" y="-4.5" width="22" height="4.5" fill="#ef4444"/>` +
        `<rect x="-1.5" y="-12" width="3" height="5" rx="1" fill="#fde047" stroke="#ca8a04" stroke-width="0.8"/>` +
        `</g>` +
        `</svg>`
      );
    case "anchor_rope":
      return (
        `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">` +
        `<defs>` +
        `<pattern id="rope-${safe}" width="8" height="8" patternUnits="userSpaceOnUse">` +
        `<path d="M0 4 C2 0 6 0 8 4 C6 8 2 8 0 4 Z" fill="#a16207"/>` +
        `<path d="M0 4 C2 2 6 2 8 4" fill="none" stroke="#ca8a04" stroke-width="0.8"/>` +
        `</pattern>` +
        `</defs>` +
        `<circle cx="50" cy="50" r="47" fill="none" stroke="url(#rope-${safe})" stroke-width="8"/>` +
        `<circle cx="50" cy="50" r="47" fill="none" stroke="#78350f" stroke-width="1.2" opacity="0.6"/>` +
        `<g transform="translate(50 88) scale(0.72)">` +
        `<path d="M0 -8 C6 -8 8 -2 8 4 C8 10 4 14 0 14 C-4 14 -8 10 -8 4 C-8 -2 -6 -8 0 -8 Z" fill="#64748b" stroke="#334155" stroke-width="1.4"/>` +
        `<path d="M0 -14 L0 -22 M-4 -18 L4 -18" fill="none" stroke="#475569" stroke-width="2" stroke-linecap="round"/>` +
        `<circle cx="0" cy="2" r="2.5" fill="#cbd5e1" stroke="#475569" stroke-width="1"/>` +
        `</g>` +
        `</svg>`
      );
    case "starfish_wreath":
      return (
        `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">` +
        `<circle cx="50" cy="50" r="47" fill="none" stroke="#fde68a" stroke-width="3.5" opacity="0.85"/>` +
        `<g fill="#fb923c" stroke="#c2410c" stroke-width="1.1">` +
        `<polygon points="50,6 53,14 62,14 55,19 58,28 50,22 42,28 45,19 38,14 47,14"/>` +
        `<polygon points="88,34 84,41 90,47 82,46 79,54 76,45 68,44 74,38 71,30 80,33"/>` +
        `<polygon points="88,66 80,63 74,69 76,61 68,60 76,56 79,48 82,56 90,55 84,61"/>` +
        `<polygon points="50,94 47,86 38,86 45,81 42,72 50,78 58,72 55,81 62,86 53,86"/>` +
        `<polygon points="12,66 20,63 26,69 24,61 32,60 24,56 21,48 18,56 10,55 16,61"/>` +
        `<polygon points="12,34 18,38 24,32 22,40 30,41 22,45 21,53 18,45 10,46 16,40"/>` +
        `</g>` +
        `</svg>`
      );
    case "pearl_shell":
      return (
        `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">` +
        `<defs>` +
        `<linearGradient id="pearl-${safe}" x1="0" y1="0" x2="1" y2="1">` +
        `<stop offset="0%" stop-color="#fff1f2"/>` +
        `<stop offset="35%" stop-color="#fbcfe8"/>` +
        `<stop offset="68%" stop-color="#c4b5fd"/>` +
        `<stop offset="100%" stop-color="#bae6fd"/>` +
        `</linearGradient>` +
        `</defs>` +
        `<circle cx="50" cy="50" r="47" fill="none" stroke="url(#pearl-${safe})" stroke-width="8"/>` +
        `<path d="M50 8 C58 18 62 28 62 38 C62 48 58 58 50 68 C42 58 38 48 38 38 C38 28 42 18 50 8 Z" fill="none" stroke="#f8fafc" stroke-width="1.6" opacity="0.65"/>` +
        `<path d="M50 12 C56 20 58 28 58 36 C58 44 56 52 50 60 C44 52 42 44 42 36 C42 28 44 20 50 12 Z" fill="none" stroke="#e9d5ff" stroke-width="1.2" opacity="0.55"/>` +
        `<circle cx="50" cy="86" r="4.5" fill="#fff" stroke="#c4b5fd" stroke-width="1.2" opacity="0.9"/>` +
        `</svg>`
      );
    case "bubble_chain":
      return (
        `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">` +
        `<g fill="none" stroke="#e0f2fe" stroke-width="1.4">` +
        `<circle cx="50" cy="5" r="4.5" fill="rgba(224,242,254,0.55)"/>` +
        `<circle cx="78" cy="14" r="4" fill="rgba(224,242,254,0.5)"/>` +
        `<circle cx="93" cy="36" r="4.5" fill="rgba(224,242,254,0.55)"/>` +
        `<circle cx="93" cy="64" r="4" fill="rgba(224,242,254,0.5)"/>` +
        `<circle cx="78" cy="86" r="4.5" fill="rgba(224,242,254,0.55)"/>` +
        `<circle cx="50" cy="95" r="4" fill="rgba(224,242,254,0.5)"/>` +
        `<circle cx="22" cy="86" r="4.5" fill="rgba(224,242,254,0.55)"/>` +
        `<circle cx="7" cy="64" r="4" fill="rgba(224,242,254,0.5)"/>` +
        `<circle cx="7" cy="36" r="4.5" fill="rgba(224,242,254,0.55)"/>` +
        `<circle cx="22" cy="14" r="4" fill="rgba(224,242,254,0.5)"/>` +
        `</g>` +
        `<circle cx="50" cy="50" r="47" fill="none" stroke="rgba(186,230,253,0.45)" stroke-width="2.5" stroke-dasharray="4 5"/>` +
        `</svg>`
      );
    default:
      return "";
  }
}

function applyAvatarFrameStyle(el, frameId) {
  if (!el) return;
  const def = AVATAR_FRAME_BY_ID[frameId] || AVATAR_FRAME_BY_ID[STARTER_AVATAR_FRAME_ID];
  const style = def.style || AVATAR_FRAME_BY_ID[STARTER_AVATAR_FRAME_ID].style;
  for (const cls of [...el.classList]) {
    if (cls.startsWith("avatar-frame--")) el.classList.remove(cls);
  }
  el.classList.add(`avatar-frame--${def.id}`);
  el.dataset.avatarFrame = def.id;
  el.style.background = style.background || "";
  el.style.border = style.border || "";
  el.style.boxShadow = style.boxShadow || "";
  el.querySelector(".avatar-frame-ring")?.remove();
  if (def.kind === "pattern" && def.pattern) {
    const ring = document.createElement("span");
    ring.className = "avatar-frame-ring";
    ring.setAttribute("aria-hidden", "true");
    ring.innerHTML = avatarFrameRingSvg(def.pattern, def.id);
    el.appendChild(ring);
  }
}

function avatarFrameSwatchHtml(frameId, { className = "avatar-frame-swatch" } = {}) {
  const def = AVATAR_FRAME_BY_ID[frameId] || AVATAR_FRAME_BY_ID[STARTER_AVATAR_FRAME_ID];
  const style = def.style || {};
  const ring =
    def.kind === "pattern" && def.pattern
      ? `<span class="avatar-frame-ring">${avatarFrameRingSvg(def.pattern, `swatch-${def.id}`)}</span>`
      : "";
  const styleBits = [
    style.background ? `background:${style.background}` : "",
    style.border ? `border:${style.border}` : "",
    style.boxShadow ? `box-shadow:${style.boxShadow}` : "",
  ]
    .filter(Boolean)
    .join(";");
  return `<div class="${className} avatar-frame--${def.id}" data-frame-id="${def.id}" style="${styleBits}">${ring}</div>`;
}

function equipAvatarFrame(id) {
  const def = AVATAR_FRAME_BY_ID[id];
  if (!def || !isAvatarFrameOwned(id)) return false;
  gameMeta.equippedAvatarFrame = id;
  saveMeta();
  syncSeagullOutfit();
  refreshCollectablesUI();
  return true;
}

function buyAvatarFrame(id) {
  const def = AVATAR_FRAME_BY_ID[id];
  if (!def || def.starter) return;
  if (isAvatarFrameOwned(id)) {
    showToast("Already owned", 1400);
    return;
  }
  if (gameMeta.coins < def.price) {
    showToast("Not enough coins", 1600);
    return;
  }
  gameMeta.coins -= def.price;
  if (!Array.isArray(gameMeta.ownedAvatarFrames)) {
    gameMeta.ownedAvatarFrames = normalizeOwnedAvatarFrames([]);
  }
  gameMeta.ownedAvatarFrames.push(id);
  gameMeta.equippedAvatarFrame = id;
  saveMeta();
  refreshCoinDisplays();
  buildShopUI();
  syncSeagullOutfit();
  refreshCollectablesUI();
  showToast(`${def.name} ring unlocked!`, 1800);
}

function rodArtSvg(rod) {
  const v = rod.visual || {};
  const body = v.reelBody || "#5c4033";
  const band = v.reelBand || "#8b6914";
  const line = v.lineMain || "rgba(200,180,140,0.9)";
  const metal = v.hookMetal || "#9ca3af";
  const barb = v.hookBarb || "#b91c1c";
  const glow = v.tipGlow || "rgba(255,200,120,0.2)";
  const uid = `rod-${rod.id}`;

  let tipGear = "";
  if (v.tipType === "magnet") {
    const north = v.magnetNorth || "#ef4444";
    const south = v.magnetSouth || "#3b82f6";
    tipGear =
      `<path d="M30 52 h5 v8 a6 6 0 0 1 -12 0 v-8 h5 v8 a1.5 1.5 0 0 0 3 0 z" fill="${v.magnetBody || "#64748b"}"/>` +
      `<rect x="30" y="52" width="5" height="6" fill="${north}"/>` +
      `<rect x="23" y="52" width="5" height="6" fill="${south}"/>`;
  } else if (rod.id === "wide_net") {
    tipGear =
      `<rect x="20" y="50" width="18" height="3.2" rx="1.2" fill="${band}"/>` +
      `<path d="M21 53 L22 64 Q29 68 36 64 L37 53" fill="none" stroke="${metal}" stroke-width="1.1"/>` +
      `<path d="M24 54 L25 63 M29 54 L29 65 M34 54 L33 63 M22 57 L36 57 M22.5 60.5 L35.5 60.5" fill="none" stroke="${metal}" stroke-width="0.7" opacity="0.75"/>`;
  } else if (rod.id === "light") {
    tipGear =
      `<circle cx="29" cy="54" r="5.5" fill="${glow}"/>` +
      `<circle cx="29" cy="54" r="3.2" fill="#ecfeff" stroke="${band}" stroke-width="1"/>`;
  } else {
    tipGear =
      `<path d="M29 48 L29 56 Q29 61 24 59" fill="none" stroke="${metal}" stroke-width="1.8" stroke-linecap="round"/>` +
      `<path d="M24 59 L26.5 56.5 L25 61 Z" fill="${barb}"/>`;
  }

  return (
    `<svg class="rod-art" viewBox="0 0 44 72" width="44" height="72" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">` +
    `<defs>` +
    `<linearGradient id="${uid}-blank" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="${body}"/>` +
    `<stop offset="0.45" stop-color="${band}"/>` +
    `<stop offset="1" stop-color="${metal}"/>` +
    `</linearGradient>` +
    `</defs>` +
    `<ellipse cx="22" cy="68" rx="14" ry="2.6" fill="rgba(0,0,0,0.22)"/>` +
    // Full angled blank
    `<path d="M8 58 L28 8" stroke="url(#${uid}-blank)" stroke-width="4.2" stroke-linecap="round"/>` +
    `<path d="M8 58 L28 8" stroke="${band}" stroke-width="1.1" stroke-linecap="round" opacity="0.35"/>` +
    // Cork grip
    `<path d="M9 56 L13 48" stroke="#c4a574" stroke-width="6.2" stroke-linecap="round"/>` +
    `<path d="M9.5 55 L12.5 49" stroke="rgba(90,60,30,0.35)" stroke-width="0.8"/>` +
    // Spinning reel
    `<ellipse cx="16" cy="50" rx="6.2" ry="4.6" fill="${body}" stroke="${band}" stroke-width="1.1"/>` +
    `<ellipse cx="16" cy="50" rx="2.6" ry="2" fill="none" stroke="${band}" stroke-width="1.1"/>` +
    // Guides
    `<circle cx="15" cy="42" r="1.5" fill="none" stroke="${metal}" stroke-width="1"/>` +
    `<circle cx="18" cy="34" r="1.35" fill="none" stroke="${metal}" stroke-width="1"/>` +
    `<circle cx="21" cy="26" r="1.2" fill="none" stroke="${metal}" stroke-width="0.95"/>` +
    `<circle cx="24" cy="18" r="1.05" fill="none" stroke="${metal}" stroke-width="0.9"/>` +
    `<circle cx="27" cy="11" r="1.5" fill="${metal}"/>` +
    // Line from tip
    `<path d="M28 10 L29 48" stroke="${line}" stroke-width="1.15" stroke-linecap="round"/>` +
    tipGear +
    `</svg>`
  );
}

/** Bait: standard is unlimited; premium types are sold in packs and use one piece each round you start with them equipped. */
const BAITS = [
  {
    id: "standard",
    name: "Standard lure",
    desc: "Unlimited · no bonus.",
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
    desc: "Wider catch window.",
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
    desc: "Strong rare odds.",
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
    desc: "Lights a wide area.",
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
    desc: "Big window · rare boost.",
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
    desc: "Huge reach · best rare odds.",
    price: 145,
    packSize: 1,
    consumesOnRound: true,
    catchRadiusMult: 1.46,
    rareAssistAdd: 0.34,
    lightRadiusMult: 1,
  },
  {
    id: KRAKEN_SPRAY_BAIT_ID,
    name: "Kraken spray",
    desc: "Blocks the kraken for 1 round.",
    price: 0,
    packSize: 0,
    consumesOnRound: true,
    shopHidden: true,
    repelsKraken: true,
    catchRadiusMult: 1,
    rareAssistAdd: 0,
    lightRadiusMult: 1,
  },
];

const META_KEY = "reefRushMeta_v1";
const INTRO_SEEN_KEY = "reefRushIntroSeen_v1";
const SHOP_GUIDE_SEEN_KEY = "reefRushShopGuideSeen_v1";
const SEAGULL_SHOP_HINT_KEY = "reefRushSeagullShopHint_v1";
const SEAGULL_SHOP_PENDING_KEY = "reefRushSeagullShopPending_v1";
/** Snapshot saved before Ctrl+N new-player wipe — restored with Ctrl+R. */
const PROGRESS_BACKUP_KEY = "reefRushProgressBackup_v1";
const MUSIC_PREF_KEY = "reefRushMusicEnabled_v1";

const TREASURE_CHESTS_TO_UNLOCK_ADVENTURE = 20;
const SECRET_TREASURE_CHEST_GRANT = 19;
const ADVENTURE_MAIN_LEVEL_COUNT = 15;
const ADVENTURE_BONUS_LEVEL_COUNT = 7;
const ADVENTURE_ICE_LEVEL_COUNT = 5;
const ADVENTURE_LOST_CITY_LEVEL_COUNT = 5;
const ADVENTURE_LEVEL_COUNT =
  ADVENTURE_MAIN_LEVEL_COUNT +
  ADVENTURE_BONUS_LEVEL_COUNT +
  ADVENTURE_ICE_LEVEL_COUNT +
  ADVENTURE_LOST_CITY_LEVEL_COUNT;
/** Index of Treasure Cove (level 15) — clearing it unlocks bonus voyages. */
const TREASURE_COVE_INDEX = ADVENTURE_MAIN_LEVEL_COUNT - 1;
/** Index of Legend's Gate (last Gold Quest voyage) — clearing it unlocks ice voyages. */
const LEGENDS_GATE_INDEX = ADVENTURE_MAIN_LEVEL_COUNT + ADVENTURE_BONUS_LEVEL_COUNT - 1;
const ADVENTURE_ICE_START_INDEX = ADVENTURE_MAIN_LEVEL_COUNT + ADVENTURE_BONUS_LEVEL_COUNT;
const ADVENTURE_LOST_CITY_START_INDEX = ADVENTURE_ICE_START_INDEX + ADVENTURE_ICE_LEVEL_COUNT;
/** Index of Aurora Reach — clearing it unlocks The Lost City. */
const AURORA_REACH_INDEX = ADVENTURE_LOST_CITY_START_INDEX - 1;
/** Bump when inserting voyages mid-chart so saved progress can remapped. */
const ADVENTURE_MAP_CONTENT_REV = 4;
/** Ice start index before Middle Passage / Kraken's Grotto were added to Gold Quest. */
const ADVENTURE_PREV_ICE_START_FOR_REV1 = 20;

const ADVENTURE_SECTION_PIRATES_PATH = "Pirates Path";
const ADVENTURE_SECTION_GOLD_QUEST = "Gold Quest";
const ADVENTURE_SECTION_FROZEN_SEA = "Frozen Sea";
const ADVENTURE_SECTION_LOST_CITY = "The Lost City";
/** +0.7s per Pirates Path voyage so later main levels keep a little more clock. */
const ADVENTURE_LEVEL_TIME_BONUS_MS = 700;
/** +0.55s per voyage from Gold Quest through The Lost City — keep the ramp modest. */
const ADVENTURE_GOLD_TO_LOST_CITY_TIME_BONUS_MS = 550;
/** Extra clock on Legend's Gate so the Gold Quest finale is a bit more forgiving. */
const LEGENDS_GATE_TIME_BONUS_MS = 7_000;

function adventureLevelTimeBonusMs(levelIndex) {
  const legendsGateBonus = levelIndex === LEGENDS_GATE_INDEX ? LEGENDS_GATE_TIME_BONUS_MS : 0;
  if (levelIndex < ADVENTURE_MAIN_LEVEL_COUNT) {
    return levelIndex * ADVENTURE_LEVEL_TIME_BONUS_MS + legendsGateBonus;
  }
  const piratesBonus = ADVENTURE_MAIN_LEVEL_COUNT * ADVENTURE_LEVEL_TIME_BONUS_MS;
  return piratesBonus + (levelIndex - ADVENTURE_MAIN_LEVEL_COUNT) * ADVENTURE_GOLD_TO_LOST_CITY_TIME_BONUS_MS + legendsGateBonus;
}

const TREASURE_CINEMATIC_ANTICIPATE_MS = 1000;
const TREASURE_CINEMATIC_FLY_MS = 2600;
const TREASURE_CINEMATIC_OPEN_MS = 2200;
const TREASURE_CINEMATIC_HOLD_MS = 1800;

/** Logical chart size for trail SVG coords (matches adventure-chart__art viewBox). */
const ADVENTURE_MAP_SVG_WIDTH = 800;
const ADVENTURE_MAP_SVG_HEIGHT = 600;
const ADVENTURE_MAP_SECTION_IDS = ["pirates", "gold", "ice", "lost-city"];

/** Section metadata — each themed voyage lives on its own landscape chart. */
const ADVENTURE_MAP_SECTIONS = {
  pirates: {
    id: "pirates",
    label: ADVENTURE_SECTION_PIRATES_PATH,
    startIndex: 0,
    endIndex: ADVENTURE_MAIN_LEVEL_COUNT - 1,
  },
  gold: {
    id: "gold",
    label: ADVENTURE_SECTION_GOLD_QUEST,
    startIndex: ADVENTURE_MAIN_LEVEL_COUNT,
    endIndex: ADVENTURE_ICE_START_INDEX - 1,
  },
  ice: {
    id: "ice",
    label: ADVENTURE_SECTION_FROZEN_SEA,
    startIndex: ADVENTURE_ICE_START_INDEX,
    endIndex: ADVENTURE_LOST_CITY_START_INDEX - 1,
  },
  "lost-city": {
    id: "lost-city",
    label: ADVENTURE_SECTION_LOST_CITY,
    startIndex: ADVENTURE_LOST_CITY_START_INDEX,
    endIndex: ADVENTURE_LEVEL_COUNT - 1,
  },
};

function adventureSectionIdForIndex(i) {
  if (i >= ADVENTURE_LOST_CITY_START_INDEX) return "lost-city";
  if (i >= ADVENTURE_ICE_START_INDEX) return "ice";
  if (i >= ADVENTURE_MAIN_LEVEL_COUNT) return "gold";
  return "pirates";
}

function isAdventureSectionUnlocked(sectionId) {
  if (sectionId === "gold") return isAdventureBonusUnlocked();
  if (sectionId === "ice") return isAdventureIceUnlocked();
  if (sectionId === "lost-city") return isAdventureLostCityUnlocked();
  return sectionId === "pirates";
}

/** Winding chart positions (% of each landscape map). */
function buildAdventureMapNodeLayout() {
  const pirates = [
    { x: 22, y: 90 },
    { x: 28, y: 58 },
    { x: 8, y: 42 },
    { x: 16, y: 28 },
    { x: 40, y: 10 },
    { x: 72, y: 10 },
    { x: 90, y: 14 },
    { x: 78, y: 44 },
    { x: 66, y: 64 },
    { x: 72, y: 78 },
    { x: 52, y: 90 },
    { x: 32, y: 78 },
    { x: 50, y: 52 },
    { x: 62, y: 60 },
    { x: 74, y: 38 },
  ];
  const gold = [
    { x: 12, y: 82 },
    { x: 18, y: 50 },
    { x: 44, y: 10 },
    { x: 86, y: 22 },
    { x: 48, y: 74 },
    { x: 86, y: 86 },
    { x: 64, y: 50 },
  ];
  const ice = [
    { x: 8, y: 70 },
    { x: 40, y: 44 },
    { x: 62, y: 34 },
    { x: 78, y: 10 },
    { x: 86, y: 78 },
  ];
  const lostCity = [
    { x: 8, y: 64 },
    { x: 32, y: 44 },
    { x: 58, y: 46 },
    { x: 81, y: 30 },
    { x: 90, y: 82 },
  ];
  return [
    ...pirates.map((p) => ({ ...p, section: "pirates" })),
    ...gold.map((p) => ({ ...p, section: "gold" })),
    ...ice.map((p) => ({ ...p, section: "ice" })),
    ...lostCity.map((p) => ({ ...p, section: "lost-city" })),
  ];
}

/** Organic sailing-chart positions on the treasure map (% of map board). */
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
  "Middle Passage",
  "Kraken's Grotto",
  "Legend's Gate",
  "Frostbite Fjord",
  "Iceberg Drift",
  "Glacier Maw",
  "Polar Narrows",
  "Aurora Reach",
  "Sunken Gate",
  "Coral Colonnade",
  "Poseidon's Plaza",
  "Temple of Tides",
  "Throne of Atlantis",
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
  "middle-passage",
  "krakens-grotto",
  "legends-gate",
  "frost-fjord",
  "iceberg-drift",
  "glacier-maw",
  "polar-narrows",
  "aurora-reach",
  "sunken-gate",
  "coral-colonnade",
  "poseidons-plaza",
  "temple-of-tides",
  "throne-of-atlantis",
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
    "middle-passage": `<svg class="adventure-map-node__scene" viewBox="0 0 72 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="72" height="52" fill="#3a6880"/>
      <path d="M0 28 Q18 20 36 28 T72 28 L72 52 L0 52 Z" fill="#2a5068"/>
      <path d="M4 30 Q22 18 40 28 Q54 36 68 26" fill="none" stroke="#c8b070" stroke-width="1.6" stroke-dasharray="3 2.5" opacity="0.75"/>
      <path d="M10 34 Q28 24 46 32 Q58 38 70 30" fill="none" stroke="#7a98a8" stroke-width="1.2" opacity="0.55"/>
      <circle cx="36" cy="16" r="3" fill="#f0e0a0" opacity="0.7"/>
      <path d="M48 38 L52 30 L56 38 L54 44 L50 44 Z" fill="#5a6878" stroke="#2e2418" stroke-width="0.6" opacity="0.8"/>
    </svg>`,
    "krakens-grotto": `<svg class="adventure-map-node__scene" viewBox="0 0 72 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="72" height="52" fill="#1a2838"/>
      <path d="M8 52 L12 22 Q36 8 60 22 L64 52 Z" fill="#0e1824"/>
      <path d="M16 52 L20 28 Q36 16 52 28 L56 52 Z" fill="#152030"/>
      <ellipse cx="36" cy="34" rx="10" ry="6" fill="#061018"/>
      <path d="M22 40 Q28 34 36 38 Q44 42 50 36" fill="none" stroke="#7a2848" stroke-width="2" opacity="0.85"/>
      <circle cx="28" cy="36" r="1.4" fill="#9a3858"/>
      <circle cx="44" cy="38" r="1.2" fill="#9a3858"/>
      <circle cx="36" cy="18" r="2.5" fill="#f0d050" opacity="0.55"/>
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
    "sunken-gate": `<svg class="adventure-map-node__scene" viewBox="0 0 72 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="atl-deep-${sid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#6ec8e8" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="#1a5878"/>
        </linearGradient>
      </defs>
      <rect width="72" height="52" fill="url(#atl-deep-${sid})"/>
      <ellipse cx="36" cy="10" rx="24" ry="8" fill="#ffe898" opacity="0.35"/>
      <path d="M18 44 L18 24 L24 20 L30 24 L30 44 Z" fill="#5a8898" stroke="#88b8c8" stroke-width="0.7"/>
      <path d="M42 44 L42 24 L48 20 L54 24 L54 44 Z" fill="#5a8898" stroke="#88b8c8" stroke-width="0.7"/>
      <path d="M28 44 L28 30 Q36 22 44 30 L44 44 Z" fill="#487888" stroke="#78a8b8" stroke-width="0.6"/>
      <ellipse cx="36" cy="48" rx="20" ry="3" fill="#184858" opacity="0.5"/>
    </svg>`,
    "coral-colonnade": `<svg class="adventure-map-node__scene" viewBox="0 0 72 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="72" height="52" fill="#287898"/>
      <ellipse cx="36" cy="8" rx="26" ry="7" fill="#ffd878" opacity="0.32"/>
      <path d="M12 44 L14 18 L18 44 Z" fill="#6898a8" stroke="#98c8d8" stroke-width="0.6"/>
      <path d="M24 44 L26 14 L30 44 Z" fill="#78a8b8" stroke="#a8d8e8" stroke-width="0.6"/>
      <path d="M42 44 L44 14 L48 44 Z" fill="#78a8b8" stroke="#a8d8e8" stroke-width="0.6"/>
      <path d="M54 44 L56 18 L60 44 Z" fill="#6898a8" stroke="#98c8d8" stroke-width="0.6"/>
      <path d="M8 40 Q20 34 36 38 Q52 34 64 40" fill="none" stroke="#e87898" stroke-width="1.2" opacity="0.65"/>
    </svg>`,
    "poseidons-plaza": `<svg class="adventure-map-node__scene" viewBox="0 0 72 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="72" height="52" fill="#206888"/>
      <ellipse cx="36" cy="9" rx="28" ry="8" fill="#ffe070" opacity="0.38"/>
      <ellipse cx="36" cy="34" rx="22" ry="10" fill="#5898a8" stroke="#88c8d8" stroke-width="0.8"/>
      <ellipse cx="36" cy="30" rx="14" ry="6" fill="#78b8c8" opacity="0.85"/>
      <path d="M36 18 L36 26 M32 20 L40 20" stroke="#ffd858" stroke-width="1" opacity="0.7"/>
      <circle cx="20" cy="42" r="2" fill="#e89858" opacity="0.75"/>
      <circle cx="52" cy="42" r="2" fill="#e89858" opacity="0.75"/>
    </svg>`,
    "temple-of-tides": `<svg class="adventure-map-node__scene" viewBox="0 0 72 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="72" height="52" fill="#185878"/>
      <ellipse cx="36" cy="7" rx="30" ry="9" fill="#ffc850" opacity="0.4"/>
      <path d="M14 44 L36 16 L58 44 Z" fill="#6898a8" stroke="#a8d8e8" stroke-width="0.8"/>
      <path d="M22 44 L36 24 L50 44 Z" fill="#88b8c8" opacity="0.75"/>
      <rect x="32" y="38" width="8" height="6" fill="#487888"/>
      <path d="M10 44 L62 44" stroke="#98d8e8" stroke-width="1.2" opacity="0.55"/>
    </svg>`,
    "throne-of-atlantis": `<svg class="adventure-map-node__scene" viewBox="0 0 72 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="atl-glow-${sid}" cx="50%" cy="30%" r="55%">
          <stop offset="0%" stop-color="#ffe890" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="#185878" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="72" height="52" fill="#104868"/>
      <rect width="72" height="52" fill="url(#atl-glow-${sid})"/>
      <path d="M20 44 L20 28 Q36 18 52 28 L52 44 Z" fill="#5898a8" stroke="#98d8e8" stroke-width="0.8"/>
      <ellipse cx="36" cy="26" rx="10" ry="5" fill="#ffd858" stroke="#e8a830" stroke-width="0.7"/>
      <path d="M30 44 L30 32 L42 32 L42 44" fill="#487888"/>
      <circle cx="36" cy="8" r="4" fill="#ffe878" opacity="0.85"/>
      <path d="M36 4 L36 0 M40 6 L43 3 M32 6 L29 3" stroke="#ffe878" stroke-width="0.8" opacity="0.7"/>
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
  "sunken-gate": "mediterranean",
  "coral-colonnade": "caribbean",
  "poseidons-plaza": "australia",
  "temple-of-tides": "mediterranean",
  "throne-of-atlantis": "japan_kuroshio",
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
  "sunken-gate": {
    stops: [
      [0, "rgba(120, 220, 240, 0.16)"],
      [0.45, "rgba(40, 120, 160, 0.18)"],
      [1, "rgba(8, 35, 55, 0.32)"],
    ],
    effect: "sunken-gate",
  },
  "coral-colonnade": {
    stops: [
      [0, "rgba(100, 210, 230, 0.14)"],
      [0.5, "rgba(30, 100, 130, 0.2)"],
      [1, "rgba(10, 40, 60, 0.3)"],
    ],
    effect: "coral-colonnade",
  },
  "poseidons-plaza": {
    stops: [
      [0, "rgba(255, 220, 130, 0.12)"],
      [0.4, "rgba(60, 160, 190, 0.16)"],
      [1, "rgba(12, 45, 70, 0.28)"],
    ],
    effect: "poseidons-plaza",
  },
  "temple-of-tides": {
    stops: [
      [0, "rgba(255, 200, 100, 0.14)"],
      [0.35, "rgba(80, 170, 200, 0.15)"],
      [1, "rgba(8, 38, 58, 0.32)"],
    ],
    effect: "temple-of-tides",
  },
  "throne-of-atlantis": {
    stops: [
      [0, "rgba(255, 230, 150, 0.18)"],
      [0.3, "rgba(255, 180, 80, 0.1)"],
      [0.65, "rgba(50, 130, 170, 0.14)"],
      [1, "rgba(6, 28, 48, 0.36)"],
    ],
    effect: "throne-of-atlantis",
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
  "sunken-gate": {
    stops: [
      [0, "rgba(180, 220, 230, 0)"],
      [0.38, "rgba(120, 170, 185, 0.28)"],
      [1, "rgba(70, 110, 130, 0.55)"],
    ],
    speck: "rgba(200, 240, 255, 0.28)",
  },
  "coral-colonnade": {
    stops: [
      [0, "rgba(200, 230, 220, 0)"],
      [0.4, "rgba(140, 190, 175, 0.26)"],
      [1, "rgba(80, 130, 120, 0.5)"],
    ],
    speck: "rgba(255, 180, 160, 0.22)",
  },
  "poseidons-plaza": {
    stops: [
      [0, "rgba(220, 235, 240, 0)"],
      [0.35, "rgba(180, 200, 210, 0.24)"],
      [1, "rgba(100, 130, 145, 0.52)"],
    ],
    speck: "rgba(255, 220, 140, 0.3)",
  },
  "temple-of-tides": {
    stops: [
      [0, "rgba(190, 225, 235, 0)"],
      [0.42, "rgba(130, 175, 190, 0.26)"],
      [1, "rgba(75, 115, 135, 0.54)"],
    ],
    speck: "rgba(255, 210, 120, 0.28)",
  },
  "throne-of-atlantis": {
    stops: [
      [0, "rgba(255, 230, 180, 0)"],
      [0.32, "rgba(200, 180, 130, 0.28)"],
      [1, "rgba(120, 100, 75, 0.52)"],
    ],
    speck: "rgba(255, 230, 160, 0.34)",
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
  "sunken-gate": {
    gradient: ["#2898b8", "#2088a8", "#187898", "#105868"],
    shaft: ["rgba(120, 230, 255, 0.16)", "rgba(120, 230, 255, 0)"],
    silhouette: "rgba(18, 55, 72, 0.55)",
    bubble: "rgba(160, 240, 255, 0.28)",
  },
  "coral-colonnade": {
    gradient: ["#30a0b8", "#2890a8", "#208098", "#186878"],
    shaft: ["rgba(255, 180, 140, 0.12)", "rgba(255, 180, 140, 0)"],
    silhouette: "rgba(22, 62, 75, 0.5)",
    bubble: "rgba(255, 160, 140, 0.22)",
  },
  "poseidons-plaza": {
    gradient: ["#38a0c0", "#3090b0", "#2880a0", "#206888"],
    shaft: ["rgba(255, 220, 130, 0.18)", "rgba(255, 220, 130, 0)"],
    silhouette: "rgba(20, 58, 78, 0.48)",
    bubble: "rgba(255, 210, 120, 0.26)",
  },
  "temple-of-tides": {
    gradient: ["#2898b0", "#2088a0", "#187890", "#106070"],
    shaft: ["rgba(255, 200, 100, 0.16)", "rgba(255, 200, 100, 0)"],
    silhouette: "rgba(16, 52, 68, 0.52)",
    bubble: "rgba(255, 200, 110, 0.24)",
  },
  "throne-of-atlantis": {
    gradient: ["#2088a8", "#187898", "#106888", "#085868"],
    shaft: ["rgba(255, 230, 150, 0.22)", "rgba(255, 200, 80, 0)"],
    silhouette: "rgba(12, 45, 62, 0.58)",
    bubble: "rgba(255, 220, 140, 0.3)",
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

  if (!PERF_CHROMEBOOK) drawSkullShoalsGraveyardMidwater();
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
  const count = PERF_CHROMEBOOK ? 3 : Math.min(5, placements.length);
  for (let i = 0; i < count; i++) {
    const p = placements[i];
    drawUnderwaterSkeletonRemain(p.x * w, sandTop + dpr * p.y, p.s, p.v);
  }
}

function drawAdventureSkullShoalsEffect(now) {
  const t = now * 0.001;
  ctx.fillStyle = "rgba(40, 10, 20, 0.05)";
  ctx.fillRect(0, waterTop, w, h - waterTop);
  const blobCount = PERF_CHROMEBOOK ? 2 : 3;
  for (let i = 0; i < blobCount; i++) {
    const x = ((i * 137 + Math.floor(t * 12)) % 1000) / 1000 * w;
    const y = waterTop + ((i * 89) % 1000) / 1000 * (h - waterTop) * 0.7;
    const r = dpr * (22 + i * 10);
    ctx.fillStyle = `rgba(80, 20, 30, ${0.05 + i * 0.012})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  if (Math.sin(now * 0.0025) > 0.88) {
    ctx.fillStyle = "rgba(120, 20, 30, 0.04)";
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

const ADVENTURE_ATLANTIS_THEME_VARIANT = {
  "sunken-gate": { columns: 4, domes: 1, coral: 6, glow: 0.85 },
  "coral-colonnade": { columns: 7, domes: 0, coral: 14, glow: 0.7 },
  "poseidons-plaza": { columns: 5, domes: 2, coral: 8, glow: 0.9 },
  "temple-of-tides": { columns: 6, domes: 1, coral: 5, glow: 1 },
  "throne-of-atlantis": { columns: 8, domes: 3, coral: 4, glow: 1.15 },
};

function drawAtlantisColumn(cx, baseY, height, width, alpha = 0.88) {
  const hw = width * dpr;
  const h = height * dpr;
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "#6898a8";
  ctx.strokeStyle = "rgba(160, 210, 230, 0.75)";
  ctx.lineWidth = Math.max(dpr * 0.6, hw * 0.08);
  ctx.fillRect(cx - hw * 0.5, baseY - h, hw, h);
  ctx.strokeRect(cx - hw * 0.5, baseY - h, hw, h);
  ctx.fillStyle = "#88b8c8";
  ctx.fillRect(cx - hw * 0.65, baseY - h - dpr * 2, hw * 1.3, dpr * 3);
  ctx.fillRect(cx - hw * 0.55, baseY - dpr * 2, hw * 1.1, dpr * 3);
  ctx.globalAlpha = 1;
}

function drawAtlantisDome(cx, cy, rx, alpha = 0.82) {
  ctx.globalAlpha = alpha;
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rx);
  g.addColorStop(0, "rgba(255, 230, 160, 0.55)");
  g.addColorStop(0.55, "rgba(120, 180, 200, 0.75)");
  g.addColorStop(1, "rgba(60, 120, 150, 0.85)");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.ellipse(cx, cy, rx, rx * 0.55, 0, Math.PI, 0);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "rgba(200, 240, 255, 0.5)";
  ctx.lineWidth = dpr * 0.8;
  ctx.stroke();
  ctx.globalAlpha = 1;
}

function drawAtlantisWaterBed(themeId) {
  const sandTop = h - dpr * 92;
  const base = sandTop + dpr * 8;
  const v = ADVENTURE_ATLANTIS_THEME_VARIANT[themeId] || ADVENTURE_ATLANTIS_THEME_VARIANT["sunken-gate"];
  ctx.fillStyle = "rgba(80, 130, 155, 0.35)";
  ctx.beginPath();
  ctx.ellipse(w * 0.5, base + dpr * 6, w * 0.44, dpr * 14, 0, 0, Math.PI * 2);
  ctx.fill();
  for (let i = 0; i < v.columns; i++) {
    const px = w * (0.1 + (i / Math.max(1, v.columns - 1)) * 0.8);
    const ht = dpr * (28 + (i % 4) * 14 + (themeId === "throne-of-atlantis" ? 12 : 0));
    drawAtlantisColumn(px, base, ht, 5 + (i % 3), 0.72 + (i % 3) * 0.08);
  }
  for (let i = 0; i < v.domes; i++) {
    const px = w * (0.25 + i * 0.25);
    drawAtlantisDome(px, sandTop - dpr * (35 + i * 18), dpr * (16 + i * 4), 0.78);
  }
  if (themeId === "temple-of-tides") {
    ctx.fillStyle = "rgba(90, 140, 160, 0.65)";
    ctx.beginPath();
    ctx.moveTo(w * 0.22, base);
    ctx.lineTo(w * 0.5, sandTop - dpr * 95);
    ctx.lineTo(w * 0.78, base);
    ctx.closePath();
    ctx.fill();
  }
  if (themeId === "throne-of-atlantis") {
    const throneX = w * 0.5;
    drawAtlantisColumn(throneX, base, dpr * 52, 8, 0.92);
    drawAtlantisDome(throneX, sandTop - dpr * 78, dpr * 22, 0.9);
  }
}

function drawSunkenGateBed() {
  drawAtlantisWaterBed("sunken-gate");
}
function drawCoralColonnadeBed() {
  drawAtlantisWaterBed("coral-colonnade");
}
function drawPoseidonsPlazaBed() {
  drawAtlantisWaterBed("poseidons-plaza");
}
function drawTempleOfTidesBed() {
  drawAtlantisWaterBed("temple-of-tides");
}
function drawThroneOfAtlantisBed() {
  drawAtlantisWaterBed("throne-of-atlantis");
}

function drawAtlantisCoralAccent(now, count) {
  const t = now * 0.001;
  for (let i = 0; i < perfN(count); i++) {
    const px = w * (((i * 113 + 29) % 1000) / 1000);
    const py = waterTop + (h - waterTop) * (0.55 + ((i * 67) % 380) / 1000);
    const r = dpr * (2 + (i % 3) * 1.2);
    ctx.fillStyle = `rgba(${220 - (i % 4) * 30}, ${120 + (i % 5) * 18}, ${130 + (i % 3) * 20}, ${0.28 + (i % 3) * 0.08})`;
    ctx.beginPath();
    ctx.arc(px, py + Math.sin(t + i) * dpr * 2, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawAtlantisSunRays(now, strength = 1) {
  const t = now * 0.001;
  const bands = PERF_CHROMEBOOK ? 4 : 6;
  for (let i = 0; i < bands; i++) {
    const x0 = w * (0.15 + i * 0.14) + Math.sin(t * 0.4 + i) * w * 0.02;
    const grad = ctx.createLinearGradient(x0, waterTop, x0 + w * 0.08, h);
    grad.addColorStop(0, `rgba(255, 230, 150, ${0.14 * strength})`);
    grad.addColorStop(0.45, `rgba(120, 210, 230, ${0.08 * strength})`);
    grad.addColorStop(1, "rgba(40, 100, 130, 0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(x0, waterTop);
    ctx.lineTo(x0 + w * 0.06, h);
    ctx.lineTo(x0 + w * 0.14, h);
    ctx.lineTo(x0 + w * 0.08, waterTop);
    ctx.closePath();
    ctx.fill();
  }
}

function drawAdventureAtlantisThemeEffect(now, themeId) {
  const v = ADVENTURE_ATLANTIS_THEME_VARIANT[themeId] || ADVENTURE_ATLANTIS_THEME_VARIANT["sunken-gate"];
  const wh = h - waterTop;
  drawAtlantisSunRays(now, v.glow);

  const haze = ctx.createLinearGradient(0, waterTop, 0, h);
  haze.addColorStop(0, "rgba(120, 220, 240, 0.14)");
  haze.addColorStop(0.35, "rgba(40, 120, 150, 0.1)");
  haze.addColorStop(1, "rgba(8, 35, 55, 0.2)");
  ctx.fillStyle = haze;
  ctx.fillRect(0, waterTop, w, wh);

  drawAtlantisCoralAccent(now, v.coral);

  const surfaceSheen = ctx.createLinearGradient(0, waterTop, 0, waterTop + dpr * 90);
  surfaceSheen.addColorStop(0, "rgba(180, 240, 255, 0.24)");
  surfaceSheen.addColorStop(1, "rgba(120, 200, 230, 0)");
  ctx.fillStyle = surfaceSheen;
  ctx.fillRect(0, waterTop, w, dpr * 90);

  if (themeId === "throne-of-atlantis") {
    const crown = ctx.createRadialGradient(w * 0.5, waterTop + dpr * 30, 0, w * 0.5, waterTop + dpr * 30, w * 0.35);
    crown.addColorStop(0, "rgba(255, 230, 150, 0.22)");
    crown.addColorStop(1, "rgba(255, 200, 80, 0)");
    ctx.fillStyle = crown;
    ctx.fillRect(0, waterTop, w, wh * 0.55);
  }
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
  "sunken-gate": drawSunkenGateBed,
  "coral-colonnade": drawCoralColonnadeBed,
  "poseidons-plaza": drawPoseidonsPlazaBed,
  "temple-of-tides": drawTempleOfTidesBed,
  "throne-of-atlantis": drawThroneOfAtlantisBed,
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
  if (Math.sin(now * 0.002) <= 0.7) return;
  const cx = w * 0.5;
  const cy = h - dpr * 54;
  const pulse = 0.85 + Math.sin(now * 0.003) * 0.15;
  ctx.strokeStyle = `rgba(255, 220, 160, ${0.12 * pulse})`;
  ctx.lineWidth = dpr * 1.2;
  ctx.beginPath();
  ctx.arc(cx, cy, dpr * 18 * pulse, 0, Math.PI * 2);
  ctx.stroke();
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
  "sunken-gate": (now) => drawAdventureAtlantisThemeEffect(now, "sunken-gate"),
  "coral-colonnade": (now) => drawAdventureAtlantisThemeEffect(now, "coral-colonnade"),
  "poseidons-plaza": (now) => drawAdventureAtlantisThemeEffect(now, "poseidons-plaza"),
  "temple-of-tides": (now) => drawAdventureAtlantisThemeEffect(now, "temple-of-tides"),
  "throne-of-atlantis": (now) => drawAdventureAtlantisThemeEffect(now, "throne-of-atlantis"),
};

const ADVENTURE_BONUS_THEME_BASE = {
  "bounty-trench": "leviathan-deep",
  "molten-maelstrom": "lava-falls",
  "pearl-abyss": "emerald-lagoon",
  "crown-reef": "golden-atoll",
  "middle-passage": "serpent-strait",
  "krakens-grotto": "krakens-teeth",
  "legends-gate": "treasure-cove",
};

const ADVENTURE_GOLD_QUEST_THEMES = [
  "bounty-trench",
  "molten-maelstrom",
  "pearl-abyss",
  "crown-reef",
  "middle-passage",
  "krakens-grotto",
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
    "middle-passage": 25,
    "krakens-grotto": 26,
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
  // Tuned for a focused player: solid hauls clear the chart, but Gold Quest
  // onward should not be breezy. Quotas sit under a strong run (~10.8k on mid
  // Gold) while still leaving room to miss a few fish.
  if (i < ADVENTURE_MAIN_LEVEL_COUNT) {
    return 5200 + Math.round((i * (9000 - 5200)) / Math.max(1, ADVENTURE_MAIN_LEVEL_COUNT - 1));
  }
  if (i < ADVENTURE_ICE_START_INDEX) {
    const bonusI = i - ADVENTURE_MAIN_LEVEL_COUNT;
    return 9000 + Math.round((bonusI * (10800 - 9000)) / Math.max(1, ADVENTURE_BONUS_LEVEL_COUNT - 1));
  }
  if (i < ADVENTURE_LOST_CITY_START_INDEX) {
    const iceI = i - ADVENTURE_ICE_START_INDEX;
    return 10000 + Math.round((iceI * (11000 - 10000)) / Math.max(1, ADVENTURE_ICE_LEVEL_COUNT - 1));
  }
  const lostI = i - ADVENTURE_LOST_CITY_START_INDEX;
  return 10500 + Math.round((lostI * (11800 - 10500)) / Math.max(1, ADVENTURE_LOST_CITY_LEVEL_COUNT - 1));
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
  if (drawEffect) {
    const skipSkullFx = atm.effect === "skull" && PERF_CHROMEBOOK && gameLoopTick % 2 !== 0;
    if (!skipSkullFx) drawEffect(now);
  }
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
    gems: 0,
    baitCounts: {},
    selectedBaitId: "standard",
    ownedRodIds: [FREE_ROD_ID],
    selectedRodId: FREE_ROD_ID,
    totalTreasureChests: 0,
    adventureHighestLevel: 0,
    adventureMapContentRev: ADVENTURE_MAP_CONTENT_REV,
    pendingAdventureHomeCelebration: false,
    pendingBonusVoyagesCelebration: false,
    pendingIceVoyagesCelebration: false,
    pendingLostCityCelebration: false,
    pendingDailyPrizeCelebration: null,
    playerInitials: "",
    playerName: "",
    dailyPrizeCheckedDay: "",
    magnetRodDayKey: "",
    duelTickets: 0,
    duelTicketsDayKey: "",
    dailyCatch: null,
    chestItems: emptyChestItems(),
    catchStamps: [],
    pendingLuckyLure: false,
    pendingDoubleHaul: false,
    pendingMysteryReef: false,
    ownedClothes: normalizeOwnedClothes([...STARTER_COMPANION_IDS]),
    equippedClothes: STARTER_COMPANION_ID,
    dailyClothesShop: null,
    ownedAvatarFrames: normalizeOwnedAvatarFrames([STARTER_AVATAR_FRAME_ID]),
    equippedAvatarFrame: STARTER_AVATAR_FRAME_ID,
    dailyAvatarFrameShop: null,
    tourneyVoteDayKey: "",
    tourneyVoteKind: "",
    tourneySignedUpDayKey: "",
  };
}

let gameMeta = defaultMeta();

/** Remap voyage progress when new reefs are inserted before later sections. */
function migrateAdventureMapProgress(highestLevel, contentRev) {
  let highest = Math.max(0, Math.floor(Number(highestLevel) || 0));
  let rev = Math.max(0, Math.floor(Number(contentRev) || 1));
  if (rev < 2) {
    // Gold Quest gained Middle Passage + Kraken's Grotto before Legend's Gate.
    if (highest >= ADVENTURE_PREV_ICE_START_FOR_REV1) highest += 2;
    rev = 2;
  }
  if (rev === 3) {
    // Skull Cave was briefly a voyage after Treasurehorn Peak; undo that insert.
    if (highest > 12) highest -= 1;
    rev = 4;
  }
  if (rev < ADVENTURE_MAP_CONTENT_REV) rev = ADVENTURE_MAP_CONTENT_REV;
  return {
    adventureHighestLevel: Math.max(0, Math.min(ADVENTURE_LEVEL_COUNT, highest)),
    adventureMapContentRev: rev,
  };
}

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
    const owned = Array.isArray(o.ownedRodIds)
      ? o.ownedRodIds.filter((id) => RODS.some((r) => r.id === id) && id !== MAGNET_ROD_ID)
      : [];
    const ownedRodIds = Array.from(new Set([FREE_ROD_ID, ...owned]));
    let selectedRodId = typeof o.selectedRodId === "string" ? o.selectedRodId : FREE_ROD_ID;
    if (!ownedRodIds.includes(selectedRodId)) selectedRodId = FREE_ROD_ID;
    const adventureProgress = migrateAdventureMapProgress(o.adventureHighestLevel, o.adventureMapContentRev);
    return {
      coins: Math.max(0, Math.floor(Number(o.coins) || 0)),
      gems: Math.max(0, Math.floor(Number(o.gems) || 0)),
      baitCounts: counts,
      selectedBaitId,
      ownedRodIds,
      selectedRodId,
      totalTreasureChests: Math.max(0, Math.floor(Number(o.totalTreasureChests) || 0)),
      adventureHighestLevel: adventureProgress.adventureHighestLevel,
      adventureMapContentRev: adventureProgress.adventureMapContentRev,
      pendingAdventureHomeCelebration: Boolean(o.pendingAdventureHomeCelebration),
      pendingBonusVoyagesCelebration: Boolean(o.pendingBonusVoyagesCelebration),
      pendingIceVoyagesCelebration: Boolean(o.pendingIceVoyagesCelebration),
      pendingLostCityCelebration: Boolean(o.pendingLostCityCelebration),
      pendingDailyPrizeCelebration: normalizePendingDailyPrizeCelebration(o.pendingDailyPrizeCelebration),
      playerInitials: String(o.playerInitials || "")
        .toUpperCase()
        .replace(/[^A-Z]/g, "")
        .slice(0, 3),
      playerName: String(o.playerName || "").replace(/\s+/g, " ").trim().slice(0, 16),
      dailyPrizeCheckedDay: String(o.dailyPrizeCheckedDay || ""),
      magnetRodDayKey: String(o.magnetRodDayKey || ""),
      duelTickets: Math.max(0, Math.floor(Number(o.duelTickets) || 0)),
      duelTicketsDayKey: String(o.duelTicketsDayKey || ""),
      dailyCatch: normalizeDailyCatchState(o.dailyCatch),
      chestItems: normalizeChestItems(o.chestItems),
      catchStamps: normalizeCatchStamps(o.catchStamps),
      pendingLuckyLure: Boolean(o.pendingLuckyLure),
      pendingDoubleHaul: Boolean(o.pendingDoubleHaul),
      pendingMysteryReef: Boolean(o.pendingMysteryReef),
      ownedClothes: normalizeOwnedClothes(o.ownedClothes),
      equippedClothes: normalizeEquippedClothes(o.equippedClothes, normalizeOwnedClothes(o.ownedClothes)),
      dailyClothesShop: normalizeDailyClothesShop(o.dailyClothesShop),
      ownedAvatarFrames: normalizeOwnedAvatarFrames(o.ownedAvatarFrames),
      equippedAvatarFrame: normalizeEquippedAvatarFrame(
        o.equippedAvatarFrame,
        normalizeOwnedAvatarFrames(o.ownedAvatarFrames)
      ),
      dailyAvatarFrameShop: normalizeDailyAvatarFrameShop(o.dailyAvatarFrameShop),
      tourneyVoteDayKey: typeof o.tourneyVoteDayKey === "string" ? o.tourneyVoteDayKey : "",
      tourneyVoteKind: typeof o.tourneyVoteKind === "string" ? o.tourneyVoteKind : "",
      tourneySignedUpDayKey: typeof o.tourneySignedUpDayKey === "string" ? o.tourneySignedUpDayKey : "",
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

function getGemCount() {
  return Math.max(0, Math.floor(Number(gameMeta.gems) || 0));
}

function addGems(qty) {
  const n = Math.max(0, Math.floor(qty));
  if (!n) return;
  gameMeta.gems = getGemCount() + n;
}

function spendGems(qty) {
  const need = Math.max(0, Math.floor(qty));
  if (getGemCount() < need) return false;
  gameMeta.gems = getGemCount() - need;
  return true;
}

function chestGemsForTier(tier) {
  const t = normalizeChestTier(tier);
  if (t === "legendary") return CHEST_GEMS_LEGENDARY;
  if (t === "rare") return CHEST_GEMS_RARE;
  return CHEST_GEMS_COMMON;
}

function rodSpecById(id) {
  return RODS.find((r) => r.id === id) || RODS[0];
}

function isMagnetRodActive() {
  return gameMeta.magnetRodDayKey === getDailyDayKey();
}

function expireMagnetRodIfNeeded() {
  if (!gameMeta.magnetRodDayKey) return;
  if (isMagnetRodActive()) return;
  gameMeta.magnetRodDayKey = "";
  if (gameMeta.selectedRodId === MAGNET_ROD_ID) gameMeta.selectedRodId = FREE_ROD_ID;
  saveMeta();
}

function grantMagnetRodForToday() {
  gameMeta.magnetRodDayKey = getDailyDayKey();
  gameMeta.selectedRodId = MAGNET_ROD_ID;
  selectedRod = rodSpecById(MAGNET_ROD_ID);
  saveMeta();
  buildRodUI();
}

function dailyPrizeChestTierForRank(rank) {
  return DAILY_PRIZE_CHEST_TIERS[rank] || "common";
}

function dailyPrizeChestNameForTier(tier) {
  const t = normalizeChestTier(tier);
  if (t === "legendary") return "Legendary chest";
  if (t === "rare") return "Rare chest";
  return "Common chest";
}

function normalizeDailyPrizeBundle(raw) {
  if (!raw || typeof raw !== "object") return null;
  const coins = Math.max(0, Math.floor(Number(raw.coins) || 0));
  const gems = Math.max(0, Math.floor(Number(raw.gems) || 0));
  let bait = null;
  if (raw.bait && typeof raw.bait === "object") {
    const id = String(raw.bait.id || "");
    if (BAITS.some((b) => b.id === id)) {
      bait = {
        id,
        name: baitSpecById(id).name,
        qty: Math.max(1, Math.floor(Number(raw.bait.qty) || 1)),
      };
    }
  }
  let rodId = null;
  let rodName = null;
  const rawRodId = String(raw.rodId || "");
  if (rawRodId && RODS.some((r) => r.id === rawRodId && r.id !== FREE_ROD_ID && r.id !== MAGNET_ROD_ID)) {
    rodId = rawRodId;
    rodName = rodSpecById(rodId).name;
  }
  let special = null;
  if (raw.special && typeof raw.special === "object") {
    const kind = String(raw.special.kind || "");
    if (kind === "catch_stamp" || CHEST_ITEM_DEFS[kind]) special = raw.special;
  }
  return { coins, gems, bait, rodId, rodName, special };
}

function rollDailyPrizeChestBundle(tier) {
  const bundles = rollCrabBundles(tier);
  return bundles[Math.floor(Math.random() * bundles.length)] || bundles[0] || null;
}

function ensureDailyPrizeBundle(prize) {
  if (!prize) return prize;
  const chestTier = normalizeChestTier(prize.chestTier || dailyPrizeChestTierForRank(prize.rank));
  prize.chestTier = chestTier;
  prize.chestName = prize.chestName || dailyPrizeChestNameForTier(chestTier);
  if (!prize.bundle) prize.bundle = rollDailyPrizeChestBundle(chestTier);
  return prize;
}

function snapshotDailyPrizeBoard(rows) {
  return (Array.isArray(rows) ? rows : []).slice(0, 10).map((r) => ({
    initials: String(r.initials || "").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 3),
    name: leaderboardDisplayName(r),
    score: Math.max(0, Math.floor(Number(r.score) || 0)),
  }));
}

function normalizeDailyPrizeBoard(raw) {
  if (!Array.isArray(raw)) return [];
  return snapshotDailyPrizeBoard(raw);
}

function normalizePendingDailyPrizeCelebration(raw) {
  if (!raw || typeof raw !== "object") return null;
  const rank = Math.max(0, Math.min(2, Math.floor(Number(raw.rank) || 0)));
  const dayLabel = String(raw.dayLabel || "").trim();
  const rawTier = String(raw.chestTier || "");
  const known = rawTier === "legendary" || rawTier === "rare" || rawTier === "common" || rawTier === "great" || rawTier === "medium" || rawTier === "good";
  const chestTier = known ? normalizeChestTier(rawTier) : dailyPrizeChestTierForRank(rank);
  return {
    rank,
    chestTier,
    chestName: dailyPrizeChestNameForTier(chestTier),
    bundle: normalizeDailyPrizeBundle(raw.bundle),
    board: normalizeDailyPrizeBoard(raw.board),
    dayLabel,
  };
}

/** Daily Catch challenge pool — targets take a few reef rounds, not one lucky haul. */
const DAILY_CATCH_POOL = [
  { morph: "jellyfish", label: "Moon Jellyfish", count: 24 },
  { morph: "clownfish", label: "Clown Anemonefish", count: 22 },
  { morph: "silverside", label: "silverside fish", count: 34 },
  { morph: "mackerel", label: "Chub Mackerel", count: 20 },
  { morph: "barramundi", label: "Barramundi", count: 20 },
  { morph: "angelfish", label: "Queen Angelfish", count: 16 },
  { morph: "seahorse", label: "Lined Seahorse", count: 14 },
  { morph: "lobster", label: "Caribbean Spiny Lobster", count: 14 },
  { morph: "cuttlefish", label: "Common Cuttlefish", count: 14 },
  { morph: "snapper", label: "snapper", count: 16 },
];

function hashDailyCatchSeed(dayKey) {
  let h = 2166136261;
  const s = String(dayKey || "");
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function normalizeDailyCatchState(raw) {
  if (!raw || typeof raw !== "object") return null;
  const dayKey = String(raw.dayKey || "");
  const morph = String(raw.morph || "");
  const label = String(raw.label || "").trim();
  const target = Math.max(1, Math.floor(Number(raw.target) || 0));
  const progress = Math.max(0, Math.floor(Number(raw.progress) || 0));
  const claimed = Boolean(raw.claimed);
  if (!dayKey || !morph || !label || !target) return null;
  return { dayKey, morph, label, target, progress, claimed };
}

function rollDailyCatchForDay(dayKey) {
  const pool = DAILY_CATCH_POOL;
  const idx = hashDailyCatchSeed(dayKey) % pool.length;
  const pick = pool[idx];
  return {
    dayKey,
    morph: pick.morph,
    label: pick.label,
    target: pick.count,
    progress: 0,
    claimed: false,
  };
}

function ensureDailyCatchChallenge() {
  const today = getDailyDayKey();
  const cur = normalizeDailyCatchState(gameMeta.dailyCatch);
  if (cur && cur.dayKey === today) {
    gameMeta.dailyCatch = cur;
    return cur;
  }
  gameMeta.dailyCatch = rollDailyCatchForDay(today);
  saveMeta();
  return gameMeta.dailyCatch;
}

function isDailyCatchComplete(ch = gameMeta.dailyCatch) {
  const c = normalizeDailyCatchState(ch);
  return Boolean(c && c.progress >= c.target);
}

function refreshDailyCatchEventCard() {
  const ch = ensureDailyCatchChallenge();
  if (!ch) return;
  const done = isDailyCatchComplete(ch);
  const pct = Math.min(100, Math.round((ch.progress / Math.max(1, ch.target)) * 100));
  if (dailyCatchGoalEl) dailyCatchGoalEl.textContent = `Catch ${ch.target} ${ch.label}`;
  if (dailyCatchProgressBar) dailyCatchProgressBar.style.width = `${pct}%`;
  if (dailyCatchProgressText) {
    dailyCatchProgressText.textContent = `${Math.min(ch.progress, ch.target)} / ${ch.target}`;
  }
  if (dailyCatchReset) dailyCatchReset.textContent = formatDailyResetCountdown(msUntilDailyReset());
  if (dailyCatchStatus) {
    if (ch.claimed) {
      dailyCatchStatus.textContent = "Reward claimed — new challenge tomorrow.";
    } else if (done) {
      dailyCatchStatus.textContent = "Challenge complete! Claim your reward.";
    } else {
      dailyCatchStatus.textContent = "Play any reef round — matching catches count toward today's goal.";
    }
  }
  if (btnDailyCatchClaim) {
    if (ch.claimed) {
      btnDailyCatchClaim.hidden = true;
    } else if (done) {
      btnDailyCatchClaim.hidden = false;
      btnDailyCatchClaim.disabled = false;
      btnDailyCatchClaim.textContent = "Claim your reward";
    } else {
      btnDailyCatchClaim.hidden = true;
    }
  }
}

function noteDailyCatchFromSpec(spec) {
  if (!spec || !spec.morph) return;
  const ch = ensureDailyCatchChallenge();
  if (!ch || ch.claimed || ch.progress >= ch.target) return;
  if (spec.morph !== ch.morph) return;
  const before = ch.progress;
  ch.progress = Math.min(ch.target, ch.progress + 1);
  gameMeta.dailyCatch = ch;
  saveMeta();
  if (ch.progress >= ch.target && before < ch.target) {
    showToast("Daily Catch complete! Claim your reward in Events", 2800);
  } else if (ch.progress > before && (ch.progress === 1 || ch.progress % 5 === 0 || ch.progress >= ch.target - 2)) {
    showToast(`Daily Catch ${ch.progress}/${ch.target} · ${ch.label}`, 1200);
  }
  if (panelEvents && !panelEvents.hidden) refreshDailyCatchEventCard();
}

/** "crab" | "dailyCatch" — which flow owns the shared chest panel. */
let crabRewardSource = "crab";

function showDailyCatchReward() {
  const ch = ensureDailyCatchChallenge();
  if (!ch || ch.claimed || !isDailyCatchComplete(ch)) return;
  hideAllPanels();
  crabRewardSource = "dailyCatch";
  resetChestOpenUi();
  const tier = "rare";
  crabRewardBundles = rollCrabBundles(tier);
  crabRewardClaimed = false;
  if (crabRewardHeadline) crabRewardHeadline.textContent = "Daily Catch!";
  if (crabRewardSummary) {
    crabRewardSummary.innerHTML = `You caught <strong>${ch.target}</strong> ${ch.label}`;
  }
  if (crabRewardTier) {
    crabRewardTier.hidden = true;
    crabRewardTier.textContent = "";
  }
  if (crabRewardPrompt) crabRewardPrompt.textContent = "Choose one chest to claim your reward.";
  if (crabRewardResult) {
    crabRewardResult.hidden = true;
    crabRewardResult.textContent = "";
  }
  if (btnCrabPlayAgain) btnCrabPlayAgain.hidden = true;
  setCrabRewardBackLabel("Back to Events");
  renderCrabRewardChests(tier);
  if (panelCrabReward) panelCrabReward.hidden = false;
}

function dailyPrizeExtrasLabel(rank) {
  if (rank === 0) return " + Magnet Rod";
  return "";
}

function isRodOwned(rodId) {
  if (rodId === MAGNET_ROD_ID) return isMagnetRodActive();
  return rodId === FREE_ROD_ID || (Array.isArray(gameMeta.ownedRodIds) && gameMeta.ownedRodIds.includes(rodId));
}

function normalizeSelectedRod() {
  expireMagnetRodIfNeeded();
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
    mapPin: { x: 181, y: 60 },
    fishPool: [
      "barramundi",
      "pacific_sardine",
      "chub_mackerel",
      "clown_anemonefish",
      "queen_angelfish",
      "lined_seahorse",
      "moon_jellyfish",
      "coral_trout_gbr",
      "yellowfin_tuna",
      "yellowtail_amberjack",
      "dolphinfish_mahi",
      "green_sea_turtle",
      "reef_octopus",
      "australian_blacktip",
      "giant_trevally",
      "reef_manta",
      "great_hammerhead",
      "great_barracuda",
      "sea_otter",
    ],
    visuals: {
      gradient: ["#6ebfd0", "#2a8f9c", "#126878", "#053848"],
      shaft: ["rgba(255, 248, 220, 0.16)", "rgba(255, 248, 220, 0)"],
      silhouette: "rgba(6, 55, 58, 0.48)",
      corals: [
        { x: 0.04, c: "#d4a574", h: 0.4 },
        { x: 0.1, c: "#2a9d8f", h: 0.34 },
        { x: 0.16, c: "#e07a5f", h: 0.38 },
        { x: 0.24, c: "#3d8b7a", h: 0.31 },
        { x: 0.32, c: "#e9c46a", h: 0.36 },
        { x: 0.4, c: "#4a9b8e", h: 0.29 },
        { x: 0.49, c: "#c97b63", h: 0.42 },
        { x: 0.58, c: "#5aa9a0", h: 0.33 },
        { x: 0.66, c: "#d4a017", h: 0.39 },
        { x: 0.74, c: "#2f855a", h: 0.3 },
        { x: 0.82, c: "#c0846a", h: 0.41 },
        { x: 0.9, c: "#3b8c80", h: 0.35 },
        { x: 0.96, c: "#d97706", h: 0.28 },
      ],
      bubble: "rgba(200, 245, 235, 0.32)",
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
    mapPin: { x: 51, y: 40 },
    fishPool: [
      "northern_anchovy",
      "pacific_sardine",
      "chub_mackerel",
      "clown_anemonefish",
      "moon_jellyfish",
      "red_snapper",
      "striped_bass",
      "queen_angelfish",
      "caribbean_lobster",
      "common_cuttlefish",
      "albacore_tuna",
      "dolphinfish_mahi",
      "yellowtail_amberjack",
      "yellowfin_tuna",
      "green_sea_turtle",
      "reef_octopus",
      "bottlenose_dolphin",
      "reef_manta",
      "blue_marlin",
      "swordfish",
      "great_barracuda",
      "atlantic_bluefin",
    ],
    visuals: {
      gradient: ["#5eb4d0", "#2a88b0", "#145878", "#0a3048"],
      shaft: ["rgba(255, 246, 210, 0.13)", "rgba(255, 246, 210, 0)"],
      silhouette: "rgba(6, 36, 52, 0.5)",
      corals: [
        { x: 0.06, c: "#c45c5c", h: 0.34 },
        { x: 0.14, c: "#d4785a", h: 0.28 },
        { x: 0.24, c: "#e08a4a", h: 0.32 },
        { x: 0.34, c: "#c97a3a", h: 0.25 },
        { x: 0.46, c: "#b86b7a", h: 0.3 },
        { x: 0.58, c: "#7a5c8c", h: 0.27 },
        { x: 0.7, c: "#d4a06a", h: 0.33 },
        { x: 0.82, c: "#c07060", h: 0.29 },
        { x: 0.92, c: "#8a6a9a", h: 0.24 },
      ],
      bubble: "rgba(190, 230, 245, 0.3)",
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
    mapPin: { x: 106, y: 26 },
    fishPool: [
      "european_sprat",
      "atlantic_herring",
      "chub_mackerel",
      "moon_jellyfish",
      "european_seabass",
      "atlantic_cod",
      "lined_seahorse",
      "harbor_seal",
      "common_cuttlefish",
      "yellowfin_tuna",
      "atlantic_halibut",
      "swordfish",
      "blue_marlin",
      "bottlenose_dolphin",
      "atlantic_bluefin",
    ],
    visuals: {
      gradient: ["#6a8eb0", "#3d5e80", "#243850", "#0c1828"],
      shaft: ["rgba(210, 225, 240, 0.09)", "rgba(210, 225, 240, 0)"],
      silhouette: "rgba(18, 30, 44, 0.52)",
      corals: [
        { x: 0.09, c: "#6b7c5e", h: 0.2 },
        { x: 0.2, c: "#8a9a72", h: 0.16 },
        { x: 0.86, c: "#5a6b58", h: 0.21 },
        { x: 0.93, c: "#7a8a6a", h: 0.13 },
      ],
      bubble: "rgba(170, 195, 220, 0.24)",
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
    mapPin: { x: 177, y: 31 },
    fishPool: [
      "pacific_sardine",
      "chub_mackerel",
      "northern_anchovy",
      "moon_jellyfish",
      "albacore_tuna",
      "yellowfin_tuna",
      "yellowtail_amberjack",
      "atlantic_halibut",
      "harbor_seal",
      "giant_trevally",
      "swordfish",
      "blue_marlin",
      "reef_manta",
      "bottlenose_dolphin",
      "atlantic_bluefin",
      "great_barracuda",
      "sea_otter",
    ],
    visuals: {
      gradient: ["#4aa0c4", "#1f6e94", "#0e4568", "#031828"],
      shaft: ["rgba(170, 225, 245, 0.09)", "rgba(170, 225, 245, 0)"],
      silhouette: "rgba(4, 26, 44, 0.56)",
      corals: [
        { x: 0.1, c: "#4a7a68", h: 0.18 },
        { x: 0.22, c: "#5a8a78", h: 0.14 },
        { x: 0.8, c: "#3a6570", h: 0.2 },
        { x: 0.91, c: "#4a8090", h: 0.12 },
      ],
      bubble: "rgba(140, 210, 240, 0.2)",
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
    mapPin: { x: 181, y: 42 },
    fishPool: [
      "black_seadevil",
      "viperfish",
      "hatchetfish",
      "dumbo_octopus",
      "gulper_eel",
      "fangtooth",
      "giant_isopod",
    ],
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
  {
    id: "hawaii",
    name: "Hawaiian Archipelago",
    mapPlace: "Main Hawaiian Islands, Pacific",
    desc: "Trade-wind shallows · mahi, trevally, and turtles on the lava shelf.",
    difficulty: "Easy",
    adventureCycle: false,
    roundMs: 66_000,
    spawnMin: 480,
    spawnMax: 1900,
    maxFish: 11,
    fishSpeed: 0.82,
    rareRollMult: 1.1,
    weights: { common: 54, uncommon: 28, rare: 11, epic: 5, legendary: 2 },
    mapPin: { x: 12, y: 38 },
    fishPool: [
      "pacific_sardine",
      "chub_mackerel",
      "clown_anemonefish",
      "queen_angelfish",
      "moon_jellyfish",
      "dolphinfish_mahi",
      "yellowfin_tuna",
      "giant_trevally",
      "green_sea_turtle",
      "reef_manta",
      "bottlenose_dolphin",
      "blue_marlin",
    ],
    visuals: {
      gradient: ["#5ec8e0", "#1a8fb8", "#0c5a78", "#063040"],
      shaft: ["rgba(255, 250, 230, 0.18)", "rgba(255, 250, 230, 0)"],
      silhouette: "rgba(8, 40, 56, 0.46)",
      corals: [
        { x: 0.08, c: "#1e293b", h: 0.22 },
        { x: 0.2, c: "#334155", h: 0.18 },
        { x: 0.38, c: "#0f766e", h: 0.28 },
        { x: 0.56, c: "#155e75", h: 0.2 },
        { x: 0.74, c: "#44403c", h: 0.24 },
        { x: 0.9, c: "#0e7490", h: 0.16 },
      ],
      bubble: "rgba(186, 230, 253, 0.3)",
    },
  },
  {
    id: "galapagos",
    name: "Galápagos Islands",
    mapPlace: "Pacific, off Ecuador",
    desc: "Cold upwelling mix · hammerheads, turtles, and seal patrols.",
    difficulty: "Hard",
    adventureCycle: false,
    roundMs: 56_000,
    spawnMin: 250,
    spawnMax: 900,
    maxFish: 16,
    fishSpeed: 1.16,
    rareRollMult: 0.9,
    weights: { common: 50, uncommon: 26, rare: 13, epic: 7, legendary: 4 },
    mapPin: { x: 50, y: 50 },
    fishPool: [
      "pacific_sardine",
      "chub_mackerel",
      "green_sea_turtle",
      "harbor_seal",
      "australian_blacktip",
      "great_hammerhead",
      "reef_manta",
      "bottlenose_dolphin",
      "yellowfin_tuna",
      "blue_marlin",
      "sea_otter",
      "giant_trevally",
    ],
    visuals: {
      gradient: ["#5aa8b8", "#2a6e80", "#164858", "#0a2430"],
      shaft: ["rgba(220, 240, 245, 0.12)", "rgba(220, 240, 245, 0)"],
      silhouette: "rgba(10, 32, 40, 0.52)",
      corals: [
        { x: 0.12, c: "#57534e", h: 0.2 },
        { x: 0.3, c: "#44403c", h: 0.26 },
        { x: 0.52, c: "#3f6212", h: 0.16 },
        { x: 0.74, c: "#292524", h: 0.22 },
        { x: 0.9, c: "#365314", h: 0.14 },
      ],
      bubble: "rgba(165, 243, 252, 0.22)",
    },
  },
  {
    id: "red_sea",
    name: "Ras Mohammed",
    mapPlace: "Red Sea, Sinai, Egypt",
    desc: "Clear desert reef · angels, trevally, and barracuda in the drop-off.",
    difficulty: "Medium",
    adventureCycle: false,
    roundMs: 62_000,
    spawnMin: 360,
    spawnMax: 1320,
    maxFish: 14,
    fishSpeed: 0.96,
    rareRollMult: 1.04,
    weights: { common: 52, uncommon: 28, rare: 12, epic: 6, legendary: 2 },
    mapPin: { x: 119, y: 35 },
    fishPool: [
      "clown_anemonefish",
      "queen_angelfish",
      "lined_seahorse",
      "moon_jellyfish",
      "coral_trout_gbr",
      "giant_trevally",
      "great_barracuda",
      "reef_octopus",
      "green_sea_turtle",
      "reef_manta",
      "yellowfin_tuna",
      "common_cuttlefish",
    ],
    visuals: {
      gradient: ["#7dd3e8", "#38bdf8", "#0e7490", "#164e63"],
      shaft: ["rgba(255, 248, 230, 0.2)", "rgba(255, 248, 230, 0)"],
      silhouette: "rgba(12, 48, 64, 0.42)",
      corals: [
        { x: 0.1, c: "#fb7185", h: 0.34 },
        { x: 0.24, c: "#f97316", h: 0.28 },
        { x: 0.4, c: "#14b8a6", h: 0.32 },
        { x: 0.56, c: "#e11d48", h: 0.24 },
        { x: 0.72, c: "#22c55e", h: 0.3 },
        { x: 0.88, c: "#f59e0b", h: 0.22 },
      ],
      bubble: "rgba(207, 250, 254, 0.32)",
    },
  },
  {
    id: "maldives",
    name: "Maldives Atolls",
    mapPlace: "Central Indian Ocean",
    desc: "Turquoise rings · manta passes, reef fish, and tuna outside the rim.",
    difficulty: "Easy",
    adventureCycle: false,
    roundMs: 64_000,
    spawnMin: 460,
    spawnMax: 1760,
    maxFish: 12,
    fishSpeed: 0.86,
    rareRollMult: 1.08,
    weights: { common: 52, uncommon: 28, rare: 12, epic: 6, legendary: 2 },
    mapPin: { x: 141, y: 48 },
    fishPool: [
      "clown_anemonefish",
      "queen_angelfish",
      "lined_seahorse",
      "moon_jellyfish",
      "reef_octopus",
      "green_sea_turtle",
      "reef_manta",
      "yellowfin_tuna",
      "dolphinfish_mahi",
      "bottlenose_dolphin",
      "giant_trevally",
      "atlantic_bluefin",
    ],
    visuals: {
      gradient: ["#7ee0f0", "#2ab4c8", "#0e7a8c", "#0a3a48"],
      shaft: ["rgba(255, 255, 245, 0.2)", "rgba(255, 255, 245, 0)"],
      silhouette: "rgba(8, 50, 58, 0.4)",
      corals: [
        { x: 0.08, c: "#f472b6", h: 0.26 },
        { x: 0.22, c: "#2dd4bf", h: 0.3 },
        { x: 0.4, c: "#fb7185", h: 0.22 },
        { x: 0.58, c: "#67e8f9", h: 0.28 },
        { x: 0.76, c: "#a78bfa", h: 0.2 },
        { x: 0.9, c: "#34d399", h: 0.24 },
      ],
      bubble: "rgba(207, 250, 254, 0.34)",
    },
  },
  {
    id: "raja_ampat",
    name: "Raja Ampat",
    mapPlace: "West Papua, Indonesia",
    desc: "The densest coral gardens · angels, octopi, and reef sharks in the cuts.",
    difficulty: "Medium",
    adventureCycle: false,
    roundMs: 60_000,
    spawnMin: 340,
    spawnMax: 1240,
    maxFish: 15,
    fishSpeed: 0.98,
    rareRollMult: 1.02,
    weights: { common: 50, uncommon: 28, rare: 13, epic: 6, legendary: 3 },
    mapPin: { x: 172, y: 50 },
    fishPool: [
      "clown_anemonefish",
      "queen_angelfish",
      "lined_seahorse",
      "coral_trout_gbr",
      "reef_octopus",
      "common_cuttlefish",
      "australian_blacktip",
      "green_sea_turtle",
      "reef_manta",
      "giant_trevally",
      "great_barracuda",
      "dumbo_octopus",
    ],
    visuals: {
      gradient: ["#4ec4c0", "#1a8a8c", "#0c5860", "#063038"],
      shaft: ["rgba(240, 255, 250, 0.16)", "rgba(240, 255, 250, 0)"],
      silhouette: "rgba(6, 40, 44, 0.5)",
      corals: [
        { x: 0.06, c: "#f43f5e", h: 0.36 },
        { x: 0.18, c: "#14b8a6", h: 0.3 },
        { x: 0.32, c: "#f59e0b", h: 0.34 },
        { x: 0.48, c: "#8b5cf6", h: 0.26 },
        { x: 0.64, c: "#22c55e", h: 0.32 },
        { x: 0.8, c: "#fb7185", h: 0.28 },
        { x: 0.92, c: "#06b6d4", h: 0.22 },
      ],
      bubble: "rgba(153, 246, 228, 0.3)",
    },
  },
  {
    id: "lofoten",
    name: "Lofoten Coast",
    mapPlace: "Arctic Norway",
    desc: "Cold fjord light · herring, cod, halibut, and seals under the cliffs.",
    difficulty: "Hard",
    adventureCycle: false,
    roundMs: 54_000,
    spawnMin: 240,
    spawnMax: 880,
    maxFish: 16,
    fishSpeed: 1.14,
    rareRollMult: 0.92,
    weights: { common: 58, uncommon: 24, rare: 11, epic: 5, legendary: 2 },
    mapPin: { x: 108, y: 12 },
    fishPool: [
      "atlantic_herring",
      "european_sprat",
      "atlantic_cod",
      "atlantic_halibut",
      "harbor_seal",
      "european_seabass",
      "chub_mackerel",
      "moon_jellyfish",
      "atlantic_bluefin",
      "swordfish",
      "sea_otter",
    ],
    visuals: {
      gradient: ["#8aa8c0", "#4a6a88", "#243848", "#0c1824"],
      shaft: ["rgba(226, 232, 240, 0.14)", "rgba(226, 232, 240, 0)"],
      silhouette: "rgba(16, 28, 40, 0.55)",
      corals: [
        { x: 0.14, c: "#64748b", h: 0.18 },
        { x: 0.34, c: "#475569", h: 0.24 },
        { x: 0.58, c: "#334155", h: 0.16 },
        { x: 0.8, c: "#1e293b", h: 0.22 },
      ],
      bubble: "rgba(186, 230, 253, 0.2)",
    },
  },
  {
    id: "aliwal_shoal",
    name: "Aliwal Shoal",
    mapPlace: "KwaZulu-Natal, South Africa",
    desc: "Sardine-run chaos · sharks, tuna, and hunters in the bait ball.",
    difficulty: "Very Hard",
    adventureCycle: false,
    roundMs: 52_000,
    spawnMin: 210,
    spawnMax: 740,
    maxFish: 18,
    fishSpeed: 1.3,
    rareRollMult: 0.8,
    weights: { common: 62, uncommon: 22, rare: 9, epic: 5, legendary: 2 },
    mapPin: { x: 117, y: 67 },
    fishPool: [
      "pacific_sardine",
      "atlantic_herring",
      "chub_mackerel",
      "yellowfin_tuna",
      "yellowtail_amberjack",
      "australian_blacktip",
      "great_hammerhead",
      "great_barracuda",
      "dolphinfish_mahi",
      "bottlenose_dolphin",
      "blue_marlin",
      "atlantic_bluefin",
    ],
    visuals: {
      gradient: ["#3aa0b8", "#1a6a88", "#0c3a58", "#061828"],
      shaft: ["rgba(200, 230, 245, 0.12)", "rgba(200, 230, 245, 0)"],
      silhouette: "rgba(6, 24, 40, 0.56)",
      corals: [
        { x: 0.16, c: "#57534e", h: 0.16 },
        { x: 0.4, c: "#44403c", h: 0.22 },
        { x: 0.66, c: "#292524", h: 0.18 },
        { x: 0.86, c: "#1c1917", h: 0.2 },
      ],
      bubble: "rgba(125, 211, 252, 0.22)",
    },
  },
];

/** Uncharted waters — Reef Roulette only. Never pinned on the world map. */
const ROULETTE_REEFS = [
  {
    id: "sargasso_gyre",
    name: "Sargasso Gyre",
    mapPlace: "Uncharted mid-Atlantic weed sea",
    desc: "Golden sargassum mats · turtles, jellies, and mahi in the drift.",
    difficulty: "Medium",
    roundMs: 45_000,
    spawnMin: 320,
    spawnMax: 1100,
    maxFish: 15,
    fishSpeed: 0.92,
    rareRollMult: 1.05,
    weights: { common: 50, uncommon: 28, rare: 13, epic: 6, legendary: 3 },
    fishPool: [
      "moon_jellyfish",
      "european_sprat",
      "pacific_sardine",
      "lined_seahorse",
      "green_sea_turtle",
      "dolphinfish_mahi",
      "yellowfin_tuna",
      "reef_manta",
      "bottlenose_dolphin",
      "sea_otter",
    ],
    visuals: {
      gradient: ["#c4d46a", "#6a9a48", "#2e6a44", "#143828"],
      shaft: ["rgba(250, 240, 160, 0.18)", "rgba(250, 240, 160, 0)"],
      silhouette: "rgba(28, 52, 18, 0.5)",
      corals: [
        { x: 0.08, c: "#a3b54a", h: 0.22 },
        { x: 0.22, c: "#7a9a3a", h: 0.18 },
        { x: 0.4, c: "#c4b05a", h: 0.26 },
        { x: 0.58, c: "#5a8a40", h: 0.2 },
        { x: 0.76, c: "#b8c46a", h: 0.24 },
        { x: 0.9, c: "#6a7a32", h: 0.16 },
      ],
      bubble: "rgba(220, 240, 160, 0.28)",
    },
  },
  {
    id: "moonfall_atoll",
    name: "Moonfall Atoll",
    mapPlace: "Uncharted night lagoon",
    desc: "Bioluminescent shallows · angelfish, octopus, and lantern shadows.",
    difficulty: "Medium",
    roundMs: 45_000,
    spawnMin: 280,
    spawnMax: 980,
    maxFish: 16,
    fishSpeed: 1.04,
    rareRollMult: 1.08,
    weights: { common: 48, uncommon: 28, rare: 14, epic: 7, legendary: 3 },
    fishPool: [
      "clown_anemonefish",
      "queen_angelfish",
      "lined_seahorse",
      "moon_jellyfish",
      "reef_octopus",
      "common_cuttlefish",
      "coral_trout_gbr",
      "reef_manta",
      "dumbo_octopus",
      "abyss_lantern",
    ],
    visuals: {
      gradient: ["#6a5ab8", "#3a3a88", "#1a2458", "#0a1028"],
      shaft: ["rgba(180, 220, 255, 0.16)", "rgba(180, 220, 255, 0)"],
      silhouette: "rgba(18, 12, 48, 0.55)",
      corals: [
        { x: 0.1, c: "#a78bfa", h: 0.32 },
        { x: 0.26, c: "#67e8f9", h: 0.22 },
        { x: 0.44, c: "#f0abfc", h: 0.28 },
        { x: 0.62, c: "#818cf8", h: 0.2 },
        { x: 0.8, c: "#22d3ee", h: 0.26 },
        { x: 0.94, c: "#c084fc", h: 0.18 },
      ],
      bubble: "rgba(196, 181, 253, 0.32)",
    },
  },
  {
    id: "cinder_caldera",
    name: "Cinder Caldera",
    mapPlace: "Uncharted volcanic crater",
    desc: "Lava-lit rock · snappers, trevally, and heat-hardened pelagics.",
    difficulty: "Hard",
    roundMs: 45_000,
    spawnMin: 240,
    spawnMax: 860,
    maxFish: 17,
    fishSpeed: 1.18,
    rareRollMult: 0.9,
    weights: { common: 52, uncommon: 26, rare: 12, epic: 7, legendary: 3 },
    fishPool: [
      "red_snapper",
      "coral_trout_gbr",
      "chub_mackerel",
      "giant_trevally",
      "yellowtail_amberjack",
      "australian_blacktip",
      "great_barracuda",
      "swordfish",
      "fangtooth",
      "dread_fangtooth",
    ],
    visuals: {
      gradient: ["#e07040", "#a03828", "#5a1818", "#1a0808"],
      shaft: ["rgba(255, 180, 80, 0.2)", "rgba(255, 120, 40, 0)"],
      silhouette: "rgba(48, 12, 8, 0.58)",
      corals: [
        { x: 0.12, c: "#7f1d1d", h: 0.28 },
        { x: 0.3, c: "#b45309", h: 0.22 },
        { x: 0.48, c: "#44403c", h: 0.34 },
        { x: 0.66, c: "#9a3412", h: 0.2 },
        { x: 0.84, c: "#1c1917", h: 0.3 },
      ],
      bubble: "rgba(255, 180, 120, 0.22)",
    },
  },
  {
    id: "whisper_mangrove",
    name: "Whisper Mangrove",
    mapPlace: "Uncharted tannin creek",
    desc: "Tea-dark roots · bass, crabs, and things that wait in the shade.",
    difficulty: "Medium",
    roundMs: 45_000,
    spawnMin: 340,
    spawnMax: 1200,
    maxFish: 14,
    fishSpeed: 0.88,
    rareRollMult: 1.02,
    weights: { common: 54, uncommon: 26, rare: 12, epic: 6, legendary: 2 },
    fishPool: [
      "barramundi",
      "striped_bass",
      "european_seabass",
      "caribbean_lobster",
      "reef_octopus",
      "harbor_seal",
      "atlantic_cod",
      "green_sea_turtle",
      "sea_otter",
      "grave_eel",
    ],
    visuals: {
      gradient: ["#6a7a48", "#3a4a30", "#1e2a1c", "#0c140c"],
      shaft: ["rgba(180, 200, 120, 0.1)", "rgba(180, 200, 120, 0)"],
      silhouette: "rgba(12, 24, 10, 0.62)",
      corals: [
        { x: 0.06, c: "#365314", h: 0.42 },
        { x: 0.18, c: "#3f6212", h: 0.36 },
        { x: 0.34, c: "#4d7c0f", h: 0.48 },
        { x: 0.52, c: "#3f3a28", h: 0.3 },
        { x: 0.7, c: "#365314", h: 0.4 },
        { x: 0.88, c: "#1a2e05", h: 0.34 },
      ],
      bubble: "rgba(180, 200, 140, 0.18)",
    },
  },
  {
    id: "opal_shelf",
    name: "Opal Shelf",
    mapPlace: "Uncharted pastel bank",
    desc: "Candy coral terraces · seahorses, angels, and pearl-bright schools.",
    difficulty: "Easy",
    roundMs: 45_000,
    spawnMin: 360,
    spawnMax: 1280,
    maxFish: 13,
    fishSpeed: 0.84,
    rareRollMult: 1.14,
    weights: { common: 46, uncommon: 30, rare: 14, epic: 7, legendary: 3 },
    fishPool: [
      "clown_anemonefish",
      "queen_angelfish",
      "lined_seahorse",
      "moon_jellyfish",
      "common_cuttlefish",
      "reef_octopus",
      "dolphinfish_mahi",
      "reef_manta",
      "sea_otter",
      "yellowtail_amberjack",
    ],
    visuals: {
      gradient: ["#f9a8d4", "#7dd3fc", "#5eead4", "#155e75"],
      shaft: ["rgba(255, 240, 250, 0.22)", "rgba(255, 240, 250, 0)"],
      silhouette: "rgba(80, 40, 70, 0.35)",
      corals: [
        { x: 0.08, c: "#fb7185", h: 0.3 },
        { x: 0.22, c: "#67e8f9", h: 0.24 },
        { x: 0.38, c: "#f0abfc", h: 0.28 },
        { x: 0.54, c: "#5eead4", h: 0.22 },
        { x: 0.7, c: "#fda4af", h: 0.32 },
        { x: 0.86, c: "#a5f3fc", h: 0.2 },
      ],
      bubble: "rgba(255, 220, 240, 0.34)",
    },
  },
  {
    id: "thunderwake_banks",
    name: "Thunderwake Banks",
    mapPlace: "Uncharted storm shoal",
    desc: "Chop and spray · tunas, marlin, and anything fast enough to stay.",
    difficulty: "Hard",
    roundMs: 45_000,
    spawnMin: 220,
    spawnMax: 780,
    maxFish: 18,
    fishSpeed: 1.28,
    rareRollMult: 0.86,
    weights: { common: 58, uncommon: 24, rare: 10, epic: 5, legendary: 3 },
    fishPool: [
      "chub_mackerel",
      "atlantic_herring",
      "yellowfin_tuna",
      "albacore_tuna",
      "atlantic_bluefin",
      "blue_marlin",
      "swordfish",
      "great_barracuda",
      "giant_trevally",
      "skeletal_marlin",
    ],
    visuals: {
      gradient: ["#64748b", "#334155", "#1e293b", "#020617"],
      shaft: ["rgba(226, 232, 240, 0.12)", "rgba(226, 232, 240, 0)"],
      silhouette: "rgba(8, 12, 24, 0.6)",
      corals: [
        { x: 0.14, c: "#475569", h: 0.16 },
        { x: 0.36, c: "#334155", h: 0.22 },
        { x: 0.62, c: "#1e293b", h: 0.18 },
        { x: 0.84, c: "#0f172a", h: 0.2 },
      ],
      bubble: "rgba(186, 230, 253, 0.22)",
    },
  },
  {
    id: "mirage_keys",
    name: "Mirage Keys",
    mapPlace: "Uncharted pink salt flats",
    desc: "Rose-water shallows · flaming schools and heat-haze hunters.",
    difficulty: "Medium",
    roundMs: 45_000,
    spawnMin: 300,
    spawnMax: 1040,
    maxFish: 15,
    fishSpeed: 0.98,
    rareRollMult: 1.06,
    weights: { common: 50, uncommon: 28, rare: 13, epic: 6, legendary: 3 },
    fishPool: [
      "european_sprat",
      "northern_anchovy",
      "red_snapper",
      "queen_angelfish",
      "caribbean_lobster",
      "green_sea_turtle",
      "dolphinfish_mahi",
      "bottlenose_dolphin",
      "reef_manta",
      "specter_ray",
    ],
    visuals: {
      gradient: ["#fda4af", "#fb7185", "#9f1239", "#4c0519"],
      shaft: ["rgba(255, 228, 230, 0.2)", "rgba(255, 228, 230, 0)"],
      silhouette: "rgba(64, 16, 28, 0.48)",
      corals: [
        { x: 0.1, c: "#fecdd3", h: 0.18 },
        { x: 0.28, c: "#e11d48", h: 0.26 },
        { x: 0.46, c: "#fb7185", h: 0.2 },
        { x: 0.64, c: "#9f1239", h: 0.24 },
        { x: 0.82, c: "#ffe4e6", h: 0.16 },
      ],
      bubble: "rgba(254, 205, 211, 0.3)",
    },
  },
  {
    id: "starlit_rift",
    name: "Starlit Rift",
    mapPlace: "Uncharted midnight canyon",
    desc: "A crack in the charts · deep oddities mixed with open-ocean ghosts.",
    difficulty: "Very Hard",
    roundMs: 45_000,
    spawnMin: 200,
    spawnMax: 720,
    maxFish: 16,
    fishSpeed: 1.22,
    rareRollMult: 0.8,
    weights: { common: 44, uncommon: 26, rare: 16, epic: 9, legendary: 5 },
    fishPool: [
      "hatchetfish",
      "viperfish",
      "black_seadevil",
      "gulper_eel",
      "ghost_shark",
      "abyss_lantern",
      "swordfish",
      "reef_manta",
      "giant_isopod",
      "leviathan_skull",
    ],
    visuals: {
      gradient: ["#1e1b4b", "#0f172a", "#020617", "#000000"],
      shaft: ["rgba(125, 211, 252, 0.1)", "rgba(125, 211, 252, 0)"],
      silhouette: "rgba(2, 6, 23, 0.7)",
      corals: [
        { x: 0.16, c: "#312e81", h: 0.2 },
        { x: 0.4, c: "#1e3a8a", h: 0.16 },
        { x: 0.68, c: "#0f172a", h: 0.24 },
        { x: 0.88, c: "#4c1d95", h: 0.14 },
      ],
      bubble: "rgba(165, 243, 252, 0.16)",
    },
  },
];

function findReefById(id) {
  return REEFS.find((r) => r.id === id) || ROULETTE_REEFS.find((r) => r.id === id) || null;
}

function buildAdventureLevels() {
  const levels = [];
  const cycle = REEFS.filter((r) => r.adventureCycle !== false);
  for (let i = 0; i < ADVENTURE_LEVEL_COUNT; i++) {
    const reef = cycle[i % cycle.length];
    const tier = Math.floor(i / cycle.length);
    const isBonus = i >= ADVENTURE_MAIN_LEVEL_COUNT && i < ADVENTURE_ICE_START_INDEX;
    const isIce = i >= ADVENTURE_ICE_START_INDEX && i < ADVENTURE_LOST_CITY_START_INDEX;
    const isLostCity = i >= ADVENTURE_LOST_CITY_START_INDEX;
    levels.push({
      level: i + 1,
      id: `adv_${i + 1}`,
      name: ADVENTURE_MAP_PLACES[i] || `Voyage ${i + 1}`,
      subtitle: isLostCity
        ? `${ADVENTURE_SECTION_LOST_CITY} · ${reef.name}`
        : isIce
          ? `${ADVENTURE_SECTION_FROZEN_SEA} · ${reef.name}`
          : isBonus
            ? `${ADVENTURE_SECTION_GOLD_QUEST} · ${reef.name}`
            : `${ADVENTURE_SECTION_PIRATES_PATH} · ${reef.name}`,
      mapPlace: ADVENTURE_MAP_PLACES[i] || `Isle ${i + 1}`,
      reefId: reef.id,
      isBonus,
      isIce,
      isLostCity,
      passScore: adventurePassScoreForIndex(i),
      roundMs:
        Math.max(
          isLostCity ? 46_000 : isIce ? 47_000 : isBonus ? 44_000 : 46_000,
          reef.roundMs - tier * 2200 - i * 420,
        ) + adventureLevelTimeBonusMs(i),
      spawnMin: Math.max(
        isLostCity ? 140 : isIce ? 150 : isBonus ? 165 : 185,
        Math.min(400, reef.spawnMin - i * 12),
      ),
      spawnMax: Math.max(
        isLostCity ? 340 : isIce ? 360 : isBonus ? 390 : 430,
        Math.min(1500, reef.spawnMax - i * 30),
      ),
      maxFish: Math.min(
        isLostCity ? 21 : isIce ? 20 : isBonus ? 19 : 18,
        reef.maxFish + Math.floor(i / 2.4),
      ),
      fishSpeed: Math.max(
        0.96,
        reef.fishSpeed * (1.12 + i * 0.02) * (isLostCity ? 0.82 : isIce ? 0.84 : isBonus ? 0.94 : 1),
      ),
      rareRollMult: Math.max(
        isLostCity || isIce ? 0.66 : 0.55,
        reef.rareRollMult * (0.97 - i * 0.009),
      ),
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
  pendingAdventureTrailReveal = true;
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
  if (levelNum > ADVENTURE_LOST_CITY_START_INDEX && highest < ADVENTURE_LOST_CITY_START_INDEX) return false;
  return levelNum <= highest + 1;
}

function isAdventureBonusUnlocked() {
  return (gameMeta.adventureHighestLevel || 0) >= ADVENTURE_MAIN_LEVEL_COUNT;
}

function isAdventureIceUnlocked() {
  return (gameMeta.adventureHighestLevel || 0) >= ADVENTURE_ICE_START_INDEX;
}

function isAdventureLostCityUnlocked() {
  return (gameMeta.adventureHighestLevel || 0) >= ADVENTURE_LOST_CITY_START_INDEX;
}

function getAdventureLevel(index) {
  return ADVENTURE_LEVELS[Math.max(0, Math.min(ADVENTURE_LEVEL_COUNT - 1, index))];
}

function getReef() {
  if (duelSession) {
    return REEFS.find((r) => r.id === duelSession.reefId) || REEFS[0];
  }
  if (eventMinigameSession && eventMinigameSession.reefId) {
    const base = findReefById(eventMinigameSession.reefId) || REEFS[0];
    const spawnMul = eventMinigameSession.spawnMult || 1;
    return {
      ...base,
      name: eventMinigameSession.reefName || base.name,
      roundMs: eventMinigameSession.roundMs || base.roundMs,
      spawnMin: Math.max(70, Math.floor(base.spawnMin * spawnMul)),
      spawnMax: Math.max(160, Math.floor(base.spawnMax * spawnMul)),
      fishSpeed: (base.fishSpeed || 1) * (eventMinigameSession.speedMult || 1),
      maxFish: Math.min(22, Math.floor((base.maxFish || 12) * (eventMinigameSession.maxFishMult || 1))),
    };
  }
  if (roundOverrideReefId && !adventureSession) {
    const mystery = REEFS.find((r) => r.id === roundOverrideReefId);
    if (mystery) return mystery;
  }
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
    merged.fishSpeed = Math.max(lvl.fishSpeed * 1.42, 1.12);
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

/** Synced-remote cache only — bump key to drop polluted device-only boards. */
const LEADERBOARD_KEY = "reefRushLeaderboard_v3";
const LEADERBOARD_LEGACY_KEYS = ["reefRushLeaderboard_v2", "reefRushLeaderboard_v1"];
const LEADERBOARD_MAX = 10;
/** Pull extra rows so exact duplicates can be collapsed and we still fill the top 10. */
const LEADERBOARD_FETCH_LIMIT = 80;
const SUPABASE_REST_URL = "https://htnpfzjhicyzkqfgyhuu.supabase.co/rest/v1";
const SUPABASE_URL = "https://htnpfzjhicyzkqfgyhuu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_SARvsULPYyIUImdhXMjQUQ_T6RtwvZM";
const LEADERBOARD_TABLE_URL = `${SUPABASE_REST_URL}/leaderboard`;
let leaderboardRows = [];
let leaderboardLoading = false;
let leaderboardLoadId = 0;
let leaderboardSaveInFlight = false;
/** True after at least one successful shared Top 10 fetch this page life. */
let leaderboardRemoteSynced = false;

function leaderboardEntryKey(e) {
  return `${e.initials}|${e.score}|${e.reefId || ""}`;
}

function parseLeaderboardName(value) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, 16);
}

function leaderboardDisplayName(entry) {
  const name = parseLeaderboardName(entry?.name);
  if (name) return name;
  return entry?.initials || "???";
}

function resolveScorePlayerIdentity(rawValue = "") {
  const typedName = parseLeaderboardName(rawValue);
  const profileName = parseLeaderboardName(gameMeta.playerName);
  const name = typedName || profileName;
  const fromName = initialsFromPlayerName(name);
  const typedIni = String(rawValue || "")
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .slice(0, 3);
  const initials = fromName || typedIni || gameMeta.playerInitials || "AAA";
  return {
    initials: String(initials).toUpperCase().replace(/[^A-Z]/g, "").slice(0, 3) || "AAA",
    name: name || "",
  };
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
      name: parseLeaderboardName(e.name || e.display_name || e.displayName),
      score: Math.max(0, Math.floor(Number(e.score) || 0)),
      reefId: e.reefId || e.reef_id || "",
      at: e.at || e.created_at || "",
    }))
    .filter((e) => e.initials && e.score > 0)
    .map((e) => ({
      ...e,
      name: e.name || e.initials,
    }));
  return dedupeExactLeaderboardRows(parsed)
    .sort((a, b) => b.score - a.score || String(a.at).localeCompare(String(b.at)))
    .slice(0, LEADERBOARD_MAX);
}

function leaderboardHeaders(extra = {}) {
  const bearer = authSession?.access_token || SUPABASE_PUBLISHABLE_KEY;
  return {
    apikey: SUPABASE_PUBLISHABLE_KEY,
    Authorization: `Bearer ${bearer}`,
    Accept: "application/json",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    ...extra,
  };
}

const LEADERBOARD_FETCH_OPTS = { cache: "no-store" };

function purgeLegacyLeaderboardCaches() {
  for (const key of LEADERBOARD_LEGACY_KEYS) {
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  }
}

const DUEL_BACKEND_MISSING = "DUEL_BACKEND_MISSING";

function isDuelBackendMissingResponse(res, body) {
  if (res.status !== 404) return false;
  const code = body?.code || "";
  const message = String(body?.message || "");
  return code === "PGRST205" || message.includes("duel_matches");
}

async function readDuelResponse(res) {
  const text = await res.text();
  let body = null;
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = { message: text };
    }
  }
  if (isDuelBackendMissingResponse(res, body)) {
    const err = new Error(DUEL_BACKEND_MISSING);
    err.duelBackendMissing = true;
    throw err;
  }
  return { res, body };
}

function isDuelBackendMissingError(err) {
  return Boolean(err?.duelBackendMissing || err?.message === DUEL_BACKEND_MISSING);
}

function isDuelSchemaColumnError(body) {
  const msg = `${body?.message || ""} ${body?.hint || ""} ${body?.details || ""}`;
  return /PGRST204|invite_user_id|host_user_id|guest_user_id|match_kind/i.test(msg);
}

/** Optional duel_matches columns from player_social.sql — disabled when Supabase lacks them. */
let duelLobbyInviteFilterReady = true;
let duelLobbyUserColumnsReady = true;
let duelLobbyMatchKindFilterReady = true;

function stripDuelLobbyUserFields(payload) {
  const next = { ...payload };
  delete next.host_user_id;
  delete next.guest_user_id;
  delete next.invite_user_id;
  return next;
}

function stripDuelLobbyOptionalFields(payload) {
  const next = stripDuelLobbyUserFields(payload);
  delete next.match_kind;
  return next;
}

function isDuelMatchmakingCancelled(isCoop) {
  return isCoop ? !coopMatchmakingActive : !duelMatchmakingActive;
}

function isDuelOpenedFromLocalFile() {
  return typeof location !== "undefined" && location.protocol === "file:";
}

function loadLocalLeaderboard() {
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    /* Old bare arrays mixed device-only scores into the global Top 10 — ignore them. */
    if (Array.isArray(parsed)) return [];
    if (!parsed || typeof parsed !== "object" || !parsed.syncedAt || !Array.isArray(parsed.rows)) return [];
    return normalizeLeaderboardRows(parsed.rows);
  } catch {
    return [];
  }
}

function saveLocalLeaderboard(rows) {
  try {
    localStorage.setItem(
      LEADERBOARD_KEY,
      JSON.stringify({
        syncedAt: Date.now(),
        rows: normalizeLeaderboardRows(rows),
      })
    );
  } catch {
    /* ignore quota */
  }
}

function loadLeaderboard() {
  /* Prefer live shared rows. Local is only a last-good remote cache, never a device board. */
  if (leaderboardRows.length) return leaderboardRows;
  return loadLocalLeaderboard();
}

async function fetchSharedLeaderboard() {
  const loadId = ++leaderboardLoadId;
  const keepExisting = leaderboardRows.length > 0;
  leaderboardLoading = !keepExisting;
  if (!keepExisting) {
    renderLeaderboardOl(leaderboardStart);
    renderLeaderboardOl(leaderboardOver);
    renderLeaderboardOl(leaderboardEvents);
  }
  try {
    const url = `${LEADERBOARD_TABLE_URL}?select=initials,display_name,score,reef_id,created_at&order=score.desc,created_at.asc&limit=${LEADERBOARD_FETCH_LIMIT}`;
    const res = await fetch(url, { headers: leaderboardHeaders(), ...LEADERBOARD_FETCH_OPTS });
    if (!res.ok) {
      /* Older schemas may not have display_name yet. */
      const fallbackUrl = `${LEADERBOARD_TABLE_URL}?select=initials,score,reef_id,created_at&order=score.desc,created_at.asc&limit=${LEADERBOARD_FETCH_LIMIT}`;
      const fallbackRes = await fetch(fallbackUrl, { headers: leaderboardHeaders(), ...LEADERBOARD_FETCH_OPTS });
      if (!fallbackRes.ok) throw new Error(`Leaderboard fetch failed: ${fallbackRes.status}`);
      const rows = normalizeLeaderboardRows(await fallbackRes.json());
      if (loadId !== leaderboardLoadId) return;
      leaderboardRows = rows;
      leaderboardRemoteSynced = true;
      saveLocalLeaderboard(rows);
      return;
    }
    const rows = normalizeLeaderboardRows(await res.json());
    if (loadId !== leaderboardLoadId) return;
    leaderboardRows = rows;
    leaderboardRemoteSynced = true;
    saveLocalLeaderboard(rows);
  } catch (err) {
    console.warn(err);
    if (loadId === leaderboardLoadId && !leaderboardRows.length) {
      leaderboardRows = loadLocalLeaderboard();
    }
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

async function addLeaderboardEntry(initials, score, reefId, displayName = "") {
  const ini = String(initials || "")
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .slice(0, 3);
  const name = parseLeaderboardName(displayName) || ini;
  const entry = {
    initials: ini,
    name,
    score,
    reefId: reefId || "",
    at: Date.now(),
  };
  const rows = loadLeaderboard();
  if (rows.some((r) => leaderboardEntryKey(r) === leaderboardEntryKey(entry))) {
    return true;
  }
  const payloadWithName = {
    initials: entry.initials,
    display_name: entry.name,
    score: entry.score,
    reef_id: entry.reefId,
  };
  const payloadBasic = {
    initials: entry.initials,
    score: entry.score,
    reef_id: entry.reefId,
  };
  try {
    let res = await fetch(LEADERBOARD_TABLE_URL, {
      method: "POST",
      headers: leaderboardHeaders({
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      }),
      body: JSON.stringify(payloadWithName),
    });
    if (!res.ok) {
      res = await fetch(LEADERBOARD_TABLE_URL, {
        method: "POST",
        headers: leaderboardHeaders({
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        }),
        body: JSON.stringify(payloadBasic),
      });
    }
    if (!res.ok) throw new Error(`Leaderboard save failed: ${res.status}`);
    /* Always re-read the shared board so every device shows the same Top 10. */
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
    ini.textContent = leaderboardDisplayName(r);
    ini.title = leaderboardDisplayName(r);
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
  renderLeaderboardOl(leaderboardEvents, rows);
  if (syncShared) fetchSharedLeaderboard();
}

const DAILY_LEADERBOARD_KEY = "reefRushDailyLeaderboard_v1";
const DAILY_LEADERBOARD_MAX = 10;
const DAILY_LEADERBOARD_FETCH_LIMIT = 80;
const DAILY_LEADERBOARD_TABLE_URL = `${SUPABASE_REST_URL}/daily_leaderboard`;
const DAILY_PRIZE_COUNT = DAILY_PRIZE_CHEST_TIERS.length;
let dailyLeaderboardRows = [];
let dailyLeaderboardLoading = false;
let dailyLeaderboardLoadId = 0;
let dailyEventCountdownTimer = 0;

function getDailyDayKey(d = new Date()) {
  /* UTC so phones and computers share the same Fisher of the Day calendar day. */
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getPreviousDailyDayKey() {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - 1);
  return getDailyDayKey(d);
}

function formatDailyDayLabel(dayKey) {
  const [y, m, d] = dayKey.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString(undefined, {
    weekday: "long",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function msUntilDailyReset() {
  const now = new Date();
  const tomorrowUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1);
  return Math.max(0, tomorrowUtc - now.getTime());
}

function formatDailyResetCountdown(ms) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  if (h <= 0) return `Resets in ${m}m`;
  return `Resets in ${h}h ${m}m`;
}

function loadLocalDailyStore() {
  try {
    const raw = localStorage.getItem(DAILY_LEADERBOARD_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveLocalDailyStore(store) {
  try {
    localStorage.setItem(DAILY_LEADERBOARD_KEY, JSON.stringify(store));
  } catch {
    /* ignore quota */
  }
}

function loadLocalDailyLeaderboard(dayKey = getDailyDayKey()) {
  const store = loadLocalDailyStore();
  return Array.isArray(store[dayKey]) ? store[dayKey] : [];
}

function saveLocalDailyLeaderboard(dayKey, rows) {
  const store = loadLocalDailyStore();
  store[dayKey] = rows;
  const cutoff = Date.now() - 8 * 24 * 60 * 60 * 1000;
  for (const key of Object.keys(store)) {
    const sample = store[key]?.[0];
    const at = sample?.at || sample?.created_at || 0;
    if (at && Number(at) < cutoff) delete store[key];
  }
  saveLocalDailyStore(store);
}

function normalizeDailyLeaderboardRows(rows) {
  if (!Array.isArray(rows)) return [];
  const bestByIni = new Map();
  for (const raw of rows) {
    const initials = String(raw.initials || "").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 3);
    const entry = {
      initials,
      name: parseLeaderboardName(raw.name || raw.display_name || raw.displayName) || initials,
      score: Math.max(0, Math.floor(Number(raw.score) || 0)),
      reefId: raw.reefId || raw.reef_id || "",
      at: raw.at || raw.created_at || "",
      dayKey: raw.dayKey || raw.day_key || getDailyDayKey(),
    };
    if (!entry.initials || entry.score <= 0) continue;
    const prev = bestByIni.get(entry.initials);
    if (!prev || entry.score > prev.score || (entry.score === prev.score && String(entry.at) < String(prev.at))) {
      bestByIni.set(entry.initials, entry);
    } else if (prev && !prev.name && entry.name) {
      prev.name = entry.name;
    }
  }
  return [...bestByIni.values()]
    .sort((a, b) => b.score - a.score || String(a.at).localeCompare(String(b.at)))
    .slice(0, DAILY_LEADERBOARD_MAX);
}

async function fetchDailyLeaderboardForDay(dayKey = getDailyDayKey()) {
  try {
    const url = `${DAILY_LEADERBOARD_TABLE_URL}?day_key=eq.${encodeURIComponent(dayKey)}&select=initials,display_name,score,reef_id,created_at,day_key&order=score.desc,created_at.asc&limit=${DAILY_LEADERBOARD_FETCH_LIMIT}`;
    let res = await fetch(url, { headers: leaderboardHeaders(), ...LEADERBOARD_FETCH_OPTS });
    if (!res.ok) {
      const fallbackUrl = `${DAILY_LEADERBOARD_TABLE_URL}?day_key=eq.${encodeURIComponent(dayKey)}&select=initials,score,reef_id,created_at,day_key&order=score.desc,created_at.asc&limit=${DAILY_LEADERBOARD_FETCH_LIMIT}`;
      res = await fetch(fallbackUrl, { headers: leaderboardHeaders(), ...LEADERBOARD_FETCH_OPTS });
    }
    if (!res.ok) throw new Error(`Daily leaderboard fetch failed: ${res.status}`);
    const rows = normalizeDailyLeaderboardRows(await res.json());
    saveLocalDailyLeaderboard(dayKey, rows);
    return rows;
  } catch (err) {
    console.warn(err);
    return normalizeDailyLeaderboardRows(loadLocalDailyLeaderboard(dayKey));
  }
}

async function fetchTodayDailyLeaderboard() {
  const loadId = ++dailyLeaderboardLoadId;
  dailyLeaderboardLoading = true;
  renderAllDailyLeaderboards();
  try {
    const rows = await fetchDailyLeaderboardForDay(getDailyDayKey());
    if (loadId !== dailyLeaderboardLoadId) return rows;
    dailyLeaderboardRows = rows;
    return rows;
  } finally {
    if (loadId === dailyLeaderboardLoadId) {
      dailyLeaderboardLoading = false;
      renderAllDailyLeaderboards(dailyLeaderboardRows);
    }
  }
}

async function submitDailyScore(initials, score, reefId, displayName = "") {
  const ini = String(initials || "")
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .slice(0, 3);
  const pts = Math.max(0, Math.floor(Number(score) || 0));
  if (!ini || pts <= 0) return false;
  const name = parseLeaderboardName(displayName) || parseLeaderboardName(gameMeta.playerName) || ini;

  const dayKey = getDailyDayKey();
  const localRows = normalizeDailyLeaderboardRows(loadLocalDailyLeaderboard(dayKey));
  const existing =
    getPlayerDailyEntryToday(ini, dailyLeaderboardRows) || localRows.find((r) => r.initials === ini);
  if (existing && existing.score >= pts) return false;

  const entry = { initials: ini, name, score: pts, reefId: reefId || "", at: Date.now(), dayKey };
  const merged = normalizeDailyLeaderboardRows([...localRows, entry]);
  dailyLeaderboardRows = merged;
  saveLocalDailyLeaderboard(dayKey, merged);
  renderAllDailyLeaderboards(merged);
  updateDailyEventPlayerHint(merged);

  const payloadWithName = {
    initials: entry.initials,
    display_name: entry.name,
    score: entry.score,
    reef_id: entry.reefId,
    day_key: dayKey,
  };
  const payloadBasic = {
    initials: entry.initials,
    score: entry.score,
    reef_id: entry.reefId,
    day_key: dayKey,
  };

  try {
    const patchUrl = `${DAILY_LEADERBOARD_TABLE_URL}?day_key=eq.${encodeURIComponent(dayKey)}&initials=eq.${encodeURIComponent(ini)}&score=lt.${pts}`;
    let patchRes = await fetch(patchUrl, {
      method: "PATCH",
      headers: leaderboardHeaders({
        "Content-Type": "application/json",
        Prefer: "return=representation",
      }),
      body: JSON.stringify({
        score: entry.score,
        reef_id: entry.reefId,
        display_name: entry.name,
      }),
    });
    if (!patchRes.ok && patchRes.status !== 404) {
      patchRes = await fetch(patchUrl, {
        method: "PATCH",
        headers: leaderboardHeaders({
          "Content-Type": "application/json",
          Prefer: "return=representation",
        }),
        body: JSON.stringify({
          score: entry.score,
          reef_id: entry.reefId,
        }),
      });
    }
    if (patchRes.ok) {
      const updated = await patchRes.json();
      if (Array.isArray(updated) && updated.length > 0) {
        await fetchTodayDailyLeaderboard();
        return true;
      }
    } else if (!patchRes.ok && patchRes.status !== 404) {
      throw new Error(`Daily leaderboard update failed: ${patchRes.status}`);
    }

    let postRes = await fetch(DAILY_LEADERBOARD_TABLE_URL, {
      method: "POST",
      headers: leaderboardHeaders({
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      }),
      body: JSON.stringify(payloadWithName),
    });
    if (!postRes.ok && postRes.status !== 409) {
      postRes = await fetch(DAILY_LEADERBOARD_TABLE_URL, {
        method: "POST",
        headers: leaderboardHeaders({
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        }),
        body: JSON.stringify(payloadBasic),
      });
    }
    if (postRes.status === 409) {
      await fetchTodayDailyLeaderboard();
      return false;
    }
    if (!postRes.ok) throw new Error(`Daily leaderboard save failed: ${postRes.status}`);
    await fetchTodayDailyLeaderboard();
    return true;
  } catch (err) {
    console.warn(err);
    return false;
  }
}

function renderAllDailyLeaderboards(rows = dailyLeaderboardRows) {
  renderDailyLeaderboardOl(dailyLeaderboardEvents, rows);
  renderDailyLeaderboardOl(dailyLeaderboardOver, rows);
}

function renderDailyLeaderboardOl(el, rows = dailyLeaderboardRows) {
  if (!el) return;
  el.innerHTML = "";
  if (!rows.length) {
    const li = document.createElement("li");
    li.className = "leaderboard__empty";
    li.textContent = dailyLeaderboardLoading
      ? "Loading today's scores..."
      : "No scores yet today — play a reef run to climb the board!";
    el.appendChild(li);
    return;
  }
  rows.forEach((r, i) => {
    const li = document.createElement("li");
    li.className = "leaderboard__row";
    if (i < 3) li.classList.add(`leaderboard__row--prize-${i + 1}`);
    const rank = document.createElement("span");
    rank.className = "leaderboard__rank";
    rank.textContent = i < 3 ? ["🥇", "🥈", "🥉"][i] : String(i + 1);
    const ini = document.createElement("span");
    ini.className = "leaderboard__ini";
    ini.textContent = leaderboardDisplayName(r);
    ini.title = leaderboardDisplayName(r);
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

function updateDailyEventPlayerHint(rows = dailyLeaderboardRows) {
  if (!dailyEventPlayerHint) return;
  const ini = gameMeta.playerInitials;
  const label = parseLeaderboardName(gameMeta.playerName) || ini;
  if (!ini) {
    dailyEventPlayerHint.textContent =
      "Play a reef run and post your score with your name — today's best only.";
    return;
  }
  const rank = rows.findIndex((r) => r.initials === ini);
  if (rank === 0) {
    dailyEventPlayerHint.textContent = `${label}, you're in 1st! Hold for a legendary chest + Magnet Rod.`;
  } else if (rank === 1) {
    dailyEventPlayerHint.textContent = `${label}, you're in 2nd — hold for a rare chest.`;
  } else if (rank === 2) {
    dailyEventPlayerHint.textContent = `${label}, you're in 3rd — hold for a common chest.`;
  } else if (rank >= 0) {
    dailyEventPlayerHint.textContent = `${label}, #${rank + 1} today. Top 3 wins a chest.`;
  } else {
    dailyEventPlayerHint.textContent = `${label}, play a reef run to post today's best.`;
  }
}

function parsePlayerInitials(value) {
  const raw = String(value || "")
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .slice(0, 3);
  return raw.length >= 1 ? raw : "AAA";
}

function getPlayerDailyEntryToday(initials, rows = dailyLeaderboardRows) {
  const ini = parsePlayerInitials(initials);
  if (ini === "AAA" && !String(initials || "").replace(/[^A-Za-z]/g, "")) return null;
  return rows.find((r) => r.initials === ini) || null;
}

function updateDailyGameOverStatus(score, submitted = null, rows = dailyLeaderboardRows) {
  if (!dailyScoreStatus) return;
  const ini = gameMeta.playerInitials;
  const label = parseLeaderboardName(gameMeta.playerName) || ini;
  if (!ini || score <= 0) {
    dailyScoreStatus.hidden = true;
    dailyScoreStatus.textContent = "";
    return;
  }
  const existing = getPlayerDailyEntryToday(ini, rows);
  if (submitted === true) {
    dailyScoreStatus.hidden = false;
    dailyScoreStatus.textContent = `${label}, ${score} posted to today's board!`;
    return;
  }
  if (submitted === false && existing) {
    dailyScoreStatus.hidden = false;
    dailyScoreStatus.textContent = `Your best today is ${existing.score}. Beat it to climb the daily board.`;
    return;
  }
  if (existing && existing.score >= score) {
    dailyScoreStatus.hidden = false;
    dailyScoreStatus.textContent = `Your best today is ${existing.score}. Beat it to climb the daily board.`;
    return;
  }
  dailyScoreStatus.hidden = true;
  dailyScoreStatus.textContent = "";
}

function updateDailyEventResetLine() {
  if (dailyEventReset) dailyEventReset.textContent = formatDailyResetCountdown(msUntilDailyReset());
  if (dailyCatchReset) dailyCatchReset.textContent = formatDailyResetCountdown(msUntilDailyReset());
}

function stopDailyEventCountdown() {
  if (dailyEventCountdownTimer) {
    window.clearInterval(dailyEventCountdownTimer);
    dailyEventCountdownTimer = 0;
  }
}

function startDailyEventCountdown() {
  stopDailyEventCountdown();
  updateDailyEventResetLine();
  dailyEventCountdownTimer = window.setInterval(() => {
    updateDailyEventResetLine();
    if (panelEvents && !panelEvents.hidden) {
      void fetchTodayDailyLeaderboard().then((rows) => updateDailyEventPlayerHint(rows));
      void fetchSharedLeaderboard();
    }
  }, 30000);
}

function refreshSharedBoardsFromServer() {
  void fetchSharedLeaderboard();
  void fetchTodayDailyLeaderboard();
  if (authUser?.id) {
    void touchPlayerPresence();
    void refreshFriendsList();
  }
}

async function processDailyPrizePayouts() {
  const ini = gameMeta.playerInitials;
  if (!ini) return;
  const yesterday = getPreviousDailyDayKey();
  if (gameMeta.dailyPrizeCheckedDay === yesterday) return;

  const rows = await fetchDailyLeaderboardForDay(yesterday);
  gameMeta.dailyPrizeCheckedDay = yesterday;
  const rank = rows.findIndex((r) => r.initials === ini);
  if (rank >= 0 && rank < DAILY_PRIZE_COUNT) {
    const chestTier = dailyPrizeChestTierForRank(rank);
    const pending = {
      rank,
      chestTier,
      chestName: dailyPrizeChestNameForTier(chestTier),
      bundle: null,
      board: snapshotDailyPrizeBoard(rows),
      dayLabel: formatDailyDayLabel(yesterday),
    };
    ensureDailyPrizeBundle(pending);
    gameMeta.pendingDailyPrizeCelebration = pending;
    saveMeta();
  } else {
    saveMeta();
  }
}

function dailyPrizeOrdinal(rank) {
  return ["1st", "2nd", "3rd"][rank] || `${rank + 1}th`;
}

function applyPendingDailyPrizeRewards() {
  const prize = gameMeta.pendingDailyPrizeCelebration;
  if (!prize) return;
  ensureDailyPrizeBundle(prize);
  if (prize.bundle) grantCrabReward(prize.bundle);
  if (prize.rank === 0) grantMagnetRodForToday();
  gameMeta.pendingDailyPrizeCelebration = null;
  saveMeta();
  refreshCoinDisplays();
  buildBaitUI();
  buildRodUI();
}

let dailyPrizePhase = "board";
let dailyPrizeBoardTimer = 0;

function clearDailyPrizeBoardTimer() {
  if (dailyPrizeBoardTimer) {
    window.clearTimeout(dailyPrizeBoardTimer);
    dailyPrizeBoardTimer = 0;
  }
}

function populateDailyPrizeBoardUI(prize) {
  const ord = dailyPrizeOrdinal(prize.rank);
  if (dailyPrizeRevealTitle) dailyPrizeRevealTitle.textContent = `You placed ${ord}!`;
  if (dailyPrizeRevealDay) {
    dailyPrizeRevealDay.textContent = prize.dayLabel
      ? `Yesterday's board · ${prize.dayLabel}`
      : "Yesterday's Fisher of the Day standings";
  }
  const youIni = gameMeta.playerInitials;
  const board = Array.isArray(prize.board) ? prize.board : [];
  if (dailyPrizePodium) {
    dailyPrizePodium.innerHTML = "";
    const medals = ["🥇", "🥈", "🥉"];
    const order = [1, 0, 2];
    for (const i of order) {
      const entry = board[i];
      if (!entry) continue;
      const slot = document.createElement("div");
      const isYou = entry.initials === youIni;
      slot.className = `daily-prize-podium__slot daily-prize-podium__slot--${i + 1}${isYou ? " daily-prize-podium__slot--you" : ""}`;
      slot.innerHTML =
        `<span class="daily-prize-podium__medal">${medals[i]}</span>` +
        `<span class="daily-prize-podium__name">${isYou ? "You" : entry.name}</span>` +
        `<span class="daily-prize-podium__score">${entry.score.toLocaleString()}</span>` +
        `<span class="daily-prize-podium__block">${i + 1}</span>`;
      dailyPrizePodium.appendChild(slot);
    }
  }
  if (dailyPrizeBoard) {
    dailyPrizeBoard.innerHTML = "";
    if (board.length > 3) {
      dailyPrizeBoard.hidden = false;
      board.slice(3).forEach((entry, idx) => {
        const li = document.createElement("li");
        const isYou = entry.initials === youIni;
        li.className = `daily-prize-board__row${isYou ? " daily-prize-board__row--you" : ""}`;
        li.innerHTML =
          `<span class="daily-prize-board__rank">${idx + 4}</span>` +
          `<span class="daily-prize-board__name">${isYou ? "You" : entry.name}</span>` +
          `<span class="daily-prize-board__score">${entry.score.toLocaleString()}</span>`;
        dailyPrizeBoard.appendChild(li);
      });
    } else {
      dailyPrizeBoard.hidden = true;
    }
  }
}

function populateDailyPrizeAwardsList(prize) {
  if (!dailyPrizeRevealAwards) return;
  ensureDailyPrizeBundle(prize);
  const extras = [];
  if (prize.rank === 0) {
    const rod = RODS.find((r) => r.id === MAGNET_ROD_ID);
    extras.push({
      kind: "rod",
      qty: "",
      label: "Magnet Rod",
      art: rod ? rodArtSvg(rod) : "🧲",
    });
  }
  fillChestLoot(dailyPrizeRevealAwards, prize.bundle, extras);
  dailyPrizeRevealAwards.classList.add("daily-prize-reveal__awards");
}

function renderDailyPrizeChestArt(opened) {
  const prize = gameMeta.pendingDailyPrizeCelebration;
  if (!dailyPrizeChestArt || !prize) return;
  const tier = normalizeChestTier(prize.chestTier || dailyPrizeChestTierForRank(prize.rank));
  dailyPrizeChestArt.innerHTML = crabChestArtSvg(tier, opened);
  btnDailyPrizeChest?.classList.toggle("daily-prize-chest--legendary", tier === "legendary");
  btnDailyPrizeChest?.classList.toggle("daily-prize-chest--rare", tier === "rare");
  btnDailyPrizeChest?.classList.toggle("daily-prize-chest--opened", opened);
}

function showDailyPrizeBoardPhase() {
  dailyPrizePhase = "board";
  if (dailyPrizeBoardPhase) dailyPrizeBoardPhase.hidden = false;
  if (dailyPrizeChestPhase) dailyPrizeChestPhase.hidden = true;
  if (dailyPrizeRevealAwards) dailyPrizeRevealAwards.hidden = true;
  if (btnDailyPrizeRevealDone) btnDailyPrizeRevealDone.hidden = true;
}

function showDailyPrizeChestPhase() {
  clearDailyPrizeBoardTimer();
  const prize = ensureDailyPrizeBundle(gameMeta.pendingDailyPrizeCelebration);
  if (!prize) return;
  dailyPrizePhase = "chest";
  if (dailyPrizeBoardPhase) dailyPrizeBoardPhase.hidden = true;
  if (dailyPrizeChestPhase) dailyPrizeChestPhase.hidden = false;
  if (dailyPrizeChestTitle) dailyPrizeChestTitle.textContent = prize.chestName || dailyPrizeChestNameForTier(prize.chestTier);
  if (dailyPrizeChestHint) {
    dailyPrizeChestHint.textContent =
      prize.rank === 0 ? "Tap the chest to open it · Magnet Rod included" : "Tap the chest to open it";
  }
  if (dailyPrizeRevealAwards) dailyPrizeRevealAwards.hidden = true;
  if (btnDailyPrizeRevealDone) btnDailyPrizeRevealDone.hidden = true;
  btnDailyPrizeChest?.classList.remove("daily-prize-chest--opening", "daily-prize-chest--opened", "daily-prize-chest--burst");
  renderDailyPrizeChestArt(false);
  if (dailyPrizeReveal) {
    dailyPrizeReveal.classList.remove("daily-prize-reveal--active");
    void dailyPrizeReveal.offsetWidth;
    dailyPrizeReveal.classList.add("daily-prize-reveal--active");
  }
  playTreasureMapUnlockSound();
}

function openDailyPrizeChest() {
  if (dailyPrizePhase !== "chest") return;
  const prize = ensureDailyPrizeBundle(gameMeta.pendingDailyPrizeCelebration);
  if (!prize) return;
  dailyPrizePhase = "opened";
  playCrabChestSound();
  btnDailyPrizeChest?.classList.add("daily-prize-chest--opening");
  const finishOpen = () => {
    renderDailyPrizeChestArt(true);
    btnDailyPrizeChest?.classList.remove("daily-prize-chest--opening");
    btnDailyPrizeChest?.classList.add("daily-prize-chest--opened", "daily-prize-chest--burst");
    populateDailyPrizeAwardsList(prize);
    if (dailyPrizeChestHint) dailyPrizeChestHint.textContent = "";
    if (dailyPrizeRevealAwards) dailyPrizeRevealAwards.hidden = false;
    if (btnDailyPrizeRevealDone) btnDailyPrizeRevealDone.hidden = false;
  };
  if (prefersChestMotion()) {
    window.setTimeout(finishOpen, 420);
  } else {
    finishOpen();
  }
}

function advanceDailyPrizeCelebration() {
  if (dailyPrizePhase === "board") showDailyPrizeChestPhase();
  else if (dailyPrizePhase === "chest") openDailyPrizeChest();
  else endDailyPrizeCelebration();
}

function endDailyPrizeCelebration() {
  if (!dailyPrizeCelebrationActive) return;
  clearDailyPrizeBoardTimer();
  const prize = gameMeta.pendingDailyPrizeCelebration;
  dailyPrizeCelebrationActive = false;
  dailyPrizePhase = "board";
  appRoot?.classList.remove("app--daily-prize-cinematic");
  dailyPrizeReveal?.classList.remove("daily-prize-reveal--active");
  if (dailyPrizeReveal) {
    dailyPrizeReveal.hidden = true;
    dailyPrizeReveal.setAttribute("aria-hidden", "true");
  }
  syncHomeLaunchButtons();
  applyPendingDailyPrizeRewards();
  if (prize) {
    const chest = prize.chestName || dailyPrizeChestNameForTier(prize.chestTier);
    const extras = dailyPrizeExtrasLabel(prize.rank);
    showToast(`Fisher of the Day ${dailyPrizeOrdinal(prize.rank)} place collected! ${chest}${extras}.`, 4200);
  }
  syncHomeLaunchButtons();
}

function startDailyPrizeCelebration(prize) {
  if (!prize || dailyPrizeCelebrationActive || treasureMapRevealPaused || playing || !isHomeScreenActive()) return;
  ensureDailyPrizeBundle(prize);
  saveMeta();
  dailyPrizeCelebrationActive = true;
  appRoot?.classList.add("app--daily-prize-cinematic");
  populateDailyPrizeBoardUI(prize);
  showDailyPrizeBoardPhase();
  if (!dailyPrizeReveal) return;
  dailyPrizeReveal.hidden = false;
  dailyPrizeReveal.setAttribute("aria-hidden", "false");
  dailyPrizeReveal.classList.remove("daily-prize-reveal--active");
  void dailyPrizeReveal.offsetWidth;
  dailyPrizeReveal.classList.add("daily-prize-reveal--active");
  playTreasureMapUnlockSound();
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  clearDailyPrizeBoardTimer();
  if (!prefersReducedMotion) {
    dailyPrizeBoardTimer = window.setTimeout(showDailyPrizeChestPhase, 2400);
  }
}

function deferDailyPrizeCelebration() {
  clearDailyPrizeBoardTimer();
  dailyPrizeCelebrationActive = false;
  dailyPrizePhase = "board";
  appRoot?.classList.remove("app--daily-prize-cinematic");
  dailyPrizeReveal?.classList.remove("daily-prize-reveal--active");
  if (dailyPrizeReveal) {
    dailyPrizeReveal.hidden = true;
    dailyPrizeReveal.setAttribute("aria-hidden", "true");
  }
}

function tryStartDailyPrizeCelebration() {
  const prize = gameMeta.pendingDailyPrizeCelebration;
  if (!prize || dailyPrizeCelebrationActive || treasureMapRevealPaused || playing || !isHomeScreenActive()) return;
  if (isAdventureHomeCelebrationActive()) {
    window.setTimeout(tryStartDailyPrizeCelebration, 1200);
    return;
  }
  startDailyPrizeCelebration(prize);
}

/** Fishing Tournament — community vote, 35 daily signups, 11 AM, 4 PM & 8 PM windows. */
const TOURNEY_MAX_PLAYERS = 35;
const TOURNEY_WINDOW_MS = 30 * 60_000;
const TOURNEY_SLOTS = [
  { key: "morning", hour: 11, name: "Morning" },
  { key: "afternoon", hour: 16, name: "Afternoon" },
  { key: "evening", hour: 20, name: "Evening" },
];
const TOURNEY_VOTES_URL = `${SUPABASE_REST_URL}/tourney_votes`;
const TOURNEY_SIGNUPS_URL = `${SUPABASE_REST_URL}/tourney_signups`;
const TOURNEY_SCORES_URL = `${SUPABASE_REST_URL}/tourney_scores`;
const TOURNEY_EVENT_OPTIONS = [
  { id: "roulette", label: "Reef Roulette" },
  { id: "coop", label: "Co-op Haul" },
  { id: "duel", label: "Duel Fishing" },
  { id: "survivor", label: "Kraken Survivor" },
  { id: "crab", label: "Crab Trap" },
];
const TOURNEY_PRIZES = [
  { rank: 1, gems: 400, coins: 2000, chest: "legendary", label: "1st — Legendary chest + 400 gems" },
  { rank: 2, gems: 200, coins: 1000, chest: "rare", label: "2nd — Rare chest + 200 gems" },
  { rank: 3, gems: 100, coins: 500, chest: "common", label: "3rd — Common chest + 100 gems" },
];
let tourneyVoteCounts = {};
let tourneySignupCount = 0;
let tourneyLeaderboardRows = [];
let tourneyRemoteReady = false;
/** Active tournament run — score submits on finish. */
let tournamentRun = null;

function getTourneyDayKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatTourneyHeatTime(hour) {
  const h = hour % 12 || 12;
  const suffix = hour < 12 ? "AM" : "PM";
  return `${h}:00 ${suffix}`;
}

function tourneySlotLabel(slotKey) {
  return TOURNEY_SLOTS.find((s) => s.key === slotKey)?.name || "Heat";
}

function tourneySlotWindows(day = new Date()) {
  const windows = {};
  for (const slot of TOURNEY_SLOTS) {
    const start = new Date(day);
    start.setHours(slot.hour, 0, 0, 0);
    windows[slot.key] = { key: slot.key, start: start.getTime(), end: start.getTime() + TOURNEY_WINDOW_MS };
  }
  return windows;
}

function getTourneySlotState(now = Date.now()) {
  const windows = tourneySlotWindows(new Date(now));
  for (let i = 0; i < TOURNEY_SLOTS.length; i++) {
    const def = TOURNEY_SLOTS[i];
    const win = windows[def.key];
    if (now >= win.start && now < win.end) {
      const next = TOURNEY_SLOTS[i + 1];
      return {
        slotKey: def.key,
        ...win,
        nextLabel: next ? `${next.name} heat at ${formatTourneyHeatTime(next.hour)}` : "Tomorrow's vote opens at midnight",
      };
    }
  }
  for (const def of TOURNEY_SLOTS) {
    const win = windows[def.key];
    if (now < win.start) {
      return {
        slotKey: null,
        start: win.start,
        end: win.end,
        nextLabel: `${def.name} heat at ${formatTourneyHeatTime(def.hour)}`,
        upcoming: def.key,
      };
    }
  }
  return { slotKey: null, start: 0, end: 0, nextLabel: "Tomorrow's vote opens at midnight", upcoming: null };
}

function winningTourneyEventKind() {
  let best = TOURNEY_EVENT_OPTIONS[0].id;
  let bestCount = -1;
  for (const opt of TOURNEY_EVENT_OPTIONS) {
    const count = tourneyVoteCounts[opt.id] || 0;
    if (count > bestCount) {
      best = opt.id;
      bestCount = count;
    }
  }
  return best;
}

function tourneyEventLabel(kind) {
  return TOURNEY_EVENT_OPTIONS.find((o) => o.id === kind)?.label || kind;
}

function isTourneySignedUpToday() {
  return gameMeta.tourneySignedUpDayKey === getTourneyDayKey();
}

function hasTourneyVotedToday() {
  return gameMeta.tourneyVoteDayKey === getTourneyDayKey() && Boolean(gameMeta.tourneyVoteKind);
}

async function fetchTourneyVoteCounts(dayKey = getTourneyDayKey()) {
  try {
    const res = await fetch(
      `${TOURNEY_VOTES_URL}?day_key=eq.${encodeURIComponent(dayKey)}&select=event_kind`,
      { headers: leaderboardHeaders(), ...LEADERBOARD_FETCH_OPTS },
    );
    if (!res.ok) throw new Error(`Tourney votes failed: ${res.status}`);
    const rawVotes = await res.json();
    const rows = Array.isArray(rawVotes) ? rawVotes : [];
    const counts = {};
    for (const row of rows) {
      const kind = row.event_kind;
      counts[kind] = (counts[kind] || 0) + 1;
    }
    tourneyVoteCounts = counts;
    tourneyRemoteReady = true;
    return counts;
  } catch (err) {
    console.warn(err);
    if (hasTourneyVotedToday() && gameMeta.tourneyVoteKind) {
      tourneyVoteCounts = { [gameMeta.tourneyVoteKind]: 1 };
    }
    return tourneyVoteCounts;
  }
}

async function fetchTourneySignupCount(dayKey = getTourneyDayKey()) {
  try {
    const res = await fetch(
      `${TOURNEY_SIGNUPS_URL}?day_key=eq.${encodeURIComponent(dayKey)}&select=id`,
      { headers: leaderboardHeaders({ Prefer: "count=exact" }), ...LEADERBOARD_FETCH_OPTS },
    );
    if (!res.ok) throw new Error(`Tourney signups failed: ${res.status}`);
    const countHeader = res.headers.get("content-range");
    const m = countHeader && countHeader.match(/\/(\d+)$/);
    tourneySignupCount = m ? Number(m[1]) : 0;
    tourneyRemoteReady = true;
    return tourneySignupCount;
  } catch (err) {
    console.warn(err);
    tourneySignupCount = isTourneySignedUpToday() ? 1 : 0;
    return tourneySignupCount;
  }
}

async function fetchTourneyLeaderboard(dayKey = getTourneyDayKey()) {
  try {
    const res = await fetch(
      `${TOURNEY_SCORES_URL}?day_key=eq.${encodeURIComponent(dayKey)}&select=initials,display_name,score,slot_key,client_id&order=score.desc,created_at.asc&limit=120`,
      { headers: leaderboardHeaders(), ...LEADERBOARD_FETCH_OPTS },
    );
    if (!res.ok) throw new Error(`Tourney board failed: ${res.status}`);
    const rawScores = await res.json();
    const rows = Array.isArray(rawScores) ? rawScores : [];
    const bestByClient = new Map();
    for (const row of rows) {
      const prev = bestByClient.get(row.client_id);
      if (!prev || row.score > prev.score) bestByClient.set(row.client_id, row);
    }
    tourneyLeaderboardRows = [...bestByClient.values()]
      .sort((a, b) => b.score - a.score || String(a.initials).localeCompare(String(b.initials)))
      .slice(0, TOURNEY_MAX_PLAYERS);
    return tourneyLeaderboardRows;
  } catch (err) {
    console.warn(err);
    tourneyLeaderboardRows = [];
    return [];
  }
}

async function submitTourneyVote(eventKind) {
  const dayKey = getTourneyDayKey();
  if (!TOURNEY_EVENT_OPTIONS.some((o) => o.id === eventKind)) return;
  if (hasTourneyVotedToday()) {
    showToast("You already voted today.", 2200);
    return;
  }
  const payload = {
    day_key: dayKey,
    voter_client_id: getDuelClientId(),
    event_kind: eventKind,
  };
  try {
    const res = await fetch(TOURNEY_VOTES_URL, {
      method: "POST",
      headers: leaderboardHeaders({ "Content-Type": "application/json", Prefer: "return=minimal" }),
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Vote failed: ${res.status}`);
    gameMeta.tourneyVoteDayKey = dayKey;
    gameMeta.tourneyVoteKind = eventKind;
    saveMeta();
    showToast(`Voted for ${tourneyEventLabel(eventKind)}!`, 2200);
    await fetchTourneyVoteCounts(dayKey);
    refreshTournamentCard();
  } catch (err) {
    console.warn(err);
    showToast("Couldn't save vote — try again.", 2600);
  }
}

async function submitTourneySignup() {
  const dayKey = getTourneyDayKey();
  if (isTourneySignedUpToday()) {
    showToast("You're already signed up for today's tourney.", 2400);
    return;
  }
  await fetchTourneySignupCount(dayKey);
  if (tourneySignupCount >= TOURNEY_MAX_PLAYERS) {
    showToast("All 35 tourney spots are full today.", 2800);
    return;
  }
  const identity = resolveScorePlayerIdentity(gameMeta.playerName || gameMeta.playerInitials);
  try {
    const res = await fetch(TOURNEY_SIGNUPS_URL, {
      method: "POST",
      headers: leaderboardHeaders({ "Content-Type": "application/json", Prefer: "return=minimal" }),
      body: JSON.stringify({
        day_key: dayKey,
        client_id: getDuelClientId(),
        initials: identity.initials,
        display_name: identity.name || identity.initials,
      }),
    });
    if (!res.ok) throw new Error(`Signup failed: ${res.status}`);
    gameMeta.tourneySignedUpDayKey = dayKey;
    saveMeta();
    showToast(`Signed up! Spot ${tourneySignupCount + 1} of ${TOURNEY_MAX_PLAYERS}.`, 2800);
    await fetchTourneySignupCount(dayKey);
    refreshTournamentCard();
  } catch (err) {
    console.warn(err);
    showToast("Couldn't sign up — check your connection.", 2800);
  }
}

async function submitTourneyScore(scorePts, slotKey, eventKind) {
  const pts = Math.max(0, Math.floor(Number(scorePts) || 0));
  if (!pts || !slotKey || !eventKind) return;
  const dayKey = getTourneyDayKey();
  const identity = resolveScorePlayerIdentity(gameMeta.playerName || gameMeta.playerInitials);
  try {
    await fetch(TOURNEY_SCORES_URL, {
      method: "POST",
      headers: leaderboardHeaders({
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=minimal",
      }),
      body: JSON.stringify({
        day_key: dayKey,
        slot_key: slotKey,
        client_id: getDuelClientId(),
        initials: identity.initials,
        display_name: identity.name || identity.initials,
        event_kind: eventKind,
        score: pts,
      }),
    });
  } catch (err) {
    console.warn(err);
  }
}

function tourneyBestScoreForRun(sessionKind, localScore, extra = {}) {
  if (sessionKind === "coop") return Math.max(0, localScore + (extra.partnerScore || 0));
  if (sessionKind === "crab") return Math.max(0, extra.crabCount || localScore);
  return Math.max(0, localScore);
}

async function finishTournamentRun(scorePts) {
  const run = tournamentRun;
  tournamentRun = null;
  if (!run) return;
  await submitTourneyScore(scorePts, run.slotKey, run.eventKind);
  await fetchTourneyLeaderboard(run.dayKey);
  const rank = tourneyLeaderboardRows.findIndex((r) => r.client_id === getDuelClientId()) + 1;
  if (rank > 0 && rank <= 3) {
    showToast(`Tournament heat complete — you're #${rank}! Prize pending at day's end.`, 4200);
  } else if (rank > 0) {
    showToast(`Tournament heat complete — you're #${rank} of ${tourneyLeaderboardRows.length}.`, 3600);
  } else {
    showToast("Tournament score posted!", 2400);
  }
  refreshTournamentCard();
}

function beginTournamentCompetition() {
  if (!isTourneySignedUpToday()) {
    showToast("Sign up this morning to claim a tourney spot.", 2800);
    return;
  }
  const slot = getTourneySlotState();
  if (!slot.slotKey) {
    showToast(`Next heat: ${slot.nextLabel}`, 3000);
    return;
  }
  const eventKind = winningTourneyEventKind();
  tournamentRun = { dayKey: getTourneyDayKey(), slotKey: slot.slotKey, eventKind };
  showToast(`Tournament heat: ${tourneyEventLabel(eventKind)}!`, 2600);
  if (eventKind === "duel") {
    openEventPrep("duel");
    return;
  }
  if (eventKind === "coop") {
    openEventPrep("coop");
    return;
  }
  if (eventKind === "crab") {
    void startCrabTrap();
    return;
  }
  openEventPrep(eventKind);
}

function renderTournamentLeaderboard() {
  if (!tourneyLeaderboard) return;
  tourneyLeaderboard.innerHTML = "";
  if (!tourneyLeaderboardRows.length) {
    const empty = document.createElement("li");
    empty.className = "leaderboard__empty";
    empty.textContent = "No tournament scores yet — compete at 11 AM, 4 PM, or 8 PM.";
    tourneyLeaderboard.appendChild(empty);
    return;
  }
  tourneyLeaderboardRows.slice(0, 10).forEach((row, idx) => {
    const li = document.createElement("li");
    li.className = "leaderboard__row";
    const rank = idx + 1;
  const medal = rank <= 3 ? ["🥇", "🥈", "🥉"][rank - 1] : `${rank}.`;
    li.innerHTML = `<span class="leaderboard__rank">${medal}</span><span class="leaderboard__name">${row.display_name || row.initials}</span><span class="leaderboard__score">${row.score.toLocaleString()}</span>`;
    tourneyLeaderboard.appendChild(li);
  });
}

function renderTournamentVoteButtons() {
  if (!tourneyVoteOptions) return;
  tourneyVoteOptions.innerHTML = "";
  const voted = hasTourneyVotedToday();
  const leading = winningTourneyEventKind();
  for (const opt of TOURNEY_EVENT_OPTIONS) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tourney-vote-btn";
    const count = tourneyVoteCounts[opt.id] || 0;
    btn.textContent = `${opt.label} (${count})`;
    btn.disabled = voted;
    btn.setAttribute("aria-pressed", gameMeta.tourneyVoteKind === opt.id ? "true" : "false");
    if (opt.id === leading && Object.values(tourneyVoteCounts).some((n) => n > 0)) {
      btn.classList.add("tourney-vote-btn--lead");
    }
    btn.addEventListener("click", () => void submitTourneyVote(opt.id));
    tourneyVoteOptions.appendChild(btn);
  }
}

async function refreshTournamentCard() {
  if (!eventCardTourney) return;
  const dayKey = getTourneyDayKey();
  await Promise.all([fetchTourneyVoteCounts(dayKey), fetchTourneySignupCount(dayKey), fetchTourneyLeaderboard(dayKey)]);
  const slot = getTourneySlotState();
  const eventKind = winningTourneyEventKind();
  if (tourneyEventTitle) {
    tourneyEventTitle.textContent = Object.values(tourneyVoteCounts).some((n) => n > 0)
      ? `Today's event: ${tourneyEventLabel(eventKind)}`
      : "Vote for today's event";
  }
  if (tourneySignupLine) {
    const signed = isTourneySignedUpToday();
    tourneySignupLine.textContent = signed
      ? `You're in — spot secured (${tourneySignupCount}/${TOURNEY_MAX_PLAYERS} filled).`
      : `${tourneySignupCount}/${TOURNEY_MAX_PLAYERS} spots filled · sign up early!`;
  }
  if (tourneyScheduleLine) {
    if (slot.slotKey) {
      const mins = Math.max(0, Math.ceil((slot.end - Date.now()) / 60000));
      tourneyScheduleLine.textContent = `${tourneySlotLabel(slot.slotKey)} heat LIVE — ${mins} min left`;
    } else {
      tourneyScheduleLine.textContent = slot.nextLabel;
    }
  }
  if (tourneyPrizeLine) {
    tourneyPrizeLine.textContent = "Top 3 of 35 win chests + gems · 11:00 AM, 4:00 PM & 8:00 PM heats";
  }
  if (btnTourneySignup) {
    btnTourneySignup.hidden = isTourneySignedUpToday();
    btnTourneySignup.disabled = tourneySignupCount >= TOURNEY_MAX_PLAYERS;
    btnTourneySignup.textContent =
      tourneySignupCount >= TOURNEY_MAX_PLAYERS ? "Tourney full" : "Sign up for today's tourney";
  }
  if (btnTourneyCompete) {
    btnTourneyCompete.hidden = !isTourneySignedUpToday();
    btnTourneyCompete.disabled = !slot.slotKey;
    btnTourneyCompete.textContent = slot.slotKey ? "Compete in live heat" : "Heat opens soon";
  }
  renderTournamentVoteButtons();
  renderTournamentLeaderboard();
}

async function refreshEventsPanel() {
  if (!panelEvents || panelEvents.hidden) return;
  const dayKey = getDailyDayKey();
  if (dailyLeaderboardTitle) {
    dailyLeaderboardTitle.textContent = `Today's standings · ${formatDailyDayLabel(dayKey)}`;
  }
  updateDailyEventResetLine();
  const rows = await fetchTodayDailyLeaderboard();
  updateDailyEventPlayerHint(rows);
  refreshLeaderboardViews(true);
  refreshDuelEventCard();
  refreshCrabTrapEventCard();
  refreshEventMinigameCards();
  refreshDailyCatchEventCard();
  void refreshTournamentCard();
}

const DUEL_WIN_COINS = 800;
const DUEL_DAILY_TICKETS = 5;
const DUEL_TICKET_PRICE = 700;
/** Sign-in, friends, and online presence for friend duels / co-op. */
const PLAYER_PROFILES_URL = `${SUPABASE_REST_URL}/player_profiles`;
const PLAYER_FRIENDS_URL = `${SUPABASE_REST_URL}/player_friends`;
const ONLINE_FRIEND_MS = 90_000;
const PRESENCE_HEARTBEAT_MS = 45_000;
let supabaseAuthClient = null;
let authSession = null;
let authUser = null;
let socialFriends = [];
let onlineFriendIds = new Set();
let presenceHeartbeatTimer = null;
let pendingEventFriendUserId = null;

function initSupabaseAuth() {
  if (!window.supabase?.createClient) return null;
  if (!supabaseAuthClient) {
    supabaseAuthClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  }
  return supabaseAuthClient;
}

function friendCodeFromUserId(userId) {
  return String(userId || "")
    .replace(/-/g, "")
    .slice(0, 8)
    .toUpperCase();
}

function isFriendOnline(lastSeenAt) {
  if (!lastSeenAt) return false;
  const ts = new Date(lastSeenAt).getTime();
  return Number.isFinite(ts) && Date.now() - ts <= ONLINE_FRIEND_MS;
}

function normalizeFriendProfile(row) {
  if (!row) return null;
  return {
    userId: row.user_id || row.userId,
    displayName: parsePlayerName(row.display_name || row.displayName) || "Fisher",
    initials: formatDuelInitials(row.initials) || "FRI",
    companionId: normalizeCompanionId(row.companion_id ?? row.companionId),
    friendCode: String(row.friend_code || row.friendCode || "").toUpperCase(),
    lastSeenAt: row.last_seen_at || row.lastSeenAt || "",
    online: isFriendOnline(row.last_seen_at || row.lastSeenAt),
  };
}

async function upsertPlayerProfile() {
  if (!authUser?.id) return;
  const payload = {
    user_id: authUser.id,
    display_name: parsePlayerName(gameMeta.playerName) || authUser.email?.split("@")[0] || "Fisher",
    initials: getDuelPlayerInitials(),
    companion_id: equippedCompanionId(),
    client_id: getDuelClientId(),
    friend_code: friendCodeFromUserId(authUser.id),
    last_seen_at: new Date().toISOString(),
  };
  try {
    const res = await fetch(`${PLAYER_PROFILES_URL}?on_conflict=user_id`, {
      method: "POST",
      headers: leaderboardHeaders({
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=minimal",
      }),
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errText = await res.text();
      if (errText.includes("player_profiles") || errText.includes("PGRST205")) {
        console.warn("Player profiles table missing — run supabase/player_social.sql");
      }
    }
  } catch (err) {
    console.warn(err);
  }
}

async function touchPlayerPresence() {
  if (!authUser?.id) return;
  try {
    await fetch(`${PLAYER_PROFILES_URL}?user_id=eq.${encodeURIComponent(authUser.id)}`, {
      method: "PATCH",
      headers: leaderboardHeaders({
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      }),
      body: JSON.stringify({
        display_name: parsePlayerName(gameMeta.playerName) || authUser.email?.split("@")[0] || "Fisher",
        initials: getDuelPlayerInitials(),
        companion_id: equippedCompanionId(),
        client_id: getDuelClientId(),
        last_seen_at: new Date().toISOString(),
      }),
    });
  } catch (err) {
    console.warn(err);
  }
}

function startPresenceHeartbeat() {
  stopPresenceHeartbeat();
  if (!authUser?.id) return;
  void touchPlayerPresence();
  presenceHeartbeatTimer = window.setInterval(() => {
    void touchPlayerPresence();
    void refreshFriendsList();
  }, PRESENCE_HEARTBEAT_MS);
}

function stopPresenceHeartbeat() {
  if (presenceHeartbeatTimer) {
    clearInterval(presenceHeartbeatTimer);
    presenceHeartbeatTimer = null;
  }
}

async function fetchPlayerProfileByCode(code) {
  const normalized = String(code || "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
  if (!normalized) return null;
  const res = await fetch(
    `${PLAYER_PROFILES_URL}?friend_code=eq.${encodeURIComponent(normalized)}&select=*&limit=1`,
    { headers: leaderboardHeaders() },
  );
  if (!res.ok) throw new Error(`Friend lookup failed: ${res.status}`);
  const rows = await res.json();
  return normalizeFriendProfile(Array.isArray(rows) ? rows[0] : null);
}

async function fetchPlayerProfilesByIds(ids) {
  const unique = [...new Set(ids.filter(Boolean))];
  if (!unique.length) return [];
  const filter = unique.map((id) => encodeURIComponent(id)).join(",");
  const res = await fetch(
    `${PLAYER_PROFILES_URL}?user_id=in.(${filter})&select=*`,
    { headers: leaderboardHeaders() },
  );
  if (!res.ok) throw new Error(`Friend profiles failed: ${res.status}`);
  const rows = await res.json();
  return (Array.isArray(rows) ? rows : []).map(normalizeFriendProfile).filter(Boolean);
}

async function refreshFriendsList() {
  if (!authUser?.id) {
    socialFriends = [];
    onlineFriendIds = new Set();
    refreshAccountUI();
    refreshEventPrepFriendsUI();
    return;
  }
  try {
    const res = await fetch(
      `${PLAYER_FRIENDS_URL}?or=(user_id.eq.${encodeURIComponent(authUser.id)},friend_id.eq.${encodeURIComponent(authUser.id)})&select=user_id,friend_id`,
      { headers: leaderboardHeaders() },
    );
    if (!res.ok) throw new Error(`Friends fetch failed: ${res.status}`);
    const rows = Array.isArray(await res.json()) ? await res.json() : [];
    const friendIds = rows
      .map((row) => (row.user_id === authUser.id ? row.friend_id : row.user_id))
      .filter((id) => id && id !== authUser.id);
    const profiles = await fetchPlayerProfilesByIds(friendIds);
    socialFriends = profiles.sort((a, b) => {
      if (a.online !== b.online) return a.online ? -1 : 1;
      return a.displayName.localeCompare(b.displayName);
    });
    onlineFriendIds = new Set(socialFriends.filter((f) => f.online).map((f) => f.userId));
  } catch (err) {
    console.warn(err);
    socialFriends = [];
    onlineFriendIds = new Set();
  }
  refreshAccountUI();
  refreshEventPrepFriendsUI();
}

async function addFriendByCode(code) {
  if (!authUser?.id) {
    showToast("Sign in to add friends.", 2400);
    return;
  }
  const profile = await fetchPlayerProfileByCode(code);
  if (!profile?.userId) {
    showToast("No fisher found with that code.", 2600);
    return;
  }
  if (profile.userId === authUser.id) {
    showToast("That's your own friend code.", 2200);
    return;
  }
  if (socialFriends.some((f) => f.userId === profile.userId)) {
    showToast(`${profile.displayName} is already on your friends list.`, 2400);
    return;
  }
  const res = await fetch(PLAYER_FRIENDS_URL, {
    method: "POST",
    headers: leaderboardHeaders({
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    }),
    body: JSON.stringify({
      user_id: authUser.id,
      friend_id: profile.userId,
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    if (errText.includes("duplicate") || errText.includes("23505")) {
      showToast(`${profile.displayName} is already on your friends list.`, 2400);
      return;
    }
    showToast("Couldn't add friend — try again.", 2600);
    return;
  }
  showToast(`${profile.displayName} added to friends!`, 2200);
  await refreshFriendsList();
}

async function signInWithProvider(provider) {
  const client = initSupabaseAuth();
  if (!client) {
    showToast("Sign-in isn't available right now.", 2800);
    return;
  }
  const redirectTo = `${window.location.origin}${window.location.pathname}`;
  const { error } = await client.auth.signInWithOAuth({
    provider,
    options: { redirectTo },
  });
  if (error) showToast(error.message, 3200);
}

async function signOutAccount() {
  const client = initSupabaseAuth();
  stopPresenceHeartbeat();
  pendingEventFriendUserId = null;
  socialFriends = [];
  onlineFriendIds = new Set();
  if (client) await client.auth.signOut();
  authSession = null;
  authUser = null;
  refreshAccountUI();
  refreshEventPrepFriendsUI();
}

async function bootstrapAuth() {
  const client = initSupabaseAuth();
  if (!client) return;
  const { data } = await client.auth.getSession();
  authSession = data.session;
  authUser = data.session?.user ?? null;
  if (authUser) {
    await upsertPlayerProfile();
    startPresenceHeartbeat();
    await refreshFriendsList();
  }
  refreshAccountUI();
  client.auth.onAuthStateChange(async (_event, session) => {
    authSession = session;
    authUser = session?.user ?? null;
    if (authUser) {
      await upsertPlayerProfile();
      startPresenceHeartbeat();
      await refreshFriendsList();
    } else {
      stopPresenceHeartbeat();
      socialFriends = [];
      onlineFriendIds = new Set();
    }
    refreshAccountUI();
    refreshEventPrepFriendsUI();
  });
}

function refreshAccountUI() {
  const signedIn = Boolean(authUser?.id);
  if (profileSignedOut) profileSignedOut.hidden = signedIn;
  if (profileSignedIn) profileSignedIn.hidden = !signedIn;
  if (profileFriendsSection) profileFriendsSection.hidden = !signedIn;
  if (!signedIn) return;
  const label =
    parsePlayerName(gameMeta.playerName) ||
    authUser.user_metadata?.full_name ||
    authUser.user_metadata?.name ||
    authUser.email ||
    "Signed in";
  if (profileAccountLabel) profileAccountLabel.textContent = label;
  if (profileFriendCode) {
    profileFriendCode.textContent = `Friend code: ${friendCodeFromUserId(authUser.id)}`;
  }
  if (profileFriendsOnlineCount) {
    const onlineCount = socialFriends.filter((f) => f.online).length;
    profileFriendsOnlineCount.textContent = `${onlineCount} online`;
  }
  renderProfileFriendsList();
}

function renderProfileFriendsList() {
  if (!profileFriendsList) return;
  profileFriendsList.innerHTML = "";
  if (!socialFriends.length) {
    const empty = document.createElement("p");
    empty.className = "profile-friends-empty";
    empty.textContent = "No friends yet — add one with their friend code.";
    profileFriendsList.appendChild(empty);
    return;
  }
  for (const friend of socialFriends) {
    const row = document.createElement("div");
    row.className = "profile-friend-row";
    row.setAttribute("role", "listitem");
    const status = document.createElement("span");
    status.className = `friend-status ${friend.online ? "friend-status--online" : "friend-status--offline"}`;
    status.setAttribute("aria-hidden", "true");
    const copy = document.createElement("div");
    const name = document.createElement("p");
    name.className = "profile-friend-row__name";
    name.textContent = friend.displayName;
    const tag = document.createElement("p");
    tag.className = "profile-friend-row__tag";
    tag.textContent = `${friend.initials} · ${friend.online ? "Online now" : "Offline"}`;
    copy.append(name, tag);
    const code = document.createElement("span");
    code.className = "profile-friend-row__tag";
    code.textContent = friend.friendCode;
    row.append(status, copy, code);
    profileFriendsList.appendChild(row);
  }
}

function refreshEventPrepFriendsUI() {
  const kind = pendingEventPrepKind;
  const show = Boolean(authUser?.id && (kind === "duel" || kind === "coop"));
  if (eventPrepFriends) eventPrepFriends.hidden = !show;
  if (!show || !eventPrepFriendsList) return;
  const onlineFriends = socialFriends.filter((f) => f.online);
  eventPrepFriendsList.innerHTML = "";
  if (!onlineFriends.length) {
    const empty = document.createElement("p");
    empty.className = "profile-friends-empty";
    empty.textContent = "No friends online — tap Find duel rival at the same time to match anyone.";
    eventPrepFriendsList.appendChild(empty);
    pendingEventFriendUserId = null;
    if (btnEventPrepAnyone) btnEventPrepAnyone.setAttribute("aria-pressed", "true");
    return;
  }
  for (const friend of onlineFriends) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "friend-picker__option";
    btn.setAttribute("role", "option");
    btn.dataset.friendId = friend.userId;
    btn.setAttribute("aria-selected", pendingEventFriendUserId === friend.userId ? "true" : "false");
    const status = document.createElement("span");
    status.className = "friend-status friend-status--online";
    status.setAttribute("aria-hidden", "true");
    const copy = document.createElement("div");
    const name = document.createElement("p");
    name.className = "friend-picker__name";
    name.textContent = friend.displayName;
    const tag = document.createElement("p");
    tag.className = "friend-picker__tag";
    tag.textContent = friend.initials;
    copy.append(name, tag);
    btn.append(status, copy);
    btn.addEventListener("click", () => {
      pendingEventFriendUserId = friend.userId;
      refreshEventPrepFriendsUI();
    });
    eventPrepFriendsList.appendChild(btn);
  }
  if (btnEventPrepAnyone) {
    btnEventPrepAnyone.setAttribute("aria-pressed", pendingEventFriendUserId ? "false" : "true");
  }
}

function getPendingFriendUserId() {
  if (!pendingEventFriendUserId) return null;
  return onlineFriendIds.has(pendingEventFriendUserId) ? pendingEventFriendUserId : null;
}

/** Every duel round is exactly one minute, regardless of reef. */
const DUEL_ROUND_MS = 60_000;
/** Easiest rival difficulty — AI target score floor. */
const DUEL_RIVAL_MIN_TARGET = 4000;
const DUEL_MATCH_TABLE_URL = `${SUPABASE_REST_URL}/duel_matches`;
const DUEL_CLIENT_ID_KEY = "reefRushDuelClientId_v1";
const DUEL_LOBBY_TIMEOUT_MS = 25_000;
const DUEL_LOBBY_TIMEOUT_SEC = DUEL_LOBBY_TIMEOUT_MS / 1000;
const DUEL_LOBBY_POLL_MS = 400;
const DUEL_LOBBY_CREATE_GRACE_MS = 200;
const DUEL_SCORE_SYNC_MS = 400;
const DUEL_STATE_SYNC_MS = 220;
const DUEL_OPPONENT_POLL_MS = 350;
const DUEL_MATCH_START_DELAY_MS = 4000;
/** Co-op / duel rival screen duration before the round begins. */
const ONLINE_MATCHUP_DISPLAY_MS = DUEL_MATCH_START_DELAY_MS;
const DUEL_LOBBY_MAX_AGE_MS = 120_000;
const MATCH_KIND_DUEL = "duel";
const MATCH_KIND_COOP = "coop";
const COOP_LOBBY_TIMEOUT_MS = DUEL_LOBBY_TIMEOUT_MS;
const COOP_STATE_SYNC_MS = DUEL_STATE_SYNC_MS;
const COOP_PARTNER_POLL_MS = DUEL_OPPONENT_POLL_MS;
/** null during classic/adventure play; set for split-screen duel fishing. */
let duelSession = null;
/** Event mini-games on the main canvas: roulette | coop | survivor. */
let eventMinigameSession = null;
const MINIGAME_ROULETTE_MS = 45_000;
const MINIGAME_COOP_MS = 60_000;
const MINIGAME_SURVIVOR_MS = 30 * 60_000;
/** Fish-score chest tiers for timed mini-games. */
const MINIGAME_FISH_CHEST_MIN = 2000;
const MINIGAME_FISH_RARE_MIN = 1500;
const MINIGAME_FISH_LEGENDARY_MIN = 4000;
/** Co-op haul needs a bigger combined score for top chests. */
const MINIGAME_COOP_CHEST_MIN = 5700;
const MINIGAME_COOP_RARE_MIN = 3600;
const MINIGAME_COOP_LEGENDARY_MIN = 7800;
/** Survivor chest tiers (bonus haul when you hook the kraken). */
const MINIGAME_SURVIVOR_CHEST_MIN = 250;
const MINIGAME_SURVIVOR_RARE_MIN = 900;
const MINIGAME_SURVIVOR_LEGENDARY_MIN = 2200;

/** Reef shown on the Events card / used for the active duel plan. */
let duelPendingReefId = null;
/** Last reef played in duel fishing — avoid picking the same one twice in a row. */
let duelLastReefId = null;
/** Rival score target rolled for the next duel (4000 … player best). */
let duelPendingTargetScore = DUEL_RIVAL_MIN_TARGET;
let duelHookSyncEnabled = true;

function duelHookCastCode(castState) {
  if (castState === "down") return 1;
  if (castState === "up") return 2;
  return 0;
}

function duelHookCastFromCode(code) {
  if (code === 1) return "down";
  if (code === 2) return "up";
  return "idle";
}

function duelLocalHookXPct(localX) {
  const half = duelHalfW();
  return half > 0 ? Math.max(0, Math.min(1, localX / half)) : 0.5;
}

function duelLocalHookYPct(tipY) {
  const span = Math.max(1, waterH - dpr * 80);
  return Math.max(0, Math.min(1, (tipY - waterTop) / span));
}

function duelHookYFromPct(yPct) {
  const span = Math.max(1, waterH - dpr * 80);
  return waterTop + Math.max(0, Math.min(1, yPct)) * span;
}

function duelHookFieldsFromRow(row) {
  return {
    hostHookX: Number(row.host_hook_x_pct ?? row.hostHookX ?? 0.5),
    hostHookY: Number(row.host_hook_y_pct ?? row.hostHookY ?? 0.08),
    hostHookCast: Number(row.host_hook_cast ?? row.hostHookCast ?? 0),
    guestHookX: Number(row.guest_hook_x_pct ?? row.guestHookX ?? 0.5),
    guestHookY: Number(row.guest_hook_y_pct ?? row.guestHookY ?? 0.08),
    guestHookCast: Number(row.guest_hook_cast ?? row.guestHookCast ?? 0),
  };
}
let duelLobbyMatchId = null;
let duelMatchmakingActive = false;
let coopLobbyMatchId = null;
let coopMatchmakingActive = false;
let coopPendingTargetScore = DUEL_RIVAL_MIN_TARGET;
let coopLobbyCountdownTimer = null;

function duelSleep(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function getDuelClientId() {
  try {
    let id = localStorage.getItem(DUEL_CLIENT_ID_KEY);
    if (!id) {
      id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `duel-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem(DUEL_CLIENT_ID_KEY, id);
    }
    return id;
  } catch {
    return `duel-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

function formatDuelInitials(value) {
  const ini = String(value ?? "")
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .slice(0, 3);
  return ini.length >= 1 ? ini : "";
}

const COM_PLAYER_NAME_PARTS = [
  "joey",
  "maya",
  "kai",
  "zoe",
  "leo",
  "nova",
  "riley",
  "finn",
  "jade",
  "cruz",
  "abby",
  "miles",
  "lena",
  "otto",
  "rosa",
  "theo",
  "nina",
  "evan",
  "sage",
  "arlo",
  "mia",
  "cole",
  "ivy",
  "dean",
  "ruby",
  "nate",
  "sasha",
  "owen",
  "cleo",
  "luke",
];

function rollComPlayerName() {
  const part = COM_PLAYER_NAME_PARTS[Math.floor(Math.random() * COM_PLAYER_NAME_PARTS.length)];
  const num = 100 + Math.floor(Math.random() * 900);
  return `${part} ${num}`;
}

function comGuestDisplayName(stored) {
  const name = parsePlayerName(stored);
  if (name && name.toUpperCase() !== "COM") return name;
  return rollComPlayerName();
}

function getDuelPlayerInitials() {
  return formatDuelInitials(gameMeta.playerInitials) || "AAA";
}

function duelOpponentInitialsFromRow(row, role) {
  if (!row) return rollComPlayerName();
  if (row.isComGuest) return comGuestDisplayName(row.guestInitials);
  const raw = role === "host" ? row.guestInitials : row.hostInitials;
  return formatDuelInitials(raw) || "Rival";
}

function getDuelOpponentDisplayName() {
  if (!duelSession) return "Rival";
  if (duelSession.mode === "com") return comGuestDisplayName(duelSession.opponentInitials);
  return formatDuelInitials(duelSession.opponentInitials) || "Rival";
}

function isDuelPvpSession() {
  return Boolean(duelSession?.mode === "pvp");
}

function isDuelSpectatorSession() {
  return Boolean(duelSession?.mode === "spectator");
}

function isDuelMatchWatchable(row) {
  if (!row || row.status !== "active" || row.isComGuest) return false;
  if (!row.roundStartMs) return false;
  const elapsed = Date.now() - row.roundStartMs;
  return elapsed < (row.roundMs || DUEL_ROUND_MS) + 8000;
}

async function fetchActiveDuelMatchesForSpectator(limit = 8) {
  const since = new Date(Date.now() - DUEL_ROUND_MS - 180_000).toISOString();
  const url =
    `${DUEL_MATCH_TABLE_URL}?select=*` +
    `&status=eq.active` +
    `&match_kind=eq.${encodeURIComponent(MATCH_KIND_DUEL)}` +
    `&is_com_guest=eq.false` +
    `&round_start_ms=not.is.null` +
    `&created_at=gte.${encodeURIComponent(since)}` +
    `&order=round_start_ms.desc&limit=${limit}`;
  const res = await fetch(url, { headers: leaderboardHeaders() });
  const { body } = await readDuelResponse(res);
  if (!res.ok) throw new Error(`Duel spectator fetch failed: ${res.status}`);
  const rows = Array.isArray(body) ? body : [];
  return rows.map(normalizeDuelMatchRow).filter(isDuelMatchWatchable);
}

function formatDuelSpectatorMatchLabel(row) {
  const host = row.hostInitials || "AAA";
  const guest = row.guestInitials || "???";
  const elapsed = Math.max(0, Date.now() - row.roundStartMs);
  const left = Math.max(0, Math.ceil(((row.roundMs || DUEL_ROUND_MS) - elapsed) / 1000));
  return `${host} vs ${guest} · ${left}s left`;
}

async function refreshDuelSpectatorList() {
  if (!duelSpectatorList) return;
  if (duelSpectatorLoading) duelSpectatorLoading.hidden = false;
  if (duelSpectatorEmpty) duelSpectatorEmpty.hidden = true;
  duelSpectatorList.innerHTML = "";
  try {
    const matches = await fetchActiveDuelMatchesForSpectator();
    if (duelSpectatorLoading) duelSpectatorLoading.hidden = true;
    if (!matches.length) {
      if (duelSpectatorEmpty) duelSpectatorEmpty.hidden = false;
      return;
    }
    for (const row of matches) {
      const li = document.createElement("li");
      li.className = "duel-spectator__item";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn--secondary btn--small duel-spectator__watch";
      btn.textContent = formatDuelSpectatorMatchLabel(row);
      btn.dataset.matchId = row.matchId;
      btn.addEventListener("click", () => {
        void startDuelSpectator(row.matchId);
      });
      li.appendChild(btn);
      duelSpectatorList.appendChild(li);
    }
  } catch (err) {
    console.warn(err);
    if (duelSpectatorLoading) duelSpectatorLoading.hidden = true;
    if (duelSpectatorEmpty) {
      duelSpectatorEmpty.hidden = false;
      duelSpectatorEmpty.textContent = "Couldn't load live duels — try again.";
    }
  }
}

function lerpRemoteHookState(remote, hookState, dt) {
  if (!remote || !hookState) return;
  const half = duelHalfW();
  const tx = remote.xPct * half;
  const ty = duelHookYFromPct(remote.yPct);
  const k = Math.min(1, dt / 110);
  hookState.x += (tx - hookState.x) * k;
  hookState.targetX = tx;
  hookState.tipY += (ty - hookState.tipY) * k;
  hookState.castState = duelHookCastFromCode(remote.cast);
}

async function pollDuelSpectatorFromMatch() {
  if (!isDuelSpectatorSession() || !duelSession.matchId) return;
  try {
    const row = await fetchDuelMatchById(duelSession.matchId);
    if (!row) return;
    duelSession.lastRow = row;
    let hudDirty = false;
    if (row.hostScore !== duelSession.hostScore) {
      if (row.hostScore > duelSession.hostScore) duelSession.hostHook.snagPulse = Math.max(duelSession.hostHook.snagPulse, 300);
      duelSession.hostScore = row.hostScore;
      hudDirty = true;
    }
    if (row.guestScore !== duelSession.guestScore) {
      if (row.guestScore > duelSession.guestScore) duelSession.guestHook.snagPulse = Math.max(duelSession.guestHook.snagPulse, 300);
      duelSession.guestScore = row.guestScore;
      hudDirty = true;
    }
    if (row.hostInitials && row.hostInitials !== duelSession.hostInitials) {
      duelSession.hostInitials = row.hostInitials;
      hudDirty = true;
    }
    if (row.guestInitials && row.guestInitials !== duelSession.guestInitials) {
      duelSession.guestInitials = row.guestInitials;
      hudDirty = true;
    }
    duelSession.remoteHostHook = { xPct: row.hostHookX, yPct: row.hostHookY, cast: row.hostHookCast };
    duelSession.remoteGuestHook = { xPct: row.guestHookX, yPct: row.guestHookY, cast: row.guestHookCast };
    if (hudDirty) updateDuelSpectatorHudScores();
    if (row.status === "finished" || !isDuelMatchWatchable(row)) {
      endDuelSpectatorRound(row);
    }
  } catch (err) {
    console.warn(err);
  }
}

function updateDuelSpectatorHudScores() {
  if (!duelHud || !duelSession) return;
  if (duelHudPlayerScore) duelHudPlayerScore.textContent = String(duelSession.hostScore || 0);
  if (duelHudOpponentScore) duelHudOpponentScore.textContent = String(duelSession.guestScore || 0);
  updateDuelHudLabels();
}

function updateDuelSpectatorVisuals(dt) {
  if (!isDuelSpectatorSession()) return;
  const reef = getReef();
  const maxFish = Math.max(5, Math.floor(reef.maxFish * 0.55));
  const t = performance.now();
  if (t - (duelSession.lastOpponentPoll || 0) >= DUEL_OPPONENT_POLL_MS) {
    duelSession.lastOpponentPoll = t;
    void pollDuelSpectatorFromMatch();
  }
  duelSession.hostSpawnAcc = (duelSession.hostSpawnAcc || 0) + dt;
  if (duelSession.hostSpawnAcc >= duelSession.hostNextSpawn && countUncaughtFish() < maxFish) {
    spawnFishInDuelHalf("player");
    duelSession.hostSpawnAcc = 0;
    duelSession.hostNextSpawn = rollNextSpawnDelay(reef);
  }
  duelSession.opponentSpawnAcc += dt;
  if (duelSession.opponentSpawnAcc >= duelSession.opponentNextSpawn && countUncaughtOpponentFish() < maxFish) {
    spawnFishInDuelHalf("opponent");
    duelSession.opponentSpawnAcc = 0;
    duelSession.opponentNextSpawn = rollNextSpawnDelay(reef);
  }
  updateFish(dt);
  updateOpponentFish(dt);
  lerpRemoteHookState(duelSession.remoteHostHook, duelSession.hostHook, dt);
  lerpRemoteHookState(duelSession.remoteGuestHook, duelSession.guestHook, dt);
  if (duelSession.hostHook.snagPulse > 0) duelSession.hostHook.snagPulse -= dt;
  if (duelSession.guestHook.snagPulse > 0) duelSession.guestHook.snagPulse -= dt;
}

function beginDuelSpectatorSession(row) {
  if (playing) return;
  if (!isDuelMatchWatchable(row)) {
    showToast("That duel just ended.", 2400);
    void refreshDuelSpectatorList();
    return;
  }
  const reef = REEFS.find((r) => r.id === row.reefId) || REEFS[0];
  const elapsed = Math.max(0, Date.now() - row.roundStartMs);
  const remaining = Math.max(0, (row.roundMs || DUEL_ROUND_MS) - elapsed);
  const hostHook = createOpponentHook();
  const guestHook = createOpponentHook();
  duelSession = {
    mode: "spectator",
    matchId: row.matchId,
    reefId: reef.id,
    hostInitials: row.hostInitials || "AAA",
    guestInitials: row.guestInitials || "???",
    hostScore: row.hostScore || 0,
    guestScore: row.guestScore || 0,
    hostHook,
    guestHook,
    opponentHook: guestHook,
    opponentFish: [],
    hostSpawnAcc: 0,
    hostNextSpawn: rollNextSpawnDelay(reef, true),
    opponentSpawnAcc: 0,
    opponentNextSpawn: rollNextSpawnDelay(reef, true),
    roundStart: performance.now() - elapsed,
    remoteHostHook: { xPct: row.hostHookX, yPct: row.hostHookY, cast: row.hostHookCast },
    remoteGuestHook: { xPct: row.guestHookX, yPct: row.guestHookY, cast: row.guestHookCast },
    lastOpponentPoll: 0,
    lastRow: row,
  };

  playing = true;
  normalizeSelectedRod();
  stopHomeMusic();
  stopEventsMusic();
  syncMusicMasterGain();
  startHomeWaves();
  roundBait = { catchRadiusMult: 1, rareAssistAdd: 0, lightRadiusMult: 1 };
  score = 0;
  fishList = [];
  catchLog = [];
  spawnAcc = 0;
  nextSpawnIn = rollNextSpawnDelay(reef, true);
  seedStarterFish(reef);
  roundEndAt = performance.now() + remaining;
  clearKrakens();
  jackpotCrab = null;
  hideAllPanels();
  if (panelDuelOver) panelDuelOver.hidden = true;
  appRoot.classList.add("app--playing", "app--duel", "app--duel-spectator");
  showDuelHud();
  lastPearlAt = -999999;
  if (timeDisplay) timeDisplay.textContent = formatTime(remaining);
  initBubbles();
  resize();
  hostHook.x = duelSideCenter("player");
  hostHook.targetX = hostHook.x;
  hostHook.tipY = surfaceTipY();
  guestHook.x = duelHalfW() * 0.5;
  guestHook.targetX = guestHook.x;
  guestHook.tipY = surfaceTipY();
  touchAim = null;
  celebration.particles.length = 0;
  celebration.rings.length = 0;
  releasedFishFx.length = 0;
  catchFlash = 0;
  for (let i = 0; i < 3; i++) spawnFishInDuelHalf("opponent");
  controlHint.textContent = `Watching ${duelSession.hostInitials} vs ${duelSession.guestInitials} — Esc to leave`;
  updateDuelSpectatorHudScores();
  startReefMusic();
  void pollDuelSpectatorFromMatch();
}

async function startDuelSpectator(matchId) {
  if (playing || duelMatchmakingActive || coopMatchmakingActive) return;
  try {
    const row = await fetchDuelMatchById(matchId);
    if (!isDuelMatchWatchable(row)) {
      showToast("That duel just ended.", 2400);
      void refreshDuelSpectatorList();
      return;
    }
    hideAllPanels();
    beginDuelSpectatorSession(row);
  } catch (err) {
    console.warn(err);
    showToast("Couldn't join that duel.", 2600);
  }
}

function leaveDuelSpectator() {
  if (!isDuelSpectatorSession()) return;
  const host = duelSession.hostInitials || "Host";
  const guest = duelSession.guestInitials || "Guest";
  const hostScore = duelSession.hostScore || 0;
  const guestScore = duelSession.guestScore || 0;
  playing = false;
  stopClimaxMusic();
  syncUrgentTimerUi(99999);
  stopReefMusic();
  appRoot.classList.remove("app--playing", "app--duel", "app--duel-spectator");
  hideDuelHud();
  duelSession = null;
  hook.castState = "idle";
  touchAim = null;
  openEvents();
  showToast(`Left spectator — ${host} ${hostScore} · ${guest} ${guestScore}`, 2800);
}

function endDuelSpectatorRound(row = duelSession?.lastRow) {
  if (!isDuelSpectatorSession() || duelResultSettling) return;
  duelResultSettling = true;
  const session = duelSession;
  const host = session.hostInitials || "Host";
  const guest = session.guestInitials || "Guest";
  const hostScore = row?.hostScore ?? session.hostScore ?? 0;
  const guestScore = row?.guestScore ?? session.guestScore ?? 0;
  const reefName = getReef().name;
  const wonHost = hostScore > guestScore;
  const tie = hostScore === guestScore;

  playing = false;
  stopClimaxMusic();
  syncUrgentTimerUi(99999);
  stopReefMusic();
  appRoot.classList.remove("app--playing", "app--duel", "app--duel-spectator");
  hideDuelHud();
  hook.castState = "idle";
  touchAim = null;
  duelSession = null;
  duelResultSettling = false;

  if (panelDuelOver) panelDuelOver.hidden = false;
  if (btnDuelPlayAgain) btnDuelPlayAgain.hidden = true;
  if (duelOverHeadline) {
    duelOverHeadline.textContent = tie ? "Duel tied!" : wonHost ? `${host} wins!` : `${guest} wins!`;
  }
  if (duelOverScores) duelOverScores.textContent = `${host} ${hostScore} · ${guest} ${guestScore}`;
  if (duelOverDetail) duelOverDetail.textContent = `${reefName} · spectator view`;
  if (duelOverPrize) {
    duelOverPrize.hidden = true;
    duelOverPrize.textContent = "";
  }
  roundBait = { catchRadiusMult: 1, rareAssistAdd: 0, lightRadiusMult: 1 };
}

function normalizeDuelMatchRow(row) {
  if (!row) return null;
  return {
    matchId: row.id,
    reefId: row.reef_id || row.reefId,
    hostClientId: row.host_client_id || row.hostClientId,
    guestClientId: row.guest_client_id || row.guestClientId,
    hostUserId: row.host_user_id || row.hostUserId || null,
    guestUserId: row.guest_user_id || row.guestUserId || null,
    inviteUserId: row.invite_user_id || row.inviteUserId || null,
    hostInitials: formatDuelInitials(row.host_initials || row.hostInitials) || "AAA",
    guestInitials: Boolean(row.is_com_guest ?? row.isComGuest)
      ? comGuestDisplayName(row.guest_initials || row.guestInitials)
      : formatDuelInitials(row.guest_initials || row.guestInitials),
    hostCompanionId: normalizeCompanionId(row.host_companion_id ?? row.hostCompanionId),
    guestCompanionId: String(row.guest_companion_id ?? row.guestCompanionId ?? ""),
    hostScore: Math.max(0, Math.floor(Number(row.host_score ?? row.hostScore) || 0)),
    guestScore: Math.max(0, Math.floor(Number(row.guest_score ?? row.guestScore) || 0)),
    roundStartMs: Number(row.round_start_ms ?? row.roundStartMs) || 0,
    roundMs: Number(row.round_ms ?? row.roundMs) || DUEL_ROUND_MS,
    matchKind: row.match_kind || row.matchKind || MATCH_KIND_DUEL,
    isComGuest: Boolean(row.is_com_guest ?? row.isComGuest),
    status: row.status || "lobby",
    ...duelHookFieldsFromRow(row),
  };
}

function duelRoleFromMatch(row) {
  const mine = getDuelClientId();
  if (row.hostClientId === mine) return "host";
  if (row.guestClientId === mine) return "guest";
  return null;
}

function duelPlanFromMatch(row, role) {
  const mode = row.isComGuest ? "com" : "pvp";
  const opponentInitials = duelOpponentInitialsFromRow(row, role);
  const opponentScore = role === "host" ? row.guestScore : row.hostScore;
  return {
    matchId: row.matchId,
    role,
    mode,
    reefId: row.reefId,
    opponentInitials,
    opponentScore,
    opponentCompanionId: opponentCompanionFromRow(row, role),
    hostClientId: row.hostClientId,
    guestClientId: row.guestClientId,
    roundStartMs: row.roundStartMs,
    roundMs: DUEL_ROUND_MS,
    targetScore: mode === "com" ? rollDuelRivalTargetScore() : 0,
  };
}

async function probeDuelBackendReady() {
  const res = await fetch(`${DUEL_MATCH_TABLE_URL}?select=id&limit=1`, { headers: leaderboardHeaders() });
  const { body } = await readDuelResponse(res);
  if (!res.ok) throw new Error(`Duel lobby service error: ${res.status}`);
  return Array.isArray(body);
}

async function fetchDuelMatchById(matchId) {
  const res = await fetch(`${DUEL_MATCH_TABLE_URL}?id=eq.${encodeURIComponent(matchId)}&select=*`, {
    headers: leaderboardHeaders(),
  });
  const { body } = await readDuelResponse(res);
  if (!res.ok) throw new Error(`Duel match fetch failed: ${res.status}`);
  const rows = Array.isArray(body) ? body : [];
  return normalizeDuelMatchRow(rows[0]);
}

async function fetchOldestOpenDuelLobby(matchKind = MATCH_KIND_DUEL, options = {}) {
  const since = new Date(Date.now() - DUEL_LOBBY_MAX_AGE_MS).toISOString();
  const mine = encodeURIComponent(getDuelClientId());
  let url =
    `${DUEL_MATCH_TABLE_URL}?select=*` +
    `&status=eq.lobby&guest_client_id=is.null&host_client_id=neq.${mine}` +
    `&created_at=gte.${encodeURIComponent(since)}`;
  if (duelLobbyMatchKindFilterReady) {
    url += `&match_kind=eq.${encodeURIComponent(matchKind)}`;
  }
  if (duelLobbyInviteFilterReady) {
    if (options.inviteUserId) {
      url += `&invite_user_id=eq.${encodeURIComponent(options.inviteUserId)}`;
    } else {
      url += "&invite_user_id=is.null";
    }
  }
  url += "&order=created_at.asc&limit=1";
  const res = await fetch(url, { headers: leaderboardHeaders() });
  const { body } = await readDuelResponse(res);
  if (!res.ok) {
    if (duelLobbyMatchKindFilterReady && isDuelSchemaColumnError(body)) {
      duelLobbyMatchKindFilterReady = false;
      return fetchOldestOpenDuelLobby(matchKind, options);
    }
    if (duelLobbyInviteFilterReady && isDuelSchemaColumnError(body)) {
      duelLobbyInviteFilterReady = false;
      return fetchOldestOpenDuelLobby(matchKind, options);
    }
    throw new Error(`Duel lobby fetch failed: ${res.status}`);
  }
  const rows = Array.isArray(body) ? body : [];
  return normalizeDuelMatchRow(rows[0]);
}

async function safeFetchOldestOpenDuelLobby(matchKind, options = {}) {
  try {
    return await fetchOldestOpenDuelLobby(matchKind, options);
  } catch (err) {
    console.warn(err);
    return null;
  }
}

async function safeFetchDuelMatchById(matchId) {
  try {
    return await fetchDuelMatchById(matchId);
  } catch (err) {
    console.warn(err);
    return null;
  }
}

async function safeCreateDuelLobby(reefId, roundMs, matchKind, options = {}) {
  try {
    return await createDuelLobby(reefId, roundMs, matchKind, options);
  } catch (err) {
    console.warn(err);
    return null;
  }
}

async function fetchIncomingFriendInviteLobby(matchKind, myUserId) {
  if (!myUserId) return null;
  const since = new Date(Date.now() - DUEL_LOBBY_MAX_AGE_MS).toISOString();
  let url =
    `${DUEL_MATCH_TABLE_URL}?select=*` +
    `&status=eq.lobby&guest_client_id=is.null` +
    `&created_at=gte.${encodeURIComponent(since)}`;
  if (duelLobbyInviteFilterReady) {
    url += `&invite_user_id=eq.${encodeURIComponent(myUserId)}`;
  }
  if (duelLobbyMatchKindFilterReady) {
    url += `&match_kind=eq.${encodeURIComponent(matchKind)}`;
  }
  url += "&order=created_at.asc&limit=1";
  const res = await fetch(url, { headers: leaderboardHeaders() });
  const { body } = await readDuelResponse(res);
  if (!res.ok) {
    if (duelLobbyMatchKindFilterReady && isDuelSchemaColumnError(body)) {
      duelLobbyMatchKindFilterReady = false;
      return fetchIncomingFriendInviteLobby(matchKind, myUserId);
    }
    if (duelLobbyInviteFilterReady && isDuelSchemaColumnError(body)) {
      duelLobbyInviteFilterReady = false;
      return fetchIncomingFriendInviteLobby(matchKind, myUserId);
    }
    return null;
  }
  const rows = Array.isArray(body) ? body : [];
  return normalizeDuelMatchRow(rows[0]);
}

async function createDuelLobby(reefId, roundMs, matchKind = MATCH_KIND_DUEL, options = {}) {
  const payload = {
    reef_id: reefId,
    host_client_id: getDuelClientId(),
    host_initials: getDuelPlayerInitials(),
    host_companion_id: equippedCompanionId(),
    guest_client_id: null,
    guest_initials: "",
    status: "lobby",
    round_ms: roundMs,
    match_kind: matchKind,
    is_com_guest: false,
  };
  if (duelLobbyUserColumnsReady && authUser?.id) payload.host_user_id = authUser.id;
  if (duelLobbyUserColumnsReady && options.inviteUserId) payload.invite_user_id = options.inviteUserId;
  let res = await fetch(DUEL_MATCH_TABLE_URL, {
    method: "POST",
    headers: leaderboardHeaders({
      "Content-Type": "application/json",
      Prefer: "return=representation",
    }),
    body: JSON.stringify(payload),
  });
  let { body } = await readDuelResponse(res);
  if (!res.ok && duelLobbyUserColumnsReady && isDuelSchemaColumnError(body)) {
    duelLobbyUserColumnsReady = false;
    res = await fetch(DUEL_MATCH_TABLE_URL, {
      method: "POST",
      headers: leaderboardHeaders({
        "Content-Type": "application/json",
        Prefer: "return=representation",
      }),
      body: JSON.stringify(stripDuelLobbyUserFields(payload)),
    });
    ({ body } = await readDuelResponse(res));
  }
  if (!res.ok && duelLobbyMatchKindFilterReady && isDuelSchemaColumnError(body)) {
    duelLobbyMatchKindFilterReady = false;
    res = await fetch(DUEL_MATCH_TABLE_URL, {
      method: "POST",
      headers: leaderboardHeaders({
        "Content-Type": "application/json",
        Prefer: "return=representation",
      }),
      body: JSON.stringify(stripDuelLobbyOptionalFields(payload)),
    });
    ({ body } = await readDuelResponse(res));
  }
  if (!res.ok) throw new Error(`Duel lobby create failed: ${res.status}`);
  const rows = Array.isArray(body) ? body : [];
  return normalizeDuelMatchRow(rows[0]);
}

async function tryJoinDuelLobby(lobbyId) {
  const payload = {
    guest_client_id: getDuelClientId(),
    guest_initials: getDuelPlayerInitials(),
    guest_companion_id: equippedCompanionId(),
    status: "active",
    round_start_ms: Date.now() + DUEL_MATCH_START_DELAY_MS,
    is_com_guest: false,
  };
  if (duelLobbyUserColumnsReady && authUser?.id) payload.guest_user_id = authUser.id;
  const patchUrl = `${DUEL_MATCH_TABLE_URL}?id=eq.${encodeURIComponent(lobbyId)}&status=eq.lobby&guest_client_id=is.null`;
  let res = await fetch(patchUrl, {
    method: "PATCH",
    headers: leaderboardHeaders({
      "Content-Type": "application/json",
      Prefer: "return=representation",
    }),
    body: JSON.stringify(payload),
  });
  let { body } = await readDuelResponse(res);
  if (!res.ok && duelLobbyUserColumnsReady && isDuelSchemaColumnError(body)) {
    duelLobbyUserColumnsReady = false;
    res = await fetch(patchUrl, {
      method: "PATCH",
      headers: leaderboardHeaders({
        "Content-Type": "application/json",
        Prefer: "return=representation",
      }),
      body: JSON.stringify(stripDuelLobbyUserFields(payload)),
    });
    ({ body } = await readDuelResponse(res));
  }
  if (!res.ok) return null;
  const rows = Array.isArray(body) ? body : [];
  return normalizeDuelMatchRow(rows[0]);
}

async function activateComDuelGuest(matchId) {
  const res = await fetch(`${DUEL_MATCH_TABLE_URL}?id=eq.${encodeURIComponent(matchId)}`, {
    method: "PATCH",
    headers: leaderboardHeaders({
      "Content-Type": "application/json",
      Prefer: "return=representation",
    }),
    body: JSON.stringify({
      guest_client_id: `com-${matchId}`,
      guest_initials: rollComPlayerName(),
      guest_companion_id: COM_COMPANION_ID,
      is_com_guest: true,
      status: "active",
      round_start_ms: Date.now() + DUEL_MATCH_START_DELAY_MS,
    }),
  });
  if (!res.ok) throw new Error(`Duel COM fallback failed: ${res.status}`);
  const rows = await res.json();
  return normalizeDuelMatchRow(rows[0]);
}

async function cancelDuelLobbyIfHost(matchId) {
  if (!matchId) return;
  try {
    await fetch(
      `${DUEL_MATCH_TABLE_URL}?id=eq.${encodeURIComponent(matchId)}&status=eq.lobby&host_client_id=eq.${encodeURIComponent(getDuelClientId())}`,
      {
        method: "PATCH",
        headers: leaderboardHeaders({
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        }),
        body: JSON.stringify({ status: "cancelled" }),
      },
    );
  } catch (err) {
    console.warn(err);
  }
}

async function pushDuelMatchState() {
  if (!duelSession?.matchId || duelSession.mode !== "pvp" || !duelSession.role) return;
  const scoreField = duelSession.role === "host" ? "host_score" : "guest_score";
  const payload = { [scoreField]: score };
  if (duelHookSyncEnabled) {
    const xField = duelSession.role === "host" ? "host_hook_x_pct" : "guest_hook_x_pct";
    const yField = duelSession.role === "host" ? "host_hook_y_pct" : "guest_hook_y_pct";
    const castField = duelSession.role === "host" ? "host_hook_cast" : "guest_hook_cast";
    payload[xField] = duelLocalHookXPct(hook.x);
    payload[yField] = duelLocalHookYPct(hook.tipY);
    payload[castField] = duelHookCastCode(hook.castState);
  }
  try {
    const res = await fetch(`${DUEL_MATCH_TABLE_URL}?id=eq.${encodeURIComponent(duelSession.matchId)}`, {
      method: "PATCH",
      headers: leaderboardHeaders({
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      }),
      body: JSON.stringify(payload),
    });
    if (!res.ok && duelHookSyncEnabled && Object.keys(payload).length > 1) {
      const errText = await res.text();
      if (errText.includes("hook") || errText.includes("PGRST204")) {
        duelHookSyncEnabled = false;
        await fetch(`${DUEL_MATCH_TABLE_URL}?id=eq.${encodeURIComponent(duelSession.matchId)}`, {
          method: "PATCH",
          headers: leaderboardHeaders({
            "Content-Type": "application/json",
            Prefer: "return=minimal",
          }),
          body: JSON.stringify({ [scoreField]: score }),
        });
      }
    }
  } catch (err) {
    console.warn(err);
  }
}

async function pollDuelOpponentFromMatch() {
  if (!duelSession?.matchId || duelSession.mode !== "pvp" || !duelSession.role) return;
  try {
    const row = await fetchDuelMatchById(duelSession.matchId);
    if (!row) return;
    const opp = duelSession.role === "host" ? row.guestScore : row.hostScore;
    const oppIni = duelOpponentInitialsFromRow(row, duelSession.role);
    let hudDirty = false;
    if (opp > duelSession.opponentScore) {
      duelSession.opponentHook.snagPulse = Math.max(duelSession.opponentHook.snagPulse, 300);
    }
    if (opp !== duelSession.opponentScore) {
      duelSession.opponentScore = opp;
      hudDirty = true;
    }
    if (oppIni && oppIni !== "Rival" && oppIni !== duelSession.opponentInitials) {
      duelSession.opponentInitials = oppIni;
      hudDirty = true;
    }
    const remote =
      duelSession.role === "host"
        ? { xPct: row.guestHookX, yPct: row.guestHookY, cast: row.guestHookCast }
        : { xPct: row.hostHookX, yPct: row.hostHookY, cast: row.hostHookCast };
    duelSession.remoteHook = remote;
    if (hudDirty) updateDuelHudScores(false);
  } catch (err) {
    console.warn(err);
  }
}

async function finishDuelMatchOnServer(session, finalScore) {
  if (!session?.matchId || session.mode !== "pvp" || !session.role) return;
  const scoreField = session.role === "host" ? "host_score" : "guest_score";
  try {
    await fetch(`${DUEL_MATCH_TABLE_URL}?id=eq.${encodeURIComponent(session.matchId)}`, {
      method: "PATCH",
      headers: leaderboardHeaders({
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      }),
      body: JSON.stringify({
        status: "finished",
        [scoreField]: finalScore,
      }),
    });
  } catch (err) {
    console.warn(err);
  }
}

async function pushDuelMatchStateNow() {
  if (duelSession) duelSession.lastStatePush = 0;
  await pushDuelMatchState();
}

async function resolveDuelFinalScores(localPlayerScore, session) {
  if (!session?.matchId || session.mode !== "pvp" || !session.role) {
    return { playerScore: localPlayerScore, opponentScore: session?.opponentScore || 0 };
  }
  await pushDuelMatchStateNow();
  await finishDuelMatchOnServer(session, localPlayerScore);

  let opponentScore = session.opponentScore || 0;
  for (let i = 0; i < 5; i++) {
    if (i > 0) await duelSleep(250);
    const row = await fetchDuelMatchById(session.matchId);
    if (!row) continue;
    opponentScore = session.role === "host" ? row.guestScore : row.hostScore;
  }
  return { playerScore: localPlayerScore, opponentScore };
}

let duelLobbyCountdownTimer = null;

function updateDuelLobbyCountdown(secondsLeft, label = "Trying to find a rival") {
  if (!duelLobbyCountdown) return;
  duelLobbyCountdown.hidden = false;
  duelLobbyCountdown.setAttribute("aria-hidden", "false");
  if (duelLobbyCountdownLabel) duelLobbyCountdownLabel.textContent = label;
  if (duelLobbyCountdownValue) {
    duelLobbyCountdownValue.textContent = String(Math.max(0, Math.ceil(secondsLeft)));
  }
}

function hideDuelLobbyCountdown() {
  if (duelLobbyCountdownTimer) {
    clearInterval(duelLobbyCountdownTimer);
    duelLobbyCountdownTimer = null;
  }
  if (!duelLobbyCountdown) return;
  duelLobbyCountdown.hidden = true;
  duelLobbyCountdown.setAttribute("aria-hidden", "true");
}

function startDuelLobbyCountdown(deadlineMs, label = "Trying to find a rival") {
  hideDuelLobbyCountdown();
  const tick = () => {
    const secsLeft = Math.max(0, (deadlineMs - Date.now()) / 1000);
    updateDuelLobbyCountdown(secsLeft, label);
    if (secsLeft <= 0 && duelLobbyCountdownTimer) {
      clearInterval(duelLobbyCountdownTimer);
      duelLobbyCountdownTimer = null;
    }
  };
  tick();
  duelLobbyCountdownTimer = setInterval(tick, 250);
}

function setDuelMatchmakingUi(active, message = "") {
  duelMatchmakingActive = active;
  if (!active) hideDuelLobbyCountdown();
  if (duelEventStatus) {
    duelEventStatus.hidden = !active || !message;
    duelEventStatus.textContent = message;
  }
  if (btnStartDuel) {
    btnStartDuel.disabled = active || getDuelTicketCount() <= 0;
    if (active) btnStartDuel.textContent = "Searching…";
    else refreshDuelEventCard();
  }
}

async function findOnlineMatch(matchKind, roundMs, deadlineMs, friendUserId = null) {
  const isCoop = matchKind === MATCH_KIND_COOP;
  const setUi = isCoop ? setCoopMatchmakingUi : setDuelMatchmakingUi;
  const partnerWord = isCoop ? "partner" : "rival";
  const comLine = isCoop ? "No partner found — matching a random angler…" : "No rival found — matching a random angler…";
  const hideCountdown = isCoop ? hideCoopLobbyCountdown : hideDuelLobbyCountdown;
  const planFromMatch = isCoop ? coopPlanFromMatch : duelPlanFromMatch;
  const buildLocalComPlan = isCoop ? buildLocalComCoopPlan : buildLocalComDuelPlan;
  const cancelLobbyIfHost = isCoop ? cancelCoopLobbyIfHost : cancelDuelLobbyIfHost;
  let hostedMatchId = isCoop ? coopLobbyMatchId : duelLobbyMatchId;
  const friendProfile = friendUserId ? socialFriends.find((f) => f.userId === friendUserId) : null;
  const friendLabel = friendProfile?.displayName || "friend";
  const lobbyFetchOptions = friendUserId ? { inviteUserId: authUser?.id } : {};

  setUi(
    true,
    friendUserId ? `Waiting for ${friendLabel}…` : `Trying to find a ${partnerWord}…`,
  );

  const startedAt = Date.now();
  const createAfterMs = startedAt + DUEL_LOBBY_CREATE_GRACE_MS;
  let backendReady = false;

  while (Date.now() < deadlineMs) {
    if (isDuelMatchmakingCancelled(isCoop)) {
      throw new Error(isCoop ? "Co-op matchmaking cancelled" : "Duel matchmaking cancelled");
    }

    try {
      if (!backendReady) {
        await probeDuelBackendReady();
        backendReady = true;
      }

      if (friendUserId) {
        const incoming = await fetchIncomingFriendInviteLobby(matchKind, authUser?.id);
        if (incoming?.matchId && incoming.hostUserId === friendUserId) {
          const joined = await tryJoinDuelLobby(incoming.matchId);
          if (joined) {
            const role = duelRoleFromMatch(joined);
            if (role) {
              if (hostedMatchId && hostedMatchId !== joined.matchId) {
                await cancelLobbyIfHost(hostedMatchId);
              }
              if (isCoop) coopLobbyMatchId = null;
              else duelLobbyMatchId = null;
              duelPendingReefId = joined.reefId;
              hideCountdown();
              return planFromMatch(joined, role);
            }
          }
        }
      } else if (authUser?.id) {
        const incoming = await fetchIncomingFriendInviteLobby(matchKind, authUser.id);
        if (incoming?.matchId) {
          const joined = await tryJoinDuelLobby(incoming.matchId);
          if (joined) {
            const role = duelRoleFromMatch(joined);
            if (role) {
              if (hostedMatchId && hostedMatchId !== joined.matchId) {
                await cancelLobbyIfHost(hostedMatchId);
              }
              if (isCoop) coopLobbyMatchId = null;
              else duelLobbyMatchId = null;
              duelPendingReefId = joined.reefId;
              hideCountdown();
              return planFromMatch(joined, role);
            }
          }
        }
      }

      const lobby = await safeFetchOldestOpenDuelLobby(matchKind, lobbyFetchOptions);
      if (lobby?.matchId && (!friendUserId || lobby.hostUserId === friendUserId)) {
        const joined = await tryJoinDuelLobby(lobby.matchId);
        if (joined) {
          const role = duelRoleFromMatch(joined);
          if (role) {
            if (hostedMatchId && hostedMatchId !== joined.matchId) {
              await cancelLobbyIfHost(hostedMatchId);
            }
            if (isCoop) coopLobbyMatchId = null;
            else duelLobbyMatchId = null;
            duelPendingReefId = joined.reefId;
            hideCountdown();
            return planFromMatch(joined, role);
          }
        }
      }

      if (!hostedMatchId && Date.now() >= createAfterMs) {
        const reefId = isCoop ? pickMinigameReef("coop").id : pickRandomDuelReefId(duelLastReefId);
        duelPendingReefId = reefId;
        const created = await safeCreateDuelLobby(reefId, roundMs, matchKind, {
          inviteUserId: friendUserId || null,
        });
        if (created?.matchId) {
          hostedMatchId = created.matchId;
          if (isCoop) coopLobbyMatchId = hostedMatchId;
          else duelLobbyMatchId = hostedMatchId;
        }
      } else if (hostedMatchId) {
        const row = await safeFetchDuelMatchById(hostedMatchId);
        if (!row || row.status === "cancelled") {
          hostedMatchId = null;
          if (isCoop) coopLobbyMatchId = null;
          else duelLobbyMatchId = null;
        } else if (row.guestClientId && !row.isComGuest) {
          hideCountdown();
          if (isCoop) coopLobbyMatchId = null;
          else duelLobbyMatchId = null;
          return planFromMatch(row, "host");
        }
      }
    } catch (err) {
      if (isDuelBackendMissingError(err)) throw err;
      if (/cancelled/i.test(String(err?.message || ""))) throw err;
      console.warn(err);
    }

    await duelSleep(DUEL_LOBBY_POLL_MS);
  }

  if (hostedMatchId) {
    hideCountdown();
    if (friendUserId) {
      setUi(true, `${friendLabel} didn't join — matching a random angler…`);
    } else {
      setUi(true, comLine);
    }
    try {
      const comRow = await activateComDuelGuest(hostedMatchId);
      if (isCoop) coopLobbyMatchId = null;
      else duelLobbyMatchId = null;
      return planFromMatch(comRow, "host");
    } catch (err) {
      console.warn(err);
    }
  }

  hideCountdown();
  setUi(true, comLine);
  if (!isCoop) {
    showToast(`No live rival after ${DUEL_LOBBY_TIMEOUT_SEC}s — random angler instead.`, 2800);
  } else {
    showToast("No live partner found in time — random angler instead.", 2800);
  }
  const reefId = isCoop ? pickMinigameReef("coop").id : pickRandomDuelReefId(duelLastReefId);
  duelPendingReefId = reefId;
  return buildLocalComPlan(reefId);
}

async function findDuelMatchOnline(roundMs, deadlineMs, friendUserId = null) {
  return findOnlineMatch(MATCH_KIND_DUEL, roundMs, deadlineMs, friendUserId);
}

async function findCoopMatchOnline(roundMs, deadlineMs, friendUserId = null) {
  return findOnlineMatch(MATCH_KIND_COOP, roundMs, deadlineMs, friendUserId);
}

async function waitForDuelRoundStart(plan) {
  await waitForOnlineRoundStart(plan, { mode: "duel" });
}

function buildLocalComDuelPlan(reefId) {
  const reef = REEFS.find((r) => r.id === reefId) || REEFS[0];
  return {
    matchId: null,
    role: "host",
    mode: "com",
    reefId: reef.id,
    opponentInitials: rollComPlayerName(),
    opponentCompanionId: COM_COMPANION_ID,
    opponentScore: 0,
    roundStartMs: Date.now() + DUEL_MATCH_START_DELAY_MS,
    roundMs: DUEL_ROUND_MS,
    targetScore: rollDuelRivalTargetScore(),
  };
}

function coopPlanFromMatch(row, role) {
  const mode = row.isComGuest ? "com" : "pvp";
  const partnerInitials = duelOpponentInitialsFromRow(row, role);
  const partnerScore = role === "host" ? row.guestScore : row.hostScore;
  return {
    matchId: row.matchId,
    role,
    mode,
    reefId: row.reefId,
    partnerInitials,
    partnerScore,
    partnerCompanionId: opponentCompanionFromRow(row, role),
    roundStartMs: row.roundStartMs,
    roundMs: MINIGAME_COOP_MS,
    partnerTarget: mode === "com" ? rollCoopPartnerTargetScore() : 0,
    pacingBias: 0.72 + Math.random() * 0.16,
  };
}

function buildLocalComCoopPlan(reefId) {
  const reef = REEFS.find((r) => r.id === reefId) || REEFS[0];
  return {
    matchId: null,
    role: "host",
    mode: "com",
    reefId: reef.id,
    partnerInitials: rollComPlayerName(),
    partnerCompanionId: COM_COMPANION_ID,
    partnerScore: 0,
    roundStartMs: Date.now() + DUEL_MATCH_START_DELAY_MS,
    roundMs: MINIGAME_COOP_MS,
    partnerTarget: rollCoopPartnerTargetScore(),
    pacingBias: 0.72 + Math.random() * 0.16,
  };
}

async function cancelCoopLobbyIfHost(matchId) {
  return cancelDuelLobbyIfHost(matchId);
}

async function resolveDuelMatchPlan(deadlineMs) {
  try {
    return await findDuelMatchOnline(DUEL_ROUND_MS, deadlineMs, getPendingFriendUserId());
  } catch (err) {
    console.warn(err);
    if (duelLobbyMatchId) {
      await cancelDuelLobbyIfHost(duelLobbyMatchId);
      duelLobbyMatchId = null;
    }
    if (isDuelBackendMissingError(err)) throw err;
    if (/cancelled/i.test(String(err?.message || ""))) throw err;
    const msg = String(err?.message || "");
    if (isDuelOpenedFromLocalFile()) {
      showToast(
        "Duel matchmaking needs the live site — open juliette-jason.github.io/reef-rush (not a local file).",
        5200,
      );
    } else if (/lobby service|lobby fetch|lobby create|network|failed to fetch/i.test(msg)) {
      showToast("Couldn't reach duel servers — playing vs a random rival instead.", 3000);
    } else {
      showToast(`No live rival after ${DUEL_LOBBY_TIMEOUT_SEC}s — random angler instead.`, 2800);
    }
    const reefId = pickRandomDuelReefId(duelLastReefId);
    duelPendingReefId = reefId;
    return buildLocalComDuelPlan(reefId);
  }
}

async function resolveCoopMatchPlan(deadlineMs) {
  try {
    return await findCoopMatchOnline(MINIGAME_COOP_MS, deadlineMs, getPendingFriendUserId());
  } catch (err) {
    console.warn(err);
    if (coopLobbyMatchId) {
      await cancelCoopLobbyIfHost(coopLobbyMatchId);
      coopLobbyMatchId = null;
    }
    if (isDuelBackendMissingError(err)) throw err;
    const msg = String(err?.message || "");
    if (/lobby service|lobby fetch|lobby create|network|failed to fetch/i.test(msg)) {
      showToast("Couldn't reach co-op servers — random partner instead.", 3000);
    } else {
      showToast("No live partner found in time — random angler instead.", 2800);
    }
    const reef = pickMinigameReef("coop");
    return buildLocalComCoopPlan(reef.id);
  }
}

function updateCoopLobbyCountdown(secondsLeft, label = "Trying to find a partner") {
  if (!coopLobbyCountdown) return;
  coopLobbyCountdown.hidden = false;
  coopLobbyCountdown.setAttribute("aria-hidden", "false");
  if (coopLobbyCountdownLabel) coopLobbyCountdownLabel.textContent = label;
  if (coopLobbyCountdownValue) {
    coopLobbyCountdownValue.textContent = String(Math.max(0, Math.ceil(secondsLeft)));
  }
}

function hideCoopLobbyCountdown() {
  if (coopLobbyCountdownTimer) {
    clearInterval(coopLobbyCountdownTimer);
    coopLobbyCountdownTimer = null;
  }
  if (!coopLobbyCountdown) return;
  coopLobbyCountdown.hidden = true;
  coopLobbyCountdown.setAttribute("aria-hidden", "true");
}

function startCoopLobbyCountdown(deadlineMs, label = "Trying to find a partner") {
  hideCoopLobbyCountdown();
  const tick = () => {
    const secsLeft = Math.max(0, (deadlineMs - Date.now()) / 1000);
    updateCoopLobbyCountdown(secsLeft, label);
    if (secsLeft <= 0 && coopLobbyCountdownTimer) {
      clearInterval(coopLobbyCountdownTimer);
      coopLobbyCountdownTimer = null;
    }
  };
  tick();
  coopLobbyCountdownTimer = setInterval(tick, 250);
}

function setCoopMatchmakingUi(active, message = "") {
  coopMatchmakingActive = active;
  if (!active) hideCoopLobbyCountdown();
  if (coopEventStatus) {
    coopEventStatus.hidden = !active || !message;
    coopEventStatus.textContent = message;
  }
  const btn = document.getElementById("btnStartCoop");
  if (btn) {
    btn.disabled = active || getDuelTicketCount() <= 0;
    if (active) btn.textContent = "Searching…";
    else refreshCoopEventCard();
  }
}

function formatCoopEventMatchupLine() {
  return "Enter the lobby — match a real partner, or team with a random angler if nobody's waiting.";
}

function refreshCoopEventCard() {
  if (coopMatchmakingActive) return;
  const tickets = getDuelTicketCount();
  const ticketEl = document.getElementById("coopEventTickets");
  const btn = document.getElementById("btnStartCoop");
  if (ticketEl) ticketEl.textContent = `Tickets: ${tickets}`;
  coopPendingTargetScore = rollCoopPartnerTargetScore();
  if (coopEventMatchup) coopEventMatchup.textContent = formatCoopEventMatchupLine();
  const previewReef = REEFS[Math.floor(Math.random() * REEFS.length)] || REEFS[0];
  if (coopEventReef) {
    coopEventReef.textContent = `Random reef each haul (e.g. ${previewReef.name}) · 60 seconds · solo fallback ${coopPendingTargetScore.toLocaleString()} pts`;
  }
  if (btn) {
    btn.disabled = tickets <= 0;
    btn.textContent = tickets <= 0 ? "No tickets — visit shop" : "Find co-op partner";
  }
}

function isCoopPvpSession() {
  return Boolean(eventMinigameSession?.kind === "coop" && eventMinigameSession.mode === "pvp");
}

function getCoopPartnerDisplayName() {
  const s = eventMinigameSession;
  if (!s || s.kind !== "coop") return "Partner";
  if (s.mode === "com") return comGuestDisplayName(s.partnerInitials);
  return formatDuelInitials(s.partnerInitials) || "Partner";
}

async function pushCoopMatchState() {
  const s = eventMinigameSession;
  if (!s || s.kind !== "coop" || s.mode !== "pvp" || !s.matchId || !s.role) return;
  const scoreField = s.role === "host" ? "host_score" : "guest_score";
  try {
    await fetch(`${DUEL_MATCH_TABLE_URL}?id=eq.${encodeURIComponent(s.matchId)}`, {
      method: "PATCH",
      headers: leaderboardHeaders({
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      }),
      body: JSON.stringify({ [scoreField]: score }),
    });
  } catch (err) {
    console.warn(err);
  }
}

async function pushCoopMatchStateNow() {
  if (eventMinigameSession?.kind === "coop") eventMinigameSession.lastStatePush = 0;
  await pushCoopMatchState();
}

function scheduleCoopScoreSync() {
  if (!isCoopPvpSession() || !eventMinigameSession) return;
  const now = performance.now();
  if (now - (eventMinigameSession.lastStatePush || 0) < COOP_STATE_SYNC_MS) return;
  eventMinigameSession.lastStatePush = now;
  void pushCoopMatchState();
}

async function pollCoopPartnerFromMatch() {
  const s = eventMinigameSession;
  if (!s || s.kind !== "coop" || s.mode !== "pvp" || !s.matchId || !s.role) return;
  try {
    const row = await fetchDuelMatchById(s.matchId);
    if (!row) return;
    const partner = s.role === "host" ? row.guestScore : row.hostScore;
    const partnerIni = duelOpponentInitialsFromRow(row, s.role);
    if (partner !== s.partnerScore) {
      s.partnerScore = partner;
      syncCoopHud(true);
    }
    if (partnerIni && partnerIni !== s.partnerInitials) {
      s.partnerInitials = partnerIni;
      syncCoopHud(true);
    }
  } catch (err) {
    console.warn(err);
  }
}

async function finishCoopMatchOnServer(session, finalScore) {
  if (!session?.matchId || session.mode !== "pvp" || !session.role) return;
  const scoreField = session.role === "host" ? "host_score" : "guest_score";
  try {
    await fetch(`${DUEL_MATCH_TABLE_URL}?id=eq.${encodeURIComponent(session.matchId)}`, {
      method: "PATCH",
      headers: leaderboardHeaders({
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      }),
      body: JSON.stringify({
        status: "finished",
        [scoreField]: finalScore,
      }),
    });
  } catch (err) {
    console.warn(err);
  }
}

async function resolveCoopFinalPartnerScore(session, localScore) {
  if (!session?.matchId || session.mode !== "pvp" || !session.role) {
    return Math.max(0, session?.partnerScore || 0);
  }
  const savedScore = score;
  score = localScore;
  await pushCoopMatchStateNow();
  await finishCoopMatchOnServer(session, localScore);
  score = savedScore;
  let partnerScore = session.partnerScore || 0;
  for (let i = 0; i < 5; i++) {
    if (i > 0) await duelSleep(250);
    const row = await fetchDuelMatchById(session.matchId);
    if (!row) continue;
    partnerScore = session.role === "host" ? row.guestScore : row.hostScore;
  }
  return partnerScore;
}

async function waitForCoopRoundStart(plan) {
  await waitForOnlineRoundStart(plan, { mode: "coop" });
}

let onlineMatchupTimer = null;

function showOnlineMatchup({
  mode,
  relation,
  playerName,
  rivalName,
  playerCompanionId,
  rivalCompanionId,
  reefName,
  deadlineMs,
}) {
  hideOnlineMatchup();
  if (!onlineMatchup) return;
  onlineMatchup.hidden = false;
  onlineMatchup.setAttribute("aria-hidden", "false");
  onlineMatchup.classList.toggle("online-matchup--coop", mode === "coop");
  onlineMatchup.classList.toggle("online-matchup--duel", mode === "duel");
  if (onlineMatchupHeadline) onlineMatchupHeadline.textContent = relation;
  if (onlineMatchupPlayerName) onlineMatchupPlayerName.textContent = playerName;
  if (onlineMatchupRivalName) onlineMatchupRivalName.textContent = rivalName;
  if (onlineMatchupPlayerAvatar) {
    mountCompanionAvatar(onlineMatchupPlayerAvatar, playerCompanionId, {
      frameId: equippedAvatarFrameId(),
      artClass: "online-matchup__art",
    });
  }
  if (onlineMatchupRivalAvatar) {
    mountCompanionAvatar(onlineMatchupRivalAvatar, rivalCompanionId, {
      artClass: "online-matchup__art",
    });
  }
  if (onlineMatchupReef) onlineMatchupReef.textContent = reefName || "";
  const tick = () => {
    const secsLeft = Math.max(0, (deadlineMs - Date.now()) / 1000);
    if (onlineMatchupCountdown) {
      onlineMatchupCountdown.textContent = secsLeft > 0 ? String(Math.ceil(secsLeft)) : "GO!";
    }
  };
  tick();
  onlineMatchupTimer = setInterval(tick, 200);
}

function hideOnlineMatchup() {
  if (onlineMatchupTimer) {
    clearInterval(onlineMatchupTimer);
    onlineMatchupTimer = null;
  }
  if (!onlineMatchup) return;
  onlineMatchup.hidden = true;
  onlineMatchup.setAttribute("aria-hidden", "true");
}

async function waitForOnlineRoundStart(plan, { mode }) {
  const isCoop = mode === "coop";
  const now = Date.now();
  const matchupDeadline = now + ONLINE_MATCHUP_DISPLAY_MS;
  const waitMs = Math.max(ONLINE_MATCHUP_DISPLAY_MS, Math.max(0, (plan.roundStartMs || 0) - now));
  const reef = REEFS.find((r) => r.id === plan.reefId);
  const rivalName =
    plan.mode === "com"
      ? comGuestDisplayName(isCoop ? plan.partnerInitials : plan.opponentInitials)
      : formatDuelInitials(isCoop ? plan.partnerInitials : plan.opponentInitials) ||
        (isCoop ? "Partner" : "Rival");
  const rivalCompanionId =
    plan.mode === "com"
      ? COM_COMPANION_ID
      : normalizeCompanionId(isCoop ? plan.partnerCompanionId : plan.opponentCompanionId);

  hideAllPanels();
  if (eventsOcean) eventsOcean.hidden = true;
  appRoot?.classList.remove("app--events-mode");
  appRoot?.classList.add("app--matchup");

  showOnlineMatchup({
    mode,
    relation: isCoop ? "Fishing with" : "Fishing against",
    playerName: getDuelPlayerInitials(),
    rivalName,
    playerCompanionId: equippedCompanionId(),
    rivalCompanionId,
    reefName: reef ? `${isCoop ? "Co-op" : "Duel"} · ${reef.name}` : "",
    deadlineMs: matchupDeadline,
  });

  if (isCoop) setCoopMatchmakingUi(false);
  else setDuelMatchmakingUi(false);

  await duelSleep(waitMs);
  hideOnlineMatchup();
  appRoot?.classList.remove("app--matchup");
}

function scheduleDuelStateSync(force = false) {
  if (!isDuelPvpSession() || !duelSession) return;
  const now = performance.now();
  if (!force && now - (duelSession.lastStatePush || 0) < DUEL_STATE_SYNC_MS) return;
  duelSession.lastStatePush = now;
  void pushDuelMatchState();
}

function scheduleDuelScoreSync() {
  scheduleDuelStateSync(true);
}

function updateDuelHudLabels() {
  if (isDuelSpectatorSession() && duelSession) {
    if (duelHudPlayerLabel) duelHudPlayerLabel.textContent = duelSession.hostInitials || "Host";
    if (duelHudOpponentLabel) duelHudOpponentLabel.textContent = duelSession.guestInitials || "Guest";
    return;
  }
  if (duelHudPlayerLabel) {
    duelHudPlayerLabel.textContent = isDuelPvpSession() ? getDuelPlayerInitials() : "You";
  }
  if (duelHudOpponentLabel && duelSession) {
    duelHudOpponentLabel.textContent = getDuelOpponentDisplayName();
  }
}

function formatDuelEventMatchupLine() {
  return isPhoneDevice()
    ? "Match a real player, or face a random rival — on phones you only see your side."
    : "Enter the lobby — match a real player, or face a random rival if nobody's waiting.";
}

function refreshDuelTicketsForToday() {
  const today = getDailyDayKey();
  if (gameMeta.duelTicketsDayKey === today) return;
  gameMeta.duelTickets = DUEL_DAILY_TICKETS;
  gameMeta.duelTicketsDayKey = today;
  saveMeta();
}

function getDuelTicketCount() {
  refreshDuelTicketsForToday();
  return Math.max(0, Math.floor(Number(gameMeta.duelTickets) || 0));
}

function spendDuelTicket() {
  refreshDuelTicketsForToday();
  if (gameMeta.duelTickets <= 0) return false;
  gameMeta.duelTickets -= 1;
  saveMeta();
  return true;
}

function isPhoneDevice() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  if (/iPhone|iPod|Windows Phone|webOS|BlackBerry|Opera Mini|IEMobile/i.test(ua)) return true;
  if (/Android/i.test(ua) && /Mobile/i.test(ua)) return true;
  if (typeof window.matchMedia === "function") {
    const narrowTouch =
      window.matchMedia("(max-width: 767px)").matches && window.matchMedia("(pointer: coarse)").matches;
    if (narrowTouch && !isChromebookOrIPad()) return true;
  }
  return false;
}

function isDuelAvailableOnThisDevice() {
  return true;
}

function isDuelSoloView() {
  return isDuelActive() && !isDuelSpectatorSession() && isPhoneDevice();
}

function duelPlayerMaxX() {
  return isDuelSoloView() ? w : duelHalfW();
}

function isDuelActive() {
  return Boolean(duelSession);
}

function duelHalfW() {
  return w * 0.5;
}

function duelSideCenter(side) {
  if (side === "player") return duelPlayerMaxX() * 0.5;
  return duelHalfW() * 1.5;
}

function pickRandomDuelReefId(avoidId = null) {
  const pool =
    avoidId && REEFS.length > 1 ? REEFS.filter((r) => r.id !== avoidId) : REEFS;
  return pool[Math.floor(Math.random() * pool.length)].id;
}

function getPlayerPersonalBestScoreRaw() {
  const board = loadLeaderboard();
  const ini = gameMeta.playerInitials;
  let best = 0;
  for (const row of board) {
    if (!ini || row.initials === ini) best = Math.max(best, row.score);
  }
  const daily = normalizeDailyLeaderboardRows(loadLocalDailyLeaderboard());
  for (const row of daily) {
    if (!ini || row.initials === ini) best = Math.max(best, row.score);
  }
  if (lastRoundScore > best) best = lastRoundScore;
  return best;
}

function getPlayerPersonalBestScore() {
  return Math.max(150, getPlayerPersonalBestScoreRaw());
}

function getDuelRivalTargetBounds() {
  const best = getPlayerPersonalBestScoreRaw();
  const hard = Math.max(DUEL_RIVAL_MIN_TARGET, best);
  return { easy: DUEL_RIVAL_MIN_TARGET, hard, best };
}

function rollDuelRivalTargetScore() {
  const { easy, hard } = getDuelRivalTargetBounds();
  if (hard <= easy) return easy;
  return easy + Math.floor(Math.random() * (hard - easy + 1));
}

function rollCoopPartnerTargetScore() {
  const duelTarget = rollDuelRivalTargetScore();
  const scale = 0.48 + Math.random() * 0.14;
  return Math.max(1600, Math.floor(duelTarget * scale));
}

function coopTierForScore(pts) {
  if (pts < MINIGAME_COOP_CHEST_MIN) return null;
  if (pts >= MINIGAME_COOP_LEGENDARY_MIN) return "legendary";
  if (pts >= MINIGAME_COOP_RARE_MIN) return "rare";
  return "common";
}

function formatDuelRivalMatchupLine(targetScore) {
  const { easy, hard, best } = getDuelRivalTargetBounds();
  if (hard > easy) {
    return `Practice rival targets ${targetScore} pts (${easy.toLocaleString()} easy · up to ${hard.toLocaleString()} from your ${best.toLocaleString()} best).`;
  }
  return `Practice rival targets ${targetScore} pts (${easy.toLocaleString()} minimum difficulty).`;
}

function createOpponentHook() {
  const half = duelHalfW();
  const cx = half * 0.5;
  return {
    x: cx,
    targetX: cx,
    tipY: 0,
    castState: "idle",
    castTimer: 0,
    castFromY: 0,
    castToY: 0,
    castRiseTargetY: 0,
    snagPulse: 0,
    castCooldown: 700 + Math.random() * 1400,
    aimTimer: 0,
  };
}

function refreshDuelEventCard() {
  if (!duelEventMatchup || !duelEventReef) return;
  if (duelMatchmakingActive) return;
  refreshDuelTicketsForToday();
  const tickets = getDuelTicketCount();
  const phone = isPhoneDevice();

  if (eventCardDuel) eventCardDuel.classList.remove("event-card--duel-unavailable");
  if (duelEventUnavailable) {
    duelEventUnavailable.hidden = !phone;
    if (phone) duelEventUnavailable.textContent = "On phones you see only your side — rival score stays in the HUD.";
  }
  if (eventsTicketCount) eventsTicketCount.textContent = String(tickets);
  if (duelEventTickets) {
    duelEventTickets.textContent = `${DUEL_DAILY_TICKETS} free daily · extra in shop (700 coins)`;
  }

  duelPendingTargetScore = rollDuelRivalTargetScore();
  duelEventMatchup.textContent = formatDuelEventMatchupLine();
  const previewReef = REEFS[Math.floor(Math.random() * REEFS.length)] || REEFS[0];
  duelEventReef.textContent = `Random reef each duel (e.g. ${previewReef.name}) · 1:00 round · solo fallback ${duelPendingTargetScore.toLocaleString()} pts`;

  if (btnStartDuel) {
    btnStartDuel.disabled = tickets <= 0;
    if (tickets <= 0) btnStartDuel.textContent = "No tickets — visit shop";
    else btnStartDuel.textContent = "Find duel rival";
  }
  void refreshDuelSpectatorList();
}

function updateDuelHudScores(syncState = true) {
  if (!duelHud || !duelHudPlayerScore || !duelHudOpponentScore) return;
  duelHudPlayerScore.textContent = String(score);
  duelHudOpponentScore.textContent = String(duelSession?.opponentScore || 0);
  if (scoreDisplay && isDuelActive()) scoreDisplay.textContent = String(score);
  updateDuelHudLabels();
  if (syncState) scheduleDuelScoreSync();
}

function showDuelHud() {
  if (duelHud) duelHud.hidden = false;
  updateDuelHudLabels();
  updateDuelHudScores();
}

function hideDuelHud() {
  if (duelHud) duelHud.hidden = true;
}

function duelExpectedOpponentScore(now) {
  if (!duelSession) return 0;
  const elapsed = now - duelSession.roundStart;
  const t = Math.min(1, Math.max(0, elapsed / DUEL_ROUND_MS));
  const ease = t * t * (3 - 2 * t);
  return Math.floor(duelSession.targetScore * ease * duelSession.pacingBias);
}

function spawnFishInDuelHalf(side) {
  const spec = pickSpecies();
  const big = BIG_CRITTER_MORPHS.has(spec.morph);
  const len =
    SIZE[spec.size].length *
    dpr *
    (spec.morph === "manta" ? 1.55 : spec.morph === "seal" ? 1.78 : big ? 1.4 : 1);
  const reef = getReef();
  const half = duelHalfW();
  const playerMax = duelPlayerMaxX();
  const xMin = side === "player" ? 0 : half;
  const xMax = side === "player" ? playerMax : w;
  const fromLeft = Math.random() < 0.5;
  const trench = reef.id === "mariana_trench";
  const minY = trench ? waterTop + waterH * 0.32 : waterTop + len;
  const maxY = trench ? h - dpr * 95 : waterTop + waterH - len - dpr * 80;
  const y = minY + Math.random() * Math.max(len, maxY - minY);
  const base = (0.56 + Math.random() * 0.48) * dpr;
  const jitter = 0.85 + Math.random() * 0.34;
  const speed =
    base * spec.speed * jitter * (spec.size === "small" ? 1.12 : spec.size === "medium" ? 1.06 : 1) * reef.fishSpeed;
  const fish = {
    spec,
    x: fromLeft ? xMin - len : xMax + len,
    y,
    homeY: y,
    vx: fromLeft ? speed : -speed,
    len,
    phase: Math.random() * Math.PI * 2,
    caught: false,
  };
  if (side === "player") fishList.push(fish);
  else duelSession.opponentFish.push(fish);
}

function countUncaughtOpponentFish() {
  let n = 0;
  for (const f of duelSession?.opponentFish || []) {
    if (!f.caught) n++;
  }
  return n;
}

function updateOpponentFish(dt) {
  if (!duelSession) return;
  const t = performance.now();
  const half = duelHalfW();
  const step = dt / 16;
  for (const f of duelSession.opponentFish) {
    if (f.caught) continue;
    f.x += f.vx * step * 1.2;
    const morph = f.spec?.morph || "";
    const soft = morph === "jellyfish" || morph === "seaturtle";
    f.phase = (f.phase || 0) + (soft ? 0.05 : 0.088) * step;
    if (f.homeY == null) f.homeY = f.y;
    f.y = f.homeY + Math.sin(f.phase) * f.len * (soft ? 0.04 : 0.07);
  }
  duelSession.opponentFish = duelSession.opponentFish.filter((f) => {
    if (f.caught && f.removeAt && t >= f.removeAt) return false;
    if (f.caught) return true;
    if (f.x < half - f.len * 2 || f.x > w + f.len * 2) return false;
    return true;
  });
}

function addOpponentScore(pts) {
  if (!duelSession || pts <= 0) return;
  duelSession.opponentScore += pts;
  updateDuelHudScores();
}

function tryCatchOpponentFish(opts) {
  if (!duelSession) return;
  const oh = duelSession.opponentHook;
  const worldX = duelHalfW() + oh.x;
  const hy = oh.tipY;
  const casting = opts?.casting === true;
  let hookR = selectedRod.catchRadius * dpr * 0.92;
  if (oh.snagPulse > 0) hookR *= 1.35;
  if (casting) hookR *= 1.32;

  const candidates = [];
  for (const f of duelSession.opponentFish) {
    if (f.caught) continue;
    const dx = f.x - worldX;
    const dy = f.y - hy;
    const reach = fishHitRadius(f, hookR);
    if (dx * dx + dy * dy > reach * reach) continue;
    const rar = RARITY[f.spec.rarity];
    if (rar.mult >= 2.1 && Math.random() > 0.72) continue;
    candidates.push(f);
  }
  if (!candidates.length) return;

  let batchPts = 0;
  for (const f of candidates) {
    f.caught = true;
    f.removeAt = performance.now() + 320;
    batchPts += pointsFor(f.spec);
  }
  addOpponentScore(batchPts);
  oh.snagPulse = 260;
}

function boostOpponentIfBehind(now) {
  if (!duelSession || isDuelPvpSession()) return;
  const expected = duelExpectedOpponentScore(now);
  if (duelSession.opponentScore >= expected - 8) return;
  if (Math.random() > 0.035) return;
  const bump = Math.min(38, Math.max(12, expected - duelSession.opponentScore));
  addOpponentScore(bump);
}

function updateOpponentHook(dt) {
  if (!duelSession) return;
  const oh = duelSession.opponentHook;
  const half = duelHalfW();
  const margin = dpr * 14;
  oh.aimTimer -= dt;

  if (oh.castState === "idle") {
    oh.tipY = surfaceTipY();
    oh.castCooldown -= dt;
    let nearest = null;
    let nearestD = Infinity;
    for (const f of duelSession.opponentFish) {
      if (f.caught) continue;
      const dx = f.x - (duelHalfW() + oh.x);
      const dy = f.y - oh.tipY;
      const d = dx * dx + dy * dy;
      if (d < nearestD) {
        nearestD = d;
        nearest = f;
      }
    }
    if (nearest && oh.aimTimer <= 0) {
      oh.targetX = Math.max(margin, Math.min(half - margin, nearest.x - duelHalfW()));
      oh.aimTimer = 180 + Math.random() * 320;
    } else if (oh.aimTimer <= 0) {
      oh.targetX = margin + Math.random() * (half - margin * 2);
      oh.aimTimer = 260 + Math.random() * 420;
    }
    if (oh.castCooldown <= 0) {
      oh.castState = "down";
      oh.castTimer = 0;
      oh.castFromY = oh.tipY;
      oh.castToY = deepestTipY();
      oh.castCooldown = 900 + Math.random() * 1600;
    }
  } else if (oh.castState === "down") {
    oh.castTimer += dt;
    const t = Math.min(1, oh.castTimer / effectiveCastDownMs());
    const smooth = t * t * (3 - 2 * t);
    oh.tipY = oh.castFromY + (oh.castToY - oh.castFromY) * smooth;
    tryCatchOpponentFish({ casting: true });
    if (t >= 1) {
      oh.snagPulse = 280;
      tryCatchOpponentFish({ casting: true });
      oh.castState = "up";
      oh.castTimer = 0;
      oh.castFromY = oh.tipY;
      oh.castRiseTargetY = surfaceTipY();
    }
  } else if (oh.castState === "up") {
    oh.castTimer += dt;
    const t = Math.min(1, oh.castTimer / effectiveCastUpMs());
    const ease = 1 - (1 - t) * (1 - t);
    oh.tipY = oh.castFromY + (oh.castRiseTargetY - oh.castFromY) * ease;
    if (t >= 1) oh.castState = "idle";
  }

  const k = dt / 16;
  const follow = 1 - Math.pow(0.5, k);
  oh.x += (oh.targetX - oh.x) * Math.min(1, follow * 2.1);
  oh.x = Math.max(margin, Math.min(half - margin, oh.x));
  if (oh.snagPulse > 0) oh.snagPulse -= dt;
}

function lerpRemoteOpponentHook(dt) {
  if (!duelSession?.remoteHook) return;
  const oh = duelSession.opponentHook;
  const half = duelHalfW();
  const tx = duelSession.remoteHook.xPct * half;
  const ty = duelHookYFromPct(duelSession.remoteHook.yPct);
  const k = Math.min(1, dt / 110);
  oh.x += (tx - oh.x) * k;
  oh.targetX = tx;
  oh.tipY += (ty - oh.tipY) * k;
  oh.castState = duelHookCastFromCode(duelSession.remoteHook.cast);
}

function updateDuelOpponentSolo(dt) {
  if (!duelSession) return;
  if (isDuelPvpSession()) {
    const t = performance.now();
    if (t - (duelSession.lastOpponentPoll || 0) >= DUEL_OPPONENT_POLL_MS) {
      duelSession.lastOpponentPoll = t;
      void pollDuelOpponentFromMatch();
    }
    return;
  }
  boostOpponentIfBehind(performance.now());
}

function updateDuelOpponentVisuals(dt) {
  if (!duelSession) return;
  const reef = getReef();
  const maxFish = Math.max(5, Math.floor(reef.maxFish * 0.55));

  if (isDuelPvpSession()) {
    const t = performance.now();
    if (t - (duelSession.lastOpponentPoll || 0) >= DUEL_OPPONENT_POLL_MS) {
      duelSession.lastOpponentPoll = t;
      void pollDuelOpponentFromMatch();
    }
    duelSession.opponentSpawnAcc += dt;
    if (duelSession.opponentSpawnAcc >= duelSession.opponentNextSpawn && countUncaughtOpponentFish() < maxFish) {
      spawnFishInDuelHalf("opponent");
      duelSession.opponentSpawnAcc = 0;
      duelSession.opponentNextSpawn = rollNextSpawnDelay(reef);
    }
    updateOpponentFish(dt);
    lerpRemoteOpponentHook(dt);
    const oh = duelSession.opponentHook;
    if (oh.snagPulse > 0) oh.snagPulse -= dt;
    return;
  }

  duelSession.opponentSpawnAcc += dt;
  if (duelSession.opponentSpawnAcc >= duelSession.opponentNextSpawn && countUncaughtOpponentFish() < maxFish) {
    spawnFishInDuelHalf("opponent");
    duelSession.opponentSpawnAcc = 0;
    duelSession.opponentNextSpawn = rollNextSpawnDelay(reef);
  }
  updateOpponentFish(dt);
  updateOpponentHook(dt);
  boostOpponentIfBehind(performance.now());
}

function updateDuelOpponent(dt, now) {
  if (isDuelSoloView()) {
    updateDuelOpponentSolo(dt);
    return;
  }
  updateDuelOpponentVisuals(dt);
}

function drawDuelSoloPlayfield() {
  for (const f of fishList) drawFish(f);
  drawBoatHullAndCatchNet();
  drawHookLine();
  drawReleasedFishJumpFx();
  drawTrenchRodLight();
}

function drawDuelDivider() {
  const mid = duelHalfW();
  const spectator = isDuelSpectatorSession();
  const leftLabel = spectator ? duelSession?.hostInitials || "HOST" : "YOU";
  const rightLabel = spectator ? duelSession?.guestInitials || "GUEST" : "RIVAL";
  ctx.save();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
  ctx.lineWidth = 3 * dpr;
  ctx.setLineDash([dpr * 6, dpr * 5]);
  ctx.beginPath();
  ctx.moveTo(mid, waterTop);
  ctx.lineTo(mid, h);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "rgba(255, 255, 255, 0.72)";
  ctx.font = `800 ${Math.max(10, 11 * dpr)}px Nunito, sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText(leftLabel, mid * 0.5, waterTop + dpr * 18);
  ctx.fillStyle = "rgba(252, 165, 165, 0.88)";
  ctx.fillText(rightLabel, mid + mid * 0.5, waterTop + dpr * 18);
  ctx.restore();
}

function drawHookLineForState(hookState, anchorX) {
  const hx = anchorX;
  const hy = hookState.tipY;
  const topY = lineAnchorY();
  const v = selectedRod.visual;
  const boatCx = fishingRodBoatCenterX(hookState);
  drawFishingRod(hx, topY, v, boatCx);

  ctx.strokeStyle = v.lineMain;
  ctx.lineWidth = v.lineW * dpr;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(hx, topY);
  ctx.lineTo(hx, hy);
  ctx.stroke();

  ctx.strokeStyle = v.lineSheen;
  ctx.lineWidth = v.sheenW * dpr;
  ctx.beginPath();
  ctx.moveTo(hx - dpr * 0.85, topY);
  ctx.lineTo(hx - dpr * 0.85, hy);
  ctx.stroke();

  const pulse = hookState.snagPulse > 0 ? 1.28 : 1;
  const forOpponent = hookState !== hook;
  let hookR = selectedRod.catchRadius * dpr * (forOpponent ? 1 : roundBait.catchRadiusMult);
  if (forOpponent) hookR *= 0.92;
  const R = hookR * pulse;

  ctx.strokeStyle = hookState.snagPulse > 0 ? v.ringSnag : v.ringIdle;
  ctx.lineWidth = 2 * dpr;
  ctx.beginPath();
  ctx.arc(hx, hy, R, 0, Math.PI * 2);
  ctx.stroke();

  const hs = v.hookScale * (isDuelActive() ? 0.9 : 1);
  const tipGlowY = v.tipType === "magnet" ? hy + dpr * 8 * hs : hy + dpr * 12 * hs;
  const tipGlow = ctx.createRadialGradient(hx, tipGlowY, 0, hx, tipGlowY, dpr * 22 * hs);
  tipGlow.addColorStop(0, v.tipGlow);
  tipGlow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = tipGlow;
  ctx.beginPath();
  ctx.arc(hx, tipGlowY, dpr * 18 * hs, 0, Math.PI * 2);
  ctx.fill();
  drawHookTip(hx, hy, v, hs);
}

function drawDuelPlayfield() {
  if (isDuelSoloView()) {
    drawDuelSoloPlayfield();
    return;
  }
  const half = duelHalfW();
  const spectator = isDuelSpectatorSession();
  const leftHook = spectator ? duelSession.hostHook : hook;
  const rightHook = spectator ? duelSession.guestHook : duelSession.opponentHook;

  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, half, h);
  ctx.clip();
  for (const f of fishList) drawFish(f);
  if (spectator) drawBoatHullAt(duelSideCenter("player"));
  else drawBoatHullAndCatchNetAt(duelSideCenter("player"));
  drawHookLineForState(leftHook, leftHook.x);
  if (!spectator) {
    drawReleasedFishJumpFx();
    drawTrenchRodLightForHook(hook.x);
  }
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  ctx.rect(half, 0, half, h);
  ctx.clip();
  for (const f of duelSession.opponentFish) drawFish(f);
  drawBoatHullAt(duelSideCenter("opponent"));
  drawHookLineForState(rightHook, duelHalfW() + rightHook.x);
  ctx.restore();

  drawDuelDivider();
}

function drawTrenchRodLightForHook(hx) {
  if (getReef().id !== "mariana_trench") return;
  const hy = hookTipY();
  const lampY = hy + dpr * 8;
  const lightMult = effectiveTrenchLightMult();
  const radius = Math.max(72 * dpr, Math.min(w, h) * 0.12) * lightMult;
  ctx.save();
  ctx.beginPath();
  ctx.arc(hx, lampY, radius, 0, Math.PI * 2);
  ctx.clip();
  const glow = ctx.createRadialGradient(hx, lampY, 0, hx, lampY, radius);
  glow.addColorStop(0, `rgba(190, 255, 255, ${0.28 + Math.min(0.2, (lightMult - 1) * 0.15)})`);
  glow.addColorStop(1, "rgba(45, 212, 191, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(hx - radius, lampY - radius, radius * 2, radius * 2);
  ctx.restore();
}

function beginDuelSession(plan) {
  if (playing) return;
  const reef = REEFS.find((r) => r.id === plan.reefId) || REEFS[0];
  duelLastReefId = reef.id;
  duelPendingReefId = reef.id;
  duelSession = {
    reefId: plan.reefId,
    targetScore: plan.targetScore || 0,
    opponentScore: plan.opponentScore || 0,
    opponentInitials:
      plan.mode === "com" ? comGuestDisplayName(plan.opponentInitials) : formatDuelInitials(plan.opponentInitials) || "Rival",
    mode: plan.mode || "com",
    matchId: plan.matchId || null,
    role: plan.role || null,
    hostClientId: plan.hostClientId || null,
    guestClientId: plan.guestClientId || null,
    opponentHook: createOpponentHook(),
    opponentFish: [],
    opponentSpawnAcc: 0,
    opponentNextSpawn: rollNextSpawnDelay(reef, true),
    roundStart: 0,
    pacingBias: 0.93 + Math.random() * 0.1,
    lastStatePush: 0,
    lastOpponentPoll: 0,
    remoteHook: { xPct: 0.5, yPct: 0.08, cast: 0 },
  };

  playing = true;
  normalizeSelectedRod();
  stopHomeMusic();
  stopEventsMusic();
  syncMusicMasterGain();
  startHomeWaves();
  roundBait = { catchRadiusMult: 1, rareAssistAdd: 0, lightRadiusMult: 1 };
  score = 0;
  fishList = [];
  catchLog = [];
  spawnAcc = 0;
  nextSpawnIn = rollNextSpawnDelay(reef, true);
  seedStarterFish(reef);
  // plan.roundStartMs is wall-clock (Date.now); game loop uses performance.now().
  const roundStart = performance.now();
  duelSession.roundStart = roundStart;
  roundEndAt = roundStart + DUEL_ROUND_MS;
  clearKrakens();
  jackpotCrab = null;
  hideAllPanels();
  if (panelDuelOver) panelDuelOver.hidden = true;
  appRoot.classList.add("app--playing", "app--duel");
  if (isPhoneDevice()) appRoot.classList.add("app--duel-solo");
  showDuelHud();
  lastPearlAt = -999999;
  scoreDisplay.textContent = "0";
  timeDisplay.textContent = formatTime(DUEL_ROUND_MS);
  initBubbles();
  resize();
  hook.targetX = duelSideCenter("player");
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
  duelSession.opponentHook.tipY = surfaceTipY();
  if (!isDuelSoloView()) {
    for (let i = 0; i < 3; i++) spawnFishInDuelHalf("opponent");
  }
  const rivalName = getDuelOpponentDisplayName();
  controlHint.textContent = isDuelSoloView()
    ? `Duel ${rivalName} — your screen only · beat their score in the HUD!`
    : duelSession.mode === "pvp"
      ? isTouchControlsPreferred()
        ? `Duel ${rivalName} — your side only · drag & tap to fish!`
        : `Duel ${rivalName} — your side only · beat them before time runs out!`
      : isTouchControlsPreferred()
        ? "Your side only — drag & tap to fish · beat the rival!"
        : "Your side only — aim & cast · beat the rival before time runs out!";
  updateDuelHudScores();
  startReefMusic();
  refreshDuelEventCard();
  if (duelSession.mode === "pvp") {
    void pollDuelOpponentFromMatch();
    void pushDuelMatchState();
  }
}

async function startDuelFromEvents(fromPrep = false) {
  if (playing || duelMatchmakingActive || coopMatchmakingActive) return;
  if (isDuelOpenedFromLocalFile()) {
    showToast(
      "Live duels only work on the website — open https://juliette-jason.github.io/reef-rush/ on both phones.",
      6200,
    );
    return;
  }
  refreshDuelTicketsForToday();
  if (!tournamentRun && getDuelTicketCount() <= 0) {
    showToast("No duel tickets left — buy more in the shop or come back tomorrow.", 2800);
    refreshDuelEventCard();
    return;
  }
  if (!fromPrep) {
    openEventPrep("duel");
    return;
  }
  if (!tournamentRun && !spendDuelTicket()) {
    refreshDuelEventCard();
    return;
  }

  hideAllPanels();
  if (panelEvents) panelEvents.hidden = false;
  if (eventsOcean) eventsOcean.hidden = true;
  appRoot?.classList.add("app--events-mode");
  const matchmakingDeadline = Date.now() + DUEL_LOBBY_TIMEOUT_MS;
  setDuelMatchmakingUi(true, `Searching up to ${DUEL_LOBBY_TIMEOUT_SEC}s for a real rival…`);
  startDuelLobbyCountdown(matchmakingDeadline, `Finding a real rival (${DUEL_LOBBY_TIMEOUT_SEC}s)`);

  try {
    const plan = await resolveDuelMatchPlan(matchmakingDeadline);
    hideDuelLobbyCountdown();
    await waitForDuelRoundStart(plan);
    setDuelMatchmakingUi(false);
    beginDuelSession(plan);
  } catch (err) {
    console.warn(err);
    hideOnlineMatchup();
    appRoot?.classList.remove("app--matchup");
    setDuelMatchmakingUi(false);
    gameMeta.duelTickets += 1;
    saveMeta();
    refreshDuelEventCard();
    if (isDuelBackendMissingError(err)) {
      showToast(
        "Duel matchmaking isn't set up yet — run supabase/duel_matches.sql in your Supabase SQL editor, then try again.",
        5200,
      );
    } else {
      showToast("Duel matchmaking cancelled.", 2400);
    }
  }
}

function startDuelRound() {
  void startDuelFromEvents();
}

let duelResultSettling = false;

function endDuelRound() {
  void endDuelRoundAsync();
}

async function endDuelRoundAsync() {
  const session = duelSession;
  if (!session || duelResultSettling) return;
  if (session.mode === "spectator") {
    endDuelSpectatorRound(session.lastRow);
    return;
  }
  duelResultSettling = true;

  const localPlayerScore = score;
  const targetScore = session.targetScore || 0;
  const reefName = getReef().name;
  const rivalName = getDuelOpponentDisplayName();
  const isPvp = session.mode === "pvp";

  playing = false;
  stopClimaxMusic();
  syncUrgentTimerUi(99999);
  stopReefMusic();
  appRoot.classList.remove("app--playing", "app--duel", "app--duel-solo");
  hideDuelHud();
  hook.castState = "idle";
  touchAim = null;

  if (panelDuelOver) panelDuelOver.hidden = false;
  if (btnDuelPlayAgain) btnDuelPlayAgain.hidden = false;
  if (duelOverHeadline) duelOverHeadline.textContent = "Duel complete";
  if (duelOverScores) duelOverScores.textContent = isPvp ? "Tallying final scores…" : `You ${localPlayerScore} · Rival ${session.opponentScore || 0}`;
  if (duelOverDetail) {
    duelOverDetail.textContent = isPvp ? "Syncing scores with your rival…" : `${reefName} · rival target ${targetScore.toLocaleString()} pts`;
  }
  if (duelOverPrize) {
    duelOverPrize.hidden = true;
    duelOverPrize.textContent = "";
  }

  let playerScore = localPlayerScore;
  let opponentScore = session.opponentScore || 0;
  if (isPvp && session.matchId) {
    const resolved = await resolveDuelFinalScores(localPlayerScore, session);
    playerScore = resolved.playerScore;
    opponentScore = resolved.opponentScore;
  }

  if (tournamentRun) void finishTournamentRun(playerScore);

  duelSession = null;
  duelResultSettling = false;

  const won = playerScore > opponentScore;
  const tie = playerScore === opponentScore;

  if (duelOverHeadline) {
    duelOverHeadline.textContent = won
      ? isPvp
        ? `You beat ${rivalName}!`
        : "You win the duel!"
      : tie
        ? "It's a tie!"
        : isPvp
          ? `${rivalName} wins`
          : "Rival wins";
  }
  if (duelOverScores) {
    duelOverScores.textContent = isPvp
      ? `You ${playerScore} · ${rivalName} ${opponentScore}`
      : `You ${playerScore} · Rival ${opponentScore}`;
  }
  if (duelOverDetail) {
    duelOverDetail.textContent = isPvp
      ? `${reefName} · live duel vs ${rivalName}`
      : `${reefName} · rival target ${targetScore.toLocaleString()} pts`;
  }
  if (duelOverPrize) {
    if (won) {
      gameMeta.coins += DUEL_WIN_COINS;
      saveMeta();
      refreshCoinDisplays();
      duelOverPrize.hidden = false;
      duelOverPrize.textContent = `+${DUEL_WIN_COINS} coins!`;
      duelOverPrize.classList.add("duel-over__prize--burst");
      spawnDuelWinCoinAnimation();
      playCatchCelebrationSound(3);
    } else {
      duelOverPrize.hidden = true;
      duelOverPrize.textContent = "";
      duelOverPrize.classList.remove("duel-over__prize--burst");
    }
  }
  roundBait = { catchRadiusMult: 1, rareAssistAdd: 0, lightRadiusMult: 1 };
}

function openDuelFromResult(replay) {
  if (panelDuelOver) panelDuelOver.hidden = true;
  if (btnDuelPlayAgain) btnDuelPlayAgain.hidden = false;
  if (replay) {
    void startDuelFromEvents();
    return;
  }
  openEvents();
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
  // Tip of the fishing rod sits just above the waterline.
  return waterTop + dpr * 2;
}

function fishingRodBoatCenterX(hookState) {
  if (isDuelActive()) {
    return hookState === hook ? duelSideCenter("player") : duelSideCenter("opponent");
  }
  return w * 0.5;
}

/** Draw a full fishing rod blank, grip, reel, and guides from the boat to the tip. */
function drawFishingRod(hx, tipY, v, boatCenterX) {
  const g = getCharterBoatGeo(boatCenterX);
  const scale = isDuelActive() ? 0.72 : 1;
  const buttX = g.cx + g.L * 0.22;
  const buttY = g.deckY(buttX) - dpr * 3 * scale;
  const tipX = hx;
  const dx = tipX - buttX;
  const dy = tipY - buttY;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const px = -uy;
  const py = ux;

  const along = (t, side = 0) => ({
    x: buttX + dx * t + px * side,
    y: buttY + dy * t + py * side,
  });

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Soft shadow under the blank
  ctx.strokeStyle = "rgba(0, 0, 0, 0.28)";
  ctx.lineWidth = 5.2 * dpr * scale;
  ctx.beginPath();
  ctx.moveTo(buttX + dpr * 1.5, buttY + dpr * 2);
  ctx.lineTo(tipX + dpr * 1.5, tipY + dpr * 2);
  ctx.stroke();

  // Tapered blank (butt → tip)
  const blankGrad = ctx.createLinearGradient(buttX, buttY, tipX, tipY);
  blankGrad.addColorStop(0, v.reelBody);
  blankGrad.addColorStop(0.45, v.reelBand);
  blankGrad.addColorStop(1, v.hookMetal || v.reelBand);
  ctx.strokeStyle = blankGrad;
  ctx.lineWidth = 4.6 * dpr * scale;
  ctx.beginPath();
  ctx.moveTo(buttX, buttY);
  ctx.lineTo(...[along(0.55).x, along(0.55).y]);
  ctx.stroke();
  ctx.lineWidth = 3.1 * dpr * scale;
  ctx.beginPath();
  ctx.moveTo(along(0.5).x, along(0.5).y);
  ctx.lineTo(along(0.82).x, along(0.82).y);
  ctx.stroke();
  ctx.lineWidth = 2 * dpr * scale;
  ctx.beginPath();
  ctx.moveTo(along(0.8).x, along(0.8).y);
  ctx.lineTo(tipX, tipY);
  ctx.stroke();

  // Cork / EVA grip near the butt
  const gripA = along(0.02);
  const gripB = along(0.16);
  ctx.strokeStyle = "#c4a574";
  ctx.lineWidth = 7.2 * dpr * scale;
  ctx.beginPath();
  ctx.moveTo(gripA.x, gripA.y);
  ctx.lineTo(gripB.x, gripB.y);
  ctx.stroke();
  ctx.strokeStyle = "rgba(90, 60, 30, 0.35)";
  ctx.lineWidth = 1.1 * dpr * scale;
  for (let i = 0; i < 5; i++) {
    const p = along(0.03 + i * 0.025);
    ctx.beginPath();
    ctx.moveTo(p.x + px * 3.2 * dpr * scale, p.y + py * 3.2 * dpr * scale);
    ctx.lineTo(p.x - px * 3.2 * dpr * scale, p.y - py * 3.2 * dpr * scale);
    ctx.stroke();
  }

  // Reel seat + spinning reel
  const reelAt = along(0.14);
  const reelR = 6.5 * dpr * scale;
  const reelGrad = ctx.createRadialGradient(
    reelAt.x - px * reelR * 0.3,
    reelAt.y - py * reelR * 0.3,
    reelR * 0.2,
    reelAt.x,
    reelAt.y,
    reelR
  );
  reelGrad.addColorStop(0, v.reelBand);
  reelGrad.addColorStop(0.55, v.reelBody);
  reelGrad.addColorStop(1, "#1f2937");
  ctx.fillStyle = reelGrad;
  ctx.beginPath();
  ctx.ellipse(reelAt.x + px * reelR * 0.85, reelAt.y + py * reelR * 0.85, reelR * 0.95, reelR * 0.72, Math.atan2(uy, ux), 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.35)";
  ctx.lineWidth = 1 * dpr * scale;
  ctx.stroke();
  // Spool highlight
  ctx.strokeStyle = v.lineSheen || "rgba(255,255,255,0.35)";
  ctx.lineWidth = 1.4 * dpr * scale;
  ctx.beginPath();
  ctx.arc(reelAt.x + px * reelR * 0.85, reelAt.y + py * reelR * 0.85, reelR * 0.42, 0, Math.PI * 2);
  ctx.stroke();

  // Line guides along the blank
  ctx.strokeStyle = v.hookMetal || "#cbd5e1";
  ctx.lineWidth = 1.35 * dpr * scale;
  for (const t of [0.28, 0.42, 0.56, 0.7, 0.84]) {
    const p = along(t);
    const half = (2.4 - t * 1.2) * dpr * scale;
    ctx.beginPath();
    ctx.moveTo(p.x + px * half, p.y + py * half);
    ctx.lineTo(p.x - px * half * 1.6, p.y - py * half * 1.6);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(p.x - px * half * 1.15, p.y - py * half * 1.15, half * 0.55, 0, Math.PI * 2);
    ctx.stroke();
  }

  // Tip-top guide
  ctx.fillStyle = v.hookMetal || "#e2e8f0";
  ctx.beginPath();
  ctx.arc(tipX, tipY, 2.1 * dpr * scale, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
  return { tipX, tipY, buttX, buttY };
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
const panelSplash = document.getElementById("panelSplash");
const panelOver = document.getElementById("panelGameOver");
const appRoot = document.getElementById("app");
const rodChoices = document.getElementById("rodChoices");
const reefChoices = document.getElementById("reefChoices");
const reefMapPins = document.getElementById("reefMapPins");
const reefMapBoat = document.getElementById("reefMapBoat");
const reefMapCaption = document.getElementById("reefMapCaption");
const btnStartSub = document.getElementById("btnStartSub");
const btnStart = document.getElementById("btnStart");
const btnAgain = document.getElementById("btnAgain");
const finalScore = document.getElementById("finalScore");
const catchSummary = document.getElementById("catchSummary");
const leaderboardStart = document.getElementById("leaderboardStart");
const leaderboardOver = document.getElementById("leaderboardOver");
const leaderboardEvents = document.getElementById("leaderboardEvents");
const initialsPanel = document.getElementById("initialsPanel");
const initialsInput = document.getElementById("initialsInput");
const btnSaveScore = document.getElementById("btnSaveScore");
const dailyInitialsPanel = document.getElementById("dailyInitialsPanel");
const dailyInitialsInput = document.getElementById("dailyInitialsInput");
const btnSaveDailyScore = document.getElementById("btnSaveDailyScore");
const dailyScoreStatus = document.getElementById("dailyScoreStatus");
const dailyLeaderboardOver = document.getElementById("dailyLeaderboardOver");
const toastEl = document.getElementById("toast");
const treasureMapReveal = document.getElementById("treasureMapReveal");
const btnTreasureMapRevealDone = document.getElementById("btnTreasureMapRevealDone");
const dailyPrizeReveal = document.getElementById("dailyPrizeReveal");
const btnDailyPrizeRevealDone = document.getElementById("btnDailyPrizeRevealDone");
const dailyPrizeRevealTitle = document.getElementById("dailyPrizeRevealTitle");
const dailyPrizeRevealDay = document.getElementById("dailyPrizeRevealDay");
const dailyPrizeRevealAwards = document.getElementById("dailyPrizeRevealAwards");
const dailyPrizeBoardPhase = document.getElementById("dailyPrizeBoardPhase");
const dailyPrizeChestPhase = document.getElementById("dailyPrizeChestPhase");
const dailyPrizePodium = document.getElementById("dailyPrizePodium");
const dailyPrizeBoard = document.getElementById("dailyPrizeBoard");
const btnDailyPrizeContinue = document.getElementById("btnDailyPrizeContinue");
const dailyPrizeChestTitle = document.getElementById("dailyPrizeChestTitle");
const dailyPrizeChestHint = document.getElementById("dailyPrizeChestHint");
const btnDailyPrizeChest = document.getElementById("btnDailyPrizeChest");
const dailyPrizeChestArt = document.getElementById("dailyPrizeChestArt");
const adventureUnlockBanner = document.getElementById("adventureUnlockBanner");
const controlHint = document.getElementById("controlHint");
const baitChoices = document.getElementById("baitChoices");
const coinDisplay = document.getElementById("coinDisplay");
const coinDisplayStart = document.getElementById("coinDisplayStart");
const treasureChestDisplayStart = document.getElementById("treasureChestDisplayStart");
const gemDisplay = document.getElementById("gemDisplay");
const gemDisplayStart = document.getElementById("gemDisplayStart");
const gemDisplayShop = document.getElementById("gemDisplayShop");
const coinDisplayShop = document.getElementById("coinDisplayShop");
const coinsEarnedLine = document.getElementById("coinsEarnedLine");
const panelShop = document.getElementById("panelShop");
const shopList = document.getElementById("shopList");
const shopGuide = document.getElementById("shopGuide");
const btnOpenShopGuide = document.getElementById("btnOpenShopGuide");
const btnOpenShop = document.getElementById("btnOpenShop");
const btnShopLaunch = document.getElementById("btnShopLaunch");
const btnWorldAdventures = document.getElementById("btnWorldAdventures");
const btnEvents = document.getElementById("btnEvents");
const btnCollectables = document.getElementById("btnCollectables");
const homeLaunchDock = document.getElementById("homeLaunchDock");
const homeLaunchStack = document.getElementById("homeLaunchStack");
const panelEvents = document.getElementById("panelEvents");
const eventCardTourney = document.getElementById("eventCardTourney");
const tourneyEventTitle = document.getElementById("tourneyEventTitle");
const tourneySignupLine = document.getElementById("tourneySignupLine");
const tourneyScheduleLine = document.getElementById("tourneyScheduleLine");
const tourneyPrizeLine = document.getElementById("tourneyPrizeLine");
const tourneyVoteOptions = document.getElementById("tourneyVoteOptions");
const tourneyLeaderboard = document.getElementById("tourneyLeaderboard");
const btnTourneySignup = document.getElementById("btnTourneySignup");
const btnTourneyCompete = document.getElementById("btnTourneyCompete");
const panelCollectables = document.getElementById("panelCollectables");
const panelProfile = document.getElementById("panelProfile");
const profileNameInput = document.getElementById("profileNameInput");
const profileNameHint = document.getElementById("profileNameHint");
const profileSignedOut = document.getElementById("profileSignedOut");
const profileSignedIn = document.getElementById("profileSignedIn");
const profileAccountLabel = document.getElementById("profileAccountLabel");
const profileFriendCode = document.getElementById("profileFriendCode");
const profileFriendsSection = document.getElementById("profileFriendsSection");
const profileFriendsList = document.getElementById("profileFriendsList");
const profileFriendsOnlineCount = document.getElementById("profileFriendsOnlineCount");
const profileAddFriendForm = document.getElementById("profileAddFriendForm");
const profileAddFriendInput = document.getElementById("profileAddFriendInput");
const btnSignInGoogle = document.getElementById("btnSignInGoogle");
const btnSignInApple = document.getElementById("btnSignInApple");
const btnSignOut = document.getElementById("btnSignOut");
const eventPrepFriends = document.getElementById("eventPrepFriends");
const eventPrepFriendsList = document.getElementById("eventPrepFriendsList");
const btnEventPrepAnyone = document.getElementById("btnEventPrepAnyone");
const collectablesArmed = document.getElementById("collectablesArmed");
const collectablesItems = document.getElementById("collectablesItems");
const collectablesStamps = document.getElementById("collectablesStamps");
const collectablesStampCount = document.getElementById("collectablesStampCount");
const collectablesWardrobe = document.getElementById("collectablesWardrobe");
const collectablesWardrobeCount = document.getElementById("collectablesWardrobeCount");
const collectablesFrames = document.getElementById("collectablesFrames");
const collectablesFramesCount = document.getElementById("collectablesFramesCount");
const eventsOcean = document.getElementById("eventsOcean");
const dailyLeaderboardEvents = document.getElementById("dailyLeaderboardEvents");
const dailyLeaderboardTitle = document.getElementById("dailyLeaderboardTitle");
const dailyEventReset = document.getElementById("dailyEventReset");
const dailyEventPlayerHint = document.getElementById("dailyEventPlayerHint");
const duelEventMatchup = document.getElementById("duelEventMatchup");
const duelEventStatus = document.getElementById("duelEventStatus");
const coopEventMatchup = document.getElementById("coopEventMatchup");
const coopEventReef = document.getElementById("coopEventReef");
const coopEventStatus = document.getElementById("coopEventStatus");
const coopLobbyCountdown = document.getElementById("coopLobbyCountdown");
const coopLobbyCountdownLabel = document.getElementById("coopLobbyCountdownLabel");
const coopLobbyCountdownValue = document.getElementById("coopLobbyCountdownValue");
const onlineMatchup = document.getElementById("onlineMatchup");
const onlineMatchupHeadline = document.getElementById("onlineMatchupHeadline");
const onlineMatchupPlayerAvatar = document.getElementById("onlineMatchupPlayerAvatar");
const onlineMatchupPlayerName = document.getElementById("onlineMatchupPlayerName");
const onlineMatchupRivalAvatar = document.getElementById("onlineMatchupRivalAvatar");
const onlineMatchupRivalName = document.getElementById("onlineMatchupRivalName");
const onlineMatchupCountdown = document.getElementById("onlineMatchupCountdown");
const onlineMatchupReef = document.getElementById("onlineMatchupReef");
const duelLobbyCountdown = document.getElementById("duelLobbyCountdown");
const duelLobbyCountdownLabel = document.getElementById("duelLobbyCountdownLabel");
const duelLobbyCountdownValue = document.getElementById("duelLobbyCountdownValue");
const duelEventReef = document.getElementById("duelEventReef");
const duelEventTickets = document.getElementById("duelEventTickets");
const eventsTicketCount = document.getElementById("eventsTicketCount");
const duelEventUnavailable = document.getElementById("duelEventUnavailable");
const eventCardDuel = document.getElementById("eventCardDuel");
const btnStartDuel = document.getElementById("btnStartDuel");
const duelHud = document.getElementById("duelHud");
const duelHudPlayerLabel = document.getElementById("duelHudPlayerLabel");
const duelHudPlayerScore = document.getElementById("duelHudPlayerScore");
const duelHudOpponentScore = document.getElementById("duelHudOpponentScore");
const duelHudOpponentLabel = document.getElementById("duelHudOpponentLabel");
const panelDuelOver = document.getElementById("panelDuelOver");
const duelOverHeadline = document.getElementById("duelOverHeadline");
const duelOverScores = document.getElementById("duelOverScores");
const duelOverDetail = document.getElementById("duelOverDetail");
const duelOverPrize = document.getElementById("duelOverPrize");
const btnDuelPlayAgain = document.getElementById("btnDuelPlayAgain");
const btnDuelBackEvents = document.getElementById("btnDuelBackEvents");
const duelSpectatorSection = document.getElementById("duelSpectatorSection");
const duelSpectatorList = document.getElementById("duelSpectatorList");
const duelSpectatorEmpty = document.getElementById("duelSpectatorEmpty");
const duelSpectatorLoading = document.getElementById("duelSpectatorLoading");
const btnRefreshDuelSpectator = document.getElementById("btnRefreshDuelSpectator");
const eventCardCrab = document.getElementById("eventCardCrab");
const crabEventTickets = document.getElementById("crabEventTickets");
const btnStartCrab = document.getElementById("btnStartCrab");
const btnDailyCatchClaim = document.getElementById("btnDailyCatchClaim");
const dailyCatchGoalEl = document.getElementById("dailyCatchGoal");
const dailyCatchProgressBar = document.getElementById("dailyCatchProgressBar");
const dailyCatchProgressText = document.getElementById("dailyCatchProgressText");
const dailyCatchStatus = document.getElementById("dailyCatchStatus");
const dailyCatchReset = document.getElementById("dailyCatchReset");
const crabRewardHeadline = document.getElementById("crabRewardHeadline");
const crabTrapStage = document.getElementById("crabTrapStage");
const crabTrapCanvas = document.getElementById("crabTrapCanvas");
const crabTrapScoreEl = document.getElementById("crabTrapScore");
const crabTrapCagesEl = document.getElementById("crabTrapCages");
const crabTrapInstructEl = document.getElementById("crabTrapInstruct");
const crabTrapTimeEl = document.getElementById("crabTrapTime");
const btnCrabQuit = document.getElementById("btnCrabQuit");
const panelCrabReward = document.getElementById("panelCrabReward");
const crabRewardSummary = document.getElementById("crabRewardSummary");
const crabRewardTier = document.getElementById("crabRewardTier");
const crabRewardPrompt = document.getElementById("crabRewardPrompt");
const crabRewardChests = document.getElementById("crabRewardChests");
const crabRewardResult = document.getElementById("crabRewardResult");
const btnCrabPlayAgain = document.getElementById("btnCrabPlayAgain");
const btnCrabRewardBack = document.getElementById("btnCrabRewardBack");
const crabTrapCtx = crabTrapCanvas ? crabTrapCanvas.getContext("2d") : null;
const btnShopGuideDone = document.getElementById("btnShopGuideDone");
const btnToggleMusic = document.getElementById("btnToggleMusic");
const panelIntro = document.getElementById("panelIntro");
const btnIntroDone = document.getElementById("btnIntroDone");
const btnOpenIntro = document.getElementById("btnOpenIntro");
const mapSeagullGuide = document.getElementById("mapSeagullGuide");
const mapSeagullTitle = document.getElementById("mapSeagullTitle");
const mapSeagullText = document.getElementById("mapSeagullText");
const btnMapSeagullDone = document.getElementById("btnMapSeagullDone");
let mapSeagullMode = null;
let mapSeagullFlyTimer = 0;
const btnResetProgress = document.getElementById("btnResetProgress");
const btnStartSettings = document.getElementById("btnStartSettings");
const homeCorner = document.getElementById("homeCorner");
const startSettingsMenu = document.getElementById("startSettingsMenu");
const startSettings = document.querySelector(".start-settings");
const btnAdventureMode = document.getElementById("btnAdventureMode");
const adventureLock = document.getElementById("adventureLock");
const adventureUnlockHint = document.getElementById("adventureUnlockHint");
const panelAdventure = document.getElementById("panelAdventure");
const adventureLevelList = document.getElementById("adventureLevelList");
const adventureMapScroll = document.getElementById("adventureMapScroll");
const adventureMapBanner = document.getElementById("adventureMapBanner");
const adventureMapHere = document.getElementById("adventureMapHere");
const adventureMapPager = document.getElementById("adventureMapPager");
const btnAdventureMapPrev = document.getElementById("btnAdventureMapPrev");
const btnAdventureMapNext = document.getElementById("btnAdventureMapNext");
const btnAdventureBack = document.getElementById("btnAdventureBack");
const panelAdventurePrep = document.getElementById("panelAdventurePrep");
const adventurePrepSection = document.getElementById("adventurePrepSection");
const adventurePrepTitle = document.getElementById("adventurePrepTitle");
const adventurePrepGoal = document.getElementById("adventurePrepGoal");
const adventurePrepBait = document.getElementById("adventurePrepBait");
const adventurePrepRod = document.getElementById("adventurePrepRod");
const adventurePrepBoosts = document.getElementById("adventurePrepBoosts");
const adventurePrepArmed = document.getElementById("adventurePrepArmed");
const btnAdventurePrepStart = document.getElementById("btnAdventurePrepStart");
const btnAdventurePrepBack = document.getElementById("btnAdventurePrepBack");
const panelEventPrep = document.getElementById("panelEventPrep");
const eventPrepEyebrow = document.getElementById("eventPrepEyebrow");
const eventPrepTitle = document.getElementById("eventPrepTitle");
const eventPrepDetail = document.getElementById("eventPrepDetail");
const eventPrepBait = document.getElementById("eventPrepBait");
const eventPrepRod = document.getElementById("eventPrepRod");
const btnEventPrepStart = document.getElementById("btnEventPrepStart");
const btnEventPrepBack = document.getElementById("btnEventPrepBack");
const panelAdventureFail = document.getElementById("panelAdventureFail");
const adventureFailScore = document.getElementById("adventureFailScore");
const adventureFailGoal = document.getElementById("adventureFailGoal");
const btnAdventureSkipRope = document.getElementById("btnAdventureSkipRope");
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
const adventureMapLostCityBanner = document.getElementById("adventureMapLostCityBanner");
const adventureFailTheme = document.getElementById("adventureFailTheme");

let selectedRod = RODS[0];
let selectedReefId = "australia";
/** Classic-round override from a Mystery Reef Key (cleared when the round ends). */
let roundOverrideReefId = null;
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
/** Home-screen Fisher of the Day chest fly-up and award reveal. */
let dailyPrizeCelebrationActive = false;
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
/** Krakens on screen: one in classic/adventure; Survivor can pack more on big screens. */
let kraken = null;
let krakens = [];
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
function loadMusicEnabledPref() {
  try {
    const v = localStorage.getItem(MUSIC_PREF_KEY);
    if (v === "no") return false;
    if (v === "yes") return true;
  } catch {
    /* ignore */
  }
  return true;
}

function saveMusicEnabledPref() {
  try {
    localStorage.setItem(MUSIC_PREF_KEY, musicEnabled ? "yes" : "no");
  } catch {
    /* ignore */
  }
}

let musicEnabled = loadMusicEnabledPref();
let musicCtx = null;
let musicMaster = null;
let musicTimer = null;
let homeMusicTrackIndex = 0;
let homeMusicBarIndex = 0;
let gameMusicTimer = null;
let reefMusicTrackIndex = 0;
let reefMusicBarIndex = 0;
let adventureMusicTimer = null;
let adventureMusicTrackIndex = 0;
let adventureMusicBarIndex = 0;
let eventsMusicTimer = null;
let eventsMusicStep = 0;
let climaxMusicTimer = null;
let climaxMusicActive = false;
let climaxMusicBeat = 0;
const CLIMAX_MUSIC_MS = 10_000;
const CLIMAX_MUSIC_TEMPO_MS = 380;
let homeAudioUnlocked = false;
let musicUnlockEl = null;
let musicStateHooked = false;
let musicWatchdogTimer = null;
let musicWatchdogLastKick = 0;

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

function hasSeenSeagullShopHint() {
  try {
    return localStorage.getItem(SEAGULL_SHOP_HINT_KEY) === "yes";
  } catch {
    return true;
  }
}

function markSeagullShopHintSeen() {
  try {
    localStorage.setItem(SEAGULL_SHOP_HINT_KEY, "yes");
    localStorage.removeItem(SEAGULL_SHOP_PENDING_KEY);
  } catch {
    /* ignore quota */
  }
}

function hasPendingSeagullShopHint() {
  try {
    return localStorage.getItem(SEAGULL_SHOP_PENDING_KEY) === "yes";
  } catch {
    return false;
  }
}

function setPendingSeagullShopHint() {
  if (hasSeenSeagullShopHint()) return;
  try {
    localStorage.setItem(SEAGULL_SHOP_PENDING_KEY, "yes");
  } catch {
    /* ignore quota */
  }
}

function clearMapSeagullFlyTimer() {
  if (mapSeagullFlyTimer) {
    window.clearTimeout(mapSeagullFlyTimer);
    mapSeagullFlyTimer = 0;
  }
}

function hideMapSeagullGuide() {
  clearMapSeagullFlyTimer();
  if (!mapSeagullGuide) return;
  mapSeagullGuide.hidden = true;
  mapSeagullGuide.classList.remove("map-seagull--howto", "map-seagull--shop", "map-seagull--fly-away");
  const perch = mapSeagullGuide.querySelector(".map-seagull__perch");
  if (perch) {
    perch.classList.remove("map-seagull__perch--flying");
    perch.style.removeProperty("--fly-left");
    perch.style.removeProperty("--fly-top");
    perch.style.removeProperty("--fly-width");
  }
  mapSeagullMode = null;
}

function fillMapSeagullHowto() {
  if (mapSeagullTitle) mapSeagullTitle.textContent = "Quick tip";
  if (mapSeagullText) {
    mapSeagullText.innerHTML = `
      <p>Pick a reef, bait, and rod — then Start Game.</p>
      <ul>
        <li>Aim · cast · snag fish near the hook.</li>
        <li>Avoid the kraken.</li>
      </ul>
    `;
  }
  if (btnMapSeagullDone) {
    btnMapSeagullDone.hidden = false;
    btnMapSeagullDone.textContent = "Got it";
  }
}

function fillMapSeagullShopHint() {
  if (mapSeagullTitle) mapSeagullTitle.textContent = "Shop tip";
  if (mapSeagullText) {
    mapSeagullText.innerHTML =
      "<p>Nice haul — spend coins in the <strong>Fishing shop</strong>.</p>";
  }
  if (btnMapSeagullDone) {
    btnMapSeagullDone.hidden = false;
    btnMapSeagullDone.textContent = "Got it";
  }
}

function showMapSeagullHowto() {
  if (!mapSeagullGuide || hasSeenIntro()) return;
  clearMapSeagullFlyTimer();
  mapSeagullMode = "howto";
  fillMapSeagullHowto();
  mapSeagullGuide.classList.remove("map-seagull--shop", "map-seagull--fly-away");
  mapSeagullGuide.classList.add("map-seagull--howto");
  mapSeagullGuide.hidden = false;
}

function showMapSeagullShopHint() {
  if (!mapSeagullGuide || hasSeenSeagullShopHint()) return;
  clearMapSeagullFlyTimer();
  mapSeagullMode = "shop";
  fillMapSeagullShopHint();
  mapSeagullGuide.classList.remove("map-seagull--howto", "map-seagull--fly-away");
  mapSeagullGuide.classList.add("map-seagull--shop");
  mapSeagullGuide.hidden = false;
  // Auto fly-away after they have time to read, if they don't tap first.
  mapSeagullFlyTimer = window.setTimeout(() => {
    mapSeagullFlyTimer = 0;
    flyAwayMapSeagull();
  }, 6500);
}

function flyAwayMapSeagull() {
  if (!mapSeagullGuide || mapSeagullGuide.hidden) return;
  clearMapSeagullFlyTimer();
  if (mapSeagullMode === "howto") markIntroSeen();
  if (mapSeagullMode === "shop") markSeagullShopHintSeen();
  const finish = () => {
    hideMapSeagullGuide();
    syncAdventureLaunchVisibility();
  };
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    finish();
    return;
  }
  const perch = mapSeagullGuide.querySelector(".map-seagull__perch");
  const bird = mapSeagullGuide.querySelector(".map-seagull__bird");
  if (perch) {
    const r = perch.getBoundingClientRect();
    perch.style.setProperty("--fly-left", `${Math.round(r.left)}px`);
    perch.style.setProperty("--fly-top", `${Math.round(r.top)}px`);
    perch.style.setProperty("--fly-width", `${Math.round(r.width)}px`);
    perch.classList.add("map-seagull__perch--flying");
  }
  mapSeagullGuide.classList.add("map-seagull--fly-away");
  let done = false;
  const onDone = (e) => {
    if (e && e.animationName && e.animationName !== "mapSeagullFlyAway") return;
    if (done) return;
    done = true;
    bird?.removeEventListener("animationend", onDone);
    finish();
  };
  bird?.addEventListener("animationend", onDone);
  window.setTimeout(() => onDone(), 2300);
}

function dismissMapSeagullGuide() {
  if (!mapSeagullGuide || mapSeagullGuide.hidden) return;
  if (mapSeagullMode === "shop") {
    flyAwayMapSeagull();
    return;
  }
  if (mapSeagullMode === "howto") markIntroSeen();
  hideMapSeagullGuide();
  syncAdventureLaunchVisibility();
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
  if (hasPendingSeagullShopHint() && !hasSeenSeagullShopHint()) {
    showMapSeagullShopHint();
    return;
  }
  if (!hasSeenIntro()) {
    showMapSeagullHowto();
  }
}

function openIntro() {
  hideMapSeagullGuide();
  if (panelIntro) panelIntro.hidden = false;
  syncAdventureLaunchVisibility();
}

function closeIntro() {
  if (panelIntro) panelIntro.hidden = true;
  markIntroSeen();
  hideMapSeagullGuide();
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
  refreshCollectablesUI();
  adventureMapUiProgress = -1;
  adventureTrailDrawnCount = 0;
  pendingAdventureTrailReveal = false;
  cancelAdventureTrailReveal();
  buildAdventureLevelUI(true);
  showToast("Progress reset", 1500);
}

/** Dev/test: wipe progress + first-time tutorial flags so you can play as a new fisher. Ctrl+N */
function saveProgressBackupBeforeNewPlayerTest() {
  try {
    // Don't overwrite a real backup with an already-wiped new-player state.
    const looksEmpty =
      (gameMeta.coins || 0) <= 0 &&
      (gameMeta.totalTreasureChests || 0) <= 0 &&
      (gameMeta.adventureHighestLevel || 0) <= 0 &&
      !hasSeenIntro();
    if (looksEmpty && localStorage.getItem(PROGRESS_BACKUP_KEY)) return;
    const snapshot = {
      meta: gameMeta,
      introSeen: localStorage.getItem(INTRO_SEEN_KEY),
      shopGuideSeen: localStorage.getItem(SHOP_GUIDE_SEEN_KEY),
      seagullShopHint: localStorage.getItem(SEAGULL_SHOP_HINT_KEY),
      seagullShopPending: localStorage.getItem(SEAGULL_SHOP_PENDING_KEY),
      savedAt: Date.now(),
    };
    localStorage.setItem(PROGRESS_BACKUP_KEY, JSON.stringify(snapshot));
  } catch {
    /* ignore quota */
  }
}

function applyLoadedProgressState() {
  selectedRod = rodSpecById(FREE_ROD_ID);
  roundBait = { catchRadiusMult: 1, rareAssistAdd: 0, lightRadiusMult: 1 };
  normalizeSelectedBaitId();
  normalizeSelectedRod();
  refreshCoinDisplays();
  buildBaitUI();
  buildRodUI();
  buildShopUI();
  updateAdventureLaunchUI();
  adventureMapUiProgress = -1;
  adventureTrailDrawnCount = 0;
  pendingAdventureTrailReveal = false;
  cancelAdventureTrailReveal();
  buildAdventureLevelUI(true);
  hideMapSeagullGuide();
  ensureDailyCatchChallenge();
  showHomePanel();
}

function stopActiveSessionsForProgressTest() {
  if (playing) {
    playing = false;
    stopReefMusic();
    clearKrakens();
    jackpotCrab = null;
    appRoot?.classList.remove("app--playing");
  }
  if (crabTrapSession) {
    crabTrapSession.running = false;
    if (crabTrapSession.rafId) cancelAnimationFrame(crabTrapSession.rafId);
    crabTrapSession = null;
    if (crabTrapStage) {
      crabTrapStage.hidden = true;
      crabTrapStage.setAttribute("aria-hidden", "true");
    }
  }
  duelSession = null;
  eventMinigameSession = null;
  adventureSession = null;
}

function resetAsNewPlayer() {
  saveProgressBackupBeforeNewPlayerTest();
  stopActiveSessionsForProgressTest();
  try {
    localStorage.removeItem(INTRO_SEEN_KEY);
    localStorage.removeItem(SHOP_GUIDE_SEEN_KEY);
    localStorage.removeItem(SEAGULL_SHOP_HINT_KEY);
    localStorage.removeItem(SEAGULL_SHOP_PENDING_KEY);
  } catch {
    /* ignore */
  }
  gameMeta = defaultMeta();
  saveMeta();
  applyLoadedProgressState();
  showToast("New player test mode — press Ctrl+R to restore", 2600);
}

/** Dev/test: restore the progress snapshot saved by Ctrl+N. Ctrl+R */
function restoreProgressBackup() {
  let snapshot = null;
  try {
    const raw = localStorage.getItem(PROGRESS_BACKUP_KEY);
    if (raw) snapshot = JSON.parse(raw);
  } catch {
    snapshot = null;
  }
  if (!snapshot || !snapshot.meta || typeof snapshot.meta !== "object") {
    showToast("No saved progress to restore — use Ctrl+N first", 2200);
    return;
  }
  stopActiveSessionsForProgressTest();
  try {
    const setOrClear = (key, value) => {
      if (value == null || value === "") localStorage.removeItem(key);
      else localStorage.setItem(key, String(value));
    };
    setOrClear(INTRO_SEEN_KEY, snapshot.introSeen);
    setOrClear(SHOP_GUIDE_SEEN_KEY, snapshot.shopGuideSeen);
    setOrClear(SEAGULL_SHOP_HINT_KEY, snapshot.seagullShopHint);
    setOrClear(SEAGULL_SHOP_PENDING_KEY, snapshot.seagullShopPending);
  } catch {
    /* ignore */
  }
  gameMeta = loadMetaFromObject(snapshot.meta);
  saveMeta();
  applyLoadedProgressState();
  showToast("Progress restored", 1800);
}

function loadMetaFromObject(o) {
  try {
    const counts = o.baitCounts && typeof o.baitCounts === "object" && !Array.isArray(o.baitCounts) ? { ...o.baitCounts } : {};
    for (const k of Object.keys(counts)) {
      counts[k] = Math.max(0, Math.floor(Number(counts[k]) || 0));
    }
    let selectedBaitId = typeof o.selectedBaitId === "string" ? o.selectedBaitId : "standard";
    if (!BAITS.some((b) => b.id === selectedBaitId)) selectedBaitId = "standard";
    const owned = Array.isArray(o.ownedRodIds)
      ? o.ownedRodIds.filter((id) => RODS.some((r) => r.id === id) && id !== MAGNET_ROD_ID)
      : [];
    const ownedRodIds = Array.from(new Set([FREE_ROD_ID, ...owned]));
    let selectedRodId = typeof o.selectedRodId === "string" ? o.selectedRodId : FREE_ROD_ID;
    if (!ownedRodIds.includes(selectedRodId)) selectedRodId = FREE_ROD_ID;
    const adventureProgress = migrateAdventureMapProgress(o.adventureHighestLevel, o.adventureMapContentRev);
    return {
      coins: Math.max(0, Math.floor(Number(o.coins) || 0)),
      gems: Math.max(0, Math.floor(Number(o.gems) || 0)),
      baitCounts: counts,
      selectedBaitId,
      ownedRodIds,
      selectedRodId,
      totalTreasureChests: Math.max(0, Math.floor(Number(o.totalTreasureChests) || 0)),
      adventureHighestLevel: adventureProgress.adventureHighestLevel,
      adventureMapContentRev: adventureProgress.adventureMapContentRev,
      pendingAdventureHomeCelebration: Boolean(o.pendingAdventureHomeCelebration),
      pendingBonusVoyagesCelebration: Boolean(o.pendingBonusVoyagesCelebration),
      pendingIceVoyagesCelebration: Boolean(o.pendingIceVoyagesCelebration),
      pendingLostCityCelebration: Boolean(o.pendingLostCityCelebration),
      pendingDailyPrizeCelebration: normalizePendingDailyPrizeCelebration(o.pendingDailyPrizeCelebration),
      playerInitials: String(o.playerInitials || "")
        .toUpperCase()
        .replace(/[^A-Z]/g, "")
        .slice(0, 3),
      playerName: String(o.playerName || "").replace(/\s+/g, " ").trim().slice(0, 16),
      dailyPrizeCheckedDay: String(o.dailyPrizeCheckedDay || ""),
      magnetRodDayKey: String(o.magnetRodDayKey || ""),
      duelTickets: Math.max(0, Math.floor(Number(o.duelTickets) || 0)),
      duelTicketsDayKey: String(o.duelTicketsDayKey || ""),
      dailyCatch: normalizeDailyCatchState(o.dailyCatch),
      chestItems: normalizeChestItems(o.chestItems),
      catchStamps: normalizeCatchStamps(o.catchStamps),
      pendingLuckyLure: Boolean(o.pendingLuckyLure),
      pendingDoubleHaul: Boolean(o.pendingDoubleHaul),
      pendingMysteryReef: Boolean(o.pendingMysteryReef),
      ownedClothes: normalizeOwnedClothes(o.ownedClothes),
      equippedClothes: normalizeEquippedClothes(o.equippedClothes, normalizeOwnedClothes(o.ownedClothes)),
      dailyClothesShop: normalizeDailyClothesShop(o.dailyClothesShop),
      ownedAvatarFrames: normalizeOwnedAvatarFrames(o.ownedAvatarFrames),
      equippedAvatarFrame: normalizeEquippedAvatarFrame(
        o.equippedAvatarFrame,
        normalizeOwnedAvatarFrames(o.ownedAvatarFrames)
      ),
      dailyAvatarFrameShop: normalizeDailyAvatarFrameShop(o.dailyAvatarFrameShop),
      tourneyVoteDayKey: typeof o.tourneyVoteDayKey === "string" ? o.tourneyVoteDayKey : "",
      tourneyVoteKind: typeof o.tourneyVoteKind === "string" ? o.tourneyVoteKind : "",
      tourneySignedUpDayKey: typeof o.tourneySignedUpDayKey === "string" ? o.tourneySignedUpDayKey : "",
    };
  } catch {
    return defaultMeta();
  }
}

function clearPlayfieldCanvas() {
  if (!canvas) return;
  const paint = ctx || canvas.getContext("2d");
  if (!paint || w <= 0 || h <= 0) return;
  paint.clearRect(0, 0, w, h);
}

function hideAllPanels() {
  if (panelProfile && !panelProfile.hidden) saveProfileNameFromInput();
  if (panelEvents && !panelEvents.hidden && duelMatchmakingActive) {
    duelMatchmakingActive = false;
    void cancelDuelLobbyIfHost(duelLobbyMatchId);
    duelLobbyMatchId = null;
    setDuelMatchmakingUi(false);
  }
  if (panelSplash) panelSplash.hidden = true;
  if (panelStart) panelStart.hidden = true;
  if (panelOver) panelOver.hidden = true;
  if (panelShop) panelShop.hidden = true;
  if (panelEvents) panelEvents.hidden = true;
  if (eventsOcean) eventsOcean.hidden = true;
  if (panelIntro) panelIntro.hidden = true;
  if (panelAdventure) panelAdventure.hidden = true;
  if (panelAdventurePrep) panelAdventurePrep.hidden = true;
  if (panelEventPrep) panelEventPrep.hidden = true;
  if (panelAdventureFail) panelAdventureFail.hidden = true;
  if (panelAdventureWin) panelAdventureWin.hidden = true;
  if (panelDuelOver) panelDuelOver.hidden = true;
  if (panelCrabReward) panelCrabReward.hidden = true;
  if (panelCollectables) panelCollectables.hidden = true;
  if (panelProfile) panelProfile.hidden = true;
  deferDailyPrizeCelebration();
  appRoot?.classList.remove("app--events-mode", "app--splash", "app--playing", "app--duel", "app--duel-solo", "app--matchup", "app--adventure-play");
  clearAdventurePlayThemeClasses();
  clearPlayfieldCanvas();
  stopDailyEventCountdown();
  stopEventsMusic();
}

/** Show exactly one home menu surface; every other overlay stays hidden. */
function showExclusiveMenu(which) {
  hideAllPanels();
  if (!duelSession && !eventMinigameSession && !crabTrapSession && !adventureSession) {
    playing = false;
  }
  appRoot?.classList.remove("app--playing", "app--duel", "app--duel-solo", "app--matchup", "app--adventure-play");
  clearAdventurePlayThemeClasses();
  clearPlayfieldCanvas();
  if (which === "start") {
    if (panelStart) panelStart.hidden = false;
    window.setTimeout(tryStartDailyPrizeCelebration, 200);
    return;
  }
  if (which === "shop") {
    if (panelShop) panelShop.hidden = false;
    return;
  }
  if (which === "events") {
    if (panelEvents) panelEvents.hidden = false;
    /* Keep the old sunset ocean off — Events uses its own arena backdrop. */
    if (eventsOcean) eventsOcean.hidden = true;
    appRoot?.classList.add("app--events-mode");
    return;
  }
  if (which === "collectables") {
    if (panelCollectables) panelCollectables.hidden = false;
    return;
  }
  if (which === "profile") {
    if (panelProfile) panelProfile.hidden = false;
  }
}

function isAdventureHomeCelebrationActive() {
  return Boolean(gameMeta.pendingAdventureHomeCelebration && isAdventureUnlocked() && isHomeScreenActive());
}

let adventureLockUnlockListener = null;
let adventureHomeReturnInProgress = false;

function returnAdventureButtonFromCenter(done) {
  if (!btnAdventureMode) {
    done();
    return;
  }
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion || !btnAdventureMode.classList.contains("adventure-launch--centered")) {
    done();
    return;
  }

  appRoot?.classList.remove("app--adventure-unlock-celebrate");
  if (adventureUnlockBanner) {
    adventureUnlockBanner.hidden = true;
    adventureUnlockBanner.setAttribute("aria-hidden", "true");
    adventureUnlockBanner.classList.remove("adventure-unlock-banner--active");
  }

  btnAdventureMode.classList.remove("adventure-launch--flash", "adventure-launch--unlock-ready");
  adventureUnlockHint?.classList.remove("adventure-launch__hint--centered");
  btnAdventureMode.classList.add("adventure-launch--return");

  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    btnAdventureMode.removeEventListener("animationend", onReturnDone);
    btnAdventureMode.classList.remove("adventure-launch--return");
    done();
  };

  const onReturnDone = (e) => {
    if (e.target !== btnAdventureMode || e.animationName !== "adventureLaunchReturnFromCenter") return;
    finish();
  };

  btnAdventureMode.addEventListener("animationend", onReturnDone);
  window.setTimeout(finish, 1100);
}

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
    tryStartDailyPrizeCelebration();
  };
  adventureLock.addEventListener("animationend", adventureLockUnlockListener);
  updateAdventureLaunchUI();
}

function startAdventureHomeUnlockAnimation() {
  if (!isAdventureHomeCelebrationActive() || !adventureLock || !btnAdventureMode) return;
  if (btnAdventureMode.classList.contains("adventure-launch--celebrate")) return;

  showAdventureHomeUnlockBanner();
  appRoot?.classList.add("app--adventure-unlock-celebrate");
  setStartMoreOptionsOpen(true);
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
  window.setTimeout(() => {
    if (!btnAdventureMode.classList.contains("adventure-launch--rise")) return;
    btnAdventureMode.removeEventListener("animationend", onRiseDone);
    finishRise();
  }, 1900);
}

function showHomePanel() {
  hideAllPanels();
  if (panelStart) panelStart.hidden = false;
  adventureSession = null;
  updateAdventureLaunchUI();
  syncHomeLaunchButtons();
  if (musicEnabled) startHomeMusic();
  window.requestAnimationFrame(() => startAdventureHomeUnlockAnimation());
  showIntroIfNeeded();
  void processDailyPrizePayouts().then(() => {
    window.setTimeout(tryStartDailyPrizeCelebration, 500);
  });
}

function isSplashScreenActive() {
  return Boolean(panelSplash && !panelSplash.hidden);
}

function dismissSplashScreen() {
  if (!isSplashScreenActive()) return;
  unlockAudioFromGesture();
  if (panelSplash) panelSplash.hidden = true;
  appRoot?.classList.remove("app--splash");
  unlockHomeAudio();
  showHomePanel();
  deferStartupWork();
}

function isHomeScreenActive() {
  if (playing) return false;
  if (isSplashScreenActive()) return false;
  if (!panelStart || panelStart.hidden) return false;
  const blocking = [panelOver, panelShop, panelEvents, panelCollectables, panelProfile, panelIntro, panelAdventure, panelAdventurePrep, panelEventPrep, panelAdventureFail, panelAdventureWin, panelDuelOver];
  for (const panel of blocking) {
    if (panel && !panel.hidden) return false;
  }
  return true;
}

function getActiveTabId() {
  if (playing || isSplashScreenActive()) return "";
  if (panelShop && !panelShop.hidden) return "shop";
  if (panelEvents && !panelEvents.hidden) return "events";
  if (panelCollectables && !panelCollectables.hidden) return "collectables";
  if (panelAdventure && !panelAdventure.hidden) return "adventure";
  if (panelAdventurePrep && !panelAdventurePrep.hidden) return "adventure";
  if (panelAdventureFail && !panelAdventureFail.hidden) return "adventure";
  if (panelAdventureWin && !panelAdventureWin.hidden) return "adventure";
  if (isHomeScreenActive()) return "world";
  return "";
}

function shouldShowTabBar() {
  if (playing || isSplashScreenActive()) return false;
  if (panelOver && !panelOver.hidden) return false;
  if (panelIntro && !panelIntro.hidden) return false;
  if (panelDuelOver && !panelDuelOver.hidden) return false;
  if (panelCrabReward && !panelCrabReward.hidden) return false;
  if (crabTrapSession) return false;
  if (panelProfile && !panelProfile.hidden) return true;
  const tab = getActiveTabId();
  return Boolean(tab);
}

function syncActiveTabButton() {
  const active = getActiveTabId();
  homeLaunchStack?.querySelectorAll("[data-tab]").forEach((btn) => {
    const on = btn.dataset.tab === active;
    btn.classList.toggle("is-active", on);
    btn.setAttribute("aria-current", on ? "page" : "false");
  });
}

function syncHomeLaunchButtons() {
  const onHome = isHomeScreenActive();
  const showTabs = shouldShowTabBar();
  appRoot.classList.toggle("app--home-screen", onHome);
  appRoot.classList.toggle("app--show-tabs", showTabs);
  if (homeLaunchDock) homeLaunchDock.hidden = !showTabs;
  if (homeLaunchStack) homeLaunchStack.hidden = !showTabs;
  if (adventureUnlockHint) {
    const showChestHint =
      onHome && (!isAdventureUnlocked() || isAdventureHomeCelebrationActive());
    adventureUnlockHint.hidden = !showChestHint;
  }
  syncActiveTabButton();
}

function syncAdventureLaunchVisibility() {
  syncHomeLaunchButtons();
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

function adventureChartEl(sectionId) {
  return adventureMapScroll?.querySelector(`.adventure-chart[data-section="${sectionId}"]`);
}

function adventureMapPhoneMode() {
  return typeof window !== "undefined" && window.matchMedia("(max-width: 560px)").matches;
}

function unlockedAdventureSectionIds() {
  return ADVENTURE_MAP_SECTION_IDS.filter((id) => isAdventureSectionUnlocked(id));
}

let adventureMapPhoneSection = "pirates";

function updateAdventureMapPager() {
  if (!adventureMapPager) return;
  const phone = adventureMapPhoneMode();
  const unlocked = unlockedAdventureSectionIds();
  const show = phone && unlocked.length > 1;
  adventureMapPager.hidden = !show;
  if (!show) return;
  const idx = Math.max(0, unlocked.indexOf(adventureMapPhoneSection));
  if (btnAdventureMapPrev) btnAdventureMapPrev.disabled = idx <= 0;
  if (btnAdventureMapNext) btnAdventureMapNext.disabled = idx >= unlocked.length - 1;
}

function setAdventureMapPhoneSection(sectionId, remasureTrail = true) {
  const unlocked = unlockedAdventureSectionIds();
  adventureMapPhoneSection = unlocked.includes(sectionId) ? sectionId : unlocked[0] || "pirates";
  applyAdventureMapExtent();
  if (remasureTrail) {
    window.requestAnimationFrame(() => {
      if (!pendingAdventureTrailReveal) syncAdventureMapTrail(false);
    });
  }
}

function stepAdventureMapPhoneSection(dir) {
  const unlocked = unlockedAdventureSectionIds();
  const idx = unlocked.indexOf(adventureMapPhoneSection);
  const next = unlocked[idx + dir];
  if (!next) return;
  setAdventureMapPhoneSection(next);
}

function applyAdventureMapExtent() {
  const phone = adventureMapPhoneMode();
  const unlocked = unlockedAdventureSectionIds();
  if (phone && !unlocked.includes(adventureMapPhoneSection)) {
    adventureMapPhoneSection = unlocked[0] || "pirates";
  }
  for (const id of ADVENTURE_MAP_SECTION_IDS) {
    const chart = adventureChartEl(id);
    if (!chart) continue;
    const show = isAdventureSectionUnlocked(id) && (!phone || id === adventureMapPhoneSection);
    chart.hidden = !show;
  }
  updateAdventureMapPager();
}

function adventureTrailEl(sectionId) {
  return document.getElementById(`adventureMapTrail-${sectionId}`);
}

function adventureTrailRevealEl(sectionId) {
  return document.getElementById(`adventureMapTrailReveal-${sectionId}`);
}

function adventureMapCoords(index) {
  const layout = ADVENTURE_MAP_NODE_LAYOUT[index] || { x: 50, y: 50, section: "pirates" };
  const section = layout.section || adventureSectionIdForIndex(index);
  const trail = adventureTrailEl(section);
  const svg = trail?.ownerSVGElement || adventureChartEl(section)?.querySelector(".adventure-chart__art");
  const pin = adventureLevelList
    ?.querySelector(`.adventure-map-node[data-level-index="${index}"] .adventure-map-node__pin`);
  if (svg && pin) {
    const svgRect = svg.getBoundingClientRect();
    const pinRect = pin.getBoundingClientRect();
    if (svgRect.width > 1 && svgRect.height > 1 && pinRect.width > 0) {
      return {
        x: ((pinRect.left + pinRect.width * 0.5 - svgRect.left) / svgRect.width) * ADVENTURE_MAP_SVG_WIDTH,
        y: ((pinRect.top + pinRect.height * 0.5 - svgRect.top) / svgRect.height) * ADVENTURE_MAP_SVG_HEIGHT,
        section,
      };
    }
  }
  return {
    x: (layout.x / 100) * ADVENTURE_MAP_SVG_WIDTH,
    y: (layout.y / 100) * ADVENTURE_MAP_SVG_HEIGHT,
    section,
  };
}

function syncAdventureMapSections() {
  applyAdventureMapExtent();
}

function scrollAdventureMapToSection(sectionId, instant = true) {
  const chart = adventureChartEl(sectionId);
  if (!chart || !adventureMapScroll) return;
  if (adventureMapPhoneMode()) {
    setAdventureMapPhoneSection(sectionId);
    return;
  }
  const run = () => {
    chart.scrollIntoView({ block: "center", behavior: instant ? "instant" : "smooth" });
  };
  if (instant) run();
  else window.requestAnimationFrame(run);
}

function runAdventureMapSectionReveal(kind) {
  if (adventureMapPhoneMode()) setAdventureMapPhoneSection(kind, false);
  const chart = adventureChartEl(kind);
  if (!chart || !adventureLevelList) return;
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  applyAdventureMapExtent();
  if (prefersReducedMotion) {
    scrollAdventureMapToSection(kind, true);
    if (kind === "gold") clearBonusVoyagesMapCelebration();
    else if (kind === "ice") clearIceVoyagesMapCelebration();
    else clearLostCityMapCelebration();
    return;
  }
  chart.classList.add("adventure-chart--revealing");
  const nodes = chart.querySelectorAll(".adventure-map-node");
  nodes.forEach((node, i) => {
    node.classList.add("adventure-map-node--section-reveal");
    node.style.animationDelay = `${i * 130}ms`;
  });
  window.setTimeout(() => scrollAdventureMapToSection(kind, false), 400);
  window.setTimeout(() => {
    chart.classList.remove("adventure-chart--revealing");
    nodes.forEach((node) => {
      node.classList.remove("adventure-map-node--section-reveal");
      node.style.animationDelay = "";
    });
    if (kind === "gold") clearBonusVoyagesMapCelebration();
    else if (kind === "ice") clearIceVoyagesMapCelebration();
    else clearLostCityMapCelebration();
  }, 3600);
}

function adventureMapVisibleLevelCount() {
  const highest = gameMeta.adventureHighestLevel || 0;
  return Math.min(ADVENTURE_LEVEL_COUNT, highest + 1);
}

/** How many map nodes the settled red trail currently includes. */
let adventureTrailDrawnCount = 0;
/** After clearing a voyage, draw the new dotted segment(s) when the map opens. */
let pendingAdventureTrailReveal = false;
let adventureTrailRevealRaf = 0;

function adventureTrailPointsInSection(sectionId, count) {
  const meta = ADVENTURE_MAP_SECTIONS[sectionId];
  if (!meta) return [];
  const last = Math.min(count - 1, meta.endIndex);
  if (last < meta.startIndex) return [];
  const pts = [];
  for (let i = meta.startIndex; i <= last; i++) pts.push(adventureMapCoords(i));
  return pts;
}

function buildAdventureTrailPathFromPts(pts) {
  if (!pts.length) return "";
  if (pts.length === 1) return `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const cur = pts[i];
    const dx = cur.x - prev.x;
    const dy = cur.y - prev.y;
    const len = Math.hypot(dx, dy) || 1;
    const bulge = (i % 2 === 0 ? 1 : -1) * Math.min(22, len * 0.14);
    const cx = (prev.x + cur.x) * 0.5 - (dy / len) * bulge;
    const cy = (prev.y + cur.y) * 0.5 + (dx / len) * bulge;
    d += ` Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${cur.x.toFixed(1)} ${cur.y.toFixed(1)}`;
  }
  return d;
}

function setAdventureTrailPaths(count, skipSectionId = null) {
  for (const sectionId of ADVENTURE_MAP_SECTION_IDS) {
    const trail = adventureTrailEl(sectionId);
    if (!trail || sectionId === skipSectionId) continue;
    trail.setAttribute("d", buildAdventureTrailPathFromPts(adventureTrailPointsInSection(sectionId, count)));
  }
}

function cancelAdventureTrailReveal() {
  if (adventureTrailRevealRaf) {
    cancelAnimationFrame(adventureTrailRevealRaf);
    adventureTrailRevealRaf = 0;
  }
  for (const id of ADVENTURE_MAP_SECTION_IDS) {
    adventureTrailRevealEl(id)?.setAttribute("d", "");
  }
}

function polylineLength(pts) {
  let len = 0;
  for (let i = 1; i < pts.length; i++) {
    len += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y);
  }
  return len;
}

function pathFromPolylinePrefix(pts, distance) {
  if (!pts.length) return "";
  if (pts.length === 1 || distance <= 0) {
    return `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  }
  let remaining = distance;
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i].x - pts[i - 1].x;
    const dy = pts[i].y - pts[i - 1].y;
    const segLen = Math.hypot(dx, dy);
    if (remaining >= segLen) {
      d += ` L ${pts[i].x.toFixed(1)} ${pts[i].y.toFixed(1)}`;
      remaining -= segLen;
      continue;
    }
    const t = segLen > 0 ? remaining / segLen : 1;
    d += ` L ${(pts[i - 1].x + dx * t).toFixed(1)} ${(pts[i - 1].y + dy * t).toFixed(1)}`;
    break;
  }
  return d;
}

function finishAdventureTrailReveal(toCount) {
  cancelAdventureTrailReveal();
  adventureTrailDrawnCount = toCount;
  pendingAdventureTrailReveal = false;
  setAdventureTrailPaths(toCount);
}

function animateAdventureTrailReveal(fromCount, toCount) {
  cancelAdventureTrailReveal();
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const toSection = adventureSectionIdForIndex(Math.max(0, toCount - 1));
  const fromSection = fromCount > 0 ? adventureSectionIdForIndex(fromCount - 1) : toSection;
  const revealEl = adventureTrailRevealEl(toSection);
  if (prefersReducedMotion || toCount <= fromCount || !revealEl) {
    finishAdventureTrailReveal(toCount);
    return;
  }

  const meta = ADVENTURE_MAP_SECTIONS[toSection];
  const settledCount = fromSection === toSection ? fromCount : meta.startIndex;
  setAdventureTrailPaths(toCount, toSection);
  const trail = adventureTrailEl(toSection);
  if (trail) {
    trail.setAttribute("d", buildAdventureTrailPathFromPts(adventureTrailPointsInSection(toSection, Math.max(settledCount, 1))));
  }

  const allPts = adventureTrailPointsInSection(toSection, toCount);
  const startLocal = Math.max(0, settledCount - meta.startIndex - 1);
  const animPts = allPts.slice(startLocal);
  if (animPts.length < 2) {
    finishAdventureTrailReveal(toCount);
    return;
  }

  const totalLen = polylineLength(animPts);
  const newSegs = Math.max(1, toCount - Math.max(fromCount, 1));
  const duration = Math.min(2200, 700 + newSegs * 420);
  const start = performance.now();

  const tick = (now) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    const dist = totalLen * eased;
    revealEl.setAttribute("d", pathFromPolylinePrefix(animPts, dist));
    if (t < 1) {
      adventureTrailRevealRaf = requestAnimationFrame(tick);
      return;
    }
    finishAdventureTrailReveal(toCount);
  };
  adventureTrailRevealRaf = requestAnimationFrame(tick);
}

function syncAdventureMapTrail(animateIfPending = true) {
  const visibleCount = adventureMapVisibleLevelCount();
  const shouldAnimate =
    animateIfPending &&
    pendingAdventureTrailReveal &&
    visibleCount > adventureTrailDrawnCount;

  if (shouldAnimate) {
    const fromCount = adventureTrailDrawnCount;
    cancelAdventureTrailReveal();
    setAdventureTrailPaths(Math.max(fromCount, 1));
    window.setTimeout(() => {
      if (!pendingAdventureTrailReveal) return;
      animateAdventureTrailReveal(fromCount, adventureMapVisibleLevelCount());
    }, 220);
    return;
  }

  cancelAdventureTrailReveal();
  pendingAdventureTrailReveal = false;
  adventureTrailDrawnCount = visibleCount;
  setAdventureTrailPaths(visibleCount);
}

function updateAdventureMapHereLabel() {
  if (!adventureMapHere) return;
  const highest = gameMeta.adventureHighestLevel || 0;
  const allCleared = highest >= ADVENTURE_LEVEL_COUNT;
  const nextPlayable = Math.min(ADVENTURE_LEVEL_COUNT, highest + 1);
  const lvl = ADVENTURE_LEVELS[allCleared ? ADVENTURE_LEVEL_COUNT - 1 : nextPlayable - 1];
  adventureMapHere.textContent = lvl
    ? allCleared
      ? `Cleared: ${lvl.name}`
      : `Now: ${lvl.name}`
    : "";
}

function scrollAdventureMapToProgress(instant = true) {
  if (!adventureMapScroll || !adventureLevelList) return;
  updateAdventureMapHereLabel();
  const clearedNodes = adventureLevelList.querySelectorAll(".adventure-map-node--cleared");
  const target =
    adventureLevelList.querySelector(".adventure-map-node--current") ||
    (clearedNodes.length ? clearedNodes[clearedNodes.length - 1] : null) ||
    adventureLevelList.querySelector(".adventure-map-node");
  if (!target) return;
  if (adventureMapPhoneMode()) {
    setAdventureMapPhoneSection(target.dataset.section || "pirates");
    return;
  }
  const run = () => {
    target.scrollIntoView({ block: "center", behavior: instant ? "instant" : "smooth" });
  };
  if (instant) run();
  else window.requestAnimationFrame(run);
}

let adventureMapUiProgress = -1;
let adventureMapUiBonusRevealed = null;
let adventureMapUiIceRevealed = null;
let adventureMapUiLostCityRevealed = null;

function syncAdventureMapNodeStates() {
  if (!adventureLevelList) return;
  const highest = gameMeta.adventureHighestLevel || 0;
  const nextPlayable = Math.min(ADVENTURE_LEVEL_COUNT, highest + 1);
  const nodes = adventureLevelList.querySelectorAll(".adventure-map-node");
  nodes.forEach((b) => {
    const i = Number(b.dataset.levelIndex);
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
  updateAdventureMapHereLabel();
}

function buildAdventureLevelUI(force = false) {
  if (!adventureLevelList) return;
  const highest = gameMeta.adventureHighestLevel || 0;
  const bonusRevealed = isAdventureBonusUnlocked();
  const iceRevealed = isAdventureIceUnlocked();
  const lostCityRevealed = isAdventureLostCityUnlocked();
  const visibleCount = adventureMapVisibleLevelCount();
  const existingNodes = adventureLevelList.querySelectorAll(".adventure-map-node").length;
  if (
    !force &&
    adventureMapUiProgress === highest &&
    adventureMapUiBonusRevealed === bonusRevealed &&
    adventureMapUiIceRevealed === iceRevealed &&
    adventureMapUiLostCityRevealed === lostCityRevealed &&
    existingNodes === visibleCount
  ) {
    syncAdventureMapNodeStates();
    if (!pendingAdventureTrailReveal && adventureTrailDrawnCount !== visibleCount) {
      syncAdventureMapTrail(false);
    } else if (!adventureTrailEl("pirates")?.getAttribute("d") && visibleCount > 1) {
      syncAdventureMapTrail(false);
    }
    return;
  }
  adventureMapUiProgress = highest;
  adventureMapUiBonusRevealed = bonusRevealed;
  adventureMapUiIceRevealed = iceRevealed;
  adventureMapUiLostCityRevealed = lostCityRevealed;
  adventureLevelList.querySelectorAll(".adventure-chart__nodes").forEach((el) => {
    el.innerHTML = "";
  });
  const nextPlayable = Math.min(ADVENTURE_LEVEL_COUNT, highest + 1);

  syncAdventureMapTrail(true);

  const frags = {};
  for (const id of ADVENTURE_MAP_SECTION_IDS) frags[id] = document.createDocumentFragment();
  for (let i = 0; i < ADVENTURE_LEVELS.length; i++) {
    const lvl = ADVENTURE_LEVELS[i];
    // Hide voyages (and their lands) until the player has unlocked them —
    // only cleared levels and the single next playable voyage appear.
    if (!isAdventureLevelPlayable(lvl.level)) continue;
    const layout = ADVENTURE_MAP_NODE_LAYOUT[i] || { x: 50, y: 50 };
    const playable = isAdventureLevelPlayable(lvl.level);
    const cleared = lvl.level <= highest;
    const isCurrent = playable && !cleared && lvl.level === nextPlayable;
    const isTreasureCoveFinale = i === TREASURE_COVE_INDEX;
    const isBonus = i >= ADVENTURE_MAIN_LEVEL_COUNT && i < ADVENTURE_ICE_START_INDEX;
    const isIce = i >= ADVENTURE_ICE_START_INDEX && i < ADVENTURE_LOST_CITY_START_INDEX;
    const isLostCity = i >= ADVENTURE_LOST_CITY_START_INDEX;
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
    if (isLostCity) b.classList.add("adventure-map-node--lost-city");
    if (isUltimateFinale) b.classList.add("adventure-map-node--bonus-finale");
    if (isIce && i === AURORA_REACH_INDEX) b.classList.add("adventure-map-node--ice-finale");
    if (isLostCity && isUltimateFinale) b.classList.add("adventure-map-node--lost-city-finale");
    b.disabled = !playable;
    b.style.left = `${layout.x}%`;
    b.style.top = `${layout.y}%`;
    const sectionName = isLostCity
      ? ADVENTURE_SECTION_LOST_CITY
      : isIce
        ? ADVENTURE_SECTION_FROZEN_SEA
        : isBonus
          ? ADVENTURE_SECTION_GOLD_QUEST
          : ADVENTURE_SECTION_PIRATES_PATH;
    b.title = `${lvl.name} — ${sectionName} · pass ${lvl.passScore}`;
    b.dataset.levelIndex = String(i);
    b.dataset.section = isLostCity ? "lost-city" : isIce ? "ice" : isBonus ? "gold" : "pirates";
    const showTreasureX = isTreasureCoveFinale || isUltimateFinale || (isIce && i === AURORA_REACH_INDEX);
    b.innerHTML = `
      <span class="adventure-map-node__mark" aria-hidden="true">
        <span class="adventure-map-node__pin">
          <span class="adventure-map-node__num">${lvl.level}</span>
        </span>
        ${showTreasureX ? '<span class="adventure-map-node__x"></span>' : ""}
        ${isCurrent
          ? `<span class="adventure-map-node__boat" aria-hidden="true">
          <svg class="adventure-map-node__boat-svg" viewBox="0 0 48 42" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 28 L10 34 L38 34 L42 28 Z" fill="#3a2410"/>
            <path d="M8 28 L12 22 L36 22 L40 28 Z" fill="#5c3a18"/>
            <rect x="22.5" y="6" width="2.2" height="22" fill="#2e2418"/>
            <path d="M24.5 8 L38 14 L24.5 20 Z" fill="#f2e6c8" stroke="#2e2418" stroke-width="0.7"/>
            <path d="M22.5 10 L10 15 L22.5 19 Z" fill="#e8d8b0" stroke="#2e2418" stroke-width="0.6"/>
            <path d="M24.5 6 L24.5 2 L32 5 L24.5 6 Z" fill="#1a1a1a"/>
            <circle cx="27.5" cy="4.2" r="1.1" fill="#f5f0e6"/>
            <path d="M26.6 3.7 L28.4 3.7 M27.5 2.8 L27.5 4.6 M26.8 3.1 L28.2 4.5 M28.2 3.1 L26.8 4.5" stroke="#1a1a1a" stroke-width="0.35"/>
            <path d="M14 34 Q24 38 34 34" fill="none" stroke="#4a6880" stroke-width="1.2" opacity="0.55"/>
          </svg>
        </span>`
          : ""}
        ${cleared ? '<span class="adventure-map-node__star" aria-hidden="true"></span>' : ""}
        ${!playable ? '<span class="adventure-map-node__lock" aria-hidden="true"></span>' : ""}
      </span>
      <span class="adventure-map-node__label">${lvl.name}</span>
    `;
    (frags[b.dataset.section] || frags.pirates).appendChild(b);
  }
  for (const id of ADVENTURE_MAP_SECTION_IDS) {
    adventureLevelList
      .querySelector(`.adventure-chart__nodes[data-section="${id}"]`)
      ?.appendChild(frags[id]);
  }
  applyAdventureMapExtent();
  syncAdventureMapSections();
  updateAdventureMapHereLabel();
  // Remeasure after layout so the dotted route ends on each pin, not nearby.
  window.requestAnimationFrame(() => {
    if (!pendingAdventureTrailReveal) syncAdventureMapTrail(false);
  });
  if (adventureMapBanner) {
    adventureMapBanner.hidden = !isAdventureUnlocked();
    if (iceRevealed) {
      adventureMapBanner.textContent = lostCityRevealed
        ? `Chart the course — ${ADVENTURE_SECTION_LOST_CITY} unlocked!`
        : `Chart the course — ${ADVENTURE_SECTION_FROZEN_SEA} unlocked!`;
    } else if (bonusRevealed) {
      adventureMapBanner.textContent = `Chart the course — ${ADVENTURE_SECTION_GOLD_QUEST} unlocked beyond Pirates Path!`;
    } else {
      adventureMapBanner.textContent = `Chart the course — ${ADVENTURE_SECTION_PIRATES_PATH}, then ${ADVENTURE_SECTION_GOLD_QUEST}, ${ADVENTURE_SECTION_FROZEN_SEA}, and ${ADVENTURE_SECTION_LOST_CITY}!`;
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
      ? `${ADVENTURE_SECTION_FROZEN_SEA} — icy voyages on their own chart`
      : `${ADVENTURE_SECTION_FROZEN_SEA} — clear Legend's Gate to unlock`;
    adventureMapIceBanner.classList.toggle(
      "adventure-map-ice-banner--reveal",
      Boolean(gameMeta.pendingIceVoyagesCelebration)
    );
  }
  if (adventureMapLostCityBanner) {
    const showLostCityBanner =
      (isAdventureLostCityUnlocked() || gameMeta.pendingLostCityCelebration) && isAdventureUnlocked();
    adventureMapLostCityBanner.hidden = !showLostCityBanner;
    adventureMapLostCityBanner.textContent = lostCityRevealed
      ? `${ADVENTURE_SECTION_LOST_CITY} — sunken Atlantis voyages on their own chart`
      : `${ADVENTURE_SECTION_LOST_CITY} — clear Aurora Reach to unlock`;
    adventureMapLostCityBanner.classList.toggle(
      "adventure-map-lost-city-banner--reveal",
      Boolean(gameMeta.pendingLostCityCelebration),
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

function clearLostCityMapCelebration() {
  if (!gameMeta.pendingLostCityCelebration) return;
  gameMeta.pendingLostCityCelebration = false;
  saveMeta();
  if (adventureMapLostCityBanner) {
    adventureMapLostCityBanner.classList.remove("adventure-map-lost-city-banner--reveal");
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
    showToast(`${ADVENTURE_SECTION_GOLD_QUEST} unlocked! A new chart is unfurled.`, 4200);
    window.requestAnimationFrame(() => runAdventureMapSectionReveal("gold"));
  } else if (gameMeta.pendingIceVoyagesCelebration) {
    showToast(`${ADVENTURE_SECTION_FROZEN_SEA} unlocked! A new chart is unfurled.`, 4200);
    window.requestAnimationFrame(() => runAdventureMapSectionReveal("ice"));
  } else if (gameMeta.pendingLostCityCelebration) {
    showToast(`${ADVENTURE_SECTION_LOST_CITY} unlocked! A new chart is unfurled.`, 4200);
    window.requestAnimationFrame(() => runAdventureMapSectionReveal("lost-city"));
  }
  if (musicEnabled) {
    stopHomeMusic();
    startAdventureMusic();
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

function adventurePrepSectionLabel(lvl) {
  if (lvl.isLostCity) return ADVENTURE_SECTION_LOST_CITY;
  if (lvl.isIce) return ADVENTURE_SECTION_FROZEN_SEA;
  if (lvl.isBonus) return ADVENTURE_SECTION_GOLD_QUEST;
  return ADVENTURE_SECTION_PIRATES_PATH;
}

function refreshAdventurePrepBoosts() {
  if (!adventurePrepBoosts) return;
  const labels = [];
  if (gameMeta.pendingLuckyLure) labels.push("Lucky Lure");
  if (gameMeta.pendingDoubleHaul) labels.push("Double Haul");
  if (adventurePrepArmed) {
    if (labels.length) {
      adventurePrepArmed.hidden = false;
      adventurePrepArmed.textContent = `Armed: ${labels.join(" · ")}`;
    } else {
      adventurePrepArmed.hidden = true;
      adventurePrepArmed.textContent = "";
    }
  }
  adventurePrepBoosts.replaceChildren();
  const boostIds = ["lucky_lure", "double_haul"];
  let shown = 0;
  for (const id of boostIds) {
    const def = CHEST_ITEM_DEFS[id];
    if (!def) continue;
    const qty = getChestItemCount(id);
    const pending =
      (id === "lucky_lure" && gameMeta.pendingLuckyLure) ||
      (id === "double_haul" && gameMeta.pendingDoubleHaul);
    if (qty < 1 && !pending) continue;
    shown += 1;
    const row = document.createElement("div");
    row.className = `adventure-prep__boost${qty < 1 && !pending ? " adventure-prep__boost--empty" : ""}`;
    const icon = document.createElement("span");
    icon.className = "adventure-prep__boost-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = def.icon;
    const body = document.createElement("div");
    body.className = "adventure-prep__boost-body";
    const name = document.createElement("p");
    name.className = "adventure-prep__boost-name";
    name.textContent = def.name;
    const qtyEl = document.createElement("p");
    qtyEl.className = "adventure-prep__boost-qty";
    qtyEl.textContent = pending ? "Armed for this voyage" : `Owned: ${qty}`;
    body.append(name, qtyEl);
    const useBtn = document.createElement("button");
    useBtn.type = "button";
    useBtn.className = "btn btn--secondary";
    useBtn.dataset.armItem = id;
    useBtn.textContent = pending ? "Armed" : "Arm";
    useBtn.disabled = pending || qty < 1;
    row.append(icon, body, useBtn);
    adventurePrepBoosts.appendChild(row);
  }
  if (!shown) {
    const empty = document.createElement("p");
    empty.className = "adventure-prep__boost-empty";
    empty.textContent = "No upgrades yet — find them in chests.";
    adventurePrepBoosts.appendChild(empty);
  }
}

function openAdventurePrep(levelIndex) {
  const lvl = getAdventureLevel(levelIndex);
  if (!isAdventureLevelPlayable(lvl.level)) return;
  pendingAdventureLevelIndex = levelIndex;
  hideAllPanels();
  if (adventurePrepSection) adventurePrepSection.textContent = adventurePrepSectionLabel(lvl);
  if (adventurePrepTitle) adventurePrepTitle.textContent = lvl.name;
  if (adventurePrepGoal) adventurePrepGoal.textContent = `Goal: ${lvl.passScore} pts`;
  buildBaitUI();
  buildRodUI();
  refreshAdventurePrepBoosts();
  if (panelAdventurePrep) panelAdventurePrep.hidden = false;
  syncHomeLaunchButtons();
  if (musicEnabled) {
    stopHomeMusic();
    startAdventureMusic();
  }
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
  const clearedAuroraReach = passed && levelIndex === AURORA_REACH_INDEX;
  if (passed) {
    gameMeta.adventureHighestLevel = Math.max(gameMeta.adventureHighestLevel || 0, lvl.level);
    if (clearedTreasureCove) gameMeta.pendingBonusVoyagesCelebration = true;
    if (clearedLegendsGate) gameMeta.pendingIceVoyagesCelebration = true;
    if (clearedAuroraReach) gameMeta.pendingLostCityCelebration = true;
    saveMeta();
    adventureMapUiProgress = -1;
    pendingAdventureTrailReveal = true;
  }
  const earnedBase = coinsAwardedForScore(score);
  let earned = earnedBase;
  if (gameMeta.pendingDoubleHaul && earned > 0) {
    earned *= 2;
    gameMeta.pendingDoubleHaul = false;
    showToast("Double Haul — coins ×2!", 2200);
  }
  if (earned > 0) {
    gameMeta.coins += earned;
    saveMeta();
    refreshCoinDisplays();
  }
  roundBait = { catchRadiusMult: 1, rareAssistAdd: 0, lightRadiusMult: 1 };
  roundOverrideReefId = null;
  refreshCollectablesUI();
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
          : clearedAuroraReach
            ? "Aurora Reach cleared!"
            : `Level ${lvl.level} cleared!`;
    }
    if (adventureWinScore) {
      adventureWinScore.textContent = clearedTreasureCove
        ? `You scored ${score} (needed ${lvl.passScore}). ${ADVENTURE_SECTION_GOLD_QUEST} voyages await beyond the cove!`
        : clearedLegendsGate
          ? `You scored ${score} (needed ${lvl.passScore}). ${ADVENTURE_SECTION_FROZEN_SEA} voyages now appear on the map!`
          : clearedAuroraReach
            ? `You scored ${score} (needed ${lvl.passScore}). ${ADVENTURE_SECTION_LOST_CITY} voyages now appear on the map!`
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
          : clearedAuroraReach
            ? `Start ${ADVENTURE_SECTION_LOST_CITY} voyage 1`
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
    syncAdventureSkipRopeButton();
    if (panelAdventureFail) panelAdventureFail.hidden = false;
  }
  syncAdventureLaunchVisibility();
  if (musicEnabled) startAdventureMusic();
}

function isAdventureMusicActive() {
  if (playing && adventureSession) return true;
  if (panelAdventure && !panelAdventure.hidden) return true;
  if (panelAdventurePrep && !panelAdventurePrep.hidden) return true;
  if (panelAdventureWin && !panelAdventureWin.hidden) return true;
  if (panelAdventureFail && !panelAdventureFail.hidden) return true;
  return false;
}

function isEventsMusicActive() {
  if (playing) return false;
  return Boolean(panelEvents && !panelEvents.hidden);
}

function updateMusicButton() {
  if (!btnToggleMusic) return;
  btnToggleMusic.setAttribute("aria-pressed", musicEnabled ? "true" : "false");
  btnToggleMusic.textContent = musicEnabled ? "Music on" : "Music";
}

function ensureMusicContext() {
  if (musicCtx && musicCtx.state !== "closed") return musicCtx;
  musicStateHooked = false;
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) return null;
  try {
    musicCtx = new AudioCtor({ latencyHint: "interactive" });
  } catch {
    try {
      musicCtx = new AudioCtor();
    } catch {
      musicCtx = null;
      return null;
    }
  }
  musicMaster = musicCtx.createGain();
  musicMaster.gain.value = musicEnabled ? HOME_MUSIC_MASTER_GAIN : 0;
  musicMaster.connect(musicCtx.destination);
  hookMusicContextState(musicCtx);
  return musicCtx;
}

function hookMusicContextState(ac) {
  if (!ac || musicStateHooked) return;
  musicStateHooked = true;
  ac.addEventListener("statechange", () => {
    if (!musicEnabled) return;
    if (ac.state === "running") {
      syncMusicMasterGain();
      if (!document.hidden) restartSceneMusic(true);
    } else if ((ac.state === "suspended" || ac.state === "interrupted") && !document.hidden) {
      kickMusicContext();
    }
  });
}

function musicContextRunning() {
  return Boolean(musicCtx && musicMaster && musicCtx.state === "running");
}

function expectedMusicTimer() {
  if (!musicEnabled || document.hidden || isSplashScreenActive()) return null;
  if (playing) return adventureSession ? adventureMusicTimer : gameMusicTimer;
  if (isEventsMusicActive()) return eventsMusicTimer;
  if (isAdventureMusicActive()) return adventureMusicTimer;
  return musicTimer;
}

function musicWatchdogTick() {
  if (!musicEnabled || document.hidden) return;
  if (!musicCtx || musicCtx.state === "closed") ensureMusicContext();
  if (!musicCtx || !musicMaster) return;
  if (musicCtx.state === "suspended" || musicCtx.state === "interrupted") {
    const now = Date.now();
    if (now - musicWatchdogLastKick < 1200) return;
    musicWatchdogLastKick = now;
    void resumeMusicContext().then(() => restartSceneMusic(true));
    return;
  }
  if (musicMaster.gain.value <= 0) syncMusicMasterGain();
  const timer = expectedMusicTimer();
  if (timer === null) return;
  if (!timer) restartSceneMusic(true);
}

function startMusicWatchdog() {
  if (musicWatchdogTimer) return;
  musicWatchdogTimer = setInterval(musicWatchdogTick, 3500);
}

function playSilentUnlockTick(ac) {
  if (!ac) return;
  try {
    const buf = ac.createBuffer(1, 1, ac.sampleRate);
    const src = ac.createBufferSource();
    src.buffer = buf;
    src.connect(ac.destination);
    src.start(0);
  } catch {
    /* ignore */
  }
  try {
    if (!musicUnlockEl) {
      musicUnlockEl = new Audio(
        "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"
      );
      musicUnlockEl.setAttribute("playsinline", "true");
      musicUnlockEl.preload = "auto";
      musicUnlockEl.loop = false;
      musicUnlockEl.volume = 0.01;
    }
    const playPromise = musicUnlockEl.play();
    if (playPromise && typeof playPromise.catch === "function") playPromise.catch(() => {});
  } catch {
    /* ignore */
  }
}

function playMusicNote(freq, startAt, dur, gain = 0.045, type = "triangle") {
  if (!musicCtx || !musicMaster) return;
  try {
    const t0 = Math.max(startAt, musicCtx.currentTime);
    const osc = musicCtx.createOscillator();
    const g = musicCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0001, gain), t0 + 0.08);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + Math.max(0.09, dur));
    osc.connect(g);
    g.connect(musicMaster);
    osc.start(t0);
    osc.stop(t0 + dur + 0.03);
  } catch {
    /* ignore audio glitches */
  }
}

function playNoiseHit(startAt, dur, gain = 0.02) {
  if (!musicCtx || !musicMaster) return;
  try {
    const t0 = Math.max(startAt, musicCtx.currentTime);
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
    g.gain.setValueAtTime(Math.max(0.0001, gain), t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + Math.max(0.02, dur));
    src.connect(filter);
    filter.connect(g);
    g.connect(musicMaster);
    src.start(t0);
  } catch {
    /* ignore audio glitches */
  }
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
    const flyMs = c.kind === "dailyPrize" ? 1600 : TREASURE_CINEMATIC_FLY_MS;
    const t = Math.min(1, elapsed / flyMs);
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
    c.lidOpen = openT ** 0.75;
    c.glowPulse = 0.7 + Math.sin(openT * Math.PI * 4) * 0.3;
    if (openT > 0.18 && now - c.lastSparkleAt > 110) {
      spawnTreasureCinematicBurst(c.x, c.y - 28 * dpr * c.scale, 14, 52);
      spawnTreasureCinematicBurst(c.x + (Math.random() - 0.5) * 40 * dpr, c.y - 8 * dpr * c.scale, 8, 44);
      c.lastSparkleAt = now;
    }
    if (openT > 0.55 && openT < 0.62) {
      spawnTreasureCinematicBurst(c.x, c.y - 36 * dpr * c.scale, 40, 48);
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

const HOME_MUSIC_VOLUME_BOOST = 5;
const DEFAULT_MUSIC_MASTER_GAIN = 0.28;
const HOME_MUSIC_MASTER_GAIN = 0.48;

function kickMusicContext() {
  const ac = ensureMusicContext();
  if (!ac || ac.state === "closed") return null;
  if (ac.state === "suspended" || ac.state === "interrupted") {
    try {
      ac.resume();
    } catch {
      return ac;
    }
  }
  playSilentUnlockTick(ac);
  return ac;
}

function unlockAudioFromGesture() {
  const ac = kickMusicContext();
  if (ac) homeAudioUnlocked = true;
  return ac;
}

async function resumeMusicContext() {
  const ac = kickMusicContext();
  if (!ac) return null;
  if (ac.state === "suspended" || ac.state === "interrupted") {
    try {
      await ac.resume();
    } catch {
      return ac.state === "closed" ? null : ac;
    }
  }
  playSilentUnlockTick(ac);
  return ac.state === "closed" ? null : ac;
}

function musicSchedulerReady() {
  if (!musicEnabled || !musicCtx || !musicMaster) return false;
  if (musicCtx.state === "closed") {
    ensureMusicContext();
    return Boolean(musicCtx && musicCtx.state !== "closed" && musicCtx.state === "running");
  }
  if (musicCtx.state === "suspended" || musicCtx.state === "interrupted") {
    kickMusicContext();
    if (musicCtx.state !== "running") return false;
  }
  if (musicMaster.gain.value <= 0) syncMusicMasterGain();
  return musicCtx.state === "running";
}

function syncMusicMasterGain() {
  if (!musicMaster) return;
  if (!musicEnabled) {
    musicMaster.gain.value = 0;
    return;
  }
  if (playing) {
    musicMaster.gain.value = DEFAULT_MUSIC_MASTER_GAIN;
  } else if (isEventsMusicActive()) {
    musicMaster.gain.value = EVENTS_MUSIC_MASTER_GAIN;
  } else {
    musicMaster.gain.value = HOME_MUSIC_MASTER_GAIN;
  }
}

function randomMusicTrackIndex(count, avoid = -1) {
  if (count <= 1) return 0;
  let idx = Math.floor(Math.random() * count);
  while (idx === avoid && count > 1) idx = Math.floor(Math.random() * count);
  return idx;
}

/** Soft yacht-rock radio beds for menus and home — each track is its own progression. */
const YACHT_ROCK_HOME_TRACKS = [
  {
    id: "harbor_haze",
    tempoMs: 1720,
    leadType: "triangle",
    bassType: "sine",
    bars: [
      [164.81, 196.0, 246.94, 329.63, 392.0],
      [130.81, 164.81, 196.0, 261.63, 329.63],
      [196.0, 246.94, 293.66, 392.0, 493.88],
      [146.83, 185.0, 220.0, 293.66, 369.99],
      [110.0, 130.81, 164.81, 220.0, 261.63],
      [146.83, 185.0, 220.0, 293.66, 369.99],
    ],
  },
  {
    id: "coastal_cruiser",
    tempoMs: 1480,
    leadType: "sine",
    bassType: "sine",
    bars: [
      [146.83, 185.0, 220.0, 293.66, 369.99],
      [110.0, 138.59, 164.81, 220.0, 277.18],
      [123.47, 146.83, 185.0, 246.94, 293.66],
      [98.0, 123.47, 146.83, 196.0, 246.94],
      [146.83, 185.0, 220.0, 293.66, 369.99],
      [110.0, 138.59, 164.81, 220.0, 277.18],
    ],
  },
  {
    id: "sunset_slip",
    tempoMs: 1840,
    leadType: "triangle",
    bassType: "sine",
    bars: [
      [174.61, 220.0, 261.63, 349.23, 440.0],
      [146.83, 174.61, 220.0, 293.66, 349.23],
      [98.0, 116.54, 146.83, 196.0, 233.08],
      [130.81, 164.81, 196.0, 261.63, 329.63],
      [174.61, 220.0, 261.63, 349.23, 440.0],
      [146.83, 174.61, 220.0, 293.66, 349.23],
    ],
  },
  {
    id: "marina_nights",
    tempoMs: 1590,
    leadType: "sine",
    bassType: "triangle",
    bars: [
      [146.83, 185.0, 220.0, 293.66, 369.99],
      [220.0, 277.18, 329.63, 440.0, 554.37],
      [164.81, 207.65, 246.94, 329.63, 415.3],
      [185.0, 220.0, 277.18, 369.99, 440.0],
      [146.83, 185.0, 220.0, 293.66, 369.99],
      [220.0, 277.18, 329.63, 440.0, 554.37],
    ],
  },
  {
    id: "boardwalk_breeze",
    tempoMs: 1660,
    leadType: "triangle",
    bassType: "sine",
    bars: [
      [130.81, 164.81, 196.0, 261.63, 329.63],
      [164.81, 196.0, 246.94, 329.63, 392.0],
      [110.0, 130.81, 164.81, 220.0, 261.63],
      [174.61, 220.0, 261.63, 349.23, 440.0],
      [130.81, 164.81, 196.0, 261.63, 329.63],
      [164.81, 196.0, 246.94, 329.63, 392.0],
    ],
  },
  {
    id: "pelican_bay",
    tempoMs: 1510,
    leadType: "sine",
    bassType: "sine",
    bars: [
      [130.81, 155.56, 196.0, 261.63, 311.13],
      [174.61, 220.0, 261.63, 349.23, 440.0],
      [116.54, 146.83, 174.61, 233.08, 293.66],
      [98.0, 116.54, 146.83, 196.0, 233.08],
      [130.81, 155.56, 196.0, 261.63, 311.13],
      [174.61, 220.0, 261.63, 349.23, 440.0],
    ],
  },
];

/** Yacht-rock play beds for reef rounds — rotate so fishing loops feel like different radio tracks. */
const YACHT_ROCK_PLAY_TRACKS = [
  {
    id: "reef_radio_one",
    tempoMs: 1280,
    type: "triangle",
    bassType: "sine",
    gain: 0.0042,
    bassGain: 0.011,
    chords: [
      [155.56, 196.0, 233.08, 311.13, 392.0],
      [130.81, 155.56, 196.0, 261.63, 311.13],
      [146.83, 174.61, 220.0, 293.66, 349.23],
      [174.61, 220.0, 261.63, 349.23, 440.0],
      [130.81, 164.81, 196.0, 261.63, 329.63],
      [116.54, 138.59, 174.61, 233.08, 277.18],
    ],
    sparkle: [466.16, 554.37, 698.46],
    noise: 0.0014,
  },
  {
    id: "reef_radio_two",
    tempoMs: 1420,
    type: "sine",
    bassType: "triangle",
    gain: 0.0055,
    bassGain: 0.013,
    chords: [
      [110.0, 130.81, 164.81, 220.0, 261.63],
      [174.61, 220.0, 261.63, 349.23, 440.0],
      [130.81, 164.81, 196.0, 261.63, 329.63],
      [98.0, 123.47, 146.83, 196.0, 246.94],
      [110.0, 130.81, 164.81, 220.0, 261.63],
      [146.83, 185.0, 220.0, 293.66, 369.99],
    ],
    sparkle: [523.25, 622.25, 739.99],
    noise: 0.0018,
  },
  {
    id: "reef_radio_three",
    tempoMs: 1140,
    type: "triangle",
    bassType: "sine",
    gain: 0.005,
    bassGain: 0.014,
    chords: [
      [123.47, 146.83, 185.0, 246.94, 293.66],
      [98.0, 116.54, 146.83, 196.0, 233.08],
      [110.0, 130.81, 164.81, 220.0, 261.63],
      [146.83, 174.61, 220.0, 293.66, 349.23],
      [123.47, 146.83, 185.0, 246.94, 293.66],
      [164.81, 196.0, 246.94, 329.63, 392.0],
    ],
    sparkle: [349.23, 415.3, 493.88],
    noise: 0.002,
  },
  {
    id: "reef_radio_four",
    tempoMs: 1360,
    type: "sine",
    bassType: "sine",
    gain: 0.0048,
    bassGain: 0.012,
    chords: [
      [164.81, 207.65, 246.94, 329.63, 415.3],
      [138.59, 164.81, 207.65, 277.18, 329.63],
      [110.0, 138.59, 164.81, 220.0, 277.18],
      [123.47, 155.56, 185.0, 246.94, 311.13],
      [164.81, 207.65, 246.94, 329.63, 415.3],
      [185.0, 220.0, 277.18, 369.99, 440.0],
    ],
    sparkle: [830.61, 987.77, 1174.66],
    noise: 0.0012,
  },
  {
    id: "reef_radio_five",
    tempoMs: 1490,
    type: "triangle",
    bassType: "triangle",
    gain: 0.0045,
    bassGain: 0.013,
    chords: [
      [220.0, 277.18, 329.63, 440.0, 554.37],
      [185.0, 220.0, 277.18, 369.99, 440.0],
      [146.83, 185.0, 220.0, 293.66, 369.99],
      [164.81, 207.65, 246.94, 329.63, 415.3],
      [220.0, 277.18, 329.63, 440.0, 554.37],
      [246.94, 311.13, 369.99, 493.88, 587.33],
    ],
    sparkle: [659.25, 783.99, 932.33],
    noise: 0.001,
  },
  {
    id: "reef_radio_six",
    tempoMs: 1220,
    type: "sine",
    bassType: "sine",
    gain: 0.0052,
    bassGain: 0.012,
    chords: [
      [146.83, 185.0, 220.0, 293.66, 369.99],
      [123.47, 155.56, 185.0, 246.94, 311.13],
      [98.0, 123.47, 146.83, 196.0, 246.94],
      [110.0, 138.59, 164.81, 220.0, 277.18],
      [146.83, 185.0, 220.0, 293.66, 369.99],
      [174.61, 220.0, 261.63, 349.23, 440.0],
    ],
    sparkle: [440.0, 523.25, 659.25],
    noise: 0.0016,
  },
];

/** Pirate shanty beds for adventure map and levels — distinct tempos and motifs. */
const ADVENTURE_PIRATE_TRACKS = [
  {
    id: "black_flag_march",
    tempoMs: 700,
    leadType: "square",
    bars: [
      { bass: 82.41, melody: [164.81, 146.83, 123.47, 146.83, 164.81] },
      { bass: 73.42, melody: [146.83, 130.81, 110.0, 130.81, 146.83] },
      { bass: 87.31, melody: [174.61, 196.0, 220.0, 196.0, 174.61] },
      { bass: 65.41, melody: [130.81, 146.83, 174.61, 146.83, 130.81] },
      { bass: 82.41, melody: [164.81, 196.0, 220.0, 246.94, 220.0] },
      { bass: 58.27, melody: [116.54, 130.81, 146.83, 130.81, 116.54] },
      { bass: 73.42, melody: [146.83, 174.61, 196.0, 174.61, 146.83] },
      { bass: 55.0, melody: [110.0, 98.0, 87.31, 98.0, 110.0] },
    ],
  },
  {
    id: "doubloon_jig",
    tempoMs: 590,
    leadType: "triangle",
    bars: [
      { bass: 98.0, melody: [196.0, 220.0, 246.94, 293.66, 246.94] },
      { bass: 87.31, melody: [174.61, 196.0, 220.0, 261.63, 220.0] },
      { bass: 110.0, melody: [220.0, 246.94, 277.18, 329.63, 277.18] },
      { bass: 98.0, melody: [196.0, 174.61, 196.0, 220.0, 246.94] },
      { bass: 82.41, melody: [164.81, 185.0, 207.65, 246.94, 207.65] },
      { bass: 98.0, melody: [196.0, 220.0, 246.94, 220.0, 196.0] },
      { bass: 73.42, melody: [146.83, 164.81, 185.0, 220.0, 185.0] },
      { bass: 110.0, melody: [220.0, 246.94, 277.18, 246.94, 220.0] },
    ],
  },
  {
    id: "storm_deck_shanty",
    tempoMs: 760,
    leadType: "sawtooth",
    bars: [
      { bass: 82.41, melody: [164.81, 155.56, 146.83, 130.81, 123.47] },
      { bass: 73.42, melody: [146.83, 138.59, 130.81, 123.47, 116.54] },
      { bass: 65.41, melody: [130.81, 146.83, 164.81, 174.61, 164.81] },
      { bass: 61.74, melody: [123.47, 130.81, 146.83, 155.56, 146.83] },
      { bass: 82.41, melody: [164.81, 174.61, 196.0, 174.61, 164.81] },
      { bass: 55.0, melody: [110.0, 116.54, 123.47, 116.54, 110.0] },
      { bass: 73.42, melody: [146.83, 155.56, 164.81, 155.56, 146.83] },
      { bass: 49.0, melody: [98.0, 103.83, 110.0, 103.83, 98.0] },
    ],
  },
  {
    id: "cannon_row",
    tempoMs: 640,
    leadType: "square",
    bars: [
      { bass: 61.74, melody: [123.47, 146.83, 123.47, 164.81, 146.83] },
      { bass: 55.0, melody: [110.0, 130.81, 110.0, 146.83, 130.81] },
      { bass: 65.41, melody: [130.81, 155.56, 130.81, 174.61, 155.56] },
      { bass: 58.27, melody: [116.54, 138.59, 116.54, 155.56, 138.59] },
      { bass: 73.42, melody: [146.83, 174.61, 146.83, 196.0, 174.61] },
      { bass: 55.0, melody: [110.0, 130.81, 110.0, 146.83, 130.81] },
      { bass: 49.0, melody: [98.0, 116.54, 98.0, 130.81, 116.54] },
      { bass: 65.41, melody: [130.81, 155.56, 130.81, 174.61, 155.56] },
    ],
  },
  {
    id: "grog_song",
    tempoMs: 710,
    leadType: "triangle",
    bars: [
      { bass: 65.41, melody: [130.81, 164.81, 196.0, 220.0, 196.0] },
      { bass: 73.42, melody: [146.83, 174.61, 207.65, 233.08, 207.65] },
      { bass: 82.41, melody: [164.81, 196.0, 233.08, 261.63, 233.08] },
      { bass: 73.42, melody: [146.83, 174.61, 196.0, 220.0, 196.0] },
      { bass: 65.41, melody: [130.81, 155.56, 174.61, 196.0, 174.61] },
      { bass: 58.27, melody: [116.54, 138.59, 164.81, 185.0, 164.81] },
      { bass: 82.41, melody: [164.81, 196.0, 233.08, 261.63, 233.08] },
      { bass: 87.31, melody: [174.61, 207.65, 246.94, 277.18, 246.94] },
    ],
  },
  {
    id: "kraken_watch",
    tempoMs: 680,
    leadType: "sawtooth",
    bars: [
      { bass: 55.0, melody: [110.0, 164.81, 130.81, 196.0, 164.81] },
      { bass: 61.74, melody: [123.47, 185.0, 146.83, 220.0, 185.0] },
      { bass: 65.41, melody: [130.81, 196.0, 155.56, 233.08, 196.0] },
      { bass: 73.42, melody: [146.83, 220.0, 174.61, 261.63, 220.0] },
      { bass: 55.0, melody: [110.0, 164.81, 130.81, 196.0, 164.81] },
      { bass: 49.0, melody: [98.0, 146.83, 116.54, 174.61, 146.83] },
      { bass: 65.41, melody: [130.81, 196.0, 155.56, 233.08, 196.0] },
      { bass: 41.2, melody: [82.41, 123.47, 98.0, 146.83, 123.47] },
    ],
  },
];

function playYachtRockHomeBar(chord, track, barIndex) {
  const now = musicCtx.currentTime + 0.04;
  const v = HOME_MUSIC_VOLUME_BOOST;
  const bass = chord[0] / 2;
  const leadType = track.leadType || "triangle";
  const bassType = track.bassType || "sine";
  playMusicNote(bass, now, 0.62, 0.044 * v, bassType);
  playMusicNote(bass * 2, now + 0.84, 0.44, 0.026 * v, bassType);
  for (let i = 0; i < chord.length; i++) {
    playMusicNote(chord[i], now + i * 0.035, 1.72, 0.014 * v, leadType);
    playMusicNote(chord[i] * 1.003, now + i * 0.035, 1.72, 0.006 * v, "sine");
  }
  if (barIndex % 2 === 0) {
    playMusicNote(chord[2] * 2, now + 0.52, 0.24, 0.012 * v, "sine");
    playMusicNote(chord[Math.min(4, chord.length - 1)] * 1.5, now + 0.98, 0.32, 0.011 * v, "sine");
  } else {
    playMusicNote(chord[3] * 2, now + 0.48, 0.26, 0.01 * v, leadType);
    playMusicNote(chord[1] * 2, now + 1.12, 0.28, 0.009 * v, "sine");
  }
  playNoiseHit(now + 0.58, 0.09, 0.006 * v);
  playNoiseHit(now + 1.36, 0.12, 0.008 * v);
}

function armHomeMusicTimer() {
  if (musicTimer) {
    clearInterval(musicTimer);
    musicTimer = null;
  }
  const track = YACHT_ROCK_HOME_TRACKS[homeMusicTrackIndex] || YACHT_ROCK_HOME_TRACKS[0];
  musicTimer = setInterval(scheduleSailingMusicBar, track.tempoMs);
}

function scheduleSailingMusicBar() {
  if (!musicSchedulerReady() || playing || isEventsMusicActive() || isAdventureMusicActive()) return;
  const track = YACHT_ROCK_HOME_TRACKS[homeMusicTrackIndex] || YACHT_ROCK_HOME_TRACKS[0];
  const chord = track.bars[homeMusicBarIndex % track.bars.length];
  playYachtRockHomeBar(chord, track, homeMusicBarIndex);
  homeMusicBarIndex++;
  if (homeMusicBarIndex >= track.bars.length) {
    const prev = homeMusicTrackIndex;
    homeMusicBarIndex = 0;
    homeMusicTrackIndex = randomMusicTrackIndex(YACHT_ROCK_HOME_TRACKS.length, prev);
    armHomeMusicTimer();
  }
}

function reefMusicTuning(reefId) {
  const tunings = {
    australia: { tempoScale: 0.95, gainScale: 0.85, bassDivisor: 1.5, sparkleType: "sine" },
    caribbean: { tempoScale: 1, gainScale: 1.1, bassDivisor: 1.5, sparkleType: "sine" },
    mediterranean: { tempoScale: 0.88, gainScale: 1.05, bassDivisor: 1.5, sparkleType: "sine" },
    japan_kuroshio: { tempoScale: 0.72, gainScale: 0.92, bassDivisor: 1.5, sparkleType: "triangle", leadOverride: "sawtooth" },
    mariana_trench: { tempoScale: 1.15, gainScale: 0.82, bassDivisor: 2, sparkleType: "sine", noiseMult: 2.2 },
  };
  return tunings[reefId] || tunings.caribbean;
}

const EVENTS_MUSIC_TEMPO_MS = 2600;
const EVENTS_MUSIC_VOLUME_BOOST = 5;
const EVENTS_MUSIC_MASTER_GAIN = 0.45;

function scheduleEventsLaidbackMusicBar() {
  if (!musicSchedulerReady() || !isEventsMusicActive()) return;
  const now = musicCtx.currentTime + 0.04;
  const v = EVENTS_MUSIC_VOLUME_BOOST;
  const chords = [
    [174.61, 220.0, 261.63, 329.63, 392.0],
    [164.81, 196.0, 246.94, 293.66, 349.23],
    [146.83, 185.0, 220.0, 277.18, 329.63],
    [196.0, 246.94, 293.66, 369.99, 440.0],
  ];
  const chord = chords[eventsMusicStep % chords.length];
  const bass = chord[0] / 2;
  const sway = eventsMusicStep % 4;

  playMusicNote(bass, now, 1.12, 0.036 * v, "sine");
  playMusicNote(bass * 1.5, now + 1.18, 0.58, 0.017 * v, "sine");
  for (let i = 0; i < 4; i++) {
    playMusicNote(chord[i], now + i * 0.055, 2.05, 0.01 * v, "sine");
    playMusicNote(chord[i] * 1.002, now + i * 0.055, 2.05, 0.0045 * v, "triangle");
  }
  if (sway % 2 === 0) {
    playMusicNote(chord[3], now + 0.68, 0.48, 0.013 * v, "triangle");
    playMusicNote((chord[4] || chord[3] * 1.25), now + 1.08, 0.4, 0.011 * v, "sine");
  }
  if (eventsMusicStep % 3 === 1) {
    playMusicNote(chord[2] * 2, now + 0.44, 0.3, 0.0085 * v, "sine");
  }
  playNoiseHit(now + 0.76, 0.12, 0.0035 * v);
  playNoiseHit(now + 1.72, 0.15, 0.0045 * v);
  eventsMusicStep++;
}

function playAdventurePirateBar(bar, track, pulse) {
  const now = musicCtx.currentTime + 0.04;
  const v = 1.25;
  const leadType = track.leadType || "square";
  const accentType = leadType === "triangle" ? "square" : leadType;

  playMusicNote(bar.bass, now, 0.42, 0.068 * v, "sawtooth");
  playMusicNote(bar.bass * 0.5, now, 0.5, 0.038 * v, "sine");

  if (pulse % 4 === 0) {
    playMusicNote(bar.melody[0], now + 0.02, 0.35, 0.028 * v, accentType);
    playMusicNote(bar.melody[0] * 1.005, now + 0.02, 0.35, 0.018 * v, "sawtooth");
    playMusicNote(bar.melody[2], now + 0.02, 0.32, 0.022 * v, "triangle");
  }

  const melIdx = pulse % bar.melody.length;
  playMusicNote(
    bar.melody[melIdx],
    now + 0.12 + (pulse % 4) * 0.08,
    0.22,
    0.024 * v,
    pulse % 2 ? "triangle" : accentType,
  );

  if (pulse % 2 === 1) {
    playMusicNote(bar.melody[3], now + 0.44, 0.14, 0.02 * v, "sawtooth");
    playMusicNote(bar.melody[4] || bar.melody[3] * 1.12, now + 0.54, 0.12, 0.017 * v, "triangle");
  }

  playNoiseHit(now + 0.18, 0.05, 0.014 * v);
  if (pulse % 2 === 1) playNoiseHit(now + 0.52, 0.07, 0.018 * v);

  if (pulse === 4) {
    playMusicNote(98.0, now + 0.28, 0.3, 0.03 * v, "triangle");
    playMusicNote(123.47, now + 0.38, 0.25, 0.026 * v, "sine");
  }
}

function armAdventureMusicTimer() {
  if (adventureMusicTimer) {
    clearInterval(adventureMusicTimer);
    adventureMusicTimer = null;
  }
  const track = ADVENTURE_PIRATE_TRACKS[adventureMusicTrackIndex] || ADVENTURE_PIRATE_TRACKS[0];
  adventureMusicTimer = setInterval(scheduleAdventurePirateMusicBar, track.tempoMs);
}

function scheduleAdventurePirateMusicBar() {
  if (!musicSchedulerReady() || !isAdventureMusicActive()) return;
  const track = ADVENTURE_PIRATE_TRACKS[adventureMusicTrackIndex] || ADVENTURE_PIRATE_TRACKS[0];
  const bar = track.bars[adventureMusicBarIndex % track.bars.length];
  const pulse = adventureMusicBarIndex % 8;
  playAdventurePirateBar(bar, track, pulse);
  adventureMusicBarIndex++;
  if (adventureMusicBarIndex >= track.bars.length) {
    const prev = adventureMusicTrackIndex;
    adventureMusicBarIndex = 0;
    adventureMusicTrackIndex = randomMusicTrackIndex(ADVENTURE_PIRATE_TRACKS.length, prev);
    armAdventureMusicTimer();
  }
}

function startEventsMusic(forceRestart = true) {
  if (!musicEnabled || !isEventsMusicActive()) return;
  if (!forceRestart && eventsMusicTimer && musicContextRunning()) return;
  unlockAudioFromGesture();
  homeAudioUnlocked = true;
  stopHomeMusic();
  stopAdventureMusic();
  stopReefMusic();
  syncMusicMasterGain();
  if (eventsMusicTimer) {
    clearInterval(eventsMusicTimer);
    eventsMusicTimer = null;
  }
  eventsMusicStep = 0;
  scheduleEventsLaidbackMusicBar();
  eventsMusicTimer = setInterval(scheduleEventsLaidbackMusicBar, EVENTS_MUSIC_TEMPO_MS);
  void resumeMusicContext();
}

function stopEventsMusic() {
  if (eventsMusicTimer) {
    clearInterval(eventsMusicTimer);
    eventsMusicTimer = null;
  }
}

function startAdventureMusic(forceRestart = true) {
  if (!musicEnabled || !isAdventureMusicActive()) return;
  if (!forceRestart && adventureMusicTimer && musicContextRunning()) return;
  unlockAudioFromGesture();
  homeAudioUnlocked = true;
  stopHomeMusic();
  stopEventsMusic();
  stopReefMusic();
  syncMusicMasterGain();
  if (adventureMusicTimer) {
    clearInterval(adventureMusicTimer);
    adventureMusicTimer = null;
  }
  adventureMusicTrackIndex = randomMusicTrackIndex(ADVENTURE_PIRATE_TRACKS.length);
  adventureMusicBarIndex = 0;
  scheduleAdventurePirateMusicBar();
  armAdventureMusicTimer();
  void resumeMusicContext();
}

function stopAdventureMusic() {
  if (adventureMusicTimer) {
    clearInterval(adventureMusicTimer);
    adventureMusicTimer = null;
  }
}

function armReefMusicTimer() {
  if (gameMusicTimer) {
    clearInterval(gameMusicTimer);
    gameMusicTimer = null;
  }
  const reef = getReef();
  const track = YACHT_ROCK_PLAY_TRACKS[reefMusicTrackIndex] || YACHT_ROCK_PLAY_TRACKS[0];
  const tune = reefMusicTuning(reef.id);
  const tempoMs = Math.round(track.tempoMs * (tune.tempoScale || 1));
  gameMusicTimer = setInterval(scheduleReefMusicBar, tempoMs);
}

function scheduleReefMusicBar() {
  if (!musicSchedulerReady() || !playing || adventureSession) return;
  const reef = getReef();
  const track = YACHT_ROCK_PLAY_TRACKS[reefMusicTrackIndex] || YACHT_ROCK_PLAY_TRACKS[0];
  const tune = reefMusicTuning(reef.id);
  const tempoMs = Math.round(track.tempoMs * (tune.tempoScale || 1));
  const now = musicCtx.currentTime + 0.035;
  const chord = track.chords[reefMusicBarIndex % track.chords.length];
  const bass = chord[0] / (tune.bassDivisor || 1.5);
  const leadType = tune.leadOverride || track.type;
  const gain = track.gain * (tune.gainScale || 1);
  const bassGain = track.bassGain * (tune.gainScale || 1);
  playMusicNote(bass, now, tempoMs / 1000 + 0.2, bassGain, track.bassType);
  for (let i = 0; i < chord.length; i++) {
    playMusicNote(chord[i], now + i * 0.04, tempoMs / 1000 * 0.85, gain, leadType);
  }
  for (let i = 0; i < track.sparkle.length; i++) {
    const beat = now + 0.22 + i * (tempoMs / 1000 / 4);
    playMusicNote(
      track.sparkle[(reefMusicBarIndex + i) % track.sparkle.length],
      beat,
      0.16,
      gain * 0.72,
      tune.sparkleType || "sine",
    );
  }
  if (track.noise > 0) {
    const noiseDur = reef.id === "mariana_trench" ? 0.22 : 0.08;
    playNoiseHit(now + tempoMs / 1000 * 0.45, noiseDur, track.noise * (tune.noiseMult || 1));
  }
  reefMusicBarIndex++;
  if (reefMusicBarIndex >= track.chords.length) {
    const prev = reefMusicTrackIndex;
    reefMusicBarIndex = 0;
    reefMusicTrackIndex = randomMusicTrackIndex(YACHT_ROCK_PLAY_TRACKS.length, prev);
    armReefMusicTimer();
  }
}

function startReefMusic(forceRestart = true) {
  if (!musicEnabled || !playing) return;
  if (adventureSession) {
    startAdventureMusic(forceRestart);
    return;
  }
  if (!forceRestart && gameMusicTimer && musicContextRunning()) return;
  stopAdventureMusic();
  unlockAudioFromGesture();
  syncMusicMasterGain();
  if (gameMusicTimer) {
    clearInterval(gameMusicTimer);
    gameMusicTimer = null;
  }
  reefMusicTrackIndex = randomMusicTrackIndex(YACHT_ROCK_PLAY_TRACKS.length);
  reefMusicBarIndex = 0;
  scheduleReefMusicBar();
  armReefMusicTimer();
  void resumeMusicContext();
}

function stopReefMusic() {
  if (gameMusicTimer) {
    clearInterval(gameMusicTimer);
    gameMusicTimer = null;
  }
}

function stopClimaxMusic() {
  climaxMusicActive = false;
  climaxMusicBeat = 0;
  if (climaxMusicTimer) {
    clearInterval(climaxMusicTimer);
    climaxMusicTimer = null;
  }
}

function scheduleClimaxMusicBeat() {
  if (!musicSchedulerReady() || !climaxMusicActive || !playing) return;
  const now = musicCtx.currentTime + 0.02;
  const beat = climaxMusicBeat % 8;
  const root = [110.0, 123.47, 130.81, 146.83][Math.floor(climaxMusicBeat / 2) % 4];
  const urgency = 1 + (climaxMusicBeat % 4) * 0.08;
  playMusicNote(root, now, 0.34, 0.028 * urgency, "sine");
  playMusicNote(root * 2, now + 0.05, 0.22, 0.022 * urgency, "triangle");
  if (beat % 2 === 0) {
    playMusicNote(root * 3, now + 0.1, 0.18, 0.02 * urgency, "triangle");
    playMusicNote([329.63, 392.0, 440.0, 493.88][beat % 4], now + 0.14, 0.24, 0.034 * urgency, "sawtooth");
  }
  if (beat === 3 || beat === 7) {
    playMusicNote(880, now + 0.08, 0.3, 0.038, "sawtooth");
    playNoiseHit(now + 0.06, 0.14, 0.032 * urgency);
  } else {
    playNoiseHit(now + 0.12, 0.08, 0.018 * urgency);
  }
  climaxMusicBeat++;
}

function startClimaxMusic() {
  if (climaxMusicActive || !musicEnabled || !playing) return;
  climaxMusicActive = true;
  climaxMusicBeat = 0;
  stopReefMusic();
  stopAdventureMusic();
  scheduleClimaxMusicBeat();
  climaxMusicTimer = setInterval(scheduleClimaxMusicBeat, CLIMAX_MUSIC_TEMPO_MS);
}

function tickClimaxMusic(now) {
  if (!playing || treasureMapRevealPaused) return;
  const isSurvivor = eventMinigameSession?.kind === "survivor";
  if (isSurvivor || !roundEndAt) return;
  const left = roundEndAt - now;
  if (left > CLIMAX_MUSIC_MS) {
    if (climaxMusicActive) {
      stopClimaxMusic();
      if (musicEnabled) startReefMusic(true);
    }
    return;
  }
  if (!climaxMusicActive && musicEnabled) startClimaxMusic();
}

function syncUrgentTimerUi(leftMs) {
  const urgent = leftMs > 0 && leftMs <= CLIMAX_MUSIC_MS;
  timeDisplay?.classList.toggle("stat__value--urgent", urgent);
  timeDisplay?.closest(".stat--time")?.classList.toggle("stat--time--urgent", urgent);
}

function startHomeWaves() {
  unlockAudioFromGesture();
  void resumeMusicContext().then((ac) => {
    if (ac) homeAudioUnlocked = true;
  });
}

function startHomeMusic(forceRestart = true) {
  if (!musicEnabled || playing || isAdventureMusicActive() || isEventsMusicActive()) return;
  if (!forceRestart && musicTimer && musicContextRunning()) return;
  unlockAudioFromGesture();
  homeAudioUnlocked = true;
  stopEventsMusic();
  syncMusicMasterGain();
  if (musicTimer) {
    clearInterval(musicTimer);
    musicTimer = null;
  }
  homeMusicTrackIndex = randomMusicTrackIndex(YACHT_ROCK_HOME_TRACKS.length);
  homeMusicBarIndex = 0;
  scheduleSailingMusicBar();
  armHomeMusicTimer();
  void resumeMusicContext();
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
  stopEventsMusic();
  stopReefMusic();
  stopAdventureMusic();
  stopClimaxMusic();
}

function restartSceneMusic(forceRestart = true) {
  if (!musicEnabled) return;
  if (playing) {
    if (adventureSession) startAdventureMusic(forceRestart);
    else startReefMusic(forceRestart);
  } else if (isEventsMusicActive()) {
    startEventsMusic(forceRestart);
  } else if (isAdventureMusicActive()) {
    startAdventureMusic(forceRestart);
  } else {
    startHomeMusic(forceRestart);
  }
}

async function toggleHomeMusic() {
  musicEnabled = !musicEnabled;
  saveMusicEnabledPref();
  updateMusicButton();
  if (!musicEnabled) {
    syncMusicMasterGain();
    stopHomeMusic();
    stopEventsMusic();
    stopAdventureMusic();
    stopReefMusic();
    return;
  }
  const ac = unlockAudioFromGesture();
  if (!ac) {
    const resumed = await resumeMusicContext();
    if (!resumed || resumed.state === "closed") {
      musicEnabled = false;
      saveMusicEnabledPref();
      updateMusicButton();
      syncMusicMasterGain();
      showToast("Music unavailable in this browser.", 2200);
      return;
    }
  }
  homeAudioUnlocked = true;
  syncMusicMasterGain();
  restartSceneMusic(true);
  void resumeMusicContext();
}

function unlockHomeAudio() {
  unlockAudioFromGesture();
  void resumeMusicContext().then((ac) => {
    if (!ac) return;
    homeAudioUnlocked = true;
    if (musicEnabled) restartSceneMusic(true);
  });
}

function refreshCoinDisplays() {
  const t = String(gameMeta.coins);
  if (coinDisplay) coinDisplay.textContent = t;
  if (coinDisplayStart) coinDisplayStart.textContent = t;
  if (coinDisplayShop) coinDisplayShop.textContent = t;
  const g = String(getGemCount());
  if (gemDisplay) gemDisplay.textContent = g;
  if (gemDisplayStart) gemDisplayStart.textContent = g;
  if (gemDisplayShop) gemDisplayShop.textContent = g;
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

/** Compact SVG bait bucket for home picker + shop. */
function baitBucketColors(baitId) {
  switch (baitId) {
    case "nightcrawler":
      return { fill: "#6b8f71", mid: "#4d6b52", rim: "#8fbc8f", bits: "#3f2a1a" };
    case "shrimp":
      return { fill: "#f0a8a0", mid: "#d9776f", rim: "#fbc4bc", bits: "#fb7185" };
    case "glow_jelly":
      return { fill: "#67e8f9", mid: "#22d3ee", rim: "#a5f3fc", bits: "#e0f2fe" };
    case "squid_ink":
      return { fill: "#6b5b95", mid: "#4c3d73", rim: "#9b8ec4", bits: "#1e1b4b" };
    case "golden_chum":
      return { fill: "#f5d78e", mid: "#d4a017", rim: "#ffe08a", bits: "#b45309" };
    case KRAKEN_SPRAY_BAIT_ID:
      return { fill: "#a78bfa", mid: "#7c6bcf", rim: "#c4b5fd", bits: "#312e81" };
    default:
      return { fill: "#94a3b8", mid: "#64748b", rim: "#cbd5e1", bits: "#475569" };
  }
}

function baitBucketSvg(baitId) {
  const c = baitBucketColors(baitId);
  const uid = `bait-${baitId}`;
  return (
    `<svg class="bait-bucket" viewBox="0 0 48 56" width="44" height="52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">` +
    `<defs>` +
    `<linearGradient id="${uid}-metal" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0%" stop-color="#d6dde8"/>` +
    `<stop offset="45%" stop-color="#9aa7b8"/>` +
    `<stop offset="100%" stop-color="#6b7787"/>` +
    `</linearGradient>` +
    `<linearGradient id="${uid}-bait" x1="0" y1="0" x2="0" y2="1">` +
    `<stop offset="0%" stop-color="${c.rim}"/>` +
    `<stop offset="55%" stop-color="${c.fill}"/>` +
    `<stop offset="100%" stop-color="${c.mid}"/>` +
    `</linearGradient>` +
    `</defs>` +
    `<ellipse cx="24" cy="14" rx="16" ry="5.5" fill="url(#${uid}-bait)"/>` +
    `<path d="M8 16 L11 46 Q24 52 37 46 L40 16 Z" fill="url(#${uid}-metal)" stroke="#4b5563" stroke-width="1.2"/>` +
    `<path d="M11 22 L13 42 Q24 47 35 42 L37 22" fill="url(#${uid}-bait)" opacity="0.92"/>` +
    `<ellipse cx="24" cy="16" rx="15.2" ry="5" fill="url(#${uid}-bait)"/>` +
    `<ellipse cx="24" cy="14.5" rx="15.2" ry="4.2" fill="none" stroke="#4b5563" stroke-width="1.4"/>` +
    `<path d="M8 16 Q24 21 40 16" fill="none" stroke="#374151" stroke-width="1.1" opacity="0.55"/>` +
    `<circle cx="18" cy="15" r="2.1" fill="${c.bits}" opacity="0.85"/>` +
    `<circle cx="26" cy="13.5" r="1.7" fill="${c.bits}" opacity="0.75"/>` +
    `<circle cx="31" cy="16" r="1.5" fill="${c.bits}" opacity="0.7"/>` +
    `<circle cx="22" cy="17.5" r="1.3" fill="${c.rim}" opacity="0.65"/>` +
    `<rect x="6" y="24" width="4" height="10" rx="1.5" fill="#7b8794" stroke="#4b5563" stroke-width="0.8"/>` +
    `<rect x="38" y="24" width="4" height="10" rx="1.5" fill="#7b8794" stroke="#4b5563" stroke-width="0.8"/>` +
    `<path d="M10 28 H38" stroke="#e5e7eb" stroke-width="1.2" opacity="0.45"/>` +
    `</svg>`
  );
}

function baitChoiceRoots() {
  return [baitChoices, adventurePrepBait, eventPrepBait].filter(Boolean);
}

function fillBaitChoices(root) {
  root.innerHTML = "";
  for (const b of BAITS) {
    if (b.shopHidden && getBaitCount(b.id) <= 0) continue;
    const stock = b.consumesOnRound ? getBaitCount(b.id) : null;
    const dis = Boolean(b.consumesOnRound && stock <= 0);
    const btn = document.createElement("button");
    btn.type = "button";
    const slug = b.id.replace(/_/g, "-");
    btn.className =
      `rod-option rod-option--bait rod-option--bait-${slug}` +
      (gameMeta.selectedBaitId === b.id ? " rod-option--selected" : "") +
      (dis ? " rod-option--disabled" : "");
    const stockLine = b.consumesOnRound
      ? `<span class="rod-option__stock">${stock} in tackle box</span>`
      : `<span class="rod-option__stock">Unlimited</span>`;
    btn.innerHTML =
      `<span class="rod-option__art rod-option__art--bait">${baitBucketSvg(b.id)}</span>` +
      `<span class="rod-option__copy">` +
      `<span class="rod-option__name">${b.name}</span>` +
      `<span class="rod-option__desc">${b.desc}</span>` +
      `${stockLine}` +
      `</span>`;
    if (!dis) {
      btn.addEventListener("click", () => {
        gameMeta.selectedBaitId = b.id;
        saveMeta();
        buildBaitUI();
      });
    }
    root.appendChild(btn);
  }
}

function buildBaitUI() {
  normalizeSelectedBaitId();
  for (const root of baitChoiceRoots()) fillBaitChoices(root);
}

function rodChoiceRoots() {
  return [rodChoices, adventurePrepRod, eventPrepRod].filter(Boolean);
}

function fillRodChoices(root) {
  root.innerHTML = "";
  for (const rod of RODS) {
    if (!isRodOwned(rod.id)) continue;
    const b = document.createElement("button");
    b.type = "button";
    b.className =
      `rod-option rod-option--rod-${rod.id}` +
      (rod.id === selectedRod.id ? " rod-option--selected" : "");
    const stockLine =
      rod.id === MAGNET_ROD_ID
        ? `<span class="rod-option__stock rod-option__stock--prize">Prize · tonight</span>`
        : rod.chestOnly
          ? `<span class="rod-option__stock">Chest find</span>`
          : `<span class="rod-option__stock">Owned</span>`;
    b.innerHTML =
      `<span class="rod-option__art">${rodArtSvg(rod)}</span>` +
      `<span class="rod-option__copy">` +
      `<span class="rod-option__name">${rod.name}</span>` +
      `<span class="rod-option__desc">${rod.desc}</span>` +
      `${stockLine}` +
      `</span>`;
    b.addEventListener("click", () => {
      selectedRod = rod;
      gameMeta.selectedRodId = rod.id;
      saveMeta();
      buildRodUI();
    });
    root.appendChild(b);
  }
}

function buildRodUI() {
  normalizeSelectedRod();
  for (const root of rodChoiceRoots()) fillRodChoices(root);
  updateStartButtonSubtext();
}

function shopCoinEl(sizeClass = "") {
  const coin = document.createElement("span");
  coin.className = sizeClass ? `shop-coin ${sizeClass}` : "shop-coin";
  coin.setAttribute("aria-hidden", "true");
  return coin;
}

function shopGemEl(sizeClass = "") {
  const gem = document.createElement("span");
  gem.className = sizeClass ? `shop-gem ${sizeClass}` : "shop-gem";
  gem.setAttribute("aria-hidden", "true");
  return gem;
}

function shopSection(title, badgeText) {
  const section = document.createElement("section");
  section.className = "shop-section";
  const head = document.createElement("div");
  head.className = "shop-section__head";
  const h = document.createElement("h3");
  h.className = "shop-section__title";
  h.textContent = title;
  head.appendChild(h);
  if (badgeText) {
    const badge = document.createElement("span");
    badge.className = badgeText === "GEMS" ? "shop-section__badge shop-section__badge--gems" : "shop-section__badge";
    badge.textContent = badgeText;
    head.appendChild(badge);
  }
  const list = document.createElement("ul");
  list.className = "shop-list";
  section.append(head, list);
  return { section, list };
}

function shopBuyButton({ owned = false, price, disabled, label, currency = "coins" }) {
  const buy = document.createElement("button");
  buy.type = "button";
  const gemPay = currency === "gems";
  buy.className = owned ? "shop-buy shop-buy--owned" : gemPay ? "shop-buy shop-buy--gems" : "shop-buy";
  buy.disabled = disabled;
  if (owned) {
    buy.textContent = label || "Owned";
    return buy;
  }
  const priceWrap = document.createElement("span");
  priceWrap.className = "shop-buy__price";
  priceWrap.append(gemPay ? shopGemEl() : shopCoinEl(), document.createTextNode(String(price)));
  const action = document.createElement("span");
  action.className = "shop-buy__label";
  action.textContent = label || "Buy";
  buy.append(action, priceWrap);
  return buy;
}

function shopBaitIcon(baitId) {
  const art = document.createElement("div");
  art.className = `shop-item__icon shop-item__icon--bait shop-item__icon--${baitId}`;
  art.setAttribute("aria-hidden", "true");
  art.innerHTML = baitBucketSvg(baitId);
  return art;
}

function shopChestIcon(tier) {
  const art = document.createElement("div");
  art.className = `shop-item__icon shop-item__icon--chest shop-item__icon--chest-${tier}`;
  art.setAttribute("aria-hidden", "true");
  art.innerHTML = crabChestArtSvg(tier, false);
  return art;
}

function shopCoinBundleIcon() {
  const art = document.createElement("div");
  art.className = "shop-item__icon shop-item__icon--coin-vault";
  art.setAttribute("aria-hidden", "true");
  const pile = document.createElement("span");
  pile.className = "shop-coin-vault";
  pile.append(shopCoinEl(), shopCoinEl(), shopCoinEl());
  art.appendChild(pile);
  return art;
}

function buyShopChest(def) {
  if (!spendGems(def.gemPrice)) {
    showToast("Not enough gems", 1600);
    return;
  }
  saveMeta();
  refreshCoinDisplays();
  showShopChestReward(def);
}

function setCrabRewardBackLabel(text) {
  if (btnCrabRewardBack) btnCrabRewardBack.textContent = text;
}

function showShopChestReward(def) {
  hideAllPanels();
  crabRewardSource = "shop";
  resetChestOpenUi();
  const bundle = rollCrabBundles(def.tier)[0];
  if (bundle) bundle.gems = 0;
  crabRewardBundles = bundle ? [bundle] : [];
  crabRewardClaimed = false;
  if (crabRewardHeadline) crabRewardHeadline.textContent = `${def.name}!`;
  if (crabRewardSummary) {
    crabRewardSummary.innerHTML = `Bought for <strong>${def.gemPrice}</strong> gems`;
  }
  if (crabRewardTier) {
    crabRewardTier.hidden = true;
    crabRewardTier.textContent = "";
  }
  if (crabRewardPrompt) crabRewardPrompt.textContent = "Tap the chest to open it.";
  if (crabRewardResult) {
    crabRewardResult.hidden = true;
    crabRewardResult.textContent = "";
  }
  if (btnCrabPlayAgain) btnCrabPlayAgain.hidden = true;
  setCrabRewardBackLabel("Back to shop");
  renderCrabRewardChests(def.tier, 1);
  if (panelCrabReward) panelCrabReward.hidden = false;
  syncHomeLaunchButtons();
}

function buyShopCoinBundle(pack) {
  if (!spendGems(pack.gems)) {
    showToast("Not enough gems", 1600);
    return;
  }
  gameMeta.coins += pack.coins;
  saveMeta();
  refreshCoinDisplays();
  buildShopUI();
  showToast(`+${pack.coins.toLocaleString()} coins`, 2000);
}

function shopTicketIcon() {
  const art = document.createElement("div");
  art.className = "shop-item__icon shop-item__icon--ticket";
  art.setAttribute("aria-hidden", "true");
  art.innerHTML =
    '<svg viewBox="0 0 48 48" width="40" height="40" xmlns="http://www.w3.org/2000/svg">' +
    '<rect x="6" y="14" width="36" height="20" rx="4" fill="#f87171"/>' +
    '<rect x="6" y="14" width="36" height="20" rx="4" fill="none" stroke="#7f1d1d" stroke-width="2"/>' +
    '<circle cx="6" cy="24" r="4" fill="#0b3a4a"/>' +
    '<circle cx="42" cy="24" r="4" fill="#0b3a4a"/>' +
    '<path d="M18 18 v12 M30 18 v12" stroke="#fee2e2" stroke-width="2" stroke-dasharray="2 3"/>' +
    '<text x="24" y="28" text-anchor="middle" font-size="11" font-weight="800" fill="#7f1d1d">VS</text>' +
    "</svg>";
  return art;
}

function buildShopUI() {
  if (!shopList) return;
  shopList.innerHTML = "";
  refreshDuelTicketsForToday();

  const chestSec = shopSection("Treasure chests", "GEMS");
  for (const def of SHOP_CHEST_DEFS) {
    const li = document.createElement("li");
    li.className = `shop-item shop-item--chest shop-item--chest-${def.tier}`;
    li.appendChild(shopChestIcon(def.tier));
    const body = document.createElement("div");
    body.className = "shop-item__body";
    const title = document.createElement("h3");
    title.className = "shop-item__title";
    title.textContent = def.name;
    body.append(title);
    const buy = shopBuyButton({
      price: def.gemPrice,
      currency: "gems",
      disabled: getGemCount() < def.gemPrice,
      label: "Open",
    });
    buy.addEventListener("click", () => buyShopChest(def));
    li.append(body, buy);
    chestSec.list.appendChild(li);
  }
  shopList.appendChild(chestSec.section);

  const vaultSec = shopSection("Coin vault", "GEMS");
  for (const pack of SHOP_COIN_BUNDLES) {
    const li = document.createElement("li");
    li.className = `shop-item shop-item--coin-vault${pack.featured ? " shop-item--featured" : ""}`;
    if (pack.featured) {
      const ribbon = document.createElement("span");
      ribbon.className = "shop-item__ribbon";
      ribbon.textContent = "Best value";
      li.append(ribbon);
    }
    li.appendChild(shopCoinBundleIcon());
    const body = document.createElement("div");
    body.className = "shop-item__body";
    const title = document.createElement("h3");
    title.className = "shop-item__title";
    title.textContent = pack.name;
    const meta = document.createElement("div");
    meta.className = "shop-item__meta";
    meta.innerHTML = `<span class="shop-item__stock">${pack.coins.toLocaleString()} coins</span>`;
    body.append(title, meta);
    const buy = shopBuyButton({
      price: pack.gems,
      currency: "gems",
      disabled: getGemCount() < pack.gems,
      label: "Buy",
    });
    buy.addEventListener("click", () => buyShopCoinBundle(pack));
    li.append(body, buy);
    vaultSec.list.appendChild(li);
  }
  shopList.appendChild(vaultSec.section);

  const tickets = shopSection("Event tickets", "HOT");
  const duelTicketLi = document.createElement("li");
  duelTicketLi.className = "shop-item shop-item--duel-ticket shop-item--featured";
  const duelRibbon = document.createElement("span");
  duelRibbon.className = "shop-item__ribbon";
  duelRibbon.textContent = "Best value";
  duelTicketLi.append(duelRibbon, shopTicketIcon());
  const duelBody = document.createElement("div");
  duelBody.className = "shop-item__body";
  const duelTitle = document.createElement("h3");
  duelTitle.className = "shop-item__title";
  duelTitle.textContent = "Duel ticket";
  const duelDesc = document.createElement("p");
  duelDesc.className = "shop-item__desc";
  duelDesc.textContent = "1 duel run · 5 free each day.";
  const duelMeta = document.createElement("div");
  duelMeta.className = "shop-item__meta";
  duelMeta.innerHTML = `<span class="shop-item__stock">You have ${getDuelTicketCount()}</span>`;
  duelBody.append(duelTitle, duelDesc, duelMeta);
  const duelBuy = shopBuyButton({
    price: DUEL_TICKET_PRICE,
    disabled: gameMeta.coins < DUEL_TICKET_PRICE,
    label: "Buy 1",
  });
  duelBuy.addEventListener("click", () => {
    if (gameMeta.coins < DUEL_TICKET_PRICE) return;
    gameMeta.coins -= DUEL_TICKET_PRICE;
    gameMeta.duelTickets = getDuelTicketCount() + 1;
    saveMeta();
    refreshCoinDisplays();
    buildShopUI();
    if (panelEvents && !panelEvents.hidden) refreshDuelEventCard();
    showToast("Duel ticket +1", 1600);
  });
  duelTicketLi.append(duelBody, duelBuy);
  tickets.list.appendChild(duelTicketLi);
  shopList.appendChild(tickets.section);

  const baitSec = shopSection("Bait packs", "BOOST");
  for (const b of BAITS) {
    if (!b.consumesOnRound || b.shopHidden) continue;
    const li = document.createElement("li");
    li.className = "shop-item shop-item--bait";
    li.appendChild(shopBaitIcon(b.id));
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
    meta.innerHTML = `<span class="shop-item__stock">+${b.packSize} use${b.packSize === 1 ? "" : "s"}</span>`;
    body.append(title, desc, meta);
    const buy = shopBuyButton({
      price: b.price,
      disabled: gameMeta.coins < b.price,
    });
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
    baitSec.list.appendChild(li);
  }
  shopList.appendChild(baitSec.section);

  const rodSec = shopSection("Pro rods", "GEAR");
  for (const rod of RODS) {
    if (rod.id === FREE_ROD_ID || rod.id === MAGNET_ROD_ID || rod.chestOnly) continue;
    const owned = isRodOwned(rod.id);
    const li = document.createElement("li");
    li.className = `shop-item shop-item--rod shop-item--rod-${rod.id}${owned ? " shop-item--owned" : ""}`;
    const art = document.createElement("div");
    art.className = "shop-item__art";
    art.innerHTML = rodArtSvg(rod);
    const body = document.createElement("div");
    body.className = "shop-item__body";
    const title = document.createElement("h3");
    title.className = "shop-item__title";
    title.textContent = rod.name;
    const desc = document.createElement("p");
    desc.className = "shop-item__desc";
    desc.textContent = rod.desc;
    if (owned) {
      const meta = document.createElement("div");
      meta.className = "shop-item__meta";
      meta.innerHTML = `<span class="shop-item__stock shop-item__stock--owned">Owned</span>`;
      body.append(title, desc, meta);
    } else {
      body.append(title, desc);
    }
    const buy = shopBuyButton({
      owned,
      price: ROD_PRICE,
      disabled: owned || gameMeta.coins < ROD_PRICE,
    });
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
    li.append(art, body, buy);
    rodSec.list.appendChild(li);
  }
  shopList.appendChild(rodSec.section);

  const dailyFits = ensureDailyClothesShop();
  const clothesSec = shopSection("Daily pals", "TODAY");
  const resetNote = document.createElement("p");
  resetNote.className = "shop-section__note";
  resetNote.textContent = formatDailyResetCountdown(msUntilDailyReset());
  clothesSec.section.insertBefore(resetNote, clothesSec.list);
  for (const id of dailyFits.itemIds) {
    const def = COMPANION_BY_ID[id];
    if (!def) continue;
    const owned = isClothesOwned(id);
    const li = document.createElement("li");
    li.className = `shop-item shop-item--clothes${owned ? " shop-item--owned" : ""}`;
    const art = document.createElement("div");
    art.className = "shop-item__icon shop-item__icon--clothes";
    art.setAttribute("aria-hidden", "true");
    art.innerHTML = companionArtSvg(id, { className: "shop-item__clothes-art" });
    const body = document.createElement("div");
    body.className = "shop-item__body";
    const title = document.createElement("h3");
    title.className = "shop-item__title";
    title.textContent = def.name;
    const meta = document.createElement("div");
    meta.className = "shop-item__meta";
    meta.innerHTML = owned
      ? `<span class="shop-item__stock shop-item__stock--owned">${companionKindLabel(def.kind)} · Owned</span>`
      : `<span class="shop-item__stock">${companionKindLabel(def.kind)}</span>`;
    body.append(title, meta);
    const buy = shopBuyButton({
      owned,
      price: def.price,
      disabled: owned || gameMeta.coins < def.price,
      label: owned ? "Owned" : "Buy",
    });
    buy.addEventListener("click", () => buyClothingItem(id));
    li.append(art, body, buy);
    clothesSec.list.appendChild(li);
  }
  shopList.appendChild(clothesSec.section);

  const dailyFrames = ensureDailyAvatarFrameShop();
  const framesSec = shopSection("Daily rings", "FRAMES");
  const frameResetNote = document.createElement("p");
  frameResetNote.className = "shop-section__note";
  frameResetNote.textContent = formatDailyResetCountdown(msUntilDailyReset());
  framesSec.section.insertBefore(frameResetNote, framesSec.list);
  for (const id of dailyFrames.itemIds) {
    const def = AVATAR_FRAME_BY_ID[id];
    if (!def) continue;
    const owned = isAvatarFrameOwned(id);
    const li = document.createElement("li");
    li.className = `shop-item shop-item--frame${owned ? " shop-item--owned" : ""}`;
    const art = document.createElement("div");
    art.className = "shop-item__icon shop-item__icon--frame";
    art.setAttribute("aria-hidden", "true");
    art.innerHTML = avatarFrameSwatchHtml(id, { className: "shop-item__frame-swatch" });
    const body = document.createElement("div");
    body.className = "shop-item__body";
    const title = document.createElement("h3");
    title.className = "shop-item__title";
    title.textContent = def.name;
    const meta = document.createElement("div");
    meta.className = "shop-item__meta";
    meta.innerHTML = owned
      ? `<span class="shop-item__stock shop-item__stock--owned">${avatarFrameKindLabel(def.kind)} · Owned</span>`
      : `<span class="shop-item__stock">${avatarFrameKindLabel(def.kind)}</span>`;
    body.append(title, meta);
    const buy = shopBuyButton({
      owned,
      price: def.price,
      disabled: owned || gameMeta.coins < def.price,
      label: owned ? "Owned" : "Buy",
    });
    buy.addEventListener("click", () => buyAvatarFrame(id));
    li.append(art, body, buy);
    framesSec.list.appendChild(li);
  }
  shopList.appendChild(framesSec.section);
}

function openShop() {
  if (!panelShop) return;
  setStartMoreOptionsOpen(false);
  normalizeSelectedBaitId();
  refreshCoinDisplays();
  buildShopUI();
  syncSeagullOutfit();
  showShopGuideIfNeeded();
  showExclusiveMenu("shop");
  syncHomeLaunchButtons();
}

function closeShop() {
  if (!panelShop || !panelStart) return;
  panelShop.hidden = true;
  panelStart.hidden = false;
  refreshLeaderboardViews();
  buildBaitUI();
  buildRodUI();
  refreshCoinDisplays();
  syncHomeLaunchButtons();
  if (musicEnabled) startHomeMusic();
}

function armedBoostLabels() {
  const labels = [];
  if (gameMeta.pendingLuckyLure) labels.push("Lucky Lure");
  if (gameMeta.pendingDoubleHaul) labels.push("Double Haul");
  if (gameMeta.pendingMysteryReef) labels.push("Mystery Reef");
  return labels;
}

function syncAdventureSkipRopeButton() {
  if (!btnAdventureSkipRope) return;
  const n = getChestItemCount("adventure_skip_rope");
  btnAdventureSkipRope.hidden = n < 1;
  btnAdventureSkipRope.textContent =
    n > 1 ? `Use Adventure Skip Rope (${n})` : "Use Adventure Skip Rope";
}

function refreshCollectablesUI() {
  syncAdventureSkipRopeButton();
  refreshAdventurePrepBoosts();
  if (collectablesArmed) {
    const labels = armedBoostLabels();
    if (labels.length) {
      collectablesArmed.hidden = false;
      collectablesArmed.textContent = `Armed for next reef round: ${labels.join(" · ")}`;
    } else {
      collectablesArmed.hidden = true;
      collectablesArmed.textContent = "";
    }
  }
  if (collectablesItems) {
    collectablesItems.replaceChildren();
    for (const id of CHEST_ITEM_IDS) {
      const def = CHEST_ITEM_DEFS[id];
      const qty = getChestItemCount(id);
      const card = document.createElement("article");
      card.className = `collectables-item${qty < 1 ? " collectables-item--empty" : ""}`;
      const icon = document.createElement("div");
      icon.className = "collectables-item__icon";
      icon.textContent = def.icon;
      const body = document.createElement("div");
      body.className = "collectables-item__body";
      const name = document.createElement("p");
      name.className = "collectables-item__name";
      name.textContent = def.name;
      const blurb = document.createElement("p");
      blurb.className = "collectables-item__blurb";
      blurb.textContent = def.blurb;
      const qtyEl = document.createElement("p");
      qtyEl.className = "collectables-item__qty";
      qtyEl.textContent = `Owned: ${qty}`;
      body.append(name, blurb, qtyEl);
      card.append(icon, body);
      const armable = id === "lucky_lure" || id === "double_haul" || id === "mystery_reef";
      if (armable) {
        const useBtn = document.createElement("button");
        useBtn.type = "button";
        useBtn.className = "btn btn--secondary collectables-item__use";
        useBtn.dataset.armItem = id;
        const pending =
          (id === "lucky_lure" && gameMeta.pendingLuckyLure) ||
          (id === "double_haul" && gameMeta.pendingDoubleHaul) ||
          (id === "mystery_reef" && gameMeta.pendingMysteryReef);
        useBtn.textContent = pending ? "Armed" : "Use";
        useBtn.disabled = qty < 1 || pending;
        card.appendChild(useBtn);
      }
      collectablesItems.appendChild(card);
    }
  }
  if (collectablesStamps) {
    collectablesStamps.replaceChildren();
    let owned = 0;
    for (const spec of FISH_SPECIES) {
      const have = hasCatchStamp(spec.id);
      if (have) owned += 1;
      const colors = Array.isArray(spec.colors) ? spec.colors : ["#64748b", "#1e293b", "#e2e8f0"];
      const cell = document.createElement("article");
      cell.className = `collectables-stamp${have ? " collectables-stamp--owned" : " collectables-stamp--locked"}`;
      cell.title = have ? spec.name : "Locked stamp";
      const swatch = document.createElement("div");
      swatch.className = "collectables-stamp__swatch";
      if (have) {
        swatch.style.background = `linear-gradient(135deg, ${colors[0]}, ${colors[1] || colors[0]})`;
      }
      const name = document.createElement("p");
      name.className = "collectables-stamp__name";
      name.textContent = have ? spec.name : "???";
      const rarity = document.createElement("p");
      rarity.className = "collectables-stamp__rarity";
      rarity.textContent = have ? spec.rarity : "unknown";
      cell.append(swatch, name, rarity);
      collectablesStamps.appendChild(cell);
    }
    if (collectablesStampCount) {
      collectablesStampCount.textContent = `${owned} / ${FISH_SPECIES.length} collected`;
    }
    const stampFill = document.getElementById("collectablesStampFill");
    if (stampFill) {
      const pct = FISH_SPECIES.length ? Math.round((owned / FISH_SPECIES.length) * 100) : 0;
      stampFill.style.width = `${pct}%`;
    }
  }
  if (collectablesWardrobe) {
    collectablesWardrobe.replaceChildren();
    const ownedIds = new Set(gameMeta.ownedClothes || []);
    const equipped = equippedCompanionId();
    const ownedPals = COMPANION_DEFS.filter((d) => ownedIds.has(d.id));
    if (!ownedPals.length) {
      const empty = document.createElement("p");
      empty.className = "wardrobe-empty";
      empty.textContent = "No sea pals yet — check Daily pals in the shop.";
      collectablesWardrobe.appendChild(empty);
    } else {
      for (const def of ownedPals) {
        const on = equipped === def.id;
        const tile = document.createElement("button");
        tile.type = "button";
        tile.className = `wardrobe-tile${on ? " wardrobe-tile--equipped" : ""}`;
        tile.dataset.equipClothes = def.id;
        tile.setAttribute("role", "option");
        tile.setAttribute("aria-selected", on ? "true" : "false");
        tile.title = on ? `Using ${def.name}` : `Use ${def.name}`;
        tile.innerHTML =
          `<span class="wardrobe-tile__kind wardrobe-tile__kind--${def.kind}">${companionKindLabel(def.kind)}</span>` +
          companionArtSvg(def.id, { className: "wardrobe-tile__art" }) +
          `<span class="wardrobe-tile__name">${def.name}</span>` +
          `<span class="wardrobe-tile__state">${on ? "Using" : "Use"}</span>`;
        collectablesWardrobe.appendChild(tile);
      }
    }
  }
  if (collectablesWardrobeCount) {
    const n = (gameMeta.ownedClothes || []).length;
    collectablesWardrobeCount.textContent = `${n} / ${COMPANION_DEFS.length} pals`;
  }
  if (collectablesFrames) {
    collectablesFrames.replaceChildren();
    const ownedFrameIds = new Set(gameMeta.ownedAvatarFrames || []);
    const equippedFrame = equippedAvatarFrameId();
    const ownedFrames = AVATAR_FRAME_DEFS.filter((d) => ownedFrameIds.has(d.id));
    if (!ownedFrames.length) {
      const empty = document.createElement("p");
      empty.className = "wardrobe-empty";
      empty.textContent = "No rings yet — check Daily rings in the shop.";
      collectablesFrames.appendChild(empty);
    } else {
      for (const def of ownedFrames) {
        const on = equippedFrame === def.id;
        const tile = document.createElement("button");
        tile.type = "button";
        tile.className = `wardrobe-tile wardrobe-tile--frame${on ? " wardrobe-tile--equipped" : ""}`;
        tile.dataset.equipFrame = def.id;
        tile.setAttribute("role", "option");
        tile.setAttribute("aria-selected", on ? "true" : "false");
        tile.title = on ? `Using ${def.name}` : `Use ${def.name}`;
        tile.innerHTML =
          `<span class="wardrobe-tile__kind wardrobe-tile__kind--${def.kind}">${avatarFrameKindLabel(def.kind)}</span>` +
          avatarFrameSwatchHtml(def.id, { className: "wardrobe-tile__frame-swatch" }) +
          `<span class="wardrobe-tile__name">${def.name}</span>` +
          `<span class="wardrobe-tile__state">${on ? "Using" : "Use"}</span>`;
        collectablesFrames.appendChild(tile);
      }
    }
  }
  if (collectablesFramesCount) {
    const n = (gameMeta.ownedAvatarFrames || []).length;
    collectablesFramesCount.textContent = `${n} / ${AVATAR_FRAME_DEFS.length} rings`;
  }
  syncSeagullOutfit();
}

function openCollectables() {
  if (!panelCollectables) return;
  setStartMoreOptionsOpen(false);
  refreshCollectablesUI();
  syncSeagullOutfit();
  showExclusiveMenu("collectables");
  syncHomeLaunchButtons();
}

function closeCollectables() {
  if (!panelCollectables || !panelStart) return;
  panelCollectables.hidden = true;
  panelStart.hidden = false;
  syncHomeLaunchButtons();
  if (musicEnabled) startHomeMusic();
}

function parsePlayerName(value) {
  return String(value || "").replace(/\s+/g, " ").trim().slice(0, 16);
}

function initialsFromPlayerName(name) {
  const letters = String(name || "")
    .toUpperCase()
    .replace(/[^A-Z]/g, "");
  return letters.slice(0, 3);
}

function refreshProfileUI() {
  if (profileNameInput) {
    profileNameInput.value = gameMeta.playerName || "";
  }
  updateProfileNameHint();
  refreshCollectablesUI();
  syncSeagullOutfit();
  refreshAccountUI();
  if (authUser?.id) void refreshFriendsList();
}

function updateProfileNameHint() {
  if (!profileNameHint) return;
  const ini = gameMeta.playerInitials || initialsFromPlayerName(profileNameInput?.value || gameMeta.playerName);
  profileNameHint.textContent = ini
    ? `Boards will show you as ${ini}.`
    : "Used on boards as your 3-letter tag.";
}

function saveProfileNameFromInput() {
  const name = parsePlayerName(profileNameInput?.value);
  gameMeta.playerName = name;
  const derived = initialsFromPlayerName(name);
  if (derived) gameMeta.playerInitials = derived;
  saveMeta();
  if (profileNameInput) profileNameInput.value = name;
  updateProfileNameHint();
}

function openProfile() {
  if (!panelProfile) return;
  setStartMoreOptionsOpen(false);
  setStartSettingsOpen(false);
  refreshProfileUI();
  showExclusiveMenu("profile");
  syncHomeLaunchButtons();
  requestAnimationFrame(() => {
    if (window.matchMedia("(pointer: fine)").matches) {
      profileNameInput?.focus();
      profileNameInput?.select();
    }
  });
}

function closeProfile() {
  if (!panelProfile || !panelStart) return;
  saveProfileNameFromInput();
  panelProfile.hidden = true;
  panelStart.hidden = false;
  syncHomeLaunchButtons();
  if (musicEnabled) startHomeMusic();
}

function armChestBoost(itemId) {
  if (itemId === "lucky_lure") {
    if (gameMeta.pendingLuckyLure) {
      showToast("Lucky Lure already armed", 1800);
      return;
    }
    if (!spendChestItem("lucky_lure", 1)) {
      showToast("No Lucky Lure left", 1800);
      return;
    }
    gameMeta.pendingLuckyLure = true;
    saveMeta();
    refreshCollectablesUI();
    showToast(
      panelAdventurePrep && !panelAdventurePrep.hidden
        ? "Lucky Lure armed for this voyage"
        : "Lucky Lure armed for your next reef round",
      2200,
    );
    return;
  }
  if (itemId === "double_haul") {
    if (gameMeta.pendingDoubleHaul) {
      showToast("Double Haul already armed", 1800);
      return;
    }
    if (!spendChestItem("double_haul", 1)) {
      showToast("No Double Haul left", 1800);
      return;
    }
    gameMeta.pendingDoubleHaul = true;
    saveMeta();
    refreshCollectablesUI();
    showToast(
      panelAdventurePrep && !panelAdventurePrep.hidden
        ? "Double Haul armed for this voyage"
        : "Double Haul armed for your next reef round",
      2200,
    );
    return;
  }
  if (itemId === "mystery_reef") {
    if (gameMeta.pendingMysteryReef) {
      showToast("Mystery Reef already armed", 1800);
      return;
    }
    if (!spendChestItem("mystery_reef", 1)) {
      showToast("No Mystery Reef Key left", 1800);
      return;
    }
    gameMeta.pendingMysteryReef = true;
    saveMeta();
    refreshCollectablesUI();
    showToast("Mystery Reef armed — Start Game for a random reef", 2400);
  }
}

function showAdventureWinForLevel(levelIndex, scoreForCopy) {
  const lvl = getAdventureLevel(levelIndex);
  const clearedTreasureCove = levelIndex === TREASURE_COVE_INDEX;
  const clearedLegendsGate = levelIndex === LEGENDS_GATE_INDEX;
  const clearedAuroraReach = levelIndex === AURORA_REACH_INDEX;
  if (clearedTreasureCove) playTreasureCoveVictorySound();
  fillAdventureResultTheme(adventureWinTheme, levelIndex);
  if (adventureFailTheme) adventureFailTheme.hidden = true;
  if (adventureWinLevel) {
    adventureWinLevel.textContent = clearedTreasureCove
      ? "Treasure Cove conquered!"
      : clearedLegendsGate
        ? "Legend's Gate cleared!"
        : clearedAuroraReach
          ? "Aurora Reach cleared!"
          : `Level ${lvl.level} cleared!`;
  }
  if (adventureWinScore) {
    adventureWinScore.textContent = clearedTreasureCove
      ? `Skip Rope cleared the cove (score ${scoreForCopy}). ${ADVENTURE_SECTION_GOLD_QUEST} voyages await beyond the cove!`
      : clearedLegendsGate
        ? `Skip Rope cleared the gate (score ${scoreForCopy}). ${ADVENTURE_SECTION_FROZEN_SEA} voyages now appear on the map!`
        : clearedAuroraReach
          ? `Skip Rope cleared Aurora Reach (score ${scoreForCopy}). ${ADVENTURE_SECTION_LOST_CITY} voyages now appear on the map!`
          : `Adventure Skip Rope cleared level ${lvl.level} (score ${scoreForCopy}).`;
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
        : clearedAuroraReach
          ? `Start ${ADVENTURE_SECTION_LOST_CITY} voyage 1`
          : hasNext
            ? `Start level ${lvl.level + 1}`
            : "Back to map";
  }
  if (panelAdventureFail) panelAdventureFail.hidden = true;
  if (panelAdventureWin) panelAdventureWin.hidden = false;
  syncAdventureLaunchVisibility();
}

function useAdventureSkipRope() {
  if (!panelAdventureFail || panelAdventureFail.hidden) return;
  if (!spendChestItem("adventure_skip_rope", 1)) {
    showToast("No Adventure Skip Rope left", 1800);
    syncAdventureSkipRopeButton();
    return;
  }
  const levelIndex = pendingAdventureLevelIndex;
  const lvl = getAdventureLevel(levelIndex);
  const clearedTreasureCove = levelIndex === TREASURE_COVE_INDEX;
  const clearedLegendsGate = levelIndex === LEGENDS_GATE_INDEX;
  const clearedAuroraReach = levelIndex === AURORA_REACH_INDEX;
  gameMeta.adventureHighestLevel = Math.max(gameMeta.adventureHighestLevel || 0, lvl.level);
  if (clearedTreasureCove) gameMeta.pendingBonusVoyagesCelebration = true;
  if (clearedLegendsGate) gameMeta.pendingIceVoyagesCelebration = true;
  if (clearedAuroraReach) gameMeta.pendingLostCityCelebration = true;
  saveMeta();
  adventureMapUiProgress = -1;
  pendingAdventureTrailReveal = true;
  refreshCollectablesUI();
  showAdventureWinForLevel(levelIndex, score);
  showToast("Adventure Skip Rope — voyage cleared!", 2400);
  if (musicEnabled) startAdventureMusic();
}

function openEvents() {
  if (!panelEvents) return;
  setStartMoreOptionsOpen(false);
  showExclusiveMenu("events");
  refreshDuelTicketsForToday();
  syncHomeLaunchButtons();
  void processDailyPrizePayouts().then(() => refreshEventsPanel());
  startDailyEventCountdown();
  if (musicEnabled) startEventsMusic();
}

function closeEvents() {
  if (duelMatchmakingActive) {
    duelMatchmakingActive = false;
    void cancelDuelLobbyIfHost(duelLobbyMatchId);
    duelLobbyMatchId = null;
    setDuelMatchmakingUi(false);
  }
  if (!panelEvents || !panelStart) return;
  panelEvents.hidden = true;
  if (eventsOcean) eventsOcean.hidden = true;
  panelStart.hidden = false;
  appRoot?.classList.remove("app--events-mode");
  stopDailyEventCountdown();
  syncHomeLaunchButtons();
  stopEventsMusic();
  if (musicEnabled) startHomeMusic();
  window.setTimeout(tryStartDailyPrizeCelebration, 300);
}

/* =========================================================================
   Event mini-games — Reef Roulette, Co-op Haul, Kraken Survivor.
   ========================================================================= */
function minigameFishTierForScore(pts) {
  if (pts < MINIGAME_FISH_CHEST_MIN) return null;
  if (pts >= MINIGAME_FISH_LEGENDARY_MIN) return "legendary";
  if (pts >= MINIGAME_FISH_RARE_MIN) return "rare";
  return "common";
}

function survivorTierForScore(pts) {
  if (pts < MINIGAME_SURVIVOR_CHEST_MIN) return null;
  if (pts >= MINIGAME_SURVIVOR_LEGENDARY_MIN) return "legendary";
  if (pts >= MINIGAME_SURVIVOR_RARE_MIN) return "rare";
  return "common";
}

function syncPrimaryKraken() {
  kraken = krakens.find((k) => k.state === "biting") || krakens.find((k) => k.state === "active") || krakens[0] || null;
}

function clearKrakens() {
  krakens = [];
  kraken = null;
}

function setSingleKraken(next) {
  krakens = next ? [next] : [];
  syncPrimaryKraken();
}

/** Computers / tablets / big screens — not phones. */
function survivorAllowsKrakenPack() {
  return !isPhoneDevice();
}

function survivorKrakenPackSize() {
  if (!survivorAllowsKrakenPack()) return 1;
  const wide = typeof window !== "undefined" && window.innerWidth >= 1100;
  return wide ? 3 : 2;
}

function scheduleSurvivorKraken(now, { refill = false } = {}) {
  if (!eventMinigameSession || eventMinigameSession.kind !== "survivor") return;
  if (eventMinigameSession.caughtKraken) return;
  const t0 = now || performance.now();
  const n = survivorKrakenPackSize();
  if (!refill) {
    krakens = [];
    for (let i = 0; i < n; i++) {
      krakens.push({
        state: "scheduled",
        spawnAt: t0 + 700 + Math.random() * 800 + i * 320,
        lane: i,
        packSize: n,
      });
    }
    syncPrimaryKraken();
    return;
  }
  krakens = krakens.filter((k) => k && k.state !== "done");
  while (krakens.length < n) {
    const lane = krakens.length;
    krakens.push({
      state: "scheduled",
      spawnAt: t0 + 280 + Math.random() * 720 + lane * 160,
      lane,
      packSize: n,
    });
  }
  syncPrimaryKraken();
}

function syncCoopHud(show) {
  if (!duelHud) return;
  const you = document.getElementById("duelHudPlayerLabel");
  const rival = document.getElementById("duelHudOpponentLabel");
  const vs = duelHud.querySelector(".duel-hud__vs");
  if (!show || eventMinigameSession?.kind !== "coop") {
    duelHud.hidden = true;
    duelHud.classList.remove("duel-hud--coop");
    if (you) you.textContent = "You";
    if (rival) rival.textContent = "Rival";
    if (vs) vs.textContent = "vs";
    return;
  }
  duelHud.hidden = false;
  duelHud.classList.add("duel-hud--coop");
  if (you) you.textContent = isCoopPvpSession() ? getDuelPlayerInitials() : "You";
  if (rival) rival.textContent = getCoopPartnerDisplayName();
  if (vs) vs.textContent = "+";
  const pScore = document.getElementById("duelHudPlayerScore");
  const oScore = document.getElementById("duelHudOpponentScore");
  if (pScore) pScore.textContent = String(score);
  if (oScore) oScore.textContent = String(eventMinigameSession.partnerScore || 0);
}

function coopExpectedPartnerScore(now) {
  const s = eventMinigameSession;
  if (!s || s.kind !== "coop") return 0;
  const elapsed = now - (s.startedAt || now);
  const t = Math.min(1, Math.max(0, elapsed / (s.roundMs || MINIGAME_COOP_MS)));
  const ease = t * t * (3 - 2 * t);
  return Math.floor((s.partnerTarget || 0) * ease * (s.pacingBias || 1));
}

function boostCoopPartnerIfBehind(now) {
  const s = eventMinigameSession;
  if (!s || s.kind !== "coop" || s.mode !== "com") return;
  const expected = coopExpectedPartnerScore(now);
  if ((s.partnerScore || 0) >= expected - 12) return;
  if (Math.random() > 0.02) return;
  const bump = Math.min(22, Math.max(6, expected - (s.partnerScore || 0)));
  s.partnerScore = (s.partnerScore || 0) + bump;
  syncCoopHud(true);
}

function updateCoopPartner(now) {
  const s = eventMinigameSession;
  if (!s || s.kind !== "coop") return;
  if (s.mode === "pvp") {
    if (now - (s.lastPartnerPoll || 0) >= COOP_PARTNER_POLL_MS) {
      s.lastPartnerPoll = now;
      void pollCoopPartnerFromMatch();
    }
    syncCoopHud(true);
    return;
  }
  const expected = coopExpectedPartnerScore(now);
  if (expected > (s.partnerScore || 0)) s.partnerScore = expected;
  boostCoopPartnerIfBehind(now);
  syncCoopHud(true);
}

function refreshEventMinigameCards() {
  const tickets = getDuelTicketCount();
  const map = [
    ["rouletteEventTickets", "btnStartRoulette", "Play Reef Roulette"],
    ["survivorEventTickets", "btnStartSurvivor", "Play Kraken Survivor"],
  ];
  for (const [ticketId, btnId, label] of map) {
    const ticketEl = document.getElementById(ticketId);
    const btn = document.getElementById(btnId);
    if (ticketEl) ticketEl.textContent = `Tickets: ${tickets}`;
    if (btn) {
      btn.disabled = tickets <= 0;
      btn.textContent = tickets <= 0 ? "No tickets — visit shop" : label;
    }
  }
  refreshCoopEventCard();
}

function spendTicketOrToast() {
  if (tournamentRun) return true;
  if (getDuelTicketCount() <= 0) {
    showToast("No tickets — visit the shop", 2200);
    return false;
  }
  if (!spendDuelTicket()) {
    showToast("No tickets — visit the shop", 2200);
    return false;
  }
  refreshCrabTrapEventCard();
  refreshEventMinigameCards();
  refreshDuelEventCard();
  return true;
}

function pickMinigameReef(kind) {
  if (kind === "roulette" && ROULETTE_REEFS.length) {
    return ROULETTE_REEFS[Math.floor(Math.random() * ROULETTE_REEFS.length)];
  }
  return REEFS[Math.floor(Math.random() * REEFS.length)] || REEFS[0];
}

function beginCoopSession(plan) {
  hideAllPanels();
  if (panelCrabReward) panelCrabReward.hidden = true;
  stopEventsMusic();
  const reef = REEFS.find((r) => r.id === plan.reefId) || pickMinigameReef("coop");
  const now = performance.now();
  eventMinigameSession = {
    kind: "coop",
    reefId: reef.id,
    reefName: `Co-op · ${reef.name}`,
    roundMs: MINIGAME_COOP_MS,
    spawnMult: 0.76,
    speedMult: 1.14,
    maxFishMult: 0.95,
    startedAt: now,
    partnerScore: 0,
    mode: plan.mode,
    matchId: plan.matchId,
    role: plan.role,
    partnerInitials:
      plan.mode === "com" ? comGuestDisplayName(plan.partnerInitials) : plan.partnerInitials || "",
    partnerTarget: plan.partnerTarget || 0,
    pacingBias: plan.pacingBias || 1,
    lastStatePush: 0,
    lastPartnerPoll: 0,
  };
  startRound();
  if (plan.mode === "pvp") {
    void pollCoopPartnerFromMatch();
    void pushCoopMatchState();
  }
}

async function startCoopFromEvents(fromPrep = false) {
  if (playing || coopMatchmakingActive || duelMatchmakingActive || eventMinigameSession) return;
  if (crabTrapSession || duelSession || adventureSession) {
    showToast("Finish your current run first", 2000);
    return;
  }
  refreshDuelTicketsForToday();
  if (!tournamentRun && getDuelTicketCount() <= 0) {
    showToast("No tickets — visit the shop", 2200);
    refreshCoopEventCard();
    return;
  }
  if (!fromPrep) {
    openEventPrep("coop");
    return;
  }
  if (!tournamentRun && !spendDuelTicket()) {
    refreshCoopEventCard();
    return;
  }

  hideAllPanels();
  if (panelEvents) panelEvents.hidden = false;
  if (eventsOcean) eventsOcean.hidden = true;
  appRoot?.classList.add("app--events-mode");
  const matchmakingDeadline = Date.now() + COOP_LOBBY_TIMEOUT_MS;
  setCoopMatchmakingUi(true, "Trying to find a partner…");
  startCoopLobbyCountdown(matchmakingDeadline, "Trying to find a partner");

  try {
    const plan = await resolveCoopMatchPlan(matchmakingDeadline);
    hideCoopLobbyCountdown();
    await waitForCoopRoundStart(plan);
    setCoopMatchmakingUi(false);
    beginCoopSession(plan);
  } catch (err) {
    console.warn(err);
    hideOnlineMatchup();
    appRoot?.classList.remove("app--matchup");
    setCoopMatchmakingUi(false);
    gameMeta.duelTickets += 1;
    saveMeta();
    refreshCoopEventCard();
    refreshCrabTrapEventCard();
    refreshDuelEventCard();
    if (isDuelBackendMissingError(err)) {
      showToast(
        "Co-op matchmaking isn't set up yet — run supabase/duel_matches_coop_kind.sql in your Supabase SQL editor, then try again.",
        5200,
      );
    } else {
      showToast("Co-op matchmaking cancelled.", 2400);
    }
    openEvents();
  }
}

let pendingEventPrepKind = null;

function eventPrepCopy(kind) {
  if (kind === "duel") {
    return {
      eyebrow: "Duel Fishing",
      title: "Ready your gear",
      detail: "Pick bait and a rod, then choose a friend or enter the lobby.",
    };
  }
  if (kind === "coop") {
    return {
      eyebrow: "Co-op Haul",
      title: "Ready your gear",
      detail: "Pick bait and a rod, then choose a friend or find a partner.",
    };
  }
  if (kind === "roulette") {
    return {
      eyebrow: "Reef Roulette",
      title: "Ready your gear",
      detail: "Pick bait and a rod for a random reef run.",
    };
  }
  return {
    eyebrow: "Kraken Survivor",
    title: "Ready your gear",
    detail: "Pick bait and a rod before you hunt the beast.",
  };
}

function openEventPrep(kind) {
  if (playing || crabTrapSession || duelSession || adventureSession) {
    showToast("Finish your current run first", 2000);
    return;
  }
  pendingEventPrepKind = kind;
  if (kind !== "duel" && kind !== "coop") pendingEventFriendUserId = null;
  const copy = eventPrepCopy(kind);
  if (eventPrepEyebrow) eventPrepEyebrow.textContent = copy.eyebrow;
  if (eventPrepTitle) eventPrepTitle.textContent = copy.title;
  if (eventPrepDetail) eventPrepDetail.textContent = copy.detail;
  hideAllPanels();
  if (panelEventPrep) panelEventPrep.hidden = false;
  appRoot?.classList.add("app--events-mode");
  buildBaitUI();
  buildRodUI();
  void refreshFriendsList();
  refreshEventPrepFriendsUI();
  stopEventsMusic();
  if (musicEnabled) startHomeMusic();
}

function closeEventPrep() {
  pendingEventPrepKind = null;
  if (panelEventPrep) panelEventPrep.hidden = true;
  openEvents();
}

function confirmEventPrepStart() {
  const kind = pendingEventPrepKind;
  pendingEventPrepKind = null;
  if (panelEventPrep) panelEventPrep.hidden = true;
  if (kind === "duel") {
    void startDuelFromEvents(true);
    return;
  }
  if (kind === "coop") {
    void startCoopFromEvents(true);
    return;
  }
  if (kind === "roulette" || kind === "survivor") {
    beginEventMinigame(kind, true);
  }
}

function beginEventMinigame(kind, fromPrep = false) {
  if (kind === "coop") {
    if (!fromPrep) {
      openEventPrep("coop");
      return;
    }
    void startCoopFromEvents(true);
    return;
  }
  if (!fromPrep && (kind === "roulette" || kind === "survivor")) {
    openEventPrep(kind);
    return;
  }
  if (playing || crabTrapSession || duelSession || adventureSession || coopMatchmakingActive) {
    showToast("Finish your current run first", 2000);
    return;
  }
  if (!spendTicketOrToast()) return;
  hideAllPanels();
  if (panelCrabReward) panelCrabReward.hidden = true;
  stopEventsMusic();
  const reef = pickMinigameReef(kind);
  const now = performance.now();
  if (kind === "roulette") {
    const spin = 0.72 + Math.random() * 0.5;
    eventMinigameSession = {
      kind: "roulette",
      reefId: reef.id,
      reefName: reef.name,
      roundMs: MINIGAME_ROULETTE_MS,
      spawnMult: spin,
      speedMult: 0.95 + Math.random() * 0.35,
      maxFishMult: 1.05 + Math.random() * 0.35,
      startedAt: now,
    };
    showToast(`Reef Roulette: ${reef.name}!`, 2200);
  } else {
    eventMinigameSession = {
      kind: "survivor",
      reefId: reef.id,
      reefName: `Survivor · ${reef.name}`,
      roundMs: MINIGAME_SURVIVOR_MS,
      spawnMult: 0.8,
      speedMult: 1.22,
      maxFishMult: 1.12,
      startedAt: now,
      caughtKraken: false,
    };
    showToast(
      survivorAllowsKrakenPack()
        ? "Kraken Survivor — dodge the swarm, then hook one to finish!"
        : "Kraken Survivor — fish for bonus pts, then hook the beast!",
      2800
    );
  }
  startRound();
}

function showEventMinigameReward({ source, title, summaryHtml, scorePts, tier }) {
  crabRewardSource = source;
  resetChestOpenUi();
  const noChest = !tier;
  crabRewardBundles = noChest ? [] : rollCrabBundles(tier);
  crabRewardClaimed = noChest;
  if (crabRewardHeadline) crabRewardHeadline.textContent = title;
  if (crabRewardSummary) crabRewardSummary.innerHTML = summaryHtml;
  if (crabRewardTier) {
    crabRewardTier.hidden = false;
    crabRewardTier.textContent = noChest
      ? "Too small a haul — no chest this time. Try again for a better score!"
      : tier === "legendary"
        ? "Legendary chest — top haul!"
        : tier === "rare"
          ? "Rare chest — solid haul."
          : "Common chest — keep grinding for bigger rewards.";
  }
  if (crabRewardPrompt) {
    crabRewardPrompt.textContent = noChest
      ? "Score higher next run to unlock a chest."
      : "Choose one chest — better hauls mean richer loot.";
  }
  if (crabRewardResult) {
    crabRewardResult.hidden = true;
    crabRewardResult.textContent = "";
  }
  if (btnCrabPlayAgain) btnCrabPlayAgain.hidden = true;
  setCrabRewardBackLabel("Back to Events");
  if (noChest) {
    if (crabRewardChests) crabRewardChests.innerHTML = "";
    revealCrabRewardActions();
  } else {
    renderCrabRewardChests(tier);
  }
  if (panelCrabReward) panelCrabReward.hidden = false;
  syncCoopHud(false);
  if (adventureGoalLine) adventureGoalLine.hidden = true;
  refreshEventMinigameCards();
}

function endEventMinigameRound() {
  void endEventMinigameRoundAsync();
}

async function endEventMinigameRoundAsync() {
  const session = eventMinigameSession;
  eventMinigameSession = null;
  syncCoopHud(false);
  if (adventureGoalLine && !adventureSession) adventureGoalLine.hidden = true;
  clearAdventurePlayTheme();
  roundBait = { catchRadiusMult: 1, rareAssistAdd: 0, lightRadiusMult: 1 };
  roundOverrideReefId = null;
  refreshCollectablesUI();
  if (!session) {
    openEvents();
    return;
  }
  const fishScore = Math.max(0, score);
  playCrabRoundEndSound();
  if (session.kind === "roulette") {
    const tier = minigameFishTierForScore(fishScore);
    if (tournamentRun) void finishTournamentRun(fishScore);
    showEventMinigameReward({
      source: "roulette",
      title: "Reef Roulette!",
      summaryHtml: `Haul on <strong>${session.reefName || "a mystery reef"}</strong>: <strong>${fishScore}</strong> pts`,
      scorePts: fishScore,
      tier,
    });
    return;
  }
  if (session.kind === "coop") {
    let partner = Math.max(0, session.partnerScore || 0);
    const partnerName =
      session.mode === "com" ? comGuestDisplayName(session.partnerInitials) : formatDuelInitials(session.partnerInitials) || "Partner";
    if (session.mode === "pvp" && session.matchId) {
      partner = await resolveCoopFinalPartnerScore(session, fishScore);
    }
    const combined = fishScore + partner;
    const tier = coopTierForScore(combined);
    if (tournamentRun) void finishTournamentRun(combined);
    showEventMinigameReward({
      source: "coop",
      title: "Co-op Haul!",
      summaryHtml: `You <strong>${fishScore}</strong> + ${partnerName} <strong>${partner}</strong> = <strong>${combined}</strong> pts`,
      scorePts: combined,
      tier,
    });
    return;
  }
  // survivor
  const tier = survivorTierForScore(fishScore);
  const hooked = Boolean(session.caughtKraken);
  if (tournamentRun) void finishTournamentRun(fishScore);
  showEventMinigameReward({
    source: "survivor",
    title: hooked ? "Kraken Survived!" : "Kraken Survivor",
    summaryHtml: hooked
      ? `You hooked the kraken with a <strong>${fishScore}</strong> pt bonus haul`
      : `Bonus haul: <strong>${fishScore}</strong> pts`,
    scorePts: fishScore,
    tier,
  });
}

/* =========================================================================
   Crab Trap — drop lobster cages on scuttling treasure crabs.
   Self-contained minigame with its own canvas + animation loop.
   ========================================================================= */
const CRAB_TRAP_DURATION_MS = 60_000;
/** Below this crab count — no chest reward. */
const CRAB_TRAP_CHEST_MIN = 12;
/** A low score (~20 crabs) yields common chests. */
const CRAB_TRAP_LOW_SCORE = 20;
/** Score >= this counts as a medium haul (better chests). */
const CRAB_TRAP_MEDIUM_MIN = 35;
/** Score >= this counts as a great haul (rich chests with rods). */
const CRAB_TRAP_GREAT_MIN = 55;
const CRAB_TRAP_MED_BAIT = [
  "nightcrawler",
  "shrimp",
  "glow_jelly",
  "squid_ink",
  "nightcrawler",
  "shrimp",
  KRAKEN_SPRAY_BAIT_ID,
];
const CRAB_TRAP_GREAT_BAIT = ["squid_ink", "golden_chum", "glow_jelly", "golden_chum", KRAKEN_SPRAY_BAIT_ID];

/** Cages you can drop before a reload. */
const CRAB_TRAP_CLIP_SIZE = 3;
/** Forced wait after emptying the clip. */
const CRAB_TRAP_RELOAD_MS = 1000;

let crabTrapSession = null;
let crabTrapDpr = 1;
let crabTrapW = 0;
let crabTrapH = 0;
let crabRewardBundles = [];
let crabRewardClaimed = false;

function crabRandInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function crabPick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function crabShuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function crabSandTopY() {
  // Solid beach occupying the whole bottom third of the playfield.
  return Math.floor(crabTrapH * 0.58);
}

function resizeCrabTrapCanvas() {
  if (!crabTrapCanvas) return;
  const rect = crabTrapCanvas.getBoundingClientRect();
  crabTrapDpr = Math.min(window.devicePixelRatio || 1, PERF_CHROMEBOOK ? 1 : 2);
  crabTrapW = Math.max(1, Math.floor(rect.width * crabTrapDpr));
  crabTrapH = Math.max(1, Math.floor(rect.height * crabTrapDpr));
  crabTrapCanvas.width = crabTrapW;
  crabTrapCanvas.height = crabTrapH;
}

function buildCrabTrapDecor() {
  const decor = [];
  const count = 28;
  for (let i = 0; i < count; i++) {
    decor.push({
      fx: Math.random(),
      // Keep pebbles/shells on the sand band (relative to full canvas height).
      fy: 0.6 + Math.random() * 0.38,
      r: 2 + Math.random() * 4,
      tone: Math.random() < 0.5 ? "rgba(120, 90, 52, 0.5)" : "rgba(255, 246, 224, 0.4)",
    });
  }
  return decor;
}

function startCrabTrap() {
  if (!crabTrapCanvas || !crabTrapCtx) return;
  if (!tournamentRun && getDuelTicketCount() <= 0) {
    showToast("No tickets — visit the shop", 2200);
    return;
  }
  if (!tournamentRun && !spendDuelTicket()) {
    showToast("No tickets — visit the shop", 2200);
    return;
  }
  refreshCrabTrapEventCard();
  hideAllPanels();
  if (panelCrabReward) panelCrabReward.hidden = true;
  stopEventsMusic();
  if (crabTrapStage) {
    crabTrapStage.hidden = false;
    crabTrapStage.setAttribute("aria-hidden", "false");
  }
  resizeCrabTrapCanvas();
  const now = performance.now();
  crabTrapSession = {
    score: 0,
    startAt: now,
    endAt: now + CRAB_TRAP_DURATION_MS,
    prev: now,
    lastSpawnAt: now,
    nextSpawnIn: 300,
    lastDropAt: -9999,
    cagesLeft: CRAB_TRAP_CLIP_SIZE,
    reloadUntil: 0,
    crabs: [],
    cages: [],
    sparkles: [],
    decor: buildCrabTrapDecor(),
    rafId: 0,
    running: true,
  };
  updateCrabTrapHud();
  crabTrapSession.rafId = requestAnimationFrame(crabTrapLoop);
}

function stopCrabTrapLoop() {
  if (crabTrapSession) {
    crabTrapSession.running = false;
    if (crabTrapSession.rafId) cancelAnimationFrame(crabTrapSession.rafId);
  }
}

function quitCrabTrap() {
  if (!crabTrapSession) return;
  const ok = window.confirm("Quit Crab Trap? Your ticket won't be refunded.");
  if (!ok || !crabTrapSession) return;
  stopCrabTrapLoop();
  crabTrapSession = null;
  if (crabTrapStage) {
    crabTrapStage.hidden = true;
    crabTrapStage.setAttribute("aria-hidden", "true");
  }
  returnToEventsFromCrab();
}

function finishCrabTrap() {
  const session = crabTrapSession;
  if (!session) return;
  stopCrabTrapLoop();
  crabTrapSession = null;
  const finalScore = session.score;
  if (crabTrapStage) {
    crabTrapStage.hidden = true;
    crabTrapStage.setAttribute("aria-hidden", "true");
  }
  playCrabRoundEndSound();
  if (tournamentRun) void finishTournamentRun(finalScore);
  showCrabReward(finalScore);
}

function claimPendingCrabRewardIfNeeded() {
  if (crabRewardClaimed) return;
  const bundle = crabRewardBundles.find(Boolean);
  if (!bundle) return;
  crabRewardClaimed = true;
  grantCrabReward(bundle);
}

function returnToEventsFromCrab() {
  if (crabRewardSource === "shop") {
    claimPendingCrabRewardIfNeeded();
    if (panelCrabReward) panelCrabReward.hidden = true;
    openShop();
    return;
  }
  if (panelCrabReward) panelCrabReward.hidden = true;
  openEvents();
}

function updateCrabTrapHud() {
  if (!crabTrapSession) return;
  const s = crabTrapSession;
  const now = performance.now();
  if (s.reloadUntil && now >= s.reloadUntil) {
    s.reloadUntil = 0;
    s.cagesLeft = CRAB_TRAP_CLIP_SIZE;
  }
  if (crabTrapScoreEl) crabTrapScoreEl.textContent = String(s.score);
  const left = Math.max(0, s.endAt - now);
  if (crabTrapTimeEl) {
    crabTrapTimeEl.textContent = formatTime(left);
    const stat = crabTrapTimeEl.closest(".crab-trap-stage__stat");
    if (stat) stat.classList.toggle("crab-trap-stage__stat--urgent", left <= 10_000);
  }
  if (crabTrapCagesEl) {
    if (s.reloadUntil > now) {
      crabTrapCagesEl.textContent = "…";
      crabTrapCagesEl.classList.add("crab-trap-stage__stat-value--reloading");
    } else {
      crabTrapCagesEl.textContent = String(s.cagesLeft);
      crabTrapCagesEl.classList.remove("crab-trap-stage__stat-value--reloading");
    }
  }
  if (crabTrapInstructEl) {
    crabTrapInstructEl.textContent =
      s.reloadUntil > now ? "Reloading cages…" : "Tap to drop lobster cages on the crabs!";
  }
  if (crabTrapCanvas) {
    crabTrapCanvas.classList.toggle("crab-trap-stage__canvas--reloading", s.reloadUntil > now);
  }
}

function crabTrapAddCrab() {
  const s = crabTrapSession;
  if (!s) return;
  const sc = (0.74 + Math.random() * 0.24) * crabTrapDpr;
  const fromLeft = Math.random() < 0.5;
  const bandTop = crabSandTopY() + 18 * crabTrapDpr;
  const bandBottom = crabTrapH - 28 * crabTrapDpr;
  const y = bandTop + Math.random() * Math.max(1, bandBottom - bandTop);
  // Treasure crabs bolt across the sand — really fast.
  const speed = (240 + Math.random() * 170) * crabTrapDpr;
  const margin = sc * 60;
  s.crabs.push({
    x: fromLeft ? -margin : crabTrapW + margin,
    y,
    baseY: y,
    vx: fromLeft ? speed : -speed,
    facing: fromLeft ? 1 : -1,
    sc,
    legT: Math.random() * Math.PI * 2,
    trapped: false,
  });
}

function crabTrapSpawn(now) {
  const s = crabTrapSession;
  if (!s) return;
  if (now - s.lastSpawnAt < s.nextSpawnIn) return;
  s.lastSpawnAt = now;
  const progress = Math.min(1, (now - s.startAt) / CRAB_TRAP_DURATION_MS);
  // Fewer crabs: spread the spawns further apart, one at a time.
  const base = 900 - progress * 260;
  s.nextSpawnIn = base * (0.8 + Math.random() * 0.5);
  crabTrapAddCrab();
}

function crabTrapCageLandingY(cageW) {
  // Plant cages near the canvas bottom so bottom-of-sand crabs are reachable.
  const ch = cageW * 0.72;
  return crabTrapH - ch * 0.42;
}

function crabTrapTryCatchCrabs(cage, { playSound }) {
  const s = crabTrapSession;
  if (!s) return 0;
  const half = cage.w * 0.58;
  const ch = cage.w * 0.72;
  const top = cage.y - ch * 0.55;
  const bottom = cage.y + ch * 0.55;
  let caught = 0;
  for (let i = s.crabs.length - 1; i >= 0; i--) {
    const c = s.crabs[i];
    if (c.trapped) continue;
    if (Math.abs(c.x - cage.x) > half) continue;
    // Catch crabs the cage is covering now — including near the screen bottom.
    if (c.y < top - 10 * crabTrapDpr || c.y > bottom + 18 * crabTrapDpr) continue;
    c.trapped = true;
    cage.trapped.push({
      dx: Math.max(-half * 0.7, Math.min(half * 0.7, c.x - cage.x)),
      sc: c.sc * 0.62,
      legT: c.legT,
      facing: c.facing,
    });
    s.crabs.splice(i, 1);
    s.score += 1;
    crabTrapAddSparkle(c.x, Math.min(c.y, cage.y) - cage.w * 0.15);
    caught += 1;
  }
  if (caught > 0 && playSound) playCrabTrapSound(caught);
  if (caught > 0) updateCrabTrapHud();
  return caught;
}

function crabTrapDropCage(canvasX) {
  const s = crabTrapSession;
  if (!s || !s.running) return;
  const now = performance.now();
  if (s.reloadUntil && now < s.reloadUntil) return;
  if (s.reloadUntil && now >= s.reloadUntil) {
    s.reloadUntil = 0;
    s.cagesLeft = CRAB_TRAP_CLIP_SIZE;
  }
  if (s.cagesLeft <= 0) return;
  if (now - s.lastDropAt < 90) return;
  s.lastDropAt = now;
  s.cagesLeft -= 1;
  const cageW = 72 * crabTrapDpr;
  const x = Math.max(cageW * 0.5, Math.min(crabTrapW - cageW * 0.5, canvasX));
  s.cages.push({
    x,
    y: crabTrapH * 0.03,
    vy: 0,
    w: cageW,
    landingY: crabTrapCageLandingY(cageW),
    state: "falling",
    landTimer: 0,
    alpha: 1,
    trapped: [],
    catchSoundPlayed: false,
  });
  playCrabDropSound();
  if (s.cagesLeft <= 0) {
    s.reloadUntil = now + CRAB_TRAP_RELOAD_MS;
  }
  updateCrabTrapHud();
}

function crabTrapLandCage(cage) {
  const s = crabTrapSession;
  if (!s) return;
  // On land, sweep the full column under the cage so bottom crabs still count.
  const half = cage.w * 0.58;
  let caught = 0;
  for (let i = s.crabs.length - 1; i >= 0; i--) {
    const c = s.crabs[i];
    if (c.trapped) continue;
    if (Math.abs(c.x - cage.x) > half) continue;
    c.trapped = true;
    cage.trapped.push({
      dx: Math.max(-half * 0.7, Math.min(half * 0.7, c.x - cage.x)),
      sc: c.sc * 0.62,
      legT: c.legT,
      facing: c.facing,
    });
    s.crabs.splice(i, 1);
    s.score += 1;
    crabTrapAddSparkle(c.x, cage.y - cage.w * 0.2);
    caught += 1;
  }
  const total = cage.trapped.length;
  if (total && !cage.catchSoundPlayed) {
    playCrabTrapSound(total);
    cage.catchSoundPlayed = true;
  } else if (!total) {
    playCrabThudSound();
  }
  updateCrabTrapHud();
}

function crabTrapAddSparkle(x, y) {
  const s = crabTrapSession;
  if (!s) return;
  s.sparkles.push({ x, y, vy: -46 * crabTrapDpr, life: 760, maxLife: 760 });
}

function crabTrapLoop(now) {
  const s = crabTrapSession;
  if (!s || !s.running) return;
  const dtMs = Math.min(60, now - s.prev);
  s.prev = now;
  const dtSec = dtMs / 1000;
  if (now >= s.endAt) {
    finishCrabTrap();
    return;
  }
  crabTrapSpawn(now);
  for (let i = s.crabs.length - 1; i >= 0; i--) {
    const c = s.crabs[i];
    c.x += c.vx * dtSec;
    c.legT += dtSec * 18;
    c.y = c.baseY + Math.sin(c.legT * 0.12) * 1.2 * crabTrapDpr;
    const margin = c.sc * 60;
    if (c.x < -margin || c.x > crabTrapW + margin) s.crabs.splice(i, 1);
  }
  for (let i = s.cages.length - 1; i >= 0; i--) {
    const cage = s.cages[i];
    if (cage.state === "falling") {
      cage.vy += 3800 * crabTrapDpr * dtSec;
      cage.y += cage.vy * dtSec;
      // Scoop crabs at any sand depth while the cage falls through.
      const midCaught = crabTrapTryCatchCrabs(cage, { playSound: false });
      if (midCaught > 0 && !cage.catchSoundPlayed) {
        playCrabTrapSound(midCaught);
        cage.catchSoundPlayed = true;
      }
      if (cage.y >= cage.landingY) {
        cage.y = cage.landingY;
        cage.state = "landed";
        cage.landTimer = 640;
        crabTrapLandCage(cage);
      }
    } else {
      cage.landTimer -= dtMs;
      if (cage.landTimer < 260) cage.alpha = Math.max(0, cage.landTimer / 260);
      if (cage.landTimer <= 0) s.cages.splice(i, 1);
    }
  }
  for (let i = s.sparkles.length - 1; i >= 0; i--) {
    const p = s.sparkles[i];
    p.y += p.vy * dtSec;
    p.life -= dtMs;
    if (p.life <= 0) s.sparkles.splice(i, 1);
  }
  drawCrabTrap();
  updateCrabTrapHud();
  s.rafId = requestAnimationFrame(crabTrapLoop);
}


/** Shared treasure-crab body (jackpot + crab trap). Slightly more natural shell & legs. */
function paintTreasureCrabBody(drawCtx, sc, leg) {
  const swing = (i, m) => Math.sin(leg * m + i * 1.1) * 0.22;

  drawCtx.fillStyle = "rgba(8, 12, 18, 0.32)";
  drawCtx.beginPath();
  drawCtx.ellipse(0, 28 * sc, 42 * sc, 7 * sc, 0.02, 0, Math.PI * 2);
  drawCtx.fill();

  const drawWalkingLeg = (side, idx) => {
    const bx = side * (12 + idx * 5.2) * sc;
    const by = 4 * sc + idx * 1.8 * sc;
    const s1 = swing(idx + side * 2, 1.12);
    const s2 = swing(idx + side * 2 + 0.5, 0.92);
    // Angle legs downward onto the seabed (not splayed flat).
    const a1 = (side > 0 ? 0.95 : Math.PI - 0.95) + s1 * 0.85;
    const a2 = a1 + (side > 0 ? 0.48 : -0.48) + s2 * 0.55;
    const l1 = 11 * sc;
    const l2 = 13 * sc;
    const j1x = bx + Math.cos(a1) * l1;
    const j1y = by + Math.sin(a1) * l1;
    const tipX = j1x + Math.cos(a2) * l2;
    const tipY = j1y + Math.sin(a2) * l2;
    const legGrad = drawCtx.createLinearGradient(bx, by, tipX, tipY);
    legGrad.addColorStop(0, "#b45309");
    legGrad.addColorStop(0.55, "#9a3412");
    legGrad.addColorStop(1, "#7c2d12");
    drawCtx.strokeStyle = legGrad;
    drawCtx.lineWidth = (2.6 - idx * 0.15) * sc;
    drawCtx.lineCap = "round";
    drawCtx.lineJoin = "round";
    drawCtx.beginPath();
    drawCtx.moveTo(bx, by);
    drawCtx.lineTo(j1x, j1y);
    drawCtx.lineTo(tipX, tipY);
    drawCtx.stroke();
    drawCtx.fillStyle = "#78350f";
    drawCtx.beginPath();
    drawCtx.arc(j1x, j1y, 1.6 * sc, 0, Math.PI * 2);
    drawCtx.fill();
    // Dactyl tip
    drawCtx.strokeStyle = "#451a03";
    drawCtx.lineWidth = 1.4 * sc;
    drawCtx.beginPath();
    drawCtx.moveTo(tipX, tipY);
    drawCtx.lineTo(tipX + Math.cos(a2) * 3.2 * sc, tipY + Math.sin(a2) * 3.2 * sc);
    drawCtx.stroke();
  };
  for (const side of [-1, 1]) {
    for (let i = 0; i < 4; i++) drawWalkingLeg(side, i);
  }

  // Carapace — rounded oval with lateral spines (more crab-like than blob)
  const capGrad = drawCtx.createRadialGradient(-8 * sc, -14 * sc, 2 * sc, 4 * sc, 2 * sc, 40 * sc);
  capGrad.addColorStop(0, "#fb923c");
  capGrad.addColorStop(0.28, "#ea580c");
  capGrad.addColorStop(0.62, "#c2410c");
  capGrad.addColorStop(1, "#7c2d12");
  drawCtx.fillStyle = capGrad;
  drawCtx.beginPath();
  drawCtx.moveTo(0, -22 * sc);
  drawCtx.quadraticCurveTo(12 * sc, -24 * sc, 22 * sc, -16 * sc);
  drawCtx.lineTo(28 * sc, -8 * sc); // lateral spine
  drawCtx.quadraticCurveTo(30 * sc, 2 * sc, 24 * sc, 10 * sc);
  drawCtx.quadraticCurveTo(12 * sc, 13 * sc, 0, 12 * sc);
  drawCtx.quadraticCurveTo(-12 * sc, 13 * sc, -24 * sc, 10 * sc);
  drawCtx.quadraticCurveTo(-30 * sc, 2 * sc, -28 * sc, -8 * sc);
  drawCtx.lineTo(-22 * sc, -16 * sc);
  drawCtx.quadraticCurveTo(-12 * sc, -24 * sc, 0, -22 * sc);
  drawCtx.closePath();
  drawCtx.fill();
  drawCtx.strokeStyle = "#5c1a0a";
  drawCtx.lineWidth = 1.4 * sc;
  drawCtx.stroke();

  // Shell ridges / grooves
  drawCtx.strokeStyle = "rgba(69, 26, 3, 0.45)";
  drawCtx.lineWidth = 1.05 * sc;
  drawCtx.beginPath();
  drawCtx.moveTo(-16 * sc, -6 * sc);
  drawCtx.quadraticCurveTo(0, -2 * sc, 16 * sc, -6 * sc);
  drawCtx.moveTo(-14 * sc, 2 * sc);
  drawCtx.quadraticCurveTo(0, 5 * sc, 14 * sc, 2 * sc);
  drawCtx.stroke();

  // Pale underside lip
  drawCtx.fillStyle = "rgba(253, 230, 138, 0.35)";
  drawCtx.beginPath();
  drawCtx.ellipse(0, 6 * sc, 16 * sc, 4.5 * sc, 0, 0, Math.PI * 2);
  drawCtx.fill();

  // Eye stalks with sockets
  const eyeStalk = (ex) => {
    drawCtx.strokeStyle = "#9a3412";
    drawCtx.lineWidth = 2.4 * sc;
    drawCtx.lineCap = "round";
    drawCtx.beginPath();
    drawCtx.moveTo(ex * 0.4, -16 * sc);
    drawCtx.quadraticCurveTo(ex * 0.85, -20 * sc, ex, -24 * sc);
    drawCtx.stroke();
    drawCtx.fillStyle = "#7c2d12";
    drawCtx.beginPath();
    drawCtx.arc(ex, -24.5 * sc, 3.4 * sc, 0, Math.PI * 2);
    drawCtx.fill();
    drawCtx.fillStyle = "#0f172a";
    drawCtx.beginPath();
    drawCtx.arc(ex, -24.5 * sc, 2.3 * sc, 0, Math.PI * 2);
    drawCtx.fill();
    drawCtx.fillStyle = "rgba(255, 255, 255, 0.9)";
    drawCtx.beginPath();
    drawCtx.arc(ex - 0.7 * sc, -25 * sc, 0.85 * sc, 0, Math.PI * 2);
    drawCtx.fill();
  };
  eyeStalk(-8 * sc);
  eyeStalk(8 * sc);
}

// Matches the "treasure crab" from the main fishing game: a red crab with
// jointed legs and eye stalks, hoisting a gold treasure chest overhead.
function drawCrabTrapCrab(ctx, x, y, sc, legT, facing) {
  const face = facing >= 0 ? 1 : -1;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(face, 1);
  paintTreasureCrabBody(ctx, sc, legT);
  drawCrabTrapChest(ctx, sc);
  drawCrabTrapCrabArms(ctx, sc);
  ctx.restore();
}

// Closed treasure chest carried on the crab's back (ported from the main game).
function drawCrabTrapChest(ctx, sc) {
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
  ctx.fillStyle = "#451a03";
  ctx.beginPath();
  ctx.arc(chestCx, y0 + ch * 0.42, 3.2 * sc, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255, 250, 220, 0.9)";
  ctx.beginPath();
  ctx.arc(chestCx - 0.9 * sc, y0 + ch * 0.4, 1 * sc, 0, Math.PI * 2);
  ctx.fill();

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

  ctx.strokeStyle = "rgba(120, 53, 15, 0.55)";
  ctx.lineWidth = 1.1 * sc;
  ctx.beginPath();
  ctx.moveTo(x0 + 4 * sc, y0 + lidH + 2 * sc);
  ctx.lineTo(x0 + cw - 4 * sc, y0 + lidH + 2 * sc);
  ctx.stroke();

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
}

// Raised claw-arms hoisting the chest (ported from the main game).
function drawCrabTrapCrabArms(ctx, sc) {
  const chestTop = -56 * sc;
  const ch = 26 * sc;
  const cw = 40 * sc;
  const gripY = chestTop + ch * 0.72;
  const gripLX = -cw * 0.5;
  const gripRX = cw * 0.5;

  const drawRaisedArm = (side) => {
    const sx = side;
    const shx = sx * 18 * sc;
    const shy = -6 * sc;
    const midX = sx * 36 * sc;
    const midY = -40 * sc;
    const gx = sx > 0 ? gripRX : gripLX;
    const gy = gripY;
    ctx.strokeStyle = "#c2410c";
    ctx.lineWidth = 5.2 * sc;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(shx, shy);
    ctx.quadraticCurveTo(midX, midY, gx, gy);
    ctx.stroke();
    ctx.strokeStyle = "#7c2d12";
    ctx.lineWidth = 2.8 * sc;
    ctx.beginPath();
    ctx.moveTo(shx, shy);
    ctx.quadraticCurveTo(midX, midY, gx, gy);
    ctx.stroke();

    const ang = Math.atan2(gy - midY, gx - midX);
    const cx = gx + Math.cos(ang + sx * 0.5) * 5 * sc;
    const cy = gy + Math.sin(ang + sx * 0.5) * 5 * sc;
    ctx.fillStyle = "#ea580c";
    ctx.beginPath();
    ctx.ellipse(cx, cy, 9 * sc, 6.5 * sc, ang, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fb923c";
    ctx.beginPath();
    ctx.ellipse(cx + Math.cos(ang + sx * 0.9) * 4 * sc, cy + Math.sin(ang + sx * 0.9) * 4 * sc, 5 * sc, 3.8 * sc, ang + sx * 0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#7c2d12";
    ctx.lineWidth = 0.95 * sc;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 9 * sc, 6.5 * sc, ang, 0, Math.PI * 2);
    ctx.stroke();
  };

  drawRaisedArm(-1);
  drawRaisedArm(1);
}

function drawCrabTrapCage(ctx, cage) {
  const cw = cage.w;
  const ch = cage.w * 0.72;
  const cx = cage.x;
  const cy = cage.y;
  ctx.save();
  ctx.globalAlpha = cage.alpha;
  // rope while falling
  if (cage.state === "falling") {
    ctx.strokeStyle = "rgba(230, 210, 170, 0.6)";
    ctx.lineWidth = 2 * crabTrapDpr;
    ctx.beginPath();
    ctx.moveTo(cx, 0);
    ctx.lineTo(cx, cy - ch * 0.5);
    ctx.stroke();
  }
  const left = cx - cw * 0.5;
  const top = cy - ch * 0.5;
  // trapped crabs inside
  for (const t of cage.trapped) {
    drawCrabTrapCrab(ctx, cx + t.dx, cy + ch * 0.34, t.sc, t.legT, t.facing);
  }
  // cage interior tint
  ctx.fillStyle = "rgba(40, 60, 78, 0.18)";
  crabRoundRect(ctx, left, top, cw, ch, 8 * crabTrapDpr);
  ctx.fill();
  // wire bars
  ctx.strokeStyle = "rgba(214, 226, 236, 0.75)";
  ctx.lineWidth = 1.3 * crabTrapDpr;
  for (let i = 1; i < 5; i++) {
    const gx = left + (cw * i) / 5;
    ctx.beginPath();
    ctx.moveTo(gx, top + 3 * crabTrapDpr);
    ctx.lineTo(gx, top + ch - 3 * crabTrapDpr);
    ctx.stroke();
  }
  for (let i = 1; i < 3; i++) {
    const gy = top + (ch * i) / 3;
    ctx.beginPath();
    ctx.moveTo(left + 3 * crabTrapDpr, gy);
    ctx.lineTo(left + cw - 3 * crabTrapDpr, gy);
    ctx.stroke();
  }
  // wooden frame
  ctx.strokeStyle = "#6b4423";
  ctx.lineWidth = 4 * crabTrapDpr;
  crabRoundRect(ctx, left, top, cw, ch, 8 * crabTrapDpr);
  ctx.stroke();
  ctx.strokeStyle = "#3f2814";
  ctx.lineWidth = 2 * crabTrapDpr;
  crabRoundRect(ctx, left, top, cw, ch, 8 * crabTrapDpr);
  ctx.stroke();
  ctx.restore();
}

function crabRoundRect(ctx, x, y, w2, h2, r) {
  const rr = Math.min(r, w2 * 0.5, h2 * 0.5);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w2, y, x + w2, y + h2, rr);
  ctx.arcTo(x + w2, y + h2, x, y + h2, rr);
  ctx.arcTo(x, y + h2, x, y, rr);
  ctx.arcTo(x, y, x + w2, y, rr);
  ctx.closePath();
}

function drawCrabTrap() {
  const ctx = crabTrapCtx;
  const s = crabTrapSession;
  if (!ctx || !s) return;
  ctx.clearRect(0, 0, crabTrapW, crabTrapH);
  const sandTop = crabSandTopY();
  // water
  const wg = ctx.createLinearGradient(0, 0, 0, sandTop);
  wg.addColorStop(0, "#0a2038");
  wg.addColorStop(0.55, "#0f5064");
  wg.addColorStop(1, "#1c7f88");
  ctx.fillStyle = wg;
  ctx.fillRect(0, 0, crabTrapW, sandTop + 2);
  // sun shimmer near surface
  const glow = ctx.createRadialGradient(crabTrapW * 0.5, 0, 0, crabTrapW * 0.5, 0, crabTrapH * 0.5);
  glow.addColorStop(0, "rgba(255, 220, 150, 0.28)");
  glow.addColorStop(1, "rgba(255, 220, 150, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, crabTrapW, sandTop);
  // light rays
  ctx.save();
  ctx.globalAlpha = 0.08;
  ctx.fillStyle = "#fff7dc";
  for (let i = 0; i < 4; i++) {
    const rx = crabTrapW * (0.2 + i * 0.2);
    ctx.beginPath();
    ctx.moveTo(rx, 0);
    ctx.lineTo(rx + crabTrapW * 0.06, 0);
    ctx.lineTo(rx + crabTrapW * 0.14, sandTop);
    ctx.lineTo(rx - crabTrapW * 0.02, sandTop);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
  // sand — solid full-width fill to the bottom edge of the canvas
  const sandH = crabTrapH - sandTop;
  const sg = ctx.createLinearGradient(0, sandTop, 0, crabTrapH);
  sg.addColorStop(0, "#e8c684");
  sg.addColorStop(0.35, "#d4a85e");
  sg.addColorStop(1, "#a87a3e");
  ctx.fillStyle = sg;
  ctx.fillRect(0, sandTop, crabTrapW, sandH);
  // wavy shoreline rim across the full width
  ctx.fillStyle = "#c99a4e";
  ctx.beginPath();
  ctx.moveTo(0, sandTop);
  const step = Math.max(12, crabTrapW / 40);
  for (let x = 0; x <= crabTrapW + step; x += step) {
    ctx.lineTo(x, sandTop + Math.sin((x / crabTrapW) * Math.PI * 5) * 5 * crabTrapDpr);
  }
  ctx.lineTo(crabTrapW, sandTop - 2 * crabTrapDpr);
  ctx.lineTo(0, sandTop - 2 * crabTrapDpr);
  ctx.closePath();
  ctx.fill();
  // darker wet sand stripe at the waterline
  ctx.fillStyle = "rgba(140, 100, 50, 0.28)";
  ctx.fillRect(0, sandTop, crabTrapW, 10 * crabTrapDpr);
  // pebbles/shells
  for (const d of s.decor) {
    const dy = Math.max(sandTop + 8 * crabTrapDpr, d.fy * crabTrapH);
    ctx.fillStyle = d.tone;
    ctx.beginPath();
    ctx.arc(d.fx * crabTrapW, dy, d.r * crabTrapDpr, 0, Math.PI * 2);
    ctx.fill();
  }
  // crabs
  for (const c of s.crabs) {
    drawCrabTrapCrab(ctx, c.x, c.y, c.sc, c.legT, c.facing);
  }
  // cages
  for (const cage of s.cages) {
    drawCrabTrapCage(ctx, cage);
  }
  // sparkles (+1)
  ctx.font = `800 ${Math.round(16 * crabTrapDpr)}px "Bebas Neue", sans-serif`;
  ctx.textAlign = "center";
  for (const p of s.sparkles) {
    const a = Math.max(0, p.life / p.maxLife);
    ctx.globalAlpha = a;
    ctx.fillStyle = "#ffe27a";
    ctx.fillText("+1", p.x, p.y);
  }
  ctx.globalAlpha = 1;
  ctx.textAlign = "start";
}

/* --- Crab Trap rewards --- */
function crabTierForScore(scorePts) {
  if (scorePts < CRAB_TRAP_CHEST_MIN) return null;
  if (scorePts >= CRAB_TRAP_GREAT_MIN) return "legendary";
  if (scorePts >= CRAB_TRAP_MEDIUM_MIN) return "rare";
  return "common";
}

function crabTierMessage(tier) {
  if (!tier) {
    return `Need at least ${CRAB_TRAP_CHEST_MIN} crabs for a chest — keep trapping!`;
  }
  tier = normalizeChestTier(tier);
  if (tier === "legendary") {
    return `Incredible haul (${CRAB_TRAP_GREAT_MIN}+)! Legendary chests can hold special rods, gems, and rich loot.`;
  }
  if (tier === "rare") {
    return `Nice work (${CRAB_TRAP_MEDIUM_MIN}+)! Rare chests may hide a special rod — trap ${CRAB_TRAP_GREAT_MIN}+ for legendary loot.`;
  }
  return `A modest catch (around ${CRAB_TRAP_LOW_SCORE}) — common chests with ${CHEST_GEMS_COMMON} gems, and a slim chance at a special rod.`;
}

function crabPurchasableRods() {
  return RODS.filter((r) => r.id !== FREE_ROD_ID && r.id !== MAGNET_ROD_ID && !r.chestOnly);
}

function chestExclusiveRods() {
  return RODS.filter((r) => r.chestOnly);
}

/** Rods eligible to drop from a chest of this tier (unowned chest exclusives first). */
function rollChestRodDrop(tier) {
  tier = normalizeChestTier(tier);
  const exclusives = crabShuffle(
    chestExclusiveRods().filter((r) => {
      if (isRodOwned(r.id)) return false;
      const need = r.chestTier || "rare";
      if (tier === "legendary") return true;
      if (tier === "rare") return need === "common" || need === "rare";
      return need === "common";
    }),
  );
  if (tier === "legendary") {
    if (exclusives.length) return exclusives[0];
    const shop = crabShuffle(crabUnownedRods());
    return shop[0] || null;
  }
  if (tier === "rare") {
    if (!exclusives.length) return null;
    return Math.random() < 0.48 ? exclusives[0] : null;
  }
  if (!exclusives.length) return null;
  return Math.random() < 0.14 ? exclusives[0] : null;
}

function crabUnownedRods() {
  return crabPurchasableRods().filter((r) => !isRodOwned(r.id));
}

function rollChestBait(tier) {
  tier = normalizeChestTier(tier);
  if (tier === "common") {
    if (Math.random() < 0.14) {
      return { id: KRAKEN_SPRAY_BAIT_ID, name: baitSpecById(KRAKEN_SPRAY_BAIT_ID).name, qty: 1 };
    }
    return null;
  }
  const pool = tier === "legendary" ? CRAB_TRAP_GREAT_BAIT : CRAB_TRAP_MED_BAIT;
  const id = crabPick(pool);
  const spec = baitSpecById(id);
  const qty =
    id === KRAKEN_SPRAY_BAIT_ID
      ? tier === "legendary"
        ? crabRandInt(1, 2)
        : 1
      : tier === "legendary"
        ? crabRandInt(3, 6)
        : crabRandInt(2, 4);
  return { id, name: spec.name, qty };
}

function rollCrabBundles(tier) {
  const bundles = [];
  for (let i = 0; i < 3; i++) {
    bundles.push({ coins: 0, bait: null, rodId: null, rodName: null, special: null });
  }
  tier = normalizeChestTier(tier);
  if (tier === "common") {
    bundles.forEach((b) => {
      b.coins = crabRandInt(25, 75);
      b.bait = rollChestBait("common");
      b.special = rollSpecialChestPrize("common");
    });
    const drop = rollChestRodDrop("common");
    if (drop) {
      const ci = crabRandInt(0, 2);
      bundles[ci].rodId = drop.id;
      bundles[ci].rodName = `${drop.name} (special)`;
    }
  } else if (tier === "rare") {
    bundles.forEach((b) => {
      b.coins = crabRandInt(120, 280);
      b.bait = rollChestBait("rare");
      b.special = rollSpecialChestPrize("rare");
    });
    const drop = rollChestRodDrop("rare");
    if (drop) {
      const ci = crabRandInt(0, 2);
      bundles[ci].rodId = drop.id;
      bundles[ci].rodName = `${drop.name} (special)`;
    }
  } else {
    bundles.forEach((b) => {
      b.coins = crabRandInt(400, 850);
      b.bait = rollChestBait("legendary");
      b.special = rollSpecialChestPrize("legendary");
    });
    const exclusive = crabShuffle(
      chestExclusiveRods().filter((r) => !isRodOwned(r.id)),
    );
    const shop = crabShuffle(crabUnownedRods());
    const pool = [];
    const seen = new Set();
    for (const rod of [...exclusive, ...shop]) {
      if (seen.has(rod.id)) continue;
      seen.add(rod.id);
      pool.push(rod);
    }
    if (pool.length > 0) {
      const rodChestCount = Math.min(pool.length, crabRandInt(1, 2));
      const chestIdx = crabShuffle([0, 1, 2]).slice(0, rodChestCount);
      chestIdx.forEach((ci, k) => {
        const rod = pool[k];
        if (!rod) return;
        bundles[ci].rodId = rod.id;
        bundles[ci].rodName = rod.chestOnly ? `${rod.name} (special)` : rod.name;
      });
    } else {
      bundles.forEach((b) => {
        b.coins += 300;
      });
    }
  }
  const gems = chestGemsForTier(tier);
  bundles.forEach((b) => {
    b.gems = gems;
  });
  return bundles;
}

function specialPrizeLabel(special) {
  if (!special) return "";
  if (special.kind === "catch_stamp") {
    if (special.speciesName) return `Catch stamp: ${special.speciesName}`;
    if (special.consolCoins) return `+${special.consolCoins} coins (stamps complete)`;
    return "Catch stamp";
  }
  const def = CHEST_ITEM_DEFS[special.kind];
  if (!def) return "Bonus prize";
  const qty = special.qty > 1 ? ` ×${special.qty}` : "";
  return `${def.icon} ${def.name}${qty}`;
}

function crabBundleRewardLines(bundle) {
  const lines = [];
  if (bundle.coins) lines.push(`+${bundle.coins} coins`);
  if (bundle.gems) lines.push(`+${bundle.gems} gems`);
  if (bundle.bait) lines.push(`${bundle.bait.qty}× ${bundle.bait.name}`);
  if (bundle.rodName) lines.push(`${bundle.rodName}`);
  const specialLine = specialPrizeLabel(bundle.special);
  if (specialLine) lines.push(specialLine);
  if (!lines.length) lines.push("A pinch of sand");
  return lines;
}

function chestLootItems(bundle, extras = []) {
  const items = [];
  if (bundle?.coins) {
    items.push({
      kind: "coins",
      qty: `+${bundle.coins}`,
      label: `${bundle.coins} coins`,
      art: `<span class="shop-coin shop-coin--lg"></span>`,
    });
  }
  if (bundle?.gems) {
    items.push({
      kind: "gems",
      qty: `+${bundle.gems}`,
      label: `${bundle.gems} gems`,
      art: `<span class="shop-gem shop-gem--lg"></span>`,
    });
  }
  if (bundle?.bait) {
    items.push({
      kind: "bait",
      qty: `×${bundle.bait.qty}`,
      label: `${bundle.bait.qty}× ${bundle.bait.name}`,
      art: baitBucketSvg(bundle.bait.id),
    });
  }
  if (bundle?.rodId) {
    const rod = RODS.find((r) => r.id === bundle.rodId);
    items.push({
      kind: "rod",
      qty: "",
      label: bundle.rodName || rod?.name || "Rod",
      art: rod ? rodArtSvg(rod) : "🎣",
    });
  }
  const sp = bundle?.special;
  if (sp) {
    if (sp.kind === "catch_stamp") {
      const spec = FISH_SPECIES.find((s) => s.id === sp.speciesId);
      const colors = Array.isArray(spec?.colors) ? spec.colors : ["#38bdf8", "#0369a1"];
      items.push({
        kind: "stamp",
        qty: "",
        label: sp.speciesName ? `${sp.speciesName} stamp` : "Catch stamp",
        art: `<span class="chest-loot__stamp" style="background:linear-gradient(135deg,${colors[0]},${colors[1] || colors[0]})"></span>`,
      });
    } else if (sp.consolCoins) {
      items.push({
        kind: "coins",
        qty: `+${sp.consolCoins}`,
        label: `${sp.consolCoins} coins`,
        art: `<span class="shop-coin shop-coin--lg"></span>`,
      });
    } else if (CHEST_ITEM_DEFS[sp.kind]) {
      const def = CHEST_ITEM_DEFS[sp.kind];
      items.push({
        kind: "item",
        qty: sp.qty > 1 ? `×${sp.qty}` : "",
        label: def.name,
        art: `<span class="chest-loot__emoji">${def.icon}</span>`,
      });
    }
  }
  return items.concat(extras);
}

function chestLootPipHtml(item, index) {
  const qty = item.qty
    ? `<span class="chest-loot__qty">${item.qty}</span>`
    : "";
  return (
    `<li class="chest-loot__pip chest-loot__pip--${item.kind}" style="--i:${index}" title="${item.label}">` +
    `<span class="chest-loot__art">${item.art}</span>` +
    qty +
    `</li>`
  );
}

function fillChestLoot(list, bundle, extras = []) {
  if (!list) return;
  const items = chestLootItems(bundle, extras);
  list.className = "chest-loot";
  list.innerHTML = items.map((item, i) => chestLootPipHtml(item, i)).join("");
  list.setAttribute("aria-label", items.map((x) => x.label).join(", ") || "Rewards");
}

function prefersChestMotion() {
  return !(typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}

function resetChestOpenUi() {
  panelCrabReward?.classList.remove("panel--chest-opening");
}

let crabChestSvgSeq = 0;

function crabChestDiamondSvg(cx, cy, s, outline) {
  const t = cy - s * 0.72;
  const b = cy + s * 0.9;
  const l = cx - s * 0.62;
  const r = cx + s * 0.62;
  const g = cy - s * 0.08;
  return (
    `<g>` +
    `<polygon points="${l} ${g} ${cx} ${t} ${r} ${g} ${cx} ${b}" fill="${outline || "#2e1065"}"/>` +
    `<polygon points="${l} ${g} ${cx} ${t} ${cx} ${g}" fill="#a5f3fc"/>` +
    `<polygon points="${cx} ${t} ${r} ${g} ${cx} ${g}" fill="#c4b5fd"/>` +
    `<polygon points="${l} ${g} ${cx} ${g} ${cx} ${b}" fill="#22d3ee"/>` +
    `<polygon points="${r} ${g} ${cx} ${g} ${cx} ${b}" fill="#7c3aed"/>` +
    `<polygon points="${cx - s * 0.22} ${t + s * 0.08} ${cx + s * 0.08} ${t + s * 0.08} ${cx - s * 0.04} ${g - s * 0.18}" fill="#fff"/>` +
    `</g>`
  );
}

/** Three distinct chests: battered iron crate, silver pirate trunk, ornate gold reliquary. */
function crabChestArtSvg(tier, opened) {
  const uid = `cc${crabChestSvgSeq++}`;
  tier = normalizeChestTier(tier);
  const isLegendary = tier === "legendary";
  const isRare = tier === "rare";
  const p = isLegendary
    ? {
        woodHi: "#b45309",
        plank: "#92400e",
        woodLo: "#431407",
        metalHi: "#fde68a",
        metalLo: "#d97706",
        stud: "#78350f",
        rim: "#fbbf24",
      }
    : isRare
      ? {
          woodHi: "#9a3412",
          plank: "#7c2d12",
          woodLo: "#431407",
          metalHi: "#f1f5f9",
          metalLo: "#64748b",
          stud: "#334155",
          rim: "#cbd5e1",
        }
      : {
          woodHi: "#8b7355",
          plank: "#6b5340",
          woodLo: "#3f2e22",
          metalHi: "#9ca3af",
          metalLo: "#4b5563",
          stud: "#1f2937",
          rim: "#6b7280",
        };
  const defs =
    `<defs>` +
    `<linearGradient id="${uid}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.woodHi}"/><stop offset="1" stop-color="${p.woodLo}"/></linearGradient>` +
    `<linearGradient id="${uid}l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.woodHi}"/><stop offset="0.5" stop-color="${p.plank}"/><stop offset="1" stop-color="${p.woodLo}"/></linearGradient>` +
    `<linearGradient id="${uid}m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${p.metalHi}"/><stop offset="1" stop-color="${p.metalLo}"/></linearGradient>` +
    `<linearGradient id="${uid}brass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fde68a"/><stop offset="1" stop-color="#b45309"/></linearGradient>` +
    `<radialGradient id="${uid}g" cx="0.5" cy="0.45" r="0.55"><stop offset="0" stop-color="#fff6c8"/><stop offset="0.45" stop-color="#ffd34d" stop-opacity="0.92"/><stop offset="1" stop-color="#ffd34d" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="${uid}aura" cx="0.5" cy="0.45" r="0.6"><stop offset="0" stop-color="#fde68a" stop-opacity="0.55"/><stop offset="1" stop-color="#f59e0b" stop-opacity="0"/></radialGradient>` +
    `</defs>`;
  const strap = (sx, y0, y1, halfW = 3.2) =>
    `<rect x="${sx - halfW}" y="${y0}" width="${halfW * 2}" height="${y1 - y0}" rx="1.4" fill="url(#${uid}m)" stroke="${p.stud}" stroke-width="0.55"/>` +
    `<circle cx="${sx}" cy="${y0 + 2.6}" r="1.05" fill="${p.stud}"/>` +
    `<circle cx="${sx}" cy="${(y0 + y1) / 2}" r="0.9" fill="${p.stud}"/>` +
    `<circle cx="${sx}" cy="${y1 - 2.6}" r="1.05" fill="${p.stud}"/>`;
  const coin = (cx, cy, r) =>
    `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#ffd94d" stroke="#c8901f" stroke-width="0.55"/>` +
    `<circle cx="${cx - r * 0.3}" cy="${cy - r * 0.3}" r="${r * 0.32}" fill="#fff2b0"/>`;
  const corner = (x, y, flipX, flipY) =>
    `<path d="M${x} ${y} h${8 * flipX} v${2.2 * flipY} h${-5.8 * flipX} v${5.8 * flipY} h${-2.2 * flipX} z" fill="url(#${uid}m)" stroke="${p.stud}" stroke-width="0.45"/>`;
  const wrap = (inner) =>
    `<svg viewBox="0 0 80 72" width="72" height="64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${defs}${inner}</svg>`;

  const shadow = `<ellipse cx="40" cy="67" rx="${isLegendary ? 30 : 27}" ry="3.2" fill="rgba(0,0,0,0.3)"/>`;
  const lootGlow = opened
    ? `<ellipse cx="40" cy="${opened ? 34 : 32}" rx="${isLegendary ? 30 : 24}" ry="${isLegendary ? 14 : 11}" fill="url(#${uid}g)"/>`
    : "";

  if (isLegendary) {
    const lid = opened
      ? `<g transform="rotate(-18 40 24) translate(0 -14)">
          <path d="M8 32 C8 12 22 5 40 5 C58 5 72 12 72 32 Z" fill="url(#${uid}l)" stroke="${p.woodLo}" stroke-width="1.1"/>
          <path d="M14 22 C22 14 58 14 66 22" stroke="#fbbf24" stroke-width="1.1" fill="none" opacity="0.7"/>
          <path d="M18 16 C28 10 52 10 62 16" stroke="#fde68a" stroke-width="0.8" fill="none" opacity="0.55"/>
          <rect x="7" y="28" width="66" height="5" fill="url(#${uid}m)" stroke="${p.stud}" stroke-width="0.45"/>
          ${strap(22, 8, 33, 3.6)}${strap(40, 7, 33, 2.4)}${strap(58, 8, 33, 3.6)}
          ${crabChestDiamondSvg(40, 16, 5.2)}
        </g>`
      : `<path d="M8 32 C8 12 22 5 40 5 C58 5 72 12 72 32 Z" fill="url(#${uid}l)" stroke="${p.woodLo}" stroke-width="1.1"/>
        <path d="M14 22 C22 14 58 14 66 22" stroke="#fbbf24" stroke-width="1.15" fill="none" opacity="0.75"/>
        <path d="M18 16 C28 10 52 10 62 16" stroke="#fde68a" stroke-width="0.85" fill="none" opacity="0.55"/>
        <rect x="7" y="28.5" width="66" height="5" fill="url(#${uid}m)" stroke="${p.stud}" stroke-width="0.45"/>`;
    const lock = opened
      ? ""
      : `<rect x="33" y="34" width="14" height="16" rx="2.4" fill="url(#${uid}brass)" stroke="#78350f" stroke-width="0.7"/>
        <rect x="35" y="36" width="10" height="7" rx="1.2" fill="#fef3c7" opacity="0.55"/>
        <circle cx="40" cy="40" r="2.4" fill="#ef4444" stroke="#7f1d1d" stroke-width="0.55"/>
        <rect x="39.1" y="41.6" width="1.8" height="5.2" fill="#78350f"/>
        <path d="M36 34 L40 30 L44 34" fill="#fbbf24" stroke="#78350f" stroke-width="0.5"/>`;
    const coins = opened
      ? [[18, 32, 3.4], [26, 28.5, 4.4], [35, 26.5, 5], [45, 26.8, 4.8], [54, 29, 4.2], [62, 33, 3.5], [22, 37, 3.6], [31, 35, 4], [40, 34, 4.4], [49, 35.5, 3.8], [58, 38, 3.2], [28, 41, 3], [44, 41.5, 3.1]].map((c) => coin(c[0], c[1], c[2])).join("")
      : "";
    const spark = opened
      ? ""
      : `<path d="M12 12 l1.2 3.2 3.2 1.2 -3.2 1.2 -1.2 3.2 -1.2 -3.2 -3.2 -1.2 3.2 -1.2 z" fill="#fef9c3" opacity="0.9"/>
        <path d="M70 14 l0.9 2.4 2.4 0.9 -2.4 0.9 -0.9 2.4 -0.9 -2.4 -2.4 -0.9 2.4 -0.9 z" fill="#fde68a" opacity="0.85"/>
        <path d="M66 48 l0.8 2 2 0.8 -2 0.8 -0.8 2 -0.8 -2 -2 -0.8 2 -0.8 z" fill="#fff7ed" opacity="0.7"/>`;
    return wrap(
      `${!opened ? `<ellipse cx="40" cy="36" rx="36" ry="30" fill="url(#${uid}aura)"/>` : ""}` +
        shadow +
        lid +
        lootGlow +
        `<path d="M9 32 L71 32 L71 58 Q71 63 65 63 L15 63 Q9 63 9 58 Z" fill="url(#${uid}w)" stroke="${p.woodLo}" stroke-width="1.1"/>` +
        `<path d="M11 46 L69 46" stroke="${p.plank}" stroke-width="1" opacity="0.4"/>` +
        `<rect x="8" y="30.5" width="64" height="5.2" fill="url(#${uid}m)" stroke="${p.stud}" stroke-width="0.45"/>` +
        (opened
          ? strap(22, 34, 63, 3.6) + strap(40, 34, 63, 2.4) + strap(58, 34, 63, 3.6)
          : strap(22, 8, 63, 3.6) + strap(40, 7, 63, 2.4) + strap(58, 8, 63, 3.6)) +
        corner(11, 34, 1, 1) +
        corner(69, 34, -1, 1) +
        corner(11, 61, 1, -1) +
        corner(69, 61, -1, -1) +
        `<ellipse cx="16" cy="62.5" rx="4" ry="1.6" fill="url(#${uid}brass)"/><ellipse cx="64" cy="62.5" rx="4" ry="1.6" fill="url(#${uid}brass)"/>` +
        lock +
        coins +
        (opened
          ? crabChestDiamondSvg(40, 30, 6.4)
          : crabChestDiamondSvg(28, 18, 4.4) +
            crabChestDiamondSvg(40, 14.5, 5.4) +
            crabChestDiamondSvg(52, 18, 4.4) +
            `<circle cx="18" cy="24" r="1.6" fill="#ef4444" stroke="#7f1d1d" stroke-width="0.4"/>` +
            `<circle cx="62" cy="24" r="1.6" fill="#22c55e" stroke="#14532d" stroke-width="0.4"/>`) +
        spark,
    );
  }

  if (isRare) {
    const lid = opened
      ? `<g transform="rotate(-15 40 26) translate(0 -12)">
          <path d="M8 32 C8 14 22 8 40 8 C58 8 72 14 72 32 Z" fill="url(#${uid}l)" stroke="${p.woodLo}" stroke-width="1"/>
          <path d="M13 22 C22 16 58 16 67 22" stroke="${p.rim}" stroke-width="1.05" fill="none" opacity="0.7"/>
          <rect x="7" y="28.5" width="66" height="4.6" fill="url(#${uid}m)" stroke="${p.stud}" stroke-width="0.45"/>
          ${strap(22, 10, 33)}${strap(58, 10, 33)}
        </g>`
      : `<path d="M8 32 C8 14 22 8 40 8 C58 8 72 14 72 32 Z" fill="url(#${uid}l)" stroke="${p.woodLo}" stroke-width="1"/>
        <path d="M13 22 C22 16 58 16 67 22" stroke="${p.rim}" stroke-width="1.1" fill="none" opacity="0.75"/>
        <path d="M16 17 C26 12 54 12 64 17" stroke="${p.plank}" stroke-width="0.7" fill="none" opacity="0.45"/>
        <rect x="7" y="29" width="66" height="4.6" fill="url(#${uid}m)" stroke="${p.stud}" stroke-width="0.45"/>`;
    const lock = opened
      ? ""
      : `<rect x="33.5" y="35" width="13" height="15" rx="2" fill="url(#${uid}brass)" stroke="#78350f" stroke-width="0.6"/>
        <circle cx="40" cy="41" r="2.3" fill="#67e8f9" stroke="#0e7490" stroke-width="0.5"/>
        <circle cx="39.3" cy="40.3" r="0.7" fill="#fff" opacity="0.8"/>
        <rect x="39.2" y="42.4" width="1.6" height="4.6" fill="#78350f"/>`;
    const coins = opened
      ? [[24, 32, 3.8], [33, 29.5, 4.4], [43, 29.8, 4.3], [52, 33, 3.7], [30, 37, 3.4], [41, 37.5, 3.5], [47, 41, 3]].map((c) => coin(c[0], c[1], c[2])).join("")
      : "";
    return wrap(
      shadow +
        lid +
        lootGlow +
        `<path d="M10 32 L70 32 L70 57 Q70 62 64 62 L16 62 Q10 62 10 57 Z" fill="url(#${uid}w)" stroke="${p.woodLo}" stroke-width="1"/>` +
        `<path d="M12 44 L68 44" stroke="${p.plank}" stroke-width="1" opacity="0.42"/>` +
        `<path d="M12 52 L68 52" stroke="${p.plank}" stroke-width="0.8" opacity="0.32"/>` +
        `<rect x="8.5" y="30.8" width="63" height="4.6" fill="url(#${uid}m)" stroke="${p.stud}" stroke-width="0.45"/>` +
        (opened ? strap(22, 34, 62) + strap(58, 34, 62) : strap(22, 10, 62) + strap(58, 10, 62)) +
        corner(12, 35, 1, 1) +
        corner(68, 35, -1, 1) +
        lock +
        coins +
        (opened ? `<circle cx="40" cy="31" r="3.2" fill="#67e8f9" stroke="#0e7490" stroke-width="0.5"/><circle cx="39.2" cy="30.2" r="0.9" fill="#fff" opacity="0.85"/>` : ""),
    );
  }

  const lid = opened
    ? `<g transform="rotate(-12 40 28) translate(0 -10)">
        <path d="M12 32 L16 18 L64 18 L68 32 Z" fill="url(#${uid}l)" stroke="${p.woodLo}" stroke-width="1"/>
        <path d="M20 22 H60" stroke="${p.plank}" stroke-width="0.9" opacity="0.45"/>
        <rect x="11" y="29" width="58" height="4.2" fill="url(#${uid}m)" stroke="${p.stud}" stroke-width="0.45"/>
        ${strap(24, 18, 33, 2.8)}${strap(56, 18, 33, 2.8)}
      </g>`
    : `<path d="M12 32 L16 18 L64 18 L68 32 Z" fill="url(#${uid}l)" stroke="${p.woodLo}" stroke-width="1"/>
      <path d="M20 22 H60" stroke="${p.plank}" stroke-width="0.9" opacity="0.5"/>
      <path d="M22 26 H58" stroke="${p.plank}" stroke-width="0.7" opacity="0.35"/>
      <rect x="11" y="29.2" width="58" height="4.2" fill="url(#${uid}m)" stroke="${p.stud}" stroke-width="0.45"/>`;
  const lock = opened
    ? ""
    : `<rect x="34" y="36" width="12" height="13" rx="1.4" fill="url(#${uid}m)" stroke="${p.stud}" stroke-width="0.6"/>
      <circle cx="40" cy="41.2" r="2" fill="#111827"/>
      <rect x="39.2" y="42.4" width="1.6" height="4.2" fill="#111827"/>
      <rect x="48" y="40" width="7" height="5" rx="0.6" fill="#57534e" stroke="#1c1917" stroke-width="0.4" opacity="0.85"/>`;
  const coins = opened
    ? [[32, 34, 3.4], [40, 32.5, 3.8], [48, 35, 3.2]].map((c) => coin(c[0], c[1], c[2])).join("")
    : "";
  return wrap(
    shadow +
      lid +
      lootGlow +
      `<path d="M11 32 L69 32 L67 58 Q67 62 62 62 L18 62 Q13 62 13 58 Z" fill="url(#${uid}w)" stroke="${p.woodLo}" stroke-width="1"/>` +
      `<path d="M14 42 L66 43" stroke="${p.plank}" stroke-width="1" opacity="0.45"/>` +
      `<path d="M15 51 L65 50.5" stroke="${p.plank}" stroke-width="0.85" opacity="0.35"/>` +
      `<rect x="10" y="31" width="60" height="4.2" fill="url(#${uid}m)" stroke="${p.stud}" stroke-width="0.45"/>` +
      (opened ? strap(24, 34, 61, 2.8) + strap(56, 34, 61, 2.8) : strap(24, 18, 61, 2.8) + strap(56, 18, 61, 2.8)) +
      `<path d="M14 54 h8 v6 h-8 z" fill="#57534e" opacity="0.55"/>` +
      `<path d="M8 36 Q6 40 10 48" fill="none" stroke="#a16207" stroke-width="1.6" stroke-linecap="round"/>` +
      `<path d="M10 48 Q14 50 18 47" fill="none" stroke="#b45309" stroke-width="1.5" stroke-linecap="round"/>` +
      lock +
      coins,
  );
}

function renderCrabRewardChests(tier, count = 3) {
  if (!crabRewardChests) return;
  crabRewardChests.innerHTML = "";
  tier = normalizeChestTier(tier);
  const n = Math.max(1, Math.min(3, count || 3));
  const tierLabel = tier === "legendary" ? "Legendary" : tier === "rare" ? "Rare" : "Common";
  for (let i = 0; i < n; i++) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `crab-chest crab-chest--${tier}${n === 1 ? " crab-chest--shop-solo" : ""}`;
    btn.dataset.idx = String(i);
    btn.innerHTML =
      `<span class="crab-chest__art">${crabChestArtSvg(tier, false)}</span>` +
      `<span class="crab-chest__label">${tierLabel} chest</span>` +
      `<ul class="chest-loot" hidden></ul>`;
    crabRewardChests.appendChild(btn);
  }
}

function grantCrabReward(bundle) {
  if (!bundle) return;
  if (bundle.coins) gameMeta.coins += bundle.coins;
  if (bundle.gems) addGems(bundle.gems);
  if (bundle.bait) {
    gameMeta.baitCounts[bundle.bait.id] = getBaitCount(bundle.bait.id) + bundle.bait.qty;
  }
  if (bundle.rodId && !isRodOwned(bundle.rodId)) {
    if (!Array.isArray(gameMeta.ownedRodIds)) gameMeta.ownedRodIds = [FREE_ROD_ID];
    gameMeta.ownedRodIds.push(bundle.rodId);
  }
  if (bundle.special) {
    const sp = bundle.special;
    if (sp.kind === "catch_stamp") {
      if (sp.speciesId && !hasCatchStamp(sp.speciesId)) {
        if (!Array.isArray(gameMeta.catchStamps)) gameMeta.catchStamps = [];
        gameMeta.catchStamps.push(sp.speciesId);
      } else if (sp.consolCoins) {
        gameMeta.coins += sp.consolCoins;
      }
    } else if (CHEST_ITEM_DEFS[sp.kind]) {
      addChestItem(sp.kind, sp.qty || 1);
    }
  }
  saveMeta();
  refreshCoinDisplays();
  buildBaitUI();
  buildRodUI();
  buildShopUI();
  refreshCollectablesUI();
}

function revealOpenedChest(chest, bundle, tier) {
  chest.classList.remove("crab-chest--shaking");
  chest.classList.add("crab-chest--opened", "crab-chest--burst");
  if (!chest.querySelector(".crab-chest__burst")) {
    const burst = document.createElement("span");
    burst.className = "crab-chest__burst";
    burst.setAttribute("aria-hidden", "true");
    chest.prepend(burst);
  }
  const art = chest.querySelector(".crab-chest__art");
  if (art) art.innerHTML = crabChestArtSvg(tier, true);
  const list = chest.querySelector(".chest-loot");
  if (list) {
    list.hidden = false;
    fillChestLoot(list, bundle);
  }
}

function onCrabChestPick(idx) {
  if (crabRewardClaimed) return;
  const bundle = crabRewardBundles[idx];
  if (!bundle) return;
  crabRewardClaimed = true;
  grantCrabReward(bundle);
  playCrabChestSound();
  if (crabRewardSource === "dailyCatch") {
    const ch = ensureDailyCatchChallenge();
    if (ch) {
      ch.claimed = true;
      gameMeta.dailyCatch = ch;
      saveMeta();
    }
  }
  panelCrabReward?.classList.add("panel--chest-opening");
  const chests = crabRewardChests ? crabRewardChests.querySelectorAll(".crab-chest") : [];
  chests.forEach((chest) => {
    const ci = Number(chest.dataset.idx);
    chest.disabled = true;
    if (ci === idx) {
      chest.classList.add("crab-chest--hero", "crab-chest--shaking");
      const openTier = chest.classList.contains("crab-chest--legendary")
        ? "legendary"
        : chest.classList.contains("crab-chest--rare")
          ? "rare"
          : "common";
      if (prefersChestMotion()) {
        window.setTimeout(() => revealOpenedChest(chest, bundle, openTier), 420);
      } else {
        revealOpenedChest(chest, bundle, openTier);
      }
    } else {
      chest.classList.add("crab-chest--dimmed");
    }
  });
  if (crabRewardResult) {
    crabRewardResult.hidden = true;
    crabRewardResult.textContent = "";
  }
  revealCrabRewardActions();
}

function revealCrabRewardActions() {
  const tickets = getDuelTicketCount();
  if (!btnCrabPlayAgain) return;
  if (crabRewardSource === "dailyCatch" || crabRewardSource === "shop") {
    btnCrabPlayAgain.hidden = true;
    return;
  }
  btnCrabPlayAgain.hidden = false;
  btnCrabPlayAgain.disabled = tickets <= 0;
  const againLabel =
    crabRewardSource === "roulette"
      ? "Spin again (1 ticket)"
      : crabRewardSource === "coop"
        ? "Haul again (1 ticket)"
        : crabRewardSource === "survivor"
          ? "Survive again (1 ticket)"
          : "Play again (1 ticket)";
  btnCrabPlayAgain.textContent = tickets > 0 ? againLabel : "No tickets left";
}

function showCrabReward(finalScore) {
  crabRewardSource = "crab";
  resetChestOpenUi();
  const tier = crabTierForScore(finalScore);
  const noChest = !tier;
  crabRewardBundles = noChest ? [] : rollCrabBundles(tier);
  crabRewardClaimed = noChest;
  if (crabRewardHeadline) crabRewardHeadline.textContent = "Crab Trap!";
  if (crabRewardSummary) {
    crabRewardSummary.innerHTML = `You trapped <strong>${finalScore}</strong> treasure crab${finalScore === 1 ? "" : "s"}`;
  }
  if (crabRewardTier) {
    crabRewardTier.hidden = false;
    crabRewardTier.textContent = crabTierMessage(tier);
  }
  if (crabRewardPrompt) {
    crabRewardPrompt.textContent = noChest
      ? "Trap more crabs next time to unlock a chest."
      : "Choose one chest to claim your reward.";
  }
  if (crabRewardResult) {
    crabRewardResult.hidden = true;
    crabRewardResult.textContent = "";
  }
  if (btnCrabPlayAgain) btnCrabPlayAgain.hidden = true;
  setCrabRewardBackLabel("Back to Events");
  if (noChest) {
    if (crabRewardChests) crabRewardChests.innerHTML = "";
    revealCrabRewardActions();
  } else {
    renderCrabRewardChests(tier);
  }
  if (panelCrabReward) panelCrabReward.hidden = false;
}

function crabPlayAgain() {
  if (getDuelTicketCount() <= 0) {
    showToast("No tickets — visit the shop", 2000);
    return;
  }
  if (panelCrabReward) panelCrabReward.hidden = true;
  if (crabRewardSource === "roulette") {
    beginEventMinigame("roulette");
    return;
  }
  if (crabRewardSource === "coop") {
    beginEventMinigame("coop");
    return;
  }
  if (crabRewardSource === "survivor") {
    beginEventMinigame("survivor");
    return;
  }
  startCrabTrap();
}

function refreshCrabTrapEventCard() {
  const tickets = getDuelTicketCount();
  if (eventsTicketCount) eventsTicketCount.textContent = String(tickets);
  if (crabEventTickets) crabEventTickets.textContent = `Tickets: ${tickets}`;
  if (btnStartCrab) {
    btnStartCrab.disabled = tickets <= 0;
    btnStartCrab.textContent = tickets <= 0 ? "No tickets — visit shop" : "Play Crab Trap";
  }
  refreshEventMinigameCards();
}

/* --- Crab Trap sound effects --- */
function playCrabDropSound() {
  const ac = ensureMusicContext();
  if (!ac || !musicMaster) return;
  if (ac.state === "suspended") ac.resume();
  const now = ac.currentTime + 0.01;
  playMusicNote(340, now, 0.14, 0.03, "sine");
  playMusicNote(180, now + 0.05, 0.18, 0.03, "triangle");
}

function playCrabTrapSound(count = 1) {
  const ac = ensureMusicContext();
  if (!ac || !musicMaster) return;
  if (ac.state === "suspended") ac.resume();
  const now = ac.currentTime + 0.01;
  const notes = count > 1 ? [523.25, 659.25, 783.99, 1046.5] : [523.25, 783.99];
  for (let i = 0; i < notes.length; i++) {
    playMusicNote(notes[i], now + i * 0.06, 0.2, 0.032, i % 2 === 0 ? "triangle" : "sine");
  }
  playNoiseHit(now, 0.08, 0.014);
}

function playCrabThudSound() {
  const ac = ensureMusicContext();
  if (!ac || !musicMaster) return;
  if (ac.state === "suspended") ac.resume();
  playNoiseHit(ac.currentTime + 0.01, 0.1, 0.016);
}

function playCrabRoundEndSound() {
  const ac = ensureMusicContext();
  if (!ac || !musicMaster) return;
  if (ac.state === "suspended") ac.resume();
  const now = ac.currentTime + 0.02;
  const notes = [523.25, 659.25, 783.99, 1046.5];
  for (let i = 0; i < notes.length; i++) {
    playMusicNote(notes[i], now + i * 0.1, 0.4, 0.036, i % 2 === 0 ? "triangle" : "sine");
  }
}

function playCrabChestSound() {
  const ac = ensureMusicContext();
  if (!ac || !musicMaster) return;
  if (ac.state === "suspended") ac.resume();
  const now = ac.currentTime + 0.02;
  playMusicNote(392, now, 0.3, 0.034, "triangle");
  playMusicNote(587.33, now + 0.12, 0.34, 0.034, "sine");
  playMusicNote(880, now + 0.26, 0.5, 0.03, "triangle");
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
  const badge = reef.difficulty ? ` · ${reef.difficulty}` : "";
  reefMapCaption.textContent = `${reef.name}${badge} — ${reef.mapPlace}`;
}

function showSelectedReefOnMap() {
  showReefOnMap(getReef());
}

function selectReefFromMap(reefId) {
  selectedReefId = reefId;
  invalidateBackgroundCache();
  updateStartButtonSubtext();
  showSelectedReefOnMap();
  if (reefMapPins) {
    reefMapPins.querySelectorAll(".reef-map__pin").forEach((el) => {
      const on = el.dataset.reefId === reefId;
      el.classList.toggle("reef-map__pin--selected", on);
      el.setAttribute("aria-selected", on ? "true" : "false");
    });
  }
}

function buildReefUI() {
  const pinHost = reefMapPins || reefChoices;
  if (!pinHost) return;
  pinHost.innerHTML = "";
  for (const reef of REEFS) {
    const badgeSlug = reef.difficulty.toLowerCase().replace(/\s+/g, "-");
    const b = document.createElement("button");
    b.type = "button";
    b.setAttribute("role", "option");
    b.dataset.reefId = reef.id;
    b.className =
      `reef-map__pin reef-map__pin--diff-${badgeSlug}` +
      (reef.id === selectedReefId ? " reef-map__pin--selected" : "");
    b.setAttribute("aria-selected", reef.id === selectedReefId ? "true" : "false");
    b.setAttribute("aria-label", `${reef.name}, ${reef.difficulty}`);
    b.title = `${reef.name} — ${reef.mapPlace}`;
    const p = reef.mapPin || { x: MAP_CHART_W / 2, y: MAP_CHART_H / 2 };
    b.style.left = `${(p.x / MAP_CHART_W) * 100}%`;
    b.style.top = `${(p.y / MAP_CHART_H) * 100}%`;
    b.innerHTML = `<span class="reef-map__pin-dot" aria-hidden="true"></span>`;
    b.addEventListener("click", () => selectReefFromMap(reef.id));
    b.addEventListener("pointerenter", () => showReefOnMap(reef));
    b.addEventListener("pointerleave", () => showSelectedReefOnMap());
    b.addEventListener("focus", () => showReefOnMap(reef));
    b.addEventListener("blur", () => showSelectedReefOnMap());
    pinHost.appendChild(b);
  }
  updateStartButtonSubtext();
  showSelectedReefOnMap();
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
  if (isDuelActive()) {
    const n = Math.min(3, Math.max(2, Math.floor(reef.maxFish * 0.28)));
    if (isDuelSoloView()) {
      for (let i = 0; i < n; i++) spawnFish();
    } else {
      for (let i = 0; i < n; i++) spawnFishInDuelHalf("player");
    }
    return;
  }
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
  if (isDuelActive() && !isDuelSoloView()) {
    spawnFishInDuelHalf("player");
    return;
  }
  const spec = pickSpecies();
  const big = BIG_CRITTER_MORPHS.has(spec.morph);
  const len =
    SIZE[spec.size].length *
    dpr *
    (spec.morph === "manta" ? 1.55 : spec.morph === "seal" ? 1.78 : big ? 1.4 : 1);
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
    homeY: y,
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
  deferDailyPrizeCelebration();
  setStartMoreOptionsOpen(false);
  if (mapSeagullMode === "howto") {
    markIntroSeen();
    hideMapSeagullGuide();
  } else if (mapSeagullMode === "shop") {
    markSeagullShopHintSeen();
    hideMapSeagullGuide();
  } else {
    hideMapSeagullGuide();
  }
  normalizeSelectedRod();
  stopHomeMusic();
  stopEventsMusic();
  syncMusicMasterGain();
  startHomeWaves();
  normalizeSelectedBaitId();
  const chosen = baitSpecById(gameMeta.selectedBaitId);
  let roundKrakenSpray = false;
  if (chosen.consumesOnRound) {
    const left = getBaitCount(chosen.id);
    if (left > 0) {
      gameMeta.baitCounts[chosen.id] = left - 1;
      saveMeta();
      roundKrakenSpray = Boolean(chosen.repelsKraken);
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

  roundOverrideReefId = null;
  const boostNotes = [];
  if (!adventureSession && !duelSession && !eventMinigameSession && gameMeta.pendingMysteryReef) {
    gameMeta.pendingMysteryReef = false;
    const pick = REEFS[Math.floor(Math.random() * REEFS.length)] || REEFS[0];
    roundOverrideReefId = pick.id;
    boostNotes.push(`Mystery Reef: ${pick.name}`);
  }
  if (gameMeta.pendingLuckyLure) {
    gameMeta.pendingLuckyLure = false;
    roundBait = {
      catchRadiusMult: roundBait.catchRadiusMult * 1.18,
      rareAssistAdd: Math.min(0.42, roundBait.rareAssistAdd + 0.2),
      lightRadiusMult: (roundBait.lightRadiusMult || 1) * 1.1,
    };
    boostNotes.push("Lucky Lure");
  }
  if (boostNotes.length) {
    saveMeta();
    refreshCollectablesUI();
    showToast(boostNotes.join(" · "), 2400);
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
  const isSurvivor = eventMinigameSession?.kind === "survivor";
  if (isSurvivor) {
    // Kraken Survivor ignores spray — the beast keeps coming.
    scheduleSurvivorKraken(roundStart);
  } else if (roundKrakenSpray) {
    clearKrakens();
    showToast("Kraken spray — no kraken this round!", 2400);
  } else {
    setSingleKraken({ state: "scheduled", spawnAt: roundStart + reef.roundMs * spawnFrac });
  }
  const dur = reef.roundMs;
  if (isSurvivor) {
    jackpotCrab = null;
  } else {
    const u0 = roundStart + dur * (0.06 + Math.random() * 0.14);
    const u1 = roundStart + dur * (0.32 + Math.random() * 0.16);
    const u2 = roundStart + dur * (0.58 + Math.random() * 0.14);
    const spawnTimes = [u0, u1, u2].sort((a, b) => a - b);
    jackpotCrab = { spawnTimes, active: null };
  }
  lastJackpotCrabCatchAt = -999999;
  if (eventMinigameSession?.kind === "coop") {
    syncCoopHud(true);
  } else if (duelHud) {
    duelHud.hidden = true;
    duelHud.classList.remove("duel-hud--coop");
  }
  panelStart.hidden = true;
  panelOver.hidden = true;
  if (panelAdventure) panelAdventure.hidden = true;
  if (panelAdventurePrep) panelAdventurePrep.hidden = true;
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
  if (eventMinigameSession?.kind === "survivor") {
    controlHint.textContent = survivorAllowsKrakenPack()
      ? "Fish for bonus pts · dodge the swarm · hook a kraken to finish"
      : "Fish for bonus pts · hook the kraken to finish";
  } else if (eventMinigameSession?.kind === "roulette") {
    controlHint.textContent = `Reef Roulette · ${reef.name} · rack up pts for a better chest`;
  } else if (eventMinigameSession?.kind === "coop") {
    const partnerName = getCoopPartnerDisplayName();
    controlHint.textContent = `Co-op Haul · you + ${partnerName} combine scores for the chest`;
  } else {
    controlHint.textContent = isTouchControlsPreferred()
      ? `Drag left/right to aim · tap to cast the line${passHint}`
      : `Move left/right to aim · Enter casts the line · Space or lift = snag${passHint}`;
  }
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
  stopClimaxMusic();
  syncUrgentTimerUi(99999);
  stopReefMusic();
  clearKrakens();
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
  if (duelSession) {
    endDuelRound();
    return;
  }
  if (eventMinigameSession) {
    endEventMinigameRound();
    return;
  }
  if (hasSeenIntro() && !hasSeenSeagullShopHint()) {
    setPendingSeagullShopHint();
  }
  panelOver.hidden = false;
  syncAdventureLaunchVisibility();
  finalScore.textContent = String(score);
  lastRoundScore = score;
  lastRoundReefId = roundOverrideReefId || selectedReefId;
  lastRoundCoinsEarned = coinsAwardedForScore(score);
  if (gameMeta.pendingDoubleHaul && lastRoundCoinsEarned > 0) {
    lastRoundCoinsEarned *= 2;
    gameMeta.pendingDoubleHaul = false;
    showToast("Double Haul — coins ×2!", 2200);
  }
  roundOverrideReefId = null;
  const coinsBeforeRoundAward = gameMeta.coins;
  if (lastRoundCoinsEarned > 0) {
    gameMeta.coins += lastRoundCoinsEarned;
    saveMeta();
  }
  roundBait = { catchRadiusMult: 1, rareAssistAdd: 0, lightRadiusMult: 1 };
  refreshCollectablesUI();
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
  if (initialsInput) {
    initialsInput.value = canSave ? (gameMeta.playerName || gameMeta.playerInitials || "") : "";
  }
  if (dailyInitialsPanel) dailyInitialsPanel.hidden = score <= 0;
  if (dailyInitialsInput) {
    dailyInitialsInput.value = gameMeta.playerName || gameMeta.playerInitials || "";
  }
  updateDailyGameOverStatus(score);
  if (canSave && initialsInput) {
    requestAnimationFrame(() => {
      initialsInput.focus();
    });
  } else if (score > 0 && dailyInitialsInput) {
    requestAnimationFrame(() => {
      dailyInitialsInput.focus();
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
  void fetchTodayDailyLeaderboard().then(() => {
    if (gameMeta.playerInitials && score > 0) {
      return submitDailyScore(gameMeta.playerInitials, score, selectedReefId, gameMeta.playerName).then((submitted) => {
        updateDailyGameOverStatus(score, submitted);
      });
    }
  });
}

function hookTipY() {
  return hook.tipY;
}

function spawnCoinBurstFX(worldX, worldY, count = 36) {
  const n = Math.max(12, Math.floor(count * (PERF_CHROMEBOOK ? 0.55 : 1)));
  for (let i = 0; i < n; i++) {
    const ang = (Math.PI * 2 * i) / n + (Math.random() - 0.5) * 0.55;
    const sp = (2.4 + Math.random() * 5.2) * dpr;
    celebration.particles.push({
      x: worldX,
      y: worldY,
      vx: Math.cos(ang) * sp,
      vy: Math.sin(ang) * sp - 2.2 * dpr,
      life: 1.15 + Math.random() * 0.55,
      size: (3.2 + Math.random() * 5.5) * dpr,
      spin: (Math.random() - 0.5) * 0.28,
      color: i % 3 === 0 ? "hsla(48, 96%, 58%, 1)" : i % 3 === 1 ? "hsla(38, 92%, 52%, 1)" : "hsla(45, 100%, 72%, 1)",
    });
  }
  celebration.rings.push({ x: worldX, y: worldY, t: 0, life: 1.2 });
}

function spawnDuelWinCoinAnimation() {
  const cx = w * 0.5 || 200;
  const cy = h * 0.42 || 180;
  spawnCoinBurstFX(cx, cy, 48);
  window.setTimeout(() => spawnCoinBurstFX(cx, cy - dpr * 24, 28), 180);
  window.setTimeout(() => spawnCoinBurstFX(cx + dpr * 40, cy + dpr * 10, 18), 320);
  window.setTimeout(() => spawnCoinBurstFX(cx - dpr * 40, cy + dpr * 10, 18), 360);
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
    noteDailyCatchFromSpec(f.spec);
  }

  scoreDisplay.textContent = String(score);
  if (isDuelActive()) updateDuelHudScores();
  if (eventMinigameSession?.kind === "coop") {
    syncCoopHud(true);
    scheduleCoopScoreSync();
  }

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
  if (isDuelActive()) updateDuelHudScores();
  catchLog.push({ label: PEARL_CATCH_LABEL, pts: PEARL_POINTS });
  showToast(`JACKPOT! +${PEARL_POINTS} Pearl`, 2000);
}

function jackpotCrabBaseY() {
  // Visual seabed matches clam/coral bases near the canvas bottom (not the sand-gradient start).
  const sc = dpr * 1.05;
  const floorY = h - dpr * 24;
  // Legs + dactyl tips reach ~28*sc below body origin in paintTreasureCrabBody.
  const footBelowOrigin = 28 * sc;
  return floorY - footBelowOrigin;
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
  if (isDuelActive()) updateDuelHudScores();
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
  return playing && krakens.some((k) => k.state === "biting");
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

function catchNetLayout(boatCx = w * 0.5) {
  // Keep-net / hanging fish bag (not a round butterfly landing net).
  const rimRx = 64 * dpr; // half-width of float frame
  const rimRy = 7 * dpr; // float-pipe thickness
  const sackHx = 58 * dpr;
  const sackVy = 78 * dpr;
  let rimCx;
  if (isDuelActive() && !isDuelSoloView()) {
    rimCx = duelHalfW() - 62 * dpr;
  } else {
    rimCx = w - 62 * dpr;
  }
  const rimCy = waterTop + 8 * dpr;
  const sackCx = rimCx;
  const sackCy = rimCy + sackVy * 0.52;
  return { boatCx, rimCx, rimCy, rimRx, rimRy, sackCx, sackCy, sackHx, sackVy };
}

function catchNetBagOutline(lay) {
  const { rimCx, rimCy, rimRx, rimRy, sackCx, sackCy, sackHx, sackVy } = lay;
  const topY = rimCy + rimRy * 0.2;
  const left = rimCx - rimRx;
  const right = rimCx + rimRx;
  const bagLeft = sackCx - sackHx * 0.9;
  const bagRight = sackCx + sackHx * 0.9;
  const botY = sackCy + sackVy * 0.68;
  ctx.beginPath();
  ctx.moveTo(left, topY);
  ctx.lineTo(bagLeft + dpr * 3, botY - dpr * 10);
  ctx.quadraticCurveTo(sackCx - sackHx * 0.35, botY + dpr * 8, sackCx, botY + dpr * 12);
  ctx.quadraticCurveTo(sackCx + sackHx * 0.35, botY + dpr * 8, bagRight - dpr * 3, botY - dpr * 10);
  ctx.lineTo(right, topY);
  ctx.closePath();
}

function drawCatchNetMeshFill(lay) {
  const { rimCx, rimCy, rimRx, rimRy, sackCx, sackCy, sackHx, sackVy } = lay;
  const topY = rimCy + rimRy * 0.2;
  const botY = sackCy + sackVy * 0.68;
  const t = performance.now() * 0.0011;
  ctx.save();
  catchNetBagOutline(lay);
  ctx.clip();

  // Soft underwater bag body
  const body = ctx.createLinearGradient(sackCx, topY, sackCx, botY);
  body.addColorStop(0, "rgba(12, 28, 42, 0.12)");
  body.addColorStop(0.45, "rgba(8, 22, 36, 0.32)");
  body.addColorStop(1, "rgba(4, 14, 24, 0.48)");
  ctx.fillStyle = body;
  ctx.fillRect(sackCx - sackHx, topY - dpr, sackHx * 2, botY - topY + dpr * 20);

  // Diamond commercial mesh
  ctx.strokeStyle = "rgba(196, 210, 222, 0.38)";
  ctx.lineWidth = 1.05 * dpr;
  const step = dpr * 11;
  for (let yy = topY - step * 2; yy < botY + step * 2; yy += step) {
    const wave = Math.sin(yy * 0.04 + t) * dpr * 2.2;
    for (let xx = sackCx - sackHx - step; xx < sackCx + sackHx + step; xx += step) {
      const cx = xx + wave;
      const cy = yy;
      ctx.beginPath();
      ctx.moveTo(cx, cy - step * 0.48);
      ctx.lineTo(cx + step * 0.48, cy);
      ctx.lineTo(cx, cy + step * 0.48);
      ctx.lineTo(cx - step * 0.48, cy);
      ctx.closePath();
      ctx.stroke();
    }
  }

  // Vertical panel seams
  ctx.strokeStyle = "rgba(160, 176, 190, 0.28)";
  ctx.lineWidth = 1.35 * dpr;
  for (const u of [-0.55, 0, 0.55]) {
    const x0 = rimCx + rimRx * u;
    const x1 = sackCx + sackHx * 0.82 * u;
    ctx.beginPath();
    ctx.moveTo(x0, topY);
    ctx.quadraticCurveTo((x0 + x1) * 0.5 + dpr * 2, (topY + botY) * 0.5, x1, botY - dpr * 6);
    ctx.stroke();
  }
  ctx.restore();
}

function drawCatchNetStructure(lay, boatCx) {
  const { rimCx, rimCy, rimRx, rimRy, sackCx, sackCy, sackHx, sackVy } = lay;
  const g = getCharterBoatGeo(boatCx);
  const ropeAx = g.cx + g.L * 0.34;
  const ropeAy = g.deckY(ropeAx) - dpr * 6;
  const left = rimCx - rimRx;
  const right = rimCx + rimRx;
  const topY = rimCy;

  ctx.save();

  // Twin bridle lines from boat rail to float frame corners
  ctx.strokeStyle = "rgba(72, 58, 42, 0.92)";
  ctx.lineWidth = 2.2 * dpr;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(ropeAx, ropeAy);
  ctx.quadraticCurveTo((ropeAx + left) * 0.55 + dpr * 8, (ropeAy + topY) * 0.45, left + dpr * 4, topY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(ropeAx + dpr * 6, ropeAy);
  ctx.quadraticCurveTo((ropeAx + right) * 0.55 + dpr * 14, (ropeAy + topY) * 0.42, right - dpr * 4, topY);
  ctx.stroke();

  drawCatchNetMeshFill(lay);

  // Float-pipe frame (PVC / cork rail) — rectangular opening
  const pipeH = Math.max(rimRy * 1.6, dpr * 9);
  const frameGrad = ctx.createLinearGradient(left, topY - pipeH, left, topY + pipeH * 0.4);
  frameGrad.addColorStop(0, "#f3e7c8");
  frameGrad.addColorStop(0.45, "#d6b56a");
  frameGrad.addColorStop(1, "#9a7340");
  ctx.fillStyle = frameGrad;
  ctx.strokeStyle = "rgba(70, 48, 24, 0.7)";
  ctx.lineWidth = 1.4 * dpr;
  const rr = dpr * 5;
  ctx.beginPath();
  ctx.moveTo(left + rr, topY - pipeH * 0.55);
  ctx.lineTo(right - rr, topY - pipeH * 0.55);
  ctx.quadraticCurveTo(right, topY - pipeH * 0.55, right, topY - pipeH * 0.15);
  ctx.lineTo(right, topY + pipeH * 0.35);
  ctx.quadraticCurveTo(right, topY + pipeH * 0.55, right - rr, topY + pipeH * 0.55);
  ctx.lineTo(left + rr, topY + pipeH * 0.55);
  ctx.quadraticCurveTo(left, topY + pipeH * 0.55, left, topY + pipeH * 0.35);
  ctx.lineTo(left, topY - pipeH * 0.15);
  ctx.quadraticCurveTo(left, topY - pipeH * 0.55, left + rr, topY - pipeH * 0.55);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Cork floats along the frame
  const floatN = 5;
  for (let i = 0; i < floatN; i++) {
    const u = (i + 0.5) / floatN;
    const fx = left + (right - left) * u;
    const fy = topY - pipeH * 0.05;
    const fg = ctx.createRadialGradient(fx - dpr, fy - dpr, dpr * 0.5, fx, fy, dpr * 5.5);
    fg.addColorStop(0, "#ffe9b0");
    fg.addColorStop(0.55, "#e2b35a");
    fg.addColorStop(1, "#a87432");
    ctx.fillStyle = fg;
    ctx.beginPath();
    ctx.ellipse(fx, fy, dpr * 5.2, dpr * 4.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(90, 55, 22, 0.45)";
    ctx.lineWidth = 0.9 * dpr;
    ctx.stroke();
  }

  // Bag outline + leadline along the bottom
  ctx.strokeStyle = "rgba(170, 186, 200, 0.55)";
  ctx.lineWidth = 1.6 * dpr;
  catchNetBagOutline(lay);
  ctx.stroke();

  const botY = sackCy + sackVy * 0.68;
  ctx.strokeStyle = "rgba(40, 44, 50, 0.78)";
  ctx.lineWidth = 2.4 * dpr;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(sackCx - sackHx * 0.78, botY - dpr * 4);
  ctx.quadraticCurveTo(sackCx, botY + dpr * 14, sackCx + sackHx * 0.78, botY - dpr * 4);
  ctx.stroke();
  for (const u of [-0.55, -0.18, 0.18, 0.55]) {
    const wx = sackCx + sackHx * 0.7 * u;
    const wy = botY + dpr * (6 - Math.abs(u) * 4);
    ctx.fillStyle = "rgba(55, 58, 64, 0.9)";
    ctx.beginPath();
    ctx.ellipse(wx, wy, dpr * 2.4, dpr * 3.2, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
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

function getCharterBoatGeo(centerX = w * 0.5) {
  const cx = centerX;
  const wt = waterTop;
  const scale = isDuelActive() ? 0.58 : 1;
  const L = Math.min(w * 0.32, 260 * dpr) * scale;
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

/** Classic pirate galleon with Jolly Roger — used in Adventure Mode. */
function drawPirateBoatInWater(centerX = w * 0.5) {
  const { cx, wt, L, bowX, sternX, deckY } = getCharterBoatGeo(centerX);
  const belowD = 52 * dpr;
  const midX = cx + L * 0.06;
  const mastX = cx - L * 0.08;
  const deckMid = deckY(midX);

  ctx.save();

  // Hull shadow in water
  ctx.fillStyle = "rgba(20, 12, 8, 0.55)";
  ctx.beginPath();
  ctx.moveTo(bowX, wt);
  ctx.lineTo(bowX - dpr * 4, wt + belowD * 0.2);
  ctx.quadraticCurveTo(bowX + L * 0.15, wt + belowD * 0.95, cx, wt + belowD * 1.05);
  ctx.quadraticCurveTo(sternX - L * 0.12, wt + belowD * 0.88, sternX + dpr * 3, wt + belowD * 0.2);
  ctx.lineTo(sternX, wt);
  ctx.closePath();
  ctx.fill();

  // Wooden hull
  const hullGrad = ctx.createLinearGradient(bowX, wt - 80 * dpr, sternX, wt + dpr * 6);
  hullGrad.addColorStop(0, "#8b5a2b");
  hullGrad.addColorStop(0.35, "#6b4423");
  hullGrad.addColorStop(0.7, "#4a2f16");
  hullGrad.addColorStop(1, "#2e1c0e");
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

  // Plank lines
  ctx.strokeStyle = "rgba(30, 18, 8, 0.35)";
  ctx.lineWidth = Math.max(1, dpr);
  for (let i = 1; i <= 3; i++) {
    const yOff = wt - dpr * (10 + i * 10);
    ctx.beginPath();
    ctx.moveTo(bowX + dpr * 8, Math.min(deckY(bowX + dpr * 8), yOff));
    ctx.lineTo(sternX - dpr * 8, Math.min(deckY(sternX - dpr * 8), yOff));
    ctx.stroke();
  }

  // Waterline rail
  ctx.strokeStyle = "rgba(255, 220, 160, 0.28)";
  ctx.lineWidth = 1.6 * dpr;
  ctx.beginPath();
  ctx.moveTo(bowX, wt);
  ctx.quadraticCurveTo(cx, wt - dpr * 1.5, sternX, wt);
  ctx.stroke();

  // Sterncastle
  const scL = cx + L * 0.18;
  const scR = sternX - dpr * 6;
  const scB = deckY(scL) + dpr * 4;
  const scT = scB - dpr * 28;
  ctx.fillStyle = "#5a3a1c";
  ctx.strokeStyle = "rgba(20, 12, 6, 0.55)";
  ctx.lineWidth = 1.3 * dpr;
  ctx.beginPath();
  ctx.moveTo(scL, scB);
  ctx.lineTo(scL + dpr * 4, scT);
  ctx.lineTo(scR - dpr * 2, scT);
  ctx.lineTo(scR, scB);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "rgba(10, 8, 6, 0.55)";
  ctx.fillRect(scL + dpr * 8, scT + dpr * 8, scR - scL - dpr * 14, dpr * 8);

  // Forecastle
  const fcR = cx - L * 0.22;
  const fcL = bowX + dpr * 10;
  const fcB = deckY(fcR) + dpr * 2;
  const fcT = fcB - dpr * 18;
  ctx.fillStyle = "#6a4420";
  ctx.beginPath();
  ctx.moveTo(fcL, fcB);
  ctx.lineTo(fcL + dpr * 6, fcT);
  ctx.lineTo(fcR, fcT + dpr * 4);
  ctx.lineTo(fcR + dpr * 4, fcB);
  ctx.closePath();
  ctx.fill();

  // Main mast + yards
  const mastTop = deckMid - dpr * 92;
  ctx.strokeStyle = "#2a1a0c";
  ctx.lineWidth = 3.2 * dpr;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(mastX, deckMid + dpr * 4);
  ctx.lineTo(mastX, mastTop);
  ctx.stroke();
  ctx.lineWidth = 2 * dpr;
  ctx.beginPath();
  ctx.moveTo(mastX - dpr * 28, deckMid - dpr * 52);
  ctx.lineTo(mastX + dpr * 28, deckMid - dpr * 52);
  ctx.moveTo(mastX - dpr * 22, deckMid - dpr * 28);
  ctx.lineTo(mastX + dpr * 22, deckMid - dpr * 28);
  ctx.stroke();

  // Square sails (aged canvas)
  const sailGrad = ctx.createLinearGradient(mastX, mastTop, mastX + dpr * 40, deckMid);
  sailGrad.addColorStop(0, "#f0e2c0");
  sailGrad.addColorStop(0.55, "#e0cc98");
  sailGrad.addColorStop(1, "#c8ae70");
  ctx.fillStyle = sailGrad;
  ctx.beginPath();
  ctx.moveTo(mastX + dpr * 2, deckMid - dpr * 86);
  ctx.quadraticCurveTo(mastX + dpr * 36, deckMid - dpr * 70, mastX + dpr * 30, deckMid - dpr * 52);
  ctx.lineTo(mastX + dpr * 2, deckMid - dpr * 52);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(mastX - dpr * 2, deckMid - dpr * 50);
  ctx.quadraticCurveTo(mastX - dpr * 30, deckMid - dpr * 40, mastX - dpr * 24, deckMid - dpr * 28);
  ctx.lineTo(mastX - dpr * 2, deckMid - dpr * 28);
  ctx.closePath();
  ctx.fill();

  // Jolly Roger flag
  const flagX = mastX;
  const flagY = mastTop - dpr * 2;
  ctx.fillStyle = "#0e0e10";
  ctx.beginPath();
  ctx.moveTo(flagX, flagY);
  ctx.lineTo(flagX + dpr * 28, flagY + dpr * 6);
  ctx.lineTo(flagX + dpr * 28, flagY + dpr * 22);
  ctx.lineTo(flagX, flagY + dpr * 16);
  ctx.closePath();
  ctx.fill();
  // Skull
  ctx.fillStyle = "#f2efe6";
  ctx.beginPath();
  ctx.ellipse(flagX + dpr * 14, flagY + dpr * 11, dpr * 5.2, dpr * 4.6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#0e0e10";
  ctx.beginPath();
  ctx.arc(flagX + dpr * 12, flagY + dpr * 10, dpr * 1.35, 0, Math.PI * 2);
  ctx.arc(flagX + dpr * 16.2, flagY + dpr * 10, dpr * 1.35, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#0e0e10";
  ctx.lineWidth = 1.1 * dpr;
  ctx.beginPath();
  ctx.moveTo(flagX + dpr * 12.5, flagY + dpr * 13.5);
  ctx.quadraticCurveTo(flagX + dpr * 14, flagY + dpr * 15.2, flagX + dpr * 15.5, flagY + dpr * 13.5);
  ctx.stroke();
  // Crossbones
  ctx.lineWidth = 1.6 * dpr;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(flagX + dpr * 8, flagY + dpr * 17);
  ctx.lineTo(flagX + dpr * 20, flagY + dpr * 21);
  ctx.moveTo(flagX + dpr * 20, flagY + dpr * 17);
  ctx.lineTo(flagX + dpr * 8, flagY + dpr * 21);
  ctx.stroke();

  // Bowsprit
  ctx.strokeStyle = "#2a1a0c";
  ctx.lineWidth = 2.2 * dpr;
  ctx.beginPath();
  ctx.moveTo(bowX + dpr * 4, deckY(bowX + dpr * 4));
  ctx.lineTo(bowX - dpr * 28, wt - dpr * 18);
  ctx.stroke();

  ctx.restore();
}

function adventureAnchorLayout(boatCx = w * 0.5) {
  const g = getCharterBoatGeo(boatCx);
  const attachX = g.sternX - dpr * 18;
  const attachY = g.deckY(attachX) + dpr * 2;
  const rimCx = attachX + dpr * 8;
  const rimCy = waterTop + dpr * 18;
  const sackCx = rimCx;
  const sackCy = rimCy + dpr * 48;
  return {
    boatCx,
    rimCx,
    rimCy,
    rimRx: 24 * dpr,
    rimRy: 8 * dpr,
    sackCx,
    sackCy,
    sackHx: 36 * dpr,
    sackVy: 52 * dpr,
    attachX,
    attachY,
  };
}

function drawAdventureAnchor(lay) {
  const { attachX, attachY, sackCx, sackCy } = lay;
  const t = performance.now() * 0.001;
  const sway = Math.sin(t * 1.4) * dpr * 3;

  ctx.save();
  // Rope from stern to water
  ctx.strokeStyle = "rgba(90, 65, 40, 0.92)";
  ctx.lineWidth = 2.4 * dpr;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(attachX, attachY);
  ctx.quadraticCurveTo(
    (attachX + sackCx) * 0.5 + dpr * 10,
    (attachY + sackCy) * 0.45,
    sackCx + sway,
    sackCy - dpr * 28
  );
  ctx.stroke();

  // Chain links near the anchor
  ctx.strokeStyle = "rgba(70, 75, 82, 0.9)";
  ctx.lineWidth = 2.8 * dpr;
  ctx.beginPath();
  ctx.moveTo(sackCx + sway, sackCy - dpr * 28);
  ctx.lineTo(sackCx + sway * 0.6, sackCy - dpr * 8);
  ctx.stroke();

  const ax = sackCx + sway * 0.5;
  const ay = sackCy;
  // Stock (crossbar)
  ctx.strokeStyle = "#3a4048";
  ctx.lineWidth = 3.2 * dpr;
  ctx.beginPath();
  ctx.moveTo(ax - dpr * 16, ay - dpr * 4);
  ctx.lineTo(ax + dpr * 16, ay - dpr * 4);
  ctx.stroke();
  // Shank
  ctx.lineWidth = 3.6 * dpr;
  ctx.beginPath();
  ctx.moveTo(ax, ay - dpr * 10);
  ctx.lineTo(ax, ay + dpr * 22);
  ctx.stroke();
  // Ring
  ctx.strokeStyle = "#4a5058";
  ctx.lineWidth = 2.4 * dpr;
  ctx.beginPath();
  ctx.arc(ax, ay - dpr * 14, dpr * 5, 0, Math.PI * 2);
  ctx.stroke();
  // Arms / flukes
  ctx.strokeStyle = "#2e343c";
  ctx.lineWidth = 3.2 * dpr;
  ctx.beginPath();
  ctx.moveTo(ax, ay + dpr * 18);
  ctx.quadraticCurveTo(ax - dpr * 22, ay + dpr * 28, ax - dpr * 18, ay + dpr * 8);
  ctx.moveTo(ax, ay + dpr * 18);
  ctx.quadraticCurveTo(ax + dpr * 22, ay + dpr * 28, ax + dpr * 18, ay + dpr * 8);
  ctx.stroke();
  // Fluke tips
  ctx.fillStyle = "#3a4048";
  ctx.beginPath();
  ctx.moveTo(ax - dpr * 18, ay + dpr * 8);
  ctx.lineTo(ax - dpr * 26, ay + dpr * 2);
  ctx.lineTo(ax - dpr * 14, ay + dpr * 12);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(ax + dpr * 18, ay + dpr * 8);
  ctx.lineTo(ax + dpr * 26, ay + dpr * 2);
  ctx.lineTo(ax + dpr * 14, ay + dpr * 12);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

function drawBoatHullInWater(centerX = w * 0.5) {
  if (adventureSession) {
    drawPirateBoatInWater(centerX);
    return;
  }
  const { cx, wt, L, bowX, sternX, deckY } = getCharterBoatGeo(centerX);
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
  if (adventureSession) {
    drawAdventureAnchorWithFish();
    return;
  }
  const lay = catchNetLayout();
  const { sackCx, sackCy, sackVy } = lay;
  drawCatchNetStructure(lay, lay.boatCx);

  ctx.save();
  if (kraken?.state === "biting" && kraken.netGrab) {
    const tearX = kraken.netGrab.x;
    const tearY = kraken.netGrab.y;
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
  }

  const fishEntries = getFishOnlyCatchEntries();
  const maxShow = 32;
  const list = fishEntries.slice(-maxShow);
  for (let i = 0; i < list.length; i++) {
    const row = Math.floor(i / 7);
    const col = i % 7;
    const fx = sackCx + (col - 3) * dpr * 12.5 + (row % 2) * dpr * 5.5;
    const fy = sackCy - dpr * 6 + row * dpr * 11;
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
    ctx.fillText(`+${fishEntries.length - maxShow}`, sackCx, sackCy + sackVy * 0.55);
    ctx.textAlign = "left";
  }
  ctx.restore();
}

function drawBoatHullAt(centerX) {
  drawBoatHullInWater(centerX);
}

function drawCatchNetForSide(centerX) {
  if (adventureSession) {
    drawAdventureAnchor(adventureAnchorLayout(centerX));
    return;
  }
  const lay = catchNetLayout(centerX);
  drawCatchNetStructure(lay, centerX);
}

function drawAdventureAnchorWithFish() {
  const lay = adventureAnchorLayout();
  drawAdventureAnchor(lay);

  // Adventure haul is tracked by score only — don't pile fish on the anchor.
  if (kraken?.state === "biting" && kraken.boatRockSteal) {
    const g = getCharterBoatGeo(lay.boatCx);
    const pulse = 0.45 + 0.55 * Math.abs(Math.sin(performance.now() * 0.022));
    ctx.save();
    ctx.strokeStyle = `rgba(180, 210, 240, ${0.25 * pulse})`;
    ctx.lineWidth = 2 * dpr;
    for (let i = 0; i < 5; i++) {
      const x = g.cx + (i - 2) * dpr * 18;
      ctx.beginPath();
      ctx.moveTo(x - dpr * 6, g.wt + dpr * 2);
      ctx.quadraticCurveTo(x, g.wt + dpr * (10 + pulse * 8), x + dpr * 6, g.wt + dpr * 2);
      ctx.stroke();
    }
    ctx.restore();
  }
}

function drawBoatHullAndCatchNetAt(centerX) {
  if (w <= 0 || h <= 0) return;
  drawBoatHullAt(centerX);
  drawCatchNetForSide(centerX);
}

function adventureBoatRockAngle() {
  if (!adventureSession || !kraken || kraken.state !== "biting") return 0;
  const t = kraken.biteT || 0;
  const snap = kraken.biteSnapMs || 520;
  if (t < snap * 0.35) return 0;
  const intensity = Math.min(1, (t - snap * 0.35) / 380);
  const now = performance.now();
  const face = kraken.biteFacing || 1;
  return (
    Math.sin(now * 0.017) * 0.14 * intensity * face +
    Math.sin(now * 0.029 + 0.8) * 0.06 * intensity
  );
}

function drawBoatRockSplashes(g, rock) {
  if (Math.abs(rock) < 0.025) return;
  const t = performance.now() * 0.001;
  ctx.save();
  ctx.globalAlpha = Math.min(0.55, Math.abs(rock) * 3.2);
  ctx.fillStyle = "rgba(210, 235, 255, 0.75)";
  for (let i = 0; i < 7; i++) {
    const side = i % 2 === 0 ? -1 : 1;
    const x = g.cx + side * g.L * (0.35 + (i % 3) * 0.12) + Math.sin(t * 8 + i) * dpr * 4;
    const y = g.wt + dpr * (4 + (i % 4) * 3) + Math.cos(t * 9 + i * 0.7) * dpr * 2;
    ctx.beginPath();
    ctx.ellipse(x, y, dpr * (3 + (i % 3)), dpr * (1.6 + (i % 2)), side * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

function drawBoatHullAndCatchNet() {
  if (w <= 0 || h <= 0) return;
  if (isDuelActive()) {
    drawBoatHullAndCatchNetAt(duelSideCenter("player"));
    return;
  }
  if (adventureSession) {
    const g = getCharterBoatGeo();
    const rock = adventureBoatRockAngle();
    ctx.save();
    ctx.translate(g.cx, g.wt);
    ctx.rotate(rock);
    ctx.translate(-g.cx, -g.wt);
    drawPirateBoatInWater();
    drawAdventureAnchorWithFish();
    ctx.restore();
    drawBoatRockSplashes(g, rock);
    return;
  }
  drawBoatHullInWater();
  drawCatchNetWithFish();
}

function releaseHalfCatchToKraken() {
  if (spendChestItem("golden_net", 1)) {
    saveMeta();
    refreshCollectablesUI();
    showToast("Golden Net held your catch!", 2200);
    return { count: 0, pts: 0, freed: [], blockedByGoldenNet: true };
  }
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
  if (krakens.some((k) => k.state === "biting")) return false;
  const hy = hookTipY();
  const hx = hook.x;
  const casting = opts?.casting === true;
  const surfaceSnag = opts?.surfaceSnag === true;
  let hookR = effectiveCatchRadiusBasePx();
  if (hook.snagPulse > 0) hookR *= 1.32;
  if (casting) hookR *= 1.22;
  if (surfaceSnag) hookR *= 1.12;
  let hit = null;
  let bestD = Infinity;
  for (const k of krakens) {
    if (k.state !== "active" || !k.len) continue;
    const L = k.len;
    const bodyCx = k.x;
    const bodyCy = k.y - L * 0.42;
    const bodyR = L * 0.44;
    const dx = bodyCx - hx;
    const dy = bodyCy - hy;
    const reach = hookR + bodyR;
    const d2 = dx * dx + dy * dy;
    if (d2 <= reach * reach && d2 < bestD) {
      hit = k;
      bestD = d2;
    }
  }
  if (!hit) return false;
  kraken = hit;

  const L = kraken.len;
  const biteFace = hook.x >= kraken.x ? 1 : -1;
  const mouthX = kraken.x + biteFace * L * 0.12;
  const mouthY = kraken.y - L * 0.88;

  const survivorWin = eventMinigameSession?.kind === "survivor";
  if (survivorWin) {
    playCrabTrapSound(2);
  } else {
    playKrakenBadSound();
  }

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
  kraken.biteHoldMs = survivorWin ? Math.max(420, KRAKEN_BITE_HOLD_MS * 0.55) : KRAKEN_BITE_HOLD_MS;
  kraken.netGrab = null;

  spawnCatchFX(mouthX, mouthY, 280);
  if (survivorWin) {
    eventMinigameSession.caughtKraken = true;
    catchFlash = Math.min(0.85, catchFlash + 0.35);
    showToast(`Kraken hooked! Bonus haul ${score} pts`, 2800);
    return true;
  }
  const lost = releaseHalfCatchToKraken();
  spawnReleasedFishJumpingIntoWater(lost.count);
  kraken.boatRockSteal = false;
  if (lost.freed.length) {
    if (adventureSession) {
      const g = getCharterBoatGeo();
      const grabX = g.cx + (biteFace > 0 ? g.L * 0.22 : -g.L * 0.12);
      const grabY = g.wt + dpr * 16;
      kraken.netGrab = { x: grabX, y: grabY, rimX: g.cx, rimY: g.wt };
      kraken.boatRockSteal = true;
      spawnFishEscapingFromNet(lost.freed, g.cx, g.wt + dpr * 8);
      spawnCatchFX(grabX, grabY, 160);
    } else {
      const lay = catchNetLayout();
      kraken.netGrab = { x: lay.sackCx, y: lay.sackCy + lay.sackVy * 0.12, rimX: lay.rimCx, rimY: lay.rimCy };
      spawnFishEscapingFromNet(lost.freed, kraken.netGrab.x, kraken.netGrab.y);
    }
  }
  catchFlash = Math.min(0.62, catchFlash + 0.22);

  if (lost.blockedByGoldenNet) {
    showToast("The kraken bit — Golden Net saved your catch!", 2800);
  } else if (lost.count === 0) {
    showToast(adventureSession ? "The kraken seizes the hull!" : "The kraken seized the line!", 2200);
  } else if (adventureSession) {
    showToast(`The kraken rocks the ship — ${lost.count} fish stolen (−${lost.pts} pts)`, 3600);
  } else {
    showToast(`The kraken has the line — ${lost.count} fish lost (−${lost.pts} pts)`, 3600);
  }
  return true;
}

function clearKrakenBubbles() {
  bubbles = bubbles.filter((b) => !b.kraken);
}

function spawnKrakenEntranceBubbles(k, count = 28) {
  const n = Math.max(12, Math.floor(count * (PERF_CHROMEBOOK ? 0.55 : 1)));
  for (let i = 0; i < n; i++) {
    bubbles.push({
      x: k.x + (Math.random() - 0.5) * k.len * 0.85,
      y: Math.min(h - dpr * 8, k.y + (Math.random() - 0.2) * k.len * 0.45),
      r: (2.2 + Math.random() * 5.5) * dpr,
      vy: (0.55 + Math.random() * 1.1) * dpr,
      w: Math.random() * Math.PI * 2,
      kraken: true,
    });
  }
}

function activateKraken(k) {
  const pack = Math.max(1, k.packSize || krakens.length || 1);
  const survivor = eventMinigameSession?.kind === "survivor";
  const multi = survivor && pack > 1;
  const len = dpr * (isPhoneDevice() ? 128 : multi ? 168 : 218);
  const speedBoost = survivor ? 1.28 : 1;
  const lane = typeof k.lane === "number" ? k.lane : 0;
  const laneT = pack > 1 ? (lane + 0.5) / pack : 0.18 + Math.random() * 0.64;
  const jitter = pack > 1 ? (Math.random() - 0.5) * 0.1 : 0;
  k.state = "active";
  k.len = len;
  k.pathStage = "rise";
  k.riseCenterX = w * Math.max(0.12, Math.min(0.88, laneT + jitter));
  k.riseVy = dpr * (0.36 + Math.random() * 0.14) * speedBoost;
  const depth = pack > 1 ? 0.56 + (lane / pack) * 0.26 : 0.78;
  k.sweepY = Math.min(h - dpr * 92, waterTop + waterH * depth);
  k.exitDir = pack > 1 ? (lane % 2 === 0 ? -1 : 1) : Math.random() < 0.5 ? -1 : 1;
  if (pack > 1 && Math.random() < 0.22) k.exitDir *= -1;
  k.exitVx = dpr * (1.9 + Math.random() * 0.7) * k.exitDir * speedBoost;
  k.x = k.riseCenterX;
  k.y = h + len * 0.58;
  k.phase = Math.random() * Math.PI * 2;
  k.face = k.exitDir;
  k.bubblePulseAt = 0;
  spawnKrakenEntranceBubbles(k, multi ? 36 : 54);
}

function tickOneKraken(k, now, dt) {
  if (k.state === "scheduled" && now >= k.spawnAt) {
    activateKraken(k);
    if (!(eventMinigameSession?.kind === "survivor")) {
      showToast("Kraken rising from the depths!", 1700);
    }
    return;
  }
  if (k.state === "biting") {
    k.biteT += dt;
    const hx = hook.x;
    const hy = hook.krakenBiteLocked ? hook.krakenBiteTipY : hookTipY();
    const L = k.len;
    const f = k.biteFacing;
    const targX = hx - f * L * 0.12;
    const targY = hy + L * 0.88;
    const snap = k.biteSnapMs;
    const u = Math.min(1, k.biteT / snap);
    const ease = u * u * (3 - 2 * u);
    k.x = k.biteFromX + (targX - k.biteFromX) * ease;
    k.y = k.biteFromY + (targY - k.biteFromY) * ease;
    if (u >= 1) {
      const t = performance.now() * 0.0011;
      k.x = targX + Math.sin(t * 19) * dpr * 3.2;
      k.y = targY + Math.sin(t * 23 + 1.1) * dpr * 2.6;
    }
    k.phase += dt * 0.0045;
    if (k.biteT >= snap + k.biteHoldMs) {
      k.state = "done";
      clearKrakenBubbles();
      k.netGrab = null;
      k.boatRockSteal = false;
      hook.krakenBiteLocked = false;
      if (eventMinigameSession?.kind === "survivor" && eventMinigameSession.caughtKraken) {
        if (playing) endRound();
        return;
      }
      if (eventMinigameSession?.kind === "survivor") {
        k.state = "scheduled";
        k.spawnAt = now + 240 + Math.random() * 640;
      }
    }
    return;
  }
  if (k.state === "active") {
    const step = dt / 16;
    k.phase += dt * 0.002;
    const L = k.len;

    if (k.pathStage === "rise") {
      k.y -= k.riseVy * step * 1.18;
      k.x =
        k.riseCenterX +
        Math.sin(k.phase * 0.62) * dpr * 44 +
        Math.sin(k.phase * 0.29 + 1.1) * dpr * 14;
      if (!k.bubblePulseAt || now - k.bubblePulseAt > 90) {
        spawnKrakenEntranceBubbles(k, 10);
        k.bubblePulseAt = now;
      }
      if (k.y <= k.sweepY) {
        k.pathStage = "side";
        k.y = k.sweepY;
        k.face = k.exitDir;
        clearKrakenBubbles();
      }
      return;
    }

    k.x += k.exitVx * step;
    k.y = k.sweepY + Math.sin(k.phase * 1.35) * dpr * 12;
    k.face = k.exitDir;
    if ((k.exitDir < 0 && k.x < -L * 0.9) || (k.exitDir > 0 && k.x > w + L * 0.9)) {
      k.state = "done";
      clearKrakenBubbles();
      if (eventMinigameSession?.kind === "survivor" && !eventMinigameSession.caughtKraken) {
        k.state = "scheduled";
        k.spawnAt = now + 220 + Math.random() * 580;
      }
    }
  }
}

function tickKraken(now, dt) {
  if (!playing || !krakens.length) return;
  for (const k of krakens) tickOneKraken(k, now, dt);
  syncPrimaryKraken();
}

function drawKraken() {
  for (const k of krakens) {
    if (k.state === "active" || k.state === "biting") drawOneKraken(k);
  }
}

function drawOneKraken(kraken) {
  if (!kraken || (kraken.state !== "active" && kraken.state !== "biting")) return;
  const L = kraken.len;
  const facing = kraken.state === "biting" ? kraken.biteFacing : kraken.face;
  const phase = kraken.phase;
  const biting = kraken.state === "biting";

  // Stylized-realistic: purple cephalopod, gradient skin, not photo-real mahogany.
  const deep = "#241536";
  const mid = "#4a3270";
  const light = "#7b5aa8";
  const glow = "#5eead4";

  ctx.save();
  ctx.translate(kraken.x, kraken.y);
  ctx.rotate(Math.sin(phase) * 0.035);
  ctx.scale(facing, 1);
  ctx.globalAlpha = 0.97;

  ctx.fillStyle = "rgba(10, 6, 24, 0.22)";
  ctx.beginPath();
  ctx.ellipse(0, L * 0.1, L * 0.4, L * 0.1, 0, 0, Math.PI * 2);
  ctx.fill();

  // Tentacles with soft gradient + a few sucker rings
  const tentacleCount = 7;
  for (let i = 0; i < tentacleCount; i++) {
    const u = i / (tentacleCount - 1 || 1);
    const baseX = (u - 0.5) * L * 0.64;
    const wob = Math.sin(phase * 1.25 + i * 0.9) * L * 0.05;
    const tipX = baseX * 1.32 + wob + Math.sin(phase * 0.85 + i) * L * 0.09;
    const tipY = L * 0.26 + Math.abs(baseX) * 0.14;
    const midX = baseX * 0.55 + wob * 0.5;
    const midY = -L * 0.02;
    const thick = (0.095 - u * 0.024) * L;
    const tg = ctx.createLinearGradient(baseX * 0.3, -L * 0.24, tipX, tipY);
    tg.addColorStop(0, mid);
    tg.addColorStop(0.55, light);
    tg.addColorStop(1, deep);
    ctx.strokeStyle = tg;
    ctx.lineWidth = thick;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(baseX * 0.32, -L * 0.24);
    ctx.bezierCurveTo(midX, midY, tipX * 0.75, tipY * 0.5, tipX, tipY);
    ctx.stroke();
    ctx.fillStyle = "rgba(160, 130, 200, 0.55)";
    for (let s = 1; s <= 4; s++) {
      const t = s / 5;
      const sx = baseX * 0.32 * (1 - t) + tipX * t + L * 0.015;
      const sy = -L * 0.24 * (1 - t) + tipY * t;
      const sr = thick * (0.22 - t * 0.04);
      ctx.beginPath();
      ctx.ellipse(sx, sy, sr, sr * 0.7, 0.15, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Mantle — slightly elongated squid form with gradient
  const mantleGrad = ctx.createRadialGradient(-L * 0.08, -L * 0.7, L * 0.04, 0, -L * 0.5, L * 0.42);
  mantleGrad.addColorStop(0, light);
  mantleGrad.addColorStop(0.45, mid);
  mantleGrad.addColorStop(1, deep);
  ctx.fillStyle = mantleGrad;
  ctx.beginPath();
  ctx.moveTo(0, -L * 0.98);
  ctx.bezierCurveTo(L * 0.2, -L * 0.9, L * 0.3, -L * 0.58, L * 0.26, -L * 0.34);
  ctx.bezierCurveTo(L * 0.18, -L * 0.2, L * 0.1, -L * 0.16, 0, -L * 0.14);
  ctx.bezierCurveTo(-L * 0.1, -L * 0.16, -L * 0.18, -L * 0.2, -L * 0.26, -L * 0.34);
  ctx.bezierCurveTo(-L * 0.3, -L * 0.58, -L * 0.2, -L * 0.9, 0, -L * 0.98);
  ctx.closePath();
  ctx.fill();

  // Small mantle fins
  ctx.fillStyle = mid;
  ctx.beginPath();
  ctx.moveTo(-L * 0.05, -L * 0.88);
  ctx.quadraticCurveTo(-L * 0.28, -L * 0.94, -L * 0.22, -L * 0.76);
  ctx.quadraticCurveTo(-L * 0.1, -L * 0.82, -L * 0.04, -L * 0.84);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(L * 0.05, -L * 0.88);
  ctx.quadraticCurveTo(L * 0.28, -L * 0.94, L * 0.22, -L * 0.76);
  ctx.quadraticCurveTo(L * 0.1, -L * 0.82, L * 0.04, -L * 0.84);
  ctx.closePath();
  ctx.fill();

  // Head bulb
  const headGrad = ctx.createRadialGradient(-L * 0.06, -L * 0.4, L * 0.02, 0, -L * 0.32, L * 0.28);
  headGrad.addColorStop(0, light);
  headGrad.addColorStop(1, deep);
  ctx.fillStyle = headGrad;
  ctx.beginPath();
  ctx.ellipse(0, -L * 0.3, L * 0.28, L * 0.18, 0, 0, Math.PI * 2);
  ctx.fill();

  // Soft beak
  ctx.fillStyle = "#1a1028";
  ctx.beginPath();
  ctx.moveTo(0, -L * 0.42);
  ctx.lineTo(L * 0.045, -L * 0.52);
  ctx.lineTo(0, -L * 0.58);
  ctx.lineTo(-L * 0.045, -L * 0.52);
  ctx.closePath();
  ctx.fill();

  // Eyes — cephalopod shape with a light teal iris (less cartoon, not photo-real)
  function drawEye(ex, ey) {
    ctx.fillStyle = "rgba(0,0,0,0.28)";
    ctx.beginPath();
    ctx.ellipse(ex, ey + L * 0.01, L * 0.08, L * 0.06, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f0e8ff";
    ctx.beginPath();
    ctx.ellipse(ex, ey, L * 0.075, L * 0.055, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = glow;
    ctx.globalAlpha = 0.55 + 0.2 * Math.sin(phase * 2);
    ctx.beginPath();
    ctx.ellipse(ex + L * 0.008, ey, L * 0.038, L * 0.042, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.97;
    ctx.fillStyle = "#0c1220";
    ctx.beginPath();
    ctx.ellipse(ex + L * 0.012, ey, L * 0.018, L * 0.032, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.beginPath();
    ctx.arc(ex - L * 0.02, ey - L * 0.015, L * 0.012, 0, Math.PI * 2);
    ctx.fill();
  }
  drawEye(-L * 0.13, -L * 0.36);
  drawEye(L * 0.13, -L * 0.36);

  if (biting) {
    const pulse = 0.3 + 0.7 * Math.abs(Math.sin(performance.now() * 0.028));
    ctx.globalAlpha = 0.18 * pulse;
    ctx.fillStyle = "#ff1a0a";
    ctx.beginPath();
    ctx.ellipse(0, -L * 0.48, L * 0.55, L * 0.36, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.26 * pulse;
    ctx.fillStyle = "#ff6b4d";
    ctx.beginPath();
    ctx.ellipse(0, -L * 0.55, L * 0.32, L * 0.22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.97;
  }

  ctx.restore();

  if (biting && kraken.netGrab) {
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
    const armGrad = ctx.createLinearGradient(startX, startY, endX, endY);
    armGrad.addColorStop(0, "rgba(74, 50, 112, 0.92)");
    armGrad.addColorStop(1, "rgba(36, 21, 54, 0.9)");
    ctx.strokeStyle = armGrad;
    ctx.lineWidth = L * 0.075;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.bezierCurveTo(midX, midY, endX - f * dpr * 18, endY - dpr * 10, endX, endY);
    ctx.stroke();
    ctx.strokeStyle = "rgba(160, 130, 200, 0.4)";
    ctx.lineWidth = L * 0.025;
    ctx.beginPath();
    ctx.moveTo(startX + f * dpr * 5, startY - dpr * 2);
    ctx.bezierCurveTo(midX + f * dpr * 6, midY + dpr * 4, endX - f * dpr * 10, endY - dpr * 7, endX, endY);
    ctx.stroke();
    ctx.fillStyle = `rgba(123, 90, 168, ${0.45 + 0.25 * pulse})`;
    ctx.beginPath();
    ctx.ellipse(endX, endY, dpr * 12, dpr * 7, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawReefAmbience(reefId, waterTopY) {
  const t = 0.35; // static sample — background is cached
  ctx.save();

  // Vertical depth falloff (Beer's-law style darkening)
  const haze = ctx.createLinearGradient(0, waterTopY, 0, h);
  haze.addColorStop(0, "rgba(180, 230, 240, 0.05)");
  haze.addColorStop(0.22, "rgba(40, 110, 140, 0.04)");
  haze.addColorStop(0.55, "rgba(0, 35, 55, 0.12)");
  haze.addColorStop(0.82, "rgba(0, 18, 36, 0.28)");
  haze.addColorStop(1, "rgba(0, 10, 22, 0.42)");
  ctx.fillStyle = haze;
  ctx.fillRect(0, waterTopY, w, h - waterTopY);

  // Soft particulate / marine snow
  ctx.fillStyle = "rgba(210, 235, 245, 0.07)";
  for (let i = 0; i < perfN(28); i++) {
    const x = ((i * 97 + 13) % 1000) / 1000 * w;
    const y = waterTopY + (((i * 53 + 29) % 1000) / 1000) * (h - waterTopY);
    ctx.beginPath();
    ctx.arc(x, y, dpr * (0.5 + (i % 3) * 0.35), 0, Math.PI * 2);
    ctx.fill();
  }

  // Soft static caustic patches in midwater
  if (reefId !== "mariana_trench") {
    for (let i = 0; i < perfN(6); i++) {
      const cx = ((i * 0.19 + 0.08) % 1) * w;
      const cy = waterTopY + waterH * (0.22 + (i % 4) * 0.14);
      const g = ctx.createRadialGradient(cx, cy, 2, cx, cy, dpr * (80 + i * 16));
      g.addColorStop(0, "rgba(220, 250, 255, 0.08)");
      g.addColorStop(0.45, "rgba(160, 220, 235, 0.03)");
      g.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(cx, cy, dpr * (60 + i * 10), dpr * (26 + i * 5), i * 0.35, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  if (reefId === "australia") {
    ctx.strokeStyle = "rgba(255, 255, 255, 0.045)";
    ctx.lineWidth = 1.15 * dpr;
    for (let i = 0; i < perfN(10); i++) {
      const x0 = (i / perfN(10)) * w + Math.sin(t + i) * dpr * 10;
      ctx.beginPath();
      ctx.moveTo(x0, waterTopY + dpr * 24);
      ctx.bezierCurveTo(x0 + dpr * 36, waterTopY + waterH * 0.32, x0 - dpr * 28, waterTopY + waterH * 0.58, x0 + dpr * 18, h - dpr * 70);
      ctx.stroke();
    }
    const g = ctx.createRadialGradient(w * 0.72, waterTopY + dpr * 30, 2, w * 0.52, waterTopY + waterH * 0.28, w * 0.55);
    g.addColorStop(0, "rgba(190, 245, 235, 0.09)");
    g.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, waterTopY, w, waterH);
  } else if (reefId === "caribbean") {
    const g = ctx.createRadialGradient(w * 0.18, h - dpr * 110, 10, w * 0.22, h, w * 0.55);
    g.addColorStop(0, "rgba(90, 175, 195, 0.11)");
    g.addColorStop(0.5, "rgba(210, 175, 110, 0.05)");
    g.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, waterTopY, w, waterH);
    const g2 = ctx.createRadialGradient(w * 0.86, h - dpr * 85, 8, w * 0.86, h, w * 0.42);
    g2.addColorStop(0, "rgba(80, 150, 175, 0.1)");
    g2.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = g2;
    ctx.fillRect(0, waterTopY, w, waterH);
  } else if (reefId === "mediterranean") {
    ctx.fillStyle = "rgba(18, 28, 42, 0.14)";
    ctx.fillRect(0, waterTopY + waterH * 0.18, w, waterH * 0.32);
    ctx.fillStyle = "rgba(10, 18, 32, 0.2)";
    ctx.fillRect(0, waterTopY + waterH * 0.48, w, waterH * 0.4);
    for (let i = 0; i < perfN(5); i++) {
      const y = waterTopY + waterH * (0.22 + i * 0.13);
      ctx.strokeStyle = `rgba(150, 175, 200, ${0.035 + i * 0.012})`;
      ctx.lineWidth = (2.5 + i) * dpr;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y + dpr * 6);
      ctx.stroke();
    }
  } else if (reefId === "japan_kuroshio") {
    ctx.fillStyle = "rgba(0, 8, 24, 0.28)";
    ctx.fillRect(0, waterTopY, w * 0.07, waterH);
    ctx.fillRect(w * 0.93, waterTopY, w * 0.07, waterH);
    ctx.strokeStyle = "rgba(120, 210, 255, 0.05)";
    ctx.lineWidth = dpr;
    for (let i = 0; i < perfN(14); i++) {
      const x = (i / perfN(14)) * w + (i % 2) * dpr * 18;
      ctx.beginPath();
      ctx.moveTo(x, waterTopY);
      ctx.lineTo(x + dpr * 5, h - dpr * 40);
      ctx.stroke();
    }
    const sh = ctx.createLinearGradient(0, waterTopY, 0, waterTopY + waterH * 0.45);
    sh.addColorStop(0, "rgba(0, 40, 80, 0.14)");
    sh.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = sh;
    ctx.fillRect(0, waterTopY, w, waterH * 0.45);
  } else if (reefId === "mariana_trench") {
    ctx.fillStyle = "rgba(0, 0, 0, 0.72)";
    ctx.fillRect(0, waterTopY, w, waterH);
    ctx.strokeStyle = "rgba(60, 85, 120, 0.1)";
    ctx.lineWidth = dpr * 2;
    for (let i = 0; i < perfN(8); i++) {
      const x = (i / Math.max(1, perfN(7))) * w;
      ctx.beginPath();
      ctx.moveTo(x, waterTopY + waterH * 0.35);
      ctx.lineTo(x - dpr * (30 + i * 7), h);
      ctx.stroke();
    }
  }
  ctx.restore();
}

/** Animated caustics + surface shimmer drawn each frame over the cached seabed. */
function drawLiveAquaticOverlay() {
  if (w <= 0 || h <= 0) return;
  const reef = getReef();
  const rid = reef.id;
  if (rid === "mariana_trench") return;
  const t = performance.now() * 0.001;
  const sandTop = h - dpr * 92;
  ctx.save();

  // Surface shimmer band just under the waterline
  const shimmer = ctx.createLinearGradient(0, waterTop, 0, waterTop + dpr * 48);
  shimmer.addColorStop(0, `rgba(255, 255, 255, ${0.07 + Math.sin(t * 1.4) * 0.02})`);
  shimmer.addColorStop(0.55, "rgba(200, 235, 255, 0.03)");
  shimmer.addColorStop(1, "rgba(200, 235, 255, 0)");
  ctx.fillStyle = shimmer;
  ctx.fillRect(0, waterTop, w, dpr * 48);

  // Moving god-ray shafts
  ctx.globalCompositeOperation = "lighter";
  const shaftCount = PERF_CHROMEBOOK ? 3 : 5;
  for (let i = 0; i < shaftCount; i++) {
    const sway = Math.sin(t * 0.55 + i * 1.3) * w * 0.035;
    const x0 = w * (0.12 + i * 0.18) + sway;
    const topW = dpr * (18 + (i % 3) * 8);
    const botW = dpr * (55 + (i % 3) * 22);
    const alpha = 0.028 + (i % 2) * 0.012;
    ctx.fillStyle = `rgba(255, 245, 210, ${alpha})`;
    ctx.beginPath();
    ctx.moveTo(x0 - topW, waterTop);
    ctx.lineTo(x0 + topW, waterTop);
    ctx.lineTo(x0 + botW + sway * 0.4, h);
    ctx.lineTo(x0 - botW + sway * 0.4, h);
    ctx.closePath();
    ctx.fill();
  }

  // Seabed caustic ripples
  if (!PERF_CHROMEBOOK) {
    ctx.globalCompositeOperation = "lighter";
    ctx.strokeStyle = "rgba(220, 245, 255, 0.045)";
    ctx.lineWidth = 1.2 * dpr;
    for (let i = 0; i < 7; i++) {
      const y = sandTop + dpr * (4 + i * 9) + Math.sin(t * 1.1 + i) * dpr * 2;
      ctx.beginPath();
      for (let x = 0; x <= w; x += dpr * 14) {
        const yy = y + Math.sin(x * 0.012 + t * 1.6 + i * 0.7) * dpr * 3.5
          + Math.cos(x * 0.021 - t * 1.2 + i) * dpr * 2;
        if (x === 0) ctx.moveTo(x, yy);
        else ctx.lineTo(x, yy);
      }
      ctx.stroke();
    }
  }

  ctx.globalCompositeOperation = "source-over";
  // Near-bottom blue-green contact fog
  const fog = ctx.createLinearGradient(0, sandTop - dpr * 40, 0, h);
  fog.addColorStop(0, "rgba(20, 70, 90, 0)");
  fog.addColorStop(0.45, "rgba(10, 40, 55, 0.08)");
  fog.addColorStop(1, "rgba(4, 18, 28, 0.16)");
  ctx.fillStyle = fog;
  ctx.fillRect(0, sandTop - dpr * 40, w, h - (sandTop - dpr * 40));
  ctx.restore();
}

function drawGreatBarrierReefBed() {
  const reefTop = h - dpr * 150;
  const reefBase = h - dpr * 12;
  const reefGrad = ctx.createLinearGradient(0, reefTop, 0, reefBase);
  reefGrad.addColorStop(0, "rgba(24, 140, 118, 0.1)");
  reefGrad.addColorStop(0.38, "rgba(28, 100, 90, 0.42)");
  reefGrad.addColorStop(1, "rgba(10, 70, 65, 0.78)");
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

  const colors = ["#c97b63", "#d4a574", "#e9c46a", "#2a9d8f", "#3d8b7a", "#e07a5f", "#4a9b8e"];
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
  reefGrad.addColorStop(0, "rgba(70, 150, 170, 0.08)");
  reefGrad.addColorStop(0.4, "rgba(40, 90, 110, 0.32)");
  reefGrad.addColorStop(1, "rgba(18, 50, 68, 0.68)");
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

  const colors = ["#c45c5c", "#d4785a", "#e08a4a", "#c97a3a", "#b86b7a", "#7a5c8c", "#d4a06a"];
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
      const branchGrad = ctx.createLinearGradient(cx, base, cx, base - dpr * 120 * ch);
      branchGrad.addColorStop(0, c.c);
      branchGrad.addColorStop(0.55, c.c);
      branchGrad.addColorStop(1, "rgba(255, 240, 220, 0.55)");
      ctx.strokeStyle = branchGrad;
      ctx.lineWidth = 2.6 * dpr;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(cx, base);
      ctx.bezierCurveTo(cx - dpr * 28 * ch, base - dpr * 50 * ch, cx + dpr * 32 * ch, base - dpr * 90 * ch, cx + dpr * 6 * ch, base - dpr * 120 * ch);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, base);
      ctx.bezierCurveTo(cx + dpr * 24 * ch, base - dpr * 45 * ch, cx - dpr * 26 * ch, base - dpr * 85 * ch, cx - dpr * 8 * ch, base - dpr * 115 * ch);
      ctx.stroke();
      // Brain-coral mound at base
      const mound = ctx.createRadialGradient(cx - dpr * 6, base - dpr * 10, 2, cx, base, dpr * 32 * ch);
      mound.addColorStop(0, "rgba(255, 230, 200, 0.45)");
      mound.addColorStop(0.5, c.c);
      mound.addColorStop(1, "rgba(40, 30, 25, 0.35)");
      ctx.fillStyle = mound;
      ctx.globalAlpha = 0.55;
      ctx.beginPath();
      ctx.ellipse(cx, base - dpr * 8, dpr * 30 * ch, dpr * 12, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (reefId === "australia") {
      for (let s = 0; s < 6; s++) {
        const py = base - s * dpr * 15 * ch;
        const pw = dpr * (68 - s * 6) * ch;
        const plate = ctx.createLinearGradient(cx - pw * 0.5, py, cx + pw * 0.5, py - dpr * 24 * ch);
        plate.addColorStop(0, c.c);
        plate.addColorStop(0.55, c.c);
        plate.addColorStop(1, "rgba(255, 250, 230, 0.5)");
        ctx.fillStyle = plate;
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
      ctx.globalAlpha = 0.28;
      ctx.fillStyle = "#fff8e7";
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
  g.addColorStop(0.22, v.gradient[1]);
  g.addColorStop(0.55, v.gradient[2]);
  g.addColorStop(0.82, v.gradient[3]);
  g.addColorStop(1, v.gradient[3]);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  drawReefAmbience(rid, waterTop);

  // Soft multi god-rays (static base layer; live overlay adds motion)
  for (let s = 0; s < 3; s++) {
    const x0 = w * (0.28 + s * 0.16);
    const shaft = ctx.createLinearGradient(x0, waterTop, x0 + w * 0.05, h);
    shaft.addColorStop(0, v.shaft[0]);
    shaft.addColorStop(1, v.shaft[1]);
    ctx.fillStyle = shaft;
    ctx.beginPath();
    ctx.moveTo(x0 - dpr * (10 + s * 4), waterTop);
    ctx.lineTo(x0 + dpr * (14 + s * 5), waterTop);
    ctx.lineTo(x0 + dpr * (48 + s * 14), h);
    ctx.lineTo(x0 - dpr * (42 + s * 12), h);
    ctx.closePath();
    ctx.fill();
  }

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
    sand.addColorStop(0, "rgba(210, 185, 140, 0)");
    sand.addColorStop(0.08, "rgba(205, 178, 128, 0.18)");
    sand.addColorStop(0.22, "rgba(190, 158, 108, 0.38)");
    sand.addColorStop(0.48, "rgba(168, 132, 82, 0.55)");
    sand.addColorStop(0.78, "rgba(128, 92, 55, 0.7)");
    sand.addColorStop(1, "rgba(88, 60, 36, 0.82)");
  }
  ctx.fillStyle = sand;
  ctx.beginPath();
  ctx.moveTo(0, sandTop + dpr * 12);
  for (let i = 0; i <= 24; i++) {
    const x = (i / 24) * w;
    const y = sandTop + dpr * (9 + Math.sin(i * 1.15) * 7 + Math.cos(i * 0.62) * 4.5 + Math.sin(i * 2.4) * 2);
    ctx.lineTo(x, y);
  }
  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.closePath();
  ctx.fill();

  // Soft wet-sand sheen + secondary ripple ridges
  if (!themeSand) {
    ctx.strokeStyle = "rgba(255, 242, 205, 0.16)";
    ctx.lineWidth = Math.max(1, dpr * 1.5);
    ctx.beginPath();
    for (let i = 0; i <= 24; i++) {
      const x = (i / 24) * w;
      const y = sandTop + dpr * (9 + Math.sin(i * 1.15) * 7 + Math.cos(i * 0.62) * 4.5 + Math.sin(i * 2.4) * 2);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.strokeStyle = "rgba(160, 120, 70, 0.14)";
    ctx.lineWidth = Math.max(1, dpr);
    for (let r = 0; r < 3; r++) {
      ctx.beginPath();
      for (let i = 0; i <= 20; i++) {
        const x = (i / 20) * w;
        const y = sandTop + dpr * (22 + r * 16 + Math.sin(i * 1.4 + r) * 3.5);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }

  // Sand grain speckles
  ctx.fillStyle = themeSand ? themeSand.speck : "rgba(255, 236, 190, 0.18)";
  for (let i = 0; i < perfN(68); i++) {
    const x = ((i * 73) % 1000) / 1000 * w;
    const y = sandTop + dpr * 16 + (((i * 41) % 100) / 100) * dpr * 68;
    ctx.beginPath();
    ctx.ellipse(x, y, dpr * (0.55 + (i % 4) * 0.35), dpr * (0.4 + (i % 3) * 0.18), (i % 5) * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  // Seabed pebbles, shell chips, darker wet patches
  if (!themeSand) {
    for (let i = 0; i < perfN(8); i++) {
      const x = ((i * 211) % 1000) / 1000 * w;
      const y = sandTop + dpr * (28 + (i % 4) * 14);
      const rg = ctx.createRadialGradient(x, y, 1, x, y, dpr * (14 + (i % 3) * 5));
      rg.addColorStop(0, "rgba(90, 70, 45, 0.22)");
      rg.addColorStop(1, "rgba(90, 70, 45, 0)");
      ctx.fillStyle = rg;
      ctx.beginPath();
      ctx.ellipse(x, y, dpr * (16 + (i % 3) * 6), dpr * (7 + (i % 2) * 3), i * 0.3, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = "rgba(120, 95, 70, 0.38)";
    for (let i = 0; i < perfN(18); i++) {
      const x = ((i * 157) % 1000) / 1000 * w;
      const y = sandTop + dpr * (20 + (i % 6) * 11);
      ctx.beginPath();
      ctx.ellipse(x, y, dpr * (2 + (i % 4) * 0.9), dpr * (1.3 + (i % 3) * 0.5), i * 0.45, 0, Math.PI * 2);
      ctx.fill();
    }

    // Tiny shell fragments
    ctx.strokeStyle = "rgba(245, 230, 200, 0.28)";
    ctx.lineWidth = Math.max(1, dpr * 0.9);
    for (let i = 0; i < perfN(10); i++) {
      const x = ((i * 191) % 1000) / 1000 * w;
      const y = sandTop + dpr * (24 + (i % 5) * 10);
      ctx.beginPath();
      ctx.arc(x, y, dpr * (2.5 + (i % 3)), Math.PI * 0.15, Math.PI * 1.05);
      ctx.stroke();
    }
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
    try {
      ctx = bgCacheCanvas.getContext("2d");
      drawBackground();
      bgCacheKey = key;
    } finally {
      ctx = saved;
    }
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
function drawFishMorph(morph, L, body, shade, accent, speciesId, phase = 0) {
  const sid = speciesId || "";
  function oceanBody(rx = L * 0.48, ry = L * 0.22) {
    const g = ctx.createLinearGradient(0, -ry * 1.35, 0, ry * 1.45);
    g.addColorStop(0, shade);
    g.addColorStop(0.38, body);
    g.addColorStop(0.78, accent);
    g.addColorStop(1, "#ffffff");
    return g;
  }

  function eye(ex = L * 0.34, ey = -L * 0.03, er = L * 0.072) {
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(ex, ey, er, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.arc(ex + er * 0.28, ey, er * 0.42, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(ex + er * 0.42, ey - er * 0.35, er * 0.22, 0, Math.PI * 2);
    ctx.fill();
  }

  function forkTail(depth = 0.28) {
    const wag = Math.sin(phase * 2.15) * 0.22;
    ctx.save();
    ctx.translate(-L * 0.38, 0);
    ctx.rotate(wag);
    const tg = ctx.createLinearGradient(0, 0, -L * 0.55, 0);
    tg.addColorStop(0, body);
    tg.addColorStop(1, shade);
    ctx.fillStyle = tg;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-L * 0.54, -L * depth);
    ctx.lineTo(-L * 0.38, 0);
    ctx.lineTo(-L * 0.54, L * depth);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function dorsalSail(h = 0.42, w = 0.22) {
    const flutter = Math.sin(phase * 1.55 + 0.6) * 0.12;
    ctx.save();
    ctx.translate(L * 0.08, -L * 0.1);
    ctx.rotate(flutter);
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.moveTo(-L * 0.06, -L * 0.02);
    ctx.lineTo(0, -L * (h - 0.1));
    ctx.lineTo(L * 0.14, -L * (w - 0.1));
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function pectoral() {
    const flutter = Math.sin(phase * 1.7 + 1.2) * 0.28;
    ctx.save();
    ctx.translate(L * 0.08, L * 0.02);
    ctx.rotate(flutter);
    ctx.fillStyle = shade;
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-L * 0.06, L * 0.2, -L * 0.14, L * 0.16);
    ctx.quadraticCurveTo(-L * 0.06, L * 0.06, 0, 0);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  function bellySheen(rx = L * 0.22, ry = L * 0.09, ox = L * 0.08, oy = -L * 0.03) {
    ctx.fillStyle = "rgba(255,255,255,0.28)";
    ctx.beginPath();
    ctx.ellipse(ox, oy, rx, ry, -0.12, 0, Math.PI * 2);
    ctx.fill();
  }

  function lateralLine() {
    ctx.strokeStyle = shade;
    ctx.globalAlpha = 0.45;
    ctx.lineWidth = Math.max(1, L * 0.028);
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(L * 0.28, L * 0.02);
    ctx.quadraticCurveTo(0, L * 0.06, -L * 0.32, L * 0.01);
    ctx.stroke();
    ctx.globalAlpha = 1;
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
    const ry = L * (sid === "european_sprat" ? 0.17 : 0.2) * slim;
    const rx = L * 0.48 * slim;
    ctx.fillStyle = oceanBody(rx, ry);
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
    if (sid === "northern_anchovy") {
      ctx.fillStyle = shade;
      ctx.beginPath();
      ctx.moveTo(L * 0.48, 0);
      ctx.lineTo(L * 0.62, -L * 0.06);
      ctx.lineTo(L * 0.58, L * 0.05);
      ctx.closePath();
      ctx.fill();
    }
    bellySheen(L * 0.26, L * 0.075, L * 0.1, -L * 0.035);
    lateralLine();
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
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.moveTo(L * -0.02, -ry * 0.7);
    ctx.quadraticCurveTo(L * 0.06, -ry * 1.7, L * 0.18, -ry * 0.55);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(L * 0.0, ry * 0.55);
    ctx.quadraticCurveTo(L * 0.08, ry * 1.35, L * 0.16, ry * 0.4);
    ctx.closePath();
    ctx.fill();
    forkTail(sid === "european_sprat" ? 0.38 : 0.34);
    pectoral();
    eye(L * 0.34, -L * 0.03, L * (sid === "northern_anchovy" ? 0.055 : 0.072));
    return;
  }

  if (morph === "clownfish") {
    ctx.fillStyle = oceanBody(L * 0.46, L * 0.24);
    ctx.beginPath();
    ctx.ellipse(0, 0, L * 0.46, L * 0.24, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = L * 0.1;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-L * 0.16, -L * 0.22);
    ctx.quadraticCurveTo(-L * 0.16, 0, -L * 0.12, L * 0.22);
    ctx.stroke();
    ctx.lineWidth = L * 0.085;
    ctx.beginPath();
    ctx.moveTo(L * 0.12, -L * 0.22);
    ctx.quadraticCurveTo(L * 0.12, 0, L * 0.16, L * 0.22);
    ctx.stroke();
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.moveTo(-L * 0.04, -L * 0.16);
    ctx.quadraticCurveTo(L * 0.02, -L * 0.32, L * 0.14, -L * 0.18);
    ctx.closePath();
    ctx.fill();
    forkTail(0.28);
    eye(L * 0.3, -L * 0.04, L * 0.06);
    return;
  }

  if (morph === "angelfish") {
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.moveTo(-L * 0.08, -L * 0.18);
    ctx.lineTo(-L * 0.02, -L * 0.58);
    ctx.lineTo(L * 0.14, -L * 0.16);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-L * 0.08, L * 0.18);
    ctx.lineTo(-L * 0.02, L * 0.58);
    ctx.lineTo(L * 0.14, L * 0.16);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = oceanBody(L * 0.28, L * 0.38);
    ctx.beginPath();
    ctx.ellipse(0, 0, L * 0.28, L * 0.38, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(224, 242, 254, 0.55)";
    ctx.beginPath();
    ctx.ellipse(L * 0.02, 0, L * 0.18, L * 0.28, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = accent;
    ctx.lineWidth = L * 0.055;
    ctx.beginPath();
    ctx.moveTo(-L * 0.08, -L * 0.28);
    ctx.lineTo(-L * 0.08, L * 0.28);
    ctx.stroke();
    ctx.lineWidth = L * 0.045;
    ctx.beginPath();
    ctx.moveTo(L * 0.08, -L * 0.3);
    ctx.lineTo(L * 0.08, L * 0.3);
    ctx.stroke();
    forkTail(0.22);
    eye(L * 0.16, -L * 0.06, L * 0.055);
    return;
  }

  if (morph === "jellyfish") {
    const bob = Math.sin(phase) * L * 0.04;
    ctx.save();
    ctx.translate(0, bob);
    const bell = ctx.createRadialGradient(0, -L * 0.08, L * 0.04, 0, 0, L * 0.42);
    bell.addColorStop(0, "rgba(255,255,255,0.55)");
    bell.addColorStop(0.45, body);
    bell.addColorStop(1, "rgba(167, 139, 250, 0.15)");
    ctx.fillStyle = bell;
    ctx.beginPath();
    ctx.ellipse(0, 0, L * 0.38, L * 0.28, 0, Math.PI, 0);
    ctx.quadraticCurveTo(0, L * 0.12, -L * 0.38, 0);
    ctx.fill();
    ctx.strokeStyle = accent;
    ctx.globalAlpha = 0.55;
    ctx.lineWidth = Math.max(1, L * 0.02);
    for (let i = 0; i < 7; i++) {
      const tx = -L * 0.22 + i * L * 0.075;
      ctx.beginPath();
      ctx.moveTo(tx, L * 0.02);
      ctx.quadraticCurveTo(tx + Math.sin(phase + i) * L * 0.06, L * 0.28, tx + Math.sin(phase * 1.4 + i) * L * 0.08, L * 0.55);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.restore();
    return;
  }

  if (morph === "seaturtle") {
    const flap = Math.sin(phase) * 0.16;
    ctx.save();
    ctx.rotate(-0.28);
    ctx.fillStyle = shade;
    ctx.save();
    ctx.translate(L * 0.08, -L * 0.28);
    ctx.rotate(-0.7 + flap);
    ctx.beginPath();
    ctx.ellipse(0, 0, L * 0.2, L * 0.07, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.save();
    ctx.translate(-L * 0.02, L * 0.16);
    ctx.rotate(0.55 - flap);
    ctx.beginPath();
    ctx.ellipse(0, 0, L * 0.28, L * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.save();
    ctx.translate(-L * 0.28, L * 0.1);
    ctx.rotate(0.4 + flap * 0.4);
    ctx.beginPath();
    ctx.ellipse(0, 0, L * 0.12, L * 0.055, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.save();
    ctx.translate(-L * 0.3, -L * 0.08);
    ctx.rotate(-0.35 - flap * 0.4);
    ctx.beginPath();
    ctx.ellipse(0, 0, L * 0.11, L * 0.05, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.ellipse(L * 0.04, L * 0.08, L * 0.22, L * 0.12, 0.15, 0, Math.PI * 2);
    ctx.fill();
    const shell = ctx.createRadialGradient(L * 0.02, -L * 0.1, L * 0.04, 0, 0, L * 0.4);
    shell.addColorStop(0, accent);
    shell.addColorStop(0.45, body);
    shell.addColorStop(1, shade);
    ctx.fillStyle = shell;
    ctx.beginPath();
    ctx.ellipse(0, 0, L * 0.4, L * 0.24, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = accent;
    ctx.globalAlpha = 0.55;
    ctx.lineWidth = Math.max(1, L * 0.02);
    ctx.beginPath();
    ctx.moveTo(-L * 0.08, -L * 0.16);
    ctx.lineTo(L * 0.12, 0);
    ctx.lineTo(-L * 0.08, L * 0.16);
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(L * 0.12, 0);
    ctx.lineTo(L * 0.32, -L * 0.08);
    ctx.moveTo(L * 0.12, 0);
    ctx.lineTo(L * 0.32, L * 0.08);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.ellipse(L * 0.38, -L * 0.04, L * 0.14, L * 0.1, -0.2, 0, Math.PI * 2);
    ctx.fill();
    eye(L * 0.44, -L * 0.06, L * 0.04);
    ctx.restore();
    return;
  }

  if (morph === "octopus") {
    const ear = sid === "dumbo_octopus";
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.ellipse(L * 0.08, -L * 0.04, L * 0.28, L * 0.26, 0, 0, Math.PI * 2);
    ctx.fill();
    if (ear) {
      ctx.fillStyle = shade;
      ctx.beginPath();
      ctx.ellipse(L * 0.02, -L * 0.28, L * 0.16, L * 0.1, -0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(L * 0.02, L * 0.18, L * 0.16, L * 0.1, 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.strokeStyle = shade;
    ctx.lineWidth = Math.max(1.5, L * 0.045);
    ctx.lineCap = "round";
    for (let i = 0; i < 6; i++) {
      const a = -0.7 + i * 0.28;
      const sway = Math.sin(phase * 1.4 + i) * L * 0.08;
      ctx.beginPath();
      ctx.moveTo(L * 0.02, L * 0.12);
      ctx.quadraticCurveTo(-L * 0.15 + sway, L * (0.28 + a * 0.2), -L * 0.42 + sway * 0.5, L * (0.42 + a * 0.35));
      ctx.stroke();
    }
    eye(L * 0.18, -L * 0.06, L * 0.06);
    return;
  }

  if (morph === "seahorse") {
    ctx.strokeStyle = shade;
    ctx.lineWidth = Math.max(2, L * 0.08);
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(L * 0.12, -L * 0.42);
    ctx.quadraticCurveTo(L * 0.32, -L * 0.2, L * 0.08, 0);
    ctx.quadraticCurveTo(-L * 0.12, L * 0.25, -L * 0.02, L * 0.48);
    ctx.stroke();
    ctx.fillStyle = oceanBody(L * 0.16, L * 0.14);
    ctx.beginPath();
    ctx.ellipse(L * 0.1, -L * 0.28, L * 0.14, L * 0.12, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.moveTo(L * 0.02, -L * 0.1);
    ctx.lineTo(-L * 0.18, -L * 0.02);
    ctx.lineTo(L * 0.02, L * 0.08);
    ctx.closePath();
    ctx.fill();
    eye(L * 0.16, -L * 0.3, L * 0.04);
    return;
  }

  if (morph === "manta") {
    const flap = Math.sin(phase) * 0.12;
    ctx.fillStyle = oceanBody(L * 0.55, L * 0.18);
    ctx.beginPath();
    ctx.moveTo(L * 0.42, 0);
    ctx.quadraticCurveTo(L * 0.1, -L * (0.42 + flap), -L * 0.45, -L * 0.08);
    ctx.quadraticCurveTo(-L * 0.55, 0, -L * 0.45, L * 0.08);
    ctx.quadraticCurveTo(L * 0.1, L * (0.42 + flap), L * 0.42, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.35;
    ctx.beginPath();
    ctx.ellipse(L * 0.05, L * 0.04, L * 0.28, L * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.moveTo(-L * 0.35, 0);
    ctx.lineTo(-L * 0.72, -L * 0.06);
    ctx.lineTo(-L * 0.72, L * 0.06);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.arc(L * 0.28, -L * 0.04, L * 0.03, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  if (morph === "seal") {
    ctx.fillStyle = oceanBody(L * 0.48, L * 0.22);
    ctx.beginPath();
    ctx.ellipse(0, 0, L * 0.48, L * 0.22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.moveTo(-L * 0.35, 0);
    ctx.quadraticCurveTo(-L * 0.55, -L * 0.18, -L * 0.72, -L * 0.02);
    ctx.quadraticCurveTo(-L * 0.55, L * 0.16, -L * 0.35, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.ellipse(L * 0.42, 0, L * 0.16, L * 0.14, 0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = shade;
    const flap = Math.sin(phase) * 0.15;
    ctx.save();
    ctx.translate(L * 0.05, L * 0.12);
    ctx.rotate(0.4 + flap);
    ctx.beginPath();
    ctx.ellipse(0, 0, L * 0.16, L * 0.06, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    eye(L * 0.48, -L * 0.04, L * 0.05);
    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.arc(L * 0.55, L * 0.02, L * 0.025, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  if (morph === "dolphin") {
    ctx.save();
    ctx.rotate(-0.22);
    ctx.fillStyle = oceanBody(L * 0.5, L * 0.18);
    ctx.beginPath();
    ctx.moveTo(L * 0.55, -L * 0.02);
    ctx.quadraticCurveTo(L * 0.2, -L * 0.28, -L * 0.28, -L * 0.02);
    ctx.quadraticCurveTo(-L * 0.42, L * 0.06, -L * 0.28, L * 0.12);
    ctx.quadraticCurveTo(L * 0.12, L * 0.26, L * 0.55, -L * 0.02);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.moveTo(L * 0.04, -L * 0.16);
    ctx.quadraticCurveTo(L * 0.12, -L * 0.48, L * 0.22, -L * 0.16);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.moveTo(-L * 0.22, L * 0.04);
    ctx.quadraticCurveTo(-L * 0.55, -L * 0.08, -L * 0.48, L * 0.12);
    ctx.quadraticCurveTo(-L * 0.55, L * 0.22, -L * 0.22, L * 0.1);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = shade;
    ctx.save();
    ctx.translate(L * 0.08, L * 0.1);
    ctx.rotate(0.55);
    ctx.beginPath();
    ctx.ellipse(0, 0, L * 0.14, L * 0.05, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    bellySheen(L * 0.18, L * 0.08, L * 0.06, L * 0.05);
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.ellipse(L * 0.48, -L * 0.04, L * 0.14, L * 0.09, -0.15, 0, Math.PI * 2);
    ctx.fill();
    eye(L * 0.42, -L * 0.06, L * 0.04);
    ctx.strokeStyle = shade;
    ctx.lineWidth = L * 0.02;
    ctx.beginPath();
    ctx.arc(L * 0.54, L * 0.02, L * 0.05, 0.15, Math.PI * 0.85);
    ctx.stroke();
    ctx.restore();
    return;
  }

  if (morph === "lobster") {
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.ellipse(0, 0, L * 0.38, L * 0.18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = shade;
    ctx.lineWidth = L * 0.03;
    for (let i = 0; i < 5; i++) {
      const x = L * (0.2 - i * 0.1);
      ctx.beginPath();
      ctx.moveTo(x, -L * 0.14);
      ctx.lineTo(x - L * 0.03, L * 0.14);
      ctx.stroke();
    }
    ctx.fillStyle = shade;
    for (let s = -1; s <= 1; s += 2) {
      ctx.beginPath();
      ctx.moveTo(L * 0.28, s * L * 0.06);
      ctx.lineTo(L * 0.55, s * L * 0.22);
      ctx.lineTo(L * 0.48, s * L * 0.08);
      ctx.closePath();
      ctx.fill();
    }
    ctx.strokeStyle = accent;
    ctx.lineWidth = L * 0.025;
    ctx.beginPath();
    ctx.moveTo(L * 0.35, -L * 0.08);
    ctx.lineTo(L * 0.55, -L * 0.28);
    ctx.moveTo(L * 0.35, L * 0.08);
    ctx.lineTo(L * 0.55, L * 0.28);
    ctx.stroke();
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.moveTo(-L * 0.35, 0);
    ctx.lineTo(-L * 0.62, -L * 0.18);
    ctx.lineTo(-L * 0.55, 0);
    ctx.lineTo(-L * 0.62, L * 0.18);
    ctx.closePath();
    ctx.fill();
    eye(L * 0.32, -L * 0.06, L * 0.04);
    return;
  }

  if (morph === "cuttlefish") {
    ctx.fillStyle = oceanBody(L * 0.42, L * 0.26);
    ctx.beginPath();
    ctx.ellipse(0, 0, L * 0.42, L * 0.26, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.45;
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.arc(L * (0.18 - i * 0.1), (i % 2 ? -1 : 1) * L * 0.08, L * 0.04, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.strokeStyle = shade;
    ctx.lineWidth = L * 0.035;
    ctx.lineCap = "round";
    for (let i = 0; i < 5; i++) {
      const y = -L * 0.1 + i * L * 0.05;
      ctx.beginPath();
      ctx.moveTo(L * 0.35, y);
      ctx.quadraticCurveTo(L * 0.5, y + Math.sin(phase + i) * L * 0.04, L * 0.62, y);
      ctx.stroke();
    }
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.moveTo(-L * 0.3, -L * 0.08);
    ctx.lineTo(-L * 0.55, 0);
    ctx.lineTo(-L * 0.3, L * 0.08);
    ctx.closePath();
    ctx.fill();
    eye(L * 0.22, -L * 0.04, L * 0.07);
    return;
  }

  if (morph === "otter") {
    ctx.fillStyle = oceanBody(L * 0.46, L * 0.2);
    ctx.beginPath();
    ctx.ellipse(0, 0, L * 0.46, L * 0.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.moveTo(-L * 0.4, 0);
    ctx.quadraticCurveTo(-L * 0.62, -L * 0.12, -L * 0.78, 0);
    ctx.quadraticCurveTo(-L * 0.62, L * 0.12, -L * 0.4, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.ellipse(L * 0.4, -L * 0.02, L * 0.16, L * 0.14, 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.ellipse(L * 0.08, L * 0.14, L * 0.12, L * 0.05, 0.3, 0, Math.PI * 2);
    ctx.fill();
    eye(L * 0.46, -L * 0.04, L * 0.045);
    ctx.fillStyle = "#0f172a";
    ctx.beginPath();
    ctx.arc(L * 0.52, L * 0.02, L * 0.022, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  if (morph === "mackerel") {
    ctx.fillStyle = oceanBody(L * 0.46, L * 0.26);
    ctx.beginPath();
    ctx.ellipse(0, 0, L * 0.46, L * 0.26, 0, 0, Math.PI * 2);
    ctx.fill();
    bellySheen();
    ctx.strokeStyle = shade;
    ctx.lineWidth = L * 0.04;
    for (let i = 0; i < 5; i++) {
      const yy = -L * 0.18 + i * L * 0.08;
      ctx.beginPath();
      ctx.arc(0, yy, L * 0.42, 2.1, 0.95 * Math.PI);
      ctx.stroke();
    }
    forkTail(0.26);
    dorsalSail(0.28, 0.16);
    pectoral();
    eye();
    return;
  }

  if (morph === "tuna" || morph === "bluefin") {
    const chunky = morph === "bluefin" ? 1.08 : 1;
    ctx.fillStyle = oceanBody(L * 0.5, L * 0.28 * chunky);
    ctx.beginPath();
    ctx.moveTo(L * 0.52, 0);
    ctx.quadraticCurveTo(L * 0.15, -L * 0.32 * chunky, -L * 0.35, -L * 0.08);
    ctx.quadraticCurveTo(-L * 0.42, 0, -L * 0.35, L * 0.08);
    ctx.quadraticCurveTo(L * 0.15, L * 0.28 * chunky, L * 0.52, 0);
    ctx.closePath();
    ctx.fill();
    bellySheen(L * 0.2, L * 0.07, L * 0.05, L * 0.08);
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.moveTo(-L * 0.38, 0);
    ctx.lineTo(-L * 0.88, -L * 0.12);
    ctx.lineTo(-L * 0.88, L * 0.12);
    ctx.closePath();
    ctx.fill();
    dorsalSail(0.28, 0.18);
    pectoral();
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
    const topGrad = ctx.createLinearGradient(0, -L * 0.36, 0, L * 0.3);
    topGrad.addColorStop(0, shade);
    topGrad.addColorStop(0.32, body);
    topGrad.addColorStop(0.68, accent);
    topGrad.addColorStop(1, "#f8fafc");

    ctx.fillStyle = topGrad;
    ctx.beginPath();
    ctx.moveTo(L * 0.48, -L * 0.01);
    ctx.quadraticCurveTo(L * 0.34, -L * 0.34, L * 0.04, -L * 0.28);
    ctx.quadraticCurveTo(-L * 0.26, -L * 0.22, -L * 0.44, -L * 0.07);
    ctx.quadraticCurveTo(-L * 0.5, L * 0.02, -L * 0.44, L * 0.13);
    ctx.quadraticCurveTo(-L * 0.2, L * 0.3, L * 0.06, L * 0.24);
    ctx.quadraticCurveTo(L * 0.32, L * 0.18, L * 0.48, L * 0.04);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "rgba(248, 250, 252, 0.94)";
    ctx.beginPath();
    ctx.moveTo(L * 0.4, L * 0.1);
    ctx.quadraticCurveTo(L * 0.02, L * 0.28, -L * 0.38, L * 0.12);
    ctx.quadraticCurveTo(-L * 0.26, L * 0.2, L * 0.04, L * 0.2);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = shade;
    ctx.globalAlpha = 0.58;
    const spots = [
      [L * 0.26, -L * 0.14, L * 0.056, 0.72],
      [L * 0.08, -L * 0.1, L * 0.048, 0.2],
      [-L * 0.1, -L * 0.14, L * 0.052, -0.15],
      [-L * 0.24, -L * 0.08, L * 0.042, 0.35],
      [L * 0.34, -L * 0.06, L * 0.04, 0.1],
      [-L * 0.04, -L * 0.2, L * 0.036, -0.2],
      [L * -0.18, -L * 0.16, L * 0.034, 0.5],
    ];
    for (const [sx, sy, sr, rot] of spots) {
      ctx.beginPath();
      ctx.ellipse(sx, sy, sr, sr * 0.72, rot, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    ctx.strokeStyle = shade;
    ctx.lineWidth = Math.max(1, L * 0.016);
    ctx.globalAlpha = 0.72;
    ctx.beginPath();
    ctx.moveTo(L * 0.36, -L * 0.22);
    ctx.quadraticCurveTo(L * 0.02, -L * 0.33, -L * 0.4, -L * 0.15);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(L * 0.28, L * 0.18);
    ctx.quadraticCurveTo(-L * 0.02, L * 0.24, -L * 0.36, L * 0.14);
    ctx.stroke();
    ctx.globalAlpha = 1;

    const tailWag = Math.sin(phase * 2.1) * 0.1;
    ctx.save();
    ctx.translate(-L * 0.44, L * 0.02);
    ctx.rotate(tailWag);
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.moveTo(L * 0.06, 0);
    ctx.quadraticCurveTo(-L * 0.04, -L * 0.12, -L * 0.2, -L * 0.04);
    ctx.quadraticCurveTo(-L * 0.26, 0, -L * 0.2, L * 0.05);
    ctx.quadraticCurveTo(-L * 0.04, L * 0.14, L * 0.06, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.moveTo(-L * 0.02, -L * 0.02);
    ctx.lineTo(-L * 0.18, -L * 0.01);
    ctx.lineTo(-L * 0.02, L * 0.03);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    ctx.strokeStyle = "#334155";
    ctx.lineWidth = Math.max(1, L * 0.02);
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(L * 0.42, L * 0.02);
    ctx.quadraticCurveTo(L * 0.36, L * 0.08, L * 0.28, L * 0.06);
    ctx.stroke();

    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.ellipse(L * 0.32, -L * 0.1, L * 0.032, L * 0.024, -0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(L * 0.2, -L * 0.09, L * 0.028, L * 0.02, -0.08, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.arc(L * 0.325, -L * 0.095, L * 0.012, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(L * 0.205, -L * 0.085, L * 0.01, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(L * 0.33, -L * 0.1, L * 0.004, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(L * 0.21, -L * 0.09, L * 0.0035, 0, Math.PI * 2);
    ctx.fill();
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
    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.moveTo(L * 0.46, L * 0.04);
    ctx.lineTo(L * 0.52, L * 0.01);
    ctx.lineTo(L * 0.46, L * 0.07);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = Math.max(1, L * 0.018);
    ctx.lineCap = "round";
    for (let i = 0; i < 5; i++) {
      const tx = L * (0.48 + i * 0.012);
      const ty = L * (0.035 + i * 0.008);
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(tx + L * 0.045, ty - L * 0.012);
      ctx.stroke();
    }
    forkTail(0.14);
    return;
  }

  if (morph === "reefshark") {
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.moveTo(L * 0.5, 0);
    ctx.quadraticCurveTo(L * 0.08, -L * 0.28, -L * 0.4, -L * 0.08);
    ctx.lineTo(-L * 0.52, L * 0.02);
    ctx.lineTo(-L * 0.4, L * 0.08);
    ctx.quadraticCurveTo(L * 0.08, L * 0.26, L * 0.5, 0);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#e2e8f0";
    ctx.beginPath();
    ctx.moveTo(L * 0.12, L * 0.04);
    ctx.quadraticCurveTo(L * 0.02, L * 0.16, -L * 0.28, L * 0.06);
    ctx.quadraticCurveTo(L * 0.02, L * 0.1, L * 0.12, L * 0.04);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = shade;
    ctx.beginPath();
    ctx.moveTo(L * -0.04, -L * 0.24);
    ctx.lineTo(L * 0.06, -L * 0.46);
    ctx.lineTo(L * 0.12, -L * 0.2);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(L * 0.08, L * 0.1);
    ctx.lineTo(L * 0.02, L * 0.28);
    ctx.lineTo(L * 0.16, L * 0.1);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#0a1020";
    ctx.beginPath();
    ctx.arc(L * 0.3, -L * 0.05, L * 0.032, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.moveTo(L * 0.42, L * 0.02);
    ctx.quadraticCurveTo(L * 0.52, -L * 0.01, L * 0.42, L * 0.06);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = Math.max(1.2, L * 0.022);
    ctx.lineCap = "round";
    for (let i = 0; i < 6; i++) {
      const tx = L * (0.44 + i * 0.01);
      const ty = L * (0.015 + (i % 2) * 0.012);
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(tx + L * 0.055, ty - L * 0.018);
      ctx.stroke();
    }
    ctx.lineWidth = Math.max(1, L * 0.016);
    for (let i = 0; i < 4; i++) {
      const tx = L * (0.45 + i * 0.012);
      const ty = L * (0.055 + (i % 2) * 0.01);
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(tx + L * 0.04, ty + L * 0.014);
      ctx.stroke();
    }
    if (sid === "australian_blacktip") {
      ctx.fillStyle = "#f8fafc";
      ctx.beginPath();
      ctx.moveTo(L * 0.02, -L * 0.38);
      ctx.lineTo(L * 0.08, -L * 0.46);
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
      ctx.beginPath();
      ctx.arc(L * 0.52, -L * 0.36, L * 0.06, 0, Math.PI * 2);
      ctx.fill();
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
    ctx.beginPath();
    ctx.arc(L * 0.34, -L * 0.05, L * 0.075, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0a0202";
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
  const soft = spec.morph === "jellyfish" || spec.morph === "seaturtle";
  const swim = f.phase;
  // Splash-style body roll + faster secondary sway (vertical bob is in updateFish)
  const bodyRoll = Math.sin(swim) * (scary ? 0.14 : soft ? 0.055 : 0.1);
  const sway = Math.sin(swim * 2.05) * (scary ? 0.05 : soft ? 0.02 : 0.04);

  ctx.save();
  ctx.translate(f.x, f.y);
  ctx.rotate(bodyRoll + sway);
  ctx.scale(facing, 1);

  ctx.fillStyle = "rgba(2, 18, 32, 0.14)";
  ctx.beginPath();
  ctx.ellipse(0, L * 0.24, L * 0.36, L * 0.08, 0, 0, Math.PI * 2);
  ctx.fill();

  drawFishMorph(spec.morph || "silverside", L, body, shade, accent, spec.id, swim);

  ctx.restore();
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
    ctx.strokeStyle = "#c2410c";
    ctx.lineWidth = 5.2 * sc;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(shx, shy);
    ctx.quadraticCurveTo(midX, midY, gx, gy);
    ctx.stroke();
    ctx.strokeStyle = "#7c2d12";
    ctx.lineWidth = 2.8 * sc;
    ctx.beginPath();
    ctx.moveTo(shx, shy);
    ctx.quadraticCurveTo(midX, midY, gx, gy);
    ctx.stroke();

    const ang = Math.atan2(gy - midY, gx - midX);
    const cx = gx + Math.cos(ang + sx * 0.5) * 5 * sc;
    const cy = gy + Math.sin(ang + sx * 0.5) * 5 * sc;
    ctx.fillStyle = "#ea580c";
    ctx.beginPath();
    ctx.ellipse(cx, cy, 9 * sc, 6.5 * sc, ang, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fb923c";
    ctx.beginPath();
    ctx.ellipse(cx + Math.cos(ang + sx * 0.9) * 4 * sc, cy + Math.sin(ang + sx * 0.9) * 4 * sc, 5 * sc, 3.8 * sc, ang + sx * 0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#7c2d12";
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
  if (!c || c.phase === "map" || c.phase === "awards" || w <= 0) return;
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
    let badgeText = "★  TREASURE MAP FOUND  ★";
    let titleText = "ADVENTURE MODE UNLOCKED!";
    let subText = "Pirates Path · Gold Quest · Frozen Sea";
    ctx.font = `400 ${Math.round(11 * dpr)}px "Bebas Neue", sans-serif`;
    ctx.fillStyle = `rgba(255, 248, 200, ${bannerAlpha * 0.9})`;
    ctx.fillText(badgeText, w * 0.5, h * 0.13);
    ctx.font = `400 ${titleSize}px "Bebas Neue", sans-serif`;
    ctx.fillStyle = `rgba(255, 213, 74, ${bannerAlpha})`;
    ctx.fillText(titleText, w * 0.5, h * 0.13 + titleSize * 1.15);
    ctx.shadowBlur = 10 * dpr;
    ctx.font = `400 ${subSize}px system-ui, sans-serif`;
    ctx.fillStyle = `rgba(200, 230, 255, ${bannerAlpha * 0.85})`;
    ctx.fillText(subText, w * 0.5, h * 0.13 + titleSize * 1.15 + subSize * 1.6);
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

  paintTreasureCrabBody(ctx, sc, leg);
  drawTreasureChestInCrabSpace(sc, 0);
  drawJackpotCrabChestArms(sc);

  ctx.restore();
}

function drawMagnetTip(hx, hy, v, hs) {
  const cy = hy + dpr * 8 * hs;
  const legW = dpr * 8.5 * hs;
  const legH = dpr * 15 * hs;
  const thick = dpr * 4.4 * hs;
  const t = performance.now() * 0.0045;

  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  for (let i = 0; i < 3; i++) {
    const sway = Math.sin(t + i * 1.4) * dpr * 2.5;
    const arcR = dpr * (10 + i * 5) * hs;
    ctx.strokeStyle = `rgba(167, 139, 250, ${0.22 - i * 0.05})`;
    ctx.lineWidth = 1.2 * dpr;
    ctx.beginPath();
    ctx.arc(hx + sway, cy + dpr * 4 * hs, arcR, Math.PI * 0.15, Math.PI * 0.85);
    ctx.stroke();
  }

  ctx.strokeStyle = v.magnetNorth || "#ef4444";
  ctx.lineWidth = thick;
  ctx.beginPath();
  ctx.moveTo(hx - legW, cy + legH * 0.55);
  ctx.lineTo(hx - legW, cy - legH * 0.2);
  ctx.stroke();

  ctx.strokeStyle = v.magnetSouth || "#3b82f6";
  ctx.beginPath();
  ctx.moveTo(hx + legW, cy + legH * 0.55);
  ctx.lineTo(hx + legW, cy - legH * 0.2);
  ctx.stroke();

  ctx.strokeStyle = v.magnetBody || "#64748b";
  ctx.lineWidth = thick * 0.92;
  ctx.beginPath();
  ctx.arc(hx, cy - legH * 0.2, legW, Math.PI, 0, false);
  ctx.stroke();

  ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
  ctx.beginPath();
  ctx.arc(hx - legW * 0.55, cy - legH * 0.35, dpr * 2.2 * hs, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = v.hookMetal || "#cbd5e1";
  ctx.beginPath();
  ctx.arc(hx, cy - legH * 0.2 - thick * 0.35, dpr * 2.8 * hs, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawHookTip(hx, hy, v, hs) {
  if (v.tipType === "magnet") {
    drawMagnetTip(hx, hy, v, hs);
    return;
  }

  // More realistic J-hook silhouette
  ctx.save();
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = v.hookMetal;
  ctx.lineWidth = 2.4 * dpr * hs;
  ctx.beginPath();
  ctx.moveTo(hx, hy);
  ctx.lineTo(hx, hy + dpr * 10 * hs);
  ctx.quadraticCurveTo(hx, hy + dpr * 18 * hs, hx - dpr * 7 * hs, hy + dpr * 16 * hs);
  ctx.stroke();
  ctx.fillStyle = v.hookBarb;
  ctx.beginPath();
  ctx.moveTo(hx - dpr * 7 * hs, hy + dpr * 16 * hs);
  ctx.lineTo(hx - dpr * 3.5 * hs, hy + dpr * 13.5 * hs);
  ctx.lineTo(hx - dpr * 5.5 * hs, hy + dpr * 18 * hs);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = v.hookMetal;
  ctx.beginPath();
  ctx.arc(hx, hy, dpr * 2.2 * hs, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawHookLine() {
  const hx = hook.x;
  const hy = hook.tipY;
  const topY = lineAnchorY();
  const v = selectedRod.visual;
  drawFishingRod(hx, topY, v, fishingRodBoatCenterX(hook));

  ctx.strokeStyle = v.lineMain;
  ctx.lineWidth = v.lineW * dpr;
  ctx.lineCap = "round";
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
    const wiggle = Math.sin(t * 9) * dpr * 6;
    ctx.strokeStyle = "rgba(120, 22, 18, 0.92)";
    ctx.lineWidth = (v.lineW + 0.65) * dpr;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(hx, hy);
    const midx = (hx + mx) * 0.5 + wiggle;
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
  if (v.tipType === "magnet") {
    ctx.setLineDash([dpr * 5, dpr * 4]);
    ctx.beginPath();
    ctx.arc(hx, hy, R * 0.72, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }
  ctx.beginPath();
  ctx.arc(hx, hy, R, 0, Math.PI * 2);
  ctx.stroke();

  const hs = v.hookScale;
  const tipGlowY = v.tipType === "magnet" ? hy + dpr * 8 * hs : hy + dpr * 12 * hs;
  const tipGlow = ctx.createRadialGradient(hx, tipGlowY, 0, hx, tipGlowY, dpr * 22 * hs);
  tipGlow.addColorStop(0, v.tipGlow);
  tipGlow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = tipGlow;
  ctx.beginPath();
  ctx.arc(hx, tipGlowY, dpr * 18 * hs, 0, Math.PI * 2);
  ctx.fill();

  drawHookTip(hx, hy, v, hs);

  if (getReef().id === "mariana_trench") {
    const lightY = v.tipType === "magnet" ? tipGlowY : hy + dpr * 8 * hs;
    const lightMult = effectiveTrenchLightMult();
    ctx.fillStyle = "#bff7ff";
    ctx.shadowColor = "#67e8f9";
    ctx.shadowBlur = 22 * dpr * Math.min(2.2, lightMult);
    ctx.beginPath();
    ctx.arc(hx, lightY, dpr * 5.8 * hs * Math.min(1.55, lightMult), 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(190, 255, 255, 0.62)";
    ctx.lineWidth = 1.5 * dpr;
    ctx.beginPath();
    ctx.arc(hx, lightY, dpr * 12 * hs * Math.min(1.9, lightMult), 0, Math.PI * 2);
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
  const step = dt / 16;
  for (const f of fishList) {
    if (f.caught) continue;
    f.x += f.vx * step * 1.2;
    const morph = f.spec?.morph || "";
    const scary = isSkullShoalsPlay() && morph === "skullfish";
    const soft = morph === "jellyfish" || morph === "seaturtle";
    const rate = scary ? 0.11 : soft ? 0.05 : 0.088;
    f.phase = (f.phase || 0) + rate * step;
    if (f.homeY == null) f.homeY = f.y;
    // Vertical undulation like splash-screen swim bob
    const amp = f.len * (soft ? 0.04 : 0.07);
    f.y = f.homeY + Math.sin(f.phase) * amp;
  }
  fishList = fishList.filter((f) => {
    if (f.caught && f.removeAt && t >= f.removeAt) return false;
    if (f.caught) return true;
    const maxX = isDuelActive() ? duelPlayerMaxX() + f.len * 2 : w + f.len * 2;
    const minX = isDuelActive() ? -f.len * 2 : -f.len * 2;
    if (f.x < minX || f.x > maxX) return false;
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
  const maxX = isDuelActive() ? duelPlayerMaxX() - margin : w - margin;
  hook.x = Math.max(margin, Math.min(maxX, hook.x));

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

  const menusCoverPlay =
    !playing &&
    !duelSession &&
    !eventMinigameSession &&
    !crabTrapSession &&
    !(appRoot && appRoot.classList.contains("app--matchup"));
  if (menusCoverPlay) {
    requestAnimationFrame(gameLoop);
    return;
  }

  ctx.clearRect(0, 0, w, h);
  drawCachedBackground();
  drawLiveAquaticOverlay();
  if (adventureSession) drawAdventureThemeOverlay(now);
  const bubbleFrame = PERF_CHROMEBOOK ? 2 : 2;
  if (!PERF_CHROMEBOOK || gameLoopTick % bubbleFrame === 0) drawBubbles(treasureMapRevealPaused ? 0 : dt);
  if (!treasureMapRevealPaused) updateJackpotCrab(now, dt);

  if ((playing && treasureMapRevealPaused) || (dailyPrizeCelebrationActive && treasureChestCinematic)) {
    if (playing) roundEndAt += dt;
    updateTreasureChestCinematic(now);
  }

  if (playing) {
    tickKraken(now, treasureMapRevealPaused ? 0 : dt);
    const isSurvivorRound = eventMinigameSession?.kind === "survivor";
    const left = roundEndAt - now;
    if (isSurvivorRound) {
      timeDisplay.textContent = "GO";
      if (adventureGoalLine) {
        adventureGoalLine.hidden = false;
        adventureGoalLine.textContent = survivorAllowsKrakenPack()
          ? `Bonus: ${score} pts · hook a kraken!`
          : `Bonus: ${score} pts · hook the kraken!`;
      }
    } else {
      timeDisplay.textContent = formatTime(left);
      syncUrgentTimerUi(left);
      tickClimaxMusic(now);
    }
    if (!isSurvivorRound && left <= 0) {
      endRound();
    } else {
      if (!treasureMapRevealPaused) {
        spawnAcc += dt;
        const reef = getReef();
        const maxFish = PERF_CHROMEBOOK
          ? Math.max(6, Math.floor(reef.maxFish * (adventureSession ? 0.78 : 0.65)))
          : reef.maxFish;
        if (!isDuelSpectatorSession() && spawnAcc >= nextSpawnIn && countUncaughtFish() < maxFish) {
          spawnFish();
          spawnAcc = 0;
          nextSpawnIn = rollNextSpawnDelay(reef);
        }
        updateFish(dt);
        if (!isDuelSpectatorSession()) updateHook(dt);
        if (isDuelSpectatorSession()) {
          updateDuelSpectatorVisuals(dt);
        } else if (isDuelActive()) {
          updateDuelOpponent(dt, now);
          if (isDuelPvpSession()) scheduleDuelStateSync();
        }
        if (eventMinigameSession?.kind === "coop") {
          updateCoopPartner(now);
          if (isCoopPvpSession()) scheduleCoopScoreSync();
        }
      }
      if (isDuelActive()) {
        drawDuelPlayfield();
        drawCatchFlash();
        drawCelebration();
      } else {
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
    if (dailyPrizeCelebrationActive) drawTreasureChestCinematic();
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
  const maxX = isDuelActive() ? duelPlayerMaxX() - margin : w - margin;
  hook.targetX = Math.max(margin, Math.min(maxX, x));
}

function isClientInPlayerDuelHalf(clientX) {
  if (!isDuelActive()) return true;
  if (isDuelSpectatorSession()) return false;
  if (isDuelSoloView()) return true;
  const rect = canvas.getBoundingClientRect();
  return clientX - rect.left <= rect.width * 0.5;
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
  if (!isClientInPlayerDuelHalf(e.clientX)) return;
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
  if (isDuelActive() && !isClientInPlayerDuelHalf(e.clientX)) return;
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
  if (!isClientInPlayerDuelHalf(e.clientX)) return;
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
    if (!isClientInPlayerDuelHalf(touch.clientX)) return;
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
    if (isDuelActive() && !isClientInPlayerDuelHalf(touch.clientX)) return;
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
    if (!isClientInPlayerDuelHalf(touch.clientX)) return;
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
  if (dailyPrizeCelebrationActive && dailyPrizeReveal && !dailyPrizeReveal.hidden && (e.key === "Enter" || e.key === " " || e.key === "Escape")) {
    const tag = e.target?.tagName;
    if (tag !== "INPUT" && tag !== "TEXTAREA") {
      e.preventDefault();
      if (e.key === "Escape" && dailyPrizePhase === "opened") endDailyPrizeCelebration();
      else advanceDailyPrizeCelebration();
      return;
    }
  }
  if (treasureMapRevealPaused && !dailyPrizeCelebrationActive && (e.key === "Enter" || e.key === " " || e.key === "Escape")) {
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
  if (e.ctrlKey && !e.metaKey && !e.altKey && e.code === "KeyN") {
    const tag = e.target?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || e.target?.isContentEditable) return;
    e.preventDefault();
    resetAsNewPlayer();
    return;
  }
  if (e.ctrlKey && !e.metaKey && !e.altKey && e.code === "KeyR") {
    const tag = e.target?.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || e.target?.isContentEditable) return;
    e.preventDefault();
    restoreProgressBackup();
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
    const maxX = isDuelActive() ? duelPlayerMaxX() - margin : w - margin;
    hook.targetX = Math.min(maxX, hook.targetX);
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
btnShopLaunch?.addEventListener("click", openShop);
btnWorldAdventures?.addEventListener("click", () => {
  stopAdventureMusic();
  showHomePanel();
  if (homeAudioUnlocked) startHomeWaves();
});
btnEvents?.addEventListener("click", openEvents);
btnTourneySignup?.addEventListener("click", () => void submitTourneySignup());
btnTourneyCompete?.addEventListener("click", () => beginTournamentCompetition());
btnCollectables?.addEventListener("click", openCollectables);
document.getElementById("seagullAvatarStart")?.addEventListener("click", () => {
  openProfile();
});
profileNameInput?.addEventListener("change", saveProfileNameFromInput);
profileNameInput?.addEventListener("blur", saveProfileNameFromInput);
profileNameInput?.addEventListener("input", updateProfileNameHint);

btnSignInGoogle?.addEventListener("click", () => {
  void signInWithProvider("google");
});
btnSignInApple?.addEventListener("click", () => {
  void signInWithProvider("apple");
});
btnSignOut?.addEventListener("click", () => {
  void signOutAccount();
});
profileAddFriendForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const code = profileAddFriendInput?.value || "";
  void addFriendByCode(code).finally(() => {
    if (profileAddFriendInput) profileAddFriendInput.value = "";
  });
});
btnEventPrepAnyone?.addEventListener("click", () => {
  pendingEventFriendUserId = null;
  refreshEventPrepFriendsUI();
});
collectablesItems?.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-arm-item]");
  if (!btn) return;
  armChestBoost(btn.dataset.armItem);
});
collectablesWardrobe?.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-equip-clothes]");
  if (!btn) return;
  equipClothingItem(btn.dataset.equipClothes);
});
collectablesFrames?.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-equip-frame]");
  if (!btn) return;
  equipAvatarFrame(btn.dataset.equipFrame);
});
btnStartDuel?.addEventListener("click", () => {
  void startDuelFromEvents();
});
btnRefreshDuelSpectator?.addEventListener("click", () => {
  void refreshDuelSpectatorList();
});
btnDuelPlayAgain?.addEventListener("click", () => openDuelFromResult(true));
btnDuelBackEvents?.addEventListener("click", () => openDuelFromResult(false));
btnEventPrepStart?.addEventListener("click", () => confirmEventPrepStart());
btnEventPrepBack?.addEventListener("click", () => closeEventPrep());

btnStartCrab?.addEventListener("click", () => startCrabTrap());
document.getElementById("btnStartRoulette")?.addEventListener("click", () => beginEventMinigame("roulette"));
document.getElementById("btnStartCoop")?.addEventListener("click", () => beginEventMinigame("coop"));
document.getElementById("btnStartSurvivor")?.addEventListener("click", () => beginEventMinigame("survivor"));
btnDailyCatchClaim?.addEventListener("click", () => showDailyCatchReward());
btnCrabQuit?.addEventListener("click", () => quitCrabTrap());
btnCrabRewardBack?.addEventListener("click", () => returnToEventsFromCrab());
btnCrabPlayAgain?.addEventListener("click", () => crabPlayAgain());
crabRewardChests?.addEventListener("click", (e) => {
  const chest = e.target.closest(".crab-chest");
  if (!chest || chest.disabled) return;
  const idx = Number(chest.dataset.idx);
  if (!Number.isNaN(idx)) onCrabChestPick(idx);
});
crabTrapCanvas?.addEventListener("pointerdown", (e) => {
  if (!crabTrapSession || !crabTrapSession.running) return;
  e.preventDefault();
  const rect = crabTrapCanvas.getBoundingClientRect();
  if (!rect.width || !rect.height) return;
  const x = ((e.clientX - rect.left) / rect.width) * crabTrapW;
  crabTrapDropCage(x);
});

window.addEventListener("resize", () => {
  if (panelEvents && !panelEvents.hidden) refreshDuelEventCard();
});

btnOpenShopGuide?.addEventListener("click", openShopGuide);
btnShopGuideDone?.addEventListener("click", closeShopGuide);
btnToggleMusic?.addEventListener("click", () => {
  void toggleHomeMusic();
});
btnToggleMusic?.addEventListener("pointerdown", () => {
  unlockAudioFromGesture();
  unlockHomeAudio();
});
btnToggleMusic?.addEventListener("touchstart", () => {
  unlockAudioFromGesture();
}, { passive: true });
btnIntroDone?.addEventListener("click", closeIntro);
btnMapSeagullDone?.addEventListener("click", dismissMapSeagullGuide);
btnOpenIntro?.addEventListener("click", () => {
  setStartSettingsOpen(false);
  openIntro();
});
btnResetProgress?.addEventListener("click", () => {
  setStartSettingsOpen(false);
  resetProgress();
});

function setStartSettingsOpen(open) {
  if (!btnStartSettings || !startSettingsMenu) return;
  startSettingsMenu.hidden = !open;
  btnStartSettings.setAttribute("aria-expanded", open ? "true" : "false");
}

function setStartMoreOptionsOpen(open) {
  /* Phone launch buttons stay visible under Start Game; no sheet to toggle. */
  if (panelStart) panelStart.classList.remove("is-more-open");
  if (!open) setStartSettingsOpen(false);
}

function isStartMoreOptionsOpen() {
  return false;
}

btnStartSettings?.addEventListener("click", (e) => {
  e.stopPropagation();
  const open = btnStartSettings.getAttribute("aria-expanded") !== "true";
  setStartSettingsOpen(open);
});

document.addEventListener("pointerdown", (e) => {
  if (btnStartSettings && startSettingsMenu && !startSettingsMenu.hidden) {
    if (!startSettings?.contains(e.target)) setStartSettingsOpen(false);
  }
});

window.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (isDuelSpectatorSession()) {
    leaveDuelSpectator();
    return;
  }
  if (startSettingsMenu && !startSettingsMenu.hidden) setStartSettingsOpen(false);
});

panelStart?.addEventListener("pointerdown", unlockHomeAudio, { once: true });
panelSplash?.addEventListener("pointerdown", (e) => {
  unlockAudioFromGesture();
  e.preventDefault();
  dismissSplashScreen();
});
panelSplash?.addEventListener("touchstart", () => {
  unlockAudioFromGesture();
}, { passive: true });
window.addEventListener("keydown", (e) => {
  if (!isSplashScreenActive()) return;
  if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
    e.preventDefault();
    unlockAudioFromGesture();
    dismissSplashScreen();
  }
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) return;
  refreshSharedBoardsFromServer();
  if (!musicEnabled) return;
  unlockAudioFromGesture();
  void resumeMusicContext().then(() => restartSceneMusic(true));
});
window.addEventListener("pageshow", () => {
  refreshSharedBoardsFromServer();
  if (!musicEnabled) return;
  unlockAudioFromGesture();
  void resumeMusicContext().then(() => restartSceneMusic(true));
});
window.addEventListener("focus", () => {
  refreshSharedBoardsFromServer();
  if (!musicEnabled) return;
  void resumeMusicContext().then(() => restartSceneMusic(true));
});

async function saveCurrentScoreToBoard() {
  if (leaderboardSaveInFlight) return;
  const board = loadLeaderboard();
  if (!qualifiesForLeaderboard(lastRoundScore, board)) return;
  const { initials: ini, name } = resolveScorePlayerIdentity(initialsInput?.value || gameMeta.playerName);
  const pending = {
    initials: ini,
    name,
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
    savedGlobally = await addLeaderboardEntry(ini, lastRoundScore, lastRoundReefId, name);
  } finally {
    leaderboardSaveInFlight = false;
    if (btnSaveScore) btnSaveScore.disabled = false;
  }
  if (initialsPanel) initialsPanel.hidden = true;
  gameMeta.playerInitials = ini;
  if (name) gameMeta.playerName = name;
  saveMeta();
  refreshLeaderboardViews(false);
  showToast(savedGlobally ? "Score saved to all-time top 10" : "Score saved on this device", 1700);
}

async function saveDailyScoreFromGameOver() {
  if (lastRoundScore <= 0) return;
  const { initials: ini, name } = resolveScorePlayerIdentity(dailyInitialsInput?.value || gameMeta.playerName);
  gameMeta.playerInitials = ini;
  if (name) gameMeta.playerName = name;
  saveMeta();
  if (dailyInitialsInput) dailyInitialsInput.value = name || ini;
  if (btnSaveDailyScore) btnSaveDailyScore.disabled = true;
  let submitted = false;
  try {
    submitted = await submitDailyScore(ini, lastRoundScore, lastRoundReefId, name);
  } finally {
    if (btnSaveDailyScore) btnSaveDailyScore.disabled = false;
  }
  updateDailyGameOverStatus(lastRoundScore, submitted);
  if (submitted) {
    showToast("Posted to today's Fisher of the Day board", 1700);
  } else {
    const existing = getPlayerDailyEntryToday(ini);
    if (existing) {
      showToast(`Your best today is ${existing.score} — beat it to climb the board`, 2200);
    } else {
      showToast("Could not post score — try again", 1700);
    }
  }
}

btnSaveScore?.addEventListener("click", saveCurrentScoreToBoard);
initialsInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    saveCurrentScoreToBoard();
  }
});

btnSaveDailyScore?.addEventListener("click", () => {
  void saveDailyScoreFromGameOver();
});
dailyInitialsInput?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    void saveDailyScoreFromGameOver();
  }
});

btnAgain.addEventListener("click", () => {
  if (initialsPanel) initialsPanel.hidden = true;
  if (dailyInitialsPanel) dailyInitialsPanel.hidden = true;
  if (dailyScoreStatus) {
    dailyScoreStatus.hidden = true;
    dailyScoreStatus.textContent = "";
  }
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
btnDailyPrizeContinue?.addEventListener("click", showDailyPrizeChestPhase);
btnDailyPrizeChest?.addEventListener("click", () => {
  if (dailyPrizePhase === "chest") openDailyPrizeChest();
});
btnDailyPrizeRevealDone?.addEventListener("click", endDailyPrizeCelebration);

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
  if (adventureHomeReturnInProgress) return;
  if (isAdventureHomeCelebrationActive() && btnAdventureMode?.classList.contains("adventure-launch--centered")) {
    adventureHomeReturnInProgress = true;
    returnAdventureButtonFromCenter(() => {
      adventureHomeReturnInProgress = false;
      clearAdventureHomeCelebration();
      openAdventureHub();
    });
    return;
  }
  clearAdventureHomeCelebration();
  openAdventureHub();
});

adventureLevelList?.addEventListener("click", (e) => {
  const btn = e.target.closest(".adventure-map-node");
  if (!btn || btn.disabled) return;
  const idx = parseInt(btn.dataset.levelIndex, 10);
  if (!Number.isNaN(idx)) openAdventurePrep(idx);
});

adventurePrepBoosts?.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-arm-item]");
  if (!btn) return;
  armChestBoost(btn.dataset.armItem);
});

btnAdventurePrepStart?.addEventListener("click", () => {
  startAdventureLevel(pendingAdventureLevelIndex);
});

btnAdventurePrepBack?.addEventListener("click", () => {
  openAdventureHub();
});

btnAdventureBack?.addEventListener("click", () => {
  stopAdventureMusic();
  showHomePanel();
  if (homeAudioUnlocked) startHomeWaves();
  startHomeMusic();
});

btnAdventureMapPrev?.addEventListener("click", () => stepAdventureMapPhoneSection(-1));
btnAdventureMapNext?.addEventListener("click", () => stepAdventureMapPhoneSection(1));

if (typeof window !== "undefined" && window.matchMedia) {
  const adventureMapPhoneMql = window.matchMedia("(max-width: 560px)");
  const onAdventureMapPhoneMode = () => {
    applyAdventureMapExtent();
    if (panelAdventure && !panelAdventure.hidden) {
      window.requestAnimationFrame(() => {
        if (!pendingAdventureTrailReveal) syncAdventureMapTrail(false);
        if (!adventureMapPhoneMode()) scrollAdventureMapToProgress(true);
      });
    }
  };
  if (adventureMapPhoneMql.addEventListener) adventureMapPhoneMql.addEventListener("change", onAdventureMapPhoneMode);
  else adventureMapPhoneMql.addListener?.(onAdventureMapPhoneMode);
}

let adventureMapSwipeX = 0;
let adventureMapSwipeY = 0;
adventureMapScroll?.addEventListener("touchstart", (e) => {
  if (!adventureMapPhoneMode() || e.touches.length !== 1) return;
  adventureMapSwipeX = e.touches[0].clientX;
  adventureMapSwipeY = e.touches[0].clientY;
}, { passive: true });
adventureMapScroll?.addEventListener("touchend", (e) => {
  if (!adventureMapPhoneMode() || adventureMapPager?.hidden) return;
  const t = e.changedTouches[0];
  if (!t) return;
  const dx = t.clientX - adventureMapSwipeX;
  const dy = t.clientY - adventureMapSwipeY;
  if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy) * 1.15) return;
  stepAdventureMapPhoneSection(dx < 0 ? 1 : -1);
}, { passive: true });

btnAdventureRetry?.addEventListener("click", () => {
  openAdventurePrep(pendingAdventureLevelIndex);
});

btnAdventureSkipRope?.addEventListener("click", () => {
  useAdventureSkipRope();
});

btnAdventureFailBack?.addEventListener("click", () => {
  openAdventureHub();
});

btnAdventureNext?.addEventListener("click", () => {
  const highest = gameMeta.adventureHighestLevel || 0;
  if (highest < ADVENTURE_LEVEL_COUNT) {
    openAdventurePrep(highest);
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
  if (crabTrapSession) resizeCrabTrapCanvas();
  if (panelAdventure && !panelAdventure.hidden && !pendingAdventureTrailReveal) {
    syncAdventureMapTrail(false);
  }
});

gameMeta = loadMeta();
refreshCollectablesUI();
syncSeagullOutfit();
(function keepProgressBackupFresh() {
  try {
    const hasProgress =
      (gameMeta.coins || 0) > 0 ||
      (gameMeta.totalTreasureChests || 0) > 0 ||
      (gameMeta.adventureHighestLevel || 0) > 0 ||
      hasSeenIntro();
    if (hasProgress) saveProgressBackupBeforeNewPlayerTest();
  } catch {
    /* ignore */
  }
})();
ensureDailyCatchChallenge();
refreshDuelTicketsForToday();
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
startMusicWatchdog();
purgeLegacyLeaderboardCaches();
void bootstrapAuth();
resize();
initBubbles();
(function migrateSeagullShopHintForVeterans() {
  if (!hasSeenIntro() || hasSeenSeagullShopHint() || hasPendingSeagullShopHint()) return;
  const veteran =
    (gameMeta.coins || 0) > 0 ||
    (gameMeta.totalTreasureChests || 0) > 0 ||
    (gameMeta.adventureHighestLevel || 0) > 0;
  if (veteran) markSeagullShopHintSeen();
})();
if (isSplashScreenActive()) {
  syncHomeLaunchButtons();
} else {
  showIntroIfNeeded();
  deferStartupWork();
}
requestAnimationFrame(gameLoop);
