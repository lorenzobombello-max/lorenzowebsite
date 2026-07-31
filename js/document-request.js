(function () {
  "use strict";

  var endpoint =
    "https://api.lorenzobombello.be/submit-document-request";
  var dialog = document.getElementById("document-request-dialog");
  var form = document.getElementById("document-request-form");
  var status = document.getElementById("document-request-status");
  var confirmation = document.getElementById("document-request-confirmation");
  var confirmationMessage = document.getElementById(
    "document-request-confirmation-message",
  );
  var closeTimer = null;

  if (!dialog || !form || !status || !confirmation || !confirmationMessage) return;

  var messages = {
    nl: {
      select: "Selecteer minstens één document.",
      invalid: "Controleer de verplichte velden.",
      sending: "Aanvraag wordt veilig verzonden…",
      success:
        "Je aanvraag is succesvol verzonden en wacht op goedkeuring.",
      closes: "Deze melding sluit automatisch over {seconds} seconden.",
      error:
        "De aanvraag kon niet worden verzonden. Probeer het later opnieuw.",
    },
    en: {
      select: "Select at least one document.",
      invalid: "Please check the required fields.",
      sending: "Your request is being sent securely…",
      success:
        "Your request was sent successfully and is awaiting approval.",
      closes: "This message will close automatically in {seconds} seconds.",
      error: "The request could not be sent. Please try again later.",
    },
    fr: {
      select: "Sélectionnez au moins un document.",
      invalid: "Vérifiez les champs obligatoires.",
      sending: "Votre demande est envoyée de manière sécurisée…",
      success:
        "Votre demande a bien été envoyée et est en attente d’approbation.",
      closes:
        "Ce message se fermera automatiquement dans {seconds} secondes.",
      error:
        "La demande n’a pas pu être envoyée. Veuillez réessayer plus tard.",
    },
  };

  function language() {
    var value = (document.documentElement.lang || "nl").toLowerCase();
    if (value === "in") return "en";
    return value === "fr" || value === "en" ? value : "nl";
  }

  function text(key) {
    return messages[language()][key];
  }

  function setStatus(message, type) {
    status.textContent = message;
    status.className = "document-request-status" + (type ? " is-" + type : "");
  }

  function clearCloseTimer() {
    if (closeTimer !== null) {
      window.clearInterval(closeTimer);
      closeTimer = null;
    }
  }

  function successMessage(seconds) {
    return (
      text("success") +
      " " +
      text("closes").replace("{seconds}", String(seconds))
    );
  }

  function closeConfirmation() {
    clearCloseTimer();
    if (typeof confirmation.close === "function") {
      confirmation.close();
    } else {
      confirmation.removeAttribute("open");
    }
  }

  function showConfirmation() {
    var secondsRemaining = 10;
    confirmationMessage.textContent = successMessage(secondsRemaining);

    if (typeof confirmation.showModal === "function") {
      confirmation.showModal();
    } else {
      confirmation.setAttribute("open", "");
    }

    closeTimer = window.setInterval(function () {
      secondsRemaining -= 1;

      if (secondsRemaining <= 0) {
        closeConfirmation();
        return;
      }

      confirmationMessage.textContent = successMessage(secondsRemaining);
    }, 1000);
  }

  function openDialog() {
    clearCloseTimer();
    setStatus("", "");
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    var firstInput = form.querySelector("input:not([tabindex='-1'])");
    if (firstInput) firstInput.focus();
  }

  function closeDialog() {
    clearCloseTimer();
    if (typeof dialog.close === "function") {
      dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
  }

  document
    .querySelectorAll("[data-document-request-open]")
    .forEach(function (button) {
      button.addEventListener("click", openDialog);
    });

  document
    .querySelectorAll("[data-document-request-confirmation-close]")
    .forEach(function (button) {
      button.addEventListener("click", closeConfirmation);
    });

  confirmation.addEventListener("click", function (event) {
    if (event.target === confirmation) closeConfirmation();
  });

  document
    .querySelectorAll("[data-document-request-close]")
    .forEach(function (button) {
      button.addEventListener("click", closeDialog);
    });

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) closeDialog();
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    var selected = Array.from(
      form.querySelectorAll('input[name="requestedDocuments"]:checked'),
    ).map(function (input) {
      return input.value;
    });

    if (!form.checkValidity()) {
      setStatus(text("invalid"), "error");
      form.reportValidity();
      return;
    }

    if (selected.length === 0) {
      setStatus(text("select"), "error");
      return;
    }

    var submit = form.querySelector('button[type="submit"]');
    var data = new FormData(form);
    var payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      organization: String(data.get("organization") || ""),
      jobTitle: String(data.get("jobTitle") || ""),
      reason: String(data.get("reason") || ""),
      language: language(),
      requestedDocuments: selected,
      website: String(data.get("website") || ""),
    };

    submit.disabled = true;
    form.setAttribute("aria-busy", "true");
    setStatus(text("sending"), "");

    try {
      var response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Request failed");

      form.reset();
      closeDialog();
      setStatus("", "");
      showConfirmation();
    } catch (error) {
      console.error("Document request failed:", error);
      setStatus(text("error"), "error");
    } finally {
      submit.disabled = false;
      form.removeAttribute("aria-busy");
    }
  });
})();
