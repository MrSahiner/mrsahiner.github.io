import type { Lang } from "../i18n/ui";
import type { RouteKey } from "../i18n/routes";
import type { IconName } from "../components/ui/Icon.astro";

export type Category = "web" | "mobile" | "backend";

type Localized = Record<Lang, string>;

export interface Project {
  slug: "kutligo" | "coffee-go";
  route: RouteKey;
  name: string;
  meta: Localized;
  status: Localized;
  pitch: Localized;
  features: { icon: IconName; text: Localized }[];
  tags: string[];
  categories: Category[];
}

// Proje içerikleri: her iki dil burada. Sayfalar (Projeler ve detay) bu listeden üretilir.
export const projects: Project[] = [
  {
    slug: "kutligo",
    route: "projectKutligo",
    name: "KutliGo",
    meta: { tr: "Grentra · 2026 · Web", en: "Grentra · 2026 · Web" },
    status: { tr: "Geliştiriliyor · MVP Aralık 2026", en: "In development · MVP December 2026" },
    pitch: {
      tr: "Düğün, nişan ve kına için dijital davetiye ve QR fotoğraf albümü.",
      en: "Digital invitations and a QR photo album for weddings and engagements.",
    },
    features: [
      {
        icon: "file-text",
        text: {
          tr: "Şablonla davetiye ve hesapsız LCV",
          en: "Template-based invitations and RSVP without an account",
        },
      },
      {
        icon: "scan",
        text: {
          tr: "QR ile uygulama indirmeden fotoğraf yükleme",
          en: "Photo uploads via QR, no app download needed",
        },
      },
      {
        icon: "sparkles",
        text: {
          tr: "Yapay zekâ ile en iyi karelerden albüm önerisi",
          en: "AI-suggested album from the best shots",
        },
      },
    ],
    tags: ["Next.js", "TypeScript", "ASP.NET Core", "PostgreSQL", "Redis", "Cloudflare R2"],
    categories: ["web", "backend"],
  },
  {
    slug: "coffee-go",
    route: "projectCoffeego",
    name: "Coffee Go",
    meta: { tr: "Grentra · 2026 · Mobil & Web", en: "Grentra · 2026 · Mobile & Web" },
    status: { tr: "Tasarım aşamasında · Pilot: Yozgat", en: "In design · Pilot: Yozgat" },
    pitch: {
      tr: "Kafe ve restoranların QR menülerini ziyaretçinin dilinde gösteren uygulama.",
      en: "Shows café and restaurant QR menus in the visitor's own language.",
    },
    features: [
      {
        icon: "languages",
        text: { tr: "QR okutunca menü otomatik çevrilir", en: "Scan the QR and the menu is translated" },
      },
      {
        icon: "map",
        text: {
          tr: "Yakındaki mekanları harita ve listede keşfet",
          en: "Discover nearby places on a map and list",
        },
      },
      {
        icon: "shield-check",
        text: {
          tr: "Doğrulanmış ziyarete bağlı, sahte puana karşı korumalı değerlendirme",
          en: "Reviews tied to verified visits, protected against fake ratings",
        },
      },
    ],
    tags: ["React Native", "React", "ASP.NET Core", "PostgreSQL + PostGIS", "DeepL"],
    categories: ["mobile", "web", "backend"],
  },
];
