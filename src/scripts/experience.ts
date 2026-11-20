// Deneyim sayfası: kartlar kaydırdıkça belirir; altın zaman çizelgesi ekranın ortasına kadar çizilir ve
// çizginin ulaştığı noktalar yanar. Hareket azaltma tercihinde çizgi tam ve noktalar yanık görünür.
import { setupReveal } from "./reveal";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function setupTimeline() {
  const timeline = document.querySelector<HTMLElement>("[data-timeline]");
  if (!timeline) return;
  const dots = [...timeline.querySelectorAll<HTMLElement>("[data-timeline-dot]")];

  if (reduceMotion) {
    timeline.style.setProperty("--progress", "1");
    dots.forEach((d) => d.classList.add("is-reached"));
    return;
  }

  let frame = 0;
  const update = () => {
    frame = 0;
    const rect = timeline.getBoundingClientRect();
    const line = window.innerHeight * 0.6; // çizginin ucu ekranın %60'ında
    const progress = Math.min(Math.max((line - rect.top) / rect.height, 0), 1);
    timeline.style.setProperty("--progress", progress.toFixed(3));
    dots.forEach((d) => d.classList.toggle("is-reached", d.getBoundingClientRect().top < line));
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };
  update();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
}

setupReveal();
setupTimeline();
