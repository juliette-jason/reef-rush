/**
 * Capture a real Great Barrier Reef playframe for OG preview.
 */
const { chromium } = require("playwright");
const path = require("path");

const OUT = path.join(__dirname, "..", "assets", "og-playing.png");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 1,
  });

  await page.goto("https://reef-rush.com/?v=og-capture", {
    waitUntil: "networkidle",
    timeout: 90000,
  });

  // Dismiss splash
  await page.waitForSelector("#panelSplash", { state: "visible", timeout: 30000 });
  await page.click("#panelSplash");
  await page.waitForSelector("#panelStart:not([hidden])", { timeout: 30000 });
  await page.waitForTimeout(800);

  // Ensure Great Barrier Reef is selected if a reef control exists
  await page.evaluate(() => {
    try {
      // Prefer Australia / Great Barrier Reef if game APIs exist
      if (typeof REEFS !== "undefined" && typeof selectReefFromMap === "function") {
        const gbr = REEFS.find((r) => r.id === "australia" || /barrier/i.test(r.name));
        if (gbr) selectReefFromMap(gbr.id);
      } else if (typeof gameMeta !== "undefined") {
        gameMeta.selectedReefId = "australia";
        if (typeof saveMeta === "function") saveMeta();
      }
    } catch (e) {
      console.warn(e);
    }
  });
  await page.waitForTimeout(400);

  // Start fishing
  const start = page.locator("#btnStart, .btn--start").first();
  await start.click({ timeout: 15000 });
  await page.waitForTimeout(2500);

  // Wait until play canvas is active
  await page.waitForFunction(
    () => {
      const app = document.getElementById("app");
      return app && app.classList.contains("app--playing");
    },
    { timeout: 20000 },
  ).catch(() => {});

  await page.waitForTimeout(1800);

  // Hide toast / overlays that aren't part of play
  await page.evaluate(() => {
    document.querySelectorAll(".toast, .map-seagull, #dailyPrizeReveal").forEach((el) => {
      el.hidden = true;
      el.style.display = "none";
    });
  });

  await page.screenshot({ path: OUT, type: "png" });
  console.log("wrote", OUT);
  await browser.close();
})().catch(async (err) => {
  console.error(err);
  process.exit(1);
});
