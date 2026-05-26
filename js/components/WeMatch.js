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
    .wm-btn { border:2px solid #2a1a28; border-radius:9px; padding:.45rem .9rem; font-family:inherit; font-size:.9rem; font-weight:600; cursor:pointer; background:#1a0814; color:#4a2a40; transition:all .14s; flex-shrink:0; }
    .wm-btn:hover { filter:brightness(1.2); }
    .wm-btn.wm-sel-yes   { background:#4ade80; border-color:#4ade80; color:#052010; transform:scale(1.06); }
    .wm-btn.wm-sel-maybe { background:#facc15; border-color:#facc15; color:#1a1000; transform:scale(1.06); }
    .wm-btn.wm-sel-no    { background:#f43f5e; border-color:#f43f5e; color:#fff;    transform:scale(1.06); }
    .wm-progress-fill { height:100%; border-radius:50px; transition:width .4s ease; }
    @keyframes wmFadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
    .wm-result-item { animation:wmFadeUp .3s ease both; }
    .wm-input:focus { border-color:#c9446a!important; box-shadow:0 0 0 3px rgba(201,68,106,0.2)!important; outline:none; }
    .wm-dl-btn { width:100%; padding:14px; border:2px solid #7b3fa8; border-radius:50px; background:transparent; color:#c084fc; font-family:Georgia,serif; font-size:1.05rem; cursor:pointer; transition:all .2s; margin-top:10px; letter-spacing:.04em; }
    .wm-dl-btn:hover { background:#7b3fa8; color:#fff; box-shadow:0 4px 18px rgba(123,63,168,0.4); }
    .wm-cat-header { font-size:10px; letter-spacing:2px; text-transform:uppercase; color:#3a2030; padding:14px 0 6px; font-family:Georgia,serif; border-top:1px solid #1a0814; margin-top:6px; }
    .wm-cat-header:first-child { border-top:none; margin-top:0; }
  `;
  document.head.appendChild(s);
}

// ── Category definitions ──────────────────────────────────────────────────────

const WM_CATS = {
  sex:     { label:"Sex",       emoji:"🔥", colour:"#c9446a" },
  oral:    { label:"Oral",      emoji:"👄", colour:"#f59e0b" },
  toys:    { label:"Toys",      emoji:"🎀", colour:"#a855f7" },
  bdsm:    { label:"BDSM",      emoji:"⛓️", colour:"#f43f5e" },
  assplay: { label:"Ass Play",  emoji:"🍑", colour:"#f97316" },
  group:   { label:"Group",     emoji:"👥", colour:"#06b6d4" },
  visuals: { label:"Visuals",   emoji:"📸", colour:"#4ade80" },
  other:   { label:"Other",     emoji:"✨", colour:"#c084fc" },
};

// ── Questions — tagged but tag never shown to user ────────────────────────────
// Each entry: { q: "question text", cat: "category key" }

const WM_QUESTIONS = [
  { q:"Do you enjoy trying new positions regularly?",                                                             cat:"sex"     },
  { q:"Are you open to trying athletic sex positions?",                                                           cat:"sex"     },
  { q:"Would you be comfortable using toys together?",                                                            cat:"toys"    },
  { q:"Would you be comfortable using a vibrator on yourself/partner?",                                           cat:"toys"    },
  { q:"Would you be comfortable using a dildo on yourself/partner?",                                              cat:"toys"    },
  { q:"Would you be comfortable using a cock ring on yourself/partner?",                                          cat:"toys"    },
  { q:"Do you enjoy talking dirty during sex?",                                                                   cat:"sex"     },
  { q:"Would you be comfortable calling your partner obscene words (bitch, slut, whore, etc)?",                   cat:"bdsm"    },
  { q:"Would you be comfortable being called obscene words (bitch, slut, whore, etc)?",                           cat:"bdsm"    },
  { q:"Would you be willing to try new toys?",                                                                    cat:"toys"    },
  { q:"Do you like giving/receiving oral sex?",                                                                   cat:"oral"    },
  { q:"Do you want to receive more oral sex?",                                                                    cat:"oral"    },
  { q:"Do you want to give more oral sex?",                                                                       cat:"oral"    },
  { q:"Would you be open to more spontaneous sex?",                                                                   cat:"sex"     },
  { q:"Do you like to 69?",                                                                                       cat:"oral"    },
  { q:"Do you like to kiss your partner's ears?",                                                                  cat:"sex"     },
  { q:"Do you like your partner to kiss your ears?",                                                              cat:"sex"     },
  { q:"Do you like to kiss your partner's neck?",                                                                  cat:"sex"     },
  { q:"Do you like your partner to kiss your neck?",                                                              cat:"sex"     },
  { q:"Would you have your partner sit on your face as you give oral sex?",                                       cat:"oral"    },
  { q:"Would you sit on your partner's face as you receive oral sex?",                                            cat:"oral"    },
  { q:"Would you be OK watching adult content (porno videos) together?",                                          cat:"visuals" },
  { q:"Would you show your partner how you like something from a porno video?",                                   cat:"visuals" },
  { q:"Would you consider making your own porno video?",                                                          cat:"visuals" },
  { q:"Are you open to role-play scenarios?",                                                                     cat:"other"   },
  { q:"Are you open to role-play scenarios in costume?",                                                          cat:"other"   },
  { q:"Do you enjoy extended foreplay before sex?",                                                               cat:"sex"     },
  { q:"Would you try light bondage with loose restraints?",                                                       cat:"bdsm"    },
  { q:"Would you be prepared to wear nipple clamps?",                                                             cat:"bdsm"    },
  { q:"Would you try hard bondage with tight restraints?",                                                        cat:"bdsm"    },
  { q:"Would you try sex furniture such as a sex swing or ramp?",                                                 cat:"other"   },
  { q:"Would you consider being rougher with your partner during sex?",                                           cat:"bdsm"    },
  { q:"Would you want your partner to be rougher with you during sex?",                                           cat:"bdsm"    },
  { q:"Would you consider using mirrors while having sex?",                                                       cat:"visuals" },
  { q:"Would you want to be woken up with oral sex by your partner?",                                             cat:"oral"    },
  { q:"Would you like to wake up your partner with oral sex?",                                                    cat:"oral"    },
  { q:"Would you be comfortable watching your partner masturbate?",                                               cat:"visuals" },
  { q:"Would you be comfortable having your partner watch you masturbate?",                                       cat:"visuals" },
  { q:"Would you be comfortable with mutual masturbation?",                                                       cat:"sex"     },
  { q:"Are you open to being masturbated by your partner until orgasm?",                                          cat:"sex"     },
  { q:"Are you open to masturbating your partner until orgasm?",                                                  cat:"sex"     },
  { q:"Would you be prepared to straddle your partner whilst masturbating?",                                      cat:"sex"     },
  { q:"Would you be prepared to have your partner straddle you whilst masturbating?",                             cat:"sex"     },
  { q:"Would you be prepared to cum over your partner's belly?",                                                  cat:"sex"     },
  { q:"Would you be prepared to have your partner cum on your belly?",                                            cat:"sex"     },
  { q:"Would you be prepared to shave/wax your partner?",                                                        cat:"other"   },
  { q:"Would you be prepared to be shaved/waxed by your partner?",                                               cat:"other"   },
  { q:"Would you be prepared to be submissive for your partner?",                                                 cat:"bdsm"    },
  { q:"Would you be prepared to be dominant for your partner?",                                                   cat:"bdsm"    },
  { q:"Would you wear a ball-gag for your partner?",                                                              cat:"bdsm"    },
  { q:"Would you be open to having your partner wear a ball-gag?",                                                cat:"bdsm"    },
  { q:"Do you like exchanging flirty or explicit text messages?",                                                 cat:"visuals" },
  { q:"Do you like exchanging explicit images (Dick/Pussy Pics)?",                                                cat:"visuals" },
  { q:"Would you have sex somewhere you might be caught?",                                                        cat:"other"   },
  { q:"Would you have sex in a car?",                                                                             cat:"other"   },
  { q:"Would you have sex in the woods or a park?",                                                               cat:"other"   },
  { q:"Are you comfortable stripping and dancing for your partner?",                                              cat:"other"   },
  { q:"Are you open to introducing food or props?",                                                               cat:"other"   },
  { q:"Would you swallow your partner's cum?",                                                                    cat:"oral"    },
  { q:"Would you be comfortable with XXX finishes where the man cums over the woman's breasts/neck?",             cat:"sex"     },
  { q:"Would you be comfortable with XXX finishes where the man cums over the woman's face?",                     cat:"sex"     },
  { q:"Would you be comfortable with XXX finishes where the man cums in the woman's mouth?",                      cat:"oral"    },
  { q:"Would you try a blindfold experience?",                                                                    cat:"bdsm"    },
  { q:"Would you be open to a threesome with another woman?",                                                     cat:"group"   },
  { q:"Would you be open to a threesome with another man?",                                                       cat:"group"   },
  { q:"Would you be open to a foursome with another couple?",                                                     cat:"group"   },
  { q:"Would you spend a full day exploring each other?",                                                         cat:"sex"     },
  { q:"Are you open to video recording yourselves intimately?",                                                   cat:"visuals" },
  { q:"Are you open to taking intimate photos of your partner?",                                                  cat:"visuals" },
  { q:"Are you open to your partner taking intimate photos of you?",                                              cat:"visuals" },
  { q:"Do you enjoy teasing and being teased?",                                                                   cat:"sex"     },
  { q:"Would you be open to your partner licking your ass (anilingus)?",                                          cat:"assplay" },
  { q:"Would you be open to licking your partner's ass (anilingus)?",                                             cat:"assplay" },
  { q:"Would you try sensory play (ice, feathers, heat)?",                                                        cat:"bdsm"    },
  { q:"Do you like giving full-body massages?",                                                                   cat:"other"   },
  { q:"Do you like receiving full-body massages?",                                                                cat:"other"   },
  { q:"Would you explore a fantasy you haven't shared yet?",                                                      cat:"other"   },
  { q:"Are you happy to discuss your sexual boundaries openly?",                                                  cat:"other"   },
  { q:"Would you try a couples' spa or intimate retreat?",                                                        cat:"other"   },
  { q:"Do you enjoy physical affection outside the bedroom?",                                                     cat:"other"   },
  { q:"Would you take turns being in full control?",                                                              cat:"bdsm"    },
  { q:"Would you be open to your partner fingering your ass?",                                                    cat:"assplay" },
  { q:"Would you be open to fingering your partner's ass?",                                                       cat:"assplay" },
  { q:"Would you be open to fingering your own ass as your lover gives you oral?",                                cat:"assplay" },
  { q:"Would you be open to trying full anal intercourse?",                                                       cat:"assplay" },
  { q:"Would you be open to finishing anal intercourse with cum in the ass?",                                     cat:"assplay" },
  { q:"Would you be open to using remote controlled toys?",                                                       cat:"toys"    },
  { q:"Would you be open to using butt plugs on yourself?",                                                       cat:"assplay" },
  { q:"Would you be open to using butt plugs on your partner?",                                                   cat:"assplay" },
  { q:"Would you be open to double penetration (dick and toys)?",                                                 cat:"assplay" },
  { q:"Would you be open to being 'forced' to taste yourself?",                                                   cat:"bdsm"    },
  { q:"Do you enjoy being spanked or whipped?",                                                                   cat:"bdsm"    },
  { q:"Do you enjoy spanking or whipping your partner?",                                                          cat:"bdsm"    },
  { q:"Would you be open to slapping your partner's face during sex?",                                            cat:"bdsm"    },
  { q:"Would you be open to your face being slapped during sex?",                                                 cat:"bdsm"    },
  { q:"Would you be open to biting your partner during sex?",                                                     cat:"bdsm"    },
  { q:"Would you be open to your partner biting you during sex?",                                                 cat:"bdsm"    },
  { q:"Would you be open to pulling your partner's hair during sex?",                                             cat:"bdsm"    },
  { q:"Would you be open to your hair being pulled during sex?",                                                  cat:"bdsm"    },
  { q:"Are you open to learning what your partner secretly craves?",                                              cat:"other"   },
  { q:"Do you want to do this quiz again in 6 months?",                                                           cat:"other"   },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

// Group questions by category, preserving original indices
function wmGroupByCategory(ans1, ans2) {
  const groups = {};
  Object.keys(WM_CATS).forEach(k => { groups[k] = []; });
  WM_QUESTIONS.forEach((item, i) => {
    const a1 = ans1[i] || "—";
    const a2 = ans2[i] || "—";
    groups[item.cat].push({ q: item.q, i, a1, a2 });
  });
  return groups;
}

// ── Report Generator ──────────────────────────────────────────────────────────

function wmGenerateReport(n1, n2, ans1, ans2, score) {
  const now = new Date().toLocaleDateString("en-GB", { day:"numeric", month:"long", year:"numeric" });
  const scoreEmoji = score>=80?"🔥":score>=60?"💋":score>=40?"💫":score>=20?"🌱":"💬";
  const scoreMsg   = score>=80?"Incredibly compatible — you two are on fire!"
                   : score>=60?"Great chemistry with room to explore together"
                   : score>=40?"A solid foundation — keep talking and discovering"
                   : score>=20?"Differences are opportunities — explore with curiosity"
                   : "Every journey starts somewhere — keep the conversation open";

  const groups = wmGroupByCategory(ans1, ans2);

  // Count totals
  let totalYes=0, totalMaybe=0, totalNo=0;
  WM_QUESTIONS.forEach((_,i)=>{
    const a1=ans1[i], a2=ans2[i];
    if(a1==="yes"&&a2==="yes") totalYes++;
    else if(a1==="no"||a2==="no") totalNo++;
    else totalMaybe++;
  });

  function badge(a) {
    if (a==="yes")   return `<span style="background:#4ade80;color:#052010;padding:3px 12px;border-radius:50px;font-size:13px;font-weight:700;display:inline-block;">Yes</span>`;
    if (a==="maybe") return `<span style="background:#facc15;color:#1a1000;padding:3px 12px;border-radius:50px;font-size:13px;font-weight:700;display:inline-block;">Maybe</span>`;
    if (a==="no")    return `<span style="background:#f43f5e;color:#fff;padding:3px 12px;border-radius:50px;font-size:13px;font-weight:700;display:inline-block;">No</span>`;
    return `<span style="color:#3a2030;font-size:13px;">—</span>`;
  }

  function rowDot(a1,a2){
    if(a1==="yes"&&a2==="yes") return "#4ade80";
    if(a1==="no"||a2==="no")   return "#f43f5e";
    return "#facc15";
  }

  // Build one category section for the report
  function catSection(catKey) {
    const cat   = WM_CATS[catKey];
    const items = groups[catKey];
    if (!items.length) return "";

    const rows = items.map(({q, i, a1, a2}) => {
      const bg  = rowDot(a1,a2)==="#4ade80" ? "rgba(74,222,128,0.07)"
                : rowDot(a1,a2)==="#f43f5e" ? "rgba(244,63,94,0.05)"
                : "rgba(250,204,21,0.04)";
      return `
        <tr style="background:${bg};border-bottom:1px solid #1a0814;">
          <td style="padding:10px 12px;width:20px;text-align:center;">
            <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${rowDot(a1,a2)};"></span>
          </td>
          <td style="padding:10px 10px;font-size:15px;color:#c8a8b8;line-height:1.5;">${i+1}. ${q}</td>
          <td style="padding:10px 10px;text-align:center;white-space:nowrap;">${badge(a1)}</td>
          <td style="padding:10px 10px;text-align:center;white-space:nowrap;">${badge(a2)}</td>
        </tr>`;
    }).join("");

    const catYes   = items.filter(({a1,a2})=>a1==="yes"&&a2==="yes").length;
    const catMaybe = items.filter(({a1,a2})=>a1!=="no"&&a2!=="no"&&!(a1==="yes"&&a2==="yes")).length;
    const catNo    = items.filter(({a1,a2})=>a1==="no"||a2==="no").length;

    return `
      <div style="margin-bottom:28px;">
        <!-- Category header -->
        <div style="display:flex;align-items:center;gap:12px;padding:14px 18px;background:linear-gradient(135deg,#1c0814,#110a0e);border:1px solid ${cat.colour}44;border-radius:14px 14px 0 0;border-bottom:none;">
          <div style="width:42px;height:42px;border-radius:10px;background:${cat.colour}18;border:1px solid ${cat.colour}33;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">${cat.emoji}</div>
          <div style="flex:1;">
            <div style="font-family:Georgia,serif;font-size:1.25rem;color:${cat.colour};font-weight:normal;">${cat.label}</div>
            <div style="font-size:12px;color:#4a2040;margin-top:2px;">${items.length} question${items.length!==1?"s":""}</div>
          </div>
          <div style="display:flex;gap:10px;flex-shrink:0;">
            <span style="background:rgba(74,222,128,0.12);border:1px solid rgba(74,222,128,0.25);color:#4ade80;border-radius:50px;padding:3px 10px;font-size:12px;font-weight:700;">♥ ${catYes}</span>
            <span style="background:rgba(250,204,21,0.12);border:1px solid rgba(250,204,21,0.25);color:#facc15;border-radius:50px;padding:3px 10px;font-size:12px;font-weight:700;">✦ ${catMaybe}</span>
            <span style="background:rgba(244,63,94,0.12);border:1px solid rgba(244,63,94,0.25);color:#f43f5e;border-radius:50px;padding:3px 10px;font-size:12px;font-weight:700;">✕ ${catNo}</span>
          </div>
        </div>
        <!-- Questions table -->
        <div style="border:1px solid ${cat.colour}33;border-top:none;border-radius:0 0 14px 14px;overflow:hidden;">
          <table style="border-collapse:collapse;width:100%;">
            <thead>
              <tr style="background:#0e0608;border-bottom:1px solid #2a1a28;">
                <th style="padding:8px 12px;width:20px;"></th>
                <th style="padding:8px 10px;text-align:left;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#3a2030;font-weight:normal;">Question</th>
                <th style="padding:8px 10px;text-align:center;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#c9446a;font-weight:normal;white-space:nowrap;min-width:80px;">${n1}</th>
                <th style="padding:8px 10px;text-align:center;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#f59e0b;font-weight:normal;white-space:nowrap;min-width:80px;">${n2}</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>`;
  }

  const allCatSections = Object.keys(WM_CATS).map(catSection).join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>We Match? — ${n1} &amp; ${n2}</title>
<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html,body{background:#080808;}
  body{background:#080808;color:#e8cdd8;font-family:Georgia,serif;padding:28px 20px 60px;max-width:800px;margin:0 auto;font-size:16px;line-height:1.6;}
  h1,h2,h3{font-weight:normal;}
  table{border-collapse:collapse;width:100%;}
  @media print{
    body{padding:12px;font-size:14px;}
    .no-print{display:none!important;}
  }
</style>
</head>
<body>

<!-- Header / score banner -->
<div style="text-align:center;padding:32px 24px 28px;background:linear-gradient(135deg,#1c0814,#0d0d0d);border:1px solid #2a1a28;border-radius:22px;margin-bottom:28px;box-shadow:0 20px 50px rgba(0,0,0,0.5);">
  <div style="font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#3a2030;margin-bottom:8px;">Couples Compatibility Report</div>
  <h1 style="font-family:Georgia,serif;font-size:2.4rem;font-weight:normal;color:#e8cdd8;margin-bottom:6px;">
    ${n1} <span style="color:#c9446a;font-style:italic;">&amp;</span> ${n2}
  </h1>
  <div style="font-size:13px;color:#3a2030;margin-top:6px;letter-spacing:1px;">Generated ${now} &middot; ${WM_QUESTIONS.length} questions</div>
  <div style="margin-top:22px;">
    <div style="font-size:3rem;margin-bottom:6px;">${scoreEmoji}</div>
    <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#3a2030;margin-bottom:6px;">Compatibility Score</div>
    <div style="font-family:Georgia,serif;font-size:4rem;font-weight:bold;
      background:linear-gradient(135deg,#c084fc,#f9a8d4,#facc15);
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1.1;">
      ${score}%
    </div>
    <div style="color:#6a3a50;font-size:16px;font-style:italic;margin-top:10px;line-height:1.6;">${scoreMsg}</div>
  </div>
  <!-- Summary pills -->
  <div style="display:flex;justify-content:center;gap:12px;margin-top:22px;flex-wrap:wrap;">
    <div style="background:rgba(74,222,128,0.1);border:1px solid rgba(74,222,128,0.3);border-radius:50px;padding:6px 20px;font-size:14px;color:#4ade80;">♥ ${totalYes} Both Yes</div>
    <div style="background:rgba(250,204,21,0.1);border:1px solid rgba(250,204,21,0.3);border-radius:50px;padding:6px 20px;font-size:14px;color:#facc15;">✦ ${totalMaybe} Maybe</div>
    <div style="background:rgba(244,63,94,0.1);border:1px solid rgba(244,63,94,0.3);border-radius:50px;padding:6px 20px;font-size:14px;color:#f43f5e;">✕ ${totalNo} Not Yet</div>
  </div>
</div>

<!-- Per-category sections -->
<div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#3a2030;margin-bottom:18px;text-align:center;">Preferences by Category</div>

${allCatSections}

<!-- Footer -->
<div style="text-align:center;padding:22px 0 0;font-size:13px;color:#2a1020;font-style:italic;">
  We Match? &middot; Couples Compatibility Quiz &middot; ${now}
</div>

</body>
</html>`;

  return html;
}

function wmDownloadReport(n1, n2, ans1, ans2, score) {
  const html = wmGenerateReport(n1, n2, ans1, ans2, score);
  const blob = new Blob([html], { type:"text/html;charset=utf-8" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `WeMatch-${n1.replace(/\s+/g,"")}-${n2.replace(/\s+/g,"")}.html`;
  document.body.appendChild(a);
  a.click();
  setTimeout(()=>{ URL.revokeObjectURL(url); document.body.removeChild(a); }, 1000);
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
    if (isP2) setAns2(prev=>({...prev,[idx]:val}));
    else      setAns1(prev=>({...prev,[idx]:val}));
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
    const isP2   = phase==="quiz2";
    const ans    = isP2 ? ans2 : ans1;
    const name   = isP2 ? n2   : n1;
    const accent = isP2 ? "#f59e0b" : "#c9446a";
    const done   = allDone(ans);
    const count  = answeredCount(ans);

    // Group questions by category for display with dividers
    const catsSeen = [];
    const renderedQs = WM_QUESTIONS.map((item,i)=>{
      const a   = ans[i];
      const isNewCat = !catsSeen.includes(item.cat);
      if (isNewCat) catsSeen.push(item.cat);
      const cat = WM_CATS[item.cat];
      return (
        <React.Fragment key={i}>
          {isNewCat && (
            <div className="wm-cat-header">{cat.emoji} {cat.label}</div>
          )}
          <div className={`wm-qcard${a?` wm-${a}`:""}`}
            style={{background:"#0e0810",borderRadius:"12px",padding:"11px 12px",display:"flex",alignItems:"center",gap:"10px",borderLeft:"3px solid #1a0814"}}>
            <span style={{fontFamily:"Georgia,serif",fontSize:"1rem",color:"#2a1020",minWidth:"26px",textAlign:"center",flexShrink:0,fontWeight:"bold"}}>{i+1}</span>
            <span style={{flex:1,fontSize:"14px",color:"#c8a8b8",lineHeight:1.5}}>{item.q}</span>
            <div style={{display:"flex",gap:"5px",flexShrink:0}}>
              <button className={`wm-btn${a==="yes"?" wm-sel-yes":""}`}   onClick={()=>setAnswer(i,"yes",isP2)}>Yes</button>
              <button className={`wm-btn${a==="maybe"?" wm-sel-maybe":""}`} onClick={()=>setAnswer(i,"maybe",isP2)}>Maybe</button>
              <button className={`wm-btn${a==="no"?" wm-sel-no":""}`}     onClick={()=>setAnswer(i,"no",isP2)}>No</button>
            </div>
          </div>
        </React.Fragment>
      );
    });

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
        <div style={{display:"flex",flexDirection:"column",gap:"6px",marginBottom:"20px"}}>
          {renderedQs}
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
    WM_QUESTIONS.forEach((item,i)=>{
      const a1=ans1[i], a2=ans2[i];
      if(a1==="no"||a2==="no")        noItems.push(item.q);
      else if(a1==="yes"&&a2==="yes") yesItems.push(item.q);
      else                             maybeItems.push(item.q);
    });

    const score      = Math.round((yesItems.length / WM_QUESTIONS.length)*100);
    const scoreEmoji = score>=80?"🔥":score>=60?"💋":score>=40?"💫":score>=20?"🌱":"💬";
    const scoreMsg   = score>=80?"Incredibly compatible — you two are on fire!"
                     : score>=60?"Great chemistry with room to explore together"
                     : score>=40?"A solid foundation — keep talking and discovering"
                     : score>=20?"Differences are opportunities — explore with curiosity"
                     : "Every journey starts somewhere — keep the conversation open";

    const groups = wmGroupByCategory(ans1, ans2);

    // In-app category sections
    const CatSection = ({catKey}) => {
      const cat   = WM_CATS[catKey];
      const items = groups[catKey];
      if (!items.length) return null;
      const catYes   = items.filter(({a1,a2})=>a1==="yes"&&a2==="yes").length;
      const catMaybe = items.filter(({a1,a2})=>!(a1==="yes"&&a2==="yes")&&a1!=="no"&&a2!=="no").length;
      const catNo    = items.filter(({a1,a2})=>a1==="no"||a2==="no").length;

      return (
        <div style={{marginBottom:"16px"}}>
          {/* Category header */}
          <div style={{display:"flex",alignItems:"center",gap:"10px",padding:"12px 14px",background:"linear-gradient(135deg,#1c0814,#110a0e)",border:`1px solid ${cat.colour}44`,borderRadius:"14px 14px 0 0",borderBottom:"none"}}>
            <div style={{width:"38px",height:"38px",borderRadius:"9px",background:`${cat.colour}18`,border:`1px solid ${cat.colour}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px",flexShrink:0}}>{cat.emoji}</div>
            <div style={{flex:1}}>
              <div style={{fontFamily:"Georgia,serif",fontSize:"1.1rem",color:cat.colour}}>{cat.label}</div>
              <div style={{fontSize:"11px",color:"#4a2040",marginTop:"1px"}}>{items.length} question{items.length!==1?"s":""}</div>
            </div>
            <div style={{display:"flex",gap:"7px",flexShrink:0}}>
              {catYes>0   && <span style={{background:"rgba(74,222,128,0.12)",border:"1px solid rgba(74,222,128,0.25)",color:"#4ade80",borderRadius:"50px",padding:"2px 9px",fontSize:"11px",fontWeight:"700"}}>♥ {catYes}</span>}
              {catMaybe>0 && <span style={{background:"rgba(250,204,21,0.12)",border:"1px solid rgba(250,204,21,0.25)",color:"#facc15",borderRadius:"50px",padding:"2px 9px",fontSize:"11px",fontWeight:"700"}}>✦ {catMaybe}</span>}
              {catNo>0    && <span style={{background:"rgba(244,63,94,0.12)",border:"1px solid rgba(244,63,94,0.25)",color:"#f43f5e",borderRadius:"50px",padding:"2px 9px",fontSize:"11px",fontWeight:"700"}}>✕ {catNo}</span>}
            </div>
          </div>
          {/* Questions */}
          <div style={{border:`1px solid ${cat.colour}33`,borderTop:"none",borderRadius:"0 0 14px 14px",overflow:"hidden"}}>
            {items.map(({q,i,a1,a2},idx)=>{
              const bothYes=a1==="yes"&&a2==="yes", anyNo=a1==="no"||a2==="no";
              const rowBg=bothYes?"rgba(74,222,128,0.06)":anyNo?"rgba(244,63,94,0.04)":"rgba(250,204,21,0.03)";
              const dot=bothYes?"#4ade80":anyNo?"#f43f5e":"#facc15";
              function AB(a){
                if(a==="yes")   return <span style={{background:"#4ade80",color:"#052010",padding:"2px 10px",borderRadius:"50px",fontSize:"12px",fontWeight:"700",display:"inline-block"}}>Yes</span>;
                if(a==="maybe") return <span style={{background:"#facc15",color:"#1a1000",padding:"2px 10px",borderRadius:"50px",fontSize:"12px",fontWeight:"700",display:"inline-block"}}>Maybe</span>;
                if(a==="no")    return <span style={{background:"#f43f5e",color:"#fff",padding:"2px 10px",borderRadius:"50px",fontSize:"12px",fontWeight:"700",display:"inline-block"}}>No</span>;
                return <span style={{color:"#3a2030"}}>—</span>;
              }
              return (
                <div key={i} style={{background:rowBg,borderBottom:idx<items.length-1?`1px solid ${cat.colour}15`:"none",display:"flex",alignItems:"center",gap:"8px",padding:"10px 12px"}}>
                  <span style={{display:"inline-block",width:"8px",height:"8px",borderRadius:"50%",background:dot,flexShrink:0}}/>
                  <span style={{flex:1,fontSize:"13px",color:"#c8a8b8",lineHeight:1.4}}>{i+1}. {q}</span>
                  <div style={{display:"flex",gap:"6px",flexShrink:0,alignItems:"center"}}>
                    <div style={{textAlign:"center"}}>
                      <div style={{fontSize:"9px",color:"#3a2030",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:"2px"}}>{n1}</div>
                      {AB(a1)}
                    </div>
                    <div style={{textAlign:"center"}}>
                      <div style={{fontSize:"9px",color:"#3a2030",letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:"2px"}}>{n2}</div>
                      {AB(a2)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    };

    return (
      <div style={{animation:"fadeUp .35s ease",maxWidth:"520px",width:"100%"}}>
        <Header/>

        {/* Score banner */}
        <div style={{textAlign:"center",marginBottom:"24px",background:"linear-gradient(135deg,#1c0814,#0d0d0d)",border:"1px solid #2a1a28",borderRadius:"20px",padding:"24px 18px",boxShadow:"0 20px 50px rgba(0,0,0,0.5)"}}>
          <div style={{fontSize:"3rem",marginBottom:"6px"}}>{scoreEmoji}</div>
          <div style={{fontFamily:"Georgia,serif",fontSize:"1.5rem",color:"#e8cdd8",marginBottom:"4px"}}>
            {n1} <span style={{color:"#c9446a",fontStyle:"italic"}}>&amp;</span> {n2}
          </div>
          <div style={{fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",color:"#3a2030",margin:"10px 0 6px"}}>Compatibility Score</div>
          <div style={{fontFamily:"Georgia,serif",fontSize:"3rem",fontWeight:"bold",
            background:"linear-gradient(135deg,#c084fc,#f9a8d4,#facc15)",
            WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",lineHeight:1}}>
            {score}%
          </div>
          <div style={{color:"#6a3a50",fontSize:"14px",fontFamily:"Georgia,serif",fontStyle:"italic",marginTop:"8px",lineHeight:1.5}}>{scoreMsg}</div>
          <div style={{display:"flex",justifyContent:"center",gap:"10px",marginTop:"16px",flexWrap:"wrap"}}>
            <span style={{background:"rgba(74,222,128,0.1)",border:"1px solid rgba(74,222,128,0.3)",color:"#4ade80",borderRadius:"50px",padding:"4px 14px",fontSize:"12px"}}>♥ {yesItems.length} Both Yes</span>
            <span style={{background:"rgba(250,204,21,0.1)",border:"1px solid rgba(250,204,21,0.3)",color:"#facc15",borderRadius:"50px",padding:"4px 14px",fontSize:"12px"}}>✦ {maybeItems.length} Maybe</span>
            <span style={{background:"rgba(244,63,94,0.1)",border:"1px solid rgba(244,63,94,0.3)",color:"#f43f5e",borderRadius:"50px",padding:"4px 14px",fontSize:"12px"}}>✕ {noItems.length} Not Yet</span>
          </div>
        </div>

        {/* Category label */}
        <div style={{fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",color:"#3a2030",textAlign:"center",marginBottom:"14px"}}>— Preferences by Category —</div>

        {/* Category sections */}
        {Object.keys(WM_CATS).map(k => <CatSection key={k} catKey={k}/>)}

        {/* Download + restart */}
        <button className="wm-dl-btn"
          onClick={()=>wmDownloadReport(n1,n2,ans1,ans2,score)}>
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
