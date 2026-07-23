(function () {
  "use strict";
  var STORAGE_KEY = "portfolio-theme";
  var media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: light)") : null;
  var labels = {
    nl: { group: "Themakeuze", dark: "Donker thema", light: "Licht thema", auto: "Automatisch thema", darkText: "Donker", lightText: "Licht", autoText: "Auto" },
    en: { group: "Theme selection", dark: "Dark theme", light: "Light theme", auto: "Automatic theme", darkText: "Dark", lightText: "Light", autoText: "Auto" },
    fr: { group: "Sélection du thème", dark: "Thème sombre", light: "Thème clair", auto: "Thème automatique", darkText: "Sombre", lightText: "Clair", autoText: "Auto" }
  };

  function readPreference() {
    var value = "dark";
    try { value = localStorage.getItem(STORAGE_KEY) || "dark"; } catch (e) {}
    return ["dark", "light", "auto"].indexOf(value) !== -1 ? value : "dark";
  }
  function effectiveTheme(preference) {
    if (preference !== "auto") return preference;
    return media && media.matches ? "light" : "dark";
  }
  function currentLanguage() {
    var lang = document.documentElement.lang || "nl";
    return labels[lang] ? lang : "nl";
  }
  function updateLabels() {
    var lang = currentLanguage();
    var text = labels[lang];
    var group = document.querySelector(".theme-switch");
    if (group) group.setAttribute("aria-label", text.group);
    document.querySelectorAll(".theme-button").forEach(function (button) {
      var choice = button.getAttribute("data-theme-choice");
      button.setAttribute("aria-label", text[choice]);
      button.setAttribute("title", text[choice]);
      var hidden = button.querySelector(".sr-only");
      if (hidden) hidden.textContent = text[choice + "Text"];
    });
  }
  function updateButtons(preference) {
    document.querySelectorAll(".theme-button").forEach(function (button) {
      var active = button.getAttribute("data-theme-choice") === preference;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }
  function applyTheme(preference, save) {
    var selected = ["dark", "light", "auto"].indexOf(preference) !== -1 ? preference : "dark";
    document.documentElement.setAttribute("data-theme", effectiveTheme(selected));
    document.documentElement.setAttribute("data-theme-preference", selected);
    updateButtons(selected);
    updateLabels();
    if (save) { try { localStorage.setItem(STORAGE_KEY, selected); } catch (e) {} }
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".theme-button").forEach(function (button) {
      button.addEventListener("click", function () {
        applyTheme(button.getAttribute("data-theme-choice"), true);
      });
    });
    applyTheme(readPreference(), false);
  });
  window.addEventListener("portfolioLanguageChanged", updateLabels);
  if (media) {
    var onChange = function () { if (readPreference() === "auto") applyTheme("auto", false); };
    if (media.addEventListener) media.addEventListener("change", onChange);
    else if (media.addListener) media.addListener(onChange);
  }
}());
