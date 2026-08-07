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

/* Cerrar menú al hacer click en un enlace */
nav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.innerHTML = `<i data-lucide="menu"></i>`;
    lucide.createIcons();
  })
);

/* Cerrar menú al hacer click fuera */
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
    `📱 Teléfono/WhatsApp: ${data.get("phone")}`,
    `🔧 Servicio: ${data.get("service")}`,
    `📝 Consulta: ${data.get("message")}`,
  ];

  const message = lines.join("\n");

  /* Feedback visual en el botón */
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
const onScroll = () => {
  header.style.boxShadow =
    window.scrollY > 10
      ? "0 4px 24px rgba(9,35,63,.10)"
      : "none";
};
window.addEventListener("scroll", onScroll, { passive: true });

/* ─── Animación de entrada en scroll (Intersection Observer) ─── */
const animateOnScroll = () => {
  const targets = document.querySelectorAll(
    ".service-card, .project-card, .testimonial-card, .step-card, .faq-item, .consorcios-panel > div, .why-list li, .trust-item"
  );

  if (!("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  targets.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = `opacity .4s ease ${(i % 4) * 0.08}s, transform .4s ease ${(i % 4) * 0.08}s`;
    observer.observe(el);
  });
};

/* ─── Año en footer ─── */
const yearEl = document.querySelector("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ─── Init ─── */
lucide.createIcons();
animateOnScroll();
