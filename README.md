# mrsahiner.com

Muhammed Salim Şahiner'in kişisel portfolyo sitesi. Astro ile üretilen statik bir site; şu an GitHub Pages'te (https://mrsahiner.github.io) yayınlanır.

## Teknolojiler

| Alan    | Seçim                                                                              |
| ------- | ---------------------------------------------------------------------------------- |
| Çatı    | Astro 7, TypeScript (strictest)                                                    |
| Stil    | Tailwind CSS v4; renkler `src/styles/global.css` içinde CSS değişkeni              |
| Fontlar | Inter, Cormorant Garamond, JetBrains Mono (`@fontsource`, kendi sunucumuzdan)      |
| Çok dil | Türkçe varsayılan (`/`), İngilizce `/en`; metinler `src/i18n/ui.ts`                |
| Hosting | GitHub Pages (`.github/workflows/deploy.yml`); Cloudflare Pages yedek              |
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
src/components/    Header (mobil menü dahil), Footer, HomePage, SubPage
src/components/home/ ana sayfa: Hero (yörüngeler), Bento (gezinme kartları), TechMarquee
src/components/projects/ Projeler sayfası, proje vitrinleri, mockup'lar ve proje detay sayfası
src/data/          proje içerikleri (iki dilde): yeni proje eklemek için projects.ts
src/components/ui/ tasarım sistemi: Button, Card, Tag, Badge, Section, Container, Icon
src/design/        kontrast hesabı (WCAG)
src/i18n/          dil sözlükleri, iki dilli sayfa adresleri (routes.ts) ve yardımcılar
src/layouts/       BaseLayout (meta etiketleri, hreflang, tema)
src/pages/         sayfalar: / , /hakkimda, /projeler (+ /kutligo, /coffee-go), /deneyim, /iletisim (+ /en/ karşılıkları), 404, /tasarim
src/scripts/       etkileşimler: interactions.ts (ana sayfa), projects.ts (filtreler, kaydırınca belirme, mockup derinliği)
src/styles/        global.css (tema renkleri ve fontlar)
```

## Tasarım sistemi

- Renklerin tek kaynağı `src/styles/global.css`. Aydınlık tema `:root`, karanlık tema `[data-theme="dark"]` bloğunda.
- `/tasarim` sayfası renkleri, kontrast oranlarını, yazı tiplerini ve bileşenleri gösterir (arama motorlarına kapalı).
- Metin renk çiftlerinden biri WCAG AA sınırının (4,5:1) altına düşerse **build hata verir**. Çiftler `src/design/contrast.ts` içinde.
- `--accent` yalnızca süs içindir (çizgi, nokta, ikon); metinde kullanılmaz.
- `--spotlight-*` renkleri temanın tersine boyanan "spot" kart içindir (ana sayfadaki Projeler kartı).

## Hareket

- Açılış animasyonları (isim, yörüngeler, gezegenler, kartlar) yalnızca CSS'tir.
- Kart eğilmesi, imleç ışığı, mıknatıs butonlar ve hero'daki fare derinliği yalnızca fare kullanan cihazlarda çalışır (`src/scripts/interactions.ts`).
- Kartlar imlece göre bir bütün olarak eğilir; yalnızca imleç üzerindeyken 3D'dedir, imleç çıkınca `transform: none`'a döner ve yazı yeniden tam net çizilir. Diğer hareketli yazılarda büyütme yerine tam piksel kaydırma kullanılır.
- Teknoloji gezegenleri SVG'deki yörünge elipsleri üzerinde döner (elips değerleri `interactions.ts` içindeki `ORBITS` ile aynı olmalı). Her zaman yazının (isim ve rol satırı) arkasından geçer; tutup çekince durur ve öne çıkar, bırakınca yörüngeye döner.
- Sayfa geçişleri tarayıcının kendi view transition özelliğiyle yapılır; ana sayfadaki kart başlığı ile alt sayfanın başlığı aynı `view-transition-name`'i taşır.
- Tema değişimi düğmeden dışarı doğru büyüyen bir daireyle açılır (`public/theme.js`).
- "Hareketi azalt" tercihinde bütün animasyonlar kapanır ve içerik doğrudan son haliyle görünür.

## Yayın

**GitHub Pages (şu anki adres):** `main` dalına her gönderimde `.github/workflows/deploy.yml` siteyi derleyip https://mrsahiner.github.io adresine yayınlar. Site adresi `astro.config.mjs` içindeki `site` değeridir; canonical, hreflang, site haritası ve `robots.txt` buradan üretilir.

**Cloudflare Pages (domain alınınca):** Proje bağlı durumda, `mrsahiner.pages.dev` adresinde de yayınlanır. Domain bağlandığında `site` değerini `https://mrsahiner.com` yapmak ve GitHub Pages iş akışını kaldırmak yeterlidir.

| Ayar              | Değer               |
| ----------------- | ------------------- |
| Framework preset  | Astro               |
| Build command     | `pnpm run build`    |
| Output directory  | `dist`              |
| Production branch | `main`              |
| Ortam değişkeni   | `NODE_VERSION = 22` |

## Güvenlik

- Güvenlik başlıkları (CSP, HSTS, X-Frame-Options vb.) `public/_headers` dosyasındadır; bu dosyayı yalnızca Cloudflare Pages okur.
- GitHub Pages özel başlık desteklemediği için CSP ve Referrer-Policy ayrıca `<meta>` etiketiyle verilir (`src/security/csp.ts`). Meta etiketinde `frame-ancestors` çalışmaz ve X-Frame-Options verilemez; bu ikisi ancak Cloudflare'e geçince devreye girer.
- CSP satır içi script ve stile izin vermez. Bu yüzden Astro'da `inlineStylesheets: "never"` ayarlıdır ve tema script'i `public/theme.js` olarak harici yüklenir. Sayfaya `<script>` eklerken satır içi kalmadığından emin olun.
- Gizli değerler (Turnstile anahtarı, e-posta adresi) repoya eklenmez; Cloudflare ortam değişkenlerinde şifreli tutulur.
