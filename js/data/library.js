// ── Sex Handbook A-Z ─────────────────────────────────────────────────────────
const HANDBOOK_ITEMS = [
  {
    "title": "Example A — Aftercare",
    "img": "hb_a.jpg",
    "sub1": "The essential wind-down after play",
    "sub2": "Comfort, connection & communication",
    "contentFile": "content/handbook/aftercare.txt",
    "sections": []
  },
  {
    "title": "Example B — Body Language",
    "img": "hb_b.jpg",
    "sub1": "Reading unspoken signals",
    "sub2": "Desire, comfort & hesitation cues",
    "contentFile": "content/handbook/body-language.txt",
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
  }
];

// ── Erotica Fiction ─────────────────────────────────────────────────────────
const EROTICA_ITEMS = [
  {
    "title": "Story A - The College Girls",
    "img": "b01_lesbian.svg",
    "sub1": "New roommate. Her first time. An awakening.",
    "sub2": "Sapphic Thrills · Short read",
    "contentFile": "content/fiction/becs_1.txt",
    "sections": []
  },
  {
    "title": "Story B — Amy's Sunlounger",
    "img": "b02_hetero.svg",
    "sub1": "Voyeur. Outdoor Sex. Tease.",
    "sub2": "Dominant woman · Short read",
    "contentFile": "content/fiction/sunlounger.txt",
    "sections": []
  },
  {
    "title": "Story C — Sunday Morning",
    "img": "er_c.jpg",
    "sub1": "No alarm. No plans. Just the two of you.",
    "sub2": "Intimate domestic romance · Short read",
    "contentFile": "content/fiction/sunday-morning.txt",
    "sections": []
  },
  {
    "title": "Story D — The Portrait",
    "img": "er_d.jpg",
    "sub1": "An artist. A subject. A boundary crossed.",
    "sub2": "Slow burn romance · Short read",
    "contentFile": "content/fiction/the-portrait.txt",
    "sections": []
  },
  {
    "title": "Story E — Rain",
    "img": "er_e.jpg",
    "sub1": "Stranded. Together. For the first time.",
    "sub2": "First encounter romance · Short read",
    "contentFile": "content/fiction/rain.txt",
    "sections": []
  },
  {
    "title": "Story F — The Appointment",
    "img": "er_f.jpg",
    "sub1": "Professional lines. Personal feelings.",
    "sub2": "Forbidden tension romance · Short read",
    "contentFile": "content/fiction/the-appointment.txt",
    "sections": []
  },
  {
    "title": "Story G — By the Sea",
    "img": "er_g.jpg",
    "sub1": "A holiday cottage. End of summer.",
    "sub2": "Romantic getaway · Short read",
    "contentFile": "content/fiction/by-the-sea.txt",
    "sections": []
  },
  {
    "title": "Story H — The Library",
    "img": "er_h.jpg",
    "sub1": "A quiet place. An unexpected connection.",
    "sub2": "Slow burn literary romance · Short read",
    "contentFile": "content/fiction/the-library.txt",
    "sections": []
  },
  {
    "title": "Story I — New Year",
    "img": "er_i.jpg",
    "sub1": "Midnight. A decision. A kiss.",
    "sub2": "Celebration romance · Short read",
    "contentFile": "content/fiction/new-year.txt",
    "sections": []
  },
  {
    "title": "Story J — The Road Trip",
    "img": "er_j.jpg",
    "sub1": "Miles of open road. Nowhere to hide.",
    "sub2": "Adventure romance · Short read",
    "contentFile": "content/fiction/the-road-trip.txt",
    "sections": []
  },
  {
    "title": "Story K — After the Exhibition",
    "img": "er_k.jpg",
    "sub1": "Art. Champagne. An honest conversation.",
    "sub2": "Cultural romance · Short read",
    "contentFile": "content/fiction/after-the-exhibition.txt",
    "sections": []
  },
  {
    "title": "Story L — Letters",
    "img": "er_l.jpg",
    "sub1": "Words on paper. An old-fashioned love.",
    "sub2": "Epistolary romance · Short read",
    "contentFile": "content/fiction/letters.txt",
    "sections": []
  },
  {
    "title": "Story M — The Cabin",
    "img": "er_m.jpg",
    "sub1": "Deep winter. No signal. Just warmth.",
    "sub2": "Isolation romance · Short read",
    "contentFile": "content/fiction/the-cabin.txt",
    "sections": []
  },
  {
    "title": "Story N — The Dance",
    "img": "er_n.jpg",
    "sub1": "A wedding. A slow song. A conversation.",
    "sub2": "Wedding romance · Short read",
    "contentFile": "content/fiction/the-dance.txt",
    "sections": []
  },
  {
    "title": "Story O — The Confession",
    "img": "er_o.jpg",
    "sub1": "Years of waiting. One honest moment.",
    "sub2": "Long friendship romance · Short read",
    "contentFile": "content/fiction/the-confession.txt",
    "sections": []
  },
  {
    "title": "Story P — The Morning After",
    "img": "er_p.jpg",
    "sub1": "Waking up. Choosing to stay.",
    "sub2": "Tender aftermath romance · Short read",
    "contentFile": "content/fiction/the-morning-after.txt",
    "sections": []
  }
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
