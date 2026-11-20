// cv/ altındaki HTML'lerden public/cv.pdf ve public/cv-en.pdf üretir (başsız Chrome veya Edge ile).
// Kullanım: `pnpm cv`. Tarayıcı bulunamazsa CHROME_PATH ortam değişkeniyle yolu verin.
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

const outputs = [
  { source: "cv/tr.html", target: "public/cv.pdf" },
  { source: "cv/en.html", target: "public/cv-en.pdf" },
];

for (const { source, target } of outputs) {
  // Her çalıştırmada geçici profil: kullanıcının açık tarayıcısıyla çakışmaz.
  const profile = mkdtempSync(join(tmpdir(), "cv-"));
  try {
    execFileSync(
      browser,
      [
        "--headless=new",
        "--disable-gpu",
        "--no-first-run",
        `--user-data-dir=${profile}`,
        "--no-pdf-header-footer",
        "--virtual-time-budget=5000",
        `--print-to-pdf=${join(root, target)}`,
        pathToFileURL(join(root, source)).href,
      ],
      { stdio: "ignore" },
    );
  } finally {
    rmSync(profile, { recursive: true, force: true });
  }
  console.log(`${source} → ${target}`);
}
