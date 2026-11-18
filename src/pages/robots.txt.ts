import type { APIRoute } from "astro";

// robots.txt, site adresini astro.config.mjs'teki `site` değerinden alır;
// adres değiştiğinde (github.io -> mrsahiner.com) elle güncellemek gerekmez.
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL("/sitemap-index.xml", site).href;
  // /tasarim burada engellenmez: sayfadaki "noindex" etiketinin okunabilmesi için taranabilir kalmalı.
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
