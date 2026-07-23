(function () {
  "use strict";
  var key = "portfolio-theme";
  var preference = "dark";
  try { preference = localStorage.getItem(key) || "dark"; } catch (e) {}
  if (["dark", "light", "auto"].indexOf(preference) === -1) preference = "dark";
  var effective = preference === "auto"
    ? (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark")
    : preference;
  document.documentElement.setAttribute("data-theme", effective);
  document.documentElement.setAttribute("data-theme-preference", preference);
}());
