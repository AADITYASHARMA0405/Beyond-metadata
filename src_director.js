// src_director.js - Animation Director (7 Beats, Synchronized Lanes, Check Lights, Shards, Scoreboard)
module.exports = `
class SimDirector {
  constructor(engine) {
    this.engine = engine;
    this.speed = 1.0;
    this.isPlaying = false;
    this.currentBeat = 0;
    this.totalBeats = 7;
    this.activeRunData = null;
    this.animationTimer = null;
    this.isReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  setSpeed(val) {
    this.speed = parseFloat(val) || 1.0;
  }

  resetCheckLights() {
    for (let i = 1; i <= 5; i++) {
      const bulb = document.getElementById('light' + i);
      if (bulb) {
        bulb.className = 'check-light-bulb';
      }
    }
  }

  setCheckLight(index, pass) {
    const bulb = document.getElementById('light' + index);
    if (bulb) {
      bulb.className = 'check-light-bulb ' + (pass ? 'pass' : 'fail');
    }
  }

  createCandidateCardElement(cand, requestingTenant, isIntegrityLayer = false, vRes = null) {
    const card = document.createElement('div');
    card.className = 'candidate-card-visual';
    card.id = 'cand-' + cand.chunk_id + '-' + (isIntegrityLayer ? 'il' : 'plain');

    const scorePct = Math.round(cand.score * 100);
    const tagsHtml = cand.metadata_allowed_tags.map(t => {
      const badgeClass = t === 'Factory A' ? 'badge-tenant-A' :
                         t === 'Factory B' ? 'badge-tenant-B' :
                         t === 'Factory C' ? 'badge-tenant-C' :
                         t === 'Factory D' ? 'badge-tenant-D' : 'badge-tenant-E';
      return \`<span class="badge \${badgeClass}" style="font-size: 0.68rem; padding: 1px 6px;">\${t}</span>\`;
    }).join(' ');

    let statusBadge = '';
    if (isIntegrityLayer && vRes) {
      if (vRes.allowed) {
        statusBadge = '<span class="badge badge-allow" style="font-size: 0.68rem;">✓ ALLOW</span>';
      } else {
        statusBadge = \`<span class="badge badge-deny" style="font-size: 0.68rem;" title="\${vRes.details}">✕ DENY (\${vRes.reason})</span>\`;
      }
    }

    card.innerHTML = \`
      <div class="candidate-header">
        <span class="doc-id-pill">\${cand.doc_id}</span>
        <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted);">sim: 0.\${scorePct}</span>
      </div>
      <div style="font-size: 0.72rem; color: var(--text-secondary); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
        \${cand.title}
      </div>
      <div class="candidate-tags">
        \${tagsHtml}
        <span class="badge" style="font-size: 0.65rem; padding: 1px 5px;">v\${cand.metadata_policy_version}</span>
        \${statusBadge}
      </div>
    \`;

    return card;
  }

  renderShatterEffect(element) {
    if (this.isReducedMotion) {
      element.style.opacity = '0.3';
      return;
    }
    const rect = element.getBoundingClientRect();
    const parent = element.parentElement;
    
    element.style.visibility = 'hidden';

    // Spawn 6-8 animated shards
    const shardContainer = document.createElement('div');
    shardContainer.style.position = 'relative';
    shardContainer.style.height = '40px';
    shardContainer.style.overflow = 'visible';

    for (let i = 0; i < 7; i++) {
      const shard = document.createElement('div');
      shard.style.position = 'absolute';
      shard.style.width = '12px';
      shard.style.height = '12px';
      shard.style.background = 'var(--deny)';
      shard.style.borderRadius = '2px';
      shard.style.boxShadow = '0 0 6px var(--deny)';
      const sx = (Math.random() * 80 - 40) + 'px';
      const sy = (Math.random() * 40 + 20) + 'px';
      const sr = (Math.random() * 180 - 90) + 'deg';
      shard.style.setProperty('--sx', sx);
      shard.style.setProperty('--sy', sy);
      shard.style.setProperty('--sr', sr);
      shard.style.animation = 'shardScatter 0.8s ease-out forwards';
      shardContainer.appendChild(shard);
    }
    parent.appendChild(shardContainer);

    setTimeout(() => {
      shardContainer.remove();
    }, 900);
  }

  async playBeat(beat, runData, requestingTenant) {
    this.currentBeat = beat;

    // Beat 0: Ask
    if (beat === 0) {
      this.resetCheckLights();
      document.getElementById('lane1Badge').className = 'badge badge-info';
      document.getElementById('lane1Badge').innerText = 'Query Routing';
      document.getElementById('lane2Badge').className = 'badge badge-info';
      document.getElementById('lane2Badge').innerText = 'Query Routing';
      document.getElementById('lane3Badge').className = 'badge badge-info';
      document.getElementById('lane3Badge').innerText = 'Query Routing';

      document.getElementById('lane1CandidatesList').innerHTML = '';
      document.getElementById('lane2CandidatesList').innerHTML = '';
      document.getElementById('lane3CandidatesList').innerHTML = '';
      document.getElementById('lane1Answer').innerText = 'Waiting for candidates...';
      document.getElementById('lane2Answer').innerText = 'Waiting for candidates...';
      document.getElementById('lane3Answer').innerText = 'Waiting for candidates...';
    }

    // Beat 1: Route
    else if (beat === 1) {
      // Trace packet on architecture SVG if visible
      window.dispatchEvent(new CustomEvent('sim:route', { detail: { tenant: requestingTenant } }));
    }

    // Beat 2: Retrieve Top-k Candidates
    else if (beat === 2) {
      // Lane 1
      const l1List = document.getElementById('lane1CandidatesList');
      l1List.innerHTML = '';
      runData.shared_filter.candidates.forEach(cand => {
        l1List.appendChild(this.createCandidateCardElement(cand, requestingTenant));
      });

      // Lane 2
      const l2List = document.getElementById('lane2CandidatesList');
      l2List.innerHTML = '';
      runData.separate_index.candidates.forEach(cand => {
        l2List.appendChild(this.createCandidateCardElement(cand, requestingTenant));
      });

      // Lane 3
      const l3List = document.getElementById('lane3CandidatesList');
      l3List.innerHTML = '';
      runData.integrity_layer.candidates.forEach((cand, idx) => {
        const vRes = runData.integrity_layer.trace[idx];
        l3List.appendChild(this.createCandidateCardElement(cand, requestingTenant, true, vRes));
      });
    }

    // Beat 3: Judge (Decision Engine Lights)
    else if (beat === 3) {
      // Animate check lights in Lane 3 based on trace
      if (runData.integrity_layer.trace.length > 0) {
        const firstTrace = runData.integrity_layer.trace[0];
        // Light up checks up to deciding check
        for (let i = 1; i <= firstTrace.check; i++) {
          const pass = (i < firstTrace.check) || (firstTrace.check === 5 && firstTrace.allowed);
          this.setCheckLight(i, pass);
        }
      }
    }

    // Beat 4: Outcome (ALLOW to tray, DENY shatters)
    else if (beat === 4) {
      // Lane 3 deny cards shatter
      const l3Cards = document.querySelectorAll('#lane3CandidatesList .candidate-card-visual');
      runData.integrity_layer.trace.forEach((vRes, idx) => {
        if (!vRes.allowed && l3Cards[idx]) {
          this.renderShatterEffect(l3Cards[idx]);
        }
      });
      // Update quarantine counter
      document.getElementById('quarantineCount').innerText = this.engine.quarantine.length;
    }

    // Beat 5: Synthesize (LLM output with blur and canary highlights)
    else if (beat === 5) {
      // Format LLM Stub output
      const formatLlmOutput = (released, leaks) => {
        if (released.length === 0) {
          return '<span style="color: var(--text-muted);">No verified candidate context released. Response synthesis aborted.</span>';
        }
        let out = '';
        released.forEach(chunk => {
          let chunkText = chunk.text;
          const isLeak = leaks.some(l => l.canary === chunk.canary);
          if (isLeak) {
            chunkText = chunkText.replace(chunk.canary, \`<span class="canary-token leak">⚠ \${chunk.canary} [LEAK]</span>\`);
          } else {
            chunkText = chunkText.replace(chunk.canary, \`<span class="canary-token safe">\${chunk.canary}</span>\`);
          }
          out += '<div style="margin-bottom: 6px;">' + chunkText + '</div>';
        });
        return out;
      };

      const l1Html = formatLlmOutput(runData.shared_filter.released, runData.shared_filter.leaks);
      const l2Html = formatLlmOutput(runData.separate_index.released, runData.separate_index.leaks);
      const l3Html = formatLlmOutput(runData.integrity_layer.released, runData.integrity_layer.leaks);

      document.getElementById('lane1Answer').innerHTML = l1Html;
      document.getElementById('lane2Answer').innerHTML = l2Html;
      document.getElementById('lane3Answer').innerHTML = l3Html;

      // Update lane badges
      if (runData.shared_filter.leaks.length > 0) {
        document.getElementById('lane1Badge').className = 'badge badge-deny';
        document.getElementById('lane1Badge').innerText = '⚠ LEAK DETECTED';
      } else {
        document.getElementById('lane1Badge').className = 'badge badge-allow';
        document.getElementById('lane1Badge').innerText = '✓ Safe';
      }

      if (runData.separate_index.leaks.length > 0) {
        document.getElementById('lane2Badge').className = 'badge badge-deny';
        document.getElementById('lane2Badge').innerText = '⚠ LEAK DETECTED';
      } else {
        document.getElementById('lane2Badge').className = 'badge badge-allow';
        document.getElementById('lane2Badge').innerText = '✓ Safe';
      }

      if (runData.integrity_layer.leaks.length > 0) {
        document.getElementById('lane3Badge').className = 'badge badge-deny';
        document.getElementById('lane3Badge').innerText = '⚠ LEAK DETECTED';
      } else {
        document.getElementById('lane3Badge').className = 'badge badge-allow';
        document.getElementById('lane3Badge').innerText = '✓ Protected';
      }
    }

    // Beat 6: Return & Scoreboard Update
    else if (beat === 6) {
      document.getElementById('scoreLeakL1').innerText = runData.shared_filter.leaks.length;
      document.getElementById('scoreLeakL2').innerText = runData.separate_index.leaks.length;
      document.getElementById('scoreLeakL3').innerText = runData.integrity_layer.leaks.length;

      document.getElementById('scoreChunksL1').innerText = runData.shared_filter.released.length;
      document.getElementById('scoreChunksL2').innerText = runData.separate_index.released.length;
      document.getElementById('scoreChunksL3').innerText = runData.integrity_layer.released.length;

      document.getElementById('scoreDeniedL1').innerText = runData.shared_filter.wronglyDenied;
      document.getElementById('scoreDeniedL2').innerText = runData.separate_index.wronglyDenied;
      document.getElementById('scoreDeniedL3').innerText = runData.integrity_layer.wronglyDenied;

      // Update Inspector tabs
      this.updateInspectorTabs(runData);
    }
  }

  updateInspectorTabs(runData) {
    // 1. Trace Tab
    const traceWrap = document.getElementById('tabContentTrace');
    if (runData && runData.integrity_layer.trace.length > 0) {
      let html = '<div style="display: flex; flex-direction: column; gap: 8px;">';
      runData.integrity_layer.trace.forEach((item, idx) => {
        const pass = item.allowed;
        html += \`
          <div style="background: rgba(10,20,32,0.8); border: 1px solid \${pass ? 'var(--border)' : 'var(--deny)'}; border-radius: 8px; padding: 10px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
              <strong style="font-family: var(--font-mono); color: var(--text-primary);">\${item.chunk.doc_id}</strong>
              <span class="badge \${pass ? 'badge-allow' : 'badge-deny'}">\${pass ? '✓ ALLOW' : '✕ DENY'}</span>
            </div>
            <div style="font-size: 0.72rem; color: var(--text-muted); margin-bottom: 6px;">
              Deciding Check: Check \${item.check} (\${item.reason}) · \${item.latency_ms ? item.latency_ms.toFixed(2) + 'ms' : '<1ms'}
            </div>
            <div style="font-size: 0.75rem; color: var(--text-secondary);">
              \${item.details}
            </div>
          </div>
        \`;
      });
      html += '</div>';
      traceWrap.innerHTML = html;
    }

    // 2. Diff Tab
    const diffWrap = document.getElementById('diffRowsList');
    if (diffWrap) {
      let diffHtml = '';
      this.engine.vectorDb.forEach(chunk => {
        const pol = this.engine.registry[chunk.doc_id];
        const isMismatch = (chunk.metadata_owner_tag !== pol.owner_tenant) ||
                           (chunk.metadata_policy_version < pol.version) ||
                           (chunk.metadata_allowed_tags.join(',') !== pol.allowed_tenants.join(','));
        diffHtml += \`
          <div style="background: rgba(10,20,32,0.7); border: 1px solid \${isMismatch ? 'var(--quarantine)' : 'var(--border)'}; border-radius: 6px; padding: 8px; font-size: 0.75rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
              <span style="font-family: var(--font-mono); font-weight: 600;">\${chunk.doc_id}</span>
              \${isMismatch ? '<span class="badge badge-quarantine">DIFF DETECTED</span>' : '<span style="color: var(--allow); font-size: 0.7rem;">✓ IN SYNC</span>'}
            </div>
            <div style="font-size: 0.7rem; color: var(--text-muted);">
              DB Tags: [\${chunk.metadata_allowed_tags.join(', ')}] v\${chunk.metadata_policy_version} (Owner: \${chunk.metadata_owner_tag})<br>
              Reg: [\${pol.allowed_tenants.join(', ')}] v\${pol.version} (Owner: \${pol.owner_tenant})
            </div>
          </div>
        \`;
      });
      diffWrap.innerHTML = diffHtml;
    }

    // 3. Quarantine Tab
    const qWrap = document.getElementById('quarantineList');
    if (qWrap) {
      if (this.engine.quarantine.length === 0) {
        qWrap.innerHTML = '<div style="color: var(--text-muted); font-size: 0.78rem; text-align: center; padding: 20px 0;">Quarantine Vault is empty.</div>';
      } else {
        let qHtml = '';
        this.engine.quarantine.forEach(q => {
          qHtml += \`
            <div style="background: rgba(245, 185, 66, 0.08); border: 1px solid var(--quarantine); border-radius: 8px; padding: 8px; font-size: 0.75rem;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <strong style="color: var(--quarantine);">\${q.id} · \${q.doc_id}</strong>
                <span style="font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-muted);">\${q.stage}</span>
              </div>
              <div style="color: var(--text-secondary); font-size: 0.72rem;">
                Reason: \${q.reason}<br>
                Time: \${new Date(q.ts).toLocaleTimeString()}
              </div>
            </div>
          \`;
        });
        qWrap.innerHTML = qHtml;
      }
    }

    // 4. Audit Tab
    const auditWrap = document.getElementById('auditLogList');
    if (auditWrap) {
      let aHtml = '';
      this.engine.audit.slice(0, 15).forEach(a => {
        const isAllow = a.decision === 'ALLOW';
        aHtml += \`
          <div style="background: rgba(10,20,32,0.8); border: 1px solid var(--border); border-radius: 6px; padding: 6px 8px; margin-bottom: 4px;">
            <div style="display: flex; justify-content: space-between; color: var(--text-muted); font-size: 0.68rem;">
              <span>#\${a.seq} · \${new Date(a.ts).toLocaleTimeString()}</span>
              <span style="color: \${isAllow ? 'var(--allow)' : 'var(--deny)'}; font-weight: 700;">\${a.decision}</span>
            </div>
            <div style="color: var(--text-primary); font-size: 0.72rem;">\${a.tenant} → \${a.doc_id} (\${a.reason})</div>
            <div style="color: var(--accent-bright); font-size: 0.65rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              hash: \${a.hash.slice(0, 16)}...
            </div>
          </div>
        \`;
      });
      auditWrap.innerHTML = aHtml;
    }
  }

  async runFullAnimation(runData, requestingTenant) {
    this.activeRunData = runData;
    this.isPlaying = true;
    document.getElementById('playPauseIcon').innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';

    const beatDurations = [400, 700, 900, 1200, 700, 900, 600];

    for (let b = 0; b < this.totalBeats; b++) {
      if (!this.isPlaying) break;
      await this.playBeat(b, runData, requestingTenant);
      const dur = (beatDurations[b] || 700) / this.speed;
      await new Promise(r => { this.animationTimer = setTimeout(r, dur); });
    }

    this.isPlaying = false;
    document.getElementById('playPauseIcon').innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
  }

  skip() {
    if (this.animationTimer) clearTimeout(this.animationTimer);
    this.isPlaying = false;
    if (this.activeRunData) {
      for (let b = 0; b < this.totalBeats; b++) {
        this.playBeat(b, this.activeRunData, 'Factory B');
      }
    }
    document.getElementById('playPauseIcon').innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
  }

  step() {
    if (this.animationTimer) clearTimeout(this.animationTimer);
    if (!this.activeRunData) return;
    this.currentBeat = (this.currentBeat + 1) % this.totalBeats;
    this.playBeat(this.currentBeat, this.activeRunData, 'Factory B');
  }

  togglePlayPause() {
    this.isPlaying = !this.isPlaying;
    if (!this.isPlaying) {
      if (this.animationTimer) clearTimeout(this.animationTimer);
      document.getElementById('playPauseIcon').innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
    } else {
      document.getElementById('playPauseIcon').innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
      if (this.activeRunData) {
        this.runFullAnimation(this.activeRunData, 'Factory B');
      }
    }
  }
}
`;

