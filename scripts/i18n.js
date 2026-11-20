// ===== I18NEXT (TRANSLATIONS) =====
// Translations live in locales/<lang>/translation.json.
// HTML elements are marked with:
//   data-i18n="key"              -> textContent
//   data-i18n-html="key"         -> innerHTML (texts with <br />)
//   data-i18n-placeholder="key"  -> placeholder attribute
//   data-i18n-aria-label="key"   -> aria-label attribute

const SUPPORTED_LANGS = ["ka", "en"];

function getSavedLang() {
  try {
    const lang = localStorage.getItem("lang");
    return SUPPORTED_LANGS.includes(lang) ? lang : "ka";
  } catch (error) {
    return "ka";
  }
}

// Helper for other scripts: t("menu.loading", "Loading...")
window.t = function (key, fallback = "") {
  if (window.i18next?.isInitialized && window.i18next.exists(key)) {
    return window.i18next.t(key);
  }
  return fallback;
};

function translatePage() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = window.i18next.t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    el.innerHTML = window.i18next.t(el.dataset.i18nHtml);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.setAttribute(
      "placeholder",
      window.i18next.t(el.dataset.i18nPlaceholder)
    );
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
    el.setAttribute("aria-label", window.i18next.t(el.dataset.i18nAriaLabel));
  });

  // Let other scripts (menu, reviews, forms) update their dynamic text
  document.dispatchEvent(
    new CustomEvent("i18n:changed", { detail: window.i18next.language })
  );
}

async function loadTranslations() {
  // "../locales" works both from the root (index.html) and from /pages/*
  const entries = await Promise.all(
    SUPPORTED_LANGS.map(async (lang) => {
      const res = await fetch(`../locales/${lang}/translation.json`);
      if (!res.ok) throw new Error(`Could not load ${lang} translations`);
      return [lang, { translation: await res.json() }];
    })
  );
  return Object.fromEntries(entries);
}

async function initI18n() {
  if (!window.i18next) {
    console.warn("i18next is not loaded.");
    return;
  }
  try {
    const resources = await loadTranslations();
    await window.i18next.init({
      lng: getSavedLang(),
      fallbackLng: "en",
      resources,
      interpolation: { escapeValue: false },
    });
    window.i18next.on("languageChanged", translatePage);
    translatePage();
  } catch (error) {
    console.error("i18n init failed:", error);
  }
}

initI18n();

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
  // Restore saved language
  setLang(getSavedLang());
}
