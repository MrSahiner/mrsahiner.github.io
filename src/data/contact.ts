import type { Lang } from "../i18n/ui";

type Localized = Record<Lang, string>;

/**
 * İletişim formu Web3Forms (https://web3forms.com) üzerinden e-postaya iletilir.
 * Erişim anahtarı gizli değildir (sayfada görünür); web3forms.com'da e-posta adresiyle alınır.
 * Anahtar boşken form gönderilemez ve ziyaretçiye GitHub/LinkedIn üzerinden ulaşması söylenir.
 */
export const contactForm = {
  endpoint: "https://api.web3forms.com/submit",
  accessKey: "e32b6274-e13f-4dc6-ae77-72f49da5473b",
  maxMessage: 2000,
};

export const contactText = {
  eyebrow: { tr: "04 / Bağlantı", en: "04 / Connect" },
  intro: {
    tr: "Bir proje, ürün fikri ya da iş birliği hakkında konuşmak veya sadece merhaba demek için yazın.",
    en: "Write about a project, a product idea or a collaboration, or just to say hello.",
  },
  formLabel: { tr: "Mesaj gönder", en: "Send a message" },
  name: { tr: "Adınız", en: "Your name" },
  namePlaceholder: { tr: "Adınız ve soyadınız", en: "Your full name" },
  email: { tr: "E-posta adresiniz", en: "Your email address" },
  emailPlaceholder: { tr: "E-posta adresinizi yazın", en: "Type your email address" },
  topic: { tr: "Konu", en: "Topic" },
  topics: [
    { value: "freelance", label: { tr: "Freelance proje", en: "Freelance project" } },
    { value: "is-birligi", label: { tr: "İş birliği", en: "Collaboration" } },
    { value: "proje", label: { tr: "Proje", en: "Project" } },
    { value: "diger", label: { tr: "Diğer", en: "Other" } },
  ],
  message: { tr: "Mesajınız", en: "Your message" },
  messagePlaceholder: {
    tr: "Projeniz, pozisyon veya fikriniz hakkında kısa bir not bırakın...",
    en: "Leave a short note about your project, role or idea...",
  },
  privacy: {
    tr: "Bilgileriniz yalnızca size dönüş yapmak için kullanılır. Mesajınız bir form servisi (Web3Forms) aracılığıyla yalnızca bana iletilir.",
    en: "Your details are only used to get back to you. Your message is delivered only to me through a form service (Web3Forms).",
  },
  send: { tr: "Gönder", en: "Send" },
  sending: { tr: "Gönderiliyor…", en: "Sending…" },
  successTitle: { tr: "Mesajınız ulaştı", en: "Your message arrived" },
  successText: { tr: "En kısa sürede size dönüş yapacağım.", en: "I'll get back to you as soon as I can." },
  newMessage: { tr: "Yeni mesaj", en: "New message" },
  errors: {
    name: { tr: "Lütfen adınızı yazın.", en: "Please enter your name." },
    email: { tr: "Lütfen geçerli bir e-posta adresi girin.", en: "Please enter a valid email address." },
    message: {
      tr: "Lütfen en az 10 karakterlik bir mesaj yazın.",
      en: "Please write a message of at least 10 characters.",
    },
    send: {
      tr: "Mesaj gönderilemedi. Lütfen tekrar deneyin ya da LinkedIn üzerinden yazın.",
      en: "The message could not be sent. Please try again or write on LinkedIn.",
    },
  },
  unavailable: {
    tr: "Form şu an hazırlanıyor. Bu arada bana GitHub veya LinkedIn üzerinden ulaşabilirsiniz.",
    en: "The form is being set up. Meanwhile you can reach me on GitHub or LinkedIn.",
  },
  statusLabel: { tr: "Şu an", en: "Now" },
  statusTitle: { tr: "Grentra'yı kuruyorum", en: "Founding Grentra" },
  statusText: {
    tr: "Coffee Go ve KutliGo'yu geliştiriyorum. Ürün fikirleri ve iş birlikleri üzerine konuşmaktan memnuniyet duyarım.",
    en: "I'm building Coffee Go and KutliGo. Happy to talk about product ideas and collaborations.",
  },
  channels: { tr: "İletişim kanalları", en: "Contact channels" },
  locationLabel: { tr: "Konum & dil", en: "Location & language" },
  locationText: {
    tr: "Türkiye · Türkçe ve İngilizce",
    en: "Türkiye · Turkish and English",
  },
} satisfies Record<string, unknown>;

export type ContactLocalized = Localized;
