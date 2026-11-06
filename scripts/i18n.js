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

  function setLang(lang) {
    const selectedLang = lang === "en" ? "en" : "ka";

    // Update flag
    langFlag.firstElementChild.setAttribute("href", `#flag-${selectedLang}`);

    // Update selected option and checkmark
    langOptions.forEach((option) => {
      const isSelected = option.dataset.lang === selectedLang;
      option.setAttribute("aria-selected", String(isSelected));
    });

    // Update document language
    document.documentElement.lang = selectedLang;

    // Save preference
    try {
      localStorage.setItem("lang", selectedLang);
    } catch (error) {
      console.warn("Language preference could not be saved.");
    }

    // Change i18next language
    if (window.i18next?.isInitialized) {
      window.i18next.changeLanguage(selectedLang);
    }
  }

  langBtn.addEventListener("click", () => {
    langRoot.classList.contains("open")
      ? closeLanguageMenu()
      : openLanguageMenu();
  });

  langOptions.forEach((option) => {
    option.addEventListener("click", () => {
      setLang(option.dataset.lang);
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

  // Restore saved language
  let savedLang = "ka";

  try {
    savedLang = localStorage.getItem("lang") || "ka";
  } catch (error) {
    console.warn("Could not read saved language.");
  }

  setLang(savedLang);
}
