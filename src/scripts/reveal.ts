// Kaydırınca belirme: .reveal öğeleri ekrana girince .is-visible alır (stiller global.css'te).
// .reveal-stagger içindeki çocuklar sırayla gelir. Hareket azaltma tercihinde hepsi doğrudan görünür.
export function setupReveal() {
  const items = document.querySelectorAll<HTMLElement>(".reveal, .reveal-stagger");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
