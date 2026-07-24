(function () {
  "use strict";
  var STORAGE_KEY = "portfolio-theme";
  var AUTO_LIGHT_START_HOUR = 7;
  var AUTO_DARK_START_HOUR = 19;
  var autoTimer = null;
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
  function automaticThemeByTime(date) {
    var hour = (date || new Date()).getHours();
    return hour >= AUTO_LIGHT_START_HOUR && hour < AUTO_DARK_START_HOUR ? "light" : "dark";
  }
  function effectiveTheme(preference) {
    if (preference !== "auto") return preference;
    return automaticThemeByTime();
  }
  function refreshAutomaticTheme() {
    if (readPreference() === "auto") applyTheme("auto", false);
  }
  function startAutomaticThemeClock() {
    if (autoTimer) window.clearInterval(autoTimer);
    autoTimer = window.setInterval(refreshAutomaticTheme, 60000);
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
    startAutomaticThemeClock();
  });
  window.addEventListener("portfolioLanguageChanged", updateLabels);
  window.addEventListener("focus", refreshAutomaticTheme);
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) refreshAutomaticTheme();
  });
}());
