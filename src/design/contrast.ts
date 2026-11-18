// WCAG 2.2 kontrast oranı hesabı ve global.css'teki renk değişkenlerinin okunması.
// Tasarım sayfası bu dosyayı kullanır; metin çiftlerinden biri AA sınırının altına düşerse build hata verir.

export type Theme = "light" | "dark";
export type Palette = Record<string, string>;

/** global.css içindeki :root (aydınlık) ve [data-theme="dark"] bloklarındaki #rrggbb değişkenlerini okur. */
export function parsePalettes(css: string): Record<Theme, Palette> {
  const block = (selector: string): Palette => {
    const start = css.indexOf(`${selector} {`);
    if (start === -1) throw new Error(`global.css içinde "${selector}" bloğu bulunamadı`);
    const body = css.slice(start, css.indexOf("}", start));
    const palette: Palette = {};
    for (const match of body.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})\s*;/gi)) {
      const [, name, hex] = match;
      if (name && hex) palette[name] = hex.toLowerCase();
    }
    return palette;
  };
  return { light: block(":root"), dark: block('[data-theme="dark"]') };
}

function luminance(hex: string): number {
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r = 0, g = 0, b = 0] = channels.map((c) =>
    c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}

/** Metin olarak kullanılan renk çiftleri ve gereken en düşük oran (WCAG AA: normal metin 4.5, büyük metin/ikon 3). */
export const textPairs = [
  { fg: "foreground", bg: "background", min: 4.5, use: "Ana metin" },
  { fg: "foreground", bg: "surface", min: 4.5, use: "Kart içi metin" },
  { fg: "muted", bg: "background", min: 4.5, use: "İkincil metin" },
  { fg: "muted", bg: "surface", min: 4.5, use: "Kart içi ikincil metin" },
  { fg: "primary", bg: "background", min: 4.5, use: "Bağlantı" },
  { fg: "primary-foreground", bg: "primary", min: 4.5, use: "Birincil buton yazısı" },
  { fg: "primary-foreground", bg: "primary-hover", min: 4.5, use: "Birincil buton (üzerine gelince)" },
  { fg: "foreground", bg: "accent-soft", min: 4.5, use: "Teknoloji etiketi" },
  { fg: "danger", bg: "background", min: 4.5, use: "Hata mesajı" },
  { fg: "accent", bg: "background", min: 0, use: "Vurgu (yalnızca süs, metinde kullanılmaz)" },
] as const;
