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

  const zone = String(data.get("zone") || "").trim();
  const lines = [
    "Hola JN Soluciones Integrales, completo el formulario del sitio web:",
    "",
    `👤 Nombre: ${data.get("name")}`,
    `🔧 Servicio: ${data.get("service")}`,
    ...(zone ? [`📍 Zona: ${zone}`] : []),
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


/* ─── Galería ampliable de trabajos ─── */
const projectImages = [...document.querySelectorAll(".projects-showcase img")];

if (projectImages.length) {
  const lightbox = document.createElement("dialog");
  lightbox.className = "project-lightbox";
  lightbox.setAttribute("aria-label", "Vista ampliada del trabajo");
  lightbox.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="Cerrar imagen">
      <i data-lucide="x"></i>
    </button>
    <figure>
      <img src="" alt="">
      <figcaption></figcaption>
    </figure>
  `;
  document.body.appendChild(lightbox);

  const largeImage = lightbox.querySelector("img");
  const caption = lightbox.querySelector("figcaption");
  const closeButton = lightbox.querySelector(".lightbox-close");

  const openProjectImage = (image) => {
    largeImage.src = image.currentSrc || image.src;
    largeImage.alt = image.alt;
    caption.textContent = image.alt;
    lightbox.showModal();
    document.body.classList.add("lightbox-open");
  };

  projectImages.forEach((image) => {
    image.tabIndex = 0;
    image.setAttribute("role", "button");
    image.setAttribute("aria-label", `Ampliar: ${image.alt}`);
    image.addEventListener("click", () => openProjectImage(image));
    image.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProjectImage(image);
      }
    });
  });

  closeButton.addEventListener("click", () => lightbox.close());
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener("close", () => {
    document.body.classList.remove("lightbox-open");
    largeImage.src = "";
  });
}

/* ─── Sección activa en el menú ─── */
const sectionLinks = [...document.querySelectorAll('.nav-links a[href^="#"]:not(.nav-cta)')];
const observedSections = sectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && observedSections.length) {
  const activeSectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    sectionLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${visible.target.id}`;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }, {
    rootMargin: "-25% 0px -60% 0px",
    threshold: [0, 0.1, 0.4]
  });

  observedSections.forEach((section) => activeSectionObserver.observe(section));
}
