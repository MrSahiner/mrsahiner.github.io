import type { Lang } from "../i18n/ui";
import type { RouteKey } from "../i18n/routes";

type Localized = Record<Lang, string>;

export interface ExperienceEntry {
  id: string;
  /** Kartın görünümü: "spotlight" ters renkli, "surface" beyaz, "soft" yumuşak vurgu. */
  variant: "spotlight" | "surface" | "soft";
  date: Localized;
  /** Masaüstünde tarihin altındaki kısa not. */
  note: Localized;
  title: Localized;
  role: Localized;
  badge?: Localized;
  bullets: Localized[];
  text?: Localized;
  links?: { label: string; route: RouteKey }[];
  tags: string[];
}

// Deneyim zaman çizelgesi (en yeni üstte). Staj bilgisi gizlilik taahhüdü gereği yalnızca rol, görev ve teknolojidir.
export const experience: ExperienceEntry[] = [
  {
    id: "grentra",
    variant: "spotlight",
    date: { tr: "2026 — Devam ediyor", en: "2026 — Present" },
    note: { tr: "Girişim & ürün", en: "Startup & product" },
    title: { tr: "Grentra", en: "Grentra" },
    role: {
      tr: "Kurucu ortak · Ürün geliştirme (kuruluş aşamasında)",
      en: "Co-founder · Product development (being founded)",
    },
    badge: { tr: "Aktif geliştirme", en: "In active development" },
    bullets: [
      {
        tr: "KutliGo ve Coffee Go'yu gereksinim analizinden yayına kadar tek başıma geliştiriyorum.",
        en: "I build KutliGo and Coffee Go on my own, from requirements analysis to launch.",
      },
      {
        tr: "Mimari, veritabanı tasarımı, arayüz, CI/CD ve sunucu kurulumu.",
        en: "Architecture, database design, interface, CI/CD and server setup.",
      },
    ],
    links: [
      { label: "KutliGo", route: "projectKutligo" },
      { label: "Coffee Go", route: "projectCoffeego" },
    ],
    tags: ["Next.js", "React Native", "ASP.NET Core", "PostgreSQL", "Docker"],
  },
  {
    id: "intellium",
    variant: "surface",
    date: { tr: "29 Haziran — 10 Ağustos 2026", en: "29 June — 10 August 2026" },
    note: { tr: "Yaz stajı · 30 iş günü", en: "Summer internship · 30 working days" },
    title: { tr: "Intellium Bilişim Teknolojileri", en: "Intellium Bilişim Teknolojileri" },
    role: { tr: "Full-stack Stajyer · 30 iş günü", en: "Full-stack Intern · 30 working days" },
    bullets: [
      {
        tr: "Kurumsal bir görüntülü toplantı ve mesajlaşma platformunda web arayüzü ve sunucu tarafı ekipleriyle çalıştım.",
        en: "Worked with the web and server-side teams on an enterprise video meeting and messaging platform.",
      },
      {
        tr: "Toplantıya katılım, kayıtlar ve onay akışları gibi kullanıcıyı doğrudan etkileyen hataları çözdüm.",
        en: "Fixed user-facing bugs in meeting access, recordings and consent flows.",
      },
      {
        tr: "Doküman ekleme, arşivleme ve saklama politikası, oda erişim kontrolü ve sohbet özellikleri geliştirdim.",
        en: "Built meeting documents, archiving and retention policy, room access control and chat features.",
      },
      {
        tr: "Kod inceleme süreciyle özellik dallarında çalıştım; performans, ağ ve güvenlik konularında tasarım belgeleri hazırladım.",
        en: "Worked on feature branches through code review; wrote design documents on performance, networking and security.",
      },
    ],
    tags: [
      ".NET",
      "Entity Framework Core",
      "PostgreSQL",
      "SignalR",
      "WebRTC",
      "React",
      "TypeScript",
      "Docker",
    ],
  },
  {
    id: "bozok",
    variant: "soft",
    date: { tr: "Beklenen mezuniyet 2027", en: "Expected graduation 2027" },
    note: { tr: "Lisans eğitimi", en: "Bachelor's degree" },
    title: { tr: "Yozgat Bozok Üniversitesi", en: "Yozgat Bozok University" },
    role: {
      tr: "Bilgisayar Mühendisliği · Lisans, 4. sınıf",
      en: "Computer Engineering · B.Sc., senior year",
    },
    bullets: [],
    text: {
      tr: "Nesneye yönelik programlama, veri tabanı yönetim sistemleri, bilgisayar ağları, işletim sistemleri ve yazılım mühendisliği.",
      en: "Object-oriented programming, database management systems, computer networks, operating systems and software engineering.",
    },
    tags: [],
  },
];

export const experienceInfo: { label: Localized; value: Localized; dot?: boolean }[] = [
  {
    label: { tr: "Diller", en: "Languages" },
    value: { tr: "Türkçe (ana dil) · İngilizce (A2–B1)", en: "Turkish (native) · English (A2–B1)" },
  },
  { label: { tr: "Odak", en: "Focus" }, value: { tr: "Full-stack & Backend", en: "Full-stack & Backend" } },
  {
    label: { tr: "Durum", en: "Status" },
    value: {
      tr: "Full-stack ve backend fırsatlarına açığım",
      en: "Open to full-stack and backend opportunities",
    },
    dot: true,
  },
];
