// og/ altındaki HTML'lerden paylaşım görsellerini (1200×630) üretir: public/og-tr.png ve public/og-en.png.
// Kullanım: `pnpm og`. Tarayıcı bulunamazsa CHROME_PATH ortam değişkeniyle yolu verin.
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(import.meta.dirname, "..");

const candidates = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

const browser = candidates.find((path) => existsSync(path));
if (!browser) {
  console.error("Chrome veya Edge bulunamadı. CHROME_PATH ile tarayıcı yolunu verin.");
  process.exit(1);
}

for (const lang of ["tr", "en"]) {
  const profile = mkdtempSync(join(tmpdir(), "og-"));
  const target = `public/og-${lang}.png`;
  try {
    execFileSync(
      browser,
      [
        "--headless=new",
        "--disable-gpu",
        "--no-first-run",
        "--hide-scrollbars",
        `--user-data-dir=${profile}`,
        "--window-size=1200,630",
        "--force-device-scale-factor=1",
        "--virtual-time-budget=5000",
        `--screenshot=${join(root, target)}`,
        pathToFileURL(join(root, `og/${lang}.html`)).href,
      ],
      { stdio: "ignore" },
    );
  } finally {
    rmSync(profile, { recursive: true, force: true });
  }
  console.log(`og/${lang}.html → ${target}`);
}
