// İletişim formu: alan doğrulama, karakter sayacı ve Web3Forms'a JSON ile gönderim.
// Durumlar: hata (alan altında mesaj), gönderiliyor (buton aria-busy), başarı (form yerine teşekkür kartı).
import { setupReveal } from "./reveal";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function setupForm() {
  const form = document.querySelector<HTMLFormElement>("[data-contact-form]");
  const success = document.querySelector<HTMLElement>("[data-contact-success]");
  if (!form || !success) return;

  const submit = form.querySelector<HTMLButtonElement>("[data-submit]");
  const counter = form.querySelector<HTMLElement>("[data-counter]");
  const sendError = form.querySelector<HTMLElement>("[data-send-error]");
  const subject = form.querySelector<HTMLInputElement>("[data-subject]");
  const field = (name: string) =>
    form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null;
  const name = field("name");
  const email = field("email");
  const message = field("message");
  const max = message?.maxLength ?? 2000;

  const messages: Record<string, string> = {
    name: form.dataset.errorName ?? "",
    email: form.dataset.errorEmail ?? "",
    message: form.dataset.errorMessage ?? "",
  };

  const setError = (input: HTMLInputElement | HTMLTextAreaElement, text: string) => {
    const box = form.querySelector<HTMLElement>(`[data-error-for="${input.name}"]`);
    input.setAttribute("aria-invalid", text ? "true" : "false");
    if (!box) return;
    box.textContent = text;
    box.classList.toggle("hidden", !text);
    box.classList.toggle("flex", Boolean(text));
  };

  const check = (input: HTMLInputElement | HTMLTextAreaElement | null) => {
    if (!input) return true;
    const value = input.value.trim();
    let ok = value.length > 0;
    if (input.name === "email") ok = EMAIL.test(value);
    if (input.name === "message") ok = value.length >= 10;
    setError(input, ok ? "" : (messages[input.name] ?? ""));
    return ok;
  };

  // Bir alan bir kez hatalı gösterildiyse yazarken anında yeniden denetlenir.
  [name, email, message].forEach((input) => {
    input?.addEventListener("blur", () => check(input));
    input?.addEventListener("input", () => {
      if (input.getAttribute("aria-invalid") === "true") check(input);
    });
  });

  message?.addEventListener("input", () => {
    if (counter) counter.textContent = `${message.value.length} / ${max}`;
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (form.dataset.ready !== "true" || !submit) return;
    sendError?.classList.add("hidden");

    const results = [check(name), check(email), check(message)];
    if (results.includes(false)) {
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }

    const topic = form.querySelector<HTMLInputElement>("[data-topic]:checked")?.value ?? "";
    if (subject) subject.value = `mrsahiner.com · ${topic} · ${name?.value.trim() ?? ""}`;

    submit.setAttribute("aria-busy", "true");
    submit.disabled = true;
    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = (await response.json().catch(() => ({}))) as { success?: boolean };
      if (!response.ok || !result.success) throw new Error("send failed");
      form.reset();
      if (counter) counter.textContent = `0 / ${max}`;
      form.classList.add("hidden");
      success.classList.remove("hidden");
      success.classList.add("flex");
      success.focus();
    } catch {
      if (sendError) {
        sendError.textContent = form.dataset.errorSend ?? "";
        sendError.classList.remove("hidden");
      }
    } finally {
      submit.removeAttribute("aria-busy");
      submit.disabled = false;
    }
  });

  success.querySelector("[data-new-message]")?.addEventListener("click", () => {
    success.classList.add("hidden");
    success.classList.remove("flex");
    form.classList.remove("hidden");
    name?.focus();
  });
}

setupReveal();
setupForm();
