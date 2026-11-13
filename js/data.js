/* ==========================================================================
   THE CURIOUS MIND — catalogue data (single source of truth)
   Add or edit books here. Everything on the page is rendered from this list.

   - coverImage: leave "" to show the clean typographic placeholder cover.
                 When final artwork exists, put it in assets/covers/ and use
                 e.g. "assets/covers/your-body.jpg" (recommended ratio 2:3).
   - price:      leave null until real pricing is decided.
   - filter:     must match a data-filter value in index.html.
   - theme:      "blue" or "gold" (placeholder cover colour only).
   ========================================================================== */
window.TCM = window.TCM || {};

TCM.catalog = [
  {
    id: "body",
    index: "01",
    filter: "science",
    theme: "blue",
    category: "SCIENCE & THE HUMAN BODY",
    title: "Your Body Is Hiding 100 Amazing Secrets",
    titleLines: ["YOUR BODY", "IS HIDING", "100 AMAZING", "SECRETS"],
    accentLine: 1,
    teaser: "A journey into the surprising systems, mysteries and everyday wonders of the human body.",
    description: "A journey into the surprising systems, mysteries and everyday wonders of the human body. Discover how familiar things can hold extraordinary explanations.",
    bullets: [
      "100 fascinating discoveries about the human body",
      "Accessible explanations for curious readers",
      "A digital book designed for reading at your own pace"
    ],
    price: null,
    coverImage: ""
  },
  {
    id: "brain",
    index: "02",
    filter: "psychology",
    theme: "gold",
    category: "PSYCHOLOGY & THE MIND",
    title: "Your Brain Is Playing Tricks on You",
    titleLines: ["YOUR BRAIN", "IS PLAYING", "TRICKS ON YOU"],
    accentLine: 1,
    teaser: "Explore how perception, memory and mental shortcuts shape the way you experience reality.",
    description: "Explore how perception, memory and hidden mental shortcuts shape the way you experience reality. A thought-provoking look at the surprising ways the mind works.",
    bullets: [
      "Five connected chapters about the mind",
      "Explore perception, memory and everyday thinking",
      "A digital book designed for curious readers"
    ],
    price: null,
    coverImage: ""
  }
];
