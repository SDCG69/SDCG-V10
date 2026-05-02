// ── Name resolution ──────────────────────────────────────────────────────────
// Words that signal "her / his" is an object/indirect-object pronoun,
// NOT a possessive determiner before a noun (e.g. "her back", "his dick").
const OBJ_WORDS = /^(a|an|the|your|my|his|her|their|its|by|on|in|at|to|from|with|for|into|onto|over|out|up|down|everywhere|anywhere|behind|around|under|through|against|between|across|about|whilst|while|and|but|or|as|when|then|now|there|here|that|this|those|these)$/i;

function resolveText(text, currentIdx, players) {
  const partner = (players[1 - currentIdx] && players[1 - currentIdx].name) || `Player ${2 - currentIdx}`;
  const mode    = players[currentIdx] && players[currentIdx].mode;
  const p = partner;

  // ── Explicit "partner / lover / man" phrases ────────────────────────────
  let t = text
    .replace(/\byour partner\u2019s\b/gi, `${p}\u2019s`)  // curly apostrophe variant
    .replace(/\byour partner['']s\b/gi,   `${p}'s`)
    .replace(/\byour partners\b/gi,        `${p}'s`)       // missing apostrophe
    .replace(/\byour partner\b/gi,          p)
    .replace(/\byour lover[''\u2019]s\b/gi,`${p}'s`)
    .replace(/\byour lover\b/gi,            p)
    .replace(/\byour man[''\u2019]s\b/gi,  `${p}'s`)
    .replace(/\byour man\b/gi,              p);

  if (mode === 'Male') {
    // Female pronouns → partner name
    // "her <word>" — check whether the next word makes it possessive or object
    t = t.replace(/\bher\b(\s+)(\w+)([.,!?;:]*)/g, (_, sp, word, punct) =>
      OBJ_WORDS.test(word)
        ? `${p}${sp}${word}${punct}`        // object/indirect-object: "Show her your…"
        : `${p}'s${sp}${word}${punct}`      // possessive determiner: "her nipples"
    );
    t = t
      .replace(/\bher\b/g,   p)            // "her" at end of phrase / before punctuation
      .replace(/\bhers\b/gi, `${p}'s`)     // "from your mouth to hers"
      .replace(/\bshe\b/gi,   p);          // subject pronoun: "She will lie back"
  } else if (mode === 'Female') {
    // Male pronouns → partner name
    t = t.replace(/\bhis\b(\s+)(\w+)([.,!?;:]*)/g, (_, sp, word, punct) =>
      OBJ_WORDS.test(word)
        ? `${p}${sp}${word}${punct}`
        : `${p}'s${sp}${word}${punct}`
    );
    t = t
      .replace(/\bhim\b/gi, p)
      .replace(/\bhe\b/gi,  p);
  }

  return t;
}
