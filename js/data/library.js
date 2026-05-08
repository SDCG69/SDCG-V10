// ── Sex Handbook A-Z ─────────────────────────────────────────────────────────
const HANDBOOK_ITEMS = [
  {
    "title": "Orgasms",
    "img": "h03_orgasm.svg",
    "sub1": "Orgasms.  What are they?",
    "sub2": "All details on orgasms",
    "contentFile": "content/handbook/orgasmtypes.txt",
    "sections": []
  },
  {
    "title": "Masturbation",
    "img": "h09_masturbation.svg",
    "sub1": "Solo Time and Mutual Masturbation",
    "sub2": "Guides for better 'me time'",
    "contentFile": "content/handbook/masturbation.txt",
    "sections": []
  },
  {
    "title": "Example C — Clitoral Stimulation",
    "img": "hb_c.jpg",
    "sub1": "The most reliable route to female orgasm",
    "sub2": "Technique, pressure & patience",
    "contentFile": "content/handbook/clitoral-stimulation.txt",
    "sections": []
  },
  {
    "title": "Example D — Dirty Talk",
    "img": "hb_d.jpg",
    "sub1": "Using words as foreplay",
    "sub2": "Starting slowly, building confidence",
    "contentFile": "content/handbook/dirty-talk.txt",
    "sections": []
  },
  {
    "title": "Example E — Erogenous Zones",
    "img": "hb_e.jpg",
    "sub1": "Beyond the obvious hotspots",
    "sub2": "Mapping your partner's pleasure",
    "contentFile": "content/handbook/erogenous-zones.txt",
    "sections": []
  },
  {
    "title": "Example F — Fantasy & Role Play",
    "img": "hb_f.jpg",
    "sub1": "Bringing imagination into the bedroom",
    "sub2": "Scripts, personas & safe words",
    "contentFile": "content/handbook/fantasy-and-role-play.txt",
    "sections": []
  },
  {
    "title": "Example G — G-Spot",
    "img": "hb_g.jpg",
    "sub1": "Locating and stimulating the anterior wall",
    "sub2": "Pressure, angle & patience",
    "contentFile": "content/handbook/g-spot.txt",
    "sections": []
  },
  {
    "title": "Example H — Hand Techniques",
    "img": "hb_h.jpg",
    "sub1": "Manual stimulation mastered",
    "sub2": "Grip, rhythm & lubrication",
    "contentFile": "content/handbook/hand-techniques.txt",
    "sections": []
  },
  {
    "title": "Example I — Intimacy & Connection",
    "img": "hb_i.jpg",
    "sub1": "Sex as emotional bonding",
    "sub2": "Presence, eye contact & vulnerability",
    "contentFile": "content/handbook/intimacy-and-connection.txt",
    "sections": []
  },
  {
    "title": "Example J — Jealousy & Trust",
    "img": "hb_j.jpg",
    "sub1": "Navigating complex emotions in relationships",
    "sub2": "Communication & security",
    "contentFile": "content/handbook/jealousy-and-trust.txt",
    "sections": []
  },
  {
    "title": "Example K — Kegel Exercises",
    "img": "hb_k.jpg",
    "sub1": "Pelvic floor training for both partners",
    "sub2": "Stronger orgasms & better control",
    "contentFile": "content/handbook/kegel-exercises.txt",
    "sections": []
  },
  {
    "title": "Example L — Lubrication",
    "img": "hb_l.jpg",
    "sub1": "The most underrated bedroom essential",
    "sub2": "Types, uses & compatibility",
    "contentFile": "content/handbook/lubrication.txt",
    "sections": []
  },
  {
    "title": "Example M — Massage",
    "img": "hb_m.jpg",
    "sub1": "Sensual touch as extended foreplay",
    "sub2": "Technique, oils & presence",
    "contentFile": "content/handbook/massage.txt",
    "sections": []
  },
  {
    "title": "Example N — New Experiences",
    "img": "hb_n.jpg",
    "sub1": "Why novelty matters in long-term sex",
    "sub2": "Trying new things with care",
    "contentFile": "content/handbook/new-experiences.txt",
    "sections": []
  },
  {
    "title": "Example O — Oral Sex",
    "img": "hb_o.jpg",
    "sub1": "Giving and receiving with confidence",
    "sub2": "Technique, hygiene & enthusiasm",
    "contentFile": "content/handbook/oral-sex.txt",
    "sections": []
  },
  {
    "title": "Example P — Pleasure Mapping",
    "img": "hb_p.jpg",
    "sub1": "Discovering your body together",
    "sub2": "An exercise in mutual exploration",
    "contentFile": "content/handbook/pleasure-mapping.txt",
    "sections": []
  },
  {
    "title": "Example Q — Queening",
    "img": "hb_p.jpg",
    "sub1": "Discovering your body together",
    "sub2": "An exercise in mutual exploration",
    "contentFile": "content/handbook/pleasure-mapping.txt",
    "sections": []
  },
  {
    "title": "Example R — Role Play",
    "img": "hb_p.jpg",
    "sub1": "Discovering your body together",
    "sub2": "An exercise in mutual exploration",
    "contentFile": "content/handbook/pleasure-mapping.txt",
    "sections": []
  },
];

// ── Erotica Fiction ─────────────────────────────────────────────────────────
const EROTICA_ITEMS = [
  {
    "title": "The College Girls Pt.1",
    "img": "b01_lesbian.svg",
    "sub1": "Sapphic thrills - her first time with a woman.",
    "sub2": "AI Generated · 15 minute read",
    "contentFile": "content/fiction/becs_1.txt",
    "sections": []
  },
  {
    "title": "Amy's Sunlounger",
    "img": "b02_hetero.svg",
    "sub1": "A voyeur and a horny, dominant sunbather.",
    "sub2": "AI Generated · 10 minute read",
    "contentFile": "content/fiction/sunlounger.txt",
    "sections": []
  },
  {
    "title": "Altitude Adjustment",
    "img": "b02_hetero.svg",
    "sub1": "Nervous flyer joins the mile-high club.",
    "sub2": "AI Generated · 10 minute read",
    "contentFile": "content/fiction/planestory.txt",
    "sections": []
  },
  {
    "title": "The Art Museum",
    "img": "b03_kinky.svg",
    "sub1": "A thickset woman with a BDSM fetish.",
    "sub2": "AI Generated · 15 minute read",
    "contentFile": "content/fiction/artmuseum.txt",
    "sections": []
  },
  {
    "title": "The College Girls Pt.2",
    "img": "b05_group.svg",
    "sub1": "Sapphic thrills - a card leads to group action.",
    "sub2": "AI Generated · 20 minute read",
    "contentFile": "content/fiction/Bex2.txt",
    "sections": []
  },
  {
    "title": "The Vampire",
    "img": "b04_supernatural.svg",
    "sub1": "A barmaid and a vampire.",
    "sub2": "AI Generated · 15 minute read",
    "contentFile": "content/fiction/vampire.txt",
    "sections": []
  },
  {
    "title": "The Predator & The Prey",
    "img": "b06_erotic_horror.svg",
    "sub1": "A sexy serial killer hunts a victim.",
    "sub2": "AI Generated · 15 minute read",
    "contentFile": "content/fiction/predator-pey.txt",
    "sections": []
  },
  {
    "title": "Story Placeholder",
    "img": "er_g.jpg",
    "sub1": "A holiday cottage. End of summer.",
    "sub2": "Romantic getaway · Short read",
    "contentFile": "content/fiction/by-the-sea.txt",
    "sections": []
  },
];

// ── External Text File Loading ──────────────────────────────────────────────
// Edit the files named in each item's contentFile value. Supported text tags:
//
// ## Section heading
// Normal paragraph text. Blank lines create new paragraphs.
//
// [image src="media/img/example.jpg" alt="Image description" caption="Optional caption"]
//
// [italic]
// This paragraph will be italic.
// [/italic]
async function loadLibraryItemContent(item) {
  if (!item.contentFile) return item.sections || [];
  if (item._contentLoaded && item.sections) return item.sections;

  const response = await fetch(item.contentFile, { cache: "no-cache" });

  if (!response.ok) {
    throw new Error(`Could not load ${item.contentFile} (${response.status})`);
  }

  const text = await response.text();
  item.sections = parseLibraryText(text);
  item._contentLoaded = true;

  return item.sections;
}

function parseLibraryText(text) {
  const cleanText = text.replace(/\r\n/g, "\n").trim();
  if (!cleanText) return [];

  const sectionText = cleanText.startsWith("## ") ? cleanText : `## Content\n\n${cleanText}`;

  return sectionText
    .split(/^##\s+/m)
    .filter(Boolean)
    .map((rawSection) => {
      const lines = rawSection.trim().split("\n");
      const heading = lines.shift().trim();
      const body = renderLibraryTextBlocks(lines.join("\n"));

      return {
        heading,
        body,
        img: null,
        isHtml: true
      };
    });
}

function renderLibraryTextBlocks(text) {
  if (!text.trim()) return "";

  return text
    .split(/\n{2,}/)
    .map((block) => renderLibraryTextBlock(block.trim()))
    .join("");
}

function renderLibraryTextBlock(block) {
  const imageAttrs = parseLibraryImageTag(block);

  if (imageAttrs && imageAttrs.src) {
    return `
      <figure class="library-inline-image">
        <img src="${escapeLibraryHtml(imageAttrs.src)}" alt="${escapeLibraryHtml(imageAttrs.alt || "")}" loading="lazy">
        ${imageAttrs.caption ? `<figcaption>${escapeLibraryHtml(imageAttrs.caption)}</figcaption>` : ""}
      </figure>
    `;
  }

  const italic = block.match(/^\[italic\]\s*([\s\S]*?)\s*\[\/italic\]$/i);

  if (italic) {
    return `<p><em>${escapeLibraryHtml(italic[1]).replace(/\n/g, "<br>")}</em></p>`;
  }

  return `<p>${escapeLibraryHtml(block).replace(/\n/g, "<br>")}</p>`;
}

function parseLibraryImageTag(block) {
  if (!/^\[image\b/i.test(block) || !/\]$/.test(block)) return null;

  const attrs = {};
  const attrPattern = /(\w+)="([^"]*)"/g;
  let match;

  while ((match = attrPattern.exec(block))) {
    attrs[match[1]] = match[2];
  }

  return attrs;
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
