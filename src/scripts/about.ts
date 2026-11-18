// Hakkımda sayfası: kaydırınca belirme ve fotoğraf çerçevesinin imlece göre kayması.
import { setupReveal } from "./reveal";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/** Fotoğraf çerçevesi: imleç fotoğrafın neresindeyse altın çerçeve o yöne birkaç piksel kayar. */
function setupPortrait() {
  const portrait = document.querySelector<HTMLElement>("[data-portrait]");
  if (!portrait) return;
  portrait.addEventListener("pointermove", (event) => {
    const rect = portrait.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    portrait.style.setProperty("--fx", `${Math.round(nx * 16)}px`);
    portrait.style.setProperty("--fy", `${Math.round(ny * 16)}px`);
  });
  portrait.addEventListener("pointerleave", () => {
    portrait.style.setProperty("--fx", "0px");
    portrait.style.setProperty("--fy", "0px");
  });
}

setupReveal();
if (!reduceMotion && finePointer) setupPortrait();
