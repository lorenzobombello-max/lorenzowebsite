(function () {
  "use strict";

  const STORAGE_KEY = "lb_cookie_consent_v1";
  const GA_ID = "G-NYWP3115TN";
  const isOnline = (location.protocol === "https:" || location.protocol === "http:") &&
    location.hostname !== "localhost" && location.hostname !== "127.0.0.1";

  const translations = {
    nl: {
      title: "Cookies",
      text: "Deze website gebruikt noodzakelijke cookies voor een correcte werking. Met uw toestemming gebruiken we ook analytische cookies om de website te verbeteren.",
      accept: "Accepteren",
      reject: "Weigeren",
      privacy: "Privacybeleid →",
      label: "Cookievoorkeuren"
    },
    en: {
      title: "Cookies",
      text: "This website uses necessary cookies for proper operation. With your consent, analytical cookies are also used to improve the website.",
      accept: "Accept",
      reject: "Reject",
      privacy: "Privacy policy →",
      label: "Cookie preferences"
    },
    fr: {
      title: "Cookies",
      text: "Ce site utilise des cookies nécessaires à son bon fonctionnement. Avec votre consentement, des cookies analytiques sont également utilisés afin d’améliorer le site.",
      accept: "Accepter",
      reject: "Refuser",
      privacy: "Politique de confidentialité →",
      label: "Préférences relatives aux cookies"
    }
  };

  let analyticsLoaded = false;
  let banner;

  function currentLanguage() {
    const lang = (document.documentElement.lang || "nl").toLowerCase();
    return lang.startsWith("fr") ? "fr" : lang.startsWith("en") ? "en" : "nl";
  }

  function readChoice() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (_) { return null; }
  }

  function saveChoice(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (_) {}
  }

  function deleteAnalyticsCookies() {
    const names = ["_ga", "_gid", "_gat", "_ga_" + GA_ID.replace(/^G-/, "")];
    names.forEach(function (name) {
      document.cookie = name + "=; Max-Age=0; path=/; SameSite=Lax";
      document.cookie = name + "=; Max-Age=0; path=/; domain=." + location.hostname + "; SameSite=Lax";
    });
  }

  function loadAnalytics() {
    if (analyticsLoaded || !isOnline) return;
    analyticsLoaded = true;

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { anonymize_ip: true });

    const ga = document.createElement("script");
    ga.async = true;
    ga.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
    document.head.appendChild(ga);

    const gc = document.createElement("script");
    gc.async = true;
    gc.dataset.goatcounter = "https://lorenzobombello.goatcounter.com/count";
    gc.src = "https://gc.zgo.at/count.js";
    document.head.appendChild(gc);
  }

  function applyChoice(choice) {
    if (choice === "accepted") loadAnalytics();
    if (choice === "rejected") deleteAnalyticsCookies();
  }

  function updateBannerLanguage() {
    if (!banner) return;
    const t = translations[currentLanguage()];
    banner.setAttribute("aria-label", t.label);
    banner.querySelector("[data-cookie-title]").textContent = t.title;
    banner.querySelector("[data-cookie-text]").textContent = t.text;
    banner.querySelector("[data-cookie-accept]").textContent = t.accept;
    banner.querySelector("[data-cookie-reject]").textContent = t.reject;
    banner.querySelector("[data-cookie-privacy]").textContent = t.privacy;
  }

  function createBanner() {
    if (banner) return banner;
    banner = document.createElement("section");
    banner.className = "cookie-consent";
    banner.hidden = true;
    banner.innerHTML = `
      <div class="cookie-consent__heading">
        <span class="cookie-consent__icon" aria-hidden="true">🍪</span>
        <h2 data-cookie-title>Cookies</h2>
      </div>
      <p data-cookie-text></p>
      <div class="cookie-consent__actions">
        <button class="button primary small" type="button" data-cookie-accept></button>
        <button class="button secondary small" type="button" data-cookie-reject></button>
      </div>
      <a class="cookie-consent__privacy" href="privacy.html" data-cookie-privacy></a>`;

    banner.querySelector("[data-cookie-accept]").addEventListener("click", function () {
      saveChoice("accepted");
      applyChoice("accepted");
      hideBanner();
    });
    banner.querySelector("[data-cookie-reject]").addEventListener("click", function () {
      saveChoice("rejected");
      applyChoice("rejected");
      hideBanner();
    });
    document.body.appendChild(banner);
    updateBannerLanguage();
    return banner;
  }

  function showBanner() {
    createBanner();
    updateBannerLanguage();
    banner.hidden = false;
    requestAnimationFrame(function () { banner.classList.add("is-visible"); });
  }

  function hideBanner() {
    if (!banner) return;
    banner.classList.remove("is-visible");
    window.setTimeout(function () { banner.hidden = true; }, 250);
  }

  document.addEventListener("click", function (event) {
    const trigger = event.target.closest(".cookie-settings-link");
    if (!trigger) return;
    event.preventDefault();
    showBanner();
    window.setTimeout(function () {
      const firstButton = banner && banner.querySelector("button");
      if (firstButton) firstButton.focus();
    }, 40);
  });

  document.addEventListener("DOMContentLoaded", function () {
    createBanner();
    const choice = readChoice();
    applyChoice(choice);
    if (!choice) showBanner();

    new MutationObserver(updateBannerLanguage).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"]
    });
  });
})();
