// ===== LANGUAGE SWITCHER =====

const langRoot = document.getElementById("lang");

if (langRoot) {
  const langBtn = document.getElementById("langBtn");
  const langFlag = document.getElementById("langFlag");
  const langOptions = langRoot.querySelectorAll(".lang-option");

  function openLanguageMenu() {
    langRoot.classList.add("open");
    langBtn.setAttribute("aria-expanded", "true");
  }

  function closeLanguageMenu() {
    langRoot.classList.remove("open");
    langBtn.setAttribute("aria-expanded", "false");
  }

  function updateSwitcherUI(lang) {
    const selectedLang = lang === "en" ? "en" : "ka";

    // Update flag
    if (langFlag?.firstElementChild) {
      langFlag.firstElementChild.setAttribute("href", `#flag-${selectedLang}`);
    }

    // Update selected option and checkmark
    langOptions.forEach((option) => {
      const isSelected = option.dataset.lang === selectedLang;
      option.setAttribute("aria-selected", String(isSelected));
    });
  }

  langBtn.addEventListener("click", () => {
    langRoot.classList.contains("open")
      ? closeLanguageMenu()
      : openLanguageMenu();
  });

  langOptions.forEach((option) => {
    option.addEventListener("click", () => {
      if (typeof changeLanguage === "function") {
        changeLanguage(option.dataset.lang);
      }
      closeLanguageMenu();
      langBtn.focus();
    });
  });

  document.addEventListener("click", (event) => {
    if (!langRoot.contains(event.target)) {
      closeLanguageMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && langRoot.classList.contains("open")) {
      closeLanguageMenu();
      langBtn.focus();
    }
  });

  // Sync UI whenever i18n triggers a language change
  window.addEventListener("languageChanged", (event) => {
    updateSwitcherUI(event.detail);
  });
}
