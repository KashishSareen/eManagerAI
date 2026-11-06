AOS.init({
  duration: 800,
  easing: "ease-out-cubic",
  once: true,
  offset: 70,
  disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
});

const nav = document.querySelector("#nav") || document.querySelector("nav.glass");
const menuButton = document.querySelector("#menuBtn");
const mobileMenu = document.querySelector("#mobileMenu");
let menuOpenScrollY = 0;

function setMenuOpen(open) {
  mobileMenu?.classList.toggle("hidden", !open);
  menuButton?.setAttribute("aria-expanded", String(open));
  if (menuButton) {
    menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menuButton.innerHTML = open
      ? '<i class="ri-close-line"></i>'
      : '<i class="ri-menu-3-line"></i>';
  }
  if (open) menuOpenScrollY = window.scrollY;
}

if (nav) {
  const onScrollShadow = () => nav.classList.toggle("scrolled", window.scrollY > 10);
  onScrollShadow();
  window.addEventListener("scroll", onScrollShadow, { passive: true });
}

menuButton?.addEventListener("click", () => {
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isExpanded);
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    setMenuOpen(false);
  });
});

window.addEventListener(
  "scroll",
  () => {
    if (
      mobileMenu &&
      !mobileMenu.classList.contains("hidden") &&
      Math.abs(window.scrollY - menuOpenScrollY) > 8
    ) {
      setMenuOpen(false);
    }
  },
  { passive: true }
);

document.addEventListener("click", (e) => {
  if (
    mobileMenu &&
    nav &&
    !mobileMenu.classList.contains("hidden") &&
    !nav.contains(e.target)
  ) {
    setMenuOpen(false);
  }
});

document.querySelectorAll(".bento").forEach((card) => {
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", e.clientX - r.left + "px");
    card.style.setProperty("--my", e.clientY - r.top + "px");
  });
});
