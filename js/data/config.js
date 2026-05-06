const LEVELS=[
  {id:1,name:"Mild",emoji:"😜",color:"#2a5c24"},
  {id:2,name:"Spicy",emoji:"🌶️",color:"#7a4800"},
  {id:3,name:"Hot",emoji:"🔥",color:"#1a2e6e"},
  {id:4,name:"Extreme",emoji:"😈",color:"#6e1a1a"},
];
const MODE={
  Male: {color:"#8B1A1A",card:"linear-gradient(135deg,#5a0f0f,#3a0a0a)",border:"#8B1A1A"},
  Female:{color:"#5B1A8B",card:"linear-gradient(135deg,#3a0a5a,#20063a)",border:"#7B2ABB"},
};
const P_COLORS=["#e05555","#BB86FC"];

// ── Tag categories ────────────────────────────────────────────────────────────
// Add a `tags` array to any challenge object using these IDs.
// Example:
//   {text:"...", emoji:"🦶", tags:["hardbdsm","oral"]}
//
// Available tag IDs:
const TAGS = [
  {id:"foreplay",   	label:"Foreplay",    emoji:"💋", desc:"Foreplay actions to get each other relaxed and horny."},
  {id:"oralsex",   		label:"Oral Sex",    		emoji:"👅", desc:"Giving or receiving pleasure using mouth or tongue."},
	{id:"hardcore",   	label:"Full Sex",    		emoji:"🔥", desc:"Full intercourse with either fingers, toys or penis in vagina."},
  {id:"mildbdsm",			label:"Mild BDSM", 		emoji:"🫦", desc:"This may include being tied or blindfolded with light spanking. Light domination/submission might also be included."},
  {id:"hardbdsm",     label:"Hard BDSM",        emoji:"😱", desc:"This may include fully dominant or submissive actions, hard spanking or whipping or rough play."},
	{id:"xxxfinish",  	label:"XXX Finish",   emoji:"💦", desc:"This involves XXX finishes.  Typically with male ejaculations onto the body or into the mouth of the woman."},
  {id:"mildanal",     label:"Mild Anal",         emoji:"🍑", desc:"Mild anal actions may include light licking or external fingering of the anus or toys/vibrators on the outside of the ass."},
  {id:"hardanal",     label:"Hard Anal",         emoji:"😈", desc:"Hard anal actions may include deep licking and tonguing of the ass, toys or fingers fully inserted into the ass or full anal intercourse."},
];

// ── Item tags (shared toggles — "do you have this item?") ───────────────────
const ITEM_TAGS = [
  {id:"item_blindfold",    label:"Blindfold",    emoji:"🙈", desc:"A blindfold or sleep mask."},
  {id:"item_buttplug",     label:"Butt Plug",    emoji:"🚀", desc:"A butt plug or anal toy."},
  {id:"item_camera",       label:"Camera",       emoji:"📸", desc:"A phone or camera for taking photos or recording video."},
  {id:"item_candle",       label:"Candle",       emoji:"🕯️", desc:"A candle for wax play or sensual ambience."},
  {id:"item_dildo",        label:"Dildo / Toy",  emoji:"🍆", desc:"A dildo, vibrator or similar toy."},
  {id:"item_drink",        label:"Drinks",       emoji:"🍷", desc:"Alcoholic or other drinks for sharing play."},
  {id:"item_feather",      label:"Feather",      emoji:"🪶", desc:"A feather or soft brush for light teasing and tickling."},
  {id:"item_food",         label:"Food",         emoji:"🍓", desc:"Edible treats for sharing or using during play."},
  {id:"item_handcuffs",    label:"Handcuffs",    emoji:"⛓️",  desc:"Handcuffs, rope or restraints for tying up."},
  {id:"item_ice",          label:"Ice",          emoji:"🧊", desc:"Ice cubes needed for certain play."},
  {id:"item_lube",         label:"Lube",         emoji:"🧴", desc:"Lubricant for comfortable anal or intimate play."},
  {id:"item_massage_oil",  label:"Massage Oil",  emoji:"💆", desc:"Massage oil or body oil for sensual massages."},
  {id:"item_whip",         label:"Whip",         emoji:"🦯", desc:"A whip, flogger, belt or paddle for spanking play."},
  {id:"item_whipped_cream",label:"Whipped Cream",emoji:"☁️", desc:"Whipped cream or similar treat for edible play."},
];

const ckey=(m,l,t)=>`${m}|${l}|${t}`;
const ALL_KEYS=new Set();
Object.entries(CHALLENGES).forEach(([m,lvls])=>Object.entries(lvls).forEach(([l,chs])=>chs.forEach(c=>ALL_KEYS.add(ckey(m,Number(l),c.text)))));

function fisherYates(arr){
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
}
function buildQueues(players,disabled,tagPrefs,itemPrefs){
  // Build the union of rejected tags across BOTH players —
  // if either player sets a tag to OFF it is excluded for everyone.
  const sharedRejected=tagPrefs
    ? new Set(
        TAGS.map(t=>t.id).filter(id=>
          [0,1].some(pi=>tagPrefs[pi] && tagPrefs[pi][id]===false)
        )
      )
    : new Set();

  // Item tags: shared — if item is OFF, add its id to rejected set
  if(itemPrefs){
    ITEM_TAGS.forEach(it=>{
      if(itemPrefs[it.id]===false) sharedRejected.add(it.id);
    });
  }

  return [0,1].map(pi=>{
    const mode=players[pi].mode,byLevel={};
    LEVELS.forEach(l=>{
      byLevel[l.id]=fisherYates(
        (CHALLENGES[mode][l.id]||[]).filter(c=>
          !disabled.has(ckey(mode,l.id,c.text)) &&
          !(c.tags||[]).some(tag=>sharedRejected.has(tag))
        )
      );
    });
    return byLevel;
  });
}
