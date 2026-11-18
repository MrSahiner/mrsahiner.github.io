import type { Lang } from "./ui";

// Her sayfanın iki dildeki adresi. Dil değiştirme bağlantısı ve hreflang etiketleri buradan üretilir.
export const routes = {
  home: { tr: "/", en: "/en/" },
  about: { tr: "/hakkimda/", en: "/en/about/" },
  projects: { tr: "/projeler/", en: "/en/projects/" },
  experience: { tr: "/deneyim/", en: "/en/experience/" },
  contact: { tr: "/iletisim/", en: "/en/contact/" },
} as const satisfies Record<string, Record<Lang, string>>;

export type RouteKey = keyof typeof routes;

const withSlash = (path: string) => (path.endsWith("/") ? path : `${path}/`);

/** Adresin hangi sayfaya karşılık geldiğini bulur (sondaki "/" olsa da olmasa da). */
export function findRoute(pathname: string): RouteKey | undefined {
  const path = withSlash(pathname);
  return (Object.keys(routes) as RouteKey[]).find(
    (key) => routes[key].tr === path || routes[key].en === path,
  );
}

export function pathFor(key: RouteKey, lang: Lang): string {
  return routes[key][lang];
}
