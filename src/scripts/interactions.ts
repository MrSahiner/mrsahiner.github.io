// Ana sayfa etkileşimleri: kart zemininin eğilmesi ve imleç ışığı, mıknatıs butonlar, hero'da fare derinliği,
// yörüngede dönen ve sürüklenebilen teknoloji gezegenleri ve mono etiketlerde "şifre çözülme" efekti.
// Hepsi CSS değişkenleri ve tam piksel kaydırmayla çalışır: yazı hiçbir zaman büyütülmez veya eğilmez,
// bu yüzden hareket sırasında da net kalır. Hareket azaltma tercihinde hepsi devre dışıdır.

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/**
 * Kart: imleç konumunu ışık için --mx/--my, eğilme için --rx/--ry olarak verir.
 * Kart bir bütün olarak eğilir; imleç çıkınca düz haline döner (Bento.astro).
 */
function setupCards() {
  document.querySelectorAll<HTMLElement>(".bento-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      card.style.setProperty("--mx", `${Math.round(event.clientX - rect.left)}px`);
      card.style.setProperty("--my", `${Math.round(event.clientY - rect.top)}px`);
      card.style.setProperty("--rx", `${((0.5 - y) * 10).toFixed(2)}deg`);
      card.style.setProperty("--ry", `${((x - 0.5) * 12).toFixed(2)}deg`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });
}

/** Mıknatıs: buton imlece doğru birkaç tam piksel çekilir. */
function setupMagnetic() {
  document.querySelectorAll<HTMLElement>(".magnetic").forEach((el) => {
    el.style.transition = "translate 0.3s cubic-bezier(0.16, 1, 0.3, 1)";
    el.addEventListener("pointermove", (event) => {
      const rect = el.getBoundingClientRect();
      const dx = Math.round((event.clientX - (rect.left + rect.width / 2)) * 0.25);
      const dy = Math.round((event.clientY - (rect.top + rect.height / 2)) * 0.35);
      el.style.translate = `${dx}px ${dy}px`;
    });
    el.addEventListener("pointerleave", () => {
      el.style.translate = "0px 0px";
    });
  });
}

/** Fare derinliği: imlecin ekrandaki konumuna göre hero katmanları farklı oranlarda kayar (CSS: .depth). */
function setupParallax() {
  const hero = document.querySelector<HTMLElement>(".hero");
  if (!hero) return;
  let frame = 0;
  window.addEventListener("pointermove", (event) => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      hero.style.setProperty("--px", `${Math.round(nx * 48)}px`);
      hero.style.setProperty("--py", `${Math.round(ny * 36)}px`);
    });
  });
}

/** Yörünge çizgileri: Hero.astro'daki SVG elipsleriyle aynı değerler (viewBox 0 0 800 380). */
const ORBITS = [
  { cx: 380, cy: 190, rx: 360, ry: 120, rot: 0 },
  { cx: 400, cy: 180, rx: 390, ry: 155, rot: -6 },
  { cx: 420, cy: 190, rx: 410, ry: 175, rot: 4 },
];

type Planet = {
  li: HTMLElement;
  pos: HTMLElement;
  pill: HTMLElement;
  orbit: (typeof ORBITS)[number];
  theta: number;
  speed: number;
  x: number;
  y: number;
  ready: boolean;
  dragging: boolean;
  returning: boolean;
  grabX: number;
  grabY: number;
};

/**
 * Gezegenler büyük yörünge çizgilerinin üzerinde döner. Yörüngenin arka yarısında (üst kısım) ismin
 * arkasına geçip soluklaşır, ön yarısında öne çıkar. Tutup çekince durur ve imleci izler; bırakınca
 * yörüngedeki yerine yumuşakça döner ve dönmeye devam eder. Sürüklemeden tıklanırsa zıplar.
 */
function setupOrbits() {
  const col = document.querySelector<HTMLElement>(".orbit-col");
  const svg = col?.querySelector<SVGSVGElement>(".orbit-svg");
  if (!col || !svg) return;

  const planets: Planet[] = [...col.querySelectorAll<HTMLElement>(".planet")].flatMap((li, i) => {
    const pos = li.querySelector<HTMLElement>(".planet-pos");
    const pill = li.querySelector<HTMLElement>("[data-planet]");
    const orbit = ORBITS.at(i % ORBITS.length);
    if (!pos || !pill || !orbit) return [];
    return [
      {
        li,
        pos,
        pill,
        orbit,
        theta: (i / 6) * Math.PI * 2 + 0.4,
        speed: (Math.PI * 2) / (34 + (i % 3) * 9), // bir tur 34–52 saniye
        x: 0,
        y: 0,
        ready: false,
        dragging: false,
        returning: false,
        grabX: 0,
        grabY: 0,
      },
    ];
  });
  if (planets.length === 0) return;
  col.classList.add("orbit-live");

  const local = (event: PointerEvent) => {
    const rect = col.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  planets.forEach((p) => {
    let startX = 0;
    let startY = 0;
    let moved = false;
    p.pill.addEventListener("pointerdown", (event) => {
      try {
        p.pill.setPointerCapture(event.pointerId);
      } catch {
        return;
      }
      const point = local(event);
      p.dragging = true;
      p.returning = false;
      p.grabX = point.x - p.x;
      p.grabY = point.y - p.y;
      startX = event.clientX;
      startY = event.clientY;
      moved = false;
      p.pill.dataset.dragging = "";
    });
    p.pill.addEventListener("pointermove", (event) => {
      if (!p.dragging) return;
      if (Math.abs(event.clientX - startX) + Math.abs(event.clientY - startY) > 3) moved = true;
      const point = local(event);
      p.x = point.x - p.grabX;
      p.y = point.y - p.grabY;
    });
    const release = () => {
      if (!p.dragging) return;
      p.dragging = false;
      p.returning = true;
      delete p.pill.dataset.dragging;
      if (!moved) {
        p.pill.classList.remove("bump");
        void p.pill.offsetWidth; // animasyonu yeniden başlatmak için
        p.pill.classList.add("bump");
      }
    };
    p.pill.addEventListener("pointerup", release);
    p.pill.addEventListener("pointercancel", release);
    p.pill.addEventListener("animationend", () => p.pill.classList.remove("bump"));
  });

  // Hero ekranda değilken döngü durur; tek bir döngü çalışır.
  let visible = true;
  let running = false;
  let last = 0;
  const start = () => {
    if (running) return;
    running = true;
    last = performance.now();
    requestAnimationFrame(tick);
  };
  new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? true;
    if (visible) start();
  }).observe(col);

  function tick(now: number) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    const colRect = col!.getBoundingClientRect();
    const svgRect = svg!.getBoundingClientRect();
    const sx = svgRect.width / 800;
    const sy = svgRect.height / 380;
    const ox = svgRect.left - colRect.left;
    const oy = svgRect.top - colRect.top;

    for (const p of planets) {
      if (p.li.offsetParent === null) continue; // bu ekran genişliğinde gizli
      if (!p.dragging) p.theta += p.speed * dt;
      const { cx, cy, rx, ry, rot } = p.orbit;
      const phi = (rot * Math.PI) / 180;
      const ct = Math.cos(p.theta);
      const st = Math.sin(p.theta);
      const ex = cx + rx * ct * Math.cos(phi) - ry * st * Math.sin(phi);
      const ey = cy + rx * ct * Math.sin(phi) + ry * st * Math.cos(phi);
      // Ekranın kenarından taşmasın: gezegen her zaman görünür alanda kalır.
      const w = p.pill.offsetWidth;
      const minX = 8 - colRect.left;
      const maxX = document.documentElement.clientWidth - colRect.left - w - 8;
      const tx = Math.min(Math.max(ox + ex * sx - w / 2, minX), maxX);
      const ty = oy + ey * sy - p.pill.offsetHeight / 2;

      if (!p.ready) {
        p.x = tx;
        p.y = ty;
        p.ready = true;
      } else if (p.returning) {
        p.x += (tx - p.x) * 0.12;
        p.y += (ty - p.y) * 0.12;
        if (Math.hypot(tx - p.x, ty - p.y) < 0.5) p.returning = false;
      } else if (!p.dragging) {
        p.x = tx;
        p.y = ty;
      }

      p.pos.style.translate = `${Math.round(p.x)}px ${Math.round(p.y)}px`;
      // Gezegenler her zaman yazının (isim ve rol satırı) arkasından geçer: harflerin arasından görünür,
      // harflerin altında kalır. Yalnızca sürüklenirken öne çıkar. Yörüngenin üst yarısında soluklaşır.
      p.li.style.zIndex = p.dragging ? "40" : "5";
      const depth = Math.min(Math.max((st + 0.35) / 0.7, 0), 1);
      p.pos.style.opacity = p.dragging ? "1" : String(0.6 + 0.4 * depth);
    }
    if (visible) requestAnimationFrame(tick);
    else running = false;
  }
  start();
}

/**
 * Dönen unvan: birkaç saniyede bir sıradaki role geçer. Eski rol yukarı, yenisi alttan kayar; pencerenin
 * genişliği yeni role göre daralıp genişler ve altın alt çizgi yeniden çizilir.
 */
function setupRoleRotator() {
  const rotator = document.querySelector<HTMLElement>("[data-role-rotator]");
  const windowEl = rotator?.querySelector<HTMLElement>(".role-window");
  const items = rotator ? [...rotator.querySelectorAll<HTMLElement>(".role-item")] : [];
  if (!rotator || !windowEl || items.length < 2) return;

  let index = 0;
  const fit = () => {
    const active = items.at(index);
    if (active) windowEl.style.width = `${active.offsetWidth}px`;
  };
  // Genişlik fontlar yüklendikten sonra ölçülür; yedek font daha dar olduğu için önceden ölçmek yazıyı keser.
  fit();
  void document.fonts.ready.then(fit);
  window.addEventListener("resize", fit);

  const next = () => {
    const current = items.at(index);
    index = (index + 1) % items.length;
    const upcoming = items.at(index);
    if (!current || !upcoming) return;
    current.classList.remove("is-active");
    current.classList.add("is-leaving");
    upcoming.classList.remove("is-leaving");
    upcoming.classList.add("is-active");
    fit();
    rotator.classList.remove("redraw");
    void rotator.offsetWidth; // alt çizgi animasyonunu yeniden başlatmak için
    rotator.classList.add("redraw");
    window.setTimeout(() => current.classList.remove("is-leaving"), 600);
  };

  // İlk değişim açılış animasyonu bittikten sonra başlar.
  window.setTimeout(() => window.setInterval(next, 2800), 1800);
}

const GLYPHS = "ABCDEFGHIJKLMNOPRSTUVYZ0123456789/<>#*";

/** Metni rastgele karakterlerden soldan sağa doğru gerçek haline çözer. */
function scramble(target: HTMLElement, finalText: string, duration = 700) {
  const start = performance.now();
  const frame = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const revealed = Math.floor(progress * finalText.length);
    target.textContent = [...finalText]
      .map((ch, i) =>
        i < revealed || ch === " " || ch === "/" ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      )
      .join("");
    if (progress < 1) requestAnimationFrame(frame);
    else target.textContent = finalText;
  };
  requestAnimationFrame(frame);
}

function setupScramble() {
  document.querySelectorAll<HTMLElement>("[data-scramble]").forEach((el, index) => {
    const target = el.querySelector<HTMLElement>("[data-scramble-target]");
    if (!target) return;
    const text = (target.textContent ?? "").trim();
    // Açılışta kartlar belirirken sırayla çözülür.
    window.setTimeout(() => scramble(target, text), 900 + index * 110);
    // Kartın üzerine gelince yeniden çözülür.
    const card = el.closest(".bento-card");
    let busy = false;
    card?.addEventListener("pointerenter", () => {
      if (busy) return;
      busy = true;
      scramble(target, text, 450);
      window.setTimeout(() => (busy = false), 500);
    });
  });
}

if (!reduceMotion) {
  setupScramble();
  setupRoleRotator();
  setupOrbits();
  if (finePointer) {
    setupCards();
    setupMagnetic();
    setupParallax();
  }
}

// Dosyayı modül yapar: değişkenler başka script dosyalarıyla çakışmaz.
export {};
