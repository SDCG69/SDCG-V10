// ── Dice face dots layout ────────────────────────────────────────────────────
const DICE_DOTS = {
  1:[[50,50]],
  2:[[28,28],[72,72]],
  3:[[28,28],[50,50],[72,72]],
  4:[[28,28],[72,28],[28,72],[72,72]],
  5:[[28,28],[72,28],[50,50],[28,72],[72,72]],
  6:[[28,25],[72,25],[28,50],[72,50],[28,75],[72,75]],
};

function DiceFace({value,rolling,color}){
  const dots=DICE_DOTS[value]||[];
  return(
    <svg width="72" height="72" viewBox="0 0 100 100" style={{
      display:"block",
      animation:rolling?"diceShake 0.75s ease forwards":(value!=null?"dicePop 0.3s ease forwards":"none"),
      filter:rolling?`drop-shadow(0 0 8px ${color})`:`drop-shadow(0 0 12px ${color}aa)`,
    }}>
      <rect x="4" y="4" width="92" height="92" rx="18" ry="18"
        fill="#1a1a1a" stroke={color} strokeWidth="3"/>
      {dots.map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r="8" fill={color}/>
      ))}
    </svg>
  );
}

// ── Positions data (sexinfo101.com) ─────────────────────────────────────────
