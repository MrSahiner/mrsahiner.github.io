// Projeler sayfası: kategori filtreleri, kaydırınca beliren kartlar ve mockup'larda imleç derinliği.
// Hareket azaltma tercihinde belirme ve derinlik kapalıdır; filtreler her durumda çalışır.

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/** Filtreler: seçilen kategoriye uymayan projeler solarak gizlenir; ekran okuyucuya sonuç sayısı söylenir. */
function setupFilters() {
  const group = document.querySelector<HTMLElement>("[data-project-filters]");
  const status = document.querySelector<HTMLElement>("[data-filter-status]");
  const cards = [...document.querySelectorAll<HTMLElement>("[data-project]")];
  if (!group || cards.length === 0) return;
  const template = status?.dataset.template ?? "";

  group.addEventListener("click", (event) => {
    const button =
      event.target instanceof Element ? event.target.closest<HTMLButtonElement>("[data-filter]") : null;
    if (!button) return;
    const value = button.dataset.filter ?? "all";
    group
      .querySelectorAll("[data-filter]")
      .forEach((b) => b.setAttribute("aria-pressed", String(b === button)));

    let shown = 0;
    cards.forEach((card) => {
      const match = value === "all" || (card.dataset.categories ?? "").split(" ").includes(value);
      if (match) {
        shown++;
        card.hidden = false;
        requestAnimationFrame(() => card.classList.remove("is-filtered-out"));
      } else {
        card.classList.add("is-filtered-out");
        window.setTimeout(
          () => {
            if (card.classList.contains("is-filtered-out")) card.hidden = true;
          },
          reduceMotion ? 0 : 250,
        );
      }
    });
    if (status && template) status.textContent = template.replace("{n}", String(shown));
  });
}

/** Kaydırınca belirme: .reveal öğeleri ekrana girince .is-visible alır (CSS: global.css). */
function setupReveal() {
  const items = document.querySelectorAll<HTMLElement>(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0, rootMargin: "0px 0px -12% 0px" },
  );
  items.forEach((el) => observer.observe(el));
}

/** Mockup derinliği: imleç kartın neresindeyse mockup katmanları o yöne, farklı oranlarda kayar. */
function setupMockupDepth() {
  document.querySelectorAll<HTMLElement>(".showcase").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--mx", `${Math.round(nx * 28)}px`);
      card.style.setProperty("--my", `${Math.round(ny * 22)}px`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--mx", "0px");
      card.style.setProperty("--my", "0px");
    });
  });
}

setupFilters();
setupReveal();
if (!reduceMotion && finePointer) setupMockupDepth();

// Dosyayı modül yapar: değişkenler başka script dosyalarıyla çakışmaz.
export {};
