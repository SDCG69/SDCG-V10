// ── Sex Handbook A-Z ─────────────────────────────────────────────────────────
const HANDBOOK_ITEMS = [
  {
    "title": "Orgasms",
    "img": "h03_orgasm.svg",
    "sub1": "Orgasms.  What are they?",
    "sub2": "All details on orgasms",
    "contentFile": "content/handbook/orgasmtypes.md",
    "sections": []
  },
  {
    "title": "Oral Sex - Cunnilingus",
    "img": "h02_cunnilingus.svg",
    "sub1": "Oral sex guide to eating pussy.",
    "sub2": "How to give her great oral orgasms.",
    "contentFile": "content/handbook/or-cun.md",
    "sections": []
  },
  {
    "title": "More Soon",
    "img": "hb_c.jp",
    "sub1": "More guides will come soon.",
    "sub2": "Come back later as more sex handbooks are dded.",
    "contentFile": "content/handbook/test.md",
    "sections": []
  },
];

// ── Erotica Fiction ─────────────────────────────────────────────────────────
const EROTICA_ITEMS = [
   {
    "title": "A Chance Encounter",
    "img": "b02_hetero.svg",
    "sub1": "A fantasy, A daydream, A stranger.",
    "sub2": "Story: Jo Benfield · Images: AI · 3 minute read",
    "contentFile": "content/fiction/chance.md",
    "sections": []
  },
  {
    "title": "The College Girls Pt.1",
    "img": "b01_lesbian.svg",
    "sub1": "Sapphic thrills - her first time with a woman.",
    "sub2": "AI Generated · 15 minute read",
    "contentFile": "content/fiction/becs_1.md",
    "sections": []
  },
  {
    "title": "The College Girls Pt.2",
    "img": "b05_group.svg",
    "sub1": "Sapphic thrills - a card game leads to group action.",
    "sub2": "AI Generated · 20 minute read",
    "contentFile": "content/fiction/Bex2.md",
    "sections": []
  },
  {
    "title": "Amy's Sunlounger",
    "img": "b02_hetero.svg",
    "sub1": "A voyeur and a horny, dominant sunbather.",
    "sub2": "AI Generated · 10 minute read",
    "contentFile": "content/fiction/sunlounger.md",
    "sections": []
  },
  {
    "title": "Her Nose",
    "img": "b01_lesbian.svg",
    "sub1": "A cam show and a tempting offer.",
    "sub2": "Story: Claire Woodruff · Images: AI · 15 minute read",
    "contentFile": "content/fiction/hernose.md",
    "sections": []
  },
  {
    "title": "Altitude Adjustment",
    "img": "b02_hetero.svg",
    "sub1": "Nervous flyer joins the mile-high club.",
    "sub2": "AI Generated · 10 minute read",
    "contentFile": "content/fiction/planestory.md",
    "sections": []
  },
  {
    "title": "The Art Museum",
    "img": "b03_kinky.svg",
    "sub1": "A thickset woman with a BDSM fetish.",
    "sub2": "AI Generated · 15 minute read",
    "contentFile": "content/fiction/artmuseum.md",
    "sections": []
  },
  {
    "title": "The Vampire",
    "img": "b04_supernatural.svg",
    "sub1": "A barmaid and a vampire.",
    "sub2": "AI Generated · 15 minute read",
    "contentFile": "content/fiction/vampire.md",
    "sections": []
  },
  {
    "title": "The Predator & The Prey",
    "img": "b06_erotic_horror.svg",
    "sub1": "A sexy serial killer hunts a victim.",
    "sub2": "AI Generated · 15 minute read",
    "contentFile": "content/fiction/predator-prey.md",
    "sections": []
  },
  {
    "title": "More Soon",
    "img": "er_g.jpg",
    "sub1": "More stories will come soon.",
    "sub2": "Come back later as more fiction is added.",
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
