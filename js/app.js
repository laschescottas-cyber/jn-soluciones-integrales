const WHATSAPP_NUMBER = "5491126061647";
const DEFAULT_MESSAGE = "Hola JN Soluciones Integrales, quisiera solicitar un presupuesto.";

function whatsappUrl(message = DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll(".wa-link").forEach((link) => {
  link.href = whatsappUrl();
  link.target = "_blank";
  link.rel = "noreferrer";
});

document.querySelectorAll(".service-card").forEach((card) => {
  const link = card.querySelector(".service-link");
  link.href = whatsappUrl(`${DEFAULT_MESSAGE}\nServicio: ${card.dataset.service}`);
  link.target = "_blank";
  link.rel = "noreferrer";
});

const consorcioLink = document.querySelector(".consorcio-link");
consorcioLink.href = whatsappUrl("Hola JN Soluciones Integrales, consulto por servicios para un consorcio.");
consorcioLink.target = "_blank";
consorcioLink.rel = "noreferrer";

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav-links");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  menuButton.innerHTML = `<i data-lucide="${open ? "x" : "menu"}"></i>`;
  lucide.createIcons();
});

nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  nav.classList.remove("is-open");
  menuButton.setAttribute("aria-expanded", "false");
}));

document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const message = [
    DEFAULT_MESSAGE,
    "",
    `Nombre: ${data.get("name")}`,
    `Teléfono: ${data.get("phone")}`,
    `Servicio: ${data.get("service")}`,
    `Mensaje: ${data.get("message")}`,
  ].join("\n");
  window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
});

document.querySelector("#year").textContent = new Date().getFullYear();
lucide.createIcons();
