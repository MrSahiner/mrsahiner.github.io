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
    apply(next);
    try {
      localStorage.setItem(KEY, next);
    } catch (e) {
      /* gizli pencere vb. — tercih yalnızca bu oturumda geçerli olur */
    }
  });
})();
