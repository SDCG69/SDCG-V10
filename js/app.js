function App(){
  const [screen,setScreen]=useState("setup");
  const [players,setPlayers]=useState([{name:"Player 1",mode:"Male"},{name:"Player 2",mode:"Female"}]);
  const [disabled,setDisabled]=useState(new Set());
  const [mFilter,setMFilter]=useState("Male");
  const [lFilter,setLFilter]=useState(1);
  const [current,setCurrent]=useState(0);
  const [level,setLevel]=useState(1);
  const [queues,setQueues]=useState(null);
  const [pos,setPos]=useState(null);
  const [card,setCard]=useState(null);
  const [flipped,setFlipped]=useState(false);
  const [exhausted,setExhausted]=useState(false);

  // Timer state
  const [timerTotal,setTimerTotal]=useState(null);
  const [timeLeft,setTimeLeft]=useState(null);
  const [timerOn,setTimerOn]=useState(false);
  const [timerDone,setTimerDone]=useState(false);
  const intervalRef=useRef(null);

  // Dice state
  const [diceResult,setDiceResult]=useState(null);
  const [diceRolling,setDiceRolling]=useState(false);

  // Coin flip state
  const [coinResult,setCoinResult]=useState(null); // null | 'heads' | 'tails'
  const [coinFlipping,setCoinFlipping]=useState(false);

  // Position state
  const [posIdx,setPosIdx]=useState(null);
  const [posVidErr,setPosVidErr]=useState(false);
  const [posMode,setPosMode]=useState("couples"); // "couples" | "threesomes" | "foursomes"
  const [posQueue,setPosQueue]=useState([]);      // shuffled index queue for current category
  const [posQueueIdx,setPosQueueIdx]=useState(0); // current position within that queue

	// Truth card state
	const [truthCard,setTruthCard]=useState(null);
	const [usedTruthCards,setUsedTruthCards]=useState([]);

  // Sex Handbook A-Z state
  const [handbookItem,setHandbookItem]=useState(null);

  // Erotica Fiction state
  const [eroticaItem,setEroticaItem]=useState(null);
  const [libraryLoading,setLibraryLoading]=useState(false);
  const [libraryError,setLibraryError]=useState("");

  // Content warning state — holds the destination screen or null when not shown
  const [contentWarning,setContentWarning]=useState(null);
  function showContentWarning(dest){ setContentWarning(dest); }
  function acceptContentWarning(){ setScreen(contentWarning); setContentWarning(null); }
  function declineContentWarning(){ setContentWarning(null); }

  // Tag preferences – one object per player; all tags accepted by default
  const mkDefaultTagPrefs=()=>[0,1].map(()=>Object.fromEntries(TAGS.map(t=>[t.id,true])));
  const [tagPrefs,setTagPrefs]=useState(mkDefaultTagPrefs);

  // Item preferences – shared single object; all items available by default
  const mkDefaultItemPrefs=()=>Object.fromEntries(ITEM_TAGS.map(t=>[t.id,true]));
  const [itemPrefs,setItemPrefs]=useState(mkDefaultItemPrefs);

  async function openHandbookItem(item){
    setLibraryError("");
    setHandbookItem({...item,sections:item.sections||[]});
    setScreen("handbookDetail");
    setLibraryLoading(true);

    try{
      const sections=await loadLibraryItemContent(item);
      setHandbookItem({...item,sections});
    }catch(err){
      console.error("Handbook content failed to load:",err);
      setLibraryError(err.message||"Could not load this text file.");
    }finally{
      setLibraryLoading(false);
    }
  }

  async function openEroticaItem(item){
    setLibraryError("");
    setEroticaItem({...item,sections:item.sections||[]});
    setScreen("eroticaDetail");
    setLibraryLoading(true);

    try{
      const sections=await loadLibraryItemContent(item);
      setEroticaItem({...item,sections});
    }catch(err){
      console.error("Fiction content failed to load:",err);
      setLibraryError(err.message||"Could not load this text file.");
    }finally{
      setLibraryLoading(false);
    }
  }

  // Countdown tick
  useEffect(()=>{
    clearInterval(intervalRef.current);
    if(timerOn && timeLeft > 0){
      intervalRef.current=setInterval(()=>{
        setTimeLeft(t=>{
          if(t<=1){
            clearInterval(intervalRef.current);
            setTimerOn(false);
            setTimerDone(true);
            playChime();
            return 0;
          }
          return t-1;
        });
      },1000);
    }
    return ()=>clearInterval(intervalRef.current);
  },[timerOn]);

  function clearTimer(){
    clearInterval(intervalRef.current);
    setTimerOn(false);setTimerDone(false);setTimeLeft(null);setTimerTotal(null);
  }
  function skipTimer(){
    clearInterval(intervalRef.current);
    setTimerOn(false);setTimerDone(true);setTimeLeft(0);
  }
  function rollDice(){
    if(diceRolling)return;
    setDiceRolling(true);
    setDiceResult(null);
    setTimeout(()=>{
      setDiceResult(Math.floor(Math.random()*6)+1);
      setDiceRolling(false);
    },750);
  }
  function flipCoin(){
    if(coinFlipping)return;
    setCoinFlipping(true);
    setCoinResult(null);
    setTimeout(()=>{
      setCoinResult(Math.random()<0.5?'heads':'tails');
      setCoinFlipping(false);
    },900);
  }
  function getPosArray(){
    if(posMode==="threesomes") return THREESOME_POSITIONS;
    if(posMode==="foursomes") return FOURSOME_POSITIONS;
    return POSITIONS;
  }
  // Build a fresh Fisher-Yates shuffled index array for the given length
  function buildShuffledQueue(len){
    const arr=Array.from({length:len},(_,i)=>i);
    for(let i=arr.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [arr[i],arr[j]]=[arr[j],arr[i]];
    }
    return arr;
  }
  function openPosition(){
    setScreen("positionSelect");
  }
  function startPosition(){
    const arr=getPosArray();
    const q=buildShuffledQueue(arr.length);
    setPosQueue(q);
    setPosQueueIdx(0);
    setPosIdx(q[0]);
    setPosVidErr(false);
    setScreen("position");
  }
  function nextPosition(){
    const arr=getPosArray();
    const nextQi=posQueueIdx+1;
    if(nextQi>=arr.length){
      // All positions shown — reshuffle and start a new cycle
      const q=buildShuffledQueue(arr.length);
      setPosQueue(q);
      setPosQueueIdx(0);
      setPosIdx(q[0]);
    } else {
      setPosQueueIdx(nextQi);
      setPosIdx(posQueue[nextQi]);
    }
    setPosVidErr(false);
  }
	
	function openTruthCards(){
	  const randomIndex = Math.floor(Math.random() * TRUTH_QUESTIONS.length);

	  setUsedTruthCards([randomIndex]);
	  setTruthCard(TRUTH_QUESTIONS[randomIndex]);
	  setScreen("truth");
	}

	function nextTruthCard(){
	  setUsedTruthCards(prevUsed => {

	    // If all cards have been used, restart deck
	    if(prevUsed.length >= TRUTH_QUESTIONS.length){
	      const randomIndex = Math.floor(Math.random() * TRUTH_QUESTIONS.length);

	      setTruthCard(TRUTH_QUESTIONS[randomIndex]);
	      return [randomIndex];
	    }

	    let randomIndex;

	    do{
	      randomIndex = Math.floor(Math.random() * TRUTH_QUESTIONS.length);
	    } while(prevUsed.includes(randomIndex));

	    setTruthCard(TRUTH_QUESTIONS[randomIndex]);

	    return [...prevUsed, randomIndex];
	  });
	}

  const pl=players[current],ms=MODE[pl.mode]||MODE.Male,lv=LEVELS[level-1];
  const inputBase={background:"#111",border:"1px solid #333",borderRadius:"8px",color:"#eee",fontFamily:"inherit",fontSize:"14px",padding:"9px 12px",outline:"none",boxSizing:"border-box",width:"100%",WebkitAppearance:"none"};

  const toggleChallenge=k=>setDisabled(d=>{const n=new Set(d);n.has(k)?n.delete(k):n.add(k);return n;});
  const toggleAll=(mode,lvl,enable)=>{const chs=CHALLENGES[mode][lvl]||[];setDisabled(d=>{const n=new Set(d);chs.forEach(c=>enable?n.delete(ckey(mode,lvl,c.text)):n.add(ckey(mode,lvl,c.text)));return n;});};
  const enableAll=()=>setDisabled(new Set());
  const disableAll=()=>setDisabled(new Set(ALL_KEYS));
  const manageChallenges=CHALLENGES[mFilter][lFilter]||[];
  const allOn=manageChallenges.every(c=>!disabled.has(ckey(mFilter,lFilter,c.text)));
  const allOff=manageChallenges.every(c=>disabled.has(ckey(mFilter,lFilter,c.text)));
  const totalEnabled=ALL_KEYS.size-disabled.size;

  function startGame(){
    // Reset tag prefs to all-accepted each time Start Game is pressed
    setTagPrefs(mkDefaultTagPrefs());
    setItemPrefs(mkDefaultItemPrefs());
    setScreen("tags");
  }
  function confirmTags(prefs){
    const q=buildQueues(players,disabled,prefs,itemPrefs);
    const p=[0,1].map(()=>{const o={};LEVELS.forEach(l=>o[l.id]=0);return o;});
    setQueues(q);setPos(p);setCurrent(0);setLevel(1);setCard(null);setExhausted(false);setFlipped(false);clearTimer();setScreen("game");
  }
  function changeLevel(l){
    setLevel(l);setCard(null);setExhausted(false);clearTimer();
    if(screen==="card")setScreen("game");
  }
  function drawCard(){
    const q=queues[current][level],idx=pos[current][level];
    if(idx>=q.length){setExhausted(true);return;}
    setExhausted(false);
    const picked=q[idx];
    const dur=parseTimer(picked.text);
    setCard(picked);
    setTimerTotal(dur);setTimeLeft(dur);setTimerOn(false);setTimerDone(false);
    setDiceResult(null);setDiceRolling(false);
    setCoinResult(null);setCoinFlipping(false);
    setFlipped(false);
    setTimeout(()=>{
      setFlipped(true);
      if(dur) setTimerOn(true);
    },400);
    setScreen("card");
  }
  function handleNext(){
    clearTimer();
    setPos(prev=>{const n=prev.map(p=>({...p}));n[current][level]++;return n;});
    setCurrent(c=>1-c);setCard(null);setExhausted(false);setScreen("game");setFlipped(false);
  }
  function goBack(){clearTimer();setScreen("game");}
  function resetCards(){
    const q=buildQueues(players,disabled,tagPrefs,itemPrefs);
    const p=[0,1].map(()=>{const o={};LEVELS.forEach(l=>o[l.id]=0);return o;});
    setQueues(q);setPos(p);setCard(null);setExhausted(false);clearTimer();setScreen("game");
  }
  function remaining(pi,lvlId){if(!queues||!pos)return 0;return queues[pi][lvlId].length-pos[pi][lvlId];}

  // Ring calc
  const ringOffset=timerTotal&&timeLeft!=null ? RING_C*(timeLeft/timerTotal) : RING_C;
  const ringColor=(()=>{
    if(timerDone||!timerTotal)return"#444";
    const pct=timeLeft/timerTotal;
    if(pct>0.5)return ms.color;
    if(pct>0.2)return"#c87a00";
    return"#c83030";
  })();

  return (
    <div style={{minHeight:"100vh",background:"#080808",fontFamily:"'Georgia',serif",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-start",padding:"20px 16px",position:"relative",overflow:"hidden"}}>
      <style>{`
        @keyframes flipIn{0%{transform:rotateY(80deg) scale(.95);opacity:0}100%{transform:rotateY(0) scale(1);opacity:1}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.03)}}
        @keyframes timesUp{0%,100%{opacity:1}50%{opacity:0.25}}
        @keyframes diceShake{0%{transform:rotate(0deg) scale(1)}15%{transform:rotate(-18deg) scale(1.15)}30%{transform:rotate(14deg) scale(1.1)}45%{transform:rotate(-10deg) scale(1.12)}60%{transform:rotate(8deg) scale(1.08)}75%{transform:rotate(-4deg) scale(1.05)}90%{transform:rotate(2deg) scale(1.02)}100%{transform:rotate(0deg) scale(1)}}
        @keyframes dicePop{0%{transform:scale(0.7);opacity:0}60%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}
        .dice-btn{cursor:pointer;background:none;border:none;padding:0;-webkit-tap-highlight-color:transparent;border-radius:14px;}
        .dice-btn:active{transform:scale(0.94)}
        @keyframes coinFlipAnim{0%{transform:scaleX(1)}12%{transform:scaleX(0.05)}25%{transform:scaleX(1)}37%{transform:scaleX(0.05)}50%{transform:scaleX(1)}62%{transform:scaleX(0.05)}75%{transform:scaleX(1)}87%{transform:scaleX(0.05)}100%{transform:scaleX(1)}}
        @keyframes coinPop{0%{transform:scale(0.5);opacity:0}65%{transform:scale(1.22)}100%{transform:scale(1);opacity:1}}
        .coin-btn{cursor:pointer;background:none;border:none;padding:0;-webkit-tap-highlight-color:transparent;border-radius:50%;}
        .coin-btn:active{transform:scale(0.93)}
        .btn{cursor:pointer;border:none;border-radius:12px;font-family:inherit;font-weight:bold;transition:transform .15s,box-shadow .15s;-webkit-tap-highlight-color:transparent}
        .btn:active{transform:scale(0.97)}
        .pill{cursor:pointer;border-radius:20px;font-family:inherit;font-size:12px;font-weight:bold;padding:6px 13px;transition:all .18s;border:1.5px solid transparent;-webkit-tap-highlight-color:transparent}
        .tog{cursor:pointer;border-radius:8px;font-family:inherit;font-size:12px;padding:5px 11px;border:1.5px solid transparent;transition:all .18s;font-weight:bold;-webkit-tap-highlight-color:transparent}
        input:focus{border-color:#555!important;outline:none}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#111}::-webkit-scrollbar-thumb{background:#2a2a2a;border-radius:2px}
      `}</style>

      {/* ══ SETUP ══ */}
      {screen==="setup"&&(
        <div style={{animation:"fadeUp .4s ease",maxWidth:"480px",width:"100%",textAlign:"center"}}>
          <div style={{fontSize:"48px",marginBottom:"6px"}}>😈</div>
          <h1 style={{color:"#eee",fontSize:"2rem",margin:"0 0 4px"}}>Sex Dares Challege Game</h1>
          <p style={{color:"#555",marginBottom:"26px",fontSize:"14px"}}>A Two Player Sex Dares Challenge Game</p>
          <div style={{background:"#111",borderRadius:"14px",padding:"20px",marginBottom:"12px",border:"1px solid #1e1e1e"}}>
            <p style={{color:"#666",margin:"0 0 14px",fontSize:"12px",letterSpacing:"1px",textTransform:"uppercase"}}>Players</p>
            {[0,1].map(i=>{const p=players[i];return(
              <div key={i} style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:i===0?"10px":0}}>
                <div style={{width:"28px",height:"28px",borderRadius:"50%",background:P_COLORS[i],display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:"bold",color:"#080808",flexShrink:0}}>{i+1}</div>
                <input value={p.name} placeholder={`Player ${i+1}`} style={inputBase} onChange={e=>{const a=[...players];a[i]={...a[i],name:e.target.value};setPlayers(a);}}/>
                <div style={{display:"flex",gap:"4px",flexShrink:0}}>
                  {["Male","Female"].map(m=>(
                    <button key={m} className="tog" onClick={()=>{const a=[...players];a[i]={...a[i],mode:m};setPlayers(a);}} style={{background:p.mode===m?MODE[m].color:"#1a1a1a",color:p.mode===m?"#eee":"#555",border:`1.5px solid ${p.mode===m?MODE[m].color:"#2a2a2a"}`,padding:"6px 9px",fontSize:"11px"}}>{m==="Male"?"♂ Male":"♀ Female"}</button>
                  ))}
                </div>
              </div>
            );})}
          </div>
          <button className="btn" onClick={()=>setScreen("importantInfo")} style={{background:"#141414",color:"#888",border:"1px solid #222",width:"100%",marginBottom:"10px",fontSize:"14px",padding:"13px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span>ℹ️ Important Information</span>
            <span style={{color:"#444",fontSize:"12px",fontWeight:"normal"}}>Read before playing</span>
          </button>
          <button className="btn" onClick={()=>setScreen("manage")} style={{background:"#141414",color:"#888",border:"1px solid #222",width:"100%",marginBottom:"10px",fontSize:"14px",padding:"13px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span>⚙️ Manage Challenges</span>
            <span style={{color:"#444",fontSize:"12px",fontWeight:"normal"}}>{totalEnabled} / {ALL_KEYS.size} enabled</span>
          </button>
          <button className="btn" onClick={startGame} style={{background:"#eee",color:"#080808",fontSize:"25px",padding:"20px 40px",width:"100%"}}>😈 Start Game 😈</button>
          <p style={{color:"#444",fontSize:"26px",letterSpacing:"1.5px",textTransform:"uppercase",marginTop:"32px",marginBottom:"0"}}>Simple Mini Games</p>
          <button className="btn" onClick={()=>showContentWarning("positionSelect")} style={{background:"#4A0404",color:"#666",border:"1px solid #252525",fontSize:"20px",padding:"13px",width:"100%",marginTop:"12px",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"}}>
            <span>😈🔥</span><span>  Sex Position Chooser </span>
          </button>
					<button
					  className="btn"
					  onClick={openTruthCards}
					  style={{
					    background:"#4A0404",
					    color:"#666",
					    border:"1px solid #252525",
					    fontSize:"20px",
					    padding:"13px",
					    width:"100%",
					    marginTop:"12px",
					    display:"flex",
					    alignItems:"center",
					    justifyContent:"center",
					    gap:"8px"
					  }}
					>
					  <span>🖤⃝🤍</span>
					  <span>  Truth Cards </span>
					</button>
          <button className="btn" onClick={()=>showContentWarning("handbookList")} style={{background:"#4A0404",color:"#666",border:"1px solid #252525",fontSize:"20px",padding:"13px",width:"100%",marginTop:"12px",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"}}>
            <span>📖</span><span>  Sex Handbook A-Z </span>
          </button>
          <button className="btn" onClick={()=>showContentWarning("eroticaList")} style={{background:"#4A0404",color:"#666",border:"1px solid #252525",fontSize:"20px",padding:"13px",width:"100%",marginTop:"12px",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"}}>
            <span>✍️</span><span>  Erotica Fiction </span>
          </button>
        </div>
      )}

      {/* ══ IMPORTANT INFO ══ */}
      {screen==="importantInfo"&&(
        <div style={{animation:"fadeUp .35s ease",maxWidth:"540px",width:"100%"}}>
          {/* header */}
          <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"22px"}}>
            <button onClick={()=>setScreen("setup")} style={{background:"#141414",border:"1px solid #222",color:"#888",borderRadius:"8px",padding:"7px 13px",cursor:"pointer",fontFamily:"inherit",fontSize:"13px"}}>← Back</button>
            <div>
              <h2 style={{color:"#eee",margin:0,fontSize:"1.3rem"}}>Important Information</h2>
              <p style={{color:"#444",margin:0,fontSize:"12px"}}>Please read before playing</p>
            </div>
          </div>

          {/* Section 1 — Important Notes for Players */}
          <div style={{background:"#111",border:"1px solid #1e1e1e",borderRadius:"14px",padding:"20px 22px",marginBottom:"14px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"16px"}}>
              <span style={{fontSize:"24px"}}>📋</span>
              <h3 style={{color:"#eee",margin:0,fontSize:"1.05rem",letterSpacing:"0.5px",textTransform:"uppercase"}}>Important Notes for Players</h3>
            </div>
            <ul style={{color:"#aaa",fontSize:"14px",lineHeight:"1.75",margin:0,paddingLeft:"20px",display:"flex",flexDirection:"column",gap:"6px"}}>
              <li>This game is intended for consenting adults aged 18 and over. Please play responsibly.</li>
							<li>Male-Female couples are assumed for this game.  Modify as needed for same-sex couples.</li>
              <li>Always respect boundaries. Any player may pause or stop the game at any time — no questions asked.</li>
              <li>Some challenges involve physical activity. Ensure you are both comfortable and in a safe environment before starting.</li>
              <li>Challenges involving props (ice cubes, candles, restraints, lube, toys) should only be performed if both players are comfortable. Never improvise with unsafe materials.</li>
              <li>If a challenge references a timer, complete the activity for the stated duration — or agree together to skip or modify it.</li>
              <li>Hygiene matters! Wash hands and clean any toys before and after use. Use body-safe lubricant where recommended.</li>
							<li>Hygiene matters! Many challenges involve oral, genital and anal contact. Ensure both partners are very clean before play.</li>
							<li>Anal Warning!! Several challenges involve anal insertion of toys, fingers, or penis.  Never follow with vaginal insertion after without thorough cleaning.</li>
							<li>Practice Safe Sex.  If your partner is new, condoms and dental dams are recommended.</li>
              <li>Alcohol and substances can impair judgement. Play sober or drink responsibly — safety always comes first.</li>
              <li>Use the <strong style={{color:"#eee"}}>Manage Challenges</strong> screen to disable any cards you are not comfortable with before the game begins.</li>
            </ul>
          </div>

          {/* Section 2 — App Credits */}
          <div style={{background:"#111",border:"1px solid #1e1e1e",borderRadius:"14px",padding:"20px 22px",marginBottom:"20px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"16px"}}>
              <span style={{fontSize:"24px"}}>❤️</span>
              <h3 style={{color:"#eee",margin:0,fontSize:"1.05rem",letterSpacing:"0.5px",textTransform:"uppercase"}}>App Credits</h3>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
              <div>
                <p style={{color:"#666",fontSize:"11px",letterSpacing:"1px",textTransform:"uppercase",margin:"0 0 4px"}}>Concept &amp; Design</p>
                <p style={{color:"#ccc",fontSize:"14px",margin:0}}>Created with love as a playful experience for couples who want to explore and connect.  It is based on our original card game idea from 2018 that we have finally built into a web-based app.  In addition to the main game, we have also added a sex position mini game and a set of Truth cards we hope sparks enlightening and daring conversation between lovers. </p>
              </div>
              <div style={{height:"1px",background:"#1e1e1e"}}/>
              <div>
                <p style={{color:"#666",fontSize:"11px",letterSpacing:"1px",textTransform:"uppercase",margin:"0 0 4px"}}>Challenge Content</p>
                <p style={{color:"#ccc",fontSize:"14px",margin:0}}>All challenges were written and curated to balance fun, intimacy, and boundary exploration across four intensity levels.  The challenges are regularly updated based on feedack from our users.</p>
              </div>
              <div style={{height:"1px",background:"#1e1e1e"}}/>
              <div>
                <p style={{color:"#666",fontSize:"11px",letterSpacing:"1px",textTransform:"uppercase",margin:"0 0 4px"}}>Sex Positions</p>
                <p style={{color:"#ccc",fontSize:"14px",margin:0}}>Position images and animations courtesy of <span style={{color:"#888"}}>sexinfo101.com</span>. All rights reserved to their respective owners.</p>
              </div>
              <div style={{height:"1px",background:"#1e1e1e"}}/>
              <div>
                <p style={{color:"#666",fontSize:"11px",letterSpacing:"1px",textTransform:"uppercase",margin:"0 0 4px"}}>Built With</p>
                <p style={{color:"#ccc",fontSize:"14px",margin:0}}>React · Babel · Web Audio API · Service Workers</p>
              </div>
              <div style={{height:"1px",background:"#1e1e1e"}}/>
              <p style={{color:"#444",fontSize:"12px",margin:0,textAlign:"center",fontStyle:"italic"}}>Made with 😈 for adventurous couples everywhere.</p>
            </div>
          </div>
					
        {/* Section 3 — Contact Us */}
        <div style={{background:"#111",border:"1px solid #1e1e1e",borderRadius:"14px",padding:"20px 22px",marginBottom:"20px"}}>
          <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"16px"}}>
            <span style={{fontSize:"24px"}}>❤️</span>
            <h3 style={{color:"#eee",margin:0,fontSize:"1.05rem",letterSpacing:"0.5px",textTransform:"uppercase"}}>Contact Us</h3>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
            <div>
              <p style={{color:"#666",fontSize:"11px",letterSpacing:"1px",textTransform:"uppercase",margin:"0 0 4px"}}>Creator Credits</p>
              <p style={{color:"#ccc",fontSize:"14px",margin:0}}>Challenges created, edited and compiled by Vanessa Maczlinovic, Holly Garcia-Luzio, Miguel Salcedo, Christina Wang and Eleanor Rushley-White.  App development by Owen Gasford, Yusef Balor and Cynthia Feddermeyer. </p>
            </div>
            <div style={{height:"1px",background:"#1e1e1e"}}/>
            <div>
              <p style={{color:"#666",fontSize:"11px",letterSpacing:"1px",textTransform:"uppercase",margin:"0 0 4px"}}>Email Contact</p>
              <p style={{color:"#ccc",fontSize:"14px",margin:0}}>Please mail all feedback and suggestions to <span style={{color:"#888"}}>sdcg_maczlic_wang@gmail.com</span>. All rights reserved to their respective owners.</p>
            </div>
            <div style={{height:"1px",background:"#1e1e1e"}}/>
            <p style={{color:"#444",fontSize:"12px",margin:0,textAlign:"center",fontStyle:"italic"}}>❤️ Warm Love to all who have helped make this app possible.</p>
          </div>
        </div>
				
          <button className="btn" onClick={()=>setScreen("setup")} style={{background:"#141414",color:"#888",border:"1px solid #222",width:"100%",fontSize:"14px",padding:"13px"}}>← Back to Main Menu</button>
        </div>
      )}

      {/* ══ MANAGE ══ */}
      {screen==="manage"&&(
        <div style={{animation:"fadeUp .35s ease",maxWidth:"540px",width:"100%"}}>
          <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"18px"}}>
            <button onClick={()=>setScreen("setup")} style={{background:"#141414",border:"1px solid #222",color:"#888",borderRadius:"8px",padding:"7px 13px",cursor:"pointer",fontFamily:"inherit",fontSize:"13px"}}>← Back</button>
            <div><h2 style={{color:"#eee",margin:0,fontSize:"1.3rem"}}>Manage Challenges</h2><p style={{color:"#444",margin:0,fontSize:"12px"}}>{totalEnabled} of {ALL_KEYS.size} enabled</p></div>
            <div style={{marginLeft:"auto",display:"flex",gap:"6px"}}>
              <button className="tog" onClick={enableAll} style={{background:"#1a2e1a",color:"#4caf50",border:"1.5px solid #2a4a2a"}}>All On</button>
              <button className="tog" onClick={disableAll} style={{background:"#2e1a1a",color:"#e05555",border:"1.5px solid #4a2a2a"}}>All Off</button>
            </div>
          </div>
          <div style={{display:"flex",gap:"6px",marginBottom:"10px"}}>
            {["Male","Female"].map(m=>(
              <button key={m} className="pill" onClick={()=>setMFilter(m)} style={{background:mFilter===m?MODE[m].color:"#141414",color:mFilter===m?"#eee":"#555",border:`1.5px solid ${mFilter===m?MODE[m].color:"#222"}`}}>{m==="Male"?"♂ Male":"♀ Female"}</button>
            ))}
          </div>
          <div style={{display:"flex",gap:"6px",marginBottom:"14px",flexWrap:"wrap"}}>
            {LEVELS.map(l=>(
              <button key={l.id} className="pill" onClick={()=>setLFilter(l.id)} style={{background:lFilter===l.id?l.color:"#141414",color:lFilter===l.id?"#eee":"#555",border:`1.5px solid ${lFilter===l.id?l.color:"#222"}`}}>{l.emoji} {l.name}</button>
            ))}
          </div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"#0e0e0e",borderRadius:"10px",padding:"10px 14px",border:"1px solid #1a1a1a",marginBottom:"10px"}}>
            <span style={{color:"#555",fontSize:"12px"}}>{manageChallenges.filter(c=>!disabled.has(ckey(mFilter,lFilter,c.text))).length} / {manageChallenges.length} enabled here</span>
            <div style={{display:"flex",gap:"6px"}}>
              <button className="tog" onClick={()=>toggleAll(mFilter,lFilter,true)} style={{background:allOn?"#1a2e1a":"#141414",color:allOn?"#4caf50":"#555",border:`1.5px solid ${allOn?"#2a4a2a":"#222"}`}}>Enable All</button>
              <button className="tog" onClick={()=>toggleAll(mFilter,lFilter,false)} style={{background:allOff?"#2e1a1a":"#141414",color:allOff?"#e05555":"#555",border:`1.5px solid ${allOff?"#4a2a2a":"#222"}`}}>Disable All</button>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"6px",maxHeight:"54vh",overflowY:"auto",paddingRight:"4px",WebkitOverflowScrolling:"touch"}}>
            {manageChallenges.map((c,i)=>{const k=ckey(mFilter,lFilter,c.text),on=!disabled.has(k),lc=LEVELS[lFilter-1].color;return(
              <div key={i} onClick={()=>toggleChallenge(k)} style={{display:"flex",alignItems:"center",gap:"12px",background:on?"#111":"#0c0c0c",border:`1px solid ${on?"#1e1e1e":"#141414"}`,borderRadius:"10px",padding:"11px 14px",cursor:"pointer",transition:"all .18s",opacity:on?1:0.45}}>
                <span style={{fontSize:"22px",flexShrink:0}}>{c.emoji}</span>
                <p style={{color:on?"#ccc":"#555",margin:0,fontSize:"13px",flex:1,lineHeight:"1.45"}}>{c.text}</p>
                <div style={{width:"36px",height:"20px",borderRadius:"10px",flexShrink:0,position:"relative",background:on?lc:"#222",transition:"background .2s"}}>
                  <div style={{position:"absolute",top:"3px",left:on?"17px":"3px",width:"14px",height:"14px",borderRadius:"50%",background:"#eee",transition:"left .2s"}}/>
                </div>
              </div>
            );})}
          </div>
        </div>
      )}

      {/* ══ TAG PREFERENCES ══ */}
      {screen==="tags"&&(
        <div style={{animation:"fadeUp .35s ease",maxWidth:"520px",width:"100%",display:"flex",flexDirection:"column",minHeight:"calc(100vh - 40px)"}}>

          {/* header */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"18px"}}>
            <button onClick={()=>setScreen("setup")} style={{background:"#141414",border:"1px solid #222",color:"#888",borderRadius:"8px",padding:"7px 13px",cursor:"pointer",fontFamily:"inherit",fontSize:"13px"}}>← Back</button>
            <div style={{textAlign:"center"}}>
              <div style={{color:"#eee",fontWeight:"bold",fontSize:"1.1rem"}}>Challenge Preferences</div>
              <div style={{color:"#444",fontSize:"11px",letterSpacing:"1px",textTransform:"uppercase",marginTop:"2px"}}>Toggle your preferences</div>
            </div>
            <div style={{width:"60px"}}/>
          </div>



          {/* tag rows */}
          <div style={{display:"flex",flexDirection:"column",gap:"7px",flex:1,overflowY:"auto",paddingRight:"4px",WebkitOverflowScrolling:"touch"}}>
            {TAGS.map(tag=>(
              <div key={tag.id} style={{display:"grid",gridTemplateColumns:"1fr 80px",gap:"6px",alignItems:"center",background:"#111",border:"1px solid #1e1e1e",borderRadius:"12px",padding:"12px 14px"}}>
                {/* tag info */}
                <div style={{minWidth:0}}>
                  <div style={{display:"flex",alignItems:"center",gap:"7px",marginBottom:"2px"}}>
                    <span style={{fontSize:"18px"}}>{tag.emoji}</span>
                    <span style={{color:"#eee",fontWeight:"bold",fontSize:"14px"}}>{tag.label}</span>
                  </div>
                  <div style={{color:"#444",fontSize:"11px",lineHeight:"1.35"}}>{tag.desc}</div>
                </div>
                {/* shared single toggle */}
                {(()=>{
                  const accepted=tagPrefs[0][tag.id]&&tagPrefs[1][tag.id];
                  return(
                    <div style={{display:"flex",justifyContent:"center"}}>
                      <button
                        className="btn"
                        onClick={()=>setTagPrefs(prev=>{
                          const val=!(prev[0][tag.id]&&prev[1][tag.id]);
                          return prev.map(p=>({...p,[tag.id]:val}));
                        })}
                        style={{
                          width:"62px",height:"36px",fontSize:"16px",
                          background:accepted?"#0d2e0d":"#2e0d0d",
                          border:`1.5px solid ${accepted?"#2a5c2a":"#5c2a2a"}`,
                          color:accepted?"#4caf50":"#e05555",
                          borderRadius:"10px",padding:0,
                          transition:"all .2s",
                          display:"flex",alignItems:"center",justifyContent:"center",gap:"4px"
                        }}
                        title={accepted?"Click to disable":"Click to enable"}
                      >
                        {accepted?"✓":"✗"}
                        <span style={{fontSize:"10px",fontWeight:"bold"}}>{accepted?"OK":"OFF"}</span>
                      </button>
                    </div>
                  );
                })()}
              </div>
            ))}
          </div>

          {/* info note */}
          <div style={{marginTop:"12px",padding:"10px 14px",background:"#0e0e0e",borderRadius:"10px",border:"1px solid #1a1a1a",textAlign:"center"}}>
            <p style={{color:"#444",margin:0,fontSize:"12px",lineHeight:"1.5"}}>
              Set a category to <span style={{color:"#e05555"}}>✗ OFF</span> to skip those challenges for both players.<br/>
              Challenges without tags are always included.
            </p>
          </div>

          {/* ── ITEM AVAILABILITY SECTION ── */}
          <div style={{marginTop:"18px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"10px"}}>
              <div style={{flex:1,height:"1px",background:"#1e1e1e"}}/>
              <span style={{color:"#555",fontSize:"11px",letterSpacing:"1px",textTransform:"uppercase",whiteSpace:"nowrap"}}>🛍️ Items Available</span>
              <div style={{flex:1,height:"1px",background:"#1e1e1e"}}/>
            </div>
            <p style={{color:"#444",fontSize:"11px",textAlign:"center",margin:"0 0 10px",lineHeight:"1.45"}}>
              Turn <span style={{color:"#e05555"}}>✗ OFF</span> any items you don't have — challenges requiring them will be skipped.
            </p>
            <div style={{display:"flex",flexDirection:"column",gap:"7px"}}>
              {ITEM_TAGS.map(item=>{
                const have=itemPrefs[item.id];
                return(
                  <div key={item.id} style={{display:"flex",alignItems:"center",gap:"12px",background:"#0e0e0e",border:`1px solid ${have?"#1e2a1e":"#2a1e1e"}`,borderRadius:"12px",padding:"11px 14px",transition:"all .18s"}}>
                    {/* item info */}
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{display:"flex",alignItems:"center",gap:"7px",marginBottom:"2px"}}>
                        <span style={{fontSize:"18px"}}>{item.emoji}</span>
                        <span style={{color:"#eee",fontWeight:"bold",fontSize:"14px"}}>{item.label}</span>
                      </div>
                      <div style={{color:"#444",fontSize:"11px",lineHeight:"1.35"}}>{item.desc}</div>
                    </div>
                    {/* single shared toggle */}
                    <button
                      className="btn"
                      onClick={()=>setItemPrefs(prev=>({...prev,[item.id]:!prev[item.id]}))}
                      style={{
                        width:"76px",height:"36px",fontSize:"15px",flexShrink:0,
                        background:have?"#0d2e0d":"#2e0d0d",
                        border:`1.5px solid ${have?"#2a5c2a":"#5c2a2a"}`,
                        color:have?"#4caf50":"#e05555",
                        borderRadius:"10px",padding:0,
                        transition:"all .2s",
                        display:"flex",alignItems:"center",justifyContent:"center",gap:"4px"
                      }}
                    >
                      {have?"✓":"✗"}
                      <span style={{fontSize:"10px",fontWeight:"bold"}}>{have?"GOT IT":"SKIP"}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* play button */}
          <button
            className="btn"
            onClick={()=>confirmTags(tagPrefs)}
            style={{background:"#eee",color:"#080808",fontSize:"22px",padding:"20px 40px",width:"100%",marginTop:"14px"}}
          >
            😈 Play Time! 😈
          </button>
        </div>
      )}

      {/* ══ GAME ══ */}
      {screen==="game"&&(
        <div style={{animation:"fadeUp .35s ease",maxWidth:"520px",width:"100%",display:"flex",flexDirection:"column",minHeight:"calc(100vh - 40px)"}}>
          <div style={{background:"#0e0e0e",borderRadius:"14px",padding:"10px 12px",marginBottom:"12px",border:"1px solid #1e1e1e"}}>
            <div style={{display:"flex",gap:"6px",justifyContent:"center",flexWrap:"wrap"}}>
              {LEVELS.map(l=>(
                <button key={l.id} className="pill" onClick={()=>changeLevel(l.id)} style={{background:level===l.id?l.color:"#141414",color:level===l.id?"#eee":"#555",border:`1.5px solid ${level===l.id?l.color:"#222"}`,padding:"6px 14px",fontSize:"12px"}}>{l.emoji} {l.name}</button>
              ))}
            </div>
          </div>
          <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",textAlign:"center"}}>
            <div style={{background:`linear-gradient(135deg,${ms.color}22,${ms.color}0a)`,border:`1px solid ${ms.color}44`,borderRadius:"24px",padding:"48px 28px",marginBottom:"20px"}}>
              <div style={{fontSize:"52px",marginBottom:"12px"}}>🎯</div>
              <p style={{color:"#555",margin:"0 0 6px",fontSize:"12px",letterSpacing:"1px",textTransform:"uppercase"}}>Your turn</p>
              <h2 style={{color:ms.color,fontSize:"2.2rem",margin:"0 0 6px",textShadow:`0 0 32px ${ms.color}`}}>{pl.name||`Player ${current+1}`}!</h2>
              <p style={{color:"#444",margin:"0 0 20px",fontSize:"13px"}}>{pl.mode} mode · {lv.emoji} {lv.name}</p>
              <div style={{display:"flex",gap:"6px",justifyContent:"center",flexWrap:"wrap"}}>
                {LEVELS.map(l=>{const rem=remaining(current,l.id);return(
                  <div key={l.id} style={{background:"#0e0e0e",borderRadius:"8px",padding:"4px 10px",border:`1px solid ${rem>0?"#1e1e1e":"#141414"}`,fontSize:"11px",color:rem>0?"#555":"#2a2a2a"}}>{l.emoji} {rem}</div>
                );})}
              </div>
              {exhausted&&<div style={{marginTop:"16px",background:"#1a1a1a",borderRadius:"10px",padding:"10px 14px",border:"1px solid #2a2a2a"}}><p style={{color:"#666",margin:0,fontSize:"13px"}}>😈 All {lv.name} challenges done! Try a different level.</p></div>}
            </div>
            {!exhausted
              ?<button className="btn" onClick={drawCard} style={{background:ms.color,color:"#eee",fontSize:"18px",padding:"18px",width:"100%",boxShadow:`0 0 28px ${ms.color}66`,animation:"pulse 2s ease infinite"}}>Draw a Card! 😈</button>
              :<button className="btn" onClick={()=>{setExhausted(false);setCurrent(c=>1-c);}} style={{background:"#141414",color:"#555",fontSize:"16px",padding:"16px",width:"100%",border:"1px solid #222"}}>Pass Turn →</button>
            }
          </div>
          <div style={{display:"flex",justifyContent:"space-between",paddingTop:"14px"}}>
            <button onClick={()=>setScreen("setup")} style={{background:"none",border:"none",color:"#2a2a2a",fontSize:"12px",cursor:"pointer",fontFamily:"inherit"}}>⚙ Setup</button>
            <button onClick={resetCards} style={{background:"none",border:"none",color:"#2a2a2a",fontSize:"12px",cursor:"pointer",fontFamily:"inherit"}}>↺ Reset Cards</button>
          </div>
        </div>
      )}

      {/* ══ CARD ══ */}
      {screen==="card"&&card&&(
        <div style={{animation:flipped?"flipIn .1s ease":"none",maxWidth:"520px",width:"100%",display:"flex",flexDirection:"column",minHeight:"calc(100vh - 40px)"}}>
          {/* header */}
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"14px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
              <div style={{width:"26px",height:"26px",borderRadius:"50%",background:P_COLORS[current],display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",fontWeight:"bold",color:"#080808"}}>{current+1}</div>
              <span style={{color:"#555",fontSize:"13px",fontWeight:"bold"}}>{pl.name||`Player ${current+1}`}</span>
            </div>
            <div style={{background:lv.color+"44",border:`1px solid ${lv.color}66`,borderRadius:"20px",padding:"4px 12px",fontSize:"12px",color:"#aaa",fontWeight:"bold"}}>{lv.emoji} {lv.name}</div>
          </div>

          {/* card body */}
          <div style={{flex:1,background:ms.card,borderRadius:"24px",boxShadow:`0 20px 60px ${ms.color}66,0 4px 20px #000`,border:`1px solid ${ms.border}55`,position:"relative",overflow:"hidden",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"36px 32px",marginBottom:"16px"}}>
            <div style={{position:"absolute",top:"-30%",left:"-10%",width:"50%",height:"70%",background:"rgba(255,255,255,.05)",borderRadius:"50%",transform:"rotate(-20deg)",pointerEvents:"none"}}/>
            <div style={{position:"absolute",top:"16px",right:"16px",background:ms.color+"44",border:`1px solid ${ms.border}66`,borderRadius:"20px",padding:"4px 12px",fontSize:"12px",color:ms.color,fontWeight:"bold"}}>{pl.mode==="Male"?"♂":"♀"} {pl.mode}</div>

            <div style={{fontSize:"64px",marginBottom:"20px",lineHeight:1}}>{card.emoji}</div>
            <p style={{color:"#f0f0f0",fontSize:"1.5rem",fontWeight:"bold",lineHeight:"1.5",margin:0,textAlign:"center"}}>{resolveText(card.text, current, players)}</p>

            {/* ── Dice ── */}
            {/dice/i.test(card.text)&&(
              <div style={{marginTop:"24px",display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"}}>
                <p style={{color:"#555",margin:0,fontSize:"11px",letterSpacing:"1px",textTransform:"uppercase"}}>Tap to roll the dice</p>
                <button className="dice-btn" onClick={rollDice} aria-label="Roll dice">
                  {(diceRolling||diceResult!=null)
                    ?<DiceFace value={diceResult??1} rolling={diceRolling} color={ms.color}/>
                    :<svg width="72" height="72" viewBox="0 0 100 100" style={{display:"block",filter:`drop-shadow(0 0 6px ${ms.color}88)`,animation:"pulse 2s ease infinite"}}>
                        <rect x="4" y="4" width="92" height="92" rx="18" ry="18" fill="#1a1a1a" stroke={ms.color} strokeWidth="3"/>
                        <text x="50" y="64" textAnchor="middle" fontSize="42" fill={ms.color} fontFamily="serif">🎲</text>
                      </svg>
                  }
                </button>
                {diceResult!=null&&!diceRolling&&(
                  <p style={{color:ms.color,margin:0,fontSize:"18px",fontWeight:"bold",textShadow:`0 0 16px ${ms.color}`}}>
                    You rolled a {diceResult}!
                  </p>
                )}
              </div>
            )}

            {/* ── Coin Flip ── */}
            {/\bcoin\b/i.test(card.text)&&(
              <div style={{marginTop:"24px",display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"}}> 
                <p style={{color:"#555",margin:0,fontSize:"11px",letterSpacing:"1px",textTransform:"uppercase"}}>Tap to flip the coin</p>
                <button className="coin-btn" onClick={flipCoin} aria-label="Flip coin" style={{lineHeight:0}}>
                  {coinFlipping?(
                    // Spinning coin
                    <svg width="80" height="80" viewBox="0 0 100 100" style={{display:"block",animation:"coinFlipAnim 0.9s linear forwards"}}>
                      <defs>
                        <radialGradient id="spinGrad" cx="38%" cy="35%" r="65%">
                          <stop offset="0%" stopColor="#f5d472"/>
                          <stop offset="100%" stopColor="#9a6800"/>
                        </radialGradient>
                      </defs>
                      <circle cx="50" cy="50" r="46" fill="url(#spinGrad)" stroke="#7a5000" strokeWidth="3"/>
                      <circle cx="50" cy="50" r="37" fill="none" stroke="#f5d472" strokeWidth="1.5" opacity="0.45"/>
                      <text x="50" y="58" textAnchor="middle" fontSize="28" fill="#fff8dc" fontFamily="serif" fontWeight="bold" opacity="0.6">?</text>
                    </svg>
                  ):coinResult!=null?(
                    coinResult==='heads'?(
                      // HEADS — gold
                      <svg width="80" height="80" viewBox="0 0 100 100" style={{display:"block",animation:"coinPop 0.35s ease forwards"}}>
                        <defs>
                          <radialGradient id="headsGrad" cx="38%" cy="32%" r="65%">
                            <stop offset="0%" stopColor="#f7e070"/>
                            <stop offset="100%" stopColor="#9a6800"/>
                          </radialGradient>
                        </defs>
                        <circle cx="50" cy="50" r="46" fill="url(#headsGrad)" stroke="#7a5000" strokeWidth="3"/>
                        <circle cx="50" cy="50" r="37" fill="none" stroke="#f7e070" strokeWidth="1.5" opacity="0.5"/>
                        <text x="50" y="40" textAnchor="middle" fontSize="20" fontFamily="serif">👑</text>
                        <text x="50" y="63" textAnchor="middle" fontSize="15" fill="#3d2200" fontFamily="serif" fontWeight="bold" letterSpacing="1">HEADS</text>
                      </svg>
                    ):(
                      // TAILS — silver
                      <svg width="80" height="80" viewBox="0 0 100 100" style={{display:"block",animation:"coinPop 0.35s ease forwards"}}>
                        <defs>
                          <radialGradient id="tailsGrad" cx="38%" cy="32%" r="65%">
                            <stop offset="0%" stopColor="#d8d8d8"/>
                            <stop offset="100%" stopColor="#5a6070"/>
                          </radialGradient>
                        </defs>
                        <circle cx="50" cy="50" r="46" fill="url(#tailsGrad)" stroke="#4a5060" strokeWidth="3"/>
                        <circle cx="50" cy="50" r="37" fill="none" stroke="#c0c8d0" strokeWidth="1.5" opacity="0.5"/>
                        <text x="50" y="40" textAnchor="middle" fontSize="20" fontFamily="serif">⭐</text>
                        <text x="50" y="63" textAnchor="middle" fontSize="15" fill="#1a2030" fontFamily="serif" fontWeight="bold" letterSpacing="1">TAILS</text>
                      </svg>
                    )
                  ):(
                    // Idle coin — pulse
                    <svg width="80" height="80" viewBox="0 0 100 100" style={{display:"block",animation:"pulse 2s ease infinite",filter:"drop-shadow(0 0 8px #c9850a88)"}}>
                      <defs>
                        <radialGradient id="idleGrad" cx="38%" cy="32%" r="65%">
                          <stop offset="0%" stopColor="#f5d472"/>
                          <stop offset="100%" stopColor="#9a6800"/>
                        </radialGradient>
                      </defs>
                      <circle cx="50" cy="50" r="46" fill="url(#idleGrad)" stroke="#7a5000" strokeWidth="3"/>
                      <circle cx="50" cy="50" r="37" fill="none" stroke="#f5d472" strokeWidth="1.5" opacity="0.4"/>
                      <text x="50" y="58" textAnchor="middle" fontSize="32" fontFamily="serif">🪙</text>
                    </svg>
                  )}
                </button>
                {coinResult!=null&&!coinFlipping&&(
                  <p style={{
                    color:coinResult==='heads'?"#d4a020":"#8899aa",
                    margin:0,fontSize:"18px",fontWeight:"bold",
                    textShadow:`0 0 16px ${coinResult==='heads'?"#d4a02088":"#8899aa88"}`
                  }}>
                    {coinResult==='heads'?"👑 Heads!":"⭐ Tails!"}
                  </p>
                )}
              </div>
            )}
            {timerTotal&&(
              <div style={{marginTop:"28px",display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"}}>
                <div style={{position:"relative",width:"96px",height:"96px"}}>
                  <svg width="96" height="96" style={{transform:"rotate(-90deg)"}}>
                    <circle cx="48" cy="48" r={RING_R} fill="none" stroke="#ffffff0d" strokeWidth="5"/>
                    <circle cx="48" cy="48" r={RING_R} fill="none"
                      stroke={ringColor} strokeWidth="5"
                      strokeDasharray={RING_C} strokeDashoffset={ringOffset}
                      strokeLinecap="round"
                      style={{transition:"stroke-dashoffset 1s linear,stroke 0.5s"}}
                    />
                  </svg>
                  <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    {timerDone
                      ?<span style={{fontSize:"26px",animation:"timesUp 1s ease infinite"}}>⏰</span>
                      :<span style={{fontSize:"22px",fontWeight:"bold",color:ringColor,fontFamily:"monospace",transition:"color 0.5s"}}>{fmtTime(timeLeft)}</span>
                    }
                  </div>
                </div>
                {timerDone&&<p style={{color:"#888",margin:0,fontSize:"14px",fontWeight:"bold"}}>Time over!</p>}
                {!timerDone&&(
                  <button onClick={skipTimer} style={{background:"#ffffff0a",border:"1px solid #ffffff18",borderRadius:"20px",color:"#555",fontSize:"12px",padding:"5px 16px",cursor:"pointer",fontFamily:"inherit"}}>
                    Skip Timer
                  </button>
                )}
              </div>
            )}
          </div>

          <button className="btn" onClick={handleNext} style={{background:ms.color,color:"#eee",fontSize:"18px",padding:"18px",width:"100%",boxShadow:`0 0 24px ${ms.color}55`}}>Next →</button>
          <div style={{display:"flex",justifyContent:"space-between",paddingTop:"12px"}}>
            <button onClick={goBack} style={{background:"none",border:"none",color:"#2a2a2a",fontSize:"12px",cursor:"pointer",fontFamily:"inherit"}}>← Back</button>
            <button onClick={()=>setScreen("setup")} style={{background:"none",border:"none",color:"#2a2a2a",fontSize:"12px",cursor:"pointer",fontFamily:"inherit"}}>⚙ Setup</button>
          </div>
        </div>
      )}

      {/* ══ POSITION SELECT ══ */}
      {screen==="positionSelect"&&(
        <div style={{animation:"fadeUp .35s ease",maxWidth:"520px",width:"100%",display:"flex",flexDirection:"column",minHeight:"calc(100vh - 40px)"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"24px"}}>
            <button onClick={()=>setScreen("setup")} style={{background:"#141414",border:"1px solid #222",color:"#888",borderRadius:"8px",padding:"7px 13px",cursor:"pointer",fontFamily:"inherit",fontSize:"13px"}}>← Back</button>
            <span style={{color:"#444",fontSize:"11px",letterSpacing:"1px",textTransform:"uppercase"}}>Sex Position Chooser</span>
            <div style={{width:"72px"}}/>
          </div>
          <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"24px"}}>
            <div style={{textAlign:"center",marginBottom:"8px"}}>
              <div style={{fontSize:"2.4rem",marginBottom:"12px"}}>😈🔥</div>
              <h2 style={{color:"#eee",fontSize:"1.4rem",margin:"0 0 6px",fontWeight:"bold"}}>Choose Your Group Size</h2>
              <p style={{color:"#555",fontSize:"13px",margin:0}}>Select below then hit Start to spin the wheel</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"12px",width:"100%",maxWidth:"340px"}}>
              {[
                {id:"couples",label:"👫  Couples",sub:"2 people · illustrated positions"},
                {id:"threesomes",label:"👫👤  Threesomes",sub:"3 people · 18 positions with guides"},
                {id:"foursomes",label:"👫👫  Foursomes",sub:"4 people · 10 positions with guides"},
              ].map(opt=>{
                const sel=posMode===opt.id;
                return(
                  <button key={opt.id} onClick={()=>setPosMode(opt.id)}
                    style={{background:sel?"linear-gradient(135deg,#1a0a00,#120500)":"#0e0e0e",border:sel?"1px solid #c87a0088":"1px solid #1e1e1e",borderRadius:"14px",padding:"16px 20px",cursor:"pointer",fontFamily:"inherit",textAlign:"left",transition:"all .2s",boxShadow:sel?"0 0 20px #c87a0022":undefined}}>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                      <div>
                        <div style={{color:sel?"#e8a030":"#888",fontSize:"16px",fontWeight:"bold",marginBottom:"3px"}}>{opt.label}</div>
                        <div style={{color:"#444",fontSize:"12px"}}>{opt.sub}</div>
                      </div>
                      <div style={{width:"20px",height:"20px",borderRadius:"50%",border:sel?"2px solid #c87a00":"2px solid #333",background:sel?"#c87a00":undefined,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
                        {sel&&<div style={{width:"8px",height:"8px",borderRadius:"50%",background:"#fff"}}/>}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <button className="btn" onClick={startPosition}
              style={{background:"#c87a00",color:"#fff",fontSize:"18px",padding:"18px 32px",width:"100%",maxWidth:"340px",boxShadow:"0 0 28px #c87a0055",borderRadius:"12px",marginTop:"8px"}}>
              Start 🎲
            </button>
          </div>
        </div>
      )}

      {/* ══ POSITION ══ */}
      {screen==="position"&&posIdx!=null&&(()=>{
        const isCouples=posMode==="couples";
        const pos=(isCouples?POSITIONS:posMode==="threesomes"?THREESOME_POSITIONS:FOURSOME_POSITIONS)[posIdx];
        const hasVid=isCouples&&!!pos.vid&&!posVidErr;
        const imgUrl=isCouples?`${IMG}${pos.img}.png`:null;
        const vidUrl=isCouples&&pos.vid?`${VID}${pos.vid}.mp4`:null;
        const ac="#c87a00";
        const modeLabel=posMode==="threesomes"?"Threesome":posMode==="foursomes"?"Foursome":"Couple";
        const srcLabel=isCouples?"sexinfo101.com":posMode==="threesomes"?"badgirlsbible.com":"menshealth.com";
        const srcUrl=isCouples?"https://sexinfo101.com/positions/c/all-sex":posMode==="threesomes"?"https://badgirlsbible.com/threesome-sex-positions":"https://www.menshealth.com/sex-women/a65491904/best-foursome-positions/";
        return(
          <div style={{animation:"fadeUp .35s ease",maxWidth:"520px",width:"100%",display:"flex",flexDirection:"column",minHeight:"calc(100vh - 40px)"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"16px"}}>
              <button onClick={()=>setScreen("positionSelect")} style={{background:"#141414",border:"1px solid #222",color:"#888",borderRadius:"8px",padding:"7px 13px",cursor:"pointer",fontFamily:"inherit",fontSize:"13px"}}>← Back</button>
              <span style={{color:"#444",fontSize:"11px",letterSpacing:"1px",textTransform:"uppercase"}}>{modeLabel} Position</span>
              <span style={{color:"#555",fontSize:"11px",letterSpacing:"0.5px",minWidth:"72px",textAlign:"right"}}>{posQueueIdx+1}&thinsp;/&thinsp;{getPosArray().length}</span>
            </div>
            <div style={{flex:1,display:"flex",flexDirection:"column",background:"linear-gradient(135deg,#120d00,#0d0d0d)",border:`1px solid ${ac}33`,borderRadius:"24px",overflow:"hidden",marginBottom:"16px",boxShadow:`0 20px 60px ${ac}22,0 4px 20px #000`}}>
              
              {isCouples?(
  <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",background:"#050505",position:"relative",minHeight:"260px"}}>
    {hasVid?(
      <video key={vidUrl} autoPlay loop muted playsInline onError={()=>setPosVidErr(true)}
        style={{maxWidth:"100%",maxHeight:"55vh",objectFit:"contain",display:"block"}}>
        <source src={vidUrl} type="video/mp4"/>
      </video>
    ):(
      <img key={imgUrl} src={imgUrl} alt={pos.n}
        style={{maxWidth:"100%",maxHeight:"55vh",objectFit:"contain",display:"block"}}/>
    )}
    {hasVid&&(
      <div style={{position:"absolute",top:"10px",right:"10px",background:`${ac}cc`,borderRadius:"20px",padding:"3px 10px",fontSize:"11px",color:"#fff",fontWeight:"bold",letterSpacing:"1px"}}>▶ ANIMATED</div>
    )}
  </div>
):pos.img?(
  <div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",background:"#050505",minHeight:"260px"}}>
    <img src={`${IMG}${pos.img}.png`} alt={pos.n}
      style={{maxWidth:"100%",maxHeight:"55vh",objectFit:"contain",display:"block"}}/>
  </div>
):(
  <div style={{display:"flex",alignItems:"center",justifyContent:"center",background:"#050505",minHeight:"120px",padding:"24px"}}>
    <div style={{fontSize:"3rem"}}>{"threesomes"===posMode?"🔥👫👤":"🔥👫👫"}</div>
  </div>
)}

              <div style={{padding:"20px 24px 24px",textAlign:"center"}}>
                {!isCouples&&pos.src&&(
                  <div style={{display:"inline-block",background:`${ac}22`,border:`1px solid ${ac}44`,borderRadius:"20px",padding:"3px 12px",fontSize:"11px",color:ac,letterSpacing:"1px",marginBottom:"12px"}}>{pos.src}</div>
                )}
                <h2 style={{color:"#eee",fontSize:"1.6rem",margin:"0 0 12px",fontWeight:"bold",textShadow:`0 0 24px ${ac}66`}}>{pos.n}</h2>
                {!isCouples&&pos.desc&&(
                  <p style={{color:"#aaa",fontSize:"14px",lineHeight:"1.65",margin:"0 0 14px",textAlign:"left"}}>{pos.desc}</p>
                )}
                <a href={srcUrl} target="_blank" rel="noopener noreferrer"
                  style={{color:"#333",fontSize:"11px",textDecoration:"none",letterSpacing:"0.5px"}}>{srcLabel}</a>
              </div>
            </div>
            <button className="btn" onClick={nextPosition} style={{background:ac,color:"#fff",fontSize:"18px",padding:"18px",width:"100%",boxShadow:`0 0 28px ${ac}55`}}>
              {posQueueIdx+1>=getPosArray().length?"🔄  Start New Cycle":"Next Position 🎲"}
            </button>
          </div>
        );
      })()}
			
			{/* ══ TRUTH CARDS ══ */}
			{screen==="truth"&&truthCard&&(
			  <div
			    style={{
			      animation:"fadeUp .35s ease",
			      maxWidth:"520px",
			      width:"100%",
			      display:"flex",
			      flexDirection:"column",
			      minHeight:"calc(100vh - 40px)"
			    }}
			  >
			    {/* header */}
			    <div
			      style={{
			        display:"flex",
			        alignItems:"center",
			        justifyContent:"space-between",
			        marginBottom:"14px"
			      }}
			    >
			      <button
			        onClick={()=>setScreen("setup")}
			        style={{
			          background:"#141414",
			          border:"1px solid #222",
			          color:"#888",
			          borderRadius:"8px",
			          padding:"7px 13px",
			          cursor:"pointer",
			          fontFamily:"inherit",
			          fontSize:"13px"
			        }}
			      >
			        ← Back
			      </button>

			      <span
			        style={{
			          color:"#444",
			          fontSize:"11px",
			          letterSpacing:"1px",
			          textTransform:"uppercase"
			        }}
			      >
			        Truth Cards
			      </span>

			      <div style={{width:"72px"}}/>
			    </div>

			    {/* card */}
			    <div
			      style={{
			        flex:1,
			        background:"linear-gradient(135deg,#120d00,#0d0d0d)",
			        border:"1px solid #4A040433",
			        borderRadius:"24px",
			        padding:"40px 30px",
			        marginBottom:"16px",
			        boxShadow:"0 20px 60px #4A040422, 0 4px 20px #000",
			        display:"flex",
			        flexDirection:"column",
			        alignItems:"center",
			        justifyContent:"center",
			        textAlign:"center"
			      }}
			    >
			      <div style={{fontSize:"64px",marginBottom:"20px"}}>🖤⃝🤍</div>

			      <p
			        style={{
			          color:"#f0f0f0",
			          fontSize:"1.5rem",
			          fontWeight:"bold",
			          lineHeight:"1.5",
			          margin:0
			        }}
			      >
			        {truthCard}
			      </p>
			    </div>

			    {/* next button */}
			    <button
			      className="btn"
			      onClick={nextTruthCard}
			      style={{
			        background:"#4A0404",
			        color:"#fff",
			        fontSize:"18px",
			        padding:"18px",
			        width:"100%",
			        boxShadow:"0 0 28px #4A040455"
			      }}
			    >
			      Next Truth Card 😈
			    </button>
			  </div>
			)}

      {/* ══ HANDBOOK LIST ══ */}
      {screen==="handbookList"&&(
        <div style={{animation:"fadeUp .35s ease",maxWidth:"540px",width:"100%"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"20px"}}>
            <button onClick={()=>setScreen("setup")} style={{background:"#141414",border:"1px solid #222",color:"#888",borderRadius:"8px",padding:"7px 13px",cursor:"pointer",fontFamily:"inherit",fontSize:"13px"}}>← Back</button>
            <span style={{color:"#888",fontSize:"13px",letterSpacing:"1px",textTransform:"uppercase"}}>Sex Handbook A-Z</span>
            <div style={{width:"72px"}}/>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
            {HANDBOOK_ITEMS.map((item,i)=>(
              <button key={i} className="btn" onClick={()=>openHandbookItem(item)}
                style={{background:"#111",border:"1px solid #1e1e1e",borderRadius:"14px",padding:"12px 14px",width:"100%",display:"flex",alignItems:"center",gap:"14px",textAlign:"left"}}>
                <img src={"media/img/"+item.img} alt="" style={{width:"56px",height:"56px",borderRadius:"10px",objectFit:"cover",flexShrink:0,border:"1px solid #2a2a2a"}}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{color:"#eee",fontSize:"17px",fontWeight:"bold",marginBottom:"3px"}}>{item.title}</div>
                  <div style={{color:"#666",fontSize:"12px",lineHeight:"1.4"}}>{item.sub1}</div>
                  <div style={{color:"#555",fontSize:"12px",lineHeight:"1.4"}}>{item.sub2}</div>
                </div>
                <span style={{color:"#333",fontSize:"18px",flexShrink:0}}>›</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ══ HANDBOOK DETAIL ══ */}
      {screen==="handbookDetail"&&handbookItem&&(
        <div style={{animation:"fadeUp .35s ease",maxWidth:"540px",width:"100%"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"20px"}}>
            <button onClick={()=>setScreen("handbookList")} style={{background:"#141414",border:"1px solid #222",color:"#888",borderRadius:"8px",padding:"7px 13px",cursor:"pointer",fontFamily:"inherit",fontSize:"13px"}}>← Back</button>
            <span style={{color:"#888",fontSize:"13px",letterSpacing:"1px",textTransform:"uppercase"}}>Sex Handbook A-Z</span>
            <div style={{width:"72px"}}/>
          </div>
          <div style={{background:"linear-gradient(135deg,#120500,#0d0d0d)",border:"1px solid #4A040433",borderRadius:"24px",padding:"24px",marginBottom:"14px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"20px"}}>
              <img src={"media/img/"+handbookItem.img} alt="" style={{width:"72px",height:"72px",borderRadius:"14px",objectFit:"cover",border:"1px solid #3a1a1a"}}/>
              <div>
                <h1 style={{color:"#eee",fontSize:"1.5rem",margin:"0 0 4px",fontWeight:"bold"}}>{handbookItem.title}</h1>
                <p style={{color:"#666",fontSize:"13px",margin:0}}>{handbookItem.sub1}</p>
              </div>
            </div>
            {libraryLoading&&<p style={{color:"#777",fontSize:"13px",lineHeight:"1.6",margin:"0 0 16px"}}>Loading text...</p>}
            {libraryError&&<p style={{color:"#d66",fontSize:"13px",lineHeight:"1.6",margin:"0 0 16px"}}>{libraryError}</p>}
            {(handbookItem.sections||[]).map((sec,i)=>(
              <div key={i} style={{marginBottom:"20px"}}>
                <h2 style={{color:"#c87a00",fontSize:"1rem",letterSpacing:"1px",textTransform:"uppercase",margin:"0 0 8px",paddingBottom:"6px",borderBottom:"1px solid #2a1a00"}}>{sec.heading}</h2>
                {sec.isHtml?(
                  <div className="library-rich-text" style={{color:"#aaa",fontSize:"14px",lineHeight:"1.75",margin:0}} dangerouslySetInnerHTML={{__html:sec.body}}/>
                ):(
                  <p style={{color:"#aaa",fontSize:"14px",lineHeight:"1.75",margin:0}}>{sec.body}</p>
                )}
                {sec.img&&<img src={"media/img/"+sec.img} alt="" style={{width:"100%",maxHeight:"160px",objectFit:"cover",borderRadius:"10px",marginTop:"10px",border:"1px solid #2a2a2a"}}/>}
              </div>
            ))}
          </div>
          <button className="btn" onClick={()=>setScreen("handbookList")} style={{background:"#1a1a1a",color:"#888",border:"1px solid #222",fontSize:"15px",padding:"15px",width:"100%"}}>
            ← Back to Handbook
          </button>
        </div>
      )}

      {/* ══ EROTICA LIST ══ */}
      {screen==="eroticaList"&&(
        <div style={{animation:"fadeUp .35s ease",maxWidth:"540px",width:"100%"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"20px"}}>
            <button onClick={()=>setScreen("setup")} style={{background:"#141414",border:"1px solid #222",color:"#888",borderRadius:"8px",padding:"7px 13px",cursor:"pointer",fontFamily:"inherit",fontSize:"13px"}}>← Back</button>
            <span style={{color:"#888",fontSize:"13px",letterSpacing:"1px",textTransform:"uppercase"}}>Erotica Fiction</span>
            <div style={{width:"72px"}}/>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
            {EROTICA_ITEMS.map((item,i)=>(
              <button key={i} className="btn" onClick={()=>openEroticaItem(item)}
                style={{background:"#111",border:"1px solid #1e1e1e",borderRadius:"14px",padding:"12px 14px",width:"100%",display:"flex",alignItems:"center",gap:"14px",textAlign:"left"}}>
                <img src={"media/img/"+item.img} alt="" style={{width:"56px",height:"56px",borderRadius:"10px",objectFit:"cover",flexShrink:0,border:"1px solid #2a2a2a"}}/>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{color:"#eee",fontSize:"17px",fontWeight:"bold",marginBottom:"3px"}}>{item.title}</div>
                  <div style={{color:"#666",fontSize:"12px",lineHeight:"1.4"}}>{item.sub1}</div>
                  <div style={{color:"#555",fontSize:"12px",lineHeight:"1.4"}}>{item.sub2}</div>
                </div>
                <span style={{color:"#333",fontSize:"18px",flexShrink:0}}>›</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ══ EROTICA DETAIL ══ */}
      {screen==="eroticaDetail"&&eroticaItem&&(
        <div style={{animation:"fadeUp .35s ease",maxWidth:"540px",width:"100%"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"20px"}}>
            <button onClick={()=>setScreen("eroticaList")} style={{background:"#141414",border:"1px solid #222",color:"#888",borderRadius:"8px",padding:"7px 13px",cursor:"pointer",fontFamily:"inherit",fontSize:"13px"}}>← Back</button>
            <span style={{color:"#888",fontSize:"13px",letterSpacing:"1px",textTransform:"uppercase"}}>Erotica Fiction</span>
            <div style={{width:"72px"}}/>
          </div>
          <div style={{background:"linear-gradient(135deg,#0d0012,#0d0d0d)",border:"1px solid #2a004433",borderRadius:"24px",padding:"24px",marginBottom:"14px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"16px",marginBottom:"20px"}}>
              <img src={"media/img/"+eroticaItem.img} alt="" style={{width:"72px",height:"72px",borderRadius:"14px",objectFit:"cover",border:"1px solid #2a1a3a"}}/>
              <div>
                <h1 style={{color:"#eee",fontSize:"1.5rem",margin:"0 0 4px",fontWeight:"bold"}}>{eroticaItem.title}</h1>
                <p style={{color:"#666",fontSize:"13px",margin:0}}>{eroticaItem.sub1}</p>
              </div>
            </div>
            {libraryLoading&&<p style={{color:"#777",fontSize:"13px",lineHeight:"1.6",margin:"0 0 16px"}}>Loading text...</p>}
            {libraryError&&<p style={{color:"#d66",fontSize:"13px",lineHeight:"1.6",margin:"0 0 16px"}}>{libraryError}</p>}
            {(eroticaItem.sections||[]).map((sec,i)=>(
              <div key={i} style={{marginBottom:"20px"}}>
                <h2 style={{color:"#aa44ff",fontSize:"1rem",letterSpacing:"1px",textTransform:"uppercase",margin:"0 0 8px",paddingBottom:"6px",borderBottom:"1px solid #1a0033"}}>{sec.heading}</h2>
                {sec.isHtml?(
                  <div className="library-rich-text" style={{color:"#bbb",fontSize:"14px",lineHeight:"1.85",margin:0}} dangerouslySetInnerHTML={{__html:sec.body}}/>
                ):(
                  <p style={{color:"#bbb",fontSize:"14px",lineHeight:"1.85",margin:0,fontStyle:sec.italic?"italic":"normal"}}>{sec.body}</p>
                )}
                {sec.img&&<img src={"media/img/"+sec.img} alt="" style={{width:"100%",maxHeight:"160px",objectFit:"cover",borderRadius:"10px",marginTop:"10px",border:"1px solid #2a2a2a"}}/>}
              </div>
            ))}
          </div>
          <button className="btn" onClick={()=>setScreen("eroticaList")} style={{background:"#1a1a1a",color:"#888",border:"1px solid #222",fontSize:"15px",padding:"15px",width:"100%"}}>
            ← Back to Stories
          </button>
        </div>
      )}

      {/* ══ CONTENT WARNING MODAL ══ */}
      {contentWarning&&(
        <div style={{position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center",padding:"24px",background:"rgba(0,0,0,0.88)",backdropFilter:"blur(6px)",animation:"fadeUp .25s ease"}}>
          <div style={{background:"#0f0f0f",border:"1px solid #2a0a0a",borderRadius:"18px",maxWidth:"440px",width:"100%",padding:"36px 28px 28px",boxShadow:"0 0 60px #8B1A1A55,0 4px 32px #000",display:"flex",flexDirection:"column",alignItems:"center",gap:"0",textAlign:"center",position:"relative"}}>
            <div style={{fontSize:"52px",lineHeight:1,marginBottom:"18px",filter:"drop-shadow(0 0 12px #ff443388)"}}>⚠️</div>
            <p style={{color:"#cc3333",fontSize:"18px",fontWeight:"bold",letterSpacing:"1.5px",textTransform:"uppercase",margin:"0 0 14px",fontFamily:"'Georgia',serif"}}>Content Warning</p>
            <p style={{color:"#bbb",fontSize:"14px",lineHeight:"1.75",margin:"0 0 10px"}}>
              This section may contain <strong style={{color:"#eee"}}>extremely graphic sexual imagery</strong>, including drawings, photographs and AI\u2011generated images of an explicit adult nature.
            </p>
            <p style={{color:"#888",fontSize:"13px",lineHeight:"1.6",margin:"0 0 28px"}}>
              You must be <strong style={{color:"#ccc"}}>18 years of age or older</strong> and comfortable with adult content to continue. If you are unsure or uncomfortable, please return to the main screen.
            </p>
            <div style={{width:"100%",height:"1px",background:"linear-gradient(90deg,transparent,#2a0a0a,transparent)",marginBottom:"24px"}}/>
            <button
              className="btn"
              onClick={acceptContentWarning}
              style={{background:"linear-gradient(135deg,#1a5c2a,#0f3a1a)",color:"#7dffaa",border:"1px solid #2a7a3a",fontSize:"14px",fontWeight:"bold",padding:"16px 20px",width:"100%",marginBottom:"12px",borderRadius:"10px",letterSpacing:"0.5px",boxShadow:"0 0 20px #1a5c2a55"}}
            >
              ✅ &nbsp; I am OK with this, continue
            </button>
            <button
              className="btn"
              onClick={declineContentWarning}
              style={{background:"linear-gradient(135deg,#4a0a0a,#2a0505)",color:"#ff8888",border:"1px solid #6a1a1a",fontSize:"14px",padding:"16px 20px",width:"100%",borderRadius:"10px",letterSpacing:"0.5px",boxShadow:"0 0 20px #4a0a0a55"}}
            >
              🚫 &nbsp; No thank you, take me back to the main screen
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
