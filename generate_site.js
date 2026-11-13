// generate_site.js - Compiles simulation.html from modular components
const fs = require('fs');
const path = require('path');

const styles = require('./src_styles.js');
const markup = require('./src_markup.js');
const engine = require('./src_engine.js');
const director = require('./src_director.js');
const ui = require('./src_ui.js');

const htmlContent = `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Beyond Metadata Filtering: An Authorization-Integrity Layer for Secure Multi-Tenant Industrial RAG Systems</title>
  
  <!-- Preconnect to Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
  
  <!-- Pinned CDN scripts with offline graceful fallback -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.1.9/dist/lenis.min.js"></script>
  
  <style>
${styles}
  </style>
</head>
<body>
${markup}

  <!-- SIMULATION ENGINE & UI SCRIPTS -->
  <script>
${engine}

${director}

${ui}

  // --- BOOTSTRAP INITIALIZATION ---
  window.addEventListener('DOMContentLoaded', async () => {
    // 1. Initialize Lenis smooth scroll if loaded
    if (typeof Lenis !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.innerWidth >= 800) {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true
      });
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    // 2. Instantiate core engine & director
    const engine = new SimEngine();
    const director = new SimDirector(engine);
    window.__sim = { engine, director, selfTest: runSelfTest };

    // 3. Initialize all UI submodules
    initHeroCanvas();
    initThemeAndNavigation();
    initStoryChapter();
    initArchitectureInteractive();
    initLabController(engine, director);
    initBenchmarkSuite(engine);
    initFaqAccordion();
    initModals(engine);

    // 4. Run automated self-test on load
    const testReport = await runSelfTest();
    const chipStatus = document.getElementById('selfTestChipStatus');
    if (chipStatus) {
      chipStatus.innerText = \`Engine self-test ✓ \${testReport.passCount}/\${testReport.total}\`;
    }

    // 5. Run initial state query on load so lanes and inspector are populated
    const initialRun = await engine.runQuery('Factory B', 'GT-9000 Gas Turbine High-Pressure Rotor Blade Inspection Torque Specifications');
    await director.playBeat(2, initialRun, 'Factory B');
    await director.playBeat(5, initialRun, 'Factory B');
    await director.playBeat(6, initialRun, 'Factory B');
  });
  </script>
</body>
</html>
`;

const outputPath = path.join(__dirname, 'simulation.html');
fs.writeFileSync(outputPath, htmlContent, 'utf8');
console.log('Successfully generated simulation.html at:', outputPath);
console.log('File size in bytes:', fs.statSync(outputPath).size);
