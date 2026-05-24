// ══════════════════════════════════════════════════════════════════════════════
// NAUGHTY DICE — README & EDIT GUIDE
// ══════════════════════════════════════════════════════════════════════════════
//
// The dice work in three layers:
//
//   1. BODY_PARTS   — the pool of body parts shown on the purple die.
//   2. ACTIONS      — the pool of actions shown on the crimson die.
//   3. PAIRINGS     — the intelligence layer: maps each body-part key to the
//                     subset of action keys that make sense for that body part.
//
// ── BODY_PARTS ────────────────────────────────────────────────────────────────
//
//   Each entry is an object:
//     { key: "unique_id",  label: "Display Name",  emoji: "🔥" }
//
//   key   : a short internal identifier (no spaces). Used in PAIRINGS below.
//   label : what appears on the die face and in the result summary.
//   emoji : shown on the die face alongside the label.
//
//   Example — adding a new body part:
//     { key: "ears",  label: "Ears",  emoji: "👂" }
//
// ── ACTIONS ───────────────────────────────────────────────────────────────────
//
//   Each entry is an object:
//     { key: "unique_id",  label: "Display Name",  emoji: "💋" }
//
//   key   : a short internal identifier (no spaces). Used in PAIRINGS below.
//   label : what appears on the die face and in the result summary.
//   emoji : shown on the die face alongside the label.
//
//   Example — adding a new action:
//     { key: "nibble",  label: "Nibble",  emoji: "😬" }
//
// ── PAIRINGS ──────────────────────────────────────────────────────────────────
//
//   This object maps every body-part key to an array of valid action keys.
//   When the body-part die lands, ONLY the listed actions can be chosen for
//   the action die result — the system picks randomly from that subset.
//
//   Format:
//     bodyPartKey: [ "actionKey1", "actionKey2", ... ]
//
//   Rules:
//   • Every key listed here MUST exist in BODY_PARTS (body parts) or
//     ACTIONS (actions) — mismatches are silently ignored.
//   • If a body-part key has NO entry in PAIRINGS, or the list is empty,
//     the system falls back to the full ACTIONS pool (failsafe).
//   • You can list as few or as many actions as you like per body part.
//
//   Example:
//     ears: [ "kiss", "lick", "nibble" ]
//     // → when "Ears" rolls, the action will be Kiss, Lick, or Nibble.
//
//   Adding a new body part + pairing in one step:
//     1. Add { key:"ears", label:"Ears", emoji:"👂" } to BODY_PARTS.
//     2. Add  ears: ["kiss","lick","nibble"]  to PAIRINGS.
//     Done — the dice will use it automatically.
//
// ══════════════════════════════════════════════════════════════════════════════

// ── Body Parts ────────────────────────────────────────────────────────────────

const BODY_PARTS = [
  { key: "face",     label: "Face",         emoji: "😘" },
  { key: "nipples",  label: "Nipples",      emoji: "🍒" },
  { key: "butt",     label: "Butt",         emoji: "🍑" },
  { key: "ass",      label: "Ass",          emoji: "🔥" },
  { key: "genitals", label: "Dick/Pussy",   emoji: "🌶️" },
  { key: "toes",     label: "Toes",         emoji: "🦶" },
  { key: "neck",     label: "Neck",         emoji: "🦢" },
  { key: "breasts",  label: "Breasts/Pecs", emoji: "💪" },
  { key: "thighs",   label: "Thighs",       emoji: "🦵" },
  { key: "mouth",    label: "Mouth",        emoji: "👄" },
];

// ── Actions ───────────────────────────────────────────────────────────────────

const ACTIONS = [
  { key: "massage",  label: "Massage",    emoji: "💆" },
  { key: "kiss",     label: "Kiss",       emoji: "💋" },
  { key: "lick",     label: "Lick",       emoji: "👅" },
  { key: "suck",     label: "Suck",       emoji: "😮" },
  { key: "stroke",   label: "Stroke",     emoji: "✋" },
  { key: "fondle",   label: "Fondle",     emoji: "🤲" },
  { key: "tickle",   label: "Tickle",     emoji: "🤣" },
  { key: "spank",    label: "Spank/Slap", emoji: "👋" },
  { key: "squeeze",  label: "Squeeze",    emoji: "🫳" },
];

// ── Pairings ──────────────────────────────────────────────────────────────────
// Maps each body-part key → array of valid action keys for that body part.
// See README at top of file for full editing guide.

const PAIRINGS = {
  face:     [ "kiss", "lick", "stroke", "fondle" ],
  nipples:  [ "kiss", "lick", "suck", "fondle", "squeeze", "tickle" ],
  butt:     [ "massage", "spank", "squeeze", "fondle", "kiss" ],
  ass:      [ "kiss", "lick", "fondle", "spank", "squeeze" ],
  genitals: [ "stroke", "fondle", "lick", "suck", "squeeze", "tickle" ],
  toes:     [ "massage", "lick", "suck", "kiss", "tickle", "stroke" ],
  neck:     [ "kiss", "lick", "stroke", "tickle", "fondle" ],
  breasts:  [ "massage", "kiss", "lick", "fondle", "squeeze", "suck" ],
  thighs:   [ "massage", "stroke", "squeeze", "kiss", "tickle", "fondle" ],
  mouth:    [ "kiss", "lick", "suck", "fondle", "stroke" ],
};

// ── Lookup maps (built at load time — do not edit) ────────────────────────────

const ACTION_MAP = Object.fromEntries(ACTIONS.map(a => [a.key, a]));

function pickActionForBodyPart(bpKey) {
  const validKeys = (PAIRINGS[bpKey] || []).filter(k => ACTION_MAP[k]);
  const pool      = validKeys.length ? validKeys : ACTIONS.map(a => a.key); // failsafe
  const chosen    = pool[Math.floor(Math.random() * pool.length)];
  return ACTION_MAP[chosen];
}

// ── Supporting constants ──────────────────────────────────────────────────────

const FACE_NAMES = ["front","back","right","left","top","bottom"];
const ND_STYLE_ID = "naughty-dice-styles";

function injectNDStyles() {
  if (document.getElementById(ND_STYLE_ID)) return;
  const s = document.createElement("style");
  s.id = ND_STYLE_ID;
  s.textContent = `
    @keyframes ndFloat1 {
      0%,100% { transform: translateY(0px) rotateX(-20deg) rotateY(30deg); }
      50%      { transform: translateY(-8px) rotateX(-22deg) rotateY(32deg); }
    }
    @keyframes ndFloat2 {
      0%,100% { transform: translateY(0px) rotateX(15deg) rotateY(-20deg); }
      50%      { transform: translateY(-6px) rotateX(17deg) rotateY(-22deg); }
    }
    @keyframes ndRoll1 {
      0%   { transform: rotateX(-20deg) rotateY(30deg); }
      15%  { transform: rotateX(360deg) rotateY(180deg) rotateZ(90deg); }
      30%  { transform: rotateX(720deg) rotateY(540deg) rotateZ(45deg); }
      50%  { transform: rotateX(1080deg) rotateY(900deg) rotateZ(180deg); }
      70%  { transform: rotateX(1440deg) rotateY(1260deg) rotateZ(270deg); }
      85%  { transform: rotateX(1620deg) rotateY(1440deg) rotateZ(315deg); }
      100% { transform: rotateX(0deg) rotateY(0deg); }
    }
    @keyframes ndRoll2 {
      0%   { transform: rotateX(15deg) rotateY(-20deg); }
      15%  { transform: rotateX(-270deg) rotateY(-180deg) rotateZ(-120deg); }
      30%  { transform: rotateX(-630deg) rotateY(-540deg) rotateZ(-60deg); }
      50%  { transform: rotateX(-990deg) rotateY(-900deg) rotateZ(-200deg); }
      70%  { transform: rotateX(-1350deg) rotateY(-1260deg) rotateZ(-300deg); }
      85%  { transform: rotateX(-1530deg) rotateY(-1440deg) rotateZ(-350deg); }
      100% { transform: rotateX(0deg) rotateY(0deg); }
    }
    @keyframes ndGlowPulse {
      0%,100% { opacity:0.3; transform: translateX(-50%) scale(1); }
      50%      { opacity:0.7; transform: translateX(-50%) scale(1.3); }
    }
    @keyframes ndRevealPop {
      0%   { transform: scale(0.8); opacity: 0; }
      60%  { transform: scale(1.08); }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes ndSparkFly {
      0%   { transform: translate(0,0) scale(1); opacity:1; }
      100% { transform: translate(var(--ndx), var(--ndy)) scale(0); opacity:0; }
    }
    @keyframes ndSettle {
      0%   { transform: rotateX(-8deg) rotateY(8deg); }
      100% { transform: rotateX(0deg) rotateY(0deg); }
    }
    .nd-cube-float1 { animation: ndFloat1 3s ease-in-out infinite; }
    .nd-cube-float2 { animation: ndFloat2 3.5s ease-in-out infinite; }
    .nd-glow-pulse  { animation: ndGlowPulse 3s ease-in-out infinite; }
    .nd-cube-roll1  { animation: ndRoll1 3s cubic-bezier(0.25,0.46,0.45,0.94) forwards; }
    .nd-cube-roll2  { animation: ndRoll2 3s cubic-bezier(0.25,0.46,0.45,0.94) 0.1s forwards; }
    .nd-cube-settle { animation: ndSettle 0.35s cubic-bezier(0.22,1,0.36,1) forwards; }
    .nd-result-pop  { animation: ndRevealPop 0.4s cubic-bezier(0.175,0.885,0.32,1.275) forwards; }
    .nd-result-pop2 { animation: ndRevealPop 0.4s cubic-bezier(0.175,0.885,0.32,1.275) 0.15s both; }
  `;
  document.head.appendChild(s);
}

// ── NDCube component ──────────────────────────────────────────────────────────

function NDCube({ dieRef, colorClass, faceRefs }) {
  const faceBase = {
    position:"absolute", width:"110px", height:"110px",
    borderRadius:"16px", display:"flex", alignItems:"center",
    justifyContent:"center", flexDirection:"column",
    backfaceVisibility:"visible",
    border:"1px solid rgba(255,255,255,0.08)",
  };
  const bpBg   = "linear-gradient(145deg,#3a2060,#1e1040)";
  const acBg   = "linear-gradient(145deg,#601828,#2a0a10)";
  const bg     = colorClass === "bp" ? bpBg : acBg;
  const shadow = "inset 0 1px 0 rgba(255,255,255,0.12),inset 0 -1px 0 rgba(0,0,0,0.4)";

  const faceTransforms = [
    "translateZ(55px)",
    "rotateY(180deg) translateZ(55px)",
    "rotateY(90deg) translateZ(55px)",
    "rotateY(-90deg) translateZ(55px)",
    "rotateX(90deg) translateZ(55px)",
    "rotateX(-90deg) translateZ(55px)",
  ];

  return (
    <div ref={dieRef} style={{
      width:"110px", height:"110px",
      position:"relative", transformStyle:"preserve-3d",
      transform: colorClass==="bp"
        ? "rotateX(-20deg) rotateY(30deg)"
        : "rotateX(15deg) rotateY(-20deg)",
    }}>
      {FACE_NAMES.map((name, i) => (
        <div key={name} ref={el => faceRefs.current[i] = el} style={{
          ...faceBase,
          background: bg, boxShadow: shadow,
          transform: faceTransforms[i],
        }}>
          <span style={{fontSize:"2rem", lineHeight:1}}></span>
          <span style={{fontSize:"0.55rem", textTransform:"uppercase", letterSpacing:"0.12em",
            color:"rgba(255,255,255,0.6)", marginTop:"4px", fontFamily:"inherit", fontWeight:600}}></span>
        </div>
      ))}
    </div>
  );
}

// ── Main screen component ─────────────────────────────────────────────────────

function NaughtyDiceScreen({ onBack }) {
  const [phase,    setPhase]    = useState("idle");
  const [result,   setResult]   = useState(null);
  const [sparkKey, setSparkKey] = useState(0);

  const die1Ref  = useRef(null);
  const die2Ref  = useRef(null);
  const bp1Refs  = useRef([]);
  const bp2Refs  = useRef([]);
  const sparkRef = useRef(null);

  useEffect(() => {
    injectNDStyles();
    window.scrollTo(0,0);
    populateFaces(false);
    if (die1Ref.current) die1Ref.current.classList.add("nd-cube-float1");
    if (die2Ref.current) die2Ref.current.classList.add("nd-cube-float2");
  }, []);

  function populateFaces(hideNonFront) {
    bp1Refs.current.forEach((el, i) => {
      if (!el) return;
      const d = BODY_PARTS[i % BODY_PARTS.length];
      el.children[0].textContent = d.emoji;
      el.children[1].textContent = d.label;
      el.style.visibility = (hideNonFront && i !== 0) ? "hidden" : "";
    });
    bp2Refs.current.forEach((el, i) => {
      if (!el) return;
      const d = ACTIONS[i % ACTIONS.length];
      el.children[0].textContent = d.emoji;
      el.children[1].textContent = d.label;
      el.style.visibility = (hideNonFront && i !== 0) ? "hidden" : "";
    });
  }

  function handleRoll() {
    if (phase === "rolling") return;
    setPhase("rolling");
    setResult(null);

    // Pick body part first, then pick an action valid for that body part
    const bpIdx = Math.floor(Math.random() * BODY_PARTS.length);
    const bp    = BODY_PARTS[bpIdx];
    const ac    = pickActionForBodyPart(bp.key);

    populateFaces(false);

    const d1 = die1Ref.current;
    const d2 = die2Ref.current;
    if (!d1 || !d2) return;

    ["nd-cube-float1","nd-cube-float2","nd-cube-roll1","nd-cube-roll2","nd-cube-settle"].forEach(c => {
      d1.classList.remove(c); d2.classList.remove(c);
    });
    d1.style.transition = "none";
    d2.style.transition = "none";
    d1.style.transform  = "rotateX(-20deg) rotateY(30deg)";
    d2.style.transform  = "rotateX(15deg) rotateY(-20deg)";
    void d1.offsetHeight;

    d1.classList.add("nd-cube-roll1");
    d2.classList.add("nd-cube-roll2");

    launchSparkles(false);

    setTimeout(() => {
      d1.classList.remove("nd-cube-roll1");
      d2.classList.remove("nd-cube-roll2");
      d1.style.transition = "none";
      d2.style.transition = "none";
      d1.style.transform  = "rotateX(0deg) rotateY(0deg)";
      d2.style.transform  = "rotateX(0deg) rotateY(0deg)";

      // Write winners onto front faces
      if (bp1Refs.current[0]) {
        bp1Refs.current[0].children[0].textContent = bp.emoji;
        bp1Refs.current[0].children[1].textContent = bp.label;
        bp1Refs.current[0].style.visibility = "";
      }
      if (bp2Refs.current[0]) {
        bp2Refs.current[0].children[0].textContent = ac.emoji;
        bp2Refs.current[0].children[1].textContent = ac.label;
        bp2Refs.current[0].style.visibility = "";
      }
      bp1Refs.current.forEach((el, i) => { if (el && i !== 0) el.style.visibility = "hidden"; });
      bp2Refs.current.forEach((el, i) => { if (el && i !== 0) el.style.visibility = "hidden"; });

      void d1.offsetHeight;
      d1.classList.add("nd-cube-settle");
      d2.classList.add("nd-cube-settle");

      setTimeout(() => {
        setResult({ bp, ac });
        setPhase("result");
        launchSparkles(true);
      }, 350);

    }, 3100);
  }

  function launchSparkles(burst) {
    const container = sparkRef.current;
    if (!container) return;
    const colors = ["#c9446a","#7b3fa8","#d4a847","#e87a99","#a060d0","#fff"];
    const count  = burst ? 30 : 20;
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const sp    = document.createElement("div");
        const x     = burst ? 50 : 20 + Math.random() * 60;
        const y     = burst ? 55 : 20 + Math.random() * 60;
        const angle = burst ? (i / count) * Math.PI * 2 : 0;
        const dist  = burst ? 80 + Math.random() * 120 : 0;
        const dx    = burst ? Math.cos(angle) * dist : (Math.random()-0.5)*200;
        const dy    = burst ? Math.sin(angle) * dist : (Math.random()-0.5)*200;
        sp.style.cssText = [
          "position:absolute",
          `left:${x}%`, `top:${y}%`,
          `background:${colors[Math.floor(Math.random()*colors.length)]}`,
          `width:${2+Math.random()*5}px`, `height:${2+Math.random()*5}px`,
          "border-radius:50%", "pointer-events:none",
          `--ndx:${dx}px`, `--ndy:${dy}px`,
          `animation:ndSparkFly ${0.5+Math.random()*1.5}s ease-out ${burst?0:Math.random()*2}s forwards`,
        ].join(";");
        container.appendChild(sp);
        setTimeout(() => sp.remove(), 3000);
      }, i * (burst ? 0 : 80));
    }
  }

  const rolling = phase === "rolling";

  return (
    <div style={{ animation:"fadeUp .35s ease", maxWidth:"540px", width:"100%", position:"relative" }}>

      <div ref={sparkRef} style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:999, overflow:"hidden" }} />

      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"20px" }}>
        <button onClick={onBack} style={{
          background:"#141414", border:"1px solid #222", color:"#888",
          borderRadius:"8px", padding:"7px 13px", cursor:"pointer",
          fontFamily:"inherit", fontSize:"13px"
        }}>← Back</button>
        <div style={{ textAlign:"center" }}>
          <div style={{ color:"#555", fontSize:"11px", letterSpacing:"2px", textTransform:"uppercase", marginBottom:"2px" }}>Hot Extras</div>
          <h2 style={{ color:"#e8cdd8", fontSize:"1.3rem", margin:0, fontFamily:"Georgia,serif", fontWeight:"normal" }}>
            Naughty <span style={{ color:"#c9446a", fontStyle:"italic" }}>Dice</span>
          </h2>
        </div>
        <div style={{ width:"72px" }} />
      </div>

      {/* Main card */}
      <div style={{
        background:"linear-gradient(135deg,#1c0814,#0d0d0d)",
        border:"1px solid #2a1a2844",
        borderRadius:"24px", padding:"24px 20px",
        boxShadow:"0 20px 60px #8b000022, 0 4px 20px #000",
      }}>
        <p style={{
          textAlign:"center", color:"#6a3a50", fontFamily:"Georgia,serif",
          fontStyle:"italic", fontSize:"14px", letterSpacing:"0.08em", margin:"0 0 24px"
        }}>Roll the dice. Seal your fate.</p>

        {/* Dice arena */}
        <div style={{
          display:"flex", gap:"clamp(20px,8vw,60px)", alignItems:"center",
          justifyContent:"center", padding:"12px 0 28px", position:"relative"
        }}>
          {/* Action die — crimson — LEFT */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"12px" }}>
            <div style={{ width:"110px", height:"110px", perspective:"600px", position:"relative" }}>
              <NDCube dieRef={die2Ref} colorClass="ac" faceRefs={bp2Refs} />
            </div>
            <div className="nd-glow-pulse" style={{
              width:"80px", height:"20px", borderRadius:"50%",
              background:"rgba(201,68,106,0.6)", filter:"blur(10px)",
            }} />
            <span style={{ fontSize:"10px", textTransform:"uppercase", letterSpacing:"0.2em", color:"#6a3040", fontWeight:600 }}>Action</span>
          </div>

          <span style={{ color:"#3a1a38", fontSize:"22px", marginTop:"-20px", flexShrink:0 }}>✦</span>

          {/* Body Part die — purple — RIGHT */}
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"12px" }}>
            <div style={{ width:"110px", height:"110px", perspective:"600px", position:"relative" }}>
              <NDCube dieRef={die1Ref} colorClass="bp" faceRefs={bp1Refs} />
            </div>
            <div className="nd-glow-pulse" style={{
              width:"80px", height:"20px", borderRadius:"50%",
              background:"rgba(123,63,168,0.6)", filter:"blur(10px)",
            }} />
            <span style={{ fontSize:"10px", textTransform:"uppercase", letterSpacing:"0.2em", color:"#6a4070", fontWeight:600 }}>Body Part</span>
          </div>
        </div>

        {/* Result panel */}
        <div style={{
          background: result
            ? "linear-gradient(135deg,rgba(42,24,60,0.85),rgba(58,26,34,0.85))"
            : "rgba(20,10,16,0.6)",
          border:"1px solid rgba(255,255,255,0.06)",
          borderRadius:"16px", padding:"20px 24px",
          textAlign:"center", minHeight:"88px",
          display:"flex", flexDirection:"column",
          alignItems:"center", justifyContent:"center",
          marginBottom:"24px", position:"relative", overflow:"hidden",
          transition:"background 0.5s",
        }}>
          {result && (
            <div style={{
              position:"absolute", inset:0, borderRadius:"16px",
              background:"linear-gradient(135deg,rgba(123,63,168,0.08),rgba(201,68,106,0.08))",
              pointerEvents:"none"
            }} />
          )}
          {!result ? (
            <p style={{ color:"#5a3848", fontStyle:"italic", fontSize:"14px", letterSpacing:"0.05em", margin:0, fontFamily:"Georgia,serif" }}>
              {rolling ? "✨ Rolling your fate..." : "Roll the dice to reveal your fate..."}
            </p>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"4px" }}>
              <span className="nd-result-pop" style={{
                fontFamily:"Georgia,serif", fontSize:"1.55rem", fontWeight:"bold",
                color:"#c9446a", letterSpacing:"0.05em", display:"block",
              }}>{result.ac.emoji} {result.ac.label}</span>
              <span style={{ fontSize:"11px", color:"#5a3848", fontFamily:"Georgia,serif", fontStyle:"italic", letterSpacing:"0.12em" }}>your lover's</span>
              <span className="nd-result-pop2" style={{
                fontFamily:"Georgia,serif", fontSize:"1.55rem", fontWeight:"bold",
                color:"#a060d0", letterSpacing:"0.05em", display:"block",
              }}>{result.bp.emoji} {result.bp.label}</span>
            </div>
          )}
        </div>

        {/* Roll button */}
        <button
          disabled={rolling}
          onClick={handleRoll}
          style={{
            width:"100%",
            background: rolling
              ? "linear-gradient(135deg,#4a2060,#6a2040)"
              : "linear-gradient(135deg,#7b3fa8,#c9446a)",
            border:"none", borderRadius:"50px", color:"#fff",
            cursor: rolling ? "not-allowed" : "pointer",
            fontFamily:"Georgia,serif", fontSize:"1.05rem", fontWeight:"bold",
            letterSpacing:"0.12em", padding:"15px 32px",
            boxShadow: rolling ? "none" : "0 4px 30px rgba(201,68,106,0.35), 0 2px 10px rgba(0,0,0,0.5)",
            transition:"all 0.2s", opacity: rolling ? 0.7 : 1,
            position:"relative", overflow:"hidden",
          }}>
          {!rolling && (
            <span style={{
              position:"absolute", inset:0, borderRadius:"inherit",
              background:"linear-gradient(135deg,rgba(255,255,255,0.13),transparent)",
              pointerEvents:"none"
            }} />
          )}
          {rolling ? "✨  Rolling…" : result ? "🎲  Roll Again" : "🎲  Roll the Dice"}
        </button>
      </div>

      <button className="btn" onClick={onBack} style={{
        background:"#1a1a1a", color:"#888", border:"1px solid #222",
        fontSize:"15px", padding:"15px", width:"100%", marginTop:"12px"
      }}>← Back</button>

    </div>
  );
}
