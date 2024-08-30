const STORAGE_KEY = "preferredTheme";

const rootElement = document.documentElement;
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
const scheme = localStorage.getItem(STORAGE_KEY) || "auto";

function initThemeSwitcher() {
  applyScheme(scheme);
  addListeners();
}

function addListeners() {
  document.querySelectorAll("[data-theme-switcher]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      setScheme(button.getAttribute("data-theme-switcher"));
    });
  });

  mediaQuery.addEventListener("change", (_) => {
      if (scheme === "auto") {
        applyScheme(scheme);
      }
    });
}

function setScheme(newScheme) {
  if (["auto", "light", "dark"].includes(newScheme)) {
    localStorage.setItem(STORAGE_KEY, newScheme);
    applyScheme(newScheme);
  }
}

function applyScheme(scheme) {
  let schemeToApply = scheme;
  if (schemeToApply === "auto") {
    schemeToApply = getPreferredScheme();
  }
  rootElement.setAttribute("data-theme", schemeToApply);
}

function getPreferredScheme() {
  return mediaQuery.matches
    ? "dark"
    : "light";
}

// Initialize the theme switcher
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initThemeSwitcher);
} else {
  initThemeSwitcher();
}
