const DEFAULT_LANG = "ka";

async function initI18n() {
  try {
    const [ka, en] = await Promise.all([
      fetch("./locales/ka/translation.json").then((res) => {
        if (!res.ok) throw new Error("Georgian translations failed to load");
        return res.json();
      }),
      fetch("./locales/en/translation.json").then((res) => {
        if (!res.ok) throw new Error("English translations failed to load");
        return res.json();
      }),
    ]);

    let savedLang = DEFAULT_LANG;
    try {
      savedLang = localStorage.getItem("lang") || DEFAULT_LANG;
    } catch (error) {
      console.warn("Could not read saved language.");
    }

    await i18next.init({
      lng: savedLang === "ka" ? "ka" : "en",
      fallbackLng: "en",
      resources: {
        ka: { translation: ka },
        en: { translation: en },
      },
    });

    translatePage();
  } catch (error) {
    console.error("i18next initialization failed:", error);
  }
}

function translatePage() {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.innerHTML = i18next.t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = i18next.t(element.dataset.i18nPlaceholder);
  });

  document.documentElement.lang = i18next.language;

  window.dispatchEvent(
    new CustomEvent("languageChanged", { detail: i18next.language })
  );
}

async function changeLanguage(lang) {
  const selectedLang = lang === "en" ? "en" : "ka";

  if (window.i18next?.isInitialized) {
    await i18next.changeLanguage(selectedLang);
  }

  try {
    localStorage.setItem("lang", selectedLang);
  } catch (error) {
    console.warn("Language preference could not be saved.");
  }

  translatePage();
}
