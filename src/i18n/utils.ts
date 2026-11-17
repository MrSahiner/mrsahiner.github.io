import { defaultLang, languages, ui, type Lang, type UiKey } from "./ui";

export function getLangFromUrl(url: URL): Lang {
  const [, first] = url.pathname.split("/");
  return first && first in languages ? (first as Lang) : defaultLang;
}

export function useTranslations(lang: Lang) {
  return (key: UiKey): string => ui[lang][key];
}

/** Aynı sayfanın diğer dildeki yolu ("/" <-> "/en/"). */
export function getAlternatePath(url: URL, target: Lang): string {
  const current = getLangFromUrl(url);
  const rest =
    current === defaultLang ? url.pathname : url.pathname.replace(new RegExp(`^/${current}`), "") || "/";
  return target === defaultLang ? rest : `/${target}${rest === "/" ? "/" : rest}`;
}
