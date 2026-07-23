(function () {
  "use strict";

  var STORAGE_KEY = "lorenzo-portfolio-language";
  var state = "ready";
  var running = false;
  var emergency = false;
  var sensor = false;
  var robotActive = false;
  var position = 0;
  var cycles = 0;
  var animationFrame = null;
  var lastTime = 0;
  var holdUntil = 0;
  var phase = "convey";

  var product = document.getElementById("product");
  var conveyor = document.getElementById("conveyor");
  var robotArm = document.getElementById("robotArm");
  var palletSlot = document.getElementById("palletSlot");
  var machineState = document.getElementById("machineState");
  var positionValue = document.getElementById("positionValue");
  var cycleCount = document.getElementById("cycleCount");
  var alarmCount = document.getElementById("alarmCount");
  var hmiMessage = document.getElementById("hmiMessage");
  var ladderRung = document.getElementById("ladderRung");
  var emergencyButton = document.getElementById("emergencyButton");
  var stage = document.getElementById("cellStage");

  var messages = {
    nl: {ready:"GEREED",run:"IN BEDRIJF",detect:"PRODUCT GEDETECTEERD",robot:"ROBOTCYCLUS",fault:"NOODSTOP ACTIEF",stopped:"GESTOPT",readyMsg:"Druk op START om de automatische cyclus te beginnen.",runMsg:"Transportmotor actief. Product beweegt naar sensor B1.0.",detectMsg:"Sensor B1.0 actief. Transport stopt gecontroleerd.",robotMsg:"Robot R1 verplaatst het product naar pallet P01.",faultMsg:"Veiligheidsketen onderbroken. Geef de noodstop vrij en druk RESET.",stoppedMsg:"Installatie gecontroleerd gestopt. Druk START om te hervatten."},
    en: {ready:"READY",run:"RUNNING",detect:"PRODUCT DETECTED",robot:"ROBOT CYCLE",fault:"EMERGENCY ACTIVE",stopped:"STOPPED",readyMsg:"Press START to begin the automatic cycle.",runMsg:"Conveyor motor active. Product is moving towards sensor B1.0.",detectMsg:"Sensor B1.0 active. Conveyor stopped in a controlled manner.",robotMsg:"Robot R1 transfers the product to pallet P01.",faultMsg:"Safety circuit interrupted. Release the emergency stop and press RESET.",stoppedMsg:"Installation stopped in a controlled manner. Press START to resume."},
    fr: {ready:"PRÊT",run:"EN MARCHE",detect:"PRODUIT DÉTECTÉ",robot:"CYCLE ROBOT",fault:"ARRÊT D’URGENCE ACTIF",stopped:"ARRÊTÉ",readyMsg:"Appuyez sur MARCHE pour démarrer le cycle automatique.",runMsg:"Moteur du convoyeur actif. Le produit avance vers le capteur B1.0.",detectMsg:"Capteur B1.0 actif. Le convoyeur s’arrête de manière contrôlée.",robotMsg:"Le robot R1 transfère le produit vers la palette P01.",faultMsg:"Chaîne de sécurité interrompue. Libérez l’arrêt d’urgence et appuyez sur RÉARMEMENT.",stoppedMsg:"Installation arrêtée de manière contrôlée. Appuyez sur MARCHE pour reprendre."}
  };

  function getLanguage() {
    try { return localStorage.getItem(STORAGE_KEY) || "nl"; } catch (e) { return "nl"; }
  }
  function t() { return messages[getLanguage()] || messages.nl; }

  function translateLab(language) {
    document.querySelectorAll("[data-lab-nl]").forEach(function (el) {
      var value = el.getAttribute("data-lab-" + language) || el.getAttribute("data-lab-nl");
      el.textContent = value;
    });
    updateStatusText();
  }

  function setIo(name, active) {
    var row = document.querySelector('[data-io="' + name + '"]');
    if (row) row.classList.toggle("active", Boolean(active));
  }

  function pulseIo(name, duration) {
    setIo(name, true);
    window.setTimeout(function () { setIo(name, false); }, duration || 180);
  }

  function updateStatusText() {
    var text = t();
    var map = {ready:[text.ready,text.readyMsg],running:[text.run,text.runMsg],detect:[text.detect,text.detectMsg],robot:[text.robot,text.robotMsg],fault:[text.fault,text.faultMsg],stopped:[text.stopped,text.stoppedMsg]};
    var current = map[state] || map.ready;
    machineState.textContent = current[0];
    hmiMessage.textContent = current[1];
  }

  function updateOutputs() {
    conveyor.classList.toggle("running", running && phase === "convey" && !emergency);
    setIo("motor", running && phase === "convey" && !emergency);
    setIo("robot", robotActive);
    setIo("sensor", sensor);
    setIo("emergency", emergency);
    setIo("green", running && !emergency);
    setIo("red", emergency);
    ladderRung.classList.toggle("active", running && phase === "convey" && !emergency);
    document.querySelector('[data-stack="green"]').classList.toggle("active", running && !emergency);
    document.querySelector('[data-stack="amber"]').classList.toggle("active", !running && !emergency);
    document.querySelector('[data-stack="red"]').classList.toggle("active", emergency);
    document.querySelector(".sensor-stop").classList.toggle("active", sensor);
    alarmCount.textContent = emergency ? "1" : "0";
    positionValue.textContent = Math.round(position) + "%";
    cycleCount.textContent = String(cycles);
    updateStatusText();
  }

  function setState(next) { state = next; updateOutputs(); }

  function frame(time) {
    if (!running || emergency) return;
    var delta = Math.min(40, time - (lastTime || time));
    lastTime = time;

    if (phase === "convey") {
      position += delta * 0.022;
      product.style.setProperty("--product-x", position * 4.15 + "px");
      if (position >= 76) {
        position = 76; sensor = true; phase = "detect"; holdUntil = time + 650; setState("detect");
      }
    } else if (phase === "detect" && time >= holdUntil) {
      sensor = false; robotActive = true; phase = "pick"; robotArm.classList.add("picking"); holdUntil = time + 900; setState("robot");
    } else if (phase === "pick" && time >= holdUntil) {
      product.style.opacity = "0"; robotArm.classList.remove("picking"); robotArm.classList.add("placing"); phase = "place"; holdUntil = time + 900;
    } else if (phase === "place" && time >= holdUntil) {
      palletSlot.classList.add("loaded"); robotArm.classList.remove("placing"); phase = "return"; holdUntil = time + 650;
    } else if (phase === "return" && time >= holdUntil) {
      robotActive = false; cycles += 1; phase = "reload"; holdUntil = time + 550; updateOutputs();
    } else if (phase === "reload" && time >= holdUntil) {
      palletSlot.classList.remove("loaded"); position = 0; product.style.setProperty("--product-x", "0px"); product.style.opacity = "1"; phase = "convey"; setState("running");
    }

    updateOutputs();
    animationFrame = requestAnimationFrame(frame);
  }

  function start() {
    pulseIo("start");
    if (emergency || running) return;
    running = true; lastTime = 0;
    if (phase !== "convey") resetCycle();
    setState("running");
    cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(frame);
  }

  function stop() {
    pulseIo("stop");
    running = false; robotActive = false; sensor = false;
    cancelAnimationFrame(animationFrame);
    conveyor.classList.remove("running"); robotArm.classList.remove("picking","placing");
    setState("stopped");
  }

  function resetCycle() {
    position = 0; sensor = false; robotActive = false; phase = "convey";
    product.style.setProperty("--product-x", "0px"); product.style.opacity = "1";
    palletSlot.classList.remove("loaded"); robotArm.classList.remove("picking","placing");
  }

  function reset() {
    pulseIo("reset");
    if (emergency) return;
    running = false; cancelAnimationFrame(animationFrame); resetCycle(); setState("ready");
  }

  function toggleEmergency() {
    emergency = !emergency;
    emergencyButton.classList.toggle("engaged", emergency);
    emergencyButton.setAttribute("aria-pressed", emergency ? "true" : "false");
    if (emergency) {
      running = false; robotActive = false; sensor = false; cancelAnimationFrame(animationFrame);
      conveyor.classList.remove("running"); robotArm.classList.remove("picking","placing"); setState("fault");
    } else {
      setState("fault");
    }
    updateOutputs();
  }

  document.getElementById("startButton").addEventListener("click", start);
  document.getElementById("stopButton").addEventListener("click", stop);
  document.getElementById("resetButton").addEventListener("click", reset);
  emergencyButton.addEventListener("click", toggleEmergency);

  window.addEventListener("portfolioLanguageChanged", function (event) { translateLab(event.detail.language); });
  window.setInterval(function () { document.getElementById("clock").textContent = new Date().toLocaleTimeString([], {hour12:false}); }, 1000);
  translateLab(getLanguage());
  updateOutputs();
}());
