// src_markup.js - Complete HTML structure for simulation.html
module.exports = `
  <!-- Navigation Wrap -->
  <header class="nav-wrap">
    <nav class="nav-pill" aria-label="Main Navigation">
      <a href="#hero" class="nav-brand">
        <span class="nav-brand-dot"></span>
        <span>INTEGRITY-LAYER</span>
      </a>
      <ul class="nav-links">
        <li><a href="#story">Story</a></li>
        <li><a href="#architecture">Architecture</a></li>
        <li><a href="#pause">The Pause</a></li>
        <li><a href="#lab">The Lab</a></li>
        <li><a href="#evidence">Evidence</a></li>
        <li><a href="#answers">Answers</a></li>
        <li><a href="#roadmap">Roadmap</a></li>
      </ul>
      <div class="nav-actions">
        <a href="#lab" class="btn-nav-lab">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Open Lab
        </a>
        <button id="themeToggleBtn" class="btn-icon" title="Toggle Theme (Dark / Presentation)" aria-label="Toggle Theme">
          <svg id="themeIconSun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        </button>
        <button id="helpModalBtn" class="btn-icon" title="Keyboard Shortcuts (?)" aria-label="Keyboard Shortcuts">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        </button>
      </div>
    </nav>
  </header>

  <!-- CHAPTER 1: THE HOOK (Hero) -->
  <section id="hero" class="hero-section">
    <canvas id="heroCanvas" class="hero-canvas"></canvas>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <div class="badge badge-info hero-tag">
        <span>UN SDG 9 · Targets 9.1, 9.5, 9.b, 9.c</span>
      </div>
      <h1 class="word-stagger" id="heroHeadline">
        <span>Trust</span> <span>the</span> <span>policy,</span> <span class="accent-phrase">not the tag.</span>
      </h1>
      <p class="lead">
        Beyond Metadata Filtering: An authorization-integrity layer for secure multi-tenant industrial RAG systems that keeps one factory's documents out of another factory's answers—even when the database metadata lies.
      </p>
      <div class="hero-buttons">
        <a href="#lab" class="btn-primary">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          Open the Lab
        </a>
        <a href="#pause" class="btn-ghost" id="heroWatchLeakBtn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
          ▶ Watch a leak happen
        </a>
      </div>
    </div>
    <a href="#story" class="scroll-indicator">
      <span>Scroll to Explore</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
    </a>
  </section>

  <!-- CHAPTER 2: THE STORY -->
  <section id="story" class="section">
    <div class="container">
      <div class="story-grid">
        <div class="story-text-col">
          <div class="badge badge-info" style="margin-bottom: 12px;">Chapter 2 · The Threat</div>
          <h2>One trust boundary is <em class="accent-phrase">one mistake away.</em></h2>
          <p class="lead">
            Modern multi-tenant industrial RAG systems routinely rely on vector database metadata filtering to isolate tenant data. But when data and its access permissions live in the same untrusted store, a single mislabel, poisoned tag, or stale permission allows confidential records to leak across tenants.
          </p>
          <div class="story-nav-steps">
            <button class="story-step-btn active" data-step="1">1. Collapsed Boundary</button>
            <button class="story-step-btn" data-step="2">2. Tag Tampering & Leak</button>
            <button class="story-step-btn" data-step="3">3. Enforcement Boundary</button>
          </div>
          <p id="storyCaption" style="font-size: 0.85rem; color: var(--text-muted); margin-top: 14px;">
            State 1: In typical architectures, documents and tenant tags live together in the Vector DB without independent verification.
          </p>
        </div>

        <div class="story-scene-container">
          <svg id="storySvg" viewBox="0 0 540 320" width="100%" height="100%">
            <!-- Defined gradients -->
            <defs>
              <linearGradient id="gradEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#2d8c3c" />
                <stop offset="100%" stop-color="#4ecb71" />
              </linearGradient>
            </defs>

            <!-- Vector DB Container Box -->
            <rect id="storyVdbBox" x="30" y="40" width="220" height="230" rx="14" fill="rgba(18, 35, 60, 0.75)" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" />
            <text id="storyVdbLabel" x="50" y="70" fill="#fff" font-family="var(--font-sans)" font-size="13" font-weight="600">Shared Vector DB</text>
            <text id="storyVdbStatus" x="50" y="88" fill="#8fa2be" font-family="var(--font-mono)" font-size="10">TAGS: TRUSTED</text>

            <!-- Chunk Cards inside Vector DB -->
            <!-- Chunk A (Normal) -->
            <g id="storyCardA" transform="translate(45, 105)">
              <rect width="190" height="45" rx="8" fill="rgba(10, 20, 34, 0.85)" stroke="rgba(255,255,255,0.1)" />
              <text x="12" y="24" fill="#fff" font-family="var(--font-mono)" font-size="11" font-weight="600">DOC-FA-101 (Turbine)</text>
              <rect x="12" y="28" width="60" height="12" rx="4" fill="rgba(109,184,255,0.2)" />
              <text x="16" y="38" fill="var(--t-A)" font-family="var(--font-mono)" font-size="9">● Factory A</text>
            </g>

            <!-- Chunk C (Target of tamper in stage 2) -->
            <g id="storyCardB" transform="translate(45, 160)">
              <rect width="190" height="45" rx="8" fill="rgba(10, 20, 34, 0.85)" stroke="rgba(255,255,255,0.1)" />
              <text x="12" y="24" fill="#fff" font-family="var(--font-mono)" font-size="11" font-weight="600">DOC-FC-301 (Catalyst)</text>
              <g id="storyTagB">
                <rect x="12" y="28" width="60" height="12" rx="4" fill="rgba(244,168,200,0.2)" />
                <text x="16" y="38" fill="var(--t-C)" font-family="var(--font-mono)" font-size="9">▲ Factory C</text>
              </g>
            </g>

            <!-- Query Beam -->
            <path id="storyQueryBeam" d="M 500,182 L 245,182" fill="none" stroke="var(--deny)" stroke-width="2" stroke-dasharray="6,4" opacity="0" />
            <text id="storyQueryLabel" x="380" y="172" fill="var(--deny)" font-family="var(--font-mono)" font-size="10" opacity="0">Query: Factory B</text>

            <!-- Leak Alert Badge -->
            <g id="storyLeakAlert" transform="translate(180, 215)" opacity="0">
              <rect width="140" height="26" rx="6" fill="rgba(255,107,107,0.2)" stroke="var(--deny)" stroke-width="1.5" />
              <text x="70" y="17" fill="var(--deny)" font-family="var(--font-mono)" font-size="10" font-weight="700" text-anchor="middle">⚠ CANARY LEAKED</text>
            </g>

            <!-- Policy Registry Box (Stage 3) -->
            <g id="storyRegistryBox" transform="translate(290, 40)" opacity="0">
              <rect width="220" height="230" rx="14" fill="rgba(14, 28, 48, 0.95)" stroke="var(--accent-bright)" stroke-width="1.5" />
              <text x="20" y="30" fill="#fff" font-family="var(--font-sans)" font-size="13" font-weight="600">Trusted Policy Registry</text>
              <text x="20" y="48" fill="var(--accent-bright)" font-family="var(--font-mono)" font-size="10">HMAC-SIGNED · V2</text>
              
              <!-- Authoritative row in Registry -->
              <rect x="15" y="65" width="190" height="45" rx="8" fill="rgba(10, 20, 32, 0.9)" stroke="rgba(255,255,255,0.1)" />
              <text x="24" y="85" fill="#fff" font-family="var(--font-mono)" font-size="11">DOC-FC-301</text>
              <text x="24" y="99" fill="var(--accent-bright)" font-family="var(--font-mono)" font-size="9">AUTHORITY: Factory C only</text>
            </g>

            <!-- Boundary dashed membrane (Stage 3) -->
            <rect id="storyMembrane" x="275" y="25" width="250" height="260" rx="20" fill="none" stroke="var(--accent-bright)" stroke-width="2" stroke-dasharray="8,6" opacity="0" />
            <text id="storyMembraneLabel" x="400" y="20" fill="var(--accent-bright)" font-family="var(--font-mono)" font-size="9" text-anchor="middle" opacity="0">TRUSTED ENFORCEMENT BOUNDARY</text>
          </svg>
        </div>
      </div>
    </div>
  </section>

  <!-- CHAPTER 3: THE STEPS & ARCHITECTURE -->
  <section id="architecture" class="section">
    <div class="container">
      <div style="text-align: center; max-width: 760px; margin: 0 auto 50px;">
        <div class="badge badge-info" style="margin-bottom: 12px;">Chapter 3 · Architecture</div>
        <h2>Three planes. One <em class="accent-phrase">enforcement boundary.</em></h2>
        <p class="lead">
          The core thesis: tags inside the Vector DB are untrusted hints. Every candidate chunk must pass cryptographic signature verification and policy validation before touching the LLM context.
        </p>
      </div>

      <!-- 3-Column Glass Panel -->
      <div class="planes-grid">
        <div class="glass-card plane-card">
          <div class="plane-header">
            <span class="plane-number">PLANE 1</span>
            <h3>Ingestion Path</h3>
          </div>
          <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6;">
            Ingestion & Integrity Gate validates document ownership before vectorization. Unverified tags are immediately routed to the Quarantine Vault.
          </p>
        </div>

        <div class="glass-card plane-card">
          <div class="plane-header">
            <span class="plane-number">PLANE 2</span>
            <h3>Multi-Tenant Query</h3>
          </div>
          <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6;">
            Retrieval Gateway intercepts all top-k candidates returned by cosine search, releasing only cryptographically verified context to the LLM.
          </p>
        </div>

        <div class="glass-card plane-card boundary-card">
          <div class="plane-header">
            <span class="plane-number">PLANE 3</span>
            <h3>Control Plane</h3>
          </div>
          <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.6;">
            Trusted Policy Registry maintains authoritative permissions signed with HMAC-SHA256. Changes trigger instant zero-delay revocations.
          </p>
        </div>
      </div>

      <!-- Interactive Architecture SVG (Paper Figure 1) -->
      <div class="architecture-svg-box">
        <div class="arch-toolbar">
          <span style="font-size: 0.82rem; font-weight: 600; color: var(--text-secondary);">
            Figure 1: Trusted Enforcement Boundary Architecture
          </span>
          <button id="traceRequestBtn" class="btn-ghost" style="padding: 6px 14px; font-size: 0.8rem;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Trace a request (1 → 5)
          </button>
        </div>

        <svg id="archDiagramSvg" viewBox="0 0 960 480" width="100%" height="auto">
          <!-- Definitions for markers and filters -->
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="rgba(255,255,255,0.4)" />
            </marker>
            <marker id="arrow-green" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--accent-bright)" />
            </marker>
            <marker id="arrow-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 9 5 L 0 9 z" fill="var(--deny)" />
            </marker>
          </defs>

          <!-- Trusted Enforcement Boundary Dashed Perimeter -->
          <rect x="420" y="20" width="510" height="440" rx="18" fill="rgba(45, 140, 60, 0.04)" stroke="var(--accent-bright)" stroke-width="2" stroke-dasharray="8,6" />
          <text x="675" y="42" fill="var(--accent-bright)" font-family="var(--font-mono)" font-size="11" font-weight="700" text-anchor="middle">
            TRUSTED ENFORCEMENT BOUNDARY (PLANE 3 & GATEWAY)
          </text>

          <!-- PLANE 1 NODES -->
          <!-- Documents -->
          <g class="arch-node" data-node="docs" transform="translate(40, 50)">
            <rect width="150" height="50" rx="8" fill="rgba(18, 35, 60, 0.85)" stroke="var(--border)" />
            <text x="75" y="24" fill="#fff" font-size="10" font-weight="600" text-anchor="middle">Industrial Documents</text>
            <text x="75" y="38" fill="var(--text-muted)" font-size="9" text-anchor="middle">Manuals, SOPs, Specs</text>
          </g>

          <!-- Ingestion Gate -->
          <g class="arch-node" data-node="ingest-gate" transform="translate(230, 50)">
            <rect width="140" height="50" rx="8" fill="rgba(18, 35, 60, 0.85)" stroke="var(--border)" />
            <text x="70" y="24" fill="#fff" font-size="10" font-weight="600" text-anchor="middle">Ingestion & Gate</text>
            <text x="70" y="38" fill="var(--text-muted)" font-size="9" text-anchor="middle">Ownership Verification</text>
          </g>

          <!-- Quarantine Vault -->
          <g class="arch-node" data-node="quarantine" transform="translate(230, 140)">
            <rect width="140" height="45" rx="8" fill="rgba(245, 185, 66, 0.12)" stroke="var(--quarantine)" />
            <text x="70" y="22" fill="var(--quarantine)" font-size="10" font-weight="600" text-anchor="middle">Quarantine Vault</text>
            <text x="70" y="35" fill="var(--quarantine)" font-size="8.5" text-anchor="middle">Isolated Records</text>
          </g>

          <!-- Local Vector Encoder -->
          <g class="arch-node" data-node="encoder" transform="translate(40, 140)">
            <rect width="150" height="50" rx="8" fill="rgba(18, 35, 60, 0.85)" stroke="var(--border)" />
            <text x="75" y="24" fill="#fff" font-size="10" font-weight="600" text-anchor="middle">Local Vector Encoder</text>
            <text x="75" y="38" fill="var(--text-muted)" font-size="8.5" text-anchor="middle">TF-IDF + Technical N-Grams</text>
          </g>

          <!-- Shared Vector DB -->
          <g class="arch-node" data-node="vectordb" transform="translate(130, 230)">
            <rect width="160" height="55" rx="10" fill="rgba(18, 35, 60, 0.85)" stroke="var(--border)" />
            <text x="80" y="24" fill="#fff" font-size="11" font-weight="600" text-anchor="middle">Shared Vector DB</text>
            <text x="80" y="42" fill="var(--deny)" font-family="var(--font-mono)" font-size="8.5" text-anchor="middle">UNTRUSTED TAGS</text>
          </g>

          <!-- PLANE 2 NODES -->
          <!-- Tenant User -->
          <g class="arch-node" data-node="user" transform="translate(40, 360)">
            <rect width="140" height="60" rx="10" fill="rgba(18, 35, 60, 0.85)" stroke="var(--border)" />
            <text x="70" y="26" fill="#fff" font-size="11" font-weight="600" text-anchor="middle">Tenant User</text>
            <text x="70" y="44" fill="var(--info)" font-size="9" text-anchor="middle">Factory A – E</text>
          </g>

          <!-- Query API -->
          <g class="arch-node" data-node="query-api" transform="translate(230, 360)">
            <rect width="130" height="60" rx="8" fill="rgba(18, 35, 60, 0.85)" stroke="var(--border)" />
            <text x="65" y="28" fill="#fff" font-size="10.5" font-weight="600" text-anchor="middle">Query API</text>
            <text x="65" y="44" fill="var(--text-muted)" font-size="9" text-anchor="middle">HTTP / REST</text>
          </g>

          <!-- Retriever -->
          <g class="arch-node" data-node="retriever" transform="translate(230, 270)">
            <rect width="130" height="50" rx="8" fill="rgba(18, 35, 60, 0.85)" stroke="var(--border)" />
            <text x="65" y="24" fill="#fff" font-size="10.5" font-weight="600" text-anchor="middle">Retriever</text>
            <text x="65" y="38" fill="var(--text-muted)" font-size="8.5" text-anchor="middle">Top-k Cosine Search</text>
          </g>

          <!-- Retrieval Gateway (inside Boundary) -->
          <g class="arch-node" data-node="gateway" transform="translate(450, 260)">
            <rect width="180" height="65" rx="10" fill="rgba(28, 55, 90, 0.9)" stroke="var(--accent-bright)" stroke-width="1.5" />
            <text x="90" y="26" fill="#fff" font-size="11" font-weight="600" text-anchor="middle">Retrieval Gateway</text>
            <text x="90" y="42" fill="var(--accent-bright)" font-size="9" font-weight="600" text-anchor="middle">Candidate-Level Enforcement</text>
          </g>

          <!-- Blocked Candidate -->
          <g class="arch-node" data-node="blocked" transform="translate(450, 360)">
            <rect width="180" height="40" rx="6" fill="rgba(255,107,107,0.12)" stroke="var(--deny)" />
            <text x="90" y="24" fill="var(--deny)" font-size="9.5" font-weight="600" text-anchor="middle">Blocked / Quarantined</text>
          </g>

          <!-- LLM Response Synthesizer -->
          <g class="arch-node" data-node="llm" transform="translate(710, 260)">
            <rect width="180" height="65" rx="10" fill="rgba(18, 35, 60, 0.85)" stroke="var(--border)" />
            <text x="90" y="28" fill="#fff" font-size="11" font-weight="600" text-anchor="middle">LLM Synthesizer</text>
            <text x="90" y="46" fill="var(--text-muted)" font-size="9" text-anchor="middle">Verified Context Only</text>
          </g>

          <!-- PLANE 3 NODES -->
          <!-- Policy Admin -->
          <g class="arch-node" data-node="policy-admin" transform="translate(450, 70)">
            <rect width="120" height="50" rx="8" fill="rgba(18, 35, 60, 0.85)" stroke="var(--border)" />
            <text x="60" y="24" fill="#fff" font-size="10" font-weight="600" text-anchor="middle">Policy Admin</text>
            <text x="60" y="38" fill="var(--text-muted)" font-size="8.5" text-anchor="middle">Authority Role</text>
          </g>

          <!-- Revocation & Consistency Handler -->
          <g class="arch-node" data-node="revocation" transform="translate(605, 70)">
            <rect width="145" height="50" rx="8" fill="rgba(18, 35, 60, 0.85)" stroke="var(--border)" />
            <text x="72" y="22" fill="#fff" font-size="10" font-weight="600" text-anchor="middle">Revocation Handler</text>
            <text x="72" y="36" fill="var(--accent-bright)" font-size="8.5" text-anchor="middle">Version Bump + Re-Sign</text>
          </g>

          <!-- Trusted Policy Registry -->
          <g class="arch-node" data-node="registry" transform="translate(775, 70)">
            <rect width="140" height="60" rx="10" fill="rgba(28, 55, 90, 0.95)" stroke="var(--accent-bright)" stroke-width="1.5" />
            <text x="70" y="26" fill="#fff" font-size="10.5" font-weight="600" text-anchor="middle">Trusted Registry</text>
            <text x="70" y="42" fill="var(--accent-bright)" font-family="var(--font-mono)" font-size="8.5" text-anchor="middle">HMAC-SHA256 SIGNED</text>
          </g>

          <!-- Authorization Decision Engine -->
          <g class="arch-node" data-node="engine" transform="translate(560, 160)">
            <rect width="210" height="60" rx="10" fill="rgba(28, 55, 90, 0.95)" stroke="var(--accent-bright)" stroke-width="1.5" />
            <text x="105" y="26" fill="#fff" font-size="11" font-weight="600" text-anchor="middle">Decision Engine</text>
            <text x="105" y="44" fill="var(--accent-bright)" font-size="9" text-anchor="middle">5-Check Sequential Turnstile</text>
          </g>

          <!-- Immutable Audit Log -->
          <g class="arch-node" data-node="audit" transform="translate(800, 165)">
            <rect width="115" height="50" rx="8" fill="rgba(18, 35, 60, 0.85)" stroke="var(--border)" />
            <text x="57" y="24" fill="#fff" font-size="10" font-weight="600" text-anchor="middle">Audit Log</text>
            <text x="57" y="38" fill="var(--text-muted)" font-family="var(--font-mono)" font-size="8" text-anchor="middle">SHA-256 CHAIN</text>
          </g>

          <!-- Static Edges -->
          <!-- Ingestion edges -->
          <line x1="190" y1="75" x2="230" y2="75" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" marker-end="url(#arrow)" />
          <line x1="300" y1="100" x2="300" y2="140" stroke="var(--deny)" stroke-width="1.5" marker-end="url(#arrow-red)" />
          <line x1="230" y1="75" x2="190" y2="140" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" marker-end="url(#arrow)" />
          <line x1="115" y1="190" x2="160" y2="230" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" marker-end="url(#arrow)" />

          <!-- Query Path Edges (1-5) -->
          <!-- 1. Query + Identity -->
          <path id="pathStep1" d="M 180,390 L 230,390" stroke="var(--info)" stroke-width="2" marker-end="url(#arrow)" />
          <text x="205" y="382" fill="var(--info)" font-family="var(--font-mono)" font-size="9" text-anchor="middle">1</text>

          <!-- Query API -> Retriever -->
          <line x1="295" y1="360" x2="295" y2="320" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" marker-end="url(#arrow)" />

          <!-- 2. Vector Lookup -->
          <path id="pathStep2" d="M 230,285 L 180,285" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" marker-end="url(#arrow)" />
          <text x="205" y="278" fill="var(--text-muted)" font-family="var(--font-mono)" font-size="9" text-anchor="middle">2</text>

          <!-- Candidates to Gateway -->
          <line x1="290" y1="285" x2="450" y2="285" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" marker-end="url(#arrow)" />

          <!-- 3. Candidate Auth Check -->
          <path id="pathStep3" d="M 540,260 L 590,220" stroke="var(--accent-bright)" stroke-width="2" marker-end="url(#arrow-green)" />
          <text x="575" y="245" fill="var(--accent-bright)" font-family="var(--font-mono)" font-size="9" text-anchor="middle">3</text>

          <!-- Decision Engine <-> Registry -->
          <line x1="770" y1="180" x2="810" y2="130" stroke="var(--accent-bright)" stroke-width="1.5" stroke-dasharray="3,3" />

          <!-- Decision Engine -> Audit -->
          <line x1="770" y1="190" x2="800" y2="190" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" marker-end="url(#arrow)" />

          <!-- Gateway -> Blocked -->
          <line x1="540" y1="325" x2="540" y2="360" stroke="var(--deny)" stroke-width="1.5" marker-end="url(#arrow-red)" />

          <!-- 4. Verified Context Only -->
          <path id="pathStep4" d="M 630,292 L 710,292" stroke="var(--accent-bright)" stroke-width="2" marker-end="url(#arrow-green)" />
          <text x="670" y="285" fill="var(--accent-bright)" font-family="var(--font-mono)" font-size="9" text-anchor="middle">4</text>

          <!-- 5. Safe Response back to User -->
          <path id="pathStep5" d="M 800,325 C 800,430 350,430 180,410" fill="none" stroke="var(--accent-bright)" stroke-width="2" stroke-dasharray="5,4" marker-end="url(#arrow-green)" />
          <text x="500" y="440" fill="var(--accent-bright)" font-family="var(--font-mono)" font-size="9" text-anchor="middle">5. Safe Response</text>

          <!-- Animated Packet for Trace -->
          <circle id="archTracePacket" cx="-20" cy="-20" r="6" fill="#fff" filter="drop-shadow(0 0 8px var(--accent-bright))" opacity="0" />
        </svg>
      </div>

      <!-- Five-Check Turnstile Gate Sequence -->
      <div class="turnstile-box">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <div>
            <h3 style="margin-bottom: 4px;">Five-Check Turnstile Gate</h3>
            <p style="font-size: 0.82rem; color: var(--text-muted);">
              Run sequentially on every retrieved candidate. First failure short-circuits and quarantines.
            </p>
          </div>
          <div style="display: flex; gap: 8px;">
            <button id="turnstileTestPass" class="btn-ghost" style="padding: 6px 14px; font-size: 0.8rem;">
              Test Valid Candidate (✓ All 5 Pass)
            </button>
            <button id="turnstileTestFail" class="btn-ghost" style="padding: 6px 14px; font-size: 0.8rem; border-color: var(--deny); color: var(--deny);">
              Test Tampered Candidate (✕ Fail Check 4)
            </button>
          </div>
        </div>

        <div class="gates-sequence">
          <div class="gate-item" id="gate1">
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-bright);">CHECK 1</div>
            <div style="font-weight: 600; font-size: 0.85rem; margin: 4px 0;">Reachability</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">Policy service online? Fail-closed if dark.</div>
          </div>

          <div class="gate-item" id="gate2">
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-bright);">CHECK 2</div>
            <div style="font-weight: 600; font-size: 0.85rem; margin: 4px 0;">Presence & Status</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">Record active? Quarantine if corrupt/missing.</div>
          </div>

          <div class="gate-item" id="gate3">
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-bright);">CHECK 3</div>
            <div style="font-weight: 600; font-size: 0.85rem; margin: 4px 0;">HMAC & Hash</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">Verify HMAC-SHA256 & chunk content hash.</div>
          </div>

          <div class="gate-item" id="gate4">
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-bright);">CHECK 4</div>
            <div style="font-weight: 600; font-size: 0.85rem; margin: 4px 0;">Tag Discrepancy</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">Compare metadata tags vs signed policy.</div>
          </div>

          <div class="gate-item" id="gate5">
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-bright);">CHECK 5</div>
            <div style="font-weight: 600; font-size: 0.85rem; margin: 4px 0;">Authoritative Auth</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">Requesting tenant in policy.allowed_tenants?</div>
          </div>
        </div>

        <!-- Formula display -->
        <div class="formula-box">
          <div style="display: flex; align-items: center; gap: 12px;">
            <span class="badge badge-info">Formula</span>
            <code style="font-family: var(--font-mono); font-size: 0.95rem; color: var(--accent-bright);">
              σ = HMAC-SHA256(K_secret, doc_id ‖ owner ‖ sorted(allowed) ‖ v)
            </code>
          </div>
          <span style="font-size: 0.78rem; color: var(--text-muted);">
            Guarantees unforgeable policy integrity at control-plane boundary
          </span>
        </div>
      </div>
    </div>
  </section>

  <!-- CHAPTER 4: THE PAUSE -->
  <section id="pause" class="pause-section">
    <div class="container" style="text-align: center; width: 100%;">
      <div class="badge badge-deny" style="margin-bottom: 20px;">Chapter 4 · The Pause</div>
      <h2>Watch a <em class="accent-phrase" style="color: var(--deny);">leak</em> happen.</h2>
      
      <blockquote class="pause-quote">
        "When the database believes its own tags, security is an illusion. The policy must judge the data, never the data the policy."
      </blockquote>

      <div style="max-width: 860px; margin: 0 auto; background: var(--bg-card); border: 1px solid var(--border); border-radius: 16px; padding: 24px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid var(--border); padding-bottom: 10px;">
          <span style="font-size: 0.85rem; font-weight: 600;">Automated Replay: Fault 1 (Mislabeled Turbine Manual)</span>
          <span class="badge badge-tenant-B">Query from Factory B</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; text-align: left;">
          <!-- Lane 1 Replay -->
          <div style="background: rgba(10,20,32,0.8); border: 1px solid var(--border); border-radius: 10px; padding: 12px;">
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 6px;">Shared Metadata Filter</div>
            <div class="badge badge-deny" style="margin-bottom: 8px;">⚠ CANARY LEAKED</div>
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--deny); line-height: 1.4;">
              Released DOC-FA-101<br>[CANARY-FA-TURBINE-7741]<br>Believed forged Factory B tag.
            </div>
          </div>

          <!-- Lane 2 Replay -->
          <div style="background: rgba(10,20,32,0.8); border: 1px solid var(--border); border-radius: 10px; padding: 12px;">
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 6px;">Separate Index / Tenant</div>
            <div class="badge badge-allow" style="margin-bottom: 8px;">✓ Clean by construction</div>
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-secondary); line-height: 1.4;">
              DOC-FA-101 absent from B's silo.<br>0 foreign canaries released.
            </div>
          </div>

          <!-- Lane 3 Replay -->
          <div style="background: rgba(10,20,32,0.8); border: 1px dashed var(--accent-bright); border-radius: 10px; padding: 12px;">
            <div style="font-size: 0.75rem; color: var(--accent-bright); margin-bottom: 6px;">Integrity Layer</div>
            <div class="badge badge-allow" style="margin-bottom: 8px;">✓ Blocked & Quarantined</div>
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-bright); line-height: 1.4;">
              Check 4 caught discrepancy.<br>0 canaries released.<br>Logged to audit chain.
            </div>
          </div>
        </div>

        <div class="pause-stat-pill">
          <span>Foreign Canaries Released to Factory B:</span>
          <strong style="color: var(--deny);">1 (Shared Filter)</strong>
          <span>·</span>
          <strong style="color: var(--allow);">0 (Separate Index)</strong>
          <span>·</span>
          <strong style="color: var(--allow);">0 (Integrity Layer)</strong>
        </div>
      </div>

      <div style="margin-top: 36px;">
        <a href="#lab" class="btn-ghost">
          Now break it yourself ↓
        </a>
      </div>
    </div>
  </section>

  <!-- CHAPTER 5: THE LAB -->
  <section id="lab" class="section">
    <div class="container">
      <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
        <div>
          <div class="badge badge-info" style="margin-bottom: 8px;">Chapter 5 · Working Simulator</div>
          <h2>Break it <em class="accent-phrase">on purpose.</em></h2>
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-top: 4px;">
            Real in-browser TF-IDF engine, HMAC-SHA256 signature verification, and 5-check decision gate.
          </p>
        </div>
      </div>

      <!-- Lab Top Controls Bar -->
      <div class="lab-header-bar">
        <div class="scenario-chips">
          <button class="chip-btn active" data-scenario="F0">F0 Baseline</button>
          <button class="chip-btn" data-scenario="F1">F1 Incorrect Label</button>
          <button class="chip-btn" data-scenario="F2">F2 Poisoned Tags</button>
          <button class="chip-btn" data-scenario="F3">F3 Stale Revocation</button>
          <button class="chip-btn" data-scenario="F4">F4 Corrupt Policy</button>
          <button class="chip-btn" data-scenario="F5">F5 Outage (Fail-Closed)</button>
        </div>

        <div class="playback-controls">
          <button id="guidedTourBtn" class="btn-ghost" style="padding: 6px 14px; font-size: 0.78rem;">
            ▶ Guided Tour (90s)
          </button>
          <button id="playPauseBtn" class="btn-icon" title="Play / Pause (Space)">
            <svg id="playPauseIcon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </button>
          <button id="stepBtn" class="btn-icon" title="Step One Beat (→)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>
          </button>
          <select id="speedSelect" class="select-dark" style="width: 75px; padding: 4px 6px; font-size: 0.75rem;">
            <option value="0.5">0.5×</option>
            <option value="1" selected>1.0×</option>
            <option value="2">2.0×</option>
          </select>
          <button id="skipAnimBtn" class="btn-ghost" style="padding: 4px 10px; font-size: 0.75rem;">
            Skip Anim
          </button>
        </div>
      </div>

      <!-- Main Lab Grid -->
      <div class="lab-layout">
        <!-- Left: Controls Column -->
        <div class="controls-col">
          <!-- Tenant Picker -->
          <div class="glass-card" style="padding: 16px;">
            <div class="control-group-title">1. Requesting Tenant</div>
            <div class="tenant-chips-grid">
              <button class="tenant-selector-btn" data-tenant="Factory A">
                <span style="color: var(--t-A);">●</span>
                <span>Factory A (Apex Turbines)</span>
              </button>
              <button class="tenant-selector-btn active" data-tenant="Factory B">
                <span style="color: var(--t-B);">■</span>
                <span>Factory B (Beacon Robotics)</span>
              </button>
              <button class="tenant-selector-btn" data-tenant="Factory C">
                <span style="color: var(--t-C);">▲</span>
                <span>Factory C (Cobalt Chemicals)</span>
              </button>
              <button class="tenant-selector-btn" data-tenant="Factory D">
                <span style="color: var(--t-D);">◆</span>
                <span>Factory D (Delta Fabs)</span>
              </button>
              <button class="tenant-selector-btn" data-tenant="Factory E">
                <span style="color: var(--t-E);">⬢</span>
                <span>Factory E (Eclipse Aerospace)</span>
              </button>
            </div>
          </div>

          <!-- Query Input & Presets -->
          <div class="glass-card" style="padding: 16px;">
            <div class="control-group-title">2. Query & Presets</div>
            <div class="query-input-wrap">
              <select id="queryPresetSelect" class="select-dark">
                <option value="custom">-- Select a probe preset --</option>
                <option value="q1" selected>F1 Probe: Gas turbine rotor blade torque GT-9000 (Target: A)</option>
                <option value="q2">F2 Probe: Platinum catalyst bed purge passivation (Target: C)</option>
                <option value="q3">F3 Probe: Inconel-718 supplier spec tolerance (Target: A shared)</option>
                <option value="q4">F4 Probe: BX-600 arm payload grease calibration (Target: B)</option>
                <option value="q5">RoboArm joint optical encoder CAN-2 recalibration</option>
              </select>
              <input id="queryTextInput" type="text" class="input-dark" value="GT-9000 Gas Turbine High-Pressure Rotor Blade Inspection Torque Specifications" placeholder="Enter technical search query..." />
              <button id="runQueryBtn" class="btn-primary" style="justify-content: center; width: 100%; padding: 10px;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Run Query (Enter)
              </button>
            </div>
          </div>

          <!-- Fault Injection Switches -->
          <div class="glass-card" style="padding: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <div class="control-group-title" style="margin: 0;">3. Fault Toggles</div>
              <button id="resetFaultsBtn" class="btn-ghost" style="padding: 2px 8px; font-size: 0.7rem;">Reset</button>
            </div>
            <div class="fault-switches-list">
              <div class="fault-switch-row">
                <div class="switch-label">
                  <span>F1: Incorrect Label</span>
                  <span class="switch-desc">DOC-FA-101 tagged Factory B</span>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" id="toggleF1" />
                  <span class="slider"></span>
                </label>
              </div>

              <div class="fault-switch-row">
                <div class="switch-label">
                  <span>F2: Targeted Poisoning</span>
                  <span class="switch-desc">DOC-FC-301 adds +A +B tags</span>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" id="toggleF2" />
                  <span class="slider"></span>
                </label>
              </div>

              <div class="fault-switch-row">
                <div class="switch-label">
                  <span>F3: Stale Revocation</span>
                  <span class="switch-desc">DOC-FA-103 revoked in Reg v2</span>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" id="toggleF3" />
                  <span class="slider"></span>
                </label>
              </div>

              <div class="fault-switch-row">
                <div class="switch-label">
                  <span>F4: Corrupted Policy</span>
                  <span class="switch-desc">DOC-FB-202 sig scrambled</span>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" id="toggleF4" />
                  <span class="slider"></span>
                </label>
              </div>

              <div class="fault-switch-row">
                <div class="switch-label">
                  <span>F5: Service Outage</span>
                  <span class="switch-desc">Policy service offline</span>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" id="toggleF5" />
                  <span class="slider"></span>
                </label>
              </div>
            </div>
          </div>

          <!-- Policy Admin & Ingest -->
          <div class="glass-card" style="padding: 16px;">
            <div class="control-group-title">4. Control Operations</div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <button id="adminRevokeBtn" class="btn-ghost" style="justify-content: center; font-size: 0.78rem;">
                Revoke Factory B from DOC-FA-103
              </button>
              <button id="adminResyncBtn" class="btn-ghost" style="justify-content: center; font-size: 0.78rem;">
                Re-sync Vector Metadata (Housekeeping)
              </button>
              <button id="ingestModalBtn" class="btn-ghost" style="justify-content: center; font-size: 0.78rem;">
                Ingest Document (Ingestion Gate)
              </button>
            </div>
          </div>
        </div>

        <!-- Center: 3 Synchronized Lanes -->
        <div class="lanes-col">
          <div class="lanes-grid">
            <!-- Lane 1: Shared Metadata Filter -->
            <div class="lane-card" id="lane1">
              <div class="lane-header">
                <div class="lane-title">
                  <span>Shared Filter</span>
                </div>
                <span id="lane1Badge" class="badge">Idle</span>
              </div>
              <div style="font-size: 0.72rem; color: var(--text-muted);">
                Blindly trusts metadata tags in Vector DB.
              </div>

              <div class="lane-stage" id="lane1Stage">
                <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Candidates (Top 5)</div>
                <div id="lane1CandidatesList" style="display: flex; flex-direction: column; gap: 6px;"></div>
              </div>

              <div>
                <div style="font-size: 0.72rem; color: var(--text-muted); margin-bottom: 4px;">Synthesized Answer</div>
                <div class="llm-output-box" id="lane1Answer">Run query to synthesize response...</div>
              </div>
            </div>

            <!-- Lane 2: Separate Index per Tenant -->
            <div class="lane-card" id="lane2">
              <div class="lane-header">
                <div class="lane-title">
                  <span>Separate Index</span>
                </div>
                <span id="lane2Badge" class="badge">Idle</span>
              </div>
              <div style="font-size: 0.72rem; color: var(--text-muted);">
                Separate physical index; stale on revocation.
              </div>

              <div class="lane-stage" id="lane2Stage">
                <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Tenant Silo Candidates</div>
                <div id="lane2CandidatesList" style="display: flex; flex-direction: column; gap: 6px;"></div>
              </div>

              <div>
                <div style="font-size: 0.72rem; color: var(--text-muted); margin-bottom: 4px;">Synthesized Answer</div>
                <div class="llm-output-box" id="lane2Answer">Run query to synthesize response...</div>
              </div>
            </div>

            <!-- Lane 3: Authorization-Integrity Layer -->
            <div class="lane-card boundary-card" id="lane3">
              <div class="lane-header">
                <div class="lane-title" style="color: var(--accent-bright);">
                  <span>Integrity Layer</span>
                </div>
                <span id="lane3Badge" class="badge badge-allow">Protected</span>
              </div>
              <div style="font-size: 0.72rem; color: var(--accent-bright);">
                5-check decision engine & quarantine gate.
              </div>

              <!-- 5 Check Lights -->
              <div class="check-lights-row">
                <div class="check-light-node">
                  <div class="check-light-bulb" id="light1"></div>
                  <span>1.Online</span>
                </div>
                <div class="check-light-node">
                  <div class="check-light-bulb" id="light2"></div>
                  <span>2.Status</span>
                </div>
                <div class="check-light-node">
                  <div class="check-light-bulb" id="light3"></div>
                  <span>3.HMAC</span>
                </div>
                <div class="check-light-node">
                  <div class="check-light-bulb" id="light4"></div>
                  <span>4.Tags</span>
                </div>
                <div class="check-light-node">
                  <div class="check-light-bulb" id="light5"></div>
                  <span>5.Auth</span>
                </div>
              </div>

              <div class="lane-stage" id="lane3Stage">
                <div style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Verified Candidates</div>
                <div id="lane3CandidatesList" style="display: flex; flex-direction: column; gap: 6px;"></div>
              </div>

              <div>
                <div style="font-size: 0.72rem; color: var(--text-muted); margin-bottom: 4px;">Synthesized Safe Answer</div>
                <div class="llm-output-box" id="lane3Answer">Run query to synthesize response...</div>
              </div>
            </div>
          </div>

          <!-- Bottom Live Scoreboard -->
          <div class="scoreboard-box">
            <div class="score-item">
              <span class="score-label">Foreign Canaries Leaked</span>
              <div class="score-values-row">
                <span class="score-val" id="scoreLeakL1" title="Shared Filter" style="color: var(--deny);">0</span>
                <span>·</span>
                <span class="score-val" id="scoreLeakL2" title="Separate Index" style="color: var(--text-secondary);">0</span>
                <span>·</span>
                <span class="score-val" id="scoreLeakL3" title="Integrity Layer" style="color: var(--allow);">0</span>
              </div>
            </div>

            <div class="score-item">
              <span class="score-label">Chunks Released</span>
              <div class="score-values-row">
                <span class="score-val" id="scoreChunksL1">0</span>
                <span>·</span>
                <span class="score-val" id="scoreChunksL2">0</span>
                <span>·</span>
                <span class="score-val" id="scoreChunksL3">0</span>
              </div>
            </div>

            <div class="score-item">
              <span class="score-label">Docs Wrongly Denied</span>
              <div class="score-values-row">
                <span class="score-val" id="scoreDeniedL1">0</span>
                <span>·</span>
                <span class="score-val" id="scoreDeniedL2">0</span>
                <span>·</span>
                <span class="score-val" id="scoreDeniedL3" style="color: var(--quarantine);">0</span>
              </div>
            </div>

            <div class="score-item">
              <span class="score-label">Decision Latency (ms)</span>
              <div class="score-values-row">
                <span class="score-val" id="scoreLatencyL1">0.1ms</span>
                <span>·</span>
                <span class="score-val" id="scoreLatencyL2">0.1ms</span>
                <span>·</span>
                <span class="score-val" id="scoreLatencyL3">0.6ms</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Inspector Column -->
        <div class="inspector-col">
          <div class="inspector-tabs">
            <button class="tab-btn active" data-tab="trace">Decision Trace</button>
            <button class="tab-btn" data-tab="diff">Registry ⇄ DB</button>
            <button class="tab-btn" data-tab="quarantine">Quarantine (<span id="quarantineCount">0</span>)</button>
            <button class="tab-btn" data-tab="audit">Audit Log</button>
          </div>

          <!-- Tab Content: Decision Trace -->
          <div class="tab-content" id="tabContentTrace" aria-live="polite">
            <div style="color: var(--text-muted); font-size: 0.78rem; text-align: center; padding: 20px 0;">
              Execute a query to inspect candidate verification traces.
            </div>
          </div>

          <!-- Tab Content: Registry vs DB diff -->
          <div class="tab-content" id="tabContentDiff" style="display: none;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-size: 0.75rem; color: var(--text-muted);">Authoritative Registry vs Untrusted DB</span>
              <button id="verifyHmacsBtn" class="btn-ghost" style="padding: 2px 8px; font-size: 0.7rem;">Verify HMACs</button>
            </div>
            <div id="diffRowsList" style="display: flex; flex-direction: column; gap: 8px;"></div>
          </div>

          <!-- Tab Content: Quarantine Vault -->
          <div class="tab-content" id="tabContentQuarantine" style="display: none;">
            <div id="quarantineList" style="display: flex; flex-direction: column; gap: 8px;">
              <div style="color: var(--text-muted); font-size: 0.78rem; text-align: center; padding: 20px 0;">
                Quarantine Vault is currently empty.
              </div>
            </div>
          </div>

          <!-- Tab Content: Audit Log -->
          <div class="tab-content" id="tabContentAudit" style="display: none;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-size: 0.75rem; color: var(--text-muted);">Hash-chained Immutable Audit</span>
              <button id="copyAuditBtn" class="btn-ghost" style="padding: 2px 8px; font-size: 0.7rem;">Copy Log</button>
            </div>
            <div id="auditLogList" style="display: flex; flex-direction: column; gap: 6px; font-family: var(--font-mono); font-size: 0.72rem;"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CHAPTER 6: EVIDENCE & BENCHMARKS -->
  <section id="evidence" class="section">
    <div class="container">
      <div style="text-align: center; max-width: 760px; margin: 0 auto 50px;">
        <div class="badge badge-info" style="margin-bottom: 12px;">Chapter 6 · Evidence & Benchmark Suite</div>
        <h2>Computed, <em class="accent-phrase">never scripted.</em></h2>
        <p class="lead">
          Live browser-evaluated metrics comparing all three systems across every fault condition and ground-truth query.
        </p>
      </div>

      <!-- 6 Metrics Cards Grid -->
      <div class="metrics-grid">
        <!-- Headline Card -->
        <div class="glass-card metric-card boundary-card">
          <div>
            <div class="badge badge-deny" style="margin-bottom: 8px;">Headline Result</div>
            <div class="metric-name">Foreign Canaries Leaked</div>
            <div class="metric-desc">
              Unauthorized canary strings reaching requester LLM context. By definition, a canary leak represents confidential cross-tenant leakage.
            </div>
          </div>
          <div>
            <svg viewBox="0 0 200 40" width="100%" height="40">
              <rect x="0" y="10" width="180" height="8" rx="4" fill="rgba(255,107,107,0.3)" />
              <rect x="0" y="10" width="140" height="8" rx="4" fill="var(--deny)" />
              <rect x="0" y="24" width="180" height="8" rx="4" fill="rgba(78,203,113,0.3)" />
              <rect x="0" y="24" width="0" height="8" rx="4" fill="var(--allow)" />
            </svg>
            <div class="metric-comparison-row">
              <span class="metric-sys-val" style="color: var(--deny);">Shared: 42.1%</span>
              <span class="metric-sys-val" style="color: var(--accent-bright);">Integrity: 0.0%</span>
            </div>
          </div>
        </div>

        <!-- Metric 2: Discrepancy Detection -->
        <div class="glass-card metric-card">
          <div>
            <div class="metric-name">Discrepancy Detection Rate</div>
            <div class="metric-desc">
              Percentage of tampered or mislabeled chunks caught and isolated at the Retrieval Gateway before synthesis.
            </div>
          </div>
          <div>
            <div class="metric-comparison-row">
              <span class="metric-sys-val" style="color: var(--text-muted);">Shared: 0.0%</span>
              <span class="metric-sys-val" style="color: var(--accent-bright); font-size: 1.1rem; font-weight: 700;">100.0%</span>
            </div>
          </div>
        </div>

        <!-- Metric 3: Revocation Delay -->
        <div class="glass-card metric-card">
          <div>
            <div class="metric-name">Revocation Enforcement Delay</div>
            <div class="metric-desc">
              Time elapsed between control-plane permission revocation and complete blocking of access in retrieval.
            </div>
          </div>
          <div>
            <div class="metric-comparison-row">
              <span class="metric-sys-val" style="color: var(--deny);">Baselines: Re-index</span>
              <span class="metric-sys-val" style="color: var(--accent-bright); font-weight: 700;">0 ms (Next Query)</span>
            </div>
          </div>
        </div>

        <!-- Metric 4: Authorized Recall@5 -->
        <div class="glass-card metric-card">
          <div>
            <div class="metric-name">Authorized Recall@5 & nDCG@5</div>
            <div class="metric-desc">
              Retrieval quality for legitimately authorized queries. Proves security adds zero degradation to valid retrieval.
            </div>
          </div>
          <div>
            <div class="metric-comparison-row">
              <span class="metric-sys-val">Recall: 1.00</span>
              <span class="metric-sys-val" style="color: var(--accent-bright);">nDCG@5: 0.98</span>
            </div>
          </div>
        </div>

        <!-- Metric 5: Latency Overhead -->
        <div class="glass-card metric-card">
          <div>
            <div class="metric-name">Decision Latency Overhead</div>
            <div class="metric-desc">
              Additional micro-latency per candidate for cryptographic HMAC re-check and discrepancy verification.
            </div>
          </div>
          <div>
            <div class="metric-comparison-row">
              <span class="metric-sys-val">p50: +0.42 ms</span>
              <span class="metric-sys-val">p95: +0.89 ms</span>
            </div>
          </div>
        </div>

        <!-- Metric 6: Fail-Closed Availability -->
        <div class="glass-card metric-card">
          <div>
            <div class="metric-name">Fail-Closed Availability Cost</div>
            <div class="metric-desc">
              Under policy service outage (F5), system releases 0 chunks rather than risking unverified cross-tenant leakage.
            </div>
          </div>
          <div>
            <div class="metric-comparison-row">
              <span class="metric-sys-val" style="color: var(--quarantine);">Released: 0 chunks</span>
              <span class="metric-sys-val" style="color: var(--accent-bright);">Leaks: 0</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Benchmark Runner Box -->
      <div class="benchmark-table-box">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 20px;">
          <div>
            <h3 style="margin-bottom: 4px;">Automated Benchmark Suite</h3>
            <p style="font-size: 0.82rem; color: var(--text-muted);">
              Runs all scenarios F0–F5 × 10 ground truth queries × N iterations live in-browser.
            </p>
          </div>
          <div style="display: flex; align-items: center; gap: 14px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 0.8rem; color: var(--text-muted);">Trials (N):</span>
              <input id="benchmarkTrialsInput" type="range" min="5" max="100" value="5" style="width: 100px;" />
              <span id="benchmarkTrialsVal" style="font-family: var(--font-mono); font-size: 0.85rem;">5</span>
            </div>
            <button id="runBenchmarkBtn" class="btn-primary" style="padding: 8px 18px; font-size: 0.85rem;">
              Run Benchmark Suite
            </button>
          </div>
        </div>

        <!-- Progress bar -->
        <div id="benchmarkProgressBarWrap" style="display: none; margin-bottom: 16px;">
          <div style="height: 6px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
            <div id="benchmarkProgressBar" style="height: 100%; width: 0%; background: var(--accent-bright); transition: width 0.1s;"></div>
          </div>
        </div>

        <!-- Heat Grid Table -->
        <table class="benchmark-table" id="benchmarkTable">
          <thead>
            <tr>
              <th>Scenario</th>
              <th>Description</th>
              <th>Shared Filter Leakage</th>
              <th>Separate Index Leakage</th>
              <th>Integrity Layer Leakage</th>
              <th>Discrepancy Catch</th>
            </tr>
          </thead>
          <tbody id="benchmarkTableBody">
            <tr>
              <td><strong>F0</strong></td>
              <td>Baseline Normal Operations</td>
              <td><span style="color: var(--allow);">✓ 0.0%</span></td>
              <td><span style="color: var(--allow);">✓ 0.0%</span></td>
              <td><span style="color: var(--allow);">✓ 0.0%</span></td>
              <td>N/A</td>
            </tr>
            <tr>
              <td><strong>F1</strong></td>
              <td>Incorrect Tenant Label (DOC-FA-101)</td>
              <td><span style="color: var(--deny); font-weight: 700;">⚠ 100.0% (LEAK)</span></td>
              <td><span style="color: var(--allow);">✓ 0.0%</span></td>
              <td><span style="color: var(--allow); font-weight: 700;">✓ 0.0% (BLOCKED)</span></td>
              <td><span style="color: var(--allow);">100% (Check 4)</span></td>
            </tr>
            <tr>
              <td><strong>F2</strong></td>
              <td>Targeted Metadata Poisoning (DOC-FC-301)</td>
              <td><span style="color: var(--deny); font-weight: 700;">⚠ 100.0% (LEAK)</span></td>
              <td><span style="color: var(--allow);">✓ 0.0%</span></td>
              <td><span style="color: var(--allow); font-weight: 700;">✓ 0.0% (BLOCKED)</span></td>
              <td><span style="color: var(--allow);">100% (Critical)</span></td>
            </tr>
            <tr>
              <td><strong>F3</strong></td>
              <td>Stale Revocation Gap (DOC-FA-103)</td>
              <td><span style="color: var(--deny); font-weight: 700;">⚠ 100.0% (LEAK)</span></td>
              <td><span style="color: var(--deny); font-weight: 700;">⚠ 100.0% (LEAK)</span></td>
              <td><span style="color: var(--allow); font-weight: 700;">✓ 0.0% (0 ms)</span></td>
              <td><span style="color: var(--allow);">100% (Version Drift)</span></td>
            </tr>
            <tr>
              <td><strong>F4</strong></td>
              <td>Corrupt Policy / Signature (DOC-FB-202)</td>
              <td><span style="color: var(--text-muted);">Blind (No leak)</span></td>
              <td><span style="color: var(--allow);">✓ 0.0%</span></td>
              <td><span style="color: var(--quarantine);">0.0% (Denied: Safe)</span></td>
              <td><span style="color: var(--allow);">100% (Check 2)</span></td>
            </tr>
            <tr>
              <td><strong>F5</strong></td>
              <td>Policy Registry Outage</td>
              <td><span style="color: var(--text-muted);">Blind Serving</span></td>
              <td><span style="color: var(--text-muted);">Blind Serving</span></td>
              <td><span style="color: var(--allow);">0 chunks (Fail-Closed)</span></td>
              <td><span style="color: var(--allow);">100% (Check 1)</span></td>
            </tr>
          </tbody>
        </table>

        <!-- Python export/import mode -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 18px; pt: 12px; border-top: 1px solid var(--border); flex-wrap: wrap; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 0.78rem; color: var(--text-muted);">Mode:</span>
            <span class="badge badge-info" id="dataModeBadge">Simulated (browser)</span>
          </div>
          <div style="display: flex; gap: 8px;">
            <button id="exportResultsBtn" class="btn-ghost" style="padding: 4px 12px; font-size: 0.75rem;">Export JSON</button>
            <label class="btn-ghost" style="padding: 4px 12px; font-size: 0.75rem; cursor: pointer;">
              Import evaluate.py JSON
              <input type="file" id="importJsonInput" accept=".json" style="display: none;" />
            </label>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CHAPTER 6.5: ANSWERS (FAQ) -->
  <section id="answers" class="section" style="padding-top: 0;">
    <div class="container">
      <div style="text-align: center; max-width: 760px; margin: 0 auto 36px;">
        <h2>Frequently asked <em class="accent-phrase">questions.</em></h2>
        <p class="lead">Key design decisions and architectural trade-offs explained.</p>
      </div>

      <div class="faq-grid">
        <!-- Q1 -->
        <div class="faq-item">
          <div class="faq-header">
            <span class="faq-question">1. Why not just filter on vector database metadata?</span>
            <svg class="faq-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div class="faq-body-wrapper">
            <div class="faq-body-inner">
              <div class="faq-content">
                Vector metadata lives in the same trust zone as the chunk embeddings themselves. Any misconfiguration at ingestion, pipeline error, or storage compromise causes the metadata filter to blindly believe tampered tags. The Authorization-Integrity Layer decouples permissions into an independently signed Control Plane so the data store is never the policy authority.
              </div>
            </div>
          </div>
        </div>

        <!-- Q2 -->
        <div class="faq-item">
          <div class="faq-header">
            <span class="faq-question">2. What does fail-closed cost in practice?</span>
            <svg class="faq-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div class="faq-body-wrapper">
            <div class="faq-body-inner">
              <div class="faq-content">
                Availability. In an industrial RAG setting (Fault 5), if the policy registry cannot be reached, the gateway releases zero candidate chunks rather than guessing. While baselines continue answering without knowing whether the release is authorized, our architecture prioritizes confidentiality over availability in high-stakes manufacturing and defense environments.
              </div>
            </div>
          </div>
        </div>

        <!-- Q3 -->
        <div class="faq-item">
          <div class="faq-header">
            <span class="faq-question">3. Why sign policies with HMAC-SHA256?</span>
            <svg class="faq-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div class="faq-body-wrapper">
            <div class="faq-body-inner">
              <div class="faq-content">
                HMAC-SHA256 signatures ensure that policy records cannot be tampered with in transit or storage without detection. Check 3 recalculates the signature using the control plane secret and compares the content hash against the raw text. Any alteration triggers an immediate quarantine and denial.
              </div>
            </div>
          </div>
        </div>

        <!-- Q4 -->
        <div class="faq-item">
          <div class="faq-header">
            <span class="faq-question">4. Does a permission change require vector re-indexing?</span>
            <svg class="faq-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div class="faq-body-wrapper">
            <div class="faq-body-inner">
              <div class="faq-content">
                No! In our architecture, permission revocations take effect in 0 ms on the very next query because Check 4 detects version drift (v1 < v2) between vector metadata and the policy registry. A separate index architecture, by contrast, requires an expensive offline re-indexing cycle before stale partner documents are evicted.
              </div>
            </div>
          </div>
        </div>

        <!-- Q5 -->
        <div class="faq-item">
          <div class="faq-header">
            <span class="faq-question">5. How can you be certain a leak is truly a leak?</span>
            <svg class="faq-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div class="faq-body-wrapper">
            <div class="faq-body-inner">
              <div class="faq-content">
                Every document in the corpus is embedded with a deterministic, unique cryptographic canary string (e.g. <code>[CANARY-FA-TURBINE-7741]</code>). If a canary associated with Factory A appears in the LLM context of Factory B, cross-tenant leakage is established with zero ambiguity.
              </div>
            </div>
          </div>
        </div>

        <!-- Q6 -->
        <div class="faq-item">
          <div class="faq-header">
            <span class="faq-question">6. What changes in Phase III?</span>
            <svg class="faq-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div class="faq-body-wrapper">
            <div class="faq-body-inner">
              <div class="faq-content">
                Phase III pairs the in-memory engine with a distributed Qdrant vector database backend, scales the corpus from 10 technical documents to 500+ multi-page industrial PDFs, executes 100-trial statistical significance benchmarks, and finalizes the peer-reviewed IEEE manuscript.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CHAPTER 7: ROADMAP & FAREWELL -->
  <footer id="roadmap" class="footer-section">
    <div class="container">
      <div style="text-align: center; max-width: 760px; margin: 0 auto 36px;">
        <div class="badge badge-info" style="margin-bottom: 12px;">Chapter 7 · Project Horizon</div>
        <h2>From prototype to <em class="accent-phrase">paper.</em></h2>
        <p class="lead">Engineering roadmap advancing multi-tenant industrial RAG security.</p>
      </div>

      <!-- Roadmap Timeline -->
      <div class="roadmap-timeline">
        <div class="roadmap-step">
          <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-bright); margin-bottom: 6px;">PHASE I · COMPLETE ✓</div>
          <h4 style="margin-bottom: 8px;">Problem Formulation & Architecture</h4>
          <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.5;">
            Literature survey, multi-tenant industrial threat model, UN SDG 9 mapping, and the 3-plane Trusted Enforcement Boundary design.
          </p>
        </div>

        <div class="roadmap-step active boundary-card">
          <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-bright); margin-bottom: 6px;">PHASE II · CURRENT (ACTIVE) ✓</div>
          <h4 style="margin-bottom: 8px;">Core Prototype & Benchmark Engine</h4>
          <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.5;">
            In-browser Phase-II implementation, HMAC cryptographic signing, 5-fault injector suite, 3-way evaluation harness, and public repository.
          </p>
        </div>

        <div class="roadmap-step">
          <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); margin-bottom: 6px;">PHASE III · FORTHCOMING 🔜</div>
          <h4 style="margin-bottom: 8px;">Production Scale & IEEE Submission</h4>
          <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.5;">
            Qdrant distributed vector backend, 500+ multi-page technical PDFs, 100-trial statistical significance benchmarks, and journal publication.
          </p>
        </div>
      </div>

      <div style="text-align: center;">
        <div class="sdg-badge-card">
          <div style="background: #00689D; color: #fff; font-family: var(--font-mono); font-weight: 700; padding: 6px 12px; border-radius: 6px; font-size: 0.85rem;">
            SDG 9
          </div>
          <div style="text-align: left; font-size: 0.8rem;">
            <strong>Industry, Innovation and Infrastructure</strong><br>
            <span style="color: var(--text-muted);">Targets: 9.1 (Resilient infra), 9.5 (Industrial R&D), 9.b (Domestic tech), 9.c (Secure ICT access)</span>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div>
          <p style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 6px;">
            <em>Browser re-implementation of the Phase-II prototype (in-memory TF-IDF engine). Phase III adds a Qdrant backend and a 500+ document corpus.</em>
          </p>
          <div style="display: flex; gap: 16px; margin-top: 8px;">
            <a href="https://github.com/Eshu234567/industrial-rag-integrity-layer" target="_blank" rel="noopener" style="color: var(--text-muted); text-decoration: underline;">
              GitHub Repository
            </a>
            <a href="https://eshu234567.github.io/industrial-rag-integrity-layer/" target="_blank" rel="noopener" style="color: var(--text-muted); text-decoration: underline;">
              Existing Live Demo UI
            </a>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 12px;">
          <button id="selfTestChipBtn" class="self-test-chip" title="Click to view detailed engine self-test assertions">
            <span id="selfTestChipStatus">Engine self-test ✓ 14/14</span>
          </button>
        </div>
      </div>
    </div>
  </footer>

  <!-- KEYBOARD SHORTCUTS MODAL -->
  <div class="modal-overlay" id="helpModal">
    <div class="modal-box">
      <button class="modal-close" id="helpModalClose">&times;</button>
      <h3 style="margin-bottom: 12px;">Keyboard Shortcuts & Navigation</h3>
      <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 16px;">
        Control the live simulation engine without touching the mouse.
      </p>
      <div style="display: flex; flex-direction: column; gap: 10px; font-size: 0.85rem;">
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border); padding-bottom: 6px;">
          <span>Run Query</span>
          <code style="font-family: var(--font-mono); background: var(--bg-glass); padding: 2px 6px; border-radius: 4px;">Enter</code>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border); padding-bottom: 6px;">
          <span>Play / Pause Animation</span>
          <code style="font-family: var(--font-mono); background: var(--bg-glass); padding: 2px 6px; border-radius: 4px;">Space</code>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border); padding-bottom: 6px;">
          <span>Step Next Beat</span>
          <code style="font-family: var(--font-mono); background: var(--bg-glass); padding: 2px 6px; border-radius: 4px;">→ (ArrowRight)</code>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border); padding-bottom: 6px;">
          <span>Toggle Faults 1 – 5</span>
          <code style="font-family: var(--font-mono); background: var(--bg-glass); padding: 2px 6px; border-radius: 4px;">Keys 1, 2, 3, 4, 5</code>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border); padding-bottom: 6px;">
          <span>Show this Help Modal</span>
          <code style="font-family: var(--font-mono); background: var(--bg-glass); padding: 2px 6px; border-radius: 4px;">?</code>
        </div>
      </div>
    </div>
  </div>

  <!-- SELF-TEST MODAL -->
  <div class="modal-overlay" id="selfTestModal">
    <div class="modal-box">
      <button class="modal-close" id="selfTestModalClose">&times;</button>
      <h3 style="margin-bottom: 6px;">Engine Acceptance Self-Test Suite</h3>
      <p style="color: var(--text-muted); font-size: 0.82rem; margin-bottom: 16px;">
        14/14 automated assertions verified against the in-browser runtime engine.
      </p>
      <div id="selfTestModalList" style="display: flex; flex-direction: column; gap: 8px; font-size: 0.8rem;"></div>
    </div>
  </div>

  <!-- INGESTION GATE MODAL -->
  <div class="modal-overlay" id="ingestModal">
    <div class="modal-box">
      <button class="modal-close" id="ingestModalClose">&times;</button>
      <h3 style="margin-bottom: 6px;">Ingestion & Integrity Gate</h3>
      <p style="color: var(--text-muted); font-size: 0.82rem; margin-bottom: 16px;">
        Simulate document ingestion. If claimed tenant ≠ registry owner, document is diverted to Quarantine Vault with stage <code>INGESTION_GATE</code> and never enters the vector store.
      </p>
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <div>
          <label style="font-size: 0.78rem; color: var(--text-muted);">Document to Ingest:</label>
          <select id="ingestDocSelect" class="select-dark">
            <option value="DOC-FA-101">DOC-FA-101 (Turbine Manual · True Owner: Factory A)</option>
            <option value="DOC-FB-201">DOC-FB-201 (RoboArm Manual · True Owner: Factory B)</option>
            <option value="DOC-FC-301">DOC-FC-301 (CatSynth SOP · True Owner: Factory C)</option>
          </select>
        </div>
        <div>
          <label style="font-size: 0.78rem; color: var(--text-muted);">Claimed Ingestion Tag:</label>
          <select id="ingestClaimedTagSelect" class="select-dark">
            <option value="Factory A">Factory A</option>
            <option value="Factory B" selected>Factory B (Mismatch test for DOC-FA-101)</option>
            <option value="Factory C">Factory C</option>
            <option value="Factory D">Factory D</option>
            <option value="Factory E">Factory E</option>
          </select>
        </div>
        <button id="executeIngestBtn" class="btn-primary" style="justify-content: center; margin-top: 8px;">
          Ingest Document
        </button>
        <div id="ingestResultBanner" style="display: none; padding: 10px; border-radius: 8px; font-size: 0.8rem; margin-top: 8px;"></div>
      </div>
    </div>
  </div>
`;

