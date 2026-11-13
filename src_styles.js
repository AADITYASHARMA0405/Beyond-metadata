// src_styles.js - Complete CSS design system for simulation.html
module.exports = `
:root {
  /* Dark Cinematic (default) */
  --bg-primary: #0a1628;
  --bg-secondary: #1a2d4a;
  --bg-gradient: linear-gradient(180deg, #0a1628 0%, #11223b 50%, #1a2d4a 100%);
  --bg-card: rgba(18, 35, 60, 0.7);
  --bg-glass: rgba(255, 255, 255, 0.05);
  --bg-glass-hover: rgba(255, 255, 255, 0.09);
  --border: rgba(255, 255, 255, 0.10);
  --border-strong: rgba(255, 255, 255, 0.20);
  --text-primary: #ffffff;
  --text-secondary: #e8e0d4;
  --text-muted: #8fa2be;
  
  --accent: #2d8c3c;
  --accent-bright: #4ecb71;
  --accent-shadow: rgba(46, 140, 60, 0.35);
  --ease: cubic-bezier(0.2, 0.8, 0.2, 1);

  /* Simulation semantics: used ONLY to encode state */
  --allow: #4ecb71;
  --deny: #ff6b6b;
  --quarantine: #f5b942;
  --info: #7cc4ff;

  /* Tenant hues: muted, paired with shape + letter */
  --t-A: #6db8ff;
  --t-B: #b794f6;
  --t-C: #f4a8c8;
  --t-D: #c9d6e8;
  --t-E: #e8c9a0;
  
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', SFMono-Regular, Consolas, monospace;
}

[data-theme="light"] {
  /* Presentation mode: Light Editorial tokens */
  --bg-primary: #ffffff;
  --bg-secondary: #f0f8f3;
  --bg-gradient: linear-gradient(180deg, #ffffff 0%, #f4fbf6 50%, #eaf4ed 100%);
  --bg-card: rgba(255, 255, 255, 0.92);
  --bg-glass: #ffffff;
  --bg-glass-hover: rgba(230, 245, 235, 0.6);
  --border: #c1c2d6;
  --border-strong: #9ca0b8;
  --text-primary: #121418;
  --text-secondary: #4d4d4d;
  --text-muted: #555e6d;
  
  --accent: #9de85a;
  --accent-bright: #3cb853;
  --accent-shadow: rgba(60, 184, 83, 0.25);
  
  --deny: #c62d2d;
  --quarantine: #9a6700;
  --info: #1560b0;

  /* Deepened tenant hues ~25% for contrast on white */
  --t-A: #2072c4;
  --t-B: #6f3fc8;
  --t-C: #bd3169;
  --t-D: #4b668d;
  --t-E: #9a6828;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: var(--font-sans);
  background: var(--bg-primary);
  color: var(--text-primary);
  scroll-behavior: smooth;
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
  overflow-x: hidden;
  position: relative;
  min-height: 100vh;
}

/* Glassmorphic Pill Navbar */
.nav-wrap {
  position: fixed;
  top: 20px;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  pointer-events: none;
  padding: 0 16px;
}
.nav-pill {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 8px 18px;
  background: rgba(10, 22, 40, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border);
  border-radius: 100px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  transition: all 0.3s var(--ease);
}
[data-theme="light"] .nav-pill {
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}
.nav-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.88rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-decoration: none;
  color: var(--text-primary);
}
.nav-brand-dot {
  width: 8px;
  height: 8px;
  background: var(--accent-bright);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--accent-bright);
  animation: glowPulse 3s infinite var(--ease);
}
.nav-links {
  display: flex;
  align-items: center;
  gap: 16px;
  list-style: none;
}
.nav-links a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 400;
  transition: color 0.2s var(--ease);
}
.nav-links a:hover, .nav-links a.active {
  color: var(--text-primary);
}
.nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
.btn-nav-lab {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: linear-gradient(135deg, var(--accent), var(--accent-bright));
  color: #fff;
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 100px;
  box-shadow: 0 2px 14px var(--accent-shadow);
  transition: transform 0.2s var(--ease), box-shadow 0.2s var(--ease);
}
[data-theme="light"] .btn-nav-lab {
  color: #121418;
}
.btn-nav-lab:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 20px var(--accent-shadow);
}
.btn-icon {
  background: var(--bg-glass);
  border: 1px solid var(--border);
  color: var(--text-primary);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s var(--ease);
}
.btn-icon:hover {
  background: var(--bg-glass-hover);
  border-color: var(--border-strong);
}

/* Typography Helpers */
h1, h2, h3, h4 {
  font-family: var(--font-serif);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.15;
}
h1 {
  font-size: clamp(2.6rem, 5.5vw, 4.8rem);
  text-shadow: 0 2px 30px rgba(0, 0, 0, 0.4);
}
h2 {
  font-size: clamp(2rem, 3.8vw, 3.2rem);
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}
h3 {
  font-size: clamp(1.2rem, 2vw, 1.6rem);
}
.accent-phrase {
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 400;
  color: var(--accent-bright);
}
.text-mono {
  font-family: var(--font-mono);
}
p.lead {
  font-size: clamp(1rem, 1.25vw, 1.2rem);
  line-height: 1.7;
  color: var(--text-secondary);
  max-width: 680px;
  margin-top: 16px;
}

/* Global Container */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}
.section {
  padding: 100px 0;
  position: relative;
}

/* Glass Card */
.glass-card {
  background: var(--bg-card);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  transition: border-color 0.2s var(--ease), box-shadow 0.2s var(--ease);
}
.glass-card:hover {
  border-color: var(--border-strong);
}

/* Dashed Accent Card: Reserved for Trusted Enforcement Boundary */
.boundary-card {
  border: 1.5px dashed var(--accent-bright) !important;
  border-radius: 16px;
  position: relative;
  box-shadow: 0 0 25px rgba(78, 203, 113, 0.12);
}

/* Badges and Chips */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 10px;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid var(--border);
  background: var(--bg-glass);
  letter-spacing: 0.02em;
}
.badge-tenant-A { color: var(--t-A); border-color: rgba(109,184,255,0.4); }
.badge-tenant-B { color: var(--t-B); border-color: rgba(183,148,246,0.4); }
.badge-tenant-C { color: var(--t-C); border-color: rgba(244,168,200,0.4); }
.badge-tenant-D { color: var(--t-D); border-color: rgba(201,214,232,0.4); }
.badge-tenant-E { color: var(--t-E); border-color: rgba(232,201,160,0.4); }

.badge-allow { background: rgba(78, 203, 113, 0.15); color: var(--allow); border-color: var(--allow); }
.badge-deny { background: rgba(255, 107, 107, 0.15); color: var(--deny); border-color: var(--deny); }
.badge-quarantine { background: rgba(245, 185, 66, 0.15); color: var(--quarantine); border-color: var(--quarantine); }
.badge-info { background: rgba(124, 196, 255, 0.15); color: var(--info); border-color: var(--info); }

/* Buttons */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, var(--accent), var(--accent-bright));
  color: #fff;
  border: none;
  font-size: 0.95rem;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 100px;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 4px 20px var(--accent-shadow);
  transition: transform 0.2s var(--ease), box-shadow 0.2s var(--ease);
}
[data-theme="light"] .btn-primary { color: #121418; }
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 26px var(--accent-shadow);
}
.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(4px);
  border: 1px solid var(--border);
  color: var(--text-primary);
  font-size: 0.95rem;
  font-weight: 500;
  padding: 12px 24px;
  border-radius: 100px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s var(--ease);
}
.btn-ghost:hover {
  background: var(--bg-glass-hover);
  border-color: var(--border-strong);
  transform: translateY(-1px);
}

/* Animations: Motion Budget Max 4 types */
@keyframes glowPulse {
  0%, 100% { opacity: 0.8; filter: drop-shadow(0 0 6px var(--accent-bright)); }
  50% { opacity: 1; filter: drop-shadow(0 0 14px var(--accent-bright)); }
}
@keyframes gentleBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}
@keyframes shardScatter {
  0% { transform: scale(1) translate(0, 0) rotate(0deg); opacity: 1; }
  100% { transform: scale(0.3) translate(var(--sx), var(--sy)) rotate(var(--sr)); opacity: 0; }
}

/* Word Stagger */
.word-stagger span {
  display: inline-block;
  opacity: 0;
  filter: blur(8px);
  transform: translateY(12px);
  animation: blurIn 0.68s var(--ease) forwards;
}
@keyframes blurIn {
  to {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
}

/* Chapter 1: Hero */
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding-top: 60px;
}
.hero-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  filter: brightness(0.55) saturate(0.8) contrast(1.05);
}
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: radial-gradient(circle at 50% 45%, rgba(10, 22, 40, 0.2) 0%, rgba(10, 22, 40, 0.85) 75%, var(--bg-primary) 100%);
  pointer-events: none;
}
[data-theme="light"] .hero-overlay {
  background: radial-gradient(circle at 50% 45%, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.85) 75%, var(--bg-primary) 100%);
}
.hero-content {
  position: relative;
  z-index: 3;
  text-align: center;
  max-width: 900px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hero-tag {
  margin-bottom: 24px;
}
.hero-buttons {
  display: flex;
  gap: 16px;
  margin-top: 36px;
  flex-wrap: wrap;
  justify-content: center;
}
.scroll-indicator {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--text-muted);
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  animation: gentleBounce 2.4s infinite ease-in-out;
}
.scroll-indicator svg {
  stroke: var(--text-muted);
}

/* Chapter 2: The Story */
.story-grid {
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  gap: 48px;
  align-items: center;
}
.story-scene-container {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  position: relative;
  min-height: 380px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.story-nav-steps {
  display: flex;
  gap: 8px;
  margin-top: 16px;
}
.story-step-btn {
  flex: 1;
  padding: 8px 12px;
  background: var(--bg-glass);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-muted);
  font-size: 0.82rem;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s var(--ease);
}
.story-step-btn.active {
  background: rgba(78, 203, 113, 0.15);
  border-color: var(--accent-bright);
  color: var(--text-primary);
  font-weight: 600;
}

/* Chapter 3: Steps & Architecture */
.planes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 40px;
}
.plane-card {
  position: relative;
  overflow: hidden;
}
.plane-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}
.plane-number {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--accent-bright);
  background: rgba(78, 203, 113, 0.1);
  padding: 3px 8px;
  border-radius: 6px;
  border: 1px solid rgba(78, 203, 113, 0.3);
}
.architecture-svg-box {
  background: rgba(14, 28, 48, 0.7);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
  position: relative;
}
[data-theme="light"] .architecture-svg-box {
  background: rgba(240, 248, 243, 0.7);
}
.arch-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.formula-box {
  background: rgba(10, 18, 30, 0.8);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px 20px;
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
[data-theme="light"] .formula-box {
  background: #f7faf8;
}

/* Turnstile Gates */
.turnstile-box {
  margin-top: 36px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 24px;
}
.gates-sequence {
  display: flex;
  gap: 12px;
  margin: 20px 0;
  flex-wrap: wrap;
}
.gate-item {
  flex: 1;
  min-width: 170px;
  padding: 14px;
  background: var(--bg-glass);
  border: 1px solid var(--border);
  border-radius: 12px;
  position: relative;
  transition: all 0.3s var(--ease);
}
.gate-item.gate-active {
  border-color: var(--accent-bright);
  box-shadow: 0 0 16px rgba(78, 203, 113, 0.2);
}
.gate-item.gate-failed {
  border-color: var(--deny);
  box-shadow: 0 0 16px rgba(255, 107, 107, 0.2);
}

/* Chapter 4: The Pause */
.pause-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: #060e1a;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  position: relative;
}
[data-theme="light"] .pause-section {
  background: #f4fbf6;
}
.pause-quote {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(1.4rem, 2.4vw, 2.1rem);
  line-height: 1.5;
  color: var(--text-primary);
  max-width: 820px;
  margin: 0 auto 36px;
  text-align: center;
}
.pause-stat-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
  padding: 8px 18px;
  border-radius: 100px;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  margin-top: 24px;
}

/* Chapter 5: The Lab */
.lab-header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
  padding: 16px 20px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
}
.scenario-chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.chip-btn {
  background: var(--bg-glass);
  border: 1px solid var(--border);
  color: var(--text-secondary);
  padding: 6px 12px;
  border-radius: 100px;
  font-size: 0.78rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s var(--ease);
}
.chip-btn:hover {
  background: var(--bg-glass-hover);
  border-color: var(--border-strong);
  color: var(--text-primary);
}
.chip-btn.active {
  background: rgba(78, 203, 113, 0.18);
  border-color: var(--accent-bright);
  color: var(--accent-bright);
  font-weight: 600;
}

.playback-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.lab-layout {
  display: grid;
  grid-template-columns: 280px 1fr 340px;
  gap: 20px;
  align-items: start;
}

/* Left Column: Controls */
.controls-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.control-group-title {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
  margin-bottom: 8px;
}
.tenant-chips-grid {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.tenant-selector-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 7px 10px;
  background: var(--bg-glass);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-secondary);
  font-size: 0.82rem;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s var(--ease);
}
.tenant-selector-btn:hover {
  background: var(--bg-glass-hover);
  color: var(--text-primary);
}
.tenant-selector-btn.active {
  border-color: var(--accent-bright);
  background: rgba(78, 203, 113, 0.12);
  color: var(--text-primary);
  font-weight: 600;
}

.query-input-wrap {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.select-dark, .input-dark {
  width: 100%;
  background: rgba(10, 20, 34, 0.8);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 8px 12px;
  color: var(--text-primary);
  font-size: 0.84rem;
  font-family: var(--font-sans);
  outline: none;
  transition: border-color 0.2s;
}
[data-theme="light"] .select-dark, [data-theme="light"] .input-dark {
  background: #ffffff;
  color: #121418;
}
.select-dark:focus, .input-dark:focus {
  border-color: var(--accent-bright);
}

.fault-switches-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.fault-switch-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  background: var(--bg-glass);
  border: 1px solid var(--border);
  border-radius: 8px;
}
.switch-label {
  font-size: 0.8rem;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.switch-desc {
  font-size: 0.7rem;
  color: var(--text-muted);
}
.toggle-switch {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
}
.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(255, 255, 255, 0.15);
  transition: 0.3s;
  border-radius: 34px;
}
.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
}
input:checked + .slider {
  background-color: var(--deny);
}
input:checked + .slider:before {
  transform: translateX(16px);
}

/* Center Column: 3 Lanes */
.lanes-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.lanes-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1.25fr;
  gap: 14px;
}
.lane-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 540px;
  position: relative;
}
.lane-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border);
  padding-bottom: 10px;
}
.lane-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 6px;
}
.lane-stage {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
}

/* Visual Candidate Cards inside Lanes */
.candidate-card-visual {
  background: rgba(14, 28, 48, 0.85);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 0.78rem;
  transition: all 0.3s var(--ease);
  position: relative;
}
[data-theme="light"] .candidate-card-visual {
  background: rgba(240, 248, 243, 0.95);
}
.candidate-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}
.doc-id-pill {
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 0.75rem;
}
.candidate-tags {
  display: flex;
  gap: 4px;
  margin-top: 6px;
  flex-wrap: wrap;
}

/* Check Lights in Lane 3 */
.check-lights-row {
  display: flex;
  gap: 4px;
  margin: 6px 0;
  background: rgba(10, 20, 32, 0.7);
  padding: 6px 8px;
  border-radius: 8px;
  border: 1px solid var(--border);
  justify-content: space-between;
}
[data-theme="light"] .check-lights-row {
  background: rgba(230, 242, 235, 0.7);
}
.check-light-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  font-size: 0.65rem;
  font-family: var(--font-mono);
}
.check-light-bulb {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid var(--border);
  transition: all 0.2s var(--ease);
}
.check-light-bulb.pass {
  background: var(--allow);
  box-shadow: 0 0 10px var(--allow);
  border-color: var(--allow);
}
.check-light-bulb.fail {
  background: var(--deny);
  box-shadow: 0 0 10px var(--deny);
  border-color: var(--deny);
}

.llm-output-box {
  background: rgba(10, 20, 32, 0.9);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 10px;
  font-size: 0.78rem;
  line-height: 1.5;
  min-height: 80px;
}
[data-theme="light"] .llm-output-box {
  background: #ffffff;
}
.canary-token {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  padding: 2px 5px;
  border-radius: 4px;
}
.canary-token.safe {
  background: rgba(78, 203, 113, 0.2);
  color: var(--allow);
}
.canary-token.leak {
  background: rgba(255, 107, 107, 0.25);
  color: var(--deny);
  font-weight: 700;
  animation: glowPulse 2s infinite ease-in-out;
}

/* Right Column: Inspector */
.inspector-col {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 16px;
  min-height: 540px;
  display: flex;
  flex-direction: column;
}
.inspector-tabs {
  display: flex;
  gap: 6px;
  border-bottom: 1px solid var(--border);
  padding-bottom: 10px;
  margin-bottom: 12px;
  overflow-x: auto;
}
.tab-btn {
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-size: 0.78rem;
  font-weight: 500;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s var(--ease);
}
.tab-btn:hover {
  color: var(--text-primary);
  background: var(--bg-glass);
}
.tab-btn.active {
  color: var(--accent-bright);
  background: rgba(78, 203, 113, 0.12);
  font-weight: 600;
}
.tab-content {
  flex: 1;
  overflow-y: auto;
  max-height: 480px;
  font-size: 0.8rem;
}

/* Scoreboard */
.scoreboard-box {
  margin-top: 16px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 14px 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.score-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.score-label {
  font-size: 0.72rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.score-values-row {
  display: flex;
  gap: 12px;
  font-family: var(--font-mono);
  font-size: 0.88rem;
  flex-wrap: wrap;
}
.score-val {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Chapter 6: Evidence */
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 40px;
}
.metric-card {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.metric-name {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 6px;
}
.metric-desc {
  font-size: 0.78rem;
  color: var(--text-muted);
  line-height: 1.4;
  margin-bottom: 16px;
}
.metric-comparison-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 10px;
  border-top: 1px solid var(--border);
  padding-top: 10px;
}
.metric-sys-val {
  font-family: var(--font-mono);
  font-size: 0.85rem;
}

/* Heat Grid Table */
.benchmark-table-box {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 24px;
  margin-top: 24px;
  overflow-x: auto;
}
.benchmark-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.84rem;
}
.benchmark-table th, .benchmark-table td {
  padding: 10px 14px;
  text-align: left;
  border-bottom: 1px solid var(--border);
}
.benchmark-table th {
  color: var(--text-muted);
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* FAQ Accordion */
.faq-grid {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 860px;
  margin: 36px auto 0;
}
.faq-item {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.2s var(--ease);
}
.faq-header {
  padding: 18px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
}
.faq-question {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
}
.faq-chevron {
  transition: transform 0.3s var(--ease);
}
.faq-item.open .faq-chevron {
  transform: rotate(180deg);
}
.faq-body-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.35s var(--ease);
}
.faq-item.open .faq-body-wrapper {
  grid-template-rows: 1fr;
}
.faq-body-inner {
  overflow: hidden;
}
.faq-content {
  padding: 0 20px 20px 20px;
  color: var(--text-secondary);
  font-size: 0.88rem;
  line-height: 1.6;
}

/* Chapter 7: Farewell */
.footer-section {
  background: #040912;
  border-top: 1px solid var(--border);
  padding: 80px 0 40px;
}
.roadmap-timeline {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 36px 0;
}
.roadmap-step {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  position: relative;
}
.roadmap-step.active {
  border-color: var(--accent-bright);
}
.sdg-badge-card {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border);
  padding: 12px 20px;
  border-radius: 12px;
  margin-top: 20px;
}
.footer-bottom {
  margin-top: 60px;
  border-top: 1px solid var(--border);
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 0.8rem;
  color: var(--text-muted);
}
.self-test-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 100px;
  background: rgba(78, 203, 113, 0.15);
  color: var(--accent-bright);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  border: 1px solid var(--accent-bright);
  cursor: pointer;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  z-index: 2000;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.modal-overlay.open {
  display: flex;
}
.modal-box {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 16px;
  max-width: 680px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  padding: 24px;
  position: relative;
}
.modal-close {
  position: absolute;
  top: 18px;
  right: 18px;
  background: transparent;
  border: none;
  color: var(--text-muted);
  font-size: 1.2rem;
  cursor: pointer;
}

/* Responsive adjustments */
@media (max-width: 1279px) {
  .lab-layout {
    grid-template-columns: 260px 1fr;
  }
  .inspector-col {
    grid-column: span 2;
    margin-top: 20px;
  }
}
@media (max-width: 860px) {
  .story-grid {
    grid-template-columns: 1fr;
  }
  .planes-grid {
    grid-template-columns: 1fr;
  }
  .lanes-grid {
    grid-template-columns: 1fr;
  }
  .lab-layout {
    grid-template-columns: 1fr;
  }
  .inspector-col {
    grid-column: span 1;
  }
  .metrics-grid {
    grid-template-columns: 1fr;
  }
  .roadmap-timeline {
    grid-template-columns: 1fr;
  }
  .scoreboard-box {
    grid-template-columns: 1fr 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;

