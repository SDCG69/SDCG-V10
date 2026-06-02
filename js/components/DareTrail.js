// ── Dare Trail Component ─────────────────────────────────────────────────────
//
// DARE TAG REFERENCE (for adding new dares — see DareTrail-README.md)
//
// Each dare object has:
//   emoji   : string  — display emoji
//   who     : string  — who can receive this dare
//              "any"      = any player
//              "m"        = male players only
//              "f"        = female players only
//   target  : string  — targeting rule for {target} / {targets} placeholder
//              "any"      = any other player(s)
//              "mf"       = opposite gender (m→f, f→any)
//              "f"        = female players only
//              "m"        = male players only
//              "allF"     = ALL female players (plural — use {targets})
//              "allM"     = ALL male players (plural — use {targets})
//              "allOthers"= ALL other players (plural — use {targets})
//              "none"     = no target needed
//   text    : string  — dare text. Placeholders:
//              {target}   = replaced with one resolved player name
//              {targets}  = replaced with "PlayerA and PlayerB" (all matching)
// ─────────────────────────────────────────────────────────────────────────────

const DT_STYLE_ID = "dare-trail-styles";

function injectDTStyles() {
  if (document.getElementById(DT_STYLE_ID)) return;
  const s = document.createElement("style");
  s.id = DT_STYLE_ID;
  s.textContent = `
    .dt-mild    { border-color:rgba(74,222,128,0.45)!important;  background:rgba(74,222,128,0.07)!important; }
    .dt-spicy   { border-color:rgba(250,204,21,0.45)!important;  background:rgba(250,204,21,0.07)!important; }
    .dt-hot     { border-color:rgba(249,115,22,0.45)!important;  background:rgba(249,115,22,0.07)!important; }
    .dt-extreme { border-color:rgba(244,63,94,0.45)!important;   background:rgba(244,63,94,0.07)!important; }
    .dt-mild .dt-num    { color:#4ade80; }
    .dt-spicy .dt-num   { color:#facc15; }
    .dt-hot .dt-num     { color:#f97316; }
    .dt-extreme .dt-num { color:#f43f5e; }
    .dt-node {
      position:absolute; transform:translate(-50%,-50%); transform-origin:center;
      cursor:default; z-index:2; transition:transform .18s cubic-bezier(.34,1.56,.64,1);
    }
    .dt-node-inner {
      width:100%; height:100%; border-radius:50%;
      display:flex; flex-direction:column; align-items:center; justify-content:center;
      border:2px solid rgba(255,255,255,0.1); background:#1a0814;
      transition:transform .18s, box-shadow .18s;
      position:relative; overflow:hidden; user-select:none;
    }
    .dt-num { font-family:Georgia,serif; font-weight:bold; line-height:1; color:rgba(255,255,255,0.5); pointer-events:none; }
    .dt-emoji { line-height:1; pointer-events:none; }
    .dt-node.dt-startnode .dt-node-inner,
    .dt-node.dt-finishnode .dt-node-inner {
      border-color:rgba(201,68,106,0.6)!important;
      background:linear-gradient(135deg,rgba(49,10,30,0.9),rgba(76,10,40,0.9))!important;
    }
    .dt-node.dt-current .dt-node-inner { animation:dtNodeRing 1s ease-in-out infinite; }
    @keyframes dtNodeRing {
      0%,100% { box-shadow:0 0 0 2px rgba(255,255,255,0.7),0 0 12px rgba(201,68,106,0.4); }
      50%      { box-shadow:0 0 0 4px rgba(255,255,255,1),0 0 22px rgba(201,68,106,0.7); }
    }
    .dt-avatar {
      position:absolute; z-index:10; pointer-events:none;
      display:flex; align-items:center; justify-content:center;
      border-radius:50%; border:2.5px solid rgba(255,255,255,0.5);
      font-family:Georgia,serif; font-weight:bold; color:#fff;
      text-shadow:0 1px 3px rgba(0,0,0,0.6); box-shadow:0 4px 14px rgba(0,0,0,0.5);
      transition:left .22s cubic-bezier(.34,1.56,.64,1),top .22s cubic-bezier(.34,1.56,.64,1);
      will-change:left,top,transform;
    }
    .dt-avatar.dt-bounce { animation:dtBounce .22s cubic-bezier(.34,1.56,.64,1); }
    @keyframes dtBounce {
      0%   { transform:translate(-50%,-50%) scale(1); }
      40%  { transform:translate(-50%,-50%) scale(1.45); }
      70%  { transform:translate(-50%,-50%) scale(0.88); }
      100% { transform:translate(-50%,-50%) scale(1); }
    }
    .dt-dice-scene { width:64px; height:64px; perspective:280px; filter:drop-shadow(0 8px 22px rgba(0,0,0,0.65)); flex-shrink:0; }
    .dt-cube { width:54px; height:54px; margin:5px; position:relative; transform-style:preserve-3d; transform:rotateX(-25deg) rotateY(30deg); }
    .dt-cube.dt-tumble { animation:dtTumble 2s cubic-bezier(.3,0,.2,1) forwards; }
    @keyframes dtTumble {
      0%   { transform:rotateX(-25deg) rotateY(30deg)   rotateZ(0deg); }
      22%  { transform:rotateX(260deg) rotateY(180deg)  rotateZ(130deg); }
      50%  { transform:rotateX(500deg) rotateY(410deg)  rotateZ(260deg); }
      75%  { transform:rotateX(660deg) rotateY(570deg)  rotateZ(340deg); }
      100% { transform:rotateX(-25deg) rotateY(30deg)   rotateZ(0deg); }
    }
    .dt-face { position:absolute; width:54px; height:54px; border-radius:10px; box-sizing:border-box; border:1.5px solid rgba(0,0,0,0.12); }
    .dt-face.f-front  { transform:rotateY(0deg)   translateZ(27px); background:linear-gradient(145deg,#f9f9f9,#e0e0e0); box-shadow:inset 0 2px 6px rgba(255,255,255,0.9),inset 0 -2px 4px rgba(0,0,0,0.1); }
    .dt-face.f-back   { transform:rotateY(180deg) translateZ(27px); background:linear-gradient(145deg,#d4d4d4,#bcbcbc); }
    .dt-face.f-right  { transform:rotateY(90deg)  translateZ(27px); background:linear-gradient(145deg,#e2e2e2,#cecece); }
    .dt-face.f-left   { transform:rotateY(-90deg) translateZ(27px); background:linear-gradient(145deg,#dedede,#cacaca); }
    .dt-face.f-top    { transform:rotateX(90deg)  translateZ(27px); background:linear-gradient(145deg,#ffffff,#eeeeee); }
    .dt-face.f-bottom { transform:rotateX(-90deg) translateZ(27px); background:linear-gradient(145deg,#c8c8c8,#b4b4b4); }
    .dt-face.dt-winner {
      background:linear-gradient(145deg,#fffff0,#fef6c0)!important;
      box-shadow:inset 0 2px 6px rgba(255,255,255,1),0 0 22px rgba(201,68,106,0.9),0 0 8px rgba(201,68,106,0.6)!important;
      border-color:rgba(201,68,106,0.5)!important;
    }
    .dt-dots { position:absolute; inset:6px; display:grid; gap:2px; }
    .dt-dot  { border-radius:50%; background:radial-gradient(circle at 33% 33%,#444,#111); box-shadow:0 1px 2px rgba(0,0,0,0.45); align-self:center; justify-self:center; width:9px; height:9px; }
    .dt-dots-1 { place-content:center; place-items:center; }
    .dt-dots-1 .dt-dot { width:11px; height:11px; }
    .dt-dots-2 { grid-template-columns:1fr 1fr; grid-template-rows:1fr 1fr; }
    .dt-dots-2 .dt-dot:nth-child(1){ grid-column:2;grid-row:1;align-self:start;justify-self:end; }
    .dt-dots-2 .dt-dot:nth-child(2){ grid-column:1;grid-row:2;align-self:end;justify-self:start; }
    .dt-dots-3 { grid-template-columns:1fr 1fr 1fr; grid-template-rows:1fr 1fr 1fr; }
    .dt-dots-3 .dt-dot:nth-child(1){ grid-column:3;grid-row:1;align-self:start;justify-self:end; }
    .dt-dots-3 .dt-dot:nth-child(2){ grid-column:2;grid-row:2; }
    .dt-dots-3 .dt-dot:nth-child(3){ grid-column:1;grid-row:3;align-self:end;justify-self:start; }
    .dt-dots-4 { grid-template-columns:1fr 1fr; grid-template-rows:1fr 1fr; }
    .dt-dots-4 .dt-dot:nth-child(1){ align-self:start;justify-self:start; }
    .dt-dots-4 .dt-dot:nth-child(2){ align-self:start;justify-self:end; }
    .dt-dots-4 .dt-dot:nth-child(3){ align-self:end;justify-self:start; }
    .dt-dots-4 .dt-dot:nth-child(4){ align-self:end;justify-self:end; }
    .dt-dots-5 { grid-template-columns:1fr 1fr 1fr; grid-template-rows:1fr 1fr 1fr; }
    .dt-dots-5 .dt-dot:nth-child(1){ grid-column:1;grid-row:1;align-self:start;justify-self:start; }
    .dt-dots-5 .dt-dot:nth-child(2){ grid-column:3;grid-row:1;align-self:start;justify-self:end; }
    .dt-dots-5 .dt-dot:nth-child(3){ grid-column:2;grid-row:2; }
    .dt-dots-5 .dt-dot:nth-child(4){ grid-column:1;grid-row:3;align-self:end;justify-self:start; }
    .dt-dots-5 .dt-dot:nth-child(5){ grid-column:3;grid-row:3;align-self:end;justify-self:end; }
    .dt-dots-6 { grid-template-columns:1fr 1fr; grid-template-rows:1fr 1fr 1fr; }
    .dt-dots-6 .dt-dot:nth-child(1){ align-self:start;justify-self:start; }
    .dt-dots-6 .dt-dot:nth-child(2){ align-self:start;justify-self:end; }
    .dt-dots-6 .dt-dot:nth-child(3){ align-self:center;justify-self:start; }
    .dt-dots-6 .dt-dot:nth-child(4){ align-self:center;justify-self:end; }
    .dt-dots-6 .dt-dot:nth-child(5){ align-self:end;justify-self:start; }
    .dt-dots-6 .dt-dot:nth-child(6){ align-self:end;justify-self:end; }
    .dt-overlay {
      position:fixed; inset:0; background:rgba(0,0,0,0.88); backdrop-filter:blur(6px);
      display:flex; align-items:center; justify-content:center;
      z-index:200; padding:1rem; opacity:0; pointer-events:none; transition:opacity .3s;
    }
    .dt-overlay.dt-show { opacity:1; pointer-events:all; }
    .dt-modal {
      background:linear-gradient(135deg,#1c0814,#0d0d0d);
      border:1.5px solid rgba(255,255,255,0.08); border-radius:22px; padding:1.6rem;
      max-width:400px; width:100%; text-align:center;
      transform:scale(0.88); transition:transform .3s cubic-bezier(.34,1.56,.64,1);
      box-shadow:0 24px 60px rgba(0,0,0,0.7);
    }
    .dt-overlay.dt-show .dt-modal { transform:scale(1); }
    .dt-task-mild    { background:rgba(74,222,128,0.08);  color:#4ade80; border:1px solid rgba(74,222,128,0.25); }
    .dt-task-spicy   { background:rgba(250,204,21,0.08);  color:#facc15; border:1px solid rgba(250,204,21,0.25); }
    .dt-task-hot     { background:rgba(249,115,22,0.08);  color:#f97316; border:1px solid rgba(249,115,22,0.25); }
    .dt-task-extreme { background:rgba(244,63,94,0.08);   color:#f43f5e; border:1px solid rgba(244,63,94,0.25); }
    .dt-count-btn {
      flex:1; min-width:36px; padding:0.5rem 0.3rem; border-radius:10px;
      border:2px solid rgba(255,255,255,0.1); background:#1a0814;
      color:#6a3a50; font-family:Georgia,serif; font-size:1rem; font-weight:bold;
      cursor:pointer; transition:all .2s;
    }
    .dt-count-btn.dt-sel {
      background:linear-gradient(135deg,#7b3fa8,#c9446a); border-color:#c9446a; color:#fff;
      box-shadow:0 4px 14px rgba(201,68,106,0.4);
    }
    .dt-gender { display:flex; border-radius:8px; overflow:hidden; border:1.5px solid rgba(255,255,255,0.1); flex-shrink:0; }
    .dt-gender button { padding:.42rem .55rem; border:none; background:#1a0814; color:#475569; font-size:.85rem; font-weight:800; cursor:pointer; transition:all .18s; font-family:inherit; }
    .dt-gender button.dt-gm { background:#7b3fa8; color:#fff; }
    .dt-gender button.dt-gf { background:#c9446a; color:#fff; }
    .dt-confetti { position:fixed; inset:0; pointer-events:none; z-index:199; }
    .dt-btn-accept {
      width:100%; padding:16px; border:none; border-radius:16px; cursor:pointer;
      background:linear-gradient(135deg,#16a34a,#4ade80);
      color:#fff; font-family:Georgia,serif; font-size:1.1rem; font-weight:bold;
      box-shadow:0 6px 20px rgba(74,222,128,0.4); letter-spacing:0.04em;
      transition:transform .15s, box-shadow .15s;
    }
    .dt-btn-accept:active { transform:scale(0.97); }
    .dt-btn-reject {
      width:100%; padding:14px; border:none; border-radius:16px; cursor:pointer;
      background:linear-gradient(135deg,#dc2626,#f43f5e);
      color:#fff; font-family:Georgia,serif; font-size:1rem; font-weight:bold;
      box-shadow:0 6px 20px rgba(244,63,94,0.4); letter-spacing:0.04em;
      transition:transform .15s, box-shadow .15s; margin-top:8px;
    }
    .dt-btn-reject:active { transform:scale(0.97); }
    .dt-reject-warn { font-size:11px; color:#f43f5e; margin-top:5px; opacity:0.85; }
  `;
  document.head.appendChild(s);
}

// ── Player colours ────────────────────────────────────────────────────────────

const DT_PLAYER_COLORS = [
  { main:"#7b3fa8", light:"#c084fc" },
  { main:"#c9446a", light:"#f9a8d4" },
  { main:"#10b981", light:"#6ee7b7" },
  { main:"#f59e0b", light:"#fcd34d" },
  { main:"#06b6d4", light:"#67e8f9" },
  { main:"#a855f7", light:"#d8b4fe" },
];

// ── Dare Data ─────────────────────────────────────────────────────────────────
// who    : "any" | "m" | "f"
// target : "any"|"mf"|"f"|"m"|"allF"|"allM"|"allOthers"|"none"
// text   : use {target} for single, {targets} for plural multi-target

const DT_TASKS = {
  mild: [
    { emoji:"👃", who:"any", target:"f",  text:"Let {target} draw a moustache on your face with her make-up." },
    { emoji:"😘", who:"any", target:"mf",  text:"Blow a kiss to {target}." },
    { emoji:"🌬️", who:"any", target:"mf",  text:"Whisper something seductive in {target}'s ear." },
    { emoji:"💆", who:"any", target:"mf",  text:"Give {target} a 30-second shoulder massage." },
    { emoji:"👁️", who:"any", target:"mf",  text:"Stare into {target}'s eyes without blinking for 15 seconds." },
    { emoji:"🍓", who:"any", target:"mf",  text:"Let {target} feed you a snack using only their hands." },
    { emoji:"🚶", who:"any", target:"none", text:"Do your best sexy walk across the room." },
    { emoji:"🪑", who:"any", target:"mf",  text:"Sit on {target}'s lap for the next two rounds, facing away from them." },
    { emoji:"✋", who:"any", target:"mf",  text:"Let {target} run their fingers through your hair for 20 seconds." },
    { emoji:"🤝", who:"any", target:"mf",  text:"Hold hands with {target} until your next turn." },
    { emoji:"💬", who:"any", target:"mf",  text:"Give {target} a compliment about their body." },
    { emoji:"😉", who:"any", target:"any",  text:"Wink at {target} every time they speak until your next roll." },
    { emoji:"🏷️", who:"any", target:"any",  text:"Let {target} pick a nickname for you and use it for the rest of the game." },
    { emoji:"💋", who:"any", target:"mf",  text:"Give {target} a forehead kiss and tell them one thing you find attractive about them." },
    { emoji:"💇", who:"any", target:"any",  text:"Let {target} fix or style your hair however they want for 30 seconds." },
    { emoji:"👀", who:"any", target:"mf",  text:"Hold eye contact with {target} and slowly bite your lip for 10 seconds." },
	{ emoji:"🦶", who:"any", target:"mf",  text:"Give {target} a foot massage until your next roll." },
    { emoji:"❤️", who:"any", target:"mf",  text:"Trace a heart on {target}'s hand with your fingertip." },
    { emoji:"👃", who:"any", target:"mf",  text:"Let {target} smell your neck and guess your perfume or cologne." },
    { emoji:"🎵", who:"any", target:"mf",  text:"Let {target} choose a song — you have to sway to it with them for 20 seconds." },
    { emoji:"🤫", who:"f", target:"mf",  text:"Whisper a genuine compliment to {target} so no one else can hear it." },
  ],
	
  spicy: [
    { emoji:"👃", who:"any", target:"mf",  text:"Stand nose to nose with {target} for 20 seconds with your hands on their buttocks." },
    { emoji:"👙", who:"any", target:"none", text:"Strip down to your underwear until your next roll." },
    { emoji:"💆", who:"any", target:"mf",  text:"Give {target} a 60-second back rub under their shirt." },
    { emoji:"☝️", who:"any", target:"mf",  text:"Let {target} trace their finger slowly up your inner arm and neck for 20 seconds." },
    { emoji:"🪑", who:"any", target:"mf",  text:"Sit in {target}'s lap facing them until your next roll." },
    { emoji:"👚", who:"any", target:"mf",  text:"Let {target} remove one item of your clothing of their choice." },
    { emoji:"💋", who:"any", target:"mf",  text:"Nuzzle and kiss {target}'s neck for 15 seconds." },
    { emoji:"💃", who:"any", target:"none", text:"Do a slow, flirtatious dance in front of the group for 30 seconds." },
    { emoji:"💄", who:"any", target:"mf",  text:"Let {target} apply lip balm to your lips using their finger." },
    { emoji:"☝️", who:"any", target:"mf",  text:"Let {target} slowly trace their finger along your collarbone for 15 seconds." },
    { emoji:"🪑", who:"any", target:"mf",  text:"Sit back-to-back with {target}, close your eyes, and describe how their body feels against yours." },
    { emoji:"😬", who:"any", target:"mf",  text:"Let {target} tuck a small item into your waistband using only their teeth." },
    { emoji:"💋", who:"any", target:"mf",  text:"Give {target} a slow, deliberate kiss on the hand, working up to the wrist." },
    { emoji:"👗", who:"any", target:"none", text:"Unbutton or unzip one item of your own clothing and leave it that way from now on." },
    { emoji:"💨", who:"any", target:"mf",  text:"Let {target} choose which side of your neck they want to breathe on for 10 seconds — no touching." },
    { emoji:"🛋️", who:"any", target:"mf",  text:"Lie face up, with your head in {target}'s lap until your next roll." },
    { emoji:"🙈", who:"any", target:"any",  text:"Let {target} blindfold you with a piece of clothing and guess who touches your hand." },
  ],
	
  hot: [
    { emoji:"🫦", who:"any", target:"mf",  text:"Suck {target}'s finger for 5 seconds, maintaining eye contact." },
    { emoji:"🪴", who:"any", target:"f",  text:"Let {target} draw on your back with her make-up." },
    { emoji:"💋", who:"any", target:"mf",   text:"Kiss {target} on the lips for 5 seconds." },
	{ emoji:"🦶", who:"any", target:"mf",  text:"Suck on {target}'s toes until your next roll." },
    { emoji:"🤗", who:"f", target:"any",   text:"Hold {target} from behind and slow dance for 30 seconds with your hand on their crotch." },
    { emoji:"😘", who:"any", target:"mf",   text:"Kiss {target} on the open mouth, with tongue, for 5 seconds." },
    { emoji:"🖐️", who:"any", target:"mf",  text:"Spank {target} four times." },
    { emoji:"💋", who:"any", target:"mf",  text:"Let {target} kiss your body anywhere below the neck — one kiss, their choice." },
	{ emoji:"🌶️", who:"any", target:"mf", text:"Go with {target} to a different room and exchange underwear." },
    { emoji:"💃", who:"any", target:"mf",  text:"Give {target} a lap dance for the duration of one full song." },
    { emoji:"😵", who:"any", target:"mf",  text:"Allow {target} to blindfold you and kiss you anywhere twice." },
    { emoji:"👕", who:"f", target:"none", text:"Remove your top (and bra) and remain fully topless until your next roll." },
	{ emoji:"👕", who:"m", target:"none", text:"Remove your shirt and remain topless until your next roll." },
	{ emoji:"🛋️", who:"any", target:"mf",  text:"Lie with your head in {target}'s lap, face into their crotch, until your next roll." },
    { emoji:"💋", who:"any", target:"mf",  text:"Kiss {target} passionately — they decide when it stops, up to 30 seconds." },
    { emoji:"🧊", who:"any", target:"mf",  text:"Let {target} pour a small amount of ice water on your chest and lick it off." },
    { emoji:"🕺", who:"any", target:"mf",  text:"Standing, grind slowly against {target} for 30 seconds." },
	{ emoji:"🍑", who:"any", target:"mf",  text:"Put {target} on all fours — dry-hump in doggy style for 10 seconds." },
    { emoji:"💋", who:"any", target:"mf",  text:"Remove your top and let {target} kiss up your spine from the small of your back to your neck." },
    { emoji:"🦵", who:"any", target:"mf",  text:"Straddle {target} as they lie down and maintain eye contact for 30 seconds — no other movement." },
    { emoji:"🍯", who:"any", target:"mf",  text:"Let {target} pour something sweet on your collarbone and lick it off slowly." },
    { emoji:"😤", who:"any", target:"mf",  text:"Make out with {target}'s jaw and neck for 20 seconds — they must stay still." },
    { emoji:"👖", who:"any", target:"mf",  text:"Let {target} pull you in by the belt loops and kiss you however they choose for 15 seconds." },
    { emoji:"🩲", who:"any", target:"none", text:"Remove your bottoms and stay that way unti your next roll." },
    { emoji:"🔥", who:"any", target:"mf",  text:"Whisper step-by-step exactly what you'd do to {target} in bed — take at least 30 seconds." },
    { emoji:"🙌", who:"any", target:"mf",  text:"Let {target} pin your wrists above your head and kiss your neck for 20 seconds." },
    { emoji:"🫂", who:"any", target:"mf",  text:"Give {target} a full-body press — chest to chest, hips to hips — and hold for 20 seconds." },
    { emoji:"😈", who:"any", target:"mf",  text:"Let {target} choose one spot on your body to leave a mark." },
  ],
	
  extreme: [
    { emoji:"🔥", who:"any", target:"none",    text:"Strip completely naked for the rest of the game." },
    { emoji:"😈", who:"any", target:"mf",      text:"Let {target} blindfold you and do whatever they want for 30 seconds." },
    { emoji:"🫦", who:"any", target:"mf",      text:"French kiss {target} for 5 full seconds." },
    { emoji:"🔑", who:"any", target:"mf",     text:"Let {target} undress one item of your clothing of their choice." },
	{ emoji:"🍑", who:"any", target:"mf",  text:"Put your hand down the back of {target}'s underwear and rest your finger on their asshole until your next roll." },
	{ emoji:"💋", who:"any", target:"mf",      text:"Kiss every inch of {target}'s face — forehead to chin." },
    { emoji:"🫣", who:"any", target:"mf",     text:"Give {target} a 2-minute massage of their choice." },
	{ emoji:"🦵", who:"f", target:"mf",  text:"Strip to your panties (or fully naked if you dare) and straddle {target}'s thigh as they lie down. Grind your pussy on their thigh for 30 seconds. " },
	{ emoji:"🤗", who:"f", target:"m",   text:"Hold {target} from behind and slow dance for 30 seconds with your hand down the front of their underpants.  If they get hard, squeeze it." },
	{ emoji:"🤗", who:"any", target:"f",   text:"Hold {target} from behind and slow dance for 30 seconds with your hand down the front of their panties.  If they get wet, slip in a finger." },
	{ emoji:"🍑", who:"any", target:"mf",  text:"Put both hands down the back of {target}'s underwear, gripping their buttock and kiss for 10 seconds." },
    { emoji:"🔥", who:"any", target:"mf",     text:"Both you and {target} go fully topless for the remainder of the game." },
    { emoji:"💃", who:"any", target:"mf",      text:"Perform a lap dance for {target} — 60 full seconds." },
    { emoji:"🌡️", who:"any", target:"none",   text:"Strip completely naked for the rest of the game." },
    { emoji:"🫦", who:"f",   target:"none",     text:"Finger yourself for 10 seconds as everyone watches." },
    { emoji:"🖐️", who:"f", target:"any",    text:"Finger yourself for 5 seconds and invite {target} to lick your fingers after." },
	{ emoji:"🖐️", who:"f", target:"any",    text:"Grab the hand of {target} and hold it directly against your pussy for 30 seconds.  If they slipped in a finger, lick it." },
    { emoji:"👄", who:"any", target:"mf",     text:"Let {target} use their mouth anywhere on your body below the neck for 20 seconds." },
    { emoji:"👅", who:"any", target:"mf",      text:"With the tip of your tongue only, perform oral teasing on {target} for 3 seconds." },
    { emoji:"🗳️", who:"any", target:"none",   text:"Let the group decide one explicit act you perform for 15 seconds — majority rules." },
    { emoji:"🎨", who:"any", target:"mf",     text:"Remove all clothing and let {target} body-paint a design on you using only nutella and their hands." },
    { emoji:"🔥", who:"any", target:"mf",     text:"Grind against {target} with NO CLOTHING between you for 10 seconds." },
	{ emoji:"👅", who:"any", target:"f",      text:"Go to a different room with {target} and lick their naked pussy.  Return within 1 minute." },
	{ emoji:"🔥", who:"any", target:"allF",     text:"{targets} will expose their nipples and let you lick or suck each one for 10 seconds.  Whoever has the hardest nipples after has to lick yours." },
    { emoji:"😵", who:"any", target:"mf",     text:"Let {target} blindfold you and touch you anywhere they choose for 30 seconds." },
    { emoji:"😈", who:"any", target:"mf",      text:"Act out your most explicit fantasy with {target} for 45 seconds — no limits." },
    { emoji:"📱", who:"m",   target:"f",       text:"Go off to another room. Send a photo of your erect penis to {target}." },
	{ emoji:"📱", who:"f",   target:"any",       text:"Go off to another room. Send a photo of your spread pussy to {target}." },
    { emoji:"💦", who:"any", target:"allF",    text:"Directly squeeze the breasts of {targets}. 10 seconds each person." },
	{ emoji:"💦", who:"f", target:"allM",    text:"Put hand downs the pants and directly hold the dick and balls of {targets} for 15 seconds each.  Did anyone get hard?" },
    { emoji:"👁️", who:"any", target:"any",     text:"Touch yourself while {target} watches for 20 seconds — maintain eye contact." },
    { emoji:"🎬", who:"any", target:"mf",     text:"Let {target} direct you verbally through a 30-second act of their choosing." },
	{ emoji:"🍑", who:"m", target:"allF",  text:"Get {target}'s on all fours with exposed buttocks. Sensually kiss each butt twice." },
    { emoji:"🫦", who:"f", target:"m",     text:"Perform a 20-second act of oral on {target}'s fingers the way you would on their dick." },
    { emoji:"💋", who:"any", target:"allOthers", text:"Let two players simultaneously kiss different parts of your body for 15 seconds." },
    { emoji:"🔗", who:"any", target:"mf",     text:"Remove all clothing and let {target} tie your hands loosely for the remainder of the dare." },
    { emoji:"🕺", who:"any", target:"mf",     text:"Grind against {target} until the group counts down from 20 — eye contact required." },
    { emoji:"🔥", who:"any", target:"mf",     text:"Let {target} choose a sensitive area and spend 30 seconds focused entirely on it." },
    { emoji:"😵", who:"any", target:"mf",     text:"Perform your favourite explicit act on {target} for 30 seconds — narrate it as you go." },
    { emoji:"🙈", who:"any", target:"allOthers", text:"Let the group blindfold you — two players take turns touching you and you guess who." },
  ],
};

// ── Board layout ──────────────────────────────────────────────────────────────

const DT_COLS  = 6;
const DT_TOTAL = 47; // 0=START, 1-45 dare squares, 46=FINISH

// Zone: squares 1-12 mild, 13-24 spicy, 25-36 hot, 37-45 extreme
function dtSquareDiff(n) {
  if (n >= 1  && n <= 12) return "mild";
  if (n >= 13 && n <= 24) return "spicy";
  if (n >= 25 && n <= 36) return "hot";
  return "extreme";
}

const DT_TRAIL_COORDS = (() => {
  const coords = []; let row = 0;
  for (let n = 0; n < DT_TOTAL; n++) {
    const pos = n % DT_COLS;
    const col = (row % 2 === 0) ? pos : (DT_COLS - 1 - pos);
    coords.push({ col, row });
    if (pos === DT_COLS - 1) row++;
  }
  return coords;
})();

const DT_RESULT_ROTATION = {
  1:{x:-25,y:30}, 2:{x:-115,y:30}, 3:{x:-25,y:-60},
  4:{x:-25,y:120}, 5:{x:65,y:30},  6:{x:-25,y:210},
};
const DT_FACE_IDS = {1:"dtf-front",2:"dtf-top",3:"dtf-right",4:"dtf-left",5:"dtf-bottom",6:"dtf-back"};
const DT_DICE_EMOJI = ["⚀","⚁","⚂","⚃","⚄","⚅"];

function dtShuffle(arr) {
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
}

// ── Target resolution ─────────────────────────────────────────────────────────

function dtResolveTargets(activeP, rule, numPlayers, playerGenders, playerNames) {
  // Returns { single: index|null, multiple: index[]|null }
  const others = [];
  for (let i=0; i<numPlayers; i++) if (i!==activeP) others.push(i);
  if (!others.length) return { single:null, multiple:[] };

  const pick = arr => arr.length ? arr[Math.floor(Math.random()*arr.length)] : null;
  const myGender = playerGenders[activeP];

  if (rule === "none") return { single:null, multiple:[] };

  if (rule === "any") {
    return { single:pick(others), multiple:others };
  }
  if (rule === "mf") {
    // male player → targets female; female → targets any
    const pool = (myGender==="m") ? others.filter(i=>playerGenders[i]==="f") : others;
    const resolved = pool.length ? pool : others;
    return { single:pick(resolved), multiple:resolved };
  }
  if (rule === "f") {
    const pool = others.filter(i=>playerGenders[i]==="f");
    const resolved = pool.length ? pool : others;
    return { single:pick(resolved), multiple:resolved };
  }
  if (rule === "m") {
    const pool = others.filter(i=>playerGenders[i]==="m");
    const resolved = pool.length ? pool : others;
    return { single:pick(resolved), multiple:resolved };
  }
  if (rule === "allF") {
    const pool = others.filter(i=>playerGenders[i]==="f");
    return { single:pool[0]??null, multiple:pool.length ? pool : [] };
  }
  if (rule === "allM") {
    const pool = others.filter(i=>playerGenders[i]==="m");
    return { single:pool[0]??null, multiple:pool.length ? pool : [] };
  }
  if (rule === "allOthers") {
    return { single:others[0]??null, multiple:others };
  }
  return { single:pick(others), multiple:others };
}

function dtFormatTargets(indices, playerNames) {
  if (!indices || !indices.length) return "another player";
  const names = indices.map(i => playerNames[i]);
  if (names.length === 1) return names[0];
  return names.slice(0,-1).join(", ") + " and " + names[names.length-1];
}

// ── Dare picker ───────────────────────────────────────────────────────────────
// Picks a random dare from the correct category that:
//  - is eligible for this player's gender (who)
//  - hasn't been seen by this player before
//  - has a valid target available if needed

function dtPickDare(category, activeP, playerGender, numPlayers, playerGenders, playerNames, seenByPlayer) {
  const pool = DT_TASKS[category] || DT_TASKS.mild;

  // Filter to eligible dares for this player
  const eligible = pool.filter(d => {
    if (d.who !== "any" && d.who !== playerGender) return false;
    // Check target feasibility
    const { single, multiple } = dtResolveTargets(activeP, d.target||"none", numPlayers, playerGenders, playerNames);
    if (d.target !== "none" && d.target) {
      if (d.target.startsWith("all")) { if (!multiple || !multiple.length) return false; }
      else { if (single === null && d.target !== "none") return false; }
    }
    return true;
  });

  if (!eligible.length) return null;

  // Filter unseen
  const unseen = eligible.filter(d => !seenByPlayer.has(d));
  const candidates = unseen.length ? unseen : eligible; // fallback if all seen

  return candidates[Math.floor(Math.random()*candidates.length)];
}

// ── Setup Screen ──────────────────────────────────────────────────────────────

function DareTrailSetup({ onStart }) {
  const [count,  setCount]  = useState(2);
  const [names,  setNames]  = useState(["","","","","",""]);
  const [genders,setGenders]= useState(["m","f","m","f","m","f"]);

  function setName(i,v){ const n=[...names]; n[i]=v; setNames(n); }
  function setGender(i,g){ const gs=[...genders]; gs[i]=g; setGenders(gs); }

  function handleStart(){
    const pNames=[], pGenders=[];
    for(let i=0;i<count;i++){
      pNames.push(names[i].trim()||`Player ${i+1}`);
      pGenders.push(genders[i]);
    }
    onStart({ count, playerNames:pNames, playerGenders:pGenders });
  }

  return (
    <div style={{animation:"fadeUp .35s ease",maxWidth:"520px",width:"100%",display:"flex",flexDirection:"column",alignItems:"center",padding:"0 0 32px"}}>
      <div style={{textAlign:"center",marginBottom:"24px"}}>
        <h2 style={{fontFamily:"Georgia,serif",fontSize:"1.7rem",fontWeight:"bold",
          background:"linear-gradient(135deg,#c084fc,#f9a8d4,#facc15)",
          WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",
          margin:0,letterSpacing:"1px"}}>🎲 The Dare Trail</h2>
        <p style={{color:"#6a3a50",fontSize:"13px",marginTop:"6px",fontFamily:"Georgia,serif",fontStyle:"italic"}}>
          45 squares of escalating chaos — dare to finish?
        </p>
      </div>

      <div style={{background:"linear-gradient(135deg,#1c0814,#0d0d0d)",border:"1px solid #2a1a28",borderRadius:"20px",padding:"22px 18px",width:"100%",boxShadow:"0 20px 50px rgba(0,0,0,0.5)"}}>
        <div style={{fontSize:"10px",letterSpacing:"0.16em",textTransform:"uppercase",color:"#3a2030",marginBottom:"10px"}}>How many players?</div>
        <div style={{display:"flex",gap:"8px",marginBottom:"20px"}}>
          {[2,3,4,5,6].map(n=>(
            <button key={n} className={"dt-count-btn"+(count===n?" dt-sel":"")} onClick={()=>setCount(n)}>{n}</button>
          ))}
        </div>

        <div style={{fontSize:"10px",letterSpacing:"0.16em",textTransform:"uppercase",color:"#3a2030",marginBottom:"10px"}}>Player names &amp; gender</div>
        <div style={{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"20px"}}>
          {Array.from({length:count},(_,i)=>{
            const c=DT_PLAYER_COLORS[i];
            return (
              <div key={i} style={{display:"flex",alignItems:"center",gap:"8px"}}>
                <div style={{width:"28px",height:"28px",borderRadius:"50%",background:c.main,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:"bold",color:"#fff",flexShrink:0,border:"2px solid rgba(255,255,255,0.2)"}}>{i+1}</div>
                <input type="text" placeholder={`Player ${i+1}`} maxLength={16} value={names[i]}
                  onChange={e=>setName(i,e.target.value)}
                  style={{flex:1,background:"#0e0810",border:"1.5px solid #2a1a28",borderRadius:"10px",color:"#e8cdd8",fontFamily:"inherit",fontSize:"14px",padding:"8px 12px",outline:"none"}}/>
                <div className="dt-gender">
                  <button className={genders[i]==="m"?"dt-gm":""} onClick={()=>setGender(i,"m")}>♂</button>
                  <button className={genders[i]==="f"?"dt-gf":""} onClick={()=>setGender(i,"f")}>♀</button>
                </div>
              </div>
            );
          })}
        </div>

        <button onClick={handleStart}
          style={{width:"100%",background:"linear-gradient(135deg,#7b3fa8,#c9446a)",border:"none",borderRadius:"50px",color:"#fff",fontFamily:"Georgia,serif",fontSize:"1.1rem",fontWeight:"bold",padding:"16px",cursor:"pointer",boxShadow:"0 6px 24px rgba(201,68,106,0.4)",letterSpacing:"0.1em"}}>
          🎲 Start Game
        </button>
      </div>
    </div>
  );
}

// ── Game Screen ───────────────────────────────────────────────────────────────

function DareTrailGame({ config, onNewGame }) {
  const { count:numPlayers, playerNames, playerGenders } = config;

  const [tick,      setTick]    = useState(0);
  const [modal,     setModal]   = useState(null);
  const [winP,      setWinP]    = useState(null);
  const [rolling,   setRolling] = useState(false);
  const [logLines,  setLog]     = useState([]);
  const [showCaution, setShowCaution] = useState(true);

  const stateRef   = useRef(null);
  // seenDares: array of Sets, one per player — tracks dare objects already shown
  const seenDares  = useRef([]);
  const avatarEls  = useRef([]);
  const nodeRRef   = useRef(28);
  const wrapRef    = useRef(null);
  const canvasRef  = useRef(null);
  const svgRef     = useRef(null);
  const cubeRef    = useRef(null);
  const confRef    = useRef(null);
  const animRef    = useRef(null);
  const builtRef   = useRef(false);

  const forceUpdate = () => setTick(t=>t+1);

  useEffect(()=>{
    stateRef.current = {
      current:0,
      pos:Array(numPlayers).fill(0),
      awaitingTask:false,
    };
    seenDares.current = Array.from({length:numPlayers}, ()=>new Set());
    forceUpdate();
  },[]);

  useEffect(()=>{
    if(!wrapRef.current) return;
    buildBoard(); builtRef.current=true;
    const onResize=()=>{ clearTimeout(window._dtRT); window._dtRT=setTimeout(buildBoard,220); };
    window.addEventListener("resize",onResize);
    return ()=>window.removeEventListener("resize",onResize);
  },[tick===1?tick:undefined]);

  useEffect(()=>{ if(tick>0&&wrapRef.current&&!builtRef.current) buildBoard(); },[tick]);

  // ── Board ──────────────────────────────────────────────────────────────────

  function buildBoard(){
    const wrap=wrapRef.current, canvas=canvasRef.current, svg=svgRef.current;
    if(!wrap||!canvas||!svg) return;
    canvas.innerHTML=""; svg.innerHTML="";
    const W=wrap.clientWidth||360;
    const nodeR=Math.floor(W*0.074); nodeRRef.current=nodeR;
    const colW=W/DT_COLS, rowH=nodeR*3.2;
    const numRows=Math.ceil(DT_TOTAL/DT_COLS);
    const boardH=numRows*rowH+nodeR*1.5;
    canvas.style.height=boardH+"px"; wrap.style.height=boardH+"px";

    const pxPos=DT_TRAIL_COORDS.map(({col,row})=>({
      x:colW*col+colW/2, y:nodeR*1.2+row*rowH,
    }));

    const pathD=pxPos.map(({x,y},i)=>(i===0?`M ${x} ${y}`:`L ${x} ${y}`)).join(" ");
    const mkP=(stroke,sw,dash="")=>{
      const p=document.createElementNS("http://www.w3.org/2000/svg","path");
      p.setAttribute("d",pathD); p.setAttribute("fill","none");
      p.setAttribute("stroke",stroke); p.setAttribute("stroke-width",sw);
      p.setAttribute("stroke-linecap","round"); p.setAttribute("stroke-linejoin","round");
      if(dash) p.setAttribute("stroke-dasharray",dash);
      return p;
    };
    svg.appendChild(mkP("rgba(201,68,106,0.12)",nodeR*0.9));
    svg.appendChild(mkP("rgba(123,63,168,0.3)",nodeR*0.45,`${nodeR*0.1} ${nodeR*0.6}`));

    [{from:1,to:12,color:"rgba(74,222,128,0.25)"},{from:13,to:24,color:"rgba(250,204,21,0.25)"},
     {from:25,to:36,color:"rgba(249,115,22,0.25)"},{from:37,to:45,color:"rgba(244,63,94,0.25)"}]
    .forEach(({from,to,color})=>{
      let zD=`M ${pxPos[from].x} ${pxPos[from].y}`;
      for(let i=from+1;i<=to&&i<pxPos.length;i++) zD+=` L ${pxPos[i].x} ${pxPos[i].y}`;
      svg.appendChild(mkP(color,nodeR*0.35));
    });

    pxPos.forEach(({x,y},n)=>{
      const isStart=n===0, isFinish=n===46;
      const node=document.createElement("div");
      node.className="dt-node"; node.id=`dtnode-${n}`;
      node.style.cssText=`left:${x}px;top:${y}px;width:${nodeR*2}px;height:${nodeR*2}px;`;
      const inner=document.createElement("div"); inner.className="dt-node-inner";
      if(isStart){
        node.classList.add("dt-startnode");
        inner.innerHTML=`<span style="font-size:${nodeR*0.55}px">🏁</span><span style="font-family:Georgia,serif;font-size:${nodeR*0.35}px;color:#e8cdd8">START</span>`;
      } else if(isFinish){
        node.classList.add("dt-finishnode");
        inner.innerHTML=`<span style="font-size:${nodeR*0.55}px">🏆</span><span style="font-family:Georgia,serif;font-size:${nodeR*0.35}px;color:#facc15">END</span>`;
      } else {
        const diff=dtSquareDiff(n);
        node.classList.add(`dt-${diff}`);
        const numEl=document.createElement("div"); numEl.className="dt-num";
        numEl.style.fontSize=nodeR*0.55+"px"; numEl.textContent=n;
        inner.appendChild(numEl);
        // No click handler — tiles are decorative only
      }
      node.appendChild(inner); canvas.appendChild(node);
    });

    const st=stateRef.current;
    if(st){ const pos=st.pos[st.current]; const el=document.getElementById(`dtnode-${pos}`); if(el&&pos>0&&pos<46) el.classList.add("dt-current"); }
    buildAvatars();
  }

  function buildAvatars(){
    document.querySelectorAll(".dt-avatar").forEach(e=>e.remove());
    avatarEls.current=[];
    const canvas=canvasRef.current;
    if(!canvas||!stateRef.current) return;
    const sz=Math.max(nodeRRef.current*1.1,20);
    for(let p=0;p<numPlayers;p++){
      const c=DT_PLAYER_COLORS[p];
      const av=document.createElement("div"); av.className="dt-avatar"; av.id=`dtav-${p}`;
      av.style.cssText=`width:${sz}px;height:${sz}px;font-size:${Math.max(sz*0.45,9)}px;background:${c.main};box-shadow:0 4px 14px ${c.main}88;`;
      const lbl=document.createElement("span"); lbl.textContent=playerNames[p][0].toUpperCase();
      av.appendChild(lbl); canvas.appendChild(av); avatarEls.current.push(av);
    }
    for(let p=0;p<numPlayers;p++) placeAvatar(p,stateRef.current.pos[p],false);
  }

  function nodeCenter(n){
    const el=document.getElementById(`dtnode-${n}`);
    if(!el) return null;
    return {x:parseFloat(el.style.left),y:parseFloat(el.style.top)};
  }

  function placeAvatar(p,pos,animate=true){
    const av=avatarEls.current[p]; if(!av) return;
    const c=nodeCenter(pos); if(!c) return;
    const offs=[{dx:0,dy:0},{dx:8,dy:-8},{dx:-8,dy:8},{dx:8,dy:8},{dx:-8,dy:-8},{dx:0,dy:10}];
    const off=offs[p%offs.length];
    if(!animate){
      av.style.transition="none";
      av.style.left=(c.x+off.dx)+"px"; av.style.top=(c.y+off.dy)+"px";
      av.style.transform="translate(-50%,-50%)";
      requestAnimationFrame(()=>{ av.style.transition="left .22s cubic-bezier(.34,1.56,.64,1),top .22s cubic-bezier(.34,1.56,.64,1)"; });
    } else {
      av.style.left=(c.x+off.dx)+"px"; av.style.top=(c.y+off.dy)+"px";
      av.style.transform="translate(-50%,-50%)";
    }
  }

  function animateMove(p,fromPos,toPos,onDone,backwards=false){
    const av=avatarEls.current[p]; let cur=fromPos;
    const step=backwards?-1:1;
    function go(){
      cur+=step;
      const nd=document.getElementById(`dtnode-${cur}`);
      if(nd){ nd.style.transform="translate(-50%,-50%) scale(1.25)"; setTimeout(()=>{ nd.style.transform=""; },180); }
      placeAvatar(p,cur,true);
      if(av){ av.classList.remove("dt-bounce"); void av.offsetWidth; av.classList.add("dt-bounce"); }
      const done=backwards?(cur<=toPos):(cur>=toPos);
      if(!done) setTimeout(go,280);
      else setTimeout(()=>onDone(),180);
    }
    setTimeout(go,200);
  }

  // ── Dice ──────────────────────────────────────────────────────────────────

  function doRoll(){
    const st=stateRef.current;
    if(rolling||!st||st.awaitingTask) return;
    setRolling(true);
    const roll=Math.floor(Math.random()*6)+1;
    const cube=cubeRef.current;
    if(cube){
      cube.style.transition="none"; cube.style.transform="rotateX(-25deg) rotateY(30deg)";
      document.querySelectorAll(".dt-face").forEach(f=>f.classList.remove("dt-winner"));
      requestAnimationFrame(()=>requestAnimationFrame(()=>{
        cube.style.transition=""; cube.classList.remove("dt-tumble");
        void cube.offsetWidth; cube.classList.add("dt-tumble");
        setTimeout(()=>{
          cube.classList.remove("dt-tumble");
          const r=DT_RESULT_ROTATION[roll];
          cube.style.transition="transform .5s cubic-bezier(.34,1.2,.64,1)";
          cube.style.transform=`rotateX(${r.x}deg) rotateY(${r.y}deg)`;
          const faceEl=document.getElementById(DT_FACE_IDS[roll]);
          if(faceEl) setTimeout(()=>faceEl.classList.add("dt-winner"),350);
          setTimeout(()=>{ cube.style.transition=""; setRolling(false); movePlayer(st.current,roll); },550);
        },2000);
      }));
    } else { setRolling(false); movePlayer(st.current,roll); }
  }

  function movePlayer(p,roll){
    const st=stateRef.current; clearHighlight();
    const fromPos=st.pos[p], newPos=Math.min(fromPos+roll,46);
    addLog(p,`${playerNames[p]} rolled ${DT_DICE_EMOJI[roll-1]} ${roll} → ${newPos===46?"FINISH 🏆":"Square "+newPos}`);
    animateMove(p,fromPos,newPos,()=>{
      st.pos[p]=newPos;
      if(newPos===46){ forceUpdate(); setTimeout(()=>setWinP(p),300); return; }
      const nd=document.getElementById(`dtnode-${newPos}`);
      if(nd) nd.classList.add("dt-current");
      st.awaitingTask=true; forceUpdate();
      setTimeout(()=>presentDare(p,newPos),400);
    });
  }

  function presentDare(activeP, pos){
    const category=dtSquareDiff(pos);
    const dare=dtPickDare(
      category, activeP, playerGenders[activeP],
      numPlayers, playerGenders, playerNames,
      seenDares.current[activeP]
    );
    if(!dare){ endTurn(); return; }

    // Resolve targets
    const {single, multiple}=dtResolveTargets(activeP, dare.target||"none", numPlayers, playerGenders, playerNames);
    let resolvedText=dare.text;
    if(dare.target && dare.target.startsWith("all")){
      resolvedText=resolvedText.replace(/\{targets\}/g, `**${dtFormatTargets(multiple,playerNames)}**`);
    } else if(dare.target && dare.target!=="none"){
      resolvedText=resolvedText.replace(/\{target\}/g, single!==null?`**${playerNames[single]}**`:"**another player**");
    }

    setModal({ dare, resolvedText, diff:category, activeP, pos });
  }

  function handleAccept(){
    const st=stateRef.current;
    const activeP=modal.activeP;
    seenDares.current[activeP].add(modal.dare);
    addLog(activeP,`${playerNames[activeP]} accepted the dare ✅`);
    setModal(null);
    endTurn();
  }

  function handleReject(){
    const st=stateRef.current;
    const activeP=modal.activeP;
    seenDares.current[activeP].add(modal.dare); // mark as seen so not repeated
    addLog(activeP,`${playerNames[activeP]} rejected the dare — moves back 4 spaces ❌`);
    setModal(null);
    // Move back 4 spaces
    const fromPos=st.pos[activeP];
    const toPos=Math.max(fromPos-4,0);
    clearHighlight();
    animateMove(activeP,fromPos,toPos,()=>{
      st.pos[activeP]=toPos;
      const nd=document.getElementById(`dtnode-${toPos}`);
      if(nd&&toPos>0&&toPos<46) nd.classList.add("dt-current");
      forceUpdate();
      endTurn();
    },true);
  }

  function clearHighlight(){ document.querySelectorAll(".dt-current").forEach(e=>e.classList.remove("dt-current")); }

  function endTurn(){
    const st=stateRef.current; st.awaitingTask=false;
    st.current=(st.current+1)%numPlayers; clearHighlight(); forceUpdate();
  }

  function addLog(p,msg){ setLog(prev=>[{p,msg,id:Date.now()+Math.random()},...prev].slice(0,20)); }

  // Confetti
  function startConfetti(){
    const canvas=confRef.current; if(!canvas) return;
    const ctx=canvas.getContext("2d");
    canvas.width=window.innerWidth; canvas.height=window.innerHeight;
    const colors=["#c084fc","#f9a8d4","#facc15","#4ade80","#f97316","#f43f5e"];
    const particles=Array.from({length:90},()=>({
      x:Math.random()*canvas.width,y:Math.random()*-canvas.height,
      r:4+Math.random()*5,color:colors[Math.floor(Math.random()*colors.length)],
      speed:2+Math.random()*2.5,drift:(Math.random()-.5)*1.5,
      angle:Math.random()*Math.PI*2,spin:Math.random()*.1-.05,
    }));
    function draw(){ ctx.clearRect(0,0,canvas.width,canvas.height); particles.forEach(p=>{ ctx.save(); ctx.translate(p.x,p.y); ctx.rotate(p.angle); ctx.fillStyle=p.color; ctx.fillRect(-p.r,-p.r/2,p.r*2,p.r); ctx.restore(); p.y+=p.speed; p.x+=p.drift; p.angle+=p.spin; if(p.y>canvas.height){p.y=-10;p.x=Math.random()*canvas.width;} }); animRef.current=requestAnimationFrame(draw); }
    draw();
  }

  useEffect(()=>{
    if(winP!==null) startConfetti();
    else { if(animRef.current) cancelAnimationFrame(animRef.current); const c=confRef.current; if(c) c.getContext("2d").clearRect(0,0,c.width,c.height); }
  },[winP]);

  // ── Render ────────────────────────────────────────────────────────────────

  const st=stateRef.current;
  const curP=st?.current??0;
  const curC=DT_PLAYER_COLORS[curP];
  const diffLabel={mild:"🟢 MILD",spicy:"🟡 SPICY",hot:"🟠 HOT",extreme:"🔴 EXTREME"};
  const diffColor={mild:"#4ade80",spicy:"#facc15",hot:"#f97316",extreme:"#f43f5e"};

  function renderTask(text){
    return text.split(/(\*\*[^*]+\*\*)/g).map((part,i)=>
      part.startsWith("**")
        ? <span key={i} style={{color:"#facc15",fontWeight:"bold"}}>{part.slice(2,-2)}</span>
        : part
    );
  }

  return (
    <div style={{animation:"fadeUp .35s ease",maxWidth:"560px",width:"100%",position:"relative"}}>
      <canvas className="dt-confetti" ref={confRef}/>

      {/* Caution modal */}
      <div className={"dt-overlay"+(showCaution?" dt-show":"")}>
        <div className="dt-modal" style={{maxWidth:"360px"}}>
          <div style={{fontSize:"2.2rem",marginBottom:"8px"}}>⚠️</div>
          <div style={{fontFamily:"Georgia,serif",fontSize:"1.2rem",color:"#facc15",marginBottom:"12px",letterSpacing:"0.05em"}}>Important Reminder</div>
          <div style={{fontSize:"13px",color:"#8a6070",lineHeight:1.7,marginBottom:"20px",textAlign:"left"}}>
            This game is intended for <strong style={{color:"#e8cdd8"}}>consenting adults only</strong>. All players should agree to the nature of the game before starting. Anyone may reject any dare at any time — no questions asked. Many of the later dares are sexually explicit.
          </div>
          <button onClick={()=>setShowCaution(false)}
            style={{width:"100%",padding:"14px",border:"none",borderRadius:"14px",cursor:"pointer",background:"linear-gradient(135deg,#7b3fa8,#c9446a)",color:"#fff",fontFamily:"Georgia,serif",fontSize:"1rem",fontWeight:"bold",boxShadow:"0 4px 18px rgba(201,68,106,0.4)"}}>
            We all consent — Play on! 🎲
          </button>
        </div>
      </div>

      {/* Players bar */}
      <div style={{display:"flex",gap:"6px",overflowX:"auto",padding:"0 0 10px",scrollbarWidth:"none"}}>
        {Array.from({length:numPlayers},(_,i)=>{
          const c=DT_PLAYER_COLORS[i], isActive=st&&st.current===i;
          return (
            <div key={i} style={{background:"#0e0810",border:`2px solid ${isActive?c.main:"#1a0814"}`,borderRadius:"12px",padding:"8px 10px",flexShrink:0,minWidth:"80px",textAlign:"center",transform:isActive?"translateY(-3px)":"none",boxShadow:isActive?`0 6px 18px ${c.main}55`:"none",transition:"all .3s"}}>
              <div style={{fontFamily:"Georgia,serif",fontSize:"11px",color:c.light,fontWeight:"bold",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"76px"}}>{playerNames[i]}</div>
              <div style={{fontSize:"10px",color:playerGenders[i]==="f"?"#c9446a":"#7b3fa8",fontWeight:"bold"}}>{playerGenders[i]==="f"?"♀":"♂"}</div>
              <div style={{fontSize:"10px",color:"#3a2030",marginTop:"2px"}}>{st?.pos[i]===0?"Start":st?.pos[i]===46?"🏆":"Sq."+st?.pos[i]}</div>
            </div>
          );
        })}
      </div>

      {/* Turn banner + dice */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"16px",padding:"8px 0 6px",flexWrap:"wrap"}}>
        <div style={{fontFamily:"Georgia,serif",fontSize:"14px",padding:"6px 16px",borderRadius:"50px",border:`2px solid ${curC.main}`,background:`linear-gradient(135deg,${curC.main}22,${curC.main}0a)`,color:curC.light,letterSpacing:"0.05em"}}>
          {playerNames[curP]}'s Turn
        </div>
        <div className="dt-dice-scene">
          <div className="dt-cube" ref={cubeRef}>
            {[{id:"dtf-front",cls:"f-front",dots:1},{id:"dtf-back",cls:"f-back",dots:6},
              {id:"dtf-right",cls:"f-right",dots:3},{id:"dtf-left",cls:"f-left",dots:4},
              {id:"dtf-top",cls:"f-top",dots:2},{id:"dtf-bottom",cls:"f-bottom",dots:5}]
            .map(({id,cls,dots})=>(
              <div key={id} id={id} className={`dt-face ${cls}`}>
                <div className={`dt-dots dt-dots-${dots}`}>
                  {Array.from({length:dots},(_,k)=><div key={k} className="dt-dot"/>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{display:"flex",justifyContent:"center",gap:"10px",padding:"4px 0 8px",flexWrap:"wrap"}}>
        {!rolling&&(
          <button disabled={st?.awaitingTask} onClick={doRoll}
            style={{fontFamily:"Georgia,serif",fontSize:"15px",padding:"10px 28px",borderRadius:"50px",border:"none",cursor:st?.awaitingTask?"not-allowed":"pointer",background:`linear-gradient(135deg,${curC.main},${curC.light})`,color:"#fff",opacity:st?.awaitingTask?0.6:1,boxShadow:`0 4px 18px ${curC.main}55`,transition:"all .2s"}}>
            🎲 Roll
          </button>
        )}
        {rolling&&(
          <div style={{fontFamily:"Georgia,serif",fontSize:"15px",padding:"10px 28px",borderRadius:"50px",background:`linear-gradient(135deg,${curC.main}99,${curC.light}66)`,color:"#fff",opacity:0.8}}>
            ✨ Rolling…
          </div>
        )}
        <button onClick={onNewGame}
          style={{fontFamily:"inherit",fontSize:"13px",padding:"10px 18px",borderRadius:"50px",border:"1px solid #2a1a28",background:"#0e0810",color:"#6a3a50",cursor:"pointer"}}>
          ↺ New Game
        </button>
      </div>

      {/* Legend */}
      <div style={{display:"flex",justifyContent:"center",gap:"12px",flexWrap:"wrap",padding:"0 0 8px",fontSize:"11px",color:"#4a2040"}}>
        {[{l:"Mild",c:"#4ade80"},{l:"Spicy",c:"#facc15"},{l:"Hot",c:"#f97316"},{l:"Extreme",c:"#f43f5e"}].map(({l,c})=>(
          <div key={l} style={{display:"flex",alignItems:"center",gap:"4px"}}>
            <div style={{width:"7px",height:"7px",borderRadius:"50%",background:c}}/>
            <span>{l}</span>
          </div>
        ))}
      </div>

      {/* Board */}
      <div ref={wrapRef} style={{position:"relative",width:"100%",overflow:"hidden"}}>
        <svg ref={svgRef} style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",overflow:"visible"}}/>
        <div ref={canvasRef} style={{position:"relative",width:"100%"}}/>
      </div>

      {/* Log */}
      <div style={{padding:"8px 0 16px"}}>
        <div style={{fontSize:"9px",letterSpacing:"0.16em",textTransform:"uppercase",color:"#2a1020",textAlign:"center",marginBottom:"6px"}}>— Game Log —</div>
        <div style={{display:"flex",flexDirection:"column",gap:"3px",maxHeight:"90px",overflowY:"auto"}}>
          {logLines.map(({p,msg,id})=>(
            <div key={id} style={{fontSize:"11px",padding:"4px 10px",borderRadius:"7px",background:"#0e0810",color:"#4a2a50",borderLeft:`3px solid ${DT_PLAYER_COLORS[p].main}`}}>{msg}</div>
          ))}
        </div>
      </div>

      {/* Dare Modal */}
      <div className={"dt-overlay"+(modal&&!winP?" dt-show":"")}>
        <div className="dt-modal">
          {modal&&<>
            <div style={{fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",color:diffColor[modal.diff],marginBottom:"6px"}}>{diffLabel[modal.diff]}</div>
            <div style={{fontSize:"2.8rem",lineHeight:1,marginBottom:"6px"}}>{modal.dare.emoji}</div>
            <div style={{fontFamily:"Georgia,serif",fontSize:"1.05rem",color:"#c9446a",marginBottom:"4px"}}>
              {playerNames[modal.activeP]}'s Dare! 🔥
            </div>
            <div className={`dt-task-${modal.diff}`} style={{fontSize:"15px",fontWeight:"bold",lineHeight:1.6,padding:"14px",borderRadius:"12px",marginBottom:"20px",marginTop:"8px"}}>
              {renderTask(modal.resolvedText)}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"0",width:"100%"}}>
              <button className="dt-btn-accept" onClick={handleAccept}>
                ✅ Dare ACCEPTED
              </button>
              <button className="dt-btn-reject" onClick={handleReject}>
                ❌ Dare REJECTED — Move back 4 spaces
              </button>
              <div className="dt-reject-warn">Rejecting a dare will move you back 4 squares</div>
            </div>
          </>}
        </div>
      </div>

      {/* Win Modal */}
      <div className={"dt-overlay"+(winP!==null?" dt-show":"")}>
        <div className="dt-modal">
          <div style={{fontSize:"4rem",marginBottom:"8px"}}>🏆</div>
          <div style={{fontFamily:"Georgia,serif",fontSize:"1.8rem",color:"#c9446a",marginBottom:"6px"}}>{winP!==null?playerNames[winP]:""} Wins! 🎉</div>
          <div style={{color:"#4a3048",fontSize:"13px",marginBottom:"12px"}}>The Dare Trail has been conquered!</div>
          {winP!==null&&(()=>{
            const isF=playerGenders[winP]==="f";
            if (isF) {
              const others=playerNames.filter((_,i)=>i!==winP);
              const otherList=others.length>1?others.slice(0,-1).join(", ")+" and "+others[others.length-1]:others[0];
              return (
                <div style={{background:"rgba(201,68,106,0.12)",border:"1px solid rgba(201,68,106,0.35)",borderRadius:"14px",padding:"14px 16px",marginBottom:"20px",textAlign:"left"}}>
                  <div style={{fontSize:"1.5rem",textAlign:"center",marginBottom:"6px"}}>🎤</div>
                  <div style={{fontFamily:"Georgia,serif",fontSize:"13px",color:"#f9a8d4",fontWeight:"bold",marginBottom:"6px",textAlign:"center",letterSpacing:"0.05em"}}>
                    🫦 Winner's Prize: Full Oral!
                  </div>
                  <div style={{fontSize:"13px",color:"#a07080",lineHeight:1.7}}>
                    <strong style={{color:"#e8cdd8"}}>{otherList}</strong> must each kiss or lick <strong style={{color:"#facc15"}}>{playerNames[winP]}</strong> all over as she get on all fours.  Give her pussy, mouth, tittie and ass all the loving! 🎵
                  </div>
                </div>
              );
            } else {
              const maleOthers=playerNames.filter((_,i)=>i!==winP&&playerGenders[i]==="m");
              const femaleOthers=playerNames.filter((_,i)=>playerGenders[i]==="f");
              const maleList=maleOthers.length>1?maleOthers.slice(0,-1).join(", ")+" and "+maleOthers[maleOthers.length-1]:maleOthers[0]||null;
              const femaleList=femaleOthers.length>1?femaleOthers.slice(0,-1).join(", ")+" and "+femaleOthers[femaleOthers.length-1]:femaleOthers[0]||null;
              return (
                <div style={{background:"rgba(123,63,168,0.12)",border:"1px solid rgba(123,63,168,0.35)",borderRadius:"14px",padding:"14px 16px",marginBottom:"20px",textAlign:"left"}}>
                  <div style={{fontSize:"1.5rem",textAlign:"center",marginBottom:"6px"}}>🏆</div>
                  <div style={{fontFamily:"Georgia,serif",fontSize:"13px",color:"#c084fc",fontWeight:"bold",marginBottom:"10px",textAlign:"center",letterSpacing:"0.05em"}}>
                    Winner's Prizes
                  </div>
                  {maleList&&(
                    <div style={{fontSize:"13px",color:"#a07080",lineHeight:1.7,marginBottom:"10px",paddingBottom:"10px",borderBottom:femaleList?"1px solid rgba(123,63,168,0.25)":"none"}}>
                      <span style={{fontSize:"1.1rem"}}>🥃</span> <strong style={{color:"#e8cdd8"}}>{maleList}</strong> — leave the room and down a shot of whisky in honour of <strong style={{color:"#facc15"}}>{playerNames[winP]}</strong>! 🥃
                    </div>
                  )}
                  {femaleList&&(
                    <div style={{fontSize:"13px",color:"#a07080",lineHeight:1.7}}>
                      <span style={{fontSize:"1.1rem"}}>🫦</span> <strong style={{color:"#f9a8d4"}}>{femaleList}</strong> — each of you must orally pleasure <strong style={{color:"#facc15"}}>{playerNames[winP]}</strong>, at the same time with him on all fours. Mouth, dick and ass need some loving! 🫦
                    </div>
                  )}
                </div>
              );
            }
          })()}
          <button onClick={onNewGame}
            style={{fontFamily:"Georgia,serif",fontSize:"15px",padding:"12px 28px",borderRadius:"50px",border:"none",cursor:"pointer",background:"linear-gradient(135deg,#7b3fa8,#c9446a)",color:"#fff",boxShadow:"0 4px 18px rgba(201,68,106,0.4)"}}>
            🎲 Play Again
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Top-level screen ──────────────────────────────────────────────────────────

function DareTrailScreen({ onBack }) {
  const [gameConfig,setGameConfig]=useState(null);
  injectDTStyles();
  return (
    <div style={{animation:"fadeUp .35s ease",maxWidth:"560px",width:"100%",position:"relative"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"18px"}}>
        <button onClick={onBack} style={{background:"#141414",border:"1px solid #222",color:"#888",borderRadius:"8px",padding:"7px 13px",cursor:"pointer",fontFamily:"inherit",fontSize:"13px"}}>← Back</button>
        <div style={{textAlign:"center"}}>
          <div style={{color:"#555",fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase",marginBottom:"2px"}}>Hot Extras</div>
          <h2 style={{color:"#e8cdd8",fontSize:"1.3rem",margin:0,fontFamily:"Georgia,serif",fontWeight:"normal"}}>
            Dare <span style={{color:"#c9446a",fontStyle:"italic"}}>Trail</span>
          </h2>
        </div>
        <div style={{width:"72px"}}/>
      </div>
      {!gameConfig
        ? <DareTrailSetup onStart={cfg=>setGameConfig(cfg)}/>
        : <DareTrailGame config={gameConfig} onNewGame={()=>setGameConfig(null)}/>
      }
    </div>
  );
}
