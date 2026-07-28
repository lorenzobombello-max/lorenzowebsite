(function () {
  "use strict";

  var STORAGE_KEY = "lorenzo-portfolio-language";
  var state = "ready";
  var mode = "auto";
  var running = false;
  var emergency = false;
  var sensor = false;
  var robotActive = false;
  var manualMotorPulse = false;
  var manualRobotPulse = false;
  var position = 0;
  var cycles = 0;
  var animationFrame = null;
  var lastTime = 0;
  var holdUntil = 0;
  var phase = "convey";
  var manualMessageKey = "manualMsg";
  var actionTimers = [];

  var product = document.getElementById("product");
  var conveyor = document.getElementById("conveyor");
  var robotArm = document.getElementById("robotArm");
  var palletSlot = document.getElementById("palletSlot");
  var machineState = document.getElementById("machineState");
  var positionValue = document.getElementById("positionValue");
  var modeValue = document.getElementById("modeValue");
  var cycleCount = document.getElementById("cycleCount");
  var alarmCount = document.getElementById("alarmCount");
  var hmiMessage = document.getElementById("hmiMessage");
  var ladderRung = document.getElementById("ladderRung");
  var emergencyButton = document.getElementById("emergencyButton");
  var modeAutoButton = document.getElementById("modeAutoButton");
  var modeManualButton = document.getElementById("modeManualButton");
  var manualControls = document.getElementById("manualControls");
  var manualConveyorButton = document.getElementById("manualConveyorButton");
  var manualRobotButton = document.getElementById("manualRobotButton");
  var manualHomeButton = document.getElementById("manualHomeButton");
  var stage = document.getElementById("cellStage");

  var messages = {
    nl: {ready:"GEREED",run:"IN BEDRIJF",detect:"PRODUCT GEDETECTEERD",robot:"ROBOTCYCLUS",fault:"NOODSTOP ACTIEF",stopped:"GESTOPT",modeAuto:"AUTO",modeManual:"MANUAL",readyMsg:"Druk op START om de automatische cyclus te beginnen.",manualMsg:"MANUAL-modus actief. Gebruik de handbediening hieronder.",manualConveyorMsg:"Handstap uitgevoerd: transport verplaatst.",manualRobotMsg:"Handstap uitgevoerd: robot pick-and-place.",manualHomeMsg:"Handbediening: cel terug naar startpositie.",runMsg:"Transportmotor actief. Product beweegt naar sensor B1.0.",detectMsg:"Sensor B1.0 actief. Transport stopt gecontroleerd.",robotMsg:"Robot R1 verplaatst het product naar pallet P01.",faultMsg:"Veiligheidsketen onderbroken. Geef de noodstop vrij en druk RESET.",stoppedMsg:"Installatie gecontroleerd gestopt. Druk START om te hervatten."},
    en: {ready:"READY",run:"RUNNING",detect:"PRODUCT DETECTED",robot:"ROBOT CYCLE",fault:"EMERGENCY ACTIVE",stopped:"STOPPED",modeAuto:"AUTO",modeManual:"MANUAL",readyMsg:"Press START to begin the automatic cycle.",manualMsg:"MANUAL mode active. Use the manual controls below.",manualConveyorMsg:"Manual step executed: conveyor moved.",manualRobotMsg:"Manual step executed: robot pick-and-place.",manualHomeMsg:"Manual control: cell returned to home position.",runMsg:"Conveyor motor active. Product is moving towards sensor B1.0.",detectMsg:"Sensor B1.0 active. Conveyor stopped in a controlled manner.",robotMsg:"Robot R1 transfers the product to pallet P01.",faultMsg:"Safety circuit interrupted. Release the emergency stop and press RESET.",stoppedMsg:"Installation stopped in a controlled manner. Press START to resume."},
    fr: {ready:"PRÊT",run:"EN MARCHE",detect:"PRODUIT DÉTECTÉ",robot:"CYCLE ROBOT",fault:"ARRÊT D’URGENCE ACTIF",stopped:"ARRÊTÉ",modeAuto:"AUTO",modeManual:"MANUEL",readyMsg:"Appuyez sur MARCHE pour démarrer le cycle automatique.",manualMsg:"Mode MANUEL actif. Utilisez les commandes manuelles ci-dessous.",manualConveyorMsg:"Pas manuel exécuté : convoyeur déplacé.",manualRobotMsg:"Pas manuel exécuté : cycle pick-and-place du robot.",manualHomeMsg:"Commande manuelle : cellule revenue en position initiale.",runMsg:"Moteur du convoyeur actif. Le produit avance vers le capteur B1.0.",detectMsg:"Capteur B1.0 actif. Le convoyeur s’arrête de manière contrôlée.",robotMsg:"Le robot R1 transfère le produit vers la palette P01.",faultMsg:"Chaîne de sécurité interrompue. Libérez l’arrêt d’urgence et appuyez sur RÉARMEMENT.",stoppedMsg:"Installation arrêtée de manière contrôlée. Appuyez sur MARCHE pour reprendre."}
  };

  function queueTimer(fn, delay) {
    var timer = window.setTimeout(fn, delay);
    actionTimers.push(timer);
    return timer;
  }

  function clearActionTimers() {
    while (actionTimers.length) {
      window.clearTimeout(actionTimers.pop());
    }
  }

  function normalizeLanguage(language) {
    if (language === "in") return "en";
    return ["nl", "en", "fr"].indexOf(language) !== -1 ? language : "nl";
  }

  function getLanguage() {
    var docLang = document.documentElement.lang || "";
    if (["nl", "en", "fr"].indexOf(docLang) !== -1) return docLang;
    try { return normalizeLanguage(localStorage.getItem(STORAGE_KEY) || "nl"); } catch (e) { return "nl"; }
  }
  function t() { return messages[normalizeLanguage(getLanguage())] || messages.nl; }

  function translateLab(language) {
    var selected = normalizeLanguage(language);
    document.querySelectorAll("[data-lab-nl]").forEach(function (el) {
      var value = el.getAttribute("data-lab-" + selected) || el.getAttribute("data-lab-nl");
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
    var map = {ready:[text.ready,text.readyMsg],running:[text.run,text.runMsg],detect:[text.detect,text.detectMsg],robot:[text.robot,text.robotMsg],manual:[text.ready,text[manualMessageKey] || text.manualMsg],fault:[text.fault,text.faultMsg],stopped:[text.stopped,text.stoppedMsg]};
    var current = map[state] || map.ready;
    machineState.textContent = current[0];
    hmiMessage.textContent = current[1];
    if (modeValue) modeValue.textContent = mode === "manual" ? text.modeManual : text.modeAuto;
  }

  function updateOutputs() {
    var motorActive = ((running && phase === "convey") || manualMotorPulse) && !emergency;
    var robotCycleActive = (robotActive || manualRobotPulse) && !emergency;
    conveyor.classList.toggle("running", motorActive);
    setIo("motor", motorActive);
    setIo("robot", robotCycleActive);
    setIo("sensor", sensor);
    setIo("emergency", emergency);
    setIo("green", (running || manualMotorPulse || manualRobotPulse || mode === "manual") && !emergency);
    setIo("red", emergency);
    ladderRung.classList.toggle("active", motorActive);
    document.querySelector('[data-stack="green"]').classList.toggle("active", (running || mode === "manual") && !emergency);
    document.querySelector('[data-stack="amber"]').classList.toggle("active", !running && mode !== "manual" && !emergency);
    document.querySelector('[data-stack="red"]').classList.toggle("active", emergency);
    document.querySelector(".sensor-stop").classList.toggle("active", sensor);
    alarmCount.textContent = emergency ? "1" : "0";
    positionValue.textContent = Math.round(position) + "%";
    cycleCount.textContent = String(cycles);
    updateStatusText();
  }

  function setState(next) { state = next; updateOutputs(); }

  function frame(time) {
    if (!running || emergency || mode !== "auto") return;
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
    if (mode === "manual") {
      manualMessageKey = "manualMsg";
      setState("manual");
      return;
    }
    if (emergency || running) return;
    running = true; lastTime = 0;
    if (phase !== "convey") resetCycle();
    setState("running");
    cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(frame);
  }

  function stop() {
    pulseIo("stop");
    clearActionTimers();
    manualMotorPulse = false;
    manualRobotPulse = false;
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
    clearActionTimers();
    manualMotorPulse = false;
    manualRobotPulse = false;
    running = false; cancelAnimationFrame(animationFrame); resetCycle(); setState("ready");
  }

  function setMode(nextMode) {
    if (nextMode !== "auto" && nextMode !== "manual") return;
    mode = nextMode;
    modeAutoButton.classList.toggle("active", mode === "auto");
    modeManualButton.classList.toggle("active", mode === "manual");
    modeAutoButton.setAttribute("aria-pressed", mode === "auto" ? "true" : "false");
    modeManualButton.setAttribute("aria-pressed", mode === "manual" ? "true" : "false");
    manualControls.classList.toggle("visible", mode === "manual");
    manualControls.hidden = mode !== "manual";

    clearActionTimers();
    manualMotorPulse = false;
    manualRobotPulse = false;
    running = false;
    cancelAnimationFrame(animationFrame);
    if (mode === "manual") {
      manualMessageKey = "manualMsg";
      setState("manual");
    } else {
      resetCycle();
      setState("ready");
    }
  }

  function manualConveyorStep() {
    if (mode !== "manual" || emergency) return;
    clearActionTimers();
    manualMotorPulse = true;
    position = Math.min(76, position + 24);
    sensor = position >= 76;
    product.style.setProperty("--product-x", position * 4.15 + "px");
    manualMessageKey = "manualConveyorMsg";
    setState("manual");
    queueTimer(function () { manualMotorPulse = false; updateOutputs(); }, 260);
    updateOutputs();
  }

  function manualRobotStep() {
    if (mode !== "manual" || emergency) return;
    clearActionTimers();
    if (position < 76) {
      position = 76;
      product.style.setProperty("--product-x", position * 4.15 + "px");
    }
    sensor = false;
    manualRobotPulse = true;
    robotActive = true;
    robotArm.classList.add("picking");
    manualMessageKey = "manualRobotMsg";
    setState("manual");
    queueTimer(function () {
      product.style.opacity = "0";
      robotArm.classList.remove("picking");
      robotArm.classList.add("placing");
      updateOutputs();
    }, 450);
    queueTimer(function () {
      palletSlot.classList.add("loaded");
      robotArm.classList.remove("placing");
      updateOutputs();
    }, 850);
    queueTimer(function () {
      robotActive = false;
      manualRobotPulse = false;
      cycles += 1;
      cycleCount.textContent = String(cycles);
      updateOutputs();
    }, 1150);
    updateOutputs();
  }

  function manualHome() {
    if (mode !== "manual" || emergency) return;
    clearActionTimers();
    manualMotorPulse = false;
    manualRobotPulse = false;
    resetCycle();
    manualMessageKey = "manualHomeMsg";
    setState("manual");
  }

  function toggleEmergency() {
    emergency = !emergency;
    emergencyButton.classList.toggle("engaged", emergency);
    emergencyButton.setAttribute("aria-pressed", emergency ? "true" : "false");
    if (emergency) {
      clearActionTimers();
      manualMotorPulse = false;
      manualRobotPulse = false;
      running = false; robotActive = false; sensor = false; cancelAnimationFrame(animationFrame);
      conveyor.classList.remove("running"); robotArm.classList.remove("picking","placing"); setState("fault");
    } else {
      setState(mode === "manual" ? "manual" : "ready");
    }
    updateOutputs();
  }

  document.getElementById("startButton").addEventListener("click", start);
  document.getElementById("stopButton").addEventListener("click", stop);
  document.getElementById("resetButton").addEventListener("click", reset);
  emergencyButton.addEventListener("click", toggleEmergency);
  modeAutoButton.addEventListener("click", function () { setMode("auto"); });
  modeManualButton.addEventListener("click", function () { setMode("manual"); });
  manualConveyorButton.addEventListener("click", manualConveyorStep);
  manualRobotButton.addEventListener("click", manualRobotStep);
  manualHomeButton.addEventListener("click", manualHome);

  window.addEventListener("portfolioLanguageChanged", function (event) { translateLab(event.detail.language); });
  new MutationObserver(function () { translateLab(getLanguage()); }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  window.setInterval(function () { document.getElementById("clock").textContent = new Date().toLocaleTimeString([], {hour12:false}); }, 1000);
  setMode("auto");
  translateLab(getLanguage());
  updateOutputs();
}());
