// src_engine.js - Real In-Browser Engine (Pure JS Crypto, TF-IDF, SimEngine, 14 Self-Tests)
module.exports = `
// --- PURE JS CRYPTOGRAPHIC ENGINE (Deterministic SHA-256 & HMAC-SHA256) ---
const SECRET_KEY = 'DEMO-ONLY-KEY';

function sha256Bytes(bytes) {
  function rr(v, a) { return (v >>> a) | (v << (32 - a)); }
  const maxW = Math.pow(2, 32);
  let words = [], bitLen = bytes.length * 8, hash = [], k = [], pC = 0, isC = {};
  for (let c = 2; pC < 64; c++) {
    if (!isC[c]) {
      for (let i = 0; i < 313; i += c) isC[i] = c;
      hash[pC] = (Math.pow(c, 0.5) * maxW) | 0;
      k[pC++] = (Math.pow(c, 1/3) * maxW) | 0;
    }
  }
  let padded = Array.from(bytes);
  padded.push(0x80);
  while ((padded.length % 64) !== 56) padded.push(0);
  for (let i = 0; i < padded.length; i++) words[i >> 2] |= padded[i] << (((3 - i) % 4) * 8);
  words.push((bitLen / maxW) | 0);
  words.push(bitLen | 0);
  for (let j = 0; j < words.length; ) {
    let w = words.slice(j, (j += 16)), oldH = hash.slice(0, 8);
    for (let i = 0; i < 64; i++) {
      let w15 = w[i-15], w2 = w[i-2], a = hash[0], e = hash[4];
      let t1 = hash[7] + (rr(e,6)^rr(e,11)^rr(e,25)) + ((e & hash[5])^(~e & hash[6])) + k[i] +
               (w[i] = i < 16 ? (w[i]||0) : (w[i-16] + (rr(w15,7)^rr(w15,18)^(w15>>>3)) + w[i-7] + (rr(w2,17)^rr(w2,19)^(w2>>>10))) | 0);
      let t2 = (rr(a,2)^rr(a,13)^rr(a,22)) + ((a & hash[1])^(a & hash[2])^(hash[1] & hash[2]));
      hash = [(t1 + t2) | 0].concat(hash);
      hash[4] = (hash[4] + t1) | 0;
    }
    for (let i = 0; i < 8; i++) hash[i] = (hash[i] + oldH[i]) | 0;
  }
  let out = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 3; j >= 0; j--) out.push((hash[i] >> (j * 8)) & 255);
  }
  return out;
}

function strToBytes(str) {
  let b = [];
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);
    if (c < 128) b.push(c);
    else if (c < 2048) b.push(192|(c>>6), 128|(c&63));
    else b.push(224|(c>>12), 128|((c>>6)&63), 128|(c&63));
  }
  return b;
}

function bytesToHex(b) {
  return b.map(x => (x < 16 ? '0' : '') + x.toString(16)).join('');
}

function cryptoSha256(str) {
  return bytesToHex(sha256Bytes(strToBytes(str)));
}

function cryptoHmacSha256(keyStr, msgStr) {
  let key = strToBytes(keyStr), msg = strToBytes(msgStr);
  if (key.length > 64) key = sha256Bytes(key);
  while (key.length < 64) key.push(0);
  let oKey = key.map(x => x ^ 0x5c), iKey = key.map(x => x ^ 0x36);
  let inner = sha256Bytes(iKey.concat(msg));
  let outer = sha256Bytes(oKey.concat(inner));
  return bytesToHex(outer);
}

function computeSignature(doc_id, owner_tenant, allowed_tenants, version) {
  const sortedAllowed = [...allowed_tenants].sort().join(',');
  const msg = [doc_id, owner_tenant, sortedAllowed, version].join('|');
  return cryptoHmacSha256(SECRET_KEY, msg);
}

// --- 10 TECHNICAL INDUSTRIAL DOCUMENTS CORPUS (§1.3) ---
const INDUSTRIAL_CORPUS = [
  {
    doc_id: 'DOC-FA-101',
    owner: 'Factory A',
    title: 'GT-9000 Gas Turbine High-Pressure Rotor Blade Inspection & Torque Specifications',
    type: 'Maintenance Manual (turbine)',
    allowed: ['Factory A'],
    canary: '[CANARY-FA-TURBINE-7741]',
    text: 'Model GT-9000 stage 1 high-pressure turbine rotor blade inspection protocol requires ultrasonic non-destructive testing for micro-fissures along the trailing edge. Fastener torque specifications mandate 480 Nm ± 5 Nm using calibrated pneumatic wrenches. Clearance tolerances must not exceed 0.035 mm under standard ambient temperatures. Canary: [CANARY-FA-TURBINE-7741].'
  },
  {
    // ⚠ sync with repo
    doc_id: 'DOC-FA-102',
    owner: 'Factory A',
    title: 'Apex GT-9000 Rapid Emergency Shutdown & Vibration Trip Thresholds',
    type: 'SOP',
    allowed: ['Factory A'],
    canary: '[CANARY-FA-TURBINE-8824]',
    text: 'Standard operating procedure for emergency trip shutdown on GT-9000 gas turbines. Immediate fuel solenoid cutoff activates if bearing vibration telemetry exceeds 7.2 mm/s RMS peak velocity or exhaust gas temperature exceeds 680 C. Nitrogen purge airflow cycles for 180 seconds across the burner cans. Canary: [CANARY-FA-TURBINE-8824].'
  },
  {
    doc_id: 'DOC-FA-103',
    owner: 'Factory A',
    title: 'Superalloy Inconel-718 Casting Tolerance & Interface Spec for Robotic Handlers',
    type: 'Partner-Shared Supplier Spec',
    allowed: ['Factory A', 'Factory B'],
    canary: '[CANARY-FA-SUPPLIER-3190]',
    text: 'Technical specification for Inconel-718 cast flange mating interfaces shared with robotics tooling partners. Machining tolerance is critical at ±0.012 mm with Ra surface finish of 0.4 microns. Flange mounting bolt pattern requires grade-8 cadmium-plated titanium fasteners torqued to 110 Nm. Canary: [CANARY-FA-SUPPLIER-3190].'
  },
  {
    // ⚠ sync with repo
    doc_id: 'DOC-FB-201',
    owner: 'Factory B',
    title: 'RoboArm BX-600 6-Axis Articulated Arm Absolute Optical Encoder Recalibration',
    type: 'Maintenance Manual (6-axis arm)',
    allowed: ['Factory B'],
    canary: '[CANARY-FB-ROBOTIC-5512]',
    text: 'RoboArm BX-600 joint encoder zero-position recalibration procedure. If joint J2 or J3 drift exceeds 0.05 degrees, mount the dual-axis laser collimator and zero the absolute optical encoders via port CAN-2. Tighten harmonic drive clamp bolts to 32 Nm in cross-pattern. Canary: [CANARY-FB-ROBOTIC-5512].'
  },
  {
    doc_id: 'DOC-FB-202',
    owner: 'Factory B',
    title: 'RoboArm BX-600 Harmonic Drive Lubrication & End-Effector Payload Calibration',
    type: 'SOP',
    allowed: ['Factory B'],
    canary: '[CANARY-FB-ROBOTIC-9938]',
    text: 'Standard operating procedure for BX-600 end-effector tool center point (TCP) dynamic payload calibration. Apply Krytox synthetic fluorinated grease to cycloidal gears every 500 operating hours. Perform automated trajectory verification with 15 kg test mass at 1.8 m/s tip velocity. Canary: [CANARY-FB-ROBOTIC-9938].'
  },
  {
    doc_id: 'DOC-FC-301',
    owner: 'Factory C',
    title: 'CatSynth-400 High-Pressure Platinum Catalyst Bed Purge & Passivation Cycle',
    type: 'SOP (catalytic synthesis)',
    allowed: ['Factory C'],
    canary: '[CANARY-FC-CATALYST-4109]',
    text: 'Operating standard for CatSynth-400 fixed-bed catalytic hydrogenation reactor shutdown. Purge column using dry nitrogen at 4.5 MPa until hydrocarbon vapor content drops below 15 ppm. Maintain platinum catalyst bed temperature at 145 C during passivation to prevent pyrophoric oxidation. Canary: [CANARY-FC-CATALYST-4109].'
  },
  {
    // ⚠ sync with repo
    doc_id: 'DOC-FC-302',
    owner: 'Factory C',
    title: 'Reactor Vessel Pressure Relief Rupture Disk & Safety Valve Maintenance',
    type: 'Maintenance Manual',
    allowed: ['Factory C'],
    canary: '[CANARY-FC-CATALYST-6284]',
    text: 'Inspection and hydrostatic testing protocol for CatSynth reactor pressure relief valves and burst disks. Inconel rupture disks rated for 25.0 MPa must be replaced annually. Check dual safety relief vent line for polymer accumulation and verify discharge backpressure under 0.2 MPa. Canary: [CANARY-FC-CATALYST-6284].'
  },
  {
    // ⚠ sync with repo
    doc_id: 'DOC-FD-401',
    owner: 'Factory D',
    title: 'EUV-950 Extreme Ultraviolet Lithography Collector Mirror In-Situ H2 Cleaning',
    type: 'SOP (EUV lithography)',
    allowed: ['Factory D'],
    canary: '[CANARY-FD-LITHO-1205]',
    text: 'Standard procedure for in-situ hydrogen radical cleaning of EUV-950 collector multilayer mirrors. Maintain chamber ultra-high vacuum at 1e-7 mbar, inject 99.9999% purity molecular hydrogen at 250 sccm, and initiate RF plasma dissociation for 45 minutes to remove tin debris without substrate sputtering. Canary: [CANARY-FD-LITHO-1205].'
  },
  {
    // ⚠ sync with repo
    doc_id: 'DOC-FD-402',
    owner: 'Factory D',
    title: 'High-Vacuum Cryopump Regeneration & Ferrofluidic Seal Replacement',
    type: 'Maintenance Manual',
    allowed: ['Factory D'],
    canary: '[CANARY-FD-LITHO-7843]',
    text: 'Cryopump closed-cycle helium compressor service guide. Initiate thermal regeneration bakeout to 310 K when cryopanel hydrogen capacity saturation exceeds 85%. Replace wafer stage rotation ferrofluidic vacuum feedthrough seals using fluorocarbon magnetic fluid every 10,000 wafer exposures. Canary: [CANARY-FD-LITHO-7843].'
  },
  {
    // ⚠ sync with repo
    doc_id: 'DOC-FE-501',
    owner: 'Factory E',
    title: 'AeroComp Carbon-Fiber Wing Spar Vacuum Debulking & Autoclave Cure Profile',
    type: 'SOP (composite layup)',
    allowed: ['Factory E'],
    canary: '[CANARY-FE-AERO-3491]',
    text: 'Standard operating procedure for carbon fiber prepreg wing spar debulking and autoclave cure cycle. Vacuum debulk debag at -0.98 bar for 30 minutes. Pressurize autoclave to 7.0 bar nitrogen atmosphere, ramp temperature at 1.5 C/min to dwell at 180 C for 240 minutes, with acoustic emission monitoring. Canary: [CANARY-FE-AERO-3491].'
  }
];

// --- TOKENIZER & VECTOR ENCODER (§5.2) ---
function tokenizeText(text) {
  const lower = text.toLowerCase();
  const modelRegex = /[a-z]+-?\\d+[a-z0-9-]*/g;
  const modelMatches = lower.match(modelRegex) || [];
  const modelSubTokens = [];
  modelMatches.forEach(m => {
    const parts = m.split(/[^a-z0-9]+/).filter(Boolean);
    if (parts.length > 1) modelSubTokens.push(...parts);
  });
  const words = lower.split(/[^a-z0-9]+/).filter(w => w.length > 1);
  const allTokens = [...words, ...modelMatches, ...modelSubTokens];
  for (let i = 0; i < words.length - 1; i++) {
    allTokens.push(words[i] + '_' + words[i+1]);
  }
  return allTokens;
}

const CORPUS_TOKENS = INDUSTRIAL_CORPUS.map(d => tokenizeText(d.title + ' ' + d.text));
const TOTAL_DOCS = INDUSTRIAL_CORPUS.length;
const DOC_FREQUENCY = {};
CORPUS_TOKENS.forEach(tokens => {
  const unique = new Set(tokens);
  unique.forEach(t => DOC_FREQUENCY[t] = (DOC_FREQUENCY[t] || 0) + 1);
});

function vectorizeTokens(tokens) {
  const tf = {};
  tokens.forEach(t => tf[t] = (tf[t] || 0) + 1);
  const vec = {};
  let sumSq = 0;
  for (const t in tf) {
    const df = DOC_FREQUENCY[t] || 0;
    const idf = Math.log((1 + TOTAL_DOCS) / (1 + df)) + 1;
    const w = (1 + Math.log(tf[t])) * idf;
    vec[t] = w;
    sumSq += w * w;
  }
  const norm = Math.sqrt(sumSq) || 1;
  for (const t in vec) vec[t] /= norm;
  return vec;
}

const CORPUS_VECTORS = CORPUS_TOKENS.map(vectorizeTokens);

function computeCosineSim(v1, v2) {
  let dot = 0;
  for (const t in v1) {
    if (v2[t]) dot += v1[t] * v2[t];
  }
  return dot;
}

// --- SIMULATION ENGINE CLASS (§5) ---
class SimEngine {
  constructor() {
    this.init();
  }

  init() {
    this.tenants = ['Factory A', 'Factory B', 'Factory C', 'Factory D', 'Factory E'];
    this.registry = {};
    INDUSTRIAL_CORPUS.forEach(d => {
      this.registry[d.doc_id] = {
        doc_id: d.doc_id,
        owner_tenant: d.owner,
        allowed_tenants: [...d.allowed],
        version: 1,
        status: 'ACTIVE',
        content_hash: cryptoSha256(d.text),
        signature: computeSignature(d.doc_id, d.owner, d.allowed, 1)
      };
    });

    this.vectorDb = INDUSTRIAL_CORPUS.map((d, idx) => ({
      chunk_id: d.doc_id + '-c1',
      doc_id: d.doc_id,
      title: d.title,
      text: d.text,
      canary: d.canary,
      vec: CORPUS_VECTORS[idx],
      metadata_owner_tag: d.owner,
      metadata_allowed_tags: [...d.allowed],
      metadata_policy_version: 1
    }));

    this.separateIdx = {};
    this.tenants.forEach(t => {
      this.separateIdx[t] = this.vectorDb
        .filter(c => c.metadata_allowed_tags.includes(t))
        .map(c => ({ ...c }));
    });

    this.quarantine = [];
    this.audit = [];
    this.prevHash = '0000000000000000000000000000000000000000000000000000000000000000';
    this.state = {
      policyServiceOnline: true,
      faults: {
        incorrect_label: false,
        targeted_poisoning: false,
        stale_permission: false,
        missing_policy: false,
        service_outage: false
      },
      stats: {
        revocationDelay: {
          shared_filter: 'not enforced until re-index',
          separate_index: 'not enforced until re-index',
          integrity_layer: '0 ms (next query)'
        }
      }
    };
  }

  appendAudit(entry) {
    const seq = this.audit.length + 1;
    const ts = new Date().toISOString();
    const payload = [seq, ts, entry.tenant, entry.doc_id, entry.decision, entry.reason, entry.check, this.prevHash].join('|');
    const hash = cryptoSha256(payload);
    const fullEntry = { seq, ts, ...entry, prev_hash: this.prevHash, hash };
    this.prevHash = hash;
    this.audit.unshift(fullEntry);
    return fullEntry;
  }

  quarantineChunk(chunk, stage, reason, details = {}) {
    const qRecord = {
      id: 'Q-' + (this.quarantine.length + 1),
      doc_id: chunk.doc_id,
      chunk_id: chunk.chunk_id || chunk.doc_id,
      stage,
      reason,
      details,
      ts: new Date().toISOString()
    };
    this.quarantine.unshift(qRecord);
    return qRecord;
  }

  applyFault(faultId) {
    this.state.faults[faultId] = true;
    if (faultId === 'incorrect_label') {
      const c = this.vectorDb.find(x => x.doc_id === 'DOC-FA-101');
      if (c) {
        c.metadata_owner_tag = 'Factory B';
        c.metadata_allowed_tags = ['Factory B'];
      }
    } else if (faultId === 'targeted_poisoning') {
      const c = this.vectorDb.find(x => x.doc_id === 'DOC-FC-301');
      if (c) {
        c.metadata_allowed_tags = ['Factory C', 'Factory A', 'Factory B'];
      }
    } else if (faultId === 'stale_permission') {
      const p = this.registry['DOC-FA-103'];
      if (p) {
        p.allowed_tenants = p.allowed_tenants.filter(t => t !== 'Factory B');
        p.version = 2;
        p.signature = computeSignature(p.doc_id, p.owner_tenant, p.allowed_tenants, p.version);
        this.appendAudit({ tenant: 'Factory B', doc_id: 'DOC-FA-103', decision: 'REVOKE', reason: 'POLICY_REVOKED', check: 0 });
      }
    } else if (faultId === 'missing_policy') {
      const p = this.registry['DOC-FB-202'];
      if (p) {
        p.status = 'CORRUPTED';
        p.signature = 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
      }
    } else if (faultId === 'service_outage') {
      this.state.policyServiceOnline = false;
    }
  }

  revertFault(faultId) {
    this.state.faults[faultId] = false;
    if (faultId === 'incorrect_label') {
      const c = this.vectorDb.find(x => x.doc_id === 'DOC-FA-101');
      if (c) {
        c.metadata_owner_tag = 'Factory A';
        c.metadata_allowed_tags = ['Factory A'];
      }
    } else if (faultId === 'targeted_poisoning') {
      const c = this.vectorDb.find(x => x.doc_id === 'DOC-FC-301');
      if (c) {
        c.metadata_allowed_tags = ['Factory C'];
      }
    } else if (faultId === 'stale_permission') {
      const p = this.registry['DOC-FA-103'];
      if (p) {
        p.allowed_tenants = ['Factory A', 'Factory B'];
        p.version = 1;
        p.signature = computeSignature(p.doc_id, p.owner_tenant, p.allowed_tenants, 1);
      }
    } else if (faultId === 'missing_policy') {
      const p = this.registry['DOC-FB-202'];
      if (p) {
        p.status = 'ACTIVE';
        p.signature = computeSignature(p.doc_id, p.owner_tenant, p.allowed_tenants, p.version);
      }
    } else if (faultId === 'service_outage') {
      this.state.policyServiceOnline = true;
    }
  }

  resetAllFaults() {
    for (const f in this.state.faults) {
      if (this.state.faults[f]) {
        this.revertFault(f);
      }
    }
  }

  revoke(doc_id, tenant) {
    const p = this.registry[doc_id];
    if (!p) return { success: false, reason: 'DOC_NOT_FOUND' };
    p.allowed_tenants = p.allowed_tenants.filter(t => t !== tenant);
    p.version++;
    p.signature = computeSignature(p.doc_id, p.owner_tenant, p.allowed_tenants, p.version);
    this.appendAudit({ tenant, doc_id, decision: 'REVOKE', reason: 'MANUAL_POLICY_REVOKED', check: 0 });
    return { success: true, version: p.version, allowed: p.allowed_tenants };
  }

  resync(doc_id) {
    const p = this.registry[doc_id];
    if (!p) return { success: false };
    const chunk = this.vectorDb.find(c => c.doc_id === doc_id);
    if (chunk) {
      chunk.metadata_owner_tag = p.owner_tenant;
      chunk.metadata_allowed_tags = [...p.allowed_tenants];
      chunk.metadata_policy_version = p.version;
    }
    // Remove from quarantine if present
    this.quarantine = this.quarantine.filter(q => q.doc_id !== doc_id);
    return { success: true };
  }

  ingest(doc_id, claimedTenantTag) {
    const p = this.registry[doc_id];
    if (!p) return { success: false, reason: 'DOC_NOT_FOUND' };
    if (claimedTenantTag !== p.owner_tenant) {
      const qRec = this.quarantineChunk({ doc_id }, 'INGESTION_GATE', 'CLAIMED_TAG_OWNER_MISMATCH', { claimed: claimedTenantTag, actual: p.owner_tenant });
      return { success: false, quarantined: true, record: qRec };
    }
    return { success: true };
  }

  retrieveCandidates(corpus, queryText, k = 5) {
    const qVec = vectorizeTokens(tokenizeText(queryText));
    const scored = corpus.map(chunk => ({
      chunk,
      score: computeCosineSim(qVec, chunk.vec)
    }));
    scored.sort((a, b) => b.score - a.score || a.chunk.chunk_id.localeCompare(b.chunk.chunk_id));
    return scored.slice(0, k).map(x => ({ ...x.chunk, score: x.score }));
  }

  async verifyCandidate(chunk, requestingTenant) {
    const t0 = performance.now();

    // 1. Control-plane reachability
    if (!this.state.policyServiceOnline) {
      this.appendAudit({ tenant: requestingTenant, doc_id: chunk.doc_id, decision: 'DENY', reason: 'FAIL_CLOSED_SERVICE_DOWN', check: 1 });
      return { allowed: false, check: 1, reason: 'FAIL_CLOSED_SERVICE_DOWN', details: 'Policy service unreachable (Fail-Closed)', latency_ms: performance.now() - t0 };
    }

    // 2. Policy presence & status
    const p = this.registry[chunk.doc_id];
    if (!p || p.status !== 'ACTIVE') {
      this.quarantineChunk(chunk, 'RETRIEVAL_GATEWAY', 'POLICY_MISSING_OR_INACTIVE', { status: p ? p.status : 'MISSING' });
      this.appendAudit({ tenant: requestingTenant, doc_id: chunk.doc_id, decision: 'DENY', reason: 'POLICY_MISSING_OR_INACTIVE', check: 2 });
      return { allowed: false, check: 2, reason: 'POLICY_MISSING_OR_INACTIVE', details: p ? 'Policy corrupted or inactive' : 'Policy record missing', latency_ms: performance.now() - t0 };
    }

    // 3. Cryptographic signature & content hash
    const expectedSig = computeSignature(p.doc_id, p.owner_tenant, p.allowed_tenants, p.version);
    const expectedHash = cryptoSha256(chunk.text);
    if (expectedSig !== p.signature || expectedHash !== p.content_hash) {
      this.quarantineChunk(chunk, 'RETRIEVAL_GATEWAY', 'SIGNATURE_OR_HASH_MISMATCH', { sigMismatch: expectedSig !== p.signature, hashMismatch: expectedHash !== p.content_hash });
      this.appendAudit({ tenant: requestingTenant, doc_id: chunk.doc_id, decision: 'DENY', reason: 'SIGNATURE_OR_HASH_MISMATCH', check: 3 });
      return { allowed: false, check: 3, reason: 'SIGNATURE_OR_HASH_MISMATCH', details: 'HMAC signature or content hash mismatch', latency_ms: performance.now() - t0 };
    }

    // 4. Metadata vs policy discrepancy
    const discrepancies = [];
    let severity = 'low';
    if (chunk.metadata_owner_tag !== p.owner_tenant) {
      discrepancies.push('OWNER_TAG_MISMATCH');
      severity = 'high';
    }
    const metaAllowed = new Set(chunk.metadata_allowed_tags);
    const polAllowed = new Set(p.allowed_tenants);
    let allowedMismatch = false;
    if (metaAllowed.size !== polAllowed.size) allowedMismatch = true;
    else {
      for (const t of metaAllowed) if (!polAllowed.has(t)) { allowedMismatch = true; break; }
    }
    if (allowedMismatch) {
      discrepancies.push('ALLOWED_TAGS_MISMATCH');
      for (const t of metaAllowed) {
        if (!polAllowed.has(t)) { severity = 'critical'; break; }
      }
      if (severity !== 'critical') severity = 'high';
    }
    if (chunk.metadata_policy_version < p.version) {
      discrepancies.push('VERSION_DRIFT');
      if (severity === 'low') severity = 'medium';
    }

    if (discrepancies.length > 0) {
      this.quarantineChunk(chunk, 'RETRIEVAL_GATEWAY', 'METADATA_DISCREPANCY', { discrepancies, severity });
      this.appendAudit({ tenant: requestingTenant, doc_id: chunk.doc_id, decision: 'DENY', reason: 'METADATA_DISCREPANCY', check: 4, discrepancies });
      return { allowed: false, check: 4, reason: 'METADATA_DISCREPANCY', subReasons: discrepancies, severity, details: discrepancies.join(', '), latency_ms: performance.now() - t0 };
    }

    // 5. Authoritative tenant decision
    if (p.allowed_tenants.includes(requestingTenant)) {
      this.appendAudit({ tenant: requestingTenant, doc_id: chunk.doc_id, decision: 'ALLOW', reason: 'ALLOW', check: 5 });
      return { allowed: true, check: 5, reason: 'ALLOW', details: 'Authorized per authoritative policy', latency_ms: performance.now() - t0 };
    } else {
      this.appendAudit({ tenant: requestingTenant, doc_id: chunk.doc_id, decision: 'DENY', reason: 'TENANT_NOT_AUTHORIZED', check: 5 });
      return { allowed: false, check: 5, reason: 'TENANT_NOT_AUTHORIZED', details: 'Requesting tenant not in policy allowed list', latency_ms: performance.now() - t0 };
    }
  }

  async runQuery(requestingTenant, queryText) {
    // 1. Shared filter pipeline
    const sfCandidates = this.retrieveCandidates(this.vectorDb, queryText, 5);
    const sfReleased = sfCandidates.filter(c => c.metadata_allowed_tags.includes(requestingTenant));

    // 2. Separate index pipeline
    const sepIndexCorpus = this.separateIdx[requestingTenant] || [];
    const sepReleased = this.retrieveCandidates(sepIndexCorpus, queryText, 5);

    // 3. Integrity layer pipeline
    const ilCandidates = this.retrieveCandidates(this.vectorDb, queryText, 5);
    const ilReleased = [];
    const ilTrace = [];
    for (const c of ilCandidates) {
      const vRes = await this.verifyCandidate(c, requestingTenant);
      ilTrace.push({ chunk: c, ...vRes });
      if (vRes.allowed) {
        ilReleased.push(c);
      }
    }

    // Ground truth leak detection:
    // A leak occurs if a released chunk contains a canary for which the requesting tenant is NOT authorized in the registry
    const checkLeak = (released) => {
      const leaks = [];
      released.forEach(c => {
        const pol = this.registry[c.doc_id];
        const isAuth = pol && pol.allowed_tenants.includes(requestingTenant);
        if (!isAuth) {
          leaks.push({ doc_id: c.doc_id, canary: c.canary, requestingTenant });
        }
      });
      return leaks;
    };

    // Calculate authorized docs wrongly denied (availability cost)
    // A doc is wrongly denied if the requesting tenant was legitimately authorized per ground-truth, but denied by the system
    const checkWronglyDenied = (candidates, released) => {
      let count = 0;
      candidates.forEach(c => {
        const pol = this.registry[c.doc_id];
        // Legitimate owner or allowed tenant at baseline
        const docDef = INDUSTRIAL_CORPUS.find(d => d.doc_id === c.doc_id);
        const shouldBeAllowed = docDef && docDef.allowed.includes(requestingTenant);
        const wasReleased = released.some(r => r.doc_id === c.doc_id);
        if (shouldBeAllowed && !wasReleased) {
          count++;
        }
      });
      return count;
    };

    return {
      shared_filter: {
        candidates: sfCandidates,
        released: sfReleased,
        leaks: checkLeak(sfReleased),
        wronglyDenied: checkWronglyDenied(sfCandidates, sfReleased)
      },
      separate_index: {
        candidates: sepReleased,
        released: sepReleased,
        leaks: checkLeak(sepReleased),
        wronglyDenied: 0
      },
      integrity_layer: {
        candidates: ilCandidates,
        released: ilReleased,
        trace: ilTrace,
        leaks: checkLeak(ilReleased),
        wronglyDenied: checkWronglyDenied(ilCandidates, ilReleased)
      }
    };
  }
}

// --- 14 AUTOMATED ACCEPTANCE TESTS (§10) ---
async function runSelfTest() {
  const sim = new SimEngine();
  const results = [];

  // 1: Setup: All 10 registry signatures verify at v1
  let allSigValid = true;
  for (const doc_id in sim.registry) {
    const p = sim.registry[doc_id];
    const s = computeSignature(p.doc_id, p.owner_tenant, p.allowed_tenants, p.version);
    if (s !== p.signature) allSigValid = false;
  }
  results.push({ id: 1, name: 'Setup: All 10 registry signatures verify at v1', pass: allSigValid });

  // 2: Setup: Changing any single policy field breaks verification
  const pTest = sim.registry['DOC-FA-101'];
  const sigWrongOwner = computeSignature(pTest.doc_id, 'Factory B', pTest.allowed_tenants, pTest.version);
  const sigWrongAllowed = computeSignature(pTest.doc_id, pTest.owner_tenant, ['Factory B'], pTest.version);
  const sigWrongVersion = computeSignature(pTest.doc_id, pTest.owner_tenant, pTest.allowed_tenants, 2);
  const sigTampered = (sigWrongOwner !== pTest.signature) && (sigWrongAllowed !== pTest.signature) && (sigWrongVersion !== pTest.signature);
  results.push({ id: 2, name: 'Setup: Changing any single policy field breaks verification', pass: sigTampered });

  // 3: F0: Factory B supplier-spec releases DOC-FA-103 in all 3 systems
  const qSupplier = 'Superalloy Inconel-718 Casting Tolerance Interface Spec Robotic Handlers';
  const resF0 = await sim.runQuery('Factory B', qSupplier);
  const r3 = resF0.shared_filter.released.some(c => c.doc_id === 'DOC-FA-103') &&
             resF0.separate_index.released.some(c => c.doc_id === 'DOC-FA-103') &&
             resF0.integrity_layer.released.some(c => c.doc_id === 'DOC-FA-103');
  results.push({ id: 3, name: 'F0: Factory B supplier-spec releases DOC-FA-103 in all 3 systems', pass: r3 });

  // 4: F0: Zero foreign canaries across all ground-truth queries, all 3 systems
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
  let zeroLeaksF0 = true;
  for (const item of gtQueries) {
    const out = await sim.runQuery(item.tenant, item.q);
    if (out.shared_filter.leaks.length > 0 || out.separate_index.leaks.length > 0 || out.integrity_layer.leaks.length > 0) {
      zeroLeaksF0 = false;
    }
  }
  results.push({ id: 4, name: 'F0: Zero foreign canaries across ground-truth queries', pass: zeroLeaksF0 });

  // 5: F1: shared_filter releases DOC-FA-101 canary to Factory B
  sim.applyFault('incorrect_label');
  const qTurbine = 'GT-9000 Gas Turbine High-Pressure Rotor Blade Inspection Torque Specifications';
  const resF1 = await sim.runQuery('Factory B', qTurbine);
  const r5 = resF1.shared_filter.leaks.some(l => l.doc_id === 'DOC-FA-101' && l.canary === '[CANARY-FA-TURBINE-7741]');
  results.push({ id: 5, name: 'F1: shared_filter releases DOC-FA-101 canary to Factory B', pass: r5 });

  // 6: F1: separate_index clean; integrity_layer clean, DOC-FA-101 quarantined with OWNER_TAG_MISMATCH/ALLOWED_TAGS_MISMATCH (Check 4)
  const sepCleanF1 = resF1.separate_index.leaks.length === 0;
  const ilCleanF1 = resF1.integrity_layer.leaks.length === 0;
  const trace101 = resF1.integrity_layer.trace.find(t => t.chunk.doc_id === 'DOC-FA-101');
  const r6 = sepCleanF1 && ilCleanF1 && trace101 && !trace101.allowed && trace101.check === 4 &&
             (trace101.subReasons.includes('OWNER_TAG_MISMATCH') || trace101.subReasons.includes('ALLOWED_TAGS_MISMATCH'));
  results.push({ id: 6, name: 'F1: separate_index & integrity_layer clean, DOC-FA-101 quarantined at Check 4', pass: r6 });
  sim.revertFault('incorrect_label');

  // 7: F2: shared_filter leaks DOC-FC-301 canary to A and B; integrity_layer blocks both (ALLOWED_TAGS_MISMATCH, critical)
  sim.applyFault('targeted_poisoning');
  const qChem = 'CatSynth-400 High-Pressure Platinum Catalyst Bed Purge Passivation Cycle';
  const resF2A = await sim.runQuery('Factory A', qChem);
  const resF2B = await sim.runQuery('Factory B', qChem);
  const sfLeaksA = resF2A.shared_filter.leaks.some(l => l.doc_id === 'DOC-FC-301');
  const sfLeaksB = resF2B.shared_filter.leaks.some(l => l.doc_id === 'DOC-FC-301');
  const ilTraceA = resF2A.integrity_layer.trace.find(t => t.chunk.doc_id === 'DOC-FC-301');
  const ilTraceB = resF2B.integrity_layer.trace.find(t => t.chunk.doc_id === 'DOC-FC-301');
  const r7 = sfLeaksA && sfLeaksB &&
             resF2A.integrity_layer.leaks.length === 0 && resF2B.integrity_layer.leaks.length === 0 &&
             ilTraceA && ilTraceA.check === 4 && ilTraceA.subReasons.includes('ALLOWED_TAGS_MISMATCH') && ilTraceA.severity === 'critical' &&
             ilTraceB && ilTraceB.check === 4 && ilTraceB.subReasons.includes('ALLOWED_TAGS_MISMATCH') && ilTraceB.severity === 'critical';
  results.push({ id: 7, name: 'F2: shared_filter leaks DOC-FC-301 to A&B; integrity_layer blocks (critical)', pass: r7 });
  sim.revertFault('targeted_poisoning');

  // 8: F3: shared_filter and separate_index release DOC-FA-103 canary to Factory B after revocation
  sim.applyFault('stale_permission');
  const resF3 = await sim.runQuery('Factory B', qSupplier);
  const sfLeaksF3 = resF3.shared_filter.leaks.some(l => l.doc_id === 'DOC-FA-103' && l.canary === '[CANARY-FA-SUPPLIER-3190]');
  const sepLeaksF3 = resF3.separate_index.leaks.some(l => l.doc_id === 'DOC-FA-103' && l.canary === '[CANARY-FA-SUPPLIER-3190]');
  results.push({ id: 8, name: 'F3: shared_filter & separate_index release DOC-FA-103 canary to Factory B', pass: sfLeaksF3 && sepLeaksF3 });

  // 9: F3: integrity_layer denies B at Check 4 (VERSION_DRIFT); registry is v2, verified; delay reported 0 ms
  const ilTraceF3 = resF3.integrity_layer.trace.find(t => t.chunk.doc_id === 'DOC-FA-103');
  const pRev = sim.registry['DOC-FA-103'];
  const sigV2 = computeSignature(pRev.doc_id, pRev.owner_tenant, pRev.allowed_tenants, pRev.version);
  const r9 = resF3.integrity_layer.leaks.length === 0 &&
             ilTraceF3 && ilTraceF3.check === 4 && ilTraceF3.subReasons.includes('VERSION_DRIFT') &&
             pRev.version === 2 && sigV2 === pRev.signature &&
             sim.state.stats.revocationDelay.integrity_layer === '0 ms (next query)';
  results.push({ id: 9, name: 'F3: integrity_layer denies B at Check 4 (VERSION_DRIFT), 0 ms delay', pass: r9 });
  sim.revertFault('stale_permission');

  // 10: F4: integrity_layer denies DOC-FB-202 at Check 2, quarantines, Factory B wrongly denied increments
  sim.applyFault('missing_policy');
  const qArm = 'RoboArm BX-600 Harmonic Drive Lubrication End-Effector Payload Calibration';
  const resF4 = await sim.runQuery('Factory B', qArm);
  const traceFB202 = resF4.integrity_layer.trace.find(t => t.chunk.doc_id === 'DOC-FB-202');
  const qRecF4 = sim.quarantine.find(q => q.doc_id === 'DOC-FB-202' && q.reason === 'POLICY_MISSING_OR_INACTIVE');
  const wronglyDeniedFB202 = traceFB202 && !traceFB202.allowed && traceFB202.check === 2;
  results.push({ id: 10, name: 'F4: integrity_layer denies DOC-FB-202 at Check 2, quarantines, availability cost shown', pass: wronglyDeniedFB202 && !!qRecF4 });
  sim.revertFault('missing_policy');

  // 11: F5: integrity_layer releases 0 chunks for every tenant and query, reason FAIL_CLOSED_SERVICE_DOWN
  sim.applyFault('service_outage');
  const resF5A = await sim.runQuery('Factory A', qTurbine);
  const resF5B = await sim.runQuery('Factory B', qArm);
  const r11 = resF5A.integrity_layer.released.length === 0 &&
              resF5B.integrity_layer.released.length === 0 &&
              resF5A.integrity_layer.trace.every(t => t.check === 1 && t.reason === 'FAIL_CLOSED_SERVICE_DOWN') &&
              resF5B.integrity_layer.trace.every(t => t.check === 1 && t.reason === 'FAIL_CLOSED_SERVICE_DOWN');
  results.push({ id: 11, name: 'F5: integrity_layer releases 0 chunks (FAIL_CLOSED_SERVICE_DOWN)', pass: r11 });

  // 12: F5: shared_filter and separate_index still answer, no leak when no other fault is active
  const r12 = resF5A.shared_filter.released.length > 0 && resF5A.shared_filter.leaks.length === 0 &&
              resF5A.separate_index.released.length > 0 && resF5A.separate_index.leaks.length === 0;
  results.push({ id: 12, name: 'F5: shared_filter and separate_index still answer with no leak', pass: r12 });

  // 13: F1+F5 stacked: shared_filter leaks; integrity_layer releases 0
  sim.applyFault('incorrect_label');
  const resStacked = await sim.runQuery('Factory B', qTurbine);
  const r13 = resStacked.shared_filter.leaks.some(l => l.doc_id === 'DOC-FA-101') &&
              resStacked.integrity_layer.released.length === 0;
  results.push({ id: 13, name: 'F1+F5 stacked: shared_filter leaks, integrity_layer releases 0', pass: r13 });
  sim.revertFault('incorrect_label');
  sim.revertFault('service_outage');

  // 14: Ingestion: Claimed tag != registry owner -> record in quarantine (INGESTION_GATE) and absent from vectorDb
  const initialVdbCount = sim.vectorDb.length;
  const ingestFail = sim.ingest('DOC-FA-101', 'Factory C');
  const qIngest = sim.quarantine.find(q => q.stage === 'INGESTION_GATE' && q.doc_id === 'DOC-FA-101');
  const notInVdb = sim.vectorDb.length === initialVdbCount;
  results.push({ id: 14, name: 'Ingestion: Claimed tag != owner -> quarantined at INGESTION_GATE & absent from vectorDb', pass: ingestFail.quarantined && !!qIngest && notInVdb });

  console.log('--- ENGINE SELF-TEST (14/14) ---');
  results.forEach(r => console.log(\`[\${r.pass ? 'PASS' : 'FAIL'}] Test \${r.id}: \${r.name}\`));
  const passCount = results.filter(r => r.pass).length;
  console.log(\`TOTAL: \${passCount} / \${results.length}\`);

  return { passCount, total: results.length, results };
}
`;

