# Beyond Metadata Filtering: An Authorization-Integrity Layer for Secure Multi-Tenant Industrial RAG Systems

An authorization-integrity layer designed for high-consequence multi-tenant industrial Retrieval-Augmented Generation (RAG) systems. It prevents cross-tenant data leakage by mathematically decoupling vector data storage from policy authority.

---

## 🎯 Overview & Mission

In standard multi-tenant RAG systems, vector database metadata filtering is trusted to isolate tenant data. However, when documents and their authorization tags live in the same untrusted data store, a single mislabel, poisoned metadata tag, or stale permission allows confidential proprietary records to leak into unauthorized LLM contexts.

This project introduces a **Trusted Enforcement Boundary** where:
1. **Vector DB tags are treated as untrusted hints.**
2. **Every candidate chunk passes through a sequential 5-check Decision Engine** before entering the LLM context.
3. **Permissions are verified against an HMAC-SHA256 signed Control Plane Registry.**
4. **Any tampering, mislabeling, or stale version triggers immediate fail-closed denial and isolation to a Quarantine Vault.**

---

## 🏛 Architecture: Three Planes, One Boundary

- **Plane 1: Ingestion & Integrity Path:** Documents enter through an Ingestion Gate that verifies ownership against the registry before vector encoding. Unverified documents are quarantined immediately.
- **Plane 2: Multi-Tenant Query Path:** Top-$k$ cosine search candidates pass through the Retrieval Gateway where candidate-level authorization enforcement occurs.
- **Plane 3: Control Plane (Trusted Enforcement Boundary):** Policy administrators manage grants. Version bumps and revocations are re-signed with HMAC-SHA256. Decisions are logged to an append-only, SHA-256 hash-chained immutable audit trail.

---

## 🛡 The Five Sequential Checks

Every retrieved candidate chunk must pass all five turnstile gates:

| # | Gate | Denial Reason Code | Description |
|---|---|---|---|
| **1** | **Control-Plane Reachability** | `FAIL_CLOSED_SERVICE_DOWN` | If the policy service is unreachable, fail-closed (0 chunks released). |
| **2** | **Policy Presence & Status** | `POLICY_MISSING_OR_INACTIVE` | Record must exist and be `ACTIVE`. Corrupted/missing policies trigger quarantine. |
| **3** | **HMAC Signature & Content Hash** | `SIGNATURE_OR_HASH_MISMATCH` | Recomputes $\sigma = \text{HMAC-SHA256}(K, \text{doc\_id} \parallel \text{owner} \parallel \text{sorted(allowed)} \parallel v)$ and verifies SHA-256 chunk text hash. |
| **4** | **Metadata vs. Policy Discrepancy** | `METADATA_DISCREPANCY` | Compares vector DB metadata against the signed registry. Detects `OWNER_TAG_MISMATCH`, `ALLOWED_TAGS_MISMATCH`, and `VERSION_DRIFT`. |
| **5** | **Authoritative Tenant Decision** | `TENANT_NOT_AUTHORIZED` | Authoritative check: allows if and only if `requesting_tenant ∈ policy.allowed_tenants`. |

---

## 🧪 Controlled Fault Injection Suite

The simulator tests 5 controlled fault scenarios:

- **F0 (Baseline):** Legitimate partner-shared document access.
- **F1 (Incorrect Label):** Pipeline mislabels Factory A's turbine manual as Factory B.
- **F2 (Targeted Poisoning):** Unauthorized tenants appended to a chemical synthesis SOP's metadata tags.
- **F3 (Stale Permission Gap):** A partner's permission is revoked in the registry ($v1 \to v2$) without re-indexing the vector database. Enforced in **0 ms** on the next query.
- **F4 (Corrupted Policy):** Registry status/signature corrupted; fails safely at Check 2 demonstrating availability cost.
- **F5 (Service Outage):** Complete policy service blackout; fails closed with 0 chunks released to prevent unverified leakage.

---

## 📊 Live Simulation & Visualizer

The project contains a self-contained, interactive cinematic simulator in **`simulation.html`**:
- **Canvas Living Data Field:** Particle visualization of 5 tenant clusters with boundary crossing detection.
- **Interactive 3-Plane Architecture:** Diagram with request tracing and turnstile gate animations.
- **Synchronized 3-Way Simulator:** Side-by-side comparison of Shared Metadata Filtering, Separate Index per Tenant, and the proposed Integrity Layer.
- **Live Scoreboard & Inspector:** Candidate decision traces, database vs. registry diff view, Quarantine Vault, and hash-chained audit log.
- **Automated Benchmark Suite:** Multi-trial test runner evaluating leakage rates, discrepancy catch rates, and latency overhead.

### Running Locally
Open `simulation.html` in any modern web browser or start a local server:

\`\`\`bash
# Python
python -m http.server 8080

# Or Node.js
npx serve -l 8080 .
\`\`\`
Then navigate to `http://localhost:8080/simulation.html`.

---

## 📁 Repository Structure

\`\`\`
.
├── simulation.html       # Self-contained animated simulation & evaluation platform
├── generate_site.js      # Compiler script bundling modular source components
├── src_styles.js         # CSS design system, dark cinematic & presentation modes
├── src_markup.js         # HTML structure, inline SVGs, and modal dialogues
├── src_engine.js         # Pure JS crypto, TF-IDF vectorizer, SimEngine, 14 self-tests
├── src_director.js       # 7-beat animation choreographer and lane coordinators
├── src_ui.js             # Canvas particle field, benchmark suite, keyboard navigation
└── README.md             # Project documentation
\`\`\`

---

## 🌐 UN SDG 9 Alignment

This research directly advances **UN Sustainable Development Goal 9: Industry, Innovation and Infrastructure**:
- **Target 9.1:** Resilient multi-tenant industrial data infrastructure.
- **Target 9.5:** Industrial research and technological innovation in secure AI.
- **Target 9.b:** Domestic technological development and operational safety in high-consequence manufacturing.
- **Target 9.c:** Secure, verified information access across industrial manufacturing supply chains.
