#!/usr/bin/env node
/**
 * Source-level regression guards for Duel Fishing black-screen bugs.
 * Run: node scripts/check-duel-guards.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const gameJs = fs.readFileSync(path.join(root, "game.js"), "utf8");
const stylesCss = fs.readFileSync(path.join(root, "styles.css"), "utf8");

const checks = [];

function check(name, ok, detail = "") {
  checks.push({ name, ok, detail });
}

const beginIdx = gameJs.indexOf("function beginDuelSession");
const beginSlice = beginIdx >= 0 ? gameJs.slice(beginIdx, beginIdx + 5500) : "";
check("beginDuelSession exists", beginIdx >= 0);

const roundEndBeforePlaying =
  beginSlice.includes("roundEndAt = roundStart + DUEL_ROUND_MS") &&
  beginSlice.indexOf("roundEndAt = roundStart + DUEL_ROUND_MS") < beginSlice.indexOf("playing = true");
check(
  "beginDuelSession arms roundEndAt before playing=true",
  roundEndBeforePlaying,
  "Stale timer race ends the duel instantly and blanks the reef",
);

check("repairActiveDuelPlayfield helper exists", gameJs.includes("function repairActiveDuelPlayfield"));
check("duelPlayfieldIsHealthy helper exists", gameJs.includes("function duelPlayfieldIsHealthy"));
check("finalizeDuelPlayStart helper exists", gameJs.includes("function finalizeDuelPlayStart"));
check(
  "hideAllPanels protects active duel",
  /function hideAllPanels\(\)[\s\S]{0,280}isActiveDuelPlay\(\)/.test(gameJs),
);
check(
  "gameLoop recovers tiny playfield",
  gameJs.includes("(w <= 1 || h <= 1)") && gameJs.includes("ensurePlayfieldReady()"),
);
check(
  "canvas is absolutely pinned to play wrap",
  /#gameCanvas\s*\{[\s\S]*?position:\s*absolute;[\s\S]*?inset:\s*0;/.test(stylesCss),
);
check(
  "menus hide canvas unless playing/matchup",
  stylesCss.includes("#app:not(.app--playing):not(.app--matchup) .canvas-wrap"),
);

const failed = checks.filter((c) => !c.ok);
for (const c of checks) {
  const mark = c.ok ? "PASS" : "FAIL";
  console.log(`${mark}  ${c.name}${c.detail && !c.ok ? ` — ${c.detail}` : ""}`);
}

if (failed.length) {
  console.error(`\n${failed.length} duel guard(s) failed.`);
  process.exit(1);
}
console.log(`\nAll ${checks.length} duel guards passed.`);
