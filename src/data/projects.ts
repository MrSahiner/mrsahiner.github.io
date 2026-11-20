import type { Lang } from "../i18n/ui";
import type { RouteKey } from "../i18n/routes";
import type { IconName } from "../components/ui/Icon.astro";
import type { ImageMetadata } from "astro";

import cgMenuTr from "../assets/projects/coffee-go/menu-tr.png";
import cgMenuEn from "../assets/projects/coffee-go/menu-en.png";
import cgMenuLocal from "../assets/projects/coffee-go/menu-en-yoresel.png";
import cgOrders from "../assets/projects/coffee-go/panel-siparisler.png";
import cgTranslations from "../assets/projects/coffee-go/panel-ceviri.png";
import cgStats from "../assets/projects/coffee-go/panel-istatistik.png";
import cgMenuPanel from "../assets/projects/coffee-go/panel-menu.png";
import kgInvitation from "../assets/projects/kutligo/davetiye.png";
import kgRsvp from "../assets/projects/kutligo/davetiye-lcv.png";
import kgCreate from "../assets/projects/kutligo/olustur.png";
import kgTemplates from "../assets/projects/kutligo/sablon.png";

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
  /** Detay sayfasındaki teknik öne çıkanlar. */
  highlights: Localized[];
  /** Ekran görüntüleri: yerel geliştirme ortamında, örnek verilerle alındı. */
  screens: Screen[];
  /** Kartlardaki önizleme: geniş ekran ve üstüne binen telefon ekranı. */
  cover: { desktop: ImageMetadata; phone: ImageMetadata };
  /** Herkese açık örnek kod reposu (varsa). */
  sampleRepo?: string;
}

/** Coffee Go'nun çeviri hattından sadeleştirilmiş, herkese açık örnek. */
export const codeSampleUrl = "https://github.com/MrSahiner/menu-translation-pipeline";

export interface Screen {
  image: ImageMetadata;
  /** "mobile" telefon oranında, "desktop" geniş ekran. */
  kind: "mobile" | "desktop";
  caption: Localized;
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
    cover: { desktop: kgTemplates, phone: kgInvitation },
    highlights: [
      {
        tr: "Davetiye sayfası sunucuda oluşturulur; misafir uygulama indirmeden ve hesap açmadan açar, LCV verir.",
        en: "The invitation page is rendered on the server; guests open it and RSVP without an app or an account.",
      },
      {
        tr: "Şablon motoru: davetiyeler JSON tasarım dosyalarından üretilir; düğün, nişan, kına ve diğer etkinlikler.",
        en: "Template engine: invitations are generated from JSON design files for weddings, engagements, henna nights and more.",
      },
      {
        tr: "Ödeme öncesi önizleme ve davetiye bağlantısının yayına kadar kilitlenmesi.",
        en: "Preview before payment, with the invitation link locked until it is published.",
      },
      {
        tr: "ASP.NET Core (.NET 10), onion mimarisi ve CQRS; PostgreSQL, Redis + HybridCache, Hangfire.",
        en: "ASP.NET Core (.NET 10) with onion architecture and CQRS; PostgreSQL, Redis + HybridCache, Hangfire.",
      },
      {
        tr: "100+ otomatik test; kabul kriterlerine göre yazılmış Playwright testleri iPhone (WebKit) ve Android (Chromium) görünümünde çalışır.",
        en: "100+ automated tests; Playwright tests written from acceptance criteria run in iPhone (WebKit) and Android (Chromium) viewports.",
      },
    ],
    screens: [
      {
        image: kgInvitation,
        kind: "mobile",
        caption: { tr: "Misafirin telefonunda açılan davetiye", en: "The invitation on a guest's phone" },
      },
      {
        image: kgRsvp,
        kind: "mobile",
        caption: { tr: "Hesap açmadan LCV formu", en: "RSVP form, no account needed" },
      },
      {
        image: kgCreate,
        kind: "desktop",
        caption: {
          tr: "Etkinlik türünü seçerek davetiye oluşturma",
          en: "Creating an invitation by choosing the event type",
        },
      },
      {
        image: kgTemplates,
        kind: "desktop",
        caption: { tr: "Şablon önizlemeleri", en: "Template previews" },
      },
    ],
  },
  {
    slug: "coffee-go",
    route: "projectCoffeego",
    name: "Coffee Go",
    meta: { tr: "Grentra · 2026 · Mobil & Web", en: "Grentra · 2026 · Mobile & Web" },
    status: {
      tr: "Geliştiriliyor · Bitirme projesi · Pilot: Yozgat",
      en: "In development · Graduation project · Pilot: Yozgat",
    },
    pitch: {
      tr: "Kafe ve restoranlar için çok dilli QR menü, doğrulanmış yorum, sadakat kartı ve masadan siparişi bir araya getiren uygulama.",
      en: "Brings multilingual QR menus, verified reviews, loyalty cards and table ordering together for cafés and restaurants.",
    },
    features: [
      {
        icon: "languages",
        text: {
          tr: "QR okutunca menü 28 dilden birine çevrilir, yöresel yemek adları korunur",
          en: "Scan the QR and the menu appears in one of 28 languages, keeping local dish names",
        },
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
    tags: ["React Native", "React", "ASP.NET Core", "PostgreSQL + PostGIS", "Redis", "DeepL"],
    categories: ["mobile", "web", "backend"],
    cover: { desktop: cgOrders, phone: cgMenuEn },
    sampleRepo: codeSampleUrl,
    highlights: [
      {
        tr: "Katmanlı ziyaret doğrulama: masadaki QR, PostGIS ile ≤100 m konum kontrolü ve Firebase App Check; saatte bir çalışan dört kurallı şüpheli puan tespiti.",
        en: "Layered visit verification: table QR, a PostGIS location check (≤100 m) and Firebase App Check; hourly four-rule suspicious-rating detection.",
      },
      {
        tr: "Çok dilli içerik hattı: DeepL ile istek üzerine çeviri, şehre özel sözlükle yöresel yemek adlarının korunması; işletmenin düzelttiği çeviri otomatik çeviriyle ezilmez.",
        en: "Multilingual content pipeline: on-demand DeepL translation and a city glossary that keeps local dish names; translations corrected by the business are never overwritten.",
      },
      {
        tr: "İki katmanlı önbellek (bellek + Redis): menünün bir dilde ilk açılışı 1,5 sn, sonraki açılışları 0,02 sn.",
        en: "Two-level cache (memory + Redis): a menu takes 1.5 s the first time it opens in a language, 0.02 s after that.",
      },
      {
        tr: "Masadan sipariş panele anlık düşer, müşteri notu işletmenin diline çevrilir; sadakat kartı ve zamanlanmış kampanyalar.",
        en: "Table orders reach the panel in real time, with the guest's note translated for the staff; loyalty cards and scheduled campaigns.",
      },
      {
        tr: "470+ otomatik test; entegrasyon testleri Testcontainers ile gerçek PostgreSQL/PostGIS üzerinde, her pull request'te CI.",
        en: "470+ automated tests; integration tests run on real PostgreSQL/PostGIS via Testcontainers, with CI on every pull request.",
      },
    ],
    screens: [
      {
        image: cgMenuTr,
        kind: "mobile",
        caption: {
          tr: "QR menü, işletmenin girdiği dilde",
          en: "The QR menu in the business's own language",
        },
      },
      {
        image: cgMenuEn,
        kind: "mobile",
        caption: {
          tr: "Aynı menü İngilizce; alerjen ve vejetaryen işaretleriyle",
          en: "The same menu in English, with allergen and vegetarian labels",
        },
      },
      {
        image: cgMenuLocal,
        kind: "mobile",
        caption: {
          tr: "Yöresel yemek adları çeviride korunur",
          en: "Local dish names are kept in translation",
        },
      },
      {
        image: cgOrders,
        kind: "desktop",
        caption: { tr: "Panelde canlı masa siparişleri", en: "Live table orders in the panel" },
      },
      {
        image: cgTranslations,
        kind: "desktop",
        caption: {
          tr: "Makine çevirilerini inceleme ve düzeltme",
          en: "Reviewing and correcting machine translations",
        },
      },
      {
        image: cgStats,
        kind: "desktop",
        caption: {
          tr: "Menü açılışları, ziyaretçiler ve dil dağılımı",
          en: "Menu opens, visitors and language breakdown",
        },
      },
      {
        image: cgMenuPanel,
        kind: "desktop",
        caption: { tr: "Menü, fiyat ve alerjen yönetimi", en: "Managing the menu, prices and allergens" },
      },
    ],
  },
];
