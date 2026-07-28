(function () {
  "use strict";
  var key = "portfolio-theme";
  var preference = "dark";
  try { preference = localStorage.getItem(key) || "dark"; } catch (e) {}
  if (["dark", "light", "auto"].indexOf(preference) === -1) preference = "dark";
  var hour = new Date().getHours();
  var automaticTheme = hour >= 7 && hour < 19 ? "light" : "dark";
  var effective = preference === "auto" ? automaticTheme : preference;
  document.documentElement.setAttribute("data-theme", effective);
  document.documentElement.setAttribute("data-theme-preference", preference);
}());
