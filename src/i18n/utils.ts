import { defaultLang, languages, ui, type Lang, type UiKey } from "./ui";
import { findRoute, pathFor } from "./routes";

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split("/");
  return first && first in languages ? (first as Lang) : defaultLang;
}

export function useTranslations(lang: Lang) {
  return (key: UiKey): string => ui[lang][key];
}

/** Aynı sayfanın diğer dildeki adresi (ör. "/projeler/" <-> "/en/projects/"). Bilinmeyen sayfada ana sayfa. */
export function getAlternatePath(url: URL, target: Lang): string {
  return pathFor(findRoute(url.pathname) ?? "home", target);
}
