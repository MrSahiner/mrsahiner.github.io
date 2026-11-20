import type { Lang } from "../i18n/ui";
import type { IconName } from "../components/ui/Icon.astro";

type Localized = Record<Lang, string>;

// Hakkımda sayfasının içeriği (iki dilde). Metni değiştirmek için yalnızca bu dosya düzenlenir.
export const about = {
  role: {
    tr: "Bilgisayar Mühendisliği Öğrencisi · Full-stack Geliştirici",
    en: "Computer Engineering Student · Full-stack Developer",
  } satisfies Localized,
  lead: {
    tr: "Fikirden canlı ortama kadar uçtan uca ürün geliştiriyorum.",
    en: "I build products end to end, from idea to production.",
  } satisfies Localized,
  bio: {
    tr: "Yozgat Bozok Üniversitesi Bilgisayar Mühendisliği 4. sınıf öğrencisiyim. 2026 yazında Intellium Bilişim Teknolojileri'nde yazılım mühendisliği stajyeri ve Scrum Master olarak kurumsal bir görüntülü toplantı platformunda .NET ve React ile çalıştım. Şu anda kurmayı planladığımız Grentra çatısı altında KutliGo ve Coffee Go'yu gereksinim analizinden yayına kadar tek başıma geliştiriyorum.",
    en: "I'm a senior Computer Engineering student at Yozgat Bozok University. In summer 2026 I worked as a software engineering intern and Scrum Master at Intellium Bilişim Teknolojileri on an enterprise video meeting platform with .NET and React. I'm now building KutliGo and Coffee Go on my own under Grentra, the company we are planning to found, from requirements analysis to launch.",
  } satisfies Localized,
  facts: [
    {
      label: { tr: "Eğitim", en: "Education" },
      value: { tr: "Yozgat Bozok Üniversitesi", en: "Yozgat Bozok University" },
    },
    { label: { tr: "Sınıf", en: "Year" }, value: { tr: "4. sınıf · 2027", en: "Senior · 2027" } },
    { label: { tr: "Odak", en: "Focus" }, value: { tr: "Full-stack & Backend", en: "Full-stack & Backend" } },
    {
      label: { tr: "Diller", en: "Languages" },
      value: { tr: "Türkçe · İngilizce (A2–B1)", en: "Turkish · English (A2–B1)" },
    },
  ] satisfies { label: Localized; value: Localized }[],
  principles: [
    {
      icon: "file-text",
      title: { tr: "Önce analiz", en: "Analysis first" },
      text: {
        tr: "Koda başlamadan gereksinimleri, mimariyi ve riskleri yazıya dökerim.",
        en: "Before writing code, I write down the requirements, architecture and risks.",
      },
    },
    {
      icon: "shield-check",
      title: { tr: "Güvenlik baştan", en: "Security from day one" },
      text: {
        tr: "Yetki kontrolü sunucuda, gizli anahtarlar kodun dışında, kişisel veri korumalı.",
        en: "Authorization on the server, secrets out of the code, personal data protected.",
      },
    },
    {
      icon: "git-branch",
      title: { tr: "Küçük ve incelenebilir adımlar", en: "Small, reviewable steps" },
      text: {
        tr: "Her değişikliği kendi dalında, testleriyle ve kod incelemesine hazır gönderirim.",
        en: "Every change goes on its own branch, with tests, ready for code review.",
      },
    },
    {
      icon: "infinity",
      title: { tr: "Uçtan uca sahiplik", en: "End-to-end ownership" },
      text: {
        tr: "Tasarımdan veritabanına, CI'dan yayına kadar ürünün tamamıyla ilgilenirim.",
        en: "From design to database, from CI to release, I take care of the whole product.",
      },
    },
  ] satisfies { icon: IconName; title: Localized; text: Localized }[],
  skills: [
    {
      group: { tr: "Frontend", en: "Frontend" },
      items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Astro"],
    },
    {
      group: { tr: "Backend", en: "Backend" },
      items: ["C#", "ASP.NET Core", "EF Core", "PostgreSQL", "Redis", "Hangfire", "SignalR"],
    },
    { group: { tr: "Mobil", en: "Mobile" }, items: ["React Native", "Expo", "Flutter", "Dart"] },
    {
      group: { tr: "Araçlar ve diğerleri", en: "Tools & more" },
      items: ["Git", "GitHub Actions", "Docker", "xUnit", "Playwright", "Java", "C++", "Figma"],
    },
  ] satisfies { group: Localized; items: string[] }[],
  now: {
    title: { tr: "Grentra'yı kuruyorum", en: "I'm founding Grentra" } satisfies Localized,
    text: {
      tr: "KutliGo'yu Aralık 2026'da yayına, bitirme projem Coffee Go'yu Yozgat'taki pilota hazırlıyorum.",
      en: "I'm getting KutliGo ready to launch in December 2026 and my graduation project Coffee Go ready for its pilot in Yozgat.",
    } satisfies Localized,
  },
};
