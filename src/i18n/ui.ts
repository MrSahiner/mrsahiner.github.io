export const languages = {
  tr: "Türkçe",
  en: "English",
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = "tr";

const tr = {
  "site.title": "Muhammed Salim Şahiner",
  "site.description":
    "Bilgisayar mühendisliği öğrencisi. Full-stack geliştirici; KutliGo ve Coffee Go projeleri, staj deneyimi ve iletişim.",
  "nav.about": "Hakkımda",
  "nav.projects": "Projeler",
  "nav.experience": "Deneyim",
  "nav.contact": "İletişim",
  "nav.skip": "İçeriğe geç",
  "nav.label": "Ana menü",
  "nav.menu": "Menüyü aç/kapat",
  "theme.toggle": "Temayı değiştir",
  "lang.switch": "English",
  "hero.role": "Bilgisayar Mühendisliği Öğrencisi",
  "hero.badge": "Full-stack ve backend fırsatlarına açığım",
  "hero.cta.contact": "İletişime geç",
  "hero.cta.projects": "Projelerim",
  "section.placeholder": "Bu bölüm bir sonraki aşamada doldurulacak.",
  "notFound.title": "Sayfa bulunamadı",
  "notFound.text": "Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.",
  "notFound.home": "Ana sayfaya dön",
  "footer.rights": "Tüm hakları saklıdır.",
} as const;

// İngilizce sözlük Türkçe ile aynı anahtarlara sahip olmak ZORUNDA:
// eksik bir anahtar `astro check` ve dolayısıyla build aşamasında hata verir.
const en: Record<keyof typeof tr, string> = {
  "site.title": "Muhammed Salim Şahiner",
  "site.description":
    "Computer engineering student and full-stack developer. KutliGo and Coffee Go projects, internship experience and contact.",
  "nav.about": "About",
  "nav.projects": "Projects",
  "nav.experience": "Experience",
  "nav.contact": "Contact",
  "nav.skip": "Skip to content",
  "nav.label": "Main menu",
  "nav.menu": "Toggle menu",
  "theme.toggle": "Toggle theme",
  "lang.switch": "Türkçe",
  "hero.role": "Computer Engineering Student",
  "hero.badge": "Open to full-stack and backend opportunities",
  "hero.cta.contact": "Get in touch",
  "hero.cta.projects": "My projects",
  "section.placeholder": "This section will be filled in the next phase.",
  "notFound.title": "Page not found",
  "notFound.text": "The page you are looking for may have moved or never existed.",
  "notFound.home": "Back to home",
  "footer.rights": "All rights reserved.",
};

export const ui = { tr, en } as const;
export type UiKey = keyof typeof tr;
