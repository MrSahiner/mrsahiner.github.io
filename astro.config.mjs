// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://mrsahiner.github.io",
  trailingSlash: "ignore",

  // Varsayılan dil Türkçe ("/"), İngilizce "/en" altında.
  i18n: {
    defaultLocale: "tr",
    locales: ["tr", "en"],
    routing: { prefixDefaultLocale: false },
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "tr",
        locales: { tr: "tr-TR", en: "en-US" },
      },
    }),
  ],

  build: {
    // Satır içi <style> ve <script> üretilmesin: sıkı Content-Security-Policy
    // ('unsafe-inline' olmadan) ancak böyle çalışır. Bkz. public/_headers
    inlineStylesheets: "never",
  },

  vite: {
    plugins: [tailwindcss()],
    build: { assetsInlineLimit: 0 },
  },
});
