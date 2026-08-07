/* ════════════════════════════════════════════
   JN SOLUCIONES INTEGRALES — app.js
   ════════════════════════════════════════════ */

const WHATSAPP_NUMBER = "5491126061647";
const DEFAULT_MESSAGE = "Hola JN Soluciones Integrales, quisiera solicitar un presupuesto.";

function whatsappUrl(message = DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/* ─── Links genéricos de WhatsApp ─── */
document.querySelectorAll(".wa-link").forEach((link) => {
  link.href = whatsappUrl();
  link.target = "_blank";
  link.rel = "noreferrer";
});

/* ─── Links de servicio (con contexto) ─── */
document.querySelectorAll(".service-card").forEach((card) => {
  const link = card.querySelector(".service-link");
  if (!link) return;
  link.href = whatsappUrl(`${DEFAULT_MESSAGE}\nServicio: ${card.dataset.service}`);
  link.target = "_blank";
  link.rel = "noreferrer";
});

/* ─── Link de consorcio ─── */
const consorcioLink = document.querySelector(".consorcio-link");
if (consorcioLink) {
  consorcioLink.href = whatsappUrl(
    "Hola JN Soluciones Integrales, consulto por servicios de mantenimiento para un consorcio/edificio."
  );
  consorcioLink.target = "_blank";
  consorcioLink.rel = "noreferrer";
}

/* ─── Menú hamburguesa ─── */
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  menuButton.innerHTML = `<i data-lucide="${open ? "x" : "menu"}"></i>`;
  lucide.createIcons();
});

nav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.innerHTML = `<i data-lucide="menu"></i>`;
    lucide.createIcons();
  })
);

document.addEventListener("click", (e) => {
  if (!nav.contains(e.target) && !menuButton.contains(e.target)) {
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

/* ─── Formulario WhatsApp ─── */
const form = document.querySelector("#contact-form");
const submitBtn = form?.querySelector(".submit-button");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);

  const lines = [
    "Hola JN Soluciones Integrales, completo el formulario del sitio web:",
    "",
    `👤 Nombre: ${data.get("name")}`,
    `🔧 Servicio: ${data.get("service")}`,
    `📝 Consulta: ${data.get("message")}`,
  ];

  const message = lines.join("\n");

  if (submitBtn) {
    submitBtn.textContent = "Abriendo WhatsApp...";
    submitBtn.disabled = true;
    setTimeout(() => {
      submitBtn.innerHTML = `<i data-lucide="message-circle"></i> Enviar consulta por WhatsApp`;
      submitBtn.disabled = false;
      lucide.createIcons();
    }, 3000);
  }

  window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
});

/* ─── Header shadow en scroll ─── */
const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  header.style.boxShadow =
    window.scrollY > 10 ? "0 4px 24px rgba(9,35,63,.10)" : "none";
}, { passive: true });

/* ─── Año en footer ─── */
const yearEl = document.querySelector("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ─── Init ─── */
lucide.createIcons();
