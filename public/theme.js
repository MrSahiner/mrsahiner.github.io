// Tema: kayıtlı tercih > sistem tercihi. Sayfa çizilmeden önce <head> içinde çalışır.
(function () {
  var KEY = "theme";
  var root = document.documentElement;

  function stored() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }

  function system() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function apply(theme) {
    // Tema değişirken renk geçiş animasyonları kapatılır; yoksa butonlar bir an eski renkte kalır.
    root.classList.add("theme-changing");
    root.setAttribute("data-theme", theme);
    // Stil hesaplamasını şimdi yaptır, ardından sınıfı kaldır: yeni renkler animasyonsuz uygulanmış olur.
    void root.offsetHeight;
    root.classList.remove("theme-changing");
  }

  apply(stored() || system());

  // Kullanıcı elle seçmediyse sistem tercihindeki değişikliği takip et.
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
    if (!stored()) apply(system());
  });

  document.addEventListener("click", function (event) {
    var button = event.target instanceof Element ? event.target.closest("[data-theme-toggle]") : null;
    if (!button) return;
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (document.startViewTransition && !reduce) {
      // Yeni tema, düğmeden dışarı doğru büyüyen bir daireyle açılır (global.css: theme-reveal).
      var rect = button.getBoundingClientRect();
      root.style.setProperty("--reveal-x", rect.left + rect.width / 2 + "px");
      root.style.setProperty("--reveal-y", rect.top + rect.height / 2 + "px");
      root.classList.add("theme-reveal");
      var transition = document.startViewTransition(function () {
        apply(next);
      });
      // Geçiş atlanırsa (sekme arka plandaysa vb.) ready reddedilir; tema yine de uygulanır, hata gösterilmez.
      transition.ready.catch(function () {});
      transition.finished.finally(function () {
        root.classList.remove("theme-reveal");
      });
    } else {
      apply(next);
    }
    try {
      localStorage.setItem(KEY, next);
    } catch (e) {
      /* gizli pencere vb. — tercih yalnızca bu oturumda geçerli olur */
    }
  });
})();
