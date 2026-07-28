(() => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];

  let mode = "auto";
  let running = false;
  let estop = false;
  let cycles = 0;
  let activeOutput = null;
  let timers = [];

  const TIMING = {
    c1Extend: 860,
    c2Extend: 980,
    c3Extend: 1120,
    c3Retract: 930,
    c2Retract: 880,
    c1Retract: 840,
    settle: 420
  };

  const REPAIR_ORDER = ["air", "valve2", "sensor3"];

  const cylinders = [false, false, false];
  const faults = { air: false, valve2: false, sensor3: false };
  const diagnosis = { active: false, startedAt: 0, elapsedMs: 0, bestMs: null };

  const text = {
    nl: {
      ready: "GEREED",
      running: "KETTINGCYCLUS ACTIEF",
      stopped: "GESTOPT",
      fault: "STORING",
      estop: "NOODSTOP",
      start: "Druk op START om de 3-cilinder ketting te starten.",
      manual: "Handbediening actief. Gebruik kettingstappen of reset.",
      cycleDone: "Kettingcyclus voltooid. Installatie gereed.",
      c1: "C1 uitgestuurd. Rol R1 activeert C2.",
      c2: "C2 uitgestuurd. Rol R2 activeert C3.",
      c3: "C3 uitgestuurd. Terugtreksequentie gestart.",
      retract: "C3, C2 en C1 trekken gecontroleerd in.",
      reset: "Systeem gereset. Controleer storingen en start opnieuw.",
      pressure: "Onvoldoende luchtdruk of veiligheidsketen onderbroken.",
      airFault: "Storing: luchtdrukleiding defect.",
      valve2Fault: "Storing: ventiel V2 reageert niet.",
      sensor3Fault: "Storing: sensor B3.1 meldt geen uitpositie.",
      fixAll: "Herstel alle defecte componenten om opnieuw te starten.",
      repaired: "Alle defecte componenten zijn hersteld.",
      rndFault: "Willekeurige storing geïnjecteerd voor diagnose.",
      repairOrder: "Verkeerde herstelvolgorde. Herstel eerst",
      repairedPart: "hersteld",
      nextRepair: "Volgende herstelstap",
      diagnosisDone: "Diagnose opgelost in",
      diagnosisLabel: "Diagnose",
      bestLabel: "Beste"
    },
    en: {
      ready: "READY",
      running: "CHAIN CYCLE ACTIVE",
      stopped: "STOPPED",
      fault: "FAULT",
      estop: "EMERGENCY STOP",
      start: "Press START to launch the 3-cylinder chain.",
      manual: "Manual mode active. Use chain steps or reset.",
      cycleDone: "Chain cycle complete. Installation ready.",
      c1: "C1 extended. Roller R1 enables C2.",
      c2: "C2 extended. Roller R2 enables C3.",
      c3: "C3 extended. Retract sequence started.",
      retract: "C3, C2 and C1 retract in a controlled sequence.",
      reset: "System reset. Check faults and restart.",
      pressure: "Air supply insufficient or safety chain interrupted.",
      airFault: "Fault: air supply line failed.",
      valve2Fault: "Fault: valve V2 is not responding.",
      sensor3Fault: "Fault: sensor B3.1 does not confirm extension.",
      fixAll: "Repair all failed components before restart.",
      repaired: "All failed components have been repaired.",
      rndFault: "Random fault injected for troubleshooting.",
      repairOrder: "Incorrect repair order. Repair",
      repairedPart: "repaired",
      nextRepair: "Next repair step",
      diagnosisDone: "Fault diagnosed in",
      diagnosisLabel: "Diagnosis",
      bestLabel: "Best"
    },
    fr: {
      ready: "PRÊT",
      running: "CYCLE EN CHAÎNE ACTIF",
      stopped: "ARRÊTÉ",
      fault: "DÉFAUT",
      estop: "ARRÊT URGENCE",
      start: "Appuyez sur MARCHE pour lancer la chaîne 3 vérins.",
      manual: "Mode manuel actif. Utilisez les étapes de chaîne ou reset.",
      cycleDone: "Cycle en chaîne terminé. Installation prête.",
      c1: "C1 sorti. Le rouleau R1 active C2.",
      c2: "C2 sorti. Le rouleau R2 active C3.",
      c3: "C3 sorti. Séquence de rentrée lancée.",
      retract: "C3, C2 et C1 rentrent de façon contrôlée.",
      reset: "Système réinitialisé. Vérifiez les défauts puis redémarrez.",
      pressure: "Pression d’air insuffisante ou chaîne de sécurité interrompue.",
      airFault: "Défaut: alimentation d’air coupée.",
      valve2Fault: "Défaut: la vanne V2 ne répond pas.",
      sensor3Fault: "Défaut: le capteur B3.1 ne confirme pas la sortie.",
      fixAll: "Réparez tous les composants défectueux avant de redémarrer.",
      repaired: "Tous les composants défectueux ont été réparés.",
      rndFault: "Défaut aléatoire injecté pour diagnostic.",
      repairOrder: "Ordre de réparation incorrect. Réparez d'abord",
      repairedPart: "réparé",
      nextRepair: "Étape suivante",
      diagnosisDone: "Défaut résolu en",
      diagnosisLabel: "Diagnostic",
      bestLabel: "Meilleur"
    }
  };

  const lang = () => (["nl", "en", "fr"].includes(document.documentElement.lang) ? document.documentElement.lang : "nl");
  const t = (key) => (text[lang()] && text[lang()][key]) || key;

  const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));
  const formatSeconds = (ms) => `${(ms / 1000).toFixed(1)}s`;
  const faultLabel = (key) => ({
    air: "AIR",
    valve2: "V2",
    sensor3: "B3.1"
  }[key] || key);
  const nextRepairFault = () => REPAIR_ORDER.find((name) => faults[name]) || null;

  function beginDiagnosisIfNeeded() {
    if (diagnosis.active) return;
    diagnosis.active = true;
    diagnosis.startedAt = Date.now();
    diagnosis.elapsedMs = 0;
  }

  function updateDiagnosisElapsed() {
    if (!diagnosis.active) return;
    diagnosis.elapsedMs = Date.now() - diagnosis.startedAt;
  }

  function finishDiagnosisIfNeeded() {
    if (!diagnosis.active) return;
    updateDiagnosisElapsed();
    diagnosis.active = false;
    diagnosis.bestMs = diagnosis.bestMs === null ? diagnosis.elapsedMs : Math.min(diagnosis.bestMs, diagnosis.elapsedMs);
  }

  function renderDiagnosisMetrics() {
    const timer = $("#diagnosisTimer");
    const best = $("#bestDiagnosis");
    const timerLabel = $("#diagnosisLabel");
    const bestLabel = $("#bestLabel");
    if (!timer || !best) return;

    updateDiagnosisElapsed();
    timer.textContent = formatSeconds(diagnosis.active ? diagnosis.elapsedMs : 0);
    best.textContent = diagnosis.bestMs === null ? "-" : formatSeconds(diagnosis.bestMs);
    if (timerLabel) timerLabel.textContent = t("diagnosisLabel");
    if (bestLabel) bestLabel.textContent = t("bestLabel");
  }

  function ensureDiagnosisMetrics() {
    const metrics = $(".hmi .metrics");
    if (!metrics || $("#diagnosisTimer") || $("#bestDiagnosis")) return;

    const timerWrap = document.createElement("div");
    timerWrap.innerHTML = `<span id="diagnosisLabel">${t("diagnosisLabel")}</span><strong id="diagnosisTimer">0.0s</strong>`;
    metrics.appendChild(timerWrap);

    const bestWrap = document.createElement("div");
    bestWrap.innerHTML = `<span id="bestLabel">${t("bestLabel")}</span><strong id="bestDiagnosis">-</strong>`;
    metrics.appendChild(bestWrap);
  }

  const io = (name, on) => {
    const el = document.querySelector(`[data-io="${name}"]`);
    if (el) el.classList.toggle("active", !!on);
  };
  const step = (n) => $$(".sequence li").forEach((el) => el.classList.toggle("active", Number(el.dataset.step) === n));

  function hasFault() {
    return faults.air || faults.valve2 || faults.sensor3;
  }

  function setMessage(key) {
    $("#hmiMessage").textContent = t(key);
  }

  function setRawMessage(message) {
    $("#hmiMessage").textContent = message;
  }

  function updateFaultSummary() {
    const summary = $("#faultSummary");
    if (!summary) return;
    const active = [];
    if (faults.air) active.push("AIR");
    if (faults.valve2) active.push("V2");
    if (faults.sensor3) active.push("B3.1");
    const next = nextRepairFault();
    const nextText = next ? ` · ${t("nextRepair")}: ${faultLabel(next)}` : "";
    summary.textContent = active.length ? `${t("fixAll")} [${active.join(" + ")}]${nextText}` : "";

    $("#breakAirBtn").classList.toggle("active", faults.air);
    $("#breakValve2Btn").classList.toggle("active", faults.valve2);
    $("#breakSensor3Btn").classList.toggle("active", faults.sensor3);
  }

  function pressure(on) {
    const enabled = on && !faults.air && !estop;
    $("#airFlow").style.width = enabled ? "100%" : "0";
    $("#pressureValue").textContent = enabled ? "6.0" : "0.0";
    $("#pressureText").textContent = (enabled ? "6.0" : "0.0") + " bar";
    $("#gaugeNeedle").style.transform = `rotate(${enabled ? 110 : -120}deg)`;
  }

  function setCylinder(index, out) {
    cylinders[index] = out;
    const card = $(`.chain-cylinder[data-cylinder="${index + 1}"]`);
    if (card) {
      card.classList.toggle("extended", out);
      const inSensor = card.querySelector(".sensor-in");
      const outSensor = card.querySelector(".sensor-out");
      if (inSensor) inSensor.classList.toggle("on", !out);
      if (outSensor) outSensor.classList.toggle("on", out);
    }
  }

  function refreshChainVisuals() {
    $("#roller12").classList.toggle("active", cylinders[0]);
    $("#roller23").classList.toggle("active", cylinders[1]);
    io("c1", cylinders[0]);
    io("c2", cylinders[1]);
    io("c3", cylinders[2]);
  }

  function setOutput(name) {
    activeOutput = name;
    ["y1", "y2", "y3", "y4", "y5", "y6"].forEach((key) => io(key, key === name));
  }

  function setMachineState(kind) {
    $("#machineState").textContent = t(kind);
    const good = !estop && !hasFault();
    $(".tower .green").classList.toggle("active", good && (running || mode === "manual"));
    $(".tower .amber").classList.toggle("active", running);
    $(".tower .red").classList.toggle("active", estop || hasFault());
    io("green", good);
    io("red", estop || hasFault());
    $("#safetyRung").classList.toggle("active", good);
  }

  function updateMeta() {
    $("#modeValue").textContent = mode.toUpperCase();
    $("#cycleCount").textContent = String(cycles);
    const activeIdx = cylinders.findIndex(Boolean);
    $("#cylinderState").textContent = activeIdx === -1 ? "C1" : `C${activeIdx + 1}`;
    refreshChainVisuals();
    pressure(true);
    updateFaultSummary();
    renderDiagnosisMetrics();
  }

  function stopAll(statusKey = "stopped", messageKey = "pressure") {
    clearTimers();
    running = false;
    setOutput(null);
    setMachineState(statusKey);
    setMessage(messageKey);
    step(0);
    updateMeta();
  }

  function triggerFault(type) {
    faults[type] = true;
    running = false;
    clearTimers();
    setOutput(null);
    beginDiagnosisIfNeeded();
    setMachineState("fault");
    if (type === "air") setMessage("airFault");
    if (type === "valve2") setMessage("valve2Fault");
    if (type === "sensor3") setMessage("sensor3Fault");
    updateMeta();
  }

  function repairFault(type) {
    if (!faults[type]) return;

    const expected = nextRepairFault();
    if (expected && expected !== type) {
      setMachineState("fault");
      setRawMessage(`${t("repairOrder")} ${faultLabel(expected)}.`);
      updateMeta();
      return;
    }

    faults[type] = false;
    const next = nextRepairFault();
    if (next) {
      setMachineState("fault");
      setRawMessage(`${faultLabel(type)} ${t("repairedPart")}. ${t("nextRepair")}: ${faultLabel(next)}.`);
    } else if (!estop) {
      finishDiagnosisIfNeeded();
      setMachineState("ready");
      setRawMessage(`${t("repaired")} ${t("diagnosisDone")} ${formatSeconds(diagnosis.elapsedMs)}.`);
    }
    updateMeta();
  }

  function resetChain() {
    setCylinder(0, false);
    setCylinder(1, false);
    setCylinder(2, false);
    setOutput(null);
    step(0);
    updateMeta();
  }

  function runAutoCycle() {
    if (mode !== "auto" || running || estop || hasFault()) {
      if (hasFault()) setMessage("fixAll");
      return;
    }

    running = true;
    setMachineState("running");
    setMessage("c1");
    step(1);
    setOutput("y1");
    setCylinder(0, true);
    updateMeta();

    later(() => {
      if (estop || hasFault()) return;
      if (faults.valve2) return triggerFault("valve2");

      setMessage("c2");
      step(2);
      setOutput("y2");
      setCylinder(1, true);
      updateMeta();

      later(() => {
        if (estop || hasFault()) return;
        setMessage("c3");
        step(3);
        setOutput("y3");
        setCylinder(2, true);
        updateMeta();

        later(() => {
          if (faults.sensor3) return triggerFault("sensor3");
          if (estop || hasFault()) return;
          setMessage("retract");
          step(4);
          setOutput("y4");
          setCylinder(2, false);
          updateMeta();

          later(() => {
            if (estop || hasFault()) return;
            step(5);
            setOutput("y5");
            setCylinder(1, false);
            updateMeta();

            later(() => {
              if (estop || hasFault()) return;
              step(6);
              setOutput("y6");
              setCylinder(0, false);
              cycles += 1;
              updateMeta();

              later(() => {
                running = false;
                setOutput(null);
                setMachineState("ready");
                setMessage("cycleDone");
                step(0);
                updateMeta();
              }, TIMING.settle);
            }, TIMING.c1Retract);
          }, TIMING.c2Retract);
        }, TIMING.c3Retract);
      }, TIMING.c2Extend);
    }, TIMING.c1Extend);
  }

  function manualNextStep() {
    if (mode !== "manual" || estop) return;
    if (hasFault()) {
      setMachineState("fault");
      setMessage("fixAll");
      return;
    }

    if (!cylinders[0]) {
      setOutput("y1");
      setCylinder(0, true);
      step(1);
      setMachineState("running");
      setMessage("c1");
    } else if (!cylinders[1]) {
      if (faults.valve2) return triggerFault("valve2");
      setOutput("y2");
      setCylinder(1, true);
      step(2);
      setMachineState("running");
      setMessage("c2");
    } else if (!cylinders[2]) {
      setOutput("y3");
      setCylinder(2, true);
      step(3);
      if (faults.sensor3) return triggerFault("sensor3");
      setMachineState("running");
      setMessage("c3");
    } else {
      setOutput("y4");
      setCylinder(2, false);
      setCylinder(1, false);
      setCylinder(0, false);
      step(6);
      cycles += 1;
      setMachineState("ready");
      setMessage("cycleDone");
      later(() => step(0), 450);
    }
    updateMeta();
  }

  function randomFault() {
    const choices = ["air", "valve2", "sensor3"].filter((key) => !faults[key]);
    if (!choices.length) return;
    const chosen = choices[Math.floor(Math.random() * choices.length)];
    triggerFault(chosen);
    setRawMessage(`${t("rndFault")} (${faultLabel(chosen)})`);
  }

  $("#startBtn").addEventListener("click", () => {
    io("start", true);
    setTimeout(() => io("start", false), 180);
    if (mode === "auto") runAutoCycle();
    else {
      setMachineState("ready");
      setMessage("manual");
    }
  });

  $("#stopBtn").addEventListener("click", () => {
    io("stop", true);
    setTimeout(() => io("stop", false), 180);
    stopAll("stopped", "pressure");
  });

  $("#resetBtn").addEventListener("click", () => {
    clearTimers();
    running = false;
    estop = false;
    $("#estopBtn").classList.remove("engaged");
    io("estop", false);
    resetChain();
    if (hasFault()) {
      setMachineState("fault");
      setMessage("fixAll");
    } else {
      setMachineState("ready");
      setMessage("reset");
    }
  });

  $("#estopBtn").addEventListener("click", () => {
    estop = !estop;
    $("#estopBtn").classList.toggle("engaged", estop);
    io("estop", estop);
    if (estop) {
      clearTimers();
      running = false;
      setOutput(null);
      setMachineState("estop");
      setMessage("pressure");
    } else if (hasFault()) {
      setMachineState("fault");
      setMessage("fixAll");
    } else {
      setMachineState("ready");
      setMessage(mode === "manual" ? "manual" : "start");
    }
    updateMeta();
  });

  $$('[data-mode]').forEach((btn) =>
    btn.addEventListener('click', () => {
      if (running) return;
      mode = btn.dataset.mode;
      $$('[data-mode]').forEach((b) => b.classList.toggle('active', b === btn));
      $("#manualControls").classList.toggle("visible", mode === "manual");
      setMachineState(hasFault() ? "fault" : "ready");
      setMessage(hasFault() ? "fixAll" : mode === "manual" ? "manual" : "start");
      updateMeta();
    })
  );

  $("#extendBtn").addEventListener("click", manualNextStep);
  $("#retractBtn").addEventListener("click", () => {
    if (mode !== "manual" || estop) return;
    resetChain();
    setMachineState(hasFault() ? "fault" : "ready");
    setMessage(hasFault() ? "fixAll" : "reset");
  });
  $("#faultBtn").addEventListener("click", randomFault);

  $("#breakAirBtn").addEventListener("click", () => triggerFault("air"));
  $("#breakValve2Btn").addEventListener("click", () => triggerFault("valve2"));
  $("#breakSensor3Btn").addEventListener("click", () => triggerFault("sensor3"));
  $("#repairAirBtn").addEventListener("click", () => repairFault("air"));
  $("#repairValve2Btn").addEventListener("click", () => repairFault("valve2"));
  $("#repairSensor3Btn").addEventListener("click", () => repairFault("sensor3"));

  function translate() {
    const l = lang();
    $$('[data-pneu-nl]').forEach((el) => {
      const key = 'pneu' + l.charAt(0).toUpperCase() + l.slice(1);
      const val = el.dataset[key];
      if (val) el.textContent = val;
    });
    renderDiagnosisMetrics();
    if (!running && !estop) setMessage(hasFault() ? "fixAll" : mode === "manual" ? "manual" : "start");
    setMachineState(hasFault() ? "fault" : "ready");
    updateMeta();
  }

  new MutationObserver(translate).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"]
  });

  setInterval(() => {
    $("#clock").textContent = new Date().toLocaleTimeString([], { hour12: false });
    renderDiagnosisMetrics();
  }, 1000);

  ensureDiagnosisMetrics();
  resetChain();
  $("#manualControls").classList.toggle("visible", false);
  setMachineState("ready");
  setMessage("start");
  updateMeta();
  translate();
})();

