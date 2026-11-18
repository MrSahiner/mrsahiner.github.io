# mrsahiner.com

Muhammed Salim Şahiner'in kişisel portfolyo sitesi. Astro ile üretilen statik bir site; Cloudflare Pages üzerinde yayınlanır.

## Teknolojiler

| Alan    | Seçim                                                                              |
| ------- | ---------------------------------------------------------------------------------- |
| Çatı    | Astro 7, TypeScript (strictest)                                                    |
| Stil    | Tailwind CSS v4; renkler `src/styles/global.css` içinde CSS değişkeni              |
| Fontlar | Inter, Cormorant Garamond, JetBrains Mono (`@fontsource`, kendi sunucumuzdan)      |
| Çok dil | Türkçe varsayılan (`/`), İngilizce `/en`; metinler `src/i18n/ui.ts`                |
| Hosting | Cloudflare Pages                                                                   |
| Kalite  | `astro check`, Prettier, `pnpm audit`; GitHub Actions (`.github/workflows/ci.yml`) |

## Geliştirme

Gereksinimler: Node.js 22.12+ ve pnpm.

```bash
pnpm install
pnpm dev
```

Site http://localhost:4321 adresinde açılır.

| Komut          | Ne yapar                                                 |
| -------------- | -------------------------------------------------------- |
| `pnpm dev`     | Geliştirme sunucusu                                      |
| `pnpm build`   | Tip kontrolü (`astro check`) + `dist/` klasörüne derleme |
| `pnpm preview` | Derlenmiş siteyi yerelde sunar                           |
| `pnpm format`  | Prettier ile biçimlendirme                               |

## Klasör yapısı

```
public/            olduğu gibi kopyalanan dosyalar (_headers, robots.txt, theme.js, favicon)
src/components/    Header (mobil menü dahil), Footer, HomePage
src/components/ui/ tasarım sistemi: Button, Card, Tag, Badge, Section, Container, Icon
src/design/        kontrast hesabı (WCAG)
src/i18n/          dil sözlükleri ve yardımcılar
src/layouts/       BaseLayout (meta etiketleri, hreflang, tema)
src/pages/         sayfalar: / , /en/ , 404, /tasarim
src/styles/        global.css (tema renkleri ve fontlar)
```

## Tasarım sistemi

- Renklerin tek kaynağı `src/styles/global.css`. Aydınlık tema `:root`, karanlık tema `[data-theme="dark"]` bloğunda.
- `/tasarim` sayfası renkleri, kontrast oranlarını, yazı tiplerini ve bileşenleri gösterir (arama motorlarına kapalı).
- Metin renk çiftlerinden biri WCAG AA sınırının (4,5:1) altına düşerse **build hata verir**. Çiftler `src/design/contrast.ts` içinde.
- `--accent` yalnızca süs içindir (çizgi, nokta, ikon); metinde kullanılmaz.

## Yayın (Cloudflare Pages)

| Ayar              | Değer               |
| ----------------- | ------------------- |
| Framework preset  | Astro               |
| Build command     | `pnpm run build`    |
| Output directory  | `dist`              |
| Production branch | `main`              |
| Ortam değişkeni   | `NODE_VERSION = 22` |

## Güvenlik

- Güvenlik başlıkları (CSP, HSTS, X-Frame-Options vb.) `public/_headers` dosyasındadır.
- CSP satır içi script ve stile izin vermez. Bu yüzden Astro'da `inlineStylesheets: "never"` ayarlıdır ve tema script'i `public/theme.js` olarak harici yüklenir. Sayfaya `<script>` eklerken satır içi kalmadığından emin olun.
- Gizli değerler (Turnstile anahtarı, e-posta adresi) repoya eklenmez; Cloudflare ortam değişkenlerinde şifreli tutulur.
