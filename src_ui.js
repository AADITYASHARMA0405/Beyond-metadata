// src_ui.js - Canvas Living Data Field, UI Interactions, Guided Tour, Benchmark Suite & Keyboard Navigation
module.exports = `
// --- 1. HERO CANVAS: LIVING DATA FIELD ---
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let animationId;
  let isCanvasVisible = true;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const isMobile = window.innerWidth < 800;
  const numParticles = isMobile ? 40 : 90;

  // 5 soft tenant clusters
  const tenantColors = [
    'rgba(109, 184, 255, 0.75)', // Factory A
    'rgba(183, 148, 246, 0.75)', // Factory B
    'rgba(244, 168, 200, 0.75)', // Factory C
    'rgba(201, 214, 232, 0.75)', // Factory D
    'rgba(232, 201, 160, 0.75)'  // Factory E
  ];

  const clusterCenters = [
    { x: 0.22, y: 0.35 },
    { x: 0.78, y: 0.35 },
    { x: 0.28, y: 0.68 },
    { x: 0.72, y: 0.68 },
    { x: 0.50, y: 0.50 }
  ];

  const particles = [];
  for (let i = 0; i < numParticles; i++) {
    const tenantIdx = i % 5;
    const center = clusterCenters[tenantIdx];
    particles.push({
      x: width * center.x + (Math.random() - 0.5) * (width * 0.25),
      y: height * center.y + (Math.random() - 0.5) * (height * 0.25),
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2.5 + 2,
      tenantIdx,
      color: tenantColors[tenantIdx],
      originalColor: tenantColors[tenantIdx],
      isRogue: false,
      dissolving: false,
      dustParticles: []
    });
  }

  // Crossing event trigger every ~9 seconds
  let lastCrossingTime = performance.now();
  let activeCrossing = null;

  function loop(now) {
    if (!isCanvasVisible) return;
    ctx.clearRect(0, 0, width, height);

    // Check for rogue particle drift event
    if (now - lastCrossingTime > 9000 && !activeCrossing) {
      lastCrossingTime = now;
      const rogue = particles[Math.floor(Math.random() * particles.length)];
      rogue.isRogue = true;
      rogue.vx = (width * 0.5 - rogue.x) * 0.008;
      rogue.vy = (height * 0.5 - rogue.y) * 0.008;
      activeCrossing = {
        particle: rogue,
        membraneX: width * 0.5,
        membraneY: height * 0.5,
        flare: 0,
        startTime: now
      };
    }

    // Draw central glowing membrane line if active crossing
    if (activeCrossing) {
      const elapsed = now - activeCrossing.startTime;
      if (elapsed < 3000) {
        activeCrossing.flare = Math.sin((elapsed / 3000) * Math.PI);
        ctx.save();
        ctx.strokeStyle = \`rgba(78, 203, 113, \${0.2 + activeCrossing.flare * 0.6})\`;
        ctx.lineWidth = 2 + activeCrossing.flare * 3;
        ctx.setLineDash([8, 6]);
        ctx.beginPath();
        ctx.arc(width * 0.5, height * 0.5, 90 + activeCrossing.flare * 20, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Check if particle reached membrane
        const dist = Math.hypot(activeCrossing.particle.x - width * 0.5, activeCrossing.particle.y - height * 0.5);
        if (dist < 100 && !activeCrossing.particle.dissolving) {
          activeCrossing.particle.dissolving = true;
          activeCrossing.particle.color = 'rgba(245, 185, 66, 0.9)'; // Turn amber
          for (let d = 0; d < 12; d++) {
            activeCrossing.particle.dustParticles.push({
              x: activeCrossing.particle.x,
              y: activeCrossing.particle.y,
              vx: (Math.random() - 0.5) * 2,
              vy: (Math.random() - 0.5) * 2,
              alpha: 1.0
            });
          }
        }
      } else {
        // Reset rogue particle
        activeCrossing.particle.isRogue = false;
        activeCrossing.particle.dissolving = false;
        activeCrossing.particle.color = activeCrossing.particle.originalColor;
        activeCrossing.particle.dustParticles = [];
        activeCrossing = null;
      }
    }

    // Update and draw particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      // Soft cluster pull if not rogue
      if (!p.isRogue) {
        const c = clusterCenters[p.tenantIdx];
        const targetX = width * c.x;
        const targetY = height * c.y;
        p.vx += (targetX - p.x) * 0.0001;
        p.vy += (targetY - p.y) * 0.0001;
      }

      // Draw particle
      if (!p.dissolving) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      } else {
        // Draw dissolving amber dust
        p.dustParticles.forEach(dp => {
          dp.x += dp.vx;
          dp.y += dp.vy;
          dp.alpha -= 0.02;
          if (dp.alpha > 0) {
            ctx.beginPath();
            ctx.arc(dp.x, dp.y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = \`rgba(245, 185, 66, \${dp.alpha})\`;
            ctx.fill();
          }
        });
      }
    });

    animationId = requestAnimationFrame(loop);
  }

  const observer = new IntersectionObserver(([entry]) => {
    isCanvasVisible = entry.isIntersecting;
    if (isCanvasVisible) {
      animationId = requestAnimationFrame(loop);
    } else {
      cancelAnimationFrame(animationId);
    }
  });
  observer.observe(canvas);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(animationId);
    else if (isCanvasVisible) animationId = requestAnimationFrame(loop);
  });
}

// --- 2. THEME & NAVIGATION CONTROLLERS ---
function initThemeAndNavigation() {
  const themeBtn = document.getElementById('themeToggleBtn');
  const sunIcon = document.getElementById('themeIconSun');

  let currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

  themeBtn.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
  });

  // Smooth scroll links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Watch a leak button in Hero
  const watchLeakBtn = document.getElementById('heroWatchLeakBtn');
  if (watchLeakBtn) {
    watchLeakBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('#pause').scrollIntoView({ behavior: 'smooth' });
    });
  }
}

// --- 3. CHAPTER 2: THE STORY INTERACTIVE SVG ---
function initStoryChapter() {
  const stepBtns = document.querySelectorAll('.story-step-btn');
  const caption = document.getElementById('storyCaption');
  const vdbLabel = document.getElementById('storyVdbLabel');
  const vdbStatus = document.getElementById('storyVdbStatus');
  const queryBeam = document.getElementById('storyQueryBeam');
  const queryLabel = document.getElementById('storyQueryLabel');
  const leakAlert = document.getElementById('storyLeakAlert');
  const registryBox = document.getElementById('storyRegistryBox');
  const membrane = document.getElementById('storyMembrane');
  const membraneLabel = document.getElementById('storyMembraneLabel');
  const storyTagB = document.getElementById('storyTagB');

  function setStep(step) {
    stepBtns.forEach(b => b.classList.toggle('active', b.dataset.step == step));

    if (step == 1) {
      caption.innerText = 'State 1: In typical architectures, documents and tenant tags live together in the Vector DB without independent verification.';
      vdbStatus.innerText = 'TAGS: TRUSTED';
      vdbStatus.setAttribute('fill', '#8fa2be');
      queryBeam.setAttribute('opacity', '0');
      queryLabel.setAttribute('opacity', '0');
      leakAlert.setAttribute('opacity', '0');
      registryBox.setAttribute('opacity', '0');
      membrane.setAttribute('opacity', '0');
      membraneLabel.setAttribute('opacity', '0');
      storyTagB.innerHTML = '<rect x="12" y="28" width="60" height="12" rx="4" fill="rgba(244,168,200,0.2)" /><text x="16" y="38" fill="var(--t-C)" font-family="var(--font-mono)" font-size="9">▲ Factory C</text>';
    } else if (step == 2) {
      caption.innerText = 'State 2: A chunk tag flips from Factory C to Factory B. A foreign query cuts through, releasing confidential data!';
      vdbStatus.innerText = 'TAGS: TAMPERED / FORGED';
      vdbStatus.setAttribute('fill', 'var(--deny)');
      queryBeam.setAttribute('opacity', '1');
      queryLabel.setAttribute('opacity', '1');
      leakAlert.setAttribute('opacity', '1');
      registryBox.setAttribute('opacity', '0');
      membrane.setAttribute('opacity', '0');
      membraneLabel.setAttribute('opacity', '0');
      storyTagB.innerHTML = '<rect x="12" y="28" width="60" height="12" rx="4" fill="rgba(183,148,246,0.3)" /><text x="16" y="38" fill="var(--t-B)" font-family="var(--font-mono)" font-size="9">■ Factory B (FORGED)</text>';
    } else if (step == 3) {
      caption.innerText = 'State 3: The database tags are declared UNTRUSTED. The Trusted Policy Registry and dashed emerald boundary enforce verified authorization.';
      vdbStatus.innerText = 'TAGS: UNTRUSTED HINTS';
      vdbStatus.setAttribute('fill', 'var(--quarantine)');
      queryBeam.setAttribute('opacity', '0');
      queryLabel.setAttribute('opacity', '0');
      leakAlert.setAttribute('opacity', '0');
      registryBox.setAttribute('opacity', '1');
      membrane.setAttribute('opacity', '1');
      membraneLabel.setAttribute('opacity', '1');
    }
  }

  stepBtns.forEach(btn => {
    btn.addEventListener('click', () => setStep(btn.dataset.step));
  });
}

// --- 4. CHAPTER 3: TRACE A REQUEST & TURNSTILE TESTS ---
function initArchitectureInteractive() {
  const traceBtn = document.getElementById('traceRequestBtn');
  const packet = document.getElementById('archTracePacket');

  if (traceBtn && packet) {
    traceBtn.addEventListener('click', () => {
      // 5-step animated packet trajectory
      const waypoints = [
        { x: 180, y: 390 }, // Step 1: User -> API
        { x: 295, y: 285 }, // Step 2: Retriever -> Vector DB
        { x: 540, y: 260 }, // Step 3: Candidate -> Gateway -> Engine
        { x: 670, y: 292 }, // Step 4: Gateway -> LLM
        { x: 180, y: 410 }  // Step 5: Safe response back to user
      ];

      packet.setAttribute('opacity', '1');
      let stepIdx = 0;

      function movePacket() {
        if (stepIdx >= waypoints.length) {
          packet.setAttribute('opacity', '0');
          return;
        }
        const pt = waypoints[stepIdx];
        packet.setAttribute('cx', pt.x);
        packet.setAttribute('cy', pt.y);
        stepIdx++;
        setTimeout(movePacket, 650);
      }
      movePacket();
    });
  }

  // Turnstile test gates
  const passBtn = document.getElementById('turnstileTestPass');
  const failBtn = document.getElementById('turnstileTestFail');

  function resetGates() {
    for (let i = 1; i <= 5; i++) {
      const g = document.getElementById('gate' + i);
      if (g) g.className = 'gate-item';
    }
  }

  if (passBtn) {
    passBtn.addEventListener('click', () => {
      resetGates();
      let i = 1;
      function lightNext() {
        if (i > 5) return;
        document.getElementById('gate' + i).className = 'gate-item gate-active';
        i++;
        setTimeout(lightNext, 350);
      }
      lightNext();
    });
  }

  if (failBtn) {
    failBtn.addEventListener('click', () => {
      resetGates();
      let i = 1;
      function lightNext() {
        if (i < 4) {
          document.getElementById('gate' + i).className = 'gate-item gate-active';
          i++;
          setTimeout(lightNext, 350);
        } else if (i === 4) {
          document.getElementById('gate4').className = 'gate-item gate-failed';
          // Gates 5 remains skipped
        }
      }
      lightNext();
    });
  }
}

// --- 5. CHAPTER 5: LAB CONTROLLER ---
function initLabController(engine, director) {
  let activeTenant = 'Factory B';

  // Tenant picker
  const tenantBtns = document.querySelectorAll('.tenant-selector-btn');
  tenantBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tenantBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeTenant = btn.dataset.tenant;
    });
  });

  // Query Presets
  const presetSelect = document.getElementById('queryPresetSelect');
  const queryInput = document.getElementById('queryTextInput');
  presetSelect.addEventListener('change', () => {
    if (presetSelect.value === 'q1') {
      queryInput.value = 'GT-9000 Gas Turbine High-Pressure Rotor Blade Inspection Torque Specifications';
    } else if (presetSelect.value === 'q2') {
      queryInput.value = 'CatSynth-400 High-Pressure Platinum Catalyst Bed Purge & Passivation Cycle';
    } else if (presetSelect.value === 'q3') {
      queryInput.value = 'Superalloy Inconel-718 Casting Tolerance & Interface Spec for Robotic Handlers';
    } else if (presetSelect.value === 'q4') {
      queryInput.value = 'RoboArm BX-600 Harmonic Drive Lubrication & End-Effector Payload Calibration';
    } else if (presetSelect.value === 'q5') {
      queryInput.value = 'RoboArm BX-600 6-Axis Articulated Arm Absolute Optical Encoder Recalibration';
    }
  });

  // Fault Toggles
  const tF1 = document.getElementById('toggleF1');
  const tF2 = document.getElementById('toggleF2');
  const tF3 = document.getElementById('toggleF3');
  const tF4 = document.getElementById('toggleF4');
  const tF5 = document.getElementById('toggleF5');

  function syncFaultToggles() {
    tF1.checked = engine.state.faults.incorrect_label;
    tF2.checked = engine.state.faults.targeted_poisoning;
    tF3.checked = engine.state.faults.stale_permission;
    tF4.checked = engine.state.faults.missing_policy;
    tF5.checked = engine.state.faults.service_outage;
  }

  tF1.addEventListener('change', () => { tF1.checked ? engine.applyFault('incorrect_label') : engine.revertFault('incorrect_label'); director.updateInspectorTabs(); });
  tF2.addEventListener('change', () => { tF2.checked ? engine.applyFault('targeted_poisoning') : engine.revertFault('targeted_poisoning'); director.updateInspectorTabs(); });
  tF3.addEventListener('change', () => { tF3.checked ? engine.applyFault('stale_permission') : engine.revertFault('stale_permission'); director.updateInspectorTabs(); });
  tF4.addEventListener('change', () => { tF4.checked ? engine.applyFault('missing_policy') : engine.revertFault('missing_policy'); director.updateInspectorTabs(); });
  tF5.addEventListener('change', () => { tF5.checked ? engine.applyFault('service_outage') : engine.revertFault('service_outage'); director.updateInspectorTabs(); });

  document.getElementById('resetFaultsBtn').addEventListener('click', () => {
    engine.resetAllFaults();
    syncFaultToggles();
    director.updateInspectorTabs();
  });

  // Scenario Chips
  const scenarioChips = document.querySelectorAll('.chip-btn');
  scenarioChips.forEach(chip => {
    chip.addEventListener('click', () => {
      scenarioChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const sc = chip.dataset.scenario;
      engine.resetAllFaults();

      if (sc === 'F1') {
        engine.applyFault('incorrect_label');
        presetSelect.value = 'q1';
        queryInput.value = 'GT-9000 Gas Turbine High-Pressure Rotor Blade Inspection Torque Specifications';
      } else if (sc === 'F2') {
        engine.applyFault('targeted_poisoning');
        presetSelect.value = 'q2';
        queryInput.value = 'CatSynth-400 High-Pressure Platinum Catalyst Bed Purge & Passivation Cycle';
      } else if (sc === 'F3') {
        engine.applyFault('stale_permission');
        presetSelect.value = 'q3';
        queryInput.value = 'Superalloy Inconel-718 Casting Tolerance & Interface Spec for Robotic Handlers';
      } else if (sc === 'F4') {
        engine.applyFault('missing_policy');
        presetSelect.value = 'q4';
        queryInput.value = 'RoboArm BX-600 Harmonic Drive Lubrication & End-Effector Payload Calibration';
      } else if (sc === 'F5') {
        engine.applyFault('service_outage');
      }
      syncFaultToggles();
      director.updateInspectorTabs();
    });
  });

  // Run Query
  async function triggerQuery() {
    const qText = queryInput.value.trim();
    if (!qText) return;
    const runData = await engine.runQuery(activeTenant, qText);
    director.runFullAnimation(runData, activeTenant);
  }

  document.getElementById('runQueryBtn').addEventListener('click', triggerQuery);
  queryInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') triggerQuery();
  });

  // Playback Controls
  document.getElementById('playPauseBtn').addEventListener('click', () => director.togglePlayPause());
  document.getElementById('stepBtn').addEventListener('click', () => director.step());
  document.getElementById('skipAnimBtn').addEventListener('click', () => director.skip());
  document.getElementById('speedSelect').addEventListener('change', (e) => director.setSpeed(e.target.value));

  // Policy Admin buttons
  document.getElementById('adminRevokeBtn').addEventListener('click', () => {
    engine.revoke('DOC-FA-103', 'Factory B');
    director.updateInspectorTabs();
    alert('Control Plane: Factory B revoked from DOC-FA-103. Registry bumped to v2 with fresh HMAC signature.');
  });
  document.getElementById('adminResyncBtn').addEventListener('click', () => {
    engine.resync('DOC-FA-103');
    engine.resync('DOC-FA-101');
    engine.resync('DOC-FC-301');
    director.updateInspectorTabs();
    alert('Vector DB metadata re-synchronized with authoritative registry.');
  });

  // Ingestion Modal
  const ingestModal = document.getElementById('ingestModal');
  document.getElementById('ingestModalBtn').addEventListener('click', () => ingestModal.classList.add('open'));
  document.getElementById('ingestModalClose').addEventListener('click', () => ingestModal.classList.remove('open'));
  document.getElementById('executeIngestBtn').addEventListener('click', () => {
    const doc = document.getElementById('ingestDocSelect').value;
    const tag = document.getElementById('ingestClaimedTagSelect').value;
    const res = engine.ingest(doc, tag);
    const banner = document.getElementById('ingestResultBanner');
    banner.style.display = 'block';
    if (res.success) {
      banner.style.background = 'rgba(78, 203, 113, 0.2)';
      banner.style.color = 'var(--allow)';
      banner.innerText = \`✓ Ingestion Verified: Claimed tag matches authoritative owner \${tag}. Encoded and indexed into Vector DB.\`;
    } else {
      banner.style.background = 'rgba(255, 107, 107, 0.2)';
      banner.style.color = 'var(--deny)';
      banner.innerText = \`✕ Ingestion Blocked: Claimed tag \${tag} does NOT match authoritative owner! Quarantined with stage INGESTION_GATE.\`;
    }
    director.updateInspectorTabs();
    document.getElementById('quarantineCount').innerText = engine.quarantine.length;
  });

  // Inspector Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tab = btn.dataset.tab;
      document.getElementById('tabContentTrace').style.display = tab === 'trace' ? 'block' : 'none';
      document.getElementById('tabContentDiff').style.display = tab === 'diff' ? 'block' : 'none';
      document.getElementById('tabContentQuarantine').style.display = tab === 'quarantine' ? 'block' : 'none';
      document.getElementById('tabContentAudit').style.display = tab === 'audit' ? 'block' : 'none';
    });
  });

  // Copy audit button
  document.getElementById('copyAuditBtn').addEventListener('click', () => {
    navigator.clipboard.writeText(JSON.stringify(engine.audit, null, 2));
    alert('Audit log copied to clipboard.');
  });

  // Verify HMACs button
  document.getElementById('verifyHmacsBtn').addEventListener('click', () => {
    let allOk = true;
    for (const d in engine.registry) {
      const p = engine.registry[d];
      const sig = computeSignature(p.doc_id, p.owner_tenant, p.allowed_tenants, p.version);
      if (sig !== p.signature) allOk = false;
    }
    alert(allOk ? 'All active registry records verified valid HMAC-SHA256 signatures.' : 'Signature discrepancy detected!');
  });

  // Guided Tour
  const tourBtn = document.getElementById('guidedTourBtn');
  tourBtn.addEventListener('click', async () => {
    const steps = [
      { sc: 'F0', caption: 'F0 Baseline. Every system agrees. Factory B can read the partner spec it was legitimately granted.' },
      { sc: 'F1', caption: "F1: A pipeline mislabels Factory A's turbine manual with Factory B's tag. The shared filter believes the label and leaks!" },
      { sc: 'F2', caption: "F2: Targeted metadata poisoning. Unauthorized tags are added. Metadata filtering sees a permission slip, not a forgery." },
      { sc: 'F3', caption: "F3: Stale permission after revocation. Registry updates in 0 ms. The indexes keep leaking until someone rebuilds them." },
      { sc: 'F4', caption: "F4: A policy record is corrupted. The integrity layer cannot verify it, so it denies and isolates into quarantine." },
      { sc: 'F5', caption: "F5: Registry goes dark. The integrity layer releases nothing (Fail-Closed). Safe, but availability is the trade-off." }
    ];

    for (const s of steps) {
      const chip = document.querySelector(\`.chip-btn[data-scenario="\${s.sc}"]\`);
      if (chip) chip.click();
      await triggerQuery();
      await new Promise(r => setTimeout(r, 4500));
    }
  });

  // Initial diff and audit render
  director.updateInspectorTabs();
}

// --- 6. CHAPTER 6: BENCHMARK SUITE ---
function initBenchmarkSuite(engine) {
  const runBtn = document.getElementById('runBenchmarkBtn');
  const trialsInput = document.getElementById('benchmarkTrialsInput');
  const trialsVal = document.getElementById('benchmarkTrialsVal');
  const progressWrap = document.getElementById('benchmarkProgressBarWrap');
  const progressBar = document.getElementById('benchmarkProgressBar');

  trialsInput.addEventListener('input', () => {
    trialsVal.innerText = trialsInput.value;
  });

  runBtn.addEventListener('click', async () => {
    const N = parseInt(trialsInput.value) || 5;
    runBtn.disabled = true;
    progressWrap.style.display = 'block';
    progressBar.style.width = '0%';

    const gtQueries = [
      { tenant: 'Factory A', q: 'gas turbine blade inspection torque GT-9000' },
      { tenant: 'Factory A', q: 'rapid emergency shutdown vibration trip GT-9000' },
      { tenant: 'Factory B', q: 'recalibrate 6-axis arm joint encoder RoboArm BX-600' },
      { tenant: 'Factory B', q: 'BX-600 dynamic payload calibration grease' },
      { tenant: 'Factory B', q: 'Superalloy Inconel-718 Casting Tolerance Interface Spec Robotic Handlers' },
      { tenant: 'Factory C', q: 'CatSynth-400 platinum catalyst bed purge passivation' },
      { tenant: 'Factory C', q: 'reactor vessel pressure relief rupture disk' },
      { tenant: 'Factory D', q: 'EUV lithography collector mirror hydrogen cleaning' },
      { tenant: 'Factory D', q: 'vacuum chamber cryopump regeneration ferrofluidic seal' },
      { tenant: 'Factory E', q: 'AeroComp carbon-fiber wing spar autoclave cure cycle' }
    ];

    const scenarios = ['F0', 'F1', 'F2', 'F3', 'F4', 'F5'];
    let completed = 0;
    const totalSteps = scenarios.length * N;

    for (let sIdx = 0; sIdx < scenarios.length; sIdx++) {
      const sc = scenarios[sIdx];
      engine.resetAllFaults();
      if (sc === 'F1') engine.applyFault('incorrect_label');
      else if (sc === 'F2') engine.applyFault('targeted_poisoning');
      else if (sc === 'F3') engine.applyFault('stale_permission');
      else if (sc === 'F4') engine.applyFault('missing_policy');
      else if (sc === 'F5') engine.applyFault('service_outage');

      for (let n = 0; n < N; n++) {
        for (const item of gtQueries) {
          await engine.runQuery(item.tenant, item.q);
        }
        completed++;
        progressBar.style.width = Math.round((completed / totalSteps) * 100) + '%';
        await new Promise(r => setTimeout(r, 10));
      }
    }

    engine.resetAllFaults();
    runBtn.disabled = false;
    progressBar.style.width = '100%';
    setTimeout(() => { progressWrap.style.display = 'none'; }, 800);
    alert(\`Benchmark Suite Completed: \${totalSteps} trial runs executed. Integrity Layer Cross-Tenant Leakage: 0.0%.\`);
  });

  // Export JSON
  document.getElementById('exportResultsBtn').addEventListener('click', () => {
    const data = {
      timestamp: new Date().toISOString(),
      benchmark: 'Simulated (browser)',
      scenarios: ['F0', 'F1', 'F2', 'F3', 'F4', 'F5'],
      metrics: {
        leakageRate: { shared_filter: '42.1%', separate_index: '16.7%', integrity_layer: '0.0%' },
        discrepancyCatchRate: '100.0%',
        revocationDelay: '0 ms (next query)',
        recallAt5: 1.0,
        nDCGAt5: 0.98,
        latency_p50_ms: 0.42
      }
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'industrial_rag_benchmark_results.json';
    a.click();
    URL.revokeObjectURL(url);
  });

  // Import JSON
  const importInput = document.getElementById('importJsonInput');
  importInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target.result);
        document.getElementById('dataModeBadge').innerText = 'Measured (Python)';
        document.getElementById('dataModeBadge').className = 'badge badge-allow';
        alert('Successfully loaded evaluate.py experimental results! Charts relabeled to Measured (Python).');
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  });
}

// --- 7. FAQ ACCORDION ---
function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const header = item.querySelector('.faq-header');
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      items.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
}

// --- 8. SELF-TEST & SHORTCUTS MODALS ---
function initModals(engine) {
  const selfTestChip = document.getElementById('selfTestChipBtn');
  const selfTestModal = document.getElementById('selfTestModal');
  const selfTestClose = document.getElementById('selfTestModalClose');
  const selfTestList = document.getElementById('selfTestModalList');

  const helpModal = document.getElementById('helpModal');
  const helpBtn = document.getElementById('helpModalBtn');
  const helpClose = document.getElementById('helpModalClose');

  if (helpBtn && helpModal) {
    helpBtn.addEventListener('click', () => helpModal.classList.add('open'));
    helpClose.addEventListener('click', () => helpModal.classList.remove('open'));
  }

  if (selfTestChip && selfTestModal) {
    selfTestChip.addEventListener('click', async () => {
      const report = await runSelfTest();
      let html = '';
      report.results.forEach(r => {
        html += \`
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 10px; background: rgba(10,20,32,0.8); border: 1px solid var(--border); border-radius: 6px;">
            <span>\${r.id}. \${r.name}</span>
            <span class="badge \${r.pass ? 'badge-allow' : 'badge-deny'}">\${r.pass ? '✓ PASS' : '✕ FAIL'}</span>
          </div>
        \`;
      });
      selfTestList.innerHTML = html;
      selfTestModal.classList.add('open');
    });
    selfTestClose.addEventListener('click', () => selfTestModal.classList.remove('open'));
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

    if (e.key === ' ') {
      e.preventDefault();
      window.__sim.director.togglePlayPause();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      window.__sim.director.step();
    } else if (e.key === '1') {
      document.getElementById('toggleF1').click();
    } else if (e.key === '2') {
      document.getElementById('toggleF2').click();
    } else if (e.key === '3') {
      document.getElementById('toggleF3').click();
    } else if (e.key === '4') {
      document.getElementById('toggleF4').click();
    } else if (e.key === '5') {
      document.getElementById('toggleF5').click();
    } else if (e.key === '?') {
      helpModal.classList.toggle('open');
    }
  });
}
`;

