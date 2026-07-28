(function () {
  "use strict";

  var SUPPORTED_LANGUAGES = ["nl", "en", "fr"];
  var FADE_DURATION_MS = 250;
  var switchSequence = 0;

  function currentLanguage() {
    var language = (document.documentElement.lang || "nl").toLowerCase();
    return SUPPORTED_LANGUAGES.indexOf(language) !== -1 ? language : "nl";
  }

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function preferredSource() {
    var language = currentLanguage();
    var suffix = currentTheme() === "light" ? "_dag" : "";
    return "images/banner_plc_" + language + suffix + ".jpg";
  }

  function reducedMotionEnabled() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function updateHeroBanner() {
    var banner = document.getElementById("heroBanner");
    if (!banner) return;

    var source = preferredSource();
    if (banner.getAttribute("src") === source) return;

    var sequence = ++switchSequence;

    if (reducedMotionEnabled()) {
      banner.setAttribute("src", source);
      return;
    }

    var preload = new Image();

    preload.onload = function () {
      if (sequence !== switchSequence) return;

      banner.classList.add("is-switching");

      window.setTimeout(function () {
        if (sequence !== switchSequence) return;

        banner.setAttribute("src", source);

        window.requestAnimationFrame(function () {
          window.requestAnimationFrame(function () {
            if (sequence === switchSequence) {
              banner.classList.remove("is-switching");
            }
          });
        });
      }, Math.round(FADE_DURATION_MS / 2));
    };

    preload.onerror = function () {
      if (sequence !== switchSequence) return;
      banner.classList.remove("is-switching");
      console.warn("Banner kon niet worden geladen:", source);
    };

    preload.src = source;
  }

  document.addEventListener("DOMContentLoaded", updateHeroBanner);
  window.addEventListener("portfolioLanguageChanged", updateHeroBanner);

  var observer = new MutationObserver(function (mutations) {
    var relevant = mutations.some(function (mutation) {
      return mutation.attributeName === "lang" || mutation.attributeName === "data-theme";
    });
    if (relevant) updateHeroBanner();
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang", "data-theme"]
  });
}());
