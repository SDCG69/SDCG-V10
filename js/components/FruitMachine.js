// ── Couples Fruit Machine ────────────────────────────────────────────────────

const FM_STYLE_ID = "fruit-machine-styles";

function injectFMStyles() {
  if (document.getElementById(FM_STYLE_ID)) return;
  const s = document.createElement("style");
  s.id = FM_STYLE_ID;
  s.textContent = `
    /* ── Cabinet ── */
    .fm-cabinet {
      background:linear-gradient(160deg,#1c0814 0%,#110610 40%,#0a0308 100%);
      border-radius:20px;
      padding:18px 14px 14px;
      box-shadow:
        inset 0 1px 0 rgba(255,255,255,.05),
        0 8px 0 #080206,
        0 12px 40px rgba(0,0,0,0.7),
        0 0 0 1px rgba(201,68,106,.12);
      position:relative; overflow:hidden;
      margin-bottom:14px;
    }
    .fm-cabinet::before {
      content:'';
      position:absolute; inset:0;
      background:
        radial-gradient(ellipse at 50% 0%,rgba(201,68,106,.09) 0%,transparent 65%),
        linear-gradient(135deg,rgba(255,255,255,.03) 0%,transparent 50%);
      pointer-events:none;
    }
    .fm-cabinet-title {
      font-family:Georgia,serif;
      font-size:1.1rem;
      color:#c9446a;
      text-shadow:0 0 20px rgba(201,68,106,.5);
      letter-spacing:.06em;
      font-style:italic;
    }

    /* ── Reels row ── */
    .fm-reels-row {
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:8px;
      margin-bottom:10px;
    }
    .fm-reel-label {
      font-size:9px;
      letter-spacing:.12em;
      text-transform:uppercase;
      color:#4a2040;
      text-align:center;
      margin-bottom:5px;
      font-family:Georgia,serif;
    }
    .fm-reel-outer {
      border:2px solid #3a1030;
      border-radius:12px;
      overflow:hidden;
      position:relative;
      background:#080408;
      height:100px;
      box-shadow:
        inset 0 6px 18px rgba(0,0,0,0.9),
        inset 0 -6px 14px rgba(0,0,0,0.8),
        inset 2px 0 8px rgba(0,0,0,0.6),
        inset -2px 0 8px rgba(0,0,0,0.6),
        0 0 0 1px rgba(201,68,106,.06);
    }
    /* Top fade */
    .fm-reel-outer::before {
      content:'';
      position:absolute; left:0; right:0; top:0;
      height:38px;
      background:linear-gradient(to bottom,rgba(0,0,0,.95) 0%,rgba(0,0,0,.6) 40%,transparent 100%);
      z-index:4; pointer-events:none;
      border-radius:10px 10px 0 0;
    }
    /* Bottom fade */
    .fm-reel-outer::after {
      content:'';
      position:absolute; left:0; right:0; bottom:0;
      height:38px;
      background:linear-gradient(to top,rgba(0,0,0,.95) 0%,rgba(0,0,0,.6) 40%,transparent 100%);
      z-index:4; pointer-events:none;
      border-radius:0 0 10px 10px;
    }
    .fm-reel-window { position:absolute; inset:0; overflow:hidden; }
    .fm-reel-strip  { position:absolute; left:0; right:0; top:0; will-change:transform; }

    /* Scanlines */
    .fm-scanlines {
      position:absolute; inset:0;
      background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,.07) 3px,rgba(0,0,0,.07) 4px);
      pointer-events:none; z-index:6;
    }
    /* Gold selection frame */
    .fm-crosshair {
      position:absolute; top:50%; left:0; right:0;
      height:100px;
      transform:translateY(-50%);
      border-top:1.5px solid rgba(201,68,106,.65);
      border-bottom:1.5px solid rgba(201,68,106,.65);
      box-shadow:0 -1px 0 rgba(201,68,106,.18),0 1px 0 rgba(201,68,106,.18);
      pointer-events:none; z-index:5;
    }
    /* Centre glow */
    .fm-highlight {
      position:absolute; top:50%; left:0; right:0;
      height:100px;
      transform:translateY(-50%);
      background:linear-gradient(to bottom,transparent 0%,rgba(201,68,106,.04) 30%,rgba(201,68,106,.07) 50%,rgba(201,68,106,.04) 70%,transparent 100%);
      pointer-events:none; z-index:3;
    }

    /* Reel cells */
    .fm-cell {
      height:100px;
      display:flex; flex-direction:column;
      align-items:center; justify-content:center;
      gap:4px; padding:6px 4px;
      text-align:center; line-height:1.2;
    }
    .fm-cell-emoji { font-size:22px; line-height:1; }
    .fm-cell-text  { font-size:9px; font-weight:600; letter-spacing:.04em; color:#7a4060; font-family:Georgia,serif; }

    /* ── Result display ── */
    .fm-result {
      background:#050208;
      border:1.5px solid #2a1020;
      border-radius:10px;
      padding:13px 14px;
      min-height:52px;
      display:flex; align-items:center; justify-content:center;
      text-align:center;
      font-family:Georgia,serif;
      font-size:14px;
      color:#c9446a;
      letter-spacing:.03em;
      line-height:1.55;
      box-shadow:inset 0 2px 12px rgba(0,0,0,0.8),inset 0 0 30px rgba(0,0,0,0.5);
      position:relative; overflow:hidden;
    }
    .fm-result::before {
      content:'';
      position:absolute; inset:0;
      background:radial-gradient(ellipse at 50% 0%,rgba(201,68,106,.06) 0%,transparent 70%);
      pointer-events:none;
    }
    .fm-result.fm-idle { color:#3a1828; }
    @keyframes fmFlash {
      0%   { color:#fff; text-shadow:0 0 22px rgba(255,255,255,.7); }
      50%  { color:#f9a8d4; text-shadow:0 0 14px rgba(201,68,106,.5); }
      100% { color:#c9446a; text-shadow:none; }
    }
    .fm-result.fm-new { animation:fmFlash .8s ease-out forwards; }

    /* ── Spin button ── */
    .fm-spin-btn {
      flex:1;
      font-family:Georgia,serif;
      font-size:1.3rem;
      font-weight:bold;
      font-style:italic;
      letter-spacing:.08em;
      padding:13px 20px;
      border-radius:12px;
      border:2px solid #6a1030;
      background:linear-gradient(to bottom,#c9446a 0%,#a02850 45%,#8a1840 100%);
      color:#fff;
      cursor:pointer;
      box-shadow:inset 0 1px 0 rgba(255,255,255,.25),0 5px 0 #6a1030,0 8px 20px rgba(0,0,0,0.45);
      transition:transform .1s,box-shadow .1s;
      position:relative; overflow:hidden;
    }
    .fm-spin-btn::after {
      content:'';
      position:absolute; left:0; right:0; top:0;
      height:50%;
      background:linear-gradient(to bottom,rgba(255,255,255,.18) 0%,transparent 100%);
      pointer-events:none; border-radius:10px 10px 0 0;
    }
    .fm-spin-btn:hover:not(:disabled) {
      background:linear-gradient(to bottom,#d9547a 0%,#b03860 45%,#9a2850 100%);
    }
    .fm-spin-btn:active:not(:disabled) {
      transform:translateY(4px);
      box-shadow:inset 0 1px 0 rgba(255,255,255,.25),0 1px 0 #6a1030,0 2px 8px rgba(0,0,0,0.4);
    }
    .fm-spin-btn:disabled { opacity:.55; cursor:not-allowed; }

    /* ── History ── */
    .fm-history {
      background:#0a0408;
      border:1px solid #1a0818;
      border-radius:14px;
      overflow:hidden;
      margin-bottom:12px;
    }
    .fm-history-hdr {
      display:flex; align-items:center; justify-content:space-between;
      padding:8px 14px;
      border-bottom:1px solid #1a0818;
      background:#0e060c;
    }
    .fm-history-hdr span {
      font-size:9px; letter-spacing:.14em; text-transform:uppercase; color:#3a1828; font-family:Georgia,serif;
    }
    .fm-history-list { max-height:160px; overflow-y:auto; scrollbar-width:thin; scrollbar-color:#3a1828 #0a0408; }
    .fm-history-item {
      padding:8px 14px; font-size:12px; color:#6a3a50;
      border-bottom:1px solid #140610; display:flex; align-items:center; gap:8px;
    }
    .fm-history-item:last-child { border-bottom:none; }
    .fm-history-num { font-size:9px; color:#2a1020; min-width:20px; font-family:Georgia,serif; }
    .fm-history-empty { padding:14px; font-size:12px; color:#2a1020; text-align:center; font-family:Georgia,serif; font-style:italic; }

    /* ── Gender toggle (reuse dt-gender style) ── */
    .fm-gender { display:flex; border-radius:8px; overflow:hidden; border:1.5px solid rgba(255,255,255,0.1); flex-shrink:0; }
    .fm-gender button { padding:.38rem .5rem; border:none; background:#1a0814; color:#475569; font-size:.82rem; font-weight:800; cursor:pointer; transition:all .18s; font-family:inherit; }
    .fm-gender button.fm-gm { background:#7b3fa8; color:#fff; }
    .fm-gender button.fm-gf { background:#c9446a; color:#fff; }

    /* ── Intensity badge ── */
    .fm-intensity-row { display:flex; gap:6px; justify-content:center; margin-bottom:12px; flex-wrap:wrap; }
    .fm-int-btn { padding:6px 14px; border-radius:50px; border:2px solid #1a0814; background:#0e0810; color:#3a2030; font-family:Georgia,serif; font-size:12px; cursor:pointer; transition:all .18s; }
    .fm-int-btn.fm-int-sel { color:#fff; box-shadow:0 4px 14px rgba(0,0,0,0.4); }
    .fm-int-flirty.fm-int-sel  { background:linear-gradient(135deg,#7b3fa8,#9b5fc8); border-color:#7b3fa8; }
    .fm-int-spicy.fm-int-sel   { background:linear-gradient(135deg,#c9446a,#e9649a); border-color:#c9446a; }
    .fm-int-naughty.fm-int-sel { background:linear-gradient(135deg,#c9446a,#f43f5e); border-color:#f43f5e; }
  `;
  document.head.appendChild(s);
}

// ── Reel Data ─────────────────────────────────────────────────────────────────
// Three reels: GIVER | ACTION | BODY PART
// Actions and body parts are tagged by intensity and gender constraints
// who:"any"|"m"|"f"  — which gender of giver this action suits
// recv:"any"|"f"|"m" — which gender of receiver this body part suits

const FM_ACTIONS = {
  flirty: [
    { emoji:"💋", text:"Kiss",        who:"any", recv:"any" },
    { emoji:"🤗", text:"Caress",      who:"any", recv:"any" },
    { emoji:"💆", text:"Massage",     who:"any", recv:"any" },
    { emoji:"👄", text:"Nuzzle",      who:"any", recv:"any" },
    { emoji:"🫦", text:"Nibble",      who:"any", recv:"any" },
    { emoji:"✋", text:"Stroke",      who:"any", recv:"any" },
    { emoji:"🌬️", text:"Breathe on", who:"any", recv:"any" },
    { emoji:"👅", text:"Lick",        who:"any", recv:"any" },
    { emoji:"🫀", text:"Trace",       who:"any", recv:"any" },
    { emoji:"🤲", text:"Cup",         who:"any", recv:"any" },
  ],
  spicy: [
    { emoji:"💋", text:"Passionately kiss", who:"any", recv:"any" },
    { emoji:"👋", text:"Spank",             who:"any", recv:"any" },
    { emoji:"🫦", text:"Bite",              who:"any", recv:"any" },
    { emoji:"👅", text:"Slowly lick",       who:"any", recv:"any" },
    { emoji:"🤲", text:"Squeeze",           who:"any", recv:"any" },
    { emoji:"💧", text:"Pour ice water on", who:"any", recv:"any" },
    { emoji:"✋", text:"Firmly grab",       who:"any", recv:"any" },
    { emoji:"🌡️", text:"Tease",            who:"any", recv:"any" },
    { emoji:"🫀", text:"Slowly undress",    who:"any", recv:"any" },
    { emoji:"👁️", text:"Blindfold &amp; touch", who:"any", recv:"any" },
  ],
  naughty: [
    { emoji:"👅", text:"Perform oral on",   who:"any", recv:"any" },
    { emoji:"🤲", text:"Finger",            who:"any", recv:"f"   },
    { emoji:"🤲", text:"Stroke",            who:"any", recv:"m"   },
    { emoji:"💋", text:"Deep kiss &amp; grind against", who:"any", recv:"any" },
    { emoji:"🫦", text:"Suck &amp; bite",   who:"any", recv:"any" },
    { emoji:"👋", text:"Spank &amp; grab",  who:"any", recv:"any" },
    { emoji:"🌡️", text:"Edge &amp; tease", who:"any", recv:"any" },
    { emoji:"🎀", text:"Tie up &amp; kiss all over", who:"any", recv:"any" },
    { emoji:"😈", text:"Dominate",          who:"any", recv:"any" },
    { emoji:"🔥", text:"Pleasure",          who:"any", recv:"any" },
  ],
};

const FM_BODY_PARTS = {
  flirty: [
    { emoji:"👄", text:"Lips",        recv:"any" },
    { emoji:"👂", text:"Ear",         recv:"any" },
    { emoji:"🦒", text:"Neck",        recv:"any" },
    { emoji:"✋", text:"Hand",        recv:"any" },
    { emoji:"💪", text:"Shoulder",   recv:"any" },
    { emoji:"🎋", text:"Back",        recv:"any" },
    { emoji:"🦶", text:"Foot",        recv:"any" },
    { emoji:"🫀", text:"Collarbone", recv:"any" },
    { emoji:"👁️", text:"Forehead",   recv:"any" },
    { emoji:"💋", text:"Cheek",       recv:"any" },
  ],
  spicy: [
    { emoji:"🦒", text:"Neck",          recv:"any" },
    { emoji:"🎋", text:"Inner thigh",   recv:"any" },
    { emoji:"🍑", text:"Butt",          recv:"any" },
    { emoji:"🎀", text:"Chest",         recv:"any" },
    { emoji:"🫀", text:"Stomach",       recv:"any" },
    { emoji:"👄", text:"Lips",          recv:"any" },
    { emoji:"🦵", text:"Lower back",    recv:"any" },
    { emoji:"🍒", text:"Nipples",       recv:"any" },
    { emoji:"🎋", text:"Spine",         recv:"any" },
    { emoji:"💫", text:"Hips",          recv:"any" },
  ],
  naughty: [
    { emoji:"🍑", text:"Butt",          recv:"any" },
    { emoji:"🍒", text:"Nipples",       recv:"any" },
    { emoji:"🎋", text:"Inner thigh",   recv:"any" },
    { emoji:"💦", text:"Clit",          recv:"f"   },
    { emoji:"🍆", text:"Cock",          recv:"m"   },
    { emoji:"🎀", text:"Breasts",       recv:"f"   },
    { emoji:"💫", text:"Hips",          recv:"any" },
    { emoji:"🌶️", text:"Whole body",   recv:"any" },
    { emoji:"😈", text:"Pussy",         recv:"f"   },
    { emoji:"🔥", text:"Balls",         recv:"m"   },
  ],
};

// Duration labels
const FM_DURATIONS = [
  "for 10 seconds",
  "for 15 seconds",
  "for 20 seconds",
  "for 30 seconds",
  "for 45 seconds",
  "for 60 seconds",
  "until told to stop",
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const FM_CELL_H = 100;

function fmBuildStrip(items, reps=8) {
  let arr = [];
  while (arr.length < items.length * reps) arr = arr.concat(items);
  return arr;
}

function fmCellHTML(item) {
  return `<div class="fm-cell"><div class="fm-cell-emoji">${item.emoji}</div><div class="fm-cell-text">${item.text}</div></div>`;
}

function fmAnimateReel(stripEl, items, targetIdx, duration) {
  return new Promise(resolve => {
    const REPS = 8;
    const repeated = fmBuildStrip(items, REPS);
    stripEl.innerHTML = repeated.map(fmCellHTML).join("");
    stripEl.style.transition = "none";
    stripEl.style.transform = "translateY(0)";
    stripEl.getBoundingClientRect(); // force reflow
    const lastOccurrence = (REPS - 1) * items.length + targetIdx;
    const targetY = lastOccurrence * FM_CELL_H;
    function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }
    let startTime = null;
    function frame(ts) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      stripEl.style.transform = `translateY(${-easeOutQuart(progress) * targetY}px)`;
      if (progress < 1) requestAnimationFrame(frame);
      else { stripEl.style.transform = `translateY(${-targetY}px)`; resolve(); }
    }
    requestAnimationFrame(frame);
  });
}

// ── Setup Screen ──────────────────────────────────────────────────────────────

function FruitMachineSetup({ onStart }) {
  const [players, setPlayers] = useState([
    { name:"", gender:"m" },
    { name:"", gender:"f" },
  ]);

  function setName(i, v) {
    setPlayers(prev => { const p=[...prev]; p[i]={...p[i],name:v}; return p; });
  }
  function setGender(i, g) {
    setPlayers(prev => { const p=[...prev]; p[i]={...p[i],gender:g}; return p; });
  }
  function addPlayer() {
    if (players.length >= 6) return;
    setPlayers(prev => [...prev, { name:"", gender:"m" }]);
  }
  function removePlayer(i) {
    if (players.length <= 2) return;
    setPlayers(prev => prev.filter((_,idx)=>idx!==i));
  }

  const canStart = players.length >= 2;

  function handleStart() {
    const resolved = players.map((p,i) => ({
      name: p.name.trim() || `Player ${i+1}`,
      gender: p.gender,
    }));
    onStart(resolved);
  }

  return (
    <div style={{animation:"fadeUp .35s ease",maxWidth:"520px",width:"100%",display:"flex",flexDirection:"column",alignItems:"center",padding:"0 0 32px"}}>
      <div style={{textAlign:"center",marginBottom:"22px"}}>
        <div style={{fontSize:"2rem",marginBottom:"6px"}}>🎰</div>
        <p style={{color:"#6a3a50",fontSize:"13px",fontFamily:"Georgia,serif",fontStyle:"italic",lineHeight:1.6}}>
          Spin to reveal who does what — to whom.<br/>No excuses accepted.
        </p>
      </div>

      <div style={{background:"linear-gradient(135deg,#1c0814,#0d0d0d)",border:"1px solid #2a1a28",borderRadius:"20px",padding:"20px 16px",width:"100%",boxShadow:"0 20px 50px rgba(0,0,0,0.5)",marginBottom:"16px"}}>
        <div style={{fontSize:"10px",letterSpacing:"0.16em",textTransform:"uppercase",color:"#3a2030",marginBottom:"12px"}}>Players</div>
        <div style={{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"14px"}}>
          {players.map((p,i) => {
            const col = i%2===0?"#7b3fa8":"#c9446a";
            return (
              <div key={i} style={{display:"flex",alignItems:"center",gap:"8px"}}>
                <div style={{width:"26px",height:"26px",borderRadius:"50%",background:col,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",fontWeight:"bold",color:"#fff",flexShrink:0,border:"2px solid rgba(255,255,255,0.2)"}}>{i+1}</div>
                <input type="text" placeholder={`Player ${i+1}`} maxLength={16} value={p.name}
                  onChange={e=>setName(i,e.target.value)}
                  style={{flex:1,background:"#0e0810",border:"1.5px solid #2a1a28",borderRadius:"10px",color:"#e8cdd8",fontFamily:"inherit",fontSize:"14px",padding:"7px 11px",outline:"none"}}/>
                <div className="fm-gender">
                  <button className={p.gender==="m"?"fm-gm":""} onClick={()=>setGender(i,"m")}>♂</button>
                  <button className={p.gender==="f"?"fm-gf":""} onClick={()=>setGender(i,"f")}>♀</button>
                </div>
                {players.length>2&&(
                  <button onClick={()=>removePlayer(i)}
                    style={{background:"none",border:"none",color:"#3a1828",fontSize:"16px",cursor:"pointer",padding:"0 2px",flexShrink:0}}>×</button>
                )}
              </div>
            );
          })}
        </div>
        {players.length < 6 && (
          <button onClick={addPlayer}
            style={{width:"100%",background:"#0e0810",border:"1.5px dashed #2a1a28",borderRadius:"10px",color:"#3a2030",fontFamily:"Georgia,serif",fontSize:"13px",padding:"8px",cursor:"pointer",marginBottom:"4px"}}>
            + Add Player
          </button>
        )}
      </div>

      <button onClick={handleStart} disabled={!canStart}
        style={{width:"100%",background:"linear-gradient(135deg,#7b3fa8,#c9446a)",border:"none",borderRadius:"50px",color:"#fff",fontFamily:"Georgia,serif",fontSize:"1.1rem",fontWeight:"bold",padding:"15px",cursor:"pointer",boxShadow:"0 6px 24px rgba(201,68,106,0.4)",letterSpacing:"0.08em",opacity:canStart?1:0.5}}>
        🎰 Start the Machine
      </button>
    </div>
  );
}

// ── Game Screen ───────────────────────────────────────────────────────────────

function FruitMachineGame({ players, onReset }) {
  const [intensity, setIntensity] = useState("flirty");
  const [spinning,  setSpinning]  = useState(false);
  const [history,   setHistory]   = useState([]);
  const [resultText, setResultText] = useState("");
  const [resultClass, setResultClass] = useState("fm-idle");

  const strip0Ref = useRef(null); // GIVER
  const strip1Ref = useRef(null); // ACTION
  const strip2Ref = useRef(null); // BODY PART
  const strip3Ref = useRef(null); // RECEIVER

  // Init reel strips on mount
  useEffect(() => {
    const giverItems = players.map((p,i) => ({ emoji: p.gender==="f"?"👩":"👨", text:p.name }));
    const actions    = FM_ACTIONS[intensity];
    const bodyParts  = FM_BODY_PARTS[intensity];
    [strip0Ref, strip1Ref, strip2Ref, strip3Ref].forEach((ref, ri) => {
      if (!ref.current) return;
      const items = ri===0||ri===3 ? giverItems : ri===1 ? actions : bodyParts;
      ref.current.innerHTML = fmBuildStrip(items).map(fmCellHTML).join("");
      ref.current.style.transform = "translateY(0)";
    });
  }, [intensity]);

  async function doSpin() {
    if (spinning) return;
    setSpinning(true);
    setResultClass("fm-idle");
    setResultText("— — — —");

    const actions   = FM_ACTIONS[intensity];
    const bodyParts = FM_BODY_PARTS[intensity];

    // Pick giver
    const giverIdx = Math.floor(Math.random() * players.length);
    const giver    = players[giverIdx];

    // Pick receiver — different from giver
    let receiverIdx = Math.floor(Math.random() * players.length);
    if (players.length > 1) while (receiverIdx === giverIdx) receiverIdx = Math.floor(Math.random() * players.length);
    const receiver = players[receiverIdx];

    // Filter actions valid for this giver gender
    const validActions = actions.filter(a => a.who==="any" || a.who===giver.gender);
    const actionIdx = Math.floor(Math.random() * validActions.length);
    const action = validActions[actionIdx];

    // Filter body parts valid for this receiver gender
    const validParts = bodyParts.filter(b => b.recv==="any" || b.recv===receiver.gender);
    const partIdx = Math.floor(Math.random() * validParts.length);
    const part = validParts[partIdx];

    // Duration
    const duration = FM_DURATIONS[Math.floor(Math.random() * FM_DURATIONS.length)];

    // Giver/receiver items for reels
    const giverItems    = players.map((p,i) => ({ emoji:p.gender==="f"?"👩":"👨", text:p.name }));
    const receiverItems = players.map((p,i) => ({ emoji:p.gender==="f"?"👩":"👨", text:p.name }));

    // Animate all four reels with staggered stops
    await Promise.all([
      fmAnimateReel(strip0Ref.current, giverItems,    giverIdx,   1600),
      fmAnimateReel(strip1Ref.current, validActions,  actionIdx,  2200),
      fmAnimateReel(strip2Ref.current, validParts,    partIdx,    2800),
      fmAnimateReel(strip3Ref.current, receiverItems, receiverIdx,3400),
    ]);

    // Build summary
    const sentence = `${giver.name} — ${action.text} ${receiver.name}'s ${part.text} ${duration}`;
    setResultText(sentence);
    setResultClass("fm-new");
    setHistory(prev => [{ id:Date.now(), text:sentence }, ...prev].slice(0, 30));
    setSpinning(false);
  }

  const intensities = [
    { key:"flirty",  label:"💜 Flirty",  cls:"fm-int-flirty"  },
    { key:"spicy",   label:"💋 Spicy",   cls:"fm-int-spicy"   },
    { key:"naughty", label:"🔥 Naughty", cls:"fm-int-naughty" },
  ];

  return (
    <div style={{animation:"fadeUp .35s ease",maxWidth:"520px",width:"100%"}}>

      {/* Intensity selector */}
      <div style={{marginBottom:"12px"}}>
        <div style={{fontSize:"10px",letterSpacing:"0.16em",textTransform:"uppercase",color:"#3a2030",marginBottom:"8px",textAlign:"center"}}>Intensity Level</div>
        <div className="fm-intensity-row">
          {intensities.map(({key,label,cls}) => (
            <button key={key} className={`fm-int-btn ${cls}${intensity===key?" fm-int-sel":""}`}
              onClick={()=>setIntensity(key)}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Cabinet */}
      <div className="fm-cabinet">
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"12px"}}>
          <span className="fm-cabinet-title">🎰 Fruit Machine</span>
          <span style={{fontSize:"10px",color:"#3a1828",letterSpacing:"0.1em",fontFamily:"Georgia,serif",textTransform:"uppercase"}}>
            {players.map(p=>p.name).join(" · ")}
          </span>
        </div>

        {/* Reels */}
        <div className="fm-reels-row">
          {[
            { label:"Giver",    ref:strip0Ref },
            { label:"Does",     ref:strip1Ref },
            { label:"To Their", ref:strip2Ref },
            { label:"To",       ref:strip3Ref },
          ].map(({label, ref}) => (
            <div key={label}>
              <div className="fm-reel-label">{label}</div>
              <div className="fm-reel-outer">
                <div className="fm-reel-window"><div className="fm-reel-strip" ref={ref}/></div>
                <div className="fm-highlight"/>
                <div className="fm-crosshair"/>
                <div className="fm-scanlines"/>
              </div>
            </div>
          ))}
        </div>

        {/* Result */}
        <div className={`fm-result ${resultClass}`}>
          {resultText || <span style={{color:"#2a1020",fontStyle:"italic"}}>Spin to reveal your fate…</span>}
        </div>
      </div>

      {/* Controls */}
      <div style={{display:"flex",gap:"10px",marginBottom:"14px"}}>
        <button className="fm-spin-btn" disabled={spinning} onClick={doSpin}>
          {spinning ? "✦ Spinning… ✦" : "✦ SPIN ✦"}
        </button>
        <button onClick={onReset}
          style={{fontFamily:"inherit",fontSize:"13px",padding:"13px 16px",borderRadius:"12px",border:"1px solid #2a1a28",background:"#0e0810",color:"#6a3a50",cursor:"pointer",whiteSpace:"nowrap"}}>
          ↩ Players
        </button>
      </div>

      {/* History */}
      <div className="fm-history">
        <div className="fm-history-hdr">
          <span>Spin History</span>
          <button onClick={()=>setHistory([])}
            style={{background:"none",border:"1px solid #2a1020",borderRadius:"6px",color:"#2a1020",fontSize:"9px",letterSpacing:"0.1em",textTransform:"uppercase",padding:"3px 8px",cursor:"pointer",fontFamily:"Georgia,serif"}}>
            Clear
          </button>
        </div>
        <div className="fm-history-list">
          {history.length === 0
            ? <div className="fm-history-empty">No spins yet — pull the lever!</div>
            : history.map((h,i) => (
                <div key={h.id} className="fm-history-item">
                  <span className="fm-history-num">#{history.length - i}</span>
                  <span>{h.text}</span>
                </div>
              ))
          }
        </div>
      </div>
    </div>
  );
}

// ── Top-level screen ──────────────────────────────────────────────────────────

function FruitMachineScreen({ onBack }) {
  injectFMStyles();
  const [players, setPlayers] = useState(null);

  return (
    <div style={{animation:"fadeUp .35s ease",maxWidth:"560px",width:"100%",position:"relative"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"18px"}}>
        <button onClick={players ? ()=>setPlayers(null) : onBack}
          style={{background:"#141414",border:"1px solid #222",color:"#888",borderRadius:"8px",padding:"7px 13px",cursor:"pointer",fontFamily:"inherit",fontSize:"13px"}}>
          ← Back
        </button>
        <div style={{textAlign:"center"}}>
          <div style={{color:"#555",fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",marginBottom:"2px"}}>Hot Extras</div>
          <h2 style={{color:"#e8cdd8",fontSize:"1.3rem",margin:0,fontFamily:"Georgia,serif",fontWeight:"normal"}}>
            Couples <span style={{color:"#c9446a",fontStyle:"italic"}}>Fruit Machine</span>
          </h2>
        </div>
        <div style={{width:"72px"}}/>
      </div>

      {!players
        ? <FruitMachineSetup onStart={p=>setPlayers(p)}/>
        : <FruitMachineGame  players={players} onReset={()=>setPlayers(null)}/>
      }
    </div>
  );
}
