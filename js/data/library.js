// ── Sex Handbook A-Z ─────────────────────────────────────────────────────────
//
// HOW TO ADD NEW ENTRIES:
// 1. Copy the block below and add it to the array in alphabetical order.
// 2. The "letter" field controls which A-Z section the entry appears under.
//    Set it to a single uppercase letter, e.g. "letter": "F" for Foreplay.
//    If you omit the "letter" field, the app will auto-detect it from the title.
// 3. "More Soon" placeholder entries use "letter": "#" to appear at the bottom.
//
// EXAMPLE — adding a new entry under F:
//   {
//     "letter": "F",
//     "title": "Foreplay",
//     "img": "h04_foreplay.svg",
//     "sub1": "The art of foreplay.",
//     "sub2": "Techniques to build arousal.",
//     "contentFile": "content/handbook/foreplay.md",
//     "sections": []
//   },
//
const HANDBOOK_ITEMS = [
  {
    "letter": "#",
    "title": "More Soon",
    "img": "hb_c.jpg",
    "sub1": "More guides will come soon.",
    "sub2": "Come back later as more sex handbooks are added.",
    "contentFile": "content/handbook/test.md",
    "sections": []
  },
  {
    "letter": "M",
    "title": "Masturbation",
    "img": "h00_masturbation.svg",
    "sub1": "The complete guide to solo pleasure.",
    "sub2": "Techniques for men, women and using toys.",
    "contentFile": "content/handbook/Mast.md",
    "sections": []
  },
 {
    "letter": "O",
    "title": "Oral Sex - Anilingus",
    "img": "h04_anal.svg",
    "sub1": "Oral sex guide to licking ass.",
    "sub2": "How to eat ass like a pro.",
    "contentFile": "content/handbook/or-an.md",
    "sections": []
  },
  {
    "letter": "O",
    "title": "Oral Sex - Cunnilingus",
    "img": "h02_cunnilingus.svg",
    "sub1": "Oral sex guide to eating pussy.",
    "sub2": "How to give her great oral orgasms.",
    "contentFile": "content/handbook/or-cun.md",
    "sections": []
  },
  {
    "letter": "O",
    "title": "Oral Sex - Fellatio",
    "img": "h01_fellatio.svg",
    "sub1": "Oral sex guide to sucking dick.",
    "sub2": "How to give him great oral orgasms.",
    "contentFile": "content/handbook/or-fel.md",
    "sections": []
  },
  {
    "letter": "O",
    "title": "Orgasms",
    "img": "h03_orgasm.svg",
    "sub1": "Orgasms.  What are they?",
    "sub2": "All details on orgasms",
    "contentFile": "content/handbook/orgasmtypes.md",
    "sections": []
  },
  {
    "letter": "R",
    "title": "Role-Play",
    "img": "h10_role_play.svg",
    "sub1": "The complete guide to role-play for adventurous couples.",
    "sub2": "Role-play know-how.",
    "contentFile": "content/handbook/role-play.md",
    "sections": []
  },
  {
    "letter": "M",
    "title": "Massage",
    "img": "h08_massage.svg",
    "sub1": "Guide to sensual massage.",
    "sub2": "Treat you lover to a sensual massage.",
    "contentFile": "content/handbook/sensual-massage.md",
    "sections": []
  },
  {
    "letter": "E",
    "title": "Erogenous Zones",
    "img": "h_erogenous_zones.svg",
    "sub1": "Guide to our Erogenous Zones.",
    "sub2": "All erogenous zones on our bodies.",
    "contentFile": "content/handbook/erogenous-zones.md",
    "sections": []
  },
	{
    "letter": "K",
    "title": "Kinks and Fetishes",
    "img": "h_kinks_fetishes.svg",
    "sub1": "Guide to Kinks and Fetishes.",
    "sub2": "Understanding what are fetishes and kinks.",
    "contentFile": "content/handbook/kinks-fetishes.md",
    "sections": []
  },
	{
    "letter": "T",
    "title": "Three or more",
    "img": "h_threesomes.svg",
    "sub1": "Guide to threesomes or more.",
    "sub2": "Understanding how to introduce another lover to the mix.",
    "contentFile": "content/handbook/threesomes.md",
    "sections": []
  },
	{
    "letter": "B",
    "title": "BDSM - Beginners Guides",
    "img": "h_bdsm.svg",
    "sub1": "Introduction to BDSM.",
    "sub2": "What is BSDM. A beginners guide.",
    "contentFile": "content/handbook/bdsm-beginners.md",
    "sections": []
  },
	{
    "letter": "B",
    "title": "BDSM - Advanced Hints and Tips",
    "img": "h_bdsm.svg",
    "sub1": "Further exploration to BDSM.",
    "sub2": "BDSM hint and tips for deeper BDSM.",
    "contentFile": "content/handbook/bdsm-advanced.md",
    "sections": []
  },
];

// ── Erotica Fiction ─────────────────────────────────────────────────────────
//
// HOW TO ADD NEW STORIES:
// 1. Copy a block below and add it anywhere in the array (order within a
//    category is preserved; category order is fixed by EROTICA_CATEGORY_ORDER).
// 2. Set "category" to one of the values listed below.
// 3. Use "category": "#" for placeholder / coming-soon entries — they always
//    appear at the very bottom under a "More Soon" section.
//
// VALID CATEGORIES (case-sensitive):
//   "Lesbian"       – F/F stories
//   "Hetero"        – M/F stories
//   "Kinky"         – BDSM, fetish, power-play
//   "Group"         – three or more participants
//   "Supernatural"  – vampires, demons, fantasy creatures
//   "Horror"        – erotic horror, dark thriller
//   "Solo"          – masturbation, self-pleasure
//   "Taboo"         – forbidden scenarios
//   "#"             – placeholder / coming soon (shown last)
//
// EXAMPLE — adding a new Taboo story:
//   {
//     "category": "Taboo",
//     "title": "The Forbidden Garden",
//     "img": "b07_taboo.svg",
//     "sub1": "A dangerous attraction.",
//     "sub2": "AI Generated · 12 minute read",
//     "contentFile": "content/fiction/forbidden.md",
//     "sections": []
//   },
//
// CATEGORY DISPLAY ORDER — edit this array to reorder the sections:
const EROTICA_CATEGORY_ORDER = [
  "Hetero",
	"Lesbian",
  "Kinky",
  "Group",
  "Supernatural",
  "Horror",
  "Solo",
  "Taboo",
  "#"
];

const EROTICA_ITEMS = [
  {
    "category": "Lesbian",
    "title": "The College Girls Pt.1",
    "img": "b01_lesbian.svg",
    "sub1": "Sapphic thrills - her first time with a woman.",
    "sub2": "AI generated story & images",
    "readTime": "30 minute read",
    "contentFile": "content/fiction/becs_1.md",
    "sections": []
  },
  {
    "category": "Lesbian",
    "title": "Her Nose",
    "img": "b01_lesbian.svg",
    "sub1": "A cam show and a tempting offer.",
    "sub2": "Story: Claire Woodruff · Images: AI",
    "readTime": "15 minute read",
    "contentFile": "content/fiction/hernose.md",
    "sections": []
  },
  {
    "category": "Hetero",
    "title": "A Chance Encounter",
    "img": "b02_hetero.svg",
    "sub1": "A fantasy, A daydream, A stranger.",
    "sub2": "Story: Jo Benfield · Images: AI",
    "readTime": "3 minute read",
    "contentFile": "content/fiction/chance.md",
    "sections": []
  },
  {
    "category": "Hetero",
    "title": "Amy's Sunlounger",
    "img": "b02_hetero.svg",
    "sub1": "A voyeur and a horny, dominant sunbather.",
    "sub2": "AI generated story & images",
    "readTime": "15 minute read",
    "contentFile": "content/fiction/sunlounger.md",
    "sections": []
  },
  {
    "category": "Hetero",
    "title": "Altitude Adjustment",
    "img": "b02_hetero.svg",
    "sub1": "Nervous flyer joins the mile-high club.",
    "sub2": "AI generated story & images",
    "readTime": "10 minute read",
    "contentFile": "content/fiction/planestory.md",
    "sections": []
  },
  {
    "category": "Kinky",
    "title": "The Art Museum",
    "img": "b03_kinky.svg",
    "sub1": "A thickset woman with a BDSM fetish.",
    "sub2": "AI generated story & images",
    "readTime": "20 minute read",
    "contentFile": "content/fiction/artmuseum.md",
    "sections": []
  },
  {
    "category": "Group",
    "title": "The College Girls Pt.2",
    "img": "b05_group.svg",
    "sub1": "Sapphic thrills - a card game leads to group action.",
    "sub2": "AI generated story & images",
    "readTime": "25 minute read",
    "contentFile": "content/fiction/Bex2.md",
    "sections": []
  },
  {
    "category": "Supernatural",
    "title": "The Vampire",
    "img": "b04_supernatural.svg",
    "sub1": "A barmaid and a vampire.",
    "sub2": "AI generated story & images",
    "readTime": "15 minute read",
    "contentFile": "content/fiction/vampire.md",
    "sections": []
  },
  {
    "category": "Horror",
    "title": "The Predator & The Prey",
    "img": "b06_erotic_horror.svg",
    "sub1": "A sexy serial killer hunts a victim.",
    "sub2": "AI generated story & images",
    "readTime": "20 minute read",
    "contentFile": "content/fiction/predator-prey.md",
    "sections": []
  },
 {
    "category": "Group",
    "title": "Party Games",
    "img": "b05_group.svg",
    "sub1": "A hedonistic sex party.",
    "sub2": "Story: Claudia Thomas · Images: AI",
    "readTime": "15 minute read",
    "contentFile": "content/fiction/party.md",
    "sections": []
  },
  {
    "category": "#",
    "title": "More Soon",
    "img": "er_g.jpg",
    "sub1": "More stories will come soon.",
    "sub2": "Come back later as more fiction is added.",
    "readTime": "",
    "contentFile": "content/fiction/by-the-sea.md",
    "sections": []
  },
];

// ── External Markdown File Loading ──────────────────────────────────────────
// Edit the .md files named in each item's contentFile value.
// Full Markdown is supported — see content/README.md for all syntax.
//
// Sections are split on ## headings. Each ## becomes a new swipeable panel.
// Use ### for sub-headings within a section.
//
// Legacy custom tags are still supported for backwards compatibility:
//   [image src="..." alt="..." caption="..."]
//   [italic] ... [/italic]

async function loadLibraryItemContent(item) {
  if (!item.contentFile) return item.sections || [];
  if (item._contentLoaded && item.sections) return item.sections;

  const response = await fetch(item.contentFile, { cache: "no-cache" });

  if (!response.ok) {
    throw new Error(`Could not load ${item.contentFile} (${response.status})`);
  }

  const text = await response.text();
  item.sections = parseLibraryMarkdown(text);
  item._contentLoaded = true;

  return item.sections;
}

// ── Markdown Parser ──────────────────────────────────────────────────────────
// A self-contained Markdown renderer — no external library required.
// Supports: headings (###), bold, italic, strikethrough, inline code,
// blockquotes, ordered & unordered lists, horizontal rules, code blocks,
// tables, links, line breaks, and legacy [image] / [italic] custom tags.

function parseLibraryMarkdown(text) {
  const cleanText = text.replace(/\r\n/g, "\n").trim();
  if (!cleanText) return [];

  // Ensure the text starts with a ## heading so split works
  const sectionText = cleanText.startsWith("## ")
    ? cleanText
    : `## Content\n\n${cleanText}`;

  return sectionText
    .split(/^##\s+/m)
    .filter(Boolean)
    .map((rawSection) => {
      const lines = rawSection.split("\n");
      const heading = lines.shift().trim();
      const bodyMarkdown = lines.join("\n").trim();
      const body = renderMarkdown(bodyMarkdown);

      return {
        heading,
        body,
        img: null,
        isHtml: true
      };
    });
}

function renderMarkdown(text) {
  if (!text.trim()) return "";

  // Pre-process legacy custom tags → standard Markdown equivalents
  // [image src="..." alt="..." caption="..."] → figure HTML
  // [italic] ... [/italic] → *...*  (will be processed by inline renderer)
  text = text.replace(
    /\[image\s+([^\]]+)\]/gi,
    (_, attrs) => {
      const get = (k) => { const m = attrs.match(new RegExp(`${k}="([^"]*)"`)); return m ? m[1] : ""; };
      const src = get("src"), alt = get("alt"), cap = get("caption");
      return `<figure class="library-inline-image"><img src="${escapeLibraryHtml(src)}" alt="${escapeLibraryHtml(alt)}" loading="lazy">${cap ? `<figcaption>${escapeLibraryHtml(cap)}</figcaption>` : ""}</figure>`;
    }
  );

  text = text.replace(
    /\[italic\]([\s\S]*?)\[\/italic\]/gi,
    (_, inner) => `<p class="md-italic-block"><em>${escapeLibraryHtml(inner.trim()).replace(/\n/g, "<br>")}</em></p>`
  );

  // Split into blocks (paragraphs separated by blank lines),
  // but keep fenced code blocks and HTML figures intact
  const blocks = splitIntoBlocks(text);
  return blocks.map(renderBlock).join("\n");
}

function splitIntoBlocks(text) {
  const blocks = [];
  let current = [];
  let inFence = false;

  for (const line of text.split("\n")) {
    if (/^```/.test(line)) {
      inFence = !inFence;
      current.push(line);
      if (!inFence) {
        blocks.push(current.join("\n"));
        current = [];
      }
      continue;
    }
    if (inFence) {
      current.push(line);
      continue;
    }
    if (line.trim() === "") {
      if (current.length) {
        blocks.push(current.join("\n"));
        current = [];
      }
    } else {
      current.push(line);
    }
  }
  if (current.length) blocks.push(current.join("\n"));
  return blocks.filter(b => b.trim());
}

function renderBlock(block) {
  // Already-rendered HTML (from legacy tag replacement)
  if (/^<figure|^<p class="md-italic/.test(block.trim())) return block;

  // Fenced code block
  const fenceMatch = block.match(/^```(\w*)\n([\s\S]*?)```$/);
  if (fenceMatch) {
    const lang = fenceMatch[1] ? ` class="language-${escapeLibraryHtml(fenceMatch[1])}"` : "";
    return `<pre class="md-pre"><code${lang}>${escapeLibraryHtml(fenceMatch[2])}</code></pre>`;
  }

  // Horizontal rule
  if (/^(\*{3,}|-{3,}|_{3,})\s*$/.test(block)) {
    return `<hr class="md-hr">`;
  }

  // ### Sub-heading (h3 within a section)
  if (/^###\s+/.test(block)) {
    return `<h3 class="md-h3">${renderInline(block.replace(/^###\s+/, ""))}</h3>`;
  }

  // #### h4
  if (/^####\s+/.test(block)) {
    return `<h4 class="md-h4">${renderInline(block.replace(/^####\s+/, ""))}</h4>`;
  }

  // Blockquote
  if (/^>\s/.test(block)) {
    const inner = block.replace(/^>\s?/gm, "");
    return `<blockquote class="md-blockquote">${renderInline(inner)}</blockquote>`;
  }

  // Table
  if (/^\|.+\|/.test(block) && /\|-+/.test(block)) {
    return renderTable(block);
  }

  // Unordered list (-, *, +)
  if (/^[-*+]\s/.test(block)) {
    return renderList(block, false);
  }

  // Ordered list (1. 2. etc.)
  if (/^\d+\.\s/.test(block)) {
    return renderList(block, true);
  }

  // Paragraph — could be multi-line (soft wraps)
  const lines = block.split("\n");
  const html = lines.map(line => renderInline(line)).join("<br>");
  return `<p class="md-p">${html}</p>`;
}

function renderList(block, ordered) {
  const items = [];
  let currentItem = null;
  const itemRe = ordered ? /^\d+\.\s+(.*)/ : /^[-*+]\s+(.*)/;
  const subItemRe = /^  [-*+]\s+(.*)/;

  for (const line of block.split("\n")) {
    const subMatch = line.match(subItemRe);
    const itemMatch = line.match(itemRe);
    if (subMatch && currentItem !== null) {
      items[currentItem].sub = items[currentItem].sub || [];
      items[currentItem].sub.push(subMatch[1]);
    } else if (itemMatch) {
      items.push({ text: itemMatch[1], sub: null });
      currentItem = items.length - 1;
    }
  }

  const tag = ordered ? "ol" : "ul";
  const liHtml = items.map(it => {
    let li = `<li>${renderInline(it.text)}`;
    if (it.sub && it.sub.length) {
      li += `<ul class="md-sublist">${it.sub.map(s => `<li>${renderInline(s)}</li>`).join("")}</ul>`;
    }
    return li + "</li>";
  }).join("");

  return `<${tag} class="md-list">${liHtml}</${tag}>`;
}

function renderTable(block) {
  const rows = block.split("\n").filter(r => r.trim() && !/^\|[-:| ]+\|/.test(r));
  const [headerRow, ...bodyRows] = rows;
  const parseRow = (row) => row.replace(/^\||\|$/g, "").split("|").map(c => c.trim());

  const headers = parseRow(headerRow);
  const thead = `<thead><tr>${headers.map(h => `<th>${renderInline(h)}</th>`).join("")}</tr></thead>`;
  const tbody = bodyRows.length
    ? `<tbody>${bodyRows.map(r => `<tr>${parseRow(r).map(c => `<td>${renderInline(c)}</td>`).join("")}</tr>`).join("")}</tbody>`
    : "";

  return `<div class="md-table-wrap"><table class="md-table">${thead}${tbody}</table></div>`;
}

function renderInline(text) {
  // Order matters: code first (protects content), then bold+italic combos, then links
  return text
    // Inline code
    .replace(/`([^`]+)`/g, (_, c) => `<code class="md-code">${escapeLibraryHtml(c)}</code>`)
    // Bold + italic (***text*** or ___text___)
    .replace(/(\*{3}|_{3})(.+?)\1/g, (_, __, t) => `<strong><em>${t}</em></strong>`)
    // Bold (**text** or __text__)
    .replace(/(\*{2}|_{2})(.+?)\1/g, (_, __, t) => `<strong>${t}</strong>`)
    // Italic (*text* or _text_)
    .replace(/(\*|_)(.+?)\1/g, (_, __, t) => `<em>${t}</em>`)
    // Strikethrough (~~text~~)
    .replace(/~~(.+?)~~/g, (_, t) => `<s>${t}</s>`)
    // Inline images ![alt](url) — rendered as full-width figures
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => `<figure class="library-inline-image"><img src="${escapeLibraryHtml(src)}" alt="${escapeLibraryHtml(alt)}" loading="lazy" class="md-img"></figure>`)
    // Links [text](url)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, u) => `<a class="md-link" href="${escapeLibraryHtml(u)}" target="_blank" rel="noopener">${escapeLibraryHtml(t)}</a>`)
    // Highlight ==text==
    .replace(/==(.+?)==/g, (_, t) => `<mark class="md-mark">${t}</mark>`)
    // Superscript ^text^
    .replace(/\^([^\^]+)\^/g, (_, t) => `<sup>${t}</sup>`)
    // Subscript ~text~
    .replace(/~([^~]+)~/g, (_, t) => `<sub>${t}</sub>`);
}

function escapeLibraryHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}
