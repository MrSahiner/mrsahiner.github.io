// Sayfaya <meta http-equiv="Content-Security-Policy"> olarak eklenen güvenlik politikası.
//
// Neden meta etiketi? GitHub Pages özel HTTP başlığı (public/_headers) desteklemez. Meta etiketiyle
// gelen CSP aynı korumayı sağlar, şu iki fark dışında:
//   - frame-ancestors meta etiketinde yok sayılır (sitenin başka sitelere gömülmesi engellenemez).
//   - Etiket <head> içinde ilk sırada olmalıdır; ondan önce yüklenen hiçbir şey kapsanmaz.
// Cloudflare Pages'e geçildiğinde public/_headers'daki başlık da devreye girer; ikisi çakışmaz,
// tarayıcı ikisini birden uygular. Bu listeyi değiştirirseniz _headers'daki satırı da güncelleyin.
export const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' https://challenges.cloudflare.com https://static.cloudflareinsights.com",
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self' https://cloudflareinsights.com https://api.web3forms.com",
  "frame-src https://challenges.cloudflare.com",
  "base-uri 'self'",
  "form-action 'self' https://api.web3forms.com",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");
