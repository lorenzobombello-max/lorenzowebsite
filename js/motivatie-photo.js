(function () {
  "use strict";

  var DARK_PHOTO = "images/motivatie-profiel.jpg";
  var LIGHT_PHOTO = "images/motivatie_profiel_dag.jpg";
  var photo = null;
  var requestedSource = "";

  function activeTheme() {
    return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function desiredSource() {
    return activeTheme() === "light" ? LIGHT_PHOTO : DARK_PHOTO;
  }

  function updatePhoto() {
    if (!photo) photo = document.getElementById("motivatieProfielFoto");
    if (!photo) return;

    var nextSource = desiredSource();
    if (requestedSource === nextSource || photo.getAttribute("src") === nextSource) return;
    requestedSource = nextSource;

    var preload = new Image();
    preload.onload = function () {
      if (requestedSource !== nextSource) return;
      photo.setAttribute("src", nextSource);
      photo.setAttribute("data-active-theme-photo", activeTheme());
    };
    preload.onerror = function () {
      requestedSource = "";
    };
    preload.src = nextSource;
  }

  function initialise() {
    photo = document.getElementById("motivatieProfielFoto");
    if (!photo) return;

    updatePhoto();

    var observer = new MutationObserver(function (mutations) {
      var themeChanged = mutations.some(function (mutation) {
        return mutation.type === "attributes" && mutation.attributeName === "data-theme";
      });
      if (themeChanged) updatePhoto();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialise);
  } else {
    initialise();
  }
}());
