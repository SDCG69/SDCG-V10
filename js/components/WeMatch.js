// ── We Match? — Couples Compatibility Quiz ───────────────────────────────────

const WM_STYLE_ID = "we-match-styles";

function injectWMStyles() {
  if (document.getElementById(WM_STYLE_ID)) return;
  const s = document.createElement("style");
  s.id = WM_STYLE_ID;
  s.textContent = `
    /* ── Q-card answer states ── */
    .wm-qcard { transition:border-color .18s, background .18s; }
    .wm-qcard.wm-yes   { border-left-color:#4ade80!important; background:rgba(74,222,128,0.06)!important; }
    .wm-qcard.wm-maybe { border-left-color:#facc15!important; background:rgba(250,204,21,0.06)!important; }
    .wm-qcard.wm-no    { border-left-color:#f43f5e!important; background:rgba(244,63,94,0.06)!important; }

    /* ── Answer buttons ── */
    .wm-btn { border:2px solid #2a1a28; border-radius:9px; padding:.38rem .7rem; font-family:inherit; font-size:.8rem; font-weight:600; cursor:pointer; background:#1a0814; color:#4a2a40; transition:all .14s; flex-shrink:0; }
    .wm-btn:hover { filter:brightness(1.2); }
    .wm-btn.wm-sel-yes   { background:#4ade80; border-color:#4ade80; color:#052010; transform:scale(1.06); }
    .wm-btn.wm-sel-maybe { background:#facc15; border-color:#facc15; color:#1a1000; transform:scale(1.06); }
    .wm-btn.wm-sel-no    { background:#f43f5e; border-color:#f43f5e; color:#fff;    transform:scale(1.06); }

    /* ── Progress bar ── */
    .wm-progress-fill { height:100%; border-radius:50px; transition:width .4s ease; background:linear-gradient(90deg,#7b3fa8,#c9446a); }

    /* ── Result items ── */
    @keyframes wmFadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
    .wm-result-item { animation:wmFadeUp .3s ease both; }

    /* ── Input focus ── */
    .wm-input:focus { border-color:#c9446a!important; box-shadow:0 0 0 3px rgba(201,68,106,0.2)!important; outline:none; }
  `;
  document.head.appendChild(s);
}

// ── Questions ─────────────────────────────────────────────────────────────────

const WM_QUESTIONS = [
  "Do you enjoy trying new positions regularly?",
  "Would you be comfortable using toys together?",
  "Would you be willing to try new toys?",
  "Do you like giving/receiving oral sex?",
  "Would you watch adult content (porno videos) together?",
  "Are you open to role play scenarios?",
  "Do you enjoy extended foreplay before sex?",
  "Would you try light bondage with loose restraints?",
  "Would you try hard bondage with tight restriants?",
  "Do you like sending/receiving flirty or explicit text messages?",
  "Do you like sending/receiving explicit images (Dick/Pussy Pics)?",
  "Would you have sex somewhere you might be caught?",
  "Do you enjoy talking dirty during sex?",
  "Are you open to introducing food or props?",
  "Would you try a blindfold experience?",
  "Would you be open to a threesome?",
  "Do you enjoy spontaneous sex — no planning?",
  "Would you spend a full day exploring each other?",
  "Are you open to recording yourselves intimately?",
  "Do you enjoy teasing and being teased?",
  "Would you be open to your partner licking your ass?",
  "Would you be open to licking your partner's ass?",
  "Would you try sensory play (ice, feathers, heat)?",
  "Do you like giving full-body massages?",
  "Would you explore a fantasy you haven't shared yet?",
  "Are you happy to discuss your sexual boundaries openly?",
  "Would you try a couples' spa or intimate retreat?",
  "Do you enjoy physical affection outside the bedroom?",
  "Would you take turns being in full control?",
  "Would you be open to your partner fingering your ass?",
  "Would you be open to fingering your partner's ass?",
  "Would you be open to trying full anal intercourse?",
  "Do you enjoy being spanked or whipped?",
  "Do you enjoy spanking or whipping your partner?",
  "Are you open to learning what your partner secretly craves?",
  "Do you want to do this quiz again in 6 months?",
];

// ── Component ─────────────────────────────────────────────────────────────────

function WeMatchScreen({ onBack }) {
  injectWMStyles();

  const [phase, setPhase]     = useState("welcome"); // welcome | quiz1 | quiz2 | results
  const [name1, setName1]     = useState("");
  const [name2, setName2]     = useState("");
  const [ans1,  setAns1]      = useState({});
  const [ans2,  setAns2]      = useState({});

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

  // ── Header ────────────────────────────────────────────────────────────────

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
        <div style={{fontSize:"2rem",letterSpacing:"0.4rem",marginBottom:"8px",
          animation:"wm-pulse 2.2s ease-in-out infinite"}}>♥ ♡ ♥</div>
        <style>{`@keyframes wm-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.09)}}`}</style>
        <p style={{color:"#6a3a50",fontSize:"13px",fontFamily:"Georgia,serif",fontStyle:"italic",lineHeight:1.6}}>
          A playful compatibility quiz for two.<br/>Answer honestly — the results might surprise you!
        </p>
      </div>

      <div style={{background:"linear-gradient(135deg,#1c0814,#0d0d0d)",border:"1px solid #2a1a28",borderRadius:"20px",padding:"22px 18px",width:"100%",boxShadow:"0 20px 50px rgba(0,0,0,0.5)",marginBottom:"20px"}}>
        <div style={{fontSize:"10px",letterSpacing:"0.16em",textTransform:"uppercase",color:"#3a2030",marginBottom:"12px"}}>Enter your names</div>
        {[{label:"Person 1",val:name1,set:setName1},{label:"Person 2",val:name2,set:setName2}].map(({label,val,set},i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:i===0?"12px":0}}>
            <span style={{fontFamily:"Georgia,serif",fontSize:"13px",color:"#c9446a",fontStyle:"italic",minWidth:"68px",flexShrink:0}}>{label}</span>
            <input
              type="text" maxLength={30} value={val} placeholder={`Enter name…`}
              onChange={e=>set(e.target.value)}
              className="wm-input"
              style={{flex:1,background:"#0e0810",border:"1.5px solid #2a1a28",borderRadius:"10px",color:"#e8cdd8",fontFamily:"inherit",fontSize:"14px",padding:"8px 12px",transition:"border-color .2s, box-shadow .2s"}}
            />
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

        {/* Player badge + progress */}
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

        {/* Questions */}
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

        {/* Continue button */}
        <button
          disabled={!done}
          onClick={()=>{ if(!done)return; isP2?setPhase("results"):setPhase("quiz2"); window.scrollTo({top:0,behavior:"smooth"}); }}
          style={{width:"100%",padding:"14px",borderRadius:"50px",border:"none",cursor:done?"pointer":"not-allowed",fontFamily:"Georgia,serif",fontSize:"1rem",fontWeight:"bold",color:"#fff",transition:"all .2s",
            background:done?`linear-gradient(135deg,${isP2?"#f59e0b,#facc15":"#7b3fa8,#c9446a"})`:"#1a0814",
            opacity:done?1:0.4,
            boxShadow:done?`0 4px 20px ${isP2?"rgba(245,158,11,0.4)":"rgba(201,68,106,0.4)"}`:""
          }}>
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
      if(a1==="no"||a2==="no")       noItems.push(q);
      else if(a1==="yes"&&a2==="yes") yesItems.push(q);
      else                            maybeItems.push(q);
    });

    const Section = ({title,subtitle,icon,items,itemCls,accentColor,bgColor,countColor,emptyText})=>(
      <div style={{background:"linear-gradient(135deg,#1c0814,#0d0d0d)",border:`1px solid ${accentColor}33`,borderRadius:"18px",padding:"18px",marginBottom:"12px",boxShadow:"0 4px 24px rgba(0,0,0,0.4)"}}>
        <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px",paddingBottom:"10px",borderBottom:`1px solid ${accentColor}22`}}>
          <div style={{width:"36px",height:"36px",borderRadius:"10px",background:bgColor,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1rem",flexShrink:0}}>{icon}</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:"Georgia,serif",fontSize:"1rem",color:accentColor,fontWeight:"normal"}}>{title}</div>
            <div style={{fontSize:"11px",color:"#4a2040",marginTop:"2px"}}>{subtitle}</div>
          </div>
          <div style={{fontFamily:"Georgia,serif",fontSize:"1.8rem",color:accentColor,opacity:0.4,fontWeight:"bold"}}>{items.length}</div>
        </div>
        {items.length===0?(
          <div style={{color:"#3a2030",fontSize:"13px",fontStyle:"italic",textAlign:"center",padding:"4px 0"}}>{emptyText}</div>
        ):(
          <div style={{display:"flex",flexDirection:"column",gap:"0"}}>
            {items.map((q,idx)=>(
              <div key={idx} className="wm-result-item" style={{display:"flex",alignItems:"center",gap:"8px",padding:"8px 0",borderBottom:`1px solid ${accentColor}15`,fontSize:"13px",color:"#c8a8b8",lineHeight:1.4,animationDelay:`${idx*0.04}s`}}>
                <span style={{color:accentColor,fontSize:"10px",flexShrink:0}}>{itemCls==="wm-yes-item"?"♥":itemCls==="wm-maybe-item"?"✦":"✕"}</span>
                {q}
              </div>
            ))}
          </div>
        )}
      </div>
    );

    // Compatibility score
    const score = Math.round((yesItems.length / WM_QUESTIONS.length)*100);
    const scoreEmoji = score>=80?"🔥":score>=60?"💋":score>=40?"💫":"🌱";
    const scoreMsg   = score>=80?"Incredibly compatible — you two are on fire!":score>=60?"Great chemistry with room to explore together":score>=40?"A solid foundation — keep talking and discovering":score>=20?"Differences are opportunities — explore with curiosity":"Every journey starts somewhere — keep the conversation open";

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
          accentColor="#4ade80" bgColor="rgba(74,222,128,0.12)" countColor="rgba(74,222,128,0.35)"
          emptyText="Nothing here yet — keep exploring!"/>
        <Section title="Maybe — Worth Exploring" subtitle="At least one said Maybe, neither said No"
          icon="✦" items={maybeItems} itemCls="wm-maybe-item"
          accentColor="#facc15" bgColor="rgba(250,204,21,0.12)" countColor="rgba(250,204,21,0.3)"
          emptyText="No maybes — you're decisive!"/>
        <Section title="Not for You — At Least for Now" subtitle="At least one of you said No"
          icon="✕" items={noItems} itemCls="wm-no-item"
          accentColor="#f43f5e" bgColor="rgba(244,63,94,0.12)" countColor="rgba(244,63,94,0.25)"
          emptyText="No hard nos — impressive openness!"/>

        <button onClick={restart}
          style={{width:"100%",background:"transparent",color:"#c9446a",border:"2px solid #c9446a",borderRadius:"50px",padding:"12px",fontFamily:"Georgia,serif",fontSize:"1rem",cursor:"pointer",marginTop:"8px",marginBottom:"32px",transition:"all .2s"}}
          onMouseOver={e=>{e.target.style.background="#c9446a";e.target.style.color="#fff";}}
          onMouseOut={e=>{e.target.style.background="transparent";e.target.style.color="#c9446a";}}>
          ↺ Start Over
        </button>
      </div>
    );
  }

  return null;
}
