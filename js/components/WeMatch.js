// ── We Match? — Couples Compatibility Quiz ───────────────────────────────────

const WM_STYLE_ID = "we-match-styles";

function injectWMStyles() {
  if (document.getElementById(WM_STYLE_ID)) return;
  const s = document.createElement("style");
  s.id = WM_STYLE_ID;
  s.textContent = `
    .wm-qcard { transition:border-color .18s, background .18s; }
    .wm-qcard.wm-yes   { border-left-color:#4ade80!important; background:rgba(74,222,128,0.06)!important; }
    .wm-qcard.wm-maybe { border-left-color:#facc15!important; background:rgba(250,204,21,0.06)!important; }
    .wm-qcard.wm-no    { border-left-color:#f43f5e!important; background:rgba(244,63,94,0.06)!important; }
    .wm-btn { border:2px solid #2a1a28; border-radius:9px; padding:.38rem .7rem; font-family:inherit; font-size:.8rem; font-weight:600; cursor:pointer; background:#1a0814; color:#4a2a40; transition:all .14s; flex-shrink:0; }
    .wm-btn:hover { filter:brightness(1.2); }
    .wm-btn.wm-sel-yes   { background:#4ade80; border-color:#4ade80; color:#052010; transform:scale(1.06); }
    .wm-btn.wm-sel-maybe { background:#facc15; border-color:#facc15; color:#1a1000; transform:scale(1.06); }
    .wm-btn.wm-sel-no    { background:#f43f5e; border-color:#f43f5e; color:#fff;    transform:scale(1.06); }
    .wm-progress-fill { height:100%; border-radius:50px; transition:width .4s ease; background:linear-gradient(90deg,#7b3fa8,#c9446a); }
    @keyframes wmFadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
    .wm-result-item { animation:wmFadeUp .3s ease both; }
    .wm-input:focus { border-color:#c9446a!important; box-shadow:0 0 0 3px rgba(201,68,106,0.2)!important; outline:none; }
    .wm-dl-btn { width:100%; padding:13px; border:2px solid #7b3fa8; border-radius:50px; background:transparent; color:#c084fc; font-family:Georgia,serif; font-size:1rem; cursor:pointer; transition:all .2s; margin-top:10px; letter-spacing:.04em; }
    .wm-dl-btn:hover { background:#7b3fa8; color:#fff; box-shadow:0 4px 18px rgba(123,63,168,0.4); }
  `;
  document.head.appendChild(s);
}

// ── Questions ─────────────────────────────────────────────────────────────────

const WM_QUESTIONS = [
  "Do you enjoy trying new positions regularly?",
  "Are you open to trying athletic sex positions?",
  "Would you be comfortable using toys together?",
  "Would you be comfortable using a vibrator on yourself/partner?",
  "Would you be comfortable using a dildo on yourself/partner?",
  "Would you be comfortable using a cock ring on yourself/partner?",
  "Do you enjoy talking dirty during sex?",
  "Would you be comfortable calling your partner obscene words (bitch, slut, whore, etc)?",
  "Would you be comfortable being called obscene words (bitch, slut, whore, etc)?",
  "Would you be willing to try new toys?",
  "Do you like giving/receiving oral sex?",
  "Do you want to receive more oral sex?",
  "Do you want to give more oral sex?",
  "Would be open to more spontaneous sex?",
  "Do you like to 69?",
  "Do you like to kiss your partners ears?",
  "Do you like your partner to kiss your ears?",
  "Do you like to kiss your partners neck?",
  "Do you like your partner to kiss your neck?",
  "Would you have your partner sit on your face as you give oral sex?",
  "Would you sit on your partner's face as you receive oral sex?",
  "Would you be OK watching adult content (porno videos) together?",
  "Would you show your partner how you like something from a porno video?",
  "Would you consider making your own porno video?",
  "Are you open to role play scenarios?",
  "Are you open to role play scenarios in costume?",
  "Do you enjoy extended foreplay before sex?",
  "Would you try light bondage with loose restraints?",
  "Would you be prepared to wear nipple clamps?",
  "Would you try hard bondage with tight restraints?",
  "Would you try sex furniture such as a sex swing or ramp?",
  "Would you consider being rougher with your partner during sex?",
  "Would you want your partner to be rougher with you during sex?",
  "Would you consider using mirrors while having sex?",
  "Would you want to be woken up with oral sex by your partner?",
  "Would you like to wake up your partner with oral sex?",
  "Would you be comfortable watching your partner masturbate?",
  "Would you be comfortable having your partner watch you masturbate?",
  "Would you be comfortable with mutual masturbation?",
  "Are you open to being masturbated by your partner until orgasm?",
  "Are you open to masturbating your partner until orgasm?",
  "Would you be prepared to straddle your partner whilst masturbating?",
  "Would you be prepared to have your partner straddle you whilst masturbating?",
  "Would you be prepared to cum over your partner's belly?",
  "Would you be prepared to have your partner cum on your belly?",
  "Would you be prepared to shave/wax your partner?",
  "Would you be prepared to be shaved/waxed by your partner?",
  "Would you be prepared to be submissive for your partner?",
  "Would you be prepared to be dominant for your partner?",
  "Would you wear a ball-gag for your partner?",
  "Would you be open to having your partner wear a ball-gag?",
  "Do you like exchanging flirty or explicit text messages?",
  "Do you like exchanging explicit images (Dick/Pussy Pics)?",
  "Would you have sex somewhere you might be caught?",
  "Would you have sex in a car?",
  "Would you have sex in the woods or a park?",
  "Are you comfortable stripping and dancing for your partner?",
  "Are you open to introducing food or props?",
  "Would you swallow your partner's cum?",
  "Would you be comfortable with XXX finishes where the man cums over the woman's breasts/neck?",
  "Would you be comfortable with XXX finishes where the man cums over the woman's face?",
  "Would you be comfortable with XXX finishes where the man cums in the woman's mouth?",
  "Would you try a blindfold experience?",
  "Would you be open to a threesome with another woman?",
  "Would you be open to a threesome with another man?",
  "Would you be open to a foursome with another couple?",
  "Do you enjoy spontaneous sex — no planning?",
  "Would you spend a full day exploring each other?",
  "Are you open to video recording yourselves intimately?",
  "Are you open to taking intimate photos of your partner?",
  "Are you open to your partner taking intimate photos of you?",
  "Do you enjoy teasing and being teased?",
  "Would you be open to your partner licking your ass (anilingus)?",
  "Would you be open to licking your partner's ass (anilingus)?",
  "Would you try sensory play (ice, feathers, heat)?",
  "Do you like giving full-body massages?",
  "Do you like receiving full-body massages?",
  "Would you explore a fantasy you haven't shared yet?",
  "Are you happy to discuss your sexual boundaries openly?",
  "Would you try a couples' spa or intimate retreat?",
  "Do you enjoy physical affection outside the bedroom?",
  "Would you take turns being in full control?",
  "Would you be open to your partner fingering your ass?",
  "Would you be open to fingering your partner's ass?",
  "Would you be open to trying full anal intercourse?",
  "Would you be open to finishing anal intercourse with cum in the ass?",
  "Would you be open to using remote controlled toys?",
  "Would you be open to using butt plugs on yourself?",
  "Would you be open to using butt plugs on your partner?",
  "Would you be open to double penetration (dick and toys)?",
  "Would you be open to being 'forced' to taste yourself?",
  "Do you enjoy being spanked or whipped?",
  "Do you enjoy spanking or whipping your partner?",
  "Would you be open to slapping your partner's face during sex?",
  "Would you be open to your face being slapped during sex?",
  "Would you be open to biting your partner during sex?",
  "Would you be open to your partner biting you during sex?",
  "Would you be open to pulling your partner's hair during sex?",
  "Would you be open to your hair being pulled during sex?",
  "Are you open to learning what your partner secretly craves?",
  "Do you want to do this quiz again in 6 months?",
];

// ── PDF/HTML Report Generator ─────────────────────────────────────────────────

function wmGenerateReport(n1, n2, ans1, ans2, score, yesItems, maybeItems, noItems) {
  const now = new Date().toLocaleDateString("en-GB", { day:"numeric", month:"long", year:"numeric" });

  const scoreEmoji = score>=80?"🔥":score>=60?"💋":score>=40?"💫":score>=20?"🌱":"💬";
  const scoreMsg   = score>=80?"Incredibly compatible — you two are on fire!"
                   : score>=60?"Great chemistry with room to explore together"
                   : score>=40?"A solid foundation — keep talking and discovering"
                   : score>=20?"Differences are opportunities — explore with curiosity"
                   : "Every journey starts somewhere — keep the conversation open";

  // Build per-question detail table rows
  const tableRows = WM_QUESTIONS.map((q, i) => {
    const a1 = ans1[i] || "—";
    const a2 = ans2[i] || "—";
    const bothYes = a1==="yes" && a2==="yes";
    const anyNo   = a1==="no"  || a2==="no";
    const rowBg   = bothYes ? "rgba(74,222,128,0.08)" : anyNo ? "rgba(244,63,94,0.06)" : "rgba(250,204,21,0.05)";
    const dot     = bothYes ? "#4ade80" : anyNo ? "#f43f5e" : "#facc15";

    function badge(a) {
      if (a==="yes")   return `<span style="background:#4ade80;color:#052010;padding:2px 9px;border-radius:50px;font-size:11px;font-weight:700;">Yes</span>`;
      if (a==="maybe") return `<span style="background:#facc15;color:#1a1000;padding:2px 9px;border-radius:50px;font-size:11px;font-weight:700;">Maybe</span>`;
      if (a==="no")    return `<span style="background:#f43f5e;color:#fff;padding:2px 9px;border-radius:50px;font-size:11px;font-weight:700;">No</span>`;
      return `<span style="color:#3a2030;">—</span>`;
    }

    return `
      <tr style="background:${rowBg}; border-bottom:1px solid #1a0814;">
        <td style="padding:7px 10px; width:24px; text-align:center;">
          <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${dot};"></span>
        </td>
        <td style="padding:7px 8px; font-size:12px; color:#c8a8b8; line-height:1.4;">${i+1}. ${q}</td>
        <td style="padding:7px 8px; text-align:center; white-space:nowrap;">${badge(a1)}</td>
        <td style="padding:7px 8px; text-align:center; white-space:nowrap;">${badge(a2)}</td>
      </tr>`;
  }).join("");

  function section(title, subtitle, icon, items, colour, symbol) {
    if (!items.length) return `
      <div style="background:linear-gradient(135deg,#1c0814,#110a0e);border:1px solid ${colour}22;border-radius:14px;padding:16px;margin-bottom:12px;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:0;">
          <div style="width:32px;height:32px;border-radius:8px;background:${colour}18;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;">${icon}</div>
          <div>
            <div style="font-family:Georgia,serif;font-size:14px;color:${colour};">${title}</div>
            <div style="font-size:11px;color:#4a2040;margin-top:2px;">${subtitle}</div>
          </div>
          <div style="margin-left:auto;font-family:Georgia,serif;font-size:22px;color:${colour};opacity:0.35;font-weight:bold;">0</div>
        </div>
      </div>`;

    const rows = items.map(q => `
      <div style="display:flex;align-items:flex-start;gap:8px;padding:7px 0;border-bottom:1px solid ${colour}12;font-size:12px;color:#c8a8b8;line-height:1.4;">
        <span style="color:${colour};font-size:10px;flex-shrink:0;margin-top:2px;">${symbol}</span>
        <span>${q}</span>
      </div>`).join("");

    return `
      <div style="background:linear-gradient(135deg,#1c0814,#110a0e);border:1px solid ${colour}33;border-radius:14px;padding:16px;margin-bottom:12px;">
        <div style="display:flex;align-items:center;gap:10px;padding-bottom:10px;border-bottom:1px solid ${colour}22;margin-bottom:10px;">
          <div style="width:32px;height:32px;border-radius:8px;background:${colour}18;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;">${icon}</div>
          <div style="flex:1;">
            <div style="font-family:Georgia,serif;font-size:14px;color:${colour};">${title}</div>
            <div style="font-size:11px;color:#4a2040;margin-top:2px;">${subtitle}</div>
          </div>
          <div style="font-family:Georgia,serif;font-size:22px;color:${colour};opacity:0.35;font-weight:bold;">${items.length}</div>
        </div>
        ${rows}
      </div>`;
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>We Match? — ${n1} &amp; ${n2}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,700;1,400&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{background:#080808;}
  body{background:#080808;color:#e8cdd8;font-family:Georgia,serif;padding:24px 16px 48px;max-width:720px;margin:0 auto;}
  h1,h2,h3{font-weight:normal;}
  table{border-collapse:collapse;width:100%;}
  @media print{
    body{padding:12px;}
    .no-print{display:none!important;}
  }
</style>
</head>
<body>

<!-- Header -->
<div style="text-align:center;padding:28px 20px 24px;background:linear-gradient(135deg,#1c0814,#0d0d0d);border:1px solid #2a1a28;border-radius:20px;margin-bottom:20px;box-shadow:0 20px 50px rgba(0,0,0,0.5);">
  <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#3a2030;margin-bottom:6px;">Couples Compatibility Report</div>
  <h1 style="font-family:Georgia,serif;font-size:2rem;font-weight:normal;color:#e8cdd8;margin-bottom:4px;">
    ${n1} <span style="color:#c9446a;font-style:italic;">&amp;</span> ${n2}
  </h1>
  <div style="font-size:11px;color:#3a2030;margin-top:6px;letter-spacing:1px;">Generated ${now} · ${WM_QUESTIONS.length} questions</div>

  <div style="margin-top:20px;">
    <div style="font-size:2.4rem;margin-bottom:4px;">${scoreEmoji}</div>
    <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#3a2030;margin-bottom:4px;">Compatibility Score</div>
    <div style="font-family:Georgia,serif;font-size:3rem;font-weight:bold;
      background:linear-gradient(135deg,#c084fc,#f9a8d4,#facc15);
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1.1;">
      ${score}%
    </div>
    <div style="color:#6a3a50;font-size:13px;font-style:italic;margin-top:8px;line-height:1.6;">${scoreMsg}</div>
  </div>

  <!-- Summary pills -->
  <div style="display:flex;justify-content:center;gap:10px;margin-top:18px;flex-wrap:wrap;">
    <div style="background:rgba(74,222,128,0.1);border:1px solid rgba(74,222,128,0.3);border-radius:50px;padding:5px 16px;font-size:12px;color:#4ade80;">
      ♥ ${yesItems.length} Both Yes
    </div>
    <div style="background:rgba(250,204,21,0.1);border:1px solid rgba(250,204,21,0.3);border-radius:50px;padding:5px 16px;font-size:12px;color:#facc15;">
      ✦ ${maybeItems.length} Maybe
    </div>
    <div style="background:rgba(244,63,94,0.1);border:1px solid rgba(244,63,94,0.3);border-radius:50px;padding:5px 16px;font-size:12px;color:#f43f5e;">
      ✕ ${noItems.length} Not Yet
    </div>
  </div>
</div>

<!-- Summary sections -->
${section("Yes — You Both Love It","Both of you said YES","✓",yesItems,"#4ade80","♥")}
${section("Maybe — Worth Exploring","At least one said Maybe, neither said No","✦",maybeItems,"#facc15","✦")}
${section("Not For You — At Least For Now","At least one of you said No","✕",noItems,"#f43f5e","✕")}

<!-- Full Q&A detail table -->
<div style="background:linear-gradient(135deg,#1c0814,#0d0d0d);border:1px solid #2a1a28;border-radius:14px;overflow:hidden;margin-top:8px;">
  <div style="padding:14px 16px;border-bottom:1px solid #1a0814;display:flex;align-items:center;justify-content:space-between;">
    <div style="font-family:Georgia,serif;font-size:14px;color:#e8cdd8;">All Questions — Side by Side</div>
    <div style="font-size:11px;color:#3a2030;">${WM_QUESTIONS.length} total</div>
  </div>
  <table>
    <thead>
      <tr style="background:#0e0608;border-bottom:1px solid #2a1a28;">
        <th style="padding:8px 10px;width:24px;"></th>
        <th style="padding:8px 8px;text-align:left;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#3a2030;font-weight:normal;">Question</th>
        <th style="padding:8px 8px;text-align:center;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#c9446a;font-weight:normal;white-space:nowrap;">${n1}</th>
        <th style="padding:8px 8px;text-align:center;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#f59e0b;font-weight:normal;white-space:nowrap;">${n2}</th>
      </tr>
    </thead>
    <tbody>${tableRows}</tbody>
  </table>
</div>

<!-- Footer -->
<div style="text-align:center;padding:20px 0 0;font-size:11px;color:#2a1020;font-style:italic;">
  We Match? · Couples Compatibility Quiz · ${now}
</div>

</body>
</html>`;

  return html;
}

function wmDownloadReport(n1, n2, ans1, ans2, score, yesItems, maybeItems, noItems) {
  const html  = wmGenerateReport(n1, n2, ans1, ans2, score, yesItems, maybeItems, noItems);
  const blob  = new Blob([html], { type: "text/html;charset=utf-8" });
  const url   = URL.createObjectURL(blob);
  const a     = document.createElement("a");
  a.href      = url;
  a.download  = `WeMatch-${n1.replace(/\s+/g,"")}-${n2.replace(/\s+/g,"")}.html`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { URL.revokeObjectURL(url); document.body.removeChild(a); }, 1000);
}

// ── Component ─────────────────────────────────────────────────────────────────

function WeMatchScreen({ onBack }) {
  injectWMStyles();

  const [phase, setPhase] = useState("welcome");
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [ans1,  setAns1]  = useState({});
  const [ans2,  setAns2]  = useState({});

  const n1 = name1.trim() || "Person 1";
  const n2 = name2.trim() || "Person 2";

  function startQuiz() { setAns1({}); setAns2({}); setPhase("quiz1"); }
  function restart()   { setAns1({}); setAns2({}); setPhase("welcome"); }

  function setAnswer(idx, val, isP2) {
    if (isP2) setAns2(prev => ({ ...prev, [idx]: val }));
    else      setAns1(prev => ({ ...prev, [idx]: val }));
  }

  const answeredCount = (ans) => Object.keys(ans).length;
  const allDone       = (ans) => answeredCount(ans) === WM_QUESTIONS.length;

  const Header = () => (
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"20px"}}>
      <button onClick={phase==="welcome"?onBack:()=>setPhase("welcome")}
        style={{background:"#141414",border:"1px solid #222",color:"#888",borderRadius:"8px",padding:"7px 13px",cursor:"pointer",fontFamily:"inherit",fontSize:"13px"}}>
        ← Back
      </button>
      <div style={{textAlign:"center"}}>
        <div style={{color:"#555",fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",marginBottom:"2px"}}>Hot Extras</div>
        <h2 style={{color:"#e8cdd8",fontSize:"1.3rem",margin:0,fontFamily:"Georgia,serif",fontWeight:"normal"}}>
          We <span style={{color:"#c9446a",fontStyle:"italic"}}>Match?</span>
        </h2>
      </div>
      <div style={{width:"72px"}}/>
    </div>
  );

  // ── Welcome ───────────────────────────────────────────────────────────────

  if (phase === "welcome") return (
    <div style={{animation:"fadeUp .35s ease",maxWidth:"520px",width:"100%"}}>
      <Header/>
      <div style={{textAlign:"center",marginBottom:"24px"}}>
        <div style={{fontSize:"2rem",letterSpacing:"0.4rem",marginBottom:"8px",animation:"wm-pulse 2.2s ease-in-out infinite"}}>♥ ♡ ♥</div>
        <style>{`@keyframes wm-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.09)}}`}</style>
        <p style={{color:"#6a3a50",fontSize:"13px",fontFamily:"Georgia,serif",fontStyle:"italic",lineHeight:1.6}}>
          A deep and intimate preferences, boundaries and compatibility quiz for two.<br/>Answer honestly — the results might surprise you!
        </p>
      </div>
      <div style={{background:"linear-gradient(135deg,#1c0814,#0d0d0d)",border:"1px solid #2a1a28",borderRadius:"20px",padding:"22px 18px",width:"100%",boxShadow:"0 20px 50px rgba(0,0,0,0.5)",marginBottom:"20px"}}>
        <div style={{fontSize:"10px",letterSpacing:"0.16em",textTransform:"uppercase",color:"#3a2030",marginBottom:"12px"}}>Enter your names</div>
        {[{label:"Person 1",val:name1,set:setName1},{label:"Person 2",val:name2,set:setName2}].map(({label,val,set},i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:i===0?"12px":0}}>
            <span style={{fontFamily:"Georgia,serif",fontSize:"13px",color:"#c9446a",fontStyle:"italic",minWidth:"68px",flexShrink:0}}>{label}</span>
            <input type="text" maxLength={30} value={val} placeholder="Enter name…"
              onChange={e=>set(e.target.value)} className="wm-input"
              style={{flex:1,background:"#0e0810",border:"1.5px solid #2a1a28",borderRadius:"10px",color:"#e8cdd8",fontFamily:"inherit",fontSize:"14px",padding:"8px 12px",transition:"border-color .2s,box-shadow .2s"}}/>
          </div>
        ))}
      </div>
      <button onClick={startQuiz}
        style={{width:"100%",background:"linear-gradient(135deg,#7b3fa8,#c9446a)",border:"none",borderRadius:"50px",color:"#fff",fontFamily:"Georgia,serif",fontSize:"1.1rem",fontWeight:"bold",padding:"16px",cursor:"pointer",boxShadow:"0 6px 24px rgba(201,68,106,0.4)",letterSpacing:"0.08em"}}>
        Let's Begin ♥
      </button>
    </div>
  );

  // ── Quiz ──────────────────────────────────────────────────────────────────

  if (phase === "quiz1" || phase === "quiz2") {
    const isP2   = phase === "quiz2";
    const ans    = isP2 ? ans2 : ans1;
    const name   = isP2 ? n2   : n1;
    const accent = isP2 ? "#f59e0b" : "#c9446a";
    const done   = allDone(ans);
    const count  = answeredCount(ans);

    return (
      <div style={{animation:"fadeUp .35s ease",maxWidth:"520px",width:"100%"}}>
        <Header/>
        <div style={{textAlign:"center",marginBottom:"18px"}}>
          <div style={{display:"inline-block",background:accent,color:"#fff",borderRadius:"50px",padding:"3px 16px",fontSize:"10px",fontWeight:"700",letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:"8px"}}>
            {isP2?"Player 2":"Player 1"}
          </div>
          <div style={{fontFamily:"Georgia,serif",fontSize:"1.2rem",color:"#e8cdd8",marginBottom:"12px"}}>
            Your turn, <span style={{color:accent,fontStyle:"italic"}}>{name}</span>
          </div>
          <div style={{background:"#1a0814",borderRadius:"50px",height:"5px",overflow:"hidden",marginBottom:"4px"}}>
            <div className="wm-progress-fill" style={{width:`${count/WM_QUESTIONS.length*100}%`,background:`linear-gradient(90deg,${isP2?"#f59e0b,#facc15":"#7b3fa8,#c9446a"})`}}/>
          </div>
          <div style={{fontSize:"11px",color:"#4a2040",textAlign:"right"}}>{count} / {WM_QUESTIONS.length} answered</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"20px"}}>
          {WM_QUESTIONS.map((q,i)=>{
            const a=ans[i];
            return (
              <div key={i} className={`wm-qcard${a?` wm-${a}`:""}`}
                style={{background:"#0e0810",borderRadius:"12px",padding:"10px 12px",display:"flex",alignItems:"center",gap:"10px",borderLeft:"3px solid #1a0814"}}>
                <span style={{fontFamily:"Georgia,serif",fontSize:"1.1rem",color:"#2a1020",minWidth:"24px",textAlign:"center",flexShrink:0,fontWeight:"bold"}}>{i+1}</span>
                <span style={{flex:1,fontSize:"13px",color:"#c8a8b8",lineHeight:1.45}}>{q}</span>
                <div style={{display:"flex",gap:"5px",flexShrink:0}}>
                  <button className={`wm-btn${a==="yes"?" wm-sel-yes":""}`} onClick={()=>setAnswer(i,"yes",isP2)}>Yes</button>
                  <button className={`wm-btn${a==="maybe"?" wm-sel-maybe":""}`} onClick={()=>setAnswer(i,"maybe",isP2)}>Maybe</button>
                  <button className={`wm-btn${a==="no"?" wm-sel-no":""}`} onClick={()=>setAnswer(i,"no",isP2)}>No</button>
                </div>
              </div>
            );
          })}
        </div>
        <button disabled={!done}
          onClick={()=>{ if(!done)return; isP2?setPhase("results"):setPhase("quiz2"); window.scrollTo({top:0,behavior:"smooth"}); }}
          style={{width:"100%",padding:"14px",borderRadius:"50px",border:"none",cursor:done?"pointer":"not-allowed",fontFamily:"Georgia,serif",fontSize:"1rem",fontWeight:"bold",color:"#fff",transition:"all .2s",
            background:done?`linear-gradient(135deg,${isP2?"#f59e0b,#facc15":"#7b3fa8,#c9446a"})`:"#1a0814",
            opacity:done?1:0.4,
            boxShadow:done?`0 4px 20px ${isP2?"rgba(245,158,11,0.4)":"rgba(201,68,106,0.4)"}`:""}}>
          {done?(isP2?"See Results ♥":`${n2}'s Turn →`):"Answer all questions to continue"}
        </button>
      </div>
    );
  }

  // ── Results ───────────────────────────────────────────────────────────────

  if (phase === "results") {
    const yesItems=[], maybeItems=[], noItems=[];
    WM_QUESTIONS.forEach((q,i)=>{
      const a1=ans1[i], a2=ans2[i];
      if(a1==="no"||a2==="no")        noItems.push(q);
      else if(a1==="yes"&&a2==="yes") yesItems.push(q);
      else                             maybeItems.push(q);
    });

    const score      = Math.round((yesItems.length / WM_QUESTIONS.length)*100);
    const scoreEmoji = score>=80?"🔥":score>=60?"💋":score>=40?"💫":score>=20?"🌱":"💬";
    const scoreMsg   = score>=80?"Incredibly compatible — you two are on fire!"
                     : score>=60?"Great chemistry with room to explore together"
                     : score>=40?"A solid foundation — keep talking and discovering"
                     : score>=20?"Differences are opportunities — explore with curiosity"
                     : "Every journey starts somewhere — keep the conversation open";

    const Section = ({title,subtitle,icon,items,itemCls,accentColor,bgColor,emptyText})=>(
      <div style={{background:"linear-gradient(135deg,#1c0814,#0d0d0d)",border:`1px solid ${accentColor}33`,borderRadius:"18px",padding:"18px",marginBottom:"12px",boxShadow:"0 4px 24px rgba(0,0,0,0.4)"}}>
        <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px",paddingBottom:"10px",borderBottom:`1px solid ${accentColor}22`}}>
          <div style={{width:"36px",height:"36px",borderRadius:"10px",background:bgColor,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1rem",flexShrink:0}}>{icon}</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:"Georgia,serif",fontSize:"1rem",color:accentColor,fontWeight:"normal"}}>{title}</div>
            <div style={{fontSize:"11px",color:"#4a2040",marginTop:"2px"}}>{subtitle}</div>
          </div>
          <div style={{fontFamily:"Georgia,serif",fontSize:"1.8rem",color:accentColor,opacity:0.4,fontWeight:"bold"}}>{items.length}</div>
        </div>
        {items.length===0
          ? <div style={{color:"#3a2030",fontSize:"13px",fontStyle:"italic",textAlign:"center",padding:"4px 0"}}>{emptyText}</div>
          : <div style={{display:"flex",flexDirection:"column",gap:"0"}}>
              {items.map((q,idx)=>(
                <div key={idx} className="wm-result-item" style={{display:"flex",alignItems:"center",gap:"8px",padding:"8px 0",borderBottom:`1px solid ${accentColor}15`,fontSize:"13px",color:"#c8a8b8",lineHeight:1.4,animationDelay:`${idx*0.04}s`}}>
                  <span style={{color:accentColor,fontSize:"10px",flexShrink:0}}>{itemCls==="wm-yes-item"?"♥":itemCls==="wm-maybe-item"?"✦":"✕"}</span>
                  {q}
                </div>
              ))}
            </div>
        }
      </div>
    );

    return (
      <div style={{animation:"fadeUp .35s ease",maxWidth:"520px",width:"100%"}}>
        <Header/>

        {/* Score banner */}
        <div style={{textAlign:"center",marginBottom:"24px",background:"linear-gradient(135deg,#1c0814,#0d0d0d)",border:"1px solid #2a1a28",borderRadius:"20px",padding:"24px 18px",boxShadow:"0 20px 50px rgba(0,0,0,0.5)"}}>
          <div style={{fontSize:"3rem",marginBottom:"6px"}}>{scoreEmoji}</div>
          <div style={{fontFamily:"Georgia,serif",fontSize:"1.6rem",color:"#e8cdd8",marginBottom:"4px"}}>
            {n1} <span style={{color:"#c9446a",fontStyle:"italic"}}>&amp;</span> {n2}
          </div>
          <div style={{fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",color:"#3a2030",margin:"10px 0 6px"}}>Compatibility Score</div>
          <div style={{fontFamily:"Georgia,serif",fontSize:"3rem",fontWeight:"bold",
            background:"linear-gradient(135deg,#c084fc,#f9a8d4,#facc15)",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",lineHeight:1}}>
            {score}%
          </div>
          <div style={{color:"#6a3a50",fontSize:"13px",fontFamily:"Georgia,serif",fontStyle:"italic",marginTop:"8px",lineHeight:1.5}}>{scoreMsg}</div>
        </div>

        <Section title="Yes — You Both Love It" subtitle="Both of you said YES to these"
          icon="✓" items={yesItems} itemCls="wm-yes-item"
          accentColor="#4ade80" bgColor="rgba(74,222,128,0.12)"
          emptyText="Nothing here yet — keep exploring!"/>
        <Section title="Maybe — Worth Exploring" subtitle="At least one said Maybe, neither said No"
          icon="✦" items={maybeItems} itemCls="wm-maybe-item"
          accentColor="#facc15" bgColor="rgba(250,204,21,0.12)"
          emptyText="No maybes — you're decisive!"/>
        <Section title="Not for You — At Least for Now" subtitle="At least one of you said No"
          icon="✕" items={noItems} itemCls="wm-no-item"
          accentColor="#f43f5e" bgColor="rgba(244,63,94,0.12)"
          emptyText="No hard nos — impressive openness!"/>

        {/* Download button */}
        <button className="wm-dl-btn"
          onClick={()=>wmDownloadReport(n1,n2,ans1,ans2,score,yesItems,maybeItems,noItems)}>
          ⬇ Download Full Report
        </button>

        <button onClick={restart}
          style={{width:"100%",background:"transparent",color:"#c9446a",border:"2px solid #c9446a",borderRadius:"50px",padding:"12px",fontFamily:"Georgia,serif",fontSize:"1rem",cursor:"pointer",marginTop:"10px",marginBottom:"32px",transition:"all .2s"}}
          onMouseOver={e=>{e.target.style.background="#c9446a";e.target.style.color="#fff";}}
          onMouseOut={e=>{e.target.style.background="transparent";e.target.style.color="#c9446a";}}>
          ↺ Start Over
        </button>
      </div>
    );
  }

  return null;
}
