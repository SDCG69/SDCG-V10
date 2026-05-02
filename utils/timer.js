// ── Timer helpers ────────────────────────────────────────────────────────────
const RING_R = 38, RING_C = 2 * Math.PI * RING_R;

function parseTimer(text) {
  const m = text.match(/(\d+)\s*(?:full\s+)?(minutes?|mins?|seconds?|secs?)/i);
  if (!m) return null;
  const n = parseInt(m[1], 10);
  return /min/i.test(m[2]) ? n * 60 : n;
}

function fmtTime(s) {
  return s >= 60 ? `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}` : `${s}s`;
}

function playChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, i) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      const t = ctx.currentTime + i * 0.28;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.45, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);
      osc.start(t);
      osc.stop(t + 0.72);
    });
  } catch(e) { /* audio not available */ }
}
